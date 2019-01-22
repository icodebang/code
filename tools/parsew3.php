<?php
/**
 * 1. 遍历目录， 获取分类目录列表
 * 2. 将分类目录和系统设置的分类做关系映射
 * 3. 读取分类目录下的文章文件， 进行解析
 * 4. 根据映射关系， 将解析后的数据存入数据库
 */
$listDir = '/Users/zhoumingxia/git/sites/www.w3cschool.cn';
$articleDir = '';
$dirCategoryMap = array(
    'html' => 'html',
);
$dir = dir($listDir);
// 遍历目录
while (false!==($filename=$dir->read())) {
    //Ignore parent- and self-links
    if ($filename=="." || $filename=="..") continue;

    $filepath = $listDir . DIRECTORY_SEPARATOR . $filename;
    if (! is_dir($filepath)) continue; // 不是目录， 继续处理下一个文件

    if (! isset($dirCategoryMap[$filename])) continue; // 不是需要处理的目录

    $category = $dirCategoryMap[$filename];

    $dirArticle = dir($filepath);
    // 遍历目录
    while (false!==($filename=$dirArticle->read())) {
        //Ignore parent- and self-links
        if ($filename=="." || $filename=="..") continue;

        $articleFilepath = $filepath . DIRECTORY_SEPARATOR . $filename;

        if (! is_file($articleFilepath)) continue; // 不是文件， 无需处理

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
