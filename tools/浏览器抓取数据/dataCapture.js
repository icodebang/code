insertScript('http://localhost/tools/DataCapture/jquery.js', 'utf-8', '$');

setTimeout(function () {
    //var $button = $('<input id="downLoadDataButton" type="button" value="Download"/>');
    //$button.click(function () {
    //    triggerPressKeys('body', ['shift', 'ctrl', 'y']);
    //});
    //insertButton('.fnBtns.rightContent ul', 'append', $button);
    triggerPressKeys('body', ['ctrl', 'shift', 'Y']);

}, 1000);

/**
 * 页面中插入script
 * @param url
 * @param charset
 * @param checkFlagVar
 */
function insertScript(url, charset, checkFlagVar)
{
    // 查看标志性变量是否已经存在。 如果标志变量已经存在，不必再加载脚本了
    if (checkFlagVar && typeof(checkFlagVar)=='string' ) {
        if (eval('typeof ('+checkFlagVar+')') != 'undefined') {
            return;
        }
    }

    try {
        var x = document.createElement('SCRIPT');
        x.type = 'text/javascript';
        x.src  = url + '?' + (new Date().getTime() / 100000);
        x.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(x);
    } catch (e) {
        alert(e);
    }
}

/**
 *
 * @param refDomSelector
 * @param position
 * @param $newButton
 */
function insertButton(refDomSelector, position, $newButton)
{
    switch (position) {
        case 'before':
            $($newButton).before($(refDomSelector));
            break;

        case 'after':
            $($newButton).after($(refDomSelector));
            break;

        case 'prepend':
            $(refDomSelector).prepend($($newButton));
            break;

        case 'append':
        default:
            $(refDomSelector).append($($newButton));
            break;
    }
}

/**
 *
 * @param keysList
 * @param callback
 */
function triggerPressKeys (dom, triggerKeys)
{
    $(document).ready(function(){
        $(window).keydown(function(e){
            console.info(e);
            if(e.keyCode==83&&e.ctrlKey){
                e.preventDefault();
                alert("按下了ctrl+S`````");
            }
        });
        var e = jQuery.Event("keydown");
        var ctrlKey = triggerKeys.indexOf('ctrl');
        e.ctrlKey = ctrlKey > -1;
        if (ctrlKey > -1) {
            delete triggerKeys[ctrlKey];
        }
        var shiftKey = triggerKeys.indexOf('shift');
        e.shiftKey = shiftKey > -1;
        if (shiftKey > -1) {
            delete triggerKeys[shiftKey];
        }
        var altKey = triggerKeys.indexOf('alt');
        e.altKey = altKey > -1;
        if (altKey > -1) {
            delete triggerKeys[altKey];
        }
        var metaKey = triggerKeys.indexOf('meta');
        e.metaKey = metaKey > -1;
        if (metaKey > -1) {
            delete triggerKeys[metaKey];
        }
        if (triggerKeys.length > 0) {
            e.keyCode = triggerKeys.pop().charCodeAt(0);

        }

        var event = document.createEvent("HTMLEvents");
        event.initEvent("keydown", false, true);
        event.keyCode = 89;
        event.ctrlKey = true;
        event.shiftKey = true;
        event.key = "Y";
        event.charCode = 0;
        event.which = 89;

        //if (isIe) {
         //   button.fireEvent("onclick");
        //}
        window.document.body.dispatchEvent(event);

        //$('body').trigger(e);
    });
}