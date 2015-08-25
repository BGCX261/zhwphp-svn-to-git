 var happyfight={
	homeuin:null,           //登陆qzone的uin
  	canfight:1,             //是否能乐斗，默认1，请求时为0
	canrun:1,               //体力恢复倒计时，默认1，请求时为0
	friendready:0,          //好友是否加载完成，默认0，请求时为1
	taskvalue:0,            //新手任务标志位，默认0
	hasfaction:0,           //是否加入帮派标志位，默认0
	loadskillswf:0,         //技能flash加载标志位，默认0
	loadweaponswf:0,        //武器flash加载标志位，默认0
    loadflaguin:0,          //黄钻未更新uin，默认0
    fightid:null,           //乐斗对方uin,默认为空
	ptime:null,              //乐斗体力计时器
	skill:null,
    weapon:null,
    petstatus:null,
	defaultgoods:null
},imgurl="http://fightimg.pet.qq.com/img/", 
  npcname=["自己","木头人","乐斗教主","乐斗帅帅","乐斗关公","乐斗月璇姐姐","乐斗源大侠"];
try{    
document.domain="qq.com";
}catch(e){}

(function(){
		if (!window.HF) {
			window.HF = {};
		}
		var Fdata = {};
			Fdata.info=[];
			Fdata.faction=[];
			Fdata.weapon=[];
			Fdata.shopgoods= [];
			Fdata.shopbag= {};
			Fdata.petevent= {};
			Fdata.fightevent= {};
			Fdata.friendlist= [];
			Fdata.factionfriend= [];

		window.HF.Fdata = Fdata;
			
		
		//tips显示
		function showtips(){
			 var tipswidth;
			$("*[tips]").css("cursor", "pointer");
			$("*[tips]").mouseover(function(){
				$("#tipsdiv").width("auto");
				$("#tipsdiv").html($(this).attr("tips"));
				$("#tipsdiv").css({
					left: $(this).offset().left + 20 + "px",
					top: $(this).offset().top + $(this).height() - 30 + "px"
				})
				tipswidth = parseInt($("#tipsdiv").width()) > 200 ? 200 : parseInt($("#tipsdiv").width())
				$("#tipsdiv").width(tipswidth);
				$("#tipsdiv").show();
			}).mouseout(function(){
				$("#tipsdiv").hide();
			}) 
		}
		window.HF.showtips = showtips;
		
		//接收数据异常处理
		function catchresut(num, msg){
			num = parseInt(num);
			switch (num) {
				case -5:
					QZONE.FP.showLoginBox(void (0));
				case -6:
					QZONE.FP.showMsgbox(msg, 1, 1500);
					break;
				default:
					QZONE.FP.showMsgbox(msg, 1, 1500);
					break;
			}
		}
		window.HF.catchresut = catchresut;
		
	function getinfo(uin){ //返回指定uin基础资料数据
			for (var i = 0; i < Fdata.info.length; i++) {
				if (parseInt(Fdata.info[i].uin) == parseInt(uin)) {
					return Fdata.info[i];
				}
			}
			
		}
		window.HF.getinfo = getinfo;

	  function getfaction(id){ //返回指定帮派资料数据
			for (var i = Fdata.faction.length-1; i >= 0; i--) {
				if (parseInt(Fdata.faction[i].id) == parseInt(id)) {
					return Fdata.faction[i];
				}
			}
			
		}
		window.HF.getfaction = getfaction;

		//返回帮派列表指定uin资料数据
		function getfactionfriend(uin){
			for (var i = 0; i < Fdata.factionfriend.length; i++) {
				if (parseInt(Fdata.factionfriend[i].uin) == parseInt(uin)) {
					return Fdata.factionfriend[i];
				}
			}
			return false;
		}
		window.HF.getfactionfriend = getfactionfriend;
    function reloadfactionfriend(){
	  $.getJSON("http://fight.pet.qq.com/cgi-bin/petpk?cmd=viewmember", function(data){
						if (data.result == "0") {
							Fdata.factionfriend = data.list;
							for (var i = 0; i < Fdata.factionfriend.length; i++) {
								if (parseInt(Fdata.factionfriend[i].pos)==1)
								{
								Fdata.factionfriend[i].facepic = imgurl+"marster.jpg";
								}
								else{
								Fdata.factionfriend[i].facepic = imgurl+"normal.jpg";
								}
							}
							showfactionfriend();
						}
						else {
							catchresut(data.result, data.msg)
						}
					})
	
	  }
    window.HF.reloadfactionfriend = reloadfactionfriend;
    //加帮派成员列表
     function loadfactionfriend(){
		    if(!happyfight.hasfaction||happyfight.hasfaction=="0"||happyfight.hasfaction==0) //好友列表有数据
			{
		     return QZONE.FP.showMsgbox("你还没有加入帮派，请在帮派页签寻找你喜欢的帮派加入吧！", 1, 2500);
			}
			if(Fdata.factionfriend.length > 0) //好友列表有数据
			{
				showfactionfriend();
			}
			else{ //拉取好友列表数据
				reloadfactionfriend();
			}
		}

		window.HF.loadfactionfriend = loadfactionfriend;

		
		//返回好友列表指定uin资料数据
		function friend(uin){
			for (var i = 0; i < Fdata.friendlist.length; i++) {
				if (parseInt(Fdata.friendlist[i].uin) == parseInt(uin)) {
					return Fdata.friendlist[i];
				}
			}
			return false;
		}
		window.HF.friend = friend;
		
		//保存好友列表数据到父窗口

		
		//加载好友列表数据
		function getfriendlist(){	
			if (Fdata.friendlist.length > 0) //好友列表有数据
			{
				loadfriendlist(Fdata.friendlist, 1);
				happyfight.friendready = 1;
				getfightevent();
			}
			else if (parent.fightfriend) //父窗口好友列表有数据
				{  
					 happyfight.hasfaction=parent.fightfaction?parent.fightfaction:happyfight.hasfaction;
					Fdata.friendlist = parent.fightfriend;
					loadfriendlist(Fdata.friendlist, 1);
					happyfight.friendready = 1;
					showflag(happyfight.homeuin);
					getfightevent();
				}
				else { //拉取好友列表数据
					$.getJSON("http://fight.pet.qq.com/cgi-bin/petpk?cmd=view&kind=1&sub=1", function(data){
						if (data.result == "0") {
							Fdata.friendlist = data.info;
							for (var i = 0; i < Fdata.friendlist.length; i++) {
								Fdata.friendlist[i].facepic = "http://imgcache.qq.com/qzone_v4/client/userinfo_icon/5001.gif";
							}
							loadfriendlist(Fdata.friendlist, 1);
							happyfight.friendready = 1;
							//如果基础资料已经加载，则重写一遍。
							if(getinfo(happyfight.homeuin)){
							   setinfo();
							}
							getfightevent();
							getyflag();
						}
						else {
							catchresut(data.result, data.msg)
						}
					})
				}
		}

		window.HF.getfriendlist = getfriendlist;


    function friendsearch(str){
	$("#hf_friendsch ol").html("");

	var searchlist=[];
    for (var i=0;i<Fdata.friendlist.length ;i++ )
   { 
	  if((Fdata.friendlist[i].uin+"").indexOf(str)>-1||Fdata.friendlist[i].name.indexOf(str)>-1)
	  searchlist.push(Fdata.friendlist[i])
   }
   if (searchlist.length>0)
   {
	 
	  loadfriendlist(searchlist,0);
   }
   else{
	  $("#hf_friendsch ol").html("查询不到好友")
    }
    $("#hf_friendsch").show();

   }
  window.HF.friendsearch = friendsearch;

		function showfightfriend(){ //显示最近乐斗的好友
			var arr = [], list = [], tempuin;
			$.getJSON("http://fight.pet.qq.com/cgi-bin/petpk?cmd=view&kind=1&sub=2", function(data){
				if (data.result == "0") {
					tempuin = data.info;
					for (var i = 0; i < tempuin.length; i++) {
						list[i] = tempuin[i] + "";
						if (HF.friend(tempuin[i])) {
							arr.push(HF.friend(tempuin[i]));
						}
					}
					loadfriendlist(arr, 2)
					showfriend(2);
				}
				else {
					catchresut(data.result, data.msg);
				}
			})
		}
window.HF.showfightfriend = showfightfriend;
		
	//拉取黄钻头像
	function getyflag(){
			
			var listurl = [];
			for (var i = 0; i < Fdata.friendlist.length; i++) {
				listurl.push(Fdata.friendlist[i].uin);
			}
			for (var k = 0; k < listurl.length; k += 50) {
				var testlist = ((k + 50) < listurl.length) ? (listurl.slice(k, k + 50)) : (listurl.slice(k, listurl.length));
				QZONE.FP.getPortraitList(testlist, function(o){
					try {
						for (var c in o) {
							HF.friend(c).facepic = o[c][0];
							HF.friend(c).yflag = o[c][3];
						}
					} 
					catch (e) {
					}
					loadfriendlist(Fdata.friendlist, 1);
					savefriend();
					getfightevent();
					happyfight.flagready = 1;
					if (happyfight.loadflaguin) {
						showflag(happyfight.loadflaguin);
					}
				});
			}
		}
		window.HF.getyflag = getyflag;
		
		//更新基本资料
		function setinfo(uin){
			var uin = uin || happyfight.homeuin, tempdata;
			showhfmenu(0);
			$("#hf_info").show();
			$("#hf_shop").hide();
			$("#hf_weapon").hide();	
			$("#hf_bp").hide();
			 if(parseInt(uin)<1000){
				loadnpcinfo(uin);
			}
			else if (getinfo(uin)) {
				writeinfo(getinfo(uin));
			}
			else{
			 loadinfo(uin);
			}
		}
		window.HF.setinfo = setinfo;
		
		//拉取基础资料
		function loadinfo(uin, fuc){
			uin = uin || happyfight.homeuin;
			$.getJSON("http://fight.pet.qq.com/cgi-bin/petpk?cmd=visit&puin="+uin+"&kind=1", function(data){			
				switch (data.result) {
					case "0":
						if (uin == happyfight.homeuin) {
							Fdata.info.shift();
							Fdata.info.unshift(data);
						}
						else {
							Fdata.info.push(data);
						}
						if (data.msg != ""&&data.baseinfo.vipinfo=="") {
							pettask(data.msg);
						}
						writeinfo(data);
						if (fuc) {
					     eval(fuc);
				        }
						break;
					case "-5":
						QZONE.FP.showLoginBox(void (0));
						break;
					default:
						QZONE.FP.showMsgbox("获取" + uin + "资料失败，请稍后再试", 1, 2500);
						break;
				}
				
			})
		}
		window.HF.loadinfo = loadinfo;

	  function loadnpcinfo(id){
			$.getJSON("http://fight.pet.qq.com/cgi-bin/petpk?cmd=viewnpc&id="+id, function(data){			
				switch (data.result) {
					case "0":			
						Fdata.info.push(data);
						writeinfo(data);
						break;
					case "-5":
						QZONE.FP.showLoginBox(void (0));
						break;
					default:
						QZONE.FP.showMsgbox("加载NPC信息失败，请稍后再试", 1, 2500);
						break;
				}
				
			})
		}
		window.HF.loadnpcinfo = loadnpcinfo;
		
				
		function showshopmenu(){
			$("#hf_info").hide();
			$("#hf_weapon").hide();
			$("#hf_bp").hide();
			$("#hf_shop").show();
		}
		//拉取商店资料
		function loadgoods(page,func){
			var page = page || 1;
			if (parent.HFgoods)
			{
              Fdata.shopgoods=parent.HFgoods;
			}
			if (Fdata.shopgoods.result=="0")
			{   
				if (func)
				{
					eval(func)
				}
                else{
				showshopmenu();
				showgoods(page);
				}
			}
			else{
			$.getJSON("http://fight.pet.qq.com/cgi-bin/petpk?cmd=view&kind=0&sub=2&page=" + page + "&type=1", function(data){

					if (data.result == "0") {
						Fdata.shopgoods=data;
                        parent.HFgoods=data;
				       if (func)
				       {
					    eval(func)
				       }
                       else{
				       showshopmenu();
				       showgoods(page);
				       }
					}
					else {
						catchresut(data.result, data.msg)
					}
			
			})
			}
		}
		window.HF.loadgoods = loadgoods;
		//加载储物箱
		function loadbag(page){
			showshopmenu();
			var page = page || 0;
			$.getJSON("http://fight.pet.qq.com/cgi-bin/petpk?cmd=view&kind=0&sub=2&type=4", function(data){
				//data = eval("(" + data + ")");
				if (data.result == "0") {
					Fdata.shopbag = data;
					showbag(page);
				}
				else {
					catchresut(data.result, data.msg)
				}
				
			})
		}
		window.HF.loadbag = loadbag;

	 //武器升级
	 function weaponup(type){
		 if (!type&&Fdata.weapon.length>1)
		 {showweaponup();
		 	 $("#hf_info").hide();
			         $("#hf_shop").hide();
					 $("#hf_bp").hide();
			         $("#hf_weapon").show();
					 $("#hf_menu li").attr("class","");
	                 $("#hf_menu li")[3].className="nowtag";
		 }
         else{
	     $.getJSON("http://fight.pet.qq.com/cgi-bin/petpk?cmd=updatelist", function(data){
				if (parseInt(data.result) == 0) {
					Fdata.weapon = data.item;
					showweaponup();
					$("#hf_info").hide();
					 $("#hf_shop").hide();
					 $("#hf_bp").hide();
			         $("#hf_weapon").show();
					 $("#hf_menu li").attr("class","");
	                 $("#hf_menu li")[3].className="nowtag";
				}
				else {
					//catchresut(data.result, data.msg)
				}
				
			}) 
		 }
	   }
     window.HF.weaponup = weaponup;
    
	//帮派系统
     function faction(id){
		        if (id)
		        {
                  loadfaction(id);
		        }
		        else if(happyfight.hasfaction==""||happyfight.hasfaction=="0"||happyfight.hasfaction==0)
		         {
					
					loadnofaction();
		         }
				 else{
                     loadfaction(happyfight.hasfaction);
				 }
				  $("#hf_menu li").attr("class","");
	              $("#hf_menu li")[4].className="nowtag";
                  $("#hf_info").hide();
			      $("#hf_shop").hide();
				  $("#hf_weapon").hide();
				  $("#hf_bp").show();
			          
	 }
    window.HF.faction = faction;
    
	function clickfaction(){
	   if(happyfight.hasfaction==""||happyfight.hasfaction=="0"||happyfight.hasfaction==0)
	   {
        faction();
	   }
	   else{
	   faction();
	   loadfactionfriend();
	   }
	}
	window.HF.clickfaction = clickfaction;

	function loadfaction(id){	
		if (getfaction(id)&&parseInt(id)!=parseInt(happyfight.hasfaction))
		{
		   showfaction(id);
		}
		else{
	    id=id?id:happyfight.hasfaction;
		$.getJSON("http://fight.pet.qq.com/cgi-bin/petpk?cmd=viewfaction&id="+id,function(data){
			if (data.result=="0")
			{
			  Fdata.faction.push(data);
              showfaction(id);
			}
			else{
            catchresut(data.result, data.msg)
			}
		})
		}
	}
	window.HF.loadfaction = loadfaction;
	function loadnofaction(){
		$.getJSON("http://fight.pet.qq.com/cgi-bin/petpk?cmd=viewfaction&id="+happyfight.hasfaction,function(data){
			if (data.result=="0")
			{
			  switch (data.type)
				{
				case "3": 
					Fdata.faction.push(data);
                    showfaction(data.id);
					break;
                case "1": 
					Fdata.faction.push(data);
                    showfaction(data.id);
					break;
				case "0": 
					Fdata.faction.push(data);
                    showfaction(data.id);
					break;
				case "2": 
					Fdata.faction.push(data);
                    shownofaction(data);
					break;
				
				}
			 
			}
			else{
            catchresut(data.result, data.msg)
			}
		})
	}

	//武器升级
	function toweaponup(id){
          $.getJSON("http://fight.pet.qq.com/cgi-bin/petpk?cmd=update&id="+id, function(data){
				if (parseInt(data.result) == 0) {
			      QZONE.FP.showMsgbox(data.msg,1,1000);
				  weaponup(1);
				  if (getinfo(happyfight.homeuin))
				  {
					  Fdata.info.shift();
				  }
				}
				else if(parseInt(data.result) == 1){
				   fightbuy(3036,1);
				}
				else {
				}
				
			})
     
     }
     window.HF.toweaponup = toweaponup;
		//加载乐斗动态
		function getfightevent(page,type){
			page = page || 1;
			if (Fdata.fightevent.result == "0"&&!type) {
				showfightevent(Fdata.fightevent);
			}
			else {
				$.getJSON("http://fight.pet.qq.com/cgi-bin/petpk?cmd=view&kind=2&sub=1", function(data){
					if (data.result == "0") {
						Fdata.fightevent = data;
						showfightevent(Fdata.fightevent);
					}
					else {
						if (parseInt(data.result) == -5) {
							QZONE.FP.showLoginBox(void (0));
						}
					}
					
				})
			}
			
		}
		
		window.HF.getfightevent=getfightevent;
		
		
		//加载企鹅动态
		function getpetevent(page){
			page = page || 1;
			$.getJSON("http://fight.pet.qq.com/cgi-bin/petpk?cmd=view&pageno=" + page + "&kind=2&sub=0", function(data){
				if (data.result == "0") {
					Fdata.petevent = data;
					showpetevent(Fdata.petevent);
				}
				else {
					catchresut(data.result, data.msg)
				}
				
			})
			
		}
		
		window.HF.getpetevent=getpetevent;

		//删除企鹅动态
		function delevent(obj){
			var url = obj.getAttribute("turl");
			if (confirm("删除操作不可恢复，您确认要继续么？")) {
				$.getJSON("http://fight.pet.qq.com/cgi-bin/petpk?cmd=del&kind=1&id=" + url, function(data){
					if (data.result == "0") {
						QZONE.FP.showMsgbox("操作成功！", 1, 1500);
						getpetevent()
					}
					else {
						catchresut(data.result, data.msg)
					}
				})
			}
			else {
				return false;
			}
			
		}
		window.HF.delevent = delevent;
		
		//播放录像
		function petproview(obj){
			var url = obj.getAttribute("turl");
			$.getJSON("http://fight.pet.qq.com/cgi-bin/petpk?cmd=viewfight&id=" + url, function(data){
				if (data.result == "0") {
					getSwfInstance("PetFunFight").setFightReplayData(data.string);
					happyfight.canfight = 0;
					parent.QZONE.dom.setScrollTop(0);
				}
				else {
					catchresut(data.result, data.msg);
				}
			})
		}
		
		window.HF.petproview = petproview; 
			//播放录像
		function openproview(obj){
			var url = obj.getAttribute("turl");
			window.open("http://fight.pet.qq.com/replay.html?id="+url,"_blank")
		}
		
		window.HF.openproview = openproview; 

		function delurl(obj){
			var url = obj.getAttribute("turl");
		if (confirm("删除操作不可恢复，您确认要继续么？")) {
			$.getJSON("http://fight.pet.qq.com/cgi-bin/petpk?cmd=delpos&id=" + url, function(data){
				if (data.result == "0") {
	             QZONE.FP.showMsgbox("删除录像成功", 1, 1500);
				 getvideo();
				}
				else {
					catchresut(data.result, data.msg);
				}
			})
		 }
		}
		
		window.HF.delurl = delurl;


		function getvideo(){
            $.getJSON("http://fight.pet.qq.com/cgi-bin/petpk?cmd=viewlist",function(data){
				if (data.result == "0") {
					showreplay(data)
				}
				else {
					catchresut(data.result, data.msg);
				}
		   }) 
		
		}
		window.HF.getvideo = getvideo; 
       
	   function copyurl(obj){
		 var url=escape(obj.getAttribute("turl"));
         url="http://fight.pet.qq.com/replay.html?id="+url;
	     text_clip(url,"复制成功，快粘贴到 QQ 和 论坛上 与你的好友分享吧！")    
	  }
	 window.HF.copyurl = copyurl;


      function openpos(num){
       	if (confirm("永久开通此录像位需要使用2Q币，你确定要开通吗？")){
            $.getJSON("http://fight.pet.qq.com/cgi-bin/petpk?cmd=buypos",function(data){

				if (data.result == "0") {
					QZONE.FP.showMsgbox("成功开通录像位", 1, 1500);
                   getvideo();
				}
				else {
					catchresut(data.result, data.msg);
				}
		   }) 
		}
	}
    window.HF.openpos = openpos;
	})()


	function savefriend(){
			parent.fightfriend = HF.Fdata.friendlist;
		}
 
  //时间小工具
  function timedate(date){
    var tempdata=date.split("/");
	  if (tempdata.length==2)
	  {return ("今天 "+tempdata[0]+"："+tempdata[1])
	  }
	  else{
	  return (tempdata[0]+"月"+tempdata[1]+"日 "+tempdata[2]+"："+tempdata[3])
	  }
  }
