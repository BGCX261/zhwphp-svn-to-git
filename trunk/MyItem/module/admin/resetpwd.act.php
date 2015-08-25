<?php
class resetpwd
{
    function resetpwd()
    {
        global $db;
        
        //判断是否登陆
        !isset($_SESSION['user']) && exit('Please login!');
        
        //转到登陆页面
        if(!isset($_POST['update']))
        {
            tpl('resetpwd');
        }
        
        //处理修改密码事件
        $post = htmlescape($_POST,'yes');
        $rs = $db->row_query_one("SELECT * FROM user WHERE user='{$_SESSION['user']}'");
        if(!isset($rs['passwd']) || $rs['passwd'] != md5($post['passwd']))
        {
            show('提示','原密码输入错误','-1');
            exit;
        }
        
        $arr = array('user'=>$post['user'],'passwd'=>md5($post['newpwd']));
        $rs = $db->row_update('user',$arr,"user='{$_SESSION['user']}'");
        if($rs)
        {
            $_SESSION['user'] = $post['user'];
            show('提示','修改成功，下次登陆请使用新密码','?module=admin&act=right');
        }
        else
        {
            show('提示','修改密码失败,请稍后再试','-1');
        }
        
        exit;
    }
}
?>