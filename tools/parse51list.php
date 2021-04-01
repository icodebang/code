<?php

set_time_limit(0);
ini_set("memory_limit","1024M");

/**
 * 生成随机文字， 附加在url中。 将url加入锚点，get请求参数等伪数据。
 * （可能没啥效果）
 */
function getRandomString ()
{
    $index = array('', '?', '#');
    $randIndex = rand(0, 2);
    $randIndex = 1;
    $paramNum = rand(1,5);
    $paramStart = 97;
    $paramEnd = 122;
    $params = array();

    if ($index[$randIndex] === '') {
        return '';
    }
    for($i=0; $i<$paramNum; $i++) {
        $randKey = '';
        $randValue = '';
        for($j=0; $j<(6-$paramNum); $j++) {
           $_tmpKey = rand($paramStart, $paramEnd);
           $_tmpValue = rand($paramStart, $paramEnd);

           $randKey .= chr($_tmpKey);
           $randValue .= chr($_tmpValue);
        }

        $params[] = $randKey . '=' . $randValue;
    }

    return $index[$randIndex] . join('&', $params);
}
/**
 * 更新数据库中的 原文地址，作者信息。 因为jb51.net的移动页面，没有原文地址和作者数据
 */
function syncRefUrlAfterGettingMobilePageData ($numbersToUpdate=1000)
{
    extract($GLOBALS);

    // 获取上次更新到的位置
    $lastId = Application::model()->fetch_one('key_value','value', '`varname`="jb51_update_url_author_point"');
    $lastId = empty($lastId) ? 0 : $lastId;
    $table = 'article'; // 数据表名
    $where = 'id>' . $lastId; // 获取数据的条件
    $order = 'id ASC'; // 排序方式按照id正序
    $limit = $numbersToUpdate; // 获取数据数量
    $offset = 0; // 数据记录偏移位置
    // 获取文章列表最后一条数据， 后面根据最后一条数据记录的id，在此id基础上增加操作
    $articleList = Application::model()->fetch_all($table, $where, $order, $limit, $offset);

    $curlHeaders['Host'] = 'www.jb51.net'; // http请求需要的头信息
    $i = 0;
    foreach ($articleList as $_info) {
        // 只更新移动页面获取到的数据。
        if (strpos($_info['copy_from'],'jb51.net/') &&  $_info['source_url']=='') {
            echo __LINE__, "\r\n";
            // 将移动页面url替换成web页面url
            $_url = str_replace('/m.jb51.net/', '/www.jb51.net/', $_info['copy_from']);
            //$_url = $_url . getRandomString();
            $fileContent = curlRequest($_url, 'GET', $curlHeaders); // 获取url内容
            if (is_array($fileContent)) { // 解析到的http内容失败，对应有http状态码返回
                echo $_info['id'], '  ', $_url, "\r\n";
                echo __LINE__, "    ", 'Failed to get content', "\r\n";
                continue;
                exit(0);
            }
            // 通过php的dom函数， 过滤文章内容
            $dom = new DOMDocument;
            $dom->loadHTML($fileContent);
            $elementArticle = $dom->getElementById('article');// 载入文章dom
            // 转换编码， 获取到文章来源，标题相关数据
            $fileContent = mb_convert_encoding($fileContent, 'utf-8', 'gb2312');
            // 匹配文章来源， 在js代码中
            preg_match_all('/var ourl\s*=\s*"(.*)"/iU', str_replace("\r\n", '', $fileContent), $matchContent);
            $_sourceUrl = (empty($matchContent[1]) || empty($matchContent[1][0])) ? '' : $matchContent[1][0];
            // 匹配breadcrumb， 获取文章标题，所属分类
            preg_match_all('/<div class="breadcrumb">(.*)?<div class="search">/iUs', $fileContent, $matchList);
            // 检查是否匹配到文章标题
            if (! isset($matchList[1]) || ! is_array($matchList[1]) || count($matchList[1])==0) {
                echo __LINE__, "    ", 'Failed to get title', "\r\n";
                exit(0);
            }
            // 通过php的dom函数， 过滤文章内容
            if (! $elementArticle) {
                // 将网页内容的编码方式转换， 才能让dom正确解析
                $fileContent = str_replace('charset="gb2312"', 'charset="utf-8"', $fileContent);
                $dom->loadHTML($fileContent);
                $elementArticle = $dom->getElementById('article');
            }
            // 没有找到文章内容的dom元素
            if(! $elementArticle) {
                echo __LINE__, "    ", 'Failed to load dom', "\r\n";
                exit;
            }
            // 从文章内容区域获取作者名字， 作者名字在 div包含中
            $divList = $elementArticle->getElementsByTagName('div');
            $_author = '';
            // 从div列表中， 过滤作者信息
            for($i=0; $i<$divList->length && $i<5; $i++) {
                // 找到包含作者信息的div
                if($divList[$i]->hasAttribute('class') && $divList[$i]->getAttribute('class')=='info') {
                    // 解析作者
                    $txtInfo = explode('作者：', $divList[$i]->nodeValue);
                    // 投稿的文昌
                    $txtInfo2 = explode('投稿：', $divList[$i]->nodeValue);
                    if (isset($txtInfo[1])) {
                        $txtInfo = explode(' ',$txtInfo[1]);
                        $_author = $txtInfo[0];
                    } else if (isset($txtInfo2[1]) ) {
                        $txtInfo = explode(' ',$txtInfo2[1]);
                        $_author = $txtInfo[0];
                    }
                    break;
                }
            }
            var_dump($_url, $table,
            array('source_url'=>$_sourceUrl, 'author'=>$_author),
            'id = ' . $_info['id']);
            // 更新文章来源， 作者信息
            Application::model()->update($table,
                                         array('source_url'=>$_sourceUrl, 'author'=>$_author, 'copy_from'=>$_url),
                                         'id = ' . $_info['id']
                                        );
        }
        // 更细标识位置。 下次启动时， 从这个标识位置继续执行
        Application::model()->update('key_value',
                                         array('value'=>$_info['id']),
                                         'varname = "jb51_update_url_author_point"'
                                        );
    }


    if (count($articleList) < $limit) {
        $minArticleId = Application::model()->fetch_one($table, 'id', 'copy_from like "https://m.jb51.net%"', $order);
        if ($minArticleId) {
            // 更细标识位置。 下次启动时， 从这个标识位置继续执行
            Application::model()->update('key_value',
                                         array('value'=>$minArticleId-1),
                                         'varname = "jb51_update_url_author_point"'
                                        );
        }
    }
}

