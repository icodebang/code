/**
 *
 */
$(document).ready(function () {
    inittree();
    setTimeout(getmytags, 2000);
    $("#img1").hover(function () {
        $(this).attr("src", "//clipper.360doc.com/clippertool/pubimage/3a.gif")
    }, function () {
        $(this).attr("src", "//clipper.360doc.com/clippertool/pubimage/3.gif")
    });
    $("#img1_1").hover(function () {
        $(this).attr("src", "//clipper.360doc.com/clippertool/pubimage/3a.gif")
    }, function () {
        $(this).attr("src", "//clipper.360doc.com/clippertool/pubimage/3.gif")
    });
    $("#img3").hover(function () {
        $(this).attr("src", "//clipper.360doc.com/clippertool/pubimage/14a.gif")
    }, function () {
        $(this).attr("src", "//clipper.360doc.com/clippertool/pubimage/14.gif")
    });
    $("#img4").hover(function () {
        $(this).attr("src", "//clipper.360doc.com/clippertool/pubimage/15a.gif")
    }, function () {
        $(this).attr("src", "//clipper.360doc.com/clippertool/pubimage/15.gif")
    });
    $("#img12").hover(function () {
        $(this).attr("src", "//clipper.360doc.com/clippertool/pubimage/5a.gif")
    }, function () {
        $(this).attr("src", "//clipper.360doc.com/clippertool/pubimage/5.gif")
    });
    $("#img13").hover(function () {
        $(this).attr("src", "//clipper.360doc.com/clippertool/pubimage/6a.gif")
    }, function () {
        $(this).attr("src", "//clipper.360doc.com/clippertool/pubimage/6.gif")
    });
    $("#imggb").hover(function () {
        $(this).attr("src", "//clipper.360doc.com/clippertool/pubimage/4a.gif")
    }, function () {
        $(this).attr("src", "//clipper.360doc.com/clippertool/pubimage/4.gif")
    });
    $("#imggb_1").hover(function () {
        $(this).attr("src", "//clipper.360doc.com/clippertool/pubimage/4a.gif")
    }, function () {
        $(this).attr("src", "//clipper.360doc.com/clippertool/pubimage/4.gif")
    });
    $(".gzgkdiv li").hover(function () {
        $(this).addClass("lvbj")
    }, function () {
        $(this).removeClass("lvbj")
    });
    $("#img99").hover(function () {
        $(this).attr("src", "//clipper.360doc.com/clippertool/pubimage/20a.gif")
    }, function () {
        $(this).attr("src", "//clipper.360doc.com/clippertool/pubimage/20.gif")
    });
    $("#img98").hover(function () {
        $(this).attr("src", "//clipper.360doc.com/clippertool/pubimage/22a.gif")
    }, function () {
        $(this).attr("src", "//clipper.360doc.com/clippertool/pubimage/22.gif")
    });
    $("#maximg").hover(function () {
        $(this).attr("src", "//clipper.360doc.com/clippertool/pubimage/28.gif")
    }, function () {
        $(this).attr("src", "//clipper.360doc.com/clippertool/pubimage/28a.gif")
    });
    $("#minimg").hover(function () {
        $(this).attr("src", "//clipper.360doc.com/clippertool/pubimage/29.gif")
    }, function () {
        $(this).attr("src", "//clipper.360doc.com/clippertool/pubimage/29a.gif")
    });
    $("#divtreeresult").hover(function () {
        $(this).addClass("biaoto7")
    }, function () {
        $(this).removeClass("biaoto7")
    });
    $(".xiala").hover(function () {
        $(this).addClass("biaoto7")
    }, function () {
        $(this).removeClass("biaoto7")
    });
    if (IsIpadBrowser()) {
        document.addEventListener("touchstart", function (e) {
            HideFinishEditor()
        }, false)
    } else {
        document.body.onclick = HideFinishEditor
    }
    addSheetFile("script", "//clipper.360doc.com/js/docAreaCode.js?t=2017080801", "text/javascript", "")
});

function inittree() {
    getJSON("//clipper.360doc.com/clippertool/getnoteclipperASHX.ashx?type=5&jsoncallback=?", function (responseText) {
        responseText = responseText.html;
        if (responseText != "-1") {
            var split = responseText.split('|');
            $("#divcName").html(split[1]);
            $("#cid").val(split[0]);
            if (split[2] == "0") {
                $("#divmypremi").html("私有");
                $("#changePermission").hide();
                $("#lockPermission").show();
                $("#divmypre").hide()
            }
        } else {
            $("#divcName").html("选择存放的文件夹");
            $("#cid").val("-1")
        }
    })
}

var setting = {
    view: {selectedMulti: false},
    data: {simpleData: {enable: true}},
    edit: {enable: true, editNameSelectAll: true, showRemoveBtn: false, showRenameBtn: false},
    callback: {
        beforeDrag: BeforeDrag,
        beforeDrop: BeforeDrop,
        beforeRemove: beforeRemove,
        beforeRename: beforeRename,
        beforeEditName: beforeEditName,
        onRename: onRename,
        onDblClick: edit,
        onDrop: onDrop,
        onClick: onClick
    }
};
var newCount = 0;
var log, className = "dark", curDragNodes, autoExpandNode;

function edit() {
    var zTree = $.fn.zTree.getZTreeObj("treelist");
    nodes = zTree.getSelectedNodes();
    if (nodes == null) return;
    treeNode = nodes[0];
    if (nodes.length == 0) {
        return
    }
    if (treeNode.id != 1) {
        if (treeNode.IsLocked != "1") {
            zTree.editName(treeNode)
        } else {
            return false
        }
    }
};

function addfiles() {
    var zTree = $.fn.zTree.getZTreeObj("treelist");
    nodes = zTree.getSelectedNodes();
    treeNode = nodes[0];
    if (treeNode == null) {
        nodes = zTree.getNodes();
        treeNode = nodes[0]
    }
    if (treeNode.IsHaveChildren == "0") {
        alert("该文件夹不支持添加、删除、移动，换个文件夹试试吧！");
        return false
    }
    var Visible = treeNode.IsVisible;
    getJSON("//clipper.360doc.com/clippertool/getnoteclipperASHX.ashx?type=2&jsoncallback=?", function (responseText) {
        responseText = responseText.html;
        if (responseText == "0") {
            treeNode = zTree.addNodes(treeNode, {
                id: (++newCount),
                pId: treeNode.id,
                IsVisible: Visible,
                isParent: false,
                name: "未命名",
                iconSkin: "pIcon01"
            });
            if (treeNode[0].pId == "1") {
                var nodes1 = zTree.getNodes();
                zTree.moveNode(nodes1[0].children[nodes1[0].children.length - 3], treeNode[0], "prev")
            }
            if (treeNode) {
                zTree.editName(treeNode[0])
            }
        } else {
            alert("文件夹数目不能超过800个！")
        }
    })
};isOver = true;

function BeforeDrag(treeId, treeNodes) {
    if (treeNodes[0].IsLocked == "1") {
        if (treeNodes[0].id == "-1000") {
            if (isOver == true) {
                isOver = false;
                alert("该文件夹不支持添加、删除、移动，换个文件夹试试吧！")
            }
            isOver = true;
            return false
        } else if (treeNodes[0].id == "-2000") {
            if (isOver == true) {
                isOver = false;
                alert("“私有文章”及其子文件夹不能移动到公开文件夹内，换个文件夹试试吧！")
            }
            isOver = true;
            return false
        }
    } else {
        isOver = true;
        return true
    }
}

function BeforeDrop(treeId, treeNodes, targetNode, moveType) {
    if ((treeNodes[0].IsVisible == "0" && targetNode.IsVisible == "0" && targetNode.id == "-2000" && moveType != "inner") || (treeNodes[0].IsVisible == "0" && targetNode.IsVisible == "1")) {
        alert("“私有文章”及其子文件夹不能移动到公开文件夹内，换个文件夹试试吧！");
        return false
    } else if (((treeNodes[0].IsVisible == "1" && targetNode.IsVisible == "1") || (treeNodes[0].IsVisible == "0" && targetNode.IsVisible == "0")) && (targetNode.id != "-1000")) {
        return true
    } else if (targetNode.id == "-2000" || targetNode.id == "-1000" || targetNode.IsVisible == "0") {
        alert("“待分类”、“私有文章”不接收文件夹移入，换个文件夹试试吧！");
        return false
    } else {
        alert("不能移动！");
        return false
    }
}

function beforeEditName(treeId, treeNode) {
    if (treeNode.IsLocked == "1") {
        return false
    }
    if (treeNode.id == 1) return false
}

function beforeRename(treeId, treeNode, newName) {
    if (treeNode.id == 1) return false;
    var istrue = true;
    if (newName.length == 0) {
        alert("文件夹名称不能为空！");
        istrue = false
    }
    if (newName.replace(/[^\x00-\xff]/g, "**").length > 40) {
        alert("文件夹名最长40个英文或者20个汉字！！");
        istrue = false
    }
    if (!istrue) {
        var zTree = $.fn.zTree.getZTreeObj("treelist");
        setTimeout(function () {
            zTree.editName(treeNode)
        }, 10);
        return false
    }
    return true
}

function onRename(e, treeId, treeNode) {
    getJSON("//clipper.360doc.com/clippertool/getnoteclipperASHX.ashx?type=3&jsoncallback=?", {
        cname: "" + encodeURI(treeNode.name.replace(/\+/g, "%2B").replace(/\&/g, "%26")) + "",
        pid: "" + treeNode.pId + "",
        cid: "" + treeNode.id + ""
    }, function (responseText) {
        responseText = responseText.html;
        if (responseText != "") {
            alert(responseText)
        }
    })
}

function onDrop(event, treeId, treeNodes, targetNode, moveType) {
    var preid;
    var nextid;
    if (moveType != null) {
        if (treeNodes[0].getNextNode() == null) {
            nextid = '0'
        } else {
            nextid = treeNodes[0].getNextNode().id
        }
        if (treeNodes[0].getPreNode() == null) {
            preid = '0'
        } else {
            preid = treeNodes[0].getPreNode().id;
            if (preid == "-1000" || preid == "-2000") {
                var treeObj = $.fn.zTree.getZTreeObj(treeId);
                var nodes = treeObj.getNodes();
                treeObj.moveNode(nodes[0].children[nodes[0].children.length - 3], treeNodes[0], "prev");
                nextid = "-2000";
                preid = nodes[0].children[nodes[0].children.length - 4].id
            }
        }
        getJSON("//clipper.360doc.com/clippertool/getnoteclipperASHX.ashx?type=9" + "&cid=" + treeNodes[0].id + "&pid=" + treeNodes[0].pId + "&preid=" + preid + "&nid=" + nextid + "&jsoncallback=?", function (responseText) {
            responseText = responseText.html;
            if (responseText != "") {
                alert(responseText)
            }
        })
    }
}

function defaultFiles() {
    var zTree = $.fn.zTree.getZTreeObj("treelist");
    nodes = zTree.getSelectedNodes();
    if (nodes == null || nodes[0] == null) alert("请先选择文件夹，再设置为“默认文件夹”！\r\n保存文章时，如果不指定文件夹，文章将自动保存到默认文件夹中。");
    treeNode = nodes[0];
    if (treeNode.id != 1 && treeNode.pId == 1) {
        if (confirm('将“' + treeNode.name + '”设为默认文件夹吗？\r\n保存文章时，如果不指定文件夹，文章将自动保存到默认文件夹中！')) {
            if (treeNode != null && treeNode.id != 1) {
                getJSON("//clipper.360doc.com/clippertool/getnoteclipperASHX.ashx?type=4&jsoncallback=?", {cid: "" + treeNode.id + ""}, function (responseText) {
                    responseText = responseText.html;
                    if (responseText != "") {
                        alert(responseText)
                    } else {
                        treeNode1 = zTree.getNodeByParam("iconSkin", "pIcon02", null);
                        if (treeNode1) {
                            treeNode1.iconSkin = "pIcon01";
                            zTree.updateNode(treeNode1)
                        }
                        treeNode.iconSkin = "pIcon02";
                        zTree.updateNode(treeNode)
                    }
                })
            }
        }
    } else {
        alert("只能将一级文件夹设为默认文件夹！")
    }
}

function deletefiles() {
    var zTree = $.fn.zTree.getZTreeObj("treelist");
    nodes = zTree.getSelectedNodes();
    treeNode = nodes[0];
    if (treeNode) {
        zTree.removeNode(treeNode, true)
    } else {
        alert("请先选择文件夹再删除！")
    }
}

function beforeRemove(treeId, treeNode) {
    if (treeNode.IsLocked == "1") {
        if (treeNode.IsHaveChildren == "0") {
            alert("该文件夹不支持添加、删除、移动，换个文件夹试试吧！")
        } else {
            alert("该文件夹不支持删除、移动，换个文件夹试试吧！")
        }
        return false
    }
    if (treeNode.id == 1) return false;
    if (confirm('删除文件夹将删除此目录下的所有子文件夹，确定删除吗？')) {
        getJSON("//clipper.360doc.com/clippertool/getnoteclipperASHX.ashx?type=7&cid=" + treeNode.id + "&jsoncallback=?", function (responseText) {
            responseText = responseText.html;
            if (responseText != "") {
                alert(responseText)
            } else {
                var zTree = $.fn.zTree.getZTreeObj("treelist");
                zTree.removeNode(treeNode);
                if ($("#cid").val() == treeNode.id) {
                    $("#cid").val("-1")
                }
            }
        })
    }
    return false
}

function onClick(event, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("treelist");
    if (treeNode.id && treeNode.id != 1) {
        zTree.expandNode(treeNode)
    }
    var selectedNode = zTree.getSelectedNodes();
    if (selectedNode[0].IsVisible == "0") {
        getJSON("//clipper.360doc.com/clippertool/OP360docCookie.ashx?type=2&cookieName=360docPteCatTip&jsoncallback=?", function (responseText) {
            responseText = responseText.html;
            if (responseText != "1") {
                getJSON("//clipper.360doc.com/clippertool/OP360docCookie.ashx?type=1&cookieName=360docPteCatTip&cookieValue=1&cookieExpires=7200&jsoncallback=?", function (responseText) {
                    responseText = responseText.html;
                    if (responseText == "1") {
                        alert("保存/移入“私有文章”文件夹下，文章权限将自动变为私有！")
                    }
                })
            }
        });
        $("#changePermission").hide();
        $("#lockPermission").show();
        $("#divmypre").hide()
    } else {
        $("#changePermission").show();
        $("#lockPermission").hide();
        $("#divmypre").hide()
    }
    if (treeNode.id) {
        if (treeNode.id == 1) {
            $("#divcName").html("选择存放的文件夹");
            $("#cid").val("-1");
            zTree.cancelSelectedNode()
        } else {
            $("#divcName").html(cutString(treeNode.name, 19));
            $("#cid").val(treeNode.id)
        }
        $("#divtreeresult").removeClass("biaoto5");
        $("#divctree").removeClass("biaoto6")
    }
    stopBubble(event)
}

var isFirst = true;

function showFileDiv() {
    if ($("#divctree").css('display') == 'block') $("#divctree").hide(); else $("#divctree").show();
    $("#divtagsel").hide();
    $("#divmypre").hide();
    hidetagdiv();
    if (isFirst) {
        try {
            getJSON("//clipper.360doc.com/clippertool/getnoteclipperASHX.ashx?type=1&jsoncallback=?", function (responseText) {
                responseText = responseText.html;
                var iTemp = responseText.indexOf("]");
                newCount = responseText.substr(iTemp + 1);
                var date = eval(responseText.substr(0, iTemp + 1));
                for (var i = 0; i < date.length; i++) {
                    date[i].name = unescape(date[i].name)
                }
                $.fn.zTree.init($("#treelist"), setting, date);
                if (document.getElementById("treelist_1_a") != null && document.getElementById("treelist_1_switch") != null) {
                    document.getElementById("treelist_1_a").parentNode.removeChild(document.getElementById("treelist_1_a"));
                    document.getElementById("treelist_1_switch").parentNode.removeChild(document.getElementById("treelist_1_switch"))
                }
                var treeObj = $.fn.zTree.getZTreeObj("treelist");
                var treeNode1 = treeObj.getNodeByParam("iconSkin", "pIcon02", null);
                if (treeNode1) {
                    treeObj.selectNode(treeNode1)
                }
                $("#img5").hover(function () {
                    $(this).attr("src", "//clipper.360doc.com/clippertool/pubimage/18a.png")
                }, function () {
                    $(this).attr("src", "//clipper.360doc.com/clippertool/pubimage/18.png")
                });
                $("#img6").hover(function () {
                    $(this).attr("src", "//clipper.360doc.com/clippertool/pubimage/16a.png")
                }, function () {
                    $(this).attr("src", "//clipper.360doc.com/clippertool/pubimage/16.png")
                });
                $("#img7").hover(function () {
                    $(this).attr("src", "//clipper.360doc.com/clippertool/pubimage/17a.png")
                }, function () {
                    $(this).attr("src", "//clipper.360doc.com/clippertool/pubimage/17.png")
                });
                isFirst = false
            })
        } catch (ex) {
            alert(ex.message)
        }
    }
}

function onFailed() {
}

function hiddendivtree() {
    $("#divctree").hide()
}

function showmypre() {
    if ($("#divmypre").css("display") == "none") {
        $("#divbtn").hide();
        $("#divmypre").show();
        $("#divctree").hide();
        $("#divtagsel").hide();
        $(".main360docclipper .doc-tags").removeClass("doc-tags-expand");
        $("#divmypre li").click(function () {
            $("#divmypremi").html(this.title);
            $("#divmypre").hide();
            $("#divbtn").show()
        })
    } else {
        $("#divmypre").hide();
        $("#divbtn").show()
    }
}

function showtagsel() {
    if ($("#divtagsel").css("display") == "none") {
        $("#divtagsel").show();
        $("#divmypre").hide();
        $("#divctree").hide();
        $("#divbtn").show();
        $(".main360docclipper .doc-tags").removeClass("doc-tags-expand");
        $("#divtagsel li").click(function () {
            $("#divtagtxt").html(this.title);
            $("#divtagsel").hide();
            if (this.title == "关键词") {
                $("#divtags").show();
                $("#divabs").hide()
            } else {
                $("#divabs").show();
                $("#divtags").hide()
            }
        })
    } else {
        $("#divtagsel").hide()
    }
}

function showtagdiv() {
    $(".main360docclipper .doc-tags").addClass("doc-tags-expand");
    $("#divbtn").hide();
    $("#divctree").hide();
    $("#divmypre").hide();
    $("#divtagsel").hide();
    if ($.trim($("#txttags").val()) != "最多添加5个关键词") $("#txttags").focus()
}

function hidetagdiv() {
    $(".main360docclipper .doc-tags").removeClass("doc-tags-expand");
    $("#divbtn").show()
}

function confirmtags() {
    var evt = null;
    if (window.event) {
        evt = window.event
    } else {
        evt = SearchEvent()
    }
    var isShowIS = false;
    var keyCode = evt.keyCode;
    switch (keyCode) {
        case 32:
            var tag = $("#txttags").val();
            var CaretPos = getCursortPosition("txttags");
            var ss = $("#txttags").val().substring(CaretPos - 1, CaretPos);
            if (ss == " ") {
                showtags()
            }
            break;
        case 13:
            showtags();
            break
    }
}

function autoconfirmtags() {
    var tag = $("#txttags").val();
    if (tag.length > 0 && tag != "最多添加5个关键词" && tag != "添加关键词，用空格或回车分隔") {
        showtags()
    }
}

function showtags() {
    if ($(".doc-tagme li").length < 6) {
        var strtag = "";
        var CaretPos = getCursortPosition("txttags");
        if (CaretPos > 0) {
            strtag = $("#txttags").val().substring(0, CaretPos) + " "
        } else {
            strtag = $("#txttags").val() + " "
        }
        var str1 = "";
        var iTemp = 0;
        if ($.trim(strtag) != "") {
            iTemp = strtag.indexOf(" ");
            while (iTemp > 0) {
                if ($(".doc-tagme li").length < 6) {
                    str1 = strtag.substring(0, iTemp);
                    if ($.trim(str1).gblen() > 20) str1 = str1.gbtrim(20);
                    if ($.trim(str1) != "") {
                        $("#txttags").parent("li").before("<li class=\"doc-item\" title=\"" + $.trim(str1) + "\">" + $.trim(str1) + "&nbsp;&nbsp;<img src=\"//clipper.360doc.com/clippertool/pubimage/19.gif\" style=\"cursor:pointer\" onclick=\"deletetags(this)\"/></li>")
                    }
                    strtag = $.trim(strtag.substring(iTemp)) + " ";
                    iTemp = strtag.indexOf(" ")
                } else {
                    break
                }
            }
            if ($(".doc-tagme li").length < 6) {
                if (CaretPos > 0) {
                    $("#txttags").val($("#txttags").val().substring(CaretPos))
                } else {
                    $("#txttags").val("")
                }
            } else {
                $("#txttags").val("最多添加5个关键词");
                $("#txttags").css("color", "#b2b2b2");
                $("#txttags").blur()
            }
        }
    } else {
        $("#txttags").val("最多添加5个关键词");
        $("#txttags").css("color", "#b2b2b2");
        $("#txttags").blur()
    }
}

function getCursortPosition(ctrl) {
    var CaretPos = 0;
    ctrl = document.getElementById(ctrl);
    if (document.selection) {
        ctrl.focus();
        var Sel = document.selection.createRange();
        Sel.moveStart('character', -ctrl.value.length);
        CaretPos = Sel.text.length
    } else if (ctrl.selectionStart || ctrl.selectionStart == '0') CaretPos = ctrl.selectionStart;
    return (CaretPos)
}

function addtags(obj) {
    if ($(".doc-tagme li").length < 6) {
        if ($.trim($(obj).html()) != "") {
            $("#txttags").parent("li").before("<li class=\"doc-item\" title=\"" + $.trim($(obj).html()) + "\">" + $.trim($(obj).html()) + "&nbsp;&nbsp;<img src=\"//clipper.360doc.com/clippertool/pubimage/19.gif\" style=\"cursor:pointer\" onclick=\"deletetags(this)\"/></li>");
            $("#txttags").val("")
        }
    } else {
        $("#txttags").val("最多添加5个关键词");
        $("#txttags").css("color", "#b2b2b2");
        $("#txttags").blur()
    }
}

function SearchEvent() {
    func = SearchEvent.caller;
    while (func != null) {
        var arg0 = func.arguments[0];
        if (arg0) {
            if (typeof(arg0) == "object") {
                return arg0
            }
        }
        func = func.caller
    }
    return func
}

function deletetags(obj) {
    showtagdiv();
    $(obj).parent("li").remove();
    if ($("#txttags").val() == "最多添加5个关键词") {
        $("#txttags").val("")
    }
    $("#txttags").focus()
}

function IsIpadBrowser() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    return bIsIpad
}

function HideFinishEditor() {
    $("#divctree").hide();
    $("#divtagsel").hide();
    $("#divmypre").hide();
    hidetagdiv();
    $("#divtreeresult").removeClass("biaoto5");
    $("#divctree").removeClass("biaoto6")
}

function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null
}

function setCookie(name, value, Hours) {
    var d = new Date();
    var offset = 8;
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var nd = utc + (3600000 * offset);
    var exp = new Date(nd);
    exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString() + ";domain=360doc.com;"
}

function saveArt(obj, e) {
    try {
        if (parent.extractcontent == document.getElementById("editcontent").innerHTML && parent.extractcontent.length > 0) {
            $("#arttype").val("0")
        } else {
            $("#arttype").val("1")
        }
    } catch (err) {
    }
    try {
        $("#divsave").html("<img src=\"//clipper.360doc.com/clippertool/pubimage/6.gif\"/>");
        $(".saveload").show();
        var strper = $("#divmypremi").html();
        if (document.getElementById("lockPermission") != null && document.getElementById("lockPermission").style.display != "none") {
            strper = "1"
        } else {
            if (strper == "公众公开") {
                strper = "0"
            } else if (strper == "私有") {
                strper = "1"
            } else if (strper == "好友公开") {
                strper = "2"
            }
        }
        var tags = $("#divtags li");
        var strtags = "";
        for (var i = 0; i < tags.length - 1; i++) {
            strtags += $(tags[i]).attr("title") + ","
        }
        var strURL = document.URL;
        var strabs = $.trim($("#txtabs").val());
        if (strabs == "添加摘要") {
            strabs = ""
        }
        var strtitle = $.trim($("#clippertitle").html().replace("<br/>", "").replace("<br>", ""));
        var strcontent = $.trim($("#editcontent").html());
        try {
            var divabc = document.createElement("div");
            divabc.id = "test360doc2";
            divabc.innerHTML = strcontent;
            divabc.style.display = "none";
            document.body.appendChild(divabc);
            parent.needJudgeTitle = true;
            parent.removeNodeList = [];
            parent.deleteScript(divabc);
            parent.dom(divabc);
            for (var i = 0; i < parent.removeNodeList.length; i++) {
                if (parent.removeNodeList[i].nodeName.toLowerCase() == "iframe" && strURL.indexOf("mp.weixin.qq.com") > -1 && parent.removeNodeList[i].className == "video_iframe") {
                    diviframe = document.createElement("embed");
                    diviframe.src = parent.removeNodeList[i].src;
                    try {
                        diviframe.width = parent.removeNodeList[i].width;
                        diviframe.height = parent.removeNodeList[i].height
                    } catch (err) {
                    }
                    parent.removeNodeList[i].parentNode.replaceChild(diviframe, parent.removeNodeList[i])
                } else {
                    if (parent.removeNodeList[i].parentNode) parent.removeNodeList[i].parentNode.removeChild(parent.removeNodeList[i])
                }
            }
            parent.removeNodeList = [];
            strcontent = divabc.innerHTML;
            if (divabc.parentNode != null) divabc.parentNode.removeChild(divabc)
        } catch (err) {
        }
        $("#title").val(URLencode(strtitle));
        $("#artcontent").val(URLencode(strcontent));
        $("#abstract").val(URLencode(strabs));
        $("#url").val(encodeURIComponent(strURL));
        $("#tags").val(URLencode(strtags));
        $("#permission").val(escape(strper));
        if (strtitle == "") {
            shaninfo("clippertitle", "biaoto2", "biaoto3");
            return
        }
        if ($("#editcontent").html() == "" || $("#editcontent").text().indexOf("请选中你要保存的内容，粘贴到此文本框") >= 0 && $("#editcontent").text().length < 150) {
            shaninfo("editcontent", "biaoto2", "biaoto3");
            return
        }
        if ($("#cid").val() == "-1" || $("#cid").val() == "1" || $("#cid").val() == "0") {
            stopBubble(e);
            if ($("#divctree").css('display') != 'block') {
                showFileDiv();
                getJSON("//clipper.360doc.com/clippertool/helpnewlog.ashx?type=5&jsoncallback=?")
            }
            $(".treeerror").show();
            shaninfo("divctree", "biaoto4", "biaoto6");
            return
        }
        getJSON("//clipper.360doc.com/clippertool/valideUser.ashx?type=2&jsoncallback=?", function (responseText) {
            if (responseText.html == "-100" && strper == "0") {
                $("#backgroundPopup1").show();
                addSheetFile("link", "//clipper.360doc.com/clippertool/css/AlertCeng.css?t=20160301501", "text/css", "stylesheet");
                $("#valideMobile").html("<div class=\"doc360cengwh doc360cwh2\" style=\"height:390px;_overflow:hidden\"><div class=\"doc360cengbj\"><div class=\"doc360cengleft\">身份验证</div></div><div class=\"doc360shimingyaoqiu\" style=\"display:block;\"><dl><dt><img src=\"//clipper.360doc.com/clippertool/pubimage/gantanhao1.jpg\" /></dt><dd><p>根据国家实名制法规要求，请尽快进行手机验证！</p></dd><dd><p>如果未进行手机验证，你发表的文章将不予公开！</p></dd></dl></div><div style=\"clear: both;height:25px;\"></div><div class=\"doc360yanzhengma\" id=\"oneStep\" style=\"display:block;\"><div class=\"doc360yanzheng_box\"><div class=\"doc360yanzheng_txt\">手机号：</div><div class=\"doc360guanming_box\" style=\"position:relative;z-index: 30;\"><input style=\"padding-left:5px;text-indent: 88px;position: absolute;color:#555;\" id=\"mobileNumber\" name=\"\" type=\"text\" /><div id=\"selectedCountry\" class=\"doc360newWorld\"><span id=\"selectedCountryTxt\" areaen=\"China\">中国大陆</span></div><div id=\"allCountry\" class=\"doc360newWorld doc360country\" style=\"display: none;width: 150px;\"></div></div></div><div style=\"clear: both;\"></div><div class=\"doc360yanzheng_box\"><div class=\"doc360yanzheng_txt\">验证码：</div><div id=\"red\" style=\"display:none;\">按住滑块，拖动到最右边填写验证码</div><div id=\"divverifycode\" class=\"doc360guanming_box\" style=\"display:block;\"><input style=\"padding-left:5px;color:#555;position:absolute;ime-mode:disabled;\" id=\"checkCode\" name=\"\" value=\"\" type=\"text\" /><div class=\"doc360yanzheng_imgs\"><a href=\"javascript:void(0);\" onclick=\"changeImg();\" class=\"doc360fuceng_yanzeng\"><img id=\"imgCheckCode\" class=\"doc360img_yanzheng\" alt=\"验证码\" style=\"width: 63px; height:34px;_height:32px;\" /></a></div></div></div><div style=\"clear: both;\"></div><div class=\"doc360next_box\"><div onclick=\"sendMsg();\" class=\"doc360next\"style=\"margin-top: 16px; _margin-top: 8px;\">立即验证</div></div></div><div style=\"clear: both;\"></div><div class=\"doc360siyou_box\" id=\"privateOperation\"><p>如果不进行手机验证，你的文章只能私有保存！</p><div class=\"doc360siyoubtn_box\" style=\"margin-left:156px;\" onclick=\"saveAsPrivateArt()\"><a href=\"javascript:void(0);\"></a></div></div><div id=\"twoStep\" class=\"doc360duanxin_box\" style=\"display: none;\"><p class=\"doc360shuru_txt\">请输入<span id=\"SendMobile\"></span>收到的短信校验码</p><div class=\"doc360xiaoyanma_box\"><div class=\"doc360yanzheng_txt doc360left\">校验码:</div><div class=\"doc360yanzheng_txt_iptbox doc360left\"><input style=\"padding-left:5px;color:#555\" type=\"text\" name=\"\" id=\"verifycode\" value=\"\" /></div><div class=\"doc360again_box doc360again_box1 doc360left\" id=\"CountDowm\"><span id=\"seconds\" class=\"doc360again_num\">60</span>秒后重发</div><div class=\"doc360again_box doc360again_box2\" id=\"reSendMsg\" onclick=\"resendmsg();\">重发短信校验码</div></div><div style=\"clear: both;\"></div><div class=\"doc360next\" onclick=\"mobilereg();\">确定</div><div class=\"doc360After\" onclick=\"returnFirstStep();\">返回上一步</div> </div><br /><br /><br /></div><input id=\"HiddenCode\" type=\"hidden\" value=\"\" /><input id=\"HiddenSendTime\" type=\"hidden\" value=\"\" /><input type=\"hidden\" value=\"\" id=\"AreaCode\" autocomplete=\"off\" />");
                changeImg();
                $("#valideMobile").show();
                areaCodeList = new docAreaCode({
                    target: "allCountry",
                    selectedTxt: "selectedCountryTxt",
                    hideAreaCode: "AreaCode",
                    selectedCountry: "selectedCountry"
                });
                areaCodeList.creat()
            } else {
                var myForm = $("#myform");
                $(myForm).submit();
                parent.closelayer()
            }
        })
    } catch (err) {
    }
}

