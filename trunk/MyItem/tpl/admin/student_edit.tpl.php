<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script type="text/javascript" src="public/js/admin.js"></script>
<script type="text/javascript" src="tool/ckfinder/ckfinder.js"></script>
<title>就业学员</title>
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

/*信息添加*/
#stu_con{ width:500px; margin:0 auto; }
#stu_con .tab1{ margin:0 auto; text-align:center; width:300px; font:12px Arial, Helvetica, sans-serif; margin-top:15px;}
#stu_con .tab1 td{ padding:2px;}
#stu_con .tab1 .img_td{ height:190px;}
#stu_con .tab1 .img_td img{ width:154px; height:184px; border:1px solid #666; background:url(images/stu_bg.gif) no-repeat center center;}

#stu_con .tab2{ margin:0 auto; width:600px;font:12px Arial, Helvetica, sans-serif; margin-top:5px;}
#stu_con .tab2 td{ padding:3px; padding-right:10px;}
#stu_con .tab2 .td1{ font:13px Arial, Helvetica, sans-serif; font-weight:bold; text-align:right; width:60px;}
#stu_con .tab2 .td2 { width:240px;}
#stu_con .tab2 .td2 input{ width:100%; height:20px;}
#stu_con .tab2 .td3 { text-align:center; height:50px;}
#stu_con .tab2 .td3 input { width:80px; margin-right:10px;}

#content_news h5{ background-color:#d2dbea; border-bottom:1px solid #cad1db; height:35px; text-align:center; font:12px Arial, Helvetica, sans-serif; line-height:35px; white-space:nowrap; color:#390; margin-top:50px; font-size:15px; color:#3b5999; font-weight:bold;}
#content_news .back{ position:absolute; right:50px; top:30px;}
#content_news .back a{ color:#3b5999; text-decoration:underline; font-size:12px; font-weight:normal;}
#content_news .back a:hover{text-decoration:none;}
#content_news h5 a{ color:#390; text-decoration:none;}

</style>

</head>

<body>
<?php
extract($arr);
if (!isset($arr['img']))
{
    $img = '';
    $name = '';
    $education = '';
    $company = '';
    $postition = '';
    $salary = '';
    $about_com = '';
}
?>
<div id="content_news">
	<h5>学员信息添加</h5><span class="back"><a href="javascript:history.back();">返回</a></span>
	
	<div id="stu_con">
	<form method="POST" action="index.php?module=admin&act=action&tid=<?php echo $tid."&tb=$tb"; ?>">
	<input type="hidden" name="tid" value="1" />
	<input type="hidden" name="id" value="<?php echo $id; ?>" />
		<table cellspacing="0" cellpadding="0" border="0" class="tab1">
			<tr><td nowrap="nowrap">请上传154*184比例的照片</td></tr>
			<tr><td class="img_td"><img src="<?php echo $img; ?>" id="image" /></td></tr>
			<tr><td nowrap="nowrap"><input type="text" name="img" id="img" value="<?php echo $img; ?>" style="width:250px;"/></td></tr>
			<tr><td nowrap="nowrap"><input type="button" value="选择图片"  onclick="UpFile('Images:/','img');"/>
			<input type="button" value="预览" onclick="$('#image').attr('src',$('#img').val())" /></td></tr>
		</table>
		
		<hr style=" height:1px; color:#CCC; margin-top:10px;" />
		<table border="0" cellspacing="0" cellpadding="0"  class="tab2">
			<tr>
				<td class="td1">姓名：</td>
				<td class="td2"><input type="text" name="name"  maxlength="4" value="<?php echo $name; ?>" /></td>
			</tr>
			<tr>
				<td class="td1">学历：</td>
				<input type="hidden" id="education" value="<?php echo $education; ?>" />
				<td><select name="education" >
						<option value="本科">本科</option>
						<option value="大专">大专</option>
						<option value="高中">高中</option>
						<option value="初中">初中</option>
						<option value="小学">小学</option>
					 </select></td>
			</tr>			
			<tr>
				<td class="td1">公司：</td>
				<td class="td2"><input type="text"   name="company" value="<?php echo $company; ?>"  maxlength="20" /></td>
			</tr>
			<tr>
				<td class="td1">职位：</td>
				<td class="td2"><input type="text" name="postition" value="<?php echo $postition; ?>" maxlength="15" /></td>
			</tr>
			<tr>
				<td class="td1">薪金：</td>
				<td class="td2"><input type="text" name="salary" value="<?php echo $salary; ?>" maxlength="5"/></td>
			</tr>
			<tr>
				<td class="td1">公司&nbsp;&nbsp;&nbsp;<br />简介：</td>
				<td class="td2"><textarea cols="60" rows="5" name="about_com"><?php echo $about_com; ?></textarea></td>
			</tr>
			<tr>
				<td></td>
				<td class="td3">
					<input type="submit" name="<?php echo $do; ?>" value="<?php echo $sub; ?>" />
					<input type="button" value="返回" onclick="history.back()" />
				</td>
			</tr>
		</table>
	</form>
	</div><!--end of stu_con -->

                  
</div><!--end of content -->
</body>
</html>
<script type="text/javascript">
$("option").each(function()
{
    if($(this).val() == $('#education').val())
    {
        $(this).attr('selected','true');
    }
})
</script>