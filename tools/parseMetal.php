<?php

/**
 *
 */
class ParseMetal
{
    /**
     * http请求失败
     */
    const ERROR_HTTP_REQUEST   = 1;
    /**
     * 解析分类错误
     */
    const ERROR_PARSE_CATEGORY = 2;
    /**
     * 解析内容错误
     */
    const ERROR_PARSE_CONTENT  = 4;

    /**
     * 待解析的http内容
     */
    private $_content = '';

    /**
     * 全局配置信息
     */
    protected $configInfo = array();
    /**
     * 已经解析完的url列表
     */
    protected $_loadedUrls = array();
    /**
     * 全部url列表
     */
    protected $_allUrls = array();

    protected $db = null;
    protected $model = null;

    /**
     * 主分类信息列表
     */
    protected $categoryList = [];

    /**
     * 调试信息
     */
    protected $debugInfos = [];

    /**
     * 是否有错误发生。 如有错误， 需要将错误信息发送到邮件
     */
    protected $hasError = false;

    public function getDebugInfo ()
    {
        return $this->debugInfos;
    }

    public function hasError ()
    {
        return $this->hasError;
    }

    /**
     * 解析铜
     */
    protected function tongParser ($categoryId)
    {
        return $this->_commonParser($categoryId);
    }

    /**
     * 公共解析
     */
    protected function _commonParser ($categoryId, $patternList=array())
    {
        $this->debugInfos[] = sprintf("%s START:: %s %s\r\n", str_repeat('+', 20), $this->categoryList[$categoryId]['name'], str_repeat('+', 20));
        //var_dump($categoryId);
        // 获取价格区域内容
        $pricePattern = isset($patternList['all']) ? $patternList['all'] : '/<div class="singleList[^"]*">(.*)<div class="main" id="layout_main">/isu';
        preg_match_all($pricePattern, $this->_content, $matchList);
        if (! isset($matchList[1][0])) {
            $this->hasError = true;
            $this->debugInfos[] = "!!!!!!! 未找到相关数据 !!!!!!! \r\n";
        }
        //var_dump($matchList[1]);exit;
        // 获取每个子分类内容
        preg_match_all('/<div class="table-list" data-spot-index="([^"]*)"\s+data-spot-value="\d+">(.*?)<table>(.*?)<\/table>/isu', $matchList[1][0], $matchList2);
        //var_dump(__FUNCTION__, $matchList2);exit;

        $oldCategoryList = $this->subCategoryModel->getByCategoryId($categoryId);
        if ($oldCategoryList) {
            $_nameList = array_column($oldCategoryList, 'name');
            $oldCategoryList = array_combine($_nameList, $oldCategoryList);
        }
        if (! isset($matchList2[3][0])) {
            $this->hasError = true;
            $this->debugInfos[] = "!!!!!!! 未找到相关子类数据 !!!!!!! \r\n";
        }
        // 解析每个子分类中的数据， 对应每个详细的价格数据
        foreach ($matchList2[3] as $_key=>$_priceListString) {
            // <td class="product-name">名称</td>
            // <td class="range-price">价格范围</td>
            // <td class="average-price">均价</td>
            // <td class="up-or-down">涨跌</td>
            // <td class="unit">单位</td>
            // <td class="update-date">日期</td>
            $subCategoryName = $matchList2[1][$_key];
            if (! isset($oldCategoryList[$subCategoryName])) {
                $subCategoryId = $this->subCategoryModel->insert('', array('name'=>$subCategoryName, 'category_id'=>$categoryId));
            } else {
                $subCategoryId = $oldCategoryList[$subCategoryName]['id'];
            }
            $this->debugInfos[] = sprintf("%s SUB START: %s %s\r\n", str_repeat('-', 20), $subCategoryName, str_repeat('-', 20));

            preg_match_all('/<tr>\s*<td[^>]*>(.*?)<\/td>\s*<td[^>]*>(.*?)<\/td>\s*<td[^>]*>(.*?)<\/td>\s*<td[^>]*>(.*?)<\/td>\s*<td[^>]*>(.*?)<\/td>\s*<td[^>]*>(.*?)<\/td>\s*(<td[^>]*>(.*?)<\/td>\s*)?<\/tr>/is', $_priceListString, $matchPriceList);

            //var_dump($matchPriceList[1],$matchPriceList[2],$matchPriceList[3]);//exit;
            $length = count($matchPriceList[1]);
            for($i=1; $i<$length; $i++) { // 每隔一行， 数据有效
                //var_dump($matchPriceList[1][$i], __LINE__);
                $dom = new DOMDocument;
                $dom->loadHTML('<html lang="en"><head><meta charset="UTF-8"/></head><body>'.$matchPriceList[1][$i].'</body></html>');
                $elements = $dom->getElementsByTagName("a");
                if ($elements->length < 1) {
                    continue;
                }
                $name = $elements[0]->getAttribute('title');
                $nameMore = trim($elements[0]->textContent);
                //var_dump($subCategoryName,$name,$i, '<hr/>');//exit;
                if ($name=='升贴水' || $nameMore=='美元折算价') {
                    continue;
                }
                $elements = $dom->getElementsByTagName('div');

                $remark = '';
                if ($elements->length > 0) {
                    //continue;
                    $remark = $elements[$elements->length - 1]->nodeValue;
                }
                //var_dump($matchPriceList[1][$i],$elements, $i);//continue;
                //var_dump($elements, $remark->nodeValue);exit;
                //$name = $matchPriceList[1][$i];
                $priceScope = trim($matchPriceList[2][$i]);
                $avgPrice = trim($matchPriceList[3][$i]);
                $priceChange = trim($matchPriceList[4][$i]);
                $unit = trim($matchPriceList[5][$i]);
                $date = trim($matchPriceList[6][$i]);
                $dateInfo = explode('-', $date);

                $isMissing = intval('缺货'==$priceScope);

                $maxPrice = $minPrice = 0;

                if (! $isMissing) {
                    $priceInfo = explode('-', $priceScope);
                    $minPrice  = $priceInfo[0];
                    $maxPrice  = isset($priceInfo[1]) ? $priceInfo[1] : $minPrice;
                }
                $belongDay = intval($dateInfo[1]);
                $belongMonth = intval($dateInfo[0]);
                $belongYear = date('Y') - ($belongMonth==12 && date('n')==1 ? 1 : 0);
                /*
                var_dump(array(
                    'name'            => $name,
                    'category_id'     => $categoryId,
                    'sub_category_id' => $subCategoryId,
                    'price_scope'    => $priceScope,
                    'avg_price'      => $avgPrice,
                    'price_change'   => $priceChange,
                    'min_price'      => $minPrice,
                    'max_price'      => $maxPrice,
                    'belong_day'     => $belongDay,
                    'belong_month'   => $belongMonth,
                    'belong_year'    => $belongYear,
                    'unit'           => $unit,
                    'remark'         => $remark,
                    'is_missing'     => $isMissing
                 ));exit; //*/
                 $priceInfo = array(
                    'name'            => $name,
                    'category_id'     => $categoryId,
                    'sub_category_id' => $subCategoryId,
                    'price_scope'    => $priceScope,
                    'avg_price'      => $avgPrice,
                    'price_change'   => $priceChange,
                    'min_price'      => $minPrice,
                    'max_price'      => $maxPrice,
                    'belong_day'     => $belongDay,
                    'belong_month'   => $belongMonth,
                    'belong_year'    => $belongYear,
                    'unit'           => $unit,
                    'remark'         => $remark,
                    'is_missing'     => $isMissing
                 );
                 $this->debugInfos[] = sprintf(" %s \r\n", strval(var_export($priceInfo, true)));
                $this->metalPriceModel->insert('',$priceInfo);
            }
            $this->debugInfos[] = sprintf("%s SUB END: %s %s\r\n", str_repeat('-', 20), $subCategoryName, str_repeat('-', 20));
        }
        $this->debugInfos[] = sprintf("%s END:: %s %s\r\n\r\n\r\n", str_repeat('+', 20), $this->categoryList[$categoryId]['name'], str_repeat('+', 20));


        return true;
    }
    /**
     * 解析铝
     */
    protected function lvParser ($categoryId)
    {
        return $this->_commonParser($categoryId);
    }
    /**
     * 解析铅
     */
    protected function leadParser ($categoryId)
    {
        $pricePattern = '/<div class="singleList[^"]*">(.*)<div class="floor-first-right">/isu';

        return $this->_commonParser($categoryId, array('all'=>$pricePattern));
    }
    /**
     * 解析利源
     */
    protected function lyParser ($categoryId)
    {
        return $this->_commonParser($categoryId);
    }
    /**
     * 解析锌
     */
    protected function xinParser ($categoryId)
    {
        return $this->_commonParser($categoryId);
    }
    /**
     * 解析锡
     */
    protected function xiParser ($categoryId)
    {
        return $this->_commonParser($categoryId);
    }
    /**
     * 解析镍
     */
    protected function nieParser ($categoryId)
    {
        return $this->_commonParser($categoryId);
    }
    /**
     * 解析不锈钢
     */
    protected function bxgParser ($categoryId)
    {
        return $this->_commonParser($categoryId);
    }
    /**
     * 解析锰
     */
    protected function mengParser ($categoryId)
    {
        return $this->_commonParser($categoryId);
    }
    /**
     * 解析硅
     */
    protected function guiParser ($categoryId)
    {
        return $this->_commonParser($categoryId);
    }
    /**
     * 解析 钴锂
     */
    protected function glParser ($categoryId)
    {
        return $this->_commonParser($categoryId);
    }
    /**
     * 解析 锑
     */
    protected function tiParser ($categoryId)
    {
        return $this->_commonParser($categoryId);
    }
    /**
     * 解析钨
     */
    protected function wuParser ($categoryId)
    {
        return $this->_commonParser($categoryId);
    }
    /**
     * 解析贵金属
     */
    protected function gjsParser ($categoryId)
    {
        return $this->_commonParser($categoryId);
    }
    /**
     * 解析钢铁
     */
    protected function gtParser ($categoryId)
    {
        return $this->_commonParser($categoryId);
    }
    /**
     * 解析 铟镓锗
     */
    protected function yjzParser ($categoryId)
    {
        return $this->_commonParser($categoryId);
    }
    /**
     * 解析 铋硒碲
     */
    protected function bxtParser ($categoryId)
    {
        return $this->_commonParser($categoryId);
    }

