function $t(s){
				return document.all?document.all[s]:document.getElementById(s);
            }
			function sAlert(msg,boxtype,func,msgtitle,classA,classB){
		    if($t('msgDiv')) return;
			if($t('bgDiv')){$t('bgDiv').style.display="block";
			}else{
			var bgObj=document.createElement("div");
			bgObj.setAttribute('id','bgDiv');
			document.body.appendChild(bgObj);
			
          if (!window.XMLHttpRequest){
          var frm=document.createElement("iframe");
           frm.setAttribute("name","completionFrame");
		   frm.setAttribute("id","completionFrame");
           bgObj.appendChild(frm);}
		   }

			var msgObj=document.createElement("div")
			msgObj.setAttribute("id","msgDiv");
            msgObj.style.marginTop = -95+document.documentElement.scrollTop+"px";
     
		   var title=document.createElement("h4");
		   title.setAttribute("id","msgTitle");
		   title.setAttribute("align","right");
	       var closeMsg=document.createElement("b");
		   var titleSpan=document.createElement("span");
		    if(msgtitle) titleSpan.innerHTML=msgtitle;
		   closeMsg.onclick=function(){
		      msg_close();
                }
		   var txt=document.createElement("div");
		   txt.setAttribute("id","msgTxt");
		   var msgButton=document.createElement("h5");
		   msgButton.setAttribute("id","msgButton");

		   document.body.appendChild(msgObj);
		   $t("msgDiv").appendChild(title);
		   $t("msgDiv").appendChild(txt);
		   $t("msgDiv").appendChild(msgButton);
		   $t("msgTitle").appendChild(closeMsg);
		   $t("msgTitle").appendChild(titleSpan);
      
		   var Confirm=document.createElement("input");
           Confirm.setAttribute("id","msgConfirm");
		   Confirm.setAttribute("type","button");
            Confirm.onclick=function(){
		    msg_close();
			eval(func);
                } 
		   var Cancel=document.createElement("input");
           Cancel.setAttribute("id","msgCancel");
		   Cancel.setAttribute("type","button");
           Cancel.onclick=function(){
		    msg_close();
			
                } 
	switch(boxtype * 1){
		case 0:
			txt.innerHTML =  msg;
		  $t("msgTxt").className="msgdefault"
		   $t("msgButton").appendChild(Confirm); 
           $t("msgButton").appendChild(Cancel); 
		   $t("msgConfirm").className=classA?classA:"";
		   $t("msgCancel").className=classB?classB:"";
		$t("msgConfirm").focus();
		break;
		case 1:
			txt.innerHTML = msg;
             $t("msgButton").appendChild(Confirm); 
			  $t("msgConfirm").focus();
			
		break;
		case 2:
		  txt.innerHTML = msg;
			$t("msgButton").appendChild(Confirm); 
			$t("msgButton").appendChild(Cancel); 
			 $t("msgTxt").className="msgconfirm"
			 $t("msgConfirm").focus();
  
		break;
		case 3:
			txt.innerHTML =  msg;
		   $t("msgButton").appendChild(Confirm); 
		    $t("msgTxt").className="msgright"
			  $t("msgConfirm").focus();
		break;
		case 4:
			txt.innerHTML =  msg;
		   $t("msgButton").appendChild(Confirm); 
           $t("msgTxt").className="msgerror"
			  $t("msgConfirm").focus();
		break;
		default:
			txt.innerHTML =  msg;
		    $t("msgButton").appendChild(Confirm); 
			$t("msgConfirm").focus();
		 
		break;
	}
            }

			function msg_close(){
			$t("bgDiv").style.display="none";
			var msgObj=$t("msgDiv");
			var title=$t("msgTitle");
			if(msgObj)    
            $t("msgDiv").removeChild(title);
            document.body.removeChild(msgObj);
            }