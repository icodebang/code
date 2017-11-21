CKEDITOR.plugins.add('icodebanglink', {
    init: function (editor) {
        var pluginName = 'iCodeBangLink';
        CKEDITOR.dialog.add(pluginName, this.path + 'dialogs/icodebanglink.js');
        editor.addCommand(pluginName, new CKEDITOR.dialogCommand(pluginName));
        editor.ui.addButton(pluginName,
        {
            label: editor.lang.link.menu,
            command: pluginName
        });
    }
});