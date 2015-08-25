<?php
/**
 * ------------------------------
 * 框架核心
 * ------------------------------
 * @version 2010.03.28
 */
class Base
{
    function Base()
    {
        $module = ((!isset($_GET['module']) || $_GET['module'] == '') ? 'index' : $_GET['module']);
        $act    = ((!isset($_GET['act']) || $_GET['act'] == '') ? 'index' : $_GET['act']);
        !file_exists('module/'.$module.'/'.$act.'.act.php') && exit('error!');
        include('module/'.$module.'/'.$act.'.act.php');
        return new $act;
    }
}

/**
 * ------------------------------
 * 解析模板函数，将值传到模板中来显示
 * ------------------------------
 * @param  string $tplName 需要拿的模板名称
 * @param  string $key     变量的名字
 * @param  unknown_type $value 变量的值
 */
function tpl($tplName,$key='',$value='')
{
    header("Content-Type:text/html; charset=utf-8");
    $module = ((!isset($_GET['module']) || $_GET['module'] == '') ? 'index' : $_GET['module']);
    if ($key != '') $$key = $value;
    include('tpl/'.$module.'/'.$tplName.'.tpl.php');
    exit;
}
?>