//整体加载
function happyfightload(){
	HF.loadinfo();
   HF.getfightevent(1,1);

}

//获取指定flash
function getSwfInstance(movieName){
  if (navigator.appName.indexOf("Microsoft") != -1)
     {
       return window[movieName];
     } 
   else if(document[movieName]){  
    return document[movieName];
   }
   else{
   return document.getElementById(movieName);
   }
}

 //获取指定物品
function getmybag(id){
  for (var i=0;i<HF.Fdata.shopbag.bag.length;i++)
	{ 
	  if (id==parseInt(HF.Fdata.shopbag.bag[i].id))   
	 {return HF.Fdata.shopbag.bag[i];
	 }
	}
}

 //菜单处理
 function showhfmenu(num){
$("#hf_menu li").attr("class","");
$("#hf_menu li")[num].className="nowtag";
}

 //领取每日奖励
function getgift(id){  
   $.getJSON('http://fight.pet.qq.com/cgi-bin/petpk?cmd=get',function(data){
    if (data.result=="0")
     {  
		HF.getinfo(happyfight.homeuin).baseinfo.giftflag="0";
      $(".pethomelink").html("<button class='bt_tx5 badbtn' disabled='disabled'>领取每日奖励</button>");
		openwin("http://fight.pet.qq.com/daytask.html?id="+id+"&"+data.msg+"&"+escape(data.name),"377","325");

     }
	 else{ 
			catchresut(data.result,data.msg)
		}
		  
   })
}
 
 /*-- flash加载处理 --*/
 //主flash加载完成
 function FightReady(){
   happyfight.houseready=1;
 }
 //技能flash加载完成
 function SkillRead(){
  if (happyfight.skill)
  {getSwfInstance("skillplayer").setSkillData(happyfight.skill);
 
  } 
  happyfight.loadskillswf=1;

 }
 //武器flash加载完成
 function WeaponRead(){
 if (happyfight.weapon)
  {getSwfInstance("weaponlayer").setWeaponData(happyfight.weapon);
  } 
  happyfight.loadweaponswf=1;
 }
 
 function fightface(uin){
       var str="http://imgcache.qq.com/qzone_v4/client/userinfo_icon/5001.gif"
        if (parent.fightfriend)
        {
		  for (var i = 0; i < parent.fightfriend.length; i++) {
				if (parseInt(parent.fightfriend[i].uin) == parseInt(uin)) {
					str= parent.fightfriend[i].facepic;
				}
			}
        }		
			return str;
		}
 //通用弹出窗口ui
 function openwin(url,w,h,fuc,t,c){
	     if (fuc)
	     {
			 fuc=fuc;
	     }
		 else
		 {
		     fuc=function(){};
		 }
		 if(!scope.pet_ledou_obj)
		  {
	        scopeaddStyle("#pet_ledou_open_div dl,#pet_ledou_open_div dt, #pet_ledou_open_div dd{margin:0;padding:0;}#pet_ledou_open{padding:3px;background:#bfd1ee;color:#333;}#pet_ledou_open dl {border:1px solid #aac1e9;background:white url(http://fightimg.pet.qq.com/images/pet_opbg.jpg) repeat-x left -4px;padding:0;}#pet_ledou_open dl dt {padding:0 25px 0 15px;cursor:move;position:relative;height:26px;line-height:26px;}#pet_ledou_open dl dd iframe {margin-bottom:-4px;*margin:0;}#pet_ledou_open_div .close_a {position:absolute;right:5px;width:17px;height:17px;background:url(http://fightimg.pet.qq.com/images/close_img.jpg) -17px top;cursor:pointer;top:5px;}#pet_ledou_open_div a.close_a:hover {background-position:left top;}#pet_ledou_open_div a.close_a:hover,#pet_ledou_open_div  a.close_a_hove {background-position:left top;}#pet_ledou_open_div .pet_task{background:url(http://fightimg.pet.qq.com/images/task.png) no-repeat;width:330px;height:364px;}#pet_ledou_open_div .pet_task dt{height:35px;font-size:0;text-indent:-999px;}#pet_ledou_open_div .pet_task .close_a{right:10px;width:20px;height:20px;}#pet_ledou_open_div .pet_task dd{padding:8px 0 0;}#pet_ledou_open_div .pet_task *{background:none;border:none;}")
            if (!scope.document.getElementById("pet_ledou_open_div"))
            { 
			  var pdiv=scope.document.createElement("div");
		      pdiv.setAttribute("id","pet_ledou_open_div")
              scope.document.body.appendChild(pdiv);
		      pdiv.innerHTML=$.pet_win.strhtml;
            }     	 
				scope.pet_ledou_obj=new $.pet_win($("#pet_ledou_open",scope.document),{width:w,height:h,c_url:url,onEnd:fuc});  
            }
         if (c)
         {
           scope.document.getElementById("pet_ledou_open").className="pet_task";
         }
		 else{
			 scope.document.getElementById("pet_ledou_open").className="";
		 }
	     scope.pet_ledou_obj._width=w;
         scope.pet_ledou_obj._title=t;
	     scope.pet_ledou_obj._height=h;	  
	     scope.pet_ledou_obj.iframe_src=url;
		 scope.pet_ledou_obj.onEnd=fuc;
	     scope.pet_ledou_obj.S();   
 }