// 记录程序开始时间， 后续统一用这个时间做时间戳转换
defined('APP_START_TIME') OR define('APP_START_TIME', time());
$configInfo = require(dirname(__FILE__) . '/../../config/parseConfig.php');

require_once(ROOT_PATH . 'system/init.php');

error_reporting(E_ALL ^ E_WARNING ^ E_NOTICE ^ E_DEPRECATED);
//error_reporting(E_ALL);

// https 请求的头信息
$curlHeaders = array(
    'Accept'            =>'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    //'Accept-Encoding'   => 'gzip, deflate, br',
    'Accept-Language'   => 'zh-CN,zh;q=0.9',
    'Cache-Control'     => 'max-age=0',
    'Connection'        => 'keep-alive',
    'Cookie'            => 'UM_distinctid=170f2c79cb85ae-0578530ca6cdff-39677b09-fa000-170f2c79cb97c1; __gads=ID=925e3d8578487026:T=1586261911:S=ALNI_MbdlVttyVEsoiE5bpuRcPx66Qmruw; Hm_lvt_5cf7ffaf53f2ae2c09200905ee32a7d5=1586616974; Hm_lpvt_5cf7ffaf53f2ae2c09200905ee32a7d5=1587471057; Hm_lvt_61e8c9d6bc89c4d3f63bf8fb120a404d=1587471095; Hm_lvt_b88cfc1ccab788f0903cac38c894caa3=1587462987,1587463199,1587463265,1587473125; Hm_lpvt_b88cfc1ccab788f0903cac38c894caa3=1587527907; CNZZDATA1254400950=1736576458-1587467687-https%253A%252F%252Fwww.jb51.net%252F%7C1587527905; Hm_lpvt_61e8c9d6bc89c4d3f63bf8fb120a404d=1587530343',
    'Host'              => 'www.jb51.net',
    //'Referer'           => 'https://m.jb51.net/',
    'Sec-Fetch-Dest'    => 'document',
    'Sec-Fetch-Mode'    => 'navigate',
    'Sec-Fetch-Site'    => 'same-origin',
    'Sec-Fetch-User'    => '?1',
    'Upgrade-Insecure-Requests'   => '1',
    'User-Agent'        => 'Mozilla/5.0 (compatible; Baiduspider-render/2.0; +http://www.baidu.com/search/spider.html)'
);

// 执行更新文章来源网址和作者内容
if (isset($argv[1]) && $argv[1]=='updateMobile') {
    syncRefUrlAfterGettingMobilePageData(1800);
    exit;
}


// 设置脚本执行时间间隔不能过于频繁， 否则会被服务器拒绝服务
$refTimeFile = '/tmp/51jb.txt';
$lasttime = @ file_get_contents('/tmp/51jb.txt');
if ((time() - $lasttime) < 1800) exit(0); // 每半小时一次

loadClass('core_config');
$db = loadClass('core_db');
$userId = $configInfo['51jb']['user_id'];
$categoryList = array();
$errorTimes = 0;
$tryTimes =0;
$time404 = 0; // 请求返回404错误的次数


// 有数据操过 65535个字， 导致text字段不能全部存放。 修改成 longtext字段后，更新
// $wrongArticleList = Application::model()->fetch_all('article', 'id < 169244 and length(message) > 60000');
// foreach ($wrongArticleList as $_info) {
//     $lastOneInfo = explode('/', $_info['copy_from']);
//     $lastOneInfo = array_pop($lastOneInfo);
//     $pageId = intval(substr($lastOneInfo, 0, -4));
//     echo $pageId . "\r\n";
// }


