//设为主页
function setHome()
{
    try{
        document.body.style.behavior = 'url(#default#homepage)';
        document.body.setHomePage('http://www.zhwphp.com/');
    }catch(e){
        if(window.netscape){
            try{
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            }catch(e){
                alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
            };
        }else{
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将'http://www.zhwphp.com'设置为首页。");
        };
    };
}

//加入收藏夹
function addFavorite()
{
    if (document.all){window.external.addFavorite('http://www.zhwphp.com','zhw的博客');}
    else if(window.sidebar){window.sidebar.addPanel('http://www.zhwphp.com','zhw的博客');}
    else {alert('你的浏览器无法完成此操作，请手动添加')}
}