function URLencode(sStr) {
    return encodeURI(sStr).replace(/\+/g, '%2B').replace(/\"/g, '%22').replace(/\'/g, '%27').replace(/\//g, '%2F')
}

function shaninfo(divname, css1, css2) {
    var oBox2 = document.getElementById(divname);
    var timer = null;
    var i = 0;
    clearInterval(timer);
    timer = setInterval(function () {
        $("#" + divname).addClass(css1);
        i++ % 2 ? $("#" + divname).removeClass(css1) : $("#" + divname).addClass(css1);
        if (i > 6) {
            if (divname == "divctree") {
                $(".treeerror").hide();
                $("#divtreeresult").addClass("biaoto5")
            }
            $("#" + divname).removeClass(css1).addClass(css2);
            clearInterval(timer);
            $(".saveload").hide();
            $("#divsave").html("<img src=\"//clipper.360doc.com/clippertool/pubimage/6.gif\" onclick=\"saveArt(this,event);\" style=\"cursor:pointer\"/>")
        }
    }, 100)
}

function clearclss(divname, css) {
    $("#" + divname).removeClass(css)
}

$("#clippertitle").click(function () {
    clearclss("clippertitle", "biaoto3")
});
$("#editcontent").click(function () {
    clearclss("editcontent", "biaoto3")
});
var CbTable = new Hashtable();

function getJSON(url, data, cb) {
    var jsc = now();
    if (IsFunc(data)) {
        cb = data;
        data = null
    }
    var cbName = "jsonp" + jsc;
    var src = url.replace("jsoncallback=?", "jsoncallback=" + cbName);
    var IsSrcHaveParams = (src.indexOf("?") > 0 || src.indexOf("&") > 0);
    for (var key in data) {
        src += "&" + key + "=" + encodeURIComponent(data[key])
    }
    var script = document.createElement("script");
    script.setAttribute("language", "Javascript");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", src);
    script.setAttribute("id", cbName);
    getHead().appendChild(script);
    if (cb != null) {
        CbTable.add(cbName, cb)
    }
}

function OnJSONPResp(obj, cbName) {
    if (CbTable == undefined) {
        CbTable = new Hashtable()
    }
    var scItem = document.getElementById(cbName);
    var cbFunc = CbTable.getItem(cbName);
    if (cbFunc != null) {
        cbFunc(obj);
        CbTable.remove(cbName)
    }
    if (scItem) {
        getHead().removeChild(scItem)
    }
};

function now() {
    return +new Date
};

function IsFunc(data) {
    return ((typeof(data)).toString() == "function")
};

function getHead() {
    return document.documentElement.getElementsByTagName("HEAD")[0]
};

function Hashtable() {
    this._hash = {};
    this._count = 0;
    this.add = function (key, value) {
        if (this._hash.hasOwnProperty(key)) return false; else {
            this._hash[key] = value;
            this._count++;
            return true
        }
    };
    this.remove = function (key) {
        delete this._hash[key];
        this._count--
    };
    this.count = function () {
        return this._count
    };
    this.items = function (key) {
        if (this.contains(key)) return this._hash[key]
    };
    this.contains = function (key) {
        return this._hash.hasOwnProperty(key)
    };
    this.clear = function () {
        this._hash = {};
        this._count = 0
    };
    this.getItem = function (key) {
        if (this.contains(key)) {
            return this._hash[key]
        } else {
            return null
        }
    }
}

function closeFull() {
    document.getElementById("main360docdiv").style.display = "none"
}

function test() {
    var myForm = $("#myform");
    $(myForm).submit()
}

function HTMLEncode(e) {
    var t = "", n = e.length, r = navigator.userAgent.toLowerCase(),
        i = /msie/.test(r) ? parseFloat(r.match(/msie ([\d.]+)/)[1]) : !1;
    if (i >= 7) for (var s = 0; s < n; s++) t += e.charCodeAt(s) + " "; else for (var s = 0; s < e.length; s++) {
        var o = e.charCodeAt(s), u = e[s];
        o > 127 ? t += "&#" + o + ";" : u == ">" ? t += "&gt;" : u == "<" ? t += "&lt;" : u == "&" ? t += "&amp;" : t += e.charAt(s)
    }
    return t
}

function cancelselect(obj, e) {
    var zTree = $.fn.zTree.getZTreeObj("treelist");
    zTree.cancelSelectedNode();
    $("#divcName").html("选择存放的文件夹");
    $("#cid").val("-1")
}

function stopBubble(e) {
    if (e && e.stopPropagation) e.stopPropagation(); else window.event.cancelBubble = true
}

String.prototype.gblen = function () {
    var len = 0;
    for (var i = 0; i < this.length; i++) {
        if (this.charCodeAt(i) > 127 || this.charCodeAt(i) == 94) {
            len += 2
        } else {
            len++
        }
    }
    return len
};
String.prototype.gbtrim = function (len, s) {
    var str = '';
    var sp = s || '';
    var len2 = 0;
    for (var i = 0; i < this.length; i++) {
        if (this.charCodeAt(i) > 127 || this.charCodeAt(i) == 94) {
            len2 += 2
        } else {
            len2++
        }
    }
    if (len2 <= len) {
        return this
    }
    len2 = 0;
    len = (len > sp.length) ? len - sp.length : len;
    for (var i = 0; i < this.length; i++) {
        if (this.charCodeAt(i) > 127 || this.charCodeAt(i) == 94) {
            len2 += 2
        } else {
            len2++
        }
        if (len2 > len) {
            str += sp;
            break
        }
        str += this.charAt(i)
    }
    return str
};

function gobigsaveart(obj) {
    var strper = $("#divmypremi").html();
    if (strper == "公众公开") {
        strper = "0"
    } else if (strper == "私有") {
        strper = "1"
    } else if (strper == "好友公开") {
        strper = "2"
    }
    var tags = $("#divtags li");
    var strtags = "";
    for (var i = 0; i < tags.length - 1; i++) {
        strtags += $(tags[i]).attr("title") + ","
    }
    var strURL = document.URL;
    var strabs = $.trim($("#txtabs").val());
    if (strabs == "添加摘要") {
        strabs = ""
    }
    var strtitle = $.trim($("#clippertitle").html());
    var strcontent = $.trim($("#editcontent").html());
    if (strcontent.indexOf("请选中你要保存的内容，粘贴到此文本框") >= 0) {
        strcontent = ""
    }
    $("#title1").val(URLencode(strtitle));
    $("#artcontent1").val(URLencode(strcontent));
    $("#abstract1").val(URLencode(strabs));
    $("#url1").val(encodeURIComponent(strURL));
    $("#tags1").val(URLencode(strtags));
    $("#permission1").val(escape(strper));
    $("#cid1").val(escape($("#cid").val()));
    parent.closeFull();
    return true
}

function getmytags() {
    getJSON("//clipper.360doc.com/clippertool/getnoteclipperASHX.ashx?type=8&jsoncallback=?", function (responseText) {
        responseText = responseText.html;
        if (responseText != "") {
            $("#divmytags").html(responseText)
        } else {
            $("#divmytags").hide()
        }
    })
}

function addSheetFile(ref, path, type, rel) {
    var fileref = document.createElement(ref);
    fileref.rel = rel;
    fileref.type = type;
    if (rel == "") {
        fileref.src = path
    } else {
        fileref.href = path
    }
    var headobj = document.getElementsByTagName('head')[0];
    headobj.appendChild(fileref)
}

function refreshSwatch() {
    var red = $("#red").slider("value");
    if (parseInt($("#red").slider("value")) < 84) {
        $("#red").slider("value", 0)
    } else {
        $("#red").unbind();
        $("#red .ui-slider-handle").css({"background-image": "url(//clipper.360doc.com/clippertool/pubimage/index22.gif)"});
        setTimeout(function () {
            $("#red").hide();
            $("#divverifycode").show();
            $("#checkCode").focus();
            changeImg()
        }, 500)
    }
}

function closeValideFrame() {
    document.getElementById("valideMobile").style.display = "none";
    document.getElementById("backgroundPopup1").style.display = "none"
}

function changeImg() {
    document.getElementById("imgCheckCode").src = "//clipper.360doc.com/clippertool/VerifyCode.aspx?type=1&t=?" + Math.random()
}

function checkAllInfo() {
    if ($("#mobileNumber").val() == "" || $("#mobileNumber").val() == " 手机号") {
        alert("手机号不能为空！");
        return false
    }
    if (!isMobileNum($("#mobileNumber").val())) {
        alert("请输入正确的手机号！");
        return false
    }
    if ($("#checkCode").val() == "" || $("#checkCode").val() == " 验证码") {
        alert("验证码不能为空！");
        return false
    }
    return true
}

function isMobileNum(value) {
    var patrn2 = new RegExp("^[0-9]{7,11}$");
    var patrn3 = new RegExp("^1[0-9]{10}$");
    if (!patrn2.exec(value)) {
        return false
    } else {
        if ($("#selectedCountryTxt").html() == "中国大陆" && !patrn3.exec(value)) {
            return false
        } else {
            return true
        }
    }
}

function sendMsg() {
    if (checkAllInfo()) {
        getJSON("//clipper.360doc.com/clippertool/verifycode.ashx?type=1&code=" + encodeURI($.trim($("#checkCode").val())) + "&jsoncallback=?", function (responseText) {
            if (responseText.html == "3") {
                realSendMsg();
                timecount();
                $("#SendMobile").html($("#mobileNumber").val());
                $("#oneStep").hide();
                $("#privateOperation").hide();
                $("#HiddenSendTime").val(new Date().getTime());
                $("#twoStep").show();
                document.getElementById("verifycode").focus()
            } else {
                alert("验证码错误，请重新输入！")
            }
        })
    }
}

function resendmsg() {
    realSendMsg();
    $("#seconds").html("60");
    timecount();
    $("#HiddenSendTime").val(new Date().getTime());
    $("#reSendMsg").hide();
    $("#CountDowm").show()
}

function realSendMsg() {
    var mobile = $.trim($("#mobileNumber").val());
    getJSON("//clipper.360doc.com/clippertool/Mobilemsg.ashx?mobile=" + mobile + "&areacode=" + $("#AreaCode").val().replace("+", "%2B") + "&jsoncallback=?", function (responseText) {
        if (responseText.html != "") {
            if ($("#HiddenCode") != null) {
                $("#HiddenCode").val(responseText.html.replace(/^\s*/, "").replace(/\s*$/, ""))
            }
        }
    })
}

var timer = null;

function timecount() {
    var i = 60;
    clearInterval(timer);
    timer = setInterval(function () {
        $("#seconds").html(i);
        if (i == 0) {
            clearInterval(timer);
            $("#CountDowm").hide();
            $("#reSendMsg").show()
        }
        i = i - 1
    }, 1000)
}

function onFailed() {
    alert("操作失败！")
}

function mobilereg() {
    var code = "";
    var checkcode = $.trim($("#verifycode").val());
    if ($("#HiddenCode") != null) {
        code = $("#HiddenCode").val()
    }
    if (checkcode == "校验码" || checkcode == "") {
        alert("请输入校验码！");
        return
    }
    var date1 = $("#HiddenSendTime").val();
    var date2 = new Date().getTime();
    var interval = date2 - date1;
    if (interval > 10 * 60 * 1000) {
        alert("校验码超时失效！");
        return
    }
    getJSON("//clipper.360doc.com/clippertool/mobilecode.ashx?code=" + code + "&verifycode=" + checkcode + "&jsoncallback=?", function (responseText) {
        if (responseText.html != "") {
            if (responseText.html == "1") {
                getJSON("//clipper.360doc.com/clippertool/valideUser.ashx?userid=" + $("#userid").val() + "&mobile=" + $("#mobileNumber").val() + "&areacode=" + $("#AreaCode").val() + "&type=1" + "&jsoncallback=?", function (responseText) {
                    if (responseText.html == "1") {
                        closeValideFrame();
                        $("#isValide").val("1");
                        getJSON("//clipper.360doc.com/clippertool/isValideMobile.ashx?type=1&jsoncallback=?", function (responseText) {
                        });
                        var myForm = $("#myform");
                        $(myForm).submit();
                        parent.closelayer()
                    } else {
                        onFailed()
                    }
                })
            } else if (responseText.html == "-2") {
                alert("校验码超时失效！")
            } else {
                alert("短信校验码错误！")
            }
        } else {
            alert("短信校验码错误！")
        }
    })
}

function skipValide() {
    closeValideFrame();
    getJSON("//clipper.360doc.com/clippertool/isValideMobile.ashx?type=1&jsoncallback=?", function (responseText) {
        var myForm = $("#myform");
        $(myForm).submit();
        parent.closelayer()
    })
}

function saveAsPrivateArt() {
    closeValideFrame();
    $("#divmypremi").html("私有");
    $("#permission").val("1");
    var myForm = $("#myform");
    $(myForm).submit();
    parent.closelayer()
}

function GetAreaCode(area) {
    switch (area) {
        case"中国大陆":
            return "China";
        case"中国香港":
            return "Hongkong";
        case"中国澳门":
            return "Macao";
        case"中国台湾":
            return "Taiwan";
        case"澳大利亚":
            return "Australia";
        case"德国":
            return "Germany";
        case"俄罗斯":
            return "Russia";
        case"法国":
            return "France";
        case"菲律宾":
            return "Philippines";
        case"韩国":
            return "Korea";
        case"加拿大":
            return "Canada";
        case"柬埔寨":
            return "Kampuchea";
        case"马来西亚":
            return "Malaysia";
        case"美国":
            return "USA";
        case"蒙古":
            return "Mongolia";
        case"缅甸":
            return "Burma";
        case"日本":
            return "Japan";
        case"泰国":
            return "Thailand";
        case"新加坡":
            return "Singapore";
        case"新西兰":
            return "NewZealand";
        case"印度":
            return "India";
        case"印度尼西":
            return "Indonesia";
        case"英国":
            return "UK";
        case"越南":
            return "Vietnam";
        default:
            return ""
    }
}

function cutString(str, len) {
    if (str.length * 2 <= len) {
        return str
    }
    var strlen = 0;
    var s = "";
    for (var i = 0; i < str.length; i++) {
        s = s + str.charAt(i);
        if (str.charCodeAt(i) > 128) {
            strlen = strlen + 2;
            if (strlen >= len) {
                return s.substring(0, s.length - 1) + "..."
            }
        } else {
            strlen = strlen + 1;
            if (strlen >= len) {
                return s.substring(0, s.length - 2) + "..."
            }
        }
    }
    return s
}

function returnFirstStep() {
    $("#twoStep").hide();
    changeImg();
    $("#checkCode").val("");
    $("#oneStep").show();
    $("#privateOperation").show();
    $("#verifycode").val("");
    clearInterval(timer);
    $("#seconds").html("60")
}



var areaCodeJson = [{"areaEn": "China", "areaCHS": "中国大陆", "code": "+86"}, {
    "areaEn": "Hongkong",
    "areaCHS": "中国香港",
    "code": "+852"
}, {"areaEn": "Macao", "areaCHS": "中国澳门", "code": "+853"}, {
    "areaEn": "Taiwan",
    "areaCHS": "中国台湾",
    "code": "+886"
}, {"areaEn": "Algeria", "areaCHS": "阿尔及利亚", "code": "+213"}, {
    "areaEn": "Argentina",
    "areaCHS": "阿根廷",
    "code": "+54"
}, {"areaEn": "UnitedArabEmirates", "areaCHS": "阿联酋", "code": "+971"}, {
    "areaEn": "Egypt",
    "areaCHS": "埃及",
    "code": "+20"
}, {"areaEn": "Ethiopia", "areaCHS": "埃塞俄比亚", "code": "+251"}, {
    "areaEn": "Ireland",
    "areaCHS": "爱尔兰",
    "code": "+353"
}, {"areaEn": "Angola", "areaCHS": "安哥拉", "code": "+244"}, {
    "areaEn": "Austria",
    "areaCHS": "奥地利",
    "code": "+43"
}, {"areaEn": "Australia", "areaCHS": "澳大利亚", "code": "+61"}, {
    "areaEn": "Pakistan",
    "areaCHS": "巴基斯坦",
    "code": "+92"
}, {"areaEn": "Brazil", "areaCHS": "巴西", "code": "+55"}, {
    "areaEn": "Belarus",
    "areaCHS": "白俄罗斯",
    "code": "+375"
}, {"areaEn": "Bulgaria", "areaCHS": "保加利亚", "code": "+359"}, {
    "areaEn": "Belgium",
    "areaCHS": "比利时",
    "code": "+32"
}, {"areaEn": "Poland", "areaCHS": "波兰", "code": "+48"}, {
    "areaEn": "Denmark",
    "areaCHS": "丹麦",
    "code": "+45"
}, {"areaEn": "Germany", "areaCHS": "德国", "code": "+49"}, {
    "areaEn": "Russia",
    "areaCHS": "俄罗斯",
    "code": "+7"
}, {"areaEn": "Ecuador", "areaCHS": "厄瓜多尔", "code": "+593"}, {
    "areaEn": "France",
    "areaCHS": "法国",
    "code": "+33"
}, {"areaEn": "Philippines", "areaCHS": "菲律宾", "code": "+63"}, {
    "areaEn": "Finland",
    "areaCHS": "芬兰",
    "code": "+358"
}, {"areaEn": "Colombia", "areaCHS": "哥伦比亚", "code": "+57"}, {
    "areaEn": "Kazakhstan",
    "areaCHS": "哈萨克斯坦",
    "code": "+7"
}, {"areaEn": "Korea", "areaCHS": "韩国", "code": "+82"}, {
    "areaEn": "Netherlands",
    "areaCHS": "荷兰",
    "code": "+31"
}, {"areaEn": "Kyrgyzstan", "areaCHS": "吉尔吉斯斯坦", "code": "+996"}, {
    "areaEn": "Canada",
    "areaCHS": "加拿大",
    "code": "+1"
}, {"areaEn": "Ghana", "areaCHS": "加纳", "code": "+233"}, {
    "areaEn": "Kampuchea",
    "areaCHS": "柬埔寨",
    "code": "+855"
}, {"areaEn": "Czech", "areaCHS": "捷克", "code": "+420"}, {
    "areaEn": "Qatar",
    "areaCHS": "卡塔尔",
    "code": "+974"
}, {"areaEn": "Kuwait", "areaCHS": "科威特", "code": "+965"}, {
    "areaEn": "Kenya",
    "areaCHS": "肯尼亚",
    "code": "+254"
}, {"areaEn": "Lao", "areaCHS": "老挝", "code": "+856"}, {
    "areaEn": "Romania",
    "areaCHS": "罗马尼亚",
    "code": "+40"
}, {"areaEn": "Malaysia", "areaCHS": "马来西亚", "code": "+60"}, {
    "areaEn": "Mauritius",
    "areaCHS": "毛里求斯",
    "code": "+230"
}, {"areaEn": "USA", "areaCHS": "美国", "code": "+1"}, {
    "areaEn": "Mongolia",
    "areaCHS": "蒙古",
    "code": "+976"
}, {"areaEn": "Bangladesh", "areaCHS": "孟加拉国", "code": "+880"}, {
    "areaEn": "Peru",
    "areaCHS": "秘鲁",
    "code": "+51"
}, {"areaEn": "Burma", "areaCHS": "缅甸", "code": "+95"}, {
    "areaEn": "Morocco",
    "areaCHS": "摩洛哥",
    "code": "+212"
}, {"areaEn": "Mexico", "areaCHS": "墨西哥", "code": "+52"}, {
    "areaEn": "SouthAfrica",
    "areaCHS": "南非",
    "code": "+27"
}, {"areaEn": "Nepal", "areaCHS": "尼泊尔", "code": "+977"}, {
    "areaEn": "Nigeria",
    "areaCHS": "尼日利亚",
    "code": "+234"
}, {"areaEn": "Norway", "areaCHS": "挪威", "code": "+47"}, {
    "areaEn": "Portugal",
    "areaCHS": "葡萄牙",
    "code": "+351"
}, {"areaEn": "Japan", "areaCHS": "日本", "code": "+81"}, {
    "areaEn": "Sweden",
    "areaCHS": "瑞典",
    "code": "+46"
}, {"areaEn": "Switzerland", "areaCHS": "瑞士", "code": "+41"}, {
    "areaEn": "SaudiArabia",
    "areaCHS": "沙特阿拉伯",
    "code": "+966"
}, {"areaEn": "SriLanka", "areaCHS": "斯里兰卡", "code": "+94"}, {
    "areaEn": "Tajikistan",
    "areaCHS": "塔吉克斯坦",
    "code": "+992"
}, {"areaEn": "Thailand", "areaCHS": "泰国", "code": "+66"}, {
    "areaEn": "Tanzania",
    "areaCHS": "坦桑尼亚",
    "code": "+255"
}, {"areaEn": "Turkey", "areaCHS": "土耳其", "code": "+90"}, {
    "areaEn": "Venezuela",
    "areaCHS": "委内瑞拉",
    "code": "+58"
}, {"areaEn": "Brunei", "areaCHS": "文莱", "code": "+673"}, {
    "areaEn": "Ukraine",
    "areaCHS": "乌克兰",
    "code": "+380"
}, {"areaEn": "Uzbekistan", "areaCHS": "乌兹别克斯坦", "code": "+998"}, {
    "areaEn": "Spain",
    "areaCHS": "西班牙",
    "code": "+34"
}, {"areaEn": "Greece", "areaCHS": "希腊", "code": "+30"}, {
    "areaEn": "Singapore",
    "areaCHS": "新加坡",
    "code": "+65"
}, {"areaEn": "NewZealand", "areaCHS": "新西兰", "code": "+64"}, {
    "areaEn": "Hungary",
    "areaCHS": "匈牙利",
    "code": "+36"
}, {"areaEn": "Iraq", "areaCHS": "伊拉克", "code": "+964"}, {
    "areaEn": "Israel",
    "areaCHS": "以色列",
    "code": "+972"
}, {"areaEn": "Italy", "areaCHS": "意大利", "code": "+39"}, {
    "areaEn": "India",
    "areaCHS": "印度",
    "code": "+91"
}, {"areaEn": "Indonesia", "areaCHS": "印度尼西亚", "code": "+62"}, {
    "areaEn": "UK",
    "areaCHS": "英国",
    "code": "+44"
}, {"areaEn": "Vietnam", "areaCHS": "越南", "code": "+84"}, {"areaEn": "Chile", "areaCHS": "智利", "code": "+56"}];

function docAreaCode(opt) {
    this.target = $("#" + opt.target);
    this.selectedTxt = $("#" + opt.selectedTxt);
    this.hideAreaCode = $("#" + opt.hideAreaCode);
    this.selectedCountry = $("#" + opt.selectedCountry)
}

docAreaCode.prototype = {
    creat: function () {
        var ulHtml = "<ul>";
        for (var i = 0; i < areaCodeJson.length; i++) {
            ulHtml += "<li id=\"" + areaCodeJson[i].areaEn + "\"><span style=\"float: left\">" + areaCodeJson[i].areaCHS + "</span><span style=\"float: right; margin-right: 10px;\">" + areaCodeJson[i].code + "</span></li>"
        }
        ulHtml += "</ul>";
        this.target.html(ulHtml);
        this.target.find("li").click(function () {
            var countrys = $(this).text().split('+');
            areaCodeList.selectedTxt.html(countrys[0].substring(0, 4));
            areaCodeList.selectedTxt.attr("areaen", $(this).attr("id"));
            if (countrys[0] == "中国大陆") {
                areaCodeList.hideAreaCode.val("")
            } else {
                areaCodeList.hideAreaCode.val("+" + countrys[1])
            }
            areaCodeList.target.hide()
        });
        this.target.find("li").mouseover(function () {
            if ($(this).attr("id") != areaCodeList.selectedTxt.attr("areaen")) {
                $(this).addClass("countrylihover doc360countrylihover")
            }
        });
        this.target.find("li").mouseout(function () {
            if ($(this).attr("id") != areaCodeList.selectedTxt.attr("areaen")) {
                $(this).removeClass("countrylihover doc360countrylihover")
            }
        });
        this.selectedCountry.click(function (e) {
            var isShow = areaCodeList.target.css("display");
            if (isShow == "none") {
                areaCodeList.target.find("li").removeClass("countrylihover doc360countrylihover");
                areaCodeList.target.show();
                $("#" + areaCodeList.selectedTxt.attr("areaen")).addClass("countrylihover doc360countrylihover");
                var scrollTo = $("#" + areaCodeList.selectedTxt.attr("areaen"));
                areaCodeList.target.scrollTop(scrollTo.offset().top - areaCodeList.target.offset().top + areaCodeList.target.scrollTop())
            } else {
                this.target.hide()
            }
            $(document).one("click", function () {
                areaCodeList.target.hide()
            });
            e.stopPropagation()
        });
        this.target.click(function (e) {
            e.stopPropagation()
        })
    }
};






try {
    if (!document.getElementsByClassName) {
        document.getElementsByClassName = function (className, element) {
            var children = (element || document).getElementsByTagName('*');
            var elements = new Array();
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                var classNames = child.className;
                if (classNames == className) {
                    elements.push(child);
                    break
                }
            }
            return elements
        }
    }
} catch (err) {
}
var extractcontent = "";
var setcontent = false;
try {
    styleiframe()
} catch (err) {
}

