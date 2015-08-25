<?php
/**
 * ------------------------------
 * 后台登陆
 * ------------------------------
 * @name    indexAction.php
 * @author  张宏伟
 */

class indexAction
{
    function index()
    {
        tpl('index');
    }

    function login()
    {
        !isset($_POST['user']) && exit;
        $arr = escape($_POST,'yes');
        (strtolower($arr['code']) != $_SESSION['authCode']) && show('登陆失败','验证码错误','-1');
        $rs = $db->row_query_one("SELECT `passwd` FROM `user` WHERE `user`='{$arr['user']}'");
        (!isset($rs['passwd']) || ($rs['passwd'] != md5($arr['passwd']))) && show('登陆失败','用户名或密码错误','-1');
        $_SESSION['user'] = $arr['user'];
        tpl('main');
    }

    function logout()
    {
        !isset($_SESSION['user']) && exit('Please login!');
        @rm('cache');
        unset($_SESSION['user']);
        echo "<script language=javascript>location.href='index.php';</script>";
    }
}
?>