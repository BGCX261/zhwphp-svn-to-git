<?php
/**
 * @copyright zhwphp.com
 * @author �ź�ΰ <zhw@zhwphp.com>
 * @charset gbk
 * Mon Nov 01 23:07:45 CST 2010
 */

define('APP_IN',true);
error_reporting(E_ALL);
date_default_timezone_set('PRC');
@set_magic_quotes_runtime(0);
@session_start();

if (isset($_REQUEST['GLOBALS'])) exit('Request tainting attempted.');

//����Ŀ¼(��/)
define('WEB_ROOT',str_replace(array('\\','//'),array('/','/'),dirname(__FILE__).DIRECTORY_SEPARATOR));
//��վURL(��/)
define('WEB_URL','http://'.$_SERVER['HTTP_HOST'].($_SERVER['SERVER_PORT'] == 80 ? '' : ':'.$_SERVER['SERVER_PORT']).substr($_SERVER['PHP_SELF'],0,strrpos($_SERVER['PHP_SELF'],'/')));
//��ǰ�ļ���(�޺�׺)
define('FILE',basename($_SERVER['PHP_SELF'],'.php'));

//���������ļ������ð���·��
include(WEB_ROOT.'config.inc.php');
set_include_path(get_include_path().PATH_SEPARATOR.WEB_ROOT.'include');
include('common.func.php');

//���ݿ�����
include('Mysql.class.php');
$db = new Mysql($db_config);

//memcache֧��
//$MC = new Memcache();
//$MC->connect($MC_config['MC_HOST'],$MC_config['MC_PORT']) or die('can not connect Memcache');

//ʱ��
$mtime = explode(' ', microtime());
define('TIMESTAMP', $mtime[0]);
define('MICROTIME', (float)$mtime[0] + (float)$mtime[1]);

//GPC����
define('MAGIC_QUOTES_GPC', get_magic_quotes_gpc());
if (!MAGIC_QUOTES_GPC) foreach (array($_GET, $_POST, $_REQUEST, $_COOKIE) as $v) $v = _addslashes($v);
?>