function styleiframe() {
    if (document.all) {
        var sheet = document.createStyleSheet();
        sheet.addRule('iframe', 'max-height: 2000px')
    } else {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = "iframe{ max-height: 2000px }";
        document.getElementsByTagName('HEAD').item(0).appendChild(style)
    }
}

var doc360_iframeindex = -1;
var strUrl = "";
if (window.location) {
    strUrl = window.location.href.toString();
    if (strUrl.indexOf("docin.com") > -1) {
        try {
            if (document.getElementById("shop-end")) {
                if (document.getElementById("endShareCode")) {
                    document.getElementById("docinPopBox1").style.display = "none"
                } else {
                    var alist = document.getElementById("shop-end").getElementsByTagName("a");
                    if (alist) {
                        for (var i = 0; i < alist.length; i++) {
                            if (alist[i].title == "更多分享方式") {
                                alist[i].click()
                            }
                        }
                    }
                }
            }
        } catch (err) {
        }
    }
    var sohuembed = "";
    if (strUrl.indexOf("sohu.com") > -1) {
        if (document.getElementById("shareBox")) {
            try {
                document.getElementById("shareBox").click();
                if (document.getElementById("shareTxtHtml_forward_1")) {
                    document.getElementById("shareTxtHtml_forward_1").focus();
                    document.getElementById("shareTxtHtml_forward_1").blur();
                    sohuembed = document.getElementById("shareTxtHtml_forward_1").value
                }
                if (document.getElementById("shareTxtHtml_forward_2")) {
                    document.getElementById("shareTxtHtml_forward_2").focus();
                    document.getElementById("shareTxtHtml_forward_2").blur();
                    sohuembed = document.getElementById("shareTxtHtml_forward_2").value
                }
            } catch (err) {
                try {
                    document.getElementById("shareBox").click();
                    if (document.getElementById("shareTxtHtml_forward_1")) {
                        document.getElementById("shareTxtHtml_forward_1").focus();
                        document.getElementById("shareTxtHtml_forward_1").blur();
                        sohuembed = document.getElementById("shareTxtHtml_forward_1").value
                    }
                    if (document.getElementById("shareTxtHtml_forward_2")) {
                        document.getElementById("shareTxtHtml_forward_2").focus();
                        document.getElementById("shareTxtHtml_forward_2").blur();
                        sohuembed = document.getElementById("shareTxtHtml_forward_2").value
                    }
                } catch (err2) {
                    sohuembed = ""
                }
            }
        }
    }
}
String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2)
};
if (document.getElementById("docNoteWebClipper") != null) {
    document.getElementById("docNoteWebClipper").parentNode.removeChild(document.getElementById("docNoteWebClipper"))
}
if (document.getElementById("yShade0") != null) {
    document.getElementById("yShade0").parentNode.removeChild(document.getElementById("yShade0"))
}
if (document.getElementById("yShade1") != null) {
    document.getElementById("yShade1").parentNode.removeChild(document.getElementById("yShade1"))
}
if (document.getElementById("yShade2") != null) {
    document.getElementById("yShade2").parentNode.removeChild(document.getElementById("yShade2"))
}
if (document.getElementById("yShade3") != null) {
    document.getElementById("yShade3").parentNode.removeChild(document.getElementById("yShade3"))
}
if (document.getElementById("yShade4") != null) {
    document.getElementById("yShade4").parentNode.removeChild(document.getElementById("yShade4"))
}
if (document.getElementById("doc360_close") != null) {
    document.getElementById("doc360_close").parentNode.removeChild(document.getElementById("doc360_close"))
}
if (document.getElementById("eleImgShare360doc") != null) {
    document.getElementById("eleImgShare360doc").parentNode.removeChild(document.getElementById("eleImgShare360doc"))
}
if (document.getElementById("fullscreendiv") != null) {
    document.getElementById("fullscreendiv").parentNode.removeChild(document.getElementById("fullscreendiv"))
}
if (document.getElementById("tipdiv1") != null) {
    document.getElementById("tipdiv1").parentNode.removeChild(document.getElementById("tipdiv1"))
}
if (document.getElementById("divtip2") != null) {
    document.getElementById("divtip2").parentNode.removeChild(document.getElementById("divtip2"))
}
if (document.getElementById("closeimg") != null) {
    document.getElementById("closeimg").parentNode.removeChild(document.getElementById("closeimg"))
}
if (document.getElementById("docNoteWebClipperlogin") != null) {
    document.getElementById("docNoteWebClipperlogin").parentNode.removeChild(document.getElementById("docNoteWebClipperlogin"))
}
var iframedocument;
var iframeWindow;
var strReturn = "";
var CbTable = new Hashtable();
var clippertype = "";
var tip2top = 0;
var tip2left = 0;
var tiperror = false;
var cookievalue = "";
var isTitleclick2 = false;
getJSON("//clipper.360doc.com/clippertool/writecookie.ashx?jsoncallback=?", function (responseText) {
    cookievalue = responseText.html;
    var arr = cookievalue.split("$");
    cookievalue = arr[0];
    if (arr[1] == "") {
        unlogin()
    } else {
        createClipper();
        settip(arr[0])
    }
});

function getJSON(url, data, cb) {
    var jsc = now();
    if (IsFunc(data)) {
        cb = data;
        data = null
    }
    var cbName = "jsonp" + jsc;
    var src = url.replace("jsoncallback=?", "jsoncallback=" + cbName);
    var IsSrcHaveParams = (src.indexOf("?") > 0 || src.indexOf("&") > 0);
    for (var key in data) {
        src += "&" + key + "=" + encodeURIComponent(data[key])
    }
    var script = document.createElement("script");
    script.setAttribute("language", "Javascript");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", src);
    script.setAttribute("id", cbName);
    getHead().appendChild(script);
    if (cb != null) {
        CbTable.add(cbName, cb)
    }
};

function OnJSONPResp(obj, cbName) {
    var scItem = document.getElementById(cbName);
    var cbFunc = CbTable.getItem(cbName);
    if (cbFunc != null) {
        cbFunc(obj);
        CbTable.remove(cbName)
    }
    if (scItem) {
        getHead().removeChild(scItem)
    }
};

function now() {
    return +new Date
};

function IsFunc(data) {
    return ((typeof(data)).toString() == "function")
};

function getHead() {
    return document.documentElement.getElementsByTagName("HEAD")[0]
};

function Hashtable() {
    this._hash = {};
    this._count = 0;
    this.add = function (key, value) {
        if (this._hash.hasOwnProperty(key)) return false; else {
            this._hash[key] = value;
            this._count++;
            return true
        }
    };
    this.remove = function (key) {
        delete this._hash[key];
        this._count--
    };
    this.count = function () {
        return this._count
    };
    this.items = function (key) {
        if (this.contains(key)) return this._hash[key]
    };
    this.contains = function (key) {
        return this._hash.hasOwnProperty(key)
    };
    this.clear = function () {
        this._hash = {};
        this._count = 0
    };
    this.getItem = function (key) {
        if (this.contains(key)) {
            return this._hash[key]
        } else {
            return null
        }
    }
}

