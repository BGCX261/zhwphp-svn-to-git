
/**--------------------------------------------------------------------------------#
*   正则检测函数
*--------------------------------------------------------------------------------**/
// 长度
function lengthDetect($string,$str){
	$len = split('-',trim($str));
	return (strlen($string) > ($len[0]-1) && strlen($string) < ($len[1]+1))? true:false;
}
// 价格
function moneyDetect($str){
	return preg_match("/^(-|\+)?\d+(\.\d+)?$/",$str);
}
// 邮件
function emailDetect($str){
	return preg_match("/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/", $str);
}
// 网址
function urlDetect($str){
	return preg_match("/^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"])*$/", $str);
}
// 时间
function timeDetect($str){
	return preg_match("/^[0-9-: ]+$/", $str);
}
// 数字型
function numDetect($str){
	return is_numeric($str);
}
// 中文
function cnDetect($str){
	return preg_match("/^[\x7f-\xff]+$/", $str);
}
// 字母
function enDetect($str){
	return preg_match("/^[A-Za-z]+$/", $str);
}
// 数字字母混合
function numenDetect($str){
	return preg_match("/^([a-zA-Z0-9_-])+$/",$str);
}
// 电话号码
function telDetect($str){
	return ereg("^[+]?[0-9]+([xX-][0-9]+)*$", $str);
}
//-----------------------------------------------------输出
// 字符替换
function Regular_filter($str){
	$str=(is_array($str))? implode(",",$str):$str;
	$str=nl2br($str); //将回车替换为<br>
	$str=htmlspecialchars($str); //将特殊字元转成 HTML 格式。
	//$str=str_replace(array("　",'<? '),array(" ",'< ?'),$str); //替换空格替换为
	return $str;
}
// 转义
function Regular_escape($str)	{
	if (!get_magic_quotes_gpc())return addslashes($str);
	return $str;
}
// MD5加密
function Regular_md5($str){
	return  MD5($str);
}
// base64加密
function Regular_base64($str){
	return  base64_encode($str);
}
// 时间
function Regular_time($str){
	if(!is_numeric($str))	return timeFormat($str);
	else return $str;
}
// 有条件注销(数字)
function Regular_cancel($str){
	return (!is_numeric($str))? $str:null;
}
// 无条件注销
function Regular_delete(){
	return null;
}