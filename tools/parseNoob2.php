<?php

/**
 *
 * 从HMTL列表中解析链接地址， 生成教程和教案
 */
$startTime = microtime(true);
set_time_limit(0);
// 记录程序开始时间， 后续统一用这个时间做时间戳转换
defined('APP_START_TIME') or define('APP_START_TIME', time());
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
$dirCategoryMap = array(
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

$dom = new DOMDocument();

$dom->loadHTML('<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></head><body>
<ul class="membership">
    <li><a target="_top" title="1.2  ES6 环境搭建" href="http://www.runoob.com/w3cnote/es6-setup.html">1.2  ES6 环境搭建</a></li>

	<li><a target="_top" title="2.1  ES6  let  与 const" href="http://www.runoob.com/w3cnote/es6-let-const.html">2.1  ES6  let  与 const</a></li>

	<li><a target="_top" title="2.2  ES6 解构赋值" href="http://www.runoob.com/w3cnote/deconstruction-assignment.html">2.2  ES6 解构赋值</a></li>

	<li><a target="_top" title="2.3  ES6 Symbol" href="http://www.runoob.com/w3cnote/es6-symbol.html">2.3  ES6 Symbol</a></li>

	<li><a target="_top" title="3.1.1  ES6 Map 与 Set" href="http://www.runoob.com/w3cnote/es6-map-set.html">3.1.1  ES6 Map 与 Set</a></li>

	<li><a target="_top" title="3.1.2  ES6 Reflect 与 Proxy" href="http://www.runoob.com/w3cnote/es6-reflect-proxy.html">3.1.2  ES6 Reflect 与 Proxy</a></li>

	<li><a target="_top" title="3.2.1  ES6 字符串" href="http://www.runoob.com/w3cnote/es6-string.html">3.2.1  ES6 字符串</a></li>

	<li><a target="_top" title="3.2.2  ES6 数值" href="http://www.runoob.com/w3cnote/es6-number.html">3.2.2  ES6 数值</a></li>

	<li><a target="_top" title="3.2.3  ES6 对象" href="http://www.runoob.com/w3cnote/es6-object.html">3.2.3  ES6 对象</a></li>

	<li><a target="_top" title="3.2.4  ES6 数组" href="http://www.runoob.com/w3cnote/es6-array.html">3.2.4  ES6 数组</a></li>

	<li><a target="_top" title="4.1  ES6 函数" href="http://www.runoob.com/w3cnote/es6-function.html">4.1  ES6 函数</a></li>

	<li><a target="_top" title="4.2  ES6 迭代器" href="http://www.runoob.com/w3cnote/es6-iterator.html">4.2  ES6 迭代器</a></li>

	<li><a target="_top" title="4.3  ES6 Class 类" href="http://www.runoob.com/w3cnote/es6-class.html">4.3  ES6 Class 类</a></li>

	<li><a target="_top" title="4.4  ES6 模块" href="http://www.runoob.com/w3cnote/es6-module.html">4.4  ES6 模块</a></li>

	<li><a target="_top" title="5.1  ES6 Promise 对象" href="http://www.runoob.com/w3cnote/es6-promise.html">5.1  ES6 Promise 对象</a></li>

	<li><a target="_top" title="5.2 ES6 Generator 函数" href="http://www.runoob.com/w3cnote/es6-generator.html">5.2 ES6 Generator 函数</a></li>

	<li><a target="_top" title="5.3 ES6 async 函数" href="http://www.runoob.com/w3cnote/es6-async.html">5.3 ES6 async 函数</a></li>
	</ul>
    </body></html>
');

$aList = $dom->getElementsByTagName('a');
$userId = rand(3,10002); // 对应的用户id
$sortIndex = 1;
$categoryId = 110; // 所属分类
$dirname = 'ES6 (ECMAScript 6.0) 教程'; // 教程名称
// 添加分类下的教程
$tableId = Application::model()->fetch_one('course_table', 'id', '`title`="' . $dirname . '" AND category_id=' . $categoryId);
if (!$tableId) {
    $tableId = Application::model()->insert('course_table', array('title' => $dirname, 'category_id' => $categoryId));
}

foreach ($aList as $_aElement) {
    $outLink = $_aElement->getAttribute('href');

    $title = $_aElement->nodeValue;

    $data = array(
        'table_id'    => $tableId,
        'from_type'   => '',
        'category_id' => $categoryId,
        'parent_id'   => 0,
        'sort'        => $sortIndex++,
        'title'       => $title,
    );


    $dom1 = new DOMDocument();

    $dom1->loadHTML(file_get_contents($outLink));
    $divList = $dom1->getElementsByTagName('div');
    foreach ($divList as $_divElement) {
        if ($_divElement->hasAttribute('class') && $_divElement->getAttribute('class') == 'article-intro') {
            $elementContent = $_divElement;
            break;
        }
    }

    // 获取标题
    $elements = $elementContent->getElementsByTagName('h1');

    //$elements->length>0 AND $elements[0]->parentNode->removeChild($elements[0]);

    $attachAccessKey = '';
    // 将图片转换成本站内容
    $imgList = $elementContent->getElementsByTagName('img');
    $imgLength = $imgList->length;
    //echo __LINE__ , "\r\n";
    //*
    for ($i = $imgLength - 1; $doLoadImgFlag && $i >= 0; $i--) {
        $_src = $imgList[$i]->getAttribute('src');
        //echo $_src , "\r\n";
        $tryTimes = 3;
        while ($tryTimes-- > 0) {
            if ((strpos($_src, 'http://') === 0 || strpos($_src, 'https://') === 0) && strpos($_src, 'runoob')) {
            } else if (strpos($_src, '//') === 0) {
                $_src = 'https:' . $_src;
            } else if (strpos($_src, '/') === 0) {
                $_src = 'https://www.runoob.com' . $_src;
            } else if (strpos($_src, 'http') !== 0) {
                $_src = 'https://www.runoob.com/' . $dirname . '/' . $_src;
            } else { // 已http开头， 保留路径
                break;
            }
            $_imgData = @file_get_contents($_src);
            $_srcFileInfo = explode('.', $_src);
            $_extension = array_pop($_srcFileInfo);
            $_extension = substr($_extension, 0, 3);
            // $_tmpFile = tempnam(sys_get_temp_dir(), 'icb_') . substr($_src, strrpos($_src, '.'));
            // $_result = $_imgData!==false && file_put_contents($_tmpFile, $_imgData);
            $_result = false;
            //echo __LINE__, "\r\n";
            if ($_imgData) {
                $attachAccessKey = md5($outLink . 'icodebang.com');
                try {
                    $_uploadInfo = doUploadAttach('course', $attachAccessKey, '1.' . $_extension, $_imgData);
                    //var_dump($_uploadInfo);//exit;
                } catch (Exception $e) {
                    //var_dump($e);
                    throw $e;
                }
                if (is_array($_uploadInfo) && isset($_uploadInfo['url'])) {
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
        for ($i = $divLength - 1; $i >= 0; $i--) {
            $_tmpCodeElement = $dom1->createElement('code', htmlspecialchars(trim($divList[$i]->nodeValue)));
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
        for ($i = $divLength - 1; $i >= 0; $i--) {
            $_class = $divList[$i]->hasAttribute('class') ? $divList[$i]->getAttribute('class') : '';
            // 包含图片的代码区域， 不做处理
            $imgList = $divList[$i]->getElementsByTagName('img');
            if ($imgList->length) {
                continue;
            }
            if (strpos($_class, 'example_code') !== false) { // 找到对应的代码区域
                $brElements = $divList[$i]->getElementsByTagName('br');
                for ($brIndex = $brElements->length - 1; $brIndex >= 0; $brIndex--) {
                    echo $outLink, __LINE__, "=========\r\n";
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
        for ($i = $divLength - 1; $i >= 0; $i--) {
            $_class = $divList[$i]->hasAttribute('class') ? $divList[$i]->getAttribute('class') : '';
            if (strpos($_class, 'example_code') !== false) { // 找到对应的代码区域
                $imgList = $divList[$i]->getElementsByTagName('img');
                if ($spanList->length > 0) { // 里面有图片
                    $_class .= ' code-has-img';
                }
                $spanList = $divList[$i]->getElementsByTagName('span');
                if ($spanList->length == 0) { // 里面没有代码高亮
                    $divList[$i]->setAttribute('class', str_replace('example_code', '', $_class) . ' sample-code-container');
                    continue;
                }
                $divList[$i]->setAttribute('class', str_replace('example_code', '', $_class) . ' code-container');
                $_tmpPreElement  = $dom1->createElement('pre');
                $_tmpCodeElement = $dom1->createElement('code', htmlspecialchars(trim($divList[$i]->nodeValue)));
                $_tmpPreElement->appendChild($_tmpCodeElement);
                $divList[$i]->nodeValue = '';
                $divList[$i]->appendChild($_tmpPreElement);
            }
        }
    } catch (Exception $e) {
        var_dump($e);exit;
        continue;
    }

    // 去除table的class
    $tableElements = $elementContent->getElementsByTagName('table');
    foreach ($tableElements as $_tableElement) {
        if ($_tableElement->hasAttribute('class')) {
            $_tableElement->removeAttribute('class');
        }
    }
    echo __LINE__, "\r\n";
    // 处理链接地址， 将 - 替换 _
    $aElements = $elementContent->getElementsByTagName('a');
    foreach ($aElements as $_aElement) {
        //  运行实例 按钮链接处理。 先把链接地址保存下来， 后续将链接地址内容做抓去
        if ($_aElement->hasAttribute('class') && in_array($_aElement->getAttribute('class'), array('tryitbtn', 'showbtn'))) {
            $_aElement->setAttribute('class', 'btn_runcode'); // 替换class
            $href = $_aElement->getAttribute('href');
            // 保存链接地址
            Application::model()->insert('course_runoob', array('url' => $href, 'page' => $chapterList[$indexChapter]['link']));
            // 替换链接地址
            $href = explode('=', $href, 2);
            $href = '/go/runcode.php?f=' . $href[1] . '&c=' . $dirname;
            $_aElement->setAttribute('href', $href);
            if ($_aElement->hasAttribute('rel')) {
                $_aElement->removeAttribute('rel');
            }
            continue;
        }
        echo __LINE__, "\r\n";
        if ($_aElement->hasAttribute('class') && in_array($_aElement->getAttribute('class'), array('playitbtn'))) {
            $_aElement->setAttribute('class', 'btn_runcheck'); // 替换class
            $href = $_aElement->getAttribute('href');
            // 保存链接地址
            Application::model()->insert('course_runoob', array('url' => $href, 'page' => $chapterList[$indexChapter]['link']));
            // 替换链接地址
            $href = explode('=', $href, 2);
            $href = '/go/runcheck.php?f=' . $href[1] . '&c=' . $dirname;
            $_aElement->setAttribute('href', $href);
            if ($_aElement->hasAttribute('rel')) {
                $_aElement->removeAttribute('rel');
            }
            continue;
        }
        $href = $_aElement->getAttribute('href');

        if (strpos($href, '/try/') !== false) {
            // 保存链接地址
            Application::model()->insert('course_runoob', array('url' => $href, 'page' => $chapterList[$indexChapter]['link']));
            // 替换链接地址
            $href = explode('/try/', $href, 2);
            $href = '/go/' . $href[1];
            $_aElement->setAttribute('href', $href);
            continue;
        }
        if (strpos($href, '//') !== false) {
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

    $tmpLinkInfo = explode('/', $outLink);
    $tmpLink = array_pop($tmpLinkInfo);
    // // 生成教程文章
    $content = trim(preg_replace('/<!--[^\!\[]*?(?<!\/\/)-->/u', '', $content));
    $content = str_replace(array('<br>', '<br >', '<br/>', '<br />'), "\n \n \n \n", $content);
    $content = trim($content);
    $content = str_replace("\n \n \n \n", '<br/>', $content);
    $dataCourse = array();
    $dataCourse['title'] = $title;
    $dataCourse['title2'] = '';
    $dataCourse['url_token'] = str_replace('-', '_', substr($tmpLink, 0, -5));
    $dataCourse['content'] = $content;
    $dataCourse['meta_keyword'] = '';
    $dataCourse['category_id'] = $categoryId;
    //$data['table_id'] = $tableId;
    $dataCourse['tag_names'] = array();
    $dataCourse['uid'] = $userId;
    $dataCourse['banner_id'] = null;
    $dataCourse['pic'] = null;
    $dataCourse['attach_ids'] = $attachAccessKey == '' ? null : array(1);

    //var_dump($dataCourse);exit;
    $courseId = Application::model('course')->add($dataCourse);

    if ($attachAccessKey) {
        Application::model('publish')->update_attach('course', $courseId, $attachAccessKey);
    }

    $data = array(
        'table_id'    => $tableId,
        'from_type'   => 'course',
        'category_id' => $categoryId,
        'parent_id'   => 0,
        'sort'        => $sortIndex++,
        'title'       => $title,
        'article_id'  => $courseId
    );
    Application::model('course')->addContentTable($data);
}


exit(0);
//*/


/* EOF */