//宠物flash形象拉取
var PetShowObj = function(petid,level,width,height)
{
	var objname = "petshowobj",petlevel=level||-1;
	var str="";
	str+='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+'\n';
    str+='id="'+objname+'" width="'+width+'" height="'+height+'"'+'\n';
    str+='codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab">'+'\n';
    str+='<param name="movie" value="http://img.pet.qq.com/avatar/CPetSprite.swf?petID='+petid+'&nLevel='+petlevel+'" />'+'\n';
    str+='<param name="quality" value="high" />'+'\n';
    str+='<param name="allowScriptAccess" value="sameDomain" />'+'\n';
    str+='<param name="wmode" value="transparent" />'+'\n';
    str+='<embed src="http://img.pet.qq.com/avatar/CPetSprite.swf?petID='+petid+'&nLevel='+petlevel+'" quality="high" width="'+width+'" height="'+height+'" wmode="transparent"'+'\n';
    str+='name="'+objname+'" align="middle"'+'\n';
    str+='play="true" loop="false" quality="high" allowScriptAccess="sameDomain"'+'\n';
    str+='type="application/x-shockwave-flash"'+'\n';
    str+='pluginspage="http://www.macromedia.com/go/getflashplayer">'+'\n';
    str+='</embed>'+'\n';
	str+='</object>'+'\n';
	return str;
}

  //插入flash