    /**
     * 解析 小金属
     */
    protected function xjsParser ($categoryId)
    {
        return $this->_commonParser($categoryId);
    }

    /**
     * 解析 稀土
     */
    protected function xtParser ($categoryId)
    {
        return $this->_commonParser($categoryId);
    }

    /**
     * 解析 废金属
     */
    protected function fjsParser ($categoryId)
    {
        return $this->_commonParser($categoryId);
    }

    /**
     * 解析 长江
     */
    protected function cjParser ()
    {
    }

    public function loadDb ()
    {
        require_once(ROOT_PATH . 'system/init.php');

        loadClass('core_config');
        $this->db = loadClass('core_db');
    }

    public function __construct ($rootUrl, $configInfo=array())
    {
        if ($configInfo) {
            $this->configInfo = $configInfo;
        } else {
            $this->configInfo = require(dirname(__FILE__) . '/../../config/parseConfig.php');
        }
        $this->_allUrls = [$rootUrl];

        $this->loadDb();
        $this->categoryModel = Application::model('metalCategory');
        $this->subCategoryModel = Application::model('metalSubCategoryModel');
        $this->metalPriceModel = Application::model('metalPrice');
        //var_dump(Application::model('metalCategory')->getAll());
    }

    /**
     * 解析
     */
    public function parse ()
    {
        $isFinished = false;
        $isCategoryLoaded = false;

        while (! $isFinished) {
            // 逐个url解析内容
            foreach ($this->_allUrls as $_key=>$_url) {
                if (in_array($_url, $this->_loadedUrls)) {
                    continue;
                }
                $_realUrl = $this->configInfo['metal']['url_prefix'] . '/' . $_url;
                $this->_content = @ file_get_contents($_realUrl);

                //var_dump($this->_content);exit;

                if (! $this->_content) {
                    return;
                }

                //$this->_content = str_replace(array("\r", "\n"), '', $this->_content);

                // 解析分类
                if (! $isCategoryLoaded) {
                    $_categoryIdsList = $this->parseCategory($this->_content);
                    $isCategoryLoaded = true;
                }

                //var_dump($_result);exit;

                if (! $_categoryIdsList) {
                    return self::ERROR_PARSE_CATEGORY;
                }

                $_method = $_url . 'Parser';
                //var_dump($_method, method_exists($this, $_method));//exit;
                if (method_exists($this, $_method)) {
                    $_result = $this->$_method($_categoryIdsList[$_url]);

                    if (! $_result) {
                        return self::ERROR_PARSE_CONTENT;

                    }

                    $this->_loadedUrls[] = $_url;
                } else {
                }
                unset($this->_allUrls[$_key]);
            }

            $isFinished = count($this->_allUrls) == 0;
        }
    }

