<?php
class top
{
    function top()
    {
        //判断是否登陆
        !isset($_SESSION['user']) && exit('Please login!');
        
        tpl('top');
    }
}
?>