<?php
/**
 * 1. 遍历目录， 获取分类目录列表
 * 2. 将分类目录和系统设置的分类做关系映射
 * 3. 读取分类目录下的文章文件， 进行解析
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
$model = Application::model();

class HtmlParser
{
    /**
     * 是否开启调试模式
     */
    public $debug = false;
    /**
     * 是否将内容图片获取，并替换url
     */
    public $doLoadImgFlag = true;
    /**
     * 要处理的文件目录。 文件目录级别为 listRootDir/dir/articleFile
     */
    public $listRootDir = '';
    /**
     * 当前处理的文件目录
     */
    public $currentDirname = '/';
    /**
     * 当前处理的文件名字
     */
    protected $currentFilename = '';

    /**
     * 待解析的文件内容
     */
    protected $htmlContent = '';
    /**
     * DOMDocument 实例
     */
    protected $dom = null;
    /**
     * content dom element
     */
    protected $domContent = null;

    protected $authorDomInfo = array(
        'id'            => '',
        'tag'           => 'div',
        'class'         => 'error-content',
        'class_index'   => 0,
        'is_list'       => 0,
    );

    protected $copyfromDomInfo = array(
        'id'            => '',
        'tag'           => 'div',
        'class'         => 'error-content',
        'class_index'   => 0,
        'is_list'       => 0,
    );

    protected $errorDomInfo = array(
        'id'            => '',
        'tag'           => 'div',
        'class'         => 'error-content',
        'class_index'   => 0,
        'is_list'       => 0,
    );
    protected $contentDomInfo = array(
        'method'        => 'id', // id, class, auto:  通过id获取/通过class获取/自动获取
        // 根据id获取dom， 或者根据 tag和class获取，然后定位到具体的index
        'id'            => '',
        'tag'           => 'div',
        'class'         => 'container',
        'index'         => '0',
        // 定位到具体位置后， 获取相关子项
        'sub_tag'       => '',
        'sub_class'     => '',
        'sub_index'     => '',
        // 是否需要解析成列表类型的数据
        'is_list'       => 1,
    );

    protected $titleDomInfo = array(
        'id'            => '',
        'tag'           => 'div',
        'class'         => '',
        'index'         => 0,
    );

    protected $menuDomInfo = array(
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

    public function __construct()
    {
        $this->dom = new DOMDocument();
    }
    public function getDomInstance()
    {
        return $this->dom;
    }

    public function loadDomHTML ($content, $charset='')
    {
        $this->htmlContent = $content;

        if ($charset) {
            $this->htmlContent = '<meta http-equiv="Content-Type" content="text/html; charset='.$charset.'">' . $content;
        }

        $this->dom->loadHTML($this->htmlContent);

        return $this;
    }

    /**
     * 获取图片并存储
     */
    public function processImage ($moduleName, & $elementDom, $baseUrl, $lazyLoadAttrName='')
    {
        $urlInfo = parse_url($baseUrl);
        $scheme = $urlInfo['scheme'];
        $refPath = dirname($urlInfo['path']);
        $host = $urlInfo['host'];
        $attachAccessKey = '';
        // 将图片转换成本站内容
        $imgList = $elementDom->getElementsByTagName('img');
        $imgLength = $imgList->length;

        $attachAccessKey = md5(round(1, 100000) . microtime(true).'icodebang.com');
        //echo __LINE__ , "\r\n";
        //*
        for($i=$imgLength-1; $this->doLoadImgFlag && $i>=0; $i--) {
            $_src = $imgList[$i]->getAttribute('src');
            if (! $_src && $lazyLoadAttrName && $imgList[$i]->getAttribute($lazyLoadAttrName)) {
                $_src = $imgList[$i]->getAttribute($lazyLoadAttrName);
            }
            // 先获取到图片属性列表， 存放。 然后再根据列表删除。 直接删除失败
            $attrList = array();
            foreach ($imgList[$i]->attributes as $_attrNode) {
                $attrList[] = $_attrNode->name;
            }
            foreach ($attrList as $_attrName) {
                $imgList[$i]->removeAttribute($_attrName);
            }

            if ( strpos($_src, 'http://')===0 || strpos($_src, 'https://')===0 ) {
            } else if(strpos($_src, '//')===0) {
                $_src = $scheme . '://' . $_src;
            } else if(strpos($_src, '/')===0) {
                $_src = $scheme . '://' . $host . $_src;
            } else {
                $_src = $scheme . '://' . $host . $refPath . '/' . $_src;
            }
            $tryTimes = 3;
            while($tryTimes-- > 0) {

                $_imgData = @ file_get_contents($_src);
                $extInfo = explode('.', strtolower(substr($_src, -5)));
                if (count($extInfo)>1) {
                    $_extension = array_pop($extInfo);
                } else {
                    $_extension = 'png';
                }
                // $_tmpFile = tempnam(sys_get_temp_dir(), 'icb_') . substr($_src, strrpos($_src, '.'));
                // $_result = $_imgData!==false && file_put_contents($_tmpFile, $_imgData);
                $_result = false;
                //echo __LINE__, "\r\n";
                if ($_imgData) {
                    try {
                        $_uploadInfo = doUploadAttach($moduleName, $attachAccessKey, '1.'.$_extension, $_imgData);
                        //$_uploadInfo = array('url'=>$_src . '.' . $_extension);
                       //var_dump($_uploadInfo);//exit;
                       echo $_src , "+++++ image url.\r\n";
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

        if ($imgLength > 0) {
            return $_result ? $attachAccessKey : false;
        } else {
            return '';
        }
    }

    /**
     * 获取文件列表
     */
    public function loadFileList ($listRootDir)
    {
        $fileList = array();
        $dir = dir($listRootDir);
        while (false!==($dirname=$dir->read())) {
            //Ignore parent- and self-links
            if ($dirname=="." || $dirname=="..") continue;

            $filepath = $listRootDir . DIRECTORY_SEPARATOR . $dirname;
            if (! is_dir($filepath)) continue; // 不是目录， 继续处理下一个文件

            $_fileListInDir = array(); // 目录下的文件列表

            $dirArticle = dir($filepath);
            // 遍历目录
            while (false!==($filename=$dirArticle->read())) {
                //Ignore parent- and self-links
                if ($filename=="." || $filename=="..") continue;

                $_fileListInDir[] = $filename;
            }

            if ($_fileListInDir) {
                $fileList[$dirname] = $_fileListInDir;
            }
        }

        return $fileList;
    }

    public function parse ($content, $charset='')
    {
        $this->htmlContent = $content;
        $this->dom = new DOMDocument();
        if ($charset) {
            $this->htmlContent = '<meta http-equiv="Content-Type" content="text/html; charset='.$charset.'">' . $content;
        }

        $this->dom->loadHTML($this->htmlContent);

        if ($this->parseError () ) {
            return false;
        }

        $menuList = $this->parseMenuList();
        $this->parseContent();
        //$this->processImage();

    }
    public function getDom ($contentDomInfo)
    {
        $content = '';
        $tmpList = array();
        if ($contentDomInfo['id']) {
            $contentDom = $this->dom->getElementById($contentDomInfo['id']);
        } else if ($contentDomInfo['tag']) {
            $domList = $this->dom->getElementsByTagName($contentDomInfo['tag']);
            $index = 0;
            foreach ($domList as $_tmpDom) {
                if ( $contentDomInfo['class'] && (! $_tmpDom->hasAttribute('class')
                 || strpos($_tmpDom->getAttribute('class'),$contentDomInfo['class']) ===false ) ) {
                    continue;
                }
                if (is_numeric($contentDomInfo['index']) && $index == $contentDomInfo['index']) { // 找到了对应的dom
                    $contentDom = $_tmpDom;
                    break;
                } else if (! is_numeric($contentDomInfo['index'])) {
                    $tmpList[] = $_tmpDom;
                }
                $index++;
            }
            // 没有指定dom的序号， 返回列表
            if (!is_numeric($contentDomInfo['index'])) {
                $contentDom = $tmpList;
            }
        }
        if (empty($contentDom)) {
            return $content;
        }

        if ($contentDomInfo['sub_tag']) {
            $tmpList = array();
            is_array($contentDom) OR $contentDom = array($contentDom);
            foreach ($contentDom as $_dom) {

                $domList = $_dom->getElementsByTagName($contentDomInfo['sub_tag']);
                $index = 0;
                foreach ($domList as $_tmpDom) {
                    if ( $contentDomInfo['sub_class'] && (! $_tmpDom->hasAttribute('class')
                    || strpos($_tmpDom->getAttribute('class'),$contentDomInfo['sub_class']) ===false ) ) {
                        continue;
                    }

                    if (is_numeric($contentDomInfo['sub_index']) && $index == $contentDomInfo['sub_index']) { // 找到了对应的dom
                        $tmpList[] = $_tmpDom;
                        break;
                    } else if (! is_numeric($contentDomInfo['sub_index'])) {
                        $tmpList[] = $_tmpDom;
                    }
                    $index++;
                }

                $contentDom = $tmpList;
            }
        }

        return $contentDom;

    }

    public function generateDomHtml($elementDom)
    {
        return $this->dom->saveHTML($elementDom);
    }


    public function parseContent ($contentDomInfo=array())
    {
        //$contentDom = $this->getDom($this->contentDomInfo);
        $contentDom = $this->getDom($contentDomInfo);
        if ($contentDom) {
            return $this->dom->saveHTML($contentDom);
        } else {
            return '';
        }
    }

    public function parseMenuList ($menuDomInfo=array())
    {
        // 从左侧菜单解析章节列表
        $chapterList = array();
        // if ($this->menuDomInfo['id']) {
        //     $menuContainerDom = $this->dom->getElementById($this->menuDomInfo['id']);
        // } else if ($this->menuDomInfo['tag'] && $this->menuDomInfo['class'] && $this->menuDomInfo['class_index']) {
        //     $domList = $this->dom->getElementsByTagName($this->menuDomInfo['tag']);
        //     $index = 0;
        //     foreach ($domList as $_tmpDom) {
        //         if (! $_tmpDom->hasAttribute('class')
        //          || strpos($_tmpDom->getAttribute('class'),$this->menuDomInfo['class']) ===false ) {
        //             continue;
        //         }
        //         if ($index == $this->menuDomInfo['class_index']) { // 找到了对应的dom
        //             $menuContainerDom = $_tmpDom;
        //             break;
        //         }
        //         $index++;
        //     }
        // }
        //$menuContainerDom = $this->getDom($this->menuDomInfo);
        $menuContainerDom = $this->getDom($menuDomInfo);

        if (empty($menuContainerDom)) {
            return $chapterList;
        }

        foreach ($menuContainerDom as $_chapterElement) {
            $link = $_chapterElement->getAttribute('href');
            $chapterList[] = array('link'=>$link,'title'=>trim($_chapterElement->nodeValue));
        }

        return $chapterList;
    }

    public function parseError ()
    {
        $errorDom = null;
        if ($this->errorDomInfo['id']) {
            $errorDom = $this->dom->getElementById($this->errorDomInfo['id']);
        } else if ($this->errorDomInfo['class'] && $this->errorDomInfo['tag']
         && $this->errorDomInfo['class_index']) {
            $domList = $this->dom->getElementsByTagName($this->errorDomInfo['tag']);
            $index = 0;
            foreach ($domList as $_tmpDom) {
                if (! $_tmpDom->hasAttribute('class')
                 || strpos($_tmpDom->getAttribute('class'),$this->errorDomInfo['class']) ===false ) {
                    continue;
                }
                if ($index == $this->errorDomInfo['class_index']) { // 找到了对应的dom
                    $errorDom = $_tmpDom;
                    break;
                }
                $index++;
            }
        }
        $hasError = is_object($errorDom) && $errorDom->length > 0;

        return $hasError;
    }

    /**
     * 将需要替换的字符串， 做映射数组来替换
     */
    public function replaceKeywords (array $replacementMap)
    {
        $searchList = $replaceList = array();
        foreach ($replacementMap as $_search=>$_replace) {
            $content = str_replace($searchList, $replaceList, $this->content);
        }

        return $content;
    }
}

$contentDomInfo = array(
    'method'        => 'id', // id, class, auto:  通过id获取/通过class获取/自动获取
    // 根据id获取dom， 或者根据 tag和class获取，然后定位到具体的index
    'id'            => '',
    'tag'           => 'div',
    'class'         => 'container',
    'index'         => '0',
    // 定位到具体位置后， 获取相关子项
    'sub_tag'       => '',
    'sub_class'     => '',
    'sub_index'     => '',
    // 是否需要解析成列表类型的数据
    'is_list'       => 1,
);
$contentHtmlParserModel = new HtmlParser();
$filecontent  = file_get_contents($config['sf']['tag_list_url']);
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
$categoryLisk = $contentHtmlParserModel->loadDomHTML($filecontent)->parseMenuList($menuDomInfo);
$categoryMap = $configInfo['parse']['categoryKeyIdMap']; // 分类名称和id映射关系

foreach ($categoryLisk as $_key=>$linkInfo) {
    $_category = $linkInfo['title'];
    if (empty($categoryMap[$_category])) {
        unset($categoryLisk[$_key]);
    }
}
$categoryLisk = array_values($categoryLisk);
//exit;
// 解析内容页链接地址和作者，存储到数组中，留待解析title，content，image
$summaryContentDomInfo = array(
    'method'        => 'id', // id, class, auto:  通过id获取/通过class获取/自动获取
    // 根据id获取dom， 或者根据 tag和class获取，然后定位到具体的index
    'id'            => '',
    'tag'           => 'div',
    'class'         => 'summary',
    'index'         => '',
    // 定位到具体位置后， 获取相关子项
    'sub_tag'       => '',
    'sub_class'     => '',
    'sub_index'     => '',
);
for ($i=9; $i>=1; $i--) {
    foreach ($categoryLisk as $_categoryInfo) {
        $categoryId = $categoryMap[$_categoryInfo['title']];
        $url = $_categoryInfo['link'] . '/blogs?page=' . $i;


        $_urlInfo = parse_url($url);
        $scheme = $_urlInfo['scheme'];
        $refPath = dirname($_urlInfo['path']);
        $host = $_urlInfo['host'];
        echo $url , "\r\n";
        //$filecontent  = file_get_contents('/Users/zhoumingxia/git/code/www/tools/parseDataSample/segmentfault/html5 的文章 - SegmentFault 思否.html');
        $filecontent = file_get_contents($url);
        echo 'file content length:'. strlen($filecontent), "\r\n";
        //file_put_contents('/Users/zhoumingxia/git/code/www/tools/parseDataSample/segmentfault/'. $_categoryInfo['title'] . '_' . $i .'.html', $filecontent);
        $linkHtmlParseModel = new HtmlParser();
        $list = $linkHtmlParseModel->loadDomHTML($filecontent, 'utf-8')->getDom($summaryContentDomInfo);
        echo 'got summary list:' . count($list) . "\r\n";
        if (count($list)<2) {
            continue;
        }
        $pageLinks = array();
        foreach ($list as $_DomItem) {
            //var_dump($_DomItem);
            try {
                $html = $linkHtmlParseModel->getDomInstance()->saveHTML($_DomItem);
                $htmlParserModelClone = new HtmlParser();
                $htmlParserModelClone->loadDomHTML($html, 'UTF-8');
                //$htmlParserModelClone->loadDomHTML($html, 'UTF-8');
                $domTitle  = $htmlParserModelClone->getDom(array('tag'=>'a', 'index'=>0));
                echo 'title dom loaded' , __LINE__, "\r\n";
                $domAuthor = $htmlParserModelClone->getDom(array('tag'=>'a', 'index'=>2));
                echo 'author dom loaded' , __LINE__, "\r\n";
                $domLink   = $htmlParserModelClone->getDom(array('tag'=>'a', 'index'=>0));
                echo 'content page link dom loaded' , __LINE__, "\r\n";


                $link = $domLink->getAttribute('href');
                if ( strpos($link, 'http://')===0 || strpos($link, 'https://')===0 ) {
                } else if(strpos($link, '//')===0) {
                    $link = $scheme . '://' . $link;
                } else if(strpos($link, '/')===0) {
                    $link = $scheme . '://' . $host . $link;
                } else {
                    $link = $scheme . '://' . $host . $refPath . '/' . $link;
                }

                $author = $domAuthor->textContent;
                $title  = $domTitle->textContent;
                //echo $htmlParserModelClone->getDomInstance()->saveHTML($dom);
                $pageLinks[$link] = array('author'=>$author, 'title'=>$title);
            } catch (Exception $e) {
                echo $e->getMessage();
            }
        }
        $sleepRand = rand(200, 400);
        sleep($sleepRand);
        echo 'sleeping :', $sleepRand, " seconds. \r\n";
        $pageLinks = array_reverse($pageLinks);
        //var_dump($pageLinks);
        // 解析主页面内容， 获取title，content， image
        foreach ($pageLinks as $_link=>$_itemInfo) {
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
            echo $_link, "----------  starting...... \r\n\r\n";

            $navDomList = $linkHtmlParseModel->loadDomHTML($filecontent,'utf-8')->getDom(array('tag'=>'ol', 'class'=>'breadcrumb', 'index'=>0,'sub_tag'=>'a','sub_index'=>2));
            echo __LINE__, "  loading nav dom \r\n";
            $timeDom = $linkHtmlParseModel->getDom(array('tag'=>'time', 'index'=>1));
            echo __LINE__, " loading time dom\r\n";
            $navContent = strtolower($navDomList[0]->textContent);
            $dateTime = date('Y-m-d H:i:s', strtotime($timeDom->getAttribute('datetime')) ); // ！！ 获取属性， 书名名称不区分大小写， 必须小写
            // 比较时间，是否已经数据已经同步过了
            $syncInfo = $model->fetch_row('key_value', 'varname = "' .$model->quote('segmentfault_sync_time_' . $_categoryInfo['title']).'"');
            if ($syncInfo && strtotime($syncInfo['value']) >= strtotime($dateTime)) {
                continue;
            }

            $contentDom = $linkHtmlParseModel->getDom($contentDomInfo);
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
            echo $_link, "------------ end   *****\r\n\r\n";
            if ($attachAccessKey===false) {
                continue;
            }
            //echo mb_convert_encoding($content, 'utf-8', 'utf8');
            //exit;
            $moreInfo = array('author'=>$_itemInfo['author'], 'source_url'=>$_link);
            // 存储数据， 生成文章
            echo 'adding new article... ', __LINE__, "------------\r\n";
            $userId = rand(3,10002);
            if ($syncInfo) {
                $model->update('key_value', array('value'=>$dateTime, 'note'=> '同步分类下的最后一条数据发布的时间'), 'varname = "' .$model->quote('segmentfault_sync_time_' . $_categoryInfo['title']).'"');
            } else {
                $model->insert('key_value', array('value'=>$dateTime, 'varname' =>  $model->quote('segmentfault_sync_time_' . $_categoryInfo['title']), 'note'=> '同步分类下的最后一条数据发布的时间') );
            }
            //var_dump($userId, $_itemInfo['title'], $content, $categoryId, $tags, $attachAccessKey, $moreInfo);exit;
            $articleInfo = doPublishArticle($userId, $_itemInfo['title'], substr($content, 9, -10), $categoryId, $tags, $attachAccessKey, $moreInfo);
            //var_dump($articleInfo);
            //exit;
        }
    }


}
exit;

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
    'sec-fetch-dest'    => 'document',
    'sec-fetch-mode'    => 'navigate',
    'sec-fetch-site'    => 'same-origin',
    'sec-fetch-user'    => '?1',
    'upgrade-insecure-requests'   => '1',
    'user-agent'        => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36'
);


/* EOF */


