<?php if(!defined('bizm'))exit($_SERVER['SERVER_NAME']);
/**----------------------------------------------------------------------------*
* 表单生成和验证
*------------------------------------------------------------------------------*/
class  FormInfo {
	// 获取表单数组
	public function loadForm($formFile){
		if(is_file(bizmTpl.'form'.$formFile.suffix)){
			return  openfile('Template/form'.$formFile.suffix,'bizm');
		}else{
			if(is_file($File = bizmForm.$formFile.'.ini.php'))	{
				include_once $File;
				return $form;
			}else die("The lack of a {$formFile} file!");
		}
		return array();
	}
	// 通过加载的数组或取COOKIE,SESSION值并转化为表单选项
	private function arrayFind($value){
		$var   = trim(strstr($value,':'),':');
		switch ($value[0]) {
			case 'b':$array = $this->basic[$var];    break;   // 系统
			case 'l':$array = $this->lang[$var];     break;   // 语言包
			case 'a':$array = $this->appArray[$var]; break;   // 附加数组
			case 'c':$array = $_COOKIE[$var];        break;   // 取COOKIES
			case 's':$array = $_SESSION[$var];       break;   // 取SESSION
		}
		return $array;
	}
	// 敏感词
	public function keyDetect($str){
		$keyword =$this->basic['debar']['badkey'];
		return (!preg_match("/$keyword/i",$str));
	}
	/*-----------------------------------------------校验开始-----------------------------------------*/
	public function postForm($formKey){
		if(empty($this->formArray[$formKey]) || empty($_POST))return false;
		$this->post           =  $_POST;
		foreach ($this->formArray[$formKey] as $key =>$arr)	{
			// 键值转换为纯英文
			$key  = preg_replace("/[^a-z]/i",'',$key);
			$name = trim($arr[0]);
			if (!empty($arr)&&'file' != $key){
				// 检测 注销file类表单
				$newData[$name] = FormInfo::postFind($arr,$key);
			}
			if($newData[$name] == false)$newData[$name] ='';
			elseif($newData[$name] === null)unset($newData[$name]);
			// 时间转换
			if(@stristr($name,'time') && $newData[$name])$newData[$name] =  timeChange($newData[$name]);
		}
		return !empty($this->error)?false: $newData;
	}
	// 提交信息检测	错误返回error
	public function postFind($arr,$key){
		if(empty($arr))return false;
		$name = $title =$error =$find =$standard = null;
		// input NAME
		$name     = trim($arr[0]);
		// input Title
		$title    = trim($arr[2]);
		// 错误提示
		$error    = trim($arr[4]);
		// 检测类型 Y N
		$find     = trim($arr[5]);
		// 检测标准
		$standard = trim($arr[6]);
		// 多重检测
		if(!empty($standard))$_error = FormInfo::ck_split($standard,$name,$title,$find,$error);
		if(!empty($_error))	$this->error .= $_error;
		else{
			// 转换为字符串
			if(is_array($this->post[$name])){
				$this->post[$name] = implode(",",$this->post[$name]);
			}else $this->post[$name] = trim($this->post[$name]);
			// 转义或其他转化
			$KKarray = array();
			if(preg_match("/Y|N/is",$find))	{
				//  缺省检测
				if(eregi('N',$find) && $this->post[$name]=='') return false;
				// 必填缺省检测
				if(eregi('Y',$find) && $this->post[$name]=='')$_error = "[\"J{$name}\",\"{$error}\"],";

				if(!empty($_error)){
					$this->error .= $_error;
				}else{
					$KKarray       = split("_", $find);
					// 转义或过滤
					$escape_filter = (!empty($KKarray[1]))?'Regular_'.$KKarray[1]:'';
					// 输出通过检测的合法数据
					$data          = ($escape_filter)?$escape_filter($this->post[$name]):$this->post[$name];
				}
			}
		}
		// 输出新的数据
		if(empty($_error))return $data;
	}
	//  表单验证 及数据检测
	private function ck_split($standard,$name,$title,$find=null,$error){
		$t_error = null;
		//  缺省忽略检测
		if(empty($find))return false;
		//  设定为 N 无数据忽略检测
		if(eregi('N',$find) && empty($this->post[$name]))return false;
		// 必填缺省检测
		if(eregi('Y',$find) && $this->post[$name]=='')return "[\"J{$name}\",\"{$error}\"],";
		// 多项检测
		$arr = explode(',',$standard);
		// POST数据检测
		if(!empty($arr))foreach ($arr as $var){
			if(trim($var)!=''){
				// 数组类的检测
				if(is_array($this->post[$name]))foreach ($this->post[$name] as $_var){
					$t_error.= ($this->ck_open($_var,trim($var)))?'':$error;
					if($t_error)break;
				}else $t_error.= (FormInfo::ck_open($this->post[$name],trim($var)))?'':$error;
			}
			if($t_error)break;
		}
		return ($t_error)? "[\"J{$name}\",\"$t_error\"],":"";
	}
	// 函数调用
	private function ck_open($string,$str){
		// 对比检测
		if(strstr($str,'compare')){
			$compare  = $this->compareDetect($string,$str);
			return $compare?true:false;
		}
		$functi = FormInfo::ck_detected($str);
		return ($functi($string,$str))? true:false;
	}
	// 类型判断
	private function ck_detected($str){
		$detect = (eregi("^[a-zA-Z]*$",$str))? "{$str}Detect":'lengthDetect';
		if (function_exists($detect));
		elseif(function_exists($this->$detect));
		else exit('This function "'.$detect.'"  does not exist');
		return $detect;
	}
	// 对比
	public function compareDetect($string,$str){
		$result    = null;
		$name      = substr($str,9,20);
		$Kword     = $this->post[$name];
		$Computing = substr($str,7,2);
		if(empty($Computing))return false;
		switch ($Computing) {
			case '==':	if($Kword == $string)$result = 'Y';	break;
			case '!=':	if($Kword != $string)$result = 'Y';	break;
			case '>=':	if($Kword >= $string)$result = 'Y';	break;
			case '<=':	if($Kword <= $string)$result = 'Y';	break;
			default:
				return false;
				break;
		}
		return $result;
	}
	// js接收信息
	public function jsInput($error)	{
		if(!empty($error))$this->error = $error;
		else return false;
	}
	/*-----------------------------------------------表单生产开始-----------------------------------------*/
	// 生成表单
	private function newInput($type,$name,$value,$style,$title){
		$value  = $this->infoArray[$name]?trim($this->infoArray[$name]):($this->post[$name]?trim(stripslashes($this->post[$name])):$value);
		switch ($type)	{
			case 'text':return  "<input type=\"text\" id=\"{$name}\" name=\"{$name}\" value=\"{$value}\" {$style}/>";break;
			case 'password':return "<input type=\"password\" name=\"{$name}\" {$style}/>";	break;
			case 'textarea':return "<textarea name=\"{$name}\" {$style}/>{$value}</textarea>";	break;
			case 'hidden':	return "<input type=\"hidden\" id=\"{$name}\" name=\"{$name}\" value=\"{$value}\" {$style}/>";	break;
			case 'file':	return "<input type= \"file\"name=\"{$name}\" {$style}/>";			break;
			case 'submit':	return "<input type=\"submit\" name=\"{$name}\" value=\"{$title}\" {$style}/>";	break;
			case 'button':	return "<input type=\"button\" value=\"{$title}\" {$style}/>";			break;
			default: return "{$type}类型错误!!!";	break;
		}
	}
	// 多选类表单处理
	private function outSelect($select,$type,$title,$name,$varl,$style){
		$varl = preg_replace("/Y_/i",'',$varl);
		switch ($type){
			case 'select': $outform = "<option ".('Y'== $select?'selected':'')." value=\"{$varl}\">{$title}</option>\r\n";
			break;
			case 'radio':	$outform = "<input ".('Y'== $select?'checked':'')." type=\"radio\" name=\"{$name}\" value=\"{$varl}\" {$style}/>{$title}\r\n";break;
			case 'checkbox':$outform = "<input ".('Y'== $select?'checked':'')." type=\"checkbox\" name=\"{$name}[]\" value=\"{$varl}\" {$style}/>{$title}\r\n";	break;
		}
		return $outform;
	}
	// 表单输出
	public function formHtml($formKey,$infoArray=null,$appArray=null){
		if(empty($formKey))return '';
		$formKey              = trim($formKey);
		if(empty($this->formArray[$formKey]))return '';
		$newform              = null;
		$this->infoArray      = $infoArray;
		$this->appArray       = $appArray? $appArray:array();
		foreach ($this->formArray[$formKey] as $key =>$arr){
			$key = preg_replace("/[^a-z]/i",'',$key); // 键值转换为纯英文
			$newform .= FormInfo::outputForm($arr,$key); // 生成表单
		}
		return $newform;
	}
	// 生成表单函数
	public function outputForm($arr,$type){
		if(empty($arr)&&empty($type))return null;
		$name        = $arr[0];
		// input 初始值 不包含多选,单选类
		$value       = (':'==$arr[1][1]? FormInfo::arrayFind($arr[1]):trim($arr[1]));
		// 初始状态下的默认值
		$title       = (':'==$arr[2][1]? FormInfo::arrayFind($arr[2]):trim($arr[2]));
		// input Title
		$style       = trim($arr[3]);
		$notes       = $arr[7]?trim($arr[7]):null;
		if('Y'       == $arr[5][0]){
			$request = ' *';
			// 生成客户端js检测
			$this->jsDetect[$name] = $title.','.trim($arr[4]);
		}
		$input   = preg_match("/checkbox|select|radio/i",$type)?FormInfo::formSelect($type,$name,$arr[1],$title,$style,$request):FormInfo::newInput($type,$name,input($value),$style,$title);
		$Ttitle  = ($n = strpos($title,'|'))?substr($title,0,$n):$title;
		return !stristr('hidden,submit,button',$type)?"<li><label for=\"{$name}\">{$Ttitle}</label>".$input.$notes."<span id=\"J{$name}\">{$request}</span></li>\r\n":$input.'<br>';
	}
	// 多选类表单生成
	public function formSelect($type,$name,$value,$title,$style,$request,$initial=null){
		$outform      = null;
		$valueArray   = array();
		// 默认表单值状态
		if(strstr($value,'|')){
			// 如果字符串中包含 | 则转为数组对应标题
			$titarray = explode("|",$title);
			$valarray = explode("|",$value);
		}else{
			if(strstr($value,"-")){
				// 如果包含-则生成数字序列
				$numArray  = explode('-',$value);
				for($i=$numArray[0]; $i<=$numArray[1];$i++)$Nvalue[]= $i;
				$valarray  = $titarray = $Nvalue;
			}
			if(':'==$value[1] && ($Narray = FormInfo::arrayFind($value))){
				// 默认使用配置数组
				$valarray  = (':' == $value[2]?array_values($Narray):array_keys($Narray));
				$titarray  = array_values($Narray);
			}

			if($valarray&&$titarray){
				if('select' == $type){
					array_unshift($valarray,'','');
					array_unshift($titarray,$title,'选择');
				}else{
					array_unshift($valarray,'');
					array_unshift($titarray,$title);
				}
			}
		}
		// 更新和提交动作时的值
		if($nowvalue = $initial?$initial:($this->post[$name]?$this->post[$name]:$this->infoArray[$name])){
			$valueArray = is_array($nowvalue)?$nowvalue:explode(",",$nowvalue);
		}
		if(sizeof($valarray)>1){
			foreach ($valarray as $key =>$varl)	{
				if($valueArray){
					// 非默认的识别
					$varl     = @str_replace('Y_','',$varl);
					$select   = (in_array($varl,$valueArray)?'Y':'');
				}else{
					//  判断是否为默认
					$select   = (eregi("Y_",$varl))? 'Y':'';
				}
				if($key >'0'){
					$_title   =($titarray[$key])? $titarray[$key]:$title;
					$outform .= FormInfo::outSelect($select,$type,$_title,$name,$varl,$style);
					$select   = null;
				}
			}
		}else  {
			$outform       = FormInfo::outSelect('Y',$type,$nowvalue,$name,$nowvalue,$style);
		}
		// 下拉选择
		if($type =='select')$outform = "<select id='{$name}' name='{$name}' {$style}>{$outform}</select>";
		return  $outform;
	}
	// 检测输出错误提示
	public function jsErrorOut(){
		return !empty($this->error)?$this->error:false;
	}
	// 生成js填写要求文件
	public function jsRequest($formName){
		if($this->jsDetect){
			foreach ($this->jsDetect as $key=>$varl){
				$jsFun .='if(document.'.$formName.'.'.$key.'.value == ""){alert("'.$varl.'"); document.'.$formName.'.'.$key.'.focus();return false;} ';
			}
			return 'function CheckBizm(){'.$jsFun.'}';
		} else return null;
	}
	// 输出错误提示
	public function jsError($error){
		return is_string($error)?"<script> 
		alert(1);
		var error = new Array(".trim($error,',').");
		alert(2);
		for (i=0; i < error.length; i++){ 
		alert(3);
		$(error[i][0]).innerHTML= error[i][1];
		}
		</script>":null;
	}
}
?>