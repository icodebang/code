<?php
/**
 * 1. 遍历目录， 获取分类目录列表
 * 2. 将分类目录和系统设置的分类做关系映射
 * 3. 读取分类目录下的文章文件， 进行解析：文章前后顺序，根据页面中的上一页和下一页决定前后关系。
 *      page1=>[prev=>page2, next=>page3] . 没有prev的页面为首页，没有next的页面为最后一页
 *      page1_1 => [prev=>page2, next=>page3] . page1子页的上下链接和 page1相同
 *      page2=>[prev=>'', next=>page1]          page2 没有上， 只有下
 *      page3=>[prev=>page1, next=>'']          page3 只有上， 没有下
 *      prev=>[page1, page2]                    用到的上一页 全部列表
 *      next=>[page1, page1_1, page1_2, page3]  用到的下一页 全部列表
 *
 *
 *   A -> B (B1, B2, B3) -> C
 *    上下页找到 ABC，根据C找到B1，B2，B3， 安排在B下面
 * 4. 根据映射关系， 将解析后的数据存入数据库
 */
$startTime = microtime(true);
set_time_limit(0);
// 记录程序开始时间， 后续统一用这个时间做时间戳转换
defined('APP_START_TIME') OR define('APP_START_TIME', time());
$configInfo = require(dirname(__FILE__) . '/../../config/parseConfig.php');

require_once(ROOT_PATH . 'system/init.php');

error_reporting(E_ALL ^ E_WARNING ^ E_NOTICE ^ E_DEPRECATED);
//error_reporting(E_ALL);

loadClass('core_config');
$db = loadClass('core_db');

$curlHeaders = array(
    'authority'        => 'www.runoob.com',
    'method'           => 'GET',
    'path'             => '/html/html-intro.html',
    'scheme'           => 'https',
    'accept'            => 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'accept-language'   => 'zh-CN,zh;q=0.9',
    'cache-control'     => 'max-age=0',
    'connection'        => 'keep-alive',
    'cookie'            => 'SERVERID=3a4d90ce271dac423615bd00bfd9dc97|1588074464|1588074266',
    //'Host'              => 'www.runoob.com',
    'sec-fetch-dest'    => 'document',
    'sec-fetch-mode'    => 'navigate',
    'sec-fetch-site'    => 'same-origin',
    'sec-fetch-user'    => '?1',
    'upgrade-insecure-requests'   => '1',
    'user-agent'        => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36'
);

$listDir = '/Users/zhoumingxia/git/sites/www.runoob.com';
$baseUrl = 'https://www.runoob.com';
$articleDir = 'foundation';
$dirCategoryMap = array (
    'ado' => '',
    'ajax' => '39',
    'android' => '80',
    'angularjs' => '30',
    'angularjs2' => '30',
    'api' => '',
    'appml' => '',
    'asp' => '20',
    'aspnet' => '20',
    'bootstrap' => '96',
    'bootstrap4' => '96',
    'browsers' => '',
    'charsets' => '',
    'cplusplus' => '105',
    'cprogramming' => '104',
    'csharp' => '65',
    'css' => '34',
    'css3' => '34',
    'cssref' => '34',
    'design-pattern' => '94',
    'django' => '95',
    'docker' => '52',
    'dom' => '37',
    'dtd' => '',
    'eclipse' => '',
    'firebug' => '',
    'font-awesome' => '97',
    'foundation' => '96',
    'git' => '102',
    'go' => '86',
    'googleAPI' => '',
    'googleapi' => '',
    'highcharts' => '',
    'hosting' => '',
    'html' => '35',
    'htmldom' => '37',
    'http' => '',
    'ionic' => '109',
    'ios' => '81',
    'java' => '63',
    'jeasyui' => '25',
    'jquery' => '25',
    'jquerymobile' => '25',
    'jqueryui' => '25',
    'js' => '21',
    'json' => '27',
    'jsp' => '64',
    'jsref' => '21',
    'kotlin' => '92',
    'linux' => '45',
    'lua' => '85',
    'manual' => '',
    'maven' => '63',
    'media' => '',
    'Memcached' => '98',
    'mongodb' => '82',
    'mysql' => '70',
    'nodejs' => '38',
    'note' => '',
    'numpy' => '67',
    'perl' => '72',
    'php' => '41',
    'python' => '67',
    'python3' => '67',
    'quality' => '',
    'quiz' => '',
    'rdf' => '',
    'react' => '99',
    'redis' => '83',
    'regexp' => '40',
    'rss' => '43',
    'ruby' => '76',
    'scala' => '88',
    'schema' => '43',
    'servlet' => '',
    'soap' => '43',
    'sql' => '68',
    'sqlite' => '78',
    'svg' => '35',
    'svn' => '102',
    'swift' => '84',
    'tags' => '35',
    'typescript' => '103',
    'tcpip' => '',
    'vbscript' => '',
    'video' => '',
    'vue2' => '32',
    'w3c' => '',
    'w3cnote' => '',
    'w3cnote_genre' => '',
    'web' => '',
    'webservices' => '',
    'wsdl' => '',
    'xlink' => '',
    'xml' => '43',
    'xpath' => '43',
    'xquery' => '43',
    'xsl' => '43',
    'xslfo' => '43',
  );
$dir = dir($listDir);
$doLoadImgFlag = true; // 开关-是否获取内容中的图片

