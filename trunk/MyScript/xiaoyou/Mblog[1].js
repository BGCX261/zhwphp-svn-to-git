var Browser = new Object();
Browser.isIE = window.ActiveXObject ? true: false;
Browser.isIE7 = Browser.isIE && window.XMLHttpRequest;
Browser.isMozilla = Browser.isIE ? false: (typeof document.implementation != 'undefined') && (typeof document.implementation.createDocument != 'undefined') && (typeof HTMLDocument != 'undefined');
Browser.isFirefox = Browser.isIE ? false: (navigator.userAgent.toLowerCase().indexOf("firefox") != -1);
Browser.isSafari = Browser.isIE ? false: (navigator.userAgent.toLowerCase().indexOf("safari") != -1);
Browser.isOpera = Browser.isIE ? false: (navigator.userAgent.toLowerCase().indexOf("opera") != -1);
String.prototype.getRealLength = function() {
    return this.replace(/[^\x00-\xff]/g, "aa").length;
};
String.prototype.encode = function() {
    return this.replace(r,
    function(a) {
        return "%" + a.charCodeAt(0).toString(16)
    }).replace(/\x20/g, "+")
};
String.prototype.decode = function() {
    return this.replace(/&#92;/g, "\\").replace(/&quot;/g, "\"").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")
};
String.prototype.encode2 = function() {
    return this.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
};
String.prototype.toRealStr = function() {
    return this.replace(/&quot;/g, "\"").replace(/(?:&#39;)|(?:&apos;)/g, "\'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
};
String.prototype.convCR = function(r) {
    return ( !! r) ? this.replace(/<br \/>/g, "\n") : this.replace(/\n/g, "<br />");
};
String.prototype.convSP = function(r) {
    return ( !! r) ? this.replace(/&nbsp;/g, " ") : this.replace(/\x20\x20/g, "&nbsp;&nbsp;");
};
function removeElement(element) {
    if ((typeof element) == "string") element = $(element);
    if ( !! element && (typeof element) == "object") {
        element.parentNode.removeChild(element);
    }
}
function fixFlashBug() {
    __flash_unloadHandler = function() {};
    __flash_savedUnloadHandler = function() {};
}
function insertFlash(flashArguments, requiredVersion) {
    var params = "",
    embedArgm = "",
    objArgm = "";
    for (k in flashArguments) {
        switch (k) {
        case "movie":
            continue;
            break;
        case "id":
        case "name":
        case "width":
        case "height":
        case "style":
            objArgm += k + '="' + flashArguments[k] + '" ';
            embedArgm += k + '="' + flashArguments[k] + '" ';
            break;
        default:
            params += '<param name="' + k + '" value="' + flashArguments[k] + '" />';
            embedArgm += k + '="' + flashArguments[k] + '" ';
        }
    }
    if (requiredVersion) {
        objArgm += 'codeBase="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab#version=' + requiredVersion + '" ';
    }
    fixFlashBug();
    if (Browser.isIE) return '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ' + objArgm + '>' + params + '</object>';
    else return '<embed ' + embedArgm + ' wmode="opaque" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash"></embed>'
}
var getFlashHtml = function(flashArguments, requiredVersion, flashPlayerCID) {
    var _attrs = new StringBuilder(),
    _params = new StringBuilder();
    if (typeof(flashPlayerCID) == 'undefined') {
        flashPlayerCID = 'D27CDB6E-AE6D-11cf-96B8-444553540000';
    }
    var _ver = QZFL.media.getFlashVersion().major;
    var _needVer = -1;
    if (typeof(requiredVersion) != "undefined") {
        _needVer = requiredVersion.major;
    }
    for (var k in flashArguments) {
        switch (k) {
        case "movie":
            continue;
            break;
        case "id":
        case "name":
        case "width":
        case "height":
        case "style":
            _attrs.append(k + "='" + flashArguments[k] + "' ");
            break;
        default:
            _params.append("<param name='" + ((k == "src") ? "movie": k) + "' value='" + ((k == "src") ? QZFL.media._changeFlashSrc(flashArguments[k], _ver, _needVer) : flashArguments[k]) + "' />");
            _attrs.append(k + "='" + flashArguments[k] + "' ");
        }
    }
    if (requiredVersion && (requiredVersion instanceof QZFL.media.SWFVersion)) {
        if (requiredVersion.major == 9 && requiredVersion.rev == 16) { (function() {
                __flash_unloadHandler = QZFL.emptyFn;
                __flash_savedUnloadHandler = QZFL.emptyFn;
            })();
        }
    } else {
        requiredVersion = new QZFL.media.SWFVersion(8, 0);
    }
    if (_ver == 0 || (_ver < requiredVersion.major && _needVer == -1)) {
        _attrs.append("codeBase='http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab#version=" + requiredVersion + "' ");
    }
    if (ua.ie) {
        return "<object classid='clsid:" + flashPlayerCID + "' " + _attrs + ">" + _params + "</object>";
    } else {
        return "<embed " + _attrs + " pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash'></embed>";
    }
};
window._showLinkBubbleSwitch = true;
function ubbReplace(srcString, replacewhat, imageLimit, imageOnloadFn, icdm, op) {
    icdm = 'imgcache.qq.com';
    var regstr;
    var as;
    var fontSizeMap = ["12px", "12px", "14px", "16px", "18px", "20px", "22px"];
    if (!imageOnloadFn) {
        imageOnloadFn = "picsize";
        as = "adjustSize";
    } else as = imageOnloadFn;
    srcString = srcString.replace(/([、。・ˉˇ¨〃々～‖…‘’“”〔〕〈〉！＂＃￥％＆＇（）＊＋，－．／０１２３４５６７８９：；＜＝＞？＠ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ［＼］＾＿｀ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ｛｜｝?@?A?o?p?q?r?s?t?u?v?w?x?y?z?{?|?}?~?扩?????????????????]{18})/g, "$1<wbr>") srcString = srcString.replace(/  /g, '&nbsp;&nbsp;');
    if (/(all)|(face)/.test(replacewhat)) srcString = srcString.replace(/\[em\]e(\d{1,3})\[\/em\]/g, "<img style='vertical-align:middle  !important' src='http://" + icdm + "/qzone/em/e$1.gif'><wbr>");
    if (/(all)/.test(replacewhat)) srcString = srcString.replace(/\[ol\]/g, "<ol style='list-style-type:decimal'>").replace(/\[\/ol\]/g, "</ol>").replace(/\[ul\]/g, "<ul style='list-style-type:disc'>").replace(/\[\/ul\]/g, "</ul>").replace(/\[li\]/g, "<br />").replace(/\[\/li\]/g, "<br />");
    if (/(all)|(namecard)/.test(replacewhat)) {
        srcString = srcString.replace(/\[card=(\d+)\](.+?)\[\/card\]/g, "<a href='http://user.qzone.qq.com/$1' link='nameCard_$1' target='_blank'>$2</a>");
    }
    if (/(all)|(anchor)/.test(replacewhat)) {
        srcString = srcString.replace(/\[url(|=([^\]]+))\]\[\/url\]/ig, '');
        srcString = srcString.replace(/\[url(|=([^\]]+))\](.+?)\[\/url\]/ig,
        function() {
            var args = arguments;
            var REG_HTTP = /^http:\/\//i;
            var INVALID_HREF_STRING = /[\"\']/i;
            var INVALID_EXPLAIN_STRING = /\[(em|video|flash|audio|quote|ffg|url|marque|email)/i;
            var WHITE_URI = /^(https?:\/\/)?[\w\-.]+\.(qq|paipai|soso|taotao)\.com($|\/|\\)/i;
            var explain = "";
            var href = "";
            if (!args[1]) {
                if (REG_HTTP.test(args[3])) {
                    explain = href = args[3];
                }
            } else {
                if (REG_HTTP.test(args[2])) {
                    explain = args[3];
                    href = args[2];
                } else if (REG_HTTP.test(args[3])) {
                    explain = args[2];
                    href = args[3];
                }
            }
            if (!href || !explain || INVALID_HREF_STRING.test(href) || INVALID_EXPLAIN_STRING.test(explain)) {
                return '';
            } else {
                if ((/all/.test(replacewhat) && parent.ownerMode) || (WHITE_URI.test(href) && !/blogjumper/.test(href)) || window._showLinkBubbleSwitch) {
                    return '<a href="' + href + '" target="_blank">' + explain + '</a><wbr>';
                } else {
                    return '<a href="' + href + '" link="' + href + '" target="_blank" onclick="showLinkBubble(this);return false">' + explain + '</a><wbr>';
                }
            }
        });
    }
    if (/all/.test(replacewhat)) {
        srcString = srcString.replace(/\[ppk_url=(http[^\]\"\']+)]([^\[]+)\[\/ppk_url\]/g, "<a href='http://" + icdm + "/qzone/blogjumper.html#url=$1' target='_blank' style='color:#EF6EA8'>$2</a><wbr>");
    }
    var oMediaWidth = -1;
    if (/paper/.test(replacewhat)) oMediaWidth = 650;
    else if (/prePaper/.test(replacewhat)) oMediaWidth = 635;
    if (/(all)|(image)/.test(replacewhat)) {
        var w = /sign/.test(replacewhat) ? "540,160": ((/all/.test(replacewhat)) ? "850,4000": "850,4000");
        if (oMediaWidth > 0) w = oMediaWidth + w.toString().substr(w.toString().indexOf(","));
        if ( !! imageLimit) w = imageLimit;
        if (/imageLimit/.test(replacewhat)) {
            var limitCount = 0 regstr = /\[img\]http(.[^\]\'\"]*)\[\/img\]/i;
            while (regstr.exec(srcString) != null) {
                if (limitCount >= 1) srcString = srcString.replace(regstr, " <a href='http$1' target='_blank'>{点击查看贴图}</a> ");
                else srcString = srcString.replace(regstr, "<wbr><a href='http$1' target='_blank'><img style='vertical-align:baseline  !important' onload='" + as + "(this," + w + ")'  src='http$1' border='0'></a><wbr> ");
                limitCount++
            }
            srcString = srcString.replace(/\[img\].*?\[\/img\]/g, '');
        } else if (/imageHide/.test(replacewhat)) {
            regstr = /\[img\]http(.[^\]\'\"]*)\[\/img\]/ig;
            srcString = srcString.replace(regstr, " <a href='http$1' target='_blank'>{点击查看贴图}</a> ");
            srcString = srcString.replace(/\[img\].*?\[\/img\]/g, '');
        } else {
            srcString = srcString.replace(/\[img,(\d{1,4}),(\d{1,4})\]http(.[^\]\'\"]*)\[\/img\]/ig, "<wbr><img style='vertical-align:baseline  !important' src='http$3' border='0' width='$1' height='$2' onload='" + as + "(this,890,1024,true)'><wbr>");
            srcString = srcString.replace(/\[img\]http(.[^\]\'\"]*)\[\/img\]/ig, "<wbr><a href='http$1' target='_blank'><img style='vertical-align:baseline  !important' onload='" + as + "(this," + w + ")'  src='http$1' border='0'></a><wbr>");
            srcString = srcString.replace(/\[img\].*?\[\/img\]/g, '');
        }
    }
    if (/(all)|(qqshow)/.test(replacewhat)) {
        srcString = srcString.replace(/\[qqshow,(\d{1,3}),(\d{1,3}),(\d{1,3}),(\d{1,3})(,.*?)?\]http(.[^\]\'\"]*)\[\/qqshow\]/ig, "<wbr><img style='vertical-align:baseline  !important' transImg='1' src='http$6' border='0' width='$3' height='$4' onload='" + as + "(this,520,1024,true)'><wbr>");
    }
    if (/(all)|(flash)/.test(replacewhat)) {
        regstr = /\[flash(,(\d{1,3}),(\d{1,3})|)\]([^\[]+?)\[\/flash\]/ig;
        srcString = srcString.replace(regstr,
        function() {
            var args = arguments;
            var url = args[4];
            var isQQVideo = /^http:\/\/((\w+\.|)video|v).qq.com/i.test(url);
            var isImgCache = /^http:\/\/(?:cnc.|edu.)?imgcache.qq.com/i.test(url);
            var isComic = /^http:\/\/comic.qq.com/i.test(url);
            var netWorking = isQQVideo | isImgCache | isComic ? "all": "internal";
            var fullScreen = isQQVideo ? "true": "false";
            var scriptaccess = isQQVideo | isImgCache | isComic ? "always": "never";
            if (args[1]) {
                var strHTML = parent.insertFlash({
                    allowscriptaccess: scriptaccess,
                    id: Math.random(),
                    allownetworking: netWorking,
                    allowFullScreen: fullScreen,
                    src: url,
                    width: ((oMediaWidth > 0 && args[2] > oMediaWidth) ? oMediaWidth: args[2]),
                    height: args[3]
                });
            } else {
                var strHTML = parent.insertFlash({
                    allowscriptaccess: scriptaccess,
                    id: Math.random(),
                    allownetworking: netWorking,
                    allowFullScreen: fullScreen,
                    src: url,
                    width: ((oMediaWidth > 0 && args[2] > oMediaWidth) ? oMediaWidth: "")
                });
            }
            return strHTML;
        });
        regstr = /\[flasht,(\d{1,4}),(\d{1,4}),(\d{1,4}),(\d{1,4})\]([^\[]+?)\[\/flasht\]/ig;
        srcString = srcString.replace(regstr,
        function() {
            var args = arguments;
            strHTML = parent.insertFlash({
                wmode: "transparent",
                type: "application/octet-stream",
                quality: "high",
                menu: "false",
                id: Math.random(),
                id: Math.random(),
                allownetworking: "internal",
                src: args[5],
                height: args[2],
                width: ((oMediaWidth > 0 && args[1] > oMediaWidth) ? oMediaWidth: args[1])
            });
            return strHTML;
        });
    }
    if (/(all)|(video)/.test(replacewhat)) {
        regstr = new RegExp("\\[video,([0-9]{1,3}),([0-9]{1,3}),([truefals]{4,5}),([truefals]{4,5})\\](http:\\/\\/video\\.qq\\.com\\/res\\/[\u2E80-\u9FFF0-9a-zA-Z&#=;.:_\\-?\%/+\/]{1,})\\[\\/video\\]", "ig");
        srcString = srcString.replace(regstr,
        function() {
            var args = arguments;
            var strHTML = "<EMBED allowNetworking='all' enableContextMenu='False' src='" + args[5] + "' width='" + ((oMediaWidth > 0 && args[1] > oMediaWidth) ? oMediaWidth: args[1]) + "' height='" + args[2] + "' loop = '" + args[3] + "' autostart='" + args[4] + "' showstatusbar='1'/><wbr>";
            return '<img style="vertical-align:baseline  !important" src="about:blank" srcHTML="' + strHTML + '" onerror="loadEmbed(this)" style="display:none"/>';
        });
        regstr = new RegExp("\\[video,([0-9]{1,3}),([0-9]{1,3}),([truefals]{4,5}),([truefals]{4,5})\\]([\u2E80-\u9FFF0-9a-zA-Z&#=;.:_\\-?\%/+\/]{1,})\\[\\/video\\]", "g");
        srcString = srcString.replace(regstr,
        function() {
            var args = arguments;
            var strHTML = "<EMBED allowNetworking='internal' enableContextMenu='False' src='" + args[5] + "' width='" + ((oMediaWidth > 0 && args[1] > oMediaWidth) ? oMediaWidth: args[1]) + "' height='" + args[2] + "' loop = '" + args[3] + "' autostart='" + args[4] + "' showstatusbar='1'/><wbr>";
            return '<img style="vertical-align:baseline  !important" src="about:blank" srcHTML="' + strHTML + '" onerror="loadEmbed(this)" style="display:none"/>';
        });
        regstr = new RegExp("\\[video,([truefals]{4,5}),([truefals]{4,5})\\](http:\\/\\/video\\.qq\\.com\\/res\\/[\u2E80-\u9FFF0-9a-zA-Z&#=;.:_\\-?\%/+\/]{1,})\\[\\/video\\]", "ig");
        srcString = srcString.replace(regstr,
        function() {
            var args = arguments;
            var strHTML = "<EMBED allowNetworking='all' enableContextMenu='False' src='" + args[3] + "' loop = '" + args[1] + "' autostart='" + args[2] + "' showstatusbar='1'" + ((oMediaWidth > 0) ? (" width='" + oMediaWidth + "'") : "") + "/><wbr>";
            return '<img style="vertical-align:baseline  !important" src="about:blank" srcHTML="' + strHTML + '" onerror="loadEmbed(this)" style="display:none"/>';
        });
        regstr = new RegExp("\\[video,([truefals]{4,5}),([truefals]{4,5})\\]([\u2E80-\u9FFF0-9a-zA-Z&#=;.:_\\-?\%/+\/]{1,})\\[\\/video\\]", "g");
        srcString = srcString.replace(regstr,
        function() {
            var args = arguments;
            var strHTML = "<EMBED allowNetworking='internal' enableContextMenu='False' src='" + args[3] + "' loop = '" + args[1] + "' autostart='" + args[2] + "' showstatusbar='1'" + ((oMediaWidth > 0) ? (" width='" + oMediaWidth + "'") : "") + "/><wbr>";
            return '<img style="vertical-align:baseline  !important" src="about:blank" srcHTML="' + strHTML + '" onerror="loadEmbed(this)" style="display:none"/>';
        });
    }
    if (/(all)|(vphoto)/.test(replacewhat)) {
        regstr = new RegExp("\\[vphoto,(\\d+),(\\d{5,11})](.*?)\\[\\/vphoto\\]", "ig");
        srcString = srcString.replace(regstr,
        function() {
            var args = arguments;
            return "<EMBED allowNetworking='all' enableContextMenu='False' src='http://" + DOMAINS.IMGCACHE + "/qzone/client/photo/swf/vphoto.swf?uin=" + args[2] + "&fid=" + args[1] + "' width='400' height='300' showstatusbar='1'/><wbr>";
        });
    }
    if (/(all)|(quote)/.test(replacewhat)) {
        var srcString = srcString.replace(/\[quote=([^\]]*)\]/g, "\x00$1<br />\x02").replace(/\[\/quote\]/g, "\x01").replace(/\[quote\]/g, "\x00");
        var maxQuote = 2;
        for (var i = 0; i < maxQuote; i++) srcString = srcString.replace(/\x00([^\x00\x01\x02]*)\x02?([^\x00\x01\x02]*)\x01/g,
        function(a, b, c) {
            if (c == "") return "<div class=\"mode_table_quote\"><span class=\"mode_table_quote_title\">引用内容：</span><br/>" + b + "</div>";
            else return "<div class=\"mode_table_quote\"><span class=\"mode_table_quote_title\">" + b + "引用内容：</span><br/>" + c + "</div>";
        });
        srcString = srcString.replace(/[\x00\x02\x01]/g, "");
    }
    var fontCount = 0;
    var a;
    srcString = srcString.replace(/\[\/?quote[^\]]*\]/g, "");
    if (/(all\b)|(glow\b)/.test(replacewhat) && Browser.isIE) {
        regstr = /\[ffg,([#\w]{1,10}),([#\w]{1,10})\]/g
        if (a = srcString.match(regstr)) {
            fontCount += a.length;
            srcString = srcString.replace(regstr, '<font style="filter: glow(color=$1,strength=3); display:inline-block; color:$2;">');
        }
    } else if (/glow_limit/.test(replacewhat) && Browser.isIE) {
        regstr = /\[ffg,([#\w]{1,10}),([#\w]{1,10})\](.{1,80})\[\/ft\]/;
        if (a = srcString.match(regstr)) {
            if (!/\[f/.test(a[3])) {
                srcString = srcString.replace(regstr, '<font style="filter: glow(color=$1,strength=3); display:inline-block; color:$2;">$3</font>');
            }
        }
    }
    if (/(all\b)|(glow_msg\b)/.test(replacewhat) && Browser.isIE) {
        srcString = srcString.replace(/\[cx1\]([^\r]*?)\[\/cx1\]/g, '<span class="title_cx1">$1</span>');
        srcString = srcString.replace(/\[cx2\]([^\r]*?)\[\/cx2\]/g, '<span class="title_cx2">$1</span>');
    }
    if (/(all)|(font)/.test(replacewhat)) {
        regstr = /\[ffg,([a-zA-z#0-9]{1,10}),([a-zA-z&#=;0-9]{1,10})\]/g
        if (a = srcString.match(regstr)) {
            fontCount += a.length;
            srcString = srcString.replace(regstr, "<font color='$1'><wbr>");
        }
        regstr = new RegExp("\\[ft=([^\\]]+)\\]", "g");
        if (a = srcString.match(regstr)) {
            fontCount += a.length;
            srcString = srcString.replace(regstr,
            function() {
                var s = arguments[1].split(",");
                try {
                    if (s[0].length == 7 && s[0].substring(1, 3) >= "AA" && s[0].substring(3, 5) >= "AA" && s[0].substring(5, 7) >= "AA") s[0] = "#000000";
                } catch(e) {}
                var color = s[0] ? ' color=' + s[0] : '';
                var size = s[1] ? s[1] : null;
                var face = s[2] ? ' face=' + s[2] : '';
                return '<font' + color + face + ' style="' + (!size ? "": ("font-size:" + fontSizeMap[size - 1])) + '">'
            });
        }
        regstr = new RegExp("\\[ftc=([a-zA-z#0-9]{1,10})\\]", "g");
        if (a = srcString.match(regstr)) {
            fontCount += a.length;
            srcString = srcString.replace(regstr, "<font color='$1'><wbr>");
        }
        regstr = new RegExp("\\[fts=([1-6]{1,1})\\]", "g");
        if (a = srcString.match(regstr)) {
            fontCount += a.length;
            srcString = srcString.replace(regstr,
            function(a, b) {
                return "<font style='line-height:1.3em;font-size:" + fontSizeMap[b - 1] + "'><wbr>";
            });
        }
        regstr = new RegExp("\\[ftf=([\u4E00-\u9FFFa-zA-Z_0-9\,&#=;\\ ]{1,})\\]", "g");
        if (a = srcString.match(regstr)) {
            fontCount += a.length;
            srcString = srcString.replace(regstr, "<font face='$1'><wbr>");
        }
        regstr = new RegExp("\\[B\\]", "g");
        srcString = srcString.replace(regstr, "<B><wbr>");
        regstr = new RegExp("\\[\\/B\\]", "g");
        srcString = srcString.replace(regstr, "</B><wbr>");
        regstr = new RegExp("\\[M\\]", "g");
        srcString = srcString.replace(regstr, "<center>");
        regstr = new RegExp("\\[\\/M\\]", "g");
        srcString = srcString.replace(regstr, "</center>");
        regstr = new RegExp("\\[R\\]", "g");
        srcString = srcString.replace(regstr, "<center style='text-align: right'>");
        regstr = new RegExp("\\[\\/R\\]", "g");
        srcString = srcString.replace(regstr, "</center>");
        regstr = new RegExp("\\[U\\]", "g");
        srcString = srcString.replace(regstr, "<U><wbr>");
        regstr = new RegExp("\\[\\/U\\]", "g");
        srcString = srcString.replace(regstr, "</U><wbr>");
        regstr = new RegExp("\\[I\\]", "g");
        srcString = srcString.replace(regstr, "<I><wbr>");
        regstr = new RegExp("\\[\\/I\\]", "g");
        srcString = srcString.replace(regstr, "</I><wbr>");
    }
    regstr = /\[\/ft\]/g;
    if (a = srcString.match(regstr)) {
        fontCount -= a.length;
        srcString = srcString.replace(regstr, "</font><wbr>");
    }
    if (fontCount > 0) {
        srcString += (new Array(fontCount + 1)).join("</font><wbr>");
    }
    srcString = srcString.replace(/\[\/?f[tf][^\]]*\]/g, "").replace(/\[\/?[BMRUI]\]/g, "");
    if (/(all)|(email)/.test(replacewhat)) {
        regstr = new RegExp("\\[email\\](.*?)\\[\\/email\\]", "g");
        srcString = srcString.replace(regstr, "<a href='mailto:$1' target='_blank'>$1</a><wbr>");
        regstr = new RegExp("\\[email=(.*?)\\](.*?)\\[\\/email\\]", "g");
        srcString = srcString.replace(regstr, "<a href='mailto:$2' target='_blank'>$1</a><wbr>");
    }
    if (/(all)|(audio)/.test(replacewhat)) {
        srcString = srcString.replace(/\[audio,(true|false),(true|false)(\]|,true\]|,false\])([\u2E80-\u9FFF0-9a-zA-Z&#=;.:_\-?\%\/+\/]{1,})\[\/audio\]/ig,
        function(a, a1, a2, a3, a4, b) {
            var strHTML = "<EMBED allowNetworking='internal' src='" + a4 + "' loop='" + a1 + "' autostart='" + a2 + "'" + ((a3 == ",true]") ? " height='0' width='0'": "") + " showstatusbar='1' /><wbr>";
            return strHTML;
        });
    }
    if (/(all)|(audio)/.test(replacewhat)) {
        if (!top._musicParams) top._musicParams = [];
        srcString = srcString.replace(/\[music\](.*?)\[\/music\]/ig,
        function() {
            var arr = arguments[1].split("|");
            var strHTML = parent.insertFlash({
                width: (arr.length / 6 > 1) ? 440 : 410,
                height: (arr.length / 6 > 1) ? 190 : 100,
                src: 'http://' + DOMAINS.IMGCACHE + '/campus/js/swf/MusicFlash_xiaoyou.swf',
                bgColor: '#ffffff',
                scale: 'showall',
                wmode: 'opaque',
                id: 'musicFlash' + top._musicParams.length,
                name: "musicFlash" + top._musicParams.length,
                menu: "true",
                allowScriptAccess: 'always'
            },
            "9,0,0,0");
            top._musicParams.push(arguments[0]);
            return strHTML;
        });
    }
    srcString = srcString.replace(/&amp;#173;/g, '&#173;');
    return srcString;
}
function adjustSize(obj, w, h, openWindows) {
    var w0 = obj.width,
    h0 = obj.height,
    r = false;
    if (w0 <= 1) {
        var i = new Image();
        i.src = obj.src;
        w0 = i.width;
        h0 = i.height;
    }
    obj.width = w0;
    obj.height = h0;
    if ((w0 / h0) > (w / h)) {
        if (w0 > w) {
            obj.style.height = (h0 * w) / w0;
            obj.style.width = w;
            r = true;
            w0 = w;
        }
    } else {
        if (h0 > h) {
            obj.style.width = (w0 * h) / h0;
            obj.style.height = h;
            r = true;
            h0 = h;
        }
    }
    if (openWindows && r) {
        obj.style.cursor = "pointer";
        obj.title = "点击预览原图";
        obj.onclick = function() {
            window.open(obj.src)
        }
    }
    obj.onload = null;
    if ( !! obj.transImg && Browser.isIE && !Browser.isIE7) {
        obj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, src=" + obj.src + ", sizingmethod=scale);";
        obj.style.height = h0;
        obj.style.width = w0;
        obj.src = "http://" + DOMAINS.IMGCACHE + "/ac/qzone_v4/b.gif";
    }
}
function picsize(obj, MaxWidth, MaxHeight) {
    obj.onload = null;
    var img = new Image();
    img.src = obj.src;
    if (img.width > MaxWidth && img.height > MaxHeight) {
        if (img.width / img.height > MaxWidth / MaxHeight) {
            obj.height = MaxWidth * img.height / img.width;
            obj.width = MaxWidth;
        } else {
            obj.width = MaxHeight * img.width / img.height;
            obj.height = MaxHeight;
        }
    } else if (img.width > MaxWidth) {
        obj.height = MaxWidth * img.height / img.width;
        obj.width = MaxWidth;
    } else if (img.height > MaxHeight) {
        obj.width = MaxHeight * img.width / img.height;
        obj.height = MaxHeight;
    } else {
        obj.width = img.width;
        obj.height = img.height;
    }
}
function setImges(a) {
    for (var i = 1; i < a.length; i++) {
        var img = $(a[i]);
        if (img) {
            img.src = a[0].src;
            img.style.display = "";
        }
    }
    a.length = 1;
    a[0].onload = null;
}
function showLinkBubble(o) {
    parent.showBubble(o, '<div style="padding-top:4px;color:#f00"><img src="http://' + parent.imgcacheDomain + '/qzone_v4/bt_alert.gif" style="margin:0 2px -2px 0"/>请勿打开陌生人发送的链接。谨防中奖等诈骗信息。</div>', '<div><a href="http://' + DOMAINS.IMGCACHE + '/qzone/blogjumper.html#url=' + o.link + '" target="_blank" style="color:#00f;text-decoration:underline">打开链接</a></div>', 5000, "", "commentLink")
}
function loadEmbed(o) {
    o.onerror = null;
    setTimeout(function() {
        o.outerHTML = o.srcHTML
    },
    100);
}
var g_is_body_click_set = false;
var g_other_valid_id = '';
function campus_changeimg(valid_e, img_e) {
    var img = Fid(img_e);
    Fid('valid_input').value = "";
    img.src = "http://ptlogin2.qq.com/getimage?aid=15000102&" + Math.random();
}
function show_valid_pic(valid_e, img_e, valid_code_e, is_change) {
    if (!Fid(valid_code_e) || !Fid(img_e) || !Fid(valid_e)) {
        return false;
    }
    if (g_other_valid_id && valid_e != g_other_valid_id && Fid(g_other_valid_id)) {
        Fid(g_other_valid_id).style.display = 'none';
    }
    Fid(valid_code_e).focus();
    if (!g_is_body_click_set || is_change) {
        FdeleteCookie('verifysession');
        campus_changeimg(valid_e, img_e);
    }
    Fid(valid_e).style.display = 'block';
    if (g_other_valid_id != g_is_body_click_set || Fempty(g_is_body_click_set)) {
        if (typeof document.addEventListener == "function") {
            document.addEventListener("click",
            function(evt) {
                close_valid_pic(evt, valid_e, img_e, valid_code_e);
                return true;
            },
            false);
        } else {
            document.attachEvent("onclick",
            function(event) {
                close_valid_pic(event, valid_e, img_e, valid_code_e);
                return true;
            });
        }
        g_is_body_click_set = g_other_valid_id;
    }
    g_other_valid_id = valid_e;
}
function close_valid_pic(e, valid_e, img_e, valid_code_e) {
    var obj = e.srcElement ? e.srcElement: e.target;
    if (obj.id != valid_e && obj.id != img_e && obj.id != valid_code_e && obj.id != 'valid_input' && obj.id != 'imgVerify' && obj.id != 'code_a' && obj.id != 'valid_p' && obj.id != 'bt_1' && obj.id != 'bt_2' && obj.id != 'comment_content' && obj.id != 'reply_mood_content') {
        if (Fid(valid_e)) {
            Fid(valid_e).style.display = "none";
            return true;
        }
    }
}
var qZEditor = null,
old_comment_id = 0,
cur_page = 1,
total_comments = 0,
total_page = 0,
per_page = 10,
G_BLV = {
    cur_page: 1,
    direct: 1,
    arch: 0,
    pos: 0,
    comments: {},
    arch_pos: {}
};
function toggle_blog(div_id, ele) {
    if (Fid(div_id).style.display != 'none') {
        Fid(div_id).style.display = 'none';
        ele.className = 'close';
        ele.title = '展开';
        ele.innerHTML = '<span>展开</span>';
    } else {
        Fid(div_id).style.display = '';
        ele.className = 'open';
        ele.title = '收起';
        ele.innerHTML = '<span>收起</span>';
    }
}
function toggle_visitor(div_id, ele) {
    if (Fid(div_id).style.display != 'none') {
        Fid(div_id).style.display = 'none';
        J("#" + ele).html('查看更多');
    } else {
        Fid(div_id).style.display = '';
        J("#" + ele).html('收起');
    }
}
window.g_insertSwfNum = 0;
function swfInit() {
    window.g_insertSwfNum++;
}
function blog_skip(cur_id, hash, direction, type) {
    if (type && type == 'preview') {
        html_loading_frame('预览模式不支持此操作', 1000);
        return false;
    }
    var _a = getURLArgs(null, "act");
    if (_a == "secretshow") {
        return BLsecretSkip(cur_id, direction);
    }
    var cb = function(txt) {
        var tmp = txt.split('|');
        if (tmp.length != 2) {
            return html_error_frame('温馨提示', '系统错误');
        }
        if (parseInt(tmp[0]) != 0) {
            return html_error_frame('温馨提示', tmp[1]);
        }
        if (parseInt(tmp[1]) == 0) {
            var err_str = (direction == 'pre') ? '已经是第一篇日志了': '已经是最后一篇日志了';
            return html_loading_frame(err_str);
        }
        window.location.href = 'http://' + DOMAINS.MAIN + '/index.php?mod=blog&act=show&u=' + hash + '&blogid=' + parseInt(tmp[1]);
        return true;
    }
    J.post_api("/index.php", {
        mod: "blog",
        act: "skip",
        blogid: cur_id,
        u: hash,
        direction: direction
    },
    cb);
    return false;
}
function BLsecretSkip(id, direction, page) {
    page = page ? page: getURLArgs(null, "cpage");
    var cb = function(d) {
        if (d.error) {
            return html_error_frame('温馨提示', d.error);
        }
        if (d.id == 0) {
            var err_str = (direction == 'pre') ? '已经是第一篇日志了': '已经是最后一篇日志了';
            return html_loading_frame(err_str);
        }
        window.location.href = 'http://' + DOMAINS.MAIN + '/index.php?mod=blog&act=secretshow&blogid=' + d.id + "&cpage=" + d.page;
        return true;
    }
    J.post_api("/index.php", {
        mod: "blog",
        act: "sskip",
        "blogid": id,
        "page": page,
        direction: direction
    },
    cb, "json");
    return false;
}
function check_blog_edit() {
    try {
        var blog_title = Fid('blog_title').value.trim();
        var blog_content = qZEditor.getUBB().trim();
        if (Fempty(blog_title)) {
            html_error_frame("温馨提示", "标题没有填写完整",
            function() {
                Fid('blog_title').focus();
            });
            return false;
        }
        if (Fempty(blog_content)) {
            html_error_frame("温馨提示", "日志内容没有填写完整",
            function() {
                qZEditor.editorArea.focus();
            });
            return false;
        }
        return true;
    } catch(e) {
        return false;
    }
}
function set_blog_top(blogid, action) {
    var cb = function(d) {
        if (d.error) {
            html_error_frame("温馨提示", d.error);
        } else {
            return html_loading_frame(d.success, 3000, window.location.href = 'http://' + DOMAINS.MAIN + '/index.php?mod=blog');
        }
    }
    var data = {
        'blogid': blogid,
        'action': action
    };
    J.post_api('/index.php?mod=blog&act=settop', data, cb, "json");
    return false;
}
function BdoPostBlog(type, url, isopenqzone) {
    if (!check_blog_edit()) return false;
    if (!isopenqzone) {
        var _cb = function(result) {
            if (result == 0) {
                return BdoPostBlog(type, url, 1);
            }
            if (result == 2) {
                return html_loading_frame('开通Qzone失败，请稍后再试');
            }
        };
        check_qzonestatus('发表日志的同时，将为您开通Qzone，是否确认？<br /><br />选择“确认”：日志发表成功，且开通Qzone<br />选择“取消”：日志发表失败，且不开通Qzone', _cb);
        return false;
    }
    J('#blog_content').val(qZEditor.getUBB());
    var cb = function(d) {
        if (d.error) {
            return html_error_frame('温馨提示', d.error);
        }
        if (d.inputvalid) {
            return html_verifycode_frame('', '',
            function(vc) {
                J("#valid_input").val(vc);
                BdoPostBlog(type, url);
            });
        }
        if (d.validfail) {
            return html_verifycode_frame('验证码错误，请重新填写', '',
            function(vc) {
                J("#valid_input").val(vc);
                BdoPostBlog(type, url);
            });
        }
        if (d.success) {
            if (url == '1') {
                J('#post_hidden_draft_id').val(d.blogid);
                html_loading_frame('草稿保存成功！', 2000);
                return;
            } else if (url) {
                window.location.href = url;
            } else {
                window.location.href = d.location;
            }
        }
    };
    var data = J("#post_form").serialize();
    J.post_api('/index.php?mod=blog&act=' + type, data, cb, "json");
    return false;
}
function BLgetLastPage(id, u) {
    BLgetComments(id, u, total_page, 0, 0, 0, true);
}
function BLgetComments(id, u, page, direct, arch, pos, last_page) {
    page = (page != undefined) ? parseInt(page) : 1;
    last_page = (last_page && last_page == true) ? 1 : 0;
    direct = 1;
    arch = 0;
    pos = (page - 1) * per_page;
    u = u ? u: cur_u_hash;
    if (page <= 0) return html_loading_frame('已经是第一页了');
    if (total_page && page > total_page) return html_loading_frame('已经是最后一页了');
    if (last_page) page = total_page;
    var show = function(page, h) {
        J('#blog_comments').html(h);
        init_global_bind();
        cur_page = page;
        BLshowPage();
        if (window.qzspd_f3 == 6) prepareQzoneRpt(6, 2);
    };
    if ( !! G_BLV.comments[u_hash + blogid + page]) return setTimeout(function() {
        show(page, G_BLV.comments[u_hash + blogid + page]);
    },
    200);
    var cb = function(d) {
        d = strip_test_word(d);
        var d_tmp = d.split('@@XIAOYOU@@');
        for (var i = 0; i < d_tmp.length; i++) {
            if (i % 2 == 1) {
                d_tmp[i] = ubbReplace(d_tmp[i], 'all', 0, null, DOMAINS.IMGCACHE);
                d_tmp[i] = d_tmp[i].replace(/\n/g, "<br />");
                if (d_tmp[i].indexOf('<b') != -1) d_tmp[i] += '</b>';
                if (d_tmp[i].indexOf('<center') != -1) d_tmp[i] += '</center>';
            }
        }
        show(page, d_tmp.join(''));
        G_BLV.comments[u_hash + blogid + page] = J('#blog_comments').html();
    };
    var _m = getURLArgs(null, "mod"),
    _a = getURLArgs(null, "act");
    if (_a && _a == 'secretshow') {
        J.get_api("/index.php", {
            mod: "blog",
            act: "getcomments",
            u: u,
            blogid: id,
            direct: direct,
            arch: arch,
            pos: pos,
            page: page,
            last_page: last_page,
            total: total_comments,
            "from": "secret"
        },
        cb);
    } else {
        J.get_api("/index.php", {
            mod: "blog",
            act: "getcomments",
            u: u,
            blogid: id,
            direct: direct,
            arch: arch,
            pos: pos,
            page: page,
            last_page: last_page,
            total: total_comments
        },
        cb);
    }
}
function BLflushComments(page, behind) {
    total_page = Math.ceil(total_comments / per_page);
    page = (page) ? page: total_page;
    do {
        G_BLV.comments[u_hash + blogid + page] = null;
        page++;
    } while ( behind && G_BLV . comments [ u_hash + blogid + page ]);
}
function BLshowPage() {
    pre_arch = window.pre_arch ? window.pre_arch: 0;
    pre_pos = window.pre_pos ? window.pre_pos: 0;
    next_arch = window.next_arch ? window.next_arch: 0;
    next_pos = window.next_pos ? window.next_pos: 0;
    var h = '<p class="p3">' + '<a href="#blog_comments_div" onclick="BLgetComments(' + blogid + ',\'' + u_hash + '\');" title="第一页" class="a1"><span>第一页</span></a>' + '<a href="#blog_comments_div" onclick="BLgetComments(' + blogid + ',\'' + u_hash + '\',' + (cur_page - 1) + ',0,' + pre_arch + ',' + pre_pos + ');" class="a2">上一页</a>' + '<a href="#blog_comments_div" onclick="BLgetComments(' + blogid + ',\'' + u_hash + '\',' + (cur_page + 1) + ',1,' + next_arch + ',' + next_pos + ');" class="a3">下一页</a>' + '<a href="#blog_comments_div" onclick="BLgetLastPage(' + blogid + ',\'' + u_hash + '\');" title="最后一页" class="a4"><span>最后一页</span></a>' + '</p>' + '<p class="p2">第 <strong>' + cur_page + '</strong>页 / 共' + total_page + '页</p>' + '<p class="p1">共 ' + total_comments + ' 条评论</p>';
    J("#page").html(h);
}
function init_comment_form() {
    try {
        qZEditor.editorArea.clear();
    } catch(e) {}
}
function blog_do_edit(vc) {
    J("#valid_input").val(vc);
    J("#post_form").submit();
}
function add_comment(blog_id, vc) {
    G_TMP.input_dis = "#comment_blog_input";
    var cb = function(d) {
        inputEnable();
        J("#edit_box input:submit").removeAttr("disabled");
        if (d.err == -99 || d.err == -98) {
            var _vcb = function(_vc) {
                add_comment(blog_id, _vc) return;
            };
            var ti = d.err == -98 ? '验证码错误，请重新输入': '';
            return html_verifycode_frame(ti, '', _vcb);
        }
        if (d.err != 0) return html_error_frame('温馨提示', d.msg);
        init_comment_form();
        total_comments++;
        BLflushComments();
        BLgetLastPage(blog_id, cur_u_hash);
        try {
            Fid('blog_comment_num_1').innerHTML = parseInt(Fid('blog_comment_num_1').innerHTML) + 1;
            Fid('blog_comment_num_2').innerHTML = parseInt(Fid('blog_comment_num_2').innerHTML) + 1;
        } catch(e) {}
    };
    vc = vc ? vc: '';
    var comment_content = '';
    try {
        comment_content = qZEditor.getUBB();
    } catch(e) {}
    comment_content = comment_content.trim();
    if (Fempty(comment_content)) {
        html_error_frame('温馨提示', '没有填写评论内容');
        return false;
    }
    Fid('hidden_comment_content').value = comment_content;
    J.post_api("/index.php", {
        mod: "blog",
        act: "addcomment",
        valid_input: vc,
        blogid: J("#hidden_blogid").val(),
        u: J('#hidden_u_hash').val(),
        comment_content: J('#hidden_comment_content').val(),
        comment_type: J('#hidden_comment_type').val(),
        comment_ref: J('#hidden_comment_ref').val(),
        share_chk: J('#share_chk').attr("checked")
    },
    cb, 'json');
    inputDisable();
    return false;
}
function del_comment(blog_id, comment_id, reply) {
    html_confirm_frame('删除评论', '是否要删除该评论？',
    function() {
        dodel_comment(blog_id, comment_id, reply);
    });
}
function dodel_comment(blog_id, comment_id, reply) {
    function cb(d) {
        if (d.err != 0) return html_error_frame('温馨提示', d.msg);
        Fid('blog_comments').innerHTML = '<p style="text-align:center; padding:10px;"><img src="http://imgcache.qq.com/campus/images/loading_a0a46.gif " /></p>';
        total_comments--;
        BLflushComments(cur_page, true);
        if (cur_page > total_page) cur_page = total_page;
        if (cur_page <= 0) cur_page = 1;
        BLgetComments(blog_id, cur_u_hash, cur_page);
        try {
            if (Fid('blog_comment_num_1')) Fid('blog_comment_num_1').innerHTML = parseInt(Fid('blog_comment_num_1').innerHTML) - 1;
            if (Fid('blog_comment_num_2')) Fid('blog_comment_num_2').innerHTML = parseInt(Fid('blog_comment_num_2').innerHTML) - 1;
        } catch(e) {}
    }
    var cur_act = getURLArgs(null, 'act');
    var is_secret = (cur_act && cur_act.indexOf("secret") != -1) ? true: false;
    J.post_api("/index.php", {
        mod: "blog",
        act: "delcomment",
        blogid: blog_id,
        commentid: comment_id,
        "from": (is_secret ? 'secret': ''),
        'reply': reply
    },
    cb, 'json');
    return false;
}
function del_blog(blog_id) {
    var cur_act = getURLArgs(null, 'act');
    var is_secret = (cur_act && cur_act.indexOf("secret") != -1) ? true: false;
    var word = '<p><strong>该日志在QQ空间中会被同时删除，是否确定删除？</strong>' + (!is_secret ? '<br/><br/>如果你不希望日志被其他QQ校友用户访问查看，可以通过 <a href="http://' + DOMAINS.MAIN + '/index.php?mod=usereditpri&amp;act=page#blogs_a" target="_blank">隐私设置</a> 设置权限。<br/><br/>你也可以 <a href="javascript:BLtoSecret(\'' + blog_id + '\',2)">转为私密记事</a> ，只有你自己有权限查看。': '') + '</p>';
    html_confirm_frame('删除日志', word,
    function() {
        dodel_blog(blog_id);
    },
    {
        div_width: 390,
        submit_class: 'bt_tx_c2'
    });
}
function dodel_blog(blog_id) {
    var cur_act = getURLArgs(null, 'act');
    var is_secret = (cur_act && cur_act.indexOf("secret") != -1) ? true: false;
    var cb = function(txt) {
        var tmp = txt.split('|');
        if (tmp.length != 2) return html_error_frame('温馨提示', '系统错误');
        if (parseInt(tmp[0]) != 0) return html_error_frame('温馨提示', tmp[1]);
        if (is_secret) {
            window.location.href = 'http://' + DOMAINS.MAIN + '/index.php?mod=blog&act=secret';
        } else {
            window.location.href = 'http://' + DOMAINS.MAIN + '/index.php?mod=blog';
        }
    }
    J.post_api("/index.php", {
        mod: "blog",
        act: "del",
        blogid: blog_id,
        "type": (is_secret ? "secret": "")
    },
    cb);
}
function showQzoneEdit(cur_str) {
    loadJS('/html/js/Qzone_common.js',
    function() {
        Fid('noused').value = '正在加载编辑器...';
        loadJS('/html/js/QZEditor/qzEditor.js',
        function() {
            window.setTimeout(function() {
                display_QzoneEdit(cur_str);
            },
            500);
        });
    });
}
function display_QzoneEdit(cur_str) {
    cur_str = (Fempty(cur_str)) ? '': cur_str;
    try {
        if (Fid('myEditor')) {
            Fid('myEditor').style.display = "block";
        }
        if (Fid('noused')) {
            Fid('noused').style.display = "none";
        }
        qZEditor = createEditor("myEditor");
        qZEditor.height = 120;
        _wysiwygToolbar = [["0", "fontFamily_s", "fontSize_s", "bold", "italic", "underline", "fontColor", "removeformat"], ["0", "JustifyLeft_s", "JustifyCenter_s", "JustifyRight_s"], ["0", "face_s"], ["0", "undo_s", "redo_s"]] _defaultToolbarHeight = "25px";
        setTimeout(function() {
            qZEditor.build();
            qZEditor.editorArea.fillHTML(cur_str);
            qZEditor.editorArea.focus();
            setTimeout(function() {
                addEvent(qZEditor.editorArea.IFrame.contentWindow.document, "click", close_valid_pic)
            },
            500);
            setTimeout(function() {
                addEvent(qZEditor.editorArea.UBBFrame, "click", close_valid_pic)
            },
            500);
            setTimeout(function() {
                addEvent(qZEditor.editorArea.IFrame.contentWindow.document, "keydown",
                function(e) {
                    keySubmit(e, "#comment_blog_input")
                })
            },
            500);
            setTimeout(function() {
                addEvent(qZEditor.editorArea.UBBFrame, "keydown",
                function(e) {
                    keySubmit(e, "#comment_blog_input")
                })
            },
            500);
        },
        100);
        _htmlMode = true;
        _autoFocus = true;
    } catch(e) {}
}
function refer_comment(comment_id, comment_time) {
    var comment_name = J('#comment_name_' + comment_id).text();
    var comment_content = Fid('comment_content_' + comment_id).innerHTML;
    var cur_str = get_refer_str(comment_name, comment_time, comment_content);
    showQzoneEdit(cur_str);
}
function get_refer_str(name, time, content) {
    var time_obj = new Date();
    if (time) {
        time_obj.setTime(parseInt(time + '000'));
    }
    var time_str = time_obj.getFullYear() + '-' + time_obj.getMonth() + '-' + time_obj.getDate() + ' ' + time_obj.getHours() + ':' + time_obj.getMinutes() + ':' + time_obj.getSeconds();
    var cur_str = '<BLOCKQUOTE style="BORDER-RIGHT: gray 1px dashed; PADDING-RIGHT: 10px; BORDER-TOP: gray 1px dashed; PADDING-LEFT: 10px; PADDING-BOTTOM: 10px; MARGIN: 10px; BORDER-LEFT: gray 1px dashed; PADDING-TOP: 10px; BORDER-BOTTOM: gray 1px dashed">引自：' + name + '&nbsp;&nbsp;于<INS>' + time_str + '</INS>发表的评论<BR />引用内容：<BR /><BR /><Q>' + content + '</Q></BLOCKQUOTE><br />';
    return cur_str;
}
function get_per_next_blog(index, side, type, class_id) {
    var type_str = '';
    var req_id = 'class_id';
    switch (type) {
    case '0':
    case 0:
        type_str = 'class';
        break;
    case '1':
    case 1:
        type_str = 'friend';
        break;
    case '2':
    case 2:
        type_str = 'school';
        break;
    }
    var side_str = (0 == side) ? 'pre': 'next';
    var url = '/index.php?mod=readzone&act=prenextblog&index=' + index + '&side=' + side_str + '&type=' + type_str + '&' + req_id + '=' + class_id;
    J.get_api(url, get_per_next_blog_cb);
}
function get_per_next_blog_cb(txt) {
    eval(txt);
    if (0 == err) {
        var href = 'http://' + DOMAINS.MAIN + '/index.php?mod=blog&act=showreadzone&u=' + uin + '&blogid=' + blog_id + '&type=' + type + '&index=' + index;
        if ('class' == type) {
            href += '&class_id=' + class_id;
        } else if ('school' == type) {
            href += '&school_id=' + class_id;
        } else {}
        window.location = href;
    } else {
        html_error_frame('温馨提示', msg);
    }
}
function BLtoSecret(blogid, type) {
    if (type == 1) {
        var confirm_cb = function() {
            SecNorCh(blogid, type);
        };
        html_confirm_frame('温馨提示', '转为私密日志后，只能保留100条日志评论。您是否确定转为私密日志？', confirm_cb, {
            cancel_callback: function() {
                close_frame('image_wait');
            }
        });
        return;
    }
    if (type == 2) {
        SecNorCh(blogid, 1);
        return;
    }
    SecNorCh(blogid, type);
}
function SecNorCh(blogid, type) {
    var cb = function(d) {
        if (d.success) {
            if (d.type == 1) {
                html_loading_frame("转到私密记事成功", 1000,
                function() {
                    window.location.href = "http://" + DOMAINS.MAIN + "/index.php?mod=blog&act=secretshow&blogid=" + d.blogid;
                });
            } else {
                html_loading_frame("转到普通日志成功", 1000,
                function() {
                    window.location.href = "http://" + DOMAINS.MAIN + "/index.php?mod=blog&act=show&blogid=" + d.blogid;
                });
            }
        } else if (d.error) {
            html_loading_frame(d.error);
        }
    };
    J.post_api('/index.php', {
        "mod": "blog",
        "act": "tosecret",
        "blogid": blogid,
        "type": type
    },
    cb, "json");
}
function show_drafts() {
    var content = '<iframe frameborder="no" src="http://' + DOMAINS.MAIN + '/index.php?mod=blog&act=draftlist" style="width:550px;height:275px;"></iframe>';
    setTimeout(function() {
        html_frame_new('读取草稿', content, '', '', {
            'div_width': 550,
            no_submit: true,
            no_cancel: true
        });
    },
    10);
}
function blog_reprint(blogid, u) {
    function _callback(d) {
        if (d.error) {
            if (d.errcode == 3) {
                return html_confirm_frame('温馨提示', '转载主人日志到您的校友，有可能导致主人隐私泄漏。您是否确定转载？',
                function() {
                    J.post_api('/index.php', {
                        'mod': 'blog',
                        'act': 'reprint',
                        'blogid': blogid,
                        'u': u,
                        'ensure': 1
                    },
                    _callback, 'json');
                },
                {
                    cancel_callback: function() {
                        close_frame('image_wait');
                    }
                });
            } else {
                return html_error_frame('温馨提示', d.error);
            }
        } else if (d.success) {
            return html_loading_frame('转载成功', 1500);
        } else {
            return html_error_frame('温馨提示', '系统错误，请稍后再试！');
        }
    }
    html_loading_frame('转载中，请稍等。', 5000);
    J.post_api('/index.php', {
        'mod': 'blog',
        'act': 'reprint',
        'blogid': blogid,
        'u': u
    },
    _callback, 'json');
}
function blog_empty() {
    var blog_title = Fid('blog_title').value.trim();
    var blog_content = qZEditor.getUBB().trim();
    if (Fempty(blog_title) && Fempty(blog_content)) {
        return true;
    }
    return false;
}
function get_share_num(u, type, cb, req_type) {
    if (!u) return;
    if (!req_type) req_type = 'guest';
    var g_cb = function(obj) {
        if (obj) {
            if (0 == obj.result && obj.count > 0) cb(obj.count);
        }
    }
    J.get_api("/index.php", {
        mod: "usershare",
        act: "guestcount",
        u: u,
        type: type,
        req_type: req_type
    },
    g_cb, "json");
}
function BbuildReplyBox(index) {
    var comment_id = index;
    var cb = function(content, form_data, vc) {
        var _cb = function(txt) {
            inputEnable();
            var tmp = txt.split('|');
            if (tmp.length != 2) {
                return html_loading_frame('系统错误，请稍后再试');
            }
            if (parseInt(tmp[0]) != 0) {
                return html_loading_frame(tmp[1]);
            }
            BLflushComments(cur_page);
            BLgetComments(Fid('hidden_blogid').value, cur_u_hash, cur_page);
        };
        inputDisable();
        J.post_api("/index.php", {
            'mod': 'blog',
            'act': 'addreply',
            'commentid': comment_id,
            'blogid': J('#hidden_blogid').val(),
            'u': J("#hidden_u_hash").val(),
            'reply_content': content
        },
        _cb);
        return false;
    };
    GbuildReplyItem('replyitem_' + index, cb, {
        "word_limit": 150
    });
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
}); (function() {
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
var g_school_post = new g_post_Iframe('g_school_post', 'get');
var show_school_div_id = 'div_school';
var f_location = {
    "1": {
        "name": "美国",
        "pro": {
            "11": "AK",
            "12": "AL",
            "13": "AR",
            "14": "AZ",
            "15": "CA",
            "16": "CO",
            "17": "CT",
            "18": "DC",
            "19": "DE",
            "20": "FL",
            "21": "GA",
            "22": "HI",
            "23": "IA",
            "24": "ID",
            "25": "IL",
            "26": "IN",
            "27": "KS",
            "28": "KY",
            "29": "LA",
            "30": "MA",
            "31": "MD",
            "32": "ME",
            "33": "MI",
            "34": "MN",
            "35": "MO",
            "36": "MS",
            "37": "MT",
            "38": "NC",
            "39": "ND",
            "40": "NE",
            "41": "NH",
            "42": "NJ",
            "43": "NM",
            "44": "NV",
            "45": "NY",
            "46": "OH",
            "47": "OK",
            "48": "OR",
            "49": "PA",
            "50": "RI",
            "51": "RISD",
            "52": "SC",
            "53": "SD",
            "54": "TN",
            "55": "TX",
            "56": "UT",
            "57": "VA",
            "58": "VT",
            "59": "WA",
            "60": "WI",
            "61": "WV",
            "62": "WY"
        }
    },
    "2": {
        "name": "加拿大",
        "pro": {}
    },
    "3": {
        "name": "英国",
        "pro": {}
    },
    "4": {
        "name": "澳大利亚",
        "pro": {}
    },
    "5": {
        "name": "新西兰",
        "pro": {}
    },
    "6": {
        "name": "新加坡",
        "pro": {}
    },
    "7": {
        "name": "爱尔兰",
        "pro": {}
    },
    "8": {
        "name": "荷兰",
        "pro": {}
    },
    "9": {
        "name": "马来西亚",
        "pro": {}
    },
    "10": {
        "name": "泰国",
        "pro": {}
    },
    "11": {
        "name": "南非",
        "pro": {}
    },
    "12": {
        "name": "挪威",
        "pro": {}
    },
    "13": {
        "name": "丹麦",
        "pro": {}
    },
    "14": {
        "name": "菲律宾",
        "pro": {}
    },
    "15": {
        "name": "印度",
        "pro": {}
    }
};
var g_school_country = {
    '840': '美国',
    '124': '加拿大',
    '826': '英国',
    '36': '澳大利亚',
    '554': '新西兰',
    '702': '新加坡',
    '372': '爱尔兰',
    '528': '荷兰',
    '458': '马来西亚',
    '764': '泰国',
    '710': '南非',
    '578': '挪威',
    '208': '丹麦',
    '608': '菲律宾'
}
if (typeof FgetProvince == "function") {
    var location_array = FgetProvince();
}
var g_school_select;
function school_select(school_input_id, school_cb, college_input_id, college_cb, class_input_id, class_cb) {
    this.school_input_id = (undefined == school_input_id) ? '': school_input_id;
    this.school_cb = (undefined == school_cb) ? this.none_f: school_cb;
    this.college_input_id = (undefined == college_input_id) ? '': college_input_id;
    this.college_cb = (undefined == college_cb) ? this.none_f: college_cb;
    this.class_input_id = (undefined == class_input_id) ? '': class_input_id;
    this.class_cb = (undefined == class_cb) ? this.none_f: class_cb;
    this.type = 'university';
    this.show_type = 1;
    this.college_id = 0;
    this.year = 0;
    this.show = false;
    this.edu_type = FgetCookie('schooltype');
    g_school_select = this;
    var prov_cookie_v = FgetCookie('province');
    this.province = ('' == prov_cookie_v || 0 == prov_cookie_v) ? 0 : prov_cookie_v;
    this.checking_class = false;
    this.no_my_school = true;
    this.get_class = true;
}
school_select.prototype.is_get_class = function(v) {
    this.get_class = v;
}
school_select.prototype.get_checking_class = function(v) {
    this.checking_class = v;
}
school_select.prototype.choose_show_type = function(type) {
    this.show_type = type;
}
school_select.prototype.none_f = function() {}
school_select.prototype.choose_type = function(type, edu) {
    if (undefined == edu) {
        this.type = type;
        close_div();
    } else {
        if ('edu' == edu) {
            this.edu_type = type;
            if (1 <= type && type <= 3) {
                this.type = 'university';
            } else if (3 < type && type <= 5) {
                this.type = 'midschool';
            } else {}
        }
    }
}
school_select.prototype.school_callback = function(text) {
    var name_array = text.name_array;
    var id_array = text.id_array;
    var select_obj = Fid(show_school_div_id).handle;
    select_obj.bg_iframe.style.height = (select_obj.show_div.scrollHeight - 20) + 'px';
    if (Fid('distinct')) {
        var len = id_array.length;
        Fid('distinct').innerHTML = '';
        if (len > 0) {
            if (Fid('distinct').style.visibility == "hidden") {
                Fid('distinct').style.visibility = "visible";
            }
            for (var i = 0; i < len; i++) {
                add_option(id_array[i], name_array[i])
            }
            change_district(Fid('distinct').value);
        } else {
            Fid('distinct').style.visibility = "hidden";
        }
    }
}
school_select.prototype.init_div = function() {
    if (!this.show_div) {
        this.show_div = document.createElement('DIV');
        this.show_div.id = show_school_div_id;
        this.show_div.style.display = 'none';
        this.show_div.style.position = 'absolute';
        this.show_div.style.zIndex = 99;
        document.getElementsByTagName('body')[0].appendChild(this.show_div);
        this.show_div.handle = this;
        this.bg_iframe = document.createElement('IFRAME');
        this.bg_iframe.frameBorder = 0;
        this.bg_iframe.style.display = 'none';
        this.bg_iframe.style.position = 'absolute';
        this.bg_iframe.style.width = this.show_div.style.width;
        this.bg_iframe.style.height = this.show_div.style.height;
        this.bg_iframe.style.left = this.show_div.style.left;
        this.bg_iframe.style.top = this.show_div.style.top;
        this.bg_iframe.style.zIndex = 98;
        document.getElementsByTagName('body')[0].appendChild(this.bg_iframe);
    }
    this.show_div.className = "float_box select_box clearfix";
    var higt_selected = ('university' == this.type) ? ' selected ': '';
    var mid_selected = ('midschool' == this.type) ? ' selected': '';
    var lowmid_selected = ('lowmidschool' == this.type) ? ' selected': '';
    var f_univ = '';
    if ('university' == this.type) {
        for (var i in g_school_country) {
            f_univ += '<OPTION value="' + i + '">' + g_school_country[i] + '</OPTION>';
        }
    }
    this.edu_cookie_type = FgetCookie('schooltype');
    var school_type_option = (this.edu_cookie_type < 5) ? '<option' + higt_selected + ' value="university">大学</option>': '';
    this.type = (this.edu_cookie_type >= 5 && 2 == this.show_type) ? 'midschool': this.type;
    var school_type_select_str = '';
    if (2 == this.show_type) {
        school_type_select_str = '<label>类型：<select id="_school_type_select" onchange="change_show_type()">' + school_type_option + '<option' + mid_selected + ' value="midschool">中学</option></select></label>';
    } else if (3 == this.show_type) {
        school_type_select_str = '<label>类型：<select id="_school_type_select" onchange="change_show_type()">' + school_type_option + '<option' + mid_selected + ' value="midschool">高中</option><option' + lowmid_selected + ' value="lowmidschool">初中</option></select></label>';
    }
    var city_select_str = ('university' == this.type) ? '': '<select style="width:75px;" id="_city" onchange="select_school()"></select><select style="width:75px;" id="distinct" onchange="change_district(this.value)"></select>';
    var no_my_school_str = '';
    if (true == this.no_my_school) {}
    this.show_div.innerHTML = '<div class="box_content select_content clearfix">\
  <div class="float_box_tit">\
       <h5>选择学校<span style="font-weight:normal;">&nbsp;&nbsp;-&nbsp;&nbsp;学校按名称的拼音顺序排列，同按Ctrl+F键可进行搜索</span></h5>\
    <button title="关闭" onclick="close_div()"class="close">&times;</button>\
   </div>\
   <div class="float_box_body">\
       <div class="area_select">' + school_type_select_str + '学校所在地： \
    <SELECT name="select" id="state_select" onchange="change_state()"><option selected value="0">中国</option>' + f_univ + '</SELECT><select style="width:105px;" id="_province" onchange="select_city()"><option selected value="0">请选择省(市)...</option></select>' + city_select_str + '\
   </div>\
   <div class="ifram_wrap">\
    <div id="school_tips" style="width:575px;height:255px;display:none"><div class="gb_tips gb_del"><p>请先选择学校所在地。</p></div></div> \
    <iframe id="school_iframe" style="width:575px;height:255px;" scrolling="no" frameborder="0" class="scroll_ifram"> \
    </iframe>\
   </div>\
   </div>\
   <div class="msg-bt">\
            <div class="word">\
                <p>&nbsp;' + no_my_school_str + '</p>\
            </div>\
        </div>\
 </div>';
    if (typeof(g_is_reg) != 'undefined') {
        Fid('state_select').disabled = 'disabled';
        location_array[71] = undefined;
        location_array[81] = undefined;
        location_array[82] = undefined;
    }
    init_province_select(this.province);
    this.show = true;
    if ('university' == this.type) {
        this.req_old_depart();
    }
}
function change_state() {
    var state_select = Fid("state_select");
    select_obj = Fid(show_school_div_id).handle;
    switch (state_select.value) {
    case '0':
        init_province_select(select_obj.province);
        break;
    case '1':
        init_f_pro_select(f_location[1]['pro']);
        break;
    default:
        Fid('_province').style.visibility = "hidden";
        break;
    }
    select_obj.get_school();
}
function init_f_pro_select(node) {
    Fid('_province').innerHTML = '';
    for (var i in node) {
        var option = document.createElement('option');
        option.value = i;
        option.text = node[i];
        option.innerHTML = node[i];
        Fid('_province').appendChild(option);
    }
    Fid('_province').style.visibility = "visible";
}
function change_show_type() {
    select_obj = Fid(show_school_div_id).handle;
    select_obj.choose_type(Fid('_school_type_select').value);
    select_obj.open_div();
}
function init_province_select(pro, id) {
    var pro_id = (undefined == pro) ? 0 : pro;
    if (!id) {
        id = '_province';
    }
    var select = Fid(id);
    for (var i = 1; i < location_array.length; i++) {
        if (undefined != location_array[i]) {
            select.options.add(new Option(location_array[i], i));
        }
    }
    select.value = pro_id;
    select.style.visibility = "visible";
}
function select_city() {
    select_obj = Fid(show_school_div_id).handle;
    select_obj.pro_choosed = Fid('_province').value;
    if (select_obj.pro_choosed == 0) {
        Fid('school_iframe').style.display = 'none';
        Fid('school_tips').style.display = '';
        return;
    } else {
        Fid('school_iframe').style.display = '';
        Fid('school_tips').style.display = 'none';
    }
    if (Fid('_city')) {
        var province = Fid('_province').value;
        Fid('_city').innerHTML = '';
        var sublocation;
        if (typeof FgetCity == "function") {
            sublocation = FgetCity(province);
        } else {
            sublocation = sublocation_array[province];
        }
        for (var i = province * 100 + 1; i < sublocation.length; i++) {
            if (undefined != sublocation[i]) {
                var option = document.createElement('option');
                option.value = i;
                option.text = sublocation[i];
                option.innerHTML = sublocation[i];
                Fid('_city').appendChild(option);
            }
        }
        select_school();
    } else {
        select_obj.get_school();
    }
}
function add_option(id, name) {
    var option = document.createElement('option');
    option.value = id;
    option.text = name;
    option.innerHTML = name Fid('distinct').appendChild(option);
}
function add_school(id, name) {
    var str = '<li><a title="' + name + '" href="javascript:choose_school(' + id + ',\'' + name + '\')">' + name + '</a></li>';
    return str;
}
function select_school() {
    select_obj = Fid(show_school_div_id).handle;
    select_obj.get_school();
}
school_select.prototype.get_school = function() {
    var location_id = 0;
    if ('0' == Fid('state_select').value) {
        location_id = ('university' == this.type) ? Fid('_province').value: Fid('_city').value;
        if ('university' != this.type) {
            this.city_choosed = Fid('_city').value;
        }
    } else if ('1' == Fid('state_select').value) {
        location_id = 'f' + Fid('state_select').value + '_' + Fid('_province').value;
    } else {
        location_id = 'f' + Fid('state_select').value;
    }
    var school_type = ('university' == this.type) ? 'showuniversity': 'showmidschool';
    if (Fid('state_select').value != 0) {
        Fid('school_iframe').style.display = '';
        Fid('school_tips').style.display = 'none';
    } else {
        var handle = Fid(show_school_div_id).handle;
        handle.pro_choosed = Fid('_province').value;
        if (handle.pro_choosed == 0) {
            Fid('school_iframe').style.display = 'none';
            Fid('school_tips').style.display = '';
            return;
        }
    }
    Fid("school_iframe").src = 'http://' + DOMAINS.IMGCACHE + '/campus/school/' + location_id + '_1.htm';
}
function school_callback_top(obj) {
    select_obj = Fid(show_school_div_id).handle;
    if (true == select_obj.show) {
        select_obj.school_callback(obj);
    }
}
function choose_school(id, name) {
    select_obj = Fid(show_school_div_id).handle;
    select_obj.school_id = id;
    select_obj.school_name = name;
    select_obj.hidden_div();
    select_obj.school_cb(select_obj);
    select_obj.get_classes();
}
function change_district(id) {
    if (id > 0) {
        var div_node = Fid("school_iframe").contentWindow.document.getElementById('district_s_div');
        var len = div_node.childNodes.length;
        for (var i = 0; i < len; i++) {
            div_node.childNodes[i].style.display = "none";
        }
        if (Fid("school_iframe").contentWindow.document.getElementById('district_' + id)) {
            Fid("school_iframe").contentWindow.document.getElementById('district_' + id).style.display = "block";
        }
        select_obj = Fid(show_school_div_id).handle;
        select_obj.district_choosed = id;
    }
}
school_select.prototype.open_div = function() {
    {
        this.init_div();
    }
    pgvUrl(null, null, '/REG_SCHOOL');
    show_div(this.school_input_id, this.show_div, 0, 0);
    this.bg_iframe.style.width = this.show_div.scrollWidth + 'px';
    this.bg_iframe.style.height = (this.show_div.scrollHeight) + 'px'show_div(this.school_input_id, this.bg_iframe, 0, 0);
    select_city();
    this.is_need_show_college_div = false;
}
school_select.prototype.hidden_div = function() {
    if (this.show_div) {
        this.show_div.style.display = 'none';
        this.bg_iframe.style.display = 'none';
        this.show = false;
    }
}
function close_div() {
    if (Fid(show_school_div_id)) {
        select_obj = Fid(show_school_div_id).handle;
        select_obj.hidden_div();
    }
}
function show_old() {
    if (Fid(show_school_div_id)) {
        select_obj = Fid(show_school_div_id).handle;
        select_obj.show_old_school();
    }
}
var class_array = new Array();
var year_array = new Array();
var college_array = new Array();
function ac(id, name, type) {
    class_array.push({
        id: id,
        name: name,
        type: type
    });
}
function ay(year) {
    year_array.push({
        year: year,
        classes: class_array
    });
    class_array = new Array();
}
function ad(id, name) {
    college_array.push({
        id: id,
        name: name,
        classes: year_array
    });
    year_array = new Array();
}
var class_array_c = new Array();
var year_array_c = new Array();
var college_array_c = new Array();
function ac_c(id, name, type) {
    class_array_c.push({
        id: id,
        name: name,
        type: type
    });
}
function ay_c(year) {
    year_array_c.push({
        year: year,
        classes: class_array
    });
    class_array_c = new Array();
}
function ad_c(id, name) {
    college_array.push({
        id: id,
        name: name,
        classes: year_array
    });
    year_array_c = new Array();
}
school_select.prototype.get_classes = function() {
    if (!this.get_class) {
        this.school_cb(this);
        return true;
    }
    if (this.school_id) {
        if (0 == this.year) {}
        var tail = '';
        if (true == this.checking_class && 'university' == this.type) {
            tail = '&op=checking';
        }
        tail += '&year=' + this.year;
        this.college_down = false;
        J.get_api('index.php', 'mod=school&act=showclasses&id=' + this.school_id + tail, classes_callback);
        return true;
    } else {
        return false;
    }
}
function classes_callback(text) {
    class_array = new Array();
    year_array = new Array();
    college_array = new Array();
    eval(text);
    if (!Fid(show_school_div_id)) {
        g_school_select.init_div();
    }
    select_obj = Fid(show_school_div_id).handle;
    select_obj.college_down = true;
    if (undefined != select_obj.school_name) {}
    if (true == select_obj.is_need_show_college_div) {
        select_obj.init_college_div();
    }
}
school_select.prototype.get_school_info = function() {
    return {
        id: this.school_id,
        name: this.school_name
    };
}
school_select.prototype.get_colleges = function() {
    return college_array;
}
school_select.prototype.get_college_name = function(id) {
    var ret = '';
    for (var i = 0; i < college_array.length; i++) {
        if (college_array[i].id == id) {
            ret = college_array[i].name;
            i = college_array.length;
        }
    }
    return ret;
}
school_select.prototype.set_year = function(year) {
    this.college_down = false;
    this.year = year;
}
school_select.prototype.get_class_array = function(id, year) {
    this.set_year(year);
    var ret = new Array();
    for (var i = 0; i < college_array.length; i++) {
        if (college_array[i].id == id) {
            var year_classes_array = college_array[i].classes;
            i = college_array.length;
            for (var j = 0; j < year_classes_array.length; j++) {
                if (year_classes_array[j].year == year) {
                    ret = year_classes_array[j].classes;
                    j = year_classes_array.length;
                }
            }
        }
    }
    return ret;
}
school_select.prototype.show_classes = function(year, callback, school_id) {
    if (true == this.college_down) {
        this.init_classes_div(year, callback);
    } else {
        if (undefined != school_id && 0 != school_id) {
            this.school_id = school_id;
            this.get_classes();
        }
        var self = this;
        setTimeout(function() {
            self.show_classes(year, callback);
        },
        100);
    }
}
school_select.prototype.init_classes_div = function(year, callback) {
    if (0 == this.college_id) {}
    if (0 == this.year) {
        html_error_frame("温馨提示", "请选择入学年份");
        return false;
    }
    var classes_str = this.init_classes_content(this.college_id, year);
    var school_type = (0 != this.edu_type) ? this.edu_type: (('university' == this.type) ? 3 : 2);
    var create_class_href = "javascritp:void(0)";
    if (callback == null) {
        create_class_href = 'http://' + DOMAINS.MAIN + '/index.php?mod=useredit&act=schoolinfoedit&create_flag=1&schoolid=' + this.school_id + '&deptid=' + this.college_id + '&schooltype=' + school_type + '&enrollyear=' + this.year;
    } else {
        create_class_href = 'javascript:' + callback + '();';
    }
    if ('' == classes_str) {
        var college_year_str = '<strong>' + this.year + '入学</strong>的';
        if (undefined != this.college_name && '' != this.college_name && 'university' == this.type) {
            college_year_str += '<strong>“' + this.college_name + '”</strong>下';
        }
        college_year_str += '暂时还没有同学创建班级';
        classes_str = '<div  class="gb_tips gb_del"><p><span id="schooltotal"></span><span>' + college_year_str + '<br/></span>点击“<a onclick="close_div();"  href="' + create_class_href + '">创建班级</a>”，你也可以为自己的班级安个家</p></div>';
    } else {}
    var class_div_str = '<div class="box_content select_class_con clearfix">\
 <div class="float_box_tit">\
     <h5>选择班级</h5>\
  <button title="关闭" class="close" onclick="close_div()">&times;</button>\
 </div>\
  <div class="float_box_body">\
       ' + classes_str + '\
   </div>\
  <div class="msg-bt">\
            <div class="word">\
                <p>&nbsp;<a href="' + create_class_href + '" onclick="close_div()">还没有我的班级，申请创建</a></p>\
            </div>\
        </div>\
 </div>';
    this.show_div.innerHTML = class_div_str;
    this.show_div.className = 'float_box select_class_wrap clearfix';
    get_school_total(this.school_id);
    show_div(this.class_input_id, this.show_div, 0, 0);
    this.bg_iframe.style.width = this.show_div.scrollWidth + 'px';
    this.bg_iframe.style.height = (this.show_div.scrollHeight) + 'px'show_div(this.class_input_id, this.bg_iframe, 0, 0);
}
school_select.prototype.class_name_check = function(name, id, year) {
    var classes = this.get_class_array(id, year) var classes_count = classes.length;
    var str = '';
    for (var index = 0; index < classes_count; index++) {
        if (classes[index].name == name) {
            return false
        }
    }
    return true;
}
school_select.prototype.init_classes_content = function(id, year) {
    var classes = this.get_class_array(id, year) var classes_count = classes.length;
    var str = '';
    var str2 = '';
    for (var index = 0; index < classes_count; index++) {
        if (0 == parseInt(classes[index].type) || 0 == parseInt(this.edu_type)) {
            if (classes[index].id > 0) {
                str += this.class_html(classes[index].id, classes[index].name);
            } else {
                str2 += this.class_html(classes[index].id, classes[index].name);
            }
        } else {
            if (parseInt(this.edu_type) == parseInt(classes[index].type)) {
                if (classes[index].id > 0) {
                    str += this.class_html(classes[index].id, classes[index].name);
                } else {
                    str2 += this.class_html(classes[index].id, classes[index].name);
                }
            }
        }
    }
    if ('' == str2 && '' == str) {
        return '';
    } else {
        var out = '';
        out = '<div class="select_campus_wrap"><ul class="list_campus">' + str + '</ul>';
        if ('' != str2) {
            out += '<h6>以下班级为正在审核中的，也可以申请加入</h6>' + '<ul class="list_campus">' + str2 + '</ul>';
        }
        out += '</div>';
        return out;
    }
}
school_select.prototype.class_html = function(id, name) {
    return '<LI><A title=' + name + ' href="javascript:_select_classes(' + id + ',\'' + name + '\')">' + name + '</A></LI>'
}
function _select_classes(id, name) {
    select_obj = Fid(show_school_div_id).handle;
    select_obj.class_id = id;
    select_obj.class_name = name;
    close_div();
    select_obj.class_cb(select_obj);
}
school_select.prototype.show_colleges = function(school_id) {
    if (undefined != school_id) {
        this.school_id = school_id;
    }
    if ((undefined == this.college_down || false == this.college_down) && undefined != this.school_id && this.school_id > 0) {
        this.is_need_show_college_div = true;
        this.get_classes();
    } else {
        if (true == this.college_down) {
            this.init_college_div();
        }
    }
}
school_select.prototype.init_college_div = function() {
    if (undefined == window.g_old_depart) {
        var self = this;
        loadJS("http://" + DOMAINS.IMGCACHE + "/campus/js/sync/old_depart.js",
        function() {
            self.init_college_div();
        });
        return '';
    }
    var line = '';
    var colleges_str = this.init_college_content();
    var college_div_str = '<div class="box_content select_content clearfix">\
 <div class="float_box_tit">\
     <h5>选择院系</h5>\
  <button title="关闭" class="close" onclick="close_div()">&times;</button>\
 </div>\
  <div class="float_box_body">\
       <div class="select_campus_wrap"><ul class="list_campus">' + colleges_str + '</ul></div>\
   </div>\
  <div class="msg-bt">\
            <div class="word">\
                ' + line + '\
            </div>\
        </div>\
 </div>';
    this.show_div.className = "float_box select_box clearfix";
    this.show_div.innerHTML = college_div_str;
    show_div(this.college_input_id, this.show_div, 0, 0);
    this.bg_iframe.style.width = this.show_div.scrollWidth + 'px';
    this.bg_iframe.style.height = (this.show_div.scrollHeight) + 'px'show_div(this.college_input_id, this.bg_iframe, 0, 0);
}
school_select.prototype.init_college_content = function() {
    var colleges = this.get_colleges();
    var college_count = colleges.length;
    var str = '';
    if (college_count > 0) {
        for (var index = 0; index < college_count; index++) {
            if ('' == colleges[index].name) {
                continue;
            }
            str += this.college_html(colleges[index].id, colleges[index].name);
        }
    } else {}
    return str;
}
school_select.prototype.college_html = function(id, name) {
    return '<LI><A title=' + name + ' href="javascript:select_college(' + id + ',\'' + name + '\')">' + name + '</A></LI>'
}
function select_college(id, name) {
    select_obj = Fid(show_school_div_id).handle;
    select_obj.college_id = id;
    select_obj.college_name = name;
    close_div();
    select_obj.college_cb(select_obj);
}
function select_old_college(id, name) {
    select_obj = Fid(show_school_div_id).handle;
    select_obj.college_id = id;
    var colleges = select_obj.get_colleges();
    var college_count = colleges.length;
    var str = '';
    if (college_count > 0) {
        for (var index = 0; index < college_count; index++) {
            if ('' != colleges[index].name && id == colleges[index].id) {
                name = colleges[index].name + '-' + name;
            }
        }
    }
    select_obj.college_name = name;
    close_div();
    select_obj.college_cb(select_obj);
}
function GetAbsoluteLocationEx(element) {
    if (arguments.length != 1 || element == null) {
        return null;
    }
    var elmt = element;
    var offsetTop = elmt.offsetTop;
    var offsetLeft = elmt.offsetLeft;
    var offsetWidth = elmt.offsetWidth;
    var offsetHeight = elmt.offsetHeight;
    while (elmt = elmt.offsetParent) {
        offsetTop += elmt.offsetTop;
        offsetLeft += elmt.offsetLeft;
        if (elmt.style.position == 'absolute') {
            break;
        }
    }
    return {
        absoluteTop: offsetTop,
        absoluteLeft: offsetLeft,
        offsetWidth: offsetWidth,
        offsetHeight: offsetHeight
    };
}
function GetAbsoluteLocationById(id) {
    var obj = document.getElementById(id);
    return GetAbsoluteLocationEx(obj);
}
function show_div(input_id, divNode, x, y) {
    var liNodePos = GetAbsoluteLocationById(input_id);
    divNode.style.marginLeft = '0px';
    divNode.style.marginTop = '2px';
    var left = (document.documentElement.scrollWidth - 600) / 2;
    var clientHeight = 0;
    var scrool_top = document.documentElement.scrollTop;
    if (Browser.isIE) {
        if (jQuery.browser.msie && jQuery.browser.version == 6) {
            scrool_top = document.body.scrollTop
        }
        clientHeight = document.documentElement.offsetHeight;
    } else {
        clientHeight = document.documentElement.clientHeight;
    }
    var top = scrool_top + (clientHeight - 380) / 2;
    divNode.style.left = left + 'px';
    divNode.style.top = top + 'px';
    divNode.style.display = 'block';
}
function no_my_school(type) {
    html_error_frame("温馨提示", "您好！学校新增工作暂停收集，已反馈的学校我们会陆续进行添加，敬请留意！");
}
function add_school_div(type) {
    var depart_html = '';
    if ('university' == type) {
        depart_html = '<tr>\
<th valign="top">学校院系：</th>\
<td id="add_school_depart">\
<div><input name="depart" type="text" size="40" maxlength="40" /></div>\
<div id="add_school_depart_button"><button class="bt_add" onclick="add_more_depart()">添加院系</button></div>\
</td>\
</tr>';
    }
    var html = '<div class="float_content1">\
<p class="tips">每人一年内只能申请<strong>2</strong>次,且<strong>3</strong>个月内不能重复申请。我们会在<strong>7</strong>个工作日内核实申请、并进行添加，敬请留意。</p>\
<table border="0" cellspacing="0" cellpadding="0">\
<tr>\
<th valign="top">所&nbsp;&nbsp;在&nbsp;&nbsp;地：</th>\
<td>\
<select name="select" id="select_add_pro" onchange="init_city_select(this.value,\'select_add_city\')">\
</select>&nbsp;&nbsp;\
<select name="select" id="select_add_city" onchange = "init_distinct_select(this.value,\'select_add_distinct\')">\
</select>&nbsp;&nbsp;\
<select name="select" id="select_add_distinct" >\
</select>\
</td>\
</tr>\
<tr>\
<th valign="top">官方校名：</th>\
<td id="add_school_name_td"><input id="add_school_name" name="" type="text" size="40" maxlength="40" /></td>\
</tr>\
<tr>\
<th valign="top">官方网址：</th>\
<td><input id="add_school_url" name="" type="text" size="40" maxlength="40" /> </td>\
</tr>' + depart_html + '</table>\
</div>';
    global_frame_new('申请添加学校', html, {
        submit_callback: function() {
            add_school_sunmit();
        },
        submit_not_close: true,
        wid: 'add_school'
    });
    var state_select = Fid("state_select");
    select_obj = Fid(show_school_div_id).handle;
    var pro = (select_obj.pro_choosed) ? select_obj.pro_choosed: select_obj.province;
    init_province_select(pro, 'select_add_pro');
    init_city_select(Fid('select_add_pro').value, 'select_add_city');
}
function init_city_select(value, select_id) {
    Fid(select_id).innerHTML = '';
    var state_select = Fid("state_select");
    var sublocation;
    if (typeof FgetCity == "function") {
        sublocation = FgetCity(value);
    } else {
        sublocation = sublocation_array[value];
    }
    for (var i = value * 100 + 1; i < sublocation.length; i++) {
        if (undefined != sublocation[i]) {
            var option = document.createElement('option');
            option.value = i;
            option.text = sublocation[i];
            option.innerHTML = sublocation[i];
            Fid(select_id).appendChild(option);
        }
    }
    if (select_obj.city_choosed) {
        Fid('select_add_city').value = select_obj.city_choosed;
        select_obj.city_choosed = false;
    }
    init_distinct_select(Fid(select_id).value, 'select_add_distinct');
}
function init_distinct_select(value, select_id) {
    Fid(select_id).innerHTML = '';
    var state_select = Fid("state_select");
    var cb = function(txt) {
        eval(txt);
        for (var i in district_arr) {
            var option = document.createElement('option');
            option.value = district_arr[i].id;
            option.text = district_arr[i].name;
            option.innerHTML = district_arr[i].name;
            Fid(select_id).appendChild(option);
        }
        if (select_obj.district_choosed) {
            Fid('select_add_distinct').value = select_obj.district_choosed;
            select_obj.district_choosed = false;
        }
    }
    J.get("/index.php", {
        mod: "getdistrict",
        cityid: value,
        district_obj_name: select_id
    },
    cb);
}
function add_more_depart() {
    var dapart_input = '<div><input name="depart" type="text" size="40" maxlength="40" /> <button onclick="del_more_depart(this)" title="删除">&times;</button></div>';
    J('#add_school_depart_button').before(dapart_input);
}
function del_more_depart(node) {
    node.parentNode.parentNode.removeChild(node.parentNode);
}
function notice_err(node_id, txt) {
    var notice = '<div class="err_tip">' + txt + '</div>';
    J('#' + node_id).append(notice);
}
function clean_notice_err(node_id) {
    J('#' + node_id + " .err_tip").remove();
}
var add_school_get = new g_post_Iframe('add_school_get', 'get');
function add_school_sunmit() {
    var can_post = true;
    var state_select = Fid("state_select");
    var school_name = '';
    var depart_names = '';
    select_obj = Fid(show_school_div_id).handle;
    clean_notice_err('add_school_name_td');
    if (Fid('add_school_name').value.length < 4) {
        Fid('add_school_name').focus();
        notice_err('add_school_name_td', '请输入学校官方全称，至少包含4个汉字');
        can_post = false;
    } else {
        var ret = true;
        if ('university' == select_obj.type) {
            var ret = check_tail(Fid('add_school_name').value, univ_tail_arr);
        } else {
            var ret = check_tail(Fid('add_school_name').value, mid_tail_arr);
        }
        if (true == ret) {
            notice_err('add_school_name_td', '请输入所反馈的学校名全称！');
            return;
        }
        school_name = Fid('add_school_name').value;
        var s_cb = function(obj) {
            var txt = obj.document.body.innerHTML;
            var reg = new RegExp(school_name);
            var arr = txt.match(reg);
            if (null == arr) {} else {
                notice_err('add_school_name_td', '您输入的学校已存在');
                can_post = false;
            }
        }
        var location = Fid('select_add_city').value;
        if ('university' == select_obj.type) {
            location = Fid('select_add_pro').value;
        }
        add_school_get.set(s_cb, 'http://' + DOMAINS.IMGCACHE + '/campus/school/' + location + '_1.htm', '');
        add_school_get.send();
    }
    if ('university' == select_obj.type) {
        clean_notice_err('add_school_depart');
        var depart = Fid('add_school_depart').childNodes;
        var d_len = depart.length;
        var depart_err = true;
        for (var i = 0; i < d_len; i++) {
            if ('depart' == depart[i].childNodes[0].name) {
                var depart_input = depart[i].childNodes[0].value;
                if (depart_input.length < 3) {
                    if (true == depart_err) {
                        depart[i].childNodes[0].focus();
                        notice_err('add_school_depart', '请输入学校院系名称，至少包含3个汉字');
                        depart_err = false;
                    }
                    can_post = false;
                } else {
                    depart_names += depart_input + ' ';
                }
            }
        }
    }
    if (true == can_post) {
        var district = Fid('select_add_distinct').value;
        var url = Fid('add_school_url').value;
        if (depart_names.length > 0) {
            depart_names = depart_names.substr(0, depart_names.length - 1);
        }
        var cb = function(obj) {
            if (0 == obj.ret) {
                close_frame('add_school');
                html_loading_frame('申请发送成功', null, null, null, true);
            } else {
                clean_notice_err('add_school_name_td');
                notice_err('add_school_name_td', obj.msg);
                Fid('add_school_name').focus();
            }
        };
        J.post('index.php', {
            mod: 'school',
            'act': 'add_school',
            d: district,
            s: school_name,
            departs: depart_names,
            type: select_obj.type,
            url: url
        },
        cb, 'json');
    }
}
var univ_tail_arr = new Array();
univ_tail_arr.push('大学');
univ_tail_arr.push('学院');
univ_tail_arr.push('师范');
univ_tail_arr.push('研究所');
univ_tail_arr.push('学校');
univ_tail_arr.push('技校');
univ_tail_arr.push('分校');
univ_tail_arr.push('校区');
var mid_tail_arr = new Array();
mid_tail_arr.push('校区');
mid_tail_arr.push('学校');
mid_tail_arr.push('中');
mid_tail_arr.push('中学');
function check_tail(str, key_arr) {
    var len = str.length;
    for (var i in key_arr) {
        var key = key_arr[i];
        var key_len = key.length;
        var start = len - key_len;
        var tail = str.substr(start, key_len);
        if (tail == key) {
            return false;
        }
    }
    return true;
}
function get_school_total(school_id) {
    var cb = function(obj) {
        if (0 == obj.ret && obj.count > 0) {
            var classno = '';
            if (obj.classno > 0) {
                classno = '，共' + obj.classno + '个班级';
            }
            var html = '“' + obj.name + '”已经有' + obj.count + '名同学在这里安家了' + classno + '<br />';
            J('#schooltotal').html(html);
        }
    };
    J.get_api('/index.php', {
        mod: 'campus',
        act: 'total',
        school_id: school_id
    },
    cb, 'json');
}
school_select.prototype.req_old_depart = function(callback) {
    if (undefined == window.g_old_depart) {
        var self = this;
        loadJS("http://" + DOMAINS.IMGCACHE + "/campus/js/sync/old_depart.js",
        function() {
            self.req_old_depart(callback);
        });
    } else {
        if (undefined != callback && 'function' == typeof(callback)) {
            callback();
        }
    }
}
school_select.prototype.is_old_school = function() {
    if (undefined == window.g_old_depart) {
        var self = this;
        loadJS("http://" + DOMAINS.IMGCACHE + "/campus/js/sync/old_depart.js",
        function() {
            self.is_old_school();
        });
    } else {
        if (undefined == window.g_old_depart[this.school_id]) {
            return false;
        } else {
            return true;
        }
    }
}
school_select.prototype.init_old_college_content = function() {
    var html = '';
    var sml_html = '';
    var title_html = '';
    if (undefined == window.g_old_depart) {
        var self = this;
        loadJS("http://" + DOMAINS.IMGCACHE + "/campus/js/sync/old_depart.js",
        function() {
            self.init_old_college_content();
        });
    } else {
        if (undefined != window.g_old_depart[this.school_id]) {
            for (var i in window.g_old_depart[this.school_id]) {
                title_html += '<a href="javascript:void()"  onclick="clean_a_class(this,\'list_campus_' + i + '\')"><span></span>' + i + '</a>';
                var li_html = '';
                sml_html += '<ul class="list_campus" style="display:none" id="list_campus_' + i + '">';
                for (var j in window.g_old_depart[this.school_id][i]) {
                    li_html += '<li><a href="javascript:select_old_college(' + window.g_old_depart[this.school_id][i][j] + ',\'' + j + '\')">' + j + '</a></li>'
                }
                sml_html += li_html + '</ul>';
                html += li_html;
            }
            html = '<ul class="list_campus" id="list_campus_all">' + html + '</ul>';
            return {
                title: title_html,
                html: html + sml_html
            };
        }
    }
}
function clean_a_class(node, id) {
    J('p.feed_p1 a').removeClass();
    node.className = "a_this";
    J('div.select_campus_wrap ul').hide();
    J('#' + id).show();
}
school_select.prototype.show_old_school = function() {
    this.hidden_div();
    var html_obj = this.init_old_college_content();
    var colleges_str = html_obj.html;
    var title = html_obj.title;
    var college_div_str = '<div class="box_content select_content clearfix">\
    <div class="float_box_tit">\
      <h5>选择院系</h5>\
      <button title="关闭" onclick="close_div()" class="close">&times;</button>\
    </div>\
    <div class="float_box_body">\
  <div class="filter_wrap clearfix"><span class="tx">筛选：</span>\
   <p class="feed_p1"><a href="javascript:void()" class="a_this" onclick="clean_a_class(this,\'list_campus_all\')"><span></span>全部</a>' + title + '</p>\
  </div>\
    <div class="select_campus_wrap">\
        ' + colleges_str + '\
       </div>\
    <div class="msg-bt">\
      <div class="word">\
        <p class="add_apply">还没找到我的院系？&nbsp;可以&nbsp;<a href="#">申请添加新院系</a></p>\
      </div>\
    </div>\
  </div>';
    this.show_div.className = "float_box select_box clearfix";
    this.show_div.innerHTML = college_div_str;
    show_div(this.college_input_id, this.show_div, 0, 0);
    this.bg_iframe.style.width = this.show_div.scrollWidth + 'px';
    this.bg_iframe.style.height = (this.show_div.scrollHeight) + 'px'show_div(this.college_input_id, this.bg_iframe, 0, 0);
}
function add_cate_classifypage(name) {
    function add_server_callback(data) {
        close_frame('image_wait');
        if (data.error) {
            if (data.error == 6) {
                return second_error_frame("对不起，分类名称不能包含特殊字符。");
            }
            if (data.error == 3) {
                return second_error_frame("输入文字中有部分敏感词，请删除后重试。");
            }
            if (data.error == 4) {
                return second_error_frame("该分类名已经存在。");
            }
            if (data.error == 5) {
                return second_error_frame("该分类名已经存在。");
            }
            return second_error_frame("对不起，添加失败，请稍后重试。");
        } else if (data.success) {
            window.location.href = 'http://' + DOMAINS.MAIN + '/index.php?mod=blog&act=classify';
        } else {
            window.location.href = 'http://' + DOMAINS.MAIN + '/index.php?mod=blog&act=classify';
        }
    }
    html_loading_frame('正在添加，请稍后。。。', 5000);
    J.post_api('/index.php', {
        mod: 'blog',
        act: 'cateadd',
        categoryname: name
    },
    add_server_callback, 'json');
}
function add_cate_popup(callback) {
    function add_cate_callback() {
        var name = J('#input_cate_name').val();
        name = name.trim();
        if ((name.indexOf('<') != -1) || (name.indexOf('>') != -1)) {
            second_error_frame("对不起，分类名称不能包含特殊字符。");
            return;
        }
        var l = len(name);
        if (l == 0) {
            second_error_frame("对不起，分类名称不能为空。");
            return;
        }
        if (l > 12) {
            second_error_frame("对不起，分类名称长度不能超过12个字母或6个汉字。");
        } else {
            close_frame("mess_float_box");
            callback(name);
        }
    }
    content = '<div class="add_blog_cata"><p><span>分类名称：</span><input id="input_cate_name" type="text" class="input_tx" /></p><p class="tips"><span class="c_tx2">最多12个字母或6个汉字</span></p> </div>';
    html_frame_new('添加日志分类', content, add_cate_callback, '', {
        submit_not_close: true
    });
    J('#input_cate_name').focus();
}
function add_cate_postpage(name) {
    function add_server_callback(data) {
        close_frame('image_wait');
        if (data.error) {
            if (data.error == 6) {
                return second_error_frame("对不起，分类名称不能包含特殊字符。");
            }
            if (data.error == 3) {
                return second_error_frame("输入文字中有部分敏感词，请删除后重试。");
            }
            if (data.error == 4) {
                return second_error_frame("该分类名已经存在。");
            }
            if (data.error == 5) {
                return second_error_frame("该分类名已经存在。");
            }
            return second_error_frame("对不起，添加失败，请稍后重试。");
        } else if (data.success) {
            html_loading_frame('添加成功！', 1500);
            J('#category_select').append('<option value="' + data.name + '" selected>' + escapeHTML(data.name) + '</option>');
        }
    }
    html_loading_frame('正在添加，请稍后。。。', 5000);
    J.post_api('/index.php', {
        mod: 'blog',
        act: 'cateadd',
        categoryname: name
    },
    add_server_callback, 'json');
}
function len(s) {
    return s.replace(/[^\x00-\xff]/gi, 'xx').length;
}
function second_error_frame(content) {
    var option = {
        no_cancel: true,
        zIndex: 1000
    };
    option.wid = "second_popup_frame";
    var html = '<div class="layer_global_tips"><div class="gb_tips gb_del"><p>' + content + '</p></div></div>';
    global_frame_new("温馨提示", html, option);
}
function del_category(i) {
    function del_category_callback() {
        var name = J("#edit_input_name_" + i).val();
        J("#categoryname").val(name);
        J('#cate_form').attr('action', 'http://' + DOMAINS.MAIN + '/index.php?mod=blog&act=catedel');
        J('#cate_form').submit();
    }
    content = '<div class="layer_global_tips"><div class="gb_tips gb_del"><p><strong>删除日志分类</strong><br/>若删除日志分类，则该分类下的所有日志将自动迁移到“个人日志”分类下</p></div></div>';
    html_frame_new('删除日志分类', content, del_category_callback);
}
function edit_cate(i) {
    J('#cate_edit_' + i).show();
    J('#cate_name_' + i).hide();
    J('#cate_r_' + i).hide();
    J('#edit_input_' + i).focus();
}
function edit_cancel(i) {
    J('#cate_edit_' + i).hide();
    J('#cate_name_' + i).show();
    J('#cate_r_' + i).show();
}
function edit_confirm(i) {
    var name_new = J('#edit_input_' + i).val();
    var name_old = J('#edit_input_name_' + i).val();
    name_new = name_new.trim();
    var l = len(name_new);
    if (l == 0) {
        second_error_frame("对不起，分类名称不能为空。");
        return;
    }
    if (l > 12) {
        second_error_frame("对不起，分类名称长度不能超过12个字母或6个汉字。");
    } else {
        modify_cate(name_new, name_old, i);
        close_frame("mess_float_box");
    }
}
function modify_cate(name_new, name_old, i) {
    function modify_server_callback(data) {
        if (data.error) {
            if (data.error == 6) {
                return second_error_frame("对不起，分类名称不能包含特殊字符。");
            }
            if (data.error == 3) {
                return second_error_frame("输入文字中有部分敏感词，请删除后重试。");
            }
            if (data.error == 4) {
                return second_error_frame("该分类名已经存在。");
            }
            if (data.error == 5) {
                return second_error_frame("该分类名已经存在。");
            }
            return second_error_frame("对不起，添加失败，请稍后重试。");
            edit_cancel(i);
        } else if (data.success) {
            window.location.href = 'http://' + DOMAINS.MAIN + '/index.php?mod=blog&act=classify';
        } else {
            window.location.href = 'http://' + DOMAINS.MAIN + '/index.php?mod=blog&act=classify';
        }
    }
    J.get_api('/index.php', {
        mod: 'blog',
        act: 'catedit',
        oldname: name_old,
        newname: name_new
    },
    modify_server_callback, 'json');
}
function jump_save_comfirm() {
    function _cb_save() {
        BdoPostBlog('dopost', 'http://' + DOMAINS.MAIN + '/index.php?mod=blog&act=classify');
        close_frame(w.id);
    }
    function _cb_unsave() {
        window.location.href = 'http://' + DOMAINS.MAIN + '/index.php?mod=blog&act=classify';
    }
    if (blog_empty()) {
        window.location.href = 'http://' + DOMAINS.MAIN + '/index.php?mod=blog&act=classify';
        return;
    }
    var w = document.createElement('DIV');
    w.id = 'save_popup';
    w.className = 'layer_global';
    w.style.width = '350px';
    w.style.display = 'none';
    w.innerHTML = '<div class="layer_global_main">' + '<div class="layer_global_title" id="save_popup_head">' + '<h3>保存日志</h3>' + '<button id="' + w.id + '_close" title="关闭"><span class="none">&#9587;</span></button>' + '</div>' + '<div class="layer_global_tips">' + '<div class="gb_tips gb_del">' + '<p><strong>跳转网页将导致尚未发表的日志正文丢失！</strong><br/>' + '网页即将跳转至“分类管理”，跳转后尚未发表的日志正文将会丢失，你是否要继续跳转？</p>' + '</div>' + '</div>' + '<div class="global_tip_button">' + '<button id="save_popup_submit" class="bt_tx2">保存</button>' + '<button id="save_popup_unsubmit" class="bt_tx_c3">不保存</button>' + '<button id="save_popup_cancel" class="bt_tx_c2">取消</button>' + '</div>' + '</div>';
    try {
        document.body.appendChild(w);
    } catch(e) {
        return false;
    }
    J("#" + w.id + "_close").click(function() {
        close_frame(w.id)
    });
    J("#" + w.id).keydown(function(e) {
        var k = e.charCode || e.keyCode || 0;
        if (k == 27) close_frame(w.id);
    });
    J("#" + w.id + "_submit").click(function() {
        close_frame(w.id, _cb_save);
    });
    J("#" + w.id + "_unsubmit").click(function() {
        close_frame(w.id, _cb_unsave);
    });
    J("#" + w.id + "_cancel").click(function() {
        close_frame(w.id);
    });
    html_normal_frame(w.id);
    FsetModal(null, false, w.id + '_modal');
    try {
        FenableDrag(w.id);
    } catch(e) {}
    J("#" + w.id + "_submit").focus();
}
J(document).ready(function() {
    if (!window.qzspd_f3) return;
    setTimeout(function() {
        var _tmp = function() {
            prepareQzoneRpt(qzspd_f3, 1);
            J("body").unbind("click", _tmp);
            J(window).unbind("scroll", _tmp);
        }
        J("body").bind("click", _tmp);
        J(window).bind("scroll", _tmp);
    },
    1000);
});
function check_qzonestatus(str, cb, force_open) {
    if (force_open) {
        var _cb = function(d) {
            if (d.err == 0 && d.result == 1) {
                cb(0);
                return;
            }
            cb(2);
        };
        J.post_api('/index.php?mod=checkpri&act=isopenqzone', {
            'doopen': 1
        },
        _cb, 'json');
        return false;
    }
    var _cb = function(d) {
        if (d.err == 0 && d.result == 1) {
            cb(0);
            return;
        }
        return html_confirm_frame('温馨提示', str,
        function() {
            check_qzonestatus(str, cb, 1);
        },
        {
            'cancel_callback': function() {
                cb(1);
            },
            'div_width': 400
        });
    };
    J.post_api('/index.php?mod=checkpri&act=isopenqzone', null, _cb, 'json');
    return false;
}
function pvPost(url) {
    window.pgvImg = new Image();
    window.pgvImg.src = url;
}
function pvmain() {
    var r;
    var uin = 0;
    var d = new Date();;
    try {
        r = document.location.href.match(/([^?]*)\?(.*)/i);
    } catch(e) {}
    if (r && r.length >= 1) {
        f = r[1].substr(r[1].lastIndexOf('/') + 1);
        pvPost('http://pv.xiaoyou.qq.com/?page=' + f + '&' + r[2] + '&rnd=' + Math.random());
    }
}
setTimeout("pvmain()", 1500);
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
/*  |xGv00|ac9833f190b2e7ded0658065f637bde6 */
