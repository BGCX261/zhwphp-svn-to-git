/**
* Create Date:          2010-3-22 18:13
* Author:               Zhang Hal
* File Description:     模块化的日历控件，使用时需要引用jquery1.4
*                       使用日历的文本框需要指定一个类"_calendar"，
*                       或"_calendar_noearly"（代表不能选择今天以前
*                       的日期），即可绑定
* --- # Modifications ---------------------------------------------
* Modify Date:          2010-1-2
* Modify Programmer:    Zhang Hal
* Modify Content:       [content...]
* Download by http://www.codefans.net
* ----------------------------------------------------------------- 
*/
var _HalCheungCalendar = function() {

    var _self = this;                         // 避免与jQuery的this冲突
    /* 属性 */
    _self._Container = null;
    _self._CalendarBG = null;
    _self._allowEarly = true;
    // 日历外框样式
    _self._ContainerBG = "#eee";              // 日历外框背景色
    _self._ContainerBorderStyle = "solid";    // 日历外框线的样式
    _self._ContainerBorderColor = "#333";     // 日历外框线的颜色
    _self._ContainerBorderWidth = 1;          // 日历外框线的尺寸
    _self._ContainerPadding = 2;              // 日历外框与日历内部的距离
    _self._ContainerShadowDistance = 3;       // 日历阴影与日历框的距离
    // 日历内部样式
    _self._DayWidth = 15;
    _self._DayHeight = 15;
    _self._DayPadding = 2;
    _self._DayBorderWidth = 0;
    _self._DayBorderColor = "#000";
    _self._DayBorderStyle = "solid";
    _self._DayFontSize = 11;
    _self._DayFontFamily = "Tahoma";
    _self._DayDecoration = "none";
    _self._DayColor = "#333";
    _self._DayBG = "#eee";
    _self._DayHoverColor = "#fff";
    _self._DayHoverBG = "#f00";
    _self._DayTodayColor = "#ff0";
    _self._DayTodayBG = "#f66";
    _self._DaySeedColor = "#c00";
    _self._DaySeedBG = "#fcc";
    _self._DayEarlyColor = "#c0c0c0";
    // 其它
    _self._DayIdPrefix = "_d^7w[x";
    var _cal_today = new Date();
    _self._TodayDate = _cal_today.getFullYear().toString() + "-" + ("0" + (_cal_today.getMonth() + 1).toString()).substr(("0" + (_cal_today.getMonth() + 1).toString()).length - 2, 2) + "-" + ("0" + _cal_today.getDate().toString()).substr(("0" + _cal_today.getDate().toString()).length - 2, 2) + "," + _cal_today.getDay().toString();
    _self._SeedDate = _self._TodayDate;
    _self._StartDate = _self._TodayDate;
    _self._DateInput = null;

    /*
    The default setting is getting the today date from client. However, the date may not be accurate.
    If want to ensure the accuracy of today date, it can be gotten from server. Set a 
    <input type="hidden" id="_server_date" runat="server" /> in the page by using C#, the date format
    must be "yyyy-MM-dd" like:
    _server_date.Value = DateTime.Now.ToString("yyyy-MM-dd");
    then available the following code:
    
    _self._TodayDate = _self._FormatDay($("#_server_date").val());
    _self._SeedDate = _self._TodayDate;
    _self._StartDate = _self._TodayDate;
    */

    /// <summary>
    /// 返回某日期的星期
    /// </summary>
    /// <return>返回形如：yyyy-MM-dd,wd格式的日期，wd为星期几，0代表星期日</return>
    _self._FormatDay = function(date) {
        var y = parseInt(date.split('-')[0], 10);
        var m = parseInt(date.split('-')[1], 10) - 1;
        var d = parseInt(date.split('-')[2].split(',')[0], 10);
        var dt = new Date(y, m, d);
        return y + "-" + ("0" + (m + 1)).substr(("0" + (m + 1)).length - 2, 2) + "-" + ("0" + d).substr(("0" + d).length - 2, 2) + "," + dt.getDay();
    }
    /// <summary>
    /// 返回某日期所在月的第一天
    /// </summary>
    /// <return>返回形如：yyyy-MM-dd,wd格式的日期，wd为星期几，0代表星期日</return>
    _self._MonthFirstDay = function(datew) {
        var y = parseInt(datew.split('-')[0], 10);
        var m = parseInt(datew.split('-')[1], 10) - 1;
        var d = 1;
        var dt = new Date(y, m, d);
        return y + "-" + ("0" + (m + 1)).substr(("0" + (m + 1)).length - 2, 2) + "-" + ("0" + d).substr(("0" + d).length - 2, 2) + "," + dt.getDay();
    }
    /// <summary>
    /// 返回某日期所在月的最后一天
    /// </summary>
    /// <return>返回形如：yyyy-MM-dd,wd格式的日期，wd为星期几，0代表星期日</return>
    _self._MonthLastDay = function(datew) {
        var y = parseInt(datew.split('-')[0], 10);
        var m = parseInt(datew.split('-')[1], 10) - 1;
        m++;
        if (m == 12) {
            m = 0;
            y++;
        }
        var d = 1;
        var dt = new Date(y, m, d);
        dt = new Date(dt - 86400000);
        return dt.getFullYear() + "-" + ("0" + (dt.getMonth() + 1)).substr(("0" + (dt.getMonth() + 1)).length - 2, 2) + "-" + ("0" + dt.getDate()).substr(("0" + dt.getDate()).length - 2, 2) + "," + dt.getDay();
    }
    /// <summary>
    /// 由一个字串返回一个日期对象
    /// </summary>
    /// <return>返回一个日期对象</return>
    _self._ConvertToDateTime = function(dStr) {
        var y = parseInt(dStr.split('-')[0], 10);
        var m = parseInt(dStr.split('-')[1], 10) - 1;
        var d = parseInt(dStr.split('-')[2].split(',')[0], 10);
        var dt = new Date(y, m, d);
        return dt;
    }
    /// <summary>
    /// 由一个日期对象返回一个日期字串
    /// </summary>
    /// <return>返回一个日期字串</return>
    _self._ConvertDateTimeToStr = function(dObj) {
        var y = dObj.getFullYear();
        var m = dObj.getMonth() + 1;
        var d = dObj.getDate();
        return _self._FormatDay(y + "-" + m + "-" + d);
    }
    /// <summary>
    /// 验证一个字符串是否为效日期，兼容yyyy-MM-dd和yyyy-M-d格式，或yyyy/MM/dd和yyyy/M/d格式
    /// </summary>
    /// <return>返回True False</return>
    _self._IsValidDate = function(dtStr) {
        var parten = /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$/;
        if (!parten.exec(dtStr)) {
            return false;
        }
        return true;
    }

    /// <summary>
    /// 构造日历
    /// </summary>
    _self._ConstructCalendar = function() {

        $(_self._Container).html("");
        /* 取得种子日期所在月第一天和最后一天 */
        var monthFirstDay = _self._MonthFirstDay(_self._SeedDate);
        var mfdWeekDay = parseInt(monthFirstDay.split(',')[1], 10);
        var monthLastDay = _self._MonthLastDay(_self._SeedDate);
        var mldWeekDay = parseInt(monthLastDay.split(',')[1], 10);

        /* 取得第1天当周内第1天前天数 */
        var firstDay = new Date(_self._ConvertToDateTime(monthFirstDay) - (86400000 * mfdWeekDay));

        /* 取得最后1天当周内最后1天后天数 */
        var lastDay = new Date(_self._ConvertToDateTime(monthLastDay) - (0 - 86400000) * (6 - mldWeekDay));

        /* 构造前月后月前年后年按钮 */
        var pm = $("<a/>", {
            id: "_pm",
            css: {
                display: "block",
                width: _self._DayWidth + "px",
                height: _self._DayHeight + "px",
                padding: _self._DayPadding + "px",
                border: _self._DayBorderStyle + " " + _self._DayBorderWidth + "px " + _self._DayBorderColor,
                background: _self._DayBG,
                "float": "left",
                "font-family": _self._DayFontFamily,
                "font-size": _self._DayFontSize + "px",
                "text-decoration": _self._DayDecoration,
                color: _self._DayColor,
                background: _self._DayBG,
                "text-align": "center"
            },
            title: "上一月"
        }).attr("href", "javascript:void(0);").html("&lt;");
        $(pm).appendTo($(_self._Container));
        var py = $(pm).clone();
        $(py).attr("id", "_py").attr("title", "上一年").html("&lt;").appendTo($(_self._Container));
        var pny = $(pm).clone().attr("title", "").css("cursor", "default");
        $(pny).css("font-family", _self._DayFontFamily + ",PMingLiU").attr("id", "_pny").html(_self._SeedDate.split('-')[0] + "-" + _self._SeedDate.split('-')[1]).css("text-align", "center").css("width", (_self._DayWidth * 3 + (_self._DayPadding + _self._DayBorderWidth) * 4) + "px").appendTo($(_self._Container));
        var ny = $(pm).clone();
        $(ny).attr("id", "_ny").attr("title", "下一年").html("&gt;").appendTo($(_self._Container));
        var nm = $(pm).clone();
        $(nm).attr("id", "_nm").attr("title", "下一月").html("&gt;").appendTo($(_self._Container));
        var weekStr = "日,一,二,三,四,五,六";
        // 上月
        $(pm).click(function() {
            /* 取得种子日期所在月第一天和最后一天 */
            var monthFirstDay = _self._MonthFirstDay(_self._SeedDate);
            var dt = _self._ConvertToDateTime(monthFirstDay);
            dt.setDate(dt.getDate() - 1);
            _self._SeedDate = _self._ConvertDateTimeToStr(dt);
            _self._ConstructCalendar();
        });
        // 下月
        $(nm).click(function() {
            var monthLastDay = _self._MonthLastDay(_self._SeedDate);
            var dt = _self._ConvertToDateTime(monthLastDay);
            dt.setDate(dt.getDate() + 1);
            _self._SeedDate = _self._ConvertDateTimeToStr(dt);
            _self._ConstructCalendar();
        });

        // 上年
        $(py).click(function() {
            if (parseInt(_self._SeedDate.split('-')[0], 10) <= 1900) {
                return;
            }
            var monthFirstDay = _self._MonthFirstDay(_self._SeedDate);
            var nextYearSeedDate = monthFirstDay.replace(monthFirstDay.split('-')[0], (parseInt(monthFirstDay.split('-')[0], 10) - 1).toString());
            _self._SeedDate = _self._ConvertDateTimeToStr(_self._ConvertToDateTime(nextYearSeedDate));
            _self._ConstructCalendar();
        });

        // 下年
        $(ny).click(function() {
            if (parseInt(_self._SeedDate.split('-')[0], 10) >= 2099) {
                return;
            }
            var monthFirstDay = _self._MonthFirstDay(_self._SeedDate);
            var nextYearSeedDate = monthFirstDay.replace(monthFirstDay.split('-')[0], (parseInt(monthFirstDay.split('-')[0], 10) + 1).toString());
            _self._SeedDate = _self._ConvertDateTimeToStr(_self._ConvertToDateTime(nextYearSeedDate));
            _self._ConstructCalendar();
        });

        for (var i = 0; i < 7; i++) {
            var a = $(pm).clone().attr("title", "").css("cursor", "default");
            $(a).css("font-size", "11px").css("font-family", "PMingLiU").css("text-align", "center").html(weekStr.split(",")[i]).appendTo($(_self._Container));
        }

        /* 循环构造日历 */
        for (var i = firstDay; i <= lastDay; i = new Date(i - (0 - 86400000))) {
            var a = $("<a/>", {
                id: _self._DayIdPrefix + _self._ConvertDateTimeToStr(i).replace(',', '_'),
                css: {
                    display: "block",
                    width: _self._DayWidth + "px",
                    height: _self._DayHeight + "px",
                    padding: _self._DayPadding + "px",
                    border: _self._DayBorderStyle + " " + _self._DayBorderWidth + "px " + _self._DayBorderColor,
                    background: _self._DayBG,
                    "float": "left",
                    "font-family": _self._DayFontFamily,
                    "font-size": _self._DayFontSize + "px",
                    "text-decoration": _self._DayDecoration,
                    color: _self._DayColor,
                    "text-align": "center"
                }
            });
            /* 仅显示当月日期 */
            if (i >= _self._ConvertToDateTime(monthFirstDay) && i <= _self._ConvertToDateTime(monthLastDay)) {
                /* 如允许选择今日以前日期 */
                if (_self._allowEarly || !_self._allowEarly && i >= _self._ConvertToDateTime(_self._TodayDate)) {
                    $(a).attr("href", "javascript:void(0);").html(i.getDate());
                    $(a).mouseover(function() {
                        $(this).css("color", _self._DayHoverColor).css("background", _self._DayHoverBG);
                    });
                    $(a).mouseout(function() {
                        $(this).css("color", _self._DayColor).css("background", _self._DayBG);
                    });
                    $(a).click(function(event) {
                        var a = event.target;
                        var day = $(a).attr("id").replace(_self._DayIdPrefix, "").split("_")[0];
                        $(_self._DateInput).val(day);
                        $(a).parent().parent().remove();
                        _self._Dispose();

                    });
                    //alert(i + "\n" + _ConvertToDateTime(_SeedDate));
                    if (i.toString() == _self._ConvertToDateTime(_self._StartDate).toString()) {
                        $(a).addClass("_is_start");
                    }
                    if (i.toString() == _self._ConvertToDateTime(_self._TodayDate).toString()) {
                        $(a).removeClass("_is_start").addClass("_is_today");
                    }
                }
                else {
                    $(a).css("color", _self._DayEarlyColor).html(i.getDate());
                }
                $(a).attr("isd", "_is_a_date");
            }
            $(a).appendTo($(_self._Container));
            /* 输入框内原来的日期 */
            $(_self._Container).find("a[class='_is_start']").each(function() {
                $(this).css("color", _self._DaySeedColor).css("background", _self._DaySeedBG);
                $(this).unbind("mouseover");
                $(this).mouseover(function() {
                    $(this).css("color", _self._DayHoverColor).css("background", _self._DayHoverBG);
                });
                $(this).unbind("mouseout");
                $(this).mouseout(function() {
                    $(this).css("color", _self._DaySeedColor).css("background", _self._DaySeedBG);
                });
            });
            /* 今天的日期 */
            $(_self._Container).find("a[class='_is_today']").each(function() {
                $(this).css("color", _self._DayTodayColor).css("background", _self._DayTodayBG);
                $(this).unbind("mouseover");
                $(this).mouseover(function() {
                    $(this).css("color", _self._DayHoverColor).css("background", _self._DayHoverBG);
                });
                $(this).unbind("mouseout");
                $(this).mouseout(function() {
                    $(this).css("color", _self._DayTodayColor).css("background", _self._DayTodayBG);
                });
            });
        }

        /* 工具栏 */
        var toolStr = "清空,今日,当前所在月第一天,当前所在月最后一天,今年第一天,今年最后一天,下月今日";
        var toolImg = "clear,today,mf,me,yf,ye,jm";
        // 清空
        var tool = $("<a/>", {
            css: {
                display: "block",
                width: _self._DayWidth + "px",
                height: _self._DayHeight + "px",
                padding: _self._DayPadding + "px",
                border: _self._DayBorderStyle + " " + _self._DayBorderWidth + "px " + _self._DayBorderColor,
                background: _self._DayBG + " url(images/calendar/" + toolImg.split(',')[0] + ".gif) no-repeat center center",
                "float": "left",
                "font-family": _self._DayFontFamily,
                "font-size": _self._DayFontSize + "px",
                "text-decoration": _self._DayDecoration,
                color: _self._DayColor,
                "text-align": "right"
            },
            href: "javascript:void(0);",
            title: toolStr.split(',')[0]
        }).click(function() {
            $(_self._DateInput).val("");
            $(_self._Container).parent().remove();
            _self._Dispose();
        }).appendTo($(_self._Container));

        // 今日
        $(tool).clone().css("background", _self._DayBG + " url(images/calendar/" + toolImg.split(',')[1] + ".gif) no-repeat center center").attr("title", toolStr.split(',')[1]).attr("id", "_todayDate").click(function() {
            $(_self._DateInput).val(_self._TodayDate.split(',')[0]);
            $(_self._Container).parent().remove();
            _self._Dispose();
        }).appendTo($(_self._Container));

        // 当前所在月第一天
        $(tool).clone().css("background", _self._DayBG + " url(images/calendar/" + toolImg.split(',')[2] + ".gif) no-repeat center center").attr("title", toolStr.split(',')[2]).attr("id", "_monthStart").click(function() {
            if ($(_self._Container).find("a[isd='_is_a_date']:first").attr("href") == "") {
                return;
            }
            $(_self._DateInput).val($(_self._Container).find("a[isd='_is_a_date']:first").attr("id").replace("_d", "").split("_")[0]);
            $(_self._Container).parent().remove();
            _self._Dispose();
        }).appendTo($(_self._Container));

        // 当前所在月最后一天
        $(tool).clone().css("background", _self._DayBG + " url(images/calendar/" + toolImg.split(',')[3] + ".gif) no-repeat center center").attr("title", toolStr.split(',')[3]).attr("id", "_monthEnd").click(function() {
            if ($(_self._Container).find("a[isd='_is_a_date']:last").attr("href") == "") {
                return;
            }
            $(_self._DateInput).val($(_self._Container).find("a[isd='_is_a_date']:last").attr("id").replace("_d", "").split("_")[0]);
            $(_self._Container).parent().remove();
            _self._Dispose();
        }).appendTo($(_self._Container));

        // 今年第一天
        $(tool).clone().css("background", _self._DayBG + " url(images/calendar/" + toolImg.split(',')[4] + ".gif) no-repeat center center").attr("title", toolStr.split(',')[4]).attr("id", "_yearStart").click(function() {
            if (!_self._allowEarly) {
                return;
            }
            $(_self._DateInput).val(_self._TodayDate.split('-')[0] + "-01-01");
            $(_self._Container).parent().remove();
            _self._Dispose();
        }).appendTo($(_self._Container));

        // 今年最后一天
        $(tool).clone().css("background", _self._DayBG + " url(images/calendar/" + toolImg.split(',')[5] + ".gif) no-repeat center center").attr("title", toolStr.split(',')[5]).attr("id", "_yearEnd").click(function() {
            $(_self._DateInput).val(_self._TodayDate.split('-')[0] + "-12-31");
            $(_self._Container).parent().remove();
            _self._Dispose();
        }).appendTo($(_self._Container));

        // 下月今日
        $(tool).clone().css("background", _self._DayBG + " url(images/calendar/" + toolImg.split(',')[6] + ".gif) no-repeat center center").attr("title", toolStr.split(',')[6]).attr("id", "_nextMonthToday").click(function() {
            var dt = _self._ConvertToDateTime(_self._TodayDate);
            dt.setDate(dt.getDate() + 30);
            $(_self._DateInput).val(_self._ConvertDateTimeToStr(dt).split(',')[0]);
            $(_self._Container).parent().remove();
            _self._Dispose();
        }).appendTo($(_self._Container));

        /* 设置阴影 */
        // 检查是否ie6，是ie6则使用gif图片
        var shdbg = "url(images/calendar/shd.png) repeat top left";
        var isIE = !!window.ActiveXObject;
        var isIE6 = isIE && !window.XMLHttpRequest;
        if (isIE) {
            if (isIE6) {
                shdbg = "url(images/calendar/shd.gif) repeat top left";
            }
        }
        $(_self._CalendarBG).find("div:eq(1)").remove();
        var shadow = $("<div/>", { css: { position: "absolute", "z-index": "9", background: shdbg, width: $(_self._Container).get(0).offsetWidth + "px", height: $(_self._Container).get(0).offsetHeight + "px", top: ($(_self._Container).offset().top + _self._ContainerShadowDistance) + "px", left: ($(_self._Container).offset().left + _self._ContainerShadowDistance) + "px"} });
        $(_self._Container).after($(shadow));
    };

    /* 初始化输入框 */
    this._InitialAndBind = function() {

        /* 格式化日期 */
        $("input[type='text'][class*='_calendar']").each(function() {

            $(this).attr("readonly", true);
            if ($(this).val() != "") {
                var dt = $(this).val().replace(/\//g, "-");
                if (!_self._IsValidDate(dt)) {
                    dt = _self._TodayDate.split(',')[0];
                }
                else {
                    if (parseInt(dt.split('-')[0], 10) < 1900 || parseInt(dt.split('-')[0], 10) > 2099) {
                        dt = _self._TodayDate.split(',')[0];
                    }
                }
                $(this).val(_self._FormatDay(dt).split(',')[0]);
            }
        });

        /* 绑定日历 */
        $("input[type='text'][class*='_calendar']").click(function(event) {
            /* 生成透明背景 */
            _self._CalendarBG = $("<div/>", { css: { position: "absolute", top: "0px", left: "0px", "z-index": "99999", width: document.body.clientWidth + "px", height: document.body.clientHeight + "px", background: "url(images/calendar/bg.gif)"} });
            $(_self._CalendarBG).appendTo($("body"));

            /* 背景加入单击事件 */
            $(_self._CalendarBG).click(function() {
                $(this).remove();
                _self._Dispose();
            });

            /* 日历显示位置 */
            var ipt = event.target;
            _self._DateInput = $(ipt);
            var top = $(ipt).offset().top + $(ipt).get(0).offsetHeight;
            var left = $(ipt).offset().left;
            var containerWidth = _self._DayWidth * 7 + _self._DayPadding * 14 + _self._DayBorderWidth * 14;
            _self._Container = $("<div/>", { css: { position: "absolute", top: top + "px", left: left + "px", width: containerWidth + "px", background: _self._ContainerBG, border: _self._ContainerBorderStyle + " " + _self._ContainerBorderWidth + "px " + _self._ContainerBorderColor, "z-index": "10", padding: _self._ContainerPadding + "px"} })
            $(_self._Container).appendTo($(_self._CalendarBG));

            /* 加入事件，让鼠标点击日历外部时隐藏日历 */
            $(_self._Container).mouseover(function() {
                $(_self._CalendarBG).unbind("click");
            });
            $(_self._Container).mouseout(function() {
                $(_self._CalendarBG).click(function() {
                    $(_self._CalendarBG).remove();
                });
            });

            /* 取得控件日期 */
            if ($(_self._DateInput).val() != "") {
                _self._SeedDate = _self._FormatDay($(_self._DateInput).val());
                _self._StartDate = _self._SeedDate;
            }
            else {
                _self._StartDate = _self._TodayDate;
                _self._SeedDate = _self._StartDate;
            }

            /* 是否允许早于今日的日期被选择 */
            _self._allowEarly = $(_self._DateInput).attr("class").indexOf("_noearly") == -1 ? true : false;
            _self._ConstructCalendar();
        });

    };

    /* 清理垃圾 */
    _self._Dispose = function() {
        CollectGarbage();
    };
};
$(function() {

    /* 初始化日期控件 */
    var myCals = new _HalCheungCalendar();
    myCals._InitialAndBind();
});