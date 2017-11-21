CKEDITOR.plugins.add('icodebangaudio', {
    init: function (editor) {
        var pluginName = 'iCodeBangAudio';
        CKEDITOR.dialog.add(pluginName, this.path + 'dialogs/icodebangaudio.js');
        editor.addCommand(pluginName, new CKEDITOR.dialogCommand(pluginName));
        editor.ui.addButton(pluginName,
        {
            label: '插入音频',
            command: pluginName
        });
    }
});