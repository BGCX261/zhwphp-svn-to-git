
//�ñ��������䰵
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

//�����û������alert
function show(str,msgWidth,msgHeight)
{
    if (msgWidth == undefined) msgWidth = 350;
    if (msgHeight == undefined) msgHeight = 50;
    var borderColor = "#336699";    //��ʾ���ڵı߿���ɫ
    var titColor = "#fff";    //��ʾ���ڵı�����ɫ

    //ȫ���ߴ�
    var winWidth = document.body.clientWidth;
    var winHeight = document.body.clientHeight;
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    if (winWidth < w) winWidth = w;
    if (winHeight < h) winHeight = h;
    //������
    var bgObj = document.createElement("div");
    var cssText = "position:absolute;top:0;left:0;background:#777;width:" + winWidth + "px;height:" + winHeight + 'px;'
    bgObj.style.cssText = cssText;
    bgObj.style.filter = "progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75"; //IE�±���ԭ������
    bgObj.style.opacity = "0.6";    //����±���ԭ������
    document.body.appendChild(bgObj);
    //��Ϣ��
    var msgObj = document.createElement("div")
    msgObj.setAttribute("id","msgDiv");
    msgObj.setAttribute("align","center");
    msgObj.style.cssText = "position:absolute;background:#fff;width:" + msgWidth + "px;height:" + msgHeight + 'px;'
    msgObj.style.font = "12px/1.6em Verdana, Geneva, Arial, Helvetica, sans-serif";
    msgObj.style.border = "1px solid " + borderColor;
    msgObj.style.top = (document.documentElement.scrollTop + (winHeight-msgHeight)/2) + "px";
    msgObj.style.left = (winWidth-msgWidth)/2 + "px";
    //�����
    var titObj = document.createElement("h4");
    cssText = "position:absolute;width:" + (msgWidth ) + ';px;margin:0;padding-top:3px;background:' + borderColor + ';height:20px;';
    cssText += "font:12px Verdana, Geneva, Arial, Helvetica, sans-serif;left:" + msgObj.style.left + ";color:" + titColor + ";cursor:pointer;";
    titObj.style.cssText = cssText;

    titObj.setAttribute("id","titObj");
    titObj.style.filter = "progid:DXImageTransform.Microsoft.Alpha(startX=20, startY=20, finishX=100, finishY=100,style=1,opacity=75,finishOpacity=100);";
    titObj.style.opacity = "0.75";
    titObj.style.top = msgObj.style.top.replace('px','') - 20 + 'px';
    titObj.style.left = msgObj.style.left;
    //�رղ�
    var closeObj = document.createElement("span");
    closeObj.style.cssText = "position:absolute;width:26px;margin-left:" + (msgWidth - 35) + 'px;';
    closeObj.innerHTML = '�ر�';
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
    //��Ϣ����
    var txt = document.createElement("p");
    txt.style.cssText = "margin:1em 0;padding-left:10px;padding-right:10px;word-wrap:break-word;"
    txt.innerHTML = str;
    document.getElementById("msgDiv").appendChild(txt);
}

