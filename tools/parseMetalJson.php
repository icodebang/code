<?php

/**
 *
 */
class ParseMetalJson
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

    protected $db = null;
    protected $model = null;
    // `name` varchar(40) NOT NULL COMMENT '金属名字',
    // `category_name` varchar(5) NOT NULL DEFAULT '' COMMENT '所属分类名字',
    // `sub_category_name` varchar(10) DEFAULT NULL COMMENT '子分类',
    // `brand` varchar(30) NOT NULL DEFAULT '' COMMENT '品牌/规格',
    // `material` varchar(11) DEFAULT NULL COMMENT '材质',
    // `avg_price` varchar(15) NOT NULL COMMENT '平均价格',
    // `price_change` varchar(15) NOT NULL COMMENT '价格变化',
    // `min_price` decimal(10,2) NOT NULL COMMENT '最低价',
    // `max_price` decimal(10,2) NOT NULL COMMENT '最高价',
    // `belong_day` smallint(2) NOT NULL COMMENT '记录所属天',
    // `belong_month` smallint(2) NOT NULL COMMENT '记录所属月',
    // `belong_year` mediumint(4) NOT NULL COMMENT '记录所属年',
    // `unit` varchar(20) NOT NULL COMMENT '单位',
    // `remark` varchar(200) NOT NULL DEFAULT '' COMMENT '市场',
    // `location` varchar(10) NOT NULL DEFAULT '' COMMENT '地区/市场',
    // `sync_date` date DEFAULT NULL COMMENT '数据同步日期',
    protected $jsonDbMap = array(
        'morePrice' => array (
            "productSortName"   => 'name',//string(5) "1#铜"
            "placeOrTrademark"  => 'brand',//string(2) "1#"
            "trademark"         => 'remark',// string(6) "烟台"
            "minPrice"          => 'min_price',
            "maxPrice"          => 'max_price',
            "avgPrice"          => 'avg_price',
            "highsLowsAmount"   => 'price_change',
            "unit"              => 'unit',
            "marketName"        => 'location',
            "publishDateTime"   => array('belong_year', 'belong_month', 'belong_day'),
        ),
        'onePrice' => array (
            "productSortName"   => 'name',//string(12) "430/2B卷板"
            "spec"              => 'material',//string(8) "1.0*1219"
            "trademark"         => 'brand',//string(6) "430/2B"
            "cityName"          => 'location', // string(9) "无锡市"
            "supplier"          => 'supplier',//string(6) "酒钢"
            "price"             => 'avg_price',
            "highsLowsAmount"   => 'price_change',
            "publishDate"       => array('belong_year', 'belong_month', 'belong_day'),
            "remak"             => 'remark',//string(6) "含税"
            //"cityCode"          => 'location', //string(6) "520200"
        )
    );

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

    public function loadDb ()
    {
        require_once(ROOT_PATH . 'system/init.php');

        loadClass('core_config');
        $this->db = loadClass('core_db');
    }

    public function __construct ($configInfo=array())
    {
        if ($configInfo) {
            $this->configInfo = $configInfo;
        } else {
            $this->configInfo = require(dirname(__FILE__) . '/../../config/parseConfig.php');
        }

        $this->loadDb();
        $this->model = Application::model();
        //var_dump(Application::model('metalCategory')->getAll());
    }

    /**
     * 解析
     */
    public function parse ()
    {
        foreach ($this->configInfo['metal_json']['list'] as $_itemInfo) {

            $row = $this->model->fetch_one('metal_price_cj', '*','category_name="'.$this->model->quote($_itemInfo['name']).'" AND sync_date="'.date('Y-m-d').'"');
            if ($row) {
                continue;
            }
            $url    = isset($_itemInfo['url']) ? $_itemInfo['url'] : $this->configInfo['metal_json']['url'];
            $header = isset($_itemInfo['header']) ? $_itemInfo['header'] : $this->configInfo['metal_json']['header'];
            $params = isset($_itemInfo['params']) ? $_itemInfo['params'] : null;
            $categoryName = $_itemInfo['name'];

            $urlInfo = parse_url($url);
            $header = array_merge($header, $urlInfo);

            $fileContent = curlRequest($url, 'POST', $header, $params);

            if (is_array($fileContent)) { // 获取文章内容， http请求错误
                if ($fileContent['status']==404) {
                    echo "''''' Status is 404\r\n";
                    return;
                } else {
                    $fileContent = '';
                }
            }

            list($responseHeader, $this->_content) = explode("\r\n\r\n", $fileContent, 2);
            $info = json_decode($this->_content, true);
            if (isset($info['body'],$info['body']['marketPriceList'])) {
                $info = $info['body']['marketPriceList'];
            } else if (isset($info['body'],$info['body']['quotaVoList'])) {
                $info = $info['body']['quotaVoList'];
            } else {
                continue;
            }
            $mapKey = '';
            foreach ($info as $_metalInfo) {
                if (! $mapKey) {
                    foreach ($this->jsonDbMap as $_tmpMapKey => $_mapInfo) {
                        $hasFound = true;
                        foreach ($_mapInfo as $_key=>$_dbKey) {
                            if (! isset($_metalInfo[$_key])) {
                                var_dump($_metalInfo,$_key);
                                $hasFound = false;
                                break;
                            }
                        }
                        if ($hasFound) {
                            $mapKey = $_tmpMapKey;
                            break;
                        }
                    }
                }
                //var_dump($mapKey, __LINE__);
                if (! $mapKey) {
                    break;
                }

                $set = array();
                foreach ($this->jsonDbMap[$mapKey] as $_jsonKey=>$_dbKey) {
                    if (is_array($_dbKey)) {
                        $dateList = array('Y','n','d');
                        foreach ($_dbKey as $_index=>$_dbKeyName) {
                            $set[$_dbKeyName] = date($dateList[$_index], strtotime($_metalInfo[$_jsonKey]));
                        }
                    } else {
                        $set[$_dbKey] = $_metalInfo[$_jsonKey];
                    }
                }
                if ($set) {
                    $set['category_name'] = $_itemInfo['name'];
                    $set['sync_date']     = date('Y-m-d');
                }
                $this->model->insert('metal_price_cj', $set);
            }
        }
    }
}
// 设置运行时间不限制
@set_time_limit(0);

sleep(rand(1,1000)); // 随机中断

$parseMetalModel = new ParseMetalJson();

$parseMetalModel->parse();

if ($parseMetalModel->hasError()) {
    $debugInfos = $parseMetalModel->getDebugInfo();
    $mailContent = '';
    foreach ($debugInfos as $_debugInfo) {
        $mailContent .= $_debugInfo;

        echo $_debugInfo;
    }
    Application::mail()->send('wangkilin@126.com', '失败 - 金属价格数据获取失败', nl2br($mailContent), get_setting('site_name'), '爱码帮');
}
/* EOF */
