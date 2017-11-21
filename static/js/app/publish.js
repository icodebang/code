$(function()
{
	if ($('#question_id').length)
	{
		ITEM_ID = $('#question_id').val();
	}
	else if ($('#article_id').length)
	{
		ITEM_ID = $('#article_id').val();
	}
    else
    {
        ITEM_ID = '';
    }

    // 判断是否开启ck编辑器
	if (G_ADVANCED_EDITOR_ENABLE == 'Y')
	{
		// 初始化编辑器
		var editor = CKEDITOR.replace( 'article-content' );
	}

    if (ATTACH_ACCESS_KEY != '' && $('.icb-upload-wrap').length)
    {
    	var editor = G_ADVANCED_EDITOR_ENABLE == 'Y' ? editor : $('.article-content');
    	var fileupload = new FileUploader('.icb-editor-box .icb-upload-wrap .btn-default', '.icb-editor-box .icb-upload-wrap .upload-container', G_BASE_URL + '/publish/ajax/attach_upload/id-' + PUBLISH_TYPE + '__attach_access_key-' + ATTACH_ACCESS_KEY, {
			'editor' : editor
		});

//	    	var fileupload = new FileUpload('file', '.icb-editor-box .icb-upload-wrap .btn', '.icb-editor-box .icb-upload-wrap .upload-container', G_BASE_URL + '/publish/ajax/attach_upload/id-' + PUBLISH_TYPE + '__attach_access_key-' + ATTACH_ACCESS_KEY, {
//					'editor' : editor
//				});
    }

    if (ITEM_ID && G_UPLOAD_ENABLE == 'Y' && ATTACH_ACCESS_KEY != '')
    {
        if ($(".icb-upload-wrap .upload-list").length) {
            $.post(G_BASE_URL + '/publish/ajax/' + PUBLISH_TYPE + '_attach_edit_list/', PUBLISH_TYPE + '_id=' + ITEM_ID, function (data) {
                if (data['err']) {
                    return false;
                } else {
                	if (data['rsm']['attachs'])
                	{
                		$.each(data['rsm']['attachs'], function (i, v) {
                			fileupload.setFileList(v);
	                    });
                	}
                }
            }, 'json');
        }
    }

    AWS.Dropdown.bind_dropdown_list($('.icb-mod-publish #question_contents'), 'publish');

    //初始化分类
	if ($('#category_id').length)
	{
		var category_data = '', category_id;

		$.each($('#category_id option').toArray(), function (i, field) {
			if ($(field).attr('selected') == 'selected')
			{
				category_id = $(this).attr('value');
			}
			if (i > 0)
			{
				if (i > 1)
				{
					category_data += ',';
				}

				category_data += "{'title':'" + $(field).text() + "', 'id':'" + $(field).val() + "'}";
			}
		});

		if(category_id == undefined)
		{
			category_id = CATEGORY_ID;
		}

		$('#category_id').val(category_id);

		AWS.Dropdown.set_dropdown_list('.icb-publish-title .dropdown', eval('[' + category_data + ']'), category_id);

		$('.icb-publish-title .dropdown li a').click(function() {
			$('#category_id').val($(this).attr('data-value'));
		});

		$.each($('.icb-publish-title .dropdown .icb-dropdown-list li a'),function(i, e)
		{
			if ($(e).attr('data-value') == $('#category_id').val())
			{
				$('#icb-selected-tag-show').html($(e).html());
			}
		});
	}

	//自动展开话题选择
	$('.icb-edit-topic').click();

    // 自动保存草稿
	$('textarea.article-content').bind('blur', function() {
		if ($(this).val() != '')
		{
			$.post(G_BASE_URL + '/account/ajax/save_draft/item_id-1__type-' +　PUBLISH_TYPE, 'message=' + $(this).val(), function (result) {
				$('#question_detail_message').html(result.err + ' <a href="#" onclick="$(\'textarea#advanced_editor\').attr(\'value\', \'\'); AWS.User.delete_draft(1, \'' + PUBLISH_TYPE + '\'); $(this).parent().html(\' \'); return false;">' + _t('删除草稿') + '</a>');
			}, 'json');
		}
	});

});
