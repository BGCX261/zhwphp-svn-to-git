<?php
/**
 * ------------------------------
 * 文件操作类（静态类）
 * ------------------------------
 * @name    File.class.php
 * @version 2010.04.20
 * @author  张宏伟
 */

class File
{
    /**
     * -----------------------------
     * 创建文件夹
     * -----------------------------
     * @param  string $dir 要创建的文件夹路径
     * @param  int $mode 文件夹权限
     * @return bool
     */
    function mkdir($dir, $mode = 0777)
    {
        if (is_dir($dir) || @mkdir($dir,$mode)) return true;
        if (!mk_dir(dirname($dir),$mode)) return false;
        return @mkdir($dir,$mode);
    }

    /**
     * -----------------------------
     * 批量创建文件夹
     * -----------------------------
     * @param  array $dirs 文件夹路径
     * @param  int $mode 文件夹权限
     */
    function mkdirs($dirs,$mode=0777)
    {
        foreach ($dirs as $dir)
        {
            if(!is_dir($dir))  mkdir($dir,$mode);
        }
    }

    /**
     * ------------------------------
     * 删除文件或目录
     * ------------------------------
     * @param  string/array $path 文件或目录路径
     * @return bool
     */
    static function rm($path)
    {
        if (is_string($path))
        {
            if (is_file($path))
            {
                return unlink($path);
            }
            else if (is_dir($path))
            {
                $ok = rm("$path/*");
                if (! $ok)
                {
                    return false;
                }
                return rmdir($path);
            }
            else
            {
                $matching = glob($path);
                if ($matching === false)
                {
                    trigger_error(sprintf('No files match supplied glob %s', $path), E_USER_WARNING);
                    return false;
                }
                $rcs = array_map('rm', $matching);
                if (in_array(false, $rcs))
                {
                    return false;
                }
            }
        }
        else if (is_array($path))
        {
            $rcs = array_map('rm', $path);
            if (in_array(false, $rcs))
            {
                return false;
            }
        }
        else
        {
            trigger_error('Param #1 must be filename or glob pattern, or array of filenames or glob patterns', E_USER_ERROR);
            return false;
        }
        return true;
    }

    /**
     * ------------------------------
     * 获取目录下的文件个数
     * ------------------------------
     * @param  string $dir 文件目录
     * @return int
     */
    static function dir_file_num($dir = '')
    {
        if (!$dir) $dir = '.';
        if (substr($dir,-1,1) != '/') $dir = $dir.'/';
        if (!is_dir($dir))
        {
            trigger_error('"'.$dir.'"  is not a dir',E_USER_WARNING);
            return false;
        }
        $num = 0;
        if($handle = opendir($dir))
        {
            while(false !== ($file = readdir($handle)))
            {
                if(is_file($dir.$file)) $num++;
            }
            closedir($handle);
        }
        return $num;
    }

    /**
     * ------------------------------
     * 获取目录下的文件
     * ------------------------------
     * @param  string $dir 文件目录
     * @return array
     */
    static function dir_file_names($dir = '')
    {
        if (!$dir) $dir = '.';
        if (substr($dir,-1,1) != '/') $dir = $dir.'/';
        if (!is_dir($dir))
        {
            trigger_error('"'.$dir.'"  is not a dir',E_USER_WARNING);
            return false;
        }
        if($handle = opendir($dir))
        {
            while(false !== ($file = readdir($handle)))
            {
                if (is_file($dir.$file)) $files[] = $file;
            }
            closedir($handle);
        }
        return $files;
    }

    /**
     * ------------------------------
     * 获取当前目录相对于根目录的相对路径
     * ------------------------------
     * @return string
     */
    function get_dir()
    {
        //用'/'分割当前路径字符串，并计算分割后的字符串数量
        $num = substr_count($_SERVER['REQUEST_URI'], '/');
        //初始化变量$relativePath为'./'
        $relativePath = './';
        for($i = 0; $i < ($num - 1); $i ++)
        {
            $relativePath .= '../';
        }
        return $relativePath;
    }
}
?>