<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script type="text/javascript" src="public/js/admin.js"></script>
<title>就业学员</title>
</head>
<style type="text/css">
*{ margin:0;padding:0;}
body{font:12px Arial, Helvetica, sans-serif; background-color:#fff; }
img{border:none;}
input{ font-size:12px;}
.kong{clear:both;}
img {border:0;} 
a {font:12px Arial, Helvetica, sans-serif; text-decoration:none; color:#000; } /*链接颜色修改*/
a:hover {text-decoration:none; color:#333; }
a { hide-focus: expression( this.hideFocus=true ); outline: none;}
.red{ color:#F00;}

/*就业明星*/
#student-manage{ 
	position:relative;
}
#student-manage p{ padding-left:5%; height:25px; line-height:25px;font-size:13px;}

#news-top{width:95%; height:27px; padding-top:8px; background-color:#d2dbea;  padding-left:5%; white-space:nowrap;}
#news-top .page1{ position:absolute; right:3%; top:35px;}
#news-top .page1 a{ color:#000;}
#news-top .page1 a:hover{ color:#F00;}
#news-top .edit{ color:#244281; margin-left:15px; text-decoration:underline;}
#news-top .edit:hover{ text-decoration:none;}

.stu_tab{ width:100%; background-color:#c1c8d2; margin-top:45px;}
.stu_tab td{ background-color:#FFF;}

/*照片显示*/
#student{ width:790px; margin:10px auto;}
#student ul{ list-style-type:none; display:block; float:left; margin-left:26px; margin-top:20px;height:142px;}
#student ul li{ display:block; text-align:center; width:108px; color:#666;}
#student ul .img_li a{ display:block; width:108px; height:120px; border:2px solid #fff; padding:2px;}
#student ul .img_li a:hover{ border:2px solid #b6c3d4;}
#student ul .img_li img{ width:106px; height:118px;}
#student ul .name_li{ height:20px; line-height:20px;}
.hide{display:none;}



/*底部条*/
.stu_tab .td-bottom{ height:25px; color:#727d95; padding-left:15px;}
.stu_tab .td-bottom a{ color:#244281; text-decoration:underline;}

/*页码*/
.stu_tab .page{ text-align:center; height:50px; vertical-align:middle; background-color:#d2dbea;}
.stu_tab .page ul{list-style-type:none; margin:0 auto; width:260px;}
.stu_tab .page li{ float:left; height:25px; line-height:25px; color:#000; margin-left:15px;}
.stu_tab .page a{ color:#000;}
.stu_tab .page a:hover{ color:#F00;}
</style>
<body>
<?php
extract($arr);
extract($pageInfo);
?>
<div id="student-manage">
	<p><b>学员信息</b>(共<?php echo $totalNum; ?>名)</p>
	<div id="news-top">
		<input type="button" name="del" value="批量删除" style=" color:#F00;" onclick="return delAll('#delform')"/>
		<input type="button" name="del" value="添加学员" onclick="location.href='<?php echo URL.'&do=add'; ?>'" />
		<a href="javascript:;" class="edit" id="guanli" onclick="$('.hide').show();$(this).hide();">管理</a>
		<span class="hide"><a href="javascript:;" class="edit" onclick="$('.hide').hide();$('#guanli').show();no();">退出管理</a></span>
		<span class="page1"><?php echo $buttonBasic; ?></span>
	</div>

	
<div id="student">
	<form method="POST" action="<?php echo URL; ?>" id="delform">
	<!--数据循环开始 -->
	<?php
	foreach ($data as $stu)
	{
	    extract($stu);
	?>
	<ul>
		<li class="img_li"><a href="<?php echo URL.'&do=edit&id='.$id; ?>"><img src="<?php echo $img; ?>" /></a></li>
		<li class="name_li"><input type="checkbox" name="id[]" value="<?php echo $id; ?>" style="margin-right:5px;" class="hide"/><?php echo $name; ?></li>
	   <input type="hidden" name="del" value="del" />
	</ul>
	<?php
	}
	?>
	<!--数据循环结束 -->
	</form>
</div>

<table border="0" class="stu_tab" cellpadding="0" cellspacing="1">
	<tr>
		<td colspan="7" class="td-bottom"  nowrap>
			选择：<span class="hide"><a href="javascript:all();">全选</a>
			 - <a href="javascript:no();">全不选</a>
			 - <a href="javascript:invert();">反选</a></span>
			 - <a href="<?php echo URL.'&do=add'; ?>">添加学员</a>
		</td>
	</tr>
	<tr>
		<td colspan="7" class="page"  nowrap>
			<ul>
				<li><?php echo $buttonBasic;echo $buttonSelect; ?></li>
			</ul></td></tr>	
	
</table>

</div>
</body>
</html>
