CKEDITOR.plugins.add('icodebangimage', {
    init: function (editor) {
        var pluginName = 'iCodeBangImage';
        CKEDITOR.dialog.add(pluginName, this.path + 'dialogs/icodebangimage.js');
        editor.addCommand(pluginName, new CKEDITOR.dialogCommand(pluginName));
        editor.ui.addButton(pluginName,
        {
            label: editor.lang.common.image,
            command: pluginName
        });
    }
});