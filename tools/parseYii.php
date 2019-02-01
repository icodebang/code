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
    'aspnet' =>'',         'cprogramming' =>'',           'dom' =>'',                  'googleAPI' =>'',     'java' =>'',        'linux' =>'',         'note' =>'',       'redis' =>'',    'soap' =>'',           'vue2' =>'',      'xml' =>'',
    'ado' =>'',            'bootstrap' =>'',              'csharp' =>'',               'dtd' =>'',           'highcharts' =>'',  'jeasyui' =>'',       'lua' =>'',        'numpy' =>'',    'regexp' =>'',         'sql' =>'',       'w3c' =>'',            'xpath' =>'',
    'ajax' =>'',           'bootstrap4' =>'',             'css' =>'',                  'eclipse' =>'',       'hosting' =>'',     'jquery' =>'',        'manual' =>'',     'perl' =>'',     'sqlite' =>'',         'w3cnote' =>'',   'xquery' =>'',
    'android' =>'',        'css3' =>'',                   'html' =>'',                 'jquerymobile' =>'',  'maven' =>'',       'php' =>'',           'rss' =>'',        'svg' =>'',      'w3cnote_genre' =>'',  'xsl' =>'',
    'angularjs' =>'',      'browsers' =>'',               'firebug' =>'',              'htmldom' =>'',       'jqueryui' =>'',    'media' =>'',         'python' =>'',     'ruby' =>'',     'svn' =>'',            'xslfo' =>'',
    'angularjs2' =>'',     'charsets' =>'',               'cssref' =>'',               'font-awesome' =>'',  'http' =>'',        'js' =>'',            'memcached' =>'',  'python3' =>'',  'swift' =>'',          'web' =>'',
    'api' =>'',            'design-pattern' =>'',         'foundation' =>'',           'json' =>'',          'Memcached' =>'',   'quality' =>'',       'scala' =>'',      'tags' =>'',      'webservices' =>'',
    'appml' =>'',          'git' =>'',                    'jsp' =>'',                  'mongodb' =>'',       'quiz' =>'',        'schema' =>'',        'tcpip' =>'',
    'django' =>'',         'go' =>'',                     'ionic' =>'',                'jsref' =>'',         'mysql' =>'',       'rdf' =>'',           'servlet' =>'',    'vbscript' =>'',  'wsdl' =>'',
    'asp' =>'',            'cplusplus' =>'',              'docker' =>'',               'googleapi' =>'',     'ios' =>'',         'kotlin' =>'',        'nodejs' =>'',     'react' =>'',    'video' =>'',           'xlink' =>'',
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
        $startPos = strpos($fileContent, '<div class="pagemenus">');
        $endPos = strpos($fileContent, '<div class="content" id="navs">') - 1;

        if (! $startPos || ! $endPos) continue;

        $content = substr($fileContent, $startPos, $endPos - $startPos);
        /*
         *
         * 
					<ul class="pagemenu">
						<li class="navto-ads active">
							<a href="mariadb.html" style="font-weight:bold;padding-bottom: 32px;"> <i class="fa fa-list"></i>&nbsp;&nbsp;MariaDB教程</a>
						</li>
												<li style="">
							<a href="mariadb/mariadb_introduction.html" title="MariaDB简介" style="">MariaDB简介</a>
						</li>
												<li style="">
							<a href="mariadb/mariadb-features.html" title="MariaDB功能特点" style="">MariaDB功能特点</a>
						</li>
												<li style="">
							<a href="mariadb/mariadb-installation.html" title="MariaDB安装" style="">MariaDB安装</a>
						</li>
												<li style="">
							<a href="mariadb/mariadb-data-types.html" title="MariaDB数据类型" style="">MariaDB数据类型</a>
						</li>
						
						
												<li style="font-size:16px;font-weight:bold;color:#666;">
							<a style="background-color: #f8f9f9;cursor:text;font-size:16px;color: #666;">数据库和表</a>
						</li>
														<li >
								<a href="mariadb/mariadb-create-database.html" title="MariaDB创建数据库">MariaDB创建数据库</a>
							</li>
														<li >
								<a href="mariadb/mariadb-select-database.html" title="MariaDB选择数据库">MariaDB选择数据库</a>
							</li>
														<li >
								<a href="mariadb/mariadb-drop-database.html" title="MariaDB删除数据库">MariaDB删除数据库</a>
							</li>
														<li >
								<a href="mariadb/mariadb-create-table.html" title="MariaDB创建表">MariaDB创建表</a>
							</li>
														<li >
								<a href="mariadb/mariadb-drop-table.html" title="MariaDB删除表">MariaDB删除表</a>
							</li>
														<li >
								<a href="mariadb/mariadb-alter-table.html" title="MariaDB修改表">MariaDB修改表</a>
							</li>
							
												<li style="font-size:16px;font-weight:bold;color:#666;">
							<a style="background-color: #f8f9f9;cursor:text;font-size:16px;color: #666;">CRUD操作</a>
						</li>
														<li >
								<a href="mariadb/mariadb-insert.html" title="MariaDB插入数据">MariaDB插入数据</a>
							</li>
														<li >
								<a href="mariadb/mariadb-select.html" title="MariaDB查询数据">MariaDB查询数据</a>
							</li>
														<li >
								<a href="mariadb/mariadb-select-limit.html" title="MariaDB限制返回记录">MariaDB限制返回记录</a>
							</li>
														<li >
								<a href="mariadb/mariadb-update.html" title="MariaDB更新数据">MariaDB更新数据</a>
							</li>
														<li >
								<a href="mariadb/mariadb-delete.html" title="MariaDB删除数据">MariaDB删除数据</a>
							</li>
														<li >
								<a href="mariadb/mariadb-truncate-table.html" title="MariaDB截断表">MariaDB截断表</a>
							</li>
							
												<li style="font-size:16px;font-weight:bold;color:#666;">
							<a style="background-color: #f8f9f9;cursor:text;font-size:16px;color: #666;">MariaDB子句</a>
						</li>
														<li >
								<a href="mariadb/mariadb-where.html" title="MariaDB Where子句">MariaDB Where子句</a>
							</li>
														<li >
								<a href="mariadb/mariadb-like.html" title="MariaDB Like子句">MariaDB Like子句</a>
							</li>
														<li >
								<a href="mariadb/mariadb-order-by.html" title="MariaDB Order By子句">MariaDB Order By子句</a>
							</li>
														<li >
								<a href="mariadb/mariadb-distinct-clause.html" title="MariaDB Distinct子句">MariaDB Distinct子句</a>
							</li>
														<li >
								<a href="mariadb/mariadb-from-clause.html" title="MariaDB From子句">MariaDB From子句</a>
							</li>
							
												<li style="font-size:16px;font-weight:bold;color:#666;">
							<a style="background-color: #f8f9f9;cursor:text;font-size:16px;color: #666;">聚合函数</a>
						</li>
														<li >
								<a href="mariadb/mariadb-count-function.html" title="MariaDB Count()函数">MariaDB Count()函数</a>
							</li>
														<li >
								<a href="mariadb/mariadb-sum-function.html" title="MariaDB Sum()函数">MariaDB Sum()函数</a>
							</li>
														<li >
								<a href="mariadb/mariadb-min-function.html" title="MariaDB Min()函数">MariaDB Min()函数</a>
							</li>
														<li >
								<a href="mariadb/mariadb-max-function.html" title="MariaDB Max()函数">MariaDB Max()函数</a>
							</li>
														<li >
								<a href="mariadb/mariadb-avg-function.html" title="MariaDB Avg()函数">MariaDB Avg()函数</a>
							</li>
							
												<li style="font-size:16px;font-weight:bold;color:#666;">
							<a style="background-color: #f8f9f9;cursor:text;font-size:16px;color: #666;">MariaDB连接</a>
						</li>
														<li >
								<a href="mariadb/mariadb-inner-join.html" title="MariaDB内连接">MariaDB内连接</a>
							</li>
														<li >
								<a href="mariadb/mariadb-left-outer-join.html" title="MariaDB左外连接">MariaDB左外连接</a>
							</li>
														<li >
								<a href="mariadb/mariadb-right-outer-join.html" title="MariaDB右外连接">MariaDB右外连接</a>
							</li>
							
												<li style="font-size:16px;font-weight:bold;color:#666;">
							<a style="background-color: #f8f9f9;cursor:text;font-size:16px;color: #666;">MariaDB操作符</a>
						</li>
														<li >
								<a href="mariadb/mariadb-comparison-operator.html" title="MariaDB比较运算符">MariaDB比较运算符</a>
							</li>
														<li >
								<a href="mariadb/mariadb-union-operator.html" title="MariaDB Union运算符">MariaDB Union运算符</a>
							</li>
														<li >
								<a href="mariadb/mariadb-union-all-operator.html" title="MariaDB Union All运算符">MariaDB Union All运算符</a>
							</li>
														<li >
								<a href="mariadb/mariadb-intersect-operator.html" title="MariaDB Intersect运算符">MariaDB Intersect运算符</a>
							</li>
							
												<li style="font-size:16px;font-weight:bold;color:#666;">
							<a style="background-color: #f8f9f9;cursor:text;font-size:16px;color: #666;">MariaDB高级部分</a>
						</li>
														<li >
								<a href="mariadb/mariadb-export.html" title="MariaDB导出数据">MariaDB导出数据</a>
							</li>
														<li >
								<a href="mariadb/mariadb-function.html" title="MariaDB函数">MariaDB函数</a>
							</li>
														<li >
								<a href="mariadb/mariadb-procedure.html" title="MariaDB过程">MariaDB过程</a>
							</li>
														<li >
								<a href="mariadb/mariadb-regular-expressions.html" title="MariaDB正则表达式">MariaDB正则表达式</a>
							</li>
														<li >
								<a href="mariadb/mariadb-conditions.html" title="MariaDB条件">MariaDB条件</a>
							</li>
							
						
					</ul>
         */
        // <a   title="章节 名称">章节 名称</a>
        // <a  href="course.html" title="文章 题目">文章 题目</a>
        preg_match_all('/<a  (.*)title="(.*)">.*<\/a>/i', $content, $matchList);

        var_dump($matchList);
        break;
    }
}

/* EOF */
