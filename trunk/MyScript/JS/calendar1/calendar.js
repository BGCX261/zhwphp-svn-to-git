//Download by http://www.codefans.net
var controlid=null;var currdate=null;var startdate=null;var enddate=null;var yy=null;var mm=null;var hh=null;var ii=null;var currday=null;var addtime=false;var today=new Date();var lastcheckedyear=false;var lastcheckedmonth=false;function _cancelBubble(event){e=event?event:window.event;if(ie){e.cancelBubble=true;}else{e.stopPropagation();}}
function getposition(obj){var r=new Array();r['x']=obj.offsetLeft;r['y']=obj.offsetTop;while(obj=obj.offsetParent){r['x']+=obj.offsetLeft;r['y']+=obj.offsetTop;}
return r;}
function loadcalendar(){s='';s+='<div id="calendar" style="display:none; position:absolute; z-index:9;" onclick="_cancelBubble(event)">';if(ie)
{s+='<iframe width="200" height="160" src="about:blank" style="position:absolute;z-index:-1;"></iframe>';}
s+='<div style="width:200px;border:1px solid #333"><table cellspacing="1" cellpadding="2" bgcolor="#FFFFFF" width="100%" style="text-align: center">';s+='<tr align="center" bgcolor="#EEEEEE"><td><a href="#" onclick="refreshcalendar(yy, mm-1);return false" title="上一月">&lt;&lt;</a></td><td colspan="5" style="text-align: center"><a href="#" onclick="showdiv(\'year\');_cancelBubble(event);return false" title="点击选择年份" id="year"></a>&nbsp; - &nbsp;<a id="month" title="点击选择月份" href="#" onclick="showdiv(\'month\');_cancelBubble(event);return false"></a></td><td><A href="#" onclick="refreshcalendar(yy, mm+1);return false" title="下一月">&gt;&gt;</A></td></tr>';s+='<tr bgcolor="#F1F1F1"><td>日</td><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td>六</td></tr>';for(var i=0;i<6;i++){s+='<tr>';for(var j=1;j<=7;j++)
s+="<td id=d"+(i*7+j)+" height=\"19\">0</td>";s+="</tr>";}
s+='<tr id="hourminute"><td colspan="7" align="center"><input type="text" size="1" value="" id="hour" onKeyUp=\'this.value=this.value > 23 ? 23 : zerofill(this.value);controlid.value=controlid.value.replace(/\\d+(\:\\d+)/ig, this.value+"$1")\'> 点 <input type="text" size="1" value="" id="minute" onKeyUp=\'this.value=this.value > 59 ? 59 : zerofill(this.value);controlid.value=controlid.value.replace(/(\\d+\:)\\d+/ig, "$1"+this.value)\'> 分</td></tr>';s+='</table></div></div>';s+='<div id="calendar_year" style="display:none;line-height:130%;background:#FFF;border:1px solid #333;position:absolute;z-index:1000;" onclick="_cancelBubble(event)"><div style="float:left;padding:4px">';for(var k=1970;k<=2019;k++){s+=k!=1970&&k%10==0?'</div><div style="float:left;padding:4px">':'';s+='<a href="#" onclick="refreshcalendar('+k+', mm);$(\'calendar_year\').style.display=\'none\';return false"><span'+(today.getFullYear()==k?' style="color:#F00"':'')+' id="calendar_year_'+k+'">'+k+'</span></a><br />';}
s+='</div></div>';s+='<div id="calendar_month" style="display:none;background:#FFF;line-height:130%;border:1px solid #333;padding:4px;position:absolute;z-index:1001;" onclick="_cancelBubble(event)">';for(var k=1;k<=12;k++){s+='<a href="#" onclick="refreshcalendar(yy, '+(k-1)+');$(\'calendar_month\').style.display=\'none\';return false"><span'+(today.getMonth()+1==k?' style="color:#F00"':'')+' id="calendar_month_'+k+'">'+k+(k<10?'&nbsp;':'')+' 月</span></a><br />';}
s+='</div>';var nElement=document.createElement("div");nElement.innerHTML=s;document.getElementsByTagName("body")[0].appendChild(nElement);document.onclick=function(event){$('calendar').style.display='none';$('calendar_year').style.display='none';$('calendar_month').style.display='none';}
$('calendar').onclick=function(event){_cancelBubble(event);$('calendar_year').style.display='none';$('calendar_month').style.display='none';}}
function parsedate(s){/(\d+)\-(\d+)\-(\d+)\s*(\d*):?(\d*)/.exec(s);var m1=(RegExp.$1&&RegExp.$1>1899&&RegExp.$1<2101)?parseFloat(RegExp.$1):today.getFullYear();var m2=(RegExp.$2&&(RegExp.$2>0&&RegExp.$2<13))?parseFloat(RegExp.$2):today.getMonth()+1;var m3=(RegExp.$3&&(RegExp.$3>0&&RegExp.$3<32))?parseFloat(RegExp.$3):today.getDate();var m4=(RegExp.$4&&(RegExp.$4>-1&&RegExp.$4<24))?parseFloat(RegExp.$4):0;var m5=(RegExp.$5&&(RegExp.$5>-1&&RegExp.$5<60))?parseFloat(RegExp.$5):0;/(\d+)\-(\d+)\-(\d+)\s*(\d*):?(\d*)/.exec("0000-00-00 00\:00");return new Date(m1,m2-1,m3,m4,m5);}
function settime(d){$('calendar').style.display='none';controlid.value=yy+"-"+zerofill(mm+1)+"-"+zerofill(d)+(addtime?' '+zerofill($('hour').value)+':'+zerofill($('minute').value):'');}
function showcalendar(event,controlid1,addtime1,startdate1,enddate1){controlid=controlid1;addtime=addtime1;startdate=startdate1?parsedate(startdate1):false;enddate=enddate1?parsedate(enddate1):false;currday=controlid.value?parsedate(controlid.value):today;hh=currday.getHours();ii=currday.getMinutes();var p=getposition(controlid);$('calendar').style.display='block';$('calendar').style.left=p['x']+'px';$('calendar').style.top=(p['y']+20)+'px';_cancelBubble(event);refreshcalendar(currday.getFullYear(),currday.getMonth());if(lastcheckedyear!=false){$('calendar_year_'+lastcheckedyear).style.backgroundColor='#FFA';$('calendar_year_'+today.getFullYear()).style.backgroundColor='#A7E137';}
if(lastcheckedmonth!=false){$('calendar_month_'+lastcheckedmonth).style.backgroundColor='#FFA';$('calendar_month_'+(today.getMonth()+1)).style.backgroundColor='#A7E137';}
$('calendar_year_'+currday.getFullYear()).style.backgroundColor='#FFA';$('calendar_month_'+(currday.getMonth()+1)).style.backgroundColor='#FFA';$('hourminute').style.display=addtime?'':'none';lastcheckedyear=currday.getFullYear();lastcheckedmonth=currday.getMonth()+1;}
function refreshcalendar(y,m){var x=new Date(y,m,1);var mv=x.getDay();var d=x.getDate();var dd=null;yy=x.getFullYear();mm=x.getMonth();$("year").innerHTML=yy;$("month").innerHTML=mm+1>9?(mm+1):'0'+(mm+1);for(var i=1;i<=mv;i++){dd=$("d"+i);dd.innerHTML="&nbsp;";dd.style.backgroundColor="#F9F9F9";}
while(x.getMonth()==mm){dd=$("d"+(d+mv));dd.innerHTML='<a href="#" onclick="settime('+d+');return false">'+d+'</a>';if(x.getTime()<today.getTime()||(enddate&&x.getTime()>enddate.getTime())||(startdate&&x.getTime()<startdate.getTime())){dd.style.backgroundColor='#F9F9F9';}else{dd.style.backgroundColor='#F9F9F9';}
if(x.getFullYear()==today.getFullYear()&&x.getMonth()==today.getMonth()&&x.getDate()==today.getDate()){dd.style.backgroundColor='#A7E137';dd.firstChild.title='今天';}
if(x.getFullYear()==currday.getFullYear()&&x.getMonth()==currday.getMonth()&&x.getDate()==currday.getDate()){dd.style.backgroundColor='#FFA';}
x.setDate(++d);}
while(d+mv<=42){dd=$("d"+(d+mv));dd.innerHTML="&nbsp;";d++;}
if(addtime){$('hour').value=zerofill(hh);$('minute').value=zerofill(ii);}}
function showdiv(id){var p=getposition($(id));$('calendar_'+id).style.left=p['x']+'px';$('calendar_'+id).style.top=(p['y']+16)+'px';$('calendar_'+id).style.display='block';}
function zerofill(s){var s=parseFloat(s.toString().replace(/(^[\s0]+)|(\s+$)/g,''));s=isNaN(s)?0:s;return(s<10?'0':'')+s.toString();}
loadcalendar();