var removeNodeList = [];
var pageList = [];
var maincontentfull = "";
var docNoteClipperConfiguration = {
    logEnabled: !1,
    clipperStyle: "position:fixed;right:20px;top:10px;padding-bottom:10px;font:12px/100% arial,sans-serif;color:#333; width: 460px;_right:expression(eval(document.documentElement.scrollLeft));_top:expression(eval(document.documentElement.scrollTop+10));_position:absolute;",
    doc: {mainContent: null, container: window.document, contentType: "1"}
};
(function () {
    var e = function (e) {
        this.contentDocument = e
    };
    e.common = {
        trim: function (e) {
            return e.replace(/^\s*/, "").replace(/\s*$/, "")
        }, isFunction: function (e) {
            return Object.prototype.toString.call(e) === "[object Function]"
        }, findPos: function (e) {
            var t = {x: 0, y: 0};
            var docframe = window.document;
            var docscrolltop = this.scroll().top;
            var docscrollleft = this.scroll().left;
            if (doc360_iframeindex > -1) {
                docframe = window.frames[doc360_iframeindex].document;
                docscrolltop = 0;
                docscrollleft = 0
            }
            if (!docframe.documentElement.getBoundingClientRect()) while (e) t.x += e.offsetLeft, t.y += e.offsetTop, e = e.offsetParent; else t.x = e.getBoundingClientRect().left + docscrollleft, t.y = e.getBoundingClientRect().top + docscrolltop;
            return t
        }, indexOf: function (t, n) {
            if (t.indexOf) return t.indexOf(n);
            var r = -1;
            return this.each(t, function (e) {
                if (this[e] === n) return r = e, !1
            }), r
        }, each: function (e, t, n) {
            if (e === undefined || e === null) return;
            if (e.length === undefined || this.isFunction(e)) {
                for (var r in e) if (e.hasOwnProperty(r) && t.call(n || e[r], r, e[r]) === !1) break
            } else for (var i = 0; i < e.length; i++) if (t.call(n || e, i, e[i]) === !1) break;
            return e
        }, css: function () {
            var e = function (e, t) {
                var n = "";
                t == "float" && (document.defaultView ? t = "float" : t = "styleFloat");
                if (e.style[t]) n = e.style[t]; else if (e.currentStyle) n = e.currentStyle[t]; else if (document.defaultView && document.defaultView.getComputedStyle) {
                    t = t.replace(/([A-Z])/g, "-$1").toLowerCase();
                    var r = document.defaultView.getComputedStyle(e, "");
                    n = r && r.getPropertyValue(t)
                } else n = null;
                (n == "auto" || n.indexOf("%") !== -1) && ("width" === t.toLowerCase() || "height" === t.toLowerCase()) && e.style.display != "none" && n.indexOf("%") !== -1 && (n = e["offset" + t.charAt(0).toUpperCase() + t.substring(1).toLowerCase()] + "px");
                if (t == "opacity") try {
                    n = e.filters["DXImageTransform.Microsoft.Alpha"].opacity, n /= 100
                } catch (i) {
                    try {
                        n = e.filters("alpha").opacity
                    } catch (s) {
                    }
                }
                return n
            };
            return function (t, n) {
                if (typeof n == "string") return e(t, n);
                this.each(n, function (e, n) {
                    t.style[e] = n
                })
            }
        }(), scroll: function () {
            return {
                left: document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft,
                top: document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop
            }
        }
    }, e.prototype = {
        IGNORE_TAGS: ["HTML", "HEAD", "META", "TITLE", "SCRIPT", "STYLE", "LINK", "IMG", "FORM", "INPUT", "BODY", "BUTTON", "TEXTAREA", "SELECT", "OPTION", "LABEL", "IFRAME", "UL", "OL", "LI", "DD", "DL", "DT", "A", "OBJECT", "PARAM", "EMBED", "NOSCRIPT", "EM", "B", "STRONG", "I", "INS", "BR", "HR", "PRE", "H1", "H2", "H3", "H4", "H5", "CITE"],
        getNoteMainArticle: function () {
            var win = window;
            var e = null, t = "";
            !location || (t = location.hostname);
            if (/\b(google|facebook|twitter)\b/i.test(t)) return null;
            if (/\b(qzone.qq.com)\b/i.test(t)) {
                if (window.frames["fullscreen_dialog_frame"] != null) {
                    win = window.frames["fullscreen_dialog_frame"];
                    var iframes = document.getElementsByTagName("iframe");
                    if (iframes.length > 0) {
                        for (var i = 0; i < iframes.length; i++) {
                            if (window.frames[i] == window.frames["fullscreen_dialog_frame"]) {
                                doc360_iframeindex = i
                            }
                        }
                    }
                }
            }
            var n = this._getNoteAllArticle(win);
            if (/\b(webftp.bbs.hnol.net)\b/i.test(t)) {
                return n[0]
            }
            if (/\b(blog.163.com)\b/i.test(t) && document.getElementsByClassName("bct fc05 fc11 nbw-blog ztag") && document.getElementsByClassName("bct fc05 fc11 nbw-blog ztag")[0]) {
                return n[0]
            }
            if (!n || !n.length) e = null;
            n.sort(function (e, t) {
                return t.weight - e.weight
            });
            var r = null;
            if (n && n.length) {
                for (var i = 0; i < 2; i++) {
                    e = n[0], n.splice(0, 1), e && e.weight < 500 && (e = null);
                    if (e) break
                }
            }
            if (doc360_iframeindex > -1 && /\b(qzone.qq.com)\b/i.test(t)) {
                if (e == null) {
                    doc360_iframeindex = -1;
                    return null
                }
            }
            if (e == null) {
                var iframes = document.getElementsByTagName("iframe");
                if (iframes.length > 0) {
                    for (var i = 0; i < iframes.length; i++) {
                        try {
                            if (window.frames[i] != null) {
                                n = this._getNoteAllArticle(window.frames[i]);
                                if (!n || !n.length) {
                                    e = null
                                }
                                n.sort(function (e, t) {
                                    return t.weight - e.weight
                                });
                                var r = null;
                                if (n && n.length) {
                                    for (var j = 0; j < 2; j++) {
                                        e = n[0], n.splice(0, 1), e && e.weight < 500 && (e = null);
                                        if (e) {
                                            doc360_iframeindex = i;
                                            return e
                                        }
                                    }
                                }
                            }
                        } catch (error) {
                        }
                    }
                }
            }
            return e ? e : null
        },
        _sort: function (e) {
            for (var t = 0, n = null, r = 0; r < e.length; r++) {
                var i = e[r], s = i.weight;
                s >= t && (t = s, n = i)
            }
            return n
        },
        _getNoteAllArticle: function (win) {
            if (win == null || win.document == null) return [];
            tt = "";
            !location || (tt = location.hostname);
            if (/\b(webftp.bbs.hnol.net)\b/i.test(tt)) {
                var e = window.document.getElementsByTagName("body");
                n = [];
                n[0] = new t(e[0]);
                return n
            }
            if (/\b(blog.163.com)\b/i.test(tt) && document.getElementsByClassName("bct fc05 fc11 nbw-blog ztag") && document.getElementsByClassName("bct fc05 fc11 nbw-blog ztag")[0]) {
                var e = document.getElementsByClassName("bct fc05 fc11 nbw-blog ztag");
                n = [];
                n[0] = new t(e[0]);
                return n
            }
            var e = win.document.getElementsByTagName("*"), n = [];
            for (var r = 0, i = e.length; r < i; r++) {
                var s = e[r];
                this.CheckTageName(s) && this._checkSize(s) && this._checkVisibility(s) && (n[n.length] = new t(s))
            }
            return n
        },
        CheckTageName: function (t) {
            return e.common.indexOf(this.IGNORE_TAGS, t.tagName) == -1
        },
        _checkVisibility: function (t) {
            return !(e.common.css(t, "visibility") == "hidden" || e.common.css(t, "display") == "none" || parseInt(e.common.css(t, "height")) <= 0 || parseInt(e.common.css(t, "width")) <= 0)
        },
        _checkSize: function (e) {
            return e.offsetWidth > 300 && e.offsetHeight > 150
        }
    };
    var t = function (t) {
        this.elem = t, this.common = e.common, this.offset = this.common.findPos(t), this._texts = this._getAllTexts(t, 6), this.weight = this.calcWeight()
    };
    t.prototype = {
        IGNORE_TAGS: ["A", "DD", "DT", "OL", "OPTION", "DL", "DD", "SCRIPT", "STYLE", "UL", "LI", "IFRAME"],
        TITLE_TAGS: ["H1", "H2", "H3", "H4", "H5", "H6"],
        MINOR_REGEXP: /comment|combx|disqus|foot|header|menu|rss|shoutbox|sidebar|sponsor/i,
        MAJOR_REGEXP: /article|entry|post|body|column|main|content/i,
        TINY_REGEXP: /comment/i,
        BLANK_REGEXP: /\S/i,
        _getAllTexts: function (t, n) {
            var r = [];
            if (n > 0) {
                var i = t.firstChild;
                while (i) {
                    if (i.nodeType == 3 && this._checkLength(i)) {
                        var s = i.parentNode || {}, o = s.parentNode || {};
                        !this._checkMinorContent(s) && !this._checkMinorContent(o) && e.common.trim(i.nodeValue) && r.push(i)
                    } else i.nodeType == 1 && this.CheckTageName(i) && (r = r.concat(this._getAllTexts(i, n - 1)));
                    i = i.nextSibling
                }
            }
            return r
        },
        calcStructWeight: function () {
            var t = 0;
            for (var n = 0, r = this._texts.length; n < r; n++) {
                var i = this._texts[n], s = e.common.trim(i.nodeValue).length, o = 1;
                if (s < 20) continue;
                for (var u = i.parentNode; u && u != this.elem; u = u.parentNode) o -= .1;
                t += Math.pow(o * s, 1.25)
            }
            return t
        },
        calcContentWeight: function () {
            var e = 1;
            for (var t = this.elem; t; t = t.parentNode) t.id && (this.MAJOR_REGEXP.test(t.id) && (e += .4), this.MINOR_REGEXP.test(t.id) && (e -= .8)), t.className && (this.MAJOR_REGEXP.test(t.className) && (e += .4), this.MINOR_REGEXP.test(t.className) && (e -= .8));
            return e
        },
        calcWeight: function () {
            return this.calcStructWeight() * this.calcContentWeight()
        },
        CheckTageName: function (t) {
            return e.common.indexOf(this.IGNORE_TAGS, t.tagName) == -1
        },
        _checkLength: function (e) {
            return Boolean(this.BLANK_REGEXP.test(e.nodeValue))
        },
        _checkMinorContent: function (e) {
            return Boolean(this.TINY_REGEXP.test(e.id + " " + e.className))
        },
        _checkVisibility: function (t) {
            return !(e.common.css(t, "visibility") == "hidden" || e.common.css(t, "display") == "none" || parseInt(e.common.css(t, "height")) <= 0 || parseInt(e.common.css(t, "width")) <= 0)
        }
    }, window.Page = e
})(), function () {
    typeof Function.prototype.inherit != "function" && (Function.prototype.inherit = function (e) {
        typeof e == "function" && (this.prototype = new e, this.prototype.parent = e(), this.prototype.constructor = this)
    });
    var e = function (e) {
        return e
    }, t = null, n = window.document;
    typeof _docNote != "undefined" && (t = _docNote), _docNote = {}, _docNote.Common = {
        browser: function () {
            return {
                isIE: navigator.appVersion.indexOf("MSIE", 0) != -1,
                isSafari: navigator.appVersion.indexOf("WebKit", 0) != -1,
                isFirefox: navigator.userAgent.indexOf("Firefox", 0) != -1,
                isIpad: navigator.userAgent.indexOf("WebKit") > 0 && navigator.userAgent.indexOf("iPad") > 0,
                isIphone: navigator.userAgent.indexOf("WebKit") > 0 && navigator.userAgent.indexOf("iPhone") > 0,
                isChrome: navigator.userAgent.indexOf("WebKit") > 0 && navigator.userAgent.indexOf("Chrome") > 0
            }
        }(), trim: function (e) {
            return typeof e != "string" ? e : e.replace(/^\s+/, "").replace(/\s+$/, "")
        }, extend: function (e, t, n) {
            if (typeof t != "object") return !1;
            for (var r in t) typeof e[r] != "undefined" ? n ? e[r] = [e[r], t[r]] : e[r] = t[r] : e[r] = t[r]
        }, el: function (e) {
            return n.getElementById(e)
        }, mkel: function (e, t) {
            try {
                var r = n.createElement(e);
                return t && t.appendChild(r), r
            } catch (i) {
                return !1
            }
        }
    }, _docNote.EventInterface = function () {
    }, _docNote.Common.extend(_docNote.EventInterface.prototype, {
        addEventListener: function (e, t) {
        }, removeEventListener: function (e, t) {
        }, executeEvent: function (e) {
        }, fireEvent: function (e) {
        }, events: {}
    }), _docNote.Clipper = function () {
        this.content = null, this.title = null;
        try {
            this.source = window.location.href
        } catch (e) {
            this.source = ""
        }
        this.type = null, this.selector = new _docNote.Selection, this.init()
    }, _docNote.Common.extend(_docNote.Clipper, {
        CLASS_INIT: 0,
        CLIPPING: 1,
        CLIPPED: 2,
        UPLOADING_FILE: 3,
        DONE: 8,
        ERROR_NO_BODY: 10005
    }), _docNote.Common.extend(_docNote.Clipper.prototype, {
        close: function () {
            this.wrapper.style.display = "none", this.state = _docNote.Clipper.DONE
        }, clipContent: function () {
            this.state = _docNote.Clipper.CLIPPING;
            var e = (new Date).getTime();
            try {
                var t = docNoteClipperConfiguration.doc.container;
                if (docNoteClipperConfiguration.doc.contentType == "2" && !this.hasSelection()) {
                    maincontentfull = getSelectHTML2(docNoteClipperConfiguration.doc.mainContent)
                }
                if (IsIpadBrowser()) {
                    if (ispadcut) {
                        return ispadcut ? (docNoteClipperConfiguration.doc.contentType = "3", this.content = padselecthtml, this.state = _docNote.Clipper.CLIPPED, this.content) : t.body ? (this.content = "error", this.state = _docNote.Clipper.CLIPPED, this.content) : (this.state = _docNote.Clipper.ERROR_NO_BODY, "")
                    } else {
                        return this.hasSelection() ? (docNoteClipperConfiguration.doc.contentType = "3", this.content = getSelectHTML(), this.state = _docNote.Clipper.CLIPPED, this.content) : t.body ? (this.content = "error", this.state = _docNote.Clipper.CLIPPED, this.content) : (this.state = _docNote.Clipper.ERROR_NO_BODY, "")
                    }
                } else {
                    return this.hasSelection() ? (docNoteClipperConfiguration.doc.contentType = "3", this.content = getSelectHTML(), this.state = _docNote.Clipper.CLIPPED, this.content) : t.body ? (this.content = "error", this.state = _docNote.Clipper.CLIPPED, this.content) : (this.state = _docNote.Clipper.ERROR_NO_BODY, "")
                }
                var n
            } catch (r) {
            }
        }, hasSelection: function () {
            if (getSelectedContents()) return true; else return false
        }, getSelection: function () {
            this.selection = this.selector.getSelection()
        }, submit: function () {
            this.state = _docNote.Clipper.UPLOADING_FILE;
            this.fillForm()
        }, getSelectedContent: function () {
            if (this.hasSelection()) {
                return t = getSelectHTML()
            }
        }, initFrame: function () {
            var e = docNoteClipperConfiguration;
            this.view.innerHTML = "<div id='iframedivnote'></div>"
        }, deleteFrame: function () {
            this.view.innerHTML = ""
        }, init: function () {
            this.state = _docNote.Clipper.CLASS_INIT;
            var e = docNoteClipperConfiguration, t = "docNoteWebClipper", r = n.getElementById(t);
            r != null && r.parentNode != null && r.parentNode.removeChild(r);
            var i = _docNote.Common.mkel("div");
            i.id = t, i.name = t, _docNote.Common.browser.isIE && (document.getElementsByTagName("html")[0].cssText = "background-image:url(about:blank);background-attachment:fixed", document.getElementsByTagName("body")[0].cssText = "background-image:url(about:blank);background-attachment:fixed"), i.style.cssText = e.clipperStyle, i.style.zIndex = 2147483647, i.style.borderWidth = "0px", this.wrapper = i;
            var s = _docNote.Common.mkel("div", i);
            s.style.cssText = "width:470px; padding:0px;", s.id = "docNoteWebClipper-New", s.className = "ydnwc-dialog";
            var o = _docNote.Common.mkel("div", s);
            o.id = "docNoteWebClipper_view", o.name = "docNoteWebClipper_view", o.style.display = "none";
            _docNote.Common.browser.isIE ? o.style.cssText = "width:470px; height:580px;" : o.style.cssText = "width:470px; height:580px;", this.view = o, this.initFrame();
            window.document.body.appendChild(i);
            var logoahtml1 = '';
            var logoahtml2 = '';
            var logoascript = '';
            if (IsIpadBrowser()) {
                logoahtml1 = '<a href="#" id="logoa">';
                logoahtml2 = '</a>';
                logoascript = '<script type="text/javascript">if(!parent.isrightselect()) {document.getElementById("logoa").focus();}</script>'
            } else {
                logoahtml1 = '';
                logoahtml2 = '';
                logoascript = ''
            }
            var frameinnerhtml = "<iframe frameborder='0' src=\"javascript:void((function(){var d=document;d.open ();document.domain='" + document.domain + "';d.write('');d.close()})())\" scrolling='no' width='470' height='580' id='testIframe' allowtransparency></iframe>";
            document.getElementById("iframedivnote").innerHTML = frameinnerhtml;
            var iframe = document.getElementById("testIframe");
            var minhtml = "";
            var btnhtml = '<form method="post" action="//clipper.360doc.com/saveart.aspx" id="myform1" target="_blank" onsubmit="gobigsaveart();"><input type="hidden" id="cid1" name="cid1" value="-1"/><input type="hidden" id="artcontent1" name="artcontent1"/><input type="hidden" id="title1" name="title1"/><input type="hidden" id="abstract1" name="abstract1"/><input type="hidden" id="url1" name="url1"/><input type="hidden" id="tags1" name="tags1"/><input type="hidden" id="permission1" name="permission1"/><input type="image" id="img1" src="//clipper.360doc.com/clippertool/pubimage/3.gif"/></form>';
            var tophtml = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><title></title><link href="//clipper.360doc.com/clippertool/css/zTreeStyle.css?t=2017041201" rel="stylesheet" type="text/css" /><link href="//clipper.360doc.com/clippertool/css/clipper.css?t=2016021501" rel="stylesheet" type="text/css" /> <script type="text/javascript">function rarImage(t) {if (t.width > 380&&(navigator.appVersion.toString().toLowerCase().indexOf("msie", 0) != -1)) {t.height = t.height * (380 / t.width); t.width = 380; }} function deleteErrorTip(t) { try {return; var temptemp = document.getElementById("shibaidiv").style.display;document.getElementById("shibaidiv").style.display = "none";document.getElementById("loadingimg").style.display = "none";document.getElementById("loadingtipdiv").style.display = "none";document.getElementById("zhengwendiv").style.display = "";if (t) { document.getElementById("editcontent").focus();}return temptemp;} catch (err) { }} function contentfocus(t){ var text =""; if(t.innerText){text=t.innerText;}else{text=t.textContent;} if(text=="请选中你要保存的内容，粘贴到此文本框"){t.innerHTML="";t.focus();} } function contentblur(t){var text =""; if(t.innerText!=null){text=t.innerText;}else{text=t.textContent;} if((text==""||t.innerHTML=="<br>")&&t.innerHTML.length<20){t.innerHTML="<span style=\'color:#B2B2B2;\'>请选中你要保存的内容，粘贴到此文本框</span>";} } </script><script type="text/javascript" src="//clipper.360doc.com/js/jquery-1.4.4.js"></script><script type="text/javascript" src="//clipper.360doc.com/js/jquery.ztree.core-3.3.js"></script><script type="text/javascript" src="//clipper.360doc.com/js/jquery.ztree.exedit-3.3.js"></script><script type="text/javascript" src="//clipper.360doc.com/js/saveartsmall.js?t=2017081001"></script></head><body style="margin:0px;padding:0px;"> ';
            var tophtml2 = ' <div class="main360docclipper" id="main360docdiv"><div class="topbjcl"><div style=" padding-top:9px; padding-left:20px; float:left; ">' + logoahtml1 + '<img src="//clipper.360doc.com/clippertool/pubimage/2.gif" width="107" height="13" />' + logoahtml2 + '</div><div style="width:95px; float:right; padding-top:3px;"><div class="lf" title="最小化" style="cursor:pointer;"><img id="maximg" src="//clipper.360doc.com/clippertool/pubimage/28a.gif" onclick="parent.minclose();" /></div><div class="lf" title="切换到新窗口编辑模式" style="cursor:pointer;padding-left:2px;">' + btnhtml + '</div><div class="lf" title="关闭" style="cursor:pointer;padding-left:2px;"><img id="imggb" src="//clipper.360doc.com/clippertool/pubimage/4.gif" onclick="parent.closeFull()" /></div></div></div><div style=" clear:both; padding-top:11px;"><div class="wzzw divscrollbarstyle" id="outerdiv" style=\"position:relative;\"> <div class="tucl" id="loadingimg"> <img src="//clipper.360doc.com/clippertool/pubimage/loading.gif" /></div><div class="tuwz" id="loadingtipdiv">正在获取文章内容......</div> <div class="shibai" id="shibaidiv" style="display:none;" onclick="deleteErrorTip(this)"><img src="//clipper.360doc.com/clippertool/pubimage/shibai.gif" /></div>';
            var bottomhtml = '</div></div></div><div style=" width:418px; margin:0px auto; padding-top:10px;"><div style=" height:40px;"><div id="divtreeresult" class="xiala lf" style="position:relative;" onclick="event.cancelBubble=true;"><div class="tsgc" id="divctree" style="z-index:214"><div class="tsgctop"><div class="lf">点击选择存放文件夹</div><div class="rt" style="width:74px;padding-top:2px;"><span title="添加文件夹"><img id="img5" src="//clipper.360doc.com/clippertool/pubimage/18.png" style="cursor:pointer;" onclick="addfiles()"/></span><span title="删除文件夹"><img id="img7" src="//clipper.360doc.com/clippertool/pubimage/17.png" style="cursor:pointer;" onclick="deletefiles();"/></span><span title="设置默认文件夹"><img id="img6" src="//clipper.360doc.com/clippertool/pubimage/16.png" style="cursor:pointer;" onclick="defaultFiles()"/></span></div></div><div style=" padding-top:5px;"><div class="doc360ul03 divscrollbarstyle" style="overflow-y:auto; overflow-x:auto;" onclick="cancelselect(this,event);" ontouchstart="event.cancelBubble=true;"><ul id="treelist" class="ztree"></ul><div style="height:15px;"></div></div></div></div><div class="treeerror"></div><div style="width:184px;height:28px;cursor:pointer;" onclick="showFileDiv();event.cancelBubble=true;"><div class="wdtsg lf" id="divcName" style="margin-top:7px;cursor:pointer;line-height:15px;">选择存放的文件夹</div><div class="rt" style="margin-top:12px;"><img src="//clipper.360doc.com/clippertool/pubimage/11.gif" /></div></div></div><div id="changePermission" class="xiala rt" style="position:relative;"><div class="gzgkdiv" id="divmypre" style="display:none;" ontouchstart="event.cancelBubble=true;"><ul><li title="公众公开">公众公开</li><li title="好友公开">好友公开</li><li title="私有">私有</li></ul></div><div style="width:184px;height:28px;cursor:pointer;" onclick="showmypre();event.cancelBubble=true;"><div id="divmypremi" class="gongkai lf" style="margin-top:7px;">公众公开</div><div class="rt" style=" margin-top:12px;"><img src="//clipper.360doc.com/clippertool/pubimage/11.gif" /></div></div></div><div id="lockPermission" class="lockpermission" style="display:none;"></div></div><div style=" height:40px;"><div class="xiala lf" style="width:59px;position:relative;border-right:none;"><div class="gzgkdiv" id="divtagsel" style=" width:79px; height:52px;display:none;" ontouchstart="event.cancelBubble=true;"><ul><li title="关键词">关键词</li><li title="摘要">摘要</li></ul></div><div style="height:28px;cursor:pointer;" onclick="showtagsel();event.cancelBubble=true;"><div class="lf" style=" margin-top:7px;cursor:pointer;line-height:15px;" id="divtagtxt">关键词</div><div class="rt" style=" margin-top:12px;"><img src="//clipper.360doc.com/clippertool/pubimage/11.gif" /></div></div></div><div class="tagk lf" onclick="event.cancelBubble=true;showtagdiv();"><div class="doc-tags divscrollbarstyle"><div id="divtags" ontouchstart="event.cancelBubble=true;"><div class="doc-tagme"><ul class="doc-tagme-container doc-container"><li class="doc-inputwrap"><input id="txttags" class="doc-input" onkeyup="confirmtags();" onblur="autoconfirmtags();if(!this.value && $(\'.doc-tagme li\').length==1) {this.value=\'添加关键词，用空格或回车分隔\';this.style.color=\'#b2b2b2\';}" onfocus="if(this.value==\'添加关键词，用空格或回车分隔\'||this.value==\'最多添加5个关键词\') this.value=\'\';this.style.color=\'#272727\'" value="添加关键词，用空格或回车分隔" style=" color:#b2b2b2;"/></li></ul></div><div id="divmytags" class="cytagcss taglink divscrollbarstyle"></div></div><div class="doc-tagab" id="divabs" style="display:none;" ontouchstart="event.cancelBubble=true;"><textarea class="doc-textarea" id="txtabs" onblur="if(!this.value) {this.value=\'添加摘要\';this.style.color=\'#b2b2b2\';}" onfocus="if(this.value==\'添加摘要\') this.value=\'\';this.style.color=\'#272727\';showtagdiv();" style="color:#b2b2b2;">添加摘要</textarea></div></div></div></div><div style=" clear:both;"><div class="lf" style=" padding-top:7px;"></div><div class="rt" id="divbtn"><table><tr><td><img id="img12" src="//clipper.360doc.com/clippertool/pubimage/5.gif" style="cursor:pointer;" onclick="parent.closeFull();"/></span></td><td>&nbsp;&nbsp;</td><td><div style="position:relative;"><div id="divsave"><img id="img13" src="//clipper.360doc.com/clippertool/pubimage/6.gif" onclick="saveArt(this,event);" style="cursor:pointer"/></div><div class="saveload"><img src="//clipper.360doc.com/clippertool/pubimage/saveloading.gif"/></div></div></td></tr></table></div></div></div><form method="post" action="//clipper.360doc.com/clippertool/saveart.ashx" id="myform"><input type="hidden" id="cid" name="cid" value="-1"/><input type="hidden" id="postuser" name="postuser" value=""/><input type="hidden" id="artcontent" name="artcontent"/><input type="hidden" id="title" name="title"/><input type="hidden" id="abstract" name="abstract"/><input type="hidden" id="isValide" name="isValide"/><input type="hidden" id="url" name="url"/><input type="hidden" id="tags" name="tags"/><input type="hidden" id="permission" name="permission"/><input type="hidden" id="arttype" name="arttype" value="1"/></form></div>' + logoascript + ' <div id="valideMobile" style="display: none; position: absolute; top: 7%; left: 3px; z-index: 10001"></div><div id="backgroundPopup1" style="display: none; position: absolute; height: 500px;_height:524px; width: 458px; top: 0px; left: 0px; filter:Alpha(opacity=50);*zoom:1;background-color: #000; opacity: 0.3;border: 1px solid #CECECE; z-index: 216;"></div></body></html>';
            var notietitlerr = "";
            var notietitl = "";
            var istitleclickff = "";
            var isdoubletitle = "";
            var isdoublecontent = "";
            if (isBrowser() != "IE") {
                notietitlerr = ' onclick="document.domain=\'' + document.domain + '\';parent.myOnbeforedeactivate(true);" ';
                notietitl = ' onclick="parent.myOnbeforedeactivate(true);" ';
                istitleclickff = ' onclick="parent.myOnbeforedeactivate();" ';
                isdoubletitle = ' onkeyup="parent.myOnbeforedeactivate(true);" ';
                isdoublecontent = ' onkeyup="parent.myOnbeforedeactivate();" '
            } else {
                notietitlerr = "";
                notietitl = ""
            }
            try {
                var doc = iframe.contentWindow.document;
                iframedocument = iframe.contentWindow.document;
                iframeWindow = iframe.contentWindow;
                minhtml = '<div class="main360docclipper" id="main360docdivmin" style=" width:238px; height:32px;display:none;"><div class="topbjcl"><div style=" padding-top:9px; padding-left:20px; float:left; "><img src="//clipper.360doc.com/clippertool/pubimage/2.gif" width="107" height="13" /></div><div style=" float:right; padding-right:10px; padding-top:3px;"><span title="最大化" style="cursor:pointer;" onclick="parent.openMax()"><img id="minimg" src="//clipper.360doc.com/clippertool/pubimage/29a.gif" /></span>&nbsp;<span title="关闭" style="cursor:pointer;"><img id="imggb_1" src="//clipper.360doc.com/clippertool/pubimage/4.gif" onclick="parent.closeFull()" /></span></div></div></div>';
                doc.open();
                doc.write(tophtml + minhtml + tophtml2 + '<div style=" display:none;" id="zhengwendiv" ><div style=" padding-left:15px; width:386px;"><div class="biaoto" id="clippertitle" contentEditable=true onbeforedeactivate="parent.myOnbeforedeactivate(true)" ' + notietitl + isdoubletitle + '></div><div style="display:none">abc</div></div><div class="zhengwen" style="min-height:250px;" id="editcontent" contentEditable=true onbeforedeactivate="parent.myOnbeforedeactivate()" ' + istitleclickff + isdoublecontent + ' onfocus="contentfocus(this)" onblur="contentblur(this)"></div>' + bottomhtml);
                doc.close()
            } catch (e) {
                try {
                    setTimeout(function () {
                        var doc = iframe.contentWindow.document;
                        iframedocument = iframe.contentWindow.document;
                        iframeWindow = iframe.contentWindow;
                        minhtml = '<div class="main360docclipper" id="main360docdivmin" style=" width:238px; height:32px;display:none;"><div class="topbjcl"><div style=" padding-top:9px; padding-left:20px; float:left; "><img src="//clipper.360doc.com/clippertool/pubimage/2.gif" width="107" height="13" /></div><div style=" float:right; padding-right:10px; padding-top:3px;"><span title="最大化" style="cursor:pointer;" onclick="document.domain=\'' + document.domain + '\';parent.openMax()"><img id="minimg" src="//clipper.360doc.com/clippertool/pubimage/29a.gif" /></span>&nbsp;<span title="关闭" style="cursor:pointer;"><img id="imggb_1" src="//clipper.360doc.com/clippertool/pubimage/4.gif" onclick="document.domain=\'' + document.domain + '\';parent.closeFull()" /></span></div></div></div>';
                        tophtml2 = ' <div class="main360docclipper" id="main360docdiv"><div class="topbjcl"><div style=" padding-top:9px; padding-left:20px; float:left; ">' + logoahtml1 + '<img src="//clipper.360doc.com/clippertool/pubimage/2.gif" width="107" height="13" />' + logoahtml2 + '</div><div style="width:95px; float:right; padding-top:3px;"><div class="lf" title="最小化" style="cursor:pointer;"><img id="maximg" src="//clipper.360doc.com/clippertool/pubimage/28a.gif" onclick="parent.minclose();" /></div><div class="lf" title="切换到新窗口编辑模式" style="cursor:pointer;padding-left:2px;">' + btnhtml + '</div><div class="lf" title="关闭" style="cursor:pointer;padding-left:2px;"><img id="imggb" src="//clipper.360doc.com/clippertool/pubimage/4.gif" onclick="document.domain=\'' + document.domain + '\';parent.closeFull()" /></div></div></div><div style=" clear:both; padding-top:11px;"><div class="wzzw divscrollbarstyle" id="outerdiv" style=\"position:relative;\"> <div class="tucl" id="loadingimg"> <img src="//clipper.360doc.com/clippertool/pubimage/loading.gif" /></div><div class="tuwz" id="loadingtipdiv">正在获取文章内容......</div> <div class="shibai" id="shibaidiv" style="display:none;" onclick="deleteErrorTip(this)"><img src="//clipper.360doc.com/clippertool/pubimage/shibai.gif" /></div>';
                        doc.open();
                        doc.write(tophtml + minhtml + tophtml2 + '<div style=" display:none;" id="zhengwendiv" ><div style=" padding-left:15px; width:386px;"><div class="biaoto" id="clippertitle" contentEditable=true onbeforedeactivate="document.domain=\'' + document.domain + '\';parent.myOnbeforedeactivate(true)" ' + notietitlerr + '></div><div style="display:none">abc</div></div><div class="zhengwen" style="min-height:250px;" id="editcontent" contentEditable=true onbeforedeactivate="document.domain=\'' + document.domain + '\';parent.myOnbeforedeactivate()" onclick="document.domain=\'' + document.domain + '\';parent.myOnbeforedeactivate()" onfocus="document.domain=\'' + document.domain + '\';contentfocus(this)" onblur="document.domain=\'' + document.domain + '\';contentblur(this)"></div>' + bottomhtml);
                        doc.close()
                    }, 100)
                } catch (err) {
                }
            }
        }, reset: function () {
            this.selection = null, this.range = null, this.title = null, this.content = null, this.state = 0, this.wrapper.style.display = ""
        }, getNavigatorSign: function () {
            var e = navigator.userAgent.toLowerCase(),
                t = /msie/.test(e) ? parseFloat(e.match(/msie ([\d.]+)/)[1]) : !1;
            return parseInt(t) >= 7 ? "true" : "false"
        }, fillForm: function () {
            var e = this.getNavigatorSign(), t = document, n = docNoteClipperConfiguration;
            var temptitle = "";
            temptitle = title;
            if (isBrowser() == "IE") {
                iframedocument.getElementById("clippertitle").innerText = htmlDecode(temptitle.replace("\"", "“").replace("\"", "”"))
            } else {
                iframedocument.getElementById("clippertitle").textContent = htmlDecode(temptitle.replace("\"", "“").replace("\"", "”"))
            }
            if (getCookie("newinstall") != "") {
                var strurl = document.URL;
                var strtitle = iframedocument.getElementById("clippertitle").innerHTML;
                getJSON("//clipper.360doc.com/clippertool/helpnewlog.ashx?type=1&url=" + encodeURIComponent(strurl) + "&title=" + escape(strtitle) + "&jsoncallback=?")
            }
            if (window.location && strUrl.indexOf("v.youku.com") > -1 && document.getElementById("ykPlayer")) {
                iframedocument.getElementById("loadingimg").style.display = "none";
                iframedocument.getElementById("loadingtipdiv").style.display = "none";
                iframedocument.getElementById("zhengwendiv").style.display = "";
                setHTML("<a href=\"" + strUrl + "\" target=\"_blank\"><img src=\"//clipper.360doc.com/clippertool/pubimage/audioplay.jpg\"></a>");
                extractcontent = "<a href=\"" + strUrl + "\" target=\"_blank\"><img src=\"//clipper.360doc.com/clippertool/pubimage/audioplay.jpg\"></a>";
                return
            }
            if (window.location && strUrl.indexOf("www.ixigua.com") > -1 && document.getElementById("vjs_video_3_html5_api")) {
                iframedocument.getElementById("loadingimg").style.display = "none";
                iframedocument.getElementById("loadingtipdiv").style.display = "none";
                iframedocument.getElementById("zhengwendiv").style.display = "";
                setHTML("<a href=\"" + strUrl + "\" target=\"_blank\"><img src=\"//clipper.360doc.com/clippertool/pubimage/audioplay.jpg\"></a>");
                extractcontent = "<a href=\"" + strUrl + "\" target=\"_blank\"><img src=\"//clipper.360doc.com/clippertool/pubimage/audioplay.jpg\"></a>";
                return
            }
            if (this.content == "error" && docNoteClipperConfiguration.doc.contentType == "1") {
                if (window.location && (strUrl.indexOf("http://www.360doc.com/my2014") > -1)) {
                    iframedocument.getElementById("loadingimg").style.display = "none";
                    iframedocument.getElementById("loadingtipdiv").style.display = "none";
                    iframedocument.getElementById("zhengwendiv").style.display = "";
                    setHTML("<div style=\"background:url(//clipper.360doc.com/clippertool/pubimage/lixiacohen1.jpg) no-repeat; width:653px; height:143px; font-size:18px; font-family:微软雅黑; \"> <p style=\" padding-top:103px; _padding-top:113px; padding-left:60px; \">" + temptitle.split("\"")[1] + "，你好！</p></div><div style=\"background:url(//clipper.360doc.com/clippertool/pubimage/lixiaochen2.jpg) no-repeat; width:653px; height:213px;\"><div style=\"text-align:center; padding-top:10px; _padding-top:10px; font-size:18px; color: #0F0F0F; line-height:48px; font-family:微软雅黑; \">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2014年过去了，站在辞旧迎新的交叉点上回望，阅读是否复<br />苏了生活，塑造出一个全新的你？你不负光阴，光阴终不负你。<br />打开360doc--2014知识年谱，开启你的回顾之旅！<br /><a href=\"http://www.360doc.com/my2014/" + strUrl.replace("http://www.360doc.com/my2014/", "").replace("http://www.360doc.com/my2014.aspx?userid=", "").replace("http://www.360doc.com/my2014ie.aspx?userid=", "").replace("http://www.360doc.com/my2014pad.aspx?userid=", "") + "\" target=\"_blank\">http://www.360doc.com/my2014/" + strUrl.replace("http://www.360doc.com/my2014/", "").replace("http://www.360doc.com/my2014.aspx?userid=", "").replace("http://www.360doc.com/my2014ie.aspx?userid=", "").replace("http://www.360doc.com/my2014pad.aspx?userid=", "") + "</a></div></div><div style=\"background:url(//clipper.360doc.com/clippertool/pubimage/lixiaochen3.jpg) no-repeat; width:653px; height:337px;\"><div style=\"font-size:18px; color: #0F0F0F; font-family:微软雅黑; padding-left:420px;\">360doc个人图书馆</div></div>");
                    return
                } else if (window.location && (strUrl.indexOf("http://www.360doc.com/my2015") > -1 || strUrl.indexOf("http://www.360doc.com/report/2015/my2015") > -1)) {
                    iframedocument.getElementById("loadingimg").style.display = "none";
                    iframedocument.getElementById("loadingtipdiv").style.display = "none";
                    iframedocument.getElementById("zhengwendiv").style.display = "";
                    setHTML("<div class=\"content\" style=\"width: 658px;height: 694px;background: url(//clipper.360doc.com/clippertool/pubimage/zhanneixinbg.jpg) no-repeat center;\">" + "<div class=\"content_txt\" style=\"width: 520px;margin: 0 auto;font-family: '微软雅黑'; font-size: 18px; color: #502f13; line-height:40px; padding:70px 0 0 0;\">" + "<p style=\"margin: 0;padding: 0;\"><span>" + temptitle.replace("的360doc知识版图（2015）", "") + "</span>&nbsp;馆友：</p><p style=\"text-indent: 46px;margin: 0;padding: 0;\">你好!</p>" + "<p style=\"text-indent: 46px;margin: 0;padding: 0;\">又一年过去了，回望2015年，有人忙着抢头条，有人忙着拼颜值，你在忙些什么？</p>" + "<p style=\"text-indent: 46px;margin: 0;padding: 0;\">时间从不说谎，付出终有回报。360doc也是蛮拼的，加班加点整理出你的知识版图，为你在360doc的这一年划上句号。点击下方链接，查看你的360doc知识版图（2015）吧！</p>" + "<p style=\"margin: 0;padding: 0;\"><a href=\"http://www.360doc.com/my2015/" + strUrl.replace("http://www.360doc.com/my2015/", "").replace("http://www.360doc.com/report/2015/my2015.aspx?userid=", "") + "\" style=\"color: #1d79b9;text-decoration: none;margin: 0;padding: 0;\">http://www.360doc.com/my2015/" + strUrl.replace("http://www.360doc.com/my2015/", "").replace("http://www.360doc.com/report/2015/my2015.aspx?userid=", "") + "</a></p>" + "</div></div>");
                    return
                } else if (window.location && (strUrl.indexOf("www.toutiao.com") > -1 || strUrl.indexOf(".365yg.com/") > -1) && (document.getElementById("vjs_video_3") || document.getElementById("vjs_video_3_html5_api"))) {
                    iframedocument.getElementById("loadingimg").style.display = "none";
                    iframedocument.getElementById("loadingtipdiv").style.display = "none";
                    iframedocument.getElementById("zhengwendiv").style.display = "";
                    setHTML("<a href=\"" + strUrl + "\" target=\"_blank\"><img src=\"//clipper.360doc.com/clippertool/pubimage/audioplay.jpg\"></a>");
                    extractcontent = "<a href=\"" + strUrl + "\" target=\"_blank\"><img src=\"//clipper.360doc.com/clippertool/pubimage/audioplay.jpg\"></a>";
                    return
                }
                if (video() != "") {
                    iframedocument.getElementById("loadingimg").style.display = "none";
                    iframedocument.getElementById("loadingtipdiv").style.display = "none";
                    iframedocument.getElementById("zhengwendiv").style.display = "";
                    setHTML(video());
                    extractcontent = video();
                    return
                }
                errortip();
                return
            } else {
                iframedocument.getElementById("loadingimg").style.display = "none";
                iframedocument.getElementById("loadingtipdiv").style.display = "none";
                iframedocument.getElementById("zhengwendiv").style.display = ""
            }
            if (getSelectedContents() != "") {
                var div = document.createElement("div");
                div.innerHTML = this.content;
                if (div.getElementsByTagName("embed").length > 0 || div.getElementsByTagName("object").length > 0) {
                    var oldVideo = div.getElementsByTagName("embed").length > 0 ? div.getElementsByTagName("embed")[0] : div.getElementsByTagName("object")[0];
                    if (cratevideo()) {
                        if (strUrl.indexOf("video.sina.com.cn") > -1 || strUrl.indexOf("sports.sina.com.cn") > -1) {
                            if (div.getElementsByTagName("object").length > 1) {
                                div.getElementsByTagName("object")[1].parentNode.parentNode.removeChild(div.getElementsByTagName("object")[1].parentNode)
                            }
                            if (cratevideo() != null) oldVideo.parentNode.parentNode.replaceChild(cratevideo(), oldVideo.parentNode)
                        } else {
                            if (cratevideo() != null) oldVideo.parentNode.replaceChild(cratevideo(), oldVideo)
                        }
                    }
                }
                this.content = div.innerHTML;
                if (window.location && (strUrl.indexOf("http://www.360doc.com/my2014") > -1)) {
                    this.content = "<div style=\"background:url(//clipper.360doc.com/clippertool/pubimage/lixiacohen1.jpg) no-repeat; width:653px; height:143px; font-size:18px; font-family:微软雅黑;\"> <p style=\"padding-top:103px; _padding-top:113px; padding-left:60px; \">" + temptitle.split("\"")[1] + "，你好！</p></div><div style=\"background:url(//clipper.360doc.com/clippertool/pubimage/lixiaochen2.jpg) no-repeat; width:653px; height:213px;\"><div style=\"text-align:center; padding-top:10px; _padding-top:10px; font-size:18px; color: #0F0F0F; line-height:48px; font-family:微软雅黑; \">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2014年过去了，站在辞旧迎新的交叉点上回望，阅读是否复<br />苏了生活，塑造出一个全新的你？你不负光阴，光阴终不负你。<br />打开360doc--2014知识年谱，开启你的回顾之旅！<br /><a href=\"http://www.360doc.com/my2014/" + strUrl.replace("http://www.360doc.com/my2014/", "").replace("http://www.360doc.com/my2014.aspx?userid=", "").replace("http://www.360doc.com/my2014ie.aspx?userid=", "").replace("http://www.360doc.com/my2014pad.aspx?userid=", "") + "\" target=\"_blank\">http://www.360doc.com/my2014/" + strUrl.replace("http://www.360doc.com/my2014/", "").replace("http://www.360doc.com/my2014.aspx?userid=", "").replace("http://www.360doc.com/my2014ie.aspx?userid=", "").replace("http://www.360doc.com/my2014pad.aspx?userid=", "") + "</a></div></div><div style=\"background:url(//clipper.360doc.com/clippertool/pubimage/lixiaochen3.jpg) no-repeat; width:653px; height:337px;\"><div style=\"font-size:18px; color: #0F0F0F; font-family:微软雅黑; padding-left:420px;\">360doc个人图书馆</div></div>"
                } else if (window.location && (strUrl.indexOf("http://www.360doc.com/my2015") > -1 || strUrl.indexOf("http://www.360doc.com/report/2015/my2015") > -1)) {
                    this.content = "<div class=\"content\" style=\"width: 658px;height: 694px;background: url(//clipper.360doc.com/clippertool/pubimage/zhanneixinbg.jpg) no-repeat center;\">" + "<div class=\"content_txt\" style=\"width: 520px;margin: 0 auto;font-family: '微软雅黑'; font-size: 18px; color: #502f13; line-height:40px; padding:70px 0 0 0;\">" + "<p style=\"margin: 0;padding: 0;\"><span>" + temptitle.replace("的360doc知识版图（2015）", "") + "</span>&nbsp;馆友：</p><p style=\"text-indent: 46px;margin: 0;padding: 0;\">你好!</p>" + "<p style=\"text-indent: 46px;margin: 0;padding: 0;\">又一年过去了，回望2015年，有人忙着抢头条，有人忙着拼颜值，你在忙些什么？</p>" + "<p style=\"text-indent: 46px;margin: 0;padding: 0;\">时间从不说谎，付出终有回报。360doc也是蛮拼的，加班加点整理出你的知识版图，为你在360doc的这一年划上句号。点击下方链接，查看你的360doc知识版图（2015）吧！</p>" + "<p style=\"margin: 0;padding: 0;\"><a href=\"http://www.360doc.com/my2015/" + strUrl.replace("http://www.360doc.com/my2015/", "").replace("http://www.360doc.com/report/2015/my2015.aspx?userid=", "") + "\" style=\"color: #1d79b9;text-decoration: none;margin: 0;padding: 0;\">http://www.360doc.com/my2015/" + strUrl.replace("http://www.360doc.com/my2015/", "").replace("http://www.360doc.com/report/2015/my2015.aspx?userid=", "") + "</a></p>" + "</div></div>"
                }
                setHTML(this.content)
            } else {
                if (IsIpadBrowser()) {
                    if (ispadcut) {
                        setHTML(this.content)
                    } else {
                        setTimeout(function () {
                            if (maincontentfull != "") {
                                var div = document.createElement("div");
                                div.innerHTML = maincontentfull;
                                if (div.getElementsByTagName("embed").length > 0 || div.getElementsByTagName("object").length > 0) {
                                    var oldVideo = div.getElementsByTagName("embed").length > 0 ? div.getElementsByTagName("embed")[0] : div.getElementsByTagName("object")[0];
                                    if (cratevideo()) {
                                        if (strUrl.indexOf("video.sina.com.cn") > -1 || strUrl.indexOf("sports.sina.com.cn") > -1) {
                                            if (div.getElementsByTagName("object").length > 1) {
                                                div.getElementsByTagName("object")[1].parentNode.parentNode.removeChild(div.getElementsByTagName("object")[1].parentNode)
                                            }
                                            if (cratevideo() != null) oldVideo.parentNode.parentNode.replaceChild(cratevideo(), oldVideo.parentNode)
                                        } else {
                                            if (cratevideo() != null) oldVideo.parentNode.replaceChild(cratevideo(), oldVideo)
                                        }
                                    }
                                }
                                maincontentfull = div.innerHTML;
                                if (strUrl.indexOf("wenku.baidu.com") > -1) {
                                    if (video() != "") {
                                        maincontentfull = video();
                                        extractcontent = video()
                                    }
                                }
                                setHTML(maincontentfull);
                                try {
                                    document.getElementById("doc360_close").focus()
                                } catch (err) {
                                }
                            } else {
                                iframedocument.getElementById("editcontent").innerHTML = "";
                                try {
                                } catch (err) {
                                }
                            }
                        }, 300)
                    }
                } else {
                    setTimeout(function () {
                        if (maincontentfull != "") {
                            var div = document.createElement("div");
                            div.innerHTML = maincontentfull;
                            if (div.getElementsByTagName("embed").length > 0 || div.getElementsByTagName("object").length > 0) {
                                var oldVideo = div.getElementsByTagName("embed").length > 0 ? div.getElementsByTagName("embed")[0] : div.getElementsByTagName("object")[0];
                                if (cratevideo()) {
                                    if (strUrl.indexOf("video.sina.com.cn") > -1 || strUrl.indexOf("sports.sina.com.cn") > -1) {
                                        if (div.getElementsByTagName("object").length > 1) {
                                            div.getElementsByTagName("object")[1].parentNode.parentNode.removeChild(div.getElementsByTagName("object")[1].parentNode)
                                        }
                                        if (cratevideo() != null) oldVideo.parentNode.parentNode.replaceChild(cratevideo(), oldVideo.parentNode)
                                    } else {
                                        if (cratevideo() != null) oldVideo.parentNode.replaceChild(cratevideo(), oldVideo)
                                    }
                                }
                            }
                            maincontentfull = div.innerHTML;
                            if (window.location && strUrl.indexOf("wenku.baidu.com") > -1) {
                                if (video() != "") {
                                    maincontentfull = video();
                                    extractcontent = video()
                                }
                            }
                            setHTML(maincontentfull);
                            try {
                                document.getElementById("doc360_close").focus();
                                iframedocument.getElementById("editcontent").focus();
                                iframedocument.getElementById("editcontent").click()
                            } catch (err) {
                            }
                        } else {
                            iframedocument.getElementById("editcontent").innerHTML = "";
                            try {
                            } catch (err) {
                            }
                        }
                    }, 300)
                }
            }
        }
    }), _docNote.Selection = function () {
    }, _docNote.Common.extend(_docNote.Selection.prototype, {
        getSelection: function () {
            var e = window, t = e.document;
            return _docNote.Common.browser.isIE ? this.selection = document.selection : this.selection = e.getSelection(), this.hasSelection() ? this.selectionParentWindow = e : this.getNestedRange(e), this.selection
        }, hasSelection: function () {
            return typeof this.selection.createRange == "function" ? this.selection.createRange().htmlText == "" ? !1 : !0 : this.selection.rangeCount == 0 ? !1 : !0
        }
    }), _docNote.ClipperManager = function () {
        if (window.location && window.location.toString().indexOf(".360doc.com") >= 0 && window.location.toString().indexOf("content") >= 0) {
            alert("网文摘手只能收藏本网站以外的文章，请点击文章标题下方的“转藏到我的图书馆”收藏此文！");
            return
        }
        this.init()
    }, _docNote.Common.extend(_docNote.ClipperManager.prototype, {
        run: function () {
            this.clipper.reset();
            this.clipper.wrapper.display = "";
            this.clipper.clipContent();
            if (this.clipper.state != _docNote.Clipper.CLIPPED) return;
            this.clipper.submit()
        }, submit: function () {
            this.clipper.state == _docNote.Clipper.CLIPPED ? this.clipper.submit() : ""
        }, init: function () {
            this.clipper = new _docNote.Clipper
        }
    }), _docNote.App = function () {
    }, _docNote.App.prototype = {
        creatDiv: function (e, t, n, r, i, s) {
            var o = document.createElement("div");
            o.id = e;
            if (!s) var s = "position:absolute;filter:alpha(opacity=50);background-color:#000;opacity:0.5;z-index:" + getZindex() + ";";
            return s += "height:" + n + "px;", s += "width:" + t + "px;", s += "left:" + r + "px;", s += "top:" + i + "px;", o.style.cssText = s, o
        }, removeDiv: function (e) {
            var t = document.getElementById(e);
            t && document.body.removeChild(t)
        }, removeClipDiv: function () {
            for (var e = 0; e < 5; e++) this.removeDiv("yShade" + e);
            this.shadeStatu = !1
        }, createClipDiv: function () {
            if (this.mainElem) {
                var docframe = window.document;
                if (doc360_iframeindex > -1) docframe = window.frames[doc360_iframeindex].document;
                var e = this.mainElem, t = Math.abs(e.common.findPos(e.elem).y),
                    n = Math.abs(e.common.findPos(e.elem).x),
                    r = e.elem.scrollWidth > 0 ? e.elem.scrollWidth : e.elem.offsetWidth,
                    i = e.elem.scrollHeight > 0 ? e.elem.scrollHeight : e.elem.offsetHeight,
                    s = document.documentElement.scrollWidth, o = document.documentElement.scrollHeight;
                if (doc360_iframeindex > -1) {
                    var obj = window.frames[doc360_iframeindex].frameElement;
                    t = t + getPosition(obj).top;
                    n = n + getPosition(obj).left
                }
                this.removeClipDiv();
                var u = [], a = document.body.scrollWidth == document.body.offsetWidth,
                    f = "position:absolute;border:5px solid #669a24;border:5px solid #669a24;-webkit-border-radius:5px;-moz-border-radius:5px;-khtml-border-radius:5px;z-index:9999;",
                    l = (document.body.offsetWidth - document.documentElement.scrollWidth) / 2;
                u[0] = this.creatDiv("yShade0", s, t, l, 0), u[1] = this.creatDiv("yShade1", s, o - t - i, l, t + i), u[2] = this.creatDiv("yShade2", n, i, l, t), u[3] = this.creatDiv("yShade3", s - r - n, i, r + n + l, t), u[4] = this.creatDiv("yShade4", r, i, n - 5 + l, t - 5, f);
                var emptydiv = document.createElement("div");
                emptydiv.id = "emptydiv";
                emptydiv.style.position = "relative";
                var divclose = document.createElement("img");
                divclose.style.cssText = "border:0px;";
                var divcloseA = document.createElement("a");
                divcloseA.href = "javascript:void(0)";
                divcloseA.title = "取消自动获取的正文，\n你可以手动选取要保存的内容";
                divcloseA.style.position = "absolute";
                divcloseA.style.display = "block";
                divcloseA.id = "doc360_close";
                divcloseA.style.zIndex = "2147483640";
                divclose.src = "//clipper.360doc.com/clippertool/pubimage/del.png";
                divclose.style.opacity = 1;
                divclose.onclick = function () {
                    docApp.removeClipDiv();
                    iframedocument.getElementById("editcontent").innerHTML = "";
                    document.getElementById("doc360_close").parentNode.removeChild(document.getElementById("doc360_close"));
                    iframedocument.getElementById("editcontent").focus();
                    iframedocument.getElementById("editcontent").click()
                };
                divcloseA.appendChild(divclose);
                divcloseA.style.top = (parseInt(u[4].style.top) - 35) + "px";
                divcloseA.style.left = u[4].style.left;
                document.body.appendChild(divcloseA);
                tip2top = u[4].style.top;
                tip2left = u[4].style.left;
                for (var c = 0, h = u.length; c < h; c++) document.body.appendChild(u[c])
            }
            this.shadeStatu = !0
        }, mainElem: function () {
            if (video() != "") {
                try {
                    if (strUrl.indexOf("doc88") > -1 && navigator.userAgent.toLocaleLowerCase().indexOf("qqbrowser") > -1) {
                    } else {
                        docNoteClipperConfiguration.doc.contentType = "1";
                        return null
                    }
                } catch (err) {
                    docNoteClipperConfiguration.doc.contentType = "1";
                    return null
                }
            } else if (window.location && (strUrl.indexOf("http://www.360doc.com/my2014") > -1)) {
                docNoteClipperConfiguration.doc.contentType = "1";
                return null
            }
            var e = new Page(window.document);
            t = e.getNoteMainArticle();
            return t && (docNoteClipperConfiguration.doc.mainContent = t.elem, docNoteClipperConfiguration.doc.contentType = "2"), t
        }(), run: function () {
            this.clipperManager = window.yaapp;
            this.clipperManager.run()
        }
    };
    var r = null, i = null, s = null, timeoutstatus = 0, o = function () {
        if (window.location) {
            if (window.location.toString().indexOf(".360doc.com") >= 0 && window.location.toString().indexOf("content") >= 0) {
                return
            }
        }
        if (video() != "") {
            docNoteClipperConfiguration.doc.contentType = "1"
        }
        timeoutstatus++;
        try {
            if (timeoutstatus > 40 && navigator.userAgent.toLowerCase().indexOf("rv:") > -1) {
                (window.__docNote_app_load = !0, window.docApp = new _docNote.App, docApp.run(), bindmouseRange(), clippertype = 2, docNoteClipperConfiguration.doc.contentType === "2" && docApp.createClipDiv(), clearTimeout(r), timeoutstatus = 0);
                return
            }
        } catch (errrv) {
        }
        document.readyState != "complete" && document.readyState != "loaded" && document.readyState != "interactive" || !document.body ? r = setTimeout(o, 300) : (window.__docNote_app_load = !0, window.docApp = new _docNote.App, docApp.run(), bindmouseRange(), clippertype = 2, docNoteClipperConfiguration.doc.contentType === "2" && docApp.createClipDiv(), clearTimeout(r), timeoutstatus = 0)
    };
    window.docNoteInit = _docNote;
    window.abcdef = o
}();

