<?php
/**
 * ��������
 * mail@zhwphp.com
 * Sat Oct 16 18:04:35 CST 2010
 */

//mysqlת��,��/
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

//ȥ��mysqlת��ӵ�/
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

//���$_POST����������
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

//���$_GET����������
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

//תΪ��������
function _intval($arr_value,$arr_key)
{
    foreach ($arr_key as $v)
    {
        if (isset($arr_value[$v])) $arr_value[$v] = intval($arr_value[$v]);
    }
    return $arr_value;
}

//ʹ��JS������Ϣ��
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
 * ҳ���ض���
 * ------------------------------
 * @param  string $url  ��Ϣ����
 * @param  string $msg Ҫ��ת����url
 * @param  int $time ���������ת
 */
function redirect($msg='',$url,$time = 2)
{
    $url = str_replace(array("\n", "\r"), '', $url);
    $str = "<meta http-equiv='Content-Type' content='text/html; charset=gbk' />";
    $str .= "<meta http-equiv='Refresh' content='{$time};URL={$url}'>";
    if (empty($msg)) $msg = "ϵͳ����{$time}��֮���Զ���ת��{$url}��";
    if ($time != 0) $str .= $msg;
    exit($str);
}

//�ж�ĳЩ���Ϊ�ջ�δ����
function can_not_empty($arr_not_empty,$arr_data,$isset=0)
{
    foreach ($arr_not_empty as $k => $v)
    {
        if ($isset && !isset($arr_data[$k])) alert($v,-1);
        elseif(!$isset && empty($arr_data[$k])) alert($v,-1);
    }
}

//����get����
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

//����Ƿ�Ϊ�Ϸ�post�ύ
function submitcheck($var)
{
    if(empty($_POST[$var]) || $_SERVER['REQUEST_METHOD'] != 'POST') return false;
    if((empty($_SERVER['HTTP_REFERER']) || preg_replace("/https?:\/\/([^\:\/]+).*/i", "\\1", $_SERVER['HTTP_REFERER'])
    == preg_replace("/([^\:]+).*/", "\\1", $_SERVER['HTTP_HOST']))) return true;
    else exit('Bad Request');
}

//��ȡ�ͻ���IP
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

//ռ�ÿռ��С��ʽ��
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