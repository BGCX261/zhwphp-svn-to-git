<?php
/**
 * ------------------------------
 * 文件操作静态类
 * ------------------------------
 * @name   File.class.php
 * @author 张宏伟 mail@zhwphp.com
 * @charset gbk
 */

class File
{
    /**
     * -----------------------------
     * 创建目录
     * -----------------------------
     * @param  string $dirname 要创建的目录路径
     * @param  int[optional] $mode 目录权限
     * @return bool
     */
    static function mkdir($dirname, $mode = 0755)
    {
        if (!is_dir($dirname)) mkdir($dirname,$mode,true);
        return is_dir($dirname);
    }

    /**
     * ------------------------------
     * 格式化路径
     * ------------------------------
     * @param  string $path 路径
     * @return string
     */
    static function path_format($path)
    {
        $path = str_replace('\\','/',$path);
        if (substr($path,0,-1) != '/') $path .= '/';
        return $path;
    }

    /**
     * ------------------------------
     * 删除目录或文件（包括目录下文件和目录）
     * ------------------------------
     * @param  string/array $path 目录或文件路径
     * @return bool
     */
    static function rmdir($path)
    {
        if (is_array($path))
        {
            $arr = array_map('self::rmdir',$path);
            if (in_array(false,$arr)) return false;
        }
        elseif (is_string($path))
        {
            if (is_file($path)) return unlink($path);
            elseif (is_dir($path))
            {
                if (!$op = opendir($path)) return false;
                if (substr($path,-1) != '/') $path.= '/';
                while (($file = readdir($op)) !== false)
                {
                    if (!in_array($file,array('.','..'))) self::rmdir($path.$file);
                }
                closedir($op);
                rmdir($path);
            }
        }
        else return false;
        return true;
    }

    /**
     * ------------------------------
     * 遍历目录，返回目录下所有元素
     * ------------------------------
     * @param  string $dirname 目录路径
     * @return array
     */
    static function readdir($dirname)
    {
        $dir = self::path_format($dirname);
        if (!is_dir($dir)) return false;
        $arr = array();
        if ($handle = opendir($dir))
        {
            while (false !== ($file = readdir($handle)))
            {
                $arr[] = $file;
            }
            closedir($handle);
        }
        return $arr;
    }

    /**
     * ------------------------------
     * 获取当前目录相对于根目录的相对路径
     * ------------------------------
     * @return string
     */
    static function get_current_dir_relative_path()
    {
        //用'/'分割当前路径字符串，并计算分割后的字符串数量
        $num = substr_count($_SERVER['REQUEST_URI'], '/');
        return './'.str_repeat('../',$num-1);
    }
}
?>