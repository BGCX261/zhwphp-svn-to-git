<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>招聘会一览表</title>
</head>

<body>
<style>
html,body,table,td,div{margin:0px auto; padding:0px auto; border:0;}
body,td,p,div,li,select,input,textarea {font-size:12px;}
.head{margin:0px auto; text-align:center;}
.head h1{font-size:18px;}
.fair {margin:0px auto;width:900px;border:1px solid #6699FF}
.fair_title table{margin:0px auto;}
.fair_title td{width:250px; line-height:25px; font-size:14px; font-weight:bold; text-align:center; background-color:#99CCFF}
.fair_list table{ margin:0px auto;}
.fair_list td{width:250px; line-height:25px; text-align:center; background-color:#CCCCCC}

.Pagelink{ margin:0px auto; text-align:center}
.Pagelink span{ margin:0px auto;}

</style>
<div id="wrap">
<div class="head"><h1>招聘会一览表</h1></div>
  <div class="content">

<a href="fair_add.php">添加招聘会信息</a>
	<div id="fair">

		<table class="fair_title" align="center">
			<tr>
			<td>日期</td>
			<td>地点</td>
			<td>招聘会名称</td>
			<tr/>
		</table>
		<table class="fair_list" align="center">
				<!--{foreach from=$fair_list item=item}-->
		<tr>
			<td><!--{$item.date}--></td>
			<td><!--{$item.address}--></td>
			<td><a href="fair_detail.php?fair_id=<!--{$item.fair_id}-->" ><!--{$item.name}--> </a></td>
			<!--{/foreach}-->
		</table>
	</div>
    <div class="Pagelink">
      <!--{$pagePanel}-->

    </div>
</div>
</body>
</html>
