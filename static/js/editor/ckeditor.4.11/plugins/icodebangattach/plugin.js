CKEDITOR.plugins.add('icodebangattach', {
    init: function (editor) {
    	// 插件名称
        var pluginName = 'iCodeBangAttach';
        // 引入js文件
        CKEDITOR.dialog.add(pluginName, this.path + 'dialogs/icodebangattach.js');
        // 加入操作命令
        editor.addCommand(pluginName, new CKEDITOR.dialogCommand(pluginName));
        // 按钮设置
        editor.ui.addButton(pluginName,
        {
            label: '插入附件',
            command: pluginName,
            className : 'cke_icodebangattach'
        });
        
        return;
        
        editor.on('instanceReady', function(editorEvent)
        {

            $('.cke_attach_' + attach_length).click(function ()
            {
                if(!$(this).parents('.icb-editor-box').find('.upload-list li').length)
                {
                    ICB.modal.alert('当前没有上传附件!');
                }
                else
                {
                    $('.icb-editor-dropdown').detach();
                    var top = $(this).offset().top + 35,
                        left = $(this).offset().left,
                        flag = false,
                        template = '<div aria-labelledby="dropdownMenu" role="menu" class="icb-dropdown icb-editor-dropdown" style="top:' + top + 'px;left:' + left + 'px;width:140px;">'+
                                        '<ul class="icb-dropdown-list">';

                    $.each($(this).parents('.icb-editor-box').find('.upload-list li'), function ()
                    {
                        if ($(this).find('.img').attr('style'))
                        {
                            template += '<li><a data-id="' 
                            	       + $(this).find('.hidden-input').val() 
                            	       + '"><img width="24" class="icb-border-radius-5" src="' 
                            	       + $(this).find('.img').attr('data-img')  
                            	       + '" />' 
                            	       + $(this).find('.title').html() 
                            	       + '</a></li>';
                            flag = true;
                        }
                    });

                    template += '</ul></div>';

                    if(flag)
                    {
                        $('#icb-modal-window').append(template);

                        $('.icb-editor-dropdown ul li a').click(function ()
                        {
                            editor.insertText("\n[attach]" + $(this).attr('data-id') + "[/attach]\n");

                            $(this).parents('.icb-editor-dropdown').detach();
                        });

                        $('.icb-editor-dropdown').show();
                    }
                    
                }
                    
            });

            $(document).click(function (e)
            {
                if (!$(e.target).hasClass('cke_button__icodebangattach_icon'))
                {
                    $('.icb-editor-dropdown').detach();
                }
                
            });

        });
    }
});