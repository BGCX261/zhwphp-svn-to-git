function loadfriendlist(arr,num,page){  //加载好友列表
	savefriend();
	var pages,
		pagesize=20,
		maxsize,
		minsize,
		nextpage,
		propage,	
	    friendhtml="",
		pagehtml="";
  
	if(happyfight.friendpage&&num!=0)
	 {
       page=page||happyfight.friendpage;
	 }
	 else if(num==1&&!page){
	   for (var k=0;k<arr.length;k++)
	   {
		   if (parseInt(arr[k].uin)==parseInt(happyfight.homeuin))
		   {
             page=(parseInt(k/pagesize))+1;
		   }
	   }
	}
	else {
	  	   page=page||1;
	 }
	 happyfight.friendpage=page;
     pages=(arr.length%pagesize==0)?parseInt(arr.length/pagesize):(parseInt(arr.length/pagesize)+1);
     nextpage=(page==pages)?pages:(page+1);
	 propage=(page>1)?(page-1):1;
     minsize=(page-1)*pagesize;
	 maxsize=page<pages?page*pagesize:arr.length;
		for (var i=minsize;i<maxsize; i++)
		{  
     
		if (num==1&i<=2)
		  { friendhtml+="<li><dl><dt><b class='friendlist"+(i+1)+"'></b>"
		  }	
		  else if (num==1&i>2)
		  {	
			friendhtml+="<li><dl><dt><b>"+(i+1)+"</b>"
		  }
		  else {
		  friendhtml+="<li><dl><dt>";
		  }
	   if (parseInt(arr[i].uin)==parseInt(happyfight.homeuin))
          {		 
		  friendhtml+="<img src='"+arr[i].facepic+"' /><span class='groudspan'></span></dt><dd><span title='我的资料' class='blue namespan' onclick='HF.setinfo("+arr[i].uin+")'>"+arr[i].name+"</span><b class='vipspan'><a href='http://pet.qq.com/comm-htdocs/vip/?t=pet' target='_blank'><img src='http://imgcache.qq.com/ac/b.gif' alt='粉钻' class='icon_vip_f"+arr[i].flag+"' /></a><a target='_blank' href='http://pay.qq.com/qzone/index.shtml?ch=self&aid=dld.index'><img src='http://imgcache.qq.com/ac/b.gif' alt='黄钻' class='icon_vip_yl"+arr[i].yflag+"' /></a></b><b class='friend_exp' title='等级"+arr[i].lilian+"'><em>"+arr[i].lilian+"</em></b>";
		   }
       else if(parseInt(arr[i].qqflag)>1){
		 friendhtml+="<img src='"+arr[i].facepic+"' /><span class='groudspan'></span></dt><dd><span class='red namespan' title='查看QQ会员"+arr[i].uin+"资料' onclick='HF.setinfo("+arr[i].uin+")'>"+arr[i].name+"</span><b class='vipspan'><a href='http://pet.qq.com/comm-htdocs/vip/?t=pet' target='_blank'><img src='http://imgcache.qq.com/ac/b.gif' alt='粉钻' class='icon_vip_f"+arr[i].flag+"' /></a><a target='_blank' href='http://pay.qq.com/qzone/index.shtml?ch=self&aid=dld.index'><img src='http://imgcache.qq.com/ac/b.gif' alt='黄钻' class='icon_vip_yl"+arr[i].yflag+"' /></a></b><b class='friend_exp' title='等级"+arr[i].lilian+"'><em>"+arr[i].lilian+"</em></b>";
	    }
        else{
		 friendhtml+="<img src='"+arr[i].facepic+"' /><span class='groudspan'></span></dt><dd><span class='namespan' title='查看"+arr[i].uin+"资料' onclick='HF.setinfo("+arr[i].uin+")'>"+arr[i].name+"</span><b class='vipspan'><a href='http://pet.qq.com/comm-htdocs/vip/?t=pet' target='_blank'><img src='http://imgcache.qq.com/ac/b.gif' alt='粉钻' class='icon_vip_f"+arr[i].flag+"' /></a><a target='_blank' href='http://pay.qq.com/qzone/index.shtml?ch=self&aid=dld.index'><img src='http://imgcache.qq.com/ac/b.gif' alt='黄钻' class='icon_vip_yl"+arr[i].yflag+"' /></a></b><b class='friend_exp' title='等级"+arr[i].lilian+"'><em>"+arr[i].lilian+"</em></b>";

		}
       
	    if (parseInt(arr[i].uin)==parseInt(happyfight.homeuin)){
		}
        else{
		       friendhtml+="<em onclick='listfight("+arr[i].uin+")' class='masterfight' title='收TA为徒'></em>"
		} 

		 if (arr[i].factionid!=""&&arr[i].factionid!="0")
		 {     if (parseInt(arr[i].factionid)==parseInt(happyfight.hasfaction))
		      {
			 		 friendhtml+="<em title='TA是帮友' class='factionicon1' onclick='HF.faction("+arr[i].factionid+")'  /></em>";

		      }
			  else{
			 	friendhtml+="<em title='查看TA帮派' class='factionicon' onclick='HF.faction("+arr[i].factionid+")'  /></em>";
			  }
		 }
		if ((parseInt(arr[i].uin)==parseInt(happyfight.homeuin))&&arr[i].enable!="2")
		{
		  	friendhtml+="<em  class='fightready1 nicebutton' /></em>"

		}
		else if (arr[i].enable=="0")
		 {	
			friendhtml+="<em title='已经挑战过了' class='fightready nicebutton' /></em>"
		 }
		 else if (arr[i].enable=="1")
		 {
			friendhtml+="<em title='挑战TA' class='fightreadygo nicebutton' onclick='tohappyfight("+arr[i].uin+")'  /></em>";
		 }
		 else if(arr[i].enable=="2"){	
			 if ((parseInt(arr[i].uin)==parseInt(happyfight.homeuin)))
			 {	 friendhtml+="<em title='你拥有神来拳套' class='fightlucky nicebutton' /></em>";
			 }
			 else
			 {
			 	 friendhtml+="<em title='挑战TA,有额外幸运奖励哦' class='fightlucky nicebutton' onclick='tohappyfight("+arr[i].uin+")'  /></em>";

			 }

		 }
	
		 friendhtml+="</dd></dl></li>"
		 
		 }
		if (num==1)
		{pagehtml="<p><em  title='第一页' onclick='loadfriendlist(HF.Fdata.friendlist,1,1)'><<</em><em  onclick='loadfriendlist(HF.Fdata.friendlist,1,"+propage+")'>上一页</em>"+page+"/"+pages+"<em onclick='loadfriendlist(HF.Fdata.friendlist,1,"+nextpage+")'>下一页</em><em title='最末页' onclick='loadfriendlist(HF.Fdata.friendlist,1,"+pages+")'>>></em></p>";
		  if (pages>1)  
		   {
			  $("#hf_friend").html(pagehtml+"<ul>"+friendhtml+"</ul>"+pagehtml);	 	
		   }
		  else if(maxsize<10)
		  {
			  	friendhtml+="<li style='text-align:center;'><button class='bt_tx4' onclick='QZONE.FP.appInvite(362)'>邀请好友</button></li>";
					  $("#hf_friend").html("<ul>"+friendhtml+"</ul>")

		  }
		  else{$("#hf_friend").html("<ul>"+friendhtml+"</ul>")}
		}
		else if(num==0){
       $("#hf_friendsch").html("<ul>"+friendhtml+"</ul>");
		}
       else if(num==2){
       $("#fight_friend").html("<ul>"+friendhtml+"</ul>");
		}
		fightclickshow();
	}
 //显示帮派成员
 function showfactionfriend(page){
	var arr=HF.Fdata.factionfriend;
		var pages,
		pagesize=17,
		maxsize,
		minsize,
		nextpage,
		propage,
		testhtml="",
	    friendhtml="",
		ismarst=0,
		tempnum=-1,
		fnamelist=["帮众","帮主","副帮主","护法","长老","堂主","精英"],
		pagehtml="";
	for (var k=0;k<arr.length ;k++ )
	{   
		if ((arr[k].pos=="10")||(arr[k].pos=="11"))
		{
			tempnum=tempnum+1;
		}
	    if (parseInt(arr[k].uin)==parseInt(happyfight.homeuin))
	   {
		   ismarst=arr[k].pos;
	   }
	}
    if (tempnum==-1)
    {
		pagesize=15;
	    testhtml='<li><dl class="badbtn"><dt><b class="friendlistgod"></b><img src="http://fightimg.pet.qq.com/img/god_103.jpg"><span class="groudspan"></span></dt><dd><span class="namespan" tips="2级帮派可以选择" >守护神</span><b title="等级1" class="friend_exp"><em>1</em></b></dd></dl></li><li><dl class="badbtn"><dt><b class="friendlistnpc"></b><img src="http://fightimg.pet.qq.com/img/npc02.jpg"><span class="groudspan"></span></dt><dd><span  tips="帮派升级后可以挑战他" class="namespan" >乐斗教主</span><b title="等级40" class="friend_exp"><em>40</em></b></dd></dl></li>'
	
    }
	if(!happyfight.factionpage)
	 {
	   page=page||1;
	 }
	else 
	 {
	  page=page||happyfight.factionpage;
	 }
	 happyfight.factionpage=page;
     pages=(arr.length%pagesize==0)?parseInt(arr.length/pagesize):(parseInt(arr.length/pagesize)+1);
     nextpage=(page==pages)?pages:(page+1);
	 propage=(page>1)?(page-1):1;
     minsize=(page-1)*pagesize;
	 maxsize=page<pages?page*pagesize:arr.length;
		for (var i=minsize;i<maxsize; i++)
		{  
         if (arr[i].pos=="10")
         {
			 friendhtml+="<li><dl><dt><b class='friendlistnpc'></b>";
			 friendhtml+="<img src='"+imgurl+"npcs0"+arr[i].uin+".jpg'  tips='"+arr[i].dec+"' /><span class='groudspan'></span></dt><dd><span class='red namespan'  tips='"+arr[i].tips+"' onclick='HF.setinfo("+arr[i].uin+")'  >"+arr[i].name+"</span><b class='friend_exp' title='等级"+arr[i].level+"'><em>"+arr[i].level+"</em></b>";
             friendhtml+="<em title='挑战"+arr[i].name+"' class='fightreadygo nicebutton' onclick='fightnpc("+arr[i].uin+")' /></em></dd></dl></li>";
         }
		 else if(arr[i].pos=="11"){

			 friendhtml+="<li><dl><dt><b class='friendlistgod'></b>";
			 friendhtml+="<img src='"+imgurl+"god_"+arr[i].uin+".jpg' tips='"+arr[i].dec+"' /><span class='groudspan'></span></dt><dd><span tips='"+arr[i].tips+"'  class='red namespan' onclick='godfood("+arr[i].uin+")'  >"+arr[i].name+"</span><b class='friend_exp' title='等级"+arr[i].level+"'><em>"+arr[i].level+"</em></b>";
             friendhtml+="<em title='供奉守护神' class='godbtn' onclick='godfood("+arr[i].uin+")' /></em></dd></dl></li>";
		 }
		 else{
			  if ((i-tempnum)<4)
		     {
				  friendhtml+="<li><dl><dt><b class='friendlist"+(i-tempnum)+"'></b>"
		     }
			 else{
			   friendhtml+="<li ><dl><dt><b>"+(i-tempnum)+"</b>";
			 }
		 
		 friendhtml+="<img title='TA是"+fnamelist[parseInt(arr[i].pos)]+"' src='"+imgurl+"faction0"+arr[i].pos+".jpg'  /><span class='groudspan'></span></dt><dd><span class='namespan factionname"+arr[i].pos+"' onclick='HF.setinfo("+arr[i].uin+")' title='QQ号："+arr[i].uin+"(截止昨日总贡献度"+arr[i].value+")' >"+arr[i].name+"</span><b class='friend_exp' title='等级"+arr[i].level+"'><em>"+arr[i].level+"</em></b>";

		if ((parseInt(arr[i].uin)==parseInt(happyfight.homeuin))&&arr[i].fight!="2")
		{
		
		}
		 else if (arr[i].fight=="1")
		 {
			friendhtml+="<em title='与TA切磋' class='fightreadygo nicebutton' onclick='facfight("+arr[i].uin+")' /></em>";

		 }
		 else if(arr[i].fight=="2"){	
			 if ((parseInt(arr[i].uin)==parseInt(happyfight.homeuin)))
			 {	 friendhtml+="<em title='你拥有神来拳套' class='fightlucky nicebutton' /></em>"
			 }
			 else
			 {
			 	 friendhtml+="<em title='与TA切磋,有额外幸运奖励哦' class='fightlucky nicebutton' onclick='facfight("+arr[i].uin+")'  /></em>";
		
			 }
		 }	
		 else
		 {	
			friendhtml+="<em title='已经切磋过了' class='fightready' /></em>";
		 }
		 if (parseInt(ismarst)!=0&&parseInt(ismarst)!=6&&(parseInt(arr[i].uin)!=parseInt(happyfight.homeuin)))
		   {
			 if (parseInt(ismarst)<parseInt(arr[i].pos)||parseInt(arr[i].pos)==0)
			 {
				  friendhtml+="<em class='controlbtn' title='对TA操作' onclick='openfactionset("+arr[i].uin+")'></em>";
			 }
			
		   }
            friendhtml+="</dd></dl></li>";
		 }

		pagehtml="<p style='text-align:center'><em class='c_tx4' title='第一页' onclick='showfactionfriend(1)'><<</em><em class='c_tx4' onclick='showfactionfriend("+propage+")'>上一页</em>"+page+"/"+pages+"<em class='c_tx4' onclick='showfactionfriend("+nextpage+")'>下一页</em><em class='c_tx4' title='最末页' onclick='showfactionfriend("+pages+")'>>></em></p>";
		  if (pages>1)  
		   {
			    $("#faction_friend").html(pagehtml+"<ol>"+testhtml+friendhtml+"</ol>"+pagehtml);	 	
		   }
		  else
		  {  
			 $("#faction_friend").html("<ol>"+testhtml+friendhtml+"</ol>")
		  }
		}
      showfriend(3);
	  factionclickshow();
	  HF.showtips();
 }
  //喂养守护神
  function godfood(uin){
	  openwin("http://fight.pet.qq.com/godfood.html?uin="+uin,"500","510",HF.reloadfactionfriend);
 }
 //帮派控制面板
 function openfactionset(uin){
	
   openwin("http://fight.pet.qq.com/mastercontrol.html?uin="+uin,"270","320",HF.reloadfactionfriend);
 }

 function factionclickshow(){
 $("#faction_friend ol li").click(function(){
    $("#faction_friend ol .bg6").removeClass("bg6");
    $(this).addClass("bg6");
 })
 }
 //好友点击移动效果
