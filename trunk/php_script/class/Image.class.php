<?php
/**
 * ------------------------------
 * 图片操作类（表态类）
 * ------------------------------
 * @name    Image.class.php
 * @version 2010.04.29
 * @author  张宏伟
 */

class Image
{
    /**
     * ------------------------------
     * 获得GD库的版本
     * ------------------------------
     * @return string
     */
    static function gdVersion()
    {
        if (!extension_loaded('gd')) return 0;
        if (function_exists('gd_info'))
        {
            $gd_info = gd_info();
            return ereg_replace('[^0-9.]','',$gd_info['GD Version']);
        }
        if(!function_exists('phpinfo'))
        {
            if(function_exists('imagecreate')) return '2.0';
            return 0;
        }
        ob_start();
        phpinfo(8);
        $info = ob_get_clean();
        $info = stristr($info, 'gd version');
        preg_match('/\d/', $info, $match);
        $gd_ver = $match[0];
        return $match[0];
    }
}
?>