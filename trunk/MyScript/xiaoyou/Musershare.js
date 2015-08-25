var FBrowser = {};
var Browser = {};
Browser.isIE = ((navigator.userAgent.indexOf('MSIE') == -1) ? false: true);
Browser.isIE7 = ((FBrowser.isIE && window.XMLHttpRequest) ? true: false);
FBrowser.isIE = ((navigator.userAgent.indexOf('MSIE') == -1) ? false: true);
FBrowser.isIE7 = ((FBrowser.isIE && window.XMLHttpRequest) ? true: false);
FBrowser.isIE6 = ((FBrowser.isIE && !window.XMLHttpRequest && window.ActiveXObject) ? true: false);
FBrowser.isFirefox = ((navigator.userAgent.indexOf('Firefox') == -1) ? false: true);
FBrowser.isOpera = ((navigator.userAgent.indexOf('Opera') == -1) ? false: true);
FBrowser.isSafari = ((navigator.userAgent.toLowerCase().indexOf('webkit')) == -1 ? false: true);
String.prototype.lTrim = function() {
    return this.replace(/^\s*/, "");
}
String.prototype.rTrim = function() {
    return this.replace(/\s*$/, "");
}
String.prototype.trim = function() {
    return this.rTrim().lTrim();
}
String.prototype.hasChinese = function() {
    return /[^\x00-\xff]/g.test(this);
}
String.prototype.onlyChinese = function() {
    return /^[\u0391-\uFFE5]+$/g.test(this);
}
String.prototype.hash_filter = function() {
    return this.replace(/[^a-f0-9]/gi, '');
}
String.prototype.getLength = function() {
    return this.replace(/[^\x00-\xff]/gi, 'xxx').length;
}
function Fstr_pad(s, n, pad) {
    if (s.length >= length) return s;
    var p = n - s.length;
    for (var i = 0; i < p; i++) s = pad + '' + s;
    return s;
}
function Farray_exist(d, v) {
    for (var i = 0; i < d.length; i++) {
        if (d[i] == v) return true;
    }
    return false;
}
window.clearRunInterval = window.clearInterval;
window.clearRunTimeout = window.clearTimeout;
window.setRunTimeout = function(fn, dt) {
    if (typeof(fn) != 'function') return false;
    var p = new Array();
    if (arguments.length > 2) {
        for (var i = 2; i < arguments.length; i++) p[i - 2] = arguments[i];
    }
    var f = function() {
        fn.apply(null, p)
    }
    return window.setTimeout(f, dt);
}
window.setRunInterval = function(fn, dt) {
    if (typeof(fn) != 'function') return false;
    var p = new Array();
    if (arguments.length > 2) {
        for (var i = 2; i < arguments.length; i++) p[i - 2] = arguments[i];
    }
    var f = function() {
        fn.apply(null, p)
    }
    return window.setInterval(f, dt);
}
function Fid(id) {
    return document.getElementById(id);
}
function Fname(name) {
    return document.getElementsByName(name);
}
function FtagName(name) {
    return document.getElementsByTagName(name);
}
function Fempty(v) {
    if (v != null && (typeof(v) == 'object' || typeof(v) == 'function')) return false;
    return (("" == v || undefined == v || null == v) ? true: false);
}
function FxmlEncode(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\'/g, "&apos;").replace(/\"/g, "&quot;");
}
function FgetURLArgs() {
    var q = location.search.substring(1).replace("&amp;", "&").split("&");
    var p = new Object();
    for (var i = 0; i < q.length; i++) {
        var pos = q[i].indexOf('=');
        if ( - 1 == pos) continue;
        p[q[i].substring(0, pos)] = unescape(q[i].substring(pos + 1));
    }
    return p;
}
function FisTagName(e, tagName) {
    return ((e.tagName.toUpperCase() == tagName.toUpperCase()) ? true: false);
}
function FaddOptionToSelect(id, txt, v, selected) {
    var e = Fid(id);
    if (Fempty(e) || !FisTagName(e, 'select')) return false;
    var s = ((undefined == selected || true != selected) ? false: true);
    e.options[e.options.length] = new Option(txt, v, s, false);
    return true;
}
function FclearOptionsOfSelect(id) {
    var e = Fid(id);
    if (Fempty(e) || !FisTagName(e, 'select')) return false;
    for (var i = e.length; i >= 0; i--) e.options[i] = null;
}
function FsetValuesOfSelect(id, v, stat) {
    var e = Fid(id);
    var v1 = new Array();
    if (Fempty(e) || !FisTagName(e, 'select')) return false;
    if (typeof(v) != 'object') {
        v1[0] = v;
    } else {
        v1 = v;
    }
    for (var i = 0; i < e.options.length; i++) {
        e.options[i].selected = false;
        if (Fempty(v1)) e.options[i].selected = stat;
        else if (Farray_exist(v1, e.options[i].value)) e.options[i].selected = stat;
    }
}
function FgetValuesOfSelect(id, type) {
    var e = Fid(id);
    if (Fempty(e) || !FisTagName(e, 'select')) return null;
    var v = new Array();
    for (var i = 0,
    j = 0; i < e.options.length; i++) {
        if (true == e.options[i].selected) v[j++] = (type && type == 'inner') ? e.options[i].innerHTML: e.options[i].value;
    }
    return ((1 == v.length) ? v[0] : v)
}
function FsetValuesOfCheckbox(name, v, stat) {
    var e = Fname(name);
    if ('Array' != typeof(v) && !Fempty(v)) v = new Array(v);
    for (var i = 0; i < e.length; i++) {
        if (Fempty(e[i]) || e[i].type != 'checkbox') continue;
        e[i].checked = false;
        if (Fempty(v)) e[i].checked = stat;
        else if (Farray_exist(v, e[i].value)) e[i].checked = stat;
    }
}
function FgetValuesOfCheckbox(name) {
    var e = Fname(name);
    var v = new Array();
    for (var i = 0; i < e.length; i++) {
        if (Fempty(e[i]) || e[i].type != 'checkbox') continue;
        if (e[i].checked == true) v[v.length] = e[i].value;
    }
    return v;
}
function FsetValueOfRadio(name, v) {
    var e = Fname(name);
    for (var i = 0; i < e.length; i++) {
        if (Fempty(e[i]) || e[i].type != 'radio') continue;
        if (e[i].value == v) e[i].checked = true;
    }
}
function FgetValueOfRadio(name) {
    var e = Fname(name);
    for (var i = 0; i < e.length; i++) {
        if (e[i].type != 'radio') continue;
        if (e[i].checked == true) return e[i].value;
    }
    return null;
}
function FgetCookie(name) {
    var r = new RegExp("(^|;|\\s+)" + name + "=([^;]*)(;|$)");
    var m = document.cookie.match(r);
    return (!m ? "": m[2]);
}
function FaddCookie(name, v, path, expire, domain, noescape) {
    var s = name + "=" + ((noescape) ? v: escape(v));
    if (!Fempty(path)) path = "/";
    if (expire > 0) {
        var d = new Date();
        d.setTime(d.getTime() + expire * 1000);
        if (!Fempty(domain)) s = s + "; path=" + path + "; domain=" + domain + "; expires=" + d.toGMTString();
        else s = s + "; path=" + path + "; expires=" + d.toGMTString();
    }
    document.cookie = s;
}
function FdeleteCookie(name, domain) {
    if (!Fempty(domain)) document.cookie = name + "=; path=/; domain=" + domain + "; expires=Fri, 02-Jan-1970 00:00:00 GMT";
    else document.cookie = name + "=; path=/; expires=Fri, 02-Jan-1970 00:00:00 GMT";
}
function Fcookie(document, name, hours, path, domain, secure) {
    this.$document = document;
    this.$name = name;
    if (hours) this.$expiration = new Date((new Date()).getTime() + hours * 3600000);
    else this.$expiration = null;
    if (path) this.$path = path;
    else this.$path = null;
    if (domain) this.$domain = domain;
    else this.$domain = null;
    if (secure) this.$secure = true;
    else this.$secure = false;
}
Fcookie.prototype.store = function() {
    var cookieval = "";
    for (var prop in this) {
        if ((prop.charAt(0) == '$') || ((typeof this[prop]) == 'function')) continue;
        if (cookieval != "") cookieval += '&';
        cookieval += prop + ':' + escape(this[prop]);
    }
    var cookie = this.$name + '=' + cookieval;
    if (this.$expiration) cookie += '; expires=' + this.$expiration.toGMTString();
    if (this.$path) cookie += '; path=' + this.$path;
    if (this.$domain) cookie += '; domain=' + this.$domain;
    if (this.$secure) cookie += '; secure';
    this.$document.cookie = cookie;
}
Fcookie.prototype.load = function() {
    var allcookies = this.$document.cookie;
    if (allcookies == "") return false;
    var start = allcookies.indexOf(this.$name + '=');
    if (start == -1) return false;
    start += this.$name.length + 1;
    var end = allcookies.indexOf(';', start);
    if (end == -1) end = allcookies.length;
    var cookieval = allcookies.substring(start, end);
    var a = cookieval.split('&');
    for (var i = 0; i < a.length; i++) a[i] = a[i].split(':');
    for (var i = 0; i < a.length; i++) {
        this[a[i][0]] = unescape(a[i][1]);
    }
    return true;
}
Fcookie.prototype.remove = function() {
    var cookie = this.$name + '=';
    if (this.$path) cookie += '; path=' + this.$path;
    if (this.$domain) cookie += '; domain=' + this.$domain;
    cookie += '; expires=Fri, 02-Jan-1970 00:00:00 GMT';
    this.$document.cookie = cookie;
}
function FgetEventTarget(evt) {
    return evt.target || evt.srcElement;
}
function FgetEvent(evt) {
    evt = evt || window.event;
    if (!evt) {
        var c = this.getEvent.caller;
        while (c) {
            evt = c.arguments[0];
            if (evt && Event == evt.constructor) {
                break;
            }
            c = c.caller;
        }
    }
    return evt;
}
function FisLeftKeyDown(evt) {
    return (((evt.which) && (evt.which == 1)) || ((evt.button) && (evt.button == 1)));
}
function FaddEvent(e, evt, fn, isID) {
    if (isID == true) e = Fid(e);
    if (!Fempty(e.attachEvent) && (typeof(e.attachEvent) == "function" || typeof(e.attachEvent) == "object")) e.attachEvent("on" + evt, fn);
    else if (!Fempty(e.addEventListener) && (typeof(e.addEventListener) == "function" || typeof(e.addEventListener) == "object")) e.addEventListener(evt, fn, false);
}
function FremoveEvent(e, evt, fun, isID) {
    if (isID == true) e = Fid(e);
    if (!Fempty(e.detachEvent) && (typeof(e.detachEvent) == "function" || typeof(e.detachEvent) == "object")) e.detachEvent("on" + evt, fun);
    else if (!Fempty(e.removeEventListener) && (typeof(e.removeEventListener) == "function" || typeof(e.removeEventListener) == "object")) e.removeEventListener(evt, fun, false);
}
function FstopEventTransfer(evt) {
    if (evt.preventDefault) {
        evt.stopPropagation();
        evt.preventDefault();
    } else {
        evt.returnValue = false;
        evt.cancelBubble = true;
    }
}
function FstopObjectEventTransfer(e, evts) {
    if (Fempty(e) || Fempty(evts)) return;
    var l = evts.split(",");
    for (var i = 0; i < l.length; i++) {
        var evt = l[i].trim();
        if (Fempty(evt)) continue;
        var fn = function(event) {
            event = FgetEvent(event);
            FstopEventTransfer(event);
        }
        FaddEvent(e, evt, fn);
    }
}
function FsetEventCapture(target) {
    if (target.setCapture) target.setCapture();
    else {
        if (!FBrowser.isFirefox && document.captureEvents) document.captureEvents(Event.MouseMove | Event.MouseUp);
    }
}
function FreleaseEventCapture(target) {
    if (target.releaseCapture) target.releaseCapture();
    else {
        if (!FBrowser.isFirefox && document.releaseEvents) document.releaseEvents(Event.MouseMove | Event.MouseUp);
    }
}
function FgetWindowSize() {
    if (FBrowser.isOpera) return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
    };
    else if (FBrowser.isIE6) return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
    };
    else return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    };
}
function FgetPageSize() {
    if (FBrowser.isIE6) return {
        width: document.body.scrollWidth,
        height: document.body.scrollHeight
    };
    return {
        width: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight
    };
}
function FgetUrlParam() {
    var locurl = location.href;
    var start = locurl.indexOf("?");
    var end = locurl.length;
    var request = {};
    if (start != -1) {
        var tempstr = locurl.substring(start + 1, end) tempstr = tempstr.split("&");
        var temp;
        for (var i = 0; i < tempstr.length; i++) {
            temp = tempstr[i].split("=");
            if (temp.length == 2) {
                request[temp[0]] = temp[1];
            }
        }
    }
    return request;
}
function FgetScrollPostion() {
    if (FBrowser.isIE6) return {
        left: document.body.scrollLeft,
        top: document.body.scrollTop
    };
    return {
        left: document.documentElement.scrollLeft,
        top: document.documentElement.scrollTop
    };
}
function FgetPointerPostion(evt) {
    if (evt.pageX || evt.pageY) return {
        x: evt.pageX,
        y: evt.pageY
    };
    return {
        x: evt.clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft,
        y: evt.clientY + document.documentElement.scrollTop - document.documentElement.clientTop
    };
}
function FgetPostion(e, isID) {
    if (isID == true) e = Fid(e);
    var left = 0,
    top = 0,
    w = e.offsetWidth,
    h = e.offsetHeight;
    do {
        top += e.offsetTop || 0;
        left += e.offsetLeft || 0;
        e = e.offsetParent;
    } while ( e );
    return {
        x: left,
        y: top,
        width: w,
        height: h
    };
}
function FsetPostion(e, x, y, w, h, isID) {
    if (isID == true) e = Fid(e);
    if (e.style.position == "absolute") {
        e.style.left = x + "px";
        e.style.top = y + "px";
    } else if (e.style.position == "relative") {
        var p = FgetPostion(e.offsetParent);
        e.style.left = (x - p.x) + "px";
        e.style.top = (y - p.y) + "px";
    }
    if (w >= 0) e.style.width = w + "px";
    if (h >= 0) e.style.height = h + "px";
}
function FgetOffsetPostion(e1, e2) {
    var p1 = FgetPostion(e1);
    var p2 = FgetPostion(e2);
    return {
        x: (p1.x - p2.x),
        y: (p1.y - p2.y)
    };
}
function FsetOffsetPostion(e1, e2, x, y, isID) {
    if (isID == true) {
        e1 = Fid(e1);
        e2 = Fid(e2);
    }
    var p = FgetPostion(e2);
    FsetPostion(e1, x + p.x, y + p.y);
}
function FsetOffsetPostionByRate(e1, e2, nx, ny, isID) {
    if (isID == true) {
        e1 = Fid(e1);
        e2 = Fid(e2);
    }
    var s1 = FgetPostion(e1);
    var s2 = FgetPostion(e2);
    FsetPostion(e1, (s2.x + (s2.width - s1.width) / nx), (s2.y + (s2.height - s1.height) / ny), -1, -1);
}
function FsetOffsetWindowPostion(e, x, y, isID) {
    if (isID == true) e = Fid(e);
    var p = FgetScrollPostion();
    FsetPostion(e, x + p.left, y + p.top, -1, -1);
}
function FsetOffsetWindowPostionByRate(e, nx, ny, isID) {
    if (isID == true) e = Fid(e);
    var s = FgetWindowSize();
    FsetOffsetWindowPostion(e, (s.width - e.offsetWidth) / nx, (s.height - e.offsetHeight) / ny);
}
function FhasSameParent(e1, e2, isID) {
    if (isID == true) {
        e1 = Fid(e1);
        e2 = Fid(e2);
    }
    if (Fempty(e1) || Fempty(e2)) return false;
    return (e1.parentNode == e2.parentNode);
}
function FsetStyleFloat(e, v, isID) {
    if (isID == true) e = Fid(e);
    if (e.style.styleFloat != undefined) e.style.styleFloat = v;
    else e.style.cssFloat = v;
}
function FgetAttr(e, isID, name) {
    if (isID == true) e = Fid(e);
    return e.getAttribute(name);
}
function FisSameUrl(u1, u2) {
    if (u1 == u2) return true;
    var d1 = document.location.host;
    var d2 = d1;
    var re = /^(http:\/\/([^\/]+))?([\S]*)$/i;
    var p1 = u1.match(re);
    if (!Fempty(p1[2])) d1 = p1[2];
    var p2 = u2.match(re);
    if (!Fempty(p2[2])) d2 = p2[2];
    return ((d1 == d2 && p1[3] == p2[3]) ? true: false);
}
function FloadJS(url, sucfn, failfn, head_tag, char_set) {
    head_tag = (head_tag) ? head_tag: 'SCRIPT';
    var l = FtagName(head_tag);
    for (var i = 0; i < l.length; i++) {
        if (l[i].src && FisSameUrl(l[i].src, url)) {
            sucfn();
            return;
        }
    }
    var js = document.createElement("script");
    js.type = "text/javascript";
    if (char_set) {
        js.charset = char_set;
    }
    js.src = url;
    var h = FtagName('HEAD').item(0);
    h.appendChild(js);
    if (FBrowser.isIE) {
        js.onreadystatechange = function() {
            if (this.readyState.toLowerCase() != "complete" && this.readyState.toLowerCase() != "loaded") return;
            if (this.$funExeced != true && !Fempty(sucfn) && 'function' == typeof(sucfn)) {
                this.$funExeced = true;
                sucfn();
            }
        }
    } else if (FBrowser.isOpera) {
        if (!Fempty(sucfn) && 'function' == typeof(sucfn)) sucfn();
    } else {
        js.onload = function() {
            if (!Fempty(sucfn) && 'function' == typeof(sucfn)) sucfn();
        }
    }
    js.onerror = function() {
        h.removeChild(js);
        if (!Fempty(failfn) && 'function' == typeof(failfn)) failfn();
    }
}
function array_search(arr, sw) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == sw) {
            return i;
        }
    }
    return - 1;
}
function array_remove(arr, dx) {
    if (isNaN(dx) || dx > arr.length) {
        return arr;
    }
    arr.splice(dx, 1);
    return arr;
}
function FremoveElement(eid) {
    var e = Fid(eid);
    if (e) {
        e.parentNode.removeChild(e);
    }
}
function obj_clone(old_obj) {
    var newObj = new Object();
    for (elements in old_obj) {
        newObj[elements] = old_obj[elements];
    }
    return newObj;
}
function DrawImage(ImgD, img_width, img_height) {
    var image = new Image();
    image.src = ImgD.src;
    if (img_width <= 0 && img_height <= 0) {
        return;
    }
    var draw_type = 0;
    if (img_width > 0 && img_height > 0) {
        draw_type = (ImgD.width / img_width >= ImgD.height / img_height) ? 1 : 2;
    } else if (img_width > 0 && img_height <= 0) {
        draw_type = 1;
    } else {
        draw_type = 2;
    }
    if (draw_type == 1) {
        if (image.width > img_width) {
            ImgD.width = img_width;
            ImgD.height = (image.height * img_width) / image.width;
        } else {
            ImgD.width = image.width;
            ImgD.height = image.height;
        }
    } else if (draw_type == 2) {
        if (image.height > img_height) {
            ImgD.height = img_height;
            ImgD.width = (image.width * img_height) / image.height;
        } else {
            ImgD.width = image.width;
            ImgD.height = image.height;
        }
    }
}
function Fshow(id) {
    if (Fid(id)) Fid(id).style.display = '';
}
function Fhide(id) {
    if (Fid(id)) Fid(id).style.display = 'none';
}
function FvaildateUin(uin) {
    var R = /^[1-9]\d{4,11}$/;
    return R.test(uin);
}
function FgetUin() {
    var uin = parseInt(FgetCookie("zzpaneluin"));
    if (FvaildateUin(uin)) return uin;
    var R = /^o(0)*/;
    uin = FgetCookie("uin");
    uin = parseInt(uin.replace(R, ''));
    return ((FvaildateUin(uin)) ? uin: false)
}
function FisLogon() {
    var uin = FgetUin();
    return (uin == false) ? false: true;
}
var gqbardomain = "qbar.qq.com";
function HtmlFilter(str) {
    str = str.replace(/\<(.*?)\>/g, '', str);
    str = str.replace(/\<\/(.*?)\>/g, '', str);
    return str;
}
function get_split_time(ts) {
    var cur_ts = Math.floor(new Date().getTime() / 1000);
    var split_ts = Math.abs(cur_ts - ts);
    if (split_ts <= (5 * 60)) return '刚刚';
    else if (split_ts > (5 * 60) && split_ts <= (60 * 60)) return Math.round(split_ts / 60) + '分钟前';
    else if (split_ts > (60 * 60) && split_ts <= (24 * 60 * 60)) return Math.round(split_ts / 3600) + '小时前';
    else if (split_ts > (24 * 60 * 60) && split_ts <= (7 * 24 * 60 * 60)) return Math.round(split_ts / 86400) + '天前';
    else if (split_ts > (7 * 24 * 60 * 60) && split_ts <= (4 * 7 * 24 * 60 * 60)) return Math.round(split_ts / 604800) + '星期前';
    else {
        var t = new Date(ts * 1000);
        function y2k(number) {
            return (number < 1000) ? number + 1900 : number;
        }
        return y2k(t.getYear()) + '-' + (t.getMonth() + 1) + '-' + t.getDate();
    }
}
function isChEnNumUnderline(str) {
    if (str.trim().length == 0) {
        return true;
    }
    str = str.trim().replace(/[\u4e00-\u9fa5a-zA-z0-9\x21-\x7e\ufe30-\uffa0\u3000-\u303F\uFE10-\uFE1F\uFE30-\uFE4F。（）――+%#￥@……&×～【】\s《》“”？！-]/gi, "");
    return (str.length == 0);
}
function clearFile(fileid) {
    var obj = Fid(fileid);
    if (obj) obj.outerHTML = obj.outerHTML;
}
var g_post_Iframe_div_id = 'g_post_iframe',
g_Iframe_div;
function g_post_Iframe(id, get) {
    this.id = id;
    if (!this.iframe_div) {
        this.init_post_div();
    }
    this.busy = false;
    this.mothod = (undefined == get) ? 'post': get;
}
g_post_Iframe.prototype.set = function(callback, url, params, is_frameElement) {
    var input_html = ('post' == this.mothod) ? g_make_inputs(params) : '';
    document.body.appendChild(this.iframe_div);
    this.iframe_div.innerHTML = '<form target="' + this.id + '_post_iframe" id="' + this.id + '_post_form" method="' + this.mothod + '" action="' + url + '">' + input_html + '</form><iframe id="' + this.id + '_post_iframe" name="' + this.id + '_post_iframe"></iframe>';
    var self = this;
    this.is_frameElement = is_frameElement;
    this.form = Fid(this.id + '_post_form');
    this.iframe = Fid(this.id + '_post_iframe');
    this.cb = callback;
    if (is_frameElement) this.iframe.callback = callback;
    if (typeof document.addEventListener == "function") {
        self.iframe.addEventListener("load",
        function() {
            self.callback();
            return true;
        },
        false);
    } else {
        self.iframe.attachEvent("onload",
        function() {
            self.callback();
            return true;
        });
    }
}
g_post_Iframe.prototype.callback = function() {
    if (true == this.busy) {
        this.busy = false;
        if (!this.is_frameElement) this.cb(this.iframe.contentWindow);
    }
    var self = this;
    if (typeof document.addEventListener == "function") {
        self.iframe.removeEventListener("load",
        function() {
            self.callback();
            return true;
        },
        false);
    } else {
        self.iframe.detachEvent("onload",
        function() {
            self.callback();
            return true;
        });
    }
}
g_post_Iframe.prototype.send = function() {
    if (false == this.busy) {
        this.busy = true;
        this.form.submit();
        return true;
    } else {
        return false;
    }
}
g_post_Iframe.prototype.init_post_div = function() {
    this.iframe_div = document.createElement("div");
    this.iframe_div.style.display = "none";
}
function g_make_inputs(params) {
    var _h = '',
    tmp = params.split('&');
    for (var i = 0; i < tmp.length; i++) {
        var t = tmp[i].split("=");
        if (t.length != 2) continue;
        t[1] = decodeURIComponent(t[1]);
        t[1] = t[1].replace(/&/g, '&amp;');
        t[1] = t[1].replace(/"/g, '&quot;');
        _h += '<input type="hidden" name="' + t[0] + '" value="' + t[1] + '" />';
    }
    return _h;
}
var img_id_unique = 0;
function switch_imgs() {
    var imgs = document.getElementsByTagName('IMG');
    for (var i = 0; i < imgs.length; i++) {
        var rel = imgs[i].getAttribute('rel') if (rel) {
            img_id_unique++;
            imgs[i].id = 'img_id_unique_' + img_id_unique;
            var img = new Image();
            img.src = rel;
            img.id = imgs[i].id + '_tmp';
            img.onload = function() {
                document.getElementById(this.id.replace('_tmp', '')).src = this.src;
            }
        }
    }
}
var objSelector = null;
var allSelected = [];
var selectorCb = null;
document.domain = 'qq.com';
function ShowSelector(callback, ordobj, multisel, sstyle, option) {
    if (typeof(callback) == 'undefined') {
        return false;
    }
    var op = {
        'bit': 0,
        'selectorEmpty': false,
        'pre_selected': []
    };
    J.extend(op, option);
    window.selectorCb = callback;
    G_V.ss_pre_selected_arr = op.pre_selected;
    G_V.selectorEmpty = op.selectorEmpty;
    height = multisel ? 350 : 280;
    global_frame_new('选择好友', '<iframe src="http://' + DOMAINS.MAIN + '/index.php?mod=selector&bit=' + op.bit + '&m=' + (multisel ? 1 : 0) + '&' + 's=' + (sstyle ? sstyle: 'fc') + '" style="width:100%; height:' + height + 'px; overflow-x:hidden; border:0;" scrolling="no" frameborder="no" id="fselector" name="fselector"></iframe>', {
        wid: "fcselector",
        div_width: multisel ? 405 : 167,
        div_height: multisel ? 400 : 330,
        submit_callback: function() {
            ss_select_done(true);
        },
        submit_not_close: true
    });
}
function ss_select(itemid) {
    var i;
    var b = false;
    var item = Fid(itemid);
    var frm = window.parent.document.getElementById('fselector');
    for (i = allSelected.length - 1; i >= 0; i--) {
        if (allSelected[i]['itemid'] == itemid) {
            b = true;
            break;
        }
    }
    if (b) {
        allSelected.splice(i, 1);
        item.className = '';
    } else {
        allSelected.push({
            'itemid': itemid,
            'u': item.getAttribute('myuin'),
            'name': item.getAttribute('myname')
        });
        item.className = 'select_li';
        if (!frm.multisel && allSelected.length > 1) {
            ss_select(allSelected[0]['itemid']);
        }
    }
}
function mul_ss_select(itemid) {
    var i;
    var b = false;
    var item = Fid(itemid),
    item_u = J('#' + itemid).attr('myuin');
    for (i = allSelected.length - 1; i >= 0; i--) {
        if (allSelected[i]['u'] == item_u) {
            b = true;
            break;
        }
    }
    if (!b) {
        allSelected.push({
            'itemid': itemid,
            'u': item.getAttribute('myuin'),
            'name': item.getAttribute('myname')
        });
        J("#mul_selected_all").append('<li id="mul_selected_' + itemid + '" on>' + item.getAttribute('myname') + ' <button type="button" class="bt_del" onclick="del_selected_item(\'' + itemid + '\')"><span>删除</span></button></li>');
        var cur_num = parseInt(J("#choose_fri_num").html());
        J("#choose_fri_num").html(cur_num + 1);
    }
}
function del_selected_item(itemid) {
    for (i = allSelected.length - 1; i >= 0; i--) {
        if (allSelected[i]['itemid'] == itemid) {
            allSelected.splice(i, 1);
            break;
        }
    }
    J("#mul_selected_" + itemid).remove();
    var cur_num = parseInt(J("#choose_fri_num").html());
    if (cur_num > 0) {
        J("#choose_fri_num").html(cur_num - 1);
    }
}
function ss_select_done(is_done) {
    var wrapAllSelected = document.getElementById("fselector").contentWindow.allSelected;
    if (is_done) {
        if (!G_V.selectorEmpty && wrapAllSelected.length == 0) {
            alert('请选择一个好友或同学！');
            return false;
        }
        if (typeof(selectorCb) == 'function') {
            if (!selectorCb(wrapAllSelected)) {
                return false;
            }
        }
    }
    close_frame("fcselector");
    return false;
}
function ss_show_tips(obj, is_blur) {
    if (typeof(obj.org_text) == 'undefined') {
        obj.org_text = obj.value;
    }
    if (is_blur && obj.value == '') {
        obj.value = obj.org_text;
    } else if (!is_blur && obj.value == obj.org_text) {
        obj.value = '';
    }
}
function ss_search(clr) {
    var i, c;
    var skey;
    var ssbox = Fid('ss_search_box');
    if (typeof(ssbox.org_text) == 'undefined') {
        ssbox.org_text = ssbox.value;
    }
    if (clr) {
        ssbox.value = '';
        skey = '';
        ss_show_tips(ssbox, true);
    } else {
        skey = ssbox.value.trim();
    }
    if (skey == '') {
        Fid('btn_nosearch').style.display = 'none';
    } else {
        Fid('btn_nosearch').style.display = '';
    }
    var uls = document.getElementsByTagName('UL');
    var uln = uls.length;
    for (c = 0; c < uln; c++) {
        var classid = uls[c].getAttribute('myclassid');
        if (typeof(classid) != 'string') {
            continue;
        }
        var n = uls[c].childNodes.length;
        var g = Fid('ss_group_id_' + classid);
        g.style.display = 'none';
        for (i = 0; i < n; i++) {
            var item = uls[c].childNodes[i];
            if (item.nodeType == 1) {
                if (skey == '' || skey == ssbox.org_text || item.getAttribute('myname').toString().indexOf(skey) > -1) {
                    item.style.display = '';
                    g.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            }
        }
        if (J("#ss_search_box").attr("value") != '') {
            mul_show(classid);
        } else {
            mul_hide(classid);
        }
        if (clr) {
            mul_hide(classid);
        }
    }
}
function mul_show(groupid) {
    var group = Fid('ss_group_id_' + groupid);
    var item = Fid('ss_group_item_' + groupid);
    group.className = 'on';
    item.style.display = '';
}
function mul_hide(groupid) {
    J("#ss_group_id_" + groupid).removeClass();
    J("#ss_group_item_" + groupid).hide();
}
function ss_select_panel(objname) {}
function ss_list_expand(groupid) {
    var group = Fid('ss_group_id_' + groupid);
    var item = Fid('ss_group_item_' + groupid);
    if (group.className == 'classmate_h5') {
        group.className = 'select_h5';
        item.style.display = '';
    } else {
        group.className = 'classmate_h5';
        item.style.display = 'none';
    }
}
function mul_ss_list_expand(groupid) {
    var group = Fid('ss_group_id_' + groupid);
    var item = Fid('ss_group_item_' + groupid);
    if (group.className == '') {
        group.className = 'on';
        item.style.display = '';
    } else {
        group.className = '';
        item.style.display = 'none';
    }
}
function ss_showme() {
    window.parent.J('fselector').show();
}
window.userShare = {
    'shareReplyBoxId': 's_replyBox',
    'total_comment': 0,
    'comment_perpage': 10,
    'comment_page': 1,
    'showOneComment': function(u, sid) {
        var fullid = u + '_' + sid,
        sobj = J('#ushare_comment_' + fullid);
        if (sobj.attr('loaded') == '1') {
            sobj.toggle();
        } else {
            sobj.attr('loaded', '1');
            var cb = function(d) {
                var _t = '<div id="' + userShare.shareReplyBoxId + fullid + '_list">';
                if (d.result && d.result.comments && d.result.comments.length > 0) {
                    var l = d.result.comments.length;
                    if (l && l > 3) _t += '<div class="item_num" onclick="J(this).parent().find(\'div.item_hide\').show(); J(this).remove();"><a href="#" class="reply_fold" onclick="return false">显示全部' + l + '条评论</a></div>';
                    for (var i = 0,
                    l = d.result.comments.length; i < l; i++) {
                        var comment = d.result.comments[i];
                        _t += GbuildReplyListView(comment.uininfo, comment.split_time, comment.content, {
                            'is_hide': (l > (i + 3))
                        });
                    }
                }
                _t += '</div>';
                _t += GbuildReplyLiteBox(fullid, 'userShare.shareReplyBox', userShare.shareReplyBoxId);
                sobj.html(_t).show();
            };
            userShare.getShareComment(u, sid, cb);
        }
    },
    'shareReplyBox': function(fullid) {
        var tmp = fullid.split('_'),
        u = tmp[0],
        sid = tmp[1];
        var cb = function(content, f) {
            userShare.postComment(u, sid, content, null,
            function() {
                var copy_v = _getNameValue(f, 'copy');
                if (copy_v) J.post_api('/index.php?mod=usershare&act=copy', {
                    'u': u,
                    'share': sid
                });
            });
        };
        var after_btn = '<span class="checkbox"><input type="checkbox" name="copy" value="1" />分享给其它好友和同学</span>';
        GbuildReplyItem(userShare.shareReplyBoxId + fullid, cb, {
            'word_limit': 100,
            'after_btn': after_btn
        });
    },
    'getShareComment': function(u, sid, cb, option) {
        var _cb = function(d) {
            cb(d);
        };
        var op = {
            'page': -1,
            'perpage': 10,
            'order': 'desc'
        };
        J.extend(op, option);
        J.xyjsonp('GetShareComment_' + sid, 'http://' + DOMAINS.API + '/jsonp.php', {
            'mod': 'usershare',
            'act': 'getcomm',
            'u': u,
            'sid': sid,
            'page': op.page,
            'perpage': op.perpage,
            'order': op.order
        },
        _cb);
    },
    'delComment': function(u, sid, cid, chash, force) {
        if (!force) return html_confirm_frame('温馨提示', '确定要删除该评论吗？',
        function() {
            userShare.delComment(u, sid, cid, chash, 1);
        });
        var cb = function(d) {
            if (d.err) return html_loading_frame(d.msg);
            userShare.getShareComment(u, sid, usershare_comment_show, {
                'page': userShare.comment_page,
                'order': 'asc'
            });
            html_loading_frame('删除成功');
        };
        J.post_api('/index.php?mod=usershare&act=delcomm', {
            'sid': sid,
            'commentid': cid,
            'authorhash': chash
        },
        cb, 'json');
    },
    'postComment': function(u, sid, content, cb, success_cb) {
        var fullid = u + '_' + sid;
        if (!cb) {
            cb = function(d) {
                inputEnable();
                if (!d) return html_loading_frame('系统错误，请稍后再试');
                if (d.err) return html_loading_frame(d.msg);
                html_loading_frame('评论成功');
                GbuildCloseReplyItem();
                J('#' + userShare.shareReplyBoxId + fullid + '_list').prepend(GbuildReplyListView(d.result.uininfo, null, ubbLiteReplace(content, {
                    'xss': true
                }))).hide().fadeIn();
                if (typeof success_cb == 'function') success_cb();
            };
        }
        if (content.length == 0) return html_loading_frame('请输入评论内容');
        inputDisable();
        J.post_api('/index.php', {
            'mod': 'usershare',
            'act': 'comm',
            'u': u,
            'share': sid,
            'comm': content,
            'refer_url': window.location.href
        },
        cb, 'json');
    }
};
window.ShareIndex = {
    'switchVideo': function(data, k) {
        var _h = '<a id="topitems_preview_main" href="' + data.show_url + '" onclick="ShareIndex.play_video(' + k + '); return false" class="pic"><img src="' + data.image + '" width="400" height="280" /><s class="btn-play-video"></s></a><p class="i-share"><a href="#" onclick="share_again(\'' + data.shareid + '\',\'' + data.u + '\',\'' + data.req_type + '\'); pgvUrl(\'/click/addshare_topvide\' , ' + DOMAINS.APP + '); return false">我也分享</a> 已被分享' + data.sharecount + '次</p>';
        J('#topitems_preview').html(_h);
        ShareIndex.play_video(k);
    },
    'play_video': function(k) {
        var item = window.topitems_sharedata[k];
        if (!item) return;
        var swf = item.playurl;
        var swf_html = ShareLink.play_video(null, swf, true);
        J('#topitems_preview_main').hide();
        J('#topitems_preview').prepend('<div style="width:400px; height:280px" id="topitems_player">' + swf_html + '</div>');
    }
};
function share_lw_cb(obj) {
    if (!obj) {
        html_error_frame('错误提示', '系统错误，请稍后再试');
        return;
    }
    if (0 == obj.result) {
        html_loading_frame('提交成功', null, null, null, true);
        ushare_cancel_lw(obj.uin + '_' + obj.share_id);
        J('#comm_s_' + obj.uin + '_' + obj.share_id).css('display', 'none');
        var item = obj.new_comm;
        if (G_also_share) {
            J.post_api("/index.php", {
                mod: "usershare",
                act: "copy",
                'u': obj.uin,
                'share': obj.share_id
            },
            null, "json");
        }
    } else {
        J('#comm_s_' + obj.uin + '_' + obj.share_id).css('display', 'block');
        html_error_frame('错误提示', obj.msg);
    }
}
var G_also_share = 0;
function share_lw(uin, share_id, cb) {
    J('#comm_s_' + uin + '_' + share_id).css('display', 'none');
    if (!cb) cb = share_lw_cb;
    G_also_share = 0;
    if (J('#also_share_' + uin + '_' + share_id).get(0) && J('#also_share_' + uin + '_' + share_id).get(0).checked) G_also_share = 1;
    var comm_t = J('#' + uin + '_' + share_id + '_tx').val();
    if (comm_t.length == 0) {
        html_error_frame('温馨提示', '请输入您的评论内容');
        return;
    }
    if (comm_t.length > 100) {
        html_error_frame('错误提示', '您的字数太多，请减少至100字以内再提交');
        return;
    }
    J.post_api("/index.php", {
        mod: "usershare",
        act: "comm",
        u: uin,
        share: share_id,
        comm: comm_t,
        'also_share': G_also_share,
        'refer_url': window.location.href
    },
    cb, "json");
}
function usershare_textarea(textarea, strong) {
    J('#' + strong).html(J('#' + textarea).val().length.toString());
}
function ushare_cancel_lw(share_id) {
    J('#' + share_id + '_tx').val('');
    J('#' + share_id + '_input_num').html('0');
    J('#ushare_comment_' + share_id).attr('loaded', '0').hide();
}
function user_share_clean_text(obj) {
    if (obj.value == '点击这里添加推荐理由') {
        obj.value = '';
    }
}
function _add_share_window(type, viewData, pop_html) {
    window.usershare_curAddData = {
        viewData: viewData,
        submitData: g_current_post_share
    };
    pop_html = pop_html || 'usershare_add.html';
    setTimeout(function() {
        html_frame_new(viewData.title_1, '<iframe id="usershare_frame" name="usershare_frame" frameborder="0" scrolling="no" width="100%" height="130px" src="http://' + DOMAINS.MAIN + '/html/frame/share/' + pop_html + '"></iframe>',
        function() {
            Fid('usershare_frame').contentWindow.add_share_submit();
        },
        null, {
            wid: "usershare_pop",
            div_width: 450,
            submit_not_close: true
        })
    },
    10);
}
function add_share_post() {
    g_current_post_share.description = J('#usershare_reason_text').val();
    if ('提交成功' == g_current_post_share.description || '' == g_current_post_share.description) {
        g_current_post_share.description = '';
    }
    if (g_current_post_share.description.length > 50) {
        html_error_frame('错误提示', '您的字数太多，请减少至50字以内再提交');
    } else {
        J.post_api("/index.php", {
            mod: "usershare",
            act: "add",
            type: g_current_post_share.type,
            title: g_current_post_share.title,
            url: g_current_post_share.url,
            description: g_current_post_share.description,
            owneruin: g_current_post_share.owneruin,
            nickname: g_current_post_share.nickname,
            summary: g_current_post_share.summary,
            images: g_current_post_share.images,
            a_url: g_current_post_share.a_url,
            tips: 1
        },
        add_share_post_cb, "json");
    }
}
function add_share_post_cb(obj) {
    if (obj) {
        if (0 == obj.result) {
            html_loading_frame(obj.msg, null, null, null, true);
            close_frame('usershare_pop');
        } else {
            html_error_frame('错误提示', obj.msg);
        }
    } else {
        html_error_frame('错误提示', '系统错误，请稍后再试');
    }
}
function share_again(share_id, u) {
    J.post_api('/index.php', {
        'mod': 'usershare',
        'act': 'getone',
        'is_share_again': 1,
        'id': share_id,
        'u': u,
        'is_share_again': 1
    },
    function(d) {
        if (d.err) return html_loading_frame(d.msg);
        var share = d.result;
        share.type = parseInt(share.type);
        g_current_post_share = share;
        share.title_1 = '分享《' + cut_string(share.title, 18) + '》';
        _add_share_window(share.type, share, 'share_again.html');
    },
    'json');
}
var g_current_post_share;
function add_share_XXX(type, title, url, from, brief, img, from_uin, a_url) {
    brief = brief.trim();
    J.post_api('/index.php', {
        mod: 'checkpri',
        act: 'check',
        check: 'halveme',
        u: from_uin
    },
    function(obj) {
        if (obj.success) {
            add_share_XXX_real(type, title, url, from, brief, img, from_uin, a_url);
        } else {
            if (typeof obj.isowner != 'undefined' && obj.isowner == 1) {
                var html = '您不能分享自己的内容';
                html_error_frame('温馨提示', html);
            } else if (typeof obj.isfriend != 'undefined' && obj.isfriend == 1) {
                var html = '对方设置了权限，你暂时不能分享其内容。';
                html_error_frame('温馨提示', html);
            } else {
                var html = '对方设置了权限，你暂时不能分享其内容。<br>和对方成为好友后，即可成功分享。';
                html_confirm_frame('温馨提示', html,
                function() {
                    add_friends_frame(from_uin, 12);
                },
                {
                    submit_class: 'bt_tx4',
                    submit_button_name: '加为好友'
                });
            }
        }
    },
    'json');
}
function add_share_XXX_real(type, title, itemid, from, brief, img, from_uin, a_url, isfrom_share, _from_shareuin, _from_shareid) {
    var fromshare = isfrom_share ? 1 : 0;
    var from_shareuin = '';
    var from_shareid = 0;
    if (isfrom_share) {
        from_shareuin = _from_shareuin;
        from_shareid = _from_shareid;
    }
    brief = brief.trim();
    var type_str = '';
    var brief_s = '';
    type = parseInt(type);
    switch (type) {
    case 1:
        type_str = '日志';
        brief = escapeHTML(brief);
        brief_s = '<span class="grey_time"  style="margin: 0px;">摘要：</span><span class="span_1">' + brief + '</span>';
        break;
    case 2:
        type_str = '相册';
        brief_s = brief;
        break;
    case 3:
        type_str = '相片';
        brief_s = '<span class="grey_time"  style="margin: 0px;">所在相册：</span>' + brief;
        break;
    case 4:
    case 5:
        type_str = '网址';
        brief_s = '<span class="grey_time"  style="margin: 0px;">链接地址：</span>' + '<a href="' + brief + '">' + brief + '</a>';
        break;
    }
    var title_min = title;
    if (title.length > 5) {
        title_min = title.substr(0, 5) + '...';
    }
    title_min = '添加' + type_str + '《' + title_min + '》到我的分享';
    var img_div = '';
    var _1 = '_1';
    if (img && img.length && img[0].length > 0) {
        img_div = '<div class="photo_user"><img onload="DrawImage(this,100,70)" src="' + img[0] + '"/></div>';
        _1 = '';
    }
    var share = {
        title_1: title_min,
        title_2: title,
        utl_: itemid,
        from_: from,
        brief_: brief_s,
        imgdiv: img_div,
        _1: _1,
        fromshare: fromshare,
        from_shareuin: from_shareuin,
        from_shareid: from_shareid
    };
    g_current_post_share = {
        type: type,
        title: title,
        itemid: itemid,
        owneruin: from_uin,
        nickname: from,
        summary: brief,
        images: img,
        a_url: a_url,
        fromshare: fromshare,
        from_shareuin: from_shareuin,
        from_shareid: from_shareid
    };
    _add_share_window(type, share);
}
function add_share_blog(title, blogid, from, brief, imgs, from_uin) {
    var img = [];
    imgs.each(function(i, n) {
        if (J(n).height() >= 100 || J(n).width() >= 100) {
            img.push(J(n).attr("src"));
            if (img.length >= 3) return false;
        }
    });
    brief = brief || '';
    brief = brief.trim();
    if (brief.length > 150) {
        brief = brief.substr(0, 150) + '...';
    }
    add_share_XXX(1, title, blogid, from, brief, img, from_uin, '');
}
function add_share_album(album_name, album_id, from, count, img, from_uin) {
    var brief = "共" + count + "张照片";
    img = [img];
    add_share_XXX(2, album_name, album_id, from, brief, img, from_uin, '');
}
function add_share_photo(photo_name, photo_id, from, album_name, img, from_uin, album_id) {
    img = [img];
    add_share_XXX(3, photo_name, photo_id, from, album_name, img, from_uin, album_id);
}
function usershare_copy(uin, share) {
    J.post_api("/index.php", {
        mod: "usershare",
        act: "copy",
        u: uin,
        share: share
    },
    add_share_post_cb, "json");
}
function usershare_del(share, callback) {
    html_confirm_frame('删除确认', '确定删除该分享吗',
    function() {
        J.post_api("/index.php", {
            mod: "usershare",
            act: "del",
            share: share
        },
        function(obj) {
            if (obj) {
                if (0 == obj.result) {
                    if (callback) {
                        callback();
                    } else {
                        J('#share_item_' + obj.uin + '_' + obj.share).remove();
                        J('#share_item__' + obj.share).remove();
                    }
                } else {
                    html_error_frame('错误提示', obj.msg);
                }
            } else {
                html_error_frame('错误提示', '系统错误，请稍后再试');
            }
        },
        "json");
    })
}
var G_ushare_show_pic_num = 5;
function init_ushare_show_album(index) {
    var html = '';
    var item;
    var num = 0;
    G_album_index = index;
    while (num < G_ushare_show_pic_num) {
        if (typeof G_album_pics[index] == 'undefined') break;
        item = G_album_pics[index];
        html += '<li id="pic_id_' + index + '"';
        if (index == G_old_pic_index) html += ' class="on"';
        html += '><div class="pic_scroll"><a href="#" onclick="ushare_show_pic(' + index + '); return false"><img src="' + item.surl + '" onload="DrawImage(this,60,60);J(this).show();" alt="' + item.title + '" style="display:none;" /></a></div><span class="pic_on"></span></li>';
        num = num + 1;
        index++;
    }
    J('#album_pic_list').html(html);
    if (G_album_index > 0) {
        J('#scrool_button_up').attr('class', 'bt_scroll_up');
    } else {
        J('#scrool_button_up').attr('class', 'bt_disable_up');
    }
    if (G_total_pics > G_ushare_show_pic_num + G_album_index) {
        J('#scrool_button_down').attr('class', 'bt_scroll_down');
    } else {
        J('#scrool_button_down').attr('class', 'bt_disable_down');
    }
    var clickHandler = function() {}
    J('#photo_view_img').click(function() {
        clickHandler();
    }) J('#photo_view_img').mousemove(function(e) {
        var left = J(this).offset().left;
        if ((e || event).clientX - left <= this.offsetWidth / 2) {
            J(this).css({
                'cursor': 'url("http://imgcache.qq.com/qzonestyle/xiaoyou_portal_v2/css/cursor/pre.cur"), auto'
            });
            clickHandler = function() {
                ushare_show_pic(G_old_pic_index - 1);
            }
        } else {
            J(this).css({
                'cursor': 'url("http://imgcache.qq.com/qzonestyle/xiaoyou_portal_v2/css/cursor/next.cur"), auto'
            });
            clickHandler = function() {
                ushare_show_pic(G_old_pic_index + 1);
            }
        }
    }) J('#photo_view_img').mouseout = function() {
        clickHandler = function() {}
    }
}
function ushare_show_scrool_left(step) {
    var newindex = G_album_index + step;
    if (newindex + G_ushare_show_pic_num > G_total_pics) newindex = G_total_pics - G_ushare_show_pic_num;
    if (newindex < 0) newindex = 0;
    if (newindex != G_album_index) init_ushare_show_album(newindex);
}
var G_old_pic_index = 0;
function ushare_show_pic(index) {
    if (G_old_pic_index == index) return;
    var item = G_album_pics[index];
    if (!item) return;
    J('#pic_id_' + G_old_pic_index).attr('class', '');
    J('#pic_id_' + index).attr('class', 'on');
    G_old_pic_index = index;
    J('#photo_view_img').get(0).src = item.lurl;
}
function load_ushare_comments(uin, share_id, page, loading) {
    if (typeof page != 'undefined' && page <= 0) return;
    if (loading) html_loading_frame('正在获取分享评论');
    var newcmt_div_id = 'ushare_cmts_' + uin + '_' + share_id;
    J('#' + newcmt_div_id).load('/index.php?mod=usershare&act=comments&sid=' + share_id + '&u=' + uin + '&page=' + page,
    function() {
        close_frame('image_wait');
    });
}
function ushare_new_comment(uin, share_id, seek, also_share) {
    var newcmt_div_id = 'share_comment_content';
    J('#' + newcmt_div_id).show();
    J('#share_comment_submit').click(function() {
        post_new_ushare_comment(J('#Qzs_Editor_content_0').val(), uin, share_id, also_share);
    });
    if (seek) {
        J('#share_comment_content').focus();
    }
}
function post_new_ushare_comment(content, u, sid, also_share) {
    userShare.postComment(u, sid, content,
    function(d) {
        inputEnable();
        if (!d) return html_loading_frame('系统错误，请稍后再试');
        if (d.err) return html_loading_frame(d.msg);
        J('#Qzs_Editor_content_0').val('');
        if (also_share) {
            html_confirm_frame('温馨提示', '评论成功，是否也分享给您的好友？',
            function() {
                J.post_api('/index.php?mod=usershare&act=copy', {
                    'u': u,
                    'share': sid
                },
                function() {
                    html_loading_frame('分享成功');
                });
            });
        } else {
            html_loading_frame('评论成功');
        }
        var get_page = ((userShare.total_comment + 1) / userShare.comment_perpage > userShare.comment_page) ? userShare.comment_page + 1 : userShare.comment_page;
        userShare.getShareComment(u, sid, usershare_comment_show, {
            'page': get_page,
            'order': 'asc'
        });
    });
}
function ushare_goto_other(uin, share_id, req_type, pos, extid) {
    J.post_api('/index.php', {
        mod: "usershare",
        act: "getother",
        u: uin,
        share_id: share_id,
        req_type: req_type,
        'pos': pos,
        'extid': extid
    },
    function(data) {
        if (data.code) {
            html_error_frame('温馨提示', data.msg);
        } else if (data.sid == 0) {
            html_loading_frame(pos == 1 ? '没有下一篇了': '没有上一篇了');
        } else {
            var newurl = 'http://' + DOMAINS.MAIN + '/index.php?mod=usershare&act=show&u=' + data.u + '&sid=' + data.sid;
            if (typeof data.req_type != 'undefined') {
                newurl += '&req_type=' + data.req_type;
                if (data.req_type == 'school') newurl += '&school_id=' + data.extid;
                if (data.req_type == 'class') newurl += '&class_id=' + data.extid;
                if (data.req_type == 'friend' && data.extid != '' && data.extid != 0) newurl += '&friend_id=' + data.extid;
            }
            location.href = newurl;
        }
    },
    'json');
}
function ShareBuildReplyBox(index) {
    var comment_id = index;
    var cb = function(content, form_data, vc) {
        var _cb = function(d) {
            inputEnable();
            if (d.err) return html_loading_frame(d.msg);
            userShare.getShareComment(userShare.ownerhash, userShare.shareid, usershare_comment_show, {
                'page': userShare.comment_page,
                'order': 'asc'
            });
        };
        inputDisable();
        J.post_api("/index.php", {
            'mod': 'usershare',
            'act': 'comm',
            'commpid': comment_id,
            'share': userShare.shareid,
            'u': userShare.ownerhash,
            'comm': content
        },
        _cb, 'json');
    };
    GbuildReplyItem('replyitem_' + index, cb, {
        "word_limit": 100
    });
}
var ShareLink = {
    _url: '',
    _title: '',
    _type: 4,
    htmlspecialchars: function(source_string) {
        return source_string.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/&/g, '&amp;');
    },
    open_window: function(url, title, from_share_u, from_share_id) {
        if (null == url) {
            this._url = this.htmlspecialchars(J('#shared_url').val());
        } else {
            this._url = url;
        }
        this._title = title;
        var url_header_reg = /^http:\/\/.*/;
        if (false === url_header_reg.test(this._url)) {
            this._url = 'http://' + this._url;
        }
        this._url = this._url.substr(0, 10) + this._url.substr(10).replace(/\/+/ig, '/');
        var url_reg = /http:\/\/[^\/\.]+?\.[^"']+[\w\/]$/i;
        if (false === url_reg.test(this._url)) {
            html_loading_frame('网址格式不正确，请检查^_^', 1000);
            return;
        }
        var _cb = function() {
            var _title = Fid('share_link_frame').contentWindow.document.getElementById('title').value;
            var _url = ShareLink._url;
            var _message = Fid('share_link_frame').contentWindow.document.getElementById('message').value;
            var _type = Fid('share_link_frame').contentWindow.document.getElementById('type').value;
            ShareLink.add_share_link(_type, _title, _url, _message, from_share_u, from_share_id);
        };
        setTimeout(function() {
            html_frame_new('分享网址', '<iframe id="share_link_frame" name="share_link_frame" frameborder="0" scrolling="no" width="100%" height="130px" src="http://' + DOMAINS.MAIN + '/html/frame/share/share_link_pop.html"></iframe>', _cb, null, {
                wid: 'share_link_pop',
                div_width: 450,
                submit_button_name: '分享',
                submit_not_close: true
            });
        },
        10);
    },
    init_info: function() {
        var url_str = parent.ShareLink._url;
        var show_url = url_str.substr(0, 40);
        if (url_str.length > 40) {
            for (var i = 1; i <= url_str.length / 40; i++) {
                show_url += '<wbr>' + url_str.substr(40 * i, 40);
            }
        }
        Fid('shared_link').innerHTML = show_url;
        J('#title').val(parent.ShareLink._title);
        var _cb = function(d) {
            var code = parseInt(d.code);
            if (code == 0 && '' != d.result) {
                if (J('#title').val() == '' || J('#title').val() == '精彩网文') {
                    Fid('title').value = (0 == d.code && !isEmpty(d.result.title)) ? ShareLink.htmlspecialchars(d.result.title) : '精彩网文';
                }
                Fid('type').value = d.result.type;
                if (5 == d.result.type) {
                    Fid('cover').value = d.result.coverurl;
                    Fid('swf').value = d.result.flash;
                }
            } else {
                Fid('type').value = 4;
                Fid('title').value = '精彩网文';
            }
        }
        J.post_api('/index.php?mod=usershare&act=geturlinfo', {
            url: parent.ShareLink._url
        },
        _cb, 'json');
    },
    check_count: function() {
        Fid('counter').innerHTML = Fid('message').value.length;
    },
    add_share_link: function(type, title, url, message, from_share_u, from_share_id) {
        if (150 < message.length) {
            Fid('share_link_frame').contentWindow.document.getElementById('error_tip').innerHTML = '分享理由最多可输入150个字';
            return;
        }
        if ('' === title || null === title || undefined === title || '请输入标题' === title) {
            Fid('share_link_frame').contentWindow.document.getElementById('error_tip').innerHTML = '请先输入标题';
            return;
        }
        titie = cut_string(title, 50);
        var _cb = function(d) {
            if (d.err == 0 || '添加成功' == d.msg) {
                html_loading_frame('分享已成功');
                close_frame('share_link_pop', null, false, false);
            } else {
                Fid('share_link_frame').contentWindow.document.getElementById('error_tip').innerHTML = d.msg;
                return;
            }
        };
        if (!isEmpty(from_share_id)) {
            J.post_api("/index.php?mod=usershare&act=copy", {
                'u': from_share_u,
                'share': from_share_id,
                'description': message
            },
            _cb, 'json');
        } else {
            var _cover = Fid('share_link_frame').contentWindow.document.getElementById('cover').value;
            var _swf = Fid('share_link_frame').contentWindow.document.getElementById('swf').value;
            J.post_api('/index.php?mod=usershare&act=add', {
                type: type,
                title: title,
                url: url,
                description: message,
                summary: _swf,
                images: _cover
            },
            _cb, 'json');
        }
    },
    play_video: function(item_id, swf, is_return) {
        var swf_player = '';
        if (jQuery.browser.msie) {
            swf_player = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%" type="application/x-shockwave-flash"><param name="movie" value="' + swf + '" /><param name="FlashVars" value="uin=95005517&amp;fid=33338&amp;silence=1" /><param name="wmode" value="opaque" /><param name="allowfullscreen" value="true" /><param name="allownetworking" value="all" /><param name="allowscriptaccess" value="never" /></object>';
        } else {
            swf_player = '<embed height="100%" width="100%" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" codebase="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab#version=8,0,0,0" wmode="opaque" flashvars="" allowfullscreen="true" allownetworking="all" allowscriptaccess="never" src="' + swf + '"/>';
        }
        if (is_return) return swf_player;
        Fid('video_share_' + item_id + '_player').innerHTML = swf_player;
        Fid('video_share_' + item_id).style.display = 'none';
        Fid('video_share_' + item_id + '_big').style.display = '';
    },
    hide_video: function(item_id) {
        Fid('video_share_' + item_id + '_player').innerHTML = '';
        Fid('video_share_' + item_id + '_big').style.display = 'none';
        Fid('video_share_' + item_id).style.display = '';
    }
};
J(document).ready(function() {
    G_TMP.shareTitle = document.title;
    window.onload = function() {
        document.title = G_TMP.shareTitle;
    };
});
function ubbLiteReplace(src, option) {
    if (!src) return '';
    var icdm = 'imgcache.qq.com';
    var op = {
        'xss': false,
        'image': 'none',
        'link': 'none',
        'img_max_width': 800,
        'pop': false
    };
    J.extend(op, option);
    if (op.xss) src = escapeHTML(src);
    src = src.replace(/”/g, '"');
    src = src.replace(/\[em\]e(\d{1,3})\[\/em\]/g, "<img style='vertical-align:middle  !important' src='http://" + icdm + "/qzone/em/e$1.gif'><wbr>");
    if (op.image != 'none') {
        var match = op.image == 'qq' ? /\[img\](http:\/\/.+?\.qq\.com\/.+?)\[\/img\]/g: /\[img\](http.+?)\[\/img\]/g;
        src = src.replace(match, "<img style='vertical-align:baseline !important' onload='DrawImage(this," + op.img_max_width + ",500)' class='ubb_img' src='$1'>");
        var match = op.image == 'qq' ? /\[img,\d{1,4},\d{1,4}\](http:\/\/.+?\.qq\.com\/.+?)\[\/img\]/g: /\[img,\d{1,4},\d{1,4}\](http.+?)\[\/img\]/g;
        src = src.replace(match, "<img style='vertical-align:baseline !important' onload='DrawImage(this," + op.img_max_width + ",500)' class='ubb_img' src='$1'>");
    }
    if (op.link != 'none') {
        var match = op.link == 'qq' ? /\[url=(http:\/\/.+?\.qq\.com\/.+?)\](.+?)\[\/url\]/ig: /\[url=(.*?)\](.+?)\[\/url\]/ig;
        if (op.pop && op.image != 'none') src = src.replace(match, "<a href='$1' target='_blank' class='popup_photo' title='点击查看大图'>$2</a>");
        else src = src.replace(match, "<a href='$1' target='_blank'>$2</a>");
    }
    var useless = [/\[ft=([^\]]+)\]/g, /\[\/ft\]/g, /\[B\]/g, /\[\/B\]/g, /\[M\]/g, /\[\/M\]/g, /\[U\]/g, /\[\/U\]/g, /\[I\]/g, /\[\/I\]/g, /\[R\]/g, /\[\/R\]/g, /\[ffg,([^\]]{0,20})\]/g];
    for (var i = 0; i < useless.length; i++) {
        src = src.replace(useless[i], '');
    }
    var useless = [/\[li\]/g, /\[\/li\]/g, /\[quote=([^\]]*)\]/g, /\[\/quote\]/g];
    for (var i = 0; i < useless.length; i++) {
        src = src.replace(useless[i], '<br />');
    }
    var useless = [[/\[flash.{0,15}\].{3,100}?\[\/flash\]/g, ' [视频] '], [/\[video.{0,25}\].{3,100}?\[\/video\]/g, ' [视频] '], [/\[audio.{0,25}\].{3,100}?\[\/audio\]/g, ' [音乐] '], [/\[music.{0,25}\].{3,100}?\[\/music\]/g, ' [音乐] '], [/\[qqshow.+?\].{3,300}?\[\/qqshow\]/g, ' [QQshow泡泡] ']];
    for (var i = 0; i < useless.length; i++) {
        src = src.replace(useless[i][0], useless[i][1]);
    }
    return src;
} (function() {
    var p = new Array();
    p[0] = '不限';
    p[11] = '北京';
    p[31] = '上海';
    p[44] = '广东';
    p[34] = '安徽';
    p[50] = '重庆';
    p[35] = '福建';
    p[46] = '海南';
    p[13] = '河北';
    p[41] = '河南';
    p[23] = '黑龙江';
    p[42] = '湖北';
    p[43] = '湖南';
    p[62] = '甘肃';
    p[45] = '广西';
    p[52] = '贵州';
    p[22] = '吉林';
    p[36] = '江西';
    p[32] = '江苏';
    p[21] = '辽宁';
    p[15] = '内蒙古';
    p[64] = '宁夏';
    p[63] = '青海';
    p[37] = '山东';
    p[14] = '山西';
    p[61] = '陕西';
    p[51] = '四川';
    p[12] = '天津';
    p[54] = '西藏';
    p[65] = '新疆';
    p[53] = '云南';
    p[33] = '浙江';
    p[71] = '台湾';
    p[81] = '香港';
    p[82] = '澳门';
    var c = new Array();
    c[0] = new Array();
    c[11] = new Array();
    c[12] = new Array();
    c[13] = new Array();
    c[14] = new Array();
    c[15] = new Array();
    c[21] = new Array();
    c[22] = new Array();
    c[23] = new Array();
    c[31] = new Array();
    c[32] = new Array();
    c[33] = new Array();
    c[34] = new Array();
    c[35] = new Array();
    c[36] = new Array();
    c[37] = new Array();
    c[41] = new Array();
    c[42] = new Array();
    c[43] = new Array();
    c[44] = new Array();
    c[45] = new Array();
    c[46] = new Array();
    c[50] = new Array();
    c[51] = new Array();
    c[52] = new Array();
    c[53] = new Array();
    c[54] = new Array();
    c[61] = new Array();
    c[62] = new Array();
    c[63] = new Array();
    c[64] = new Array();
    c[65] = new Array();
    c[71] = new Array();
    c[81] = new Array();
    c[82] = new Array();
    c[0][0] = '不限';
    var b = c[11];
    b[1100] = '不限';
    b[1101] = '东城';
    b[1102] = '西城';
    b[1103] = '崇文';
    b[1104] = '宣武';
    b[1105] = '朝阳';
    b[1106] = '丰台';
    b[1107] = '石景山';
    b[1108] = '海淀';
    b[1109] = '门头沟';
    b[1111] = '房山';
    b[1112] = '通州';
    b[1113] = '顺义';
    b[1121] = '昌平';
    b[1124] = '大兴';
    b[1126] = '平谷';
    b[1127] = '怀柔';
    b[1128] = '密云';
    b[1129] = '延庆';
    b = c[12];
    b[1200] = '不限';
    b[1201] = '和平';
    b[1202] = '河东';
    b[1203] = '河西';
    b[1204] = '南开';
    b[1205] = '河北';
    b[1206] = '红桥';
    b[1207] = '塘沽';
    b[1208] = '汉沽';
    b[1209] = '大港';
    b[1210] = '东丽';
    b[1211] = '西青';
    b[1212] = '津南';
    b[1213] = '北辰';
    b[1221] = '宁河';
    b[1222] = '武清';
    b[1223] = '静海';
    b[1224] = '宝坻';
    b[1225] = '蓟县';
    b = c[13];
    b[1300] = '不限';
    b[1301] = '石家庄';
    b[1302] = '唐山';
    b[1303] = '秦皇岛';
    b[1304] = '邯郸';
    b[1305] = '邢台';
    b[1306] = '保定';
    b[1307] = '张家口';
    b[1308] = '承德';
    b[1309] = '沧州';
    b[1310] = '廊坊';
    b[1311] = '衡水';
    b = c[14];
    b[1400] = '不限';
    b[1401] = '太原';
    b[1402] = '大同';
    b[1403] = '阳泉';
    b[1404] = '长治';
    b[1405] = '晋城';
    b[1406] = '朔州';
    b[1407] = '晋中';
    b[1408] = '运城';
    b[1409] = '忻州';
    b[1410] = '临汾';
    b[1411] = '吕梁';
    b = c[15];
    b[1500] = '不限';
    b[1501] = '呼和浩特';
    b[1502] = '包头';
    b[1503] = '乌海';
    b[1504] = '赤峰';
    b[1505] = '通辽';
    b[1506] = '鄂尔多斯';
    b[1507] = '呼伦贝尔';
    b[1508] = '巴彦淖尔';
    b[1509] = '乌兰察布';
    b[1522] = '兴安';
    b[1525] = '锡林郭勒';
    b[1529] = '阿拉善';
    b = c[21];
    b[2100] = '不限';
    b[2101] = '沈阳';
    b[2102] = '大连';
    b[2103] = '鞍山';
    b[2104] = '抚顺';
    b[2105] = '本溪';
    b[2106] = '丹东';
    b[2107] = '锦州';
    b[2108] = '营口';
    b[2109] = '阜新';
    b[2110] = '辽阳';
    b[2111] = '盘锦';
    b[2112] = '铁岭';
    b[2113] = '朝阳';
    b[2114] = '葫芦岛';
    b = c[22];
    b[2200] = '不限';
    b[2201] = '长春';
    b[2202] = '吉林';
    b[2203] = '四平';
    b[2204] = '辽源';
    b[2205] = '通化';
    b[2206] = '白山';
    b[2207] = '松原';
    b[2208] = '白城';
    b[2224] = '延边';
    b = c[23];
    b[2300] = '不限';
    b[2301] = '哈尔滨';
    b[2302] = '齐齐哈尔';
    b[2303] = '鸡西';
    b[2304] = '鹤岗';
    b[2305] = '双鸭山';
    b[2306] = '大庆';
    b[2307] = '伊春';
    b[2308] = '佳木斯';
    b[2309] = '七台河';
    b[2310] = '牡丹江';
    b[2311] = '黑河';
    b[2312] = '绥化';
    b[2327] = '大兴安岭';
    b = c[31];
    b[3100] = '不限';
    b[3101] = '黄浦';
    b[3102] = '南区';
    b[3103] = '卢湾';
    b[3104] = '徐汇';
    b[3105] = '长宁';
    b[3106] = '静安';
    b[3107] = '普陀';
    b[3108] = '闸北';
    b[3109] = '虹口';
    b[3110] = '杨浦';
    b[3112] = '闵行';
    b[3113] = '宝山';
    b[3114] = '嘉定';
    b[3115] = '浦东新区';
    b[3116] = '金山';
    b[3117] = '松江';
    b[3125] = '南汇';
    b[3126] = '奉贤';
    b[3129] = '青浦';
    b[3130] = '崇明';
    b = c[32];
    b[3200] = '不限';
    b[3201] = '南京';
    b[3202] = '无锡';
    b[3203] = '徐州';
    b[3204] = '常州';
    b[3205] = '苏州';
    b[3206] = '南通';
    b[3207] = '连云港';
    b[3208] = '淮安';
    b[3209] = '盐城';
    b[3210] = '扬州';
    b[3211] = '镇江';
    b[3212] = '泰州';
    b[3213] = '宿迁';
    b = c[33];
    b[3300] = '不限';
    b[3301] = '杭州';
    b[3302] = '宁波';
    b[3303] = '温州';
    b[3304] = '嘉兴';
    b[3305] = '湖州';
    b[3306] = '绍兴';
    b[3307] = '金华';
    b[3308] = '衢州';
    b[3309] = '舟山';
    b[3310] = '台州';
    b[3311] = '丽水';
    b = c[34];
    b[3400] = '不限';
    b[3401] = '合肥';
    b[3402] = '芜湖';
    b[3403] = '蚌埠';
    b[3404] = '淮南';
    b[3405] = '马鞍山';
    b[3406] = '淮北';
    b[3407] = '铜陵';
    b[3408] = '安庆';
    b[3410] = '黄山';
    b[3411] = '滁州';
    b[3412] = '阜阳';
    b[3413] = '宿州';
    b[3414] = '巢湖';
    b[3415] = '六安';
    b[3416] = '亳州';
    b[3417] = '池州';
    b[3418] = '宣城';
    b = c[35];
    b[3500] = '不限';
    b[3501] = '福州';
    b[3502] = '厦门';
    b[3503] = '莆田';
    b[3504] = '三明';
    b[3505] = '泉州';
    b[3506] = '漳州';
    b[3507] = '南平';
    b[3508] = '龙岩';
    b[3509] = '宁德';
    b = c[36];
    b[3600] = '不限';
    b[3601] = '南昌';
    b[3602] = '景德镇';
    b[3603] = '萍乡';
    b[3604] = '九江';
    b[3605] = '新余';
    b[3606] = '鹰潭';
    b[3607] = '赣州';
    b[3608] = '吉安';
    b[3609] = '宜春';
    b[3610] = '抚州';
    b[3611] = '上饶';
    b = c[37];
    b[3700] = '不限';
    b[3701] = '济南';
    b[3702] = '青岛';
    b[3703] = '淄博';
    b[3704] = '枣庄';
    b[3705] = '东营';
    b[3706] = '烟台';
    b[3707] = '潍坊';
    b[3708] = '济宁';
    b[3709] = '泰安';
    b[3710] = '威海';
    b[3711] = '日照';
    b[3712] = '莱芜';
    b[3713] = '临沂';
    b[3714] = '德州';
    b[3715] = '聊城';
    b[3716] = '滨州';
    b[3717] = '菏泽';
    b = c[41];
    b[4100] = '不限';
    b[4101] = '郑州';
    b[4102] = '开封';
    b[4103] = '洛阳';
    b[4104] = '平顶山';
    b[4105] = '安阳';
    b[4106] = '鹤壁';
    b[4107] = '新乡';
    b[4108] = '焦作';
    b[4109] = '濮阳';
    b[4110] = '许昌';
    b[4111] = '漯河';
    b[4112] = '三门峡';
    b[4113] = '南阳';
    b[4114] = '商丘';
    b[4115] = '信阳';
    b[4116] = '周口';
    b[4117] = '驻马店';
    b[4118] = '济源';
    b = c[42];
    b[4200] = '不限';
    b[4201] = '武汉';
    b[4202] = '黄石';
    b[4203] = '十堰';
    b[4205] = '宜昌';
    b[4206] = '襄樊';
    b[4207] = '鄂州';
    b[4208] = '荆门';
    b[4209] = '孝感';
    b[4210] = '荆州';
    b[4211] = '黄冈';
    b[4212] = '咸宁';
    b[4213] = '随州';
    b[4228] = '恩施';
    b[4229] = '仙桃';
    b[4230] = '潜江';
    b[4231] = '天门';
    b[4232] = '神农架';
    b = c[43];
    b[4300] = '不限';
    b[4301] = '长沙';
    b[4302] = '株洲';
    b[4303] = '湘潭';
    b[4304] = '衡阳';
    b[4305] = '邵阳';
    b[4306] = '岳阳';
    b[4307] = '常德';
    b[4308] = '张家界';
    b[4309] = '益阳';
    b[4310] = '郴州';
    b[4311] = '永州';
    b[4312] = '怀化';
    b[4313] = '娄底';
    b[4331] = '湘西';
    b = c[44];
    b[4400] = '不限';
    b[4401] = '广州';
    b[4402] = '韶关';
    b[4403] = '深圳';
    b[4404] = '珠海';
    b[4405] = '汕头';
    b[4406] = '佛山';
    b[4407] = '江门';
    b[4408] = '湛江';
    b[4409] = '茂名';
    b[4412] = '肇庆';
    b[4413] = '惠州';
    b[4414] = '梅州';
    b[4415] = '汕尾';
    b[4416] = '河源';
    b[4417] = '阳江';
    b[4418] = '清远';
    b[4419] = '东莞';
    b[4420] = '中山';
    b[4451] = '潮州';
    b[4452] = '揭阳';
    b[4453] = '云浮';
    b = c[45];
    b[4500] = '不限';
    b[4501] = '南宁';
    b[4502] = '柳州';
    b[4503] = '桂林';
    b[4504] = '梧州';
    b[4505] = '北海';
    b[4506] = '防城港';
    b[4507] = '钦州';
    b[4508] = '贵港';
    b[4509] = '玉林';
    b[4510] = '百色';
    b[4511] = '贺州';
    b[4512] = '河池';
    b[4513] = '来宾';
    b[4514] = '崇左';
    b = c[46];
    b[4600] = '不限';
    b[4601] = '海口';
    b[4602] = '三亚';
    b[4603] = '五指山';
    b[4604] = '琼海';
    b[4605] = '儋州';
    b[4606] = '文昌';
    b[4607] = '万宁';
    b[4608] = '东方';
    b = c[50];
    b[5000] = '不限';
    b[5001] = '万州';
    b[5002] = '涪陵';
    b[5003] = '渝中';
    b[5004] = '大渡口';
    b[5005] = '江北';
    b[5006] = '沙坪坝';
    b[5007] = '九龙坡';
    b[5008] = '南岸';
    b[5009] = '北碚';
    b[5010] = '万盛';
    b[5011] = '双桥';
    b[5012] = '渝北';
    b[5013] = '巴南';
    b[5021] = '长寿';
    b[5022] = '綦江';
    b[5023] = '潼南';
    b[5024] = '铜梁';
    b[5025] = '大足';
    b[5026] = '荣昌';
    b[5027] = '璧山';
    b[5028] = '梁平';
    b[5029] = '城口';
    b[5030] = '丰都';
    b[5031] = '垫江';
    b[5032] = '武隆';
    b[5033] = '忠县';
    b[5034] = '开县';
    b[5035] = '云阳';
    b[5036] = '奉节';
    b[5037] = '巫山';
    b[5038] = '巫溪';
    b[5039] = '黔江';
    b[5040] = '石柱';
    b[5041] = '秀山';
    b[5042] = '酉阳';
    b[5043] = '彭水';
    b[5081] = '江津';
    b[5082] = '合川';
    b[5083] = '永川';
    b[5084] = '南川';
    b = c[51];
    b[5100] = '不限';
    b[5101] = '成都';
    b[5103] = '自贡';
    b[5104] = '攀枝花';
    b[5105] = '泸州';
    b[5106] = '德阳';
    b[5107] = '绵阳';
    b[5108] = '广元';
    b[5109] = '遂宁';
    b[5110] = '内江';
    b[5111] = '乐山';
    b[5113] = '南充';
    b[5114] = '眉山';
    b[5115] = '宜宾';
    b[5116] = '广安';
    b[5117] = '达州';
    b[5118] = '雅安';
    b[5119] = '巴中';
    b[5120] = '资阳';
    b[5132] = '阿坝';
    b[5133] = '甘孜';
    b[5134] = '凉山';
    b = c[52];
    b[5200] = '不限';
    b[5201] = '贵阳';
    b[5202] = '六盘水';
    b[5203] = '遵义';
    b[5204] = '安顺';
    b[5222] = '铜仁';
    b[5223] = '黔西南';
    b[5224] = '毕节';
    b[5226] = '黔东南';
    b[5227] = '黔南';
    b = c[53];
    b[5300] = '不限';
    b[5301] = '昆明';
    b[5303] = '曲靖';
    b[5304] = '玉溪';
    b[5305] = '保山';
    b[5306] = '昭通';
    b[5307] = '丽江';
    b[5308] = '思茅';
    b[5309] = '临沧';
    b[5323] = '楚雄';
    b[5325] = '红河';
    b[5326] = '文山';
    b[5328] = '西双版纳';
    b[5329] = '大理';
    b[5331] = '德宏';
    b[5333] = '怒江傈';
    b[5334] = '迪庆';
    b = c[54];
    b[5400] = '不限';
    b[5401] = '拉萨';
    b[5421] = '昌都';
    b[5422] = '山南';
    b[5423] = '日喀则';
    b[5424] = '那曲';
    b[5425] = '阿里';
    b[5426] = '林芝';
    b = c[61];
    b[6100] = '不限';
    b[6101] = '西安';
    b[6102] = '铜川';
    b[6103] = '宝鸡';
    b[6104] = '咸阳';
    b[6105] = '渭南';
    b[6106] = '延安';
    b[6107] = '汉中';
    b[6108] = '榆林';
    b[6109] = '安康';
    b[6110] = '商洛';
    b = c[62];
    b[6200] = '不限';
    b[6201] = '兰州';
    b[6202] = '嘉峪关';
    b[6203] = '金昌';
    b[6204] = '白银';
    b[6205] = '天水';
    b[6206] = '武威';
    b[6207] = '张掖';
    b[6208] = '平凉';
    b[6209] = '酒泉';
    b[6210] = '庆阳';
    b[6211] = '定西';
    b[6212] = '陇南';
    b[6229] = '临夏';
    b[6230] = '甘南';
    b = c[63];
    b[6300] = '不限';
    b[6301] = '西宁';
    b[6321] = '海东';
    b[6322] = '海北';
    b[6323] = '黄南';
    b[6325] = '海南';
    b[6326] = '果洛';
    b[6327] = '玉树';
    b[6328] = '海西';
    b = c[64];
    b[6400] = '不限';
    b[6401] = '银川';
    b[6402] = '石嘴山';
    b[6403] = '吴忠';
    b[6404] = '固原';
    b[6405] = '中卫';
    b = c[65];
    b[6500] = '不限';
    b[6501] = '乌鲁木齐';
    b[6502] = '克拉玛依';
    b[6521] = '吐鲁番';
    b[6522] = '哈密';
    b[6523] = '昌吉';
    b[6527] = '博尔塔拉';
    b[6528] = '巴音郭楞';
    b[6529] = '阿克苏';
    b[6530] = '克孜勒苏';
    b[6531] = '喀什';
    b[6532] = '和田';
    b[6540] = '伊犁';
    b[6542] = '塔城';
    b[6543] = '阿勒泰';
    b[6544] = '石河子';
    b[6545] = '阿拉尔';
    b[6546] = '图木舒克';
    b[6547] = '五家渠';
    b = c[71];
    b[7100] = '不限';
    b[7101] = '台北市';
    b[7102] = '高雄市';
    b[7103] = '基隆市';
    b[7104] = '台中市';
    b[7105] = '台南市';
    b[7106] = '新竹市';
    b[7107] = '嘉义市';
    b[7108] = '台北县';
    b[7109] = '宜兰县';
    b[7110] = '新竹县';
    b[7111] = '桃园县';
    b[7112] = '苗栗县';
    b[7113] = '台中县';
    b[7114] = '彰化县';
    b[7115] = '南投县';
    b[7116] = '嘉义县';
    b[7117] = '云林县';
    b[7118] = '台南县';
    b[7119] = '高雄县';
    b[7120] = '屏东县';
    b[7121] = '台东县';
    b[7122] = '花莲县';
    b[7123] = '澎湖县';
    b = c[81];
    b[8100] = '不限';
    b[8101] = '中西区';
    b[8102] = '东区';
    b[8103] = '九龙城区';
    b[8104] = '观塘区';
    b[8105] = '南区';
    b[8106] = '深水区';
    b[8107] = '湾仔区';
    b[8108] = '黄大仙区';
    b[8109] = '油尖旺区';
    b[8110] = '离岛区';
    b[8111] = '葵青区';
    b[8112] = '北区';
    b[8113] = '西贡区';
    b[8114] = '沙田区';
    b[8115] = '屯门区';
    b[8116] = '大埔区';
    b[8117] = '荃湾区';
    b[8118] = '元朗区';
    b = c[82];
    b[8200] = '不限';
    b[8201] = '花地玛堂区';
    b[8202] = '圣安多尼堂区';
    b[8203] = '大堂区';
    b[8204] = '望德堂区';
    b[8205] = '风顺堂区';
    b[8206] = '嘉模堂区';
    b[8207] = '圣方济各堂区';
    window.FgetProvince = function() {
        return p;
    };
    window.FgetProById = function(pid) {
        return p[pid];
    };
    window.FgetCity = function(id) {
        return c[id];
    };
    window.FgetCityName = function(pid, cid) {
        return c[pid][cid];
    };
})();
var Readshare = {
    _tmp: {
        cur_type: 0
    },
    go_all_page: function(page, type) {
        page = page ? page: 1;
        type = typeof(type) == 'undefined' ? this._tmp.cur_type: type;
        J('#menu_' + this._tmp.cur_type).removeClass('current');
        J('#menu_' + type).toggleClass('current');
        this._tmp.cur_type = type;
        J.get('http://' + DOMAINS.MAIN + '/index.php?mod=usershare&act=friend&inner=1&t_type=' + type + '&page=' + page,
        function(data) {
            J('#item_list').html(data);
        });
    },
    select_friend: function(btn) {
        if (!FgetUin()) {
            return;
        }
        ShowSelector(Readshare.go_user_page, btn, 0, 'fc');
    },
    go_user_page: function(results, type) {
        var u = results[0].u;
        var name = results[0].name;
        type = type ? type: 0;
        J('#menu_' + Readshare._tmp.cur_type).removeClass('current');
        Readshare._tmp.cur_type = type;
        J.get('http://' + DOMAINS.MAIN + '/index.php?mod=usershare&act=friend&u=' + u + '&inner=1&t_type=' + type,
        function(data) {
            J('#item_list').html(data);
        });
        return true;
    }
}
if (typeof window.QzsEditor == 'undefined' || window.QzsEditor.placeHolder == true) {
    String.prototype.getRealLength = function() {
        return this.replace(/[^\x00-\xff]/g, "a").replace(/\[url\=http\:\/\/(.*)\.photo\.store\.qq\.com\/http_imgload\.cgi(.*)\[\/url\]/gi, "").length;
    }
    var $extend = function() {
        var args = arguments;
        if (!args[1]) args = [this, args[0]];
        for (var property in args[1]) args[0][property] = args[1][property];
        return args[0];
    };
    function $defined(obj) {
        return (obj != undefined);
    };
    function $merge() {
        var mix = {};
        for (var i = 0; i < arguments.length; i++) {
            for (var property in arguments[i]) {
                var ap = arguments[i][property];
                var mp = mix[property];
                if (mp && $type(ap) == 'object' && $type(mp) == 'object') mix[property] = $merge(mp, ap);
                else mix[property] = ap;
            }
        }
        return mix;
    };
    function $type(obj) {
        if (!$defined(obj)) return false;
        if (obj.htmlElement) return 'element';
        var type = typeof obj;
        if (type == 'object' && obj.nodeName) {
            switch (obj.nodeType) {
            case 1:
                return 'element';
            case 3:
                return (/\S/).test(obj.nodeValue) ? 'textnode': 'whitespace';
            }
        }
        if (type == 'object' || type == 'function') {
            switch (obj.constructor) {
            case Array:
                return 'array';
            case RegExp:
                return 'regexp';
            case Class:
                return 'class';
            }
            if (typeof obj.length == 'number') {
                if (obj.item) return 'collection';
                if (obj.callee) return 'arguments';
            }
        }
        return type;
    };
    var Class = function(properties) {
        var klass = function() {
            return (arguments[0] !== null && this.initialize && $type(this.initialize) == 'function') ? this.initialize.apply(this, arguments) : this;
        };
        $extend(klass, this);
        klass.prototype = properties;
        klass.constructor = Class;
        return klass;
    };
    Class.empty = function() {};
    Class.Merge = function(previous, current) {
        if (previous && previous != current) {
            var type = $type(current);
            if (type != $type(previous)) return current;
            switch (type) {
            case 'function':
                var merged = function() {
                    this.parent = arguments.callee.parent;
                    return current.apply(this, arguments);
                };
                merged.parent = previous;
                return merged;
            case 'object':
                return $merge(previous, current);
            }
        }
        return current;
    };
    Class.prototype = {
        extend: function(properties) {
            var proto = new this(null);
            for (var property in properties) {
                var pp = proto[property];
                proto[property] = Class.Merge(pp, properties[property]);
            }
            return new Class(proto);
        },
        implement: function() {
            for (var i = 0,
            l = arguments.length; i < l; i++) $extend(this.prototype, arguments[i]);
        }
    };
    var n = 0;
    var QzsEditor = (function() {
        var emText = new Array('微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手', '激动', '街舞', '献吻', '左太极', '右太极');
        var MagicEditor = new Class({
            initialize: function(p) {
                this.maxLength = p.ml || 150;
                this.needQzoneInfo = false;
                this.needfocus = p.needfocus || false;
                this.needSubmit = p.needSubmit == undefined ? true: p.needSubmit;
                this.needCancel = p.needCancel || false;
                this.photo = p.photo || false;
                this.scrip = (p.scrip == true) ? true: false;
                this.commandType = p.ct || 1;
                this.index = count;
                this.mid = p.mid || this.index;
                this.faceCss = p.faceCss || '';
                this.submitCss = p.submitCss || 'bt_tx2';
                this.submitText = p.submitText || '提交';
                this.onClick = p.click || Class.empty;
                this.onSubmit = p.submit || Class.empty;
                this.onCancel = p.cancel || Class.empty;
                this.width = parseInt(p.width) || false;
                this.height = parseInt(p.height) || false;
                this.panelShowing = false;
                this.n = n++;
                this.exthtml = p.exthtml || '';
                if (p.oft) {
                    this.oft = p.oft;
                } else {
                    this.oft = 18;
                }
                if (p.render) {
                    this.renderTo(p.render, p.tpl);
                }
                if (this.needfocus) {
                    var editor = getInstance(this.index);
                    setTimeout(function() {
                        try {
                            editor.content.focus();
                        } catch(ex) {}
                        if (J.browser.msie) {
                            var rng = editor.content.createTextRange();
                            rng.text = editor.content.value;
                            rng.collapse(false);
                        }
                    },
                    500);
                }
                if (p.defaultValue) {
                    var editor = getInstance(this.index);
                    editor.content.value = p.defaultValue;
                }
            },
            renderTo: function(id, ctpl) {
                if (typeof id == "string") {
                    this.container = Fid(id);
                } else {
                    this.container = id;
                }
                if (!this.container) {
                    return;
                }
                this.container.innerHTML = (ctpl ? ctpl: tpl).replace(/\<\%\=index\%\>/g, count).replace(/\<\%\=mid\%\>/g, this.mid).replace(/\<\%\=max\%\>/g, this.maxLength).replace(/\<\%\=qzoneinfo_class\%\>/g, this.needQzoneInfo ? "DISPLAY:": "DISPLAY:none").replace(/\<\%\=qzoneinfo_checkboxid\%\>/g, this.needQzoneInfo ? "id=\"choose_qzone\"": "").replace(/\<\%\=submit_class\%\>/g, (this.needSubmit) ? "display:": "display:none").replace(/\<\%\=cancel_class\%\>/g, (this.needCancel) ? "display:": "display:none").replace(/\<\%\=photo_class\%\>/g, (this.photo) ? "DISPLAY:": "DISPLAY:none").replace(/\<\%\=scrip_class\%\>/g, (this.scrip) ? "DISPLAY:": "DISPLAY:none").replace(/\<\%\=exthtml\%\>/g, this.exthtml).replace(/\<\%\=submit_css\%\>/g, this.submitCss).replace(/\<\%\=submit_text\%\>/g, this.submitText).replace(/\<\%\=face_css\%\>/g, this.faceCss).replace(/\<\%\=width\%\>/g, this.width ? 'width="' + this.width + '"': '').replace(/\<\%\=height\%\>/g, this.height ? 'height="' + this.height + '"': '');
                this.content = Fid(contentPrefix + count);
                this.checkKey = function(e) {
                    QZONE.event.cancelBubble(e);
                }
                this.vFn = (function(o) {
                    return function() {
                        try {} catch(e) {};
                    }
                })(this);
                this.vFs = (function(o) {
                    return function() {}
                })(this);
                this.btnSubmit = (function(o) {
                    return function(e) {
                        e = QZONE.event.getEvent(e);
                        if (e.keyCode == 13) {
                            QzsEditor.submit(o.index);
                        }
                        QZONE.event.cancelBubble(e);
                    }
                })(this);
                QZONE.event.addEvent(this.content, "keydown", this.checkKey);
                this.replyBtn = Fid("comment_reply_button_" + count);
                this.lengthHint = Fid(lengthHintPrefix + count);
                instance[count++] = this;
            },
            clear: function() {
                this.content.value = "";
                this.lengthHint.innerHTML = "0";
            },
            setContent: function(content) {
                this.content.value = content;
            },
            destroy: function() {
                QZONE.event.removeEvent(this.content, "keydown", this.checkKey);
                this.onSubmit = null;
                this.onCancel = null;
                this.container.innerHTML = "";
                this.content = null;
                this.lengthHint = null;
                this.vFs = null;
                this.container = null;
                this.vFn = null;
                this.checkKey = null;
                this.btnSubmit = null;
                this.replyBtn = null;
                instance[this.index] = null;
                delete instance[this.index];
                count--;
            }
        });
        var instance = {};
        var count = 0;
        var tpl = '<div class="global_post_comment"><p><textarea onkeyup="QzsEditor.validateLength(this.value,\'<%=index%>\')" onkeydown="QzsEditor.ctlent(event, \'<%=index%>\')" class="xy_mes_content" id="Qzs_Editor_content_<%=index%>" onclick="QzsEditor.click(\'<%=index%>\');return false;" rows="" cols="" <%=width%> <%=height%>></textarea></p><p class="global_fun_wrap"><span class="gb_fun_l"><span id="scrip_span_<%=index%>"  style="<%=scrip_class%>"><input type="checkbox" id="scrip_chk_<%=index%>"/><label for="scrip_chk_<%=index%>"> 悄悄话(<span id="scrip_info_<%=index%>">以小纸条的方式发送)</span></label>&nbsp;</span><span class="qsEditor_face_panel" style="<%=face_css%>"><img src="http://imgcache.qq.com/qzonestyle/xiaoyou_portal_v2/img/b.gif" alt="" class="icon_face" /><a onclick="QzsEditor.showFacePanel(this,\'<%=index%>\');return false;" id="Qzs_Editor_Face_<%=index%>" href="#">表情</a></span><span style="<%=photo_class%>" class="c_tx2"> | </span><img src="http://imgcache.qq.com/qzonestyle/xiaoyou_portal_v2/img/b.gif" alt="" class="icon_pic" style="<%=photo_class%>" /><a href="#" onclick="xyPhotoSelector(\'<%=index%>\', QzsEditor.SelectPhoto_cb,{\'bar\':\'|album|new|\'});return false;" style="<%=photo_class%>">图片</a><span class="num_tx"><span id="Qzs_Editor_input_<%=index%>" class="xy_mes_num">0</span>/<span id="Qzs_Editor_max_<%=index%>"><%=max%></span></span></span><span class="bt_fun"><button type="button" onclick="QzsEditor.submit(<%=index%>);return false;" class="<%=submit_css%>" style="<%=submit_class%>" id="Qzs_Editor_submit_<%=index%>"><%=submit_text%></button><%=exthtml%><button onclick="QzsEditor.cancel(\'<%=index%>\');return false;" class="bt_tx_c2" style="<%=cancel_class%>">取消</button></span></p></div>';
        var contentPrefix = "Qzs_Editor_content_";
        var lengthHintPrefix = "Qzs_Editor_input_";
        var curIndex = 0;
        var facePanel = null;
        var writePoint;
        var getInstance = function(index) {
            return instance[index];
        }
        var getFacePanel = function() {
            var faceTable = "";
            for (i = 0; i < 7; i++) {
                faceTable += "<tr>";
                for (j = 0; j < 15; j++) faceTable += '<td><img src="about:blank" onerror="src=\'http://imgcache.qq.com/qzone/em/e' + (15 * i + j + 100) + '.gif\';onerror=null" onload="style.visibility=\'visible\';onload=null" onmouseover = "this.style.borderColor=\'#366EAE\';" onmouseout = "this.style.borderColor=\'#EEF7FF\';" onclick = "QzsEditor.fillContent(' + (15 * i + j + 100) + ')" width="24" style="visibility:hidden"/></td>';
                faceTable += "</tr>";
            }
            faceTable = '<table border="1" cellspacing="0" cellpadding="0" class="qzFacePanel">' + faceTable + '</table>';
            getFacePanel = function() {
                return faceTable;
            }
            return faceTable;
        }
        function getUbbCode(content) {
            content = content.replace(/\[\/(([^\x00-\xff]|[a-z])+?)\]/gi,
            function(face, value) {
                for (var i = 0,
                iLen = emText.length; i < iLen; i++) {
                    if (emText[i] == value) {
                        return "[em]e" + (i + 100) + "[/em]";
                    }
                }
                return '[/' + value + ']';
            });
            return content;
        }
        var inner;
        return inner = {
            createInstance: function(property) {
                return new MagicEditor(property);
            },
            SelectPhoto_cb: function(index, images) {
                var editor = getInstance(index);
                editor.content.focus();
                var len = images.length;
                var strLength = editor.content.value.length;
                if (len > 0) {
                    if (!window.messReplaceImages) window.messReplaceImages = [];
                    var str = '\n';
                    for (var i = 0; i < len; i++) {
                        window.messReplaceImages.push(images[i]);
                        str += '[[图片' + window.messReplaceImages.length + ']] ';
                    }
                    str += '\n';
                    str = str.lTrim();
                    if (document.selection) {
                        document.selection.createRange().text = str;
                    } else {
                        editor.content.value = editor.content.value.substr(0, editor.content.selectionStart) + str + editor.content.value.substring(editor.content.selectionStart, strLength);
                    }
                }
            },
            validateLength: function(content, index) {
                var length = getUbbCode(content).getRealLength();
                var editor = getInstance(index);
                editor.lengthHint.innerHTML = length;
            },
            ctlent: function(e, index) {
                var editor = getInstance(index);
                var key = window.event ? e.keyCode: e.which;
                if ((e.ctrlKey && key == 13) || (e.altKey && key == 83)) {
                    QzsEditor.submit(index);
                }
            },
            submit: function(index) {
                if (document.getElementById('Qzs_Editor_submit_' + index).className == "bt_disable") {
                    return false;
                }
                J('#Qzs_Editor_submit_' + index).addClass('disable');
                setTimeout(function() {
                    J('#Qzs_Editor_submit_' + index).removeClass('disable');
                },
                3000);
                curIndex = index;
                var editor = getInstance(index);
                var c = getUbbCode(editor.content.value.trim());
                if (c.getRealLength() > editor.maxLength) {
                    window.top.html_loading_frame("最多可输入" + editor.maxLength + "个字,您已经输入了" + c.getRealLength() + "个字", 1500, null, null, true);
                    return false;
                }
                if (!/\[\[图片\d+\]\]/.test(c)) {
                    window.messReplaceImages = null;
                }
                if ((c.indexOf("[em]") > -1 || (window.messReplaceImages && window.messReplaceImages.length > 0)) && J('#scrip_chk_' + index).size() && J('#scrip_chk_' + index).get(0).checked) {
                    window.top.html_loading_frame("抱歉，悄悄话留言将以小纸条方式发送，暂不支持发表情和图片。", 1500, null, null, true);
                    return false;
                }
                if (window.messReplaceImages) {
                    for (var i = 0; i < window.messReplaceImages.length; i++) {
                        c = eval('c.replace(/\\[\\[图片' + (i + 1) + '\\]\\]/ , "[url=' + messReplaceImages[i].lurl + '][img]' + messReplaceImages[i].surl + '[/img][/url]");');
                    }
                }
                var find = '.photo\.store\.qq\.com\/http_imgload\.cgi';
                var reg = new RegExp(find, "g");
                var n = c.match(reg);
                n = (n ? n.length: 0);
                if (n > 6) {
                    window.top.html_loading_frame("最多可插入3张图片,您已经插入了" + (n / 2) + "张图", 1500, null, null, true);
                    return false;
                }
                if (this.nv && (v == "" || v == "点击获取验证码")) {
                    window.top.html_loading_frame("请输入验证码", 1500, null, null, true);
                    return false;
                }
                c = c.replace(/\&/gi, '%26');
                editor.onSubmit(c);
            },
            cancel: function(index) {
                var editor = getInstance(index);
                editor.onCancel();
            },
            showFacePanel: function(archor, index) {
                QZONE.event.cancelBubble();
                var editor = getInstance(index);
                editor.panelShowing = !editor.panelShowing;
                if (!editor.panelShowing) {
                    facePanel.style.display = "none";
                } else {
                    editor.content.focus();
                    var p = QZONE.dom.getXY(archor);
                    if (!facePanel) {
                        facePanel = QZONE.dom.createElementIn("div", document.body, false, {
                            style: " position:absolute;z-index:99999;background-color:white;"
                        });
                        QZONE.event.addEvent(document.body, "click",
                        function() {
                            facePanel.style.display = "none";
                            editor.panelShowing = !editor.panelShowing;
                        });
                    }
                    QZONE.dom.setXY(facePanel, p[0] - 340, p[1] + editor.oft - 170);
                    facePanel.innerHTML = getFacePanel();
                    facePanel.style.display = "";
                    curIndex = index;
                }
            },
            click: function(index) {
                var editor = getInstance(index);
                editor.onClick();
            },
            hideFacePanel: function() {
                if (facePanel) facePanel.style.display = "none";
            },
            fillContent: function(pid) {
                var editor = getInstance(curIndex);
                if (editor.content.value.trim() == "发表评论") {
                    editor.content.value = '';
                }
                editor.content.focus();
                var str = "[/" + emText[pid - 100] + "]";
                var strLength = editor.content.value.length;
                if (document.selection) {
                    document.selection.createRange().text = str;
                } else {
                    editor.content.value = editor.content.value.substr(0, editor.content.selectionStart) + str + editor.content.value.substring(editor.content.selectionStart, strLength);
                }
                inner.hideFacePanel();
                inner.validateLength(editor.content.value, curIndex);
            },
            clear: function() {
                var editor = getInstance(curIndex);
                editor.clear();
            },
            contentFocus: function() {
                var editor = getInstance(curIndex);
                editor.content.focus();
            },
            destroy: function(index) {
                var editor = getInstance(index);
                editor.destroy();
            },
            destroyAll: function() {
                for (var i in instance) {
                    inner.destroy(i);
                }
                count = 0;
            },
            addContent: function(content, index) {
                var editor = getInstance(index);
                editor.content.value = editor.content.value + content;
                inner.validateLength(editor.content.value, index);
                editor.content.focus();
            },
            getEm: function(index) {
                return emText[index];
            },
            getCount: function() {
                return count - 1;
            }
        }
    })();
}
if (typeof QZONE == "undefined" || !QZONE) {
    var QZONE = {};
} (function() {
    var vie, vff, vopera, vsf, vapple, wintype, mactype;
    var discerned = false;
    var agent = /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel|Minefield).(\d+\.\d+))|(?:Opera.(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))/.exec(navigator.userAgent);
    var os = /(Windows.*?;)|(Mac OS X.*?;)/.exec(navigator.userAgent);
    if (agent) {
        vie = agent[1] ? parseFloat(agent[1]) : NaN;
        vff = agent[2] ? parseFloat(agent[2]) : NaN;
        vopera = agent[3] ? parseFloat(agent[3]) : NaN;
        vsf = agent[4] ? parseFloat(agent[4]) : NaN;
        if (!isNaN(vsf)) {
            try {
                vapple = parseFloat((/Version\/(\d+(?:\.\d+)?)/).exec(navigator.userAgent)[1]);
            } catch(e) {
                vapple = NaN
            }
        }
    } else {
        vie = vff = vopera = vsf = vapple = NaN;
    }
    if (os) {
        wintype = !!os[1];
        mactype = !!os[2];
    } else {
        wintype = mactype = false;
    }
    function adjustBehaviors() {
        if (ua.ie < 7) {
            try {
                document.execCommand('BackgroundImageCache', false, true);
            } catch(ignored) {}
        }
        adjusted = true;
    }
    QZONE.userAgent = {
        firefox: vff,
        ie: vie,
        opera: vopera,
        safari: vsf,
        safariV: vapple,
        windows: wintype,
        macs: mactype,
        adjustBehaviors: adjustBehaviors
    };
})();
QZONE.namespace = {
    map: function(namespace) {
        if (QZONE.lang.isHashMap(namespace)) {
            for (var k in namespace) {
                window[k] = namespace[k];
            }
        }
    }
}
QZONE.emptyFn = function() {};
QZONE.widget = {};
var ua = QZONE.userAgent;
QZONE.event = {
    KEYS: {
        BACKSPACE: 8,
        TAB: 9,
        RETURN: 13,
        ESC: 27,
        SPACE: 32,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        DELETE: 46
    },
    extendType: /(click|mousedown|mouseover|mouseup|mousemove|scroll|contextmenu)/i,
    addEvent: function(obj, eventType, fn, argArray) {
        var cfn = fn;
        var res = false;
        if (!obj.eventsList) {
            obj.eventsList = {};
        }
        if (!obj.eventsList[eventType]) {
            obj.eventsList[eventType] = {};
        }
        if (QZONE.event.extendType.test(eventType)) {
            argArray = argArray || [];
            cfn = function(e) {
                fn.apply(null, ([QZONE.event.getEvent(e)]).concat(argArray));
            };
        }
        if (obj.addEventListener) {
            obj.addEventListener(eventType, cfn, false);
            res = true;
        } else if (obj.attachEvent) {
            res = obj.attachEvent("on" + eventType, cfn);
        } else {
            res = false;
        }
        if (res) {
            obj.eventsList[eventType][fn.toString()] = cfn;
        }
        return res;
    },
    removeEvent: function(obj, eventType, fn) {
        var cfn = fn;
        var res = false;
        if (!cfn) {
            res = QZONE.event.purgeEvent(obj, eventType);
            return res;
        }
        if (QZONE.event.extendType.test(eventType) && obj.eventsList[eventType] && obj.eventsList[eventType][fn.toString()]) {
            cfn = obj.eventsList[eventType][fn.toString()];
        }
        if (obj.removeEventListener) {
            obj.removeEventListener(eventType, cfn, false);
            res = true;
        } else if (obj.detachEvent) {
            res = obj.detachEvent("on" + eventType, cfn);
        } else {
            alert("Error.");
        }
        if (res && obj.eventsList[eventType]) {
            delete obj.eventsList[eventType][fn.toString()];
        }
        return res;
    },
    purgeEvent: function(obj, type) {
        if (obj.eventsList && obj.eventsList[type]) {
            for (var i in obj.eventsList[type]) {
                if (obj.removeEventListener) {
                    obj.removeEventListener(type, obj.eventsList[type][i], false);
                } else if (obj.detachEvent) {
                    obj.detachEvent('on' + type, obj.eventsList[type][i]);
                }
            }
        }
        if (obj['on' + type]) {
            obj['on' + type] = null;
        }
    },
    getEvent: function(evt) {
        evt = evt || window.event;
        if (!evt && !QZONE.userAgent.ie) {
            var c = this.getEvent.caller;
            while (c) {
                evt = c.arguments[0];
                if (evt && Event == evt.constructor) {
                    break;
                }
                c = c.caller;
            }
        }
        return evt;
    },
    getButton: function(evt) {
        var e = QZONE.event.getEvent(evt);
        if (!e) {
            return - 1
        }
        if (QZONE.userAgent.ie) {
            return e.button - Math.ceil(e.button / 2);
        } else {
            return e.button;
        }
    },
    getTarget: function(evt) {
        var e = QZONE.event.getEvent(evt);
        if (e) {
            return e.target || e.srcElement;
        } else {
            return null;
        }
    },
    getcurrentTarget: function(evt) {
        var e = QZONE.event.getEvent(evt);
        if (e) {
            return document.activeElement || e.currentTarget;
        } else {
            return null;
        }
    },
    cancelBubble: function(evt) {
        evt = QZONE.event.getEvent();
        if (!evt) {
            return false
        }
        if (evt.stopPropagation) {
            evt.stopPropagation();
        } else {
            if (!evt.cancelBubble) {
                evt.cancelBubble = true;
            }
        }
    },
    preventDefault: function(evt) {
        evt = QZONE.event.getEvent();
        if (!evt) {
            return false
        }
        if (evt.preventDefault) {
            evt.preventDefault();
        } else {
            evt.returnValue = false;
        }
    },
    mouseX: function(evt) {
        evt = QZONE.event.getEvent();
        return evt.pageX || (evt.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
    },
    mouseY: function(evt) {
        evt = QZONE.event.getEvent();
        return evt.pageY || (evt.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
    },
    bind: function(obj, method) {
        var args = Array.prototype.slice.apply(arguments, [2, arguments.length]);
        return function() {
            var _obj = obj || this;
            var _args = args.slice();
            for (var jj = 0; jj < arguments.length; jj++) {
                _args.push(arguments[jj]);
            }
            if (typeof(method) == "string") {
                if (_obj[method]) {
                    return _obj[method].apply(_obj, _args);
                }
            } else {
                return method.apply(_obj, _args);
            }
        }
    }
}
QZONE.event.on = QZONE.event.addEvent;
QZONE.dom = {
    getById: function(id) {
        return document.getElementById(id);
    },
    getByName: function(name, tagName) {
        if (!tagName) return document.getElementsByName(name);
        var arr = [];
        var e = document.getElementsByTagName(tagName);
        for (var i = 0; i < e.length; ++i) {
            if ( !! e[i].getAttribute("name") && (e[i].getAttribute("name").toLowerCase() == name.toLowerCase())) {
                arr.push(e[i]);
            }
        }
        return arr;
    },
    get: function(e) {
        if (e && (e.tagName || e.item)) {
            return e;
        }
        return this.getById(e);
    },
    removeElement: function(el) {
        if (!el) {
            return;
        }
        if (el.removeNode) {
            el.removeNode(true);
        } else {
            if (el.childNodes.length > 0) {
                for (var ii = el.childNodes.length - 1; ii >= 0; ii--) {
                    QZONE.dom.removeElement(el.childNodes[ii]);
                }
            }
            el.parentNode.removeChild(el);
        }
        el = null;
        return null;
    },
    searchElementByClassName: function(el, className) {
        el = this.get(el);
        if (!el) {
            return null
        }
        var re = QZONE.css.getClassRegEx(className);
        while (el) {
            if (re.test(el.className)) {
                return el;
            }
            el = el.parentNode;
        }
        return null;
    },
    createElementIn: function(tagName, el, insertFirst, attributes) {
        tagName = tagName || "div";
        el = this.get(el) || document.body;
        var _doc = el.ownerDocument;
        var _e = _doc.createElement(tagName);
        if (attributes) {
            for (var k in attributes) {
                if (/class/.test(k)) {
                    _e.className = attributes[k];
                } else if (/style/.test(k)) {
                    _e.style.cssText = attributes[k];
                } else {
                    _e[k] = attributes[k];
                }
            }
        }
        if (insertFirst) {
            el.insertBefore(_e, el.firstChild);
        } else {
            el.appendChild(_e);
        }
        return _e;
    },
    getStyle: function(el, property) {
        el = this.get(el);
        var w3cMode = document.defaultView && document.defaultView.getComputedStyle;
        var value = "";
        switch (property) {
        case "float":
            property = w3cMode ? "cssFloat": "styleFloat";
            break;
        case "opacity":
            if (!w3cMode) {
                var val = 100;
                try {
                    val = el.filters['DXImageTransform.Microsoft.Alpha'].opacity;
                } catch(e) {
                    try {
                        val = el.filters('alpha').opacity;
                    } catch(e) {}
                }
                return val / 100;
            }
        }
        if (w3cMode) {
            var computed = document.defaultView.getComputedStyle(el, '');
            if (computed) {
                value = computed[property];
            }
            return (value || el.style[property]);
        } else {
            return (el.currentStyle[property] || el.style[property]);
        }
    },
    createNamedElement: function(type, name, doc) {
        doc = doc || document;
        var element;
        try {
            element = doc.createElement('<' + type + ' name="' + name + '">');
        } catch(ignore) {}
        if (!element || !element.name) {
            element = doc.createElement(type);
            element.name = name;
        }
        return element;
    },
    setStyle: function(el, property, value) {
        el = this.get(el);
        if (!el) {
            return false;
        }
        var w3cMode = document.defaultView && document.defaultView.getComputedStyle;
        switch (property) {
        case "float":
            property = w3cMode ? "cssFloat": "styleFloat";
        case "opacity":
            if (!w3cMode) {
                if (value >= 1) {
                    el.style.filter = "";
                    return;
                }
                el.style.filter = 'alpha(opacity=' + (value * 100) + ')';
                return true;
            } else {
                el.style[property] = "";
            }
        default:
            if (typeof el.style[property] == "undefined") {
                return false
            }
            el.style[property] = value;
            return true;
        }
    },
    getPosition: function(el) {
        var xy = QZONE.dom.getXY(el);
        var size = QZONE.dom.getSize(el);
        return {
            "top": xy[1],
            "left": xy[0],
            "width": size[0],
            "height": size[1]
        };
    },
    getXY: function(el) {
        var _t = 0;
        var _l = 0;
        if (document.documentElement.getBoundingClientRect) {
            var box = el.getBoundingClientRect();
            var oDoc = el.ownerDocument;
            _t = box.top - 2 + this.getScrollTop(oDoc);
            _l = box.left - 2 + this.getScrollLeft(oDoc);
        } else {
            while (el.offsetParent) {
                _t += el.offsetTop;
                _l += el.offsetLeft;
                el = el.offsetParent;
            }
        }
        return [_l, _t];
    },
    getSize: function(el) {
        var _w = el.offsetWidth;
        var _h = el.offsetHeight;
        return [_w, _h];
    },
    setXY: function(el, x, y) {
        el = this.get(el);
        var _ml = parseInt(this.getStyle(el, "marginLeft")) || 0;
        var _mt = parseInt(this.getStyle(el, "marginTop")) || 0;
        this.setStyle(el, "left", parseInt(x) - _ml + "px");
        this.setStyle(el, "top", parseInt(y) - _mt + "px");
    },
    getScrollLeft: function(doc) {
        doc = doc || document;
        return Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft);
    },
    getScrollTop: function(doc) {
        doc = doc || document;
        return Math.max(doc.documentElement.scrollTop, doc.body.scrollTop);
    },
    getScrollHeight: function(doc) {
        doc = doc || document;
        return Math.max(doc.documentElement.scrollHeight, doc.body.scrollHeight);
    },
    getScrollWidth: function(doc) {
        doc = doc || document;
        return Math.max(doc.documentElement.scrollWidth, doc.body.scrollWidth);
    },
    setScrollLeft: function(value, doc) {
        doc = doc || document;
        doc[doc.compatMode == "CSS1Compat" ? "documentElement": "body"].scrollLeft = value;
    },
    setScrollTop: function(value, doc) {
        doc = doc || document;
        doc[doc.compatMode == "CSS1Compat" ? "documentElement": "body"].scrollTop = value;
    },
    getClientHeight: function(doc) {
        doc = doc || document;
        return doc.compatMode == "CSS1Compat" ? doc.documentElement.clientHeight: doc.body.clientHeight;
    },
    getClientWidth: function(doc) {
        doc = doc || document;
        return doc.compatMode == "CSS1Compat" ? doc.documentElement.clientWidth: doc.body.clientWidth;
    },
    setSize: function(el, width, height) {
        el = this.get(el);
        var _wFix = /\d+([a-z%]+)/i.exec(width);
        _wFix = _wFix ? _wFix[1] : "";
        var _hFix = /\d+([a-z%]+)/i.exec(height);
        _hFix = _hFix ? _hFix[1] : "";
        this.setStyle(el, "width", (!width || width < 0 || /auto/i.test(width)) ? "auto": (parseInt(width) + (_wFix || "px")));
        this.setStyle(el, "height", (!height || height < 0 || /auto/i.test(height)) ? "auto": (parseInt(height) + (_hFix || "px")));
    },
    getDocumentWindow: function(doc) {
        _doc = doc || document;
        return _doc.parentWindow || _doc.defaultView;
    },
    XMLselectSingleNode: function(o, xpath) {
        var x = QZONE.dom.XMLselectNodes(o, xpath) if (!x || x.length < 1) return null;
        return x[0];
    },
    XMLselectNodes: function(o, xpath) {
        var xpe = new XPathEvaluator();
        var nsResolver = xpe.createNSResolver(o.ownerDocument == null ? o.documentElement: o.ownerDocument.documentElement);
        var result = xpe.evaluate(xpath, o, nsResolver, 0, null);
        var found = [];
        var res;
        while (res = result.iterateNext()) {
            found.push(res);
        }
        return found;
    }
};
var _CN = QZONE.dom.createNamedElement;
var $ = QZONE.dom.getById;
var removeNode = QZONE.dom.removeElement;
G_TMP.smarthSchool = {};
G_TMP.smartSchoolVal = {};
G_TMP.focusSchool = 0;
function SmartSchool(e, jq, callback, callwho) {
    loadJS("http://" + DOMAINS.IMGCACHE + "/campus/js/sync/smart_school.js",
    function() {
        SmartSchool(e, jq, callback);
    });
}
function SmartSchoolCheck(jq, callback, type) {
    var val = jq.val().trim(),
    tm = 0;
    if (type == 1) {
        if (J("#SmartSchool li").size() > 0) {
            J("#SmartSchool li").each(function() {
                if (J(this).text() == val) {
                    J(this).click();
                    tm = 1;
                    return false;
                }
            });
            if (tm == 1) return false;
            else callback(0, '');
        }
    } else if (type == 2) {
        if (J("#SmartSchool .current").size() > 0) {
            J("#SmartSchool .current").click();
            return false;
        }
        if (val.length && G_TMP.smartSchoolVal[val]) {
            J("#SmartSchool,#frame_hidden").remove();
            callback(G_TMP.smartSchoolVal[val], val);
            return false;
        }
        if (J("#SmartSchool li").size() > 0) {
            J("#SmartSchool li:first").click();
            return false;
        }
    } else {
        return false;
    }
    return false;
}
var SelectorOpener = {
    open_school_select: function() {
        setTimeout(function() {
            html_frame_new('选择学校', '<iframe id="school_select_iframe" name="school_select_iframe" frameborder="0" scrolling="no" width="100%" height="370px" src="http://' + DOMAINS.API + '/html/select_school.html"></iframe>', null, null, {
                wid: "school_select_pop",
                div_width: 660,
                submit_not_close: true,
                no_submit: true,
                no_cancel: true
            });
        },
        10);
    },
    open_collage_select: function() {
        if (0 == Fid(school_select_params.type_select).value) {
            html_error_frame('温馨提示', '请先选择学历');
            return;
        }
        if (0 == Fid(school_select_params.schoolid_hidden).value) {
            html_error_frame('温馨提示', '请先选择学校');
            return;
        }
        if (0 == Fid(school_select_params.year_select).value) {
            html_error_frame('温馨提示', '请先选择入学年份');
            return;
        }
        setTimeout(function() {
            html_frame_new('选择院系', '<iframe id="collage_select_iframe" name="collage_select_iframe" frameborder="0" scrolling="no" width="100%" height="195px" src="http://' + DOMAINS.API + '/html/select_collage.html"></iframe>', null, null, {
                wid: "collage_select_pop",
                div_width: 610,
                submit_not_close: true,
                no_submit: true,
                no_cancel: true
            })
        },
        10);
    },
    open_class_select: function() {
        if (0 == Fid(school_select_params.type_select).value) {
            html_error_frame('温馨提示', '请先选择学历');
            return;
        }
        if (0 == Fid(school_select_params.schoolid_hidden).value) {
            html_error_frame('温馨提示', '请先选择学校');
            return;
        }
        if (0 == Fid(school_select_params.year_select).value) {
            html_error_frame('温馨提示', '请先选择入学年份');
            return;
        }
        setTimeout(function() {
            html_frame_new('选择班级', '<iframe id="class_select_iframe" name="class_select_iframe" frameborder="0" scrolling="no" width="100%" height="195px" src="http://' + DOMAINS.API + '/html/select_class.html"></iframe>', null, null, {
                wid: "class_select_pop",
                div_width: 610,
                submit_not_close: true,
                no_submit: true,
                no_cancel: true
            })
        },
        10);
    }
};
window.GbuildReplyListView = function(info, time, content, option) {
    if (!info) return '';
    var name = info.realname;
    var op = {};
    time = time || '刚刚';
    J.extend(op, option);
    var _t = '<div class="item' + (op.is_hide ? ' item_hide': '') + (op.item_class ? ' ' + op.item_class: '') + '"' + (op.is_hide ? ' style="display:none"': '') + '>';
    if (op.show_logo) {
        if (info.u) _t += '<div class="pic_item"><a href="http://' + DOMAINS.MAIN + '/index.php?mod=profile&u=' + info.u + '" target="_blank"><img src="' + info.logo + '" /></a></div>';
        else _t += '<div class="pic_item"><img src="http://' + DOMAINS.IMGCACHE + '/campus_v2/img/demo/img_0.png" /></div>';
        _t += '<div class="tx_item"><p>' + (info.u ? '<a href="http://' + DOMAINS.MAIN + '/index.php?mod=profile&u=' + info.u + '" target="_blank" class="emlink">' + name + '</a>': name) + '<span class="time">' + time + (info.u ? '': ' 来自QQ空间用户') + '</span></p><p>' + content + '</p></div>';
    } else {
        _t += '<div class="tx_item" style="margin-left:10px"><p>' + (info.u ? '<a href="http://' + DOMAINS.MAIN + '/index.php?mod=profile&u=' + info.u + '" target="_blank" class="emlink">' + name + '</a>': name) + '：' + content + '<span class="time">' + time + (info.u ? '': ' 来自QQ空间用户') + '</span></p></div>';
    }
    _t += '</div>';
    return _t;
};
window.GbuildReplyLiteBox = function(index, click_cb, id_prefix, option) {
    var op = {
        'text': '评论..'
    };
    id_prefix = id_prefix || 'reply_textarea';
    J.extend(op, option);
    return '<div class="item item_btm"><textarea id="' + id_prefix + index + '_btn" onfocus="' + click_cb + '(\'' + index + '\')" class="reply c_tx2">' + op.text + '</textarea><div id="' + id_prefix + index + '" style="display:none"></div></div>';
};
window.GbuildReplyItem = function(div_id, cb, option) {
    if (G_TMP.GCloseReplyItem) clearTimeout(G_TMP.GCloseReplyItem);
    var op = {
        'word_limit': 100,
        'after_btn': '',
        'focus': true
    };
    J.extend(op, option);
    GbuildCloseReplyItem();
    J("#" + div_id + "_btn").hide();
    J("#" + div_id + "_btn_close").show();
    G_TMP.cur_reply_item = div_id;
    var _t = '<div class="global_post_comment" id="global_reply_box"><form id="global_reply_box_form" onsubmit="return false">' + '<p><textarea rows="" cols="" id="global_reply_box_ta" onkeydown="keySubmit(event, \'#global_reply_box_submit\');" onkeyup="CheckInputCount(this,\'' + op.word_limit + '\')" name="content"></textarea></p><p class="global_fun_wrap"><span class="gb_fun_l"><span class="c_tx" id="global_reply_box_ta_num">0</span>/' + op.word_limit + '</span><span class="bt_fun"><button type="button" id="global_reply_box_submit" class="bt_tx2">提交</button><a href="#" id="global_reply_box_cancel">取消</a>' + op.after_btn + '</span></p></form></div>';
    J("#" + div_id).show().rhtml(_t);
    J("#" + div_id + "_wrap").show();
    if (op.focus) J("#global_reply_box_ta").focus();
    J("#global_reply_box_submit").click(function() {
        var ta_val = J("#global_reply_box_ta").val();
        if (isEmpty(ta_val)) return html_loading_frame('没有填写内容');
        G_TMP.input_dis = J("#global_reply_box_submit");
        cb(ta_val, J("#global_reply_box_form").serializeArray());
    });
    J("#global_reply_box_cancel").click(function() {
        GbuildCloseReplyItem();
        return false;
    });
    J('#' + div_id).bind('click',
    function() {
        if (G_TMP.GCloseReplyItem) clearTimeout(G_TMP.GCloseReplyItem);
    });
    J("#global_reply_box_ta").bind("blur",
    function() {
        if (J(this).val() == '') {
            G_TMP.GCloseReplyItem = setTimeout(GbuildCloseReplyItem, 100);
            return false;
        }
    });
};
window.GbuildCloseReplyItem = function() {
    J("#global_reply_box").remove();
    if (G_TMP.cur_reply_item) {
        var t = G_TMP.cur_reply_item;
        J("#" + t + "_btn_close").hide();
        J("#" + t + "_btn").show();
        J("#" + t + ",#" + t + "_wrap").hide();
    }
    G_TMP.cur_reply_item = null;
};
window._getNameValue = function(obj, name) {
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].name == name) {
            return obj[i].value;
        }
    }
    return null;
};
/*  |xGv00|f07c89f5c8a51d461a5738d457507af0 */
