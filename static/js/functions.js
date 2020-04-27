
/**
 * 判断是否为IE
 */
function isIE()
{
    // 依据是否存在 ActiveXObject 控件
    var isIE = !!window.ActiveXObject || "ActiveXObject" in window;

    return isIE;
}

/**
 * 复制代码
 */
function doCopy(id)
{
    $obj = $('#' + id);
    var testCode = $obj[0].innerText; // 不能使用 $obj.text();
    $('body').append($('<textarea id="icb_container">'+testCode+'</textarea>').css({opacity:0, position:"absolute", left:"100%"}));
    $('#icb_container')[0].select();
    if (document.execCommand('copy')){
        alert("已复制");

        $('#icb_container').remove();

		return true;
    } else {
        $('#icb_container').remove();
    }

}

/**
 * 运行代码
 */
function runCode(event)
{
    var e = event ? event : window.event;
    var testCode = $(e.target).siblings('textarea')[0].value;
    if (testCode != ""){
        var modalWindow = window.open('','','');
        modalWindow.opener = null
        modalWindow.document.write(testCode);
        modalWindow.document.close();
   }
}
/**
 * 赋值文本框内的代码
 * @param {*} event
 */
function copyCode (event)
{
    var e = event ? event : window.event;
    //console.info($(e.target).siblings('textarea')[0],$(e.target).siblings('textarea')[0].innerHTML);
    var testCode = $(e.target).siblings('textarea')[0].innerHTML;
    $('body').append($('<textarea id="icb_container">'+testCode+'</textarea>').css({opacity:0, position:"absolute", left:"100%"}));
    $('#icb_container')[0].select();
    if (document.execCommand('copy')){
        alert("已复制");

        $('#icb_container').remove();

		return true;
    } else {
        $('#icb_container').remove();
    }
}

//保存代码
function saveCode(event)
{

    var e = event ? event : window.event;
    //console.info($(e.target).siblings('textarea')[0].innerHTML);
    var testCode = $(e.target).siblings('textarea')[0].value;
	if (isIE()){
        var winname = window.open('', '_blank', 'top=10000');
        winname.document.open('text/html', 'replace');
        winname.document.writeln(testCode);
        winname.document.execCommand('saveas','','test_icodebang.com.html');
        winname.close();
    } else{
        saveContentInfoFile(testCode, 'test_icodebang.com.html');
	}
}
/**
 * 保存内容到文件
 * @param {} content
 * @param {*} filename
 */
function saveContentInfoFile(content, filename)
{
    var $a = $('<a/>').attr({
                                'href' : 'data:text/html;utf8,'+encodeURIComponent(content),
                                'download' : filename
                            })
                      .css({display : 'None'});
    $('body').append($a);
    $a[0].click();
    $a.remove();
}

/**
 * 将指定dom元素内容选中
 * @param {} dom
 */
function selectAllCode(dom)
{
    var range = window.getSelection ? window.getSelection() : document.selection.createRange();
    range.removeAllRanges();
    range.selectAllChildren(dom);

    return range;
}
