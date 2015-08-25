//Õº∆¨/flashœ‘ æ¥˙¬Î
function showads(jumpurl,swfurl,width,height,title)
{
    var str = '<a href="'+jumpurl+'" target="_blank">';
    var ext = swfurl.substr(swfurl.length-3);
    if (ext == 'swf')
    {
        str += '<div style="cursor:pointer;z-index:100;position:absolute;height:'+height+'px;width:'+width+'px;background-color:#fff;opacity:0.01;filter:alpha(opacity:1);"></div></a>';
        str += '<div style="height:'+height+'px;width:'+width+'px;overflow:hidden;">';
        str += '<embed src="'+swfurl+'" type="application/x-shockwave-flash" height="'+height+'" width="'+width+'" quality="high" wmode="opaque" allownetworking="none" allowscriptaccess="always" ></div>';
    }
    else
    {
        str += '<img src="'+swfurl+'" title="'+title+'" style="width:'+width+'px;height:'+height+'px;border:0;"></a>';
    }
    document.write(str);
}