function fightclickshow(){
 $("#hf_friend ul li").mouseover(function(){
      $(this).addClass("bg2");
     }).click(function(){
    $("#hf_friend ul .bg6").removeClass("bg6");
    $(this).addClass("bg6");
 }).mouseout(function(){
        $("#hf_friend ul .bg2").removeClass("bg2");
    })
 } 


//好友页签显示
 function showfriend(num){
	switch(num){
    case 3:
    $("#hf_friend").hide();
	$("#fight_friend").hide();
    $("#faction_friend").show();
    $(".friend_menu li")[1].className="nowtag";
    $(".friend_menu li")[0].className="";
    break;
    case 2:
    $("#hf_friend").hide();
	$("#faction_friend").hide();
    $("#fight_friend").show();
    $(".friend_menu li")[1].className="nowtag";
    $(".friend_menu li")[0].className="";
    break;
	default:
	loadfriendlist(HF.Fdata.friendlist, 1);
    $("#hf_friend").show();
    $("#fight_friend").hide();
	$("#faction_friend").hide();
    $(".friend_menu li")[1].className="";
    $(".friend_menu li")[0].className="nowtag";
    break;
   }   
  }

  //体力倒计时
function setphysica(){
   var maxhp=80;
   try{
   if (HF.getinfo(happyfight.homeuin).baseinfo.sp==maxhp)
     {	$("#hf_physicaltime").html("体力值已满");
        return false;
     }
	if (happyfight.ptime==0)
	 {clearTimeout(happyfight.phy);
		HF.getinfo(happyfight.homeuin).baseinfo.sp=parseInt(HF.getinfo(happyfight.homeuin).baseinfo.sp)+1;
		if (happyfight.canrun==1)
		{	$("#hf_physicalvalue .red").html(Math.abs(parseInt($("#hf_physicalvalue em").html()))+1);
		}
		happyfight.ptime=(parseInt(HF.getinfo(happyfight.homeuin).baseinfo.vipflag)>0||parseInt(HF.getinfo(happyfight.homeuin).baseinfo.qqvip)>0)?900:1080;
		HF.getinfo(happyfight.homeuin).baseinfo.lefttime=happyfight.ptime;
		setphysica();
	}
	else{
	happyfight.ptime=happyfight.ptime-1;
	$("#hf_physicaltime").html("<em class='c_tx4'>"+parseInt(happyfight.ptime/60)+"分"+happyfight.ptime%60+"秒</em>后恢复1点");
	HF.getinfo(happyfight.homeuin).baseinfo.lefttime=happyfight.ptime;
	clearTimeout(happyfight.phy);
    happyfight.phy=setTimeout(setphysica,1000)
	}
   }catch(e){} 
}
//加载基础资料
 function writeinfo(arr){
     var tsp,
		 infonamehtml,
		 shituuin,
		 shifuhtml="",
		 tudihtml="",
		 temptype,
		 tempmsg,
		 shituwei="可收徒弟",
		 shituwei1="可收徒弟",
		 picid=1,
		 pictips,
		 temptips,
		 fnamelist,
		 picstring;
	 if (parseInt(arr.baseinfo.posnum)==1)
	 {shituwei="20级开启徒弟位";
	  shituwei1="30级开启徒弟位";
	 }
	 else if(parseInt(arr.baseinfo.posnum)==2){
	  shituwei1="30级开启徒弟位";
	 }
     picstring=["乐斗小菜","乐斗新星","乐斗好手","乐斗强者","企鹅大侠","黄金乐斗士","传说乐斗士","传说乐斗士"];
	 picid=parseInt(parseInt(arr.baseinfo.lilian)/10+1);
	 picid=picid>6?7:picid;
	 $("#hf_chenhao").attr("class","chenhao"+picid)
	 if (picid<7)
	 {	 pictips="当前称号："+picstring[picid-1]+"<br />下一称号："+picstring[picid]+"（"+picid*10+"级）";
	 }
	 else{
		 pictips="当前称号："+picstring[picid-1]+"(顶级盛名)";
	 
	 }
     $("#hf_chenhao").attr("tips",pictips);
	 picid=picid>6?6:picid;
	  $("#basic_info dt")[0].innerHTML="<img tips='"+pictips+"' src='"+imgurl+arr.baseinfo.sex+picid+".jpg' />";
 	 switch (parseInt(arr.baseinfo.vipflag))
		 {
		 case 1:
			 infonamehtml="<a target='_blank' href='http://paycenter.qq.com/cgi-bin/showopenservice.cgi?service_type=home'></a><a href='http://pet.qq.com/comm-htdocs/vip/?t=pet' target='_blank'><img src='http://imgcache.qq.com/ac/b.gif' alt='粉钻' class='icon_vip_f1' /></a>";
		 break;
		 case 2:
			 infonamehtml="<a target='_blank' href='http://paycenter.qq.com/cgi-bin/showopenservice.cgi?service_type=home'><img src='http://imgcache.qq.com/ac/b.gif' alt='黄钻' class='icon_vip_yl1' /></a><a href='http://pet.qq.com/comm-htdocs/vip/?t=pet' target='_blank'></a>";
		 break;
		 case 3:
			 infonamehtml="<a target='_blank' href='http://paycenter.qq.com/cgi-bin/showopenservice.cgi?service_type=home'><img src='http://imgcache.qq.com/ac/b.gif' alt='黄钻' class='icon_vip_yl1' /></a><a href='http://pet.qq.com/comm-htdocs/vip/?t=pet' target='_blank'><img src='http://imgcache.qq.com/ac/b.gif' alt='粉钻' class='icon_vip_f1' /></a>";
		 break;
		 default:
			 infonamehtml="";
         break;
		 }
  		infonamehtml="<a target='_blank' href='http://pay.qq.com/qqvip/?aid=VIP.FIGHTPET.ROOT.INDEX.OPEN_FACE'><img src='http://imgcache.qq.com/ac/b.gif' alt='QQ会员联合VIP' class='icon_vip"+arr.baseinfo.qqvip+"' /></a>"+infonamehtml;
		infonamehtml=arr.baseinfo.name+infonamehtml;
     $("#hf_shenlv").html("今日胜率："+arr.baseinfo.percent+"%");
	 $("#hf_lilian").html("等级：<em>"+arr.baseinfo.lilian+"</em>");
	 var templength=(parseInt(arr.baseinfo.exp)-parseInt(arr.baseinfo.beginexp))/(parseInt(arr.baseinfo.exp)-parseInt(arr.baseinfo.beginexp)+parseInt(arr.baseinfo.maxexp));
		 templength=parseInt(templength*139);
	 $("#hf_exp").html("<span style='width:"+templength+"px'></span><div></div><em>"+(parseInt(arr.baseinfo.exp)-parseInt(arr.baseinfo.beginexp))+"/"+(parseInt(arr.baseinfo.exp)-parseInt(arr.baseinfo.beginexp)+parseInt(arr.baseinfo.maxexp))+"</em>");
	 $("#hf_exp").attr("tips","经验值"+(parseInt(arr.baseinfo.exp)-parseInt(arr.baseinfo.beginexp))+"/"+(parseInt(arr.baseinfo.exp)-parseInt(arr.baseinfo.beginexp)+parseInt(arr.baseinfo.maxexp)));
	 $("#hf_lifevalue").html("生命：<strong class='c_tx4'>"+arr.baseinfo.hp+"</strong>");
	 $("#hf_lifevalue").attr("tips","生命值："+arr.baseinfo.basehp+"+<em class='green'>"+(parseInt(arr.baseinfo.hp)-parseInt(arr.baseinfo.basehp))+"</em>");
	 $("#hf_physicalvalue").html("体力：<em class='red'>"+Math.abs(arr.baseinfo.sp)+"</em><em>/80</em>");
	 $("#hf_physicalvalue").attr("tips","会员、黄钻及粉钻用户恢复速度更快");
	  showstep(arr.baseinfo.strong,"hf_strong","<em>力量：</em>");
	 $("#hf_strong").attr("tips","力量："+arr.baseinfo.basestrong+"+<em class='green'>"+(parseInt(arr.baseinfo.strong)-parseInt(arr.baseinfo.basestrong))+"</em>");
	 showstep(arr.baseinfo.minjie,"hf_agile","<em>敏捷：</em>")
	  $("#hf_agile").attr("tips","敏捷："+arr.baseinfo.baseminjie+"+<em class='green'>"+(parseInt(arr.baseinfo.minjie)-parseInt(arr.baseinfo.baseminjie))+"</em>");
	 showstep(arr.baseinfo.speed,"hf_speed","<em>速度：</em>")
	 $("#hf_speed").attr("tips","速度："+arr.baseinfo.basespeed+"+<em class='green'>"+(parseInt(arr.baseinfo.speed)-parseInt(arr.baseinfo.basespeed))+"</em>");
	  happyfight.skill=arr.skill;
	  happyfight.weapon=arr.goods;
	  happyfight.petstatus=arr.status;
	  showstatus();
	  //显示帮派
	  if (arr.baseinfo.factionname)
		  {
		    fnamelist=["帮众","帮主","副帮主","护法","长老","堂主","精英"]
				   $("#hf_faction").html("<em tips='查看"+arr.baseinfo.factionname+"帮派资料' onclick='HF.faction("+arr.baseinfo.factionid+")'>帮派："+arr.baseinfo.factionname+"(<em class='red'>"+fnamelist[parseInt(arr.baseinfo.isboss)]+"</em>)</em>");
			
		  }
      else{
	      	$("#hf_faction").html("<em tips='未加入帮派'>独步江湖中</em>");

	  }

	  //判断是否是自己
	 if(parseInt(arr.uin)==parseInt(happyfight.homeuin))
		 {
		  //存储玩家的帮派。
          happyfight.hasfaction=arr.baseinfo.factionid;
		  parent.fightfaction=arr.baseinfo.factionid;
		  $("#basic_info").attr("class","");
		  $("#hf_menu li:first a").attr("class","vipmenu"+arr.baseinfo.qqvip) 
		  happyfight.canrun=1;
	      if (parseInt(arr.baseinfo.lilian)<5)
	      {
			  $("#newtips").html("(升级可获得武器)");
			  $("#newtips1").html("(升级可获得技能)");

	      }
		 if (happyfight.phy)
	       {clearTimeout(happyfight.phy);
	       }
	     $("#hf_physical").hide();
	      $("#hf_physicaltime").show();
	       happyfight.ptime=arr.baseinfo.lefttime;
	       setphysica();
		   if (arr.baseinfo.marsterevent!="")
		   {
			 QZONE.FP.showMsgbox("你有新的师徒事件，请到企鹅动态查看！",1,2000)
		   }
		   if (arr.baseinfo.update!="")
		   {  
			  openwin("http://fight.pet.qq.com/level.html?data="+escape(arr.baseinfo.update),"378","223",happyfightload);

		   }
		   if (parseInt(arr.baseinfo.giftflag)==1)
		   {$(".pethomelink").html("<button class='bt_tx5 yellow' onclick='getgift("+(parseInt(arr.baseinfo.vipflag)+parseInt(arr.baseinfo.qqvip))+")'>领取每日奖励</button>");
		   }
		   else{$(".pethomelink").html("<button class='bt_tx5 badbtn' disabled='disabled'>领取每日奖励</button>")}		   
	       $(".elseinfo").html("<p></p><p><button class='bt_tx5' onclick='fightwood()'>打木头人</button></p>");
		    if (arr.shifu.uin)
			 {  
			   shifuhtml="<dl class='bor'><dt><img src='"+imgurl+arr.shifu.sex+parseInt(parseInt(arr.shifu.level)/10)+".jpg' alt='' /></dt><dd class='buttondd'><input type='button' class='stfight stfight"+HF.friend(arr.shifu.uin).enable+"' tips='与师傅乐斗' onclick='tohappyfight("+arr.shifu.uin+")'/><input type='button' class='stgift' tips='送TA礼物' onclick='fightbuy(3001,4,"+arr.shifu.uin+")' /><input type='button' class='stfree' tips='还我自由' onclick='tobefree("+arr.shifu.uin+",2)' /></dd><dd>"+arr.shifu.name+"<br />等级："+arr.shifu.level+"</dd></dl>"
			 }
			 else{
			 shifuhtml="<dl class='bor nobody'><dt></dt><dd class='infodate'><b tips='暂时没有师傅'>暂时没有师傅</b></dd><dd class='shoutu'></dd></dl>"
			 }
             
	  switch (arr.tudi.length)
            {
             case 0:
				 tudihtml="<dl class='bor nobody'><dt></dt><dd class='infodate'><b>徒弟位</b></dd></dl><dl class='bor nobody'><dt></dt><dd class='infodate'><b>"+shituwei+"</b></dd></dl><dl class='bor nobody'><dt></dt><dd class='infodate'><b>"+shituwei1+"</b></dd></dl><h5>你还没有徒弟，快去好友里抢一个吧。</h5>"
				 break;
             case 1:			
				 if (parseInt(arr.tudi[0].flag)==1)
				 {	 if (parseInt(arr.tudi[0].marsterlevel)>0)
				    {
			         happyfight.tempmsg="要收"+arr.tudi[0].name+"为徒，首先要打败TA的师傅"+arr.tudi[0].marstername+"(等级："+arr.tudi[0].marsterlevel+")，要跟TA师傅较量一下吗？";
					 tudihtml="<dl class='bor'><dd>我们为你推荐了</dd><dt class='smalldt bor' onclick='HF.setinfo("+arr.tudi[0].uin+")'></dt><dd tips='等级："+arr.tudi[0].level+"'><span>"+arr.tudi[0].name+"(等级："+arr.tudi[0].level+")</span><br /><button class='bt_tx6' onclick='tohappyfight("+arr.tudi[0].uin+",3)'>抢TA为徒弟吧</button></dd></dl><dl class='bor nobody'><dt></dt><dd class='infodate'><b>"+shituwei+"</b></dd></dl><dl class='bor nobody'><dt></dt><dd class='infodate'><b>"+shituwei1+"</b></dd></dl><h5>你还没有徒弟。</h5>"

					}
					else{
						tudihtml="<dl class='bor'><dd>我们为你推荐了</dd><dt class='smalldt bor' onclick='HF.setinfo("+arr.tudi[0].uin+")'></dt><dd tips='等级："+arr.tudi[0].level+"'><span>"+arr.tudi[0].name+"(等级："+arr.tudi[0].level+")</span><br /><button class='bt_tx6' onclick='tohappyfight("+arr.tudi[0].uin+",1)'>收TA为徒弟吧</button></dd></dl><dl class='bor nobody'><dt></dt><dd class='infodate'><b>"+shituwei+"</b></dd></dl><dl class='bor nobody'><dt></dt><dd class='infodate'><b>"+shituwei1+"</b></dd></dl><h5>你还没有徒弟。</h5>"

					}
				 }
				 else{
				 tudihtml="<dl class='bor'><dt onclick='HF.setinfo("+arr.tudi[0].uin+")'></dt><dd class='buttondd'><input type='button' class='stfight stfight"+HF.friend(arr.tudi[0].uin).enable+"' tips='与徒弟乐斗' onclick='tohappyfight("+arr.tudi[0].uin+")'/><input type='button' class='stgift' tips='送TA礼物' onclick='fightbuy(3001,4,"+arr.tudi[0].uin+")' /><input type='button' class='stinfo' tips='逐出师门' onclick='shituout("+arr.tudi[0].uin+")' /></dd><dd>"+arr.tudi[0].name+"<br />等级："+arr.tudi[0].level+"</dd></dl>";
				 tudihtml=tudihtml+"<dl class='bor nobody'><dt></dt><dd class='infodate'><b>"+shituwei+"</b></dd></dl><dl class='bor nobody'><dt></dt><dd class='infodate'><b>"+shituwei1+"</b></dd></dl>";
	
				   if (parseInt(arr.tudi[0].get)>0)
				    {  
					   if (parseInt(arr.baseinfo.expflag)==1)
					   {			 tudihtml=tudihtml+" <p class='get_exp'>徒弟修炼经验：(徒弟昨日修炼所贡献经验)<button class='bt_tx5 stgetexp yellow' onclick='getshituexp()'>领取经验</button></p><p id='st_exp' tips='"+arr.tudi[0].name+"贡献经验："+arr.tudi[0].get+"'><span style='width:"+parseInt((parseInt(arr.tudi[0].get))/100*173)+"px;'></span><em>"+arr.tudi[0].get+"/100</em></p>";
					   }
					   else{
					     		   tudihtml=tudihtml+" <p class='get_exp'>徒弟修炼经验：(徒弟昨日修炼所贡献经验)<button class='bt_tx5 stgetexp badbtn' title='已经领过了' disabled='disabled'>领取经验</button></p><p id='st_exp' tips='"+arr.tudi[0].name+"贡献经验："+arr.tudi[0].get+"' ><span style='width:"+parseInt((parseInt(arr.tudi[0].get))/100*173)+"px;'></span><em >"+arr.tudi[0].get+"/100</em></p>";

					   }
				    }
                 }
				 break;
             case 2:
	             tudihtml="<dl class='bor'><dt onclick='HF.setinfo("+arr.tudi[0].uin+")'></dt><dd class='buttondd'><input type='button' class='stfight stfight"+HF.friend(arr.tudi[0].uin).enable+"' tips='与徒弟乐斗' onclick='tohappyfight("+arr.tudi[0].uin+")'/><input type='button' class='stgift' tips='送TA礼物' onclick='fightbuy(3001,4,"+arr.tudi[0].uin+")' /><input type='button' class='stinfo' tips='逐出师门' onclick='shituout("+arr.tudi[0].uin+")' /></dd><dd>"+arr.tudi[0].name+"<br />等级："+arr.tudi[0].level+"</dd></dl>";
	              
				  if (parseInt(arr.tudi[1].flag)==1)
				 {	 if (parseInt(arr.tudi[1].marsterlevel)>0)
				    {
			         happyfight.tempmsg="要收"+arr.tudi[1].name+"为徒，首先要打败TA的师傅"+arr.tudi[1].marstername+"(等级："+arr.tudi[1].marsterlevel+")，要跟TA师傅较量一下吗？";
					 tudihtml+="<dl class='bor'><dd>我们为你推荐了</dd><dt class='smalldt bor' onclick='HF.setinfo("+arr.tudi[1].uin+")'></dt><dd tips='等级："+arr.tudi[1].level+"'><span>"+arr.tudi[1].name+"(等级："+arr.tudi[1].level+")</span><br /><button class='bt_tx6' onclick='tohappyfight("+arr.tudi[1].uin+",3)'>抢TA为徒弟吧</button></dd></dl>";

					}
					else{
						tudihtml+="<dl class='bor'><dd>我们为你推荐了</dd><dt class='smalldt bor' onclick='HF.setinfo("+arr.tudi[1].uin+")'></dt><dd tips='等级："+arr.tudi[1].level+"'><span>"+arr.tudi[1].name+"(等级："+arr.tudi[1].level+")</span><br /><button class='bt_tx6' onclick='tohappyfight("+arr.tudi[1].uin+",1)'>收TA为徒弟吧</button></dd></dl>";
					}
					temptips=arr.tudi[0].name+"修炼经验："+arr.tudi[0].get;
				 }
				 else{
				  temptips=arr.tudi[0].name+"修炼经验："+arr.tudi[0].get+"<br />"+arr.tudi[1].name+"修炼经验："+arr.tudi[1].get;
				 tudihtml+="<dl class='bor'><dt onclick='HF.setinfo("+arr.tudi[1].uin+")'></dt><dd class='buttondd'><input type='button' class='stfight stfight"+HF.friend(arr.tudi[1].uin).enable+"' tips='与徒弟乐斗' onclick='tohappyfight("+arr.tudi[1].uin+")'/><input type='button' class='stgift' tips='送TA礼物' onclick='fightbuy(3001,4,"+arr.tudi[1].uin+")' /><input type='button' class='stinfo' tips='逐出师门' onclick='shituout("+arr.tudi[1].uin+")' /></dd><dd>"+arr.tudi[1].name+"<br />等级："+arr.tudi[1].level+"</dd></dl>";
			     }
			  
				   tudihtml=tudihtml+"<dl class='bor nobody'><dt></dt><dd class='infodate'><b>"+shituwei1+"</b></dd></dl>";
					var getexp=parseInt(arr.tudi[0].get)+parseInt(arr.tudi[1].get);
					var  getexp1=parseInt((getexp/200)*173);
                    if (parseInt(arr.baseinfo.expflag)==1)
					   {			 tudihtml=tudihtml+"<p class='get_exp'>徒弟修炼经验：(徒弟昨日修炼所贡献经验)<button class='bt_tx5 stgetexp yellow' onclick='getshituexp()'>领取经验</button></p><p id='st_exp' tips='"+temptips+"' ><span style='width:"+getexp1+"px;'></span><em>"+getexp+"/200</em></p>";
                       }
					   else{
					     		   	tudihtml=tudihtml+"<p class='get_exp'>徒弟修炼经验：(徒弟昨日修炼所贡献经验)<button class='bt_tx5 stgetexp badbtn' title='已经领过了' disabled='disabled'>领取经验</button></p><p id='st_exp' tips='"+temptips+"' ><span style='width:"+getexp1+"px;'></span><em>"+getexp+"/200</em></p>";

					   }		 
	
				break;
				case 3:
	             tudihtml="<dl class='bor'><dt onclick='HF.setinfo("+arr.tudi[0].uin+")'></dt><dd class='buttondd'><input type='button' class='stfight stfight"+HF.friend(arr.tudi[0].uin).enable+"' tips='与徒弟乐斗' onclick='tohappyfight("+arr.tudi[0].uin+")'/><input type='button' class='stgift' tips='送TA礼物' onclick='fightbuy(3001,4,"+arr.tudi[0].uin+")' /><input type='button' class='stinfo' tips='逐出师门' onclick='shituout("+arr.tudi[0].uin+")' /></dd><dd>"+arr.tudi[0].name+"<br />等级："+arr.tudi[0].level+"</dd></dl>";
	             tudihtml=tudihtml+"<dl class='bor'><dt onclick='HF.setinfo("+arr.tudi[1].uin+")'></dt><dd class='buttondd'><input type='button' class='stfight stfight"+HF.friend(arr.tudi[1].uin).enable+"' tips='与徒弟乐斗' onclick='tohappyfight("+arr.tudi[1].uin+")'/><input type='button' class='stgift' tips='送TA礼物' onclick='fightbuy(3001,4,"+arr.tudi[1].uin+")' /><input type='button' class='stinfo' tips='逐出师门' onclick='shituout("+arr.tudi[1].uin+")' /></dd><dd>"+arr.tudi[1].name+"<br />等级："+arr.tudi[1].level+"</dd></dl>";
                if (parseInt(arr.tudi[2].flag)==1)
				 {	 if (parseInt(arr.tudi[2].marsterlevel)>0)
				    {
			         happyfight.tempmsg="要收"+arr.tudi[2].name+"为徒，首先要打败TA的师傅"+arr.tudi[2].marstername+"(等级："+arr.tudi[2].marsterlevel+")，要跟TA师傅较量一下吗？";
					 tudihtml+="<dl class='bor'><dd>我们为你推荐了</dd><dt class='smalldt bor' onclick='HF.setinfo("+arr.tudi[2].uin+")'></dt><dd tips='等级："+arr.tudi[2].level+"'><span>"+arr.tudi[2].name+"(等级："+arr.tudi[2].level+")</span><br /><button class='bt_tx6' onclick='tohappyfight("+arr.tudi[2].uin+",3)'>抢TA为徒弟吧</button></dd></dl>";
              
					}
					else{
						tudihtml+="<dl class='bor'><dd>我们为你推荐了</dd><dt class='smalldt bor' onclick='HF.setinfo("+arr.tudi[2].uin+")'></dt><dd tips='等级："+arr.tudi[2].level+"'><span>"+arr.tudi[2].name+"(等级："+arr.tudi[2].level+")</span><br /><button class='bt_tx6' onclick='tohappyfight("+arr.tudi[2].uin+",1)'>收TA为徒弟吧</button></dd></dl>";
					}
					temptips=arr.tudi[0].name+"修炼经验："+arr.tudi[0].get+"<br />"+arr.tudi[1].name+"修炼经验："+arr.tudi[1].get;
				 }
				 else{
				 tudihtml+="<dl class='bor'><dt onclick='HF.setinfo("+arr.tudi[2].uin+")'></dt><dd class='buttondd'><input type='button' class='stfight stfight"+HF.friend(arr.tudi[2].uin).enable+"' tips='与徒弟乐斗' onclick='tohappyfight("+arr.tudi[2].uin+")'/><input type='button' class='stgift' tips='送TA礼物' onclick='fightbuy(3001,4,"+arr.tudi[2].uin+")' /><input type='button' class='stinfo' tips='逐出师门' onclick='shituout("+arr.tudi[2].uin+")' /></dd><dd>"+arr.tudi[2].name+"<br />等级："+arr.tudi[2].level+"</dd></dl>";
				 temptips=arr.tudi[0].name+"修炼经验："+arr.tudi[0].get+"<br />"+arr.tudi[1].name+"修炼经验："+arr.tudi[1].get+"<br />"+arr.tudi[2].name+"修炼经验："+arr.tudi[2].get;

				 } 
		
				
					var getexp=parseInt(arr.tudi[0].get)+parseInt(arr.tudi[1].get)+parseInt(arr.tudi[2].get);
					var  getexp1=parseInt((getexp/300)*173);
                    if (parseInt(arr.baseinfo.expflag)==1)
					   {			 tudihtml=tudihtml+"<p class='get_exp'>徒弟修炼经验：(徒弟昨日修炼所贡献经验)<button class='bt_tx5 stgetexp yellow' onclick='getshituexp()'>领取经验</button></p><p id='st_exp' tips='"+temptips+"' ><span style='width:"+getexp1+"px;'></span><em>"+getexp+"/300</em></p>";
                       }
					   else{
					     		   	tudihtml=tudihtml+"<p class='get_exp'>徒弟修炼经验：(徒弟昨日修炼所贡献经验)<button class='bt_tx5 stgetexp badbtn' title='已经领过了' disabled='disabled'>领取经验</button></p><p id='st_exp' tips='"+temptips+"'><span style='width:"+getexp1+"px;'></span><em>"+getexp+"/300</em></p>";

					   }		 
				break;
             default:
				 break;
             }
		 
	    }
   else{
	   $("#basic_info").attr("class","bg3");
	   $("#hf_physical").show();
			 $("#hf_physicaltime").hide();
			 if (arr.shifu.uin)
			 {shituuin=parseInt(arr.shifu.uin);
			   temptype=3;
			   happyfight.tempmsg="要收"+arr.baseinfo.name+"为徒，首先要打败TA的师傅"+arr.shifu.name+"(等级："+arr.shifu.level+")，要跟TA师傅较量一下吗？"
			   shituuin=parseInt(arr.shifu.uin);
			   shifuhtml="<dl class='bor'><dt></dt><dd class='buttondd'><input type='button' class='stfight badbtn' disabled='disabled' /><input type='button' class='stgift badbtn' disabled='disabled' /><input type='button' class='stfree badbtn' disabled='disabled' /></dd><dd>"+arr.shifu.name+"<br />等级："+arr.shifu.level+"</dd></dl>"
			 }
			 else{
			 temptype=1;
			 tempmsg=1;
			 shifuhtml="<dl class='bor nobody'><dt></dt><dd><b class='c_tx4'>TA还没有师傅</b></dd><dd class='shoutu'><button class='bt_tx6' onclick='tohappyfight("+arr.uin+",1)'>做TA师傅吧</button></dd></dl>"
			 shituuin=parseInt(arr.uin);
			 }
             
             switch (arr.tudi.length)
             {
             case 0:
				 tudihtml="<dl class='bor nobody'><dt></dt><dd class='infodate'>TA还没有徒弟</dd></dl><dl class='bor nobody'><dt></dt><dd class='infodate'><b>"+shituwei+"</b></dd></dl><dl class='bor nobody'><dt></dt><dd class='infodate'><b>"+shituwei1+"</b></dd></dl>"
				 break;
             case 1:
				 tudihtml="<dl class='bor'><dt></dt><dd class='buttondd'><input type='button' class='stfight badbtn' disabled='disabled' /><input type='button' class='stgift badbtn' disabled='disabled' /><input type='button' class='stinfo badbtn' disabled='disabled' /></dd><dd>"+arr.tudi[0].name+"<br />等级："+arr.tudi[0].level+"</dd></dl><dl class='bor nobody'><dt></dt><dd class='infodate'><b>"+shituwei+"</b></dd></dl><dl class='bor nobody'><dt></dt><dd class='infodate'><b>"+shituwei1+"</b></dd></dl>"
                 break;
             case 2:
				 tudihtml="<dl class='bor'><dt></dt><dd class='buttondd'><input type='button' class='stfight badbtn' disabled='disabled' /><input type='button' class='stgift badbtn' disabled='disabled' /><input type='button' class='stinfo badbtn' disabled='disabled' /></dd><dd>"+arr.tudi[0].name+"<br />等级："+arr.tudi[0].level+"</dd></dl><dl class='bor'><dt><img src='"+imgurl+arr.tudi[1].sex+parseInt(parseInt(arr.tudi[1].level)/10)+".jpg' alt='' /></dt><dd class='buttondd'><input type='button' class='stfight badbtn' /><input type='button' class='stgift badbtn' /><input type='button' class='stinfo badbtn' /></dd><dd>"+arr.tudi[1].name+"<br />等级："+arr.tudi[1].level+"</dd></dl><dl class='bor nobody'><dt></dt><dd class='infodate'><b>"+shituwei1+"</b></dd></dl>"
                 break;
             case 3:	 
				 tudihtml="<dl class='bor'><dt></dt><dd class='buttondd'><input type='button' class='stfight badbtn' disabled='disabled' /><input type='button' class='stgift badbtn' disabled='disabled' /><input type='button' class='stinfo badbtn' disabled='disabled' /></dd><dd>"+arr.tudi[0].name+"<br />等级："+arr.tudi[0].level+"</dd></dl>";
			     tudihtml=tudihtml+"<dl class='bor'><dt><img src='"+imgurl+arr.tudi[1].sex+parseInt(parseInt(arr.tudi[1].level)/10)+".jpg' alt='' /></dt><dd class='buttondd'><input type='button' class='stfight badbtn' /><input type='button' class='stgift badbtn' /><input type='button' class='stinfo badbtn' /></dd><dd>"+arr.tudi[1].name+"<br />等级："+arr.tudi[1].level+"</dd></dl>";
			     tudihtml=tudihtml+"<dl class='bor'><dt><img src='"+imgurl+arr.tudi[1].sex+parseInt(parseInt(arr.tudi[2].level)/10)+".jpg' alt='' /></dt><dd class='buttondd'><input type='button' class='stfight badbtn' /><input type='button' class='stgift badbtn' /><input type='button' class='stinfo badbtn' /></dd><dd>"+arr.tudi[2].name+"<br />等级："+arr.tudi[2].level+"</dd></dl>";
				 break;
             default:
				 break;
             }
			 
			 happyfight.canrun=0;
			 if (parseInt(arr.baseinfo.sp)==80)
			 {   $("#hf_physical").html("体力值已满")
			 }
			 else{   
				 $("#hf_physical").html("体力恢复中")
              }
           $(".pethomelink").html("<button class='bt_tx5 yellow' onclick='HF.setinfo("+happyfight.homeuin+")'>我的乐斗资料</button>")
			   if (parseInt(arr.uin)<1000)
			   {
			   $(".elseinfo").html("<p><button class='bt_tx5' onclick='fightnpc("+arr.uin+")'>挑战TA</button></p>");
			   }
			   else if (!HF.friend(arr.uin)){
			     	$(".elseinfo").html("<p><button class='bt_tx5' onclick='tohappyfight("+arr.uin+",5)'>挑战TA</button></p>");

			   }
			   else{
			     	 $(".elseinfo").html("<p><button class='bt_tx5' onclick='tohappyfight("+arr.uin+")'>挑战TA</button></p>");
			   }
		   if(shituuin!=parseInt(happyfight.homeuin)){
		    $(".elseinfo").html($(".elseinfo").html()+"<p><button class='bt_tx5' onclick='tohappyfight("+arr.uin+","+temptype+")'>抢TA为徒弟</button></p>")
		   }
		}
       $("#tudi div").html(tudihtml);
       $("#shifu div").html(shifuhtml);
	 try{  showinfopic(arr.uin); 
	   if (happyfight.friendready){	   
		   infonamehtml=arr.baseinfo.name+"<a target='_blank' href='http://pay.qq.com/qqvip/?aid=VIP.FIGHTPET.ROOT.INDEX.OPEN_FACE'><img src='http://imgcache.qq.com/ac/b.gif' alt='QQ会员联合VIP' class='icon_vip"+arr.baseinfo.qqvip+"' /></a><a target='_blank' href='http://user.qzone.qq.com/"+arr.uin+"/yellowgrade/'><img src='http://imgcache.qq.com/ac/b.gif' alt='黄钻' class='icon_vip_yl"+HF.friend(arr.uin).yflag+"' /></a><a href='http://pet.qq.com/comm-htdocs/vip/?t=pet' target='_blank'><img src='http://imgcache.qq.com/ac/b.gif' alt='粉钻' class='icon_vip_f"+HF.friend(arr.uin).flag+"' /></a>"   
		 if(HF.friend(arr.uin).lilian!=arr.baseinfo.lilian)
	      {HF.friend(arr.uin).lilian=arr.baseinfo.lilian;  
          (HF.Fdata.friendlist).sort(function(a,b){return b.lilian-a.lilian;});
	      parent.fightfriend=HF.Fdata.friendlist;
          HF.getfriendlist();
	      }
		 }
	  if(happyfight.loadweaponswf==1||getSwfInstance("weaponlayer")) {
	   getSwfInstance("weaponlayer").setWeaponData(happyfight.weapon)}
	  if(happyfight.loadskillswf==1||getSwfInstance("skillplayer")){ 
	   getSwfInstance("skillplayer").setSkillData(happyfight.skill)} 
	  
	
	 }catch(e){}
        $("#st_exp").attr("class","getexp"+arr.baseinfo.expflag);
		if (arr.baseinfo.expflag=="0")
		{		$("#st_exp em").html($("#st_exp em").html()+"(已领取)")

		}
	 $("#nickname").html(infonamehtml);
	 if (parseInt(arr.uin)<1000)
	 {  
		 $("#basic_info dt")[0].innerHTML="<img src='"+imgurl+"npc0"+arr.uin+".jpg' width='115' tips='战胜"+arr.baseinfo.name+"1次获得1点好感度，好感度到达一定数值，"+arr.baseinfo.name+"将传授您所在帮派技能'/>";
		 $("#hf_faction").html("");
		 $("#hf_chenhao").attr("tips","");
		 $("#hf_exp").attr("tips","0/0");
		 $("#nickname").html(arr.baseinfo.name+"<em tips='战胜"+arr.baseinfo.name+"1次获得1点好感度，好感度到达一定数值，"+arr.baseinfo.name+"将传授您所在帮派技能'>（好感度："+arr.baseinfo.percent+"）</em>"); 
		 $("#hf_shenlv").html("")
		 $("#hf_exp em").html("0/0");
		  $(".elseinfo p")[1].innerHTML="";

		 // $(".elseinfo .bt_tx5").attr("onclick","fightnpc("+arr.uin+")")
		 $("#shitu").hide();
	 }
	 else{
		  $("#shitu").show();
	 }
     showflag(arr.uin);
	 $(".stfightundefined").attr("onclick","");
	 $(".stfightundefined").attr("tips","暂时不能与他乐斗");
	         //vip奖励。
		if (arr.baseinfo.vipinfo!="")
		{
          parent.HFvipinfo=arr.baseinfo.vipinfo;
		  getvipgift();
		}
   HF.showtips();
 }

