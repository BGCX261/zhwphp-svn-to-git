document.write("<script type='text/javascript' src='public/js/jquery-1.4.2.min.js'></script>");

//判断是否为空，输出提示，定位到错误
function isEmpty(id,text)
{
    if($(id).val() == '')
    {
        alert(text);
        $(id).focus();
        return true;
    }
    return false;
}

//使用JS、Ajax判断用户登陆
function chkLogin()
{
    var user = $('#user').val();
    var passwd = $('#passwd').val();
    var code = $('#code').val();
    if(isEmpty('#user','请请输入用户名！') || isEmpty('#passwd','请输入密码！') || isEmpty('#code','请输入验证码')) return false;
    $.get("index.php?module=admin&act=ajax&do=login",{code:code,'id':Math.random()},function(data)
    {
        if(data == 'no')
        {
            alert('验证码错误！');
            $('#code').val('');
            $('#code').focus();
            $('#image').attr('src','common/code.php?'+Math.random());
        }
        else if(data == 'yes')
        {
            $.post("index.php?module=admin&act=ajax&do=login",{user:user,passwd:passwd,'id':Math.random()},function(data2)
            {
                if(data2 == 'no')
                {
                    alert('用户名或密码错误！');
                    $('#passwd').val('');
                    $('#passwd').focus();
                    $('#code').val('');
                    $('#image').attr('src','common/code.php?'+Math.random());
                }
                else if(data2 == 'yes')
                {
                    $('form').submit();
                }
            });
        }
    });
}

//用户修改密码
function resetpwd()
{
    //规定用户输入格式
    function isOK(id,text1,len,text2)
    {
        if(isEmpty(id,text1))
        {
            return false;
        }
        else if($(id).val().length < len)
        {
            alert(text2);
            $(id).focus();
            return false;
        }
        return true;
    }
    if(!isOK('#user','请请输入用户名！',5,'用户名不能小于5位') || !isOK('#passwd','请输入原密码！',6,'原密码不小于6位！') || !isOK('#newpwd','请输入新密码！',6,'新密码不得小于6位') || !isOK('#repass','请再次输入新密码！',6,'确认密码有误！')) return false;
    else if($('#newpwd').val() != $('#repass').val())
    {
        alert('确认密码与新密码不一致');
        $('#repass').focus();
        return false;
    }
}

//全选
function all()
{
    $("[name='id[]']:checkbox").each(function()
    {
        $(this).attr('checked',true);
    });
}

//全不选
function no()
{
    $("[name='id[]']:checkbox").each(function()
    {
        $(this).attr('checked',false);
    });
    $('#check').attr('checked',false);
}

//反选
function invert()
{
    $("[name='id[]']:checkbox").each(function()
    {
        $(this).attr('checked',!($(this).attr('checked')));
    });
}

//checkbox选择
function check(id)
{
    $("[name='id[]']:checkbox").each(function()
    {
        $(this).attr('checked',($(id).attr('checked')));
    });
}

//提交删除表单
function delAll(id)
{
    var n = $("[name='id[]'][checked='true']:checkbox").length;
    if(n== 0)
    {
        alert('你没有选中任何项！');
        return false;
    };
    if(!confirm('你确定要删除这  '+ n +'  项吗？')) return false;
    $(id).submit();
}

//ckfinder打开上传页面
function UpFile( startupPath, functionData)
{
    var finder = new CKFinder() ;
    finder.BasePath = 'tool/ckfinder/' ;
    finder.StartupPath = startupPath ;
    finder.SelectFunction = SetFileField ;
    finder.SelectFunctionData = functionData ;
    finder.SelectThumbnailFunction = ShowThumbnails ;
    finder.Popup() ;
}
function SetFileField( fileUrl, data )
{
    document.getElementById( data["selectFunctionData"] ).value = fileUrl ;
}
function ShowThumbnails( fileUrl, data )
{
    var sFileName = decodeURIComponent( fileUrl.replace( /^.*[\/\\]/g, '' ) ) ;
    document.getElementById( 'thumbnails' ).innerHTML +=
    '<div class="thumb">' +
    '<img src="' + fileUrl + '" />' +
    '<div class="caption">' +
    '<a href="' + data["fileUrl"] + '" target="_blank">' + sFileName + '</a> (' + data["fileSize"] + 'KB)' +
    '</div>' +
    '</div>' ;

    document.getElementById( 'preview' ).style.display = "";
    return false;
}

