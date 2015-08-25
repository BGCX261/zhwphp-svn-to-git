<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>技术文章</title>
<script type="text/javascript" src="public/js/date.js"></script>
<script type="text/javascript" src="public/js/jquery-1.4.2.min.js"></script>
<script type="text/javascript" src="tool/ckeditor/ckeditor.js"></script>
<script type="text/javascript" src="tool/ckfinder/ckfinder.js"></script>
<script type="text/javascript" src="public/js/calendar.js"></script>

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

/*新闻内容*/
#news-content{ 
	padding:13px 7px;
	min-width:700px;
	_width:expression((document.documentElement.clientWidth||document.body.clientWidth)<700?"700px":"");/*最小宽度代码*/
}

#news-content .nc-top{ background-color:#d2dbea; border-bottom:1px solid #cad1db; height:34px; line-height:34px;}
#news-content .nc-top table{ width:100%; font-size:12px;}
#news-content .nc-top table td{ height:25px;}
#news-content .nc-top table .td1{ width:36%; padding-left:60px;}
#news-content .nc-top table .td1 a{ margin-left:15px; color:#244281; text-decoration:underline;}
#news-content .nc-top table .td1 a:hover{ color:#F00; text-decoration:none;}
#news-content .nc-top table .td2{ width:60%; text-align:right; padding-right:3%;}

#news-content .nc-zhongjian{ padding-left:32px; padding-right:32px;  margin-top:14px;}
#news-content .nc-zhongjian table{ width:100%; height:70px;}
#news-content .nc-zhongjian .td1{ width:56px; text-align:right;}
#input-1 { margin-left:10px; margin-right:10px; border-top:1px solid #7c7c7c; border-left:1px solid #9a9a9a; border-right:1px solid #c3c3c3; border-bottom:1px solid #c3c3c3; height:22px; vertical-align:middle; color:#F00;}
#news-content .nc-zhongjian .td2{ padding-right:15px;}

/*编辑器*/
#nc-zhongjian-text{text-align:right;border:1px solid #9a9a9a; height:400px; margin-top:10px; margin-left:37px; margin-right:10px;}

#news-content .nc-zhongjian h5{ color:#727d95; font-weight:normal; font:12px Arial, Helvetica, sans-serif; margin-left:30px; margin-top:20px;}
#news-content .nc-zhongjian h5 a{ color:#244281; font-weight:normal; font:12px Arial, Helvetica, sans-serif; text-decoration:underline; margin-left:5px;}


#news-content .nc-bottom{ background-color:#d2dbea; border-bottom:1px solid #cad1db; height:30px; line-height:30px; padding-left:70px; padding-top:7px; margin-top:23px;}
#news-content .nc-bottom input{ width:100px; height:25px; line-height:22px;}

</style>
</head>
<body onload="shijian()">
<?php
extract($arr);
if (!isset($title))
{
    $title = '';
    $time = '';
    $content = '';
}
?>
<div id="news-content">
	<div class="nc-top">
	<form method="POST" action="index.php?module=admin&act=action&tid=<?php echo $tid."&tb=$tb"; ?>">
		<table border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td class="td1" nowrap>分类:
				<input type="hidden" value="<?php echo $tid; ?>" id="tid">
					<select name="tid">
						<option value="1">前台文章</option>
						<option value="2">后台文章</option>
						<option value="3">就业文章</option>
					</select>
					<a href="javascript:history.back()">返回</a>
				</td>
				<td class="td2" nowrap>今天是：<span id="tim"></span></td>
			</tr>
		</table>
	</div>
	
	
	<div class="nc-zhongjian">
		<table border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td class="td1" nowrap>标题:</td>
				<td class="td2"><input type="text" id="input-1" name="title" value="<?php echo $title; ?>" style=" width:98%;" ></td> 
			</tr>
			<tr>
				<td class="td1" nowrap>时间:</td>
				<td class="td4" nowrap><input type="text" size="23"  id="input-1" class="_calendar" name="time" value="<?php echo $time; ?>"/>格式：2010-4-2</td>
			</tr>
		</table>
		
		<!--这里是编辑器 开始-->
		<textarea name="content" id="content"><?php echo $content; ?></textarea>
		<!--这里是编辑器 结束-->
		 
		<h5>选择:<a href="javascript:history.back()">返回</a></h5>
	
	</div>
	
	
	<div class="nc-bottom" >
		<table border="0" cellspacing="0" cellpadding="0">
			<tr>
			<input type="hidden" name="id" value="<?php echo $id?>" />
				<td nowrap="nowrap"><input type="submit" value="<?php echo $sub; ?>" name="<?php echo $do; ?>" />
					<input type="reset" value="取消" />
				</td>
			</tr>
		</table>
		</form>
	</div>
</div>
</body>
</html>
<script type="text/javascript">
if (typeof CKEDITOR == 'undefined')
{
    document.write('加载CKEditor失败');
}
else
{
    var editor = CKEDITOR.replace('content');
    CKFinder.SetupCKEditor(editor, 'tool/ckfinder/');  //ckfinder总目录的相对路径.
}
</script>
<script type="text/javascript">
$("option").each(function()
{
    if($(this).val() == $('#tid').val())
    {
        $(this).attr('selected','true');
    }
})
</script>