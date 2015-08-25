<?php
/**
 * ------------------------------
 * 缓存操作类（静态类）
 * ------------------------------
 * @name    Cache.class.php
 * @version 2010.04.14
 * @author  张宏伟
 */

!defined('CACHE_DIR') && define('CACHE_DIR',ROOT.'/data/cache');

class Cache
{
    /**
	 * ------------------------------
	 * 写缓存
	 * ------------------------------
	 * @param  string $cacheName 缓存数组的名字
	 * @param  array $cacheVal 缓存值
	 * @param  string[optional] $dir 存放缓存的目录
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
	 * 读缓存
	 * ------------------------------
	 * @param  string $cacheName 要读取的缓存的名字
	 * @param  int $expireTime 缓存过期时间(0为永久缓存)
	 * @param  string[optional] $dir 存放缓存的目录
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
	 * 创建缓存目录和文件
	 * ------------------------------
	 * @param  string $cacheName 缓存
	 * @param  string[optional] $dir 存放缓存的目录
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
	 * 格式化数组
	 * ------------------------------
	 * @param  array $array 要格式化的数组
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