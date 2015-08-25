var scope;//配置scope作用域
if (top.location==window.location)
  {
	scope=window;
 }
 else{
  scope=parent.window;
 }
$.extend({createClass : function(){return function(){this.initialize.apply(this, arguments);}} });
$.extend({OverLay     : $.createClass()});//屏蔽层plug
$.extend({pet_win     : $.createClass()});//弹出框plug
$.extend({pet_drag    : $.createClass()});//拖动plug (jquery的drag.plug太大了,还要引用ui.js,drag.js两个文件,浪费)
var isIE6 = $.browser.msie && ([/MSIE (\d)\.0/i.exec(navigator.userAgent)][0][1] == 6);//因为jquery不能很好的判断ie6
$.OverLay.prototype = {//屏蔽层模块
	  initialize: function(options){
		this.SetOptions(options);
		this.Lay = $(scope.document.createElement("div"));
		scope.document.body.appendChild(this.Lay[0]);
		//$('body').append(this.Lay)
		this.Color = this.options.Color;
		this.Opacity = parseInt(this.options.Opacity);
		this.zIndex = parseInt(this.options.zIndex);	
		this.Lay.css({
			display:"none",
			zIndex:this.zIndex,
			left:0,
			top:0,
			position:"fixed",
			width:"100%",
			height:(Math.max(scope.document.documentElement.scrollHeight, scope.document.documentElement.clientHeight)+"px")
		})
		if(isIE6){
			this.Lay.css({position : "absolute"});
			this._resize =(function(object, fun) {
					return function() {return fun.apply(object, arguments);}
				})(this,function(){
				this.Lay.css({width:Math.max(scope.document.documentElement.scrollWidth, scope.document.documentElement.clientWidth) + "px",height:Math.max(scope.document.documentElement.scrollHeight, scope.document.documentElement.clientHeight) + "px"});
				})
		this.Lay.html('<iframe style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe>');
		}
	  },
	  SetOptions: function(options){
		this.options = {Color:"#333",Opacity:60,zIndex:900};
		jQuery.extend(this.options,options || {});
	  },
	  Show: function(){
		if(isIE6){ this._resize(); $(scope).resize(this._resize)}
		this.Lay.css({backgroundColor:this.Color,display:"block",position:"absolute"})
		if($.browser.msie) {this.Lay.css({filter : "alpha(opacity:" + this.Opacity + ")"})} else {this.Lay.css({opacity : this.Opacity / 100})}
	  },
	  Close: function(){
		this.Lay.css({display : "none"});
		if(isIE6){ $(scope).resize(function(){})}
	  }
};
var Bind = function(object, fun) {
	return function() {
		return fun.apply(object, arguments);
	}
};
$.pet_win.strhtml="<div id=\"pet_ledou_open\"><dl class=\"open_c\"><dt class=\"head\"><b></b><a class=\"close_a\"></a></dt>  <dd><iframe class=\"i_contant\" scrolling=\"true\" frameborder=\"0\" border=\"0\" allowtransparency=\"true\" src=\"\" ></iframe></dd></dl></div>";
$.pet_win.prototype={//弹出框模块顶级类
	  initialize: function(box, options){
		 this.Box = $(box);//显示层
		 this.SetOptions(options);
		 this._width= this.options.width;
		 this._height= this.options.height;
		 this._title=this.options.title; 
		 this.iframe_src=this.options.c_url;
		 this.onStar=this.options.onStar;//开始的附加程序
		 this.onEnd=this.options.onEnd;

		 this.Fixed = !!this.options.Fixed;
		 this.Over = !!this.options.Over;
		 this.Center = !!this.options.Center;
		 this.Isshow = false;//是否正在显示
         if(!scope.pet_ledou_obj){
		    if(this.Over) this.OverLay = new $.OverLay(options);//覆盖层			
		    this.pet_drag=new $.pet_drag(this.Box,{Handle:$("dt.head",this.Box)});//配置拖动
		 }this.Box.css({
		      zIndex:9999,display:"none",position:"absolute"}
			  );    
	    //兼容ie6用的属性
		if(isIE6){
			this._top = this._left = 0;
			this._fixed = Bind(this, function(){ this.Center ? this.SetCenter() : this.SetFixed(); });
		}
		 //给这个弹出框内所有的关闭按扭添加关闭事件
		 $("a.close_a",this.Box).each((function(obj){
		    return function(){
			   $(this).click(function(){
                   obj.C();
			   });		   
			   $(this).hover(function(){
			     $(this).addClass("close_a_hove");
			     },function(){
			     $(this).removeClass("close_a_hove");
			   });
			}
		 })(this));
		 $("b",$("dt.head",this.Box)).html(this._title);		 
         //this.Box.appendTo("body");//把框对象置入body
	  },
	  SetOptions: function(options){
		this.options = {//弹出框默认配置
		    Over:true,
			Fixed:true,
			Center:true,
			width:"500",
			height:"300",
			c_url:"",
		    title:"Q宠大乐斗",
			onStar:function(){},
			onEnd:function(){}
		 }
		$.extend(this.options, options || {});
	  },
	   //兼容ie6的固定定位程序
	  SetFixed: function(){
		this.Box[0].style.top = scope.document.documentElement.scrollTop - this._top + this.Box[0].offsetTop + "px";
		this.Box[0].style.left = scope.document.documentElement.scrollLeft - this._left + this.Box[0].offsetLeft + "px";	
		this._top = scope.document.documentElement.scrollTop; this._left = scope.document.documentElement.scrollLeft;
	  },
	  //兼容ie6的居中定位程序
	  SetCenter: function(){
		this.Box[0].style.marginTop = scope.document.documentElement.scrollTop - this.Box[0].offsetHeight / 2 + "px";
		this.Box[0].style.marginLeft = scope.document.documentElement.scrollLeft - this.Box[0].offsetWidth / 2 + "px";
	  },
	  S:function(options){

        var iframe=$("iframe.i_contant",this.Box);
		QZONE.FP.showMsgbox("数据加载中，请稍候......",1,1000);
		$("iframe.i_contant",this.Box).css({width:(parseInt(this._width)-3)+"px",height:(parseInt(this._height)-30)});
        iframe.attr({ src: this.iframe_src});
        $("iframe.i_contant",this.Box).css({width:"0px"});
		var loadOver=(function(obj){
		   return function(){
		     $("iframe.i_contant",obj.Box).css({width:(parseInt(obj._width)-3)+"px",height:(parseInt(obj._height)-30)});
  		   }
		})(this)
        if (iframe[0].attachEvent){
			iframe[0].attachEvent("onload", function(){
               loadOver();
			});
		} else {
			iframe[0].onload = function(){
               loadOver();
			};
		}

		 
		this.Box.css({width:(parseInt(this._width))+"px"});
        if(this.Isshow) return;   
	    this.Isshow=true;
		this.Box.css({position:(this.Fixed && !isIE6 ? "fixed" : "absolute"),display:"block"});
		this.Over && this.OverLay.Show();
		if(this.Center){
			this.Box.css({top:"50%",left:"50%"});
			if(this.Fixed){
				this.Box.css({marginTop:(-this.Box.height()/2+"px"),marginLeft:(-this.Box.width()/2+"px")});
			}else{
				this.SetCenter();
			}
		}
		//兼容ie6
		if(isIE6){
			//设置显示位置
			this.Center ? this.SetCenter() : this.Fixed && this.SetFixed();
			//设置定位
			this.Fixed && scope.attachEvent("onscroll", this._fixed);
	    }


		this.onStar();

	  },
	  C:function(){
	    this.Isshow=false;
		this.Box.css({display:"none"});
		this.OverLay.Close();
		if(isIE6){
			scope.detachEvent("onscroll", this._fixed);
		}
		this.onEnd();
		this.Box.css({width:"0px"});
	  }
};

