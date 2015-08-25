<?php
class menu
{
    function menu()
    {
        global $db;
        
        //判断是否登陆
        !isset($_SESSION['user']) && exit('Please login!');
        
        tpl('menu');
    }
}
?>