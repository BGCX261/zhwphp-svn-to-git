<?php
class system
{
    function system()
    {
        global $db;
        //判断是否登陆
        !isset($_SESSION['user']) && exit('Please login!');
        
        if (isset($_GET['do']) && $_GET['do'] == 'optimize')
        {
            $tables = $db->get_table_names();
            $rs = $db->optimize_table($tables);
            if ($rs)
            {
                show('优化成功','数据表优化成功！','-1');
            }
            else 
            {
                show('优化失败','数据表优化失败！','-1');
            }
        }
        
        if (isset($_GET['do']) && $_GET['do'] == 'clean')
        {
            $rs = rm('cache');
            if ($rs)
            {
                show('清除缓存成功！','清除缓存成功！','-1');
            }
            else 
            {
                show('清除缓存失败！','清除缓存失败！','-1');
            }
        }
        
        tpl('system');
    }
}
?>