function showDiv(src,width,height,titTxt)
{
    //Ԥ��ֵ
    var txtColor = '#fff';
    var titColor = '#87CEFA';
    var titHeight = 25;
    if(titTxt == undefined) titTxt = '';
    var isIE = navigator.appName == 'Microsoft Internet Explorer';
    //���ڳߴ�
    var winW = document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth;
    var winH = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
    //�ĵ��ߴ�
    var docW = document.body.scrollWidth;
    var docH = (document.body.scrollHeight > winH) ? document.body.scrollHeight : winH;
    //������
    var bgObj = document.createElement("div");
    var cssText = "position:absolute;top:0;left:0;width:"+docW+"px;height:"+docH+"px;background:#777;";
    cssText += isIE ? "filter:alpha(opacity=0);" : "opacity:0;";
    bgObj.style.cssText = cssText;
    //bgObj.style.filter = "progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75"; //IE�±���ԭ������
    //bgObj.style.opacity = "0.6";    //����±���ԭ������
    document.body.appendChild(bgObj);
    showBackground(bgObj,50);
    //�����
    var mainObj = document.createElement("div");
    mainObj.setAttribute('id','mainObj');
    mainObj.style.cssText = "position:absolute;padding:0;background:#fff;width:"+width+"px;height:"+height +";left:"+((winW-width)/2+document.body.scrollLeft)+"px";
    mainObj.style.top = ((winH-height)/2+document.body.scrollTop)+"px";
    //�����
    titObj = document.createElement("div");
    titObj.style.cssText = "font-size:12px;margin:0;line-height:"+titHeight+"px;width:"+width+'px;background:'+titColor+';height:'+titHeight+'px;';
    titObj.innerHTML = titTxt;
    titObj.mouseover = dragdrop.move(titObj,mainObj);
    //���ݲ�
    conObj = document.createElement("div");
    conObj.style.cssText = "background:#fff;top:"+titHeight+"px;width:"+width+"px;height:"+(height-titHeight)+"px;";
    if(document.getElementById(src)) {conObj.innerHTML = document.getElementById(src).innerHTML;}
    else {conObj.innerHTML = '<iframe src="'+src+'" width="'+width+'" height="'+(height-titHeight)+'" frameborder="0"></iframe>';}
    //�رղ�
    closeObj = document.createElement("div");
    closeObj.style.cssText = "cursor:pointer;width:26px;margin-left:"+(width-35)+'px;color:'+txtColor;
    closeObj.innerHTML = '<b>�ر�</b>';
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
    //Ԥ��ֵ
    var txtColor = '#fff';
    var titColor = '#87CEFA';
    var titHeight = 25;
    if(titTxt == undefined) titTxt = '';
    var isIE = navigator.appName == 'Microsoft Internet Explorer';
    //���ڳߴ�
    var winW = document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth;
    var winH = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
    //�ĵ��ߴ�
    var docW = document.body.scrollWidth;
    var docH = (document.body.scrollHeight > winH) ? document.body.scrollHeight : winH;
    //������
    var bgObj = document.createElement("div");
    var cssText = "position:absolute;top:0;left:0;width:"+docW+"px;height:"+docH+"px;background:#777;";
    cssText += isIE ? "filter:alpha(opacity=0);" : "opacity:0;";
    bgObj.style.cssText = cssText;
    //bgObj.style.filter = "progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75"; //IE�±���ԭ������
    //bgObj.style.opacity = "0.6";    //����±���ԭ������
    document.body.appendChild(bgObj);
    showBackground(bgObj,50);
    //�����
    var mainObj = document.createElement("div");
    mainObj.setAttribute('id','mainObj');
    mainObj.style.cssText = "position:absolute;padding:0;background:#fff;width:"+width+"px;height:"+height +";left:"+((winW-width)/2)+"px;top:"+((winH-height)/2)+"px";
    //mainObj.style.top = ((winH-height)/2)+"px";
    alert(winH);
    alert(mainObj.style.top)
    //�����
    titObj = document.createElement("div");
    titObj.style.cssText = "font-size:12px;margin:0;line-height:"+titHeight+"px;width:"+width+'px;background:'+titColor+';height:'+titHeight+'px;';
    titObj.innerHTML = titTxt;
    titObj.mouseover = dragdrop.move(titObj,mainObj);
    //���ݲ�
    conObj = document.createElement("div");
    conObj.style.cssText = "background:#fff;top:"+titHeight+"px;width:"+width+"px;height:"+(height-titHeight)+"px;";
    if(document.getElementById(src)) {conObj.innerHTML = document.getElementById(src).innerHTML;}
    else {conObj.innerHTML = '<iframe src="'+src+'" width="'+width+'" height="'+(height-titHeight)+'" frameborder="0"></iframe>';}
    //�رղ�
    closeObj = document.createElement("div");
    closeObj.style.cssText = "cursor:pointer;width:26px;margin-left:"+(width-35)+'px;color:'+txtColor;
    closeObj.innerHTML = '<b>�ر�</b>';
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
    { // ע������ƶ���һЩ�¼���
        var _IsMousedown=false,_ClickLeft=0,_ClickTop=0;
        var _hDom=this.get(handler);
        var _tDom=this.get(target);
        _hDom.style.cursor=cursor||"move";

        function startDrag(evt)
        { // ����������ʱ���¼���
            evt=window.event||evt;  // ��ȡ��ǰ�¼�����
            _IsMousedown=true;  // ��¼�Ѿ�׼����ʼ�ƶ��ˡ�
            _ClickLeft=evt.clientX-parseInt(_tDom.style.left); // ��¼��ǰ�����ᡣ
            _ClickTop=evt.clientY-parseInt(_tDom.style.top);
        }
        function doDrag(evt)
        { // ��꿪ʼ�ƶ�ʱ���¼���
            evt=window.event||evt; // ��ȡ��ǰ�¼�����
            if(!_IsMousedown)return false; // ���_IsMousedown���������˷��ء�
            _tDom.style.left=evt.clientX-_ClickLeft+"px"; // ����굱ǰ�ƶ���λ�ø�ֵ��div
            _tDom.style.top=evt.clientY-_ClickTop+"px"; // ��ǰλ�ü�ȥ��ʼλ�þ��ǲ㵱ǰ��ŵ�λ�á�
        }
        function endDrag()
        { // �ͷ�������ʱ���¼���
            if(_IsMousedown)
            { // ���_IsMousedown��Ϊ����ô�͸�ֵΪ�١�
                if(this.isIE) _tDom.releaseCapture(); //�ú����ӵ�ǰ�Ĵ����ͷ���겶�񣬲��ָ�ͨ����������봦����
                _IsMousedown=false;
            }
        }
        _hDom.onmousedown=startDrag; // ��갴���¼���
        document.onmouseup=endDrag;  // ����ͷ��¼���
        document.onmousemove=doDrag; // ����ƶ��¼���
        _tDom.onselectstart=_tDom.oncontextmenu=function(){return false;}; // ��ֹѡ����Ҽ��˵���
    },
    isIE : (navigator.appName=="Microsoft Internet Explorer"), // �ж��Ƿ�ΪIE��
    get : function(element)
    { // ͨ��һ���ַ�����һ������
        if(typeof(element) == "string"){return document.getElementById(element);}
        return element;
    }
};