//显示状态
 function showstatus(){
    var status="";
	  $("#zhudongexp").attr("tips","主动乐斗获得经验值额外增加6点<em class='red'>（未点亮）</em>");
	  $("#beidongexp").attr("tips","被动乐斗获得经验值额外增加4点,被动经验上限+100<em class='red'>（未点亮）</em>"); 
	  $("#luckyquantao").attr("tips","当你被挑战时，双方有一定几率获得额外的奖励。被动经验上限+100<em class='red'>（未点亮）</em>");
      $("#gongxian").attr("tips","主动乐斗所获得的贡献度增加1倍<em class='red'>（未点亮）</em>")
	   $("#daliwan").attr("tips","增加40%的力量值（最少增加5点力量值）<em class='red'>（未点亮）</em>");
	  $("#xunjie").attr("tips","增加40%的敏捷值（最少增加5点敏捷值）<em class='red'>（未点亮）</em>"); 
	  $("#fengxi").attr("tips","增加40%的速度值（最少增加5点速度值）<em class='red'>（未点亮）</em>");
	    $("#zhudongexp").attr("class","");
	  $("#beidongexp").attr("class",""); 
	  $("#luckyquantao").attr("class","");
      $("#gongxian").attr("class","")
	   $("#daliwan").attr("class","");
	  $("#xunjie").attr("class",""); 
	  $("#fengxi").attr("class","");
	for (var j=0;j<happyfight.petstatus.length ;j++ )
	{
		
        if (parseInt(happyfight.petstatus[j].id)==6)
		  {
            $("#zhudongexp").attr("class","hasgray");
		   $("#zhudongexp").attr("tips",happyfight.petstatus[j].desc);

		  }
		  else if(parseInt(happyfight.petstatus[j].id)==15){
		    $("#beidongexp").attr("class","hasgray");
			 $("#beidongexp").attr("tips",happyfight.petstatus[j].desc);
		  }
		   else if(parseInt(happyfight.petstatus[j].id)==5){
		    $("#luckyquantao").attr("class","hasgray");
			 $("#luckyquantao").attr("tips",happyfight.petstatus[j].desc);
		  }
		  else if(parseInt(happyfight.petstatus[j].id)==12){
		    $("#daliwan").attr("class","hasgray");
			 $("#daliwan").attr("tips",happyfight.petstatus[j].desc);
		  }
		   else if(parseInt(happyfight.petstatus[j].id)==13){
		    $("#xunjie").attr("class","hasgray");
			 $("#xunjie").attr("tips",happyfight.petstatus[j].desc);
		  }
		    else if(parseInt(happyfight.petstatus[j].id)==14){
		    $("#fengxi").attr("class","hasgray");
			 $("#fengxi").attr("tips",happyfight.petstatus[j].desc);
		  }
		    else if (parseInt(happyfight.petstatus[j].id)==1)
		  {
            $("#gongxian").attr("class","hasgray");
		   $("#gongxian").attr("tips",happyfight.petstatus[j].desc);

		  }
		  else{
		  	status+="<li><img tips='<b>"+happyfight.petstatus[j].name+"</b>"+happyfight.petstatus[j].desc+"' src='"+imgurl+happyfight.petstatus[j].pic+".png' /></li>";
		  }

	}
	 status="<ul>"+status+"</ul>"
	 $("#hf_info_state").html(status);
 }

