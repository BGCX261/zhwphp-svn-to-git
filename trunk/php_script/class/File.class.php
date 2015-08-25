<?php
/**
 * ------------------------------
 * �ļ�������̬��
 * ------------------------------
 * @name   File.class.php
 * @author �ź�ΰ mail@zhwphp.com
 * @charset gbk
 */

class File
{
    /**
     * -----------------------------
     * ����Ŀ¼
     * -----------------------------
     * @param  string $dirname Ҫ������Ŀ¼·��
     * @param  int[optional] $mode Ŀ¼Ȩ��
     * @return bool
     */
    static function mkdir($dirname, $mode = 0755)
    {
        if (!is_dir($dirname)) mkdir($dirname,$mode,true);
        return is_dir($dirname);
    }

    /**
     * ------------------------------
     * ��ʽ��·��
     * ------------------------------
     * @param  string $path ·��
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
     * ɾ��Ŀ¼���ļ�������Ŀ¼���ļ���Ŀ¼��
     * ------------------------------
     * @param  string/array $path Ŀ¼���ļ�·��
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
     * ����Ŀ¼������Ŀ¼������Ԫ��
     * ------------------------------
     * @param  string $dirname Ŀ¼·��
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
     * ��ȡ��ǰĿ¼����ڸ�Ŀ¼�����·��
     * ------------------------------
     * @return string
     */
    static function get_current_dir_relative_path()
    {
        //��'/'�ָǰ·���ַ�����������ָ����ַ�������
        $num = substr_count($_SERVER['REQUEST_URI'], '/');
        return './'.str_repeat('../',$num-1);
    }
}
?>