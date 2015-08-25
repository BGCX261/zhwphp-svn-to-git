<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Pragma" content="no-cache" />
<title>企业后台管理</title>
<link href="public/css/landing.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="public/js/loading.js"></script>
<script type="text/javascript" src="public/js/admin.js"></script>
</head>
<body  onselectstart="return false">
<div id="box">
	<div id="top1"></div>
	<div id="top2">
		<h1>清华万博后台管理系统</h1>
		<!--<h2>北京智搏网联技术培训有限公司后台管理</h2> -->
	</div>
	
	<div id="top3">
		<div class="t1"></div>
		<div class="t2">
		    <form method="POST" action="index.php?module=admin&do=login" autocomplete="off" onsubmit="return false">
			<table width="200" border="0" cellspacing="0" cellpadding="0">
				<tr>
					<td class="tab1">用户</td>
					<td class="tab2"><input type="text" name="user" maxlength="15" id="user"/></td>
				</tr>
				<tr>
					<td class="tab1">密码</td>
					<td class="tab2"><input type="password" name="passwd" maxlength="25" id="passwd"/></td>
				</tr>
				<tr>
					<td class="tab1">验证码</td>
					<td class="tab3"><input type="text" name="code" maxlength="4" id="code"/>
						<img  id="image" />
					</td>
				</tr>
				<tr>
					<td></td>
					<td class="tab-img">
					<input type="image" src="public/images/admin/login.gif"  name="submit" id="submit" onclick="return chkLogin()"/>
					<input type="image" src="public/images/admin/reset.gif"  onclick="this.form.reset();return false;"/>
					</td>
				</tr>
			</table>
			</form>
		</div>
		<div class="t3"></div>		
	</div>
	
	<div id="down">
		<div class="d1"></div>
		<div class="d2"></div>
	</div>

</div><!--end of container -->
</body>
</html>
<script type="text/javascript">
$('#image').attr('src','common/code.php?'+Math.random());
$('#image').click(function(){
	$(this).attr('src','common/code.php?'+Math.random());
});
</script>