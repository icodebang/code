#!/usr/bin/env php
<?php
/**
 * 陆股通 数据抓取
 */
class Lugutong
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

    public function __construct ($configInfo=array())
    {
        $this->configInfo = require(dirname(__FILE__) . '/../../config/parseConfig.php');
        $this->configInfo = array_merge($this->configInfo, $configInfo);

        require_once(ROOT_PATH . 'system/init.php');
        importClass('WebService');
        importClass('ErrorCoder');

        loadClass('core_config');
        $this->db = loadClass('core_db');

        $this->lugutongModel = Application::model();
    }

    /**
     * 解析
     */
    public function requestByDate ($date)
    {
        error_reporting(E_ALL);
        $webServiceModel = new WebService();
        $url =   $this->configInfo['lugutong']['lugutong_sz_url'];
        $urlSH = $this->configInfo['lugutong']['lugutong_sh_url'];
        // 最大允许请求前一天
        $allowMaxDateTime = strtotime(date('Y-m-d')) - 24 * 60 * 60;
        $requestTime = strtotime($date);
        $requestTime > $allowMaxDateTime AND $requestTime = $allowMaxDateTime;
        $date = date('Y/m/d', $requestTime);
        // 先获取当天数据
        // echo "query SZ data. start:" , time(), "\r\n";
        $response = $webServiceModel->request($url);
        // echo "query SZ data. End:" , time(), "\r\n";
        $dataInfo = $this->parse($response);
        $dataInfo['dataSZ'] = $dataInfo['data'];
        if ($date == date('Y/m/d', $allowMaxDateTime)) { // 请求当天数据, 直接返回
            // echo "query SH data. start:" , time(), "\r\n";
            $response = $webServiceModel->request($urlSH);
            // echo "query SH data. start:" , time(), "\r\n";
            $dataInfoSH = $this->parse($response);
            $dataInfo['dataSH'] = $dataInfoSH['data'];

            return $dataInfo;
        }

        // 获取历史数据
        $params = $dataInfo['form'];
        $params['txtShareholdingDate'] = $date;
        // echo "query SZ history data. start:" , time(), "\r\n";
        $response = $webServiceModel
                        ->setHeaders(array(
                            'Accept'            =>'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                            'Accept-Encoding'   => '',
                        ))
                        ->setParams($params)
                        ->request($url, WebService::HTTP_CRUD_C);
        // echo "query SZ history data. start:" , time(), "\r\n";
        $dataInfo = $this->parse($response);$this->parse($response);
        $dataInfo['dataSZ'] = $dataInfo['data'];
        // echo "query SH history data. start:" , time(), "\r\n";
        $response = $webServiceModel
                        ->setHeaders(array(
                            'Accept'            =>'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                            'Accept-Encoding'   => '',
                        ))
                        ->setParams($params)
                        ->request($urlSH, WebService::HTTP_CRUD_C);
        // echo "query SH history data. start:" , time(), "\r\n";
        $dataInfoSH = $this->parse($response);
        $dataInfo['dataSH'] = $dataInfoSH['data'];

        return $dataInfo;
    }

    public function parse ($httpResponse)
    {
        $dataInfo = array('form'=>array(), 'data'=>array());

        $dom = new DOMDocument();
        $dom->loadHTML('<meta http-equiv="Content-Type" content="text/html; charset=utf-8">' . $httpResponse);
        $body = $dom->getElementsByTagName('body');
        $elementForm = $dom->getElementById('form1');
        // 获取全部的input名称和值， 后续用里面的名称和值，传递参数
        $inputElementList = $elementForm->getElementsByTagName('input');
        foreach ($inputElementList as $_element) {
            $_name = $_element->getAttribute('name');
            $_value = $_element->getAttribute('value');
            $dataInfo['form'][$_name] = $_value;
        }
        // 获取表格中的数据信息， 解析出来股票数据
        $tableElement = $dom->getElementById('mutualmarket-result');
        $tbodyElementList = $tableElement->getElementsByTagName('tbody');
        $trElementList = $tbodyElementList[0]->getElementsByTagName('tr');
        foreach ($trElementList as $_trElement) {
            $tdElementList = $_trElement->getElementsByTagName('td');

            foreach ($tdElementList as $_tdElement) {
                $_divElementList = $_tdElement->getElementsByTagName('div');
                $_text = $_divElementList[1]->textContent;
                //$_text = explode(':', $_tdElement->nodeValue);
                //$_text = trim(array_pop($_text));

                switch($_tdElement->getAttribute('class')) {
                    case 'col-stock-code':// 股票代码
                        $_code = $_text;
                        break;
                    case 'col-stock-name': // 股票名称
                        $_name = $_text;
                        break;
                    case 'col-shareholding': // 持股数
                        $_share = str_replace(',', '', $_text);
                        break;
                    case 'col-shareholding-percent': // 占比百分数
                        $_percent = str_replace('%', '', $_text);
                        break;
                    default:
                        break;
                }
            }
            $dataInfo['data'][] = array('hk_code'=>$_code, 'name'=>$_name, 'share'=>$_share, 'percent'=>$_percent);
            //$this->lugutongModel->insert('stock_lugutong', array('code'=>$_code, 'name'=>$_name, 'share'=>$_share, 'percent'=>$_percent));
        }

        return $dataInfo;
    }
}