function createClipper() {
    window.yaapp = new window.docNoteInit.ClipperManager;
    startcreateClipper();
    closelogin()
}

function startcreateClipper() {
    if (iframedocument && iframedocument.getElementById("clippertitle")) {
        setTimeout(window.abcdef, 100);
        settip(cookievalue);
        if (iframedocument && iframedocument.attachEvent) {
            iframedocument.getElementById("editcontent").attachEvent("onkeyup", function (e) {
                var esrc = event.srcElement || event.target;
                if (getMouseEvent2(esrc)) {
                    if (e.ctrlKey && e.keyCode == 86) {
                        iframedocument.getElementById("clippertitle").innerHTML = getInnerText(iframedocument.getElementById("clippertitle"))
                    }
                }
            });
            iframedocument.body.attachEvent("onpaste", function (e) {
                setTimeout(function () {
                    iframedocument.getElementById("clippertitle").innerHTML = getInnerText(iframedocument.getElementById("clippertitle"))
                }, 100)
            })
        } else {
            if (iframedocument) {
                iframedocument.addEventListener("keyup", function (e) {
                    try {
                        var esrc = event.srcElement || event.target;
                        if (getMouseEvent2(esrc)) {
                            if (e.ctrlKey && e.keyCode == 86) {
                                iframedocument.getElementById("clippertitle").innerHTML = getInnerText(iframedocument.getElementById("clippertitle"))
                            }
                        }
                    } catch (err) {
                    }
                }, false);
                iframedocument.addEventListener("paste", function (e) {
                    setTimeout(function () {
                        iframedocument.getElementById("clippertitle").innerHTML = getInnerText(iframedocument.getElementById("clippertitle"))
                    }, 100)
                }, false)
            }
        }
        if (iframedocument && iframedocument.attachEvent) {
            iframedocument.attachEvent("onkeydown", function (e) {
                var oRTE = iframeWindow;
                var keyCode = oRTE.event.keyCode ? oRTE.event.keyCode : oRTE.event.which ? oRTE.event.which : oRTE.event.charCode;
                if (keyCode == 8) {
                    if (oRTE.document.selection.type.toLowerCase() == "control") {
                        getElement().parentNode.removeChild(getElement());
                        return false
                    }
                }
            })
        }
    } else {
        setTimeout(function () {
            startcreateClipper()
        }, 100)
    }
}

function bindmouseRange() {
    var win;
    var iframes = document.getElementsByTagName("iframe");
    win = window;
    bindmouseRangePerIframe(win);
    if (iframes.length > 0) {
        for (var i = 0; i < iframes.length; i++) {
            try {
                if (window.frames[i] != null && document.getElementsByTagName("iframe")[i].id != "testIframe") {
                    if (window.frames[i].src == null) continue;
                    bindmouseRangePerIframe(window.frames[i])
                }
            } catch (e) {
            }
        }
    }
}

function bindmouseRangePerIframe(win) {
    if (!win.document.getElementById("eleImgShare360doc")) {
        var eleImgShare360doc = win.document.createElement("img");
        eleImgShare360doc.src = "//clipper.360doc.com/clippertool/pubimage/cut.png";
        eleImgShare360doc.style.position = "absolute";
        eleImgShare360doc.style.display = "none";
        eleImgShare360doc.style.left = "441px";
        eleImgShare360doc.style.top = "334px";
        eleImgShare360doc.style.zIndex = "2147483647";
        eleImgShare360doc.id = "eleImgShare360doc";
        win.document.body.appendChild(eleImgShare360doc);
        eleSharebind360doc(eleImgShare360doc, win)
    }
}

var iscutre = false;

function IsIpadBrowser() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    return bIsIpad
}

var padselecthtml = "";
var ispadcut = false;

function eleSharebind360doc(eleShare, win) {
    var eleContainer = null;
    var eleTitle = "";
    if (win != null && win.document != null && win.document.getElementsByTagName("title") != null) eleTitle = win.document.getElementsByTagName("title")[0];
    if (win != null) eleContainer = win.document;
    var funGetSelectTxt = function () {
        return getSelectedContents()
    };
    eleShare.onclick = function () {
        if (iframedocument.getElementById("main360docdiv").style.display == "none") {
            openMax()
        }
        if (false) {
            ispadcut = true;
            window.abcdef();
            deleteErrorTip();
            isClose = false;
            ispadcut = false;
            if (isBrowser() == "IE") {
                temptitle = (document.getElementsByTagName("title")[0].innerText)
            } else {
                temptitle = (document.getElementsByTagName("title")[0].textContent)
            }
        } else {
            iscutre = true;
            var temptemp = deleteErrorTip();
            var abc = getSelectHTML();
            var div = document.createElement("div");
            div.innerHTML = abc;
            if (div.getElementsByTagName("embed").length > 0 || div.getElementsByTagName("object").length > 0) {
                var oldVideo = div.getElementsByTagName("embed").length > 0 ? div.getElementsByTagName("embed")[0] : div.getElementsByTagName("object")[0];
                if (strUrl.indexOf("video.sina.com.cn") > -1 || strUrl.indexOf("sports.sina.com.cn") > -1) {
                    if (div.getElementsByTagName("object").length > 1) {
                        div.getElementsByTagName("object")[1].parentNode.parentNode.removeChild(div.getElementsByTagName("object")[1].parentNode)
                    }
                    if (cratevideo() != null) oldVideo.parentNode.parentNode.replaceChild(cratevideo(), oldVideo.parentNode)
                } else {
                    if (cratevideo() != null) oldVideo.parentNode.replaceChild(cratevideo(), oldVideo)
                }
            }
            abc = div.innerHTML;
            padselecthtml = "";
            if (temptemp != "none") {
                iframedocument.body.focus()
            }
            if ((isBrowser() != "IE") && isdeleteErrorTip) {
                iframedocument.getElementById("editcontent").focus();
                iframedocument.getElementById("editcontent").focus()
            } else {
                if (ieSelectionBookmark) {
                    if (isTitleclick) {
                        iframedocument.getElementById("clippertitle").focus()
                    } else {
                        iframedocument.getElementById("editcontent").focus()
                    }
                    myOnactivate()
                } else {
                    if (isTitleclick) {
                        iframedocument.getElementById("clippertitle").focus()
                    } else {
                        iframedocument.getElementById("editcontent").focus()
                    }
                    myOnactivate()
                }
            }
            if ((isBrowser() != "IE") && isdeleteErrorTip) {
                iframedocument.getElementById("editcontent").focus();
                iframedocument.getElementById("editcontent").focus()
            }
            setHTML(abc, true);
            isdeleteErrorTip = false
        }
        eleShare.style.display = "none"
    };
    if (IsIpadBrowser()) {
        win.document.addEventListener("touchend", function (e) {
            padselecthtml = getSelectedContents()
        }, false);
        win.document.addEventListener("touchend", function (e) {
            if (isFullClose) return;
            var esrc = win.event.srcElement || win.event.target;
            if (esrc.id == "eleImgShare360doc") return;
            if (!getMouseEvent(esrc)) {
                e = e || win.event;
                var txt = funGetSelectTxt(),
                    sh = win.pageYOffset || win.document.documentElement.scrollTop || win.document.body.scrollTop || 0;
                if (txt) {
                    var left = e.changedTouches[0].pageX + 20;
                    var top = e.changedTouches[0].pageY + 20;
                    eleShare.style.display = "inline";
                    eleShare.style.left = left + "px";
                    if (iscuterror) {
                        if (top > 100) {
                            eleShare.style.top = (top - 100) + "px"
                        } else {
                            eleShare.style.top = 100 + "px"
                        }
                    } else {
                        eleShare.style.top = top + "px"
                    }
                    eleShare.style.zIndex = "2147483647";
                    padselecthtml = getSelectedContents();
                    setTimeout(function () {
                        if (!funGetSelectTxt()) {
                            eleShare.style.display = "none"
                        }
                    }, 20)
                } else {
                    eleShare.style.display = "none"
                }
            }
        }, false)
    } else {
        if (win.document.attachEvent) {
            win.document.attachEvent("onmouseup", function (e) {
                if (isFullClose) return;
                var esrc = win.event.srcElement || win.event.target;
                if (isright) return;
                if (getMouseEvent(esrc)) {
                    ismain360docdivup = true
                } else {
                    ismain360docdivup = false
                }
                if (ismain360docdivup == true && ismain360docdivdown == true) {
                    return
                }
                if (true) {
                    e = e || win.event;
                    var txt = funGetSelectTxt(),
                        sh = win.pageYOffset || win.document.documentElement.scrollTop || win.document.body.scrollTop || 0;
                    var left = (e.clientX - 40 < 0) ? e.clientX + 20 : e.clientX - 40,
                        top = (e.clientY - 40 < 0) ? e.clientY + sh + 20 : e.clientY + sh - 40;
                    if (txt) {
                        eleShare.style.display = "inline";
                        eleShare.style.left = left + "px";
                        if (iscuterror) {
                            if (top > 100) {
                                eleShare.style.top = (top - 100) + "px"
                            } else {
                                eleShare.style.top = 100 + "px"
                            }
                        } else {
                            eleShare.style.top = top + "px"
                        }
                        eleShare.style.zIndex = "2147483647";
                        setTimeout(function () {
                            if (!funGetSelectTxt()) {
                                eleShare.style.display = "none"
                            }
                        }, 20)
                    } else {
                        eleShare.style.display = "none"
                    }
                }
            })
        } else {
            win.document.addEventListener("mouseup", function (e) {
                if (isFullClose) return;
                var esrc = e.srcElement || e.target;
                if (isright) return;
                if (getMouseEvent(esrc)) {
                    ismain360docdivup = true
                } else {
                    ismain360docdivup = false
                }
                if (ismain360docdivup == true && ismain360docdivdown == true) {
                    return
                }
                if (true) {
                    e = e || win.event;
                    var txt = funGetSelectTxt(),
                        sh = win.pageYOffset || win.document.documentElement.scrollTop || win.document.body.scrollTop || 0;
                    var left = (e.clientX - 40 < 0) ? e.clientX + 20 : e.clientX - 40,
                        top = (e.clientY - 40 < 0) ? e.clientY + sh + 20 : e.clientY + sh - 40;
                    if (txt) {
                        eleShare.style.display = "inline";
                        eleShare.style.left = left + "px";
                        if (iscuterror) {
                            if (top > 100) {
                                eleShare.style.top = (top - 100) + "px"
                            } else {
                                eleShare.style.top = 100 + "px"
                            }
                        } else {
                            if (navigator.userAgent.toString().indexOf("rv:11") > -1 || navigator.userAgent.toString().toLowerCase().indexOf("edge") > -1) {
                                setTimeout(function () {
                                    eleShare.style.top = top + "px"
                                }, 20)
                            } else {
                                eleShare.style.top = top + "px"
                            }
                        }
                        eleShare.style.zIndex = "2147483647";
                        setTimeout(function () {
                            if (!funGetSelectTxt()) {
                                eleShare.style.display = "none"
                            }
                        }, 20)
                    } else {
                        eleShare.style.display = "none"
                    }
                }
            }, true);
            win.document.addEventListener("mousedown", function (e) {
                var esrc = e.srcElement || e.target;
                var e = win.event || e;
                var value = e.button;
                if (value == 2 || value == 3) {
                    isright = true
                } else {
                    isright = false
                }
                if (getMouseEvent(esrc)) {
                    ismain360docdivdown = true
                } else {
                    ismain360docdivdown = false
                }
            }, false)
        }
    }
    if (win.document.attachEvent) {
        win.document.attachEvent("onclick", function (e) {
            var txt = funGetSelectTxt();
            if (txt) {
            } else {
                if (win.document.getElementById("eleImgShare360doc")) win.document.getElementById("eleImgShare360doc").style.display = "none"
            }
        })
    } else {
        win.document.addEventListener("click", function (e) {
            var txt = funGetSelectTxt();
            if (txt) {
            } else {
                if (win.document.getElementById("eleImgShare360doc")) win.document.getElementById("eleImgShare360doc").style.display = "none"
            }
        }, false)
    }
};var isright = false;
var ismain360docdivdown = false;
var ismain360docdivup = false;
document.onmousedown = function (e) {
    if (isBrowser() == "IE") {
        var e = window.event || e;
        var value = e.button;
        if (value == 2 || value == 3) {
            isright = true
        } else {
            isright = false
        }
        var esrc = event.srcElement || event.target;
        if (getMouseEvent(esrc)) {
            ismain360docdivdown = true
        } else {
            ismain360docdivdown = false
        }
    }
};
var iscuterror = false;

function getMouseEvent(srcelm) {
    try {
        iscuterror = false;
        var tempMyObj = srcelm;
        var findDiv = false;
        if (tempMyObj != null) {
            while (tempMyObj.tagName != "BODY") {
                if (tempMyObj.id == "main360docdiv") {
                    findDiv = true;
                    break
                }
                tempMyObj = tempMyObj.parentNode
            }
        }
        return findDiv
    } catch (err) {
        iscuterror = true;
        return false
    }
}

function getSelectHTML() {
    removeNodeList = [];
    pageList = [];
    var divabc = document.createElement("div");
    if (IsIpadBrowser() && padselecthtml != "") {
        divabc.innerHTML = padselecthtml
    } else {
        divabc.innerHTML = getSelectedContents()
    }
    divabc.style.display = "none";
    document.body.appendChild(divabc);
    needJudgeTitle = true;
    deleteScript(divabc);
    needDelete = false;
    dom(divabc);
    deletePage();
    for (var i = 0; i < removeNodeList.length; i++) {
        if (removeNodeList[i].nodeName.toLowerCase() == "iframe" && strUrl.indexOf("mp.weixin.qq.com") > -1 && removeNodeList[i].className == "video_iframe") {
            diviframe = document.createElement("embed");
            diviframe.src = removeNodeList[i].src;
            try {
                diviframe.width = removeNodeList[i].width;
                diviframe.height = removeNodeList[i].height
            } catch (err) {
            }
            removeNodeList[i].parentNode.replaceChild(diviframe, removeNodeList[i])
        } else {
            if (removeNodeList[i].parentNode) removeNodeList[i].parentNode.removeChild(removeNodeList[i])
        }
    }
    removeNodeList = [];
    var selecthtml = divabc.innerHTML;
    if (divabc.parentNode != null) divabc.parentNode.removeChild(divabc);
    return selecthtml
}

var iswxvideo = false;

function getSelectHTML2(elm) {
    removeNodeList = [];
    pageList = [];
    var divabc = document.createElement("div");
    divabc.id = "test360doc";
    divabc.innerHTML = elm.innerHTML;
    divabc.style.display = "none";
    document.body.appendChild(divabc);
    needJudgeTitle = true;
    if (strUrl.toLowerCase().indexOf("paper.people.com.cn/rmrb/html") >= 0 && document.getElementsByClassName("lai") && document.getElementsByClassName("lai")[0] && document.getElementsByClassName("c_c") && document.getElementsByClassName("c_c")[0]) {
        divabc.innerHTML = document.getElementsByClassName("lai")[0].innerHTML + document.getElementsByClassName("c_c")[0].innerHTML
    } else if ((strUrl.toLowerCase().indexOf("www.wukong.com/question") >= 0 || strUrl.toLowerCase().indexOf("www.toutiao.com") >= 0) && document.getElementsByClassName("answer-text-full rich-text") && document.getElementsByClassName("answer-text-full rich-text")[0]) {
        divabc.innerHTML = document.getElementsByClassName("answer-text-full rich-text")[0].innerHTML
    } else if (strUrl.toLowerCase().indexOf("wenda.so.com/q") >= 0 && document.getElementsByClassName("resolved-cnt") && document.getElementsByClassName("resolved-cnt")[0]) {
        divabc.innerHTML = document.getElementsByClassName("resolved-cnt")[0].innerHTML
    } else if (strUrl.toLowerCase().indexOf(".people.com.cn") >= 0 && document.getElementById("rwb_zw")) {
        divabc.innerHTML = document.getElementById("rwb_zw").innerHTML
    } else if (strUrl.toLowerCase().indexOf("www.sohu.com/a/") >= 0 && document.getElementsByTagName("article") && document.getElementsByTagName("article")[0]) {
        divabc.innerHTML = document.getElementsByTagName("article")[0].innerHTML
    } else if (strUrl.toLowerCase().indexOf("blog.sina.com.cn/s/") >= 0 && document.getElementById("sina_keyword_ad_area2") && trim(document.getElementById("sina_keyword_ad_area2").innerHTML).length > 0) {
        divabc.innerHTML = document.getElementById("sina_keyword_ad_area2").innerHTML
    }
    needDelete = false;
    deleteScript(divabc);
    dom(divabc);
    deletePage();
    var diviframe = null;
    for (var i = 0; i < removeNodeList.length; i++) {
        if (removeNodeList[i].nodeName.toLowerCase() == "iframe" && strUrl.indexOf("mp.weixin.qq.com") > -1 && removeNodeList[i].className == "video_iframe") {
            diviframe = document.createElement("embed");
            diviframe.src = removeNodeList[i].src;
            try {
                diviframe.width = removeNodeList[i].width;
                diviframe.height = removeNodeList[i].height
            } catch (err) {
            }
            removeNodeList[i].parentNode.replaceChild(diviframe, removeNodeList[i])
        } else {
            if (removeNodeList[i].parentNode) {
                removeNodeList[i].parentNode.removeChild(removeNodeList[i])
            }
        }
    }
    removeNodeList = [];
    var selecthtml = divabc.innerHTML;
    if (divabc.parentNode != null) divabc.parentNode.removeChild(divabc);
    return selecthtml
}

function getSelectedContents() {
    try {
        var iframes = document.getElementsByTagName("iframe");
        if (iframes.length == 0) {
            return getSelectedContentsPerFrame(window)
        } else {
            for (var i = 0; i < iframes.length; i++) {
                try {
                    if (window.frames[i] != null) {
                        if (getSelectedContentsPerFrame(window.frames[i])) {
                            doc360_iframeindex = i;
                            return getSelectedContentsPerFrame(window.frames[i])
                        }
                    }
                } catch (e) {
                }
            }
            return getSelectedContentsPerFrame(window)
        }
    } catch (err) {
        return ""
    }
}