function swf(swf,swfid,width,height,flashvars,divid,wmode){
    var n= swf.indexOf("?");                           //判断flash地址是否包含？
    var flashUrl = swf;     //如果地址包含？号则定义flashUrl等于地址？前面的值，否则flashUrl的值等于传入的地址
    var flashVars = flashvars;     //如果地址包含？号则定义flashVars等于地址？后面的值
                                                       //下面是一段flash播放器的代码，以及插入一些传递的参数和变量。
    var swfStr = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="'+width+'" height="'+height+'" id="'+swfid+'" align="middle">';
    swfStr += '<param name="allowScriptAccess" value="always" />';
    swfStr += '<param name="movie" value="'+flashUrl+'" />';
    swfStr += '<param name="flashvars" value="'+flashVars+'" />';
    swfStr += '<param name="allowFullScreen" value="true" />';
    swfStr += '<param name="quality" value="high" />';
    swfStr += ' <param name="wmode" value="transparent">';
    swfStr += '<embed src="'+flashUrl+'" flashvars="'+flashVars+'" quality="high" ';
    swfStr += 'wmode="transparent"';
    swfStr += 'width="'+width+'" height="'+height+'" name="'+swfid+'" allowFullScreen="true" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
    swfStr += '</object>';
	//alert(swfStr);
    if(divid){
        document.getElementById(divid).innerHTML = swfStr;   //将flash代码插入指定容器id
    }else{
        document.write(swfStr);   
    }
}

