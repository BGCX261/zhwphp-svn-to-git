if (typeof(MUSICBLOG) == "undefined" || !MUSICBLOG) {
    MUSICBLOG = {
        version: "1.0",
        isHashMap: function(o) {
            return ((o !== null) && (typeof(o) == 'object'));
        }
    };
}
MUSICBLOG.namespace = {
    map: function(namespace) {
        if (MUSICBLOG.isHashMap(namespace)) {
            for (var k in namespace) {
                window[k] = namespace[k];
            }
        }
    }
};
var debugMode = false;
var g_oBPlayerCtrl = null,
BQQPlayer = null,
BediaPlayer = null;
var bUseBQQPlayer = true,
bBRandomPlay = false,
bBMusicLoaded = true,
idBAutoPlay = null;
var Browser = new Object();
Browser.isIE = window.ActiveXObject ? true: false;
Browser.isIE7 = Browser.isIE && window.XMLHttpRequest;
Browser.isMozilla = Browser.isIE ? false: (typeof document.implementation != 'undefined') && (typeof document.implementation.createDocument != 'undefined') && (typeof HTMLDocument != 'undefined');
Browser.isFirefox = Browser.isIE ? false: (navigator.userAgent.toLowerCase().indexOf("firefox") != -1);
function $(e) {
    if (typeof e == 'string') {
        e = document.getElementById(e);
    }
    return e;
}
if (!window.getElementInBody) getElementInBody = function(id, tagName, insertFirst, parentNodeID, className, initCSSText) {
    var e = $(id);
    if (!e) {
        tagName = (!tagName) ? "div": tagName;
        e = document.createElement(tagName);
        e.id = id;
        var parentNode = (!parentNodeID) ? document.body: $(parentNodeID);
        if (insertFirst) {
            parentNode.insertBefore(e, parentNode.firstChild);
        } else {
            parentNode.appendChild(e);
        }
        e.className = className ? className: "";
        e.style.cssText = initCSSText ? initCSSText: "";
    }
    parentNode = null;
    return e;
}
function StrBuf() {
    this._s_ = [];
}
StrBuf.prototype.a = function(s) {
    this._s_.push(s);
}
StrBuf.prototype.c = function() {
    this._s_ = [];
}
StrBuf.prototype.d = function() {
    this._s_ = null;
}
StrBuf.prototype.toS = function() {
    return this._s_.join("");
}
if (!window.getCookie) getCookie = function(n) {
    var r = new RegExp("(\\b)" + n + "=([^;]*)(;|$)");
    var m = document.cookie.match(r);
    return (!m ? "": m[2]);
}
if (!window.setCookie) setCookie = function(n, v, p, d) {
    if (!p) {
        p = "/";
    }
    if (!d) {
        d = "qq.com";
    }
    document.cookie = n + "=" + v + "; path=" + p + "; domain=" + d;
}
var S_UNDEFINE = 0,
S_STOP = 1,
S_PAUSE = 2,
S_PLAYING = 3,
S_BUFFERING = 4,
S_PLAYBEGIN = 5,
S_PLAYEND = 6;
var REP_PLAYURL_IP_ARRAY = [];
REP_PLAYURL_IP_ARRAY[0] = "121.14.73.62";
REP_PLAYURL_IP_ARRAY[1] = "121.14.73.48";
REP_PLAYURL_IP_ARRAY[2] = "58.60.9.178";
REP_PLAYURL_IP_ARRAY[3] = "58.61.165.54";
var REP_PLAYURL_PORT = 17785;
var bqqplayer_play_flag = true;
var S_FORWORD = 4;
var S_RESERVSE = 5;
var S_BUFFERING_WMP = 6;
var S_WAITING = 7;
var S_MEDIAEND = 8;
var S_TRANSITION = 9;
var S_READY = 10;
var S_RECONNECTION = 11;
var MAX_PLAYLIST_NUM = 200;
var P2P_UDP_SVR_IP = "58.61.166.180";
var P2P_TCP_SVR_IP = "58.61.166.180";
var P2P_UDP_SVR_PORT = 8000;
var P2P_TCP_SVR_PORT = 433;
var P2P_STUN_SVR_IP = "stun-a1.qq.com";
var P2P_STUN_SVR_PORT = 8000;
var P2P_TORRENT_URL = "http://219.134.128.55/";
var P2P_CACHE_SPACE = 100;
var STAT_REPORT_SVR_IP = "219.134.128.41";
var STAT_REPORT_SVR_PORT = 17653;
var MUSIC_COOKIE_DOMAIN = "qq.com";
var PANEL_UIN_COOKIE_NAME = "zzpaneluin";
var PANEL_KEY_COOKIE_NAME = "zzpanelkey";
var MUSIC_UIN_COOKIE_NAME = "qqmusic_uin";
var MUSIC_KEY_COOKIE_NAME = "qqmusic_key";
var CURRENT_WMP_VERSION = "7.0.0.0";
var CURRENT_PLAYER_VERSION = "1.3.0.0";
var ACTIVE_INTERVAL = 120;
var REP_PLAYSONG_PORT = 8000;
var REP_SONGLIST_PORT = 8000;
var REP_PLAYSONG_IP_ARRAY = new Array();
REP_PLAYSONG_IP_ARRAY[0] = "58.60.11.85";
REP_PLAYSONG_IP_ARRAY[1] = "121.14.96.113";
REP_PLAYSONG_IP_ARRAY[2] = "58.61.165.50";
REP_PLAYSONG_IP_ARRAY[3] = "121.14.78.75";
var REP_SONGLIST_IP_ARRAY = new Array();
REP_SONGLIST_IP_ARRAY[0] = "121.14.94.181";
REP_SONGLIST_IP_ARRAY[1] = "121.14.94.183";
var REP_SONGLIST_PROGRAM = "QZoneWebClient";
function PlayListObject() {
    this.mId = -1;
    this.mDuration = 0;
    this.mPlayURL = "";
    this.mTorrentURL = "";
    this.mSongName = "";
    this.mSingerName = "";
}
function PlayerListManager() {
    this.mFull = false;
    this.mPosition = -1;
    this.mpList = new Array();
    this.getCount = function() {
        return this.mpList.length;
    };
    this.getObject = function(n) {
        return this.mpList[n];
    };
    this.getPos = function(sul) {
        for (var i = 0,
        l = this.getCount(); i < l; i++) {
            if (this.getObject(i).mPlayURL == sul) {
                return i;
            }
        }
        return - 1;
    };
    this.getPosById = function(Id) {
        for (var i = 0,
        l = this.getCount(); i < l; i++) {
            if (this.getObject(i).mId == Id) {
                return i;
            }
        }
        return - 1;
    };
    this.findObject = function(sul) {
        var i = this.getPos(sul);
        if (i != -1) {
            return this.getObject(i);
        }
        return null;
    };
    this.findObjectById = function(id) {
        var i = this.getPosById(id);
        if (i != -1) {
            return this.getObject(i);
        }
        return null;
    };
    this.findObject = function(sul) {
        var i = this.getPos(sul);
        if (i != -1) {
            return this.getObject(i);
        }
        return null;
    };
    this.addObject = function(id, sul, stpt, iDuration, sSong, sSinger, sQzKey) {
        if (sul == "") {
            return;
        }
        var obj, pos;
        if (id > 0) {
            pos = this.getPosById(id);
        } else if (sul != "") {
            pos = this.getPos(sul);
        }
        if (pos == -1) {
            if (this.getCount() >= MAX_PLAYLIST_NUM) {
                this.mFull = true;
                this.mPosition += 1;
                if (this.mPosition >= MAX_PLAYLIST_NUM) {
                    this.mPosition = 0;
                }
                obj = this.getObject(this.mPosition);
            } else {
                obj = new Object();
                this.mpList[this.getCount()] = obj;
            }
            obj.mId = id;
            obj.mPlayURL = sul;
            obj.mTorrentURL = stpt;
            obj.mDuration = iDuration;
            obj.mSongName = sSong;
            obj.mSingerName = sSinger;
            obj.mQzoneKey = sQzKey;
        }
        return;
    };
    this.updateObject = function(id, sul, stpt, iDuration, sSong, sSinger, sQzKey) {
        var n = this.getPos(sul);
        if (n != -1) {
            this.mpList[n].mId = id;
            this.mpList[n].mDuration = iDuration;
            this.mpList[n].mTorrentURL = stpt;
            this.mpList[n].mSongName = sSong;
            this.mpList[n].mSingerName = sSinger;
            this.mpList[n].mQzoneKey = sQzKey;
            return true;
        }
        return false;
    };
    this.updateObjectById = function(id, sul, stpt, iDuration, sSong, sSinger, sQzKey) {
        var n = this.getPosById(id);
        if (n != -1) {
            this.mpList[n].mPlayURL = sul;
            this.mpList[n].mTorrentURL = stpt;
            this.mpList[n].mDuration = iDuration;
            this.mpList[n].mSongName = sSong;
            this.mpList[n].mSingerName = sSinger;
            this.mpList[n].mQzoneKey = sQzKey;
            return true;
        }
        return false;
    };
    this.clearObject = function() {
        for (var i = 0,
        l = this.getCount(); i < l; i++) {
            if (this.mpList[i]) {
                delete this.mpList[i];
            }
        }
        this.mpList.length = 0;
    };
}
function FvaildateUin(uin) {
    var R = /^[1-9]\d{4,11}$/;
    return R.test(uin);
}
function getLoginUin() {
    var uin = parseInt(getCookie("zzpaneluin"));
    if (FvaildateUin(uin)) {
        return uin;
    }
    var R = /^o(0)*/;
    uin = getCookie("uin");
    uin = parseInt(uin.replace(R, ''));
    if (FvaildateUin(uin)) {
        return uin;
    } else {
        return 0;
    }
}
function m_r_SetCookie(n, v, s) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (s * 1000));
    document.cookie = n + "=" + escape(v) + "; Expires=" + expires.toGMTString() + "; PATH=/; DOMAIN=qq.com;";
}
var m_r_r_s = "";
function m_r_GetRUin() {
    if (m_r_r_s.length > 0) {
        return m_r_r_s;
    }
    var uin = getCookie("ruv");
    if (uin != null && uin.length > 0) {
        m_r_r_s = uin;
        return m_r_r_s;
    }
    var ruv = ("" + (Math.random() * 10000000000000)).split('.')[0];
    m_r_SetCookie("ruv", ruv, 3600 * 24 * 7);
    m_r_r_s = ruv;
    return m_r_r_s;
}
function m_ru_GetIsLogin() {
    g_iLoginUin = getLoginUin();
    return (g_iLoginUin != null && g_iLoginUin > 10000) ? 1 : 0;
}
function m_rpt_url(url, data) {
    var tmp = ("" + Math.random() + "000000000").substring(2, 9);
    var pul = url + "?" + "from=1&ruv=" + (getLoginUin() > 10000 ? getLoginUin() : m_r_GetRUin()) + "&login=" + m_ru_GetIsLogin() + "&tmp=" + tmp + "&" + data;
    var tt = new Image();
    tt.src = pul;
    tt.onload = tt.onerror = function() {
        this.onload = this.onerror = null;
    };
}
var m_rpt_f = false;
var m_rpttj2_f = false;
function m_rpt_box(f, ul, v) {
    if ((!m_rpt_f)) {
        m_rpt_f = true;
        setTimeout("m_rpt_f=false;", 1000 * 300);
        m_rpt_url("http://pt.music.qq.com/fcgi-bin/cgi_rponline.fcg", "qqplay=" + f + "&version=" + v + "&");
    }
    if (!m_rpttj2_f) {
        m_rpttj2_f = true;
        setTimeout("m_rpttj2_f=false;", 1000 * 180);
        var uin = top.g_iUin;
        if (top.g_iLoginUin > 10000) {
            uin = top.g_iLoginUin;
        }
        send_stat_request('http://qzone-music.qq.com/fcg-bin/fcg_musicblog_statis.fcg?new=1&type=15&value=1&uin=' + uin);
    }
}
function statImgSend(url, t) {
    if (!top.tmpMusicStat) {
        top.tmpMusicStat = [];
    }
    var l = top.tmpMusicStat.length;
    top.tmpMusicStat[l] = new Image();
    with(top.tmpMusicStat[l]) {
        onload = onerror = new Function('this.ready=true;this.onload=this.onerror=null;if(typeof(top.statImgClean)=="function"){top.statImgClean();}');
    }
    top.setTimeout("top.tmpMusicStat[" + l + "].src = '" + url + "';", t);
}
function statImgClean() {
    for (var i = 0,
    l = top.tmpMusicStat.length; i < l; i++) {
        if ( !! top.tmpMusicStat[i] && !!top.tmpMusicStat[i].ready) {
            delete top.tmpMusicStat[i];
        }
    }
}
function build_args(data) {
    var buf = [];
    for (name in data) {
        buf.push(name + '=' + data[name]);
    }
    return buf.join('&');
}
function tj2_musicbox(opt_cmd, opt_type, result, opt_source, interval_time) {
    result = result || 0;
    opt_type = opt_type || 0;
    interval_time = interval_time || 500;
    var user_level = 0;
    var user_type = 2;
    if (typeof top.musicVipLevel != 'undefined' && top.musicVipLevel > 0) {
        user_level = top.musicVipLevel;
    }
    if (typeof top.isMusicVip != 'undefined') {
        user_type = (top.isMusicVip == 1 ? 1 : 2);
    }
    var url = 'http://qzone-music.qq.com/fcg-bin/statistics_tj2.fcg';
    var args_dict = {
        source: (opt_source || 24),
        type: opt_type,
        code: opt_cmd,
        usertype: user_type,
        usermode: 1,
        userlevel: user_level,
        result: result,
        p: Math.random()
    }
    var args = build_args(args_dict);
    try {
        statImgSend(url + '?' + args, interval_time);
    } catch(e) {}
}
function insertBQQPlayer(args) {
    if (Browser.isIE) {
        params = {};
        objAttrs = {};
        for (var k in args) {
            switch (k) {
            case "classid":
                continue;
                break;
            case "style":
            case "name":
            case "height":
            case "width":
            case "id":
                objAttrs[k] = args[k];
                break;
            default:
                params[k] = args[k];
            }
        }
        objAttrs["classid"] = "CLSID:E05BC2A3-9A46-4A32-80C9-023A473F5B23";
        var str = new StrBuf();
        str.a('<object ');
        for (var i in objAttrs) {
            str.a(i);
            str.a('="');
            str.a(objAttrs[i]);
            str.a('" ');
        }
        str.a('>');
        for (var i in params) {
            str.a('<param name="');
            str.a(i);
            str.a('" value="');
            str.a(params[i]);
            str.a('" /> ');
        }
        str.a('</object>');
        g_playerDiv = getElementInBody("musicblog", "div");
        g_playerDiv.innerHTML = str.toS();
        str.d();
        return g_playerDiv.firstChild;
    } else if (Browser.isFirefox) {
        try {
            g_playerDiv = getElementInBody("musicblog", "div");
            g_playerDiv.innerHTML = '<embed id="QzoneMusic" type="application/tecent-qzonemusic-plugin" width="0px" height="0px" />';
            var QzonePlayer = document.getElementById('QzoneMusic');
            QzonePlayer.CreateAX("QzoneMusic.dll");
            for (var k in args) {
                switch (k) {
                case "classid":
                case "style":
                case "name":
                case "height":
                case "width":
                case "id":
                case "P2PUDPServ_IP":
                case "P2PTCPServ_IP":
                    continue;
                    break;
                default:
                    QzonePlayer.setAttribute(k, args[k]);
                }
            }
            gQzoneMusicVer = QzonePlayer.GetPlayerSvrVersion();
            if (gQzoneMusicVer >= "3.2") {
                P2P_UDP_SVR_IP = "pdlmusic.p2p.qq.com";
                P2P_TCP_SVR_IP = "pdlmusic.p2p.qq.com";
            }
            QzonePlayer.setAttribute("P2PUDPServ_IP", P2P_UDP_SVR_IP);
            QzonePlayer.setAttribute("P2PTCPServ_IP", P2P_TCP_SVR_IP);
            bUseBQQPlayer = true;
            bUseNewPlayer = true;
            return QzonePlayer;
        } catch(e) {}
    }
}
function compareString(s1, s2) {
    var ss1 = s1.split(".");
    var ss2 = s2.split(".");
    var num = ss1.length;
    if (num > ss2.length) {
        num = ss2.length;
    }
    for (var i = 0; i < num; i++) {
        if (parseInt(ss1[i], 10) > parseInt(ss2[i], 10)) {
            return 1;
        } else if (parseInt(ss1[i], 10) < parseInt(ss2[i], 10)) {
            return - 1;
        }
    }
    return 0;
}
function createBPlayer() {
    var ttii = (parseInt(Math.random() * 1000)) % REP_PLAYSONG_IP_ARRAY.length;
    var ttii2 = (parseInt(Math.random() * 1000)) % REP_SONGLIST_IP_ARRAY.length;
    var ttii3 = (parseInt(Math.random() * 1000)) * REP_PLAYURL_IP_ARRAY.length;
    return insertBQQPlayer({
        id: 'QzonePlayer',
        height: 0,
        width: 0,
        PlayerType: 2,
        CacheSize: P2P_CACHE_SPACE,
        ValidDomain: 'qq.com',
        EnableSyncListen: 1,
        UploadStatCount: 10,
        ExitDelayTime: 120,
        UsedWhirl: ((compareString(gQzoneMusicVer, "3.3.196.1216") >= 0) ? 0 : 1),
        RestrictHttpStartInterval: 1,
        RestrictHttpStopInterval: 100,
        P2PUDPServ_IP: P2P_UDP_SVR_IP,
        P2PUDPServ_Port: P2P_UDP_SVR_PORT,
        P2PTCPServ_IP: P2P_TCP_SVR_IP,
        P2PTCPServ_Port: P2P_TCP_SVR_PORT,
        P2PStunServ_IP: P2P_STUN_SVR_IP,
        P2PStunServ_Port: P2P_STUN_SVR_PORT,
        RepPlaySong_IP: REP_PLAYSONG_IP_ARRAY[ttii],
        RepPlaySong_Port: REP_PLAYSONG_PORT,
        RepSongList_IP: REP_SONGLIST_IP_ARRAY[ttii2],
        RepSongList_Port: REP_SONGLIST_PORT,
        RepPlayURL_IP: REP_PLAYURL_IP_ARRAY[ttii3],
        RepPlayURL_Port: REP_PLAYURL_PORT
    });
}
function EventPlayer(oTarget, sEventType, fnHandler) {
    if (oTarget.attachEvent) {
        oTarget.attachEvent(sEventType, fnHandler);
    } else if (oTarget.addEventListener) {
        oTarget.addEventListener(sEventType, fnHandler, false);
    } else {
        oTarget[sEventType] = fnHandler;
    }
}
function EventPlayerRemove(oTarget, sEventType, fnHandler) {
    if (oTarget.detachEvent) {
        oTarget.detachEvent(sEventType, fnHandler);
    } else if (oTarget.removeEventListener) {
        oTarget.removeEventListener(sEventType, fnHandler, false);
    } else {
        oTarget[sEventType] = null;
    }
}
function EventUtil(oTarget, sEventType, fnHandler) {
    if (oTarget.attachEvent) {
        oTarget.attachEvent("on" + sEventType, fnHandler);
    } else if (oTarget.addEventListener) {
        oTarget.addEventListener(sEventType, fnHandler, false);
    } else {
        oTarget["on" + sEventType] = fnHandler;
    }
}
function EventUtilRemove(oTarget, sEventType, fnHandler) {
    if (oTarget.detachEvent) {
        oTarget.detachEvent("on" + sEventType, fnHandler);
    } else if (oTarget.removeEventListener) {
        oTarget.removeEventListener(sEventType, fnHandler, false);
    } else {
        oTarget["on" + sEventType] = null;
    }
}
function updateDownloadPlayer() {
    openDownloadDiv();
}
function openDownloadDiv() {
    var strHTML = '<iframe id="download_QQPlayer" frameborder="0" src="http://imgcache.qq.com/music/musicbox_v2_1/doc/downloadPlayer.html" allowTransparency="true" style="width:474px;height:311px;"></iframe>';
    top.QZONE.FrontPage.popupDialog("下载最新版QQ音乐播放控件", strHTML, 476, 311);
    top.popupCallback = function() {}
}
function BlogQQPlayer() {
    this.mPlayList = new PlayerListManager();
    this.mPlayingPos = -1;
    this.mPlayerSource = "";
    this.mCurPlaySrc = "";
    this.mPlayerType = "";
    this.mPlayerState = S_UNDEFINE;
    this.mRandomPlay = false;
    this.mPlayerName = "";
    this.mP2P = false;
    this.mSyncStatus = false;
    this.mExistTime = 0;
    this.mUinCookie = 0;
    this.mKeyCookie = "";
    this.mFromTag = 16;
    this.mIsInit = false;
    this.mInstall = false;
    this.mAlwreadyCheck = false;
    this.mHumanStop = false;
    this.mHumanPause = false;
    this.mNotSetUdpReport = false;
    this.plv = "0";
    this.setPlayParams = function(iMusicId, sul) {
        this.mPlayerName.SetCookie("qqmusic_uin", this.mUinCookie);
        this.mPlayerName.SetCookie("qqmusic_key", this.mKeyCookie);
        this.mPlayerName.SetCookie("qqmusic_fromtag", this.mFromTag);
        var tiMusicId = "" + iMusicId;
        this.mPlayerName.SetCookie("qqmusic_musicid", tiMusicId);
        this.mPlayerName.SetCookie("qqmusicchkkey_key", this.mKeyCookie);
        this.mPlayerName.SetCookie("qqmusicchkkey_url", sul);
        if (!this.mNotSetUdpReport) {
            this.mNotSetUdpReport = true;
            this.setUploadStatCount();
            this.launchUdpReport();
        }
        return;
    };
    this.setUploadStatCount = function() {};
    this.launchUdpReport = function() {};
    this.checkPlayer = function() {
        var sWMPVersion = this.mPlayerName.GetVersion(1);
        if (sWMPVersion == "") {
            return false;
        }
        if (compareString(sWMPVersion, CURRENT_WMP_VERSION) < 0) {
            return false;
        }
        try {
            this.plv = this.mPlayerName.GetPlayerSvrVersion();
            if (debugMode) {}
        } catch(e) {
            this.plv = "0";
        }
        return true;
    };
    this.getPlayerSource = function() {
        return this.mPlayerSource;
    };
    this.getCurrentPlayerSource = function() {
        return this.mCurPlaySrc;
    };
    this.createActiveX = function(bv, bi, bp2p, name, w, h, uincn, keycn, dl) {
        try {
            this.mPlayerName = createBPlayer();
            if (top.g_iUin) {
                this.mPlayerSource = "qzone_player_" + top.g_iUin + "_" + new Date().getTime();
            } else {
                this.mPlayerSource = "qzone_player_20061016" + "_" + new Date().getTime();
            }
            this.mPlayerName.PlaySrc = this.mPlayerSource;
            this.mCurPlaySrc = this.mPlayerSource;
        } catch(e) {
            if (debugMode) {
                status = ("e 7 " + e.message);
            }
        }
        return "";
    };
    this.initialize = function() {
        try {
            if (Browser && Browser.isFirefox && !(this.mPlayerName.GetVersion(4) >= "3.4")) {
                updateDownloadPlayer();
                return false;
            }
            if (!this.checkPlayer()) {
                return false;
            }
            this.mP2P = true;
            this.mSyncStatus = true;
            this.mInstall = true;
            this.mExistTime = 5;
            if (!this.mPlayerName) {
                return false;
            }
            EventPlayer(this.mPlayerName, "OnInitialized", BOnInitialized);
            EventPlayer(this.mPlayerName, "OnUninitialized", BOnUnitialized);
            EventPlayer(this.mPlayerName, "OnStateChanged", BOnStateChanged);
            EventPlayer(this.mPlayerName, "OnPlayProgress", BOnPlayProgress);
            EventPlayer(this.mPlayerName, "OnPlayError", BOnPlayError);
            EventPlayer(this.mPlayerName, "OnDnldProgress", BOnDownloadProgress);
            EventPlayer(this.mPlayerName, "OnPlaySrcChanged", BOnPlaySrcChanged);
            this.mPlayerName.Initialize();
            this.mPlayerName.Volume = 100;
        } catch(e) {
            if (debugMode) {
                status = ("e 8 " + e.message);
            }
            return false;
        }
        this.mIsInit = true;
        return true;
    };
    this.unInitialize = function() {
        try {
            EventPlayerRemove(this.mPlayerName, "OnInitialized", BOnInitialized);
            EventPlayerRemove(this.mPlayerName, "OnUninitialized", BOnUnitialized);
            EventPlayerRemove(this.mPlayerName, "OnStateChanged", BOnStateChanged);
            EventPlayerRemove(this.mPlayerName, "OnPlayProgress", BOnPlayProgress);
            EventPlayerRemove(this.mPlayerName, "OnPlayError", BOnPlayError);
            EventPlayerRemove(this.mPlayerName, "OnDnldProgress", BOnDownloadProgress);
            EventPlayerRemove(this.mPlayerName, "OnPlaySrcChanged", BOnPlaySrcChanged);
            if ((this.mPlayerName).Uninitialize()) {
                this.mIsInit = false;
                return true;
            }
        } catch(e) {
            if (debugMode) {
                status = ("e 9 " + e.message);
            }
            return false;
        }
    };
    this.isInitialize = function() {
        return this.mIsInit;
    };
    this.getStatus = function() {
        if (!this.mIsInit) {
            return - 1;
        }
        var _s = -1;
        _s = this.mPlayerName.CurState;
        return _s;
    };
    this.setPlayURL = function(id, ul, stpt, iDuration, sSong, sSinger, sQzKey) {
        id = parseInt(id);
        var uin = getCookie(PANEL_UIN_COOKIE_NAME);
        var key = getCookie(PANEL_KEY_COOKIE_NAME);
        if (uin == "") {
            uin = getCookie("uin").replace(/[^\d]/g, "");
        };
        if (key == "") {
            key = getCookie("skey");
        };
        this.setUserIdent(uin != "" ? uin: '12345678', key != "" ? key: '12345678', this.mFromTag);
        if (!this.mIsInit) {
            return;
        }
        if (((ul == null) || (ul == "")) && (id < 0)) {
            return;
        }
        var tpp = 0;
        if (this.mP2P) {
            tpp = 1;
        }
        if (id < 0) {
            this.setPlayParams(id, ul);
            this.mPlayingPos = this.mPlayList.getPos(ul);
            this.mPlayerName.SetPlayURL(id, ul, stpt);
            this.mPlayList.addObject(id, ul, stpt, 0, sSong, sSinger);
        } else {
            this.setPlayParams(id, ul);
            this.mPlayingPos = this.mPlayList.getPosById(id);
            this.mPlayerName.SetPlayURL(id, ul, stpt);
            this.mPlayList.addObject(id, ul, stpt, 0, sSong, sSinger);
            try {
                m_rpt_box(1, ul, this.plv);
            } catch(e) {}
        }
        try {} catch(e) {}
        return;
    };
    this.setPlayList = function() {};
    this.resetCache = function() {};
    this.isPlaying = function() {
        if (!this.mIsInit) {
            return false;
        }
        var _s = this.mPlayerState;
        return ((_s == S_PLAYING) || (_s == S_BUFFERING) || (_s == S_PLAYBEGIN));
    };
    this.isPause = function() {
        if (!this.mIsInit) {
            return false;
        }
        var _s = this.mPlayerState;
        return (_s == S_PAUSE);
    };
    this.lastBufTime = 0;
    this.isStop = function() {
        if (!this.mIsInit) {
            return false;
        }
        var _s = this.mPlayerState;
        if (_s == S_BUFFERING) {
            var cur = new Date().getTime();
            if (cur - this.lastBufTime > 1000 * 60) {
                this.lastBufTime = new Date().getTime();
            }
            if (cur - this.lastBufTime > 1000 * 20) {
                this.lastBufTime = new Date().getTime();
                return true;
            }
        } else {
            this.lastBufTime = 0;
        }
        return ((_s == S_STOP) || (_s == S_PLAYEND));
    };
    this.getCurrentMusic = function() {
        if (this.mPlayingPos < 0) {
            return null;
        }
        return this.mPlayList.getObject(this.mPlayingPos);
    };
    this.runPlayerPos = function(pos) {
        if (this.isPause()) {
            this.startPlayer();
        } else if (pos >= 0 && pos < this.mPlayList.getCount()) {
            var obj = this.mPlayList.getObject(pos);
            this.setPlayURL(obj.mId, obj.mPlayURL, obj.mTorrentURL, obj.mDuration, obj.mSongName, obj.mSingerName, obj.mQzoneKey);
        }
    };
    this.runPlayer = function(ul) {
        if (!this.mIsInit) {
            return;
        }
        if (this.isPause()) {
            this.startPlayer();
        } else if (this.mPlayingPos < 0 && this.mPlayList.getCount() > 0) {
            this.mPlayingPos = 0;
            var obj = this.mPlayList.getObject(0);
            this.setPlayURL(obj.mId, obj.mPlayURL, obj.mTorrentURL, obj.mDuration, obj.mSongName, obj.mSingerName, obj.mQzoneKey);
        } else {
            this.startPlayer();
        }
        var strPatch = /qqmusic.qq.com/i;
        var tpos = this.mPlayingPos + 1;
        if (tpos > 0 && tpos < this.mPlayList.getCount()) {
            if (this.mPlayList.getObject(tpos).mPlayURL.search(strPatch)) { (this.mPlayerName).SetPrepareSong(this.mPlayList.getObject(tpos).mPlayURL, this.mPlayList.getObject(tpos).mTorrentURL);
            }
        }
        return;
    };
    this.startPlayer = function() {
        if (!this.mIsInit) {
            return false;
        }
        try { (this.mPlayerName).Play();
            return true;
        } catch(e) {
            if (debugMode) {
                status = ("e 11 " + e.message);
            }
        }
        return false;
    };
    this.stopPlayer = function() {
        if (!this.mIsInit) {
            return false;
        }
        if ((!this.isPlaying()) && (!this.isPause())) {
            return false;
        }
        try { (this.mPlayerName).Stop();
            return true;
        } catch(e) {
            if (debugMode) {
                status = ("e 12 " + e.message);
            }
        }
        return false;
    };
    this.pausePlayer = function() {
        if (!this.mIsInit) {
            return false;
        }
        if (!this.isPlaying()) {
            return false;
        }
        try { (this.mPlayerName).Pause();
        } catch(e) {
            if (debugMode) {
                status = ("e 13 " + e.message);
            }
        }
    };
    this.setMute = function(isMute) {
        if (!this.mIsInit) {
            return false;
        }
        var bSet = 0;
        if (arguments.length > 0) {
            bSet = isMute ? 1 : 0;
        } else {
            bSet = ((this.mPlayerName).Mute == 1 ? 0 : 1);
        } (this.mPlayerName).Mute = bSet;
        return bSet;
    };
    this.getMute = function() {
        if (!this.mIsInit) {
            return false;
        }
        var bSet = ((this.mPlayerName).Mute == 1 ? true: false);
        return bSet;
    };
    this.setVolumn = function(vol) {
        if (!this.mIsInit) {
            return false;
        }
        if ((this.mPlayerName).Mute == 1) {
            return false;
        }
        if (vol > 100) {
            vol = 100;
        }
        if (vol < 0) {
            vol = 0;
        }
        if (vol >= 0 && vol <= 100) { (this.mPlayerName).Volume = vol;
        }
        return true;
    };
    this.quickPlayer = function(pos) {
        if (!this.mIsInit) {
            return false;
        }
        if (!this.isPlaying()) {
            return false;
        }
        var curr = (this.mPlayerName).CurPos;
        curr = curr + pos;
        if (curr <= 0) {
            return false;
        } (this.mPlayerName).CurPos = curr;
        return true;
    };
    this.lastPlayer = function() {
        if (this.mPlayList.getCount() == 0) {
            return - 1;
        }
        this.mPlayingPos = this.mPlayingPos - 1;
        if ((this.mPlayingPos < 0) || (this.mPlayingPos >= this.mPlayList.getCount())) {
            this.mPlayingPos = 0;
        }
        var obj = this.mPlayList.getObject(this.mPlayingPos);
        this.setPlayURL(obj.mId, obj.mPlayURL, obj.mTorrentURL, obj.mDuration, obj.mSongName, obj.mSingerName, obj.mQzoneKey);
        return this.mPlayingPos;
    };
    this.nextPlayer = function() {
        if (this.mPlayList.getCount() == 0) {
            return - 1;
        }
        this.mPlayingPos = this.mPlayingPos + 1;
        if ((this.mPlayingPos >= this.mPlayList.getCount()) || (this.mPlayingPos < 0)) {
            this.mPlayingPos = 0;
        }
        var obj = this.mPlayList.getObject(this.mPlayingPos);
        this.setPlayURL(obj.mId, obj.mPlayURL, obj.mTorrentURL, obj.mDuration, obj.mSongName, obj.mSingerName, obj.mQzoneKey);
        var strPatch = /qqmusic.qq.com/i;
        var tpos = this.mPlayingPos + 1;
        if (tpos > 0 && tpos < this.mPlayList.getCount()) {
            if (this.mPlayList.getObject(tpos).mPlayURL.search(strPatch)) { (this.mPlayerName).SetPrepareSong(this.mPlayList.getObject(tpos).mPlayURL, this.mPlayList.getObject(tpos).mTorrentURL);
            }
        }
        return this.mPlayingPos;
    };
    this.setUserIdent = function(iUin, sKey, iFromTag) {
        this.mUinCookie = iUin;
        this.mKeyCookie = sKey;
        this.mFromTag = iFromTag + "";
    };
    this.autoRandomPlay = function(name, ba, br) {
        if (this.mPlayList.getCount() == 0) {} else if (ba) {
            if (br) {
                try {
                    if (this.mPlayerState == S_PLAYEND || this.mPlayingPos < 0) {
                        var mCurrentPos = this.mPlayingPos;
                        do {
                            this.mPlayingPos = Math.floor(Math.random() * this.mPlayList.getCount());
                        } while ( mCurrentPos == this . mPlayingPos && this . mPlayList . getCount () > 1);
                        var obj = this.mPlayList.getObject(this.mPlayingPos);
                        this.setPlayURL(obj.mId, obj.mPlayURL, obj.mTorrentURL, obj.mDuration, obj.mSongName, obj.mSingerName, obj.mQzoneKey);
                    }
                } catch(e) {
                    if (debugMode) {
                        status = ("e 14 " + e.message);
                    }
                }
            } else {
                try {
                    if (this.mPlayerState == S_PLAYEND) {
                        this.BnextPlayer();
                    }
                    if (this.mPlayingPos < 0) {
                        this.BrunPlayer();
                    }
                } catch(e) {
                    if (debugMode) {
                        status = ("e 15 " + e.message);
                    }
                }
            }
        }
        return;
    };
    this.printPlayList = function() {
        var list = "";
        for (var i = this.mPlayList.getCount(); i > 0; i--) {
            list = list + "第[" + i + "]" + "播放记录:" + this.mPlayList.getObject(i - 1).mPlayURL + "\n";
        }
        return list;
    };
}
function BOnInitialized(bSucc) {
    if (bSucc) {
        if (debugMode) {
            status += "QzonePlayer initialize succ";
        }
    }
}
function BOnUnitialized() {}
function BOnStateChanged(lNewState) {
    if (debugMode) {
        status = 'BOnStateChanged:' + lNewState;
    }
    if ( !! BQQPlayer) {
        switch (lNewState) {
        case 0:
            BQQPlayer.mPlayerState = S_UNDEFINE;
            break;
        case 1:
            BQQPlayer.mPlayerState = S_STOP;
            break;
        case 2:
            BQQPlayer.mPlayerState = S_PAUSE;
            break;
        case 3:
            BQQPlayer.mPlayerState = S_PLAYING;
            if (window.idCheckBuff) {
                clearTimeout(window.idCheckBuff);
            }
            break;
        case 4:
            BQQPlayer.mPlayerState = S_BUFFERING;
            if (window.idCheckBuff) {
                clearTimeout(window.idCheckBuff);
            }
            window.idCheckBuff = setTimeout("checkBuffering()", 15000);
            break;
        case 5:
            BQQPlayer.mPlayerState = S_PLAYBEGIN;
            if (window.idCheckBuff) {
                clearTimeout(window.idCheckBuff);
            }
            break;
        case 6:
            BQQPlayer.mPlayerState = S_PLAYEND;
            if (window.idCheckBuff) {
                clearTimeout(window.idCheckBuff);
            }
            autoChangeMusic();
            break;
        default:
            break;
        }
        if (debugMode) {
            status = 'playState:' + lNewState;
        }
    }
}
function checkBuffering() {
    if ( !! BQQPlayer) {
        if (BQQPlayer.mPlayerState == S_STOP || BQQPlayer.mPlayerState == S_BUFFERING) {
            autoChangeMusic();
        }
    }
}
function wmpPlayStateChange(lNewState) {
    if (debugMode) {
        status = 'wmpPlayStateChange:' + lNewState;
    }
    if ( !! BediaPlayer) {
        BediaPlayer.mPlayerState = lNewState;
        switch (lNewState) {
        case 0:
            break;
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
            break;
        case 6:
            break;
        case 7:
            break;
        case 8:
            autoChangeMusic();
            break;
        default:
            break;
        }
        if (debugMode) {
            status = 'playState:' + lNewState;
        }
    }
}
function wmpPositionChange(oldPosition, newPosition) {}
var g_songPlayLen = 0;
function BOnPlayProgress(lCurPos, lTotal) {
    var flashId = 'musicFlash' + ( !! curFlashIndex ? curFlashIndex: 0);
    if ($(flashId)) {
        var pPos = (lCurPos / lTotal).toFixed(2) * 100;
        $(flashId).setSwfPlayProgress(pPos);
        $(flashId).setSwfPlayTime(lCurPos, lTotal);
        g_songPlayLen = lTotal;
    }
}
function BOnPlayError(lErrCode, sErrDesc) {
    if (debugMode) {
        status = "playError,ErrCode:" + lErrCode + ",ErrDesc:" + sErrDesc;
    }
}
function BOnDownloadProgress(lErrCode, lProgress) {
    var flashId = 'musicFlash' + ( !! curFlashIndex ? curFlashIndex: 0);
    if ($(flashId)) {
        $(flashId).setSwfDownloadProgress(lProgress);
    }
}
function OnPlayerPropChanged(bMute, lVolume) {}
function BOnPlaySrcChanged(sNewPlaySrc, sOldPlaySrc) {
    if (debugMode) {
        status = "PlaySrcChanged,NewPlaySrc:" + sNewPlaySrc + ",OldPlaySrc:" + sOldPlaySrc;
    }
    if ( !! BQQPlayer) {
        BQQPlayer.mCurPlaySrc = sNewPlaySrc;
    }
    if ( !! window.oControl && ( !! BQQPlayer && BQQPlayer.mCurPlaySrc != BQQPlayer.getPlayerSource())) {
        try {
            oControl.className = "play";
            oControl.title = "播放歌曲";
        } catch(e) {}
    }
}
function insertBediaPlayer(args, mp9Upon) {
    params = {};
    objAttrs = {};
    for (var k in args) {
        switch (k) {
        case "classid":
            continue;
            break;
        case "style":
        case "name":
        case "height":
        case "width":
        case "id":
            objAttrs[k] = args[k];
            break;
        default:
            params[k] = args[k];
        }
    }
    objAttrs["classid"] = "CLSID:6BF52A52-394A-11D3-B153-00C04F79FAA6";
    if (mp9Upon == "auto") {
        mp9Upon = false;
        if (window.ActiveXObject) {
            var clsId = "{22D6F312-B0F6-11D0-94AB-0080C74C7E95}";
            with(document.body) {
                addBehavior('#default#clientcaps');
                if (isComponentInstalled(clsId, "componentid")) {
                    mp9Upon = (getComponentVersion(clsId, "componentid").split(",")[0] > 6.4) ? true: false;
                }
            }
        }
    }
    if (mp9Upon) {
        objAttrs["classid"] = "clsid:6BF52A52-394A-11D3-B153-00C04F79FAA6";
    } else {
        objAttrs["classid"] = "clsid:22D6F312-B0F6-11D0-94AB-0080C74C7E95";
    }
    var str = new StrBuf();
    str.a('<object ');
    for (var i in objAttrs) {
        str.a(i);
        str.a('="');
        str.a(objAttrs[i]);
        str.a('" ');
    }
    str.a('>');
    for (var i in params) {
        str.a('<param name="');
        str.a(i);
        str.a('" value="');
        str.a(params[i]);
        str.a('" /> ');
    }
    str.a('</object>');
    g_wmplayerDiv = getElementInBody("wm_control", "div");
    g_wmplayerDiv.innerHTML = str.toS();
    str.d();
    return g_wmplayerDiv.firstChild;
}
function createBediaPlayer() {
    return insertBediaPlayer({
        id: 'wmplayer',
        height: 0,
        width: 0,
        autoStart: 'ture',
        invokeURLs: 'false',
        uiMode: 'invisible',
        enablePositionControls: 'true',
        canScan: 'true',
        canSeek: 'true'
    },
    true);
}
function WMPlayer() {
    this.mPlayerName = "";
    this.mInit = false;
    this.mMute = false;
    this.mPlayList = new PlayerListManager();
    this.mRandomPlay = false;
    this.mPlayerState = S_UNDEFINE;
    this.mPlayingPos = -1;
    this.mVisible = true;
    this.mInstall = true;
    this.mDLLink = "";
    this.mUinCookie = 0;
    this.mKeyCookie = "";
    this.mUinCookieName = "";
    this.mKeyCookieName = "";
    this.mFromTag = 16;
    this.setUserIdent = function(iUin, sKey, iFromTag) {
        this.mUinCookie = iUin;
        this.mKeyCookie = sKey;
        this.mFromTag = iFromTag + "";
    };
    this.checkPlayer = function(dl) {
        var obj = (this.mPlayerName);
        if (!obj || !obj.Controls) {
            return false;
        }
        return true;
    };
    this.createActiveX = function(bv, bi, name, w, h, uincn, keycn, dl) {
        this.mPlayerName = createBediaPlayer();
        this.mVisible = bv;
        this.mInstall = bi;
        this.mUinCookieName = uincn;
        this.mKeyCookieName = keycn;
        this.mDLLink = dl;
        return "";
    };
    this.initialize = function() {
        if (!this.checkPlayer()) {
            if (this.mInstall) {
                alert("对不起，您现在的媒体播放器版本太低，请升级媒体播放器。");
                window.location = this.mDLLink;
            }
            return false;
        }
        this.mPlayerName.attachEvent("PlayStateChange", wmpPlayStateChange);
        this.mPlayerName.attachEvent("PositionChange", wmpPositionChange);
        setCookie(MUSIC_UIN_COOKIE_NAME, getCookie(this.mUinCookieName));
        setCookie(MUSIC_KEY_COOKIE_NAME, getCookie(this.mKeyCookieName));
        setCookie("qqmusic_fromtag", this.mFromTag);
        this.mPlayerName.invokeURLs = false;
        try {
            this.mPlayerName.settings.volume = 100;
        } catch(e) {};
        this.mInit = true;
        return true;
    };
    this.unInitialize = function() {
        try {
            this.mPlayerName.detachEvent("PlayStateChange", wmpPlayStateChange);
            this.mPlayerName.detachEvent("PositionChange", wmpPositionChange);
            this.mIsInit = false;
            return true;
        } catch(e) {
            if (debugMode) {
                status = ("e 9 " + e.message);
            }
            return false;
        }
    };
    this.isInitialize = function() {
        return this.mInit;
    };
    this.getStatus = function() {
        if (!this.mInit) {
            return - 1;
        }
        return (this.mPlayerName).playState;
    };
    this.getCurrentMusic = function() {
        if (this.mPlayingPos < 0) {
            return null;
        }
        return this.mPlayList.getObject(this.mPlayingPos);
    };
    this.runPlayerPos = function(pos) {
        if (this.isPause()) {
            this.startPlayer();
        } else if (pos >= 0 && pos < this.mPlayList.getCount()) {
            this.BrunPlayer(this.mPlayList.getObject(pos).mPlayURL);
        }
    };
    this.runPlayer = function(ul) {
        if (!this.mInit) {
            return;
        }
        var uin = getCookie(PANEL_UIN_COOKIE_NAME);
        var key = getCookie(PANEL_KEY_COOKIE_NAME);
        if (uin == "") {
            uin = getCookie("uin").replace(/[^\d]/g, "");
        };
        if (key == "") {
            key = getCookie("skey");
        };
        this.setUserIdent(uin != "" ? uin: '12345678', key != "" ? key: '12345678', this.mFromTag);
        setCookie(MUSIC_UIN_COOKIE_NAME, this.mUinCookie);
        setCookie(MUSIC_KEY_COOKIE_NAME, this.mKeyCookie);
        setCookie("qqmusic_fromtag", this.mFromTag);
        var oplay = (this.mPlayerName);
        if (this.isPause()) {
            this.startPlayer();
        } else if ((ul != null) && (ul != "")) {
            oplay.URL = ul;
            this.mPlayList.addObject( - 1, ul, "", 0, "", "");
            this.mPlayingPos = this.mPlayList.getPos(ul);
            this.startPlayer();
        }
        if ((this.mPlayingPos < 0) && (this.mPlayList.getCount() > 0)) {
            this.mPlayingPos = 0;
            oplay.URL = this.mPlayList.getObject(0).mPlayURL;
            this.startPlayer();
        } else {
            this.startPlayer();
        }
        try {
            m_rpt_box(0, ul, 0);
        } catch(e) {}
    };
    this.startPlayer = function() {
        var oplay = (this.mPlayerName);
        try {
            if (oplay.Controls.isAvailable('play')) {
                oplay.Controls.Play();
            }
        } catch(e) {
            if (debugMode) {
                status = ("e 2 " + e.message);
            }
        }
        return false;
    };
    this.stopPlayer = function() {
        if (!this.mInit) {
            return false;
        }
        if ((!this.isPlaying()) && (!this.isPause())) {
            return false;
        }
        try {
            var oplay = (this.mPlayerName);
            if (oplay.Controls.isAvailable('stop')) {
                oplay.Controls.Stop();
            }
        } catch(e) {
            if (debugMode) {
                status = ("e 3 " + e.message);
            }
        }
        return true;
    };
    this.pausePlayer = function() {
        if (!this.mInit) {
            return false;
        }
        if (!this.isPlaying()) {
            return false;
        }
        try {
            var oplay = (this.mPlayerName);
            if (oplay.Controls.isAvailable('pause')) {
                oplay.Controls.Pause();
            }
        } catch(e) {
            if (debugMode) {
                status = ("e 4 " + e.message);
            }
        }
        return true;
    };
    this.isPlaying = function() {
        if (!this.mInit) {
            return false;
        }
        var _s = this.getStatus();
        return ((_s == S_PLAYING) || (_s == S_BUFFERING_WMP));
    };
    this.isPause = function() {
        if (!this.mInit) {
            return false;
        }
        var _s = this.getStatus();
        return (_s == S_PAUSE);
    };
    this.isStop = function() {
        if (!this.mInit) {
            return false;
        }
        var _s = this.getStatus();
        return ((_s == S_STOP) || (_s == S_MEDIAEND) || (_s == S_UNDEFINE) || (_s == S_READY));
    };
    this.setMute = function() {
        if (!this.mInit) {
            return false;
        }
        var oplay = (this.mPlayerName);
        if (oplay.settings.mute) {
            oplay.settings.mute = false;
        } else {
            oplay.settings.mute = true;
        }
        return true;
    };
    this.setMute = function(isMute) {
        if (!this.mInit) {
            return false;
        }
        var bSet = false;
        var oplay = (this.mPlayerName);
        if (arguments.length > 0) {
            bSet = isMute ? true: false;
        } else {
            bSet = (oplay.settings.mute == true ? false: true);
        }
        oplay.settings.mute = bSet;
        return bSet;
    };
    this.getMute = function() {
        if (!this.mInit) {
            return false;
        }
        var bSet = oplay.settings.mute;
        return bSet;
    };
    this.setVolumn = function(vol) {
        if (!this.mInit) {
            return false;
        }
        var oplay = (this.mPlayerName);
        if (oplay.settings.mute) {
            return false;
        }
        if (vol > 100) {
            vol = 100;
        }
        if (vol < 0) {
            vol = 0;
        }
        if (vol >= 0 && vol <= 100) {
            oplay.settings.volume = vol;
        }
        return true;
    };
    this.quickPlayer = function(pos) {
        if (!this.mInit) {
            return false;
        }
        if (!this.isPlaying()) {
            return false;
        }
        var oplay = (this.mPlayerName);
        if ((oplay.Controls.currentPosition + pos) >= oplay.currentMedia.duration) {
            return false;
        }
        if ((oplay.Controls.currentPosition + pos) <= 0) {
            return false;
        }
        oplay.Controls.currentPosition += pos;
        return true;
    };
    this.lastPlayer = function() {
        if (this.mPlayList.getCount() == 0) {
            return;
        }
        this.mPlayingPos = this.mPlayingPos - 1;
        if ((this.mPlayingPos < 0) || (this.mPlayingPos >= this.mPlayList.getCount())) {
            this.mPlayingPos = this.mPlayList.getCount() - 1;
        }
        this.BrunPlayer(this.mPlayList.getObject(this.mPlayingPos).mPlayURL);
        return this.mPlayingPos;
    };
    this.nextPlayer = function() {
        if (this.mPlayList.getCount() == 0) {
            return - 1;
        }
        this.mPlayingPos = this.mPlayingPos + 1;
        if ((this.mPlayingPos >= this.mPlayList.getCount()) || (this.mPlayingPos < 0)) {
            this.mPlayingPos = 0;
        }
        this.BrunPlayer(this.mPlayList.getObject(this.mPlayingPos).mPlayURL);
        return this.mPlayingPos;
    };
    this.setBalance = function() {
        var oplay = (this.mPlayerName);
        oplay.settings.balance = oplay.settings.balance == '100' ? '-100': '100';
        return (oplay.settings.balance == '100' ? '右声道': '左声道');
    };
    this.getErrorMsg = function() {
        var errorDesc = (this.mPlayerName).error.item(0).errorDescription;
        return errorDesc;
    };
    this.autoRandomPlay = function(name, ba, br) {
        var mCurrentPos;
        if (!this.isInitialize()) {
            return;
        }
        if (this.mPlayList.getCount() == 0) {} else if (ba) {
            if (br) {
                try {
                    if (this.isStop() || this.mPlayingPos < 0) {
                        mCurrentPos = this.mPlayingPos;
                        do {
                            this.mPlayingPos = Math.floor(Math.random() * this.mPlayList.getCount());
                        } while ( mCurrentPos == this . mPlayingPos && this . mPlayList . getCount () > 1);
                        this.BrunPlayer(this.mPlayList.getObject(this.mPlayingPos).mPlayURL);
                    }
                } catch(e) {
                    if (debugMode) {
                        status = ("e 5 " + e.message);
                    }
                }
            } else {
                try {
                    if (this.isStop()) {
                        this.BnextPlayer();
                    }
                    if (this.mPlayingPos < 0) {
                        this.BrunPlayer();
                    }
                } catch(e) {
                    if (debugMode) {
                        status = ("e 6 " + e.message);
                    }
                }
            }
        }
        return;
    };
    this.printPlayList = function() {
        var list = "";
        for (var i = this.mPlayList.getCount(); i > 0; i--) {
            list = list + "第[" + i + "]" + "播放记录:" + this.mPlayList.getObject(i - 1).mPlayURL + "\n";
        }
        return list;
    };
}
String.prototype.entityReplace = function() {
    return this.replace(/&#38;?/g, "&amp;").replace(/&amp;/g, "&").replace(/&#(\d+);?/g,
    function(a, b) {
        return String.fromCharCode(b)
    }).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, "\"").replace(/&nbsp;/g, " ").replace(/&#13;/g, "\n").replace(/(&#10;)|(&#x\w*;)/g, "").replace(/&amp;/g, "&");
}
String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/, "");
}
function addPlayList() {}
function BrunPlayer(pos) {
    if (pos == null) {
        pos = -1;
    }
    if ((!BQQPlayer) && (!BediaPlayer)) {
        return;
    }
    var bBRandomPlay = false;
    if (bUseBQQPlayer) {
        if (pos == -1) {
            var cPos = BQQPlayer.mPlayingPos;
            if (cPos > -1) {
                BQQPlayer.runPlayerPos(cPos);
            } else {
                BQQPlayer.runPlayer('');
            }
        } else {
            BQQPlayer.runPlayerPos(pos);
        }
    } else {
        if (pos == -1) {
            BediaPlayer.runPlayer('');
        } else {
            BediaPlayer.runPlayerPos(pos);
        }
    }
}
function BpausePlayer() {
    if (bUseBQQPlayer && BQQPlayer) {
        BQQPlayer.pausePlayer();
    } else if (BediaPlayer) {
        BediaPlayer.pausePlayer();
    }
}
function BstopPlayer() {
    if (bUseBQQPlayer && BQQPlayer) {
        BQQPlayer.stopPlayer();
    } else if (BediaPlayer) {
        BediaPlayer.stopPlayer();
    }
}
function BlastPlayer() {
    if (bUseBQQPlayer && BQQPlayer) {
        BQQPlayer.lastPlayer();
    } else if (BediaPlayer) {
        BediaPlayer.lastPlayer();
    }
}
function BnextPlayer() {
    if (bUseBQQPlayer && BQQPlayer) {
        BQQPlayer.nextPlayer();
    } else if (BediaPlayer) {
        BediaPlayer.nextPlayer();
    }
}
function BsendName() {}
function BmutePlayer(isMute) {
    if (bUseBQQPlayer && BQQPlayer) {
        BQQPlayer.setMute(isMute);
    } else if (BediaPlayer) {
        BediaPlayer.setMute(isMute);
    }
}
function getMute() {
    if (bUseBQQPlayer && BQQPlayer) {
        return BQQPlayer.getMute();
    } else if (BediaPlayer) {
        return BediaPlayer.getMute();
    }
}
function Qmute(isMute) {
    BmutePlayer(isMute);
}
function setVolumn(type) {
    if (bUseBQQPlayer && BQQPlayer) {
        BQQPlayer.setVolumn(type);
    } else if (BediaPlayer) {
        BediaPlayer.setVolumn(type);
    }
}
function BQplay(pos) {
    if (bqqplayer_play_flag != null) {
        bqqplayer_play_flag = true;
    }
    BrunPlayer(pos);
}
function BQstop() {
    if (bUseBQQPlayer && BQQPlayer) {
        if (BQQPlayer.getPlayerSource() == BQQPlayer.getCurrentPlayerSource()) {
            if (bqqplayer_play_flag != null) {
                bqqplayer_play_flag = false;
            }
            if (window.idBAutoPlay) {
                clearTimeout(window.idBAutoPlay);
            }
            BstopPlayer();
        }
    } else {
        if (bqqplayer_play_flag != null) {
            bqqplayer_play_flag = false;
        }
        if (window.idBAutoPlay) {
            clearTimeout(window.idBAutoPlay);
        }
        BstopPlayer();
    }
}
function BQpause() {
    if (bUseBQQPlayer && BQQPlayer) {
        if (BQQPlayer.getPlayerSource() == BQQPlayer.getCurrentPlayerSource()) {
            if (window.idBAutoPlay) {
                clearTimeout(window.idBAutoPlay);
            }
            BpausePlayer();
        }
    } else {
        if (window.idBAutoPlay) {
            clearTimeout(window.idBAutoPlay);
        }
        BpausePlayer();
    }
}
function BQnext() {
    BnextPlayer();
}
function BQprevious() {
    BlastPlayer();
}
function getExactQusicID(sPlayUrl) {
    var st = sPlayUrl.entityReplace();
    var sl = st.split("/");
    var sm = sl[sl.length - 1];
    var si = sm.split(".");
    return si[0];
}
function getLocalReportID(sPlayUrl) {
    var st = sPlayUrl.entityReplace();
    var sl = st.split("/");
    var sm = sl[4];
    return sm;
}
function getLocalUrl(sUrl, songId, uin) {
    return sUrl;
}
function getQusicURL(sPlayUrl) {
    var st = sPlayUrl.entityReplace();
    var sl = st.split("/");
    var sm = sl[sl.length - 1];
    var si = sm.split(".");
    var sf = si[0];
    var pos = sPlayUrl.indexOf("qqmusic.qq.com");
    if (pos != -1) {
        var qusidt = Number(sf);
        if (qusidt > 0 && qusidt < 10000000) {
            qusidt += 10000000;
        }
        sPlayUrl = sPlayUrl.substring(0, pos + 14);
        sPlayUrl += "/" + qusidt + ".wma";
    }
    st = sPlayUrl.entityReplace();
    sl = st.split("/");
    sm = sl[sl.length - 1];
    si = sm.split(".");
    sf = si[0];
    var regstr = new RegExp("^10", "gi");
    si[0] = si[0].replace(regstr, "12");
    regstr = new RegExp(sf, "gi");
    st = st.replace(regstr, si[0]);
    return st;
}
function BclearPlayList() {
    if (bUseBQQPlayer) {
        BQQPlayer.mPlayList.clearObject();
    } else {
        BediaPlayer.mPlayList.clearObject();
    }
}
function URLencode(ss) {
    if (ss == "http://" || (ss.substring(0, 7) != "http://" && ss.substring(0, 6) != "mms://")) {
        return "";
    }
    return ss.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\'/g, "&apos;").replace(/\"/g, "&quot;").replace(/&/g, "%26").replace(/\r/g, "%0A").replace(/\n/g, "%0D").replace(/,/g, "%27");
}
function BplayOneSong(name, urlin, qusid) {
    try {
        var url = urlin.trim().entityReplace().replace(/\[/g, "").replace(/\]/g, "");
        var regstr = new RegExp("&apos;", "g");
        url = URLencode(url);
        name = name.replace(regstr, "\'");
        if (url.indexOf("music.qq.com") < 0) {
            qusid = 0;
        }
        if (bUseBQQPlayer) {
            BQQPlayer.mPlayList.clearObject();
            var sTorrentURL = "";
            var strPath = /qqmusic.qq.com/i;
            if (url.search(strPath)) {
                if (parseInt(qusid) > 0) {
                    url = getQusicURL(url);
                    sTorrentURL = "http://tpt.music.qq.com/" + getExactQusicID(url) + ".tpt";
                } else {
                    sTorrentURL = "";
                }
            }
            BQQPlayer.setPlayURL(qusid, url, sTorrentURL, 0, "", "", "");
        } else {
            BediaPlayer.mPlayList.clearObject();
            if (parseInt(qusid) > 0) {
                url = getQusicURL(url);
            }
            BediaPlayer.runPlayer(url);
            if (window.idCheckPlayerTimer) {
                window.clearTimeout(idCheckPlayerTimer);
            }
            window.idCheckPlayerTimer = checkPlayer();
        }
    } catch(e) {
        if (debugMode) {
            status = ("e 20 " + e.message);
        }
    }
}
function BplaySong(name, url, qusid) {
    initMusic(function() {
        BplayOneSong(name, url, qusid);
    });
}
var bUseNewPlayer = false;
var gQzoneMusicVer = "0";
function initMusic(cb) {
    if (!window.musicPlayerReady) {
        try {
            if (Browser.isIE) {
                var oPlayerCtrl = new ActiveXObject("QzonePlayer.PlayerCtrl");
                gQzoneMusicVer = oPlayerCtrl.GetPlayerSvrVersion();
                if (gQzoneMusicVer < "3.1") {
                    throw "QzonePlayer.PlayerCtrl version < 3.1";
                }
                if (gQzoneMusicVer >= "3.2") {
                    P2P_UDP_SVR_IP = "pdlmusic.p2p.qq.com";
                    P2P_TCP_SVR_IP = "pdlmusic.p2p.qq.com";
                }
                oPlayerCtrl.Uninitialize();
                bUseBQQPlayer = true;
                bUseNewPlayer = true;
            }
            try {
                BQQPlayer = new BlogQQPlayer();
                BQQPlayer.createActiveX(true, false, false, "qqplayer", "0", "0", PANEL_UIN_COOKIE_NAME, PANEL_KEY_COOKIE_NAME, "http://www.qq.com");
                if (BQQPlayer.initialize()) {
                    window.musicPlayerReady = true;
                    if (cb) {
                        cb();
                    }
                }
            } catch(e) {};
            return;
        } catch(e) {
            bUseBQQPlayer = false;
            bUseNewPlayer = false;
            if (debugMode) {
                status = "use media player";
            }
            BediaPlayer = new WMPlayer();
            BediaPlayer.createActiveX(true, false, "wmplayer", "0", "0", PANEL_UIN_COOKIE_NAME, PANEL_KEY_COOKIE_NAME, "http://www.qq.com");
            BediaPlayer.initialize();
        }
        window.musicPlayerReady = true;
        if (cb) {
            cb();
        };
    } else {
        if (cb) {
            cb();
        };
    }
}
function BplaySong_local(name, url, qusid) {
    var iReportID = getLocalReportID(url);
    BplaySong(name, getLocalUrl(url, qusid, top.g_iUin), iReportID);
}
String.prototype.myEncode = function() {
    return this.replace(/\'/g, "‘").replace(/\"/g, "“").replace(/&#39;/g, "‘").replace(/&quot;/g, "“");
}
var g_songList = [];
var g_flashNum = 0;
var curFlashIndex = 0;
var curSongIndex = 0;
var g_autoPlay = 0;
function initMusicData() {
    if (arguments.length < 1) {
        return;
    }
    top.isMusicBlog = 1;
    var sT = "";
    for (var i = 0,
    len = arguments.length; i < len; i++) {
        sT = arguments[i];
        sT = sT.replace(/\[music\]/g, "").replace(/\[\/music\]/g, "").split("|");
        var songList = [];
        var modLength = (sT.length % 6);
        var realLength = sT.length;
        if (realLength < 6 || modLength > 1) {
            continue;
        }
        for (var j = 0,
        l = (modLength == 0 ? realLength: realLength - 1); j < l; j += 6) {
            var songInfo = {
                id: sT[j],
                type: sT[j + 1],
                url: sT[j + 2],
                songName: sT[j + 3].entityReplace().myEncode(),
                singerId: sT[j + 4],
                singerName: sT[j + 5].entityReplace().myEncode(),
                singerUrl: "http://imgcache.qq.com/music/photo/singer/" + sT[j + 4] % 100 + "/singerpic_" + sT[j + 4] + "_0.jpg",
                songLink: "http://shop.qqmusic.qq.com/static/singer/" + sT[j + 4] % 100 + "/singer_" + sT[j + 4] + ".htm",
                singerLink: "http://shop.qqmusic.qq.com/static/singer/" + sT[j + 4] % 100 + "/singer_" + sT[j + 4] + ".htm"
            }
            songList.push(songInfo);
        }
        if (modLength == 1) {
            g_autoPlay = (sT[realLength - 1] == 1 ? 1 : g_autoPlay);
        }
        g_songList.push(songList);
    }
    g_flashNum = g_songList.length;
    g_isInitMusic = true;
    initSwfData();
}
var bNotPlay = true;
function initSwfData() {
    if (!g_isInitSwf && g_isInitMusic) {
        if (g_flashNum > 0 && g_flashNum == g_insertSwfNum) {
            for (var i = 0; i < g_flashNum; i++) {
                var oFlash = $('musicFlash' + i);
                if (oFlash) {
                    oFlash.width = "390";
                    oFlash.height = "202";
                    oFlash.setSwfSongList(g_songList[i]);
                    oFlash.setSwfVolume(100);
                }
            }
            curFlashIndex = 0;
            curSongIndex = 0;
            bNotPlay = true;
            if (g_autoPlay == 1) {
                if (top.window.musicJSReady && top.isPlaying()) {
                    top.Qpause();
                    top.window.pausemusic = 0;
                }
                changeMusic("musicFlash0", 0);
            }
            g_isInitSwf = true;
            if (window.idCheckInitSwf) {
                window.clearTimeout(window.idCheckInitSwf);
            }
        } else {
            window.idCheckInitSwf = window.setTimeout("initSwfData()", 1000);
        }
    } else {
        window.idCheckInitSwf = window.setTimeout("initSwfData()", 1000);
    }
}
function MyOpenwin(ul) {
    win = window.open(ul);
    if (win == null) {
        alert("弹出窗口被拦截,请取消拦截");
        return null;
    } else {
        win.focus();
    }
    return win;
}
function openSongLink(songLink) {
    var l = songLink.split("/")[6];
    var m = l.split(".")[0];
    var id = m.split("_")[1];
    var uin = top.g_iUin;
    if (top.g_iLoginUin > 10000) {
        uin = top.g_iLoginUin;
    }
    var url = 'http://qzone-music.qq.com/client/v5/j.htm?l=http://' + uin + '%d.qzone.qq.com/?url=music_singer?id=' + id;
    MyOpenwin(url);
    send_stat_request('http://qzone-music.qq.com/fcg-bin/fcg_musicblog_statis.fcg?new=1&type=14&value=1&uin=' + uin);
}
function openSingerLink(singerLink) {
    var l = singerLink.split("/")[6];
    var m = l.split(".")[0];
    var id = m.split("_")[1];
    var uin = top.g_iUin;
    if (top.g_iLoginUin > 10000) {
        uin = top.g_iLoginUin;
    }
    var url = 'http://qzone-music.qq.com/client/v5/j.htm?l=http://' + uin + '%d.qzone.qq.com/?url=music_singer?id=' + id;
    MyOpenwin(url);
    send_stat_request('http://qzone-music.qq.com/fcg-bin/fcg_musicblog_statis.fcg?new=1&type=14&value=1&uin=' + uin);
}
function clearArray(array) {
    if (!array) {
        return;
    }
    for (var i = 0,
    len = array.length; i < len; i++) {
        array.pop();
    }
}
function clearMusicData() {
    top.isMusicBlog = 0;
    if (top.window.location.href.indexOf('tencent://QQMusic/') < 0) {
        BQpause();
        clearArray(g_songList);
        g_insertSwfNum = 0;
        g_flashNum = 0;
        curFlashIndex = 0;
        curSongIndex = 0;
        g_isInitMusic = false;
        g_isInitSwf = false;
        var currentWin = null; {
            if ( !! BQQPlayer) {
                BQQPlayer.unInitialize();
                BQQPlayer = null;
                bUseBQQPlayer = false;
                bUseNewPlayer = false;
            }
            if ( !! BediaPlayer) {
                BediaPlayer.unInitialize();
                BediaPlayer = null;
            }
            window.musicPlayerReady = false;
        }
        if (window.idCheckInitSwf) {
            window.clearTimeout(window.idCheckInitSwf);
        }
        if (top.window.musicJSReady) {
            if ((top.getCookie('pausemusic') && top.getCookie('pausemusic') == '1') || (top.window.pausemusic && top.window.pausemusic == 1)) {} else {
                top.Qplay(top.getPlayingPos());
            }
        }
    }
}
function changeMusic(flashId, songIndex) {
    if (top.window.musicJSReady && top.isPlaying()) {
        top.Qpause();
        top.window.pausemusic = 0;
    }
    if (flashId != "musicFlash" + curFlashIndex) {
        $("musicFlash" + curFlashIndex).setSwfPauseState();
        $("musicFlash" + curFlashIndex).clearHighLight();
        ResetRate();
    }
    curFlashIndex = parseInt(flashId.split('h')[1]);
    curSongIndex = songIndex;
    $(flashId).setSwfPlayState();
    $(flashId).setSwfCurSong(songIndex);
    var curSongObj = g_songList[curFlashIndex][curSongIndex];
    if (curSongObj.type == 5) {
        BplaySong_local(curSongObj.songName, curSongObj.url, curSongObj.id);
    } else {
        BplaySong(curSongObj.songName, curSongObj.url, curSongObj.id);
    }
}
function autoChangeMusic() {
    var curSongList = g_songList[curFlashIndex];
    var curListLen = curSongList.length;
    if (curSongIndex < curListLen - 1) {
        curSongIndex++;
        changeMusic("musicFlash" + curFlashIndex, curSongIndex);
    } else {
        curSongIndex = 0;
        $("musicFlash" + curFlashIndex).setSwfPauseState();
        $("musicFlash" + curFlashIndex).clearHighLight();
        if (curFlashIndex < g_flashNum - 1) {
            curFlashIndex++;
        } else {
            curFlashIndex = 0;
        }
        changeMusic("musicFlash" + curFlashIndex, curSongIndex);
    }
}
function playMusic(flashId) {
    if (bNotPlay) {
        changeMusic(flashId, 0);
        bNotPlay = false;
        return;
    }
    if (flashId != "musicFlash" + curFlashIndex) {
        $("musicFlash" + curFlashIndex).setSwfPauseState();
        $("musicFlash" + curFlashIndex).clearHighLight();
        ResetRate();
        curFlashIndex = parseInt(flashId.split('h')[1]);
        curSongIndex = 0;
        $(flashId).setSwfPlayState();
        $(flashId).setSwfCurSong(curSongIndex);
        var curSongObj = g_songList[curFlashIndex][curSongIndex];
        if (curSongObj.type == 5) {
            BplaySong_local(curSongObj.songName, curSongObj.url, curSongObj.id);
        } else {
            BplaySong(curSongObj.songName, curSongObj.url, curSongObj.id);
        }
    } else {
        BQplay();
    }
}
var IS_HUMANPAUSE = false;
function pauseMusic(flashId) {
    if (flashId != "musicFlash" + curFlashIndex) {
        $(flashId).setSwfPauseState();
    } else {
        IS_HUMANPAUSE = true;
        BQpause();
    }
}
function setMute(flashId, isMute) {
    Qmute(isMute);
    for (var i = 0; i < g_flashNum; i++) {
        if ($("musicFlash" + i)) {
            $("musicFlash" + i).setSwfMute(isMute);
        }
    }
}
function setVolume(vol) {
    Qmute(false);
    if (vol > 100) vol = 100;
    if (vol < 2) vol = 0;
    setVolumn(vol);
    for (var i = 0; i < g_flashNum; i++) {
        if ($("musicFlash" + i)) {
            $("musicFlash" + i).setSwfVolume(vol);
        }
    }
}
function setPlayProgress(flashId, progress) {
    if (flashId != "musicFlash" + curFlashIndex) {
        return;
    } else {
        if ( !! BQQPlayer) {
            BQQPlayer.mPlayerName.CurPos = ( !! g_songPlayLen) ? g_songPlayLen * progress / 100 : 0;
        } else if ( !! BediaPlayer) {
            if (BediaPlayer.mPlayerName.currentMedia) {
                var ration = BediaPlayer.mPlayerName.currentMedia.duration;
                var CurrentPos = ration * progress / 100;
                BQpause();
                BediaPlayer.mPlayerName.Controls.currentPosition = CurrentPos;
                BQplay();
            }
        }
    }
}
function PlayerPositioning() {
    try {
        var flashId = 'musicFlash' + ( !! curFlashIndex ? curFlashIndex: 0);
        if (BediaPlayer.mPlayerName.currentMedia.duration == 0) {
            if ($(flashId)) {
                $(flashId).setSwfPlayProgress(0);
                $(flashId).setSwfPlayTime(0, 0);
            }
            return;
        }
        var lCurPos = BediaPlayer.mPlayerName.Controls.currentPosition;
        var lTotal = BediaPlayer.mPlayerName.currentMedia.duration;
        if ($(flashId)) {
            var pPos = (lCurPos / lTotal).toFixed(2) * 100;
            status = "pPos:" + pPos;
            $(flashId).setSwfPlayProgress(pPos);
            $(flashId).setSwfPlayTime(lCurPos, lTotal);
        }
    } catch(e) {
        window.status = e;
    }
}
function showDndProgress() {
    try {
        bfp = BediaPlayer.mPlayerName.network.downloadProgress;
        var flashId = 'musicFlash' + ( !! curFlashIndex ? curFlashIndex: 0);
        if (bfp != 100) {
            if ($(flashId)) {
                $(flashId).setSwfDownloadProgress(bfp);
            }
        } else {
            if (BediaPlayer.mPlayerName.playState != 9) {
                if ($(flashId)) {
                    $(flashId).setSwfDownloadProgress(100);
                }
            }
        }
    } catch(e) {
        window.status = e;
    }
}
function ShowTime() {
    try {
        var result;
        var seconds;
        seconds = Math.floor(BediaPlayer.mPlayerName.Controls.currentPosition);
        var flashId = 'musicFlash' + ( !! curFlashIndex ? curFlashIndex: 0);
        if ($(flashId)) {
            $(flashId).setSwfPlayTime(seconds, BediaPlayer.mPlayerName.currentMedia ? BediaPlayer.mPlayerName.currentMedia.duration: 0);
        }
    } catch(e) {
        window.status = e;
    }
}
var idPosTimer;
var idTimeTmr;
var idCheckPlayerTimer;
var oldState;
var iCheckPlayerHandler;
function checkPlayer() {
    try {
        var iStatus = BediaPlayer.mPlayerName.playState;
        window.status = "playState:" + iStatus;
        switch (iStatus) {
        case 1:
            ResetRate();
            if (!IS_HUMANPAUSE) {
                autoChangeMusic();
                window.clearTimeout(idCheckPlayerTimer);
                idCheckPlayerTimer = window.setTimeout("checkPlayer()", 1000);
            } else {
                window.clearTimeout(idCheckPlayerTimer);
                idCheckPlayerTimer = window.setTimeout("checkPlayer()", 5000);
            }
            break;
        case 2:
            window.IS_PAUSE = true;
            window.clearTimeout(idCheckPlayerTimer);
            idCheckPlayerTimer = window.setTimeout("checkPlayer()", 1000);
            showDndProgress();
            break;
        case 3:
            var iLeftTime = BediaPlayer.mPlayerName.Controls.currentPosition;
            window.clearTimeout(idCheckPlayerTimer);
            if (iLeftTime > 0) {
                idCheckPlayerTimer = window.setTimeout("checkPlayer()", 1000);
            } else {
                autoChangeMusic();
                idCheckPlayerTimer = window.setTimeout("checkPlayer()", 1000);
            }
            PlayerPositioning();
            ShowTime();
            showDndProgress();
            break;
        case 4:
            window.clearTimeout(idCheckPlayerTimer);
            idCheckPlayerTimer = window.setTimeout("checkPlayer()", 1000);
            break;
        case 5:
            window.clearTimeout(idCheckPlayerTimer);
            idCheckPlayerTimer = window.setTimeout("checkPlayer()", 1000);
            break;
        case 6:
            window.clearTimeout(idCheckPlayerTimer);
            idCheckPlayerTimer = window.setTimeout("checkPlayer()", 1000);
            showDndProgress();
            break;
        case 7:
            window.clearTimeout(idCheckPlayerTimer);
            idCheckPlayerTimer = window.setTimeout("checkPlayer()", 1000);
            break;
        case 8:
            ResetRate();
            window.clearTimeout(idCheckPlayerTimer);
            idCheckPlayerTimer = window.setTimeout("checkPlayer()", 1000);
            autoChangeMusic();
            break;
        case 9:
            ResetRate();
            window.clearTimeout(idCheckPlayerTimer);
            idCheckPlayerTimer = window.setTimeout("checkPlayer()", 1000);
            break;
        case 10:
            window.clearTimeout(idCheckPlayerTimer);
            idCheckPlayerTimer = window.setTimeout("checkPlayer()", 1000);
            BQplay();
            break;
        case 11:
            ResetRate();
            window.clearTimeout(idCheckPlayerTimer);
            idCheckPlayerTimer = window.setTimeout("checkPlayer()", 1000);
            break;
        default:
            window.clearTimeout(idCheckPlayerTimer);
            idCheckPlayerTimer = window.setTimeout("checkPlayer()", 5000);
            break;
        }
    } catch(e) {
        window.status = "PLAYER ERROR:" + e;
    }
    return;
}
function ResetRate() {
    var flashId = 'musicFlash' + ( !! curFlashIndex ? curFlashIndex: 0);
    if ($(flashId)) {
        $(flashId).setSwfPlayProgress(0);
        $(flashId).setSwfPlayTime(0, 0);
        $(flashId).setSwfDownloadProgress(0);
    }
}
function showTips(type, msg) {
    if (top.QZoneVersion == "4.0" && top.zoneMode != "qzone") {
        type = "&nbsp;&nbsp; " + type;
        msg = "&nbsp;&nbsp; " + msg;
        top.QZONE.FrontPage.popupDialog(type, msg, 255, 115);
        top.document.getElementById("popUpMain").style.top = "330px";
    } else {
        alert(type + msg);
    }
    if (type.indexOf('添加到背景音乐成功') > -1) {
        top.g_XDoc[10] = null;
        top.g_JData[10] = 0;
        send_stat_request('http://qzone-music.qq.com/fcg-bin/fcg_musicblog_statis.fcg?new=1&type=12&value=1&uin=' + top.g_iLoginUin);
    }
}
function addToFav(id, type) {
    if (! (top.g_iLoginUin > 10000)) {
        alert("对不起,您还没有登陆");
        return;
    }
    send_stat_request('http://qzone-music.qq.com/fcg-bin/fcg_musicblog_statis.fcg?new=1&type=10&value=1&uin=' + top.g_iLoginUin);
    switch (parseInt(type)) {
    case 2:
    case 3:
    case 4:
        break;
    default:
        alert("要收藏的歌曲类型错误");
        return;
    }
    function showSucc() {
        var x = top.g_XDoc["playlist_quote"].lastChild;
        if (x.tagName == "error") {
            alert(x.lastChild["text"]);
            return;
        }
        if (x.tagName == "succ") {
            alert("收藏成功");
        }
    }
    function err_do() {
        alert("系统繁忙,请稍后再试");
    }
    var source = "";
    var url = "http://qzone-music.qq.com/fcg-bin/v5/fcg_music_quotemulti.fcg?ids=" + id + "&uin=" + top.g_iUin + "&types=" + type + "&source=" + source;
    top.g_XDoc["playlist_quote"] = null;
    top.loadXMLAsync("playlist_quote", url, showSucc, err_do, true);
}
function createIframe(src, name) {
    var f = document.getElementsByTagName("iframe");
    for (var i = 0; i < f.length; i++) if (f[i].name.indexOf(name) != -1) return;
    var i = document.createElement("iframe");
    document.body.insertBefore(i, null);
    i.name = name;
    i.id = name;
    i.width = 0;
    i.height = 0;
    i.src = src;
    i = null;
}
var source = 0;
function addToBg(id, type) {
    if (! (top.g_iLoginUin > 10000)) {
        alert("对不起,您还没有登陆");
        return;
    }
    send_stat_request('http://qzone-music.qq.com/fcg-bin/fcg_musicblog_statis.fcg?new=1&type=11&value=1&uin=' + top.g_iLoginUin);
    switch (parseInt(type)) {
    case 2:
    case 3:
    case 4:
        break;
    default:
        alert("要设置为背景音乐的歌曲类型错误");
        return;
    }
    var Url = 'http://qzone-music.qq.com/fcg-bin/v5/fcg_addmquote_2playlist.fcg?uin=' + top.g_iLoginUin + '&ids=' + id + '&types=' + type + "&source=" + source;
    createIframe("", "cgiCall");
    document.getElementById("cgiCall").src = Url;
}
var Class = {
    create: function() {
        return function() {
            this.initialize.apply(this, arguments);
        };
    }
};
Object.extend = function(destination, source) {
    for (property in source) {
        destination[property] = source[property];
    }
    return destination;
};
function compile_html(html) {
    if (!html) return;
    html = html.trim().toLowerCase();
    var div = document.createElement('div');
    div.innerHTML = html;
    return div.childNodes;
}
function JS_TPL(tmpl, ns) {
    function fn(w, g) {
        g = g.split("|");
        var names = g[0].split(".");
        var cnt = ns;
        for (i in names) {
            cnt = cnt[names[i]];
        }
        for (var i = 1; i < g.length; i++) cnt = eval(g[i])(cnt);
        return cnt;
    };
    return tmpl.replace(/%\(([A-Za-z0-9_|.]+)\)/g, fn);
}
Object.extend(String.prototype, {
    to_html: function() {
        return compile_html(this);
    },
    format: function(ns) {
        return JS_TPL(this, ns);
    },
    jsformat: function(ns) {
        return JS_TPL(this, ns);
    }
});
function addToQQPlayer(id, type) {
    send_stat_request('http://qzone-music.qq.com/fcg-bin/fcg_musicblog_statis.fcg?new=1&type=13&value=1&uin=' + top.g_iLoginUin);
    if (type != 1 && type != 5) {
        var url = 'tencent://QQMusic/?version==700&&cmd_count==1&&cmd_0==4001&&clienttype_0==0&&addmusic_0==http://ptlogin2.qq.com/qqmusic_4?musicid=' + id + '&adddepottag=0&ishide=1&from=qzone';
        top.window.location.href = url + '&p=' + Math.random();
    } else {
        var curSongObj = g_songList[curFlashIndex][curSongIndex];
        if (curSongObj.type == type && curSongObj.id == id) {
            if (type == 5 || type == 1) {
                var tpl = 'Tencent://QQMusic/?version==703&&cmd_count==1&&cmd_0==4002&&clienttype_0==0&&playmusic_0==http://qqmusic.qq.com/fcgi-bin/qm_geturl.fcg?name=%(song_name)&singer=%(singer_name)&album=%(album_name)&url=%(song_url|escape)&addplaylisttag=0&ishide=1&from=qzone';
                top.window.location.href = tpl.jsformat({
                    song_id: (type == 5 ? getLocalReportID(curSongObj.url) : -1),
                    song_name: encodeURIComponent(encodeURIComponent(unescape(curSongObj.songName))),
                    song_url: (type != 5) ? curSongObj.url: getLocalUrl(curSongObj.url, id, top.g_iUin),
                    album_name: encodeURIComponent(encodeURIComponent(unescape(curSongObj.albumName))),
                    singer_name: encodeURIComponent(encodeURIComponent(unescape(curSongObj.singerName)))
                });
            }
        }
    }
}
function send_stat_request(url) {
    var i = new Image();
    i.onload = i.onerror = function() {
        this.onload = this.onerror = null;
        delete i;
    }
    i.src = url;
}
var g_isInitMusic = false;
var g_isInitSwf = false;
function getLyricUrl(songId) {
    if (songId > 0) {
        return "http://music.qq.com/miniportal/static/lyric/" + songId % 100 + "/" + songId + ".xml"
    } else {
        return "";
    }
}
/*  |xGv00|f92b5ebddc81c398140cff65b59f68d4 */
