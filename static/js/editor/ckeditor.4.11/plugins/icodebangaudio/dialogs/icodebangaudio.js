(function () {
    function iCodeBangAudioDialog(editor) {
 
        return {
            title: '插入音频',
            minWidth: 400,
            minHeight: 110,
            buttons: [
                CKEDITOR.dialog.okButton,
                CKEDITOR.dialog.cancelButton
            ],
            contents:
            [
                {
                    elements:
                    [
	                     {
	                         type: 'html',
	                         html : '<p style="margin-bottom:5px;">音频描述</p>'
	                     },
	                     {
	                         type: 'text',
	                         className: 'audio_title',
	                         required: false
	                     },
	                     {
	                         type: 'html',
	                         html : '<p style="margin-top:15px;margin-bottom:5px;">音频地址</p>'
	                     },
	                     {
	                         type: 'text',
	                         className: 'audio_url',
	                         required: true
	                     },
                        {
                             type: 'html',
                             html : '<p style="font-size:14px;color:#999;">可用的音频为：mp3,ogg两种格式</p>',
	                         // commit 要在最后一个元素里面
                             commit: function () {
	                             var title = $('.cke_dialog_body .audio_title input').val(), 
	                                 url = $('.cke_dialog_body .audio_url input').val();
	                             if (url) {
	                                 var dom = editor.document.createElement( 'audio' );
	                                 title = $.trim(title)=='' ? url : title;
	
	                                 if (url.match(/^https?:\/\/|^:\/\/|^#/i)) {
	                                     dom.setAttribute( 'src', url );
	                                 } else {
	                                     dom.setAttribute( 'src', 'http://' + url );
	                                 }
	                                 dom.setAttribute('title', title);
	                                 dom.setAttribute('controls', 'controls');
	                                 
	                                 editor.insertElement(dom);
	                             }
	
	                             return false;
	                         }
                        }
                    ]
                }
            ],
            onLoad: function () {
                //alert('onLoad');
            },
            onShow: function () {
                //alert('onShow');
            },
            onHide: function () {
                //alert('onHide');
            },
            onOk: function () {
                this.commitContent();
            },
            onCancel: function () {
                //alert('onCancel');
            },
            resizable: false
        };
    }
 
    CKEDITOR.dialog.add('iCodeBangAudio', function (editor) {
        return iCodeBangAudioDialog(editor);
    });
})();