//滚动公告
function scrollnews(){
  if($("#newscondiv li").length==1)
	{
	  return;
	}
  $t("newsdiv").innerHTML=$t("newscondiv").innerHTML;
  var MyMar=setInterval(Marquee,3000);
 }   

 function Marquee(){
   if($t("newsdiv").offsetTop-$t("newscon").scrollTop<=0)
	 {
       $t("newscon").scrollTop-=$t("newscondiv").offsetHeight;
	 }
   else
	 {
       $t("newscon").scrollTop+=22;
     }
  }


  //获取指定cookie值
function getCookie(str){
	var tmp,reg=new RegExp("(^| )"+str+"=([^;]*)(;|$)","gi");
	if(tmp=reg.exec(document.cookie))return(tmp[2]);
	return null;
	}

//乐斗播放完的动作
function FightComplete(){
	happyfight.canfight=1;
         happyfightload();
	     shituupdate(); 
}


function gbcount(obj,max)
{  var len=obj.value.length-1;
   if (calculate_byte(obj.value) > max) {
    obj.value = obj.value.substring(0,len);
	QZONE.FP.showMsgbox("字数不能超过"+max+"字节的长度限制。",1,2000);
 }
}
function calculate_byte(sTargetStr) {
        var sTmpStr, sTmpChar;
        var nOriginLen = 0;
        var nStrLength = 0;    
        sTmpStr = new String(sTargetStr);
        nOriginLen = sTmpStr.length;
        for ( var i=0 ; i < nOriginLen ; i++ ) {
                sTmpChar = sTmpStr.charAt(i);
                if (escape(sTmpChar).length > 4) {
                        nStrLength += 2;
                } else if (sTmpChar!='\r') {
                        nStrLength ++;
                }
        }     
        return nStrLength;     
}

