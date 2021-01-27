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
//define('CONF_PATH', realpath(dirname(__DIR__) . DIRECTORY_SEPARATOR . 'system/config') . DIRECTORY_SEPARATOR);

if (! file_exists(CONF_PATH . 'database.php') AND ! file_exists(CONF_PATH . 'install.lock.php')) {
    header('Location: ./install/');
    exit;
}

require '../system/init.php';

Application::run();

//var_dump(core_filemanager::getDirContentByPage(WEB_ROOT_DIR . 'static/', 1, 20));
/* EOF */
