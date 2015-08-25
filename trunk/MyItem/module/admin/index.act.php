<?php
class index
{
    function index()
    {
        global $db;
        
        //转到登陆页面
        if (!isset($_GET['do']) || $_GET['do'] == '')
        {
            tpl('index');
        }
        
        //处理登陆事件
        elseif ($_GET['do'] == 'login' && isset($_POST['user']))
        {
            $arr = escape($_POST,'yes');
            (strtolower($arr['code']) != $_SESSION['authCode']) && show('登陆失败','验证码错误','-1');
            $rs = $db->row_query_one("SELECT `passwd` FROM `user` WHERE `user`='{$arr['user']}'");
            (!isset($rs['passwd']) || ($rs['passwd'] != md5($arr['passwd']))) && show('登陆失败','用户名或密码错误','-1');
            $_SESSION['user'] = $arr['user'];
            tpl('main');
        }
        
        //判断是否登陆
        !isset($_SESSION['user']) && exit('Please login!');
        
        //退出登陆
        if ($_GET['do'] == 'logout')
        {
            @rm('cache');
            unset($_SESSION['user']);
            echo "<script language=javascript>location.href='index.php';</script>";
        }
        
        exit;
    }
}
?>