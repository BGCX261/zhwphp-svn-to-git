<?php
/**
 * ------------------------------
 * 数组相关类（静态类）
 * ------------------------------
 * @name   Arr.class.php
 * @author 张宏伟 mail@zhwphp.com
 * charset gbk
 */

class Arr
{
    /**
     * ------------------------------
     * 获得数组的维数
     * ------------------------------
     * @param  array $arr 数组
     * @return int
     */
    static function array_count($arr,$count = 0)
    {
        if (is_array($arr))
        {
            $count++;
            foreach ($arr as $v)
            {
                return self::array_count($v,$count);
            }
        }
        return $count;
    }
}
?>