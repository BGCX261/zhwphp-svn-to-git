<?php
require('common/config.php');
require('common/Base.php');
function __autoload($className)
{
    require('lib/'.$className.'.class.php');
}
require('common/func.php');
global $db;
$db = new Mysql($db_config);
new Base;
?>