$syncKeyName = 'jb51_article_id';
// 获取上次更新到的位置
$pageId = Application::model()->fetch_one('key_value','value', '`varname`="'.$syncKeyName.'"');
if (! $pageId) {
    echo "Get page id failed \r\n";
    exit;
}
for(;$pageId>0; $pageId++) {

    if ($time404 > 15) { // 文章请求页面不存在次数到达之后，不要再运行了
        echo "!!! 404 happened many times!\r\n";
        exit();
    }
    //sleep(rand(2,4)); // 停顿10秒
    // 记录运行的时间
    file_put_contents($refTimeFile, time());
    $isMobileSite = false; // 是否是移动网站获取的内容。 如果是移动网站获取的内容，后面还需要从对应为web网站获取文章的作者和文章来源
    $url = sprintf('https://www.jb51.net/article/%d.htm', $pageId); // 格式化url
    $fakeUrl = $url . getRandomString();
    echo $fakeUrl . "\r\n";
    $curlHeaders['Host'] = 'www.jb51.net';
    $fileContent = curlRequest($url, 'GET', $curlHeaders); // 获取文章内容
    //$fileContent = array('status'=>403);
    //$fileContent = $configInfo['51jb']['test_code'];
    if (is_array($fileContent)) { // http请求获取内容失败。 失败后，从移动网站获取内容
        $url = sprintf('https://m.jb51.net/article/%d.htm', $pageId); // 格式化url
        $fakeUrl = $url . getRandomString();
        echo $fakeUrl . "\r\n";
        $curlHeaders['Host'] = 'm.jb51.net';
        $fileContent = curlRequest($url, 'GET', $curlHeaders);
        //var_dump($fileContent);exit;
        $isMobileSite = true;
    }
    if (is_array($fileContent)) { // 获取文章内容， http请求错误
        if ($fileContent['status']==404) {
            $time404++;
            echo "''''' Status is 404\r\n";
            continue;
        } else if ($fileContent['status']==403) {
            if ($tryTimes++ < 4) {
                $pageId--;
                echo "''''' Try again \r\n";
                continue;
            }
            $tryTimes = 0;
            $fileContent = '';
            continue;
        } else {
            $fileContent = '';
        }
    }
    $tryTimes = 0; // 成功请求， 请请求尝试的次数重置为0
    if (!$fileContent) { // 获取文章失败， 记录错误次数
        echo "##### No content returned\r\n";

        if ($errorTimes++ > 5) {
            exit(0);
        }
        continue;
    }

    $time404 = 0; // 返回了正常内容， 404清0
    //var_dump($fileContent);exit;
    //$fileContent = file_get_contents($fakeUrl); // 获取网页内容
    //header("Content-type:text/html;charset=gb2312");
    //$fileContent = mb_convert_encoding($fileContent, 'utf-8', 'gb2312');
    //$fileContent = str_replace('<meta charset="gb2312" />', '<meta charset="utf-8" />', $fileContent);
    //echo $fileContent;exit;
    if ($isMobileSite) { // 移动网站解析标题方式
        $refUrl = $url;
        // 匹配breadcrumb， 获取文章标题，所属分类
        preg_match_all('/<p class="toolbar white">(.*)?<\/p>/i', $fileContent, $matchList);
    } else {
        // 匹配文章来源， 在js代码中
        preg_match_all('/var ourl\s*=\s*"(.*)"/iU', str_replace(array("\r","\n"), array('', ''), $fileContent), $matchContent);
        $refUrl = (empty($matchContent[1]) || empty($matchContent[1][0])) ? '' : $matchContent[1][0];
        // 匹配breadcrumb， 获取文章标题，所属分类
        preg_match_all('/<div class="breadcrumb">(.*)?<div class="search">/is', $fileContent, $matchList);
    }

    // 检查链接是否已经存在
    if ($refUrl) {
        $syncInfo = Application::model()->fetch_row('article', 'source_url = "' .Application::model()->quote($refUrl).'"');
        // 比较时间，是否已经数据已经同步过了
        if ($syncInfo) {
            echo ' find the existing link: ', $refUrl, '         ---  ',  __LINE__, "\r\n";
            continue;
        }
    }

    if (! isset($matchList[1]) || ! is_array($matchList[1]) || count($matchList[1])==0) {
        if ($errorTimes++ > 5) {
            echo "***** Error reached maximum\r\n";

            // 更新文章作者和来源
            syncRefUrlAfterGettingMobilePageData();
            exit(0);
        }

        echo "!!!!! No title matched\r\n";
        continue;
    }
    $errorTimes = 0; // 重新复位错误计数
    // 拆分 breadcrumb， 获取所属分类信息
    //$categoryInfo = explode('→', $matchList[1][0]);
    $categoryInfo = explode('→', mb_convert_encoding($matchList[1][0], 'utf-8', 'gb2312'));
    //$categoryInfo = explode('→', $matchList[1][0]);
    array_walk($categoryInfo, function(& $value, $key){
        $value = trim(strip_tags($value));
        return $value;
    });
    //var_dump($categoryId, $categoryInfo);exit;
    // 第三项是分类开始项， 没有第三项，继续处理下一页
    if(! isset($categoryInfo[2])) {
        echo "-------- No category matched\r\n";
        //exit(0);
        continue;
    }
    array_shift($categoryInfo);
    array_shift($categoryInfo);
    // 最后一个是文章标题
    $title = array_pop($categoryInfo);
    $categoryId = 0;
    $refCategory = $configInfo['51jb']['categoryList'];
    foreach ($categoryInfo as $_categoryName) {
        if (isset($refCategory[$_categoryName]) && $refCategory[$_categoryName]['_id']) {
            $categoryId = $refCategory[$_categoryName]['_id'];
            $refCategory = $refCategory[$_categoryName];
        }
    }
    //var_dump($categoryId, $categoryInfo);exit;
    // 没有和系统设置的分类信息匹配上的文章，不做处理
    if (! $categoryId) {
        echo "----- No category found\r\n";
        continue;
    }


    //var_dump($categoryInfo, $categoryId);exit;

    // 通过php的dom函数， 过滤文章内容
    $dom = new DOMDocument;
    // 获取文章内容区域
    if ($isMobileSite) {// 移动网站，转换编码， 载入dom
        $fileContent = mb_convert_encoding($fileContent, 'utf-8', 'gb2312');
        $fileContent = str_replace('charset="gb2312"', 'charset="utf-8"', $fileContent);
        $dom->loadHTML($fileContent);
        $elementsSection = $dom->getElementsByTagName('section');
        //var_dump( $elementsSection);
        $elementArticle = $elementsSection[0];
    } else {// web网站，载入dom
        $dom->loadHTML($fileContent);
        $elementArticle = $dom->getElementById('article');
    }
    if(! $elementArticle) {
        $fileContent = mb_convert_encoding($fileContent, 'utf-8', 'gb2312');
        $fileContent = str_replace('charset="gb2312"', 'charset="utf-8"', $fileContent);
        $dom->loadHTML($fileContent);
        // 获取文章内容区域
        //$elementArticle = $dom->getElementById('article');
        if ($isMobileSite) {
            $elementsSection = $dom->getElementsByTagName('section');
            $elementArticle = $elementsSection[0];
        } else {
            $elementArticle = $dom->getElementById('article');
        }
    }
    if(! $elementArticle) {
        $errorTimes++;
        echo "????? No article found\r\n";
        //echo $fileContent, "\r\n\r\n";
        exit;
        continue;
    }
    // 获取文章标题
    $titleElements = $elementArticle->getElementsByTagName('h1');
    $title = trim($titleElements[0]->nodeValue);
    if ($isMobileSite) {
        $elementsSpan = $elementArticle->getElementsByTagName('span');
        // 解析作者
        $author = '-';
        $txtInfo = explode('作者：', $elementsSpan[0]->nodeValue);
        $txtInfo2 = explode('投稿：', $elementsSpan[0]->nodeValue);
        if (isset($txtInfo[1])) {
            $author = $txtInfo[1];
        } else if (isset($txtInfo2[1]) ) {
            $author = $txtInfo2[1];
        }
    } else {
        // 从文章内容区域获取作者名字， 作者名字在 div包含中
        $divList = $elementArticle->getElementsByTagName('div');
        $author = '';
        // 从div列表中， 过滤作者信息
        for($i=0; $i<$divList->length && $i<5; $i++) {
            // 找到包含作者信息的div
            if($divList[$i]->hasAttribute('class') && $divList[$i]->getAttribute('class')=='info') {
                // 解析作者
                $txtInfo = explode('作者：', $divList[$i]->nodeValue);
                $txtInfo2 = explode('投稿：', $elementsSpan[0]->nodeValue);
                if (isset($txtInfo[1])) {
                    $txtInfo = explode(' ',$txtInfo[1]);
                    $author = $txtInfo[0];
                } else if (isset($txtInfo2[1]) ) {
                    $author = $txtInfo2[1];
                }
                break;
            }
        }
    }
    //var_dump($fileContent, $title, $author);exit;
    // 文章主题内容。 将文章主题内容中的 img 和 原生代码部分进行处理
    $elementContent = $dom->getElementById('content');
    $divList = $elementContent->getElementsByTagName('div');
    //var_dump($divList->length);
    $divLength = $divList->length;
    // 去掉多余的尾部内容： div 和 p
    for ($_tmpDivLength = $divLength-1; $_tmpDivLength>=0; $_tmpDivLength--) {
        // 去掉多余的尾部内容： div 和 p
        if ($divList[$_tmpDivLength]->hasAttribute('class') && ($class = $divList[$_tmpDivLength]->getAttribute('class'))
        && strpos($class, 'lbd_bot')!==false) {
            $spanList = $divList[$_tmpDivLength]->getElementsByTagName('span');
            for($i=$spanList->length-1; $i>=0; $i--) {
                $divList[$_tmpDivLength]->removeChild($spanList[$i]);
            }
            try {
                $elementContent->removeChild($divList[$_tmpDivLength]);
            } catch (Exception $e) {
                //$divList[$_tmpDivLength]->nodeValue = '';
                //var_dump($divList[$_tmpDivLength],$divList->length, $divList[$_tmpDivLength]->getAttribute('class'));exit;
                continue;
            }
        }
        // 移除相关文章推荐
        // update icb_article set message = SUBstring(message, 1, locate('<div class="art_xg">', message)-1)  where  id > 170000 and locate('<div class="art_xg">', message) > 1;
        if ($divList[$_tmpDivLength]->hasAttribute('class') && ($class = $divList[$_tmpDivLength]->getAttribute('class'))
        && strpos($class, 'art_xg')!==false) {
            try {
                $elementContent->removeChild($divList[$_tmpDivLength]);
            } catch (Exception $e) {
                //$divList[$_tmpDivLength]->nodeValue = '';
                //var_dump(__LINE__,$e);exit;
                continue;
            }

        }
    }

    // 移除文章尾部多余的内容
    $pList = $elementContent->getElementsByTagName('p');
    $pLength = $pList->length;
    $hasMoreLink = false;
    for ($offset=1; $offset<$pLength; $offset++) {

        if ($pLength && (strpos($pList[$pLength -$offset]->nodeValue, '脚本之家') ||  strpos($pList[$pLength -$offset]->nodeValue, '更多学习资料请关注专题')!==false) ) {
            try {
                $elementContent->removeChild($pList[$pLength - $offset]);
            } catch (Exception $e) {
                continue 2;
            }
            continue;
        }
        // 有多余的链接
        $aElementList = $pList[$pLength -$offset] -> getElementsByTagName('a');
        for($offsetB=$aElementList->length-1; $offsetB>=0; $offsetB--) {
            if ($aElementList[$offsetB]->hasAttribute('href') && strpos($aElementList[$offsetB]->getAttribute('href'), 'jb51')) {
                try {
                    $elementContent->removeChild($pList[$pLength - $offset]);
                } catch (Exception $e) {
                    continue 2;
                }
                $hasMoreLink = true;
                break;
            }
        }
        // 如果存在多余的链接， 可能紧跟着无用的链接介绍文字内容
        if ($hasMoreLink && strpos($pList[$pLength -$offset]->nodeValue, '更多')!==false) {
            try {
                $elementContent->removeChild($pList[$pLength - $offset]);
            } catch (Exception $e) {
                continue 2;
            }
            $hasMoreLink = false;
            continue;
        }

    }
    $attachAccessKey = '';
    // 将图片转换成本站内容
    $imgList = $elementContent->getElementsByTagName('img');
    $imgLength = $imgList->length;
    //echo __LINE__ , "\r\n";
    for($i=$imgLength-1; $i>=0; $i--) {
        $_src = $imgList[$i]->getAttribute('src');
        //echo $_src , "\r\n";
        $tryTimes = 3;
        while($tryTimes-- > 0) {
            if(strpos($_src, '//')===0) {
                $_src = 'https:' . $_src;
            } else if(strpos($_src, '/')===0) {
                $_src = 'https://www.jb51.net' . $_src;
            } else if (strpos($_src, 'http') !==0) {
                $_src = 'https://www.jb51.net/article/' . $_src;
            } else { // 已http开头， 保留路径
                break;
            }
            $_imgData = @ file_get_contents($_src);
            $_srcFileInfo = explode('.', $_src);
            $_extension = array_pop($_srcFileInfo);
            $_extension = substr($_extension, 0, 3);
            // $_tmpFile = tempnam(sys_get_temp_dir(), 'icb_') . substr($_src, strrpos($_src, '.'));
            // $_result = $_imgData!==false && file_put_contents($_tmpFile, $_imgData);
            $_result = false;
            //echo __LINE__, "\r\n";
            if ($_imgData) {
                $attachAccessKey = md5($pageId.'icodebang.com');
                try {
                $_uploadInfo = doUploadAttach('article', $attachAccessKey, '1.'.$_extension, $_imgData);
                //var_dump($_uploadInfo);//exit;
                } catch (Exception $e) {
                    //var_dump($e);
                    throw $e;
                }
                if(is_array($_uploadInfo) && isset($_uploadInfo['url']))  {
                    $imgList[$i]->setAttribute('src', $_uploadInfo['url']);
                    //var_dump($_uploadInfo['url']);
                    $_result = true;
                }
            }
            //echo __LINE__, "\r\n";
            //echo $_tmpFile;
            if ($_result) {
                break;
            }
        }
    }
    //echo __LINE__ , "\r\n";
    // 处理文章中的代码部分， 使用自己网站格式
    $divList = $elementContent->getElementsByTagName('div');
    $divLength = $divList->length;
    $replaceNodeKeys = array();
    try {
        for($i=0; $i<$divLength; $i++) {
            $_class = $divList[$i]->hasAttribute('class') ? $divList[$i]->getAttribute('class') : '';
            if (strpos($_class, 'jb51code') !== false) { // 找到对应的代码区域
                $_preList = $divList[$i]->getElementsByTagName('pre');
                if (! $_preList->length) {
                    continue;
                }
                // 将文章的代码部分， 赋值一份，格式化后放入。 后面再删除文章中原来的部分
                $_class = $_preList[0]->getAttribute('class');
                $_tmpCodeElement = $dom->createElement('code', htmlspecialchars(trim($_preList[0]->nodeValue)) );
                //echo $_preList[0]->nodeValue;
                $_tmpCodeElement->setAttribute('class', $_class);
                $_tmpPreElement = $dom->createElement('pre');
                $_tmpPreElement->appendChild($_tmpCodeElement);
                $elementContent->insertBefore($_tmpPreElement, $divList[$i]);
                array_unshift($replaceNodeKeys, $i);
                    //$elementContent->removeChild($divList[$i]);
                    //$elementContent->replaceChild($_tmpPreElement, $divList[$i]);
            }
        }
        // 删除文章中已被转换后部分
        foreach($replaceNodeKeys as $_index) {
            $elementContent->removeChild($divList[$_index]);
        }
    } catch (Exception $e) {
        continue;
    }

    if ($isMobileSite) {
        $content = trim(substr(trim($dom->saveHTML($elementContent)), 30, -6));
    } else {
        $content = trim(substr(trim($dom->saveHTML($elementContent)), 18, -6));
    }
    //* 替换有问题， 还无法处理
    // 文章里还有关键字样， 放弃这个文章
    if (strpos($content, 'jb51')) {
        echo "===== Find link to be changed \r\n";
    }

    $content = str_replace('[Ctrl+A 全选 注:<a href="//www.jb51.net/article/23421.htm" title="查看具体详情" target="_blank">如需引入外部Js需刷新才能执行</a>]', '', $content);
    $content = preg_replace('/<INPUT onclick="runEx\(\'[0-9a-z]+\'\)" type="button" value="运行代码"\/?> <INPUT onclick="doCopy\(\'[0-9a-z]+\'\)" type="button" value="复制代码"\/?> <INPUT onclick="doSave\(\'?[0-9a-z]+\'?\)" type="button" value="保存代码"\/?>/iu',
    "<INPUT onclick=\"runCode()\" type=\"button\" value=\"运行代码\"/> <INPUT onclick=\"copyCode()\" type=\"button\" value=\"复制代码\"/> <INPUT onclick=\"saveCode()\" type=\"button\" value=\"保存代码\"/>",
    $content);
    //echo $content;exit;
    // */


    // 文章里还有关键字样， 放弃这个文章
    if (strpos($content, 'jb51')) {
        echo "...... Ignore invalid link \r\n";
        continue;
    }

    //echo $content;exit;
    // python下的文章， 如果有tensor字样，变更分类到TensorFlow下
    if ($categoryId == 67 && stripos($title, 'tensor') !== false) {
        $categoryId = 111;// tensorflow分类id
    }

    $content = str_replace(array('<br>', '<br >', '<br/>', '<br />'), "\n \n \n \n", $content);
    $content = trim($content);
    $content = str_replace("\n \n \n \n", '<br/>', $content);
    $moreInfo = array('author'=>$author, 'source_url'=>$refUrl, 'copy_from'=>$url);
    // 存储数据， 生成文章
    $userId = rand(3,10002);
    $articleInfo = doPublishArticle($userId, $title, $content, $categoryId, array(), $attachAccessKey, $moreInfo);
    VAR_DUMP($articleInfo);

    // 更细标识位置。 下次启动时， 从这个标识位置继续执行
    Application::model()->update('key_value',
                                array('value'=>$pageId+1),
                                'varname = "'.$syncKeyName.'"'
                        );
    //EXIT;
}

