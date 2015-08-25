//Written by kulin
function pingQQ()
{
	if( typeof(pgvMain)=="function" )
	{
		var i;
		
		do
		{
			//Qzone
			urlMap = [/^http:\/\/qzone.(xiaoyou|xy)\.qq\.com\/([\S]*)\.php/i, 'app.xiaoyou.qq.com'];
			if ( urlMap[0].test(location.href) )
			{
				pvCurDomain = urlMap[1];
				var tmpPvCurParams = location.href.match(urlMap[0]);
				var php = tmpPvCurParams[2];
				var tmpPvCurParams = location.href.match(/[^_a-z]mod=([^\&\s\/\=]*)/i);
				var mod = tmpPvCurParams? tmpPvCurParams[1]: '';
				var tmpPvCurParams = location.href.match(/[^_a-z]act=([^\&\s\/\=]*)/i);
				var act = tmpPvCurParams? tmpPvCurParams[1]: '';
				if ( act == '' )
				{
					if ( mod == '' ) {
						pvCurUrl = '/qzone/' + php + '.php';
					} else {
						if ( mod == 'qzoneapi' )
						{
							//Feeds Tab 页
							pvCurDomain = 'feedinqz.xiaoyou.qq.com';
						}
						pvCurUrl = '/qzone/' + php + '/' + mod + '.php';
					}
				} else {
					if ( mod == 'inqzone' && act == 'profile' )
					{
						//Qzone个人中心模块
						pvCurDomain = 'pfinqz.xiaoyou.qq.com';
					}
					
					if ( mod == '' )
					{
						mod = 'MOD_NONE';
					}

					pvCurUrl = '/qzone/' + php + '/' + mod + '/' + act + '.php';
				}
				break;
			}

			//客户端
			urlMap = [/^http:\/\/service.(xiaoyou|xy)\.qq\.com\/([^?]*)?/i, 'client.xiaoyou.qq.com'];
			if ( urlMap[0].test(location.href) )
			{
				pvCurDomain = urlMap[1];
				var tmpPvCurParams = location.href.match(urlMap[0]);
				pvCurUrl = '/service/' + tmpPvCurParams[2];
				break;
			}

			//开心农场
			urlMap = [/^http:\/\/happyfarm\.(xiaoyou|xy)\.qq\.com\/([^?]*)/i, 'happyfarm.xiaoyou.qq.com'];
			if ( urlMap[0].test(location.href) )
			{
				var tmpPvCurParams = location.href.match(urlMap[0]);
				pvCurDomain = urlMap[1];
				pvCurUrl = '/' + tmpPvCurParams[2];
				break;
			}

			//主站PHP
			urlMap = [/^http:\/\/((.*)\.|)pengyou\.qq\.com\/([\S]*)\.php\?([\S]*)mod=([^\&\s\/\=]*)(\&act=([^\&\s\/\=]*))?/i, 'xiaoyou.qq.com'];
			if ( urlMap[0].test(location.href) )
			{
				pvCurDomain = urlMap[1];
				var tmpPvCurParams = location.href.match(urlMap[0]);
				if (typeof(tmpPvCurParams[2]) != 'undefined')
				{
					var pppp = tmpPvCurParams[2].indexOf('.');
					if (pppp > 0)
					{
						tmpPvCurParams[2] = tmpPvCurParams[2].substr(0, pppp);
					}
				}

				if ( tmpPvCurParams[2] == 'reg' && tmpPvCurParams[6] == 'campususer' && tmpPvCurParams[8] == 'register' )
				{
					var tmp = location.href.match(/\&invite_flag=([0-9]+)/i);

					if ( !tmp )
					{
						tmp = new Array;
					}

					if ( !tmp[1] || tmp[1] == '')
					{
						tmp[1] = 0;
					}

					pvCurUrl = '/' + 'REG_' + tmp[1] + '.php';
				} else {
					if ( !tmpPvCurParams[7] || tmpPvCurParams[7] == '' )
					{
						pvCurUrl = '/' + tmpPvCurParams[3] + '/' + tmpPvCurParams[5] + '.php';
					} else {
						pvCurUrl = '/' + tmpPvCurParams[3] + '/' + tmpPvCurParams[5] + '/' + tmpPvCurParams[7] + '.php';
					}
				}
				break;
			}
			
			//主站HTML
			urlMap = [/^http:\/\/((.*)\.|)pengyou\.qq\.com\/([^?]*\.html)?/i, 'xiaoyou.qq.com'];
			if ( urlMap[0].test(location.href) )
			{
				var tmpPvCurParams = location.href.match(urlMap[0]);
				pvCurDomain = urlMap[1];
				if (tmpPvCurParams[3] == '')
				{
					tmpPvCurParams[3] = 'index.html';
				}

				pvCurUrl = '/' + tmpPvCurParams[3];
				break;
			}

			//抢摊等应用
			urlMap = [/^http:\/\/([^.]*)\.qzone\.qq\.com\/(.*)?/i, 'app.xiaoyou.qq.com'];
			if ( urlMap[0].test(location.href) )
			{
				pvCurDomain = urlMap[1];
				var tmpPvCurParams = location.href.match(urlMap[0]);
				pvCurUrl = '/' + tmpPvCurParams[1] + '/' + tmpPvCurParams[2];
				break;
			}

			window.cancelSendPV = true;
		} while(false);

		if(!window.cancelSendPV)
		{
			pgvMain();
		}
	}
}

