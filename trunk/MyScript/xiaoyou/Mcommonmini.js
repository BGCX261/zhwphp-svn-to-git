JSL.installClass('common1',
function() {
    String.prototype.lTrim = function() {
        return this.replace(/^\s*/, "");
    }
    String.prototype.rTrim = function() {
        return this.replace(/\s*$/, "");
    }
    String.prototype.trim = function() {
        return this.rTrim().lTrim();
    }
    String.prototype.hash_filter = function() {
        return this.replace(/[^a-f0-9]/gi, '');
    }
    String.prototype.getLength = function(len) {
        len = len ? len: 3;
        return this.replace(/[^\x00-\xff]/gi, 'xxx').length;
    }
    window.FaddEvent = function(e, evt, fn, isID) {
        if (isID == true) e = Fid(e);
        if (!Fempty(e.attachEvent) && (typeof(e.attachEvent) == "function" || typeof(e.attachEvent) == "object")) e.attachEvent("on" + evt, fn);
        else if (!Fempty(e.addEventListener) && (typeof(e.addEventListener) == "function" || typeof(e.addEventListener) == "object")) e.addEventListener(evt, fn, false);
    }
    window.FgetScrollPostion = function() {
        if (jQuery.browser.msie && jQuery.browser.version == 6) return {
            left: document.body.scrollLeft,
            top: document.body.scrollTop
        };
        return {
            left: document.documentElement.scrollLeft,
            top: document.documentElement.scrollTop
        };
    }
    window.FsetPostion = function(e, x, y, w, h, isID) {
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
    window.FgetPostion = function(e, isID) {
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
    window.FsetOffsetWindowPostionByRate = function(e, nx, ny, isID) {
        if (isID == true) e = Fid(e);
        if (!e) return;
        var w = J(window).width(),
        h = J(window).height();
        FsetOffsetWindowPostion(e, (w - e.offsetWidth) / nx, (h - e.offsetHeight) / ny);
    }
    window.FsetOffsetWindowPostion = function(e, x, y, isID) {
        if (isID == true) e = Fid(e);
        var p = FgetScrollPostion();
        FsetPostion(e, x + p.left, y + p.top, -1, -1);
    }
    window.FgetScrollPostion = function(doc) {
        doc = doc || document;
        var l = Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft) t = Math.max(doc.documentElement.scrollTop, doc.body.scrollTop);
        return {
            left: l,
            top: t
        };
    }
    window.FgetPageSize = function() {
        if (document.compatMode != "CSS1Compat") {
            return {
                width: document.body.scrollWidth,
                height: Math.max(document.body.clientHeight, document.body.scrollHeight)
            };
        }
        return {
            width: document.documentElement.scrollWidth,
            height: Math.max(document.documentElement.clientHeight, document.documentElement.scrollHeight)
        };
    }
    window.DrawImage = function(ImgD, img_width, img_height, after_show, cb) {
        var image = ImgD;
        if (after_show) {
            var image = new Image();
            image.src = ImgD.src;
        }
        var size = calcDrawImage(image.width, image.height, img_width, img_height);
        if (!size) return;
        ImgD.width = size.w;
        ImgD.height = size.h;
        if (cb) {
            cb();
        }
    }
    window.calcDrawImage = function(o_img_w, o_img_h, w, h) {
        if (w <= 0 && w <= 0) {
            return false;
        }
        o_img_w = parseInt(o_img_w);
        o_img_h = parseInt(o_img_h);
        var draw_type = 0;
        if (w > 0 && h > 0) {
            draw_type = (o_img_w / w >= o_img_h / h) ? 1 : 2;
        } else if (w > 0 && h <= 0) {
            draw_type = 1;
        } else {
            draw_type = 2;
        }
        if (draw_type == 1) {
            if (o_img_w > w) {
                var rh = (o_img_h * w) / o_img_w;
                return {
                    'w': w,
                    'h': rh
                };
            } else {
                return {
                    'w': o_img_w,
                    'h': o_img_h
                };
            }
        } else if (draw_type == 2) {
            if (o_img_h > h) {
                var rw = (o_img_w * h) / o_img_h;
                return {
                    'w': rw,
                    'h': h
                };
            } else {
                return {
                    'w': o_img_w,
                    'h': o_img_h
                };
            }
        }
    }
    window.Farray_exist = function(d, v) {
        for (var i = 0; i < d.length; i++) {
            if (d[i] == v) return true;
        }
        return false;
    }
    window.array_remove = function(arr, dx) {
        if (isNaN(dx) || dx > arr.length) {
            return arr;
        }
        arr.splice(dx, 1);
        return arr;
    }
    window.obj_clone = function(old_obj) {
        var newObj = new Object();
        for (elements in old_obj) {
            newObj[elements] = old_obj[elements];
        }
        return newObj;
    }
    window.FgetUin = function() {
        var uin = parseInt(FgetCookie("zzpaneluin"));
        if (FvaildateUin(uin)) return uin;
        var R = /^o(0)*/;
        uin = FgetCookie("uin");
        uin = parseInt(uin.replace(R, ''));
        return ((FvaildateUin(uin)) ? uin: false)
    }
    window.FvaildateUin = function(uin) {
        var R = /^[1-9]\d{4,11}$/;
        return R.test(uin);
    }
    window.FisLogon = function() {
        var uin = FgetUin();
        return (uin == false) ? false: true;
    }
    window.DOMAINS = {
        'COOKIE_DOMAIN': 'pengyou.qq.com',
        'MAIN': 'pengyou.qq.com',
        'REG': 'reg.pengyou.qq.com',
        'API': 'api.pengyou.qq.com',
        'FEED': 'feed.pengyou.qq.com',
        'APP': 'app.pengyou.qq.com',
        'IMGCACHE': 'imgcache.qq.com',
        'OFFICE': 'pengyou.qq.com'
    };
    if (window.jQuery && !window.J) window.J = jQuery.noConflict();
    window.FgetCookie = function(name) {
        var r = new RegExp("(^|;|\\s+)" + name + "=([^;]*)(;|$)");
        var m = document.cookie.match(r);
        return (!m ? "": m[2]);
    };
    window.FdeleteCookie = function(name, domain) {
        if (!Fempty(domain)) document.cookie = name + "=; path=/; domain=" + domain + "; expires=Fri, 02-Jan-1970 00:00:00 GMT";
        else document.cookie = name + "=; path=/; expires=Fri, 02-Jan-1970 00:00:00 GMT";
    };
    window.FaddCookie = function(name, v, path, expire, domain, noescape) {
        var s = name + "=" + ((noescape) ? v: encodeURIComponent(v));
        if (!Fempty(path)) path = "/";
        if (expire > 0) {
            var d = new Date();
            d.setTime(d.getTime() + expire * 1000);
            if (!Fempty(domain)) s = s + "; path=" + path + "; domain=" + domain + "; expires=" + d.toGMTString();
            else s = s + "; path=" + path + "; expires=" + d.toGMTString();
        }
        document.cookie = s;
    };
    var isp = FgetCookie('ptisp');
    if (isp != '' && jQuery.inArray(isp, ['ctc', 'cnc', 'edu']) != -1) {
        window.DOMAINS['IMGCACHE'] = isp + '.' + window.DOMAINS['IMGCACHE'];
    }
    if (document.domain.indexOf('.qq.com') != -1) document.domain = "qq.com";
    if (!window.XY) {
        window.XY = {};
        XY.widget = {};
    }
    window.G_V = {
        "pTitle": "温馨提示",
        "bimg": "http://" + DOMAINS.IMGCACHE + "/campus_v2/ac/b.gif"
    };
    window.DE_LOGO = 'http://' + DOMAINS.IMGCACHE + '/campus/images/2.png';
    window.QZR_max = window.QZR_max ? QZR_max: 0;
    window.G_TMP = {};
    setInterval(function() {
        G_TMP = null;
        G_TMP = {};
    },
    3600000);
    if (J.browser.msie && J.browser.version == 6) {
        try {
            document.execCommand("BackgroundImageCache", false, true);
        } catch(err) {}
    }
    window.onlyChinese = function(s) {
        return /^[\u0391-\uFFE5]+$/g.test(s);
    }
    window.toTop = function() {
        window.scrollTo(0, 0);
    };
    window.getURLArgs = function(str, k) {
        str = (str) ? str: location.href;
        var s = str.indexOf("?");
        var e = (str.indexOf("#") == -1) ? str.length: str.indexOf("#");
        var r = {};
        if (s != -1) {
            var ts = str.substring(s + 1, e);
            ts = ts.split("&");
            var t;
            for (var i = 0; i < ts.length; i++) {
                t = ts[i].split("=");
                if (t.length == 2) {
                    r[t[0]] = t[1];
                }
            }
        }
        if (k) return (r[k] ? r[k] : false);
        return r;
    };
    window.loadJS = function(url, cb, option) {
        if (option && option.charset) option.scriptCharset = option.charset;
        var op = {
            type: 'GET',
            url: url,
            success: cb,
            dataType: 'script',
            cache: false
        };
        J.extend(op, option);
        J.ajax(op);
    };
    window.loadCSS = function(url, id) {
        if (id && J("#" + id).size() > 0) {
            return true;
        }
        var head = document.getElementsByTagName('head')[0];
        id = id || '';
        J(head).append('<link href="' + url + '" id="' + id + '" rel="stylesheet" type="text/css" media="screen" />');
        return true;
    };
    window.getLoadingImg = function(pTop, pBottom) {
        pTop = (pTop) ? pTop: 20;
        pButtom = (pBottom) ? pBottom: 20;
        return '<p style="text-align:center; padding:' + pTop + 'px 0 ' + pButtom + 'px;"><img src="http://' + DOMAINS.IMGCACHE + '/campus/images/loading_a0a46.gif" /></p>';
    }
    window.toggle_div = function(div_id, ele, prefix, cb1, cb2, force) {
        prefix = (prefix) ? prefix: '';
        if (J("#" + div_id).css("display") != "none" || force == 'hide') {
            J("#" + div_id).hide();
            if (ele) {
                ele.className = prefix + 'put_away ' + prefix + 'up';;
                ele.title = '展开';
                ele.innerHTML = '<span>展开</span>';
            }
            if (cb1) cb1();
        } else {
            J("#" + div_id).show();
            if (ele) {
                ele.className = prefix + 'unfold ' + prefix + 'down';
                ele.title = '收起';
                ele.innerHTML = '<span>收起</span>';
            }
            if (cb2) cb2();
        }
    };
    window.strip_test_word = function(str) {
        str = (str) ? str: '';
        str = str.replace('<!-- @success@ -->', '');
        str = str.replace('<!-- @error@ -->', '');
        return str;
    };
    window.CheckInputCount = function(el, max) {
        var jq = J(el);
        var jn = J("#" + jq.attr("id") + "_num");
        var cv = jq.val().trim();
        var cl = cv.length;
        if (cl <= max) {
            jn.text(cl);
            return true;
        }
        var nv = '';
        for (var i = 0; i < cv.length; i++) {
            var cvc = cv.substring(i, i + 1);
            var cvcl = cvc.length;
            var nvl = nv.length;
            if (nvl >= max || (cvcl > 1 && (nvl + cvcl) > max)) {
                break;
            }
            nv += cvc;
        }
        jq.val(nv);
        jn.text(nv.length);
        return true;
    };
    window.Fpages = function(p, pn, pcontainer, cbclick, max_page, option) {
        var op = {
            'button': 'button',
            'next_class': 'page_pre',
            'first_last': true
        };
        J.extend(op, option);
        var MaxPages = max_page ? max_page: 10;
        var pc = Fid(pcontainer);
        if (typeof(pc) == 'undefined') {
            return false;
        }
        var pc_parent = J(pc).parent();
        if (pn <= 1) {
            if (pc_parent.hasClass('page')) {
                pc_parent.hide();
            }
            pc.style.display = 'none';
            return true;
        }
        var vcb = (typeof(cbclick) == 'function');
        var i;
        for (i = pc.childNodes.length - 1; i >= 0; i--) {
            pc.removeChild(pc.childNodes[i]);
        }
        var a;
        var ps;
        var pe;
        if (pn <= MaxPages) {
            ps = 1;
            pe = pn;
        } else {
            var pm = Math.ceil(MaxPages / 2);
            if (p <= pm) {
                ps = p - pm;
                if (ps < 1) {
                    ps = 1;
                }
                pe = ps + MaxPages
            } else {
                pe = p + pm;
                if (pe > pn) {
                    pe = pn;
                }
                ps = pe - MaxPages
            }
        }
        if (op.first_last) {
            a = document.createElement(op.button);
            a.href = '#';
            a.className = op.next_class;
            a.innerHTML = '第一页';
            pc.appendChild(a);
            if (vcb && p != 1) {
                FaddEvent(a, 'click',
                function() {
                    cbclick(1);
                    return false;
                },
                0);
            }
        }
        a = document.createElement(op.button);
        a.href = '#';
        a.className = op.next_class;
        a.innerHTML = '上一页';
        pc.appendChild(a);
        if (vcb) {
            if (p > 1) {
                FaddEvent(a, 'click',
                function() {
                    cbclick(p - 1);
                    return false;
                },
                0);
            } else {
                FaddEvent(a, 'click',
                function() {
                    return false;
                },
                0);
            }
        }
        for (i = ps; i <= pe; i++) {
            a = document.createElement('a');
            a.href = '#';
            a.innerHTML = i;
            a.className = 'bor3';
            if (i == p) {
                a.className = 'bor3 here current';
            }
            pc.appendChild(a);
            if (vcb) { (function(i) {
                    FaddEvent(a, 'click',
                    function() {
                        cbclick(i);
                        return false;
                    },
                    0);
                })(i);
            }
        }
        a = document.createElement(op.button);
        a.href = '#';
        a.className = op.next_class;
        a.innerHTML = '下一页';
        pc.appendChild(a);
        if (vcb) {
            if (p < pn) {
                FaddEvent(a, 'click',
                function() {
                    cbclick(p + 1);
                    return false;
                },
                0);
            } else {
                FaddEvent(a, 'click',
                function() {
                    return false;
                },
                0);
            }
        }
        if (op.first_last) {
            a = document.createElement(op.button);
            a.href = '#';
            a.className = op.next_class;
            a.innerHTML = '最后页';
            pc.appendChild(a);
            if (vcb && p != pn) {
                FaddEvent(a, 'click',
                function() {
                    cbclick(pn);
                    return false;
                },
                0);
            }
        }
        pc.style.display = "";
        if (pc_parent.size() > 0) pc_parent.show();
    };
    window.regLogo = function(e, src) {
        regImg(e, src, 1, 1);
    };
    window.regImg = function(e, src, time, is_logo) {
        if (!window.imgHash) window.imgHash = new Object();
        var a = imgHash[src];
        e.onerror = null;
        if (a == null) {
            if (is_logo) {
                e.src = DE_LOGO;
            } else {
                e.style.display = "none";
            }
            a = imgHash[src] = [];
            a[0] = new Image();
            a[1] = e;
            a[0].onload = function() {
                setImges(a);
            };
            time = time ? time * 1000 : 1000;
            J(document).ready(function() {
                setTimeout(function() {
                    a[0].src = src;
                },
                time);
            });
        } else {
            if (a[0].readyState == "complete") {
                e.src = src;
            } else {
                if (is_logo) {
                    e.src = DE_LOGO;
                } else {
                    e.style.display = "none";
                }
                a[a.length] = e;
            }
        }
    };
    window.setImges = function(a) {
        for (var i = 1; i < a.length; i++) {
            a[i].src = a[0].src;
            a[i].style.display = "";
        }
        a.length = 1;
        a[0].onload = null;
    };
    window.keySubmit = function(e, button) {
        var k = e.charCode || e.keyCode || 0;
        if ((e.ctrlKey && k == 13) || (J.browser.msie && e.altKey && k == 83)) {
            J(button).click();
        }
    };
    window.inputDisable = function(dis, bt_class) {
        dis = dis ? dis: G_TMP.input_dis;
        if (dis) {
            if (bt_class != 'none') J(dis).addClass("disable");
            J(dis).attr("disabled", true);
        }
    };
    window.inputEnable = function(dis) {
        dis = dis ? dis: G_TMP.input_dis;
        if (dis) {
            J(dis).removeClass("disable").removeAttr("disabled");
            G_TMP.input_dis = null;
        }
    };
    window.escapeHTML = function(s) {
        return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    };
    window.pingIntval = function(_intval) {
        var t = [10, 20, 60, 300, 600, 1800];
        if (!window.pingIntvalIndex) window.pingIntvalIndex = 1;
        if (window.pingIntvalIndex > t.length) {
            window.pingIntvalIndex = null;
            return;
        };
        if (_intval) {
            setTimeout("pingIntval()", (t[window.pingIntvalIndex] - t[window.pingIntvalIndex - 1]) * 1000);
            return true;
        }
        var i = new Image();
        i.src = "http://" + DOMAINS.MAIN + "/ping.php?" + Math.random();
        window.pingIntvalIndex++;
        pingIntval(1);
    };
    window.getUserLogo = function(u, state) {
        var urls = ['http://xy.store.qq.com/', 'http://xy1.store.qq.com/', 'http://xy2.store.qq.com/'];
        if (state && parseInt(state) < 2) return 'http://' + DOMAINS.IMGCACHE + '/campus/images/0.png';
        return urls[Math.floor(Math.random() * urls.length)] + u + "0";
    };
    window.isEmpty = function(v) {
        if (v != null && (typeof(v) == 'object' || typeof(v) == 'function')) {
            if (jQuery.isArray(v) && v.length == 0) {
                return true;
            }
            return false;
        }
        return (("" == v || undefined == v || null == v) ? true: false);
    };
    window.cut_string = function(str, num, subfix) {
        if (subfix == undefined) subfix = '...';
        if (str && str.length > num) {
            str = str.substring(0, num) + subfix;
        }
        return str;
    };
    window.getCookieUserInfo = function(cb, force) {
        var qq = FgetUin();
        if (!qq) {
            if (!cb) return false;
            return cb(false);
        }
        var hash = FgetCookie("hash"),
        name = FgetCookie("name"),
        sex = FgetCookie("sex"),
        appint = FgetCookie("appint"),
        flag = FgetCookie("xyflag");
        if (!isEmpty(hash)) {
            var tmp = hash.split('_');
            if (tmp.length == 2 && parseInt(tmp[0]) == parseInt(qq)) hash = tmp[1];
            else hash = '';
        }
        if (!cb) {
            if (!isEmpty(hash) && !isEmpty(name) && !isEmpty(flag)) {
                return {
                    'qq': qq,
                    'hash': hash,
                    'name': decodeURIComponent(name),
                    'sex': sex,
                    'appint': appint,
                    'flag': flag
                };
            } else {
                return false;
            }
        }
        if (!force && !isEmpty(hash) && !isEmpty(name) && !isEmpty(flag)) {
            return cb({
                'qq': qq,
                'hash': hash,
                'name': decodeURIComponent(name),
                'sex': sex,
                'appint': appint,
                'flag': flag
            });
        }
        var _cb = function(d) {
            cb(d, 1);
        };
        J.xyjsonp("getCookieInfo", "http://" + DOMAINS.API + "/jsonp.php", {
            "mod": "home",
            "act": "getcookieinfo",
            "r": Math.random()
        },
        _cb);
    };
    window.XYlogout = function() {
        var user = USER.getCUSER();
        var uin = user.get('qq') || 0,
        flag = user.get('flag');
        if (flag == 2) {
            var token = FgetCookie('bai_ck');
            window.location.href = 'http://' + DOMAINS.MAIN + '/index.php?mod=login2&act=logout&token=' + token;
        } else {
            window.location.href = 'http://' + DOMAINS.MAIN + '/index.php?mod=login&act=out&uin=' + uin;
        }
    };
    window.XYgetLoginHash = function() {
        if (!window.login_hash) {
            var tmp = J("#my_home > a").attr('href').match(/&u=([0-9a-f]+)/);
            window.login_hash = tmp && tmp[1] ? tmp[1] : null;
        }
        return window.login_hash;
    };
    window.Fid = function(id) {
        return document.getElementById(id);
    };
    window.Fempty = function(v) {
        if (v != null && (typeof(v) == 'object' || typeof(v) == 'function')) return false;
        return (('' == v || undefined == v || null == v) ? true: false);
    };
    window.USER = function(data) {
        this.data = data || {};
    };
    USER.prototype = {
        get: function(name) {
            return this.data[name];
        },
        set: function(name, value) {
            this.data[name] = value;
        }
    };
    window.USER.getCUSER = function() {
        if (typeof window.CUSER != 'object') {
            window.CUSER = new USER({
                'qq': FgetUin(),
                'flag': 1
            });
            getCookieUserInfo(function(d) {
                if (d.flag) {
                    for (var k in d) {
                        window.CUSER.set(k, d[k]);
                    }
                }
            });
            return window.CUSER;
        }
        return window.CUSER;
    };
    window.isURL = function(s) {
        var RegExps = /^(?:ht|f)tp(?:s)?\:\/\/(?:[\w\-\.]+)\.\w+/i;
        return RegExps.test(s)
    };
    window.xy_domain = 'http://' + DOMAINS.MAIN;
    window.API_domain = 'http://' + DOMAINS.API;
    window.XY_STYLE = (function() {
        function appendPad() {
            if (J("#stylePad").size() > 0) return true;
            var styles = {
                0 : 0,
                2 : 2,
                1 : 1,
                6 : 5,
                7 : 7
            },
            _h = '';
            var style_info = getInfos(),
            festivalId = style_info[1];
            if (festivalId) {
                styles[festivalId] = festivalId;
            }
            for (var id in styles) {
                _h += '<li><a href="#" onclick="changeStyle(' + id + '); return false"><span class="xpy-sprite to-skin-' + id + '"></span></a></li>';
            }
            J("#header_style_menu").html(_h);
            if (festivalId) {
                J("#header_style_menu").width(J("#header_style_menu").width() + 25);
            }
            return true;
        }
        function change(sid) {
            sid = '' + sid;
            J("head link").each(function() {
                var href = J(this).attr("href");
                if (href && href.indexOf('gb_color.css') != -1) {
                    loadCSS('http://' + DOMAINS.IMGCACHE + '/qzonestyle/xiaoyou_portal_v2/css/gb_css.css', 'global_style');
                    loadCSS('http://' + DOMAINS.IMGCACHE + '/qzonestyle/xiaoyou_portal_v2/css/xpy-header.css', 'global_style_header');
                    J(this).attr("href", "http://" + DOMAINS.IMGCACHE + "/qzonestyle/xiaoyou_portal_v2/css/" + sid + "/gb_color.css");
                    return;
                }
            });
            J.post_api("/index.php?mod=home&act=changestyle", {
                "sid": sid
            });
        }
        function getId() {
            var info = getInfos();
            return info[2] == 1 ? info[1] : info[0];
        }
        function getInfos() {
            var info = FgetCookie("style") || "0";
            info = info.split('_');
            if (info.length < 3) info = [info[0], 0, 0, 0];
            return [parseInt(info[0]), parseInt(info[1]), parseInt(info[2]), parseInt(info[3])]
        }
        return {
            "appendPad": appendPad,
            "change": change,
            "getId": getId
        };
    })();
    window.appendStylePad = function() {
        return XY_STYLE.appendPad();
    }
    window.changeStyle = function(sid) {
        return XY_STYLE.change(sid);
    }
    window.getStyleId = function() {
        return XY_STYLE.getId();
    }
    window.Browser = {};
    Browser.isIE = ((navigator.userAgent.indexOf('MSIE') == -1) ? false: true);
    Browser.isIE7 = ((Browser.isIE && window.XMLHttpRequest) ? true: false);
    window.g_XDoc = {
        customMod: {},
        blogCommentCount: {}
    };
    window.g_JData = {};
    window.imgcacheDomain = 'imgcache.qq.com';
    window.callBackHsmp = [];
    window.$ = function(id) {
        return document.getElementById(id);
    };
    window.loadJsonData = function(xID, url, callback, errcallback, refresh, charset, callbackFunctionName) {
        if (top.g_JData[xID] && !refresh && !top.g_JData[xID].error) {
            callback(top.g_JData[xID]);
            return;
        }
        charset = charset ? charset: "GB2312";
        var cFN = callbackFunctionName ? callbackFunctionName: "_callBack";
        if (Browser.isIE) {
            var df = document.createDocumentFragment();
            df[cFN] = function(data) {
                s.onreadystatechange = null;
                df = null;
                top.g_JData[xID] = data;
                try {
                    if (callback) callback(data);
                } catch(e) {
                    if (e.number == -2146823277) return;
                    status = e.message;
                    setTimeout("status=''", 3000);
                }
            };
            var s = df.createElement("SCRIPT");
            s.charset = charset;
            df.appendChild(s);
            s.onreadystatechange = function() {
                if (s.readyState == "loaded") {
                    s.onreadystatechange = null;
                    df = null;
                    try {
                        if (errcallback) errcallback({
                            error: {
                                msg: "服务器繁忙，请稍后再试.",
                                type: 900
                            }
                        });
                    } catch(e) {
                        if (e.number != -2146823277) {
                            status = e.message;
                            setTimeout("status=''", 3000);
                        }
                    }
                }
            };
            s.src = url;
        } else {
            var i = document.createElement("IFRAME");
            i.style.display = "none";
            i.callback = function(data) {
                top.g_JData[xID] = data;
                callback(data);
                i.callback = null;
                i.src = "about:blank"J(i).remove();
                i = null;
            };
            if (jQuery.browser.webkit || jQuery.browser.opera) {
                i.src = "javascript:\"<script>function " + cFN + "(data){frameElement.callback(data);}<\/script><script src='" + url + "' charset='" + charset + "'><\/script>\"";
                document.body.appendChild(i);
            } else {
                var _dm = (document.domain == location.host) ? '': 'document.domain="' + document.domain + '";',
                dout = '<html><head><meta http-equiv="Content-type" content="text/html; charset=' + charset + '"/></head><body><script>' + _dm + ';function ' + cFN + '(){frameElement.callback.apply(null, arguments);}<\/script><script charset="' + charset + '" src="' + url + '"><\/script></body></html>';
                document.body.appendChild(i);
                i.contentWindow.document.open('text/html');
                i.contentWindow.document.write(dout);
                i.contentWindow.document.close();
            }
        }
    };
    window.loadXMLAsyncNoCache = function(xID, xUrl, callback, err_callback, data, returnType) {
        return loadXMLAsync(xID, xUrl, callback, err_callback, true, data, returnType);
    };
    window.LoadXMLDataEx = function(itemno, url, callback, err_callback, data) {
        return loadXMLAsync(itemno, url, callback, err_callback, false, data);
    };
    window.loadXMLAsync = function(xID, xUrl, callback, err_callback, nocache, data, returnType) {
        var m = xUrl.match(/(^http:\/\/([a-z,A-Z,0-9,\-,_,\.]+\.qq\.com)\/)/);
        if (!m) {
            alert("不能访问非qq.com域的资源");
            return;
        }
        var domain = m[0];
        var host = m[2];
        var proxyPageURL = domain + "proxy.html";
        if (domain == ("http://" + imgcacheDomain + "/")) proxyPageURL = "http://" + imgcacheDomain + "/ac/qzone/proxy.html";
        var f = document.getElementsByTagName("iframe");
        for (var i = 0; i < f.length; i++) {
            var isRightProxy = false;
            try {
                isRightProxy = f[i].src.indexOf(proxyPageURL) == 0
            } catch(e) {}
            if (isRightProxy) {
                if (!callBackHsmp[host] && typeof callBackHsmp[host] != "undefined") {
                    frames[i].loadXMLAsync(xID, xUrl, callback, err_callback, nocache, data, returnType);
                } else {
                    if (typeof callBackHsmp[host] == "undefined") callBackHsmp[host] = [];
                    callBackHsmp[host][callBackHsmp[host].length] = {
                        "callback": callback,
                        "xID": xID,
                        "xUrl": xUrl,
                        "err_callback": err_callback,
                        "nocache": nocache,
                        "data": data,
                        "returnType": returnType
                    };
                }
                return;
            }
        }
        if (!callBackHsmp[host]) {
            callBackHsmp[host] = [{
                "callback": callback,
                "xID": xID,
                "xUrl": xUrl,
                "err_callback": err_callback,
                "nocache": nocache,
                "data": data,
                "returnType": returnType
            }];
            createProxy(proxyPageURL);
        }
    };
    window.createProxy = function(src) {
        var f = document.getElementsByTagName("iframe");
        for (var i = 0; i < f.length; i++) if (f[i].src.indexOf(src) != -1) return;
        var i = document.createElement("iframe");
        var proxyDiv = $("proxy");
        if (!proxyDiv) document.body.insertBefore(i, null);
        else $("proxy").appendChild(i);
        i.width = 0;
        i.height = 0;
        i.src = src;
        i = null;
    };
    window.send_bcard = function(u) {
        setTimeout(function() {
            var html = '<iframe id="send_bcard_box" name="send_bcard_box" frameborder="0" scrolling="no" width="100%" height="406px" src="http://' + DOMAINS.MAIN + '/index.php?mod=bcard&act=sendcardbox"></iframe>';
            html_frame_new('递名片', html,
            function() {
                Fid('send_bcard_box').contentWindow.BusinessCard.send(u);
            },
            null, {
                wid: "send_bcard_box_pop",
                div_width: 575,
                submit_button_name: '发送',
                submit_not_close: true
            })
        },
        100);
    }
    window.add_friends_frame = function(u, ref, option) {
        ref = ref ? ref: 0;
        var op = {
            count: 0,
            adtag: ''
        };
        J.extend(op, option);
        function cb(d) {
            if (d.err) {
                if (d.err == 10001) {
                    return send_bcard(u);
                }
                return html_error_frame(G_V.pTitle, d.msg);
            }
            if (d.confirm) {
                eval(d.cb);
                var ccb = typeof(my_cb) == "function" ? my_cb: function() {};
                var cb_option = {};
                if (d.submit_button_name) cb_option.submit_button_name = d.submit_button_name;
                return html_confirm_frame('温馨提示', d.confirm, ccb, cb_option);
            }
            op.count = d.result.count;
            return pop_add_friends_frame(u, d.result, ref, op);
        }
        J.xyjsonp('checkFriendsPri', 'http://' + DOMAINS.API + '/jsonp.php', {
            mod: 'friends',
            act: 'checkapply',
            u: u
        },
        cb);
        return true;
    };
    window.pop_add_friends_frame = function(u_hash, info, ref, option) {
        window.G_TMP.add_friends_var = {
            'u_hash': u_hash,
            'info': info,
            'ref': ref,
            'option': option
        };
        return html_frame_new('将 ' + info.realname + ' 加为好友 ', '<iframe id="id_add_friend" name="id_add_friend" frameborder="0" scrolling="no" width="100%" height="148px" src="http://' + DOMAINS.MAIN + '/html/frame/addfriends.html"></iframe>', add_friends, null, {
            wid: "af_box",
            'submit_class': 'bt_tx2',
            div_width: 450
        });
    };
    window.add_friends = function() {
        var fr = Fid("id_add_friend").contentWindow;
        var u = fr.Fid('u_hash').value,
        ref = fr.Fid('ref').value,
        ans = fr.Fid('enounceanswer').value;
        var _cb = function(d) {
            if (d.err == 99 || d.err == 2) {
                var _vcb = function(_vc) {
                    doPost(_vc) return;
                };
                var ti = (d.err == 2 ? '验证码错误，请重新输入': '');
                return html_verifycode_frame(ti, '', _vcb);
            }
            if (d.msg.indexOf('成功') != -1 && window.G_TMP.add_friends_var && window.G_TMP.add_friends_var.option && window.G_TMP.add_friends_var.option.gcb) {
                window.G_TMP.add_friends_var.option.gcb(u);
            }
            return html_loading_frame(d.msg);
        };
        var doPost = function(vc) {
            J.post_api("/index.php", {
                mod: "friends",
                act: "apply",
                'u': u,
                'enounceanswer': ans,
                'ref': ref,
                'valid_input': (vc ? vc: '')
            },
            _cb, 'json');
        };
        doPost();
        return true;
    };
    window.del_friends = function(u, _callback) {
        html_confirm_frame('解除关系', '你确认要解除好友关系吗？',
        function() {
            do_del_friends(u, _callback);
        });
    };
    window.do_del_friends = function(u, _callback) {
        function cb(d) {
            if (d.err != 0) {
                return html_error_frame(G_V.pTitle, d.msg);
            }
            if (_callback) {
                _callback(u);
                return true;
            }
            window.location.reload();
        }
        J.post_api("/index.php", {
            mod: "friends",
            act: "delfriend",
            u: u
        },
        cb, 'json');
        return true;
    };
    window.visite_qq = function(u) {
        var cb = function(d) {
            if (d.error) {
                return html_error_frame(G_V.pTitle, d.error);
            }
            if (d.success && d.chat_url) {
                window.location.href = d.chat_url;
            }
        };
        J.post_api('/index.php', {
            mod: 'checkpri',
            act: 'check',
            u: u,
            check: 'qq'
        },
        cb, "json");
        return false;
    };
    window.is_sendscrip = function(u, ref) {
        var cb = function(d) {
            if (d.err == 0) {
                window.top.location.href = xy_domain + '/index.php?mod=scrip&act=addview&item=' + u + (ref ? '&ref=' + ref: '');
                return true;
            } else if (d.err == 1415) {
                return html_confirm_frame(G_V.pTitle, d.msg,
                function() {
                    window.location.href = 'http://' + DOMAINS.MAIN + '/index.php?mod=useredit&act=mylogo';
                },
                {
                    'submit_button_name': '上传'
                });
            } else if (d.err == 1417) {
                return html_confirm_frame(G_V.pTitle, d.msg,
                function() {
                    window.location.href = 'http://' + DOMAINS.MAIN + '/index.php?mod=useredit&act=schoolinfoedit';
                });
            } else {
                return html_error_frame(G_V.pTitle, d.msg);
            }
        };
        J.post_api("/index.php", {
            mod: "scrip",
            act: "ajaxcheck",
            u: u,
            check: "qq"
        },
        cb, 'json');
    };
    window.FSendGift = function(u, uname, gid, ref, is_birth, adtag) {
        is_birth = is_birth || 0;
        function cb(d) {
            if (d.error) {
                return html_error_frame(G_V.pTitle, d.error);
            }
            if (d.success) {
                var adstr = adtag ? '&adtag=' + adtag: '';
                var hash = gid ? '#send': '';
                window.top.location.href = 'http://' + DOMAINS.MAIN + '/index.php?mod=gift&act=send&u=' + u + '&n=' + encodeURIComponent(uname) + '&gid=' + (gid ? gid: '') + '&ref=' + (ref ? ref: 0) + '&is_birth=' + (is_birth ? is_birth: 0) + adstr + hash;
            }
        }
        if (!u) return cb({
            success: 1
        });
        J.post_api('/index.php', {
            mod: 'checkpri',
            act: 'check',
            u: u,
            check: 'gift'
        },
        cb, 'json');
    };
    window.reprot = function() {
        var r = document.URL;
        r = r.replace(/\&/gi, '%26');
        window.open('http://' + DOMAINS.MAIN + '/index.php?mod=report&ref=' + r);
    };
    window.Epoke = function(u) {
        function cb(d) {
            if (d.error) {
                return html_error_frame(G_V.pTitle, d.error);
            }
            if (d.confirm) {
                eval(d.cb);
                var ccb = typeof(my_cb) == "function" ? my_cb: function() {};
                return html_confirm_frame('温馨提示', d.confirm, ccb);
            }
            if (d.success) {
                global_frame_new("打招呼", '<iframe id="id_send_poke" frameborder="0" scrolling="no" width="100%" height="245px"  src="http://imgcache.qq.com/qzone/poke/send_poke_without_selector.htm?back=0&uin=' + u + '"></iframe>', {
                    cancel_button_name: "关闭",
                    submit_button_name: "发送",
                    div_width: 600,
                    wid: "id_poke_frame",
                    submit_callback: function() {
                        document.getElementById("id_send_poke").contentWindow.doSendPoke();
                    },
                    submit_not_close: true
                });
            }
        }
        J.post_api("/index.php", {
            mod: "checkpri",
            act: "check",
            u: u,
            check: "poke"
        },
        cb, "json");
    };
    window.showPoint = function(u, tab, cb, tmp_data) {
        window.point_tmp_data = tmp_data;
        setTimeout(function() {
            global_frame_new("互动", '<iframe src="http://' + DOMAINS.MAIN + '/index.php?mod=point&u=' + u + '" style="width:510px; height:130px; overflow-x:hidden; border:0;" scrolling="no" frameborder="no" name="pop_point" id="pop_point"></iframe>', {
                wid: "ppframe",
                div_width: 515,
                submit_not_close: true
            });
            if (tab) {
                var popwin = J('#pop_point').get(0);
                popwin.callback = function() {
                    var el = $('pp' + tab) ? J($('pp' + tab)) : null;
                    popwin.contentWindow.PpointClick(el, tab);
                    if (cb) {
                        setTimeout(function() {
                            cb.call(popwin.contentWindow);
                        },
                        0);
                    }
                }
            }
        },
        10);
    };
    window.sendPoke = function(u, id, _cb, type) {
        function cb(d) {
            if (d.error) {
                return html_error_frame(G_V.pTitle, d.error);
            }
            if (d.confirm) {
                eval(d.cb);
                var ccb = typeof(my_cb) == "function" ? my_cb: function() {};
                var cb_option = {};
                if (d.submit_button_name) cb_option.submit_button_name = d.submit_button_name;
                return html_confirm_frame('温馨提示', d.confirm, ccb, cb_option);
            }
            if (d.success) {
                doSendPoke(u, id, type);
                if (_cb) _cb();
            }
        }
        J.post_api("/index.php", {
            mod: "checkpri",
            act: "check",
            u: u,
            check: "poke"
        },
        cb, "json");
    };
    window.pokeDomain = "drift.qzone.qq.com";
    window.doSendPoke = function(u, id, type) {
        type = type ? type: 1;
        var url = "targetuin=" + u + "&poketype=" + id + "&giveback=0&campus=1&type=" + type;
        var cb = function() {
            var data = top.g_XDoc["sendPoke"];
            if (!data || data.xml == "") {
                html_error_frame(G_V.pTitle, "发送失败");
                return;
            }
            if (data.getElementsByTagName("error").length > 0) {
                var er = data.getElementsByTagName("error")[0];
                if (er.getAttribute("type") == "login") html_error_frame(G_V.pTitle, "您已登录超时，请重新登录");
                else {
                    if (er.textContent) html_error_frame(G_V.pTitle, er.textContent);
                    else html_error_frame(G_V.pTitle, er.text);
                }
            } else if (data.getElementsByTagName("succ").length > 0) html_loading_frame("发送成功");
        };
        loadXMLAsyncNoCache("sendPoke", "http://" + pokeDomain + "/cgi-bin/sendpoke", cb,
        function() {
            html_error_frame(G_V.pTitle, "很抱歉,目前网络繁忙,请稍后再试");
        },
        url);
    };
    window.getGiftList = function(page, cb, ecb, cjs) {
        ecb = ecb ? ecb: function() {};
        cjs = cjs ? cjs: '559';
        loadJsonData("giftlist_" + page, "http://imgcache.qq.com/qzone/mall/static/json/ogift_" + cjs + "_" + page + ".js", cb, ecb, 0, null, "DriftBottleCallback");
    };
    window.getGiftImageUrl = function(id, previewFormat, isBig, format) {
        var GIFT_IMAGE_URL = 'http://imgcache.qq.com/qzone/space_item/<%=type%>/<%=class%>/<%=id%><%=big%>.<%=format%>';
        if (typeof id == 'string' && id.indexOf('_') > -1) {
            id = id.split('_').pop();
        }
        id = parseInt(id);
        format = (isBig ? format: previewFormat) || 'gif';
        if (isNaN(id % 16)) {
            return 'http://imgcache.qq.com/ac/b.gif';
        }
        return GIFT_IMAGE_URL.replace('<%=class%>', (id % 16)).replace('<%=type%>', isBig ? 'orig': 'pre').replace('<%=id%>', id).replace('<%=big%>', isBig ? '': '_1').replace('<%=format%>', format);
    };
    if (!window.QzsEditor) {
        window.QzsEditor = (function() {
            return {
                createInstance: function(property) {
                    loadJS('http://' + DOMAINS.IMGCACHE + '/campus/js/MqzsEditor.js',
                    function() {
                        try {
                            QzsEditor.createInstance(property);
                        } catch(ex) {}
                    },
                    {
                        cache: true
                    });
                },
                placeHolder: true
            };
        })();
    }
    window.bindCard = function(type, id, class_name) {
        type = type || 1;
        if (!class_name) {
            class_name = 'xy_card';
            if (type == 2) class_name = 'xy_relation_card';
        }
        var eles = (id) ? '#' + id + ' a.' + class_name: 'a.' + class_name;
        eles = J(eles);
        eles.hover(function() {
            var _this = this;
            $import('module.Card',
            function() {
                module.Card.init(type, id, class_name);
            });
        },
        function() {});
    }
    window.init_global_bind = function(id) {
        bindCard(1, id);
    };
    window.bind_header_actions = function() {
        J('#app').popupmenu({
            target: "#app_pop",
            time: 500,
            showFunc: "fade",
            speed: 200,
            beforeShow: function() {
                loadCSS("http://" + DOMAINS.IMGCACHE + "/qzonestyle/xiaoyou_portal_v2/css/app_menu.css", "app_menu_css");
                var cb = function(d) {
                    var items = d.items,
                    clazz;
                    var _h = [];
                    for (var i = 0,
                    l = items.length; i < l; i++) {
                        clazz = items[i].app_iconurl.indexOf('app') == 0 ? 'xyp-sprite ' + items[i].app_iconurl: 'app-icon ' + items[i].app_iconurl;
                        _h.push('<li><a href="' + items[i].app_canvasurl + '"><span class="' + clazz + '"></span>' + items[i].app_alias + '</a></li>');
                    }
                    J("#top_app_loading").remove();
                    var split = Math.ceil(_h.length / 2);
                    J("#top_app_left").rhtml(_h.slice(0, split).join(''));
                    J("#top_app_right").rhtml(_h.slice(split).join(''));
                    if (J.browser.msie) {
                        J('#app_pop iframe').height(J('#app_pop').height());
                    }
                };
                XY_APP.getUserAppList(cb);
            }
        });
        J('#sns').popupmenu({
            target: "#sns_pop",
            time: 500,
            showFunc: "fade",
            speed: 200
        });
        J('#header_style').dropdownmenu({
            target: "#header_style_menu_wrap",
            before_cb: function() {
                J('#quicklist li.show-dropdown').removeClass('show-dropdown');
                J('#header_style').parent().addClass('show-dropdown')
            },
            after_cb: function() {
                J('#header_style').parent().removeClass('show-dropdown')
            }
        });
        J('#header_set').dropdownmenu({
            target: "#header_set_menu",
            before_cb: function() {
                J('#quicklist li.show-dropdown').removeClass('show-dropdown');
                J('#header_set_menu').parent().addClass('show-dropdown')
            },
            after_cb: function() {
                J('#header_set_menu').parent().removeClass('show-dropdown')
            }
        });
        J('#header_advice').dropdownmenu({
            target: "#header_advice_menu",
            before_cb: function() {
                J('#quicklist li.show-dropdown').removeClass('show-dropdown');
                J('#header_advice_menu').parent().addClass('show-dropdown')
            },
            after_cb: function() {
                J('#header_advice_menu').parent().removeClass('show-dropdown')
            }
        });
        J("#HeaderSearch input[name='name']").keyup(function(e) {
            return HeaderSearchTips(e, J(this));
        });
    };
    window.HeaderSearchTips = function(e, jq) {
        loadJS("http://" + DOMAINS.IMGCACHE + "/campus/js/Mleftsearch.js?rand=" + (new Date()).getDay(),
        function() {
            HeaderSearchTips(e, jq);
        },
        {
            cache: true
        });
    };
    window.HeaderSearchCheck = function(e, k) {
        if (J("#HeaderSearchPop .current").size() > 0) {
            G_TMP.LsearchEnter = 1;
            J("#HeaderSearchPop .current").click();
            return false;
        }
        if (G_V.search_click != undefined && G_V.search_click == true) return false;
        var sw = J("#HeaderSearch input[name='name']").val().trim();
        if (sw.length == 0 || sw == '搜索…') {
            window.location.href = "http://" + DOMAINS.MAIN + "/index.php?mod=search";
            return false;
        }
        window.location.href = "http://" + DOMAINS.MAIN + "/index.php?mod=search&act=result&adtag=top_search&name=" + encodeURIComponent(sw);
        return false;
    };
    window.fixpng = function() {
        var _fix = function(img) {
            if (!img.tagName || img.tagName.toLowerCase() != 'img') {
                return;
            }
            var src = img.src.toLowerCase(),
            format = src.split('.').pop();
            if (format != 'png') {
                return;
            }
            var imgID = (img.id) ? "id='" + img.id + "' ": "",
            imgClass = (img.className) ? "class='" + img.className + "' ": "",
            imgTitle = (img.title) ? "title='" + img.title + "' ": "title='" + img.alt + "' ",
            imgStyle = "display:inline-block;" + img.style.cssText;
            if (img.align == "left") imgStyle = "float:left;" + imgStyle;
            if (img.align == "right") imgStyle = "float:right;" + imgStyle;
            if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle;
            var html = "<span " + imgID + imgClass + imgTitle + " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";" + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader" + "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>"img.outerHTML = html;
        }
        return function(id, cls, container) {
            if (window.XMLHttpRequest || !window.ActiveXObject) {
                return;
            }
            if (id) {
                if (typeof id == 'string' && document.getElementById(id)) {
                    _fix(document.getElementById(id));
                } else {
                    _fix(id);
                }
            } else if (cls) {
                var con = container || document.body;
                J('img.' + cls, con).each(function(i, o) {
                    _fix(o);
                });
            }
        }
    } ();
    J(document).ready(function() {
        bind_header_actions();
        init_global_bind();
        if (J('div.xpy-search').get(0)) {
            setTimeout(function() {
                $import('module.MessageTips',
                function() {
                    MessageTips.initialize();
                    MessageTips.show();
                });
            },
            100);
        }
        setTimeout(function() {
            fixpng(null, 'js_png');
        },
        100);
    });
},
1001, 1);
JSL.installClass('common2',
function() {
    window.showLoginFrame = function(cb) {
        ErrorHandler.dealCode({
            err: -10
        },
        1, cb);
    };
    window.html_frame = function(title, html, submit_callback, cancel_callback, option) {
        var option = (option) ? option: {};
        option.submit_callback = (submit_callback) ? submit_callback: null;
        option.cancel_callback = (cancel_callback) ? cancel_callback: null;
        global_frame(title, html, option);
    };
    window.html_frame_new = function(title, html, submit_callback, cancel_callback, option) {
        var option = (option) ? option: {};
        option.submit_callback = (submit_callback) ? submit_callback: null;
        option.cancel_callback = (cancel_callback) ? cancel_callback: null;
        global_frame_new(title, html, option);
    };
    window.html_loading_frame = function(content, time_out, _cb, id, modal) {
        time_out = (time_out) ? parseInt(time_out) : 2000;
        if (top.showMsgbox) {
            top.showMsgbox(content, 0, time_out, null, true);
            return;
        }
        var wid = (id) ? id: 'image_wait';
        var w = Fid(wid);
        if (!w) {
            var w = document.createElement('DIV');
            w.id = wid;
            w.style.zIndex = 5000;
            w.className = 'load';
            document.body.appendChild(w);
        }
        w.innerHTML = '<p>' + content + '</p>';
        html_normal_frame(wid, time_out);
        if (modal) {
            FsetModal(null, false, wid + '_modal');
        }
        if (_cb && typeof(_cb) == 'function') {
            window.setTimeout(_cb, time_out);
        }
    };
    window.html_error_frame = function(title, content, _callback, option) {
        var op = {
            no_cancel: true,
            zIndex: 4000
        };
        op.submit_callback = (_callback) ? _callback: null;
        op.div_class = 'layer_global small_tip';
        op.icon = 'gb_del';
        J.extend(op, option);
        var html = '<div class="layer_global_tips"><div class="gb_tips ' + op.icon + '"><p>' + content + '</p></div></div>';
        global_frame_new(title, html, op);
    };
    window.html_confirm_frame = function(title, content, _callback, option) {
        option = option ? option: {};
        option.submit_callback = (_callback) ? _callback: null;
        option.div_class = 'layer_global small_tip';
        var html = '<div class="layer_global_tips"><div class="gb_tips gb_del"><p>' + content + '</p></div></div>';
        global_frame_new(title, html, option);
    };
    window.html_normal_frame = function(div_id, time_out) {
        var w = Fid(div_id);
        if (Fempty(w)) {
            return false;
        }
        w.style.display = 'none';
        w.style.position = "absolute";
        w.style.zIndex = 50000;
        FsetOffsetWindowPostionByRate(w, 2, 4);
        w.style.display = 'block';
        if (time_out) {
            setTimeout('close_frame(\'' + div_id + '\')', time_out);
        }
    };
    window.html_verifycode_frame = function(title, content, _callback) {
        var option = {
            no_cancel: false,
            no_submit: false,
            zIndex: 3500
        };
        var aid = 15000102;
        option.wid = 'verifycode_w';
        option.div_width = 330;
        option.div_height = 0;
        option.time_out = 0;
        option.submit_not_close = true;
        var f_callback = function() {
            var verifinput = Fid('verifycode_div');
            var verifycode = 0;
            if (verifinput) {
                if ('' == verifinput.value) {
                    alert('请输入验证码');
                    verifinput.focus();
                    return;
                } else {
                    verifycode = verifinput.value;
                }
            }
            close_frame(option.wid, _callback(verifycode));
        };
        option.submit_callback = f_callback;
        var motitle = (title ? title: '该项提交超出限制次数,请输入验证码');
        motitle = '<span style="color:red">' + motitle + '</span>';
        var html = '<div class="verifycode">' + '<table>' + '<tr><td width="20"></td><td colspan="2">' + motitle + '</td></tr>' + '<tr><td colspan="3"><red>' + content + '</red></td></tr>' + (content ? '<tr height="20"><td></td></tr>': '') + '<tr>' + '<td></td>' + '<td>验证码：</td>' + '<td>' + '<label accesskey="v" for="verifycode">' + '<input id="verifycode_div" name="verifycode_div" type="text" size=4 class="verifycode" maxlength="4" style="ime-mode:disabled;" />不区分大小写</label>' + '</td>' + '</tr>' + '<tr>' + '<td></td>' + '<td></td>' + '<td>' + '<img id="loginVerifyImg" src="http://ptlogin2.qq.com/getimage?aid=' + aid + '&' + Math.random() + '" width="130" height="53" />' + '<a href="javascript:_nchangeImg(\'loginVerifyImg\',\'verifycode\');" tabindex="-1">看不清,换一张</a>' + '</td>' + '</tr>' + '<tr height="10"><td></td></tr>' + '</table>' + '</div>';
        global_frame_new('温馨提示', html, option);
    };
    window._nchangeImg = function(img_n, code_n, flag) {
        var img = document.getElementById(img_n);
        img.src = "http://ptlogin2.qq.com/getimage?aid=15000901&t=" + Math.random();
        var ctrl = document.getElementById(code_n);
        if (ctrl && ctrl.style.display == "" && flag != 1) {
            try {
                ctrl.focus();
            } catch(e) {}
        }
    };
    window.close_frame = function(wid, callback, not_close, no_del) {
        if (J && G_TMP.FOCUS_INPUT) {
            J("#global_hidden_box").focus();
            G_TMP.FOCUS_INPUT = false;
        }
        if (callback && typeof(callback) == 'function') {
            callback();
        }
        if (not_close) {
            return true;
        }
        var mId = ((Fempty(wid) || (wid == '$_cnf_wnd')) ? '$_modal_$': (wid + '_modal'));
        try {
            FunsetModal(mId);
        } catch(e) {}
        var w = (Fempty(wid) ? Fid('$_cnf_wnd') : Fid(wid));
        if (no_del) {
            if (w != undefined) w.style.display = "none";
        } else {
            if (w != undefined) document.body.removeChild(w);
        }
    };
    window.changeFrameHeight = function(id, h, is_iframe) {
        var offset = J('#' + id + '_button').size() > 0 ? 73 : 33;
        J("#" + id).height(offset + h);
        J("#" + id + " .layer_global_cont:first").height(h);
        if (is_iframe) J("#" + id + " iframe").height(h);
    };
    window.global_frame_new = function(title, html, option) {
        var wid = (option && option.wid) ? option.wid: 'mess_float_box';
        var w = Fid(wid);
        var op = {
            wrap_class: '',
            div_class: 'layer_global',
            div_width: 350,
            div_height: '',
            submit_button_name: '确认',
            cancel_button_name: '取消',
            submit_class: 'bt_tx2',
            cancel_class: 'bt_tx_c2',
            submit_callback: null,
            cancel_callback: null,
            close_callback: this.cancel_callback,
            submit_not_close: false,
            no_modal: false,
            time_out: 0,
            zIndex: 3000,
            popPos: false,
            no_del: false,
            show_title: true,
            no_display: false,
            frameModal: false
        };
        J.extend(op, option);
        if (w == undefined) {
            var submit_button_html = (op.no_submit == true) ? '': '<button id="' + wid + '_submit" type="submit" class="' + op.submit_class + '">' + op.submit_button_name + '</button>';
            var cancel_button_html = (op.no_cancel == true) ? '': '<button id="' + wid + '_cancel" class="' + op.cancel_class + '">' + op.cancel_button_name + '</button>';
            var w = document.createElement('DIV');
            w.id = wid;
            var s = w.style;
            w.className = op.div_class;
            if (op.div_width) s.width = op.div_width + "px";
            if (op.div_height) s.height = (23 + op.div_height) + "px";
            with(s) {
                position = "absolute",
                zIndex = op.zIndex + 1;
                top = '-9999px',
                left = '-9999px';
            }
            var hidden_focus = '<input type="text" id="global_hidden_box" style="position:absolute;height:0;width:0;overflow:hidden;border:0;" />';
            w.innerHTML = '<div id="' + wid + '_wrap" class="layer_global_main ' + op.wrap_class + '">' + (op.show_title ? '<div id="' + wid + '_head" class="layer_global_title">' + hidden_focus + '<h3>' + title + '</h3><button title="关闭" href="javascript:void(0)" id="' + wid + '_close"><span class="none">&#9587;</span></button></div>': '') + '<div class="layer_global_cont clearfix">' + html + '</div>' + ((submit_button_html != '' || cancel_button_html != '') ? '<div class="global_tip_button" id="' + wid + '_button">' + submit_button_html + ' ' + cancel_button_html + '</div>': '') + '</div>';
            if (html && html.indexOf('<iframe') != -1) G_TMP.FOCUS_INPUT = true;
            try {
                document.body.appendChild(w);
            } catch(e) {
                return false;
            }
            if (op.div_width) {
                J("#" + wid + " > div").css("width", op.div_width - 2 + "px");
            }
            J("#" + wid + "_close").click(function() {
                close_frame(wid, op.close_callback, 0, op.no_del)
            });
            J("#" + wid).keydown(function(e) {
                var k = e.charCode || e.keyCode || 0;
                if (k == 27) J("#" + wid + "_close").click();
            });
            if (submit_button_html != '') {
                J("#" + wid + "_submit").click(function() {
                    close_frame(wid, op.submit_callback, op.submit_not_close, op.no_del)
                });
            }
            if (cancel_button_html != '') {
                J("#" + wid + "_cancel").click(function() {
                    close_frame(wid, op.cancel_callback, 0, op.no_del)
                });
            }
        }
        if (op.no_display) {
            w.style.display = "none";
        } else {
            w.style.display = "";
        }
        if (op.popPos) FsetOffsetWindowPostion(w, op.popPos[0], op.popPos[1]);
        else FsetOffsetWindowPostionByRate(w, 2, 4);
        if (op.no_modal == false) {
            var mId = ((wid == '$_cnf_wnd') ? '$_modal_$': (wid + '_modal'));
            FsetModal(null, false, mId, op.zIndex, null, null, op.frameModal);
        }
        if (!op.no_display) {
            if (submit_button_html) {
                J("#" + wid + "_submit").focus();
            } else if (cancel_button_html) {
                J("#" + wid + "_cancel").focus();
            }
        }
        if (op.time_out) {
            setTimeout("close_frame('" + wid + "')", op.time_out);
        }
        try {
            FenableDrag(wid);
        } catch(e) {}
    };
    window.FsetModal = function(e, isID, wid, zi, _opacity, _clickcb, forceiFrame) {
        if (!Fempty(e) && isID == true) e = Fid(e);
        FunsetModal(wid);
        var p = 0;
        if (Fempty(e)) {
            p = FgetPageSize();
            p.x = 0,
            p.y = 0;
        } else {
            p = FgetPostion(e);
        }
        if (Fempty(wid)) wid = "$_modal_$";
        var w = Fid(wid);
        zi = (zi) ? zi: 999;
        _opacity = (_opacity) ? _opacity: 0;
        if (Fempty(w)) {
            w = document.createElement('DIV');
            w.id = wid;
            var s = w.style;
            with(s) {
                position = "absolute",
                zIndex = zi;
            }
            document.body.appendChild(w);
        }
        FsetPostion(w, p.x, p.y, p.width, p.height);
        w.innerHTML = '<div style="position:absolute; width:' + p.width + 'px;height:' + p.height + 'px; background:#000000;z-index:' + zi + ';opacity:' + _opacity + '; filter:alpha(opacity=' + (_opacity * 100) + ');-moz-opacity:' + _opacity + ';"></div>';
        if (jQuery.browser.msie || forceiFrame) {
            w.innerHTML += '<iframe style="opacity:0; filter:alpha(opacity=0);-moz-opacity:0;" scrolling="No" style="" border="0" frameborder="0" width="' + p.width + '" height="' + p.height + '"></iframe>';
        } else if (jQuery.browser.opera) {
            w.innerHTML += '<img onMouseDown="return false;" galleryimg="no" style="z-index:' + zi + '" width="' + p.width + '" height="' + p.height + '"/>';
        }
        if (_clickcb) {
            J("#" + wid).click(_clickcb);
        }
    };
    window.FunsetModal = function(wid) {
        var e = (Fempty(wid) ? Fid('$_modal_$') : Fid(wid));
        if (!Fempty(e)) document.body.removeChild(e);
        if (!Fempty(Fid('$_modal_$'))) document.body.removeChild(Fid('$_modal_$'));
    };
    window.FenableDrag = function(wid) {
        J('#' + wid).easydrag();
        J('#' + wid).setHandler(wid + '_head');
    }; (function($) {
        var isMouseDown = false;
        var currentElement = null;
        var dropCallbacks = {};
        var dragCallbacks = {};
        var bubblings = {};
        var lastMouseX;
        var lastMouseY;
        var lastElemTop;
        var lastElemLeft;
        var dragStatus = {};
        var holdingHandler = false;
        $.getMousePosition = function(e) {
            var posx = 0;
            var posy = 0;
            if (!e) var e = window.event;
            if (e.pageX || e.pageY) {
                posx = e.pageX;
                posy = e.pageY;
            } else if (e.clientX || e.clientY) {
                posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }
            return {
                'x': posx,
                'y': posy
            };
        };
        $.updatePosition = function(e) {
            var pos = $.getMousePosition(e);
            var spanX = (pos.x - lastMouseX);
            var spanY = (pos.y - lastMouseY);
            $(currentElement).css("top", (lastElemTop + spanY));
            $(currentElement).css("left", (lastElemLeft + spanX));
        };
        $(document).mousemove(function(e) {
            if (isMouseDown && dragStatus[currentElement.id] != 'false') {
                $.updatePosition(e);
                if (dragCallbacks[currentElement.id] != undefined) {
                    dragCallbacks[currentElement.id](e, currentElement);
                }
                return false;
            }
        });
        $(document).mouseup(function(e) {
            if (isMouseDown && dragStatus[currentElement.id] != 'false') {
                isMouseDown = false;
                if (dropCallbacks[currentElement.id] != undefined) {
                    dropCallbacks[currentElement.id](e, currentElement);
                }
                return false;
            }
        });
        $.fn.setHandler = function(handlerId) {
            return this.each(function() {
                var draggable = this;
                bubblings[this.id] = true;
                $(draggable).css("cursor", "");
                dragStatus[draggable.id] = "handler";
                $("#" + handlerId).css("cursor", "move");
                $("#" + handlerId).mousedown(function(e) {
                    holdingHandler = true;
                    $(draggable).trigger('mousedown', e);
                });
                $("#" + handlerId).mouseup(function(e) {
                    holdingHandler = false;
                });
            });
        }
        $.fn.easydrag = function(allowBubbling) {
            return this.each(function() {
                if (undefined == this.id || !this.id.length) this.id = "easydrag" + (new Date().getTime());
                bubblings[this.id] = allowBubbling ? true: false;
                dragStatus[this.id] = "on";
                $(this).css("cursor", "move");
                $(this).mousedown(function(e) {
                    if ((dragStatus[this.id] == "off") || (dragStatus[this.id] == "handler" && !holdingHandler)) return bubblings[this.id];
                    $(this).css("position", "absolute");
                    isMouseDown = true;
                    currentElement = this;
                    var pos = $.getMousePosition(e);
                    lastMouseX = pos.x;
                    lastMouseY = pos.y;
                    lastElemTop = this.offsetTop;
                    lastElemLeft = this.offsetLeft;
                    $.updatePosition(e);
                    return bubblings[this.id];
                });
            });
        };
    })(jQuery);
    jQuery.sjsonp = function(url, cb, callbackname, charset) {
        cb = cb ? cb: function() {};
        eval(callbackname + ' = cb;');
        var s = document.createElement("script");
        if (charset) {
            s.setAttribute("charset", charset);
        }
        s.setAttribute("src", url);
        s.setAttribute("type", "text/javascript");
        document.body.appendChild(s);
    }
    jQuery.xyjsonp = function(id, url, data, cb, option) {
        if (jQuery.isFunction(data)) {
            option = cb;
            cb = data;
            data = {};
        }
        var op = {
            cache: true,
            charset: null,
            custom_cb: 'cb',
            err_cb_option: 0
        };
        jQuery.extend(op, option);
        if (op.custom_cb) {
            id = '__' + id;
        }
        window[id] = function(tmp) {
            if (ErrorHandler.dealCode(tmp, op.err_cb_option)) {
                cb.apply(window, arguments);
            }
            window[id] = undefined;
            try {
                delete window[id];
            } catch(e) {}
        };
        var param = {
            url: url,
            data: data,
            dataType: 'script',
            scriptCharset: op.charset,
            cache: op.cache
        };
        if (op.custom_cb) param.url += (param.url.match(/\?/) ? '&': '?') + op.custom_cb + '=' + id;
        if (op.immediately) {
            jQuery.ajax(param);
        } else {
            setTimeout(function() {
                jQuery.ajax(param);
            },
            1);
        }
    };
    jQuery.get_ = function(a, b, c, d) {
        jQuery.proxy.getProxy(a.replace(/^http:\/\/([^\/]+)\/.*$/g, '$1')).get(a, b, c, d);
    };
    jQuery.post_ = function(a, b, c, d) {
        jQuery.proxy.getProxy(a.replace(/^http:\/\/([^\/]+)\/.*$/g, '$1')).post(a, b, c, d);
    };
    jQuery.post_api = function(a, b, c, d) {
        if (a.indexOf('/') == 0) a = a.substring(1);
        try {
            var ext = {
                'token_uin': FgetUin(),
                'bai_ck': FgetCookie('bai_ck')
            };
            if (G_TMP && G_TMP.vcode) {
                ext['valid_input'] = G_TMP.vcode;
                G_TMP.vcode = null;
            }
            if (b === null) b = {};
            if (typeof(b) == 'object') {
                b = J.extend(b, ext);
            } else if (typeof(b) == 'string') {
                b = b + '&' + J.param(ext);
            }
        } catch(e) {}
        var tmp_b = b,
        tmp_c = c;
        if (typeof b == 'function' && c == 'json') {
            b = function(o) {
                if (ErrorHandler.dealCode(o, 0,
                function() {
                    jQuery.post_api(a, b, c, d);
                })) {
                    tmp_b(o);
                }
            };
        } else if (typeof c == 'function' && d == 'json') {
            c = function(o) {
                if (ErrorHandler.dealCode(o, 0,
                function() {
                    jQuery.post_api(a, b, c, d);
                })) {
                    tmp_c(o);
                }
            };
        }
        if (a.indexOf('http://') !== 0) {
            a = 'http://' + DOMAINS.API + '/' + a;
        }
        return this.post_(a, b, c, d);
    };
    jQuery.get_api = function(a, b, c, d) {
        if (a.indexOf('/') == 0) a = a.substring(1);
        var tmp_b = b,
        tmp_c = c;
        if (typeof b == 'function' && c == 'json') {
            b = function(o) {
                if (ErrorHandler.dealCode(o, 0,
                function() {
                    jQuery.get_api(a, b, c, d);
                })) {
                    tmp_b(o);
                }
            };
        } else if (typeof c == 'function' && d == 'json') {
            c = function(o) {
                if (ErrorHandler.dealCode(o, 0,
                function() {
                    jQuery.get_api(a, b, c, d);
                })) {
                    tmp_c(o);
                }
            };
        }
        if (a.indexOf('http://') !== 0) {
            a = 'http://' + DOMAINS.API + '/' + a;
        }
        return this.get_(a, b, c, d);
    };
    jQuery.proxy = function(domain) {
        var proxy = null,
        loaded = false,
        onloadEventHanlders = [],
        _this = this,
        pid = 'g_proxy_iframe_id';
        var init = function() {
            if (proxy) {
                return;
            }
            proxy = document.createElement('iframe');
            proxy.id = pid;
            proxy.name = pid;
            proxy.style.display = 'none';
            proxy.src = 'http://' + domain + '/api_proxy.html';
            J(document).ready(function() {
                document.body.appendChild(proxy);
            });
        }
        this.onload = function() {
            if (loaded) return;
            loaded = true;
            for (var i = 0,
            l = onloadEventHanlders.length; i < l; i++) {
                onloadEventHanlders[i].call(proxy);
            }
        },
        this.get = function(a, b, c, d) {
            if (loaded) {
                proxy.contentWindow.J.get(a, b, c, d);
            } else {
                onloadEventHanlders.push(function() {
                    proxy.contentWindow.J.get(a, b, c, d);
                });
                init();
            }
        }
        this.post = function(a, b, c, d) {
            if (loaded) {
                proxy.contentWindow.J.post(a, b, c, d);
            } else {
                onloadEventHanlders.push(function() {
                    proxy.contentWindow.J.post(a, b, c, d);
                });
                init();
            }
        }
        jQuery.proxy.pool[domain] = this;
    }
    jQuery.proxy.pool = {};
    jQuery.proxy.getProxy = function(domain) {
        var domain = domain || DOMAINS.API;
        if (jQuery.proxy.pool[domain]) {
            return jQuery.proxy.pool[domain];
        } else {
            return new jQuery.proxy(domain);
        }
    }
    if (!window.xyProxy) {
        window.xyProxy = jQuery.proxy.getProxy();
    }
    window.bind_tooltips = function(id, option) {
        var op = {
            'wrap': '<p id="tooltips" class="tips_intro"></p>'
        };
        J.extend(op, option);
        var pre = id ? '#' + id + ' ': '';
        J(pre + '.tooltips').hover(function() {
            J('body').append(op.wrap);
            J('#tooltips').prepend(J(this).attr('tips'));
            J(this).mousemove(function(e) {
                e = e || window.event;
                var x = e.pageX - 36;
                if (x - 2 < 0) x = 2;
                if (x + 225 > document.body.clientWidth) x = document.body.clientWidth - 225;
                J('#tooltips').css({
                    'zIndex': 3000,
                    'left': x,
                    'top': e.pageY + 18,
                    'display': 'block',
                    'position': 'absolute'
                });
            });
        },
        function() {
            J('#tooltips').remove();
        });
    };
    jQuery.fn.rhtml = function(val) {
        var stack = [];
        return this.each(function(i, el) {
            var oldEl = el;
            if (jQuery.browser.msie) {
                oldEl.innerHTML = val;
                return oldEl;
            }
            var newEl = oldEl.cloneNode(false);
            newEl.innerHTML = val;
            oldEl.parentNode.replaceChild(newEl, oldEl);
            stack.push(newEl);
        }).pushStack(stack);
    };; (function(d) {
        var k = d.scrollTo = function(a, i, e) {
            d(window).scrollTo(a, i, e)
        };
        k.defaults = {
            axis: 'xy',
            duration: parseFloat(d.fn.jquery) >= 1.3 ? 0 : 1
        };
        k.window = function(a) {
            return d(window)._scrollable()
        };
        d.fn._scrollable = function() {
            return this.map(function() {
                var a = this,
                i = !a.nodeName || d.inArray(a.nodeName.toLowerCase(), ['iframe', '#document', 'html', 'body']) != -1;
                if (!i) return a;
                var e = (a.contentWindow || a).document || a.ownerDocument || a;
                return d.browser.safari || e.compatMode == 'BackCompat' ? e.body: e.documentElement
            })
        };
        d.fn.scrollTo = function(n, j, b) {
            if (typeof j == 'object') {
                b = j;
                j = 0
            }
            if (typeof b == 'function') b = {
                onAfter: b
            };
            if (n == 'max') n = 9e9;
            b = d.extend({},
            k.defaults, b);
            j = j || b.speed || b.duration;
            b.queue = b.queue && b.axis.length > 1;
            if (b.queue) j /= 2;
            b.offset = p(b.offset);
            b.over = p(b.over);
            return this._scrollable().each(function() {
                var q = this,
                r = d(q),
                f = n,
                s,
                g = {},
                u = r.is('html,body');
                switch (typeof f) {
                case 'number':
                case 'string':
                    if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)) {
                        f = p(f);
                        break
                    }
                    f = d(f, this);
                case 'object':
                    if (f.is || f.style) s = (f = d(f)).offset()
                }
                d.each(b.axis.split(''),
                function(a, i) {
                    var e = i == 'x' ? 'Left': 'Top',
                    h = e.toLowerCase(),
                    c = 'scroll' + e,
                    l = q[c],
                    m = k.max(q, i);
                    if (s) {
                        g[c] = s[h] + (u ? 0 : l - r.offset()[h]);
                        if (b.margin) {
                            g[c] -= parseInt(f.css('margin' + e)) || 0;
                            g[c] -= parseInt(f.css('border' + e + 'Width')) || 0
                        }
                        g[c] += b.offset[h] || 0;
                        if (b.over[h]) g[c] += f[i == 'x' ? 'width': 'height']() * b.over[h]
                    } else {
                        var o = f[h];
                        g[c] = o.slice && o.slice( - 1) == '%' ? parseFloat(o) / 100 * m: o
                    }
                    if (/^\d+$/.test(g[c])) g[c] = g[c] <= 0 ? 0 : Math.min(g[c], m);
                    if (!a && b.queue) {
                        if (l != g[c]) t(b.onAfterFirst);
                        delete g[c]
                    }
                });
                t(b.onAfter);
                function t(a) {
                    r.animate(g, j, b.easing, a &&
                    function() {
                        a.call(this, n, b)
                    })
                }
            }).end()
        };
        k.max = function(a, i) {
            var e = i == 'x' ? 'Width': 'Height',
            h = 'scroll' + e;
            if (!d(a).is('html,body')) return a[h] - d(a)[e.toLowerCase()]();
            var c = 'client' + e,
            l = a.ownerDocument.documentElement,
            m = a.ownerDocument.body;
            return Math.max(l[h], m[h]) - Math.min(l[c], m[c])
        };
        function p(a) {
            return typeof a == 'object' ? a: {
                top: a,
                left: a
            }
        }
    })(jQuery); (function($) {
        var elements = new Array();
        var elements_button = new Array();
        var elements_count = 0;
        $.fn.popupmenu = function(options) {
            var defaults = {
                target: false,
                addStyle: false,
                time: 300,
                speed: "",
                autooff: true,
                beforeShow: null,
                afterShow: null,
                showFunc: "",
                showType: "show",
                hideType: "hide"
            };
            var options = $.extend(defaults, options);
            if (options.showFunc == "fade") {
                options.showType = "fadeIn";
                options.hideType = "fadeOut";
            }
            var global_menu_div = false;
            var global_menu_top = false;
            var global_t, global_t2;
            return this.each(function() {
                var button = $(this);
                var target = options.targetFind ? $(this).find(options.targetFind) : $(options.target);
                elements[elements_count] = target;
                elements_button[elements_count] = button;
                elements_count++;
                button.hover(function() {
                    global_t2 = setTimeout(function() {
                        if (options.autooff) {
                            $.each(elements,
                            function(i, n) {
                                n.hide();
                            });
                            $.each(elements_button,
                            function(i, n) {
                                n.removeClass(options.addStyle);
                            });
                        }
                        clearTimeout(global_t);
                        if (options.beforeShow) {
                            options.beforeShow.call(button);
                        }
                        if (options.addStyle != false) {
                            button.addClass(options.addStyle);
                        }
                        target[options.showType](options.speed);
                    },
                    options.time);
                },
                function() {
                    clearTimeout(global_t2);
                    if (!global_menu_div) {
                        global_t = setTimeout(function() {
                            if (options.addStyle != false) {
                                button.removeClass(options.addStyle);
                            }
                            target[options.hideType](options.speed,
                            function() {
                                if (options.afterShow) {
                                    options.afterShow.call(button);
                                }
                            });
                        },
                        options.time);
                    }
                });
                target.hover(function() {
                    global_menu_div = true;
                    clearTimeout(global_t);
                },
                function() {
                    global_menu_div = false;
                    setTimeout(function() {
                        if (options.addStyle != false) {
                            button.removeClass(options.addStyle);
                        }
                        target[options.hideType](options.speed);
                    },
                    options.time);
                });
            });
        }
    })(jQuery); (function($) {
        $.fn.dropdownmenu = function(options) {
            var defaults = {
                target: false,
                before_cb: null,
                after_cb: null
            };
            var options = $.extend(defaults, options);
            return this.each(function() {
                var button = $(this);
                var target = $(options.target);
                $(button).click(function() {
                    if (window.last_dropdown_target && window.last_dropdown_target == target) return false;
                    if (window.last_dropdown_target) $(window.last_dropdown_target).hide();
                    window.last_dropdown_target = target;
                    if (options.before_cb) options.before_cb();
                    $(target).slideDown('fast').show();
                    setTimeout(function() {
                        $(target).find('a').click(function(e) {
                            e.stopPropagation();
                            return true;
                        });
                        $(target).one("click",
                        function() {
                            return false;
                        });
                        $('body').one("click",
                        function() {
                            window.last_dropdown_target = null;
                            $(target).hide();
                            if (options.after_cb) options.after_cb();
                        });
                    },
                    300);
                    return false;
                });
            });
        }
    })(jQuery);
    jQuery.fn.coordinate = function() {
        var e = this[0],
        y = 0,
        x = 0;
        do {
            y += e.offsetTop || 0;
            x += e.offsetLeft || 0;
            e = e.offsetParent;
            if (e) {
                if (e.tagName.toLowerCase() == 'body') break;
                var p = jQuery(e).position();
                if (p == 'relative' || p == 'absolute') break;
            }
        } while ( e );
        return {
            left: x,
            top: y
        };
    };
    window.LOG_VAR = {};
    jQuery.logger_init = function(type) {
        LOG_VAR[type] = [];
        var t = new Date();
        LOG_VAR[type].push({
            'msg': 'type <b>' + type + '</b> start!',
            'time': t.getTime()
        });
    }
    jQuery.logger_log = function(type, msg) {
        msg = (msg == undefined) ? '': msg;
        var t = new Date();
        LOG_VAR[type].push({
            'msg': msg,
            'time': t.getTime()
        });
    }
    jQuery.logger_flush = function(type) {
        var str = '<style>.logger_table {border-collapse:collapse; padding:10px 0; width:400px; margin:10px auto;} .logger_table td {border:1px solid #000; padding:3px 5px;}</style>';
        str += '<table border="1" class="logger_table"><tr><td colspan="2" style="font-weight:bold; color:#fff; background:#000;">Type "' + type + '"</td></tr><tr><td>Msg</td><td>Time (ms)</td></tr>';
        for (var i = 1; i < LOG_VAR[type].length; i++) {
            var used_time = LOG_VAR[type][i].time - LOG_VAR[type][i - 1].time;
            str += '<tr><td><b>' + LOG_VAR[type][i].msg + '</b></td><td>' + used_time + '</td></tr>';
        }
        str += '</table>';
        J('body').append(str);
    }
    jQuery.logger_console = function(msg, type) {
        if (window.console) {
            console.log((type == 4 ? (new Date() + ":") : "") + msg);
        }
    }
    window.getAD = function(qq, ad_key) {
        var adlist = ["top_adver_1", "left_adver_1", "class_top_adver_1", "secondadver_1", "right_adver_1", "right_adver_2", "index_left_text_1", "index_left_text_2", "index_left_text_3", "index_left_pic_1", "index_right_pic_1", "index_bottom_pic_1", "farm_bottom_pic_1", "bottom_1", "school_right_pic_1", "app_right_2"];
        var x = {
            mod: "showadver",
            qq: qq
        },
        has_ad = false;
        var i = 0;
        var adnum = adlist.length;
        for (i = 0; i < adnum; i++) {
            var ad_id = ad_key ? ad_key + '_' + adlist[i] : adlist[i];
            if ($(ad_id)) {
                x[ad_id] = 1;
                has_ad = true;
            }
        }
        if (!has_ad) return;
        var ad_callback = function(getvalue) {
            if (!getvalue) return;
            for (var ad_div_id in getvalue) {
                if (getvalue[ad_div_id].length == 1) {
                    var ad_div = J("#" + ad_div_id);
                    if (ad_div.size() > 0) {
                        ad_div.show().html(getvalue[ad_div_id][0]['content']);
                        if (ad_div_id == "top_adver_1" && Fid('ann_content')) {
                            J('#adver_rollup').attr("title", "收起");
                        }
                        if (ad_div_id == "top_adver_1" && getvalue[ad_div_id][0]['hide']) {
                            toggle_div('ann_content', Fid('adver_rollup'), '',
                            function() {
                                J('#ann_img').hide();
                            },
                            function() {
                                J('#ann_img').show();
                            },
                            'hide');
                        }
                    }
                    if (ad_div.size() > 0) {
                        ad_div.attr('rel', getvalue[ad_div_id][0]['ad_id']);
                        J("#" + ad_div_id + " a").each(function() {
                            var href = J(this).attr("href");
                            if (href.indexOf("http") == 0) {
                                J(this).attr("href", "http://" + DOMAINS.MAIN + "/index.php?mod=showadver&act=counttime&url=" + encodeURIComponent(href) + "&ad_id=" + getvalue[ad_div_id][0]['ad_id']).attr("target", "_blank");
                            }
                        });
                    }
                } else if (getvalue[ad_div_id].length > 1) {
                    var html = '';
                    for (var i = 1; i <= getvalue[ad_div_id].length; i++) {
                        html += '<li rel="' + getvalue[ad_div_id][i - 1]['ad_id'] + '">' + getvalue[ad_div_id][i - 1]['content'] + '</li>';
                    }
                    J("#" + ad_div_id).show().append(html).css('zoom', '1');
                    if (J("#" + ad_div_id).size() > 0) {
                        J("#" + ad_div_id + " li").each(function() {
                            var aid = J(this).attr('rel'),
                            link = J(this).find('a'),
                            href = link.attr('href');
                            if (href && href.indexOf("http") == 0) {
                                link.addClass('c_tx').attr("href", "http://" + DOMAINS.MAIN + "/index.php?mod=showadver&act=counttime&url=" + encodeURIComponent(href) + "&ad_id=" + aid).attr("target", "_blank");
                            }
                        });
                    }
                }
            }
            if (getvalue['right_adver_1'] || getvalue['right_adver_2']) {
                J("#right_ad_mode").show();
            }
        };
        J.xyjsonp("getAD", API_domain + "/jsonp.php", x, ad_callback);
    };
    window.APP_BASE_URL = 'appmng.xiaoyou.qq.com';
    window.imgcacheDomain = DOMAINS.IMGCACHE;
    window.XY_APP = (function() {
        var urls = {
            u: 'http://' + APP_BASE_URL + '/cgi-bin/xyapp/xy_userapp_getapplist_byfeature.cgi',
            o: 'http://' + APP_BASE_URL + '/cgi-bin/xyapp/xy_userapp_getProviderInfo.cgi',
            a: 'http://' + APP_BASE_URL + '/cgi-bin/xyapp/xy_appinfo_allapp_info.cgi',
            i: 'http://' + APP_BASE_URL + '/cgi-bin/xyapp/xy_userapp_addone.cgi'
        },
        staticList = [203, 2, 4, 202, 252],
        allDataBase = {},
        userDataBase = {},
        lastUAList = {},
        lastAAList = {},
        canvasUrlPool = {};
        function getter(url, param, cb, ecb, sw) {
            param = J.extend({
                'seed': getSeed()
            },
            param);
            url += '?' + J.param(param);
            var _cb = function(d, sort) {
                var ret = parseInt(d.ret);
                if (ret != 0 && ret != 1) {
                    if (ecb) ecb();
                    return;
                }
                d = getter.solve(d, sw);
                cb(d, sort);
            };
            setTimeout(function() {
                J.xyjsonp('_Callback', url, _cb, {
                    'custom_cb': false
                });
            },
            1);
        }
        getter.solve = function(od, sw) {
            if (sw == 'o') return od;
            for (var i = 0,
            len = od.items.length; i < len; ++i) {
                if (od.items[i].app_id && od.items[i].app_name) {
                    if (sw == 'u') {
                        var url = od.items[i].app_canvasurl;
                        if (url.indexOf('/appframe.html?') != -1) {
                            od.items[i].app_canvasurl = url.replace('/appframe.html?', '/appframe.html?appid=' + od.items[i].app_id + '&');
                        }
                        if (url.indexOf('/appframe.html') == 0) {
                            od.items[i].app_canvasurl = 'http://' + DOMAINS.APP + od.items[i].app_canvasurl;
                        }
                        if (url.indexOf('/index.php') == 0) {
                            od.items[i].app_canvasurl = 'http://' + DOMAINS.MAIN + od.items[i].app_canvasurl;
                        }
                    }
                    setAppInfo(od.items[i].app_id, od.items[i], sw == 'u');
                }
            }
            if (sw == 'u') {
                lastUAList = od.items;
            } else if (sw == 'a') {
                lastAAList = od.items;
            }
            return od;
        }
        function setAppInfo(aid, value, userInstalled) {
            allDataBase['_' + aid] = allDataBase[value.app_name] = value;
            if (typeof(value.app_canvasurl) != 'undefined') {
                canvasUrlPool['_' + aid] = canvasUrlPool[value.app_name] = value.app_canvasurl;
            }
            if (userInstalled) {
                userDataBase['_' + aid] = userDataBase[value.app_name] = value;
            }
        }
        function getSeed() {
            var seed = FgetCookie('appseed');
            if (!seed) seed = 0;
            return seed;
        }
        function updateSeed() {
            var seed = parseInt(getSeed());
            if (USER.getCUSER().get('flag') == 1) {
                FaddCookie('appseed', seed + 1 + '', '/', 43200, DOMAINS.COOKIE_DOMAIN);
            } else {
                FaddCookie('appseed', seed + 1, '/', 43200, DOMAINS.COOKIE_DOMAIN);
            }
        }
        function updateSort(newOrder, cb) {
            var url = 'http://appmng.xiaoyou.qq.com/cgi-bin/xyapp/xy_set_ic_applist',
            fm = new g_post_Iframe('appfrm' + Math.random()),
            callback = function(data) {
                if (data.ret == 0) {
                    html_loading_frame('更新成功');
                    if (cb) {
                        cb(newOrder);
                    }
                } else {
                    html_loading_frame(data.msg);
                }
            };
            var endOrder = [];
            newOrder = newOrder.split('|');
            for (var i = 0; i < newOrder.length; i++) {
                if (J.inArray(parseInt(newOrder[i]), staticList) != -1) {
                    continue;
                }
                endOrder.push(newOrder[i]);
            }
            endOrder = endOrder.join('|');
            fm.set(callback, url, 'uin=' + FgetUin() + '&data=' + endOrder, true);
            fm.send();
        }
        function getal(cb, ecb, sw, pa) {
            var url = urls[sw],
            param = {
                'uin': FgetUin()
            };
            if (sw == 'u') {
                param.ic = 1;
            }
            if (pa) {
                param = J.extend(param, pa);
            }
            getter(url, param, cb, ecb, sw);
        }
        function appAct(aid, callback, errorback, type, extra_data) {
            window.g_appmng_fp = new g_post_Iframe('appmng' + parseInt(Math.random() * 1000));
            var data = {
                uin: FgetUin(),
                appid: aid
            };
            if (extra_data) J.extend(data, extra_data);
            data = J.param(data);
            data = data.replace(/\+/g, ' ');
            var cb = function(d) {
                if (callback) callback(d);
            };
            window.g_appmng_fp.set(cb, urls[type], data, true);
            window.g_appmng_fp.send();
            updateSeed();
        }
        function getBigIcon(icon_name) {
            return 'http://' + imgcacheDomain + '/campus_v2/img/app/app_' + icon_name.replace('icon_', '') + '.png';
        }
        function ifAppInstalled(aid) {
            return userDataBase['_' + aid];
        }
        function go(el, aid, type) {
            var url = canvasUrlPool['_' + aid];
            J(el).attr('href', url);
            return true;
        }
        function getAppDuration() {
            if (!window.anti_var) return 0;
            var start = window.appTimerStart;
            if (!start) return 0;
            var diff = new Date() - start;
            return Math.floor(diff / 1000);
        }
        return {
            'ifAppInstalled': ifAppInstalled,
            'getStaticList': function(returnObject) {
                if (returnObject) {
                    var obj = {};
                    J.each(staticList,
                    function(i, o) {
                        obj[o] = i;
                    });
                    return obj;
                } else {
                    return staticList;
                }
            },
            'getUserAppList': function(cb, ecb, hide) {
                var _cb = function(d, s) {
                    var appids, items = d.items,
                    apps = [],
                    _tempSub = {};
                    items.unshift({
                        'app_id': 203,
                        'app_name': 'twitter',
                        'app_type': 1,
                        'app_setupflag': 0xc045,
                        'app_iconurl': 'icon_twitter',
                        'app_alias': '说&nbsp;&nbsp;&nbsp;&nbsp;说',
                        'app_canvasurl': 'http://' + DOMAINS.MAIN + '/index.php?mod=twitter',
                        'app_is_test': 0,
                        'app_comm': '说说'
                    });
                    var inbl = USER.getCUSER().get('flag') == 2,
                    excludeList = {},
                    staticList = [203, 2, 4, 202, 252];
                    if (inbl) {
                        excludeList[254] = 1;
                    }
                    if (s.dftorder == 0) {
                        var staticObj = XY_APP.getStaticList(true);
                        appids = staticList;
                        for (var i = 0,
                        l = s.applist.length,
                        uni = true,
                        item; i < l; i++) {
                            item = parseInt(s.applist[i]);
                            uni = true;
                            if (item in staticObj) {
                                uni = false;
                            }
                            if (uni) {
                                appids.push(item);
                            }
                        }
                    } else {
                        appids = [203, 2, 4, 202, 252, 353, 372, 333, 201, 347, 600, 602, 601, 345, 250, 361, 255, 253, 346, 251, 350, 256, 254];
                    }
                    var _temp = {};
                    J.each(items,
                    function(i, o) {
                        if (excludeList[o.app_id]) return;
                        _temp[o.app_id] = o;
                    });
                    J.each(appids,
                    function(i, o) {
                        if (_temp[o]) {
                            apps.push(_temp[o]);
                            _tempSub[o] = 1;
                        }
                    });
                    if (s.dftorder == 1 || 0 === hide) {
                        J.each(items,
                        function(i, o) {
                            if (excludeList[o.app_id]) return;
                            if (!_tempSub[o.app_id]) {
                                apps.push(o);
                            }
                        });
                    }
                    d.items = apps;
                    cb(d, s);
                }
                getal(_cb, ecb, 'u');
            },
            'getOneAppInfo': function(appid, cb, ecb) {
                getal(cb, ecb, 'o', {
                    'appid': appid,
                    'languageType': 0
                });
            },
            'getAllAppList': function(cb, ecb) {
                getal(function(d, s) {
                    var excludeList = {};
                    excludeList[252] = 1;
                    if (USER.getCUSER().get('flag') == 2) {
                        excludeList[254] = 1;
                    }
                    var apps = [];
                    J.each(d.items,
                    function(i, o) {
                        if (excludeList[o.app_id]) return;
                        apps.push(o);
                    });
                    d.items = apps;
                    cb(d, s);
                },
                ecb, 'a');
            },
            'getBigIcon': getBigIcon,
            'installApp': function(aid, cb, eb, extra_data) {
                appAct(aid, cb, eb, 'i', extra_data);
            },
            'getSeed': function() {
                return getSeed();
            },
            'updateSeed': function() {
                return updateSeed();
            },
            'updateSort': function(newOrder, cb) {
                return updateSort(newOrder, cb);
            },
            'go': function(el, aid, type) {
                go(el, aid, type);
            },
            'getAppDuration': function() {
                return getAppDuration();
            }
        };
    })();
    window.ErrorHandler = (function() {
        var err = {
            'e10': function(d, type, cb) {
                window.ptlogin2_onResize = function(w, h) {
                    parent.changeFrameHeight('pop_ptlogin_frame', h + 30, true);
                };
                window.ptlogin2_callback = function() {
                    close_frame('pop_ptlogin_frame');
                    var ret = true;
                    if (ErrorHandler.globalCallback) {
                        var ret = ErrorHandler.globalCallback();
                    }
                    if (ret === false) return;
                    if (cb && typeof cb == 'function') {
                        cb();
                    } else {
                        window.location.reload();
                    }
                };
                var url = 'http://' + DOMAINS.MAIN + '/index.php%3Fmod%3Dlogin%26act%3Dapp';
                var _t = '<div><iframe scrolling="no" frameborder="0" id="auto_iframe" width="100%" src="http://ui.ptlogin2.qq.com/cgi-bin/login?appid=15000102&hide_title_bar=1&target=self&enable_qlogin=0&s_url=' + url + '&css=http://' + DOMAINS.IMGCACHE + '/campus/login/login.css"></iframe></div>';
                global_frame_new('登录', _t, {
                    'wid': 'pop_ptlogin_frame',
                    'zIndex': 2000,
                    'no_submit': true,
                    'no_cancel': true
                });
            }
        };
        function dealCode(data, type, cb) {
            if (!data || !data.err || type == 2 || window.XY_IN_QZONE) return true;
            var code = data.err;
            code = parseInt(code);
            if (code > -1 || code < -1000) return true;
            var done = false;
            var err_func = 'e' + Math.abs(code);
            if (err[err_func]) {
                err[err_func](data, type, cb);
                done = true;
            }
            if (!done) return true;
            return type == 1 ? true: false;
        }
        var inner = {
            'dealCode': dealCode
        };
        return inner;
    })();
    window.sendQzoneRpt = function(f2, f3) {
        if (!QZR_max) return;
        var s = [];
        for (var i = 0; i < timePoints.length; i++) if ( !! timePoints[i]) s.push((i + 1) + '=' + (timePoints[i] - d0));
        if (s.length < QZR_max) return;
        if (window.CUSER && CUSER.get('flag') == 1) {
            if (!window.G_ENV || window.G_ENV == 'formal' || window.G_ENV == 'preview') {
                var url = "http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=164&flag2=" + f2 + "&flag3=" + f3 + "&" + s.join("&");
                var imgSendTimePoint = new Image();
                setTimeout(function() {
                    imgSendTimePoint.src = url;
                },
                0);
            }
        }
        QZR_max = 0;
    };
    window.prepareQzoneRpt = function(f3, tp, f2) {
        if (!QZR_max) return;
        f2 = f2 ? f2: 1;
        timePoints[tp] = new Date();
        sendQzoneRpt(f2, f3);
    };
    window.sendReturnCodeRpt = function(flag1, flag2, flag3, sampling, delay) {
        sampling = sampling || 100;
        if (sampling < 100) {
            if (Math.floor(Math.random() * 100) >= sampling) {
                return;
            }
        }
        sampling = Math.ceil(100 / sampling);
        delay = delay || 0;
        flag2 = flag2 || 1;
        var url = "http://isdspeed.qq.com/cgi-bin/v.cgi?flag1=" + flag1 + "&flag2=" + flag2 + "&1=" + sampling + "&2=" + delay;
        if (flag3) url += "&flag3=" + flag3;
        var imgSend = new Image();
        setTimeout(function() {
            imgSend.src = url;
        },
        0);
    };
},
1001, 1);
/*  |xGv00|26cf1bac4980d1b2e5ae2c75e29c1daa */
