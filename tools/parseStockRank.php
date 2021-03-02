<?php

/**
 *
 */
class ParseStockRank
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

    protected $jsonDbMap = array(
            "popular_rank"   => 'rank',//string(5) "1#铜"
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
    }

    /**
     * 解析
     */
    public function parse ()
    {
        $maxDate =  $this->model->max('stock_code', 'belong_date');
        $stockList = $this->model->fetch_all('stock_code', 'belong_date = "' . $maxDate . '"');

        $nowDateHour =  date("YmdH");
        $header = $this->configInfo['stock_rank']['header'];
        $param  = $this->configInfo['stock_rank']['param'];

        foreach ($stockList as $_itemInfo) {;
            $tmpItemInfo = $this->model->fetch_row('stock_focus_rank', 'belong_date_hour = ' . $nowDateHour . ' AND stock_code="' . $_itemInfo['code'] . '"');
            if ($tmpItemInfo) {
                continue;
            }
            $header['Referer'] = sprintf($this->configInfo['stock_rank']['header']['Referer'], $_itemInfo['code']);
            $param['param']    = sprintf($this->configInfo['stock_rank']['param']['param'], $_itemInfo['code']);

            $urlInfo = parse_url($this->configInfo['stock_rank']['url']);
            $header = array_merge($header, $urlInfo);

            $fileContent = curlRequest($this->configInfo['stock_rank']['url'],
                                        'POST',
                                        $header,
                                        $param,
                                    );

            if (is_array($fileContent)) { // 获取文章内容， http请求错误
                if ($fileContent['status']==404) {
                    echo "''''' Status is 404\r\n";
                    return;
                } else {
                    $fileContent = '';
                }
            }

            list($responseHeader, $this->_content) = explode("\r\n\r\n", $fileContent, 2);
            $this->_content = gzdecode($this->_content);
            $info = @ json_decode($this->_content, true);
            if (! $info['popular_rank']) {
                continue;
            }

            $set = array(
                'rank'              => $info['popular_rank'],
                'stock_code'        => $_itemInfo['code'],
                'belong_date_hour'  => $nowDateHour,
            );
            $this->model->insert('stock_focus_rank', $set);
        }
    }
}
// 设置运行时间不限制
@set_time_limit(0);

//sleep(rand(1,1000)); // 随机中断

$parseStockRank = new ParseStockRank();

$parseStockRank->parse();

if ($parseStockRank->hasError()) {
    $debugInfos = $parseStockRank->getDebugInfo();
    $mailContent = '';
    foreach ($debugInfos as $_debugInfo) {
        $mailContent .= $_debugInfo;

        echo $_debugInfo;
    }
    Application::mail()->send('wangkilin@126.com', '失败 - 金属价格数据获取失败', nl2br($mailContent), get_setting('site_name'), '爱码帮');
}
/* EOF */
