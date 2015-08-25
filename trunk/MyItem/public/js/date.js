// JavaScript Document
function shijian()
{
var date,year,month,day,week,hour,minute,second,dat;   //3定义年月日，并赋值
date=new Date();
year=date.getYear();
if(year<2000)
{
	year=year+1900;	
}
month=date.getMonth()+1;        //月从0开始
day=date.getDate();
week=date.getDay();
hour=date.getHours();
minute=date.getMinutes();
if(minute<10)
{
	minute='0'+minute;	
}

second=date.getSeconds();
if(second<10)
{
	second='0'+second;	
}

switch(week)	
{
case 0:
week="星期日";
break;

case 1:
week="星期一";
break;

case 2:
week="星期二";
break;

case 3:
week="星期三";
break;

case 4:
week="星期四";
break;

case 5:
week="星期五";
break;

case 6:
week="星期六";
break;
}

	dat=year+"年"+month+"月"+day+"日&nbsp;"+week+"&nbsp;"+hour+":"+minute+":"+second;
	
	document.getElementById("tim").innerHTML=dat;
}

setInterval("shijian()",1000);  //每秒刷新一次。