exit;




$listDir = $configInfo['51jb']['list_dir'];
$articleDir = $configInfo['51jb']['article_dir'];

$dir = dir($listDir);
$listFiles = array();
// 解析分类数据
for ($i=2; $i<274; $i++) {
    $url = sprintf('https://www.jb51.net/list/list_%d_1.htm', $i);
    $fileContent = file_get_contents($url);
    // 文章列表 <DT><span>日期:2018-12-26</span><a href="./article/1111111.htm" title="文章标题" target="_blank">文章标题</a></DT>
    $fileContent = mb_convert_encoding($fileContent, 'utf-8', 'gb2312');
    //preg_match_all('/<div class="breadcrumb">(.*)?<\/div>/isu', $fileContent, $matchList);
    preg_match_all('/<div class="breadcrumb">(.*)?<div class="search">/isu', $fileContent, $matchList);
    //var_dump($filepath, $matchList);exit;
    if (! isset($matchList[1]) || ! is_array($matchList[1])) {
        continue;
    }
    $categoryInfo = explode('>>', $matchList[1][0]);
    array_walk($categoryInfo, function(& $value, $key){
        $value = trim(strip_tags($value));
        return $value;
    });

    if(! isset($categoryInfo[2])) {
        continue;
    }
    $_categoryName = $categoryInfo[2];
    array_shift($categoryInfo);
    array_shift($categoryInfo);

    //$categoryList[] = $categoryInfo;
    if (! isset($categoryList[$categoryInfo[0]])) {
        $categoryList[$categoryInfo[0]] = array('_id'=>'');
    }
    if (isset($categoryInfo[1]) && ! isset($categoryList[$categoryInfo[0]][$categoryInfo[1]]) ) {
        $categoryList[$categoryInfo[0]][$categoryInfo[1]] = array('_id'=>'');
    }
    if (isset($categoryInfo[2]) && ! isset($categoryList[$categoryInfo[0]][$categoryInfo[1]][$categoryInfo[2]]) ) {
        $categoryList[$categoryInfo[0]][$categoryInfo[1]][$categoryInfo[2]] = array('_id'=>'');
    }

    //in_array($_categoryName, $categoryList) OR $categoryList[] = $_categoryName . '=>' . $i . (isset($categoryList[3]) ? $categoryInfo[3]:'');
}

