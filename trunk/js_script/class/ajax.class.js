/**
 * ajax����
 * @author  �ź�ΰ <mail@zhwphp.com>
 * @charset utf-8
 */

var ajax =
{
    //ajax��������ݺ���
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
                    alert("�����������֧��AJAX��");
                    return false;
                }
            }
        }
        return xmlHttp;
    },

    //ajax ��������
    send : function(method,url,data)
    {
        var xmlHttp = this.ajaxFunction();
        url += '&ajax=1&' + Math.random();
        xmlHttp.open(method,url,true);
        //���ΪPOST����Ҫ��open���������һ��
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

    //ajax post ��ʽ
    post : function(url,callback)
    {
        var offset = url.indexOf('?');
        if (offset == -1) {alert('û��POST����');return false;}
        var data = url.substr(offset+1);
        this.request('POST',url,data,callback);
    },

    //ajax get ��ʽ
    get : function(url,callback)
    {
        this.request('GET',url,'',callback);
    }
};

//�ص�����
//function test(a)
//{
//    alert(a)
//}