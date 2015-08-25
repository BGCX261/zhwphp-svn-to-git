
//让背景渐渐变暗
function showBackground(obj,endInt)
{
    if(navigator.appName == 'Microsoft Internet Explorer')
    {
        obj.filters.alpha.opacity += 6;
        if(obj.filters.alpha.opacity < endInt) setTimeout(function(){showBackground(obj,endInt)},5);
    }
    else
    {
        var al = parseFloat(obj.style.opacity);
        al += 0.01;
        obj.style.opacity = al;
        if(al < (endInt/100)) {setTimeout(function(){showBackground(obj,endInt)},5);}
    }
}

//改善用户体验的alert
function show(str,msgWidth,msgHeight)
{
    if (msgWidth == undefined) msgWidth = 350;
    if (msgHeight == undefined) msgHeight = 50;
    var borderColor = "#336699";    //提示窗口的边框颜色
    var titColor = "#fff";    //提示窗口的标题颜色

    //全屏尺寸
    var winWidth = document.body.clientWidth;
    var winHeight = document.body.clientHeight;
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    if (winWidth < w) winWidth = w;
    if (winHeight < h) winHeight = h;
    //背景层
    var bgObj = document.createElement("div");
    var cssText = "position:absolute;top:0;left:0;background:#777;width:" + winWidth + "px;height:" + winHeight + 'px;'
    bgObj.style.cssText = cssText;
    bgObj.style.filter = "progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75"; //IE下保留原来文字
    bgObj.style.opacity = "0.6";    //火狐下保留原来文字
    document.body.appendChild(bgObj);
    //消息层
    var msgObj = document.createElement("div")
    msgObj.setAttribute("id","msgDiv");
    msgObj.setAttribute("align","center");
    msgObj.style.cssText = "position:absolute;background:#fff;width:" + msgWidth + "px;height:" + msgHeight + 'px;'
    msgObj.style.font = "12px/1.6em Verdana, Geneva, Arial, Helvetica, sans-serif";
    msgObj.style.border = "1px solid " + borderColor;
    msgObj.style.top = (document.documentElement.scrollTop + (winHeight-msgHeight)/2) + "px";
    msgObj.style.left = (winWidth-msgWidth)/2 + "px";
    //标题层
    var titObj = document.createElement("h4");
    cssText = "position:absolute;width:" + (msgWidth ) + ';px;margin:0;padding-top:3px;background:' + borderColor + ';height:20px;';
    cssText += "font:12px Verdana, Geneva, Arial, Helvetica, sans-serif;left:" + msgObj.style.left + ";color:" + titColor + ";cursor:pointer;";
    titObj.style.cssText = cssText;

    titObj.setAttribute("id","titObj");
    titObj.style.filter = "progid:DXImageTransform.Microsoft.Alpha(startX=20, startY=20, finishX=100, finishY=100,style=1,opacity=75,finishOpacity=100);";
    titObj.style.opacity = "0.75";
    titObj.style.top = msgObj.style.top.replace('px','') - 20 + 'px';
    titObj.style.left = msgObj.style.left;
    //关闭层
    var closeObj = document.createElement("span");
    closeObj.style.cssText = "position:absolute;width:26px;margin-left:" + (msgWidth - 35) + 'px;';
    closeObj.innerHTML = '关闭';
    closeObj.onclick = function()
    {
        document.body.removeChild(bgObj);
        document.getElementById("titObj").removeChild(closeObj);
        document.body.removeChild(titObj);
        document.body.removeChild(msgObj);
    };
    document.body.appendChild(msgObj);
    document.body.appendChild(titObj);
    document.getElementById("titObj").appendChild(closeObj);
    //消息内容
    var txt = document.createElement("p");
    txt.style.cssText = "margin:1em 0;padding-left:10px;padding-right:10px;word-wrap:break-word;"
    txt.innerHTML = str;
    document.getElementById("msgDiv").appendChild(txt);
}

