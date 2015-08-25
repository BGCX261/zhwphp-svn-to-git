<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
<title>后台起始页</title>
<script type="text/javascript" src="public/js/jquery-1.4.2.min.js"></script>
<link type="text/css" rel="stylesheet" href="public/css/common.css" />
<style type="text/css">
/* 选项卡 */
.tab{width:500px;border:#6c92ad 1px solid; margin:50px auto;}
.tab dl dt{ border-bottom:#6c92ad 1px solid;height:25px;background:
url(public/images/admin/dt-bg.gif) repeat-x; margin-bottom:-1px;}
.tab dl dt a{float:left;display:block;cursor:pointer;width:80px;height:25px;line-height:25px;text-align:center; background:url(public/images/admin/dt-bg.gif) repeat-x; color:#000; text-decoration:none;}
.tab dl dt a.tabActive{background:#fff;color:#333;font-weight:bold;border-bottom:none; position:relative;border-right:1px solid #6c92ad;border-left:1px solid #6c92ad;}
.tab dl dd{padding:10px;height:280px; clear:both;}

/*百度新闻样式*/
div{font-size:12px;	font-family:arial;}
.baidu{font-size:12px;line-height:24px;	font-family:arial;}
.baidu img{ display:none;}
a,a:link{color:#244281; font:13px Arial, Helvetica, sans-serif; text-decoration:underline;}
a:hover{ color:#F00; text-decoration:none;}
.baidu span{color:#6f6f6f;font-size:12px; } 
a.more{color:#008000; display:none;}
a.blk{color:#000;font-weight:bold;}
</style>
</head>
<body>

<script type="text/javascript">
// 选项卡
$(function(){
	$(".tab dl dt>a:first").addClass("tabActive");
	$(".tab dl dd ul").not(":first").hide();
	$(".tab dl dt>a").unbind("click").bind("click", function(){
		$(this).siblings("a").removeClass("tabActive").end().addClass("tabActive");
		var index = $(".tab dl dt>a").index( $(this) );
		$(".tab dl dd ul").eq(index).siblings(".tab dl dd ul").hide().end().fadeIn("slow");
   });
});
</script>
<!-- 选项卡 -->
<div class="tab">
	<dl>
    	<dt><a>互联网新闻</a><a>国内新闻</a><a>社会新闻</a><a>娱乐新闻</a><a>教育新闻</a></dt>
		<dd>
            <ul>
				<script language="JavaScript" type="text/JavaScript" src="http://news.baidu.com/n?cmd=1&class=internet&pn=1&tn=newsbrofcu"></script>
			</ul>
            <ul>
				<script language="JavaScript" type="text/JavaScript" src="http://news.baidu.com/n?cmd=1&class=civilnews&pn=1&tn=newsbrofcu"></script>
			</ul>
            <ul>
				<script language="JavaScript" type="text/JavaScript" src="http://news.baidu.com/n?cmd=1&class=socianews&pn=1&tn=newsbrofcu"></script>
			</ul>
			<ul>			
				<script language="JavaScript" type="text/JavaScript" src="http://news.baidu.com/n?cmd=1&class=enternews&pn=1&tn=newsbrofcu"></script>
			</ul>
			<ul>
				<script language="JavaScript" type="text/JavaScript" src="http://news.baidu.com/n?cmd=1&class=edunews&pn=1&tn=newsbrofcu"></script>
			</ul>
			      
         </dd>
	</dl>
</div>

</body>
</html>