function getSelectedContentsPerFrame(win) {
    try {
        if (win.getSelection) {
            var range = win.getSelection().getRangeAt(0);
            var container = win.document.createElement('div');
            container.appendChild(range.cloneContents());
            return container.innerHTML
        } else if (win.document.getSelection) {
            var range = win.getSelection().getRangeAt(0);
            var container = win.document.createElement('div');
            container.appendChild(range.cloneContents());
            return container.innerHTML
        } else if (win.document.selection) {
            return win.document.selection.createRange().htmlText
        }
    } catch (err) {
        return ""
    }
}

var isClose = false;
var isFullClose = false;

function closeFull() {
    try {
        document.getElementById("eleImgShare360doc").style.display = "";
        document.getElementById("eleImgShare360doc").click();
        document.getElementById("eleImgShare360doc").style.display = "none"
    } catch (err) {
    }
    try {
        var flashlist = iframedocument.getElementById("editcontent").getElementsByTagName("embed");
        for (var i = 0; i < flashlist.length; i++) {
            flashlist[i].parentNode.removeChild(flashlist[i])
        }
        flashlist = iframedocument.getElementById("editcontent").getElementsByTagName("object");
        for (var i = 0; i < flashlist.length; i++) {
            flashlist[i].parentNode.removeChild(flashlist[i])
        }
    } catch (err) {
    }
    try {
        document.getElementById("doc360_close").getElementsByTagName("img")[0].click()
    } catch (err) {
    }
    setTimeout(function () {
        docApp.clipperManager.clipper.close();
        docApp.removeClipDiv();
        if (iframedocument.getElementById("editcontent")) {
            iframedocument.getElementById("editcontent").innerHTML = ""
        }
        docApp.shadeStatu = !1;
        isTitleclick = false;
        isClose = true;
        if (document.getElementById("doc360_close")) {
            document.getElementById("doc360_close").parentNode.removeChild(document.getElementById("doc360_close"))
        }
        isFullClose = true;
        document.getElementById("docNoteWebClipper").parentNode.removeChild(document.getElementById("docNoteWebClipper"));
        document.getElementById("eleImgShare360doc").parentNode.removeChild(document.getElementById("eleImgShare360doc"))
    }, 100);
    iframedocument.getElementById("editcontent").innerHTML = ""
}

var iframeobject;

function minclose() {
    try {
        if (isTitleclick) {
            iframedocument.getElementById("clippertitle").click()
        } else {
            iframedocument.getElementById("editcontent").click()
        }
    } catch (e) {
    }
    iframeobject = iframedocument.getElementById("main360docdiv");
    iframedocument.getElementById("main360docdiv").style.display = "none";
    iframedocument.getElementById("main360docdivmin").style.display = "";
    iframedocument.getElementById("main360docdivmin").style.marginLeft = "220px";
    docApp.removeClipDiv();
    if (document.getElementById("eleImgShare360doc")) {
        document.getElementById("eleImgShare360doc").style.display = "none"
    }
    if (document.getElementById("doc360_close")) {
        document.getElementById("doc360_close").parentNode.removeChild(document.getElementById("doc360_close"))
    }
    if (document.getElementById("docNoteWebClipper")) {
        document.getElementById("docNoteWebClipper").style.height = "34px";
        document.getElementById("testIframe").height = "34";
        document.getElementById("docNoteWebClipper_view").style.height = "34px"
    }
}

function openMax() {
    iframedocument.getElementById("main360docdiv").style.display = "";
    iframedocument.getElementById("main360docdivmin").style.display = "none";
    document.getElementById("docNoteWebClipper").style.height = "460px";
    document.getElementById("testIframe").height = "580px";
    document.getElementById("docNoteWebClipper_view").style.height = "580px"
}

function closelayer() {
    docApp.removeClipDiv();
    docApp.shadeStatu = !1;
    isTitleclick = false;
    isClose = true;
    if (document.getElementById("eleImgShare360doc")) {
        document.getElementById("eleImgShare360doc").style.display = "none"
    }
    if (document.getElementById("doc360_close")) {
        document.getElementById("doc360_close").parentNode.removeChild(document.getElementById("doc360_close"))
    }
    isFullClose = true
}

function delete360doccontent(txt) {
    var div = document.createElement("div");
    div.innerHTML = txt;
    var tempdiv = document.getElementById("main360docdiv");
    if (tempdiv) {
        div.removeChild(tempdiv);
        return div.innerHTML
    } else {
        return div.innerHTML
    }
}

var testi = 1;
var needJudgeTitle = true;
var textLength = 0;
var title = trim(getTitle());
var needDelete = false;

