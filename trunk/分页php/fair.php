<?php
require ("share.php");
require ("../config.php");
//config.php调用了分页类
	
if(isset($_COOKIE["Job_COOKIE"])){

//企业记录
$sql = "SELECT * FROM fair limit 0,10 ";   
$page = new Page($sql,10);
$sql =  $page->StartPage("fair_id",false,true,'down');//调用分页函数
$result = $db->query($sql);
$fair_list = array(); 
while ($row = $db->fetch_array($result)) {// 取一条数据 
	if($row['name'] == ""){
		$row['name'] = "<font color=red>招聘会名称为空</font>";
	}
	if($row['date'] == ''){
		$row['date'] = "<font color=red>日期为空！</font>";
	} 
	if($row['address'] == ''){
		$row['address'] = "<font color=red>地点为空！</font>";
	} 
	$fair_list[] = $row;
}

$db->free_result($result);
$ButtonArray = array("首页","上一页","下一页","末页");
$db->close();
$strHtml = $page->EndPage($ButtonArray,"select",true);//html分页条
$smarty->assign('pagePanel',$strHtml);
$smarty->assign('fair_list',$fair_list);//给模板赋值
$smarty->display('fair.tpl');//显示模板内容
}else{
?>
<script language="JavaScript">
var result = window.confirm("还没登录？请先登录");
if(result)
{
	window.location.href="login.php";
}
else
{
	document.write("您还没登录，所以还不能查看留言列表！");
}
</script>
<?php
	}
?>