//显示师徒头像
 function showinfopic(uin){	
	 if (HF.getinfo(uin).tudi)
	 {
		 for (var i=0; i<HF.getinfo(uin).tudi.length; i++)
		 {
			 if (HF.friend(HF.getinfo(uin).tudi[i].uin))
		     {   
				 if (HF.friend(HF.getinfo(uin).tudi[i].uin).facepic=="http://imgcache.qq.com/qzone_v4/client/userinfo_icon/5001.gif")
				 {HF.friend(HF.getinfo(uin).tudi[i].uin).facepic="http://fightimg.pet.qq.com/img/face_03.jpg";
				 }
				 $("#tudi dt")[i].innerHTML="<img tips='QQ:"+HF.getinfo(uin).tudi[i].uin+"' src='"+HF.friend(HF.getinfo(uin).tudi[i].uin).facepic+"' />";
		     }
		    else
			 {
			    $("#tudi dt")[i].innerHTML="<img src='http://fightimg.pet.qq.com/img/face_03.jpg' tips='QQ:"+HF.getinfo(uin).tudi[i].uin+"' />";
		     }
		 }
	 }
	 if (HF.getinfo(uin).shifu.uin)
	 {	
		  if (HF.friend(HF.getinfo(uin).shifu.uin))
		  {   
			  if (HF.friend(HF.getinfo(uin).shifu.uin).facepic=="http://imgcache.qq.com/qzone_v4/client/userinfo_icon/5001.gif")
				 {HF.friend(HF.getinfo(uin).shifu.uin).facepic="http://fightimg.pet.qq.com/img/1024.jpg";
				 }
			  $("#shifu dt")[0].innerHTML="<img tips='QQ:"+HF.getinfo(uin).shifu.uin+"' src='"+HF.friend(HF.getinfo(uin).shifu.uin).facepic+"' />";
		  }
		   else
		  {
			   $("#shifu dt")[0].innerHTML="<img tips='QQ:"+HF.getinfo(uin).shifu.uin+"' src='http://fightimg.pet.qq.com/img/1024.jpg' />";
		  }
	 }	
 }
 //显示昵称粉黄钻
 function showflag(uin){
	 if (happyfight.flagready==1) 
	   {
		 if (HF.friend(uin).yflag)
	    {	 
		 $("#nickname a")[1].innerHTML="<img src='http://imgcache.qq.com/ac/b.gif' alt='黄钻' class='icon_vip_yl"+HF.friend(uin).yflag+"' />";
	    }
		showinfopic(uin);	
	
	 }
	 else {
	 happyfight.loadflaguin=uin;
	 }
 }

  //显示属性值
  function showstep(value,divid,string){
	var tempvalue,testdate;
      value=parseInt(value); 
   testdate=value%10==0?10:value%10;
   tempvalue=value%10==0?(value-10):value;
   tempvalue=parseInt(value/10);
     if (tempvalue>9)
     {tempvalue=9;
	  testdate=10;
	  value=99;
     }
	 else{
       if (value%10!=0)
       {   tempvalue=tempvalue+1;
       }
	
	 }
      string+="<b class='stepbg"+tempvalue+"'>"+value+"</b>";
     $("#"+divid).attr("class","stepcolor"+tempvalue);
     $("#"+divid).html(string+"<div><span class='step"+testdate+"'></span></div>");

 }



 //显示包裹
	function showbag(page){
      var desc,pagesize=9,nothinghtml,pagenum=page||0,page1,page2;
	   var minnum=pagesize*pagenum;
	     happyfight.loadbag_html="";
		 var maxnum=HF.Fdata.shopbag.bag.length<pagesize*(pagenum+1)?HF.Fdata.shopbag.bag.length:pagesize*(pagenum+1);
	   for(var i=pagesize*pagenum;i<maxnum;i++)
		{ 	        
                   happyfight.loadbag_html+="<dl ><dt><img src='"+imgurl+HF.Fdata.shopbag.bag[i].id+".png'  tips='<b>"+HF.Fdata.shopbag.bag[i].name+"</b>"+HF.Fdata.shopbag.bag[i].desc+"' /></dt>";
	               happyfight.loadbag_html+="<dd class='shopname'>"+HF.Fdata.shopbag.bag[i].name+"</dd>";
				   HF.Fdata.shopbag.bag[i].desc=HF.Fdata.shopbag.bag[i].desc.replace("&lt;br&gt;","");
		           happyfight.loadbag_html+="<dd class='shopinfo'>"+HF.Fdata.shopbag.bag[i].desc+"</dd>";
		           happyfight.loadbag_html+="<dd class='shopprice'>数量："+HF.Fdata.shopbag.bag[i].num+"</dd>";
				   if (parseInt(HF.Fdata.shopbag.bag[i].id)==3036||parseInt(HF.Fdata.shopbag.bag[i].id)==3040)
				   {	             
					   happyfight.loadbag_html+="<dd class='shopbutton'><input type='button' value='使用' class='badbtn' disabled='disabled'  /></dd></dl>"; 
				   }
				   else{
	               happyfight.loadbag_html+="<dd class='shopbutton'><input type='button' value='使用' ret="+HF.Fdata.shopbag.bag[i].name+" onclick='fightuse("+HF.Fdata.shopbag.bag[i].id+","+page+")' /></dd></dl>"; 
                   }
		}
		  if ((happyfight.loadbag_html=="")&&page>0)
		  {return showbag(page-1);
		  }
		  nothinghtml="你还没有任何物品，去商店买一些吧。<br /><h5><img src='"+imgurl+"tili.png' onclick='fightbuy(3003,1)' /><img src='"+imgurl+"jinyan.png' onclick='fightbuy(3019,1)' /></h5>"
		  happyfight.loadbag_html=(happyfight.loadbag_html!="")?happyfight.loadbag_html:nothinghtml;
		  happyfight.loadbag_html="<div id='shop_content'>"+happyfight.loadbag_html+"</div>" 
		  var pagehtml="", maxpage=Math.ceil(HF.Fdata.shopbag.bag.length/pagesize);
		  if (maxpage>1)
		  {
		    for (var k=0;k<maxpage;k++ )
		    { if (k==pagenum)
		       { pagehtml+="<span class='activepage'>"+(k+1)+"</span>"
		       }
			   else
			   pagehtml+="<span onclick='showbag("+k+")'>"+(k+1)+"</span>";
		     }
			 page1=(page-1)<1?0:(page-1);
			 page2=(page+1)>maxpage?(maxpage-1):(page+1);
			 pagehtml="<p class='shoppage'><span onclick='showbag("+page1+")'>上一页</span>"+pagehtml+"<span onclick='showbag("+page2+")'>下一页</span></p>"
		   }
		   if (pagehtml!="")
		   {
            happyfight.loadbag_html=pagehtml+happyfight.loadbag_html+pagehtml
		   }
    $("#hfshop_bag").html(happyfight.loadbag_html);
   	HF.showtips();
 }

 //使用物品
 function fightuse(id,page,obj){
	   var canuse=1;
	   var goodname=getmybag(id).name;
	   var goodinfo=getmybag(id).desc.replace("该药水每天只能使用5次。","");
	    goodinfo=goodinfo.replace("，持续5次乐斗。每天只能使用大力丸、迅捷珠、风之息共计6次。","");
	    goodinfo=goodinfo.replace("每天只能使用大力丸（赠）、迅捷珠（赠）、风之息（赠）共计6次。","");
      	if (id==3023||id==3024||id==3025)
		{  canuse=0;
			if (confirm("使用洗刷刷道具会洗掉一点原有属性值，你确定要继续吗？"))
		  {canuse=1;
           goodinfo="你使用了洗刷刷道具，请到企鹅动态查看洗点结果。"
		  }	
		}
		if (id==3037)
		{
			if (parseInt(HF.getinfo(happyfight.homeuin).baseinfo.lilian)>35)
			{
                QZONE.FP.showMsgbox("你的等级高于35级，无法使用孟婆汤",1,2000);
			}
			else if (confirm("喝了它，你会忘记你的过去，你的等级会变为1，你的技能和武器（包括神器）将全部消失，你将忘记你的师傅，失去你所有的徒弟，你确认要喝它吗？")){
		     useagain();
			}

		}
		else if (canuse)
		{    
	     $.get("http://fight.pet.qq.com/cgi-bin/petpk?cmd=use&selfuin="+happyfight.homeuin+"&id="+id,function(data){
			data=eval("("+data+")");
		if (data.result=="0")
         {  QZONE.FP.showMsgbox("使用"+goodname+","+goodinfo,1,2000);
			HF.loadbag(page);
            HF.loadinfo();
          }
	    else{ 
			HF.catchresut(data.result,data.msg)
		 }	

	 })
	}

 }
 function useagain(){
       openwin("http://fight.pet.qq.com/mpt.html","300","140");
 }
 //显示物品
 function showgoods(page){
         var minnum,maxnum,page1,page2,pagenum=page||0;
	     happyfight.loadgoods_html="";
		 maxnum=(page*9)<HF.Fdata.shopgoods.info.length?(page*9):HF.Fdata.shopgoods.info.length;
		for (var i=(page-1)*9;i<maxnum;i++)
		{ 
                   happyfight.loadgoods_html+="<dl ><dt><img src='"+imgurl+HF.Fdata.shopgoods.info[i].id+".png' onclick='fightbuy("+HF.Fdata.shopgoods.info[i].id+",1)' tips='<b>"+HF.Fdata.shopgoods.info[i].name+"</b>"+HF.Fdata.shopgoods.info[i].desc+"' /></dt>";
	               happyfight.loadgoods_html+="<dd class='shopname'>"+HF.Fdata.shopgoods.info[i].name+"</dd>";
		           happyfight.loadgoods_html+="<dd class='shopinfo'>价格："+parseInt(HF.Fdata.shopgoods.info[i].price)*0.01+"Q币</dd>";
				   if (parseInt(HF.Fdata.shopgoods.info[i].redprice)==parseInt(HF.Fdata.shopgoods.info[i].price))
				   {				
					   happyfight.loadgoods_html+="<dd class='shopinfo'>此物品不打折</dd>";
				   }
				   else{
	   				    happyfight.loadgoods_html+="<dd>VIP价：<span class='red'>"+parseInt(HF.Fdata.shopgoods.info[i].redprice)*0.01+"Q币</span></dd>";

				   }
	               happyfight.loadgoods_html+="<dd class='shopbutton'><input type='button' value='购买' onclick='fightbuy("+HF.Fdata.shopgoods.info[i].id+",1)' />";
				   happyfight.loadgoods_html+="<input type='button' value='赠送' onclick='fightbuy("+HF.Fdata.shopgoods.info[i].id+",2)' /></dl>" ;
            
		}
          $("#shop_content").html(happyfight.loadgoods_html)
		 happyfight.loadgoods_html="<div id='shop_content'>"+happyfight.loadgoods_html+"</div>" 
		  var pagehtml="",maxpage=parseInt(HF.Fdata.shopgoods.maxno);
		   if (maxpage>1)
		  {
		  for (var k=1;k<=HF.Fdata.shopgoods.maxno;k++ )
		  { if (k==pagenum)
		    { pagehtml+="<span class='activepage'>"+k+"</span>"
		     }
			 else
			  pagehtml+="<span onclick='HF.loadgoods("+k+")'>"+k+"</span>";
		  } 
		   page1=(page-1)<1?0:(page-1);
		   page2=(page+1)>maxpage?(maxpage-1):(page+1);
		   pagehtml="<p class='shoppage'><span onclick='HF.loadgoods("+page1+")'>上一页</span>"+pagehtml+"<span onclick='HF.loadgoods("+page2+")'>下一页</span></p>"
		  }
		  if (pagehtml!="")
		   {
            happyfight.loadgoods_html=pagehtml+happyfight.loadgoods_html+pagehtml
		   }
    $("#hfshop_bag").html(happyfight.loadgoods_html);
	HF.showtips();
 }

