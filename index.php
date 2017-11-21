<?php
/**
+-------------------------------------------+
|   iCodeBang CMS [#RELEASE_VERSION#]       |
|   by iCodeBang.com Team                   |
|   © iCodeBang.com. All Rights Reserved    |
|   ------------------------------------    |
|   Support: icodebang@126.com              |
|   WebSite: http://www.icodebang.com       |
+-------------------------------------------+
*/
define('WEB_ROOT_DIR', __DIR__ . DIRECTORY_SEPARATOR);
// 配置文件路径
define('CONF_PATH', realpath(dirname(__DIR__) . DIRECTORY_SEPARATOR . 'config') . DIRECTORY_SEPARATOR);

if (! file_exists(dirname(__FILE__) . '/../system/config/database.php') AND ! file_exists(dirname(__FILE__) . '/../system/config/install.lock.php'))
{
	header('Location: ./install/');
	exit;
}
include('../system/system.php');

Application::run();

/* EOF */