function showDiv(src,width,height,titTxt)
{
    //预设值
    var txtColor = '#fff';
    var titColor = '#87CEFA';
    var titHeight = 25;
    if(titTxt == undefined) titTxt = '';
    var isIE = navigator.appName == 'Microsoft Internet Explorer';
    //窗口尺寸
    var winW = document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth;
    var winH = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
    //文档尺寸
    var docW = document.body.scrollWidth;
    var docH = (document.body.scrollHeight > winH) ? document.body.scrollHeight : winH;
    //背景层
    var bgObj = document.createElement("div");
    var cssText = "position:absolute;top:0;left:0;width:"+docW+"px;height:"+docH+"px;background:#777;";
    cssText += isIE ? "filter:alpha(opacity=0);" : "opacity:0;";
    bgObj.style.cssText = cssText;
    //bgObj.style.filter = "progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75"; //IE下保留原来文字
    //bgObj.style.opacity = "0.6";    //火狐下保留原来文字
    document.body.appendChild(bgObj);
    showBackground(bgObj,50);
    //主体层
    var mainObj = document.createElement("div");
    mainObj.setAttribute('id','mainObj');
    mainObj.style.cssText = "position:absolute;padding:0;background:#fff;width:"+width+"px;height:"+height +";left:"+((winW-width)/2+document.body.scrollLeft)+"px";
    mainObj.style.top = ((winH-height)/2+document.body.scrollTop)+"px";
    //标题层
    titObj = document.createElement("div");
    titObj.style.cssText = "font-size:12px;margin:0;line-height:"+titHeight+"px;width:"+width+'px;background:'+titColor+';height:'+titHeight+'px;';
    titObj.innerHTML = titTxt;
    titObj.mouseover = dragdrop.move(titObj,mainObj);
    //内容层
    conObj = document.createElement("div");
    conObj.style.cssText = "background:#fff;top:"+titHeight+"px;width:"+width+"px;height:"+(height-titHeight)+"px;";
    if(document.getElementById(src)) {conObj.innerHTML = document.getElementById(src).innerHTML;}
    else {conObj.innerHTML = '<iframe src="'+src+'" width="'+width+'" height="'+(height-titHeight)+'" frameborder="0"></iframe>';}
    //关闭层
    closeObj = document.createElement("div");
    closeObj.style.cssText = "cursor:pointer;width:26px;margin-left:"+(width-35)+'px;color:'+txtColor;
    closeObj.innerHTML = '<b>关闭</b>';
    closeObj.onclick = function()
    {
        document.body.removeChild(mainObj);
        document.body.removeChild(bgObj);
    }
    document.body.appendChild(mainObj);
    mainObj.appendChild(titObj);
    titObj.appendChild(closeObj);
    mainObj.appendChild(conObj);
}

