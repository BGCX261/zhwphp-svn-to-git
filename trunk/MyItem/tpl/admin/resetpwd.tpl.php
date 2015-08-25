<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>后台密码修改</title>
<script type="text/javascript" src="public/js/admin.js"></script>
<style type="text/css">
*{
	margin:0px;
	padding:0px;
}
#content_news{ padding:20px;}
#content_news h2{
	text-align:center;
	font:20px Arial, Helvetica, sans-serif;
	color:#1f3a87;
	font-weight:bold;
	background:url(images/rest.gif) repeat-x bottom center;
	padding-top:20px;
	padding-bottom:10px;
	white-space:nowrap;
}
#content_news h3{ font:12px Arial, Helvetica, sans-serif; color:#1f3a87; text-align:center; margin-top:10px;	white-space:nowrap;}
table{
	height:200px;
	margin:50px auto;
	font-size:12px;
}

table .t1{text-align:right;	font-size:15px; color:#333333;}
.red{ color:#F00; padding-right:5px;}
table .t2 input{ border:1px solid #1387a8; height:22px; width:260px;}
table .t3{ padding-left:30px;}
table .t3 input{ width:100px; height:28px; font-weight:bold;}

#content_news h5{ background-color:#d2dbea; border-bottom:1px solid #cad1db; height:35px; text-align:center; font:12px Arial, Helvetica, sans-serif; line-height:35px; white-space:nowrap; color:#390; }
#content_news h5 a{ color:#390; text-decoration:none;}

</style>

</head>

<body>
<div id="content_news">
	<h5></h5>
    <h2>密码修改</h2>
	<h3>温馨提示：为了您的网站安全,请及时修改密码;<span class="red">如果忘记密码，请跟管理员联系。</span></h3>
	
    <form method="POST" action="index.php?module=admin&act=resetpwd" onsubmit="return resetpwd()">
        <table cellspacing="0" cellpadding="0" align="center">
		<tr>
          <td class="t1" nowrap="nowrap"><span class="red">*</span>用户名：</td>
          <td class="t2"><input type="text" size="18" name="user" id="user" value="<?php echo $_SESSION['user']; ?>" maxlength="15" /></td>
        </tr>
        <tr>
          <td class="t1" nowrap="nowrap"><span class="red">*</span>原密码：</td>
          <td class="t2"><input type="password" size="20" name="passwd" id="passwd" maxlength="25" /></td>
        </tr>
        <tr>
          <td class="t1" nowrap="nowrap"><span class="red">*</span>新密码：</td>
          <td class="t2"><input type="password" size="20" name="newpwd" id="newpwd" maxlength="25" /></td>
        </tr>
        <tr>
          <td class="t1" nowrap="nowrap"><span class="red">*</span>重复密码：</td>
          <td class="t2"><input type="password" size="20" name="repass" id="repass" maxlength="25" /></td>
        </tr>
        
        <tr>
          <td colspan="2" align="center" nowrap="nowrap" class="t3">
		  		<input type="submit" value="确认修改" name="update"/>
				<input type="reset" value="清除"/>
		  </td>
        </tr>
		
      </table>
</form>

<h5>佛哥品牌 值得信赖 www.hifoge.com</h5>
                  
</div><!--end of content -->
</body>
</html>