function dom(obj) {
    var curNode;
    var childNode;
    var imgSrc, imgDataSrc;
    var filterlist = new Array("id", "class", "className", "contenteditable", "designmode", "for", "method", "tabindex");
    var pageText = new Array("上一页", "上页", "下一页", "下页", "上一字", "下一字");
    var removeImgSrcList;
    var text = "";
    curNode = obj;
    if (curNode.nodeType == "8" || curNode.nodeType == "9") {
        removeNodeList.push(curNode)
    }
    if (curNode.nodeType == "1") {
        if (strUrl.toLowerCase().indexOf("www.sohu.com") >= 0 && curNode.id != null && curNode.id == "backsohucom") {
            removeNodeList.push(curNode)
        } else if (strUrl.toLowerCase().indexOf("rufodao.qq.com") >= 0 || strUrl.toLowerCase().indexOf("ent.qq.com") >= 0 || strUrl.toLowerCase().indexOf("vlike.qq.com") >= 0) {
            if (curNode.id != null && curNode.id == "backqqcom") removeNodeList.push(curNode);
            if (curNode.nodeName.toLowerCase() == "strong") {
                text = trim(getInnerText(curNode).replace("&nbsp;", ""));
                if (text.indexOf("收听语音版文章") == 0 && text.indexOf("获取更多精彩内容") == text.length - 8) {
                    removeNodeList.push(curNode)
                }
                if (text.indexOf("版权声明：") == 0) {
                    removeNodeList.push(curNode)
                }
            }
            if (curNode.className != null && (curNode.className == "rv-root-v2 rv-js-root" || curNode.className == "like")) removeNodeList.push(curNode)
        } else if (strUrl.toLowerCase().indexOf("www.toutiao.com") >= 0) {
            if (curNode.className != null && curNode.className == "pgc-commodity") {
                removeNodeList.push(curNode)
            }
            if (curNode.id != null && curNode.id == "pgc-card") {
                removeNodeList.push(curNode)
            }
        } else if (strUrl.toLowerCase().indexOf("view.inews.qq.com") >= 0) {
            if (curNode.className != null && curNode.className == "title") {
                removeNodeList.push(curNode)
            }
            if (curNode.id != null && curNode.id == "showMore") {
                removeNodeList.push(curNode)
            }
        } else if (strUrl.toLowerCase().indexOf("wxzhi.com") >= 0) {
            if (curNode.tagName.toLowerCase() == "ins") {
                removeNodeList.push(curNode)
            }
        }
        if (needJudgeTitle && curNode.nodeName.toLowerCase() != "script" && isVisibleNode(curNode)) {
            text = trim(getInnerText(curNode).replace("&nbsp;", ""));
            if (title.length > 0 && text.length > 0) {
                if (text.indexOf(title) >= 0 && text.length - title.length < 10 && text.indexOf("原标题") < 0) {
                    removeNodeList.push(curNode)
                }
            }
            textLength = textLength + text.length;
            if (textLength > 10) {
                needJudgeTitle = false
            }
        }
        var attrs = curNode.attributes;
        try {
            if (attrs != null) {
                for (var j = 0; j < attrs.length; j++) {
                    var a = attrs[j].nodeName.toLowerCase();
                    if (a.indexOf("on") == 0) curNode.removeAttribute(attrs[j].nodeName)
                }
            }
            if (curNode.nodeName.toLowerCase() == "a") {
                text = trim(getInnerText(curNode).replace("&nbsp;", "").replace(" ", ""));
                if (text.length <= 6 && text.length > 0) {
                    for (var i = 0; i < pageText.length; i++) {
                        if (text.indexOf(pageText[i]) >= 0) {
                            pageList.push(curNode);
                            break
                        }
                    }
                }
            }
            if (curNode.nodeName.toLowerCase() == "a" && strUrl.indexOf("yidianzixun.com") >= 0) {
                var spanPre = document.createElement("span");
                spanPre.innerHTML = curNode.innerHTML;
                curNode.parentNode.replaceChild(spanPre, curNode)
            }
            if (curNode.nodeName.toLowerCase() == "script" || curNode.nodeName.toLowerCase() == "iframe" || curNode.nodeName.toLowerCase() == "link" || curNode.nodeName.toLowerCase() == "meta" || !isVisibleNode(curNode) || curNode.nodeName.toLowerCase() == "select" || curNode.nodeName.toLowerCase() == "option" || curNode.nodeName.toLowerCase() == "textarea" || curNode.nodeName.toLowerCase() == "button" || curNode.nodeName.toLowerCase() == "applet" || curNode.nodeName.toLowerCase() == "noscript") {
                removeNodeList.push(curNode)
            } else {
                if (curNode.nodeName.toLowerCase() == "div") {
                    if (curNode.childNodes.length == 0) removeNodeList.push(curNode);
                    if (curNode.childNodes.length == 1 && curNode.childNodes[0].nodeName == "#text" && !/\S/.test(curNode.childNodes[0].nodeValue)) {
                        removeNodeList.push(curNode)
                    }
                }
                if (curNode.nodeName.toLowerCase() == "a" || curNode.nodeName.toLowerCase() == "img" || curNode.nodeName.toLowerCase() == "embed") {
                    if (curNode.nodeName.toLowerCase() == "embed") {
                        try {
                            curNode.wmode = "transparent";
                            curNode.style.zIndex = 0;
                            if (strUrl.indexOf("xiami.com") > -1) {
                                if (curNode.getAttribute("flashvars") && curNode.getAttribute("flashvars").toString().indexOf("dataUrl") > -1) {
                                    curNode.setAttribute("flashvars", curNode.getAttribute("flashvars").toString().replace("dataUrl=", "dataUrl=http://www.xiami.com"))
                                }
                            }
                        } catch (err) {
                        }
                    }
                    if (attrs != null) {
                        imgSrc = "";
                        imgDataSrc = "";
                        removeImgSrcList = [];
                        for (var j = 0; j < attrs.length; j++) {
                            var a = attrs[j].nodeName.toLowerCase();
                            var v = attrs[j].nodeValue;
                            if (a == "href" || a == "src" || a == "data-src" || a == "real_src" || a == "data-ke-src" || a == "data-original" || a == "data-echo" || a == "img_src" || a == "original" || a == "data-actualsrc" || a == "data-url") {
                                if (v.toLowerCase().indexOf("javascript:") == 0 || v.indexOf("#") == 0 || v.indexOf("file:") == 0 || v.indexOf("\\") == 0) {
                                    attrs[j].nodeValue = "";
                                    curNode.removeAttribute(attrs[j].nodeName)
                                } else {
                                    if (v.length > 0) {
                                        v = replaceURL(v);
                                        attrs[j].nodeValue = v;
                                        if (curNode.nodeName.toLowerCase() == "img") {
                                            if (a == "src") {
                                                imgSrc = v
                                            } else if (a == "data-src" || a == "real_src" || a == "data-ke-src" || a == "data-original" || a == "data-echo" || a == "img_src" || a == "original" || a == "data-actualsrc" || a == "data-url") {
                                                removeImgSrcList.push(a);
                                                imgDataSrc = v
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (curNode.nodeName.toLowerCase() == "img") {
                            if (curNode.width && curNode.width > 650) {
                                curNode.style.cssText = "MAX-WIDTH: 650px;width: expression(this.width > 650 && this.width >= this.height ? 650 : true);";
                                try {
                                    curNode.removeAttribute("width");
                                    curNode.removeAttribute("height")
                                } catch (err) {
                                }
                            }
                            if (imgDataSrc.length > 0) {
                                curNode.setAttribute("src", imgDataSrc);
                                for (var i = 0; i < removeImgSrcList.length; i++) {
                                    curNode.removeAttribute(removeImgSrcList[i])
                                }
                            } else {
                                if (imgSrc.length == 0) {
                                    removeNodeList.push(curNode)
                                }
                            }
                        }
                    }
                }
                if (curNode.nodeName.toLowerCase() == "object") {
                    try {
                        if (isBrowser() == 'IE') {
                            for (var ob = 0; ob < curNode.childNodes.length; ob++) {
                                if (curNode.childNodes[ob].name.toLowerCase() == "wmode") {
                                    curNode.childNodes[ob].value = "Transparent"
                                }
                            }
                            curNode.style.zIndex = 0;
                            if (curNode.outerHTML.indexOf("Window") > -1) curNode.outerHTML = curNode.outerHTML.replace("Window", "Transparent")
                        }
                    } catch (err) {
                    }
                } else if (curNode.nodeName.toLowerCase() == "embed" || curNode.nodeName.toLowerCase() == "param") {
                    for (var j = 0; j < attrs.length; j++) {
                        var a = attrs[j].nodeName.toLowerCase();
                        if (a == "allowscriptaccess") {
                            attrs[j].nodeValue = "never"
                        }
                    }
                }
                for (var i = 0; i < filterlist.length; i++) {
                    curNode.removeAttribute(filterlist[i])
                }
                if (curNode.nodeName.toLowerCase() == "img") {
                }
                var zindex;
                if (isBrowser() == 'IE') {
                    zindex = curNode.currentStyle["z-index"];
                    if (!zindex) {
                        if (curNode.style != null) {
                            zindex = curNode.style.zIndex
                        }
                    }
                } else {
                    zindex = window.getComputedStyle(curNode, null).getPropertyValue("z-index");
                    if (!zindex) {
                        if (curNode.style != null) {
                            zindex = curNode.style.zIndex
                        }
                    }
                }
                if (zindex > 0) {
                    curNode.style.zIndex = 0
                }
            }
        } catch (err) {
        }
    }
    if (curNode.nodeType == "3" && curNode.nodeValue) {
        text = curNode.nodeValue.toString();
        text = trim(text);
        if (text == "更多精彩文章" && strUrl.toLowerCase().indexOf("wxzhi.com") >= 0) {
            needDelete = true
        }
    }
    if (needDelete) {
        removeNodeList.push(obj)
    }
    for (var i = 0; i < obj.childNodes.length; i++) {
        childNode = obj.childNodes[i];
        if (childNode.nodeType == "1" || childNode.nodeType == "8" || childNode.nodeType == "9" || childNode.nodeType == "3") {
            dom(childNode)
        }
    }
}

function rarImage(t) {
    if (t.width > 380) {
        t.height = t.height * (380 / t.width);
        t.width = 380
    }
}

function replaceURL(url) {
    if (!window.location) {
        return url
    }
    var match = null;
    url = trim(url);
    var host = window.location.host;
    var proto = window.location.protocol;
    var base = window.location.href.split("?")[0].split('#')[0];
    base = base.substr(0, base.lastIndexOf('/')) + "/";
    rbase = proto + "//" + host;
    if (url.indexOf("//") == 0) {
        return "http:" + url
    }
    if (url.toLowerCase().indexOf("data:") == 0) {
        return url
    }
    if ((match = url.match(/^(https?):/i)) != null) {
        return url
    } else {
        if (url.indexOf("/") == 0) {
            return rbase + url
        } else {
            return base + url
        }
    }
}

function trim(str) {
    if (typeof str != "string") {
        return str
    } else {
        return str.replace(/^\s+/, '').replace(/\s+$/, '')
    }
}

function isVisibleNode(node) {
    if (node.nodeType) {
        if (node.nodeType == 3) {
            return true
        }
        if (isBrowser() == 'IE') {
            if (node.currentStyle != null && node.currentStyle['display'] == "none") {
                return false
            }
        } else {
            try {
                if (window.getComputedStyle(node, null)['display'] == "none") {
                    return false
                }
            } catch (e) {
                return false
            }
        }
        return true
    } else {
        return false
    }
}

function isBrowser() {
    if (navigator.appVersion.toString().toLowerCase().indexOf("msie", 0) != -1) return 'IE';
    if (navigator.appVersion.toString().toLowerCase().indexOf("webkit", 0) != -1) return 'Safari';
    if (navigator.userAgent.toString().toLowerCase().indexOf("firefox", 0) != -1) return 'Firefox';
    if (navigator.userAgent.toString().toLowerCase().indexOf("webkit") > 0 && navigator.userAgent.toString().toLowerCase().indexOf("ipad") > 0) return 'Ipad';
    if (navigator.userAgent.toString().toLowerCase().indexOf("webkit") > 0 && navigator.userAgent.toString().toLowerCase().indexOf("iphone") > 0) return 'Iphone';
    if (navigator.userAgent.toString().toLowerCase().indexOf("webkit") > 0 && navigator.userAgent.toString().toLowerCase().indexOf("chrome") > 0) return 'Chrome';
    try {
        if (!!window.ActiveXObject || "ActiveXObject" in window) return "IE"
    } catch (err) {
    }
}

if (iframedocument && iframedocument.attachEvent) {
    iframedocument.attachEvent("onkeydown", function (e) {
        var oRTE = iframeWindow;
        var keyCode = oRTE.event.keyCode ? oRTE.event.keyCode : oRTE.event.which ? oRTE.event.which : oRTE.event.charCode;
        if (keyCode == 8) {
            if (oRTE.document.selection.type.toLowerCase() == "control") {
                getElement().parentNode.removeChild(getElement());
                return false
            }
        }
    })
}

function getElement() {
    var element = null;
    var sel;
    var range;
    try {
        sel = iframedocument.selection;
        switch (sel.type.toLowerCase()) {
            case"none":
            case"text": {
                range = sel.createRange();
                element = range.parentElement();
                break
            }
            case"control": {
                var ranges = sel.createRange();
                element = ranges.item(0);
                break
            }
        }
        return element
    } catch (err) {
        return null
    }
}

function errortip() {
    try {
        tiperror = true;
        iframedocument.getElementById("shibaidiv").style.display = "none";
        iframedocument.getElementById("loadingimg").style.display = "none";
        iframedocument.getElementById("loadingtipdiv").style.display = "none";
        iframedocument.getElementById("zhengwendiv").style.display = "";
        iframedocument.getElementById("editcontent").innerHTML = "<span style=\'color:#B2B2B2;\'>请选中你要保存的内容，粘贴到此文本框</span>";
        iframedocument.getElementById("editcontent").focus();
        iframedocument.getElementById("editcontent").focus();
        iframedocument.getElementById("editcontent").click();
        iframedocument.getElementById("editcontent").blur()
    } catch (err) {
    }
}

var isdeleteErrorTip = false;

function deleteErrorTip(t) {
    return;
    try {
        var temptemp = iframedocument.getElementById("shibaidiv").style.display;
        if (iframedocument.getElementById("shibaidiv").style.display != "none") {
            isdeleteErrorTip = true
        }
        iframedocument.getElementById("shibaidiv").style.display = "none";
        iframedocument.getElementById("loadingimg").style.display = "none";
        iframedocument.getElementById("loadingtipdiv").style.display = "none";
        iframedocument.getElementById("zhengwendiv").style.display = "";
        if (t) {
            iframedocument.getElementById("editcontent").focus()
        }
        return temptemp
    } catch (err) {
    }
}

var ieSelectionBookmark;
var clickFlag = null;
var currPositionElm1 = null;
var keyElm = null;
var isTdChange = false;
var isStartDiv = false;
var backCursorPosition = false;
var upFlag = 0;
var prveRange;
var isControl = false;
var isend = false;

function myOnbeforedeactivate(flag) {
    try {
        if (flag) {
            isTitleclick = true
        } else {
            isTitleclick = false
        }
        if (isBrowser() == 'IE') {
            var contentWindow = iframeWindow;
            var range = contentWindow.document.selection.createRange();
            ieSelectionBookmark = range.getBookmark();
            mySelectionBookmark = ieSelectionBookmark;
            isend = true
        } else {
            save()
        }
    } catch (err) {
    }
}

var mySelectionBookmark = null;

function myOnactivate() {
    try {
        if (isBrowser() == 'IE') {
            if (ieSelectionBookmark) {
                var contentWindow = iframeWindow;
                var range = contentWindow.document.selection.createRange();
                range.moveToBookmark(ieSelectionBookmark);
                isend = false;
                range.select();
                if (isend) {
                    if (isTitleclick) {
                        iframedocument.getElementById("clippertitle").focus();
                        iframedocument.getElementById("clippertitle").innerHTML = iframedocument.getElementById("clippertitle").innerHTML
                    } else {
                        iframedocument.getElementById("editcontent").focus();
                        iframedocument.getElementById("editcontent").innerHTML = iframedocument.getElementById("editcontent").innerHTML
                    }
                }
                ieSelectionBookmark = null
            }
        } else {
            show()
        }
    } catch (err) {
    }
}

var savedRange = null;

function save() {
    var sel = iframeWindow.getSelection();
    if (sel) {
        savedRange = sel.getRangeAt(0)
    }
}

function show() {
    var sel = iframeWindow.getSelection();
    sel.removeAllRanges();
    sel.addRange(savedRange)
}

var tempinnerhtml = "";

function setHTML(abc, flag) {
    setTimeout(function () {
        if (iframedocument.getElementById("editcontent").innerHTML.length < 10) setcontent = true; else setcontent = false;
        if (isTitleclick && flag) {
            iframedocument.getElementById("clippertitle").focus();
            var div = document.createElement("div");
            div.innerHTML = abc;
            abc = getInnerText(div)
        } else {
            try {
                iframedocument.getElementById("editcontent").focus()
            } catch (err) {
            }
        }
        if (isBrowser() == 'IE') {
            if (strUrl.indexOf("mp.weixin.qq.com") > -1 && document.getElementById("post-user")) {
                if (iframedocument.getElementById("postuser")) {
                    iframedocument.getElementById("postuser").value = document.getElementById("post-user").innerHTML
                }
            }
            if (iframedocument.selection == null) {
                insertHtmlAtSelectionEnd(abc, true)
            } else {
                iframedocument.selection.createRange().pasteHTML(abc)
            }
        } else {
            if (strUrl.indexOf("mp.weixin.qq.com") > -1 && document.getElementById("post-user")) {
                if (iframedocument.getElementById("postuser")) {
                    iframedocument.getElementById("postuser").value = document.getElementById("post-user").innerHTML
                }
            }
            if (navigator.appVersion.toString().toLowerCase().indexOf("rv:11.0") > -1 || navigator.appVersion.toString().toLowerCase().indexOf("edge") > -1) {
                try {
                    insertHtmlAtSelectionEnd(abc, true)
                } catch (err) {
                    iframedocument.execCommand("InsertHtml", "", abc)
                }
            } else {
                try {
                    iframedocument.execCommand("InsertHtml", "", abc)
                } catch (err) {
                    insertHtmlAtSelectionEnd(abc, true)
                }
            }
        }
        if (isTitleclick) {
            myOnbeforedeactivate(true)
        } else {
            myOnbeforedeactivate();
            if (setcontent) {
                extractcontent = iframedocument.getElementById("editcontent").innerHTML
            }
        }
        if (isTitleclick && flag) {
        } else {
            if (flag) {
                if (tempinnerhtml != iframedocument.getElementById("editcontent").innerHTML) iframedocument.getElementById("outerdiv").scrollTop = iframedocument.getElementById("outerdiv").scrollHeight
            } else {
                setTimeout(function () {
                    iframedocument.getElementById("outerdiv").scrollTop = 0
                }, 100)
            }
        }
        tempinnerhtml = iframedocument.getElementById("editcontent").innerHTML
    }, 200)
}

if (isBrowser() == 'IE') {
}

function insertHtmlAtSelectionEnd(html, isBefore) {
    var sel, range, node;
    if (iframeWindow.getSelection) {
        sel = iframeWindow.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = iframeWindow.getSelection().getRangeAt(0);
            range.collapse(isBefore);
            var el = iframedocument.createElement("div");
            el.innerHTML = html;
            var frag = iframedocument.createDocumentFragment(), node, lastNode;
            while ((node = el.firstChild)) {
                lastNode = frag.appendChild(node)
            }
            range.insertNode(frag)
        }
    }
}

var isTitleclick = false;

function editclick(t, flag) {
    if (flag) {
        isTitleclick = true;
        myOnbeforedeactivate(flag)
    } else {
        isTitleclick = false;
        myOnbeforedeactivate()
    }
}

function editfocus() {
}

function editclick2(flag) {
    myOnbeforedeactivate(flag)
}

function scrolledit() {
}

function editkey(t) {
}

if (iframedocument && iframedocument.attachEvent) {
    iframedocument.getElementById("editcontent").attachEvent("onkeyup", function (e) {
        var esrc = event.srcElement || event.target;
        if (getMouseEvent2(esrc)) {
            if (e.ctrlKey && e.keyCode == 86) {
                iframedocument.getElementById("clippertitle").innerHTML = getInnerText(iframedocument.getElementById("clippertitle"))
            }
        }
    });
    iframedocument.body.attachEvent("onpaste", function (e) {
        setTimeout(function () {
            iframedocument.getElementById("clippertitle").innerHTML = getInnerText(iframedocument.getElementById("clippertitle"))
        }, 100)
    })
} else {
    if (iframedocument) {
        iframedocument.addEventListener("keyup", function (e) {
            try {
                var esrc = event.srcElement || event.target;
                if (getMouseEvent2(esrc)) {
                    if (e.ctrlKey && e.keyCode == 86) {
                        iframedocument.getElementById("clippertitle").innerHTML = getInnerText(iframedocument.getElementById("clippertitle"))
                    }
                }
            } catch (err) {
            }
        }, false);
        iframedocument.addEventListener("paste", function (e) {
            setTimeout(function () {
                iframedocument.getElementById("clippertitle").innerHTML = getInnerText(iframedocument.getElementById("clippertitle"))
            }, 100)
        }, false)
    }
}

function getMouseEvent2(srcelm) {
    try {
        var tempMyObj = srcelm;
        if (tempMyObj != null) {
            while (tempMyObj.tagName != "BODY") {
                if (tempMyObj.id == "clippertitle") {
                    return true
                }
                tempMyObj = tempMyObj.parentNode
            }
        }
        return false
    } catch (err) {
        return false
    }
}

function getInnerText(elm) {
    try {
        if (isBrowser() == "IE") {
            return elm.innerText
        } else {
            return elm.textContent
        }
    } catch (err) {
        return ""
    }
}

function setInnerText(elm, text) {
    if (isBrowser() == "IE") {
        elm.innerText = text
    } else {
        elm.textContent = text
    }
}

function closetip1() {
    if (document.getElementById("tipdiv1")) {
        document.getElementById("tipdiv1").parentNode.removeChild(document.getElementById("tipdiv1"));
        document.getElementById("divtip2").style.display = "block";
        document.getElementById("closeimg").style.display = "block";
        document.getElementById("closeimg").style.zIndex = "2147483647";
        try {
            document.getElementById("divtip2").focus()
        } catch (err) {
        }
        SetCookie("clippershow", "1", 7200);
        try {
            getJSON("//clipper.360doc.com/clippertool/helpnewlog.ashx?type=3&jsoncallback=?", function (responseText) {
            })
        } catch (err) {
        }
    }
}

function closetip2() {
    if (document.getElementById("divtip2")) {
        document.getElementById("divtip2").parentNode.removeChild(document.getElementById("divtip2"));
        if (document.getElementById("yShade0")) document.getElementById("yShade0").style.zIndex = "9999";
        if (document.getElementById("yShade1")) document.getElementById("yShade1").style.zIndex = "9999";
        if (document.getElementById("yShade2")) document.getElementById("yShade2").style.zIndex = "9999";
        if (document.getElementById("yShade3")) document.getElementById("yShade3").style.zIndex = "9999";
        if (document.getElementById("yShade4")) {
            document.getElementById("yShade4").style.backgroundColor = "";
            document.getElementById("yShade4").style.opacity = "";
            document.getElementById("yShade4").style.filter = "";
            document.getElementById("yShade4").style.zIndex = "9999"
        }
        SetCookie("clippershow", "2", 7200);
        try {
            getJSON("//clipper.360doc.com/clippertool/helpnewlog.ashx?type=4&jsoncallback=?", function (responseText) {
            })
        } catch (err) {
        }
        document.getElementById("closeimg").parentNode.removeChild(document.getElementById("closeimg"))
    }
}

function closetip3() {
    if (document.getElementById("tipdiv1")) {
        document.getElementById("tipdiv1").parentNode.removeChild(document.getElementById("tipdiv1"));
        document.getElementById("fullscreendiv").parentNode.removeChild(document.getElementById("fullscreendiv"));
        SetCookie("clippershow", "1", 7200);
        try {
            getJSON("//clipper.360doc.com/clippertool/helpnewlog.ashx?type=3&jsoncallback=?", function (responseText) {
            })
        } catch (err) {
        }
    }
}

function SetCookie(name, value, Hours) {
    getJSON("//clipper.360doc.com/clippertool/writecookie.ashx?jsoncallback=?&cshow=" + value, function (responseText) {
    })
}

function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null
}

function getZindex() {
    return 9999;
    if (getCookie("clippershow")) {
        if (getCookie("clippershow") == "2") return 9999; else return 2147483646
    } else {
        return 2147483646
    }
}

function changeimage() {
    if (document.getElementById("tipnewimage").src.indexOf("1") > -1) {
        document.getElementById("tipdiv1").innerHTML = "<div style=\" height:500px;\"><div style=\" position:relative; width:759px;\"><div style=\" position:absolute; top:25px; right:25px;\"><a href=\"javascript:void(0)\" onclick='closetip3()'><img src=\"//clipper.360doc.com/clippertool/pubimage/cc.gif\" title=\"关闭\" /></a></div><div style=\" position:absolute; bottom:22px; left:310px;\"><a href=\"javascript:void(0)\" onclick=\"changeimage()\"><img src=\"//clipper.360doc.com/clippertool/pubimage/jx.gif\" /></a></div><img id=\"tipnewimage\" src=\"//clipper.360doc.com/clippertool/pubimage/new2.png\"/></div></div>"
    } else if (document.getElementById("tipnewimage").src.indexOf("2") > -1) {
        document.getElementById("tipdiv1").innerHTML = "<div style=\" height:500px;\"><div style=\" position:relative; width:759px;\"><div style=\" position:absolute; top:25px; right:25px;\"><a href=\"javascript:void(0)\" onclick='closetip3()'><img src=\"//clipper.360doc.com/clippertool/pubimage/cc.gif\" title=\"关闭\"/></a></div><div style=\" position:absolute; bottom:22px; left:310px;\"><a href=\"javascript:void(0)\" onclick=\"changeimage()\"><img src=\"//clipper.360doc.com/clippertool/pubimage/msty.gif\" /></a></div><img id=\"tipnewimage\" src=\"//clipper.360doc.com/clippertool/pubimage/new3.png\"/></div></div>"
    } else {
        closetip3()
    }
}

function createTip(tipnum, flag) {
    var wtemp = window.screen.width / 2 - 380;
    var htemp = window.screen.height / 2 - 345;
    if (wtemp < 0) wtemp = 0;
    if (htemp < 0) htemp = 0;
    if (flag == 1) {
        if (tipnum != "") return;
        if (document.getElementById("fullscreendiv")) {
            document.getElementById("fullscreendiv").parentNode.removeChild(document.getElementById("fullscreendiv"))
        }
        var div = document.createElement("div");
        div.style.cssText = "position:fixed;_position:absolute;height:100%;width:100%;top:0;left:0;background-color:#000;filter: Alpha(Opacity=50, Style=0);opacity: 0.50; z-index:2147483646;";
        div.id = "fullscreendiv";
        document.body.appendChild(div);
        if (document.getElementById("tipdiv1")) {
            document.getElementById("tipdiv1").parentNode.removeChild(document.getElementById("tipdiv1"))
        }
        var tipdiv = document.createElement("div");
        tipdiv.style.cssText = "margin:0px;padding:0px;z-index:2147483647;position: fixed;_position:absolute; left:" + wtemp + "px ; top:" + htemp + "px";
        tipdiv.innerHTML = "<div style=\" height:500px;\"><div style=\" position:relative; width:759px;\"><div style=\" position:absolute; top:35px; right:25px;\"><a href=\"javascript:void(0)\" onclick='closetip3()'><img src=\"//clipper.360doc.com/clippertool/pubimage/cc.gif\" title=\"关闭\" /></a></div><div style=\" position:absolute; bottom:22px; left:310px;\"><a href=\"javascript:void(0)\" onclick=\"changeimage()\"><img src=\"//clipper.360doc.com/clippertool/pubimage/jx.gif\" /></a></div><img id=\"tipnewimage\" src=\"//clipper.360doc.com/clippertool/pubimage/new1.png\"/></div></div>";
        tipdiv.id = "tipdiv1";
        window.document.body.appendChild(tipdiv);
        if (document.getElementById("docNoteWebClipper")) {
            document.getElementById("docNoteWebClipper").style.zIndex = 2147483646
        }
        return
    }
    if (flag == 2) {
        if (tipnum != "") return;
        if (document.getElementById("fullscreendiv")) {
            document.getElementById("fullscreendiv").parentNode.removeChild(document.getElementById("fullscreendiv"))
        }
        var div = document.createElement("div");
        div.style.cssText = "position:fixed;_position:absolute;height:100%;width:100%;top:0;left:0;background-color:#000;filter: Alpha(Opacity=50, Style=0);opacity: 0.50; z-index:2147483646;";
        div.id = "fullscreendiv";
        document.body.appendChild(div);
        if (document.getElementById("tipdiv1")) {
            document.getElementById("tipdiv1").parentNode.removeChild(document.getElementById("tipdiv1"))
        }
        var tipdiv = document.createElement("div");
        tipdiv.style.cssText = "margin:0px;padding:0px;z-index:2147483647;position: fixed;_position:absolute;left:" + wtemp + "px ; top:" + htemp + "px";
        tipdiv.innerHTML = "<div style=\" height:500px;\"><div style=\" position:relative; width:759px;\"><div style=\" position:absolute; top:35px; right:25px;\"><a href=\"javascript:void(0)\" onclick='closetip3()'><img src=\"//clipper.360doc.com/clippertool/pubimage/cc.gif\" title=\"关闭\" /></a></div><div style=\" position:absolute; bottom:22px; left:310px;\"><a href=\"javascript:void(0)\" onclick=\"changeimage()\"><img src=\"//clipper.360doc.com/clippertool/pubimage/jx.gif\" /></a></div><img id=\"tipnewimage\" src=\"//clipper.360doc.com/clippertool/pubimage/new1.png\"/></div></div>";
        tipdiv.id = "tipdiv1";
        window.document.body.appendChild(tipdiv);
        if (document.getElementById("docNoteWebClipper")) {
            document.getElementById("docNoteWebClipper").style.zIndex = 2147483646
        }
        return
    }
    return;
    if (clippertype == "2") {
        if (tipnum == "2") return;
        if (document.getElementById("yShade0")) document.getElementById("yShade0").style.zIndex = "2147483646";
        if (document.getElementById("yShade1")) document.getElementById("yShade1").style.zIndex = "2147483646";
        if (document.getElementById("yShade2")) document.getElementById("yShade2").style.zIndex = "2147483646";
        if (document.getElementById("yShade3")) document.getElementById("yShade3").style.zIndex = "2147483646";
        if (document.getElementById("yShade4")) {
            document.getElementById("yShade4").style.zIndex = "2147483646";
            document.getElementById("yShade4").style.filter = "alpha(opacity=50)";
            document.getElementById("yShade4").style.opacity = "0.5";
            document.getElementById("yShade4").style.backgroundColor = "#000000"
        }
        if (tipnum == "") {
            if (document.getElementById("tipdiv1")) {
                document.getElementById("tipdiv1").parentNode.removeChild(document.getElementById("tipdiv1"))
            }
            var tipdiv = document.createElement("div");
            tipdiv.style.cssText = "margin:0px;padding:0px;z-index:2147483647;position: fixed;_position:absolute; right: 12px; top: 8px;_top:expression(eval(documentElement.scrollTop+8));";
            tipdiv.innerHTML = "<img src=\"//clipper.360doc.com/clippertool/pubimage/tishi1.png\" usemap=\"#Mapclipper\"> <map name=\"Mapclipper\" id=\"Mapclipper\"> <area shape=\"rect\" coords=\"155,132,258,164\" href=\"javascript:void(0)\" onclick='closetip1()' /> <area shape=\"rect\" coords=\"366,51,395,74\" href=\"javascript:void(0)\" onclick='closetip1()' /></map>";
            tipdiv.id = "tipdiv1";
            window.document.body.appendChild(tipdiv);
            if (document.getElementById("divtip2")) {
                document.getElementById("divtip2").parentNode.removeChild(document.getElementById("divtip2"))
            }
            var divtip2 = document.createElement("div");
            divtip2.style.position = "absolute";
            divtip2.id = "divtip2";
            divtip2.innerHTML = "<img src='//clipper.360doc.com/clippertool/pubimage/tishi2.png' usemap=\"#Mapclipper\"/><map name=\"Mapclipper\" id=\"Mapclipper\"> <area shape=\"rect\" coords=\"132,87,235,118\" href=\"javascript:void(0)\" onclick='closetip2()' /> <area shape=\"rect\" coords=\"303,10,331,34\" href=\"javascript:void(0)\" onclick='closetip2()' /></map>";
            divtip2.style.zIndex = "2147483647";
            divtip2.style.top = (parseInt(tip2top) - 43) + "px";
            divtip2.style.left = (parseInt(tip2left) + 35) + "px";
            divtip2.style.display = "none";
            window.document.body.appendChild(divtip2);
            if (document.getElementById("closeimg")) {
                document.getElementById("closeimg").parentNode.removeChild(document.getElementById("closeimg"))
            }
            var divcloseA2 = document.createElement("img");
            divcloseA2.style.top = (parseInt(tip2top) - 35) + "px";
            divcloseA2.style.left = (parseInt(tip2left)) + "px";
            divcloseA2.style.position = "absolute";
            divcloseA2.id = "closeimg";
            divcloseA2.style.zIndex = "9999";
            divcloseA2.src = "//clipper.360doc.com/clippertool/pubimage/del.png";
            divcloseA2.style.opacity = 1;
            window.document.body.appendChild(divcloseA2);
            if (document.getElementById("docNoteWebClipper")) {
                document.getElementById("docNoteWebClipper").style.zIndex = 2147483646
            }
        } else if (tipnum == "1") {
            if (document.getElementById("divtip2")) {
                document.getElementById("divtip2").parentNode.removeChild(document.getElementById("divtip2"))
            }
            var divtip2 = document.createElement("div");
            divtip2.style.position = "absolute";
            divtip2.id = "divtip2";
            divtip2.innerHTML = "<img src='//clipper.360doc.com/clippertool/pubimage/tishi2.png' usemap=\"#Mapclipper\"/><map name=\"Mapclipper\" id=\"Mapclipper\"> <area shape=\"rect\" coords=\"132,87,235,118\" href=\"javascript:void(0)\" onclick='closetip2()' /> <area shape=\"rect\" coords=\"303,10,331,34\" href=\"javascript:void(0)\" onclick='closetip2()' /></map>";
            divtip2.style.zIndex = "2147483647";
            divtip2.style.top = (parseInt(tip2top) - 43) + "px";
            divtip2.style.left = (parseInt(tip2left) + 35) + "px";
            window.document.body.appendChild(divtip2);
            if (document.getElementById("closeimg")) {
                document.getElementById("closeimg").parentNode.removeChild(document.getElementById("closeimg"))
            }
            var divcloseA2 = document.createElement("img");
            divcloseA2.style.top = (parseInt(tip2top) - 35) + "px";
            divcloseA2.style.left = (parseInt(tip2left)) + "px";
            divcloseA2.style.position = "absolute";
            divcloseA2.id = "closeimg";
            divcloseA2.style.zIndex = "2147483647";
            divcloseA2.style.opacity = 1;
            divcloseA2.src = "//clipper.360doc.com/clippertool/pubimage/del.png";
            window.document.body.appendChild(divcloseA2);
            if (document.getElementById("docNoteWebClipper")) {
                document.getElementById("docNoteWebClipper").style.zIndex = 2147483646
            }
        }
    }
}

var itemp = 0;

function settip() {
    if (getSelectedContents()) {
        createTip(cookievalue, 1);
        return
    }
    itemp++;
    if (tiperror) {
        createTip(cookievalue, 2)
    } else if (clippertype == "2") {
        createTip(cookievalue, 2)
    } else {
        if (itemp > 10) {
            return
        }
        setTimeout(settip, 100)
    }
}

function istitlefun(f) {
    if (f == 1) {
        isTitleclick2 = true
    } else {
        isTitleclick2 = false
    }
}

var logindoc = null;
var loginiframedocument = null;
var loginiframeWindow = null;

function unlogin() {
    var logoahtml1 = '';
    var logoahtml2 = '';
    var logoascript = '';
    if (IsIpadBrowser()) {
        logoahtml1 = '<a href="#" id="logoa">';
        logoahtml2 = '</a>';
        logoascript = '<script type="text/javascript">document.getElementById("logoa").focus();</script>'
    } else {
        logoahtml1 = '';
        logoahtml2 = '';
        logoascript = ''
    }
    var html = '<div id="docNoteWebClipperlogin" style="position: fixed; width: 460px; z-index: 2147483647; border-width: 0px;_position:absolute; right: 12px; top: 8px;_top:expression(eval(documentElement.scrollTop+8)); "></div>';
    var div = document.createElement("div");
    div.id = "docNoteWebClipperlogin";
    div.style.cssText = 'position: fixed;_position:absolute; right: 12px; top: 8px;_top:expression(eval(documentElement.scrollTop+8));width: 460px; z-index: 2147483647; border-width: 0px;';
    div.innerHTML = '<div style="width: 470px; padding: 0px; "id="docNoteWebClipper-Newlogin" class="ydnwc-dialog"><div id="docNoteWebClipper_viewlogin" style="width: 470px; height: 520px; "></div></div>';
    document.body.appendChild(div);
    var loginframeinnerhtml = "<iframe frameborder='0' src=\"javascript:void((function(){var d=document;d.open ();document.domain='" + document.domain + "';d.write('');d.close()})())\" scrolling='no' width='470' height='520' id='loginIframe' allowtransparency></iframe>";
    document.getElementById("docNoteWebClipper_viewlogin").innerHTML = loginframeinnerhtml;
    var loginiframe = document.getElementById("loginIframe");
    try {
        logindoc = loginiframe.contentWindow.document;
        loginiframedocument = loginiframe.contentWindow.document;
        loginiframeWindow = loginiframe.contentWindow;
        logindoc.open();
        logindoc.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><title></title><link href="//clipper.360doc.com/clippertool/css/clipper.css?t=2016021501" rel="stylesheet" type="text/css" /><script type="text/javascript" src="//clipper.360doc.com/js/jquery1.js"></script><script type="text/javascript" src="//clipper.360doc.com/js/jQuery.md5.js"></script><script type="text/javascript" src="//clipper.360doc.com/js/loginclipper.js?t=2017092501"></script></head><body style="margin:0px;padding:0px;"><div id="backgroundPopup1" style="display: none; position: absolute; height: 500px; width: 458px; top: 0px; left: 0px; background-color: #000; opacity: 0.3; border: 1px solid #CECECE; z-index: 216;"></div><div id="needVerify" style="display: none; position: absolute;z-index:217;"></div><div class="main360docclipper" ><div class="topbjcl"><div style=" padding-top:9px; padding-left:20px; float:left; ">' + logoahtml1 + '<img src="//clipper.360doc.com/clippertool/pubimage/2.gif" />' + logoahtml2 + '</div><div style=" float:right; padding-right:10px; padding-top:3px;"><span title="关闭"><img id="img10" src="//clipper.360doc.com/clippertool/pubimage/4.gif" onclick="parent.closelogin()" /></span></div></div> <div class="denglu" id="divdenglu"><div style="height:33px;"><div class="lf" style=" padding-top:8px;"><img src="//clipper.360doc.com/clippertool/pubimage/7.gif" /></div><div class="rt lan360" style=" padding-top:8px;"><a href="http://www.360doc.com/register.aspx?ref=90" target="_blank">注册</a></div></div><div id="divmsg" class="msg"></div><div style="height:54px;clear:both;"><input id="txtEmail" type="text" class="serchpt" value="手机号/昵称/邮箱" onblur="if(!this.value) {this.value=\'手机号/昵称/邮箱\';this.style.color=\'#b2b2b2\';}" onfocus="if(this.value==\'手机号/昵称/邮箱\') this.value=\'\';this.style.color=\'#272727\'"/></div><div style="height:54px;clear:both;position:relative;"><input type="password" style="color:#272727;" class="serchpt" id="txtpws"/><span id="tx" style="position:absolute;left:12px;top:13px;color:#b2b2b2;">密码</span> </div><div style="height:50px;"><table border="0" cellpadding="0" cellspacing="0" ><tbody><tr><td width="28"><input id="chkRemember" value="" type="checkbox"/></td><td width="117"><label for="chkRemember" title="此次登录后，只要你不点击“退出”，下次再访问本网站时，系统将自动为你保持登录状态。">下次自动登录</label></td><td class="lan360" width="118" style=" text-align:right;"><a href="http://www.360doc.com/get_pass.aspx" target="_blank">忘记密码?</a></td></tr></tbody></table></div><div><img id="img11" src="//clipper.360doc.com/clippertool/pubimage/8.gif" width="259" height="36" style="cursor:pointer;" onclick="Login();" id="btnLogin"/></div></div> <div id="divloginok" style="display:none;"><div style=" padding-top:30px; padding-left:30px;"><a href="javascript:void(0);" onclick="gologindiv();">&lt;&lt;返回登录页</a></div><div class="denglu" style=" height:216px;"><div style="padding-top:45px; text-align:center;"><img src="//clipper.360doc.com/clippertool/pubimage/tishiwz.gif"/></div><div style="padding-top:35px;"><div class="zaiqu" onclick="testcookie();"><a href="#"></a></div></div></div></div> <div style=" text-align:center; padding-top:53px; height:30px;"><img src="//clipper.360doc.com/clippertool/pubimage/26.gif" width="434" height="7" /></div><div style="padding-left:100px;height:44px;" onmouseover="$(\'.snswarningtips\').show();" onmouseout="$(\'.snswarningtips\').hide();"><span class="dsfwz2">社交帐号登录：</span><a class="dsftb2 dsf1" href=\"http://www.360doc.com/redirect2oplogin.aspx?t=smbclippertool\" onclick=\"toSNSLogin(\'smb\');wzhitnew(1);\" target="_blank"></a><a class="dsftb2 dsf2" href=\"http://www.360doc.com/redirect2oplogin.aspx?t=qqclippertool\" onclick=\"toSNSLogin(\'qq\');wzhitnew(2);\" target="_blank"></a><a class="dsftb2 dsf3" href=\"http://www.360doc.com/redirect2oplogin.aspx?t=wx&reurl=1\" onclick=\"toSNSLogin(\'wx\');wzhitnew(3);\" target="_blank"></a> </div><div class="snswarningtips" style="display:none;height: 24px; background-color: #fdf8e2; width: 458px;text-align: center; line-height: 24px;">&nbsp;&nbsp;<img style=\"display: inline-block; vertical-align: middle;\" src=\"//clipper.360doc.com/clippertool/pubimage/snswarningtip12.gif\" /></div></div>' + logoascript + '</body></html>');
        logindoc.close()
    } catch (err) {
        setTimeout(function () {
            logindoc = loginiframe.contentWindow.document;
            loginiframedocument = loginiframe.contentWindow.document;
            loginiframeWindow = loginiframe.contentWindow;
            logindoc.open();
            logindoc.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><title></title><link href="//clipper.360doc.com/clippertool/css/clipper.css?t=2016021501" rel="stylesheet" type="text/css" /><script type="text/javascript" src="//clipper.360doc.com/js/jquery1.js"></script><script type="text/javascript" src="//clipper.360doc.com/js/jQuery.md5.js"></script><script type="text/javascript" src="//clipper.360doc.com/js/loginclipper.js?t=2017092501"></script></head><body style="margin:0px;padding:0px;"><div id="backgroundPopup1" style="display: none; position: fixed; height: 500px; width: 458px; top: 0px; left: 0px; background-color: #000; opacity: 0.3; border: 1px solid #CECECE; z-index: 216;"></div><div id="needVerify" style="display: none; position: absolute;z-index:111;"></div><div class="main360docclipper"><div class="topbjcl"><div style=" padding-top:9px; padding-left:20px; float:left; "><img src="//clipper.360doc.com/clippertool/pubimage/2.gif" /></div><div style=" float:right; padding-right:10px; padding-top:3px;"><span title="关闭"><img id="img10" src="//clipper.360doc.com/clippertool/pubimage/4.gif" onclick="document.domain=\'' + document.domain + '\';parent.closelogin()" /></span></div></div> <div id="divdenglu" class="denglu"><div style="height:33px;"><div class="lf" style=" padding-top:8px;"><img src="//clipper.360doc.com/clippertool/pubimage/7.gif" /></div><div class="rt lan360" style=" padding-top:8px;"><a href="http://www.360doc.com/register.aspx?ref=90" target="_blank">注册</a></div></div><div id="divmsg" class="msg"></div><div style=" clear:both;height:54px;"><input id="txtEmail" type="text" class="serchpt" value="手机号/昵称/邮箱" onblur="if(!this.value) {this.value=\'手机号/昵称/邮箱\';this.style.color=\'#b2b2b2\';}" onfocus="if(this.value==\'手机号/昵称/邮箱\') this.value=\'\';this.style.color=\'#272727\'"/></div><div style=" clear:both;height:54px;position:relative;"><input type="password" style="color:#272727;" class="serchpt" id="txtpws"/><span id="tx" style="position:absolute;left:12px;top:13px;color:#b2b2b2;">密码</span></div><div style="height:50px;"><table border="0" cellpadding="0" cellspacing="0" ><tbody><tr><td width="28"><input id="chkRemember" value="" type="checkbox"/></td><td width="117"><label for="chkRemember" title="此次登录后，只要你不点击“退出”，下次再访问本网站时，系统将自动为你保持登录状态。">下次自动登录</label></td><td class="lan360" width="118" style=" text-align:right;"><a href="http://www.360doc.com/get_pass.aspx" target="_blank">忘记密码?</a></td></tr></tbody></table></div><div><img id="img11" src="//clipper.360doc.com/clippertool/pubimage/8.gif" width="259" height="36" style="cursor:pointer;" onclick="document.domain=\'' + document.domain + '\';Login();" id="btnLogin"/></div></div><div id="divloginok" style="display:none;"><div style=" padding-top:30px; padding-left:30px;"><a href="javascript:void(0);" onclick="gologindiv();">&lt;&lt;返回登录页</a></div><div class="denglu" style=" height:216px;"><div style="padding-top:45px; text-align:center;"><img src="//clipper.360doc.com/clippertool/pubimage/tishiwz.gif"/></div><div style="padding-top:35px;"><div class="zaiqu" onclick="testcookie();"><a href="#"></a></div></div></div></div><div style=" text-align:center; padding-top:53px; height:38px;"><img src="//clipper.360doc.com/clippertool/pubimage/26.gif" width="434" height="7" /></div><div style="padding-left:100px;height:44px;" onmouseover="$(\'.snswarningtips\').show();" onmouseout="$(\'.snswarningtips\').hide();"><span class="dsfwz2">社交帐号登录：</span><a class="dsftb2 dsf1" href=\"http://www.360doc.com/redirect2oplogin.aspx?t=smbclippertool\" onclick=\"toSNSLogin(\'smb\');wzhitnew(1);\" target="_blank"></a><a class="dsftb2 dsf2" href=\"http://www.360doc.com/redirect2oplogin.aspx?t=qqclippertool\" onclick=\"toSNSLogin(\'qq\');wzhitnew(2);\" target="_blank"></a><a class="dsftb2 dsf3" href=\"http://www.360doc.com/redirect2oplogin.aspx?t=wx&reurl=1\" onclick=\"toSNSLogin(\'wx\');wzhitnew(3);\" target="_blank"></a> </div><div class="snswarningtips" style="display:none;height: 24px; background-color: #fdf8e2; width: 458px;text-align: center; line-height: 24px;">&nbsp;&nbsp;<img style=\"display: inline-block; vertical-align: middle;\" src=\"//clipper.360doc.com/clippertool/pubimage/snswarningtip12.gif\" /></div></div></body></html>');
            logindoc.close()
        }, 100)
    }
}

function closelogin() {
    if (document.getElementById("docNoteWebClipperlogin")) {
        document.getElementById("docNoteWebClipperlogin").parentNode.removeChild(document.getElementById("docNoteWebClipperlogin"))
    }
}

function setflag(flag) {
    if (flag) {
        isTitleclick = true
    } else {
        isTitleclick = false
    }
}

function isrightselect() {
    if (docNoteClipperConfiguration.doc.contentType == "2") return true; else return false
}

function video() {
    var embed = "";
    if (!window.location) return "";
    if (strUrl.indexOf("youku.com") > -1) {
        if (document.getElementById("link3")) {
            embed = document.getElementById("link3").value
        }
    } else if (strUrl.indexOf("tudou.com") > -1) {
        try {
            var atuoulist = document.getElementsByTagName("a");
            for (var i = 0; i < atuoulist.length; i++) {
                if (atuoulist[i].title == "分享到") {
                    atuoulist[i].click()
                }
            }
            for (var i = 0; i < atuoulist.length; i++) {
                if (atuoulist[i].className == "html") {
                    atuoulist[i].click()
                }
            }
            if (document.getElementById("copyInput")) {
                embed = document.getElementById("copyInput").value;
                document.getElementById("copyInput").value = ""
            }
            var ilist = document.getElementsByTagName("i");
            if (ilist != null && ilist.length > 0) {
                for (var i = 0; i < ilist.length; i++) {
                    if (ilist[i].className && ilist[i].className.indexOf("iconfont icon_arrow") > -1) {
                        ilist[i].click()
                    }
                }
            }
            if (document.getElementById("htmlInput")) {
                embed = document.getElementById("htmlInput").value
            }
        } catch (err) {
        }
    } else if (strUrl.indexOf("sina.com") > -1) {
        if (document.getElementById("htmlUrlTxt")) {
            embed = document.getElementById("htmlUrlTxt").value
        }
    } else if (strUrl.indexOf("v.ifeng.com") > -1) {
        if (document.getElementById("htmldm")) {
            document.getElementById("htmldm").click();
            if (document.getElementById("vaddress")) {
                embed = document.getElementById("vaddress").value;
                embed = embed.replace("<embed", "<embed wmode=\"transparent\" ")
            }
        }
    } else if (strUrl.indexOf("sohu.com") > -1) {
        if (document.getElementById("shareBox")) {
            try {
                document.getElementById("shareBox").click();
                if (document.getElementById("shareTxtHtml_forward_1")) {
                    document.getElementById("shareTxtHtml_forward_1").focus();
                    document.getElementById("shareTxtHtml_forward_1").blur();
                    embed = document.getElementById("shareTxtHtml_forward_1").value;
                    embed = embed.replace("<embed", "<embed wmode=\"transparent\" ")
                }
                if (document.getElementById("shareTxtHtml_forward_2")) {
                    document.getElementById("shareTxtHtml_forward_2").focus();
                    document.getElementById("shareTxtHtml_forward_2").blur();
                    embed = document.getElementById("shareTxtHtml_forward_2").value;
                    embed = embed.replace("<embed", "<embed wmode=\"transparent\" ")
                }
            } catch (err) {
                embed = ""
            }
        }
        if (embed == "") {
            try {
                embed = sohuembed;
                embed = embed.replace("<embed", "<embed wmode=\"transparent\" ");
                if (sohuembed == "") {
                    if ($(".player")) {
                        var objectpeople = $(".player")[0].getElementsByTagName("embed");
                        if (objectpeople != null && objectpeople.length > 0) {
                            embed = objectpeople[0].outerHTML;
                            embed = embed.replace("<embed", "<embed wmode=\"transparent\" ")
                        }
                    }
                }
            } catch (err) {
                embed = ""
            }
        }
    } else if (strUrl.indexOf("tangdou.com") > -1) {
        if (document.getElementById("htmlurl")) {
            embed = document.getElementById("htmlurl").value;
            embed = embed.replace("<embed", "<embed wmode=\"transparent\" ")
        }
    } else if (strUrl.indexOf("pptv.com") > -1) {
        try {
            if (document.getElementById("share_layer_links")) {
                var alist = document.getElementById("share_layer_links").getElementsByTagName("a");
                for (var i = 0; i < alist.length; i++) {
                    if (alist[i].title == "分享到Qzone") {
                        var urllist = alist[i].href.toString().split("show")[1].replace("%2F", "").replace(".html", "")
                    }
                }
            }
            if (urllist != null) {
                embed = '<embed src="http://player.pptv.com/v/' + urllist + '.swf" quality="high" width="480" height="390" align="middle" allowScriptAccess="always" allownetworking="all" allowfullscreen="true" type="application/x-shockwave-flash" wmode=\"transparent\"></embed>'
            } else {
                if (webcfg) {
                    embed = "<embed src=\"http://player.pptv.com/v/" + webcfg.id_encode + ".swf\" quality=\"high\" width=\"480\" height=\"390\" align=\"middle\" allowScriptAccess=\"always\" allownetworking=\"all\" allowfullscreen=\"true\" type=\"application/x-shockwave-flash\" wmode=\"transparent\"></embed>"
                }
            }
        } catch (err) {
            embed = ""
        }
    } else if (strUrl.indexOf("people.com.cn") > -1) {
        if (document.getElementById("htmlCodeInput")) {
            embed = document.getElementById("htmlCodeInput").value
        }
        if (embed == "") {
            if (strUrl.indexOf("tv.people.com.cn") > -1) {
                if (document.getElementById("pvpShowDiv")) {
                    var objectpeople = document.getElementById("pvpShowDiv").getElementsByTagName("embed");
                    if (objectpeople != null && objectpeople.length > 0) {
                        if (objectpeople[0].getAttribute("flashvars")) {
                            if (objectpeople[0].src) {
                                if (objectpeople[0].src.toString().indexOf("?") > -1) {
                                    objectpeople[0].src = objectpeople[0].src + "&" + objectpeople[0].getAttribute("flashvars")
                                } else {
                                    objectpeople[0].src = objectpeople[0].src + "?" + objectpeople[0].getAttribute("flashvars")
                                }
                            }
                        }
                        embed = objectpeople[0].outerHTML
                    }
                }
            }
        }
    } else if (strUrl.indexOf("hunantv.com") > -1) {
        var story = document.getElementById("story");
        if (story) {
            embed = "<embed src=\"http://www.imgo.tv/player/ref_imgo_player.swf?tid=" + story.getAttribute("ctid") + "&cid=" + story.getAttribute("ccid") + "&fid=" + story.getAttribute("cfid") + "\" quality=\"high\" width=\"580\" height=\"425\" align=\"middle\" allowScriptAccess=\"always\" allowNetworking=\"all\" allowfullscreen=\"true\" type=\"application/x-shockwave-flash\" wmode=\"transparent\"></embed>"
        }
    } else if (strUrl.indexOf("yinyuetai.com") > -1) {
        if (document.getElementById("videoCode")) {
            embed = document.getElementById("videoCode").value;
            embed = embed.replace("<embed", "<embed wmode=\"transparent\" ")
        } else if (document.getElementsByTagName("meta").length > 0) {
            try {
                var metalist = document.getElementsByTagName("meta");
                for (var i = 0; i < metalist.length; i++) {
                    if (metalist[i].content.toString().indexOf(".swf") > -1) {
                        embed = '<embed src="' + metalist[i].content.toString() + '" quality="high" width="480" height="334" align="middle" allowScriptAccess="sameDomain" allowfullscreen="true" type="application/x-shockwave-flash" wmode=\"transparent\"></embed>'
                    }
                }
            } catch (err) {
            }
        }
    } else if (strUrl.indexOf("joy.cn") > -1) {
        if (document.getElementById("html_url")) {
            embed = document.getElementById("html_url").value;
            embed = embed.replace("<embed", "<embed wmode=\"transparent\" ")
        }
    } else if (strUrl.indexOf("qiyi.com") > -1) {
        embed = "";
        if (document.getElementById("j-share-icon")) {
            document.getElementById("j-share-icon").click();
            var qiyiinputlist = document.getElementsByTagName("input");
            for (var i = 0; i < qiyiinputlist.length; i++) {
                if (qiyiinputlist[i].getAttribute("data-sharecopy-ele") == "htmlurl") {
                    embed = qiyiinputlist[i].value
                }
            }
        } else if (document.getElementById("flashbox")) {
            var videoid = document.getElementById("flashbox").getAttribute("data-player-videoid");
            var albumid = document.getElementById("flashbox").getAttribute("data-player-albumid");
            var tvid = document.getElementById("flashbox").getAttribute("data-player-tvid");
            embed = '<embed src="http://player.video.qiyi.com/' + videoid + '/' + strUrl.replace("http://www.iqiyi.com/").replace(".html") + '.swf-albumId=' + albumid + '-tvId=' + tvid + '-isPurchase=0" quality="high" width="480" height="400" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" wmode=\"transparent\"></embed>'
        }
    } else if (strUrl.indexOf("imgo.tv") > -1) {
        if (window.playerZt) {
            embed = '<embed src="' + window.playerZt() + '" quality="high" width="480" height="400" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" wmode=\"transparent\"></embed>'
        }
    } else if (strUrl.indexOf("wenku.baidu.com") > -1) {
        if (document.getElementById("readerCode-1")) {
            document.getElementById("bigSize-1").click();
            embed = document.getElementById("readerCode-1").value;
            if (embed != null && embed != "") {
                embed = embed.replaceAll("http://wenku.baidu.com", "https://wenku.baidu.com")
            }
        }
        if (document.getElementById("readerCode-2")) {
            document.getElementById("bigSize-2").click();
            embed = document.getElementById("readerCode-2").value
        }
        if (document.getElementById("readerCode-3")) {
            document.getElementById("bigSize-3").click();
            embed = document.getElementById("readerCode-3").value
        }
        if (document.getElementById("readerCode-6")) {
            try {
                var wenkualist = document.getElementsByTagName("a");
                if (wenkualist) {
                    for (var i = 0; i < wenkualist.length; i++) {
                        if (wenkualist[i].getAttribute("title") == "分享") {
                            wenkualist[i].click();
                            break
                        }
                    }
                }
                document.getElementById("bigSize-6").click();
                embed = document.getElementById("readerCode-6").value
            } catch (err) {
            }
        } else if (document.getElementById("readerCode-5")) {
            try {
                var wenkualist = document.getElementsByTagName("a");
                if (wenkualist) {
                    for (var i = 0; i < wenkualist.length; i++) {
                        if (wenkualist[i].getAttribute("title") == "分享") {
                            wenkualist[i].click();
                            break
                        }
                    }
                }
                document.getElementById("bigSize-5").click();
                embed = document.getElementById("readerCode-5").value
            } catch (err) {
            }
        }
    } else if (strUrl.indexOf("docin.com") > -1) {
        try {
            if (document.getElementById("shop-end")) {
                var alist = document.getElementById("shop-end").getElementsByTagName("a");
                if (alist) {
                    for (var i = 0; i < alist.length; i++) {
                        if (alist[i].title == "更多分享方式") {
                            alist[i].click()
                        }
                    }
                }
                if (document.getElementById("endShareCode")) {
                    embed = document.getElementById("endShareCode").value;
                    embed = embed.replace("<embed", "<embed wmode=\"transparent\" ");
                    document.getElementById("docinPopBox1").style.display = "none"
                }
            }
            if (document.getElementById("endShareCode")) {
                embed = document.getElementById("endShareCode").value;
                embed = embed.replace("<embed", "<embed wmode=\"transparent\" ")
            }
        } catch (err) {
        }
    } else if (strUrl.indexOf("boosj.com") > -1) {
        if (document.getElementById("btnshare")) {
            document.getElementById("btnshare").click()
        }
        if (document.getElementById("html_code")) {
            embed = document.getElementById("html_code").value
        }
    } else if (strUrl.indexOf("ku6.com") > -1) {
        try {
            var inputlist = null;
            $(".ckl_dowla.stg")[0].click();
            $(".cfix.ckl_xiabott")[0].getElementsByTagName("input");
            inputlist = $(".cfix.ckl_xiabott")[0].getElementsByTagName("input");
            if (inputlist != null) {
                for (var i = 0; i < inputlist.length; i++) {
                    if (inputlist[i].value.indexOf("embed") > -1) {
                        embed = inputlist[i].value.replace("></embed>", " wmode=\"transparent\"></embed>")
                    }
                }
            }
        } catch (err) {
        }
    } else if (strUrl.indexOf("56.com") > -1) {
        var div56list = document.getElementsByTagName("div");
        for (var i = 0; i < div56list.length; i++) {
            if (div56list[i].className == "links_more_btn") {
                div56list[i].click()
            }
        }
        var input56comlist = document.getElementsByTagName("input");
        for (var i = 0; i < input56comlist.length; i++) {
            if (input56comlist[i].className == "share_htmlcode") {
                embed = input56comlist[i].value;
                embed = embed.replace("<embed", "<embed wmode=\"transparent\" ")
            }
            if (input56comlist[i].className == "adr_input") {
                embed = input56comlist[i].value;
                embed = embed.replace("<embed", "<embed wmode=\"transparent\" ")
            }
        }
        if (embed == "") {
            try {
                var flashvalue = strUrl.split('_')[1].replace(".html", "");
                embed = "<embed src=\"http://player.56.com/v_" + flashvalue + ".swf\" type=\"application/x-shockwave-flash\" width=\"480\" height=\"405\" allowfullscreen=\"true\" allownetworking=\"all\" allowscriptaccess=\"always\" wmode=\"transparent\"></embed>"
            } catch (err) {
            }
        }
    } else if (strUrl.indexOf("doc88.com") > -1) {
        embed = "<a href='" + window.location.href + "' target=\"_blank\"><img src=\"//clipper.360doc.com/clippertool/pubimage/88.gif\" /></a>"
    } else if (strUrl.indexOf("http://books.mingbianji.com/showbox/") > -1) {
        embed = "<embed src=\"" + strUrl.split("index.html")[0] + "book.swf\" style=\"width:1000px;height:563px;\"></embed>"
    } else if (strUrl.indexOf("iqilu.com") > -1) {
        if (document.getElementById("copy_htmltext")) {
            embed = document.getElementById("copy_htmltext").value;
            embed = embed.replace("<embed", "<embed wmode=\"transparent\" ")
        } else if (document.getElementById("copy-text-input2")) {
            embed = document.getElementById("copy-text-input2").value;
            embed = embed.replace("<embed", "<embed wmode=\"transparent\" ")
        }
    } else if (strUrl.indexOf("letv.com") > -1) {
        try {
            var inputlist = document.getElementsByTagName("input");
            for (var i = 0; i < inputlist.length; i++) {
                if (inputlist[i].className == "i-t" && inputlist[i].value.indexOf("embed") > -1) {
                    embed = inputlist[i].value;
                    embed = embed.replace("<embed", "<embed wmode=\"transparent\" ");
                    if (embed != "") {
                        var div = document.createElement("div");
                        div.innerHTML = embed;
                        var objectpeople = div.getElementsByTagName("embed");
                        if (objectpeople != null && objectpeople.length > 0) {
                            if (objectpeople[0].getAttribute("flashvars")) {
                                if (objectpeople[0].src) {
                                    if (objectpeople[0].src.toString().indexOf("?") > -1) {
                                        objectpeople[0].src = objectpeople[0].src.toString().replace("autoplay=0", "autoplay=1") + "&" + objectpeople[0].getAttribute("flashvars")
                                    } else {
                                        objectpeople[0].src = objectpeople[0].src.toString().replace("autoplay=0", "autoplay=1") + "?" + objectpeople[0].getAttribute("flashvars")
                                    }
                                }
                            }
                            embed = objectpeople[0].outerHTML
                        }
                    }
                }
            }
            if (embed == "") {
                if (document.getElementById("mediabox")) {
                    embed = document.getElementById("mediabox").innerHTML.toString()
                }
            }
        } catch (err) {
        }
    } else if (strUrl.indexOf("v.qq.com") > -1) {
        if (document.getElementById("mod_shares_code")) {
            var inputvqq = document.getElementById("mod_shares_code").getElementsByTagName("input");
            if (inputvqq != null && inputvqq.length > 0) {
                for (var i = 0; i < inputvqq.length; i++) {
                    if (inputvqq[i].value.indexOf("<embed") > -1) {
                        embed = inputvqq[i].value.replaceAll("&quot;", "\"");
                        embed = embed.replace("<embed", "<embed wmode=\"transparent\" ")
                    }
                }
            }
        }
    } else if (strUrl.indexOf("v.huanqiu.com") > -1) {
        try {
            if (document.getElementById("txtHpath")) {
                embed = document.getElementById("txtHpath").value
            }
            if (embed == "") {
                if ($(".conFir")) {
                    var objectpeople = $(".conFir")[0].getElementsByTagName("object");
                    if (objectpeople != null && objectpeople.length > 0) {
                        embed = objectpeople[0].outerHTML
                    }
                }
            }
        } catch (err) {
        }
    } else if (strUrl.indexOf("cntv.cn") > -1) {
        var loc = strUrl.split("VIDE1");
        if (loc.length > 1 && _guid) {
            var videoid = loc[1].replace(".html", "");
            embed = "<embed id='v_player_cctv' width='640' height='480' flashvars='videoId=" + videoid + "&filePath=/flvxml/2009/10/14/&isAutoPlay=true&url=" + strUrl + "&tai=news&configPath=http://js.player.cntv.cn/xml/config/outside.xml&widgetsConfig=http://js.player.cntv.cn/xml/widgetsConfig/common.xml&languageConfig=&hour24DataURL=VodCycleData.xml&outsideChannelId=channelBugu&videoCenterId=" + _guid + "' allowscriptaccess='always' allowfullscreen='true' menu='false' quality='best' bgcolor='#000000' name='v_player_cctv' src='http://player.cntv.cn/standard/cntvOutSidePlayer.swf' type='application/x-shockwave-flash' lk_mediaid='lk_juiceapp_mediaPopup_1257416656250' lk_media='yes'/>"
        } else {
            if (strUrl.indexOf("tv.cntv.cn") > -1) {
                if (document.getElementById("myFlash")) {
                    embed = document.getElementById("myFlash").outerHTML
                }
                if (embed != "") {
                    var div = document.createElement("div");
                    div.innerHTML = embed;
                    var objectpeople = div.getElementsByTagName("embed");
                    if (objectpeople != null && objectpeople.length > 0) {
                        if (objectpeople[0].getAttribute("flashvars")) {
                            if (objectpeople[0].src) {
                                var currflashvars = "";
                                if (objectpeople[0].getAttribute("flashvars").indexOf("videoId") > -1) {
                                    currflashvars = objectpeople[0].getAttribute("flashvars").split("videoId")[1];
                                    if (currflashvars.indexOf("&") > -1) {
                                        currflashvars = currflashvars.split("&")[0];
                                        var currvideoid = objectpeople[0].getAttribute("flashvars").split("videoCenterId")[1].split("&")[0];
                                        objectpeople[0].src = "http://player.cntv.cn/standard/cntvOutSidePlayer.swf?videoId" + currflashvars + "&videoCenterId" + currvideoid
                                    }
                                } else {
                                    if (objectpeople[0].src.toString().indexOf("?") > -1) {
                                        objectpeople[0].src = objectpeople[0].src.toString() + "&" + objectpeople[0].getAttribute("flashvars")
                                    } else {
                                        objectpeople[0].src = objectpeople[0].src.toString() + "?" + objectpeople[0].getAttribute("flashvars")
                                    }
                                }
                            }
                        }
                        embed = objectpeople[0].outerHTML
                    }
                }
            }
        }
    }
    try {
        cancelflash()
    } catch (err) {
    }
    try {
        if (embed.length > 20) {
            var tempflashdiv = document.createElement("div");
            tempflashdiv.innerHTML = embed;
            var flashobjectembed = document.getElementsByTagName("embed");
            if (flashobjectembed && flashobjectembed.length > 0) {
                if (flashobjectembed[0].nodeName.toLowerCase() == "embed") {
                    flashobjectembed[0].wmode = "transparent";
                    flashobjectembed[0].style.zIndex = 0
                }
            }
            flashobjectembed = document.getElementsByTagName("object");
            if (flashobjectembed && flashobjectembed.length > 0) {
                if (flashobjectembed[0].nodeName.toLowerCase() == "object") {
                    if (isBrowser() == 'IE') {
                        for (var ob = 0; ob < flashobjectembed[0].childNodes.length; ob++) {
                            if (flashobjectembed[0].childNodes[ob].name.toLowerCase() == "wmode") {
                                flashobjectembed[0].childNodes[ob].value = "Transparent"
                            }
                        }
                        flashobjectembed[0].style.zIndex = 0;
                        if (flashobjectembed[0].outerHTML.indexOf("Window") > -1) {
                            flashobjectembed[0].outerHTML = flashobjectembed[0].outerHTML.replaceAll("Window", "Transparent")
                        }
                    }
                }
            }
            embed = tempflashdiv.innerHTML.replaceAll("Window", "Transparent").replaceAll("window", "Transparent")
        }
    } catch (err2) {
        return embed.replaceAll("Window", "Transparent").replaceAll("window", "Transparent")
    }
    return embed
}

function cratevideo() {
    var div = document.createElement("div");
    if (video() == "") return null;
    if (strUrl.indexOf("doc88.com") > -1) {
        return video()
    }
    if (strUrl.indexOf("http://books.mingbianji.com/showbox/") > -1) {
        return video()
    }
    div.innerHTML = video();
    if (div.getElementsByTagName("embed").length > 0 || div.getElementsByTagName("object").length > 0) {
        var newVideo = div.getElementsByTagName("embed").length > 0 ? div.getElementsByTagName("embed")[0] : div.getElementsByTagName("object")[0];
        return newVideo
    } else {
        return null
    }
}

function cancelflash() {
    var objflash;
    var curNode;
    objflash = document.getElementsByTagName("object");
    for (var i = 0; i < objflash.length; i++) {
        curNode = objflash[i];
        if (isBrowser() == 'IE') {
            for (var ob = 0; ob < curNode.childNodes.length; ob++) {
                if (curNode.childNodes[ob].name.toLowerCase() == "wmode") {
                    curNode.childNodes[ob].value = "Transparent"
                }
            }
            curNode.style.zIndex = 0;
            if (curNode.outerHTML.indexOf("Window") > -1) curNode.outerHTML = curNode.outerHTML.replace("Window", "Transparent")
        }
    }
    var embedflash;
    embedflash = document.getElementsByTagName("embed");
    for (var i = 0; i < embedflash.length; i++) {
        curNode = embedflash[i];
        if (isBrowser() == 'IE') {
            curNode.wmode = "transparent"
        }
    }
}

function getAbsPos(oId, tl) {
    var o = ((typeof oId) == 'String') ? document.getElementById(oId) : oId;
    var val = 0;
    while (o.tagName.toLowerCase() != "body") {
        val += (tl == 'top') ? parseInt(o.offsetTop) : parseInt(o.offsetLeft);
        o = o.parentNode
    }
    return val
}

function getPosition(target) {
    var left = 0, top = 0;
    do {
        left += target.offsetLeft || 0;
        top += target.offsetTop || 0;
        target = target.offsetParent
    } while (target);
    return {left: left, top: top}
}

function htmlDecode(text) {
    return text.replace(/&amp;/g, '&').replace(/&quot;/g, '\"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
}

function getTitle() {
    var temptitle = "";
    try {
        if (strUrl.indexOf("mp.weixin.qq.com") > -1 && document.getElementById('activity-name')) {
            temptitle = getInnerText(document.getElementById("activity-name"))
        } else if ((strUrl.indexOf("www.toutiao.com") > -1 || strUrl.indexOf(".365yg.com/") > -1) && document.getElementById("vjs_video_3_html5_api") && document.getElementsByClassName("abs-title") && document.getElementsByClassName("abs-title")[0]) {
            temptitle = getInnerText(document.getElementsByClassName("abs-title")[0])
        } else if (strUrl.indexOf("www.toutiao.com") > -1 && document.getElementsByClassName("article-title") && document.getElementsByClassName("article-title")[0]) {
            temptitle = getInnerText(document.getElementsByClassName("article-title")[0])
        } else if (strUrl.indexOf("view.inews.qq.com") > -1 && document.getElementsByClassName('title') && document.getElementsByClassName('title')[0]) {
            temptitle = getInnerText(document.getElementsByClassName('title')[0])
        } else if (strUrl.indexOf("note.youdao.com") > -1 && document.getElementsByClassName('file-name-container note-name-container') && document.getElementsByClassName('file-name-container note-name-container')[0]) {
            temptitle = getInnerText(document.getElementsByClassName('file-name-container note-name-container')[0])
        } else if (strUrl.indexOf("kuaibao.qq.com") > -1 && document.getElementsByClassName('title') && document.getElementsByClassName('title')[0]) {
            temptitle = getInnerText(document.getElementsByClassName('title')[0])
        }
        temptitle = trim(temptitle);
        if (temptitle.length > 0) {
            return temptitle
        }
        if (temptitle.length == 0 && document.getElementsByTagName("title")) temptitle = getInnerText(document.getElementsByTagName("title")[0]);
        if (temptitle) {
            if (strUrl.indexOf("yidianzixun.com") >= 0) {
                temptitle = temptitle.replace("【一点资讯】为你私人定制的资讯客户端 - Yidianzixun.com - ", "").replace("www.yidianzixun.com", "").replace("【一点资讯】", "").replace("[一点资讯]", "")
            } else if (window.location && (strUrl.indexOf(".univs.cn") > -1)) {
                var index = temptitle.indexOf("|");
                if (index > 0) temptitle = temptitle.substring(0, index)
            } else if (window.location && (strUrl.indexOf("www.aitmy.com") > -1)) {
                var index = temptitle.indexOf("_");
                if (index > 0) temptitle = temptitle.substring(0, index)
            } else if (window.location && (strUrl.indexOf(".managershare.com") > -1)) {
                temptitle = temptitle.replace(": 经理人分享", "")
            } else {
                var index = temptitle.indexOf("_");
                if (index > 0) temptitle = temptitle.substring(0, index);
                index = temptitle.indexOf("-");
                if (index > 0) temptitle = temptitle.substring(0, index);
                index = temptitle.indexOf("—");
                if (index > 0) temptitle = temptitle.substring(0, index)
            }
        }
        temptitle = trim(temptitle)
    } catch (err) {
    }
    return temptitle
}

function deletePage() {
    var node, LimitNode, ParentNode;
    var length = 0;
    try {
        for (var i = 0; i < pageList.length; i++) {
            node = pageList[i];
            LimitNode = node;
            ParentNode = node.parentNode;
            while (ParentNode != null) {
                length = GetLength(getInnerText(ParentNode));
                if (length > 20 || hasLargeImage(ParentNode)) {
                    break
                }
                LimitNode = ParentNode;
                ParentNode = ParentNode.parentNode
            }
            if (LimitNode != node) {
                removeNodeList.push(LimitNode)
            } else {
                parsetree(node, 0);
                removeNodeList.push(node);
                parsetree(node, 1)
            }
        }
    } catch (err) {
        alert(err)
    }
}

function GetLength(text) {
    var length = 0;
    try {
        if (text == null) return "";
        text = trim(text).replaceAll("&nbsp;", "");
        text = text.replaceAll("&lt;", "").replaceAll("&gt;", "");
        text = text.replaceAll("第", "").replaceAll("页", "");
        var m = text.match(/[\u4e00-\u9fa5a-zA-Z]/g);
        if (m != null) {
            length = m.length
        }
    } catch (err) {
    }
    return length
}

function hasLargeImage(ParentNode) {
    var imglenc;
    imglenc = ParentNode.getElementsByTagName("img");
    if (imglenc != null) {
        for (var i = 0; i < imglenc.length; i++) {
            if (imglenc[i].height != null && parseInt(imglenc[i].height) > 30) {
                return true
            }
        }
    }
    return false
}

function parsetree(node, sort) {
    var text = "";
    var SiblingNode = null;
    if (sort == 0) SiblingNode = node.previousSibling; else SiblingNode = node.nextSibling;
    while (SiblingNode != null) {
        text = getInnerText(SiblingNode);
        if (GetLength(text) > 5) break;
        removeNodeList.push(SiblingNode);
        if (sort == 0) SiblingNode = SiblingNode.previousSibling; else SiblingNode = SiblingNode.nextSibling
    }
}

function deleteScript(node) {
    var scriptlenc;
    var removeScriptNodes = [];
    scriptlenc = node.getElementsByTagName("script");
    if (scriptlenc != null) {
        for (var i = 0; i < scriptlenc.length; i++) {
            removeScriptNodes.push(scriptlenc[i])
        }
    }
    for (var i = 0; i < removeScriptNodes.length; i++) {
        if (removeScriptNodes[i] && removeScriptNodes[i].parentNode) {
            removeScriptNodes[i].parentNode.removeChild(removeScriptNodes[i])
        }
    }
}




if ((navigator.userAgent.toLowerCase().indexOf("webkit") > 0 || navigator.userAgent.toLowerCase().indexOf("firefox") > 0) && window.location.href.toString().indexOf("mp.weixin.qq.com") >= 0 && window.location.href.toString().indexOf("safe=0") < 0) {
    alert("由于网站摘取限制，网文摘手无法正常启动，请重新操作一次！");
    location.replace(window.location.href.toString() + "#&safe=0");
    location.reload()
}
var CLIP_HOST = '//clipper.360doc.com/js/clipper.js?t=2017112202';
insertNode();

function insertNode() {
    try {
        if (window.location.href.toString().indexOf("doc88.com") > -1) {
            var isdoc = false;
            try {
                if (document.getElementById("share_more")) {
                    document.getElementById("share_more").click()
                }
                var lilistdoc = document.getElementById("readshop").getElementsByTagName("li");
                for (var i = 0; i < lilistdoc.length; i++) {
                    if (lilistdoc[i].className == "share") {
                        lilistdoc[i].getElementsByTagName("a")[0].click()
                    }
                    if (lilistdoc[i].className == "fullscreen") {
                        isdoc = true
                    }
                }
            } catch (err) {
            }
            setTimeout(function () {
                if (!isdoc) {
                    var x = document.createElement('SCRIPT');
                    x.type = 'text/javascript';
                    x.src = CLIP_HOST;
                    x.charset = 'utf-8';
                    if (window != null) {
                        window.document.getElementsByTagName('head')[0].appendChild(x)
                    }
                } else {
                    doc88init()
                }
            }, 100)
        } else {
            var x = document.createElement('SCRIPT');
            x.type = 'text/javascript';
            x.src = CLIP_HOST;
            x.charset = 'utf-8';
            if (window != null) {
                window.document.getElementsByTagName('head')[0].appendChild(x)
            }
        }
    } catch (e) {
    }
}

function doc88init() {
    try {
        document.getElementById("doc88Window").contentWindow.document.getElementById("flash_input");
        var x = document.createElement('SCRIPT');
        x.type = 'text/javascript';
        x.src = CLIP_HOST;
        x.charset = 'utf-8';
        if (window != null) {
            window.document.getElementsByTagName('head')[0].appendChild(x)
        }
    } catch (err) {
        setTimeout(function () {
            doc88init()
        }, 100)
    }
}





(function(){
	CLIP_HOST='//clipper.360doc.com/clippertool/insertNode.js';
	try{
		var x=document.createElement('SCRIPT');
		x.type='text/javascript';
		x.src=CLIP_HOST + '?' + (new Date().getTime()/100000);
		x.charset='utf-8';
		document.getElementsByTagName('head')[0].appendChild(x);
	} catch(e){
		alert(e);
	}
})();


