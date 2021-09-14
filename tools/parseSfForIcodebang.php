<?php
/**
 * 1. 遍历目录， 获取分类目录列表
 * 2. 将分类目录和系统设置的分类做关系映射
 * 3. 读取分类目录下的文章文件， 进行解析
 * 4. 根据映射关系， 将解析后的数据存入数据库
 */

include_once(__DIR__ . '/parseCommonInclude.php');
class HtmlParser extends Tools_Html_Parser{}

$contentDomInfo = array(
    'method'        => 'id', // id, class, auto:  通过id获取/通过class获取/自动获取
    // 根据id获取dom， 或者根据 tag和class获取，然后定位到具体的index
    'id'            => '',
    'tag'           => 'div',
    'class'         => 'fmt',
    'index'         => '0',
    // 定位到具体位置后， 获取相关子项
    'sub_tag'       => '',
    'sub_class'     => '',
    'sub_index'     => '',
    // 是否需要解析成列表类型的数据
    'is_list'       => 1,
);
$contentHtmlParserModel = new HtmlParser();
$filecontent  = file_get_contents($configInfo['sf']['tag_list_url']);
$tagContent =  $contentHtmlParserModel->loadDomHTML($filecontent)->parseContent($contentDomInfo);
// 解析标签列表， 将每个标签转换成网站对应的id
 $menuDomInfo = array(
    // 根据id获取dom， 或者根据 tag和class获取，然后定位到具体的index
    'id'            => '',
    'tag'           => 'div',
    'class'         => 'container',
    'index'         => '0',
    // 定位到具体位置后， 获取相关子项
    'sub_tag'       => 'a',
    'sub_class'     => 'tag',
    'sub_index'     => '',
    // 是否需要解析成列表类型的数据
    'is_list'       => 1,
);
$categoryLisk = $contentHtmlParserModel->loadDomHTML($filecontent, 'utf-8')->parseMenuList($menuDomInfo);
$categoryMap = $configInfo['parse']['categoryKeyIdMap']; // 分类名称和id映射关系
// 存放数据库中标记的前缀
$syncPrefixFlag = 'segmentfault_sync_time_';

foreach ($categoryLisk as $_key=>$linkInfo) {
    $_category = $linkInfo['title'];
    if (empty($categoryMap[$_category])) {
        unset($categoryLisk[$_key]);
    }
}
$categoryLisk = array_values($categoryLisk);
//$categoryLisk = array_reverse($categoryLisk);
//var_dump($categoryLisk);exit;
// 解析内容页链接地址和作者，存储到数组中，留待解析title，content，image
$summaryContentDomInfo = array(
    'method'        => 'id', // id, class, auto:  通过id获取/通过class获取/自动获取
    // 根据id获取dom， 或者根据 tag和class获取，然后定位到具体的index
    'id'            => '',
    'tag'           => 'div',
    'class'         => 'content',
    'index'         => '',
    // 定位到具体位置后， 获取相关子项
    'sub_tag'       => '',
    'sub_class'     => '',
    'sub_index'     => '',
);

