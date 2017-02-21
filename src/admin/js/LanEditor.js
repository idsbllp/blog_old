// import hljs from 'highlight.js';
var LanEditor = {

    //构造函数，初始化变量，注册按键监听
    init: function(args) {
        if("undefined" == typeof(args) || "undefined" == typeof(args.textelem) ){
            return {
                status: false,
                message: "你至少需要指定LanEditor使用的textelem"
            };
        }
        if("function" != typeof($)) {
            return {
                status: false,
                message: "LanEditor使用$符访问jQuery，而在此页面没有检测到jQuery"
            };
        }
        var arg = args;
        //初始化语法高亮
        hljs.initHighlightingOnLoad();
        //初始化markdown渲染器
        this.converter = new Showdown.converter();
        //编辑框id
        this.textelem = arg.textelem;
        this.showelem = "undefined" == typeof(arg.showelem) ? null : arg.showelem;
        //编辑框对象
        this.TextElem = $("#" + this.textelem);
        $("body").append(
            "<div class=\"_Keyword\" id=\"_Keyword\"><ul id=\"_KeywordLi\"></ul></div>" +
            '<div class="_LanEditorBg" id="_LanEditorBg">' +
            '</div>' +
            '<div class="_LEBorder" id="_LEBorder">' +
            '<ul class="_LEMenuList">' +
            '<li class="_MenuListSe">文件列表</li>' +
            '<li class="_MenuListSet">选项设置</li>' +
            '</ul>' +
            '<div class="_LEContent">' +
            '<div id="_LEFilelist">' +
            '<p>' +
            '<input type="text" id="_LENName">' +
            '<span id="_LEFNB">新建</span>' +
            '</p>' +
            '<ul>' +
            '</ul>' +
            '</div>' +
            '<div id="_LESetting">' +
            '<ul>' +
            '<li id="OpenSKL">' +
            '<span class="_LESName">开启关键字提示</span>' +
            '<span class="_LESCon"><span></span></span>' +
            '</li>' +
            '<li id="OpenSKLAni">' +
            '<span class="_LESName">开启提示框动画</span>' +
            '<span class="_LESCon"><span></span></span>' +
            '</li>' +
            '<li id="OpenMenuAni">' +
            '<span class="_LESName">开启菜单动画</span>' +
            '<span class="_LESCon"><span></span></span>' +
            '</li>' +
            '<li id="OpenAutoSymbol">' +
            '<span class="_LESName">开启符号补全</span>' +
            '<span class="_LESCon"><span></span></span>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
        //初始化菜单对象
        this.Menu.MenuObj = $("#_LEBorder");
        //初始化背景对象
        this.Background.BackObj = $("#_LanEditorBg");
        this.SKLelem = $("#_Keyword");
        this._timer = {};
        //对editor元素样式进行默认设置
        (function(TextElem) {
            TextElem.css({
                "box-sizing": "border-box",
                "overflow": "auto",
                "font-size": "16px",
                "font-family": "Menlo, Monaco, Consolas, Courier New, monospace",
                "font-weight": 1.3,
                "outline": "none",
                "background-color": "#fff",
                "color": "#666"
            });
        })(this.TextElem);
        //注册监听
        var TextElem = document.getElementById(this.textelem);
        if ("undefined" != typeof TextElem.addEventListener) {
            window.addEventListener("keydown", function(event) {
                var TextElem = LanEditor.TextElem;
                LanEditor.Menu.Toggle.call(LanEditor.Menu, event);
                LanEditor.KeyRewrite(event, TextElem);
                for(var i = 0; i < LanEditor.Fn.FnSet.keydown.length; i++) {
                    LanEditor.Fn.FnSet.keydown[i](event, TextElem);
                }
            }, true);
            TextElem.addEventListener("keyup", function(event) {
                var TextElem = LanEditor.TextElem;
                LanEditor.AutoCompleteSymbol(event, TextElem);
                LanEditor.AutoCompleteKeyword(event, TextElem);
                for(var i = 0; i < LanEditor.Fn.FnSet.keyup.length; i++) {
                    LanEditor.Fn.FnSet.keyup[i](event, TextElem);
                }
                // 自动保存文件
                if(LanEditor.SetPara.PluginsMode == false){
                    LanEditor.File.SaveFile();
                }
                // 渲染md
                LanEditor.DelayTillLast.call(LanEditor, "RenderHTML", LanEditor.RenderHTML, 300);
            }, false);
            document.getElementById("_LEFNB").addEventListener("click", function() {
                LanEditor.File.NewFile($("#_LENName").val());
                LanEditor.File.Refresh($("#_LEFilelist ul"));
            }, false);
            document.getElementById("_LENName").addEventListener("keyup", function(event) {
                if(event.which == 13){
                    LanEditor.File.NewFile($("#_LENName").val());
                    $("#_LENName").val("");
                    LanEditor.File.Refresh($("#_LEFilelist ul"));
                }
            }, false);
        } else if ("undefined" != typeof TextElem.attachEvent) {
            window.attachEvent("keydown", function(event) {
                var TextElem = LanEditor.TextElem;
                LanEditor.Menu.Toggle.call(LanEditor.Menu, event);
                LanEditor.KeyRewrite(event, TextElem);
                for(var i = 0; i < LanEditor.Fn.FnSet.keydown.length; i++) {
                    LanEditor.Fn.FnSet.keydown[i](event, TextElem);
                }
            });
            TextElem.attachEvent("keyup", function(event) {
                var TextElem = LanEditor.TextElem;
                LanEditor.AutoCompleteSymbol(event, TextElem);
                LanEditor.AutoCompleteKeyword(event, TextElem);
                for(var i = 0; i < LanEditor.Fn.FnSet.keyup.length; i++) {
                    LanEditor.Fn.FnSet.keyup[i](event, TextElem);
                }
                if(LanEditor.SetPara.PluginsMode == false){
                    LanEditor.File.SaveFile();
                }
                LanEditor.DelayTillLast.call(LanEditor, "RenderHTML", LanEditor.RenderHTML);
            }, 300);
            document.getElementById("_LEFNB").attachEvent("click", function() {
                LanEditor.File.NewFile($("#_LENName").val());
                LanEditor.File.Refresh($("#_LEFilelist ul"));
            });
            document.getElementById("_LENName").attachEvent("click", function(event) {
                LanEditor.File.NewFile($("#_LENName").val());
                $("#_LENName").val("");
                LanEditor.File.Refresh($("#_LEFilelist ul"));
            });
        } else {
            alert("此浏览器太老，建议用chrome浏览器");
        }
        //初始化提示框对象参数
        this.SKLPara.Set(false, 0, 0);
        TextElem.focus();
        //---------------------------文件列表事件代理
        $("#_LEFilelist ul").delegate("span", "click", function(e) {
            // 打开文件
            if ($(e.target).hasClass("_LEFName")) {
                var filename = $(e.target).text();
                var content = LanEditor.File.GetFileContent(filename);
                var time;
                for (let varname in localStorage) {
                    if (varname.split("$")[0].length == 10 && varname.split("$")[1] == filename) {
                        time = varname.split("$")[0];
                        break;
                    }
                }
                LanEditor.TextElem.val(content);
                LanEditor.File.CurOpenFile.name = filename;
                LanEditor.File.CurOpenFile.content = content;
                LanEditor.File.CurOpenFile.time = time;
                LanEditor.RenderHTML();
            // 导出markdown文件
            } else if ($(e.target).hasClass("_LEFM")) {
                var filename = $(e.target).prev().text();
                var content = LanEditor.File.GetFileContent(filename);
                LanEditor.File.ExportMD(content);
            // 导出HTML文件
            } else if ($(e.target).hasClass("_LEFH")) {
                var filename = $(e.target).prev().prev().text();
                var content = LanEditor.File.GetFileContent(filename);
                LanEditor.File.ExportHTML(content);
            // 删除文件
            } else if ($(e.target).hasClass("_LEFD")) {
                var filename = $(e.target).prev().prev().prev().text();
                // 删除的是否是当前正在编辑的文件
                if (filename == LanEditor.File.CurOpenFile.name) {
                    LanEditor.File.CurOpenFile.name = null;
                    LanEditor.File.CurOpenFile.content = null;
                    LanEditor.File.CurOpenFile.time = null;
                }
                LanEditor.File.DeleteFileFromLocal(filename);
                LanEditor.File.Refresh($("#_LEFilelist ul"));
            }
        });
        //----------------------------菜单选项卡事件
        $("._MenuListSe").click(function(e) {
            $(this).css("background-color", "#948266");
            $("._MenuListSet").css("background-color", "#aa9b83");
            $("#_LEFilelist").css("display", "block");
            $("#_LESetting").css("display", "none");
        });
        $("._MenuListSet").click(function(e) {
            $(this).css("background-color", "#948266");
            $("._MenuListSe").css("background-color", "#aa9b83");
            $("#_LEFilelist").css("display", "none");
            $("#_LESetting").css("display", "block");
        });
        //-----------------------------选项设置事件代理
        $("#_LESetting ul").delegate("li", "click", function(e) {
            var IdName = $(this).attr("id");
            switch (IdName) {
                case "OpenSKL":
                    if (LanEditor.SetPara.OpenSKL == 1) {
                        LanEditor.SetPara.OpenSKL = 0;
                        $("._LESCon", $(this)).css("background-color", "#dcdada").children().css("left", "1px");
                    } else {
                        LanEditor.SetPara.OpenSKL = 1;
                        $("._LESCon", $(this)).css("background-color", "#4dc4f5").children().css("left", "21px");
                    }
                    break;
                case "OpenSKLAni":
                    if (LanEditor.SetPara.OpenSKLAni == 1) {
                        LanEditor.SetPara.OpenSKLAni = 0;
                        $("._LESCon", $(this)).css("background-color", "#dcdada").children().css("left", "1px");
                        $("#_Keyword").css("transition", "0s");
                    } else {
                        LanEditor.SetPara.OpenSKLAni = 1;
                        $("._LESCon", $(this)).css("background-color", "#4dc4f5").children().css("left", "21px");
                        $("#_Keyword").css("transition", "0.3s");
                    }
                    break;
                case "OpenMenuAni":
                    if (LanEditor.SetPara.OpenMenuAni == 1) {
                        LanEditor.SetPara.OpenMenuAni = 0;
                        $("._LESCon", $(this)).css("background-color", "#dcdada").children().css("left", "1px");
                        $("#_LEBorder").css("transition", "0s");
                        $("#_LanEditorBg").css("transition", "0s");
                    } else {
                        LanEditor.SetPara.OpenMenuAni = 1;
                        $("._LESCon", $(this)).css("background-color", "#4dc4f5").children().css("left", "21px");
                        $("#_LEBorder").css("transition", "1s");
                        $("#_LanEditorBg").css("transition", "0.8s");
                    }
                    break;
                case "OpenAutoSymbol":
                    if (LanEditor.SetPara.OpenAutoSymbol == 1) {
                        LanEditor.SetPara.OpenAutoSymbol = 0;
                        $("._LESCon", $(this)).css("background-color", "#dcdada").children().css("left", "1px");
                    } else {
                        LanEditor.SetPara.OpenAutoSymbol = 1;
                        $("._LESCon", $(this)).css("background-color", "#4dc4f5").children().css("left", "21px");
                    }
                    break;
            }
            LanEditor.SetPara.Save();
        });
        //加载设置
        this.SetPara.Load();
        this.SetPara.PluginsMode = "undefined" == typeof(arg.PluginsMode) ? false : arg.PluginsMode;
        this.SetPara.OpenSKL = "undefined" == typeof(arg.OpenSKL) ? this.SetPara.OpenSKL : arg.OpenSKL;
        this.SetPara.OpenSKLAni = "undefined" == typeof(arg.OpenSKLAni) ? this.SetPara.OpenSKLAni : arg.OpenSKLAni;
        this.SetPara.OpenAutoSymbol = "undefined" == typeof(arg.OpenAutoSymbol) ? this.SetPara.OpenAutoSymbol : arg.OpenAutoSymbol;
        this.SetPara.OpenMenuAni = "undefined" == typeof(arg.OpenMenuAni) ? this.SetPara.OpenMenuAni : arg.OpenMenuAni;
        this.SetPara.Apply();
        return {
            status: true
        };
    },
    //延迟执行最后一次调用的函数
    DelayTillLast: function(id, fn, wait) {
        if (this._timer[id]) {
            window.clearTimeout(this._timer[id]);
            delete this._timer[id];
        }

        return this._timer[id] = window.setTimeout(function() {
            fn.call(LanEditor);
            delete LanEditor._timer[id];
        }, wait);
    },
    //渲染HTML
    RenderHTML: function() {
        if(this.showelem == null) {
            return false;
        }
        var html = this.converter.makeHtml(this.TextElem.val());
        for(var i = 0; i < this.Fn.FnSet.render.length; i++) {
            html = this.Fn.FnSet.render[i](html) || html;
        }
        $("#" + this.showelem).html(html);
        $('pre code', $("#" + this.showelem)).each(function(i, block) {
            hljs.highlightBlock(block);
        });
        return true;
    },
    //获取渲染后的HTML
    GetRenderHTML: function() {
        var html = this.converter.makeHtml(this.TextElem.val());
        for(var i = 0; i < this.Fn.FnSet.render.length; i++) {
            html = this.Fn.FnSet.render[i](html) || html;
        }
        var VirtualDIV = $("<div></div>");
        VirtualDIV.html(html);
        $("pre code", VirtualDIV).each(function(i, block) {
            hljs.highlightBlock(block);
        });
        html = VirtualDIV.html();
        return html;
    },
    //设置提示框对象参数
    SKLPara: {
        //是否显示
        show: null,
        //候选列表总数
        count: null,
        //当前选中的序号,以0开始
        cs: null,
        //匹配关键字的长度，如果为0，则表示不需要匹配
        SWL: 0,
        //匹配到的结果集
        ResultSet: [],
        Set: function(show, count, cs) {
            this.show = show;
            this.count = count;
            this.cs = cs;
            $("._SKLi" + cs).addClass("_limatch");
        },
        //获取提示框对象参数
        Get: function() {
            return LanEditor.SKLPara;
        },
        SetShow: function(show) {
            this.show = show;
        },
        SetCount: function(count) {
            this.count = count;
        },
        SetCS: function(cs, up) {
            $("._SKLi" + this.cs).removeClass("_limatch");
            this.cs = cs;
            $("._SKLi" + cs).addClass("_limatch");
            var SKLheight = parseInt($("#_Keyword").css("height"));
            var SKLScrollHeight = $("#_Keyword")[0].scrollHeight;
            var SKLScrollTop = $("#_Keyword").scrollTop();
            if (cs == 0) {
                $("#_Keyword").scrollTop(0);
            } else if (cs == this.count - 1) {
                $("#_Keyword").scrollTop(SKLScrollHeight);
            } else if (up == true) {
                if (cs * 18 < SKLScrollTop) {
                    var diff = SKLScrollTop - cs * 18;
                    $("#_Keyword").scrollTop(SKLScrollTop - diff);
                }
            } else if ("undefined" == typeof up) {
                if ((cs + 1) * 18 > SKLScrollTop + SKLheight) {
                    var diff = (cs + 1) * 18 - (SKLScrollTop + SKLheight);
                    $("#_Keyword").scrollTop(SKLScrollTop + diff);
                }
            }

        }
    },
    //关键字自动补全，keyup阶段执行
    AutoCompleteKeyword: function(event, TextElem) {
        if (LanEditor.SetPara.OpenSKL == 0) {
            return;
        }
        var e = event;
        var SKLelem = $("#_Keyword");
        if (e.which == 38 || e.which == 40) {
            return;
        }
        if (e.which!=8 && e.which!=189 &&(e.which < 65 && e.which > 57 || e.which > 90 || e.which < 48) ) {
            SKLelem.css({
                "opacity": 0,
                "z-index": -20
            });
            LanEditor.SKLPara.SetShow(false);
            return;
        }
        //要匹配的单词
        var word = "";
        //查找光标前面的单词
        var i = 1;
        var pchar = TextElem.iGetPosStr(-i).charAt(0);
        while (pchar != "" && pchar != "(" && pchar != ")" && pchar != ";") {
            if (i > TextElem.val().length) {
                break;
            }
            if (pchar >= "a" && pchar <= "z" || pchar >= "A" && pchar <= "Z" || pchar == "_" || pchar == "-") {
                i++;
            } else {
                break;
            }
            pchar = TextElem.iGetPosStr(-i).charAt(0);
        }
        if (i > 1) {
            word = TextElem.iGetPosStr(-(i - 1));
            LanEditor.ShowKeywordList(word);
        } else {
            SKLelem.css({
                "opacity": 0,
                "z-index": -20
            });
            LanEditor.SKLPara.SetShow(false);
        }
    },
    //显示关键字提示列表
    ShowKeywordList: function(word) {
        var TextElem = this.TextElem;
        var SKLelem = this.SKLelem;
        var cursorpos = CursorPos.GetCursorPos(document.getElementById(this.textelem));
        var scrolltop = TextElem.scrollTop();
        var left = cursorpos.left + 2;
        var top = cursorpos.top - scrolltop + 18;
        //查找匹配的单词结果
        var resultset = this.SearchKeyword(word);
        //查找单词为空，不显示提示列表
        if (resultset.length <= 0) {
            SKLelem.css({
                "opacity": 0,
                "z-index": -20
            });
            LanEditor.SKLPara.SetShow(false);
            return;
        }
        //拼接HTML代码
        var KeyCount = 0;
        var html = "";
        for (let key in resultset) {
            //过滤键名
            if (!isNaN(key)) {
                continue;
            }
            for (var i = 0; i < resultset[key].length; ++i) {
                html += "<li class=\"_SKLi" + KeyCount + "\">" + resultset[key][i] + "</li>";
                KeyCount++;
            }
        }
        $("#_KeywordLi").html(html);
        LanEditor.SKLPara.Set(true, KeyCount, 0);
        var SKLheight = (KeyCount > 10 ? 180 : KeyCount * 18);
        var SKLwidth = parseInt(SKLelem.css("width"));
        //editor元素距body顶部的高度
        var TextElemTop = CursorPos._offset(document.getElementById(LanEditor.textelem)).top;
        var TextElemLeft = CursorPos._offset(document.getElementById(LanEditor.textelem)).left;
        var TextElemHeight = parseInt(TextElem.css("height"));
        var TextElemWidth = parseInt(TextElem.css("width"));
        // 判断提示框是否超出下边界，是则调整在光标的上边
        if (top + SKLheight > TextElemTop + TextElemHeight) {
            top = top - SKLheight - 18;
        }
        // 判断提示框是否超出右边界，是则调整在光标的左边
        if (left + SKLwidth > TextElemLeft + TextElemWidth) {
            left = left - SKLwidth;
        }
        // console.log("height -> " + height + " SKLheight -> " + SKLheight);
        // 显示提示框
        SKLelem.css({
            "opacity": 1,
            "z-index": 20,
            "left": left,
            "top": top,
            "height": SKLheight
        });
        // console.log(" cursorpos -> "+ cursorpos);
        // console.log(" top -> " + top + " scrolltop -> " + scrolltop + " cursortop -> " + cursorpos.top);
    },
    SearchKeyword: function(word) {
        var flag = false;
        var resultset = new Array();
        // 全局的resultset,并且不含正则替换后的值
        this.SKLPara.ResultSet = new Array();
        this.SKLPara.SWL = word.length;
        var KeywordSet = this.Keyword.Set;
        for (let key in KeywordSet) {
            resultset.push(key);
            resultset[key] = new Array();
            for (var i = 0; i < KeywordSet[key].length; ++i) {
                // console.log("in " + Keyword[key][i] + " search -> " + word + " search reg ->" + "/" + word + "/i search flag -> " + Keyword[key][i].search("/" + word + "/i"));
                var reg = new RegExp("(" + word + ")", "gi");
                if (KeywordSet[key][i].search(reg) > -1) {
                    this.SKLPara.ResultSet.push(KeywordSet[key][i]);
                    resultset[key].push(KeywordSet[key][i].replace(reg, "<span class=\"_KeyHL\">$1</span>"));
                    flag = true;
                }
            }
        }
        return flag ? resultset : [];
    },
    //符号自动补全，keyup阶段执行
    AutoCompleteSymbol: function(event, TextElem) {
        if (LanEditor.SetPara.OpenAutoSymbol == 0) {
            return;
        }
        var e = event;
        //按回车缩进和上一行相同的间距
        if (e.which == 13) {
            if (LanEditor.SKLPara.show == true) {
                return;
            }
            // 获取上一行的缩进个数
            var space = TextElem.iGetSpaceNum();
            //如果是成对{}按回车键，则多加4个空格缩进
            var isfunc = false;
            var pre = TextElem.iGetPosStr(-2);
            if (pre == "{\n") {
                space += 4;
                isfunc = true;
            }
            for (var i = 0; i < space; ++i) {
                TextElem.iAddField(" ");
            }
            var pos = TextElem.iGetFieldPos();
            var insertStr = "";
            if (isfunc) {
                TextElem.iAddField("\n");
                for (var i = 0; i < space - 4; ++i) {
                    insertStr += " ";
                }
            }
            TextElem.iAddField(insertStr);
            TextElem.iSelectField(pos);
        } else if (e.shiftKey && e.which == 57) { // ( 左括号自动补全
            if(TextElem.iGetPosStr(-1) == "("){
                TextElem.iAddField(")");
            }else{
                TextElem.iAddField("）");
            }
            TextElem.iSelectField(TextElem.iGetFieldPos() - 1);
        } else if (e.shiftKey && e.which == 48) { // ) 右括号判断是否成对匹配
            var pre = TextElem.iGetPosStr(-2);
            var next = TextElem.iGetPosStr(1);
            if (pre == "()" && next == ")" || pre == "（）" && next == "）") {
                TextElem.iDelField(1);
                TextElem.iSelectField(TextElem.iGetFieldPos() + 1);
            }
        } else if (e.shiftKey && e.which == 219) { // { 左大括号自动补全
            TextElem.iAddField("}");
            TextElem.iSelectField(TextElem.iGetFieldPos() - 1);
        } else if (e.shiftKey && e.which == 221) { // } 右大括号判断是否成对匹配
            var pre = TextElem.iGetPosStr(-2);
            var next = TextElem.iGetPosStr(1);
            if (pre == "{}" && next == "}") {
                TextElem.iDelField(-1);
            }
        } else if (e.which == 219) { // [ 左中括号自动补全
            if (TextElem.iGetPosStr(-1) == "[") {
                TextElem.iAddField("]");
            } else {
                TextElem.iAddField("】");
            }
            TextElem.iSelectField(TextElem.iGetFieldPos() - 1);
        } else if (e.which == 221) { // ] 右中括号判断是否成对匹配
            var pre = TextElem.iGetPosStr(-2);
            var next = TextElem.iGetPosStr(1);
            if ((pre == "[]" || pre == "【】") && (next == "]" || next == "】")) {
                TextElem.iDelField(-1);
            }
        } else if (e.shiftKey && e.which == 188) { // < 左尖括号自动补全
            if (TextElem.iGetPosStr(-1) == "<") {
                TextElem.iAddField(">");
            } else {
                TextElem.iAddField("》");
            }
            TextElem.iSelectField(TextElem.iGetFieldPos() - 1);
        } else if (e.shiftKey && e.which == 190) { // > 右尖括号判断是否成对匹配
            var pre = TextElem.iGetPosStr(-2);
            var next = TextElem.iGetPosStr(1);
            if ((pre == "<>" || pre == "《》") && (next == ">" || next == "》")) {
                TextElem.iDelField(-1);
            }
        } else if (!e.shiftKey && e.which == 222) { // ' 左单引号自动补全
            if (TextElem.iGetPosStr(-1) == "'") {
                TextElem.iAddField("'");
            } else {
                TextElem.iAddField('’');
            }
            TextElem.iSelectField(TextElem.iGetFieldPos() - 1);
        } else if (e.shiftKey && e.which == 222) { // “ 左双引号自动补全
            if (TextElem.iGetPosStr(-1) == '"') {
                TextElem.iAddField('"');
            } else {
                TextElem.iAddField('”');
            }
            TextElem.iSelectField(TextElem.iGetFieldPos() - 1);
        }
    },
    //重写按键功能，在keydown阶段执行
    KeyRewrite: function(event, TextElem) {
        var e = event;
        //阻止Tab事件，换成4个空格
        if (e.which == 9) {
            e.preventDefault();
            TextElem.iAddField("    ");
        //退格键删除多个空格
        } else if (e.which == 8) {
            //只有光标前一个字符是空格的时候才要判断是否删除多个空格
            if (TextElem.iGetPosStr(-1) == " ") {
                e.preventDefault();
                //查找前面有多少个空格
                var i = 1;
                while (TextElem.iGetPosStr(-i).charAt(0) == " " && TextElem.iGetPosStr(-i).charAt(0) != "\n" && TextElem.iGetPosStr(-i).charAt(0) != "\r\n" && TextElem.iGetPosStr(-i).charAt(0) != "") {
                    i++;
                    if (i > TextElem.val().length) {
                        break;
                    }
                }
                if (i - 1 < 4) {
                    TextElem.iDelField(1);
                } else if ((i - 1) % 4 == 0) {
                    for (var i = 0; i < 4; ++i) {
                        TextElem.iDelField(1);
                    }
                } else {
                    var del = (i - 1) % 4;
                    for (var i = 0; i < del; ++i) {
                        TextElem.iDelField(1);
                    }
                }
            }
        //显示提示框时上下键选择列表项
        } else if (e.which == 38) {
            if (LanEditor.SKLPara.show == true) {
                e.preventDefault();
                if (LanEditor.SKLPara.cs == 0) {
                    LanEditor.SKLPara.SetCS(LanEditor.SKLPara.count - 1);
                } else if (LanEditor.SKLPara.cs > 0) {
                    LanEditor.SKLPara.SetCS(LanEditor.SKLPara.cs - 1, true);
                }
            }
        //重写下键
        } else if (e.which == 40) {
            if (LanEditor.SKLPara.show == true) {
                e.preventDefault();
                if (LanEditor.SKLPara.cs == LanEditor.SKLPara.count - 1) {
                    LanEditor.SKLPara.SetCS(0);
                } else if (LanEditor.SKLPara.cs < LanEditor.SKLPara.count - 1) {
                    LanEditor.SKLPara.SetCS(LanEditor.SKLPara.cs + 1);
                }
            }
        //重写enter键
        } else if (e.which == 13) {
            if (LanEditor.SKLPara.show == true) {
                e.preventDefault();
                TextElem.iDelField(LanEditor.SKLPara.SWL);
                TextElem.iAddField(LanEditor.SKLPara.ResultSet[LanEditor.SKLPara.cs]);
            }
        }
        // console.log("keyCode -> " + e.which);
    },
    //------------------------------------------------------文件对象
    File: {
        CurOpenFile: {
            name: null,
            time: null,
            content: null
        },
        // 保存为md文件
        ExportMD: function(md) {
            var fileName = prompt("保存为Markdown文件，请输入文件名", "新建Markdown文件");
            if (fileName == null || fileName == "") {
                return;
            }
            for(var i = 0; i < LanEditor.Fn.FnSet.expertmd.length; i++) {
                md = LanEditor.Fn.FnSet.expertmd[i](md) || md;
            }
            this.ExportFile(fileName + ".md", md);
        },
        // 保存为HTML文件
        ExportHTML: function(md) {
            var fileName = prompt("保存为HTML文件，请输入文件名", "新建HTML文件");
            if (fileName == null || fileName == "") {
                return;
            }
            var HTML_temp_content = '<!DOCTYPE html>' +
                '<html lang="zh-CN">' +
                '<head><meta charset="UTF-8">' +
                '<style type="text/css">' +
                'h1,h2,h3,h4,h5,h6,p,blockquote{margin:0;padding:0}' +
                'body{font-family:"Helvetica Neue",Helvetica,"Hiragino Sans GB",Arial,sans-serif;font-size:13px;line-height:18px;color:#737373;margin:10px 13px 10px 13px}' +
                'a{color:#0069d6}a:hover{color:#0050a3;text-decoration:none}' +
                'a img{border:0}p{margin-bottom:9px}h1,h2,h3,h4,h5,h6{color:#404040;line-height:36px}h1{margin-bottom:18px;font-size:30px}h2{font-size:24px}h3{font-size:18px}' +
                'h4{font-size:16px}h5{font-size:14px}h6{font-size:13px}hr{margin:0 0 19px;border:0;border-bottom:1px solid #ccc}' +
                'blockquote{padding:13px 13px 21px 15px;margin-bottom:18px;font-family:georgia,serif;font-style:italic}' +
                'blockquote:before{content:"C";font-size:40px;margin-left:-10px;font-family:georgia,serif;color:#eee}' +
                'blockquote p{font-size:14px;font-weight:300;line-height:18px;margin-bottom:0;font-style:italic}code,pre{font-family:Monaco,Andale Mono,Courier New,monospace}' +
                'code{background-color:#fee9cc;color:rgba(0,0,0,0.75);padding:1px 3px;font-size:12px;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px}' +
                'pre{display:block;padding:14px;margin:0 0 18px;line-height:16px;font-size:11px;border:1px solid #d9d9d9;white-space:pre-wrap;word-wrap:break-word}' +
                'pre code{background-color:#fff;color:#737373;font-size:11px;padding:0}@media screen and (min-width:768px){body{width:748px;margin:10px auto}}</style>';
            HTML_temp_content += '<title>' + fileName + '</title>';
            var html = LanEditor.converter.makeHtml(md);
            for(var i = 0; i < LanEditor.Fn.FnSet.render.length; i++) {
                html = LanEditor.Fn.FnSet.render[i](html) || html;
            }
            HTML_temp_content += '</head><body>' + html + '</body></html>';
            this.ExportFile(fileName + ".html", HTML_temp_content);
        },
        //创建文件下载
        ExportFile: function(fileName, content) {
            var aLink = document.createElement('a');
            var blob = new Blob([content]);
            var evt = document.createEvent("HTMLEvents");
            //initEvent 不加后两个参数在FF下会报错, 感谢 Barret Lee 的反馈
            evt.initEvent("click", false, false);
            aLink.download = fileName;
            aLink.href = URL.createObjectURL(blob);
            aLink.dispatchEvent(evt);
        },
        //存储文件到localstorage
        SaveFileToLocal: function(fileName, content) {
            if ("undefined" == localStorage) {
                return "LocalStorage not support";
            }
            if (fileName == null || content == null) {
                return "param wrong";
            }
            var filename = LanEditor.Time.GetTimestamp() + "$" + fileName;
            for (let varname in localStorage) {
                if (varname.split("$")[0].length == 10 && varname.split("$")[1] == fileName) {
                    filename = varname.split("$")[0] + "$" + fileName;
                }
            }
            localStorage.setItem(filename, content);
            return "OK";
        },
        // 从localstorage删除文件
        DeleteFileFromLocal: function(fileName) {
            for (let varname in localStorage) {
                if (varname.split("$")[0].length == 10 && varname.split("$")[1] == fileName) {
                    localStorage.removeItem(varname);
                    return true;
                }
            }
            return false;
        },
        // 获取文件列表
        GetFileList: function() {
            var filelist = new Array();
            var temp;
            for (let varname in localStorage) {
                temp = varname.split("$")[0];
                // 判断当前变量是否是文件名
                if (temp.length == 10 && !isNaN(temp)) {
                    filelist.push({
                        name: varname.split("$")[1],
                        time: temp
                    });
                } else {
                    continue;
                }
            }
            return filelist;
        },
        // 获取文件
        GetFileContent: function(fileName) {
            for (let varname in localStorage) {
                if (varname.split("$")[0].length == 10 && varname.split("$")[1] == fileName) {
                    return localStorage.getItem(varname);
                }
            }
            return false;
        },
        // 创建新文件
        NewFile: function(filename) {
            if (filename == "" || filename == null) {
                alert("无效的文件名");
                return false;
            }
            var result = this.SaveFileToLocal(filename, "");
            if (result == "OK") {
                return true;
            } else if (result == "LocalStorage not support") {
                alert("您的浏览器不支持永久存储，请使用chrome以获得最佳体验");
                return false;
            } else if (result == "param wrong") {
                alert("无效的文件名，请尝试更换文件名");
                return false;
            }
        },
        // 保存当前文件
        SaveFile: function() {
            var md = LanEditor.TextElem.val();
            if(md == ""){
                return;
            }
            // 当前文件还没命名，提示输入文件名
            if (LanEditor.File.CurOpenFile.name == null) {
                var flag = confirm("当前文件未保存,是否保存?");
                if (flag) {
                    var filename = prompt("请输入文件名", "新建MD文件");
                    if (filename == null || filename == "") {
                        return;
                    }
                    LanEditor.File.CurOpenFile.name = filename;
                    LanEditor.File.CurOpenFile.time = LanEditor.Time.GetTimestamp();
                    LanEditor.File.CurOpenFile.content = md;
                    LanEditor.File.SaveFileToLocal(filename, md);
                }
                return;
            }
            LanEditor.File.CurOpenFile.content = md;
            LanEditor.File.SaveFileToLocal(LanEditor.File.CurOpenFile.name, md);
        },
        // 显示文件列表
        ShowFileList: function(ShowObj) {
            var filelist = this.GetFileList();
            var html = "";
            for (var i = 0; i < filelist.length; ++i) {
                html += '<li>';
                html += '<span class="_LEFName" title="' + filelist[i].name + '">' + filelist[i].name + '</span>';
                html += '<span class="_LEFM" title="导出Markdown文件到本地">MD</span>';
                html += '<span class="_LEFH" title="导出HTML文件到本地">HTML</span>';
                html += '<span class="_LEFD" title="删除文件">删除</span>';
                html += '<span class="_LEFT" title="创建日期: ' + LanEditor.Time.GetTimeString(filelist[i].time) + '">' + LanEditor.Time.GetTimeString(filelist[i].time).substr(5, 5) + '</span>';
                html += '</li>';
            }
            ShowObj.html(html);
        },
        // 刷新文件列表
        Refresh: function(ShowObj) {
            this.ShowFileList(ShowObj);
        }
    },
    //菜单对象
    Menu: {
        IsShow: false,
        MenuObj: null,
        //切换显示状态,@call(LanEditor.Menu, Event)
        Toggle: function(e) {
            if(LanEditor.SetPara.PluginsMode == true){
                return ;
            }
            //重写ESC键
            if (e.which == 27) {
                e.preventDefault();
                if (this.IsShow) {
                    // console.log("menu -> hide");
                    LanEditor.Background.Show(false);
                    this.Show(false);
                } else {
                    // console.log("menu -> show");
                    LanEditor.Background.Show(true);
                    this.Show(true);
                    LanEditor.File.ShowFileList($("#_LEFilelist ul"));
                }
            }
        },
        //设置是否显示菜单，true显示，false不显示
        Show: function(IsShow) {
            this.MenuObj.queue([]);
            if (IsShow) {
                this.MenuObj.queue(function() {
                    LanEditor.Menu.IsShow = true;
                    $(this).css("display", "block");
                    $(this).delay(1).dequeue();
                });
                this.MenuObj.queue(function() {
                    $(this).css("height", "320px");
                    $(this).dequeue();
                });

            } else {
                if (LanEditor.SetPara.OpenMenuAni) {
                    this.MenuObj.queue(function() {
                        LanEditor.Menu.IsShow = false;
                        $(this).css("height", "30px");
                        $(this).delay(900).dequeue();
                    });
                    this.MenuObj.queue(function() {
                        $(this).css("display", "none");
                        $(this).dequeue();
                    });
                } else {
                    this.MenuObj.queue(function() {
                        LanEditor.Menu.IsShow = false;
                        $(this).css({
                            "height": "30px",
                            "display": "none"
                        });
                        $(this).delay(900).dequeue();
                    });
                }
            }
        }
    },
    //背景遮罩层对象
    Background: {
        IsShow: false,
        BackObj: null,
        //切换显示状态
        Toggle: function() {
            this.BackObj.queue([]);
            if (this.IsShow) {
                this.BackObj.queue(function() {
                    LanEditor.Background.IsShow = false;
                    $(this).css("opacity", 0);
                    $(this).delay(800).dequeue();
                });
                this.BackObj.queue(function() {
                    $(this).css("display", "none");
                    $(this).dequeue();
                });
            } else {
                this.BackObj.queue(function() {
                    LanEditor.Background.IsShow = true;
                    $(this).css("display", "block");
                    $(this).delay(1).dequeue();
                });
                this.BackObj.queue(function() {
                    $(this).css("opacity", 0.8);
                    $(this).dequeue();
                });
            }
        },
        //是否显示背景遮罩层 false不显示，true显示
        Show: function(IsShow) {
            if (IsShow) {
                this.IsShow = false;
            } else {
                this.IsShow = true;
            }
            this.Toggle();
        }
    },
    //时间对象
    Time: {
        GetTimestamp: function() {
            return Math.round(new Date().getTime() / 1000);
        },
        GetTimeString: function(timestamp) {
            var timestamp = new Date(timestamp * 1000);
            return timestamp.toLocaleString();
        }
    },
    //设置系统参数
    SetPara: {
        //提示框
        OpenSKL: null,
        //提示框动画
        OpenSKLAni: null,
        //菜单动画
        OpenMenuAni: null,
        //符号自动匹配
        OpenAutoSymbol: null,
        //插件模式，只能在初始化时由参数指定
        PluginsMode: false,
        //加载设置
        Load: function() {
            this.OpenSKL = parseInt(localStorage.OpenSKL || 1);
            this.OpenSKLAni = parseInt(localStorage.OpenSKLAni || 1);
            this.OpenMenuAni = parseInt(localStorage.OpenMenuAni || 1);
            this.OpenAutoSymbol = parseInt(localStorage.OpenAutoSymbol || 1);
        },
        //保存设置
        Save: function() {
            localStorage.OpenSKL = this.OpenSKL;
            localStorage.OpenSKLAni = this.OpenSKLAni;
            localStorage.OpenMenuAni = this.OpenMenuAni;
            localStorage.OpenAutoSymbol = this.OpenAutoSymbol;
        },
        //立马应用设置
        Apply: function() {
            $("#OpenSKL ._LESCon", $("#_LESetting")).css(function(para) {
                if (para == 1) {
                    $("#OpenSKL ._LESCon", $("#_LESetting")).children().css("left", "21px");
                    return {
                        "background-color": "#4dc4f5"
                    };
                }
                return {
                    "background-color": "#dcdada"
                };
            }(this.OpenSKL));
            $("#OpenSKLAni ._LESCon", $("#_LESetting")).css(function(para) {
                if (para == 1) {
                    $("#OpenSKLAni ._LESCon", $("#_LESetting")).children().css("left", "21px");
                    return {
                        "background-color": "#4dc4f5"
                    };
                }
                return {
                    "background-color": "#dcdada"
                };
            }(this.OpenSKLAni));
            $("#OpenMenuAni ._LESCon", $("#_LESetting")).css(function(para) {
                if (para == 1) {
                    $("#OpenMenuAni ._LESCon", $("#_LESetting")).children().css("left", "21px");
                    return {
                        "background-color": "#4dc4f5"
                    };
                }
                $("#_LEBorder").css("transition", "0s");
                return {
                    "background-color": "#dcdada"
                };
            }(this.OpenMenuAni));
            $("#OpenAutoSymbol ._LESCon", $("#_LESetting")).css(function(para) {
                if (para == 1) {
                    $("#OpenAutoSymbol ._LESCon", $("#_LESetting")).children().css("left", "21px");
                    return {
                        "background-color": "#4dc4f5"
                    };
                }
                return {
                    "background-color": "#dcdada"
                };
            }(this.OpenAutoSymbol));
        }
    },
    //扩展函数功能
    Fn: {
        FnSet: {
            keydown: [],
            keyup: [],
            render: [],
            expertmd: []
        },
        register: function(type, fn){
            for(let FnName in fn) {
                if(type == "keydown") {
                    this.FnSet.keydown.push(fn[FnName]);
                }else if(type == "keyup") {
                    this.FnSet.keyup.push(fn[FnName]);
                }else if(type == "render") {
                    this.FnSet.render.push(fn[FnName]);
                }else if(type == "expertmd") {
                    this.FnSet.expertmd.push(fn[FnName]);
                }else{
                    console.log("function "+FnName+"() not extend");
                }
            }
        }
    },
    //关键词提示信息
    Keyword: {
        //关键字集合
        Set: {

        },
        //关键字扩展
        extend: function(keyword) {
            for (let KeyName in keyword) {
                if("undefined" == typeof(this.Set[KeyName])) {
                    this.Set[KeyName] = new Array();
                }
                this.Set[KeyName] = this.Set[KeyName].concat( keyword[KeyName] );
            }
        }
    }
};

/* ----------------------------获取光标在文本框的位置-----------------------------------
 *
 * 获取输入光标在页面中的坐标 
 * 此代码段可以单独使用
 * 也可在引入LanEditor的页面全局使用
 * 使用方法 CursorPos.GetCursorPos(HTMLElement)
 * @param {HTMLElement} 输入框元素 
 * @return {Object} 返回left和top,bottom 
 *
 * ------------------------------------------------------------------------------------*/

var CursorPos = {
    GetCursorPos: function(elem) {
        if (document.selection) { //IE Support 
            elem.focus();
            var Sel = document.selection.createRange();
            return {
                left: Sel.boundingLeft,
                top: Sel.boundingTop,
                bottom: Sel.boundingTop + Sel.boundingHeight
            };
        } else {
            var that = this;
            var cloneDiv = '{$clone_div}',
                cloneLeft = '{$cloneLeft}',
                cloneFocus = '{$cloneFocus}',
                cloneRight = '{$cloneRight}';
            var none = '<span style="white-space:pre-wrap;"> </span>';
            var div = elem[cloneDiv] || document.createElement('div'),
                focus = elem[cloneFocus] || document.createElement('span');
            var text = elem[cloneLeft] || document.createElement('span');
            var offset = that._offset(elem),
                index = this._getFocus(elem),
                focusOffset = {
                    left: 0,
                    top: 0
                };
            if (!elem[cloneDiv]) {
                elem[cloneDiv] = div, elem[cloneFocus] = focus;
                elem[cloneLeft] = text;
                div.appendChild(text);
                div.appendChild(focus);
                document.body.appendChild(div);
                focus.innerHTML = '|';
                focus.style.cssText = 'display:inline-block;width:0px;overflow:hidden;z-index:-100;word-wrap:break-word;word-break:break-all;';
                div.className = this._cloneStyle(elem);
                div.style.cssText = 'visibility:hidden;display:inline-block;position:absolute;z-index:-100;word-wrap:break-word;word-break:break-all;overflow:hidden;';
            };
            div.style.left = this._offset(elem).left + "px";
            div.style.top = this._offset(elem).top + "px";
            var strTmp = elem.value.substring(0, index).replace(/</g, '<').replace(/>/g, '>').replace(/\n/g, '<br/>').replace(/\s/g, none);
            text.innerHTML = strTmp;
            focus.style.display = 'inline-block';
            try {
                focusOffset = this._offset(focus);
            } catch (e) {};
            focus.style.display = 'none';
            return {
                left: focusOffset.left,
                top: focusOffset.top,
                bottom: focusOffset.bottom
            };
        }
    },
    // 克隆元素样式并返回类 
    _cloneStyle: function(elem, cache) {
        if (!cache && elem['${cloneName}']) return elem['${cloneName}'];
        var className, name, rstyle = /^(number|string)$/;
        var rname = /^(content|outline|outlineWidth)$/; //Opera: content; IE8:outline && outlineWidth 
        var cssText = [],
            sStyle = elem.style;
        for (let name in sStyle) {
            if (!rname.test(name)) {
                let val = this._getStyle(elem, name);
                if (val !== '' && rstyle.test(typeof val)) { // Firefox 4 
                    name = name.replace(/([A-Z])/g, "-$1").toLowerCase();
                    cssText.push(name);
                    cssText.push(':');
                    cssText.push(val);
                    cssText.push(';');
                };
            };
        };
        cssText = cssText.join('');
        elem['${cloneName}'] = className = 'clone' + (new Date).getTime();
        this._addHeadStyle('.' + className + '{' + cssText + '}');
        return className;
    },
    // 向页头插入样式 
    _addHeadStyle: function(content) {
        var style = this._style[document];
        if (!style) {
            style = this._style[document] = document.createElement('style');
            document.getElementsByTagName('head')[0].appendChild(style);
        };
        style.styleSheet && (style.styleSheet.cssText += content) || style.appendChild(document.createTextNode(content));
    },
    _style: {},
    // 获取最终样式 
    _getStyle: 'getComputedStyle' in window ? function(elem, name) {
        return getComputedStyle(elem, null)[name];
    } : function(elem, name) {
        return elem.currentStyle[name];
    },
    // 获取光标在文本框的位置 
    _getFocus: function(elem) {
        var index = 0;
        if (document.selection) { // IE Support 
            elem.focus();
            var Sel = document.selection.createRange();
            if (elem.nodeName === 'TEXTAREA') { //textarea 
                var Sel2 = Sel.duplicate();
                Sel2.moveToElementText(elem);
                var index = -1;
                while (Sel2.inRange(Sel)) {
                    Sel2.moveStart('character');
                    index++;
                };
            } else if (elem.nodeName === 'INPUT') { // input 
                Sel.moveStart('character', -elem.value.length);
                index = Sel.text.length;
            }
        } else if (elem.selectionStart || elem.selectionStart == '0') { // Firefox support 
            index = elem.selectionStart;
        }
        return (index);
    },
    // 获取元素在页面中位置 
    _offset: function(elem) {
        var box = elem.getBoundingClientRect(),
            doc = elem.ownerDocument,
            body = doc.body,
            docElem = doc.documentElement;
        var clientTop = docElem.clientTop || body.clientTop || 0,
            clientLeft = docElem.clientLeft || body.clientLeft || 0;
        var top = box.top + (self.pageYOffset || docElem.scrollTop) - clientTop,
            left = box.left + (self.pageXOffset || docElem.scrollLeft) - clientLeft;
        return {
            left: left,
            top: top,
            right: left + box.width,
            bottom: top + box.height
        };
    }
};

/* -----------------------------扩展jquery函数---------------------------------
 *
 * 文本域光标操作（设置光标，选，添，删，取等）
 * 此代码段可单独使用，也可以在引入了LanEditor的页面全局使用
 * 快速开始
 * 1. 引入jquery
 * 2. 把下面的代码单独保存为一个.js文件，在需要的地方引入此文件
 * 3. $(element).iGetFieldPos();//获取光标位置
 *
 * --------------------------------------------------------------------------*/
(function($) {

    $.fn.extend({
        /*
         * 获取光标所在位置
         */
        iGetFieldPos: function() {
            var field = this.get(0);
            if (document.selection) {
                //IE
                $(this).focus();
                var sel = document.selection;
                var range = sel.createRange();
                var dupRange = range.duplicate();
                dupRange.moveToElementText(field);
                dupRange.setEndPoint('EndToEnd', range);
                field.selectionStart = dupRange.text.length - range.text.length;
                field.selectionEnd = field.selectionStart + range.text.length;
            }
            return field.selectionStart;
        },
        /*
         * 选中指定位置内字符 || 设置光标位置
         * --- 从start起选中(含第start个)，到第end结束（不含第end个）
         * --- 若不输入end值，即为设置光标的位置（第start字符后）
         */
        iSelectField: function(start, end) {
            var field = this.get(0);
            //end未定义，则为设置光标位置
            if (arguments[1] == undefined) {
                end = start;
            }
            if (document.selection) {
                //IE
                var range = field.createTextRange();
                range.moveEnd('character', -$(this).val().length);
                range.moveEnd('character', end);
                range.moveStart('character', start);
                range.select();
            } else {
                //非IE
                field.setSelectionRange(start, end);
                $(this).focus();
            }
        },
        /*
         * 选中指定字符串
         */
        iSelectStr: function(str) {
            var field = this.get(0);
            var i = $(this).val().indexOf(str);
            i != -1 ? $(this).iSelectField(i, i + str.length) : false;
        },
        /*
         * 在光标之后插入字符串
         */
        iAddField: function(str) {
            var field = this.get(0);
            var v = $(this).val();
            var len = $(this).val().length;
            if (document.selection) {
                //IE
                $(this).focus()
                document.selection.createRange().text = str;
            } else {
                //非IE
                var selPos = field.selectionStart;
                $(this).val($(this).val().slice(0, field.selectionStart) + str + $(this).val().slice(field.selectionStart, len));
                this.iSelectField(selPos + str.length);
            };
        },
        /*
         * 删除光标前面(+)或者后面(-)的n个字符
         */
        iDelField: function(n) {
            var field = this.get(0);
            var pos = $(this).iGetFieldPos();
            var v = $(this).val();
            //大于0则删除后面，小于0则删除前面
            $(this).val(n > 0 ? v.slice(0, pos - n) + v.slice(pos) : v.slice(0, pos) + v.slice(pos - n));
            $(this).iSelectField(pos - (n < 0 ? 0 : n));
        },
        /*
         * 获取光标前面 || 后面指定个数字符
         * n为负数则获取前面n个字符，正数获取后面n个字符
         */
        iGetPosStr: function(n) {
            var field = this.get(0);
            var pos = $(this).iGetFieldPos();
            var v = $(this).val();
            return (n > 0 ? v.slice(pos, pos + n) : v.slice(pos + n, pos));
        },
        /*
         * 获取前一行的空格缩进个数或是本行前面的空格缩进个数
         * 如果光标前一个字符不是换行\n || \r\n ，则获取本行前面的缩进，否则获取上一行
         */
        iGetSpaceNum: function() {
            var TextElem = $(this);
            var space = 0;
            var i = 1;
            // 如果光标前一个字符是换行，则跳过本行的换行符，查找上一行
            if (TextElem.iGetPosStr(-1) == "\n" || TextElem.iGetPosStr(-1) == "\r\n") {
                i = 2;
            }
            //计算上一行前面的空格缩进个数
            while (TextElem.iGetPosStr(-i).charAt(0) != "\n" && TextElem.iGetPosStr(-i).charAt(0) != "\r\n" && TextElem.iGetPosStr(-i).charAt(0) != "") {
                if (TextElem.iGetPosStr(-i).charAt(0) == " ") {
                    space++;
                } else if (TextElem.iGetPosStr(-i).charAt(0) == "\t") {
                    space += 4;
                } else {
                    space = 0;
                }
                ++i;
                if (i > TextElem.val().length) {
                    break;
                }
            }
            return space;
        }
    });
})(jQuery);

/* showdown source file 06-01-2015 */

var Showdown={extensions:{}},forEach=Showdown.forEach=function(a,b){if("function"==typeof a.forEach)a.forEach(b);else{var c,d=a.length;for(c=0;d>c;c++)b(a[c],c,a)}},stdExtName=function(a){return a.replace(/[_-]||\s/g,"").toLowerCase()};Showdown.converter=function(a){var b,c,d,e=0,f=[],g=[];if(this.makeHtml=function(a){return b={},c={},d=[],a=a.replace(/~/g,"~T"),a=a.replace(/\$/g,"~D"),a=a.replace(/\r\n/g,"\n"),a=a.replace(/\r/g,"\n"),a="\n\n"+a+"\n\n",a=M(a),a=a.replace(/^[ \t]+$/gm,""),Showdown.forEach(f,function(b){a=l(b,a)}),a=z(a),a=n(a),a=m(a),a=p(a),a=K(a),a=a.replace(/~D/g,"$$"),a=a.replace(/~T/g,"~"),Showdown.forEach(g,function(b){a=l(b,a)}),a},a&&a.extensions){var j=this;Showdown.forEach(a.extensions,function(a){if("string"==typeof a&&(a=Showdown.extensions[stdExtName(a)]),"function"!=typeof a)throw"Extension '"+a+"' could not be loaded.  It was either not found or is not a valid extension.";Showdown.forEach(a(j),function(a){a.type?"language"===a.type||"lang"===a.type?f.push(a):("output"===a.type||"html"===a.type)&&g.push(a):g.push(a)})})}var k,l=function(a,b){if(a.regex){var c=new RegExp(a.regex,"g");return b.replace(c,a.replace)}return a.filter?a.filter(b):void 0},m=function(a){return a+="~0",a=a.replace(/^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?[ \t]*\n?[ \t]*(?:(\n*)["(](.+?)[")][ \t]*)?(?:\n+|(?=~0))/gm,function(a,d,e,f,g){return d=d.toLowerCase(),b[d]=G(e),f?f+g:(g&&(c[d]=g.replace(/"/g,"&quot;")),"")}),a=a.replace(/~0/,"")},n=function(a){a=a.replace(/\n/g,"\n\n");return a=a.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm,o),a=a.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|style|section|header|footer|nav|article|aside)\b[^\r]*?<\/\2>[ \t]*(?=\n+)\n)/gm,o),a=a.replace(/(\n[ ]{0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,o),a=a.replace(/(\n\n[ ]{0,3}<!(--[^\r]*?--\s*)+>[ \t]*(?=\n{2,}))/g,o),a=a.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,o),a=a.replace(/\n\n/g,"\n")},o=function(a,b){var c=b;return c=c.replace(/\n\n/g,"\n"),c=c.replace(/^\n/,""),c=c.replace(/\n+$/g,""),c="\n\n~K"+(d.push(c)-1)+"K\n\n"},p=function(a){a=w(a);var b=A("<hr />");return a=a.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm,b),a=a.replace(/^[ ]{0,2}([ ]?\-[ ]?){3,}[ \t]*$/gm,b),a=a.replace(/^[ ]{0,2}([ ]?\_[ ]?){3,}[ \t]*$/gm,b),a=x(a),a=y(a),a=E(a),a=n(a),a=F(a)},q=function(a){return a=B(a),a=r(a),a=H(a),a=u(a),a=s(a),a=I(a),a=G(a),a=D(a),a=a.replace(/  +\n/g," <br />\n")},r=function(a){var b=/(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi;return a=a.replace(b,function(a){var b=a.replace(/(.)<\/?code>(?=.)/g,"$1`");return b=N(b,"\\`*_")})},s=function(a){return a=a.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,t),a=a.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?(.*?(?:\(.*?\).*?)?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,t),a=a.replace(/(\[([^\[\]]+)\])()()()()()/g,t)},t=function(a,d,e,f,g,h,i,j){void 0==j&&(j="");var k=d,l=e,m=f.toLowerCase(),n=g,o=j;if(""==n)if(""==m&&(m=l.toLowerCase().replace(/ ?\n/g," ")),n="#"+m,void 0!=b[m])n=b[m],void 0!=c[m]&&(o=c[m]);else{if(!(k.search(/\(\s*\)$/m)>-1))return k;n=""}n=N(n,"*_");var p='<a href="'+n+'"';return""!=o&&(o=o.replace(/"/g,"&quot;"),o=N(o,"*_"),p+=' title="'+o+'"'),p+=">"+l+"</a>"},u=function(a){return a=a.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,v),a=a.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,v)},v=function(a,d,e,f,g,h,i,j){var k=d,l=e,m=f.toLowerCase(),n=g,o=j;if(o||(o=""),""==n){if(""==m&&(m=l.toLowerCase().replace(/ ?\n/g," ")),n="#"+m,void 0==b[m])return k;n=b[m],void 0!=c[m]&&(o=c[m])}l=l.replace(/"/g,"&quot;"),n=N(n,"*_");var p='<img src="'+n+'" alt="'+l+'"';return o=o.replace(/"/g,"&quot;"),o=N(o,"*_"),p+=' title="'+o+'"',p+=" />"},w=function(a){function b(a){return a.replace(/[^\w]/g,"").toLowerCase()}return a=a.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm,function(a,c){return A('<h1 id="'+b(c)+'">'+q(c)+"</h1>")}),a=a.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm,function(a,c){return A('<h2 id="'+b(c)+'">'+q(c)+"</h2>")}),a=a.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm,function(a,c,d){var e=c.length;return A("<h"+e+' id="'+b(d)+'">'+q(d)+"</h"+e+">")})},x=function(a){a+="~0";var b=/^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;return e?a=a.replace(b,function(a,b,c){var d=b,e=c.search(/[*+-]/g)>-1?"ul":"ol";d=d.replace(/\n{2,}/g,"\n\n\n");var f=k(d);return f=f.replace(/\s+$/,""),f="<"+e+">"+f+"</"+e+">\n"}):(b=/(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g,a=a.replace(b,function(a,b,c,d){var e=b,f=c,g=d.search(/[*+-]/g)>-1?"ul":"ol",f=f.replace(/\n{2,}/g,"\n\n\n"),h=k(f);return h=e+"<"+g+">\n"+h+"</"+g+">\n"})),a=a.replace(/~0/,"")};k=function(a){return e++,a=a.replace(/\n{2,}$/,"\n"),a+="~0",a=a.replace(/(\n)?(^[ \t]*)([*+-]|\d+[.])[ \t]+([^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm,function(a,b,c,d,e){var f=e,g=b;return g||f.search(/\n{2,}/)>-1?f=p(L(f)):(f=x(L(f)),f=f.replace(/\n$/,""),f=q(f)),"<li>"+f+"</li>\n"}),a=a.replace(/~0/g,""),e--,a};var y=function(a){return a+="~0",a=a.replace(/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g,function(a,b,c){var d=b,e=c;return d=C(L(d)),d=M(d),d=d.replace(/^\n+/g,""),d=d.replace(/\n+$/g,""),d="<pre><code>"+d+"\n</code></pre>",A(d)+e}),a=a.replace(/~0/,"")},z=function(a){return a+="~0",a=a.replace(/(?:^|\n)```(.*)\n([\s\S]*?)\n```/g,function(a,b,c){var d=b,e=c;return e=C(e),e=M(e),e=e.replace(/^\n+/g,""),e=e.replace(/\n+$/g,""),e="<pre><code"+(d?' class="'+d+'"':"")+">"+e+"\n</code></pre>",A(e)}),a=a.replace(/~0/,"")},A=function(a){return a=a.replace(/(^\n+|\n+$)/g,""),"\n\n~K"+(d.push(a)-1)+"K\n\n"},B=function(a){return a=a.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,function(a,b,c,d){var e=d;return e=e.replace(/^([ \t]*)/g,""),e=e.replace(/[ \t]*$/g,""),e=C(e),b+"<code>"+e+"</code>"})},C=function(a){return a=a.replace(/&/g,"&amp;"),a=a.replace(/</g,"&lt;"),a=a.replace(/>/g,"&gt;"),a=N(a,"*_{}[]\\",!1)},D=function(a){return a=a.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g,"<strong>$2</strong>"),a=a.replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g,"<em>$2</em>")},E=function(a){return a=a.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm,function(a,b){var c=b;return c=c.replace(/^[ \t]*>[ \t]?/gm,"~0"),c=c.replace(/~0/g,""),c=c.replace(/^[ \t]+$/gm,""),c=p(c),c=c.replace(/(^|\n)/g,"$1  "),c=c.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm,function(a,b){var c=b;return c=c.replace(/^  /gm,"~0"),c=c.replace(/~0/g,"")}),A("<blockquote>\n"+c+"\n</blockquote>")})},F=function(a){a=a.replace(/^\n+/g,""),a=a.replace(/\n+$/g,"");for(var b=a.split(/\n{2,}/g),c=[],e=b.length,f=0;e>f;f++){var g=b[f];g.search(/~K(\d+)K/g)>=0?c.push(g):g.search(/\S/)>=0&&(g=q(g),g=g.replace(/^([ \t]*)/g,"<p>"),g+="</p>",c.push(g))}e=c.length;for(var f=0;e>f;f++)for(;c[f].search(/~K(\d+)K/)>=0;){var h=d[RegExp.$1];h=h.replace(/\$/g,"$$$$"),c[f]=c[f].replace(/~K\d+K/,h)}return c.join("\n\n")},G=function(a){return a=a.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g,"&amp;"),a=a.replace(/<(?![a-z\/?\$!])/gi,"&lt;")},H=function(a){return a=a.replace(/\\(\\)/g,O),a=a.replace(/\\([`*_{}\[\]()>#+-.!])/g,O)},I=function(a){return a=a.replace(/<((https?|ftp|dict):[^'">\s]+)>/gi,'<a href="$1">$1</a>'),a=a.replace(/<(?:mailto:)?([-.\w]+\@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi,function(a,b){return J(K(b))})},J=function(a){var b=[function(a){return"&#"+a.charCodeAt(0)+";"},function(a){return"&#x"+a.charCodeAt(0).toString(16)+";"},function(a){return a}];return a="mailto:"+a,a=a.replace(/./g,function(a){if("@"==a)a=b[Math.floor(2*Math.random())](a);else if(":"!=a){var c=Math.random();a=c>.9?b[2](a):c>.45?b[1](a):b[0](a)}return a}),a='<a href="'+a+'">'+a+"</a>",a=a.replace(/">.+:/g,'">')},K=function(a){return a=a.replace(/~E(\d+)E/g,function(a,b){var c=parseInt(b);return String.fromCharCode(c)})},L=function(a){return a=a.replace(/^(\t|[ ]{1,4})/gm,"~0"),a=a.replace(/~0/g,"")},M=function(a){return a=a.replace(/\t(?=\t)/g,"    "),a=a.replace(/\t/g,"~A~B"),a=a.replace(/~B(.+?)~A/g,function(a,b){for(var c=b,d=4-c.length%4,e=0;d>e;e++)c+=" ";return c}),a=a.replace(/~A/g,"    "),a=a.replace(/~B/g,"")},N=function(a,b,c){var d="(["+b.replace(/([\[\]\\])/g,"\\$1")+"])";c&&(d="\\\\"+d);var e=new RegExp(d,"g");return a=a.replace(e,O)},O=function(a,b){var c=b.charCodeAt(0);return"~E"+c+"E"}},"undefined"!=typeof module&&(module.exports=Showdown),"function"==typeof define&&define.amd&&define("showdown",function(){return Showdown}),"undefined"!=typeof angular&&"undefined"!=typeof Showdown&&!function(a,b){function c(){function a(){var a=new b.converter(c);this.makeHtml=function(b){return a.makeHtml(b)},this.stripHtml=function(a){return String(a).replace(/<[^>]+>/gm,"")}}var c={extensions:[],stripHtml:!0};this.setOption=function(a,b){return c.key=b,this},this.getOption=function(a){return c.hasOwnProperty(a)?c.key:null},this.loadExtension=function(a){return c.extensions.push(a),this},this.$get=function(){return new a}}function d(a){var b=function(b,c){b.$watch("model",function(b){var d;d="string"==typeof b?a.makeHtml(b):typeof b,c.html(d)})};return{restrict:"A",link:b,scope:{model:"=sdModelToHtml"}}}function e(){return function(a){return String(a).replace(/<[^>]+>/gm,"")}}a.provider("$Showdown",c).directive("sdModelToHtml",["$Showdown",d]).filter("sdStripHtml",e)}(angular.module("Showdown",[]),Showdown);

//扩展关键字提示
LanEditor.Keyword.extend({
    "js": [
        "var",
        "function",
        "break",
        "delete",
        "return",
        "typeof",
        "case",
        "do",
        "if",
        "switch",
        "catch",
        "else",
        "in",
        "this",
        "void",
        "continue",
        "false",
        "instanceof",
        "throw",
        "while",
        "debugger",
        "finally",
        "new",
        "true",
        "with",
        "default",
        "for",
        "null",
        "try"
    ],
    "css": [
        "position",
        "relative",
        "absolute",
        "margin",
        "margin-left",
        "margin-top",
        "margin-right",
        "margin-bottom",
        "padding",
        "padding-top",
        "padding-bottom",
        "padding-left",
        "padding-right",
        "border",
        "border-top",
        "border-bottom",
        "border-left",
        "border-right",
        "width",
        "min-width",
        "max-width",
        "height",
        "min-height",
        "max-height",
        "line-height",
        "font",
        "font-size",
        "font-face",
        "font-family",
        "font-style",
        "font-weight",
        "color",
        "background-color",
        "background-image",
        "box-sizing",
        "border-box",
        "content-box",
        "box-shadow",
        "text-shadow",
        "list",
        "list-style",
        "li",
        "text-decoration"
    ]
});

module.exports = LanEditor