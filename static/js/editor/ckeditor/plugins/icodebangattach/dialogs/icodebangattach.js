(function () {
    function iCodeBangAttachDialog(editor) {

        var template = '<div class="icb-attaches-for-editor">'
                     +      '<ul class="icb-attaches-list"></ul>'
                     + '</div>'
    	             + '<p style="font-size:14px;color:#999;" class="upload-list js-upload-attach">上传附件</p>';

    	var element = [
                       {
                           type: 'html',
                           html : template
                       }
                   ];
 
        return {
            title: '插入附件',
            minWidth: 400,
            minHeight: 100,
            maxHeight: 300,
            buttons: [
                //CKEDITOR.dialog.okButton,
                CKEDITOR.dialog.cancelButton
            ],
            contents:
            [
                {
                    elements: element
                }
            ],
            onLoad: function () {
                //alert('onLoad');
            },
            onShow: function () {

                var $attaches = $('#'+editor.name).closest('.icb-editor-box').find('.upload-list li');
                var template = '';
                $.each($attaches, function ()
                {
                    template += '<li><a data-id="' + $(this).find('.hidden-input').val() + '">';
                    if ($(this).find('.img').attr('data-img')) {
                        template += '<img width="24" class="icb-border-radius-5" src="' 
                        	     + $(this).find('.img').attr('data-img')  
                        	     + '" />' 
                    } else {
                        template += '<i class="icon icon-file"></i>' 
                    }
                    template += $(this).find('.title').html() 
                    		 + '</a></li>';
                });
                $('.icb-attaches-for-editor .icb-attaches-list').html(template);

                $('.icb-attaches-for-editor ul li a').click(function () {
                	CKEDITOR.dialog.getCurrent().hide()
                    editor.insertText("\n[attach]" + $(this).attr('data-id') + "[/attach]\n");
                });
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
 
    CKEDITOR.dialog.add('iCodeBangAttach', function (editor) {
        return iCodeBangAttachDialog(editor);
    });
})();