<?php
class ajax
{

    function ajax()
    {
        global $db;
        
        //查询条件，必须有do的值
        (!isset($_GET['do']) || $_GET['do'] == '') && exit;
        
        //判断验证码
        if (isset($_GET['code']) && $_GET['code'] != '')
        {
            echo (strtolower($_GET['code']) == $_SESSION['authCode'] ? 'yes' : 'no');
        }
        
        //判断用户密码
        elseif (isset($_POST['user']) && $_POST['user'] != '' && isset($_POST['passwd']) && $_POST['passwd'] != '')
        {
            $arr = escape($_POST,'yes');
            $rs = $db->row_query_one("SELECT `passwd` FROM `user` WHERE `user`='{$arr['user']}'");
            echo ((isset($rs['passwd']) && ($rs['passwd'] == md5($arr['passwd']))) ? 'yes' : 'no');
        }
        
        exit;
    }
}
?>