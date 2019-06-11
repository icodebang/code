<?php
set_time_limit(0);

$listDir = '/Users/wangzaixin/git/jb51.data/list';
$articleDir = '/Users/wangzaixin/git/jb51.data/article';
$dir = dir($listDir);
$listFiles = array();
$articleFiles = array();
// 从listDir获取list文件列表
while (false!==($filename=$dir->read())) {
    //Ignore parent- and self-links
    if ($filename=="." || $filename=="..") continue;

    $filepath = $listDir . DIRECTORY_SEPARATOR . $filename;
    if (! is_file($filepath)) {
        continue;
    }
    if (substr($filename, -5) !='.html') {
        continue;
    }

    $listFiles[] = $filename;
    //continue;
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
