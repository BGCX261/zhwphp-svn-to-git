/**
 * ajax方法
 * @author  张宏伟 <mail@zhwphp.com>
 * @charset utf-8
 */

var ajax =
{
    //ajax浏览器兼容函数
    ajaxFunction : function ()
    {
        var xmlHttp;
        try
        {
            xmlHttp=new XMLHttpRequest();
        }
        catch (e)
        {
            try
            {
                xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch (e)
            {
                try
                {
                    xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
                }
                catch (e)
                {
                    alert("您的浏览器不支持AJAX！");
                    return false;
                }
            }
        }
        return xmlHttp;
    },

    //ajax 发送数据
    send : function(method,url,data)
    {
        var xmlHttp = this.ajaxFunction();
        url += '&ajax=1&' + Math.random();
        xmlHttp.open(method,url,true);
        //如果为POST则需要在open后加下面这一句
        if (method == 'POST')
        {
            xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            xmlHttp.send(data);
        }
        else xmlHttp.send(null);
        return xmlHttp;
    },

    //ajax request
    request : function(method,url,data,callback)
    {
        var xmlHttp = this.send(method,url,data);
        xmlHttp.onreadystatechange = function()
        {
            if(xmlHttp.readyState == 4)
            {
                if(xmlHttp.status == 200)
                {
                    if (callback != undefined) {callback(xmlHttp.responseText);}
                }
                else if(xmlHttp.status == 404) alert("Requested URL is not found.");
                else if(xmlHttp.status == 403) alert("Access denied.");
                else alert("Status is: " + xmlHttp.status);
            }
        }
    },

    //ajax post 方式
    post : function(url,callback)
    {
        var offset = url.indexOf('?');
        if (offset == -1) {alert('没有POST数据');return false;}
        var data = url.substr(offset+1);
        this.request('POST',url,data,callback);
    },

    //ajax get 方式
    get : function(url,callback)
    {
        this.request('GET',url,'',callback);
    }
};

//回调函数
//function test(a)
//{
//    alert(a)
//}