//购买赠送
function fightbuy(id,type,uin){
	if (HF.Fdata.shopgoods.result=="0")
	{	switch (type)
	    {
	     case 1: //购买
		   openwin("http://fight.pet.qq.com/buy.html?id="+id,"390","310");
		   break;
         case 2: //赠送
	       openwin("http://fight.pet.qq.com/parsent.html?id="+id,"400","340"); 
		   break;
         case 3: //购买使用
           openwin("http://fight.pet.qq.com/fightuse.html?id="+id,"400","300",HF.loadinfo);
		   break;
         case 4:  //赠送某人 
	        openwin("http://fight.pet.qq.com/fightparsent.html?id="+id+"and"+uin,"400","350"); 
		   break;
	     case 5:  //使用某物品
           openwin("http://fight.pet.qq.com/usefight.html?id="+id,"400","250",HF.loadinfo);
		   break;
		 
		 }    

	}
	else{
	HF.loadgoods(1,"fightbuy("+id+","+type+","+uin+")")
	}

}

function showusefight(num){
          openwin("http://fight.pet.qq.com/usefight.html?id="+num,"400","250",HF.loadinfo);

}
//显示指定帮派信息
function showfaction(id){

	var arr=HF.getfaction(id),factionhtml="";

    factionhtml+="<div id='hasbp'><div class='bp_baseinfo'><dl><dt><img src='http://fightimg.pet.qq.com/images/bp_icon.jpg' alt='"+arr.name+"' /></dt>";
    if (arr.type==3)
    {
    factionhtml+="<dd>帮派宣言：<br /><textarea rows='2' onkeyup='gbcount(this,60)' cols='20' id='factiontxt'>"+arr.annouce+"</textarea><button onclick='changefaction()' class='bt_tx4'>修改</button></dd></dl></div>";
    }
	else{
    factionhtml+="<dd>帮派宣言：<br /><p class='bor2'>"+arr.annouce+"</p></dd></dl></div>";
	}
    factionhtml+= "<div class='bp_info'><ul>";
	factionhtml+= "<li><b>帮派名号：</b>"+arr.name+"</li>";
	factionhtml+= "<li ><b>帮主尊号：</b>"+arr.masname+"</li>";
	factionhtml+= "<li ><b>帮派ID：</b>"+arr.id+"</li>";
	factionhtml+= "<li ><b>排行：</b>即将开放</li>";
	factionhtml+= "<li tips='升级可获守护神和挑战BOSS，增加帮派人数上限'><b>等级：</b>"+arr.level+"</li>";
	factionhtml+= "<li ><b>帮派人数：</b>"+arr.count+"/"+arr.max+"</li>";
	factionhtml+= "<li tips='帮派总贡献/升级所需贡献度（帮派总贡献每日更新1次）'><b>帮派贡献：</b><em class='c_tx4' >"+arr.facbut+"</em>/"+arr.need+"</li>";
	factionhtml+= "<li tips='主动乐斗，挑战传说中的乐斗BOSS可以获得贡献度'><b>个人贡献：</b>"+arr.singlebut+"</li>";
	if (arr.skill.length<1)
	{
			factionhtml+= "<li ><b>帮派技能：</b><span class='skillspan badbtn'><img src='http://fightimg.pet.qq.com/img/skill2032.jpg' tips='升级挑战BOSS可得' ></span></li></ul></div>";
	}
	else{
		factionhtml+= "<li ><b>帮派技能：</b>";
		 for (var j=0;j<arr.skill.length ; j++)
		 {
		 factionhtml+= "<span class='skillspan'><img tips='<b>技能："+arr.skill[j].name+"</b>"+arr.skill[j].desc+"' src='"+imgurl+"skill"+arr.skill[j].id+".jpg' /></span>"
		 }
	   	factionhtml+="</li></ul></div>";
	}
	factionhtml+="<div class='bp_btn'>";
	if (arr.type=="3")
	{ 
	  if (arr.updateflag=="1")
	  {
		 factionhtml+="<button class='bt_tx4' onclick='factionup()'>帮派升级</button>";
	  }
	  factionhtml+="<button class='bt_tx4' onclick='opencontrol()'>帮派设置</button>";
      factionhtml+="<button class='bt_tx4' onclick='openfaclist()'>申请列表</button>";
	  if (arr.protectflag=="1")
	  {
	 	  factionhtml+="<button class='bt_tx4' onclick='choosegod()'>帮派守护神</button>";
	  }
	  factionhtml+="<button class='bt_tx4' onclick='showcontri()'>贡献度查询</button>";
	  factionhtml+="<button class='bt_tx4' onclick='showfactionhelp()'>帮派帮助</button>";
	  factionhtml+="<button class='bt_tx4' onclick='outfaction("+happyfight.homeuin+")'>退出帮派</button>";
	}
	 else if (arr.type=="2")
	{
      factionhtml+="<button class='bt_tx4' onclick='insetfaction("+arr.id+")'>申请加入</button>";
	  factionhtml+="<button class='bt_tx4' onclick='HF.faction("+happyfight.hasfaction+")'>返回</button>";

	}
	 else if (arr.type=="1")
	{
      factionhtml+="<button class='bt_tx4' onclick='HF.faction("+happyfight.hasfaction+")'>我的帮派</button>";
	}
	if (arr.type=="0")
	{  
        if (arr.updateflag=="1")
	  {
		 factionhtml+="<button class='bt_tx4' onclick='factionup()'>帮派升级</button>";

	  }
	    if (arr.applyflag=="1")
	  {
		 factionhtml+="<button class='bt_tx4' onclick='openfaclist()'>申请列表</button>";
	  }
      //factionhtml+="<button class='bt_tx4 badbtn' title='帮派升级后可领取'>帮派奖励</button>";
	  factionhtml+="<button class='bt_tx4' onclick='showcontri()'>贡献度查询</button>";
	   factionhtml+="<button class='bt_tx4' onclick='showfactionhelp()'>帮派帮助</button>";
	  factionhtml+="<button class='bt_tx4' onclick='outfaction("+happyfight.homeuin+")'>退出帮派</button>";
	}

	
   factionhtml+="</div><div class='bp_event'>";
   if (arr.info)
   {
	   for (var i=0;i<arr.info.length;i++ )
	   {
       factionhtml+=" <dl class='bg2 bor'><dt ></dt><dd><p>"+arr.info[i].word+"</p>";
       factionhtml+=" <div class='eventbtndiv'>时间："+timedate(arr.info[i].time)+"</dt></div></dd></dl>";
	   }
   }
   if (parseInt(arr.maxpage)>1)
    {   
		factionhtml+="<p class='faclistpage'>";
		for (var i=1;i<=parseInt(arr.maxpage);i++ )
		{    
            if (i==parseInt(arr.pageno))
            {
		     factionhtml+="<span class='activepage'>"+i+"</span>";
            }
			else{
		     factionhtml+="<span onclick='showfactionevent("+i+")'>"+i+"</span>";
			}
		}
		factionhtml+="</p>";
    }
     if (arr.info.length<1)
     {
		      factionhtml+="</div><div class='factionenddiv'></div></div>";
     }else{
	      factionhtml+="</div></div>";

	 }


  $("#hf_bp").html(factionhtml);
     HF.showtips();
}
function showcontri(){
  if (HF.Fdata.factionfriend.length>1)
  {
	parent.factionfriend = HF.Fdata.factionfriend;
  }
  openwin("http://fight.pet.qq.com/contribution.html","350","400",HF.faction)
}
function showfactionhelp(){
  openwin("http://fight.pet.qq.com/factionhelp.html","600","540",HF.faction)
}


