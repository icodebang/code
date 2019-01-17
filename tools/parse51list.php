<?php
$listDir = '/Users/wangzaixin/git/jb51.data/list';
$articleDir = '';
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

// 对每一个 list 文件处理
foreach ($listFiles as $_listFilename) {

    $fileContent = file_get_contents($filepath);
    // 文章列表 <DT><span>日期:2018-12-26</span><a href="./article/1111111.htm" title="文章标题" target="_blank">文章标题</a></DT>
    preg_match_all('/<dt>*<\/dt>/ig', $fileContent, $matchList);

    $articleFileList = array();

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
