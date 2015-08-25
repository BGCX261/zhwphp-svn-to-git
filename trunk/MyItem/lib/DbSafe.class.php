<?php
/**
 * ------------------------------
 * 防止SQL注入
 * ------------------------------
 * @author  张宏伟
 * @name    DbSafe.class.php
 * @date    Fri Mar 12 14:08:42 CST 2010
 */
class DbSafe
{
    private $arrBefore = array(
    0  => 'and',
    1  => 'execute',
    2  => 'update',
    3  => 'count',
    4  => 'chr',
    5  => 'mid',
    6  => 'master',
    7  => 'truncate',
    8  => 'char',
    9  => 'declare',
    10 => 'select',
    11 => 'create',
    12 => 'delete',
    13 => 'insert',
    14 => "'",
    15 => '"',
    16 => ' ',
    17 => 'or',
    18 => '=',
    19 => '%20');
    private $arrAfter = array(
    0  => '[and]',
    1  => '[execute]',
    2  => '[update]',
    3  => '[count]',
    4  => '[chr]',
    5  => '[mid]',
    6  => '[master]',
    7  => '[truncate]',
    8  => '[char]',
    9  => '[declare]',
    10 => '[select]',
    11 => '[create]',
    12 => '[delete]',
    13 => '[insert]',
    14 => "[']",
    15 => '["]',
    16 => '[ ]',
    17 => '[or]',
    18 => '[=]',
    19 => '[%20]');
    function dbin($str)
    {
        for ($i=0;$i<count($this->arrBefore);$i++)
        {
            $str = str_replace($this->arrBefore[$i],$this->arrAfter[$i],$str);
        }
        return $str;
    }

    function dbout($str)
    {
        for ($i=0;$i<count($this->arrAfter);$i++)
        {
            $str = str_replace($this->arrAfter[$i],$this->arrBefore[$i],$str);
        }
        return $str;
    }
}
$DbSafe = new DbSafe();
?>