function $t(s){
	return document.all?document.all[s]:document.getElementById(s);
}


 function text_clip(text,msg){  
	 if (window.clipboardData){  
          window.clipboardData.setData("Text", text);
		  QZONE.FP.showMsgbox(msg,1,2000); 
			 }  
     else if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){  
         
      if (window.netscape){  
       
             try{  
                 netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');  
             } catch (e) {  
                 alert("您的firefox安全限制限制您进行剪贴板操作，请在新页签地址栏输入about:config将signed.applets.codebase_principal_support设置为true'之后重试");  
             }  
             var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard); 
             if (!clip) return; 
             var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable); 
             if (!trans) return; 
             trans.addDataFlavor('text/unicode');  
             var str = new Object();  
             var len = new Object();  
             var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);  
             var texttext=text;  
             str.data=texttext;  
             trans.setTransferData("text/unicode",str,texttext.length*2);  
             var clipid=Components.interfaces.nsIClipboard;  
             if (!clip) return false;  
             clip.setData(trans,null,clipid.kGlobalClipboard);  
         }  
         alert("已复制"+text)  
     } 
	 else{
         alert("你的浏览器不支持此功能，请点击播放录像按钮在新窗口复制。")  
		 }
   
 } 
 try{    
   if (getCookie("uin"))
   {
	 happyfight.homeuin=getCookie("uin").replace(re = /^[o0]{0,}/,'');
   }
   else{
   	 happyfight.homeuin=getCookie("pt2gguin").replace(re = /^[o0]{0,}/,'');
   }

}catch(e){}