<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script type="text/javascript" src="public/js/admin.js"></script>
<title>开班信息</title>
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


/*新闻列表*/
#News-Manage{ 
	position:relative;
}
#News-Manage p{ padding-left:5%; height:25px; line-height:25px;font-size:13px; white-space:nowrap;}

#news-top{width:95%; height:27px; padding-top:8px; background-color:#d2dbea;  padding-left:5%; white-space:nowrap;}
#news-top .page1{ position:absolute; right:3%; top:35px;}
#news-top .page1 a{ color:#000;}
#news-top .page1 a:hover{ color:#F00;}


/*新闻列表开始*/
.news-list{ width:100%; background-color:#c1c8d2;}/*修改宽度*/
.news-list th{ height:25px; background-color:#666; color:#000; font-weight:bold; background-color:#FFF;  height:30px;}
.news-list .th1{ width:5%; }
.news-list .th2{ width:15%;}
.news-list .th3{ width:25%;}
.news-list .th4{ width:30%;}
.news-list .th5{ width:10%;}
.news-list .th6{ width:15%;}

#addform{ text-align:center;}

.news-list .td-top{ height:5px;}
.news-list .td-bottom{ height:25px; color:#727d95; padding-left:15px;}
.news-list .td-bottom a{ color:#244281; text-decoration:underline;}

.news-list td{background-color:#FFF;}
.news-list .td1{ text-align:center; }
.news-list .td2{ text-align:center;}
.news-list .td3{ height:30px; text-align:left; padding-left:20px;}
.news-list .td3 a{ color:#5c5c5c; width:500px; height:30px;}
.news-list .td3 a:hover{ color:#F00;}
.news-list .td4{text-align:center;}

.news-list .td5{text-align:center;}
.news-list .td5 a{text-align:center; color:#090;}
.news-list .td5 a{text-align:center; color:#090;}
.news-list .td5 a:hover{color:#F00;}

.news-list .td6{text-align:center;}
.news-list .td6 a{text-align:center; color:#F00;}
.news-list .td6 a:hover{color:#00F; text-decoration:underline;}

/*页码*/
.news-list .page{ text-align:center; height:50px; vertical-align:middle; background-color:#d2dbea;}
.news-list .page ul{list-style-type:none; margin:0 auto; width:260px;}
.news-list .page li{ float:left; height:25px; line-height:25px; color:#000; margin-left:15px;}
.news-list .page a{ color:#000;}
.news-list .page a:hover{ color:#F00;}
/*新闻列表结束*/


</style>
</head>

<body>
<?php
extract($arr);
$title = array_shift($data);
?>
<div id="News-Manage">
	<p><b>开班信息</b>(共<?php echo $pageInfo['totalNum']-1; ?>条)</p>
	<div id="news-top">		
	    
		<table width="100%">
			<tr>
				<td nowrap="nowrap">
					<input type="button" value="批量删除" onclick="return delAll('#delform')" />
					<input type="button" name="add" value="开新班" onclick="$('#addform').show()" />
				</td>
				<td align="right" nowrap="nowrap">
				<form method="POST" action="<?php echo URL; ?>">
			   		<input type="text" name="title" value="<?php echo $title['title']; ?>" />
		 		  	<input type="submit" name="update" value="修改标题">
		 	    </form>
			   </td>
			 </tr>
	   </table>
	</div>

<!--新闻列表开始 -->
<table border="0" cellspacing="1" cellpadding="0" class="news-list" ondblclick="$('#addform').toggle();">
	<tr>
		<th class="th1" nowrap><input type="checkbox" id="check" onclick="check('#check');"/></th>
		<th class="th2" nowrap>排列顺序</th>
		<th class="th3" nowrap>开班日期</th>
		<th class="th4" nowrap>开班名称</th>
		<th class="th5" nowrap>开班状态</th>
		<th class="th6" nowrap>操作</th>
	</tr>
	<tr>
		<td colspan="6" class="td-top"></td>
	</tr>
	
	<tr style="display:none" id="addform">
	<form method="POST" action="<?php echo URL; ?>">
	    <input type="hidden" name="tid" value="1">
	    <td height="30"><input type="button" value="隐藏"  onclick="$('#addform').hide()"></td>
	    <td><input type="text" name="now_id" size="4"></td>
	    <td><input type="text" name="date"></td>
	    <td><select name="class">
	           <option value="平面设计周末班">平面设计周末班</option>
	           <option value="网页设计周末班">网页设计周末班</option>
	           <option value="PHP开发周末班">PHP开发周末班</option>
	           <option value="平面设计脱产班">平面设计脱产班</option>
	           <option value="网页设计脱产班">网页设计脱产班</option>
	           <option value="PHP开发脱产班">PHP开发脱产班</option>
	       </select></td>
	    <td><select name="status">
	           <option value="热招">热招</option>
	           <option value="已满">已满</option>
	       </select></td>
	    <td><input type="submit" name="add" value="点此添加"></td>
    </form>
	</tr>
	
	

<!--数据循环开始 -->
    <form method="POST" action="<?php echo URL; ?>" id="delform">
    <?php
    foreach ($data as $class)
    {
        extract($class)
    ?>
	<tr>
		<td class="td1"  nowrap><input type="checkbox" name="id[]" value="<?php echo $id; ?>" /></td>
		<td class="td2" nowrap><?php echo $id; ?></td>
		<td class="td3" nowrap><?php echo $date; ?></td>
		<td class="td4" nowrap><?php echo $class; ?></td>
		<td class="td5" nowrap><?php echo $status; ?></td>
		<input type="hidden" name="del" value="del">
		<td class="td6" nowrap><a href="<?php echo URL."&id=$id&do=del"; ?>" onclick="return confirm('你确定要删除吗？');">删除</a></td>
	</tr>
	<?php
    }
	?>
    </form>
<!--数据循环结束 -->
	
	<tr>
		<td colspan="6" class="td-bottom"  nowrap>
			选择： <a href="javascript:all();">全选</a>
			 - <a href="javascript:no();">全不选</a>
			 - <a href="javascript:invert();">反选</a>
		</td>
	</tr>
	<tr>
		<td colspan="6" class="page" nowrap><?php echo $buttonBasic; echo $buttonSelect; ?></td>
    </tr>
</table>
<!--新闻列表结束 -->

</div>
</body>
</html>