function showDiv(src,width,height,titTxt)
{
    //预设值
    var txtColor = '#fff';
    var titColor = '#87CEFA';
    var titHeight = 25;
    if(titTxt == undefined) titTxt = '';
    var isIE = navigator.appName == 'Microsoft Internet Explorer';
    //窗口尺寸
    var winW = document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth;
    var winH = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
    //文档尺寸
    var docW = document.body.scrollWidth;
    var docH = (document.body.scrollHeight > winH) ? document.body.scrollHeight : winH;
    //背景层
    var bgObj = document.createElement("div");
    var cssText = "position:absolute;top:0;left:0;width:"+docW+"px;height:"+docH+"px;background:#777;";
    cssText += isIE ? "filter:alpha(opacity=0);" : "opacity:0;";
    bgObj.style.cssText = cssText;
    //bgObj.style.filter = "progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75"; //IE下保留原来文字
    //bgObj.style.opacity = "0.6";    //火狐下保留原来文字
    document.body.appendChild(bgObj);
    showBackground(bgObj,50);
    //主体层
    var mainObj = document.createElement("div");
    mainObj.setAttribute('id','mainObj');
    mainObj.style.cssText = "position:absolute;padding:0;background:#fff;width:"+width+"px;height:"+height +";left:"+((winW-width)/2)+"px;top:"+((winH-height)/2)+"px";
    //mainObj.style.top = ((winH-height)/2)+"px";
    alert(winH);
    alert(mainObj.style.top)
    //标题层
    titObj = document.createElement("div");
    titObj.style.cssText = "font-size:12px;margin:0;line-height:"+titHeight+"px;width:"+width+'px;background:'+titColor+';height:'+titHeight+'px;';
    titObj.innerHTML = titTxt;
    titObj.mouseover = dragdrop.move(titObj,mainObj);
    //内容层
    conObj = document.createElement("div");
    conObj.style.cssText = "background:#fff;top:"+titHeight+"px;width:"+width+"px;height:"+(height-titHeight)+"px;";
    if(document.getElementById(src)) {conObj.innerHTML = document.getElementById(src).innerHTML;}
    else {conObj.innerHTML = '<iframe src="'+src+'" width="'+width+'" height="'+(height-titHeight)+'" frameborder="0"></iframe>';}
    //关闭层
    closeObj = document.createElement("div");
    closeObj.style.cssText = "cursor:pointer;width:26px;margin-left:"+(width-35)+'px;color:'+txtColor;
    closeObj.innerHTML = '<b>关闭</b>';
    closeObj.onclick = function()
    {
        document.body.removeChild(mainObj);
        document.body.removeChild(bgObj);
    };
    document.body.appendChild(mainObj);
    mainObj.appendChild(titObj);
    titObj.appendChild(closeObj);
    mainObj.appendChild(conObj);
}

var dragdrop =
{
    move : function(handler,target,cursor)
    { // 注册鼠标移动的一些事件。
        var _IsMousedown=false,_ClickLeft=0,_ClickTop=0;
        var _hDom=this.get(handler);
        var _tDom=this.get(target);
        _hDom.style.cursor=cursor||"move";

        function startDrag(evt)
        { // 按下鼠标左键时的事件。
            evt=window.event||evt;  // 获取当前事件对象。
            _IsMousedown=true;  // 记录已经准备开始移动了。
            _ClickLeft=evt.clientX-parseInt(_tDom.style.left); // 记录当前坐标轴。
            _ClickTop=evt.clientY-parseInt(_tDom.style.top);
        }
        function doDrag(evt)
        { // 鼠标开始移动时的事件。
            evt=window.event||evt; // 获取当前事件对象。
            if(!_IsMousedown)return false; // 如果_IsMousedown不等于真了返回。
            _tDom.style.left=evt.clientX-_ClickLeft+"px"; // 把鼠标当前移动的位置赋值给div
            _tDom.style.top=evt.clientY-_ClickTop+"px"; // 当前位置减去开始位置就是层当前存放的位置。
        }
        function endDrag()
        { // 释放鼠标左键时的事件。
            if(_IsMousedown)
            { // 如果_IsMousedown还为真那么就赋值为假。
                if(this.isIE) _tDom.releaseCapture(); //该函数从当前的窗口释放鼠标捕获，并恢复通常的鼠标输入处理。
                _IsMousedown=false;
            }
        }
        _hDom.onmousedown=startDrag; // 鼠标按下事件。
        document.onmouseup=endDrag;  // 鼠标释放事件。
        document.onmousemove=doDrag; // 鼠标移动事件。
        _tDom.onselectstart=_tDom.oncontextmenu=function(){return false;}; // 禁止选择和右键菜单。
    },
    isIE : (navigator.appName=="Microsoft Internet Explorer"), // 判断是否为IE。
    get : function(element)
    { // 通过一串字符返回一个对象。
        if(typeof(element) == "string"){return document.getElementById(element);}
        return element;
    }
};