(function () {
    function iCodeBangLinkDialog(editor) {
 
        return {
            title: '插入超链接',
            minWidth: 470,
            minHeight: 120,
            buttons: [
                CKEDITOR.dialog.okButton,
                CKEDITOR.dialog.cancelButton
            ],
            contents:
            [
                {
                    id: 'info',
                    elements:
                    [
                        {
                            type: 'html',
                            html : '<p style="margin-bottom:5px;">链接标题</p>'
                        },
                        {
                            type: 'text',
                            className: 'link_text',
                            required: false
                        },
                        {
                            type: 'html',
                            html : '<p style="margin-top:15px;margin-bottom:5px;">链接地址</p>'
                        },
                        {
                            type: 'text',
                            className: 'link_url',
                            required: true,
                            commit: function () {
                                var value = $('.cke_dialog_body .link_url input').val(), 
                                    name = $('.cke_dialog_body .link_text input').val();
                                if (value) {
                                    var dom = editor.document.createElement( 'a' );
                                    name = $.trim(name)=='' ? value : name;
                                    dom.setHtml(name);

                                    if (value.match(/^https?:\/\/|^:\/\/|^#/i)) {
                                        dom.setAttribute( 'href', value );
                                    } else {
                                        dom.setAttribute( 'href', 'http://' + value );
                                    }
                                    
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
            	// 识别编辑器中选中的文字
            	var selection = editor.getSelection();
            	var text = href = '';
                //console.info(selection);
            	if (selection) {
	                if (CKEDITOR.env.ie) {
	                	selection.unlock(true);
	                    text = selection.getNative().createRange().text;
	                } else {
	                    text = selection.getNative();
	                }
	                if (selection.getSelectedElement() && selection.getSelectedElement().hasAttribute( 'href' ) ) {
	                	href = selection.getSelectedElement().getAttribute( 'href' );
	                }
                }
                $('.cke_dialog_body .link_text input').val(text);
                $('.cke_dialog_body .link_url input').val(href);
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
 
    CKEDITOR.dialog.add('iCodeBangLink', function (editor) {
        return iCodeBangLinkDialog(editor);
    });
})();