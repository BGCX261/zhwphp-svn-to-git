<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<base target='main' />
<title>后台管理菜单</title>
<link href="public/css/left-bar.css" rel="stylesheet" type="text/css" />
<script src="public/js/jquery-1.4.2.min.js"></script>
<script type="text/javascript">
// 收缩展开效果
$(document).ready(function(){
	$(".bar_3 h3").next(".bar_3_menu").hide();
    $(".bar_3 h3").click(function(){			
		//$(this).addClass('h3color').siblings(".bar_3 h3").removeClass();				       
		$(this).siblings("bar_3_menu").removeClass('h3color').click(function(){addClass('h3color')});
		$(this).next(".bar_3_menu").slideToggle('slow');
		$(this).next(".bar_3_menu").siblings(".bar_3_menu:visible").slideUp("slow");	 
	});    
    $('.bar_3>*').click(function(){
				//alert('aaaaa');
    });   
});
</script>

</head>
<body>
<div id="left-bar">


<!--重要项 -->
<ul class="bar_1">
	<li class="a1"><a href="?module=admin&act=system">系统管理</a></li>
	<li class="a2"><a href="#" target="_self" >系统帮助</a></li>
</ul>

<!--单项菜单 -->
<ul class="bar_2">	
	<li><a href="?module=admin&act=website">网站信息</a></li>
	<li><a href="?module=admin&act=action&tb=3&tid=1">开班信息</a></li>
	<li><a href="?module=admin&act=action&tb=11&tid=1">签约企业</a></li>
	<li><a href="?module=admin&act=action&tb=2&tid=1">急聘专区</a></li>
	<li><a href="?module=admin&act=action&tb=9&tid=1">师资力量</a></li>
	<li><a href="?module=admin&act=action&tb=6&tid=1">就业学员</a></li>
	<li><a href="?module=admin&act=action&tb=7&tid=1">作品展示</a></li>
	<li><a href="?module=admin&act=action&tb=10&tid=1&do=edit&id=1">工作室</a></li>
</ul>


<div id="box-123">
<!--下拉菜单项开始 -->
<div class="bar_3">
    <h3><a>新闻管理</a></h3>
	<ul class="bar_3_menu">
		<li><a href="?module=admin&act=action&tb=5&tid=1">企业动态</a></li>
		<li><a href="?module=admin&act=action&tb=5&tid=2">行业新闻</a></li>
	</ul>	
	
	<h3><a>课程信息</a></h3>
	<ul class="bar_3_menu">
		<li><a href="?module=admin&act=action&tb=4&tid=1">前台课程</a></li>
		<li><a href="?module=admin&act=action&tb=4&tid=2">后台课程</a></li>
	</ul>
	
    <h3><a>文章管理</a></h3>
	<ul class="bar_3_menu">
		<li><a href="?module=admin&act=action&tb=1&tid=1">前台文章</a></li>
		<li><a href="?module=admin&act=action&tb=1&tid=2">后台文章</a></li>
		<li><a href="?module=admin&act=action&tb=1&tid=3">就业文章</a></li>
	</ul>
	
	<h3><a>软件下载</a></h3>
	<ul class="bar_3_menu">
		<li><a href="?module=admin&act=action&tb=8&tid=1">前后软件</a></li>
		<li><a href="?module=admin&act=action&tb=8&tid=2">后台软件</a></li>
	</ul>
</div>
<!--下拉菜单项结束 -->
</div><!--end of box-123 -->


<!--无下拉-无底线 -->
<ul class="bar_4">
	<li></li>
</ul>
	
</div><!--end of left-bar -->
</body>
</html>