//显示没有帮派信息
function shownofaction(data){
   var queryhtml="";
   queryhtml+="<div id='hasnobp'><div class='join_info'>";
   if (data.query.length>=1)
   {
     queryhtml+="<p class='c_tx4'>你已经申请加入以下帮派：</p><ul>";
    queryhtml+="<li class='blodfont'><dl><dt>帮派名称</dt><dd class='bg'>帮主</dd><dd>申请</dd></dl></li>"; 
   }
   else{
       queryhtml+="<p style='line-height:60px;'>你还没申请任何帮派,创建你的帮派或者选择合适的帮派加入吧.</p><ul>";
   }
   for (var i=0;i<data.query.length ;i++ )
   {
     queryhtml+="<li class='bgr2'><dl><dt title='查看帮派信息' onclick='HF.faction("+data.query[i].id+")'>"+data.query[i].name+"</dt><dd class='bg' title='QQ号："+data.query[i].uin+"'>"+data.query[i].masname+"</dd>";
	 queryhtml+="<dd><button class='bt_tx4' onclick='cancelfac("+data.query[i].id+")'>取消申请</button></dd></dl></li>";   		 
   }
    queryhtml+="</ul><button id='creat_btn' class='gb_bt' onclick='opencreat();' tips='温馨提示：创建帮派vip玩家需要达到15级普通玩家需要等级达到20级以及消耗50点体力'>创建帮派</button></div>";
    queryhtml+="<p>输入你想要加入的帮派ID<input type='text' id='facvalue' value='' /><button class='bt_tx4' onclick='insetfac()'>申请加入</button></p>";
	queryhtml+="<p class='c_tx4 templist5'>最近新成立的帮派：</p>";
	queryhtml+="<div class='join_list'><ul class='bplist'>";
	if (data.list.length<1)
   {
      queryhtml+="<li class='bgr2 c_tx4'>最近没有新成立的帮派。</li>";

   }else{
    queryhtml+="<li class='blodfont'><dl><dt>帮派名称</dt><dd class='bg'>帮派ID</dd><dd >人数</dd><dd class='bg bgname'>帮主</dd><dd>申请</dd></dl></li>"; 
   } 
    for (var k=0;k<data.list.length;k++ )
   {
     queryhtml+="<li class='bgr2'><dl><dt onclick='HF.faction("+data.list[k].id+")'>"+data.list[k].name+"</dt><dd class='bg'>"+data.list[k].id+"</dd><dd >"+data.list[k].count+"</dd><dd class='bg bgname' title='QQ号："+data.list[k].uin+"'>"+data.list[k].masname+"</dd>";
	 queryhtml+="<dd><button class='bt_tx4' onclick='insetfaction("+data.list[k].id+")'>申请</button></dd></dl></li>";   		 
   }

   queryhtml+="</ul>";
   //显示页数
    if (parseInt(data.total)>1)
    {   
		queryhtml+="<p class='faclistpage'>";
		for (var i=1;i<=parseInt(data.total);i++ )
		{    
            if (i==parseInt(data.pageno))
            {
		     queryhtml+="<span class='activepage'>"+i+"</span>";
            }
			else{
		     queryhtml+="<span onclick='showfaclist("+i+")'>"+i+"</span>";
			}
		}
		queryhtml+="</p>";
    }
	if (data.list.length<5)
	{
	   queryhtml+="</div><div class='factionenddiv'></div></div>";
	}
	else{
	   queryhtml+="</div></div>";

	}
    $("#hf_bp").html(queryhtml);
	 HF.showtips();
}

function showfactionevent(page){
	var factionhtml="";
	$.getJSON("http://fight.pet.qq.com/cgi-bin/petpk?cmd=factioninfo&page="+page,function(data){
		if (data.result == "0") {
	    for (var i=0;i<data.info.length;i++ )
	    {
         factionhtml+=" <dl class='bg2 bor'><dt ></dt><dd><p>"+data.info[i].word+"</p>";
         factionhtml+=" <div class='eventbtndiv'>时间："+timedate(data.info[i].time)+"</dt></div></dd></dl>";
	     }
       
         if (parseInt(data.maxpage)>1)
        {   
		factionhtml+="<p class='faclistpage'>";
		for (var i=1;i<=parseInt(data.maxpage);i++ )
		{    
            if (i==parseInt(data.pageno))
            {
		     factionhtml+="<span class='activepage'>"+i+"</span>";
            }
			else{
		     factionhtml+="<span onclick='showfactionevent("+i+")'>"+i+"</span>";
			}
		  }
		  factionhtml+="</p>";
          }
		   $(".bp_event").html(factionhtml)
		 }
		else {
		catchresut(data.result, data.msg)
		}
	})

}
//显示新建帮派分页分页
function showfaclist(k){
	var queryhtml="";
	$.getJSON("http://fight.pet.qq.com/cgi-bin/petpk?cmd=latest&page="+k,function(data){
		if (data.result == "0") {
		 queryhtml+="<ul class='bplist'>";
            queryhtml+="<li class='blodfont'><dl><dt>帮派名称</dt><dd class='bg'>帮派ID</dd><dd >人数</dd><dd class='bg bgname'>帮主</dd><dd>申请</dd></dl></li>"; 
	      for (var k=0;k<data.list.length;k++ )
          {
          queryhtml+="<li class='bgr2'><dl><dt onclick='HF.faction("+data.list[k].id+")'>"+data.list[k].name+"</dt><dd class='bg'>"+data.list[k].id+"</dd><dd >"+data.list[k].count+"</dd><dd class='bg bgname'  title='QQ号："+data.list[k].uin+"'>"+data.list[k].masname+"</dd>";
	      queryhtml+="<dd><button class='bt_tx4' onclick='insetfaction("+data.list[k].id+")'>申请</button></dd></dl></li>";   		 
          }
          queryhtml+="</ul>";
		  if (parseInt(data.total)>1)
          {   
		    queryhtml+="<p class='faclistpage'>";
		    for (var i=1;i<=parseInt(data.total);i++ )
		    {    
              if (i==parseInt(data.pageno))
              {
		        queryhtml+="<span class='activepage'>"+i+"</span>";
               }
			   else{
		        queryhtml+="<span onclick='showfaclist("+i+")'>"+i+"</span>";
			   }
		    }
		    queryhtml+="</p>";
           }
		   if (data.list.length<4)
		  {
		   queryhtml+="<div class='factionenddiv'></div>"
		  }
		   $(".join_list").html(queryhtml)
		 }
		else {
		catchresut(data.result, data.msg)
		}
	})


}
//申请加入
function insetfac(){
    if (parseInt($("#facvalue").val())=="NaN")
    {
     	return QZONE.FP.showMsgbox("帮派id只能为数字", 1, 1500);
    } 
	else{
	 insetfaction(parseInt($("#facvalue").val()));
	}
}
//帮派升级
function factionup(){
    	$.getJSON("http://fight.pet.qq.com/cgi-bin/petpk?cmd=updatefac",function(data){
	       if (data.result == "0") {
				  QZONE.FP.showMsgbox("升级成功。", 1, 1500);
				  HF.Fdata.faction.shift();
				  HF.loadfaction();
				}
				else {
					HF.catchresut(data.result,data.msg);
				}
	
	})

}
//修改帮派宣言
function changefaction(){
	var msg=encodeURI($("#factiontxt").val());
  	$.getJSON("http://fight.pet.qq.com/cgi-bin/petpk?cmd=declaration&msg="+msg,function(data){
	       if (data.result == "0") {
				  HF.getfaction(happyfight.hasfaction).annouce= $("#factiontxt").val();
				  QZONE.FP.showMsgbox("修改成功。", 1, 1500);
				}
				else {
					HF.catchresut(data.result,data.msg);
				}
	
	})
}
//创建帮派回调函数
function creatcallback(){
	HF.loadinfo(happyfight.homeuin,"HF.faction()")
	}
//创建帮派
function opencreat(){
	if (parseInt(HF.getinfo(happyfight.homeuin).baseinfo.sp)<50)
	{   
		QZONE.FP.showMsgbox("你的体力值不足50，不能创建帮派。", 1, 1500);
		return gettili();
	}
	if ((parseInt(HF.getinfo(happyfight.homeuin).baseinfo.vipflag)>0||parseInt(HF.getinfo(happyfight.homeuin).baseinfo.qqvip)>0))
	{
		if (parseInt(HF.getinfo(happyfight.homeuin).baseinfo.lilian)<15)
		{
			return QZONE.FP.showMsgbox("亲爱的vip用户，您的等级不够15级，不能创建帮派。", 1, 1500);
		}
	}
	else if (parseInt(HF.getinfo(happyfight.homeuin).baseinfo.lilian)<20)
	{
		return QZONE.FP.showMsgbox("你的等级不够20级，不能创建帮派（QQ会员，粉钻或黄钻用户15级即可创建帮派）。", 1, 1500);
	}
  openwin("http://fight.pet.qq.com/creatbp.html","300","150",creatcallback);
}
//帮派设置
function opencontrol(){
openwin("http://fight.pet.qq.com/faccontrol.html","300","170",HF.faction)
}
//申请列表
function openfaclist(){
openwin("http://fight.pet.qq.com/application.html","300","370",HF.faction)
}

//申请帮派
function insetfaction(id){
	$.getJSON("http://fight.pet.qq.com/cgi-bin/petpk?cmd=ask&id="+id,function(data){
	       if (data.result == "0") {
					QZONE.FP.showMsgbox("你的申请已经提交成功，请耐心等待回复。", 1, 1500);
					HF.faction();
				}
				else {
					HF.catchresut(data.result, data.msg);
				}
	
	})
}

//取消申请
function cancelfac(id){
	$.getJSON("http://fight.pet.qq.com/cgi-bin/petpk?cmd=cancel&id="+id,function(data){
	       if (data.result == "0") {
					QZONE.FP.showMsgbox("你的申请已经成功取消。", 1, 1500);
					HF.faction();
				}
				else {
					HF.catchresut(data.result, data.msg);
				}
	
	})
}


//退出帮派
function outfaction(uin){
	if (confirm("退出帮派操作不可恢复，您确认要继续么？")){
	$.getJSON("http://fight.pet.qq.com/cgi-bin/petpk?cmd=outfaction&uin="+uin,function(data){
	       if (data.result == "0") {
			        happyfight.hasfaction=0;
					parent.fightfaction=0;
					HF.getinfo(happyfight.homeuin).baseinfo.factionid=0;
					HF.getinfo(happyfight.homeuin).baseinfo.factionname="";
					QZONE.FP.showMsgbox("成功退出帮派", 1, 1500);
					HF.faction();
				}
				else {
					HF.catchresut(data.result,data.msg);
				}
	
	})
	}
}


//赶出帮派
function getoutfaction(uin){
	if (confirm("逐出帮派操作不可恢复，您确认要继续么？")){
	$.getJSON("http://fight.pet.qq.com/cgi-bin/petpk?cmd=outfaction&uin="+uin,function(data){
	       if (data.result == "0") {
	
					QZONE.FP.showMsgbox("成功逐出帮派", 1, 1500);
					for (var i=0;i<HF.Fdata.factionfriend.length;i++)
					{
						if (parseInt(HF.Fdata.factionfriend[i].uin)==parseInt(uin))
						{   
                          HF.Fdata.factionfriend.splice(i,1);
						  showfactionfriend();
						}
					} 
				}
				else {
					HF.catchresut(data.result,data.msg);
				}
	
	})
	}
}

