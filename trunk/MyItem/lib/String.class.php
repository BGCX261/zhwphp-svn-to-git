<?php
/**
 * ------------------------------
 * 字符串相关类（静态类）
 * ------------------------------
 * @name    String.class.php
 * @version 2010.04.19
 * @author  张宏伟
 */

class String
{
    /**
     * ------------------------------
     * 取出字符串中的指定类型的字符串
     * ------------------------------
     * @param  string $str 字符串
     * @param  string $type i是数字，s是字母,q符号
     * @param  int $caps 取字母时，0不区分大小写，1小写，2大写
     * @return string
     */
    static function get_from_str($str,$type,$caps = 0)
    {
        $arr_type = str_split($type);
        $preg = '/';
        if (in_array('i',$arr_type)) $preg .= '[0-9]|';
        if (in_array('q',$arr_type)) $preg .= '[^0-9a-zA-Z]|';
        if (in_array('s',$arr_type))
        {
            switch ($caps)
            {
                case 0 : $preg .= '[a-zA-Z]|';break;
                case 1 : $preg .= '[a-z]|';break;
                case 2 : $preg .= '[A-Z]|';break;
            }
        }
        if ($preg == '/') return '<b>Warning:</b> Wrong parameter $type for String::get_from_str()';
        $preg = substr($preg,0,-1).'/';
        preg_match_all($preg,$str,$matches);
        return $str = implode('',$matches[0]);
    }
    
    /**
     * ------------------------------
     * 字符串定长占位截取，支持中文UTF8和gb2312
     * ------------------------------
     * @param string $str 需要转换的字符串
     * @param string $start 开始位置
     * @param string $len 截取长度
     * @param string $charset 编码格式
     * @return string
     */

    static function cutstr($str,$start = 0,$len,$charset = 'utf8')
    {
        $string = $str;
        if ($charset == 'utf8') $n = 3;
        if ($charset == 'gb2312') $n = 2;
        for($i = 0 ; $i < $len ; $i ++)
        {
            $temp = ord(substr($str,0,1));
            if($temp > 127)
            {
                $i += 1;
                if($i < $len)
                {
                    $new_str[] = substr($str,0,$n);
                    $str = substr($str,$n);
                }
            }
            else
            {
                if ($temp > 64 && $temp < 91) $i += 0.65;
                $new_str[] = substr($str,0,1);
                $str = substr($str,1);
            }
        }
        $new_str = join($new_str);
        return strlen($string) > strlen($new_str) ? $new_str.'...' : $new_str;
    }

    /**
     * ------------------------------
     * 字符串截取，支持中文和其他编码
     * ------------------------------
     * @param string $str 需要转换的字符串
     * @param string $start 开始位置
     * @param string $length 截取长度
     * @param string $charset 编码格式
     * @param string $suffix 截断显示字符
     * @return string
     */
    static function substr($str, $start=0, $length, $charset="utf-8", $suffix='...')
    {
        if(function_exists("mb_substr")) $slice = mb_substr($str, $start, $length, $charset);
        elseif(function_exists('iconv_substr')) $slice = iconv_substr($str,$start,$length,$charset);
        else
        {
            $re['utf-8']   = "/[\x01-\x7f]|[\xc2-\xdf][\x80-\xbf]|[\xe0-\xef][\x80-\xbf]{2}|[\xf0-\xff][\x80-\xbf]{3}/";
            $re['gb2312'] = "/[\x01-\x7f]|[\xb0-\xf7][\xa0-\xfe]/";
            $re['gbk']    = "/[\x01-\x7f]|[\x81-\xfe][\x40-\xfe]/";
            $re['big5']   = "/[\x01-\x7f]|[\x81-\xfe]([\x40-\x7e]|\xa1-\xfe])/";
            preg_match_all($re[$charset], $str, $match);
            $slice = join('',array_slice($match[0], $start, $length));
        }
        if($suffix) return strlen($str) > strlen($slice) ? $slice.'...' : $slice;
    }

    /**
     * ------------------------------
     * 检查字符串是否为UTF8编码
     * ------------------------------
     * @param  string $string 字符串
     * @return bool
     */
    static function is_utf8($string)
    {
        return preg_match('%^(?:
		 [\x09\x0A\x0D\x20-\x7E]            # ASCII
	   | [\xC2-\xDF][\x80-\xBF]             # non-overlong 2-byte
	   |  \xE0[\xA0-\xBF][\x80-\xBF]        # excluding overlongs
	   | [\xE1-\xEC\xEE\xEF][\x80-\xBF]{2}  # straight 3-byte
	   |  \xED[\x80-\x9F][\x80-\xBF]        # excluding surrogates
	   |  \xF0[\x90-\xBF][\x80-\xBF]{2}     # planes 1-3
	   | [\xF1-\xF3][\x80-\xBF]{3}          # planes 4-15
	   |  \xF4[\x80-\x8F][\x80-\xBF]{2}     # plane 16
       )*$%xs', $string);
    }
}
?>