<?php
class website
{
    function website()
    {
        global $db;
        
        //判断是否登陆
        !isset($_SESSION['user']) && exit('Please login!');
        
        if (isset($_POST['edit']))
        {
            $Model = new Model('website_info');
            $rs = $Model->update();
            $Model->msg($rs,'修改网站信息成功！','修改网站信息失败！');
        }
        $rs_website = $db->row_query_one("SELECT * FROM website_info");
        tpl('website','rs_website',$rs_website);
    }
}?>