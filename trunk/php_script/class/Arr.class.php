<?php
/**
 * ------------------------------
 * ��������ࣨ��̬�ࣩ
 * ------------------------------
 * @name   Arr.class.php
 * @author �ź�ΰ mail@zhwphp.com
 * charset gbk
 */

class Arr
{
    /**
     * ------------------------------
     * ��������ά��
     * ------------------------------
     * @param  array $arr ����
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