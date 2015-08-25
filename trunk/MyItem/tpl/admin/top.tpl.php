<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>后台管理-顶部</title>
<style type="text/css">
*{ margin:0px; padding:0px;}
a{ color:#fff; font-size:12px;}
a:hover{ color:#0F0;}
a { hide-focus: expression( this.hideFocus=true ); outline: none;}
#top{ width:100%; height:65px; border-bottom:1px solid #254588; background:#3b5999 url(public/images/admin/logo.gif) no-repeat; color:#FFF;
	_width:expression((document.documentElement.clientWidth||document.body.clientWidth)<800?"800px":"");min-width:800px;/*最小宽度代码**/}
#top .time{ color:#FFF; padding-top:25px; padding-left:250px; font-size:12px; width:250px;}
#top .quit{}
#top .quit{ width:150px; position:absolute; right:30px;top:45px; text-align:right;}
</style>
</head>

<body onselectstart="return false">
<div id="top">
	<div class="time">
		<b><?php echo $_SESSION['user']; ?></b>
		<script type="text/javascript" src="public/js/time-tishi.js"></script>
	</div>
	
	<table  cellspacing="0" cellpadding="0" class="quit">
		<tr>
			<td nowrap="nowrap"><a href="?module=admin&act=resetpwd" target="main">[修改密码]</a></td>
			<td nowrap="nowrap"><a href="?module=admin&do=logout" target="_parent" onclick="return confirm('你确定要退出登陆吗？')">[注销退出]</a></td>
		</tr>
	</table>
</div>

</body>
</html>
