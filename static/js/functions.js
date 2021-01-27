
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

/**
 *
 */
function cleartrans(){
    delCookie("googtrans");
    window.location.reload();
}

//这里一定要注意，cookie三要素：时间，路径，域名，
//删除cookie直接把时间设为过去的时间即可

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function deleteCookieByName (name) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() - Days * 24 * 60 * 60 * 30);

    //这里一定要注意，如果直接访问ip的话，不用注明域名domain
    //但访问的是域名例如www.domain.com时，翻译插件的cookie同时存在于一级和二级域名中
    //即删除翻译cookie时要把domain=www.domain.com和domain=.domain.com两个cookie一起删除才行
    var domain = document.domain;
    var domainIsIp = false;
    var dd = domain.split(".");
    if(dd.length==4){
        domainIsIp=true;
    }
    document.cookie = name + "='';path=/;expires="+ exp.toUTCString();
    if(domainIsIp==false){
        domain="."+dd[1]+"."+dd[2];
        document.cookie = name + "='';domain="+domain+";expires="+exp.toGMTString()+";path=/";
    }
}
/**
 * Google 翻译回调
 */
function googleTranslateCallback() {

    new google.translate.TranslateElement(
        {
                //这个参数不起作用，看文章底部更新，翻译面板的语言
                //pageLanguage: 'zh-CN',
            //这个是你需要翻译的语言，比如你只需要翻译成越南和英语，这里就只写en,vi
            includedLanguages: 'en,zh-CN,zh-TW,hr,cs,da,nl,fr,de,el,iw,hu,ga,it,ja,ko,pt,ro,ru,sr,es,th,vi',
            //选择语言的样式，这个是面板，还有下拉框的样式，具体的记不到了，找不到api~~
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
            //自动显示翻译横幅，就是翻译后顶部出现的那个，有点丑，这个属性没有用的话，请看文章底部的其他方法
            autoDisplay: false,
            //还有些其他参数，由于原插件不再维护，找不到详细api了，将就了，实在不行直接上dom操作
        },
        'google_translate_element'//触发按钮的id
    );

}

/**
 * 将字符串转换成浮点数字
 * @param string chars
 */
 function float(chars, decimalNum) {
     if(! decimalNum) {
        decimalNum = 6;
     }
     var result = parseFloat(chars);
     if (isNaN(result)) {
         result = 0.0;
     }
     var result = new Number(result);
     console.info(result.valueOf());
     result = result.toFixed(decimalNum);
     console.info(result.valueOf());

     return parseFloat(result.valueOf());
 }