$categoryList = $configInfo['51jb']['categoryList'];
var_export($categoryList);exit;

// 从listDir获取list文件列表
while (false!==($filename=$dir->read())) {
    //Ignore parent- and self-links
    if ($filename=="." || $filename=="..") continue;

    if (substr($filename, -5) !='.html') { // 忽略非html文件
        continue;
    }

    $filepath = $listDir . DIRECTORY_SEPARATOR . $filename;
    if (! is_file($filepath)) { // 忽略目录
        continue;
    }

    $fileContent = file_get_contents($filepath);
    // 文章列表 <DT><span>日期:2018-12-26</span><a href="./article/1111111.htm" title="文章标题" target="_blank">文章标题</a></DT>
    $fileContent = mb_convert_encoding($fileContent, 'utf-8', 'gb2312');
    //preg_match_all('/<div class="breadcrumb">(.*)?<\/div>/isu', $fileContent, $matchList);
    preg_match_all('/<div class="box mb15 mt10">(.*)?<div class="fr w300"><div class="search">/isu', $fileContent, $matchList);
    //var_dump($filepath, $matchList);exit;
    if (! isset($matchList[1]) || ! is_array($matchList[1])) {
        continue;
    }
    $categoryInfo = explode('>>', $matchList[1][0]);
    array_walk($categoryInfo, function(& $value, $key){
        $value = trim(strip_tags($value));
        return $value;
    });

    $i = 3;
    if(! isset($categoryInfo[2])) {
        continue;
    }
    $_categoryName = trim(strip_tags($categoryInfo[2]));
    in_array($_categoryName, $categoryList) OR $categoryList[] = $_categoryName . '=>' . $filename . (isset($categoryList[3]) ? $categoryInfo[3]:'');
    //var_dump($categoryInfo, $_categoryName);exit;
    //continue;
}