// $list = Application::model()->fetch_all('course_runoob', 'id>=13399');
// foreach ($list as $_itemInfo) {
//     $_info = explode('/', $_itemInfo['url']);
//     $_file = array_pop($_info);
//     if(strpos($_file, '?')) {
//         $_file = explode('=', $_file);
//         $_file = array_pop($_file);
//         $_file .= '.html';
//     }

//     $content = file_get_contents($_itemInfo['url']);
//     file_put_contents('/Users/zhoumingxia/git/code/www/uploads/course/course_files/'.$_file, $content);
// }
// exit;
//*
// 遍历目录， 解析每个目录下的文件， 根据文件中的 上一页，下一页的关系确定教程顺序
//   A -> B (B1, B2, B3) -> C
// 上下页找到 ABC，根据C找到B1，B2，B3， 安排在B下面
$debugFlag = array('start'=>false, 'end'=>false);
$debugFolder = 'ionic';
while (false!==($dirname=$dir->read())) {
    // 随机使用内部用户作为发布文章作者
    $userId = rand(3,10002);
    //Ignore parent- and self-links
    if ($dirname=="." || $dirname=="..") continue;

    $filepath = $listDir . DIRECTORY_SEPARATOR . $dirname;
    if (! is_dir($filepath)) continue; // 不是目录， 继续处理下一个文件

    if (! isset($dirCategoryMap[$dirname])) continue; // 不是需要处理的目录

    if (empty($dirCategoryMap[$dirname])) { // 不是我们需要的目录。 我们网站和这个目录没有对应关系
        continue;
    }
    $debugFlag['start'] = $debugFlag['start']===true ? true : ($debugFlag['start']===false && $dirname==$debugFolder);
    $debugFlag['end']   = $debugFlag['start']===true && $dirname!=$debugFolder;
    if ($debugFolder && $debugFolder != $dirname)
        continue;
    var_dump($dirname);

    if ($debugFlag['start']===true && $debugFlag['end']===true) {
        //var_dump($prevList, $nextList, $tableName, $chapterList);
        //var_export($linkList);
        for($i=0;$i<count($chapterList); $i++) {
            echo $chapterList[$i]['title'];
            // 只有章节标题，没有链接
            if(! isset($chapterList[$i]['link'])) {
                echo "\r\n";
                continue;
            }
            echo " ---", $chapterList[$i]['link'], "-\r\n";
            if (! isset($childrenList[$chapterList[$i]['link']])) {
                continue;
            }

            sort($childrenList[$chapterList[$i]['link']]);
            foreach ($childrenList[$chapterList[$i]['link']]  as $_linkInfo) {
                echo '   |---' , $_linkInfo['link'], ':', $_linkInfo['title'], "\r\n";
            }
            continue;
            // 文章在左侧目录，不需要找子集
            $tmpNextLink = null;
            if (isset($chapterList[$i+1],$chapterList[$i+1]['link']) ) {
                $tmpNextLink = $linkList[$chapterList[$i+1]['link']];
            }
            // 下一页的文章不在左侧目录, 则下一页是当前页面的子集
            $tmpLink = $chapterList[$i]['link'];
            while($tmpLink && isset($linkList[$tmpLink], $linkList[$tmpLink]['next']) ) {
                if ($linkList[$tmpLink]['next']['link'] == $tmpNextLink) {
                    break;
                }
                echo '   |---' , $linkList[$tmpLink]['next']['link'], "\r\n";
                $tmpLink = $linkList[$tmpLink]['next']['link'];
            }
        }
        exit;
    }

    $categoryId = $dirCategoryMap[$dirname]; // 对应的分类id


    // 添加分类下的教程
    $tableId = Application::model()->fetch_one('course_table','id', '`title`="'.$dirname.'" AND category_id='.$categoryId);
    if (! $tableId) {
        $tableId = Application::model()->insert('course_table', array('title'=>$dirname, 'category_id'=>$categoryId));
    }

    $prevList = array(); // 上一页 列表
    $nextList = array(); // 下一页列表
    $linkList = array(); // 每个页面的上下关系
    $childrenList = array(); // 下级关系
    $fileCourseIdMaps = array(); // 文章和教程id关系

    $dirArticle = dir($filepath);
    // 遍历目录
    while (($debugFlag['start']===false || $debugFlag['end'] === false)
            && false!==($filename=$dirArticle->read())) {
        //Ignore parent- and self-links
        if ($filename=="." || $filename=="..") continue;

        $articleFilepath = $filepath . DIRECTORY_SEPARATOR . $filename;

        if (! is_file($articleFilepath)) continue; // 不是文件， 无需处理
        $realFilename = $filename;
        if (substr($filename, -5)!='.html') { // 不是 html文件， 不做处理
            continue;
        }

        $linkList[$filename] = array();

        $fileContent = file_get_contents($articleFilepath);
        $dom = new DOMDocument();
        $dom->loadHTML($fileContent);
        $divList = $dom->getElementsByTagName('div');
        $prevLink = $nextLink = '';
        $prevText = $nextText = '';
        $tableName = '';
        foreach ($divList as $_divElement) {
            if (! $_divElement->hasAttribute('class')) {
                continue;
            }

            if ('previous-design-link'==$_divElement->getAttribute('class')) { // 上文链接
                $aElements = $_divElement->getElementsByTagName('a');
                if ($aElements->length) {
                    $prevText = trim($_divElement->nodeValue);
                    $prevLink = $aElements[0]->getAttribute('href');
                    if ($prevLink) {
                        $prevLinkInfo = explode('/', trim($prevLink, './') );
                        $prevLink = array_pop($prevLinkInfo);
                        if(!is_file($filepath . DIRECTORY_SEPARATOR . $prevLink) && $prevLinkInfo) {
                            $prevLink = array_pop($prevLinkInfo) . '/' . $prevLink;
                        }
                        isset($prevList[$prevLink]) OR $prevList[$prevLink] = array();
                        $prevList[$prevLink][$filename] = $prevText;

                        $linkList[$filename]['prev'] = array('title'=>$prevText, 'link'=>$prevLink);
                    }
                }
                //echo $dom->saveHTML($_divElement);
            } else if ('next-design-link'==$_divElement->getAttribute('class')) { // 下文链接
                $aElements = $_divElement->getElementsByTagName('a');
                if ($aElements->length) {
                    $nextText = trim($_divElement->nodeValue);
                    $nextLink = $aElements[0]->getAttribute('href');
                    if ($nextLink) {
                        $nextLinkInfo = explode('/', trim($nextLink, './') );
                        $nextLink = array_pop($nextLinkInfo);
                        if(!is_file($filepath . DIRECTORY_SEPARATOR . $nextLink) && $nextLinkInfo) {
                            $nextLink = array_pop($nextLinkInfo) . '/' . $nextLink;
                        }
                        //isset($nextList[$nextLink]) OR $nextList[$nextLink] = array();
                        //$nextList[$nextLink][$filename] = $nextText;
                        $nextList[$nextLink] = $nextText;

                        $linkList[$filename]['next'] = array('title'=>$nextText, 'link'=>$nextLink);
                    }
                }
                //echo $dom->saveHTML($_divElement);
            } else if ('tab'==$_divElement->getAttribute('class')) { // 教程标题
                //echo $dom->saveHTML($_divElement);
                $tableName = trim($_divElement->nodeValue);
            }
        }
        // 从左侧菜单解析章节列表
        $chapterList = array();
        $chapterElements = $dom->getElementById('leftcolumn')->childNodes;
        foreach ($chapterElements as $_chapterElement) {
            if ($_chapterElement->nodeName == 'a') { // 章节链接
                $link = $_chapterElement->getAttribute('href');
                $linkInfo = explode('/', trim($link, './') );
                $link = array_pop($linkInfo);
                if(!is_file($filepath . DIRECTORY_SEPARATOR . $link) && $linkInfo) {
                // 链接到了外面的文章
                    $link = array_pop($linkInfo) . '/' . $link;
                }
                $chapterList[] = array('link'=>$link,'title'=>trim($_chapterElement->nodeValue));
            } else if ($_chapterElement->nodeName == 'h2') { // 章节分割
                $chapterList[] = array('title'=>trim($_chapterElement->nodeValue));

            } else {
                //$chapterList[] = $_chapterElement->nodeName;
            }
        }
        // 获取文章内容部分
        $elementContent = $dom->getElementById('content');
        if (is_null($elementContent)) {
            continue;
        }

        // 获取标题
        $elements = $elementContent->getElementsByTagName('h1');
        $title = $elements->length>0 ? $elements[0]->nodeValue : substr($filename, 0, -5);
        $elements->length>0 AND $elementContent->removeChild($elements[0]);

        // 解析文章中链接到父级链接， 然后确定当前文章所属的父级。
        $elementImgs = $elementContent->getElementsByTagName('img');
        for($imgIndex=$elementImgs->length-1; $imgIndex>=0; $imgIndex--) {
            if ($elementImgs[$imgIndex]->hasAttribute('class')
              && $elementImgs[$imgIndex]->getAttribute('class')=='navup') {
                $elementImgs[$imgIndex]->setAttribute('src', 'http://www.icodebang.cn/static/common/course/goup.gif');
                $parentLinkNode = $elementImgs[$imgIndex]->parentNode;
                if ($parentLinkNode->nodeName != 'a') {
                    $elementAs = $elementImgs[$imgIndex]->parentNode->getElementsByTagName('a');
                    $parentLinkNode = $elementAs[0];
                }
                $parentLink = $parentLinkNode->getAttribute('href');
                $parentLinkNode->setAttribute('class', 'icb-go-up');
                if($elementImgs[$imgIndex]->hasAttribute('alt')) {
                    $parentLinkNode->setAttribute('alt', $elementImgs[$imgIndex]->getAttribute('alt'));
                }
                isset($childrenList[$parentLink]) OR $childrenList[$parentLink] = array();
                $childrenList[$parentLink][$filename] = array('link'=>$filename, 'title'=>$title);
                //echo '-parent:', $parentLink, ":-";
                if (! $parentLink) {
                    echo $filename, '   -- line ', __LINE__, "\r\n";
                    exit;
                }

                //echo "\r\n";
            }
            $href = $elementImgs[$imgIndex]->getAttribute('src');
            $hrefInfo = explode('/images/', $href);
            if (trim($hrefInfo[0], '/')=='' ||  trim($hrefInfo[0], '/')=='https://www.runoob.com') {
                if (strpos($href, 'https://www.runoob.com')===false) {
                    $href = 'https://www.runoob.com/' . $href;
                }
                $imgContent = file_get_contents($href);
                file_put_contents('/Users/zhoumingxia/git/code/www/static/common/course/'.$hrefInfo[1], $imgContent);
                $elementImgs[$imgIndex]->setAttribute('src', 'http://www.icodebang.cn/static/common/course/'.$hrefInfo[1]);

            }
        }

        // continue;
        $attachAccessKey = '';
        // 将图片转换成本站内容
        $imgList = $elementContent->getElementsByTagName('img');
        $imgLength = $imgList->length;
        //echo __LINE__ , "\r\n";
        //*
        for($i=$imgLength-1; $doLoadImgFlag && $i>=0; $i--) {
            $_src = $imgList[$i]->getAttribute('src');
            //echo $_src , "\r\n";
            $tryTimes = 3;
            while($tryTimes-- > 0) {
                if ( (strpos($_src, 'http://')===0 || strpos($_src, 'https://')===0) && strpos($_src, 'runoob')) {
                } else if(strpos($_src, '//')===0) {
                    $_src = 'https:' . $_src;
                } else if(strpos($_src, '/')===0) {
                    $_src = 'https://www.runoob.com' . $_src;
                } else if (strpos($_src, 'http') !==0) {
                    $_src = 'https://www.runoob.com/'.$dirname.'/' . $_src;
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
                    $attachAccessKey = md5($filename.'icodebang.com');
                    try {
                    $_uploadInfo = doUploadAttach('course', $attachAccessKey, '1.'.$_extension, $_imgData);
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
        //*/
        //echo __LINE__ , "\r\n";
        // 处理文章中的代码部分， 使用自己网站格式
        $divList = $elementContent->getElementsByTagName('pre');
        $divLength = $divList->length;
        try {
            for($i=$divLength-1;$i>=0; $i--) {
                $_tmpCodeElement = $dom->createElement('code', htmlspecialchars(trim($divList[$i]->nodeValue)) );
                $divList[$i]->nodeValue = '';
                //echo $filepath.'/'.$filename, __LINE__, "\r\n";
                $divList[$i]->appendChild($_tmpCodeElement);
            }
        } catch (Exception $e) {
            continue;
        }
        $divList = $elementContent->getElementsByTagName('div');
        $divLength = $divList->length;
        $replaceNodeKeys = array();
        try {
            for($i=$divLength-1; $i>=0; $i--) {
                $_class = $divList[$i]->hasAttribute('class') ? $divList[$i]->getAttribute('class') : '';
                // 包含图片的代码区域， 不做处理
                $imgList = $divList[$i]->getElementsByTagName('img');
                if ($imgList->length) {
                    continue;
                }
                if (strpos($_class, 'example_code') !== false) { // 找到对应的代码区域

                    $spanList = $divList[$i]->getElementsByTagName('span');
                    if ($spanList->length==0) { // 里面没有代码高亮
                        continue;
                    }
                    $brElements = $divList[$i]->getElementsByTagName('br');
                    for($brIndex=$brElements->length-1; $brIndex>=0; $brIndex--) {
                        $_tmpElement = $dom->createElement('p', "\r\n");
                        $divList[$i]->insertBefore($_tmpElement, $brElements[$brIndex]);
                    }
                }
            }
            // 删除文章中已被转换后部分
            // foreach($replaceNodeKeys as $_index) {
            //     $elementContent->removeChild($divList[$_index]);
            // }
        } catch (Exception $e) {
            continue;
        }
        $divList = $elementContent->getElementsByTagName('div');
        $divLength = $divList->length;
        $replaceNodeKeys = array();
        try {
            for($i=$divLength-1; $i>=0; $i--) {
                $_class = $divList[$i]->hasAttribute('class') ? $divList[$i]->getAttribute('class') : '';
                // 包含图片的代码区域， 不做处理
                $imgList = $divList[$i]->getElementsByTagName('img');
                if ($imgList->length) {
                    $divList[$i]->removeAttribute('class');
                    continue;
                }
                if (strpos($_class, 'example_code') !== false) { // 找到对应的代码区域
                    $imgList = $divList[$i]->getElementsByTagName('img');
                    if ($imgList->length>0) { // 里面有图片
                        $_class .= ' code-has-img';
                    }
                    $spanList = $divList[$i]->getElementsByTagName('span');
                    if ($spanList->length==0) { // 里面没有代码高亮
                        $divList[$i]->setAttribute('class', str_replace('example_code','',$_class) . ' sample-code-container');
                        continue;
                    }
                    $divList[$i]->setAttribute('class', str_replace('example_code','',$_class) . ' code-container');
                    $_tmpPreElement  = $dom->createElement('pre');
                    $_tmpCodeElement = $dom->createElement('code', htmlspecialchars( trim($divList[$i]->nodeValue) ));
                    $_tmpPreElement->appendChild($_tmpCodeElement);
                    $divList[$i]->nodeValue = '';
                    $divList[$i]->appendChild($_tmpPreElement);
                    //$elementContent->insertBefore($_tmpPreElement, $divList[$i]);
                    //array_unshift($replaceNodeKeys, $i);
                }
            }
            // 删除文章中已被转换后部分
            // foreach($replaceNodeKeys as $_index) {
            //     $elementContent->removeChild($divList[$_index]);
            // }
        } catch (Exception $e) {
            continue;
        }

        // 去除table的class
        $tableElements = $elementContent->getElementsByTagName('table');
        foreach ($tableElements as $_tableElement) {
            $_tableElement->setAttribute('class', 'table-content');
        }
        // 处理链接地址， 将 - 替换 _
        $aElements = $elementContent->getElementsByTagName('a');
        foreach ($aElements as $_aElement) {
            //  运行实例 按钮链接处理。 先把链接地址保存下来， 后续将链接地址内容做抓去
            if ($_aElement->hasAttribute('class') && in_array($_aElement->getAttribute('class'), array('tryitbtn', 'showbtn') ) ) {
                $_aElement->setAttribute('class', 'btn_runcode'); // 替换class
                $href = $_aElement->getAttribute('href');
                // 保存链接地址
                Application::model()->insert('course_runoob', array('url'=>$href, 'page'=>$dirname.'/'.$filename));
                // 替换链接地址
                $href = explode('=', $href, 2);
                $href = '/go/runcode.php?f=' . $href[1] . '&c='.$dirname;
                $_aElement->setAttribute('href', $href);
                if ($_aElement->hasAttribute('rel')) {
                    $_aElement->removeAttribute('rel');
                }
                continue;
            }
            if ($_aElement->hasAttribute('class') && in_array($_aElement->getAttribute('class'), array('playitbtn') ) ) {
                $_aElement->setAttribute('class', 'btn_runcheck'); // 替换class
                $href = $_aElement->getAttribute('href');
                // 保存链接地址
                Application::model()->insert('course_runoob', array('url'=>$href, 'page'=>$dirname.'/'.$filename));
                // 替换链接地址
                $href = explode('=', $href, 2);
                $href = '/go/runcheck.php?f=' . $href[1] . '&c='.$dirname;
                $_aElement->setAttribute('href', $href);
                if ($_aElement->hasAttribute('rel')) {
                    $_aElement->removeAttribute('rel');
                }
                continue;
            }

            $href = $_aElement->getAttribute('href');

            if (strpos($href, '/try/')!==false ) {
                // 保存链接地址
                Application::model()->insert('course_runoob', array('url'=>$href, 'page'=>$dirname.'/'.$filename));
                // 替换链接地址
                $href = explode('/try/', $href, 2);
                $href = '/go/' . $href[1];
                $_aElement->setAttribute('href', $href);
                continue;
            }
            if (strpos($href, '//')!==false) {
                continue;
            }
            if (preg_match('/[0-9_a-z]/', $href[0])) {
                $href = './' . $href;
            }
            $href = str_replace('-', '_', $href);
            $_aElement->setAttribute('href', $href);
        }

        // 生成html， 去掉前后的div标签
        $content = trim(substr($dom->saveHTML($elementContent), strlen('<div class="article-intro" id="content">'), -6));
        if (substr($content, 0, 4)=='<hr>') {
            $content = substr($content, 4);
        }
        $content = str_replace(
                     array('Runoob','RUNOOB', 'runoob', 'runnoob', '菜鸟', ' class="example"', ' class="example_code"', ' class="code notranslate"'),
                     array('iCodebang','iCodeBang','icodebang', 'icodebang', '本站', ' class="code-sample"', ' class="sample-code"', ' class="code no-line-num"'),
                     $content);

        /*
        $content = str_replace('[Ctrl+A 全选 注:<a href="//www.jb51.net/article/23421.htm" title="查看具体详情" target="_blank">如需引入外部Js需刷新才能执行</a>]', '', $content);
        $content = preg_replace('/<INPUT onclick="runEx\(\'[0-9a-z]+\'\)" type="button" value="运行代码"\/?> <INPUT onclick="doCopy\(\'[0-9a-z]+\'\)" type="button" value="复制代码"\/?> <INPUT onclick="doSave\(\'?[0-9a-z]+\'?\)" type="button" value="保存代码"\/?>/iu',
        "<INPUT onclick=\"runCode()\" type=\"button\" value=\"运行代码\"/> <INPUT onclick=\"copyCode()\" type=\"button\" value=\"复制代码\"/> <INPUT onclick=\"saveCode()\" type=\"button\" value=\"保存代码\"/>",
        $content);
        //echo $content;exit;
        // */


        // // 生成教程文章
        $content = trim(preg_replace('/<!--[^\!\[]*?(?<!\/\/)-->/u' , '' , $content));
        $content = str_replace(array('<br>', '<br >', '<br/>', '<br />'), "\n \n \n \n", $content);
        $content = trim($content);
        $content = str_replace("\n \n \n \n", '<br/>', $content);
        $content = str_replace(array("\n\n", "\r\n\r\n"), "\n", $content);
        $data = array();
        $data['title'] = $title;
        $data['title2'] = '';
        $data['url_token'] = str_replace('-', '_', substr($filename, 0, -5));
        $data['content'] = $content;
        $data['meta_keyword'] = '';
        $data['category_id'] = $categoryId;
        //$data['table_id'] = $tableId;
        $data['tag_names'] = array();
        $data['uid'] = $userId;
        $data['banner_id'] = null;
        $data['pic'] = null;
        $data['attach_ids'] = $attachAccessKey=='' ? null : array(1);


        $courseId = Application::model('course')->add($data);
        if ($attachAccessKey) {
            Application::model('publish')->update_attach('course', $courseId, $attachAccessKey);
        }

        $fileCourseIdMaps[$filename] = array('id'=>$courseId, 'title'=>$title);
        //var_dump($data,$fileCourseIdMaps);exit;

    }
    $sortIndex = 1;
    for($indexChapter=0; $indexChapter<count($chapterList); $indexChapter++) {

        $title = $chapterList[$indexChapter]['title'];

        $data = array('table_id'    => $tableId,
                      'from_type'   => '',
                      'category_id' => $categoryId,
                      'parent_id'   => 0,
                      'sort'        => $sortIndex++,
                      'title'       => $title,
                    );
        // 只有章节标题，没有链接
        if(! isset($chapterList[$indexChapter]['link'])) { // 作为章节出现
            $data['from_type'] = 'chapter';
            $data['article_id']  = 0;
        } else if (strpos($chapterList[$indexChapter]['link'], '/')) { // 作为外链出现

            $data['from_type'] = 'link';
            // 目录如果和当前目录具有相同的
            $tmpLinkInfo = explode('/', $chapterList[$indexChapter]['link']);
            // 对应到的目录，不是待处理的目录， 将对应的链接和文件内容，平移过来
            if (! empty($dirCategoryMap[$tmpLinkInfo[0]]) ) {

                $data['article_id']  = 0;
                if ($dirCategoryMap[$tmpLinkInfo[0]] == $dirCategoryMap[$dirname]) {
                    $data['link']        = $tmpLinkInfo[1];
                } else {
                    $categoryName = Application::model()->fetch_one('category','title', '`id`="'.$dirCategoryMap[$tmpLinkInfo[0]].'"');
                    $data['link']        = '../' . $categoryName . '/' . $tmpLinkInfo[1];
                }

            // 链接到的目录， 也会放入当前分类，做为外链教程
            } else
               //if ($dirCategoryMap[$tmpLinkInfo[0]] == $dirCategoryMap[$dirname])
               {
                $outLink = $listDir . '/' . $chapterList[$indexChapter]['link'];
                if (! is_file($outLink)) {
                    continue;
                }
                $dom1 = new DOMDocument();

                $dom1->loadHTML(file_get_contents($outLink));
                $divList = $dom1->getElementsByTagName('div');
                foreach($divList as $_divElement) {
                    if ($_divElement->hasAttribute('class') && $_divElement->getAttribute('class')=='article-intro') {
                        $elementContent = $_divElement;
                        break;
                    }
                }

                // 获取标题
                $elements = $elementContent->getElementsByTagName('h1');
                $title = $elements->length>0 ? $elements[0]->nodeValue : $chapterList[$indexChapter]['title'];
                //echo $outLink, __LINE__, "\r\n";
                $elements->length>0 AND $elements[0]->parentNode->removeChild($elements[0]);

                $attachAccessKey = '';
                // 将图片转换成本站内容
                $imgList = $elementContent->getElementsByTagName('img');
                $imgLength = $imgList->length;
                //echo __LINE__ , "\r\n";
                //*
                for($i=$imgLength-1; $doLoadImgFlag && $i>=0; $i--) {
                    $_src = $imgList[$i]->getAttribute('src');
                    //echo $_src , "\r\n";
                    $tryTimes = 3;
                    while($tryTimes-- > 0) {
                        if ( (strpos($_src, 'http://')===0 || strpos($_src, 'https://')===0) && strpos($_src, 'runoob')) {
                        } else if(strpos($_src, '//')===0) {
                            $_src = 'https:' . $_src;
                        } else if(strpos($_src, '/')===0) {
                            $_src = 'https://www.runoob.com' . $_src;
                        } else if (strpos($_src, 'http') !==0) {
                            $_src = 'https://www.runoob.com/'.$dirname.'/' . $_src;
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
                            $attachAccessKey = md5($chapterList[$indexChapter]['link'].'icodebang.com');
                            try {
                            $_uploadInfo = doUploadAttach('course', $attachAccessKey, '1.'.$_extension, $_imgData);
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
                //*/
                //echo __LINE__ , "\r\n";
                // 处理文章中的代码部分， 使用自己网站格式
                $divList = $elementContent->getElementsByTagName('pre');
                $divLength = $divList->length;
                try {
                    for($i=$divLength-1; $i>=0; $i--) {
                            $_tmpCodeElement = $dom1->createElement('code', htmlspecialchars( trim($divList[$i]->nodeValue) ) );
                            $divList[$i]->nodeValue = '';
                            $divList[$i]->appendChild($_tmpCodeElement);
                    }
                } catch (Exception $e) {
                    continue;
                }

                $divList = $elementContent->getElementsByTagName('div');
                $divLength = $divList->length;
                $replaceNodeKeys = array();
                try {
                    for($i=$divLength-1; $i>=0; $i--) {
                        $_class = $divList[$i]->hasAttribute('class') ? $divList[$i]->getAttribute('class') : '';
                        // 包含图片的代码区域， 不做处理
                        $imgList = $divList[$i]->getElementsByTagName('img');
                        if ($imgList->length) {
                            continue;
                        }
                        if (strpos($_class, 'example_code') !== false) { // 找到对应的代码区域
                            $brElements = $divList[$i]->getElementsByTagName('br');
                            for($brIndex=$brElements->length-1; $brIndex>=0; $brIndex--) {
                                echo $outLink , __LINE__, "=========\r\n";
                                $_tmpElement = $dom->createElement('p', "\r\n");
                                $divList[$i]->insertBefore($_tmpElement, $brElements[$brIndex]);
                            }
                        }
                    }
                } catch (Exception $e) {
                    continue;
                }

                $divList = $elementContent->getElementsByTagName('div');
                $divLength = $divList->length;
                $replaceNodeKeys = array();
                try {
                    for($i=$divLength-1;$i>=0; $i--) {
                        $_class = $divList[$i]->hasAttribute('class') ? $divList[$i]->getAttribute('class') : '';
                        if (strpos($_class, 'example_code') !== false) { // 找到对应的代码区域
                            $imgList = $divList[$i]->getElementsByTagName('img');
                            if ($spanList->length>0) { // 里面有图片
                                $_class .= ' code-has-img';
                            }
                            $spanList = $divList[$i]->getElementsByTagName('span');
                            if ($spanList->length==0) { // 里面没有代码高亮
                                $divList[$i]->setAttribute('class', str_replace('example_code','',$_class) . ' sample-code-container');
                                continue;
                            }
                            $divList[$i]->setAttribute('class', str_replace('example_code','',$_class) . ' code-container');
                            $_tmpPreElement  = $dom->createElement('pre');
                            $_tmpCodeElement = $dom->createElement('code', htmlspecialchars( trim($divList[$i]->nodeValue) ) );
                            $_tmpPreElement->appendChild($_tmpCodeElement);
                            $divList[$i]->nodeValue = '';
                            $divList[$i]->appendChild($_tmpPreElement);
                        }
                    }
                } catch (Exception $e) {
                    continue;
                }

                // 去除table的class
                $tableElements = $elementContent->getElementsByTagName('table');
                foreach ($tableElements as $_tableElement) {
                    if ($_tableElement->hasAttribute('class') ) {
                        $_tableElement->removeAttribute('class');
                    }
                }
                // 处理链接地址， 将 - 替换 _
                $aElements = $elementContent->getElementsByTagName('a');
                foreach ($aElements as $_aElement) {
                    //  运行实例 按钮链接处理。 先把链接地址保存下来， 后续将链接地址内容做抓去
                    if ($_aElement->hasAttribute('class') && in_array($_aElement->getAttribute('class'), array('tryitbtn', 'showbtn') ) ) {
                        $_aElement->setAttribute('class', 'btn_runcode'); // 替换class
                        $href = $_aElement->getAttribute('href');
                        // 保存链接地址
                        Application::model()->insert('course_runoob', array('url'=>$href, 'page'=>$chapterList[$indexChapter]['link']));
                        // 替换链接地址
                        $href = explode('=', $href, 2);
                        $href = '/go/runcode.php?f=' . $href[1]. '&c='.$dirname;
                        $_aElement->setAttribute('href', $href);
                        if ($_aElement->hasAttribute('rel')) {
                            $_aElement->removeAttribute('rel');
                        }
                        continue;
                    }
                    if ($_aElement->hasAttribute('class') && in_array($_aElement->getAttribute('class'), array('playitbtn') ) ) {
                        $_aElement->setAttribute('class', 'btn_runcheck'); // 替换class
                        $href = $_aElement->getAttribute('href');
                        // 保存链接地址
                        Application::model()->insert('course_runoob', array('url'=>$href, 'page'=>$chapterList[$indexChapter]['link']));
                        // 替换链接地址
                        $href = explode('=', $href, 2);
                        $href = '/go/runcheck.php?f=' . $href[1] . '&c='.$dirname;
                        $_aElement->setAttribute('href', $href);
                        if ($_aElement->hasAttribute('rel')) {
                            $_aElement->removeAttribute('rel');
                        }
                        continue;
                    }
                    $href = $_aElement->getAttribute('href');

                    if (strpos($href, '/try/')!==false ) {
                        // 保存链接地址
                        Application::model()->insert('course_runoob', array('url'=>$href, 'page'=>$chapterList[$indexChapter]['link']));
                        // 替换链接地址
                        $href = explode('/try/', $href, 2);
                        $href = '/go/' . $href[1];
                        $_aElement->setAttribute('href', $href);
                        continue;
                    }
                    if (strpos($href, '//')!==false) {
                        continue;
                    }
                    if (preg_match('/[0-9_a-z]/', $href[0])) {
                        $href = './' . $href;
                    }
                    $href = str_replace('-', '_', $href);
                    $_aElement->setAttribute('href', $href);
                }

                // 生成html， 去掉前后的div标签
                $attrList = array('class', 'id', 'style');
                foreach ($attrList as $_attr) {
                    if ($elementContent->hasAttribute($_attr)) {
                        $elementContent->removeAttribute($_attr);
                    }
                }
                $content = $dom1->saveHTML($elementContent);
                $content = str_replace(array('runoob', 'runnoob', '菜鸟', ' class="example"'), array('icodebang', 'icodebang', '本站', ' class="code-sample"'), $content);


                // // 生成教程文章
                $content = trim(preg_replace('/<!--[^\!\[]*?(?<!\/\/)-->/u' , '' , $content));
                $content = str_replace(array('<br>', '<br >', '<br/>', '<br />'), "\n \n \n \n", $content);
                $content = trim($content);
                $content = str_replace("\n \n \n \n", '<br/>', $content);
                $dataCourse = array();
                $dataCourse['title'] = $title;
                $dataCourse['title2'] = '';
                $dataCourse['url_token'] = str_replace('-', '_', substr($tmpLinkInfo[1], 0, -5));
                $dataCourse['content'] = $content;
                $dataCourse['meta_keyword'] = '';
                $dataCourse['category_id'] = $categoryId;
                //$data['table_id'] = $tableId;
                $dataCourse['tag_names'] = array();
                $dataCourse['uid'] = $userId;
                $dataCourse['banner_id'] = null;
                $dataCourse['pic'] = null;
                $dataCourse['attach_ids'] = $attachAccessKey=='' ? null : array(1);

                //var_dump($data);
                $courseId = Application::model('course')->add($dataCourse);

                if ($attachAccessKey) {
                    Application::model('publish')->update_attach('course', $courseId, $attachAccessKey);
                }
                $fileCourseIdMaps[$filename] = array('id'=>$courseId, 'title'=>$title);

                $data['from_type'] = 'course';
                $data['article_id'] = $courseId;
                $data['title']      = $title;

            }

        } else { // 教程文章
            $data['from_type'] = 'course';
            $data['article_id'] = $fileCourseIdMaps[$chapterList[$indexChapter]['link'] ] ['id'];
            $data['title']      = $title;
        }

        $contentId = Application::model('course')->addContentTable($data);

        if (! isset($chapterList[$indexChapter]['link'], $childrenList[$chapterList[$indexChapter]['link']])) {
            continue;
        }

        sort($childrenList[$chapterList[$indexChapter]['link']]);
        foreach ($childrenList[$chapterList[$indexChapter]['link']]  as $_linkInfo) {

            $data = array(
                'table_id'    => $tableId,
                'from_type'   => 'course',
                'category_id' => $categoryId,
                'parent_id'   => $contentId,
                'sort'        => $sortIndex++,
                'title'       => $_linkInfo ['title'] ,
                'article_id'  => $fileCourseIdMaps[$_linkInfo['link']] ['id']
            );
            Application::model('course')->addContentTable($data);
        }

    }


    // 生成教案， 关联教程
    if ($debugFlag['start']===true && $debugFlag['end']===true) {
        //doPublishCourseTable();// 生成教案
        //var_dump($prevList, $nextList, $tableName, $chapterList);
        var_export($nextList);
        exit;
    }
}

echo 'End   time: ', microtime(true), "\r\n";
echo 'Start time: ', $startTime, "\r\n";
exit(0);
//*/

// 遍历目录获取文件： 之前用httptrack下载过网站， 只有有效的文件名，重新根据文件名下载文件
while (false!==($dirname=$dir->read())) {
    //Ignore parent- and self-links
    if ($dirname=="." || $dirname=="..") continue;

    $filepath = $listDir . DIRECTORY_SEPARATOR . $dirname;
    if (! is_dir($filepath)) continue; // 不是目录， 继续处理下一个文件

    if (! isset($dirCategoryMap[$dirname])) continue; // 不是需要处理的目录

    if (empty($dirCategoryMap[$dirname])) {
        continue;
    }

    $category = $dirCategoryMap[$dirname];

    $dirArticle = dir($filepath);
    // 遍历目录
    while (false!==($filename=$dirArticle->read())) {
        //Ignore parent- and self-links
        if ($filename=="." || $filename=="..") continue;

        $articleFilepath = $filepath . DIRECTORY_SEPARATOR . $filename;

        if (! is_file($articleFilepath)) continue; // 不是文件， 无需处理
        $realFilename = $filename;
        if (substr($filename, -4)=='.tmp') {
            $realFilename = substr($filename, 0, -4);
        } else {
            continue;
        }

        $curlHeaders['path'] = '/' . $dirname . '/' . $realFilename;
        $url = $baseUrl . $curlHeaders['path'];
        echo $url . "\r\n";
        $fileContent = curlRequest($url, 'GET', $curlHeaders);
        //var_DUMP(file_get_contents($url));EXIT;
        //$fileContent = file_get_contents($url);
        if (is_array($fileContent) || ! strpos($fileContent, 'previous-design-link')) {
            continue;
        }

        // if (is_array($fileContent)) {
        //     var_dump($fileContent);exit;
        //     continue;
        // }
        echo "\t\t OK \r\n";

        file_put_contents($listDir . DIRECTORY_SEPARATOR . $dirname . DIRECTORY_SEPARATOR . $realFilename, $fileContent);

        @unlink($listDir . DIRECTORY_SEPARATOR . $dirname . DIRECTORY_SEPARATOR . $filename);

        continue;

        $fileContent = file_get_contents($articleFilepath);
        $startPos = strpos($fileContent, '<div class="sidebar-tree-content">');
        $endPos = strpos($fileContent, '<!--  sidebar-tree-content end  -->');

        if (! $startPos || ! $endPos) continue;

        $content = substr($fileContent, $startPos, $endPos - $startPos);
        // <a   title="章节 名称">章节 名称</a>
        // <a  href="course.html" title="文章 题目">文章 题目</a>
        preg_match_all('/<a  (.*)title="(.*)">.*<\/a>/i', $content, $matchList);

        var_dump($matchList);
        break;
    }
}

/* EOF */