var CurrentStyle = function(element){
	return element.currentStyle || scope.document.defaultView.getComputedStyle(element, null);
}
function addEventHandler(oTarget, sEventType, fnHandler) {
	if (oTarget.addEventListener) {
		oTarget.addEventListener(sEventType, fnHandler, false);
	} else if (oTarget.attachEvent) {
		oTarget.attachEvent("on" + sEventType, fnHandler);
	} else {
		oTarget["on" + sEventType] = fnHandler;
	}
};
function removeEventHandler(oTarget, sEventType, fnHandler) {
    if (oTarget.removeEventListener) {
        oTarget.removeEventListener(sEventType, fnHandler, false);
    } else if (oTarget.detachEvent) {
        oTarget.detachEvent("on" + sEventType, fnHandler);
    } else { 
        oTarget["on" + sEventType] = null;
    }
};
//拖放程序
$.pet_drag.prototype = {
  initialize: function(drag, options) {
	this.Drag = $(drag)[0];//拖放对象
	this._x = this._y = 0;//记录鼠标相对拖放对象的位置
	this._marginLeft = this._marginTop = 0;//记录margin	
	var object=this;//事件对象(用于绑定移除事件)
	this._fM = function(event){ return object.Move.call(object, (event || scope.event));}
	this._fS = function(){ return object.Stop.apply(object, arguments);	}
	this.limt = true;//是否拖动
	
	this.SetOptions(options);
	this._Handle = $(this.options.Handle)[0] || (this.limt=false);//如果找不到 class=head的dt 元素,那么,这个框不拖动
	$(this._Handle).mousedown(function(event){
	   return object.Start.call(object, (event || scope.event));
	})
  },
  //设置默认属性
  SetOptions: function(options) {
	this.options = {//默认值
		Handle:			""//设置触发对象（不设置则使用拖放对象）
	};
	$.extend(this.options, options || {});
  },
  //准备拖动
  Start: function(oEvent) {
    if(!this.limt) return;
	//记录鼠标相对拖放对象的位置
	this._x = oEvent.clientX - this.Drag.offsetLeft;
	this._y = oEvent.clientY - this.Drag.offsetTop;
	//记录margin
	this._marginLeft = parseInt(CurrentStyle(this.Drag).marginLeft) || 0;
	this._marginTop = parseInt(CurrentStyle(this.Drag).marginTop) || 0;
	//mousemove时移动 mouseup时停止
	addEventHandler(scope.document, "mousemove", this._fM);
	addEventHandler(scope.document, "mouseup", this._fS);
	if($.browser.msie){
		//焦点丢失
		addEventHandler(this._Handle, "losecapture", this._fS);
		//设置鼠标捕获
		this._Handle.setCapture();
	}else{
		//焦点丢失
		addEventHandler(scope, "blur", this._fS);
		//阻止默认动作
		oEvent.preventDefault();
	};
  },
  //拖动
  Move: function(oEvent) {
	//清除移动的时候文本的选择
	scope.getSelection ? scope.getSelection().removeAllRanges() : scope.document.selection.empty();
	//设置移动参数
	var iLeft = oEvent.clientX - this._x, iTop = oEvent.clientY - this._y;
	//设置位置，并修正margin
	this.Drag.style.left = iLeft - this._marginLeft + "px";
	this.Drag.style.top = iTop - this._marginTop + "px";
  },
  //停止拖动
  Stop: function() {
	//移除事件
	removeEventHandler(scope.document, "mousemove", this._fM);
	removeEventHandler(scope.document, "mouseup", this._fS);
	if($.browser.msie){
		removeEventHandler(this._Handle, "losecapture", this._fS);
		this._Handle.releaseCapture();
	}else{
		removeEventHandler(scope, "blur", this._fS);
	};
  }
};
function scopeaddStyle(content)   
{   
    var style;   
    if(document.all)    //IE   
    {   
        style = scope.document.createStyleSheet();   
        style.cssText = content;   
    }   
    else  
    {   
        style = scope.document.createElement("style");    
        style.type = "text/css";    
        //style.innerHTML = content;//Safari、Chrome 下innerHTML只读   
        style.textContent = content;   
    }   
    try{scope.document.getElementsByTagName("head")[0].appendChild(style);}catch(e){}//IE Error:不支持此接口   
} 