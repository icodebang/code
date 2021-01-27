<?php
/**
 * 根据jb51.net下不同路径获取下面的文章。 可用的路径在配置文件中。
 * 每次运行， 需要修改 $flag， 使$flag在配置文件中存在
 */
// ！！！ 根据配置里面修改
$flag = 'html5';
set_time_limit(0);
$flagfile = '/tmp/51jb_'.$flag.'.txt';
$lasttime = @ file_get_contents($flagfile);
//if ((time() - intval($lasttime)) < 40) exit(0);

// 记录程序开始时间， 后续统一用这个时间做时间戳转换
defined('APP_START_TIME') OR define('APP_START_TIME', time());
$configInfo = require(dirname(__FILE__) . '/../../config/parseConfig.php');

require_once(ROOT_PATH . 'system/init.php');

loadClass('core_config');
$db = loadClass('core_db');
$userId = $configInfo['51jb']['user_id'];

$errorTimes = 0;
$tryTimes =0;

//$pageId = Application::model()->fetch_one('key_value', 'value', "varname='51_html_page'", 'id DESC');
//if(! $pageId)
    $pageId = $configInfo['51jb']['more_page'][$flag]['max'];

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
    'User-Agent'        => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36'
);

$articleLinks = array();
$categoryId = $configInfo['51jb']['more_page'][$flag]['category_id'];
for(;$pageId>0; $pageId--) {
    //sleep(rand(15,40)); // 停顿10秒

    $url = sprintf($configInfo['51jb']['more_page'][$flag]['m_url'], $pageId); // 格式化url
    //echo $url;
    $curlHeaders['Host'] = 'm.jb51.net';
    $fileContent = curlRequest($url, 'GET', $curlHeaders);
    //var_dump($fileContent);exit;
    if (is_array($fileContent)) {
        if ($fileContent['status']==404) {
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
    $tryTimes = 0;
    if (!$fileContent) {
        echo "##### No content returned\r\n";
        if ($errorTimes++ > 5) {
            exit(0);
        }
        continue;
    }
    $fileContent = mb_convert_encoding($fileContent, 'utf-8', 'gb2312');
    preg_match_all('/<ul id="infocon">(.*)?<div id="pages">/isu', $fileContent, $matchContent);
    preg_match_all("/<a href='([^']*)'>/ius", $matchContent[1][0], $matchLinks);
    foreach ($matchLinks[1] as $_link) {
        if (strpos($_link, 'http') !== 0) {
            $_link = 'https://m.jb51.net' . $_link;
        }
        $articleLinks[] = $_link;
    }
}
$linkIndex = 1;
foreach ($articleLinks as $url) {
    echo $linkIndex++, "\r\n";
    $curlHeaders['Host'] = 'm.jb51.net';
    $fileContent = curlRequest($url, 'GET', $curlHeaders);
    if (is_array($fileContent)) {
        if ($fileContent['status']==404) {
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
    $tryTimes = 0;
    if (!$fileContent) {
        echo "##### No content returned\r\n";

        if ($errorTimes++ > 5) {
            exit(0);
        }
        continue;
    }
    $fileContent = mb_convert_encoding($fileContent, 'utf-8', 'gb2312');
        $refUrl = $url;
        // 匹配breadcrumb， 获取文章标题，所属分类
        preg_match_all('/<p class="toolbar white">(.*)?<\/p>/i', $fileContent, $matchList);


    if (! isset($matchList[1]) || ! is_array($matchList[1]) || count($matchList[1])==0) {
        if ($errorTimes++ > 5) {
            echo "***** Error reached maximum\r\n";
            //exit(0);
        }

        echo "!!!!! No title matched\r\n";
        continue;
    }
    $errorTimes = 0; // 重新复位错误计数

    // 通过php的dom函数， 过滤文章内容
    $dom = new DOMDocument;
    // 获取文章内容区域
        $dom->loadHTML($fileContent);
        $elementsSection = $dom->getElementsByTagName('section');
        //var_dump( $elementsSection);
        $elementArticle = $elementsSection[0];

    if(! $elementArticle) {
        $errorTimes++;
        echo "????? No article found\r\n";
        //echo $url, "\r\n";
        //echo $fileContent, "\r\n\r\n";
        //exit;
        continue;
    }
    $titleElements = $elementArticle->getElementsByTagName('h1');
    $title = trim($titleElements[0]->nodeValue);
    $elementsSpan = $elementArticle->getElementsByTagName('div');
        // 解析作者
        $author = '';
        $txtInfo = explode('作者：', $elementsSpan[0]->nodeValue);
        if (isset($txtInfo[1])) {
            $author = trim($txtInfo[1]);
        }
    //var_dump($url, $title, $author);exit;
    // 文章主题内容。 将文章主题内容中的 img 和 原生代码部分进行处理
    $elementContent = $dom->getElementById('content');
    $divList = $elementContent->getElementsByTagName('div');
    //var_dump($divList->length);
    $divLength = $divList->length;
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
            if ($_imgData) {
                $attachAccessKey = md5($pageId.'icodebang.com');
                $_uploadInfo = doUploadAttach('article', $attachAccessKey, '1.'.$_extension, $_imgData);
                //var_dump($_uploadInfo);exit;
                if(is_array($_uploadInfo) && isset($_uploadInfo['url']))  {
                    $imgList[$i]->setAttribute('src', $_uploadInfo['url']);
                    $_result = true;
                }
            }
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

    $content = trim(substr(trim($dom->saveHTML($elementContent)), 30, -6));
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

    $content = str_replace(array('<br>', '<br >', '<br/>', '<br />'), "\n \n \n \n", $content);
    $content = trim($content);
    $content = str_replace("\n \n \n \n", '<br/>', $content);
    $moreInfo = array('author'=>$author, 'source_url'=>$refUrl, 'copy_from'=>$url);
    // 存储数据， 生成文章
    $articleInfo = doPublishArticle($userId, $title, $content, $categoryId, array(), $attachAccessKey, $moreInfo);
    //VAR_DUMP($url, $userId, $title, $content, $categoryId, array(), $attachAccessKey, $moreInfo);
    //EXIT;
}

exit;


/* EOF */