// 设置运行时间不限制
@set_time_limit(50);
ini_set('date.timezone', 'Asia/Shanghai');
//sleep(rand(1,1000)); // 随机中断
$startTime = time();
$lugutongModel = new Lugutong();

error_reporting(0);

$dbModel = Application::model();
// 获取最后的同步日期， 以此日期为基准 + 1天 作为参数获取数据
$lastDate = $dbModel->fetch_one('key_value', 'value', 'varname = "stock_lugutong_sync_date"');
$thisDateTime = strtotime($lastDate) + 24 * 60 *60;
// echo 'This date:' , date('Y-m-d', $thisDateTime), "\r\n";
// 最多获取到昨天的数据
if ($thisDateTime >= strtotime(date('Y-m-d')) ) {
    exit();
}
// 获取本次日期数据
$syncDate = date('Y/m/d', $thisDateTime);
// echo 'Query start', "\r\n";
$data = $lugutongModel->requestByDate($syncDate);
if ($data['form']['alertMsg'] != '') { // 有错误信息
    // echo $data['form']['alertMsg'];
    exit();
}
// echo 'Query end', "\r\n";
if (empty($data['dataSZ']) || empty($data['dataSH']) ) {
// 数据不完整， 本次数据无效， 退出
    // echo "No data returned\r\n";
    exit();
}

if (time() - $startTime > 250) {
    // echo "It's timeout! \r\n";
    exit();
}

// echo "Do store data \r\n";
// 删除对应日期的旧数据
$dbModel->delete('stock_lugutong', 'belong_date = "' . $data['form']['txtShareholdingDate'] . '"');

// 陆股通的代码和沪深股市代码映射关系
$convertCodeMap = array (
    '70'=>'000',
    '71'=>'001',
    '72'=>'002',
    '77'=>'300',
    '90'=>'600',
    '91'=>'601',
    '93'=>'603',
    '98'=>'688'
);

// 存储数据
foreach ($data['dataSZ'] as $_info) {
    $_info['belong_date'] = $data['form']['txtShareholdingDate'];
    $_info['sh_or_sz'] = 'sz';
    $_info['code']     = $convertCodeMap[substr($_info['hk_code'],0,2)]
                        . substr($_info['hk_code'], 2);
    $dbModel->insert('stock_lugutong', $_info);
}
foreach ($data['dataSH'] as $_info) {
    $_info['belong_date'] = $data['form']['txtShareholdingDate'];
    $_info['sh_or_sz'] = 'sh';
    $_info['code']     = $convertCodeMap[substr($_info['hk_code'],0,2)]
                        . substr($_info['hk_code'], 2);
    $dbModel->insert('stock_lugutong', $_info);
}
// 更新同步时间
$dbModel->update('key_value', array('value'=>$syncDate), 'varname = "stock_lugutong_sync_date"');

    //Application::mail()->send('wangkilin@126.com', '失败 - 金属价格数据获取失败', nl2br($mailContent), get_setting('site_name'), '爱码帮');

/* EOF */
