<?php
// 循环创建目录
function mk_dir($dir, $mode = 0755) {
	if(is_dir($dir) || @mkdir($dir,$mode)) return true;
	if(!mk_dir(dirname($dir),$mode)) return false;
	return @mkdir($dir,$mode);
}

function makepath($path) {
	$path=str_replace("\\","/",$path);
	$WWW_PATH=str_replace("\\","/",WWW_PATH);
	$detail=explode("/",$path);
	foreach($detail AS $key=>$value) {
		if($value==''&&$key!=0){
			//continue;
		}
		$newpath.="$value/";
		if((eregi("^\/",$newpath)||eregi(":",$newpath))&&!strstr($newpath,$WWW_PATH)){continue;}
		if( !is_dir($newpath) ) {
			if(substr($newpath,-1)=='\\'||substr($newpath,-1)=='/') {
				$_newpath=substr($newpath,0,-1);
			} else {
				$_newpath=$newpath;
			}
			if(!is_dir($_newpath)&&!mkdir($_newpath)&&ereg("^\/",WWW_PATH)) {
				return 'false';
			}
			@chmod($newpath,0777);
		}
	}
	return $path;
}

function smkdir($dirname, $ismkindex=1) {
	$mkdir = false;
	if(!is_dir($dirname)) {
		if(@mkdir($dirname, 0777)) {
			if($ismkindex) {
				@fclose(@fopen($dirname.'/index.htm', 'w'));
			}
			$mkdir = true;
		}
	} else {
		$mkdir = true;
	}
	return $mkdir;
}


function mkdir_by_date($date, $dir = '.') {
	list($y, $m, $d) = explode('-', date('Y-m-d', $date));
	!is_dir("$dir/$y") && mkdir("$dir/$y", 0777);
	!is_dir("$dir/$y/$m$d") && mkdir("$dir/$y/$m$d", 0777);
	return "$y/$m$d";
}

function mkdir_by_hash($s, $dir = '.') {
	$s = md5($s);
	!is_dir($dir.'/'.$s[0]) && mkdir($dir.'/'.$s[0], 0777);
	!is_dir($dir.'/'.$s[0].'/'.$s[1]) && mkdir($dir.'/'.$s[0].'/'.$s[1], 0777);
	!is_dir($dir.'/'.$s[0].'/'.$s[1].'/'.$s[2]) && mkdir($dir.'/'.$s[0].'/'.$s[1].'/'.$s[2], 0777);
	return $s[0].'/'.$s[1].'/'.$s[2];
}

function mkdir_by_uid($uid, $dir = '.') {
	$uid = sprintf("%09d", $uid);
	$dir1 = substr($uid, 0, 3);
	$dir2 = substr($uid, 3, 2);
	$dir3 = substr($uid, 5, 2);
	!is_dir($dir.'/'.$dir1) && mkdir($dir.'/'.$dir1, 0777);
	!is_dir($dir.'/'.$dir1.'/'.$dir2) && mkdir($dir.'/'.$dir1.'/'.$dir2, 0777);
	!is_dir($dir.'/'.$dir1.'/'.$dir2.'/'.$dir3) && mkdir($dir.'/'.$dir1.'/'.$dir2.'/'.$dir3, 0777);
	return $dir1.'/'.$dir2.'/'.$dir3;
}