foreach ($categoryLisk as $_categoryInfo) {
    $syncInfo = $model->fetch_row('key_value', 'varname = "' .$model->quote($syncPrefixFlag . $_categoryInfo['title']).'"');
    $syncNoteInfo = @json_decode($syncInfo['note'], true);
    if (is_array($syncNoteInfo) && isset($syncNoteInfo['sync_time']) && (time()-strtotime($syncNoteInfo['sync_time']) < 3*60*60 ) ) {
        echo $_categoryInfo['title'] . ' was just synced at: ', $syncNoteInfo['sync_time'], "  !!!!!!!!!! \r\n";
        continue;
    }
    $_categoryInfo['link'] = str_replace('angular.js', 'angularjs', $_categoryInfo['link'] );// angular.js 替换链接地址
    $pageLinks = array();
    for ($i=1; $i<=6; $i++) {
        $categoryId = $categoryMap[$_categoryInfo['title']];
        if ($i==1) {
            $url = $_categoryInfo['link'] . '/blogs';
        } else {
            $url = $_categoryInfo['link'] . '/blogs?page=' . $i;
        }


        $_urlInfo = parse_url($url);
        $scheme = $_urlInfo['scheme'];
        $refPath = dirname($_urlInfo['path']);
        $host = $_urlInfo['host'];
        echo $url , "\r\n";
        $filecontent = file_get_contents($url);
        echo 'file content length:'. strlen($filecontent), "\r\n";
        $linkHtmlParseModel = new HtmlParser();
        $list = $linkHtmlParseModel->loadDomHTML($filecontent, 'utf-8')->getDom($summaryContentDomInfo);
        echo 'got summary list:' . count($list) . "\r\n";
        if (count($list)<2) {
            break;
            continue;
        }
        $list = array_reverse($list);
        foreach ($list as $_DomItem) {
            //var_dump($_DomItem);
            try {
                $html = $linkHtmlParseModel->getDomInstance()->saveHTML($_DomItem);
                $htmlParserModelClone = new HtmlParser();
                $htmlParserModelClone->loadDomHTML($html, 'UTF-8');
                //$htmlParserModelClone->loadDomHTML($html, 'UTF-8');
                $domTitle  = $htmlParserModelClone->getDom(array('tag'=>'a', 'index'=>0));
                echo 'title dom loaded. ' , __LINE__, "\r\n";
                $domAuthor = $htmlParserModelClone->getDom(array('tag'=>'a', 'index'=>2));
                echo 'author dom loaded. ' , __LINE__, "\r\n";
                $domLink   = $htmlParserModelClone->getDom(array('tag'=>'a', 'index'=>0));
                echo 'content page link dom loaded. ' , __LINE__, "\r\n";
                $preTimeDom= $htmlParserModelClone->getDom(array('tag'=>'span', 'index'=>0));
                $aDoms = $preTimeDom->getElementsByTagName('a');
                for($aDomIndex = count($aDoms)-1; $aDomIndex>=0; $aDomIndex--) {
                    $preTimeDom->removeChild($aDoms[$aDomIndex]);
                }
                $timeString = trim(str_replace(array('今天','发布于','月','日'), array(date('Y-m-d'),'','-',''), $preTimeDom->textContent));
                $timeString = strlen($timeString) > 6 ? $timeString : date('Y-').$timeString;


                $link = $domLink->getAttribute('href');
                if ( strpos($link, 'http://')===0 || strpos($link, 'https://')===0 ) {
                } else if(strpos($link, '//')===0) {
                    $link = $scheme . '://' . $link;
                } else if(strpos($link, '/')===0) {
                    $link = $scheme . '://' . $host . $link;
                } else {
                    $link = $scheme . '://' . $host . $refPath . '/' . $link;
                }


                $syncInfo = $model->fetch_row('article', 'source_url = "' .$model->quote($link).'"');
                // 比较时间，是否已经数据已经同步过了
                if ($syncInfo) {
                    echo ' find the existing link: ', $link, '         ---  ',  __LINE__, "\r\n";
                    break 2;
                }

                $author = $domAuthor->textContent;
                $title  = $domTitle->textContent;
                //echo $htmlParserModelClone->getDomInstance()->saveHTML($dom);
                $pageLinks[$link] = array('author'=>$author, 'title'=>$title, 'time'=>$timeString);
            } catch (Exception $e) {
                echo $e->getMessage();
            }
        }
    }


    $syncInfo = $model->fetch_row('key_value', 'varname = "' .$model->quote($syncPrefixFlag . $_categoryInfo['title']).'"');
    // 比较时间，是否已经数据已经同步过了
    if ($syncInfo) {
        $model->update('key_value',
                    array(
                        'note' =>json_encode( array(
                                                    'note'=>'同步分类下的最后一条数据发布的时间',
                                                    'sync_time'=>date('Y-m-d H:i:s', time() ),
                                                    ),
                                                    JSON_UNESCAPED_UNICODE,
                                                )
                        ),
                        'varname = "' .$model->quote($syncPrefixFlag . $_categoryInfo['title']).'"'
                    );
    }
    //var_dump($pageLinks);exit;
    if ($pageLinks) {
        $sleepRand = rand(160, 240);
    } else {
        $sleepRand = rand(60, 140);
    }
    echo 'sleeping :', $sleepRand, " seconds. \r\n";
    for($sleepIndex=1;$sleepIndex<$sleepRand;$sleepIndex++) {
        if ($sleepIndex%10 == 1) {
            echo $sleepIndex;
        }
        echo  '. ';
        sleep(1);
    }
    echo "\r\n";
    echo $_categoryInfo['title'] . ' is being synced : ', "  -------------------------  ",__LINE__, " \r\n";
    $pageLinks = array_reverse($pageLinks); // 保持条目按照时间顺序正序排列
    //var_dump($pageLinks);exit;
    // 解析主页面内容， 获取title，content， image
    foreach ($pageLinks as $_link=>$_itemInfo) {
        echo $_link, " ----------  starting...... ",__LINE__,"\r\n";
        $tmpArticleTime = @ strtotime($_itemInfo['time']);
        $syncInfo = $model->fetch_row('article', 'source_url = "' .$model->quote($_link).'"');
        // 比较时间，是否已经数据已经同步过了
        if ($syncInfo) {
            echo " article is synced:", "  ignored ...... ",__LINE__,"\r\n";
            $model->update('key_value',
                        array(
                            'note' =>json_encode( array(
                                                        'note'=>'同步分类下的最后一条数据发布的时间',
                                                        'sync_time'=>date('Y-m-d H:i:s', time() ),
                                                        ),
                                                        JSON_UNESCAPED_UNICODE,
                                                    )
                            ),
                            'varname = "' .$model->quote($syncPrefixFlag . $_categoryInfo['title']).'"'
                        );
            continue;
        }

        $tryPageTimes = 1;
        while ($tryPageTimes++ < 3) {
            $filecontent = file_get_contents($_link);
            $contentHtmlParserModel = new HtmlParser();
            $contentDomInfo = array(
                'method'        => 'id', // id, class, auto:  通过id获取/通过class获取/自动获取
                // 根据id获取dom， 或者根据 tag和class获取，然后定位到具体的index
                'id'            => '',
                'tag'           => 'article',
                'class'         => '',
                'index'         => '0',
                // 定位到具体位置后， 获取相关子项
                'sub_tag'       => '',
                'sub_class'     => '',
                'sub_index'     => '',
            );
            //$content = $linkHtmlParseModel->loadDomHTML($filecontent,'utf-8')->parseContent($contentDomInfo);

            $navDomList = $linkHtmlParseModel->loadDomHTML($filecontent,'utf-8')->getDom(array('tag'=>'ol', 'class'=>'breadcrumb', 'index'=>0,'sub_tag'=>'a','sub_index'=>2));
            echo __LINE__, "  loading nav dom \r\n";
            $timeDom = $linkHtmlParseModel->getDom(array('tag'=>'time', 'index'=>1));
            echo __LINE__, " loading time dom\r\n";
            if (! $navDomList || ! $timeDom) {
                continue;
            }
            $navContent = @ strtolower($navDomList[0]->textContent);
            $dateTime = @ date('Y-m-d H:i:s', strtotime($timeDom->getAttribute('datetime')) ); // ！！ 获取属性， 书名名称不区分大小写， 必须小写
            echo __LINE__, " ", $dateTime, "\r\n";

            break;
        }

        $syncInfo = $model->fetch_row('key_value', 'varname = "' .$model->quote($syncPrefixFlag . $_categoryInfo['title']).'"');
        // 比较时间，是否已经数据已经同步过了
        if ($syncInfo && strtotime($syncInfo['value']) >= strtotime($dateTime)) {

            $model->update('key_value',
                        array(
                            'note' =>json_encode( array(
                                                        'note'=>'同步分类下的最后一条数据发布的时间',
                                                        'sync_time'=>date('Y-m-d H:i:s', time() ),
                                                        ),
                                                        JSON_UNESCAPED_UNICODE,
                                                    )
                            ),
                            'varname = "' .$model->quote($syncPrefixFlag . $_categoryInfo['title']).'"'
                        );
            continue;
        }

        echo __LINE__, "\r\n";
        $contentDom = $linkHtmlParseModel->getDom($contentDomInfo);
        if (! $contentDom) {
            continue;
        }
        $attrList = array();
        foreach ($contentDom->attributes as $_attrNode) {
            $attrList[] = $_attrNode->name;
        }
        foreach ($attrList as $_attrName) {
            $contentDom->removeAttribute($_attrName);
        }
        $attachAccessKey = $linkHtmlParseModel->processImage('article', $contentDom, $_link, 'data-src');
        $content = $linkHtmlParseModel->generateDomHtml($contentDom);
        $tagDoms = $linkHtmlParseModel->getDom(array('tag'=>'a', 'class'=>'badge-tag'));
        $tags = array();
        foreach ($tagDoms as $_dom) {
            $tags[] = $_dom->textContent;
        }

        echo __LINE__, "\r\n";
        $categoryNameList = array();
        foreach ($categoryMap as $_categoryName => $_categoryId) {
            if ($_categoryId == $categoryId) {
                $categoryLisk[] = strtolower($_categoryName);
            }
        }
        $categoryName = '';
        // 重新搜索分类， 还是没找到争取的对应分类. 查看标题中是否含有分类关键字, 如果在标题中有分类关键字，保持内容分类
        if (! in_array($navContent, $categoryNameList)) {
            foreach ($categoryNameList as $_categoryName) {
                if (false !==strpos(strtolower($title), $_categoryName)) {
                    $categoryName = $navContent; // 放置在当下分类， 绕过检查
                    break;
                }
            }
        }
        if ($navContent != $categoryName) {// 文章的分类需要重新处理
            foreach ($categoryMap as $_categoryName => $_tmpCategoryId) {
                if ($navContent == strtolower($_categoryName)) {
                    $categoryId = $_tmpCategoryId;
                    $categoryName = strtolower($_categoryName);
                    break;
                }
            }
        }
        if ($navContent != $categoryName) {
            echo $navContent, $categoryName;
            continue;
        }
        echo $_link, " ------------ end   *****\r\n";
        if ($attachAccessKey===false) {
            continue;
        }
        //echo mb_convert_encoding($content, 'utf-8', 'utf8');
        //exit;
        $moreInfo = array('author'=>$_itemInfo['author'], 'source_url'=>$_link);
        // 存储数据， 生成文章
        echo 'adding new article... ', __LINE__, " ------------\r\n\r\n";
        $userId = rand(3,10002);

        $syncInfo = $model->fetch_row('key_value', 'varname = "' .$model->quote($syncPrefixFlag . $_categoryInfo['title']).'"');
        if ($syncInfo) {
            $model->update('key_value',
                            array(
                                'value'=>$dateTime,
                                'note' =>json_encode( array(
                                                        'note'=>'同步分类下的最后一条数据发布的时间',
                                                        'sync_time'=>date('Y-m-d H:i:s', time() ),
                                                        ),
                                                        JSON_UNESCAPED_UNICODE,
                                                    )
                                ),
                            'varname = "' .$model->quote($syncPrefixFlag . $_categoryInfo['title']).'"'
                        );
        } else {
            $model->insert('key_value',
                            array(
                                'value'=>$dateTime,
                                'varname' =>  $model->quote($syncPrefixFlag . $_categoryInfo['title']),
                                'note' =>json_encode( array(
                                                        'note'=>'同步分类下的最后一条数据发布的时间',
                                                        'sync_time'=>date('Y-m-d H:i:s', time() ),
                                                        ),
                                                        JSON_UNESCAPED_UNICODE,
                                                    )
                            )
                        );
        }
        //var_dump($userId, $_itemInfo['title'], $content, $categoryId, $tags, $attachAccessKey, $moreInfo);exit;
        $articleInfo = doPublishArticle($userId, $_itemInfo['title'], trim(substr($content, 9, -10)), $categoryId, $tags, $attachAccessKey, $moreInfo);
        //var_dump($articleInfo);
        //exit;
    }


}
exit;

/* EOF */
