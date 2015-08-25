<?php
/**
 * 公共函数
 * mail@zhwphp.com
 * Sat Oct 16 18:04:35 CST 2010
 */

//mysql转义,加/
function _addslashes($value)
{
    $magic_quotes_gpc = get_magic_quotes_gpc();
    if (is_array($value))
    {
        foreach ($value as $k => $v)
        {
            $value[$k] = _addslashes($v);
        }
        return $value;
    }
    if ($magic_quotes_gpc) return $value;
    return addslashes($value);
}

//去除mysql转义加的/
function _stripslashes($value)
{
    if (is_array($value))
    {
        foreach ($value as $k => $v)
        {
            $value[$k] = _stripslashes($v);
        }
        return $value;
    }
    return stripslashes($value);
}

//获得$_POST过来的数据
function post()
{
    $args = func_get_args();
    $value = array();
    while (list(,$key) = each ($args))
    {
        if (isset($_POST[$key])) $value[$key] = $_POST[$key];
    }
    return $value;
}

//获得$_GET过来的数据
function get()
{
    $args = func_get_args();
    $value = array();
    while (list(,$key) = each ($args))
    {
        if (isset($_GET[$key])) $value[$key] = $_GET[$key];
    }
    return $value;
}

//转为数字类型
function _intval($arr_value,$arr_key)
{
    foreach ($arr_key as $v)
    {
        if (isset($arr_value[$v])) $arr_value[$v] = intval($arr_value[$v]);
    }
    return $arr_value;
}

//使用JS弹出消息框
function alert($msg,$url='',$window='window',$display=1)
{
    $str = "<meta http-equiv='Content-Type' content='text/html; charset=gbk' />";
    $str .= "<script language='javascript'>";
    if ($msg != '') $str .= "alert('$msg');";
    if ($url == '') $str .= '';
    elseif (is_numeric($url) && $url <= 0) $str .= "history.go($url);";
    elseif (is_numeric($url) && $url == 1) $str .= "{$window}.location.href=location.href";
    else $str .= "{$window}.location.href='$url';";
    $str .= '</script>';
    if(!$display) return $str;
    exit($str);
}

/**
 * ------------------------------
 * 页面重定向
 * ------------------------------
 * @param  string $url  消息内容
 * @param  string $msg 要跳转到的url
 * @param  int $time 多少秒后跳转
 */
function redirect($msg='',$url,$time = 2)
{
    $url = str_replace(array("\n", "\r"), '', $url);
    $str = "<meta http-equiv='Content-Type' content='text/html; charset=gbk' />";
    $str .= "<meta http-equiv='Refresh' content='{$time};URL={$url}'>";
    if (empty($msg)) $msg = "系统将在{$time}秒之后自动跳转到{$url}！";
    if ($time != 0) $str .= $msg;
    exit($str);
}

//判断某些项不能为空或未定义
function can_not_empty($arr_not_empty,$arr_data,$isset=0)
{
    foreach ($arr_not_empty as $k => $v)
    {
        if ($isset && !isset($arr_data[$k])) alert($v,-1);
        elseif(!$isset && empty($arr_data[$k])) alert($v,-1);
    }
}

//设置get参数
function set_get_args($key,$val=false)
{
    $arr_url = parse_url($_SERVER['REQUEST_URI']);
    if (!isset($arr_url['query'])) $arr_url['query'] = '';
    parse_str($arr_url['query'],$gets);
    if ($val === false) unset($gets[$key]);
    else $gets[$key] = $val;
    $query = '';
    foreach ($gets as $k => $v)
    {
        $query .= "{$k}={$v}&";
    }
    return $arr_url['path'].'?'.substr($query,0,-1);
}

//检查是否为合法post提交
function submitcheck($var)
{
    if(empty($_POST[$var]) || $_SERVER['REQUEST_METHOD'] != 'POST') return false;
    if((empty($_SERVER['HTTP_REFERER']) || preg_replace("/https?:\/\/([^\:\/]+).*/i", "\\1", $_SERVER['HTTP_REFERER'])
    == preg_replace("/([^\:]+).*/", "\\1", $_SERVER['HTTP_HOST']))) return true;
    else exit('Bad Request');
}

//获取客户端IP
function get_client_ip()
{
    if (getenv("HTTP_CLIENT_IP") && strcasecmp(getenv("HTTP_CLIENT_IP"), "unknown"))
    $ip = getenv("HTTP_CLIENT_IP");
    else if (getenv("HTTP_X_FORWARDED_FOR") && strcasecmp(getenv("HTTP_X_FORWARDED_FOR"), "unknown"))
    $ip = getenv("HTTP_X_FORWARDED_FOR");
    else if (getenv("REMOTE_ADDR") && strcasecmp(getenv("REMOTE_ADDR"), "unknown"))
    $ip = getenv("REMOTE_ADDR");
    else if (isset($_SERVER['REMOTE_ADDR']) && $_SERVER['REMOTE_ADDR'] && strcasecmp($_SERVER['REMOTE_ADDR'], "unknown"))
    $ip = $_SERVER['REMOTE_ADDR'];
    else $ip = "unknown";
    if(!preg_match("/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/", $ip)) return 'unknown';
    return($ip);
}

//占用空间大小格式化
function byte_format($size, $unit='B', $dec=2)
{
    $arr_unit = array("B", "KB", "MB", "GB", "TB", "PB");
    $arr_rev_unit = array_flip($arr_unit);
    if (!isset($arr_rev_unit[$unit])) return round($size,$dec).' '.$unit;
    $pos = $arr_rev_unit[$unit];
    while ($size >= 1024)
    {
        $size /= 1024;
        $pos++;
    }
    while ($size < 1)
    {
        $size *= 1024;
        $pos--;
    }
    return round($size,$dec).' '.$arr_unit[$pos];
}

//echo getAlexa($_GET['url']);
//function getAlexa($domain) {
//    $alexaURL='http://data.alexa.com/data/ezdy01DOo100QI?cli=10&dat=s&url='.$domain;
//    $content = file_get_contents($alexaURL);
//    $pattern = '/<POPULARITY URL="\s*(.+?)" TEXT="\s*(.+?)"\/>/';
//    preg_match($pattern, $content, $match);
//    $alexa=is_numeric($match[2]) ? $match[2] : 0;
//    return $alexa;
//}
?>