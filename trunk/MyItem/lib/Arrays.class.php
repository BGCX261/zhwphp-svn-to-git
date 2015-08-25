<?php
/**
 * ------------------------------
 * 数组相关类（静态类）
 * ------------------------------
 * @name    Arrays.class.php
 * @version 2010.04.19
 * @author  张宏伟
 */

class Arrays
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
                return $this->array_count($v,$count);
            }
        }
        return $count;
    }
}
?>