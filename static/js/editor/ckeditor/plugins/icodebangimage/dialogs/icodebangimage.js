(function () {
    function iCodeBangImageDialog(editor) {
 
        return {
            title: '插入图片',
            minWidth: 470,
            minHeight: 110,
            buttons: [
                CKEDITOR.dialog.okButton,
                CKEDITOR.dialog.cancelButton
            ],
            contents:
            [
                {
                	//id: 'info1',
    				//label: 'info-label',
    				//title: 'info-title',
                    elements:
                    [
	                    {
	                         type : 'html',
	                         html : '<p style="margin-bottom:5px;">图片地址</p>'
	                    },
                        {
                            type: 'text',
                            required: true,
                            commit: function () {
                                if (this.getValue()) {
                                    this.imageElement = editor.document.createElement( 'img' );
                                    this.imageElement.setAttribute( 'src', this.getValue() );
                                    editor.insertElement( this.imageElement );
                                }
                            }
                        },
                        {
                            type: 'html',
                            html : '<p style="font-size:14px;color:#999;margin-top:5px;">如需要插入本地图片, 请用编辑器下面上传附件功能上传后再插入!</p>'
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
 
    CKEDITOR.dialog.add('iCodeBangImage', function (editor) {
        return iCodeBangImageDialog(editor);
    });
})();