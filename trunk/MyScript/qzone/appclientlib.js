/**
 * @fileoverview 为应用页面的helper库
 * v1.0
 * @author scorr
 */
try {
	document.domain = "qq.com";
} catch (err) {
	//not qq.com page
	throw (new Error("Qzone:not *.qq.com"));
}

window.QZONE = window.QZONE || {};
QZONE.FP = QZONE.FP || {};
QZONE.AP = QZONE.AP || {};

(function(){
	var _fp = window, found = 0;
	try {
		do {
			_fp = _fp.parent;
			if (_fp.QZONE && _fp.QZONE.FrontPage && _fp.g_iUin) {
				found = 5;
				break;
			}
		} while (_fp != top);
	} catch (ex) {
		found = 0;
	}
	QZONE.FP._t = _fp;
	if (found < 5) {
		return false;
	}
	function extend(source, target){
		for (var k in source) {
			if (k.charAt(0) != '_' && typeof(source[k]) == 'function') {
				target[k] = source[k];
			}
		}
	}
	extend(_fp.QZONE.OFP || {}, QZONE.FP);
	extend(_fp.QZONE.FrontPage, QZONE.FP);
	extend({
		activateOFPIframe: function(){
			if (frameElement) {
				if (typeof(frameElement.activate) == "function") {
					frameElement.activate();
				}
			}
		}
	}, QZONE.FP);
	
	extend(_fp.QZONE.appPlatform || {}, QZONE.AP);
})();

/*  |xGv00|6238405f09c1b0b013315914862580bd */