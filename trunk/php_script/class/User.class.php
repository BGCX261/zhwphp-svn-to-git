<?php
/**
 * ------------------------------
 * 用户注册登陆类
 * ------------------------------
 * @name    User.class.php
 * @version 2010.05.10
 * @author  张宏伟
 */

class User
{
    /**
     * ------------------------------
     * what to do
     * ------------------------------
     * @param  unkonw_type
     * @return unknow_type
     */
    function login($userName,$userPass,$authCode)
    {
        if(!isset($userName)) $userName = $_POST['userName'];
        if(!isset($userPass)) $userPass = $_POST['userPass'];
        if(!isset($authCode)) $authCode = $_POST['authCode'];
        $userInfo = self::chk_user($userName,$userPass,$authCode);
        $_SESSION['userID'] = $userInfo['user_id'];
        $_SESSION['nickName'] = $userInfo['nick_name'];
        $_SESSION['userType'] = $userInfo['user_type'];
        $loginTime = time();
        if(!function_exists('get_client_ip')) include_once('../common/function.php');
        $loginIP = get_client_ip();
        global $db;
        $arr = array('login_time'=>$loginTime,'login_ip'=>$loginIP);
        $db->row_insert('users',$arr,"user_id={$userInfo['user_id']}");
        return $userInfo;
    }
     
    /**
     * ------------------------------
     * what to do
     * ------------------------------
     * @param  unkonw_type
     * @return unknow_type
     */
    function chk_user($userName,$userPass,$authCode)
    {
        if(!function_exists('show')) include_once('../common/function.php');
        $userName = escape(str_replace(' ','',$userName));
        if(empty($userName)) show('请输入用户名！','-1');
        if(empty($userPass)) show('请输入密码！','-1');
        if(empty($authCode)) show('请输入验证码！','-1');
        if(strtolower($authCode) != $_SESSION['authCode']) show('验证码错误','-1');
        global $db;
        $rs = $db->row_select_one('users',"`user_name`='$userName'");
        if(!isset($rs['user_pass']) || $rs['user_pass'] != $userPass) show('用户名或密码错误！');
        if($rs['user_type'] == 0) show('用户正在审核中，请与管理员联系！','-1');
        unset($rs['user_name']);
        unset($rs['user_pass']);
        return $rs;
    }
    
    /**
     * ------------------------------
     * what to do
     * ------------------------------
     * @param  unkonw_type
     * @return unknow_type
     */
    function regist($userName,$userPass,$userEmail,$name,$authCode)
    {
        $userName = escape(str_replace(' ','',$userName));
        $userPass = escape(str_replace(' ','',$userPass));
        $userEmail = escape(str_replace(' ','',$userEmail));
        $name = escape(str_replace(' ','',$name));
        if(empty($userName)) show('请输入用户名！','-1');
        if(empty($userPass)) show('请输入密码！','-1');
        if(empty($userPass)) show('请输入邮箱！','-1');
        if(empty($name)) show('请输入真实姓名！','-1');
        if(empty($authCode)) show('请输入验证码！','-1');
        $time = time();
        global $db;
        $arr = array('user_name'=>$userName,'user_pass'=>$userPass,'user_email'=>$userEmail,'name'=>$name,'regist_time'=>$time);
        $rs = $db->row_insert('users',$arr);
        if(!function_exists('show')) include_once('../common/function.php');
        if($rs) show('注册成功，请与管理员联系审核帐户！','index.html');
        else show('注册失败，请与管理员联系！','index.html');
    }
}
?>