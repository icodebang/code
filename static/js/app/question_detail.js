var ATTACH_ACCESS_KEY;
var COMMENT_UNFOLD;
var QUESTION_ID;
var UNINTERESTED_COUNT;
var EDITOR;
var EDITOR_CALLBACK;

$(function()
{
    //问题页添加评论
    AWS.Init.init_comment_box('.icb-add-comment');

	if ($('#c_log_list').attr('id'))
	{
		AWS.load_list_view(G_BASE_URL + '/question/ajax/log/id-' + QUESTION_ID, $('#bp_log_more'), $('#c_log_list'));
	}
	else
	{
		ITEM_IDS = ITEM_IDS.split(',');

		if ($('#article-content').length)
		{
			if (G_ADVANCED_EDITOR_ENABLE == 'Y')
			{
				EDITOR = CKEDITOR.replace( 'article-content');

				EDITOR_CALLBACK = function (evt)
				{
					if (evt.editor.getData().length)
					{
						$.post(G_BASE_URL + '/account/ajax/save_draft/item_id-' + QUESTION_ID + '__type-' + ANSWER_TYPE, 'message=' + evt.editor.getData(), function (result) {
							$('#answer_content_message').html(result.err + ' <a href="#" onclick="$(\'textarea#advanced_editor\').attr(\'value\', \'\'); AWS.User.delete_draft(QUESTION_ID, ANSWER_TYPE); $(this).parent().html(\' \'); return false;">' + _t('删除草稿') + '</a>');
						}, 'json');
					}
				}

				// 自动保存草稿
				EDITOR.on( 'blur', EDITOR_CALLBACK);
			}

		}

		if ($('.icb-upload-wrap').length)
		{
			if (G_ADVANCED_EDITOR_ENABLE == 'Y')
			{
				var fileupload = new FileUpload('file', '.icb-upload-wrap .btn', '.icb-upload-wrap .upload-container', G_BASE_URL + '/publish/ajax/attach_upload/id-' + ANSWER_TYPE + '__attach_access_key-' + ATTACH_ACCESS_KEY, {
					'editor' : EDITOR
				});
			}
			else
			{
				var fileupload = new FileUpload('file', '.icb-upload-wrap .btn', '.icb-upload-wrap .upload-container', G_BASE_URL + '/publish/ajax/attach_upload/id-' + ANSWER_TYPE + '__attach_access_key-' + ATTACH_ACCESS_KEY, {
					'editor' : $('.article-content')
				});
			}
		}


		//折叠回复
		$.each($('.icb-question-comment .icb-item'), function (i, e)
		{
			if ($(this).attr('uninterested_count') >= UNINTERESTED_COUNT || $(this).attr('force_fold') == 1)
			{
				$('#uninterested_answers_list').append($(e));
			}
		});

		//折叠回复数量
		if ($('#uninterested_answers_list div.icb-item').length > 0)
		{
			$('#load_uninterested_answers span.hide_answers_count').html($('#uninterested_answers_list div.icb-item').length);
			$('#load_uninterested_answers').fadeIn();
		}

		//回复折叠显示按钮
	    $('#load_uninterested_answers a').click(function()
	    {
	    	$('#uninterested_answers_list').toggle();
	    });

		//自动展开评论
		if (COMMENT_UNFOLD == 'all')
		{
			$('.icb-add-comment').click();
		}
		else if (COMMENT_UNFOLD == 'question')
		{
			$('.icb-question-detail-meta .icb-add-comment').click();
		}

		//回复高亮
		$.each(ITEM_IDS, function (i, answer_id) {
			if ($('#answer_list_' + answer_id).attr('id'))
			{
				if ($('#answer_list_' + answer_id).find('.icb-add-comment').data('comment-count') > 0)
				{
					$('#answer_list_' + answer_id).find('.icb-add-comment').click();
				}

				AWS.hightlight($('#answer_list_' + answer_id), 'active');
			}
		});
	}

	//关注用户列表
	$.get(G_BASE_URL + '/question/ajax/get_focus_users/question_id-' + QUESTION_ID, function (result) {
		if (result)
		{
			$.each(result, function (i, e) {
				if (e['uid'])
				{
					$('#focus_users').append('<a href="' + e['url'] + '"><img src="' + e['avatar_file'] + '" class="icb-user-name" data-id="' + e['uid'] + '" alt="' + e['user_name'] + '" /></a> ');
				}
				else
				{
					$('#focus_users').append('<a href="javascript:;" title="' + _t('匿名用户') + '"><img src="' + e['avatar_file'] + '" alt="' + _t('匿名用户') + '" /></a> ');
				}
			});
		}
	}, 'json');

    //邀请回答按钮操作
    $('.icb-question-detail .icb-invite-replay').click(function()
    {
    	$('.icb-question-detail .icb-comment-box, .icb-question-detail .icb-question-related-box').hide();
    	if ($('.icb-question-detail .icb-invite-box').is(':visible'))
    	{
    		$('.icb-question-detail .icb-invite-box').fadeOut();
    	}
    	else
    	{
    		$('.icb-question-detail .icb-invite-box').fadeIn();
    	}
    });

    //邀请初始化
    for (var i = 0; i < 4; i++)
    {
    	$('.icb-question-detail .icb-invite-box ul li').eq(i).show();
    }

    // 邀请翻页
    if ($('.icb-question-detail .icb-invite-box .mod-body ul li').length <=4 )
    {
    	//长度小于4翻页隐藏
    	$('.icb-question-detail .icb-invite-box .mod-footer').hide();
    }
    else
    {
    	//邀请上一页
	    $('.icb-question-detail .icb-invite-box .prev').click(function()
	    {
	    	if (!$(this).hasClass('active'))
	    	{
	    		var flag = 0, list = $('.icb-question-detail .icb-invite-box ul li');

	    		$.each(list, function (i, e)
		    	{
		    		if ($(this).is(':visible') == true)
		    		{
		    			flag = $(this).index();

		    			return false;
		    		}
		    	});

		    	list.hide();

		    	for (var i = 0; i < 4; i++)
	    		{
	    			flag--;

	    			if (flag >= 0)
	    			{
	    				list.eq(flag).show();
	    			}
	    		}
	    		if (flag <= 0)
				{
					$('.icb-question-detail .icb-invite-box .prev').addClass('active');
				}

		    	$('.icb-question-detail .icb-invite-box .next').removeClass('active');
	    	}
	    });

	    //邀请下一页
	    $('.icb-question-detail .icb-invite-box .next').click(function()
	    {
	    	if (!$(this).hasClass('active'))
	    	{
	    		var flag = 0, list = $('.icb-question-detail .icb-invite-box ul li');

	    		$.each(list, function (i, e)
		    	{
		    		if ($(this).is(':visible') == true)
		    		{
		    			flag = $(this).index();
		    		}
		    	});

	    		list.hide();

	    		for (var i = 0; i < 4; i++)
	    		{
	    			if (flag + 1 <= list.length)
	    			{
	    				flag++;

	    				list.eq(flag).show();

	    				if (flag + 1 == list.length)
	    				{
	    					$('.icb-question-detail .icb-invite-box .next').addClass('active');
	    				}
	    			}
	    		}

		 		$('.icb-question-detail .icb-invite-box .prev').removeClass('active');

	    	}
	    });
    }

    //邀请用户下拉绑定
    AWS.Dropdown.bind_dropdown_list($('.icb-invite-box #invite-input'), 'invite');

    //邀请用户回答点击事件
	$(document).on('click', '.icb-invite-box .icb-dropdown-list a', function () {
	    AWS.User.invite_user($(this),$(this).find('img').attr('src'));
	});

	//相关链接按钮
	$('.icb-question-detail .icb-add-question-related').click(function()
	{
		$('.icb-question-detail .icb-comment-box, .icb-question-detail .icb-invite-box').hide();
    	if ($('.icb-question-detail .icb-question-related-box').is(':visible'))
    	{
    		$('.icb-question-detail .icb-question-related-box').fadeOut();
    	}
    	else
    	{
    		/*给邀请三角形定位*/
    		$('.icb-question-detail .icb-question-related-box .i-dropdown-triangle').css('left', $(this).position().left + 14);
    		$('.icb-question-detail .icb-question-related-box').fadeIn();
    	}
	});

    //回复内容超链接新窗口打开
    $('.markitup-box a').attr('target','_blank');

});

function one_click_add_topic(selector, topic_title, question_id)
{
	$.post(G_BASE_URL + '/topic/ajax/set_article_topic_relation/', 'type=question&item_id=' + question_id + '&topic_title=' + topic_title, function (result) {
		if (result.err)
		{
			AWS.alert(result.err);
		}
		else
		{
			$('.icb-article-title-box .tag-queue-box').prepend('<span class="article-tag" data-id="' + result.rsm.topic_id + '"><a class="text" href="topic/' + result.rsm.topic_id + '">' + topic_title + '</a></a></span>').hide().fadeIn();

			selector.hide();
		}
	}, 'json');
}
