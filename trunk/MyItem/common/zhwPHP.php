<?php
/**
 * ------------------------------
 * 框架核心
 * ------------------------------
 * @name    zhwPHP.php
 * @version 2010.04.26
 * @author  张宏伟
 */

@session_start();
function __autoload($className)
{
    $file = 'lib/'.$className.'.class.php';
    if (is_file($file)) require_once($file);
}

if (!file_exists('common/config.php'))
{
    $config = "<?php\r\n\$config = array\r\n(\r\n\t//'KEY' = > 'value'\r\n);\r\n";
    $config .= "\$db_config = array
(
    'DB_HOST' => 'localhost',    //数据库地址
    'DB_USER' => 'root',         //数据库用户
    'DB_PASS' => '123456',       //数据库密码
    'DB_NAME' => 'myitem',       //数据库名
    'DB_CHARSET'  => 'utf8',     //数据库字符集
    'DB_ERROR' => true           //开启自定义数据库报错
);";
    file_put_contents('common/config.php',$config);
}

require_once('common/config.php');
$db = new Mysql($db_config);
global $db;

require_once('common/func.php');
@include_once('common/function.php');

$module = empty($_GET['module']) ? 'index' : $_GET['module'];
$act    = empty($_GET['act']) ? 'index' : $_GET['act'];
$do     = empty($_GET['do']) ? 'index' : $_GET['do'];
!file_exists('module/'.$module.'/'.$act.'Action.php') && exit('file is not exists!');
include('module/'.$module.'/'.$act.'Action.php');
$className = $act.'Action';
$action = new $className;
$action->$do();
?>