//选择守护神
function choosegod(){
  openwin("http://fight.pet.qq.com/patrongod.html","325","235");
}

//企鹅动态
function showpetevent(data){
    var peteventhtml="";
	var yflag,flag,fightface="http://imgcache.qq.com/qzone_v4/client/userinfo_icon/5001.gif";
	for (var i=0;i<data.info.length;i++ ){ 
		yflag=0,flag=0;
	if (!HF.friend(data.info[i].puin)&&parseInt(data.info[i].puin)>1)
		{
		}
      else{
	  if (HF.friend(data.info[i].puin))
	   {yflag=HF.friend(data.info[i].puin).yflag;
	   flag=HF.friend(data.info[i].puin).flag;
	  fightface=HF.friend(data.info[i].puin).facepic;
	  }		
	 peteventhtml+="<dl><dt><div><a class='eventface' href='http://user.qzone.qq.com/"+data.info[i].puin+"' target='_blank'><img src='"+fightface+"' /></a>";
	if (parseInt(data.info[i].puin)<1)
	{	 
		 peteventhtml+="<h5>"+HF.getinfo(happyfight.homeuin).baseinfo.name+"<a target='_blank' href='http://paycenter.qq.com/cgi-bin/showopenservice.cgi?service_type=home'><img src='http://imgcache.qq.com/ac/b.gif' alt='黄钻' class='icon_vip_yl"+yflag+"' /></a><a href='http://pet.qq.com/comm-htdocs/vip/?t=pet' target='_blank'><img src='http://imgcache.qq.com/ac/b.gif' alt='粉钻' class='icon_vip_f"+flag+"' /></a></h5></div></dt>";
         peteventhtml+="<dd><h4 >"+HF.getinfo(happyfight.homeuin).baseinfo.name+"</h4>";
	}
	else{   	 
		  peteventhtml+="<h5>"+data.info[i].pname+"<a target='_blank' href='http://paycenter.qq.com/cgi-bin/showopenservice.cgi?service_type=home'><img src='http://imgcache.qq.com/ac/b.gif' alt='黄钻' class='icon_vip_yl"+yflag+"' /></a><a href='http://pet.qq.com/comm-htdocs/vip/?t=pet' target='_blank'><img src='http://imgcache.qq.com/ac/b.gif' alt='粉钻' class='icon_vip_f"+flag+"' /></a></h5></div></dt>";
			 peteventhtml+="<dd><h4 >"+data.info[i].pname+"<span>("+data.info[i].puin+")</span></h4>";

	}
	 peteventhtml+="<p >"+data.info[i].desc+"</p>";
	 peteventhtml+=" <div class='eventbtndiv'><span turl='"+data.info[i].id+"' onclick='HF.delevent(this)'><button class='bt_tx4'>删除动态</button></span>时间："+timedate(data.info[i].time)+" </div></dd></dl>";
	 }
	}
     peteventhtml+="<div class='eventpage'>";
		  for (var k=1;k<=parseInt(data.maxpage);k++ )
		  { if (k==parseInt(data.pageno))
		    { peteventhtml+="<span class='activepage'>"+k+"</span>"
		     }
			 else
			  peteventhtml+="<span onclick='HF.getpetevent("+k+")'>"+k+"</span>";
		  } 
  peteventhtml+="</div>";
  $("#hf_event").html(peteventhtml);

  $(".event_menu li").attr("class","");
  $(".event_menu li")[1].className="nowtag";
}

//显示企鹅动态
function showfightevent(data){
    var yflag,flag,fightface,fighteventhtml="",eventuin,eventname,viewfight="";
	for (var i=0;i<data.info.length;i++){ 
		viewfight="";
		yflag=0,flag=0; 
		eventuin=data.info[i].puin;
	     eventname=data.info[i].pname; 
          if ((data.info[i].url!="")&&(parseInt(data.info[i].ta)!=0)||(parseInt(data.info[i].puin)==1))
          {
			   	 viewfight+="<span turl='"+data.info[i].url+"' onclick='savereplay(this)'><button class='bt_tx2'>保存</button></span><span turl='"+data.info[i].url+"' onclick='HF.petproview(this)'><button class='bt_tx2'>观看</button></span>";
          }
		 if (parseInt(data.info[i].ta)==2){
             if (HF.friend(data.info[i].puin))
             {
		       if (parseInt(HF.friend(data.info[i].puin).enable)==1)
                {
				   viewfight+="<span><button class='bt_tx4' onclick='tohappyfight("+data.info[i].puin+")'>挑战Ta</button></span>";
                }
		       else if (parseInt(HF.friend(data.info[i].puin).enable)==2)
               {
				   viewfight+="<span><button class='bt_tx4' onclick='tohappyfight("+data.info[i].puin+")'>挑战Ta</button></span>";
                }
		        else{
		         viewfight+="<span><button class='bt_tx4 badbtn' disabled='disabled'>挑战Ta</button></span>";
		        }
			   }
			   else{
			     viewfight+="<span><button class='bt_tx4' onclick='tohappyfight("+data.info[i].puin+",5)'>挑战Ta</button></span>";
			   }
			 }
			else if((parseInt(data.info[i].ta)==3)){
			 viewfight+="<span><button class='bt_tx4' onclick='tohappyfight("+data.info[i].puin+",1)'>再抢一次</button></span>";
			}
			else if((parseInt(data.info[i].ta)==4)){
			 viewfight+="<span><button class='bt_tx4' onclick='tohappyfight("+data.info[i].puin+",1)'>抢回来</button></span>";
			}
		 if (parseInt(data.info[i].ta)==0)
		    {
			  if (HF.friend(happyfight.homeuin))
			  {		  
				  eventname=HF.friend(happyfight.homeuin).name;
			  }
			  else{
				  		   eventname="自己";

			  }
	       eventuin=happyfight.homeuin; 
		   viewfight="";
	     }
	     eventuin=parseInt(eventuin)==1?"":eventuin;
	      if (HF.friend(eventuin))
	       {yflag=HF.friend(eventuin).yflag;
	         flag=HF.friend(eventuin).flag;
		     fightface=HF.friend(eventuin).facepic;	
	       }
	      else {fightface="http://imgcache.qq.com/qzone_v4/client/userinfo_icon/5001.gif";}
		 if (parseInt(eventuin)<10)
		 {
			 eventname=npcname[parseInt(eventuin)];
			 fightface=imgurl+"npc0"+parseInt(eventuin)+".jpg";
			 eventuin="";
		 }
	 fighteventhtml+="<dl><dt><div><a class='eventface' href='http://user.qzone.qq.com/"+eventuin+"' target='_blank'><img src='"+fightface+"' /></a>";
     fighteventhtml+="<h5>"+eventname+"<a target='_blank' href='http://paycenter.qq.com/cgi-bin/showopenservice.cgi?service_type=home'><img src='http://imgcache.qq.com/ac/b.gif' alt='黄钻' class='icon_vip_yl"+yflag+"' /></a><a href='http://pet.qq.com/comm-htdocs/vip/?t=pet' target='_blank'><img src='http://imgcache.qq.com/ac/b.gif' alt='粉钻' class='icon_vip_f"+flag+"' /></a></h5></div></dt>";
	 eventuin=(eventuin=="")?"":"("+eventuin+")";
	 fighteventhtml+="<dd><h4 class='canwin"+data.info[i].winflag+"' ><em title='看TA资料' onclick='HF.setinfo("+eventuin+");parent.QZONE.dom.setScrollTop(450)'>"+eventname+"</em><span>"+eventuin+"</span></h4>";
	 fighteventhtml+="<p >"+data.info[i].desc+"</p>";
	 if (data.info[i].msg!="")
	 {fighteventhtml+="<p >"+eventname+"对你说：<span class='c_tx4'>"+data.info[i].msg+"</span></p>";
	 }
	 
	 fighteventhtml+="<div class='eventbtndiv'>";
     fighteventhtml+=viewfight;
	 fighteventhtml+="时间："+timedate(data.info[i].time)+" </div></dd></dl>";
	 } 

   $("#hf_event").html(fighteventhtml);
	$(".event_menu li").attr("class","");
	$(".event_menu li:first-child").attr("class","nowtag");
}

//打木头人
 function fightwood(){
   if (happyfight.isfight)
   {
	   return false;
   }
	if (happyfight.houseready!=1)
	{
		swf("PetFunFight15.swf?id="+Math.random(),"PetFunFight","481","289","","petmainswf"); 
		return QZONE.FP.showMsgbox("flash加载中，请稍后再发起乐斗。",1,1500);
	}
	if (parseInt(HF.getinfo(happyfight.homeuin).baseinfo.sp)<10)
	{ QZONE.FP.showMsgbox("您的体力值不足，请等体力恢复后再来",1,1500);
	  gettili();
		return false;
	}
	else{
		happyfight.isfight=1;
	 $.get("http://fight.pet.qq.com/cgi-bin/petpk?cmd=wood",function(data){
		 happyfight.isfight=0;
          var tempdate=eval("("+data+")");
		  if (tempdate.result=="0") {  
			  getSwfInstance("PetFunFight").setFightData(tempdate.string);
			  happyfight.canfight=0;
		      parent.QZONE.dom.setScrollTop(0);
			  HF.getinfo(happyfight.homeuin).baseinfo.sp=parseInt(HF.getinfo(happyfight.homeuin).baseinfo.sp)-10;
			  HF.setinfo();
			  happyfight.replayurl=tempdate.repid;
            }
	      else{ 
			HF.catchresut(tempdate.result,tempdate.msg)
		   }		
		
	  })
    }
} 

//保存录像
function savereplay(obj){
	var surl;
	if (obj)
	{
		surl=escape(obj.getAttribute("turl"));
	}
	else{
		surl=happyfight.replayurl;
	}
	
    openwin("http://fight.pet.qq.com/savereplay.html?id="+surl,"548","505");
	
}

//观看录像
function showreplay(data){
	var replayhtml="<ol>",biglist,classnum,temphtml,tempnum,eventname,face;
	   for (var i=0;i<parseInt(data.count);i++ )
	   {
		replayhtml+="<li><ul class='graylist grayvideo bor'><li class='numli'>"+(i+1)+"</li><li class='videoinfo'><span class='visitinfogray'>-vs-</span>";
		replayhtml+="<div class='infoface'><img src='http://imgcache.qq.com/qzone_v4/client/userinfo_icon/5001.gif'  /></div></li>";
		replayhtml+="<li class='dateli'>可保存录像</li></ul>";
	   }
   if (parseInt(data.count)<10)
   {
	   	replayhtml+="<li><ul class='graylist bor bg2 fullli'><button class='bt_tx7 c_tx' onclick='HF.openpos()'>增加录像保存位</button></ul></li>";
   }
   replayhtml+="</ol>";
   $("#hf_event").html(replayhtml);
   $(".event_menu li").attr("class","");
   $(".event_menu li:last-child").attr("class","nowtag");
   for (var i=0;i<data.list.length;i++ )
	{  temphtml="";
	   if (parseInt(data.list[i].win)==parseInt(data.list[i].srcuin))
		{
		   classnum=0;
		}
		else{
           classnum=1;
		}
		if (parseInt(data.list[i].dstuin)<100)
		{
			eventname=npcname[parseInt(data.list[i].dstuin)];
			face=imgurl+"npc0"+parseInt(data.list[i].dstuin)+".jpg";
		}
		else{
			eventname=data.list[i].dstname;
			face=fightface(data.list[i].dstuin);
		}
		tempnum=parseInt(data.list[i].pos)-1;
		temphtml+="<li class='numli c_tx'>"+(tempnum+1)+"</li><li class='videoinfo'>";
		temphtml+="<div class='visitinfogray'>vs</div>";
		temphtml+="<div class='infoface'><img src='"+face+"' alt='"+data.list[i].dstuin+"' /></div>";
		temphtml+="<div class='baseinfo'><span class='videoname2"+classnum+"'>"+eventname+"</span><br />等级："+data.list[i].dstlevel+"</div></li>";
		temphtml+="<li class='dateli'><span class='winpic"+classnum+"'></span>"+data.list[i].time+"</li>";
		temphtml+="<li class='buttonli'>"
        temphtml+="<button turl='"+data.list[i].id+"' class='bt_tx4' title='播放录像' onclick='HF.openproview(this)'>播放录像</button>";
		temphtml+="<button turl='"+data.list[i].id+"' class='bt_tx4' title='复制地址与好友分享' onclick='HF.copyurl(this)'>复制地址</button>";
		temphtml+="<button turl='"+data.list[i].pos+"' class='bt_tx4' title='删除录像' onclick='HF.delurl(this)'>删除录像</button></li>";
		try{
        $t("hf_event").getElementsByTagName("ol")[0].getElementsByTagName("ul")[tempnum].innerHTML=temphtml;
		$t("hf_event").getElementsByTagName("ol")[0].getElementsByTagName("ul")[tempnum].className="bor";
		}catch(e){}

	}

}

function fightmsg(){
  openwin("http://fight.pet.qq.com/message.html?id="+happyfight.fightid,"540","250");
}

function facfight(id){
   tohappyfight(id,5);
}

function listfight(id){
    if (confirm("要收TA为徒有可能需要打败TA的师傅，确定要收TA为徒吗？")){
	  tohappyfight(id,1)
	}
}
function tohappyfight(id,type){
	var canfight=1;
	if (type>2&&type<5)
	{canfight=0;
	  if (confirm(happyfight.tempmsg))
	  {canfight=1;
	  }
	}	
		
   if (canfight==1){
	if (happyfight.isfight)
       {
		return false;
	   }	

	if (happyfight.houseready!=1)
	{
	     swf("PetFunFight15.swf?id="+Math.random(),"PetFunFight","481","289","","petmainswf"); 
		return QZONE.FP.showMsgbox("flash加载中，请稍后再发起乐斗。",1,1500);
	}
	if (parseInt(HF.getinfo(happyfight.homeuin).baseinfo.sp)<10)
	{ QZONE.FP.showMsgbox("您的体力值不足,还不能发起乐斗。",1,1500);
	    gettili();
		return false;
	} 
	happyfight.fightid=id;
	HF.loadinfo(happyfight.homeuin,"petfight("+id+","+type+")");
	}	
}

