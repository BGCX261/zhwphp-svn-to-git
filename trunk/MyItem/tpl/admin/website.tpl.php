<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>网站信息页</title>
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
<?php extract($rs_website); ?>
<div id="content_news">
	<h5></h5>
    <h2>网站信息</h2>
	
    <form method="POST" action="<?php echo URL; ?>">
    <input type="hidden" name="id" value="1" />
        <table cellspacing="0" cellpadding="0" align="center">
		<tr>
          <td class="t1" nowrap="nowrap">网站名称：</td>
          <td class="t2"><input type="text" name="website_name" maxlength="50" value="<?php echo $website_name; ?>" /></td>
        </tr>
        <tr>
          <td class="t1" nowrap="nowrap">版权信息：</td>
          <td class="t2"><input type="text" name="website_copr" maxlength="100" value="<?php echo $website_copr; ?>" /></td>
        </tr>
        <tr>
          <td class="t1" nowrap="nowrap">网站地址：</td>
          <td class="t2"><input type="text" name="website_url" maxlength="50" value="<?php echo $website_url; ?>" /></td>
        </tr>
        <tr>
          <td class="t1" nowrap="nowrap">学校地址：</td>
          <td class="t2"><input type="text" name="address" maxlength="50" value="<?php echo $address; ?>" /></td>
        </tr>
        <tr>
          <td class="t1" nowrap="nowrap">邮&nbsp;&nbsp;&nbsp;&nbsp;箱：</td>
          <td class="t2"><input type="text" name="email" maxlength="30" value="<?php echo $email; ?>" /></td>
        </tr>
        <tr>
          <td class="t1" nowrap="nowrap">电&nbsp;&nbsp;&nbsp;&nbsp;话：</td>
          <td class="t2"><input type="text" name="tel" maxlength="15" value="<?php echo $tel; ?>" /></td>
        </tr>
        <tr>
          <td class="t1" nowrap="nowrap">手&nbsp;&nbsp;&nbsp;&nbsp;机：</td>
          <td class="t2"><input type="text" name="mobile" maxlength="11" value="<?php echo $mobile; ?>" /></td>
        </tr>
        
        <tr>
          <td colspan="2" align="center" nowrap="nowrap" class="t3">
		  		<input type="submit" value="确认修改" name="edit"/>
				<input type="reset" value="取消"/>
		  </td>
        </tr>
		
      </table>
</form>
                  
</div><!--end of content -->
</body>
</html>
