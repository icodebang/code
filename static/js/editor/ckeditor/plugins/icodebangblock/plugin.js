CKEDITOR.plugins.add('icodebangblock', {
    init: function (editor) {
        var pluginName = 'iCodeBangBlock';
        //editor.addCommand(pluginName, new CKEDITOR.dialogCommand(pluginName));
        editor.ui.addButton(pluginName,
        {
            label: editor.lang.common.image,
            command: pluginName,
            className : 'cke_button__blockquote_icon cke_attach_' + pluginName
        });
        editor.on('instanceReady', function(editorEvent)
        {

            $('.cke_attach_' + pluginName).click(function ()
            {
                // 识别编辑器中选中的文字
                var selection = editor.getSelection();
                // 判断是否已在blockquote中
                if (selection && $(selection.getNative().anchorNode).closest('blockquote').length) {
                    return;
                }
                
                var element = editor.document.createElement( 'blockquote' );
                element.setAttribute( 'data-fee', '1');
                element.innerHTML = "<p></p>";
                editor.insertElement( element );
                
                return;
                    
            });

        });
    }
});