$articleFiles = array();
$dir = dir($articleDir);
while (false !== ($filename=$dir->read())) {
    // ignore self and parent link
    if ($filename=="." || $filename=="..") continue;

    $filenameInfo = explode('.', $filename);

    if (!isset($filenameInfo[1]) || $filenameInfo[1] !='html') {
        continue;
    }

    $files[$filenameInfo[0]] = $filename;
}



//var_dump($listFiles);exit;

// 对每一个 list 文件处理
foreach ($listFiles as $_listFilename) {

    $fileContent = file_get_contents($listDir . '/' . $_listFilename);
    // 文章列表 <DT><span>日期:2018-12-26</span><a href="./article/1111111.htm" title="文章标题" target="_blank">文章标题</a></DT>
    $fileContent = mb_convert_encoding($fileContent, 'utf-8', 'gb2312');
    preg_match_all('/<dt>.*<\/dt>/i', $fileContent, $matchList);
if($_listFilename == 'list_97_1.html') {

//    var_dump($_listFilename, $matchList, $fileContent);exit;
}

    if (! $matchList[0]) { // 没有匹配的文章列表
        //echo $listDir . '/' . $_listFilename . " has no article link found! \rq\n";
        continue;
    }

    // 对每个文章链接进行处理。 如果本地已经有文章，直接解析。 如果没有链接， 从网上获取文章内容；
    $articleFileList = array();
    foreach ($matchList[0] as $_linkString) {
        // 匹配文章链接地址
        preg_match_all('/<span>.*<\/span><a href="(.*)" title=".*" target="_blank">.*<\/a>/i', $_linkString, $matchArticleList);
        //var_dump($_listFilename, $matchArticleList[1]);exit;
        if (! $matchArticleList[1]) { // 没有文章匹配
            continue;
        }


        foreach ($matchArticleList[1] as $_linkFile) {
            $_fileInfo = explode('/', $_linkFile);
            $_filename = array_pop($_fileInfo);
            $_filename = rtrim($_filename, 'lL') . 'l';
            $_filepath = $articleDir . '/' . $_filename;
            $_content = '';
            if (! is_file($_filepath)) {
                if (strtolower($_fileInfo[0]) == 'http:' || strtolower($_fileInfo[0]) == 'https:' ) { // 网站链接
                    $_content = file_get_contents($_linkFile);
                }
            } else {
                $_content = file_get_contents($_filepath);
            }

            if (! $_content) {
                continue;
            }
            $_content = mb_convert_encoding($_content, 'utf-8', 'gb2312');
            preg_match_all('/<div class="title">.*<\/div>/iU', str_replace("\r\n", '', $_content), $matchContent);

            if (empty($matchContent[0]) || empty($matchContent[0][0]) ) { // 没找到标题和更新时间
                continue;
            }
            // title
            $_title = substr($matchContent[0][0],
                             strpos($matchContent[0][0], '<h1 class="YaHei">') + strlen('<h1 class="YaHei">'),
                             strpos($matchContent[0][0], '</h1>') - strpos($matchContent[0][0], '<h1 class="YaHei">')- strlen('<h1 class="YaHei">') );
            // 发布日期
            $_date = substr($matchContent[0][0],
                            strpos($matchContent[0][0], '20'),
                            17 );
            $_date = str_replace(array('年','月', '日', ' '), '', $_date);
            // 导航匹配
            // <div class="box mb15 mt10"><i class="icon"></i>您的位置：<a href='/'>首页</a> → <a href="/list/index_1.htm" title="一级分类">一级分类</a> → <a href="/list/list_3_1.htm" title="二级分类">二级分类</a> → <a href="/list/list_23_1.htm" title="三级分类">三级分类</a> → <a href="/list/list_269_1.htm" title="四级分类">四级分类</a> → 正文内容 文章标题</div>
            preg_match_all('/<div class="box mb15 mt10">(.*)<\/div>/iU', str_replace("\r\n", '', $_content), $matchContent);
            // 匹配文章来源 var ourl="http://url  https://url";
            preg_match_all('/var ourl="(.*)"/iU', str_replace("\r\n", '', $_content), $matchContent);
            $_refUrl = (empty($matchContent[1]) || empty($matchContent[1][0])) ? '' : $matchContent[1][0];

            $_content = substr($_content,
                               strpos($_content, '<div id="content">') + strlen('<div id="content">'),
                               strpos($_content, '<div class="art_xg">') - strpos($_content, '<div id="content">') - strlen('<div id="content">'));
            $_content = trim($_content);
            //内容替换
            // <div class="jb51code">
            //  <pre class="brush:bash;">
            $_content = str_replace('<div class="jb51code">', '<pre>', $_content);
            $_content = str_replace("</pre>\r\n</div>", '</code></pre>', $_content);
            $_content = preg_replace('/<pre class="brush:(.*);">/i', '<code class="language-$1"', $_content);
            // 图片获取  <img alt="" src="http://domain/file_images/article/201811/201811190902567.png" />
            preg_match_all('/<img[^>]*src="(.*)".*\/>/i',$_content, $matchContent);
            if (!empty($matchContent[1])) {
                // 保存图片，生成url
                foreach ($matchContent[1] as $_imgUrl) {
                    //$_imgContent = @file_get_contents($_imgUrl);
                    //if(! strlen($_imgContent)) {
                    //    continue;
                    //}
                    $_imgPath = $_date .'/' . uniqid(). substr($_imgUrl, strrpos($_imgUrl,'.'));
                    //@file_put_contents($_imgPath, $_imgContent);
                    //if (! is_file($_imgPath)) {
                    //    continue;
                    //}
                    $_newImgUrl = "/static/upload/" . $_imgPath;

                    $_content = str_replace($_imgUrl, $_newImgUrl, $_content);
                }
            }
            // 其他内容 找 domain

            if($_refUrl) {
            var_dump($_content, $_date, $_title, $_filepath, $_refUrl, $_listFilename);exit;
            }
        }
    }

    // 按照时间排序文章， 将文章存入数据库

    // 导航匹配
    // <div class="box mb15 mt10"><i class="icon"></i>您的位置：<a href='/'>首页</a> → <a href="/list/index_1.htm" title="一级分类">一级分类</a> → <a href="/list/list_3_1.htm" title="二级分类">二级分类</a> → <a href="/list/list_23_1.htm" title="三级分类">三级分类</a> → <a href="/list/list_269_1.htm" title="四级分类">四级分类</a> → 正文内容 文章标题</div>

    foreach ($articleFileList as $_filename) {
        $_articlePath = $articleDir . DIRECTORY_SEPARATOR . $_filename;
    }
    // 匹配文章来源 var ourl="http://url  https://url";


}

var_dump($listFiles);



/* EOF */
