<?php
class right
{
    function right()
    {
        //判断是否登陆
        !isset($_SESSION['user']) && exit('Please login!');
        
        tpl('right');
    }
}
?>