function gettili(){
	if (HF.getinfo(happyfight.homeuin).baseinfo.vitgoods!="0")
	{
		setTimeout("fightbuy(3041,5)",1000);
	}
	else{
			setTimeout("fightbuy(3041,3)",1000);
	}

}

function petfight(id,type){ 
	var geturl;
	if (type==1)
	{geturl="http://fight.pet.qq.com/cgi-bin/petpk?cmd=sfight&puin="+id;
	 happyfight.fighttili=15;
	}
	else if(type==2){
    
	geturl="http://fight.pet.qq.com/cgi-bin/petpk?cmd=ffight";
	happyfight.fighttili=15;
	}
	else if(type==3){
	geturl="http://fight.pet.qq.com/cgi-bin/petpk?cmd=sfight&puin="+id;
	happyfight.fighttili=15;
	}
	else if(type==5){		
	geturl="http://fight.pet.qq.com/cgi-bin/petpk?cmd=fight&uin="+id;
	happyfight.fighttili=10;
	}
	else {		
	geturl="http://fight.pet.qq.com/cgi-bin/petpk?cmd=fight&puin="+id;
	happyfight.fighttili=10;
	}
	happyfight.isfight=1;
      $.get(geturl,function(data){
		 happyfight.isfight=0;
         var tempdate=eval("("+data+")");
         if (tempdate.result=="0"){
			 getSwfInstance("PetFunFight").setFightData(tempdate.string);
			 happyfight.canfight=0;	 
			 if (happyfight.fighttili==10)
			 {  
                if (HF.friend(happyfight.fightid))
                {	
					HF.friend(happyfight.fightid).enable="0";
		            savefriend();
                 }
				 if(HF.getfactionfriend(happyfight.fightid))
				 { 
                    HF.getfactionfriend(happyfight.fightid).fight="0";
				 }
		
			 }
		      parent.QZONE.dom.setScrollTop(0); 
			 if ($("#fight_friend").css("display")=="block")
			    {
				 HF.showfightfriend();
			    }
             else if ($("#faction_friend").css("display")=="block")
             {  
				  showfactionfriend();
             }
			 else{
             HF.getfriendlist();
			 }       
             parent.fighttempdata=tempdate;
			 HF.getinfo(happyfight.homeuin).baseinfo.sp=parseInt(HF.getinfo(happyfight.homeuin).baseinfo.sp)-10;
			 HF.setinfo();
            }
	       else{ 
			HF.catchresut(tempdate.result,tempdate.msg)
		  }

		try{
			happyfight.replayurl=tempdate.repid;
		}catch(e){}

	  })	
 }
 function fightnpc(id){
	happyfight.isfight=1;
      $.get("http://fight.pet.qq.com/cgi-bin/petpk?cmd=fight&uin="+id,function(data){
		 happyfight.isfight=0;
         var tempdate=eval("("+data+")");
         if (tempdate.result=="0"){
			 getSwfInstance("PetFunFight").setFightData(tempdate.string);
			 happyfight.canfight=0;	 
		     parent.QZONE.dom.setScrollTop(0);       
             parent.fighttempdata=tempdate;
            }
	       else if(tempdate.result=="1"){ 
			setTimeout("fightbuy(3040,1)",1000);
		   }
			else{
			HF.catchresut(tempdate.result,tempdate.msg)
			}

		try{
			happyfight.replayurl=tempdate.repid;
		}catch(e){}

	  })	

 }
 var pettask=function(msg){
		switch (msg){
		case "1":
	    if (happyfight.taskvalue!=1){	
           openwin("http://fight.pet.qq.com/guide1.html","443","467");
		   happyfight.taskvalue=1;}
		 break;
		case "3":
         if (happyfight.taskvalue!=1){	
		openwin("http://fight.pet.qq.com/newtask.html?id=3","340","360",happyfightload,"",1);
         //openwin("http://fight.pet.qq.com/guide3.html","443","467",happyfightload);
		  happyfight.taskvalue=1;}
		 break;
		case "5":
		if (happyfight.taskvalue!=1){	
         openwin("http://fight.pet.qq.com/newtask.html?id=5","340","360",happyfightload,"",1);
         //openwin("http://fight.pet.qq.com/guide5.html","443","467",happyfightload);
		 happyfight.taskvalue=1;}
		 break;
		case "7":
		if (happyfight.taskvalue!=1){
		 openwin("http://fight.pet.qq.com/newtask.html?id=7","340","360",happyfightload,"",1);	
         //openwin("http://fight.pet.qq.com/guide7.html","443","467",happyfightload);
		 happyfight.taskvalue=1;}
		 break;
		case "2": 
		 openwin("http://fight.pet.qq.com/newtask.html?id=2","340","360",happyfightload,"",1);
         //openwin("http://fight.pet.qq.com/guide2.html","378","183",happyfightload);
		  happyfight.taskvalue=0;
		  HF.Fdata.info=[];
		 break;
		 case "4":
		 try{
		 happyfight.taskvalue=0;
		 setTimout(openwin("http://fight.pet.qq.com/newtask.html?id=4","340","360",happyfightload,"",1),3000);	
        //setTimout(openwin("http://fight.pet.qq.com/guide4.html","380","183",happyfightload),3000);	
		 }catch(e){}
		 break;
		 case "6":
		 openwin("http://fight.pet.qq.com/newtask.html?id=6","340","360",happyfightload,"",1)
         //openwin("http://fight.pet.qq.com/guide6.html","378","297",happyfightload);
		  happyfight.taskvalue=0;
		 break;
		 case "8":
		 openwin("http://fight.pet.qq.com/newtask.html?id=8","340","360",happyfightload,"",1)
         //openwin("http://fight.pet.qq.com/guide8.html","378","297",happyfightload);
		 break;	
		  case "9":
		 openwin("http://fight.pet.qq.com/newtask.html?id=9","340","360",happyfightload,"",1)
         //openwin("http://fight.pet.qq.com/guide9.html","378","183",happyfightload);
		 break;	
		 default:
		 break;
		}	
	
}

//还我自由
function tobefree(uin,type){
   if (confirm("跟师傅挑战胜利方可恢复自由，您确认要继续么？")){
	   tohappyfight(uin,type); 
   }

}

//更新师徒信息
function shituupdate(){
 $.get("http://fight.pet.qq.com/cgi-bin/petpk?cmd=enter",function(data){
    var data=eval("(" + data + ")");
     var tsex,shitu="";
	 tsex=(parseInt(data.msg)==103)?1:0;
	 tsex=tsex+"$0";
    if (data.dis)
     {
		for (var i=0;i< data.dis.length ; i++ )
		{shitu+=((parseInt(data.dis[i].sex)==103)?1:0)+"$"+data.dis[i].name+"|";
		}
      }
	 try{
		 setTimeout(function(){
			          if (happyfight.houseready&&happyfight.canfight==1)
		                { 
		                  getSwfInstance("PetFunFight").setWaitting(tsex,shitu);}
			},9000);
	     }catch(e){}           
	})
}

function shituout(uin){
if (confirm("逐出师门操作不可恢复，您确认要继续么？"))
	{$.get("http://fight.pet.qq.com/cgi-bin/petpk?cmd=out&puin="+uin,function(data){
	      var tempdate=eval("("+data+")");
		  if (parseInt(tempdate.result)==0){   
           QZONE.FP.showMsgbox("成功逐出徒弟。",1,2000);
		   HF.loadinfo();
		   if (HF.getinfo(uin))
		   {
			   HF.getinfo(uin).shifu={};
		   }
		 shituupdate();
            }
	      else{ 
			HF.catchresut(tempdate.result,tempdate.msg);
		   }
   })
  }
}

function getshituexp(){
	$.get("http://fight.pet.qq.com/cgi-bin/petpk?cmd=getexp",function(data){
	      var tempdate=eval("("+data+")");
		  if (parseInt(tempdate.result)==0){   
			  $(".getexp").html("徒弟修炼经验：(徒弟昨日修炼所贡献经验)<button class='bt_tx5 stgetexp badbtn' title='已经领过了' disabled='disabled'>领取经验</button>");
			  HF.getinfo(happyfight.homeuin).baseinfo.expflag="0;"
           QZONE.FP.showMsgbox("领取经验成功",1,2000);
		   HF.loadinfo();
            }
	      else{ 
			HF.catchresut(tempdate.result,tempdate.msg);
		   }
   })
}

function getvipgift(){    
	   try{
		   HF.getinfo(happyfight.homeuin).baseinfo.vipinfo="";
	   }catch(e){}
		openwin("http://fight.pet.qq.com/gifttask.html","377","325");

}

//武器升级
function showweaponup(page){
      var weaponhtml="",
		  pagehtml="",
		  pagesize=4,
		  min,max,nextpage,propage,maxpage;
	      if (happyfight.weaponpage&&!page)
	      { 
            if (page!=0)
            {
	          page=happyfight.weaponpage;
            }
	      }
		  else{
	  	  page=page||0;
		  }
		  min=page*pagesize;
		  max=(page+1)*pagesize;
		  maxpage=parseInt((HF.Fdata.weapon.length-1)/pagesize);
		  nextpage=(page<maxpage)?(page+1):maxpage;
		  propage=(page>0)?(page-1):0;
		  happyfight.weaponpage=page;
	  for (var i=min;i<max;i++)
	  {
		  weaponhtml+='<li class="bgr2"><dl><dt tips="'+HF.Fdata.weapon[i].name+'(等级'+HF.Fdata.weapon[i].level+')<br>'+HF.Fdata.weapon[i].desc+'" class="weaponpic'+HF.Fdata.weapon[i].picid+HF.Fdata.weapon[i].flag+'"></dt>';
		  weaponhtml+='<dd class="bg"><span class="starbg" tips="等级'+HF.Fdata.weapon[i].level+'"><b class="star'+HF.Fdata.weapon[i].level+'"></b></span>';
		   if (parseInt(HF.Fdata.weapon[i].level)==5){
		    	  weaponhtml+='<em class="red">极品武器</em></dd>';

		   }
		   else{
			   		  weaponhtml+='<em>成功率：<b class="c_tx">'+HF.Fdata.weapon[i].percent+'</b></em><em>（升级所需卷轴数：'+HF.Fdata.weapon[i].num+'）</em></dd>';
		   }

		  if (parseInt(HF.Fdata.weapon[i].flag)==1&&parseInt(HF.Fdata.weapon[i].level)!=5)
		  {
			  weaponhtml+='<dd class="upbutton"><button class="bt_tx2" onclick="HF.toweaponup('+HF.Fdata.weapon[i].picid+')">升级</button></dd></dl></li>';
		  }
		   else if(parseInt(HF.Fdata.weapon[i].level)==5){
		      	 weaponhtml+='<dd class="textdd c_tx">大侠，神器要好好珍惜哦！</dd></dl></li>';
		  }
		  else{
		      	 weaponhtml+='<dd class="textdd">你没获得该神器，努力升级获得吧！</dd></dl></li>';
		  }
	  }
	  for (var k=0;k<=maxpage ;k++ )
	  {
	
		  if (k==page)
		    {
			  pagehtml+="<span class='activepage red'>"+(k+1)+"</span>";
		     }
			 else{
			  pagehtml+="<span onclick='showweaponup("+k+")'>"+(k+1)+"</span>";
		  } 
         
	  }
	  pagehtml="<span onclick='showweaponup("+propage+")'>上一页</span>"+pagehtml+"<span onclick='showweaponup("+nextpage+")'>下一页</span>";
      $(".weaponlist").html(weaponhtml);
	 $("#hf_weapon .weaponpage").html(pagehtml);	
     HF.showtips();
}
function showvip(){
      $("#viplink").slideDown("speed",function(){
	    setTimeout(function(){
       $("#viplink").slideUp("slow");
        },4000)
    
  })
}


function flashreload(){
  	     swf("PetFunFight15.swf?id="+Math.random(),"PetFunFight","481","289","","petmainswf"); 
}
function parentreload(){
parent.location="http://user.qzone.qq.com/"+happyfight.homeuin+"/myhome/362"
}
function petHospital(){
    openwin("http://fight.pet.qq.com/hospital.html?id="+Math.random(),"510","400",parentreload);
} 
//load

$(document).ready(function(){	
 	try{
	if (scope.pet_ledou_obj)
	{scope.pet_ledou_obj=null;
	} 
	}catch(e){}
 $("#fight_friend").hide(); 
	//加载基本资料
	//HF.loadinfo(happyfight.homeuin,"HF.getfriendlist()");
     HF.setinfo();
	 HF.getfriendlist();
  
   //左右宽度自适应
   $("#hf_info,#hf_shop,#hf_bag").width($(".hfleft").width()-2);
 
	$("#friendsch").focus(function(){
		$("#friendsch").val($("#friendsch").val()=="输入好友昵称或QQ号码搜索"?"":$("#friendsch").val());
	  $("#hf_friendsch").html("输入好友昵称或QQ号码搜索");
	   $("#hf_friendsch").show();
	}).keyup(function(){HF.friendsearch($("#friendsch").val())
		}).blur(function(){
		 $("#friendsch").val("输入好友昵称或QQ号码搜索");
			 if ($("#hf_friendsch").html()=="输入好友昵称或QQ号码搜索")
			 { $("#hf_friendsch").hide();
			 }
	    
	})

$("#hf_menu li").click(function(){
    $("#hf_menu li").attr("class","");
	$(this).attr("class","nowtag");
  })
$("#hfshop_menu li").click(function(){
    $("#hfshop_menu li").attr("class","");
	$(this).attr("class","active");
  })
$(".event_menu li").click(function(){
    $(".event_menu li").attr("class","");
	$(this).attr("class","nowtag");
  })
     HF.showtips();

  $.getScript("http://img.pet.qq.com/2009/fightgg/gonggao.js?id="+Math.random(),function(){
	  try{
	  showNotice();
      showNews(); 
      showfightad();
	
	  }catch(e){}
  })

  setTimeout(function(){
   $("#gonggaolist").slideUp("speed");
   },6000) 
	   	 
})
