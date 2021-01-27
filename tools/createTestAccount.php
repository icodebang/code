<?php
/**
 * 在后台创建10000个内部账号
 */
set_time_limit(0);

// 记录程序开始时间， 后续统一用这个时间做时间戳转换
defined('APP_START_TIME') OR define('APP_START_TIME', time());
$configInfo = require(dirname(__FILE__) . '/../../config/parseConfig.php');

require_once(ROOT_PATH . 'system/init.php');

error_reporting(E_ALL ^ E_WARNING ^ E_NOTICE ^ E_DEPRECATED);
//error_reporting(E_ALL);

for ($i=1; $i<=10000; $i++) {
    Application::model('account')->user_register('innerAccount_'.$i, 'iCodeBang.comIsGreat', 'innerAccount_'.$i.'@mail.icodebang.com');
}



/* EOF */