    /**
     * 解析分类
     */
    protected function parseCategory ()
    {
        if (! $this->_content) {
            return false;
        }
        // 获取全部分类的html
        if (! preg_match('/<div class="matal-category layout"\s?>(.*)?<\/header>/su', $this->_content, $matchCategoryString) ) {
            //var_dump($this->_content);
            return false;
        }
        //var_dump($matchCategoryString[1]);exit;
        // 解析分类
        preg_match_all('/<a href="([^"]*)"[^>]*>([^<]*)<\/a>/isu', $matchCategoryString[1], $matchCategoryList);
        //var_dump($matchCategoryList);exit;

        $oldCategoryList = $this->categoryModel->getAll();
        if ($oldCategoryList) {
            $_nameList = array_column($oldCategoryList, 'name');
            $_idList   = array_column($oldCategoryList, 'id');
            $this->categoryList = array_combine($_idList, $oldCategoryList);
            $oldCategoryList = array_combine($_nameList, $oldCategoryList);
        }
        // 逐个分类处理
        $categoryIds = [];
        foreach($matchCategoryList[1] as $_key=>$_categoryLink) {
            if (strpos($matchCategoryList[0][$_key], 'sub-item-nav-a')) {
                continue;
            }
            $_categoryLink = trim($_categoryLink, '/');
            $_categoryName = trim($matchCategoryList[2][$_key]);
            if (! in_array($_categoryLink, $this->_allUrls)) {
                $this->_allUrls[] = $_categoryLink;
            }
            if (! isset($oldCategoryList[$_categoryName])) {
                $categoryInfo = array('name'=>$_categoryName, 'url'=>$_categoryLink, 'is_valid'=>1);
                $id = $this->categoryModel->insert('', $categoryInfo);
                $this->categoryList[$id] = $categoryInfo;
            } else {
                if ($oldCategoryList[$_categoryName]['is_valid']!='1'
                 || $oldCategoryList[$_categoryName]['url'] != $_categoryLink) {
                    $this->categoryModel->update('', array('is_valid'=>1, 'url'=>$_categoryLink), 'id='.$oldCategoryList[$_categoryName]['id']);
                }
                $id = $oldCategoryList[$_categoryName]['id'];
            }

            $categoryIds[$_categoryLink] = $id;
        }
        //var_dump($this->_allUrls);

        return $categoryIds;
    }
}
// 设置运行时间不限制
@set_time_limit(0);
$parseMetalModel = new ParseMetal('tong');

$parseMetalModel->parse();

if ($parseMetalModel->hasError()) {
    $debugInfos = $parseMetalModel->getDebugInfo();
    $mailContent = '';
    foreach ($debugInfos as $_debugInfo) {
        echo $mailContent .= $_debugInfo;
    }
    Application::mail()->send('wangkilin@126.com', '失败 - 金属价格数据获取失败', nl2br($mailContent), get_setting('site_name'), '爱码帮');
}
/* EOF */