//不需要计PV的地址
urlNoPV = [
			/^http:\/\/service.(xiaoyou|xy)\.qq\.com\/classfeed\/([^?]*)/i,
			/^file:\/\/\/(.*)/i
		];

var nopv = false;
for (url in urlNoPV)
{
	nopv |= urlNoPV[url].test(location.href);
}

if (!nopv)
{
	window.setTimeout("pingQQ();", 1500);
}

var pvCurDomain=location.host,pvCurUrl=location.pathname; //can be changed after the script is loaded
var pvRefDomain=pvRefUrl=pvRealDomain="";
function pgvGetDomainInfo(){
	var l = location;
	try{l=top.location;}catch(e){};
	pvRealDomain=pvCurDomain=(pvCurDomain?pvCurDomain:l.host);
	var url=pvCurUrl?pvCurUrl:l.pathname;
	return("dm="+pvCurDomain+"&url="+escape(url)+"&tt=-");
}
function pgvGetRefInfo(){

	var refdm=refurl="-";

	//来源上报
	var adtag = location.href.match(/(\?|\&)ADTAG=([^&]+)/i);
	if (adtag)
	{
		adtag = adtag[2].replace(/\.[0-9]+/, '');
		refdm = 'xiaoyou.click';
		refurl = '/' + adtag;
	} else {
		var r=/https?:\/\/(\w+(\.\w+)+)(\/[^?#]*)?/;
		var m=document.referrer.match(r);
		try{m=top.document.referrer.match(r);}catch(e){};
		if(m){
			if(m.length>1)refdm=m[1];
			if(m.length>3)refurl=m[3];
		}
	}
	
	pvRefDomain=refdm=(pvRefDomain?pvRefDomain:refdm);
	pvRefUrl=refurl=(pvRefUrl?pvRefUrl:refurl);
	return("&rdm="+refdm+"&rurl="+escape(refurl));
}
function pgvGetUserInfo(){
	var m=document.cookie.match(/(^|;|\s)*pvid=([^;]*)(;|$)/);
	if(m){
		pvid=m[2]
	}else{
		var pvid = (Math.round(Math.random()* 2147483647)*(new Date().getUTCMilliseconds()))%10000000000;
		document.cookie="pvid="+pvid+"; path=/; domain=qq.com; expires=Sun, 18 Jan 2038 00:00:00 GMT;"
	}
	return "&pvid="+pvid;
}

function pgvSendInfo(url){
	window.pgvImg=new Image();
	window.pgvImg.src=url;
}

function pgvMain(pgv_bhv_type){
	try{
		var Url="http://pingfore.qq.com/pingd?"+pgvGetDomainInfo()+pgvGetRefInfo()+pgvGetUserInfo()+
		"&scr=-&scl=-&lang=-&java=1&cc=-&pf=-&tz=-8&ct=-&vs=3.3";
		if(pgv_bhv_type&&pgv_bhv_type=="return_url")return Url;
		pgvSendInfo(Url+"&emu="+Math.random());
	}catch(e){
		var v=ScriptEngine()+ScriptEngineMajorVersion()+"."+ScriptEngineMinorVersion();
		pgvSendInfo("http://219.133.51.97/pingd?err="+escape(e.message)+"&jsv="+v+"&url="+escape(location.href)+"&stone="+Math.random());
	}
}

//通用pgv ping方法
function pgvUrl(urlx, domainx, rurlx, rdomainx){
	if (!urlx)
		urlx = pvCurUrl;

	if (!domainx)
		domainx = pvCurDomain.replace('pengyou.' , 'xiaoyou.');
	else 
		domainx = domainx.replace('pengyou.' , 'xiaoyou.');

	if (!rurlx)
		rurlx = pvRefUrl;

	if (!rdomainx)
	{
		if (pvRefDomain != '-')
		{
			rdomainx = pvRefDomain.replace('pengyou.' , 'xiaoyou.');
		} else {
			rdomainx = pvCurDomain.replace('pengyou.' , 'xiaoyou.');
		}
	}

	try{
		var Url="http://pingfore.qq.com/pingd?dm="+domainx+"&url="+urlx+"&tt=-"+"&rdm="+rdomainx+"&rurl="+escape(rurlx)+pgvGetUserInfo()+
		"&scr=-&scl=-&lang=-&java=1&cc=-&pf=-&tz=-8&ct=-&vs=3.3";
		pgvSendInfo(Url+"&emu="+Math.random());
	}catch(e){
		var v=ScriptEngine()+ScriptEngineMajorVersion()+"."+ScriptEngineMinorVersion();
		pgvSendInfo("http://219.133.51.97/pingd?err="+escape(e.message)+"&jsv="+v+"&url="+escape(location.href)+"&stone="+Math.random());
	}
}

//名片
function pgvCard(){
	pgvUrl('/CARD');
}

//QQ群Tab页
function pgvClientGroupFeed(pvid){
	pgvUrl('/'+pvid, 'client.xiaoyou.qq.com');
}

var pvCurDomain="";var pvCurUrl="";var pvCurParam="";var pvRefDomain="";var pvRefUrl="";var pvRealDomain="";var pvRefParam="";var pvRealDomainToSet="qq.com";var pvGifUrl="http://pingfore.";var pvHotUrl="http://pinghot.";var pvDoc=document;if(window!=top){try{pvDoc=top.document;}catch(e){}}var pvLoc=pvDoc.location;var pvBody=pvDoc.body;var pvNone="-";var pvVersion="3.1";if(typeof(pvRepeatCount)=='undefined'){var pvRepeatCount=1;}
function pgvGetCookieSetDomain(){var aDot=new Array();var domainToSet,j=0;for(var i=0;i<pvRealDomain.length;i++){if(pvRealDomain.charAt(i)=='.'){aDot[j]=i;j++;}}var pos=pvRealDomain.indexOf(".cn");if(pos!=-1){aDot.length--;}if(aDot.length<1){domainToSet="qq.com";}else if(aDot.length==1){domainToSet=pvRealDomain;}else{domainToSet=pvRealDomain.substring(aDot[aDot.length-2]+1,pvRealDomain.length);}return domainToSet;}
function pgvSendClick(params){ if(params&&params.hottag){var url=pgvGetDomainInfo("", true);url+="&hottag="+escape(params.hottag);url+="&hotx=9999";url+="&hoty=9999";url+="&rand="+Math.round(Math.random()*100000);url=pvHotUrl+pgvGetCookieSetDomain()+"/pingd?"+url;pgvSendInfo(url);}}
/*  |xGv00|0e8ac1e67df9d5ad1f487d6515b42153 */