<?php
/**
 * ------------------------------
 * ��������ࣨ��̬�ࣩ
 * ------------------------------
 * @name    Cache.class.php
 * @version 2010.04.14
 * @author  �ź�ΰ
 */

!defined('CACHE_DIR') && define('CACHE_DIR',ROOT.'/data/cache');

class Cache
{
    /**
	 * ------------------------------
	 * д����
	 * ------------------------------
	 * @param  string $cacheName �������������
	 * @param  array $cacheVal ����ֵ
	 * @param  string[optional] $dir ��Ż����Ŀ¼
	 */
    static public function set($cacheName,$cacheVal,$dir = '')
    {
        $timeStamp = time();
        $cacheFile = self::get_cache_file_name($cacheName,$dir);
        $handle = @fopen($cacheFile,'wb');
        flock($handle, LOCK_EX);
        fwrite($handle, "<?php\r\n".'$CACHE[\'cacheTime\'] = '.$timeStamp.";\r\n".'$CACHE[\''.$cacheName.'\'] = '.self::array_format($cacheVal).";\r\n".'?>');
        fclose($handle);
    }

    /**
	 * ------------------------------
	 * ������
	 * ------------------------------
	 * @param  string $cacheName Ҫ��ȡ�Ļ��������
	 * @param  int $expireTime �������ʱ��(0Ϊ���û���)
	 * @param  string[optional] $dir ��Ż����Ŀ¼
	 * @return resource/false
	 */
    static public function get($cacheName,$expireTime = 300,$dir = '')
    {
        $timeStamp = time();
        if (!file_exists(self::get_cache_file_name($cacheName,$dir))) return false;
        include(self::get_cache_file_name($cacheName,$dir));
        if(isset($CACHE[$cacheName]) && ($timeStamp - $CACHE['cacheTime']) < $expireTime || $expireTime == 0)
        {
            return $CACHE[$cacheName];
        }
        return false;
    }

    /**
	 * ------------------------------
	 * ��������Ŀ¼���ļ�
	 * ------------------------------
	 * @param  string $cacheName ����
	 * @param  string[optional] $dir ��Ż����Ŀ¼
	 * @return resource/false
	 */
    static public function get_cache_file_name($cacheName,$dir = '')
    {
        if (!trim($cacheName) || !preg_match("/^([0-9a-z\-_\.]+)$/is",$cacheName))
        {
            return false;
        }
        $cacheDir = CACHE_DIR;
        if (substr($cacheDir,-1,1) != '/') $cacheDir .= '/';
        $cacheDir .= $dir;
        if (substr($cacheDir,-1,1) != '/') $cacheDir .= '/';
        @mkdir($cacheDir,0777,true);
        return $cacheDir.'~'.$cacheName.".php";
    }

    /**
	 * ------------------------------
	 * ��ʽ������
	 * ------------------------------
	 * @param  array $array Ҫ��ʽ��������
	 * @param  int $level 
	 * @return string
	 */
    static private function array_format($array,$level = 0)
    {
        $space = str_repeat("\t\t",$level);
        $comma = '';
        $str = "Array\r\n$space(\r\n";
        foreach($array as $key => $val)
        {
            $key = is_string($key) ? '\''.addcslashes($key, '\'\\').'\'' : $key;
            $val = !is_array($val) && (!preg_match("/^\-?[1-9]\d*$/",$val) || strlen($val) > 12) ? "'".addcslashes($val, '\'\\')."'" : $val;
            if(is_array($val))
            {
                $str .= "$comma\t$space$key => ".self::array_format($val,$level + 1);
            }
            else
            {
                $str .= "$comma\t$space$key => $val";
            }
            $comma = ",\r\n";
        }
        $str .= "\r\n$space)";
        return $str;
    }
}

?>