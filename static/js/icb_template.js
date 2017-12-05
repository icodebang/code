var ICB = typeof ICB == 'object' ? ICB : {};
ICB.template = 
{
    // jplayer 页面模板
   jplayer : '<div id="{{jplayer_id}}" class="jp-jplayer"></div>' +
                  '<div id="{{jplayer_container_id}}" class="jp-audio" role="application" aria-label="media player">'+
                    '<div class="jp-type-single">' +
                       '<div class="jp-gui jp-interface">' +
                           '<div class="jp-controls">' +
                               '<button class="jp-play" role="button" tabindex="0">play</button>' +
                               '<button class="jp-stop" role="button" tabindex="0">stop</button>' +
                           '</div>' +
                           '<div class="jp-progress">' +
                           '    <div class="jp-seek-bar">' +
                           '        <div class="jp-play-bar"></div>' +
                           '   </div>' +
                           '</div>' +
                           '<div class="jp-volume-controls">' +
                           '    <button class="jp-mute" role="button" tabindex="0">mute</button>' +
                           '    <button class="jp-volume-max" role="button" tabindex="0">max volume</button>' +
                           '    <div class="jp-volume-bar">' +
                           '        <div class="jp-volume-bar-value"></div>' +
                           '    </div>' +
                           '</div>' +
                           '<div class="jp-time-holder">' +
                           '    <div class="jp-current-time" role="timer" aria-label="time">&nbsp;</div>' +
                           '    <div class="jp-duration" role="timer" aria-label="duration">&nbsp;</div>' +
                           '    <div class="jp-toggles">' +
                           '        <button class="jp-repeat" role="button" tabindex="0">repeat</button>' +
                           '    </div>' +
                           '</div>' +
                       '</div>' +
                   '</div>' +
               '</div>',
                   
	confirmBox : // 确认弹出框
			'<div class="modal fade icb-alert-box icb-confirm-box">'+
				'<div class="modal-dialog">'+
					'<div class="modal-content">'+
						'<div class="modal-header">'+
							'<a type="button" class="close icon icon-delete" data-dismiss="modal" aria-hidden="true"></a>'+
							'<h3 class="modal-title" id="myModalLabel">' + _t('提示信息') + '</h3>'+
						'</div>'+
						'<div class="modal-body">'+
							'{{message}}'+
						'</div>'+
						'<div class="modal-footer">'+
							'<a class="btn btn-gray" data-dismiss="modal" aria-hidden="true">取消</a>'+
							'<a class="btn btn-success yes">确定</a>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>',

    alertBox : // 提示信息弹框
				'<div class="modal fade icb-alert-box icb-tips-box">'+
					'<div class="modal-dialog">'+
						'<div class="modal-content">'+
							'<div class="modal-header">'+
								'<a type="button" class="close icon icon-delete" data-dismiss="modal" aria-hidden="true"></a>'+
								'<h3 class="modal-title" id="myModalLabel">' + _t('提示信息') + '</h3>'+
							'</div>'+
							'<div class="modal-body js-alert-msg">'+
								'<p>{{message}}</p>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>',

	addTagToArticleBox : // 添加标签到文章操作块
		'<div class="icb-search-tag-box form-inline">'+
			'<input type="text" class="form-control" id="icb-tag-category-keyword" autocomplete="off"  placeholder="' + _t('创建或搜索添加新话题') + '...">'+
			'<a class="btn btn-normal btn-success add">' + _t('添加') + '</a>'+
			'<a class="btn btn-normal btn-gray close-edit">' + _t('取消') + '</a>'+
			'<div class="icb-dropdown">'+
				'<p class="title">' + _t('没有找到相关结果') + '</p>'+
				'<ul class="icb-dropdown-list">'+
				'</ul>'+
			'</div>'+
		'</div>',
	tagQueueToArticleBox :
		'<span class="article-tag">' +
			'<a class="text">{{name}}</a>' +
			'<i class="icon icon-delete close" onclick="$(this).closest(\'.article-tag\').remove();"></i>' +
			'<input type="hidden" value="{{name}}" name="tag_names[]" />' +
		'</span>',
		
	tagToBindArticle :  // 文章要添加的标签
		'<a class="close"><i class="icon icon-delete"></i></a>',
	tagCategoryDropdownList : // 标签和分类列表
	    '<li class="ajax-item"><a data-value="{{id}}">{{title}}</a></li>',

	dropdownList : // 通用dropdown列表模板
		'<div aria-labelledby="dropdownMenu" role="menu" class="icb-dropdown">'+
			'<ul class="icb-dropdown-list">'+
			'{{#list}}'+
				'<li class="{{class}}"><a data-value="{{id}}">{{title}}</a></li>'+
			'{{/list}}'+
			'</ul>'+
		'</div>',
		
    homeworkItemBox :
        '<li data-sort="" class="js-new-homework" data-index="{{index}}" data-cursor="pointer">' +
            '<div class="mod-set-head">' +
                '<span class="pull-right">' +
                  '<a href="javascript:;" onclick="ICB.modal.confirm(\''+_t('确认删除?') + '\', function(){$(event.target).closest(\'li\').remove();}); event?event.stopPropagation():null;return false;">'+_t('删除')+'</a>' +
                '</span>' +
                '<h4>'+_t('课后作业习题') + '</h4>' +
            '</div>' +
            '<div class="mod-set-body clearfix">' +
                '<div class="icb-item-info-tag clearfix">' +
                    '<label class="pull-left">' +
                    ''+_t('语音')+ '<br />' +
                    '</label>' +
                    '<div class="pull-left icb-item-info-img">' +
                        '<a class="js-upload">' +
                        '<input class="js-attach_id" name="attach_id[{{index}}]" type="hidden" value=""/>' +
                        '<img src="' +G_STATIC_URL + '/css/default/img/default_class_imgs.png" alt="" class="js-show"/>' +
                        '</a>' +
                    '</div>' +
                '</div>' +

                '<div class="icb-item-info-descrip">' +
                    '<label class="pull-left">' +
                        ''+_t('文字')+ '<br />' +
                    '</label>' +
                    '<textarea class="form-control col-sm-12" type="text" name="content[{{index}}]" ></textarea>' +
                '</div>' +
            '</div>' +
        '</li>',
	
	loadingBox:
		'<div id="icb-loading" class="collapse">'+
			'<div id="icb-loading-box"></div>'+
		'</div>',

	'loadingMiniBox':
		'<div id="icb-loading-mini-box"></div>',

	'userCard':
			'<div id="icb-card-tips" class="icb-card-tips icb-card-tips-user">'+
				'<div class="icb-mod">'+
					'<div class="mod-head">'+
						'<a href="{{url}}" class="img">'+
							'<img src="{{avatar_file}}" alt="" />'+
						'</a>'+
						'<p class="title clearfix">'+
							'<a href="{{url}}" class="name pull-left" data-id="{{uid}}">{{user_name}}</a>'+
							'<i class="{{verified_enterprise}} pull-left" title="{{verified_title}}"></i>'+
						'</p>'+
						'<p class="icb-user-center-follow-meta">'+
							'<span>' + _t('威望') + ': <em class="icb-text-color-green">{{reputation}}</em></span>'+
							'<span>' + _t('赞同') + ': <em class="icb-text-color-orange">{{agree_count}}</em></span>'+
						'</p>'+
					'</div>'+
					'<div class="mod-body">'+
						'<p>{{signature}}</p>'+
					'</div>'+
					'<div class="mod-footer clearfix">'+
						'<span>'+
							'<a class="text-color-999" onclick="AWS.dialog(\'inbox\', \'{{user_name}}\');"><i class="icon icon-inbox"></i> ' + _t('私信') + '</a>&nbsp;&nbsp;&nbsp;&nbsp;<a  class="text-color-999" onclick="AWS.dialog(\'publish\', {category_enable:{{category_enable}}, ask_user_id:{{uid}}, ask_user_name:{{ask_name}} });"><i class="icon icon-at"></i> ' + _t('问Ta') + '</a>'+
						'</span>'+
						'<a class="btn btn-normal btn-success follow {{focus}} pull-right" onclick="AWS.User.follow($(this), \'user\', {{uid}});"><span>{{focusTxt}}</span> <em>|</em> <b>{{fansCount}}</b></a>'+
					'</div>'+
				'</div>'+
			'</div>',

	'topicCard' :
			'<div id="icb-card-tips" class="icb-card-tips icb-card-tips-topic">'+
				'<div class="icb-mod">'+
					'<div class="mod-head">'+
						'<a href="{{url}}" class="img">'+
							'<img src="{{topic_pic}}" alt="" title=""/>'+
						'</a>'+
						'<p class="title">'+
							'<a href="{{url}}" class="name" data-id="{{topic_id}}">{{topic_title}}</a>'+
						'</p>'+
						'<p class="desc">'+
							'{{topic_description}}'+
						'</p>'+
					'</div>'+
					'<div class="mod-footer">'+
						'<span>'+ _t('讨论数') + ': {{discuss_count}}</span>'+
						'<a class="btn btn-normal btn-success follow {{focus}} pull-right" onclick="AWS.User.follow($(this), \'topic\', {{topic_id}});"><span>{{focusTxt}}</span> <em>|</em> <b>{{focus_count}}</b></a>'+
					'</div>'+
				'</div>'+
			'</div>',

	'editCommentBox' :
				'<div class="modal fade icb-alert-box icb-edit-comment-box icb-editor-box">'+
				'<div class="modal-dialog">'+
					'<div class="modal-content">'+
						'<div class="modal-header">'+
							'<a type="button" class="close icon icon-delete" data-dismiss="modal" aria-hidden="true"></a>'+
							'<h3 class="modal-title" id="myModalLabel">' + _t('编辑回复') + '</h3>'+
						'</div>'+
						'<form action="' + G_BASE_URL + '/question/ajax/update_answer/answer_id-{{answer_id}}" method="post" onsubmit="return false" id="answer_edit">'+
						'<div class="modal-body">'+
							'<div class="alert alert-danger collapse error_message"><i class="icon icon-delete"></i> <em></em></div>'+
							'<input type="hidden" name="attach_access_key" value="{{attach_access_key}}" />'+
							'<textarea name="answer_content" id="editor_reply" class="form-control" rows="10"></textarea>'+
							'<div class="icb-file-upload-box">'+
								'<div class="icb-upload-wrap">'+
									'<a class="btn btn-default">上传附件</a>'+
									'<div class="upload-container"></div>'+
								'</div>'+
							'</div>'+
						'</div>'+
						'<div class="modal-footer">'+
							'<span><input id="icb-do-delete" type="checkbox" value="1" name="do_delete" /><label for="icb-do-delete">' + _t('删除回复') + '</label></span>'+
							'<button class="btn btn-large btn-success" onclick="AWS.ajax_post($(\'#answer_edit\'), AWS.ajax_processer, \'ajax_post_alert\');return false;">' + _t('确定') + '</button>'+
						'</div>'+
						'</form>'+
					'</div>'+
				'</div>'+
			'</div>',

	'articleCommentBox' :
		'<div class="icb-article-replay-box clearfix">'+
			'<form action="'+ G_BASE_URL +'/article/ajax/save_comment/" onsubmit="return false;" method="post">'+
				'<div class="mod-body">'+
					'<input type="hidden" name="at_uid" value="{{at_uid}}">'+
					'<input type="hidden" name="post_hash" value="' + G_POST_HASH + '" />'+
					'<input type="hidden" name="article_id" value="{{article_id}}" />'+
					'<textarea placeholder="' + _t('写下你的评论...') + '" class="form-control" id="comment_editor" name="message" rows="2"></textarea>'+
				'</div>'+
				'<div class="mod-footer">'+
					'<a href="javascript:;" onclick="AWS.ajax_post($(this).parents(\'form\'));" class="btn btn-normal btn-success pull-right btn-submit">' + _t('回复') + '</a>'+
				'</div>'+
			'</form>'+
		'</div>',

	'favoriteBox' :
		'<div class="modal collapse fade icb-alert-box icb-favorite-box">'+
			'<div class="modal-dialog">'+
				'<div class="modal-content">'+
					'<div class="modal-header">'+
						'<a type="button" class="close icon icon-delete" data-dismiss="modal" aria-hidden="true"></a>'+
						'<h3 class="modal-title" id="myModalLabel">' + _t('收藏') + '</h3>'+
					'</div>'+
					'<form id="favorite_form" action="' + G_BASE_URL + '/favorite/ajax/update_favorite_tag/" method="post" onsubmit="return false;">'+
						'<input type="hidden" name="item_id" value="{{item_id}}" />'+
						'<input type="hidden" name="item_type" value="{{item_type}}" />'+
						'<input type="text" name="tags" id="add_favorite_tags" class="collapse" />'+
						'<div class="mod icb-favorite-tag-list">'+
							'<div class="modal-body">'+
								'<div class="mod-body"><ul></ul></div>'+
								'<div class="alert alert-danger collapse error_message"><i class="icon icon-delete"></i> <em></em></div>'+
							'</div>'+
							'<div class="modal-footer">'+
								'<a class="pull-left" onclick="$(\'.icb-favorite-box .icb-favorite-tag-list\').hide();$(\'.icb-favorite-box .icb-favorite-tag-add\').show();">' + _t('创建标签') + '</a>'+
								'<a href="javascript:;"  data-dismiss="modal" aria-hidden="true" class="btn btn-large btn-gray" onclick="return false;">' + _t('关闭') + '</a>'+
							'</div>'+
						'</div>'+
						'<div class="mod icb-favorite-tag-add collapse">'+
							'<div class="modal-body">'+
								'<input type="text" class="form-control add-input" placeholder="' + _t('标签名字') + '" />'+
							'</div>'+
							'<div class="modal-footer">'+
								'<a class="text-color-999" onclick="$(\'.icb-favorite-box .icb-favorite-tag-list\').show();$(\'.icb-favorite-box .icb-favorite-tag-add\').hide();" style="margin-right:10px;">' + _t('取消') + '</a>'+
								'<a href="javascript:;" class="btn btn-large btn-success" onclick="AWS.User.add_favorite_tag()">' + _t('确认创建') + '</a>'+
							'</div>'+
						'</div>'+
					'</form>'+
				'</div>'+
			'</div>'+
		'</div>',

	'questionRedirect' :
		'<div class="modal fade icb-alert-box icb-question-redirect-box">'+
			'<div class="modal-dialog">'+
				'<div class="modal-content">'+
					'<div class="modal-header">'+
						'<a type="button" class="close icon icon-delete" data-dismiss="modal" aria-hidden="true"></a>'+
						'<h3 class="modal-title" id="myModalLabel">' + _t('问题重定向至') + '</h3>'+
					'</div>'+
					'<div class="modal-body">'+
						'<p>' + _t('将问题重定向至') + '</p>'+
						'<div class="icb-question-drodpwon">'+
							'<input id="question-input" class="form-control" type="text" data-id="{{data_id}}" placeholder="' + _t('搜索问题或问题 ID') + '" />'+
							'<div class="icb-dropdown"><p class="title">' + _t('没有找到相关结果') + '</p><ul class="icb-dropdown-list"></ul></div>'+
						'</div>'+
						'<p class="clearfix"><a href="javascript:;" class="btn btn-large btn-success pull-right" onclick="$(\'.icb-alert-box\').modal(\'hide\');">' + _t('放弃操作') + '</a></p>'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>',

	'publishBox' :
			'<div class="modal fade icb-alert-box icb-publish-box">'+
				'<div class="modal-dialog">'+
					'<div class="modal-content">'+
						'<div class="modal-header">'+
							'<a type="button" class="close icon icon-delete" data-dismiss="modal" aria-hidden="true"></a>'+
							'<h3 class="modal-title" id="myModalLabel">' + _t('发起问题') + '</h3>'+
						'</div>'+
						'<div class="modal-body">'+
							'<div class="alert alert-danger collapse error_message"><i class="icon icon-delete"></i> <em></em></div>'+
							'<form action="' + G_BASE_URL + '/publish/ajax/publish_question/" method="post" id="quick_publish" onsubmit="return false">'+
								'<input type="hidden" id="quick_publish_category_id" name="category_id" value="{{category_id}}" />'+
								'<input type="hidden" name="post_hash" value="' + G_POST_HASH + '" />'+
								'<input type="hidden" name="ask_user_id" value="{{ask_user_id}}" />'+
								'<div>'+
									'<textarea class="form-control" placeholder="' + _t('写下你的问题') + '..." rows="1" name="question_content" id="quick_publish_question_content" onkeydown="if (event.keyCode == 13) { return false; }"></textarea>'+
									'<div class="icb-publish-suggest-question collapse">'+
										'<p class="text-color-999">你的问题可能已经有答案</p>'+
										'<ul class="icb-dropdown-list">'+
										'</ul>'+
									'</div>'+
								'</div>'+
								'<textarea name="question_detail" class="form-control" rows="4" placeholder="' + _t('问题背景、条件等详细信息') + '..."></textarea>'+
								'<div class="icb-publish-title">'+
									'<div class="dropdown" id="quick_publish_category_chooser">'+
										'<div class="dropdown-toggle" data-toggle="dropdown">'+
											'<span id="icb-selected-tag-show" class="icb-hide-txt">' + _t('选择分类') + '</span>'+
											'<a><i class="icon icon-down"></i></a>'+
										'</div>'+
									'</div>'+
								'</div>'+
								'<div class="icb-article-title-box" data-type="publish">'+
									'<div class="tag-queue-box clearfix">'+
										'<span class="icb-edit-topic"><i class="icon icon-edit"></i>' + _t('编辑话题') + '</span>'+
									'</div>'+
								'</div>'+
								'<div class="clearfix collapse" id="quick_publish_captcha">'+
									'<input type="text" class="pull-left form-control" name="seccode_verify" placeholder="' + _t('验证码') + '" />'+
									'<img id="qp_captcha" class="pull-left" onclick="this.src = \'' +G_BASE_URL + '/account/captcha/\' + Math.floor(Math.random() * 10000);" src="" />'+
								'</div>'+
							'</form>'+
						'</div>'+
						'<div class="modal-footer">'+
							'<span class="pull-right">'+
								'<a data-dismiss="modal" aria-hidden="true" class="text-color-999">' + _t('取消') + '</a>'+
								'<button class="btn btn-large btn-success" onclick="AWS.ajax_post($(\'#quick_publish\'), AWS.ajax_processer, \'error_message\');">' + _t('发起') + '</button>'+
							'</span>'+
							'<a href="javascript:;" tabindex="-1" onclick="$(\'form#quick_publish\').attr(\'action\', \'' + G_BASE_URL + '/publish/\');$.each($(\'#quick_publish textarea\'), function (i, e){if ($(this).val() == $(this).attr(\'placeholder\')){$(this).val(\'\');}});document.getElementById(\'quick_publish\').submit();" class="pull-left">' + _t('高级模式') + '</a>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>',

	'inbox' :
			'<div class="modal fade icb-alert-box icb-inbox">'+
				'<div class="modal-dialog">'+
					'<div class="modal-content">'+
						'<div class="modal-header">'+
							'<a type="button" class="close icon icon-delete" data-dismiss="modal" aria-hidden="true"></a>'+
							'<h3 class="modal-title" id="myModalLabel">' + _t('新私信') + '</h3>'+
						'</div>'+
						'<div class="modal-body">'+
							'<div class="alert alert-danger collapse error_message"> <i class="icon icon-delete"></i> <em></em></div>'+
							'<form action="' + G_BASE_URL + '/inbox/ajax/send/" method="post" id="quick_publish" onsubmit="return false">'+
								'<input type="hidden" name="post_hash" value="' + G_POST_HASH + '" />'+
								'<input id="invite-input" class="form-control" type="text" placeholder="' + _t('搜索用户') + '" name="recipient" value="{{recipient}}" />'+
								'<div class="icb-dropdown">'+
									'<p class="title">' + _t('没有找到相关结果') + '</p>'+
									'<ul class="icb-dropdown-list">'+
									'</ul>'+
								'</div>'+
								'<textarea class="form-control" name="message" rows="3" placeholder="' + _t('私信内容...') + '"></textarea>'+
							'</form>'+
						'</div>'+
						'<div class="modal-footer">'+
							'<a data-dismiss="modal" aria-hidden="true" class="text-color-999">' + _t('取消') + '</a>'+
							'<button class="btn btn-large btn-success" onclick="AWS.ajax_post($(\'#quick_publish\'), AWS.ajax_processer, \'error_message\');">' + _t('发送') + '</button>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>',

	'editTopicBox' :
		'<div class="icb-search-tag-box form-inline">'+
			'<input type="text" class="form-control" id="icb-tag-category-keyword" autocomplete="off"  placeholder="' + _t('创建或搜索添加新话题') + '...">'+
			'<a class="btn btn-normal btn-success add">' + _t('添加') + '</a>'+
			'<a class="btn btn-normal btn-gray close-edit">' + _t('取消') + '</a>'+
			'<div class="icb-dropdown">'+
				'<p class="title">' + _t('没有找到相关结果') + '</p>'+
				'<ul class="icb-dropdown-list">'+
				'</ul>'+
			'</div>'+
		'</div>',

	'ajaxData' :
		'<div class="modal fade icb-alert-box icb-topic-edit-note-box icb-question-edit" aria-labelledby="myModalLabel" role="dialog">'+
			'<div class="modal-dialog">'+
				'<div class="modal-content">'+
					'<div class="modal-header">'+
						'<a type="button" class="close icon icon-delete" data-dismiss="modal" aria-hidden="true"></a>'+
						'<h3 class="modal-title" id="myModalLabel">{{title}}</h3>'+
					'</div>'+
					'<div class="modal-body">'+
						'{{data}}'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>',

	'commentBox' :
			'<div class="icb-comment-box" id="{{comment_form_id}}">'+
				'<div class="icb-comment-list"><p align="center" class="icb-padding10"><i class="icb-loading"></i></p></div>'+
				'<form action="{{comment_form_action}}" method="post" onsubmit="return false">'+
					'<div class="icb-comment-box-main">'+
						'<textarea class="icb-comment-txt form-control" rows="2" name="message" placeholder="' + _t('评论一下') + '..."></textarea>'+
						'<div class="icb-comment-box-btn">'+
							'<span class="pull-right">'+
								'<a href="javascript:;" class="btn btn-mini btn-success" onclick="AWS.User.save_comment($(this));">' + _t('评论') + '</a>'+
								'<a href="javascript:;" class="btn btn-mini btn-gray close-comment-box">' + _t('取消') + '</a>'+
							'</span>'+
						'</div>'+
					'</div>'+
				'</form>'+
			'</div>',

	'commentBoxClose' :
			'<div class="icb-comment-box" id="{{comment_form_id}}">'+
				'<div class="icb-comment-list"><p align="center" class="icb-padding10"><i class="icb-loading"></i></p></div>'+
			'</div>',

	'reportBox' :
			'<div class="modal fade icb-alert-box icb-share-box icb-share-box-message icb-report-box" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
				'<div class="modal-dialog">'+
					'<div class="modal-content">'+
						'<div class="modal-header">'+
							'<a type="button" class="close icon icon-delete" data-dismiss="modal" aria-hidden="true"></a>'+
							'<h3 class="modal-title" id="myModalLabel">' + _t('举报问题') + '</h3>'+
						'</div>'+
						'<form id="quick_publish" method="post" action="' + G_BASE_URL + '/question/ajax/save_report/">'+
							'<input type="hidden" name="type" value="{{item_type}}" />'+
							'<input type="hidden" name="target_id" value="{{item_id}}" />'+
							'<div class="modal-body">'+
								'<div class="alert alert-danger collapse error_message"><i class="icon icon-delete"></i> <em></em></div>'+
								'<textarea class="form-control" name="reason" rows="5" placeholder="' + _t('请填写举报理由') + '..."></textarea>'+
							'</div>'+
							'<div class="modal-footer">'+
								'<a data-dismiss="modal" aria-hidden="true" class="text-color-999">' + _t('取消') + '</a>'+
								'<button class="btn btn-large btn-success" onclick="AWS.ajax_post($(\'#quick_publish\'), AWS.ajax_processer, \'error_message\');return false;">' + _t('提交') + '</button>'+
							'</div>'+
						'</form>'+
					'</div>'+
				'</div>'+
			'</div>',

	'recommend' :
		'<div class="modal fade icb-alert-box icb-recommend-box">'+
			'<div class="modal-dialog">'+
				'<div class="modal-content">'+
					'<div class="modal-header">'+
						'<a type="button" class="close icon icon-delete" data-dismiss="modal" aria-hidden="true"></a>'+
						'<h3 class="modal-title" id="myModalLabel">' + _t('推荐到帮助中心') + '</h3>'+
					'</div>'+
					'<form id="help_form" action="' + G_BASE_URL + '/help/ajax/add_data/" method="post" onsubmit="return false;">'+
					'<input type="hidden" name="item_id" value="{{item_id}}" />'+
					'<input type="hidden" name="item_type" value="{{question}}" />'+
					'<input type="hidden" name="item_type" value="{{article}}" />'+
					'<div class="mod">'+
					'<div class="modal-body clearfix">'+
						'<div class="alert alert-danger collapse error_message"><i class="icon icon-delete"></i> <em></em></div>'+
						'<div class="mod-body">'+
							'<ul></ul>'+
						'</div>'+
					'</div>'+
					'</div>'+
					'<div class="modal-footer">'+
						'<button href="javascript:;"  data-dismiss="modal" aria-hidden="true" class="btn btn-normal btn-gray">' + _t('关闭') + '</button>'+
					'</div>'+
					'</form>'+
				'</div>'+
			'</div>'+
		'</div>',

	'searchDropdownListQuestions' :
		'<li class="{{active}} question clearfix"><i class="icon icon-bestbg pull-left"></i><a class="icb-hide-txt pull-left" href="{{url}}">{{content}} </a><span class="pull-right text-color-999">{{discuss_count}} ' + _t('个回复') + '</span></li>',
	'searchDropdownListTopics' :
		'<li class="topic clearfix"><span class="article-tag" data-id="{{topic_id}}"><a href="{{url}}" class="text">{{name}}</a></span> <span class="pull-right text-color-999">{{discuss_count}} ' + _t('个讨论') + '</span></li>',
	'searchDropdownListUsers' :
		'<li class="user clearfix"><a href="{{url}}"><img src="{{img}}" />{{name}}<span class="icb-hide-txt">{{intro}}</span></a></li>',
	'searchDropdownListArticles' :
		'<li class="question clearfix"><a class="icb-hide-txt pull-left" href="{{url}}">{{content}} </a><span class="pull-right text-color-999">{{comments}} ' + _t('条评论') + '</span></li>',
	'inviteDropdownList' :
		'<li class="user"><a data-url="{{url}}" data-id="{{uid}}" data-actions="{{action}}" data-value="{{name}}"><img class="img" src="{{img}}" />{{name}}</a></li>',
	'questionRedirectList' :
		'<li class="question"><a class="icb-hide-txt" onclick="AWS.ajax_request({{url}})">{{name}}</a></li>',
	'questionDropdownList' :
		'<li class="question" data-id="{{id}}"><a class="icb-hide-txt" href="{{url}}">{{name}}</a></li>',

	'inviteUserList' :
		'<li>'+
			'<a class="pull-right btn btn-mini btn-default" onclick="disinvite_user($(this),{{uid}});$(this).parent().detach();">' + _t('取消邀请') + '</a>'+
			'<a class="icb-user-name" data-id="{{uid}}">'+
				'<img src="{{img}}" alt="" />'+
			'</a>'+
			'<span class="icb-text-color-666">{{name}}</span>'+
		'</li>',

	'educateInsert' :
			'<td class="e1" data-txt="{{school}}">{{school}}</td>'+
			'<td class="e2" data-txt="{{departments}}">{{departments}}</td>'+
			'<td class="e3" data-txt="{{year}}">{{year}} ' + _t('年') + '</td>'+
			'<td><a class="delete-educate">' + _t('删除') + '</a>&nbsp;&nbsp;<a class="edit-educate">' + _t('编辑') + '</a></td>',

	'educateEdit' :
			'<td><input type="text" value="{{school}}" class="school form-control"></td>'+
			'<td><input type="text" value="{{departments}}" class="departments form-control"></td>'+
			'<td><select class="year edityear">'+
				'</select> ' + _t('年') + '</td>'+
			'<td><a class="delete-educate">' + _t('删除') + '</a>&nbsp;&nbsp;<a class="add-educate">' + _t('保存') + '</a></td>',

	'workInsert' :
			'<td class="w1" data-txt="{{company}}">{{company}}</td>'+
			'<td class="w2" data-txt="{{jobid}}">{{work}}</td>'+
			'<td class="w3" data-s-val="{{syear}}" data-e-val="{{eyear}}">{{syear}} ' + _t('年') + ' ' + _t('至') + ' {{eyear}}</td>'+
			'<td><a class="delete-work">' + _t('删除') + '</a>&nbsp;&nbsp;<a class="edit-work">' + _t('编辑') + '</a></td>',

	'workEidt' :
			'<td><input type="text" value="{{company}}" class="company form-control"></td>'+
			'<td>'+
				'<select class="work editwork">'+
				'</select>'+
			'</td>'+
			'<td><select class="syear editsyear">'+
				'</select>&nbsp;&nbsp;' + _t('年') + ' &nbsp;&nbsp; ' + _t('至') + '&nbsp;&nbsp;&nbsp;&nbsp;'+
				'<select class="eyear editeyear">'+
				'</select> ' + _t('年') +
			'</td>'+
			'<td><a class="delete-work">' + _t('删除') + '</a>&nbsp;&nbsp;<a class="add-work">' + _t('保存') + '</a></td>',

	'alertImg' :
		'<div class="modal fade icb-alert-box icb-tips-box icb-alert-img-box">'+
			'<div class="modal-dialog">'+
				'<div class="modal-content">'+
					'<div class="modal-header">'+
						'<a type="button" class="close icon icon-delete" data-dismiss="modal" aria-hidden="true"></a>'+
						'<h3 class="modal-title" id="myModalLabel">' + _t('提示信息') + '</h3>'+
					'</div>'+
					'<div class="modal-body">'+
						'<p class="hide {{hide}}">{{message}}</p>'+
						'<img src="{{url}}" />'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>',

	// Modify by wecenter
	'ProjectForm' :
		'<div class="mod icb-project-return-form collapse">'+
			'<form action="" method="" name="">'+
				'<div class="mod-body">'+
					'<dl class="clearfix">'+
						'<dt><strong>*</strong>回报标题:</dt>'+
						'<dd><input type="text" class="form-control form-normal title"/><label class="label label-danger collapse">回报标题与支持额度至少填写一个</label></dd>'+
						'</dl>'+
					'<dl>'+
					'<dt><strong>*</strong>支持额度:</dt>'+
						'<dd><input type="text" class="form-control form-normal amount" name="" /> <label class="label label-danger collapse">额度不能为空</label></dd>'+
					'</dl>'+
					'<dl class="clearfix">'+
						'<dt><strong>*</strong>回报内容:</dt>'+
						'<dd>'+
							'<textarea rows="5" class="form-control content"></textarea> <label class="label label-danger collapse">回报内容不能为空</label>'+
						'</dd>'+
					'</dl>'+
					'<dl>'+
						'<dt><strong>*</strong>限定名额:</dt>'+
						'<dd>'+
								'<label>'+
									'<input type="radio" name="limit-num" class="limit-num-no" value="false" checked="checked" /> 否 '+
								'</label>'+
								'<label>'+
									'<input type="radio" name="limit-num" class="limit-num-yes" value="true"/> 是 '+
								'</label>'+
								'<label class="count collapse">'+
									'<span class="pull-left">名额数量:</span>'+
									'<input type="text" class="form-control form-xs pull-left people-amount" name="" />'+
								'</label>'+
							'</dd>'+
						'</dl>'+
						'<dl>'+
							'<dt></dt>'+
							'<dd>'+
								'<a href="javascript:;" class="btn btn-primary btn-green save">保存</a>'+
								'<a href="javascript:;" class="btn btn-default cancel">取消</a>'+
							'</dd>'+
						'</dl>'+
					'</div>'+
				'</form>'+
			'</div>',
	// Modify by wecenter
	'activityBox' :
			'<div class="modal fade icb-alert-box icb-topic-edit-note-box icb-question-edit" aria-labelledby="myModalLabel" role="dialog">'+
				'<div class="modal-dialog">'+
					'<div class="modal-content">'+
							'<div class="kn-box vmod icb-publish-contact">'+
								'<label class="label label-danger collapse"></label>'+
								'<div class="mod-head">'+
									'<p>'+
										'提示：提交审核后点名时间将在 3 个工作日内完成审核，请留意站内通知以及你的邮箱'+
									'</p>'+
								'</div>'+
								'<div class="mod-body">'+
									'<dl>'+
										'<dt><strong>*</strong>姓名:</dt>'+
										'<dd>'+
											'<input type="text" id="publish-name" class="form-control form-normal" name="contact[name]" value="{{contact_name}}" />'+
										'</dd>'+
									'</dl>'+
									'<dl>'+
										'<dt><strong>*</strong>手机:</dt>'+
										'<dd>'+
											'<input type="text" id="publish-tel" class="form-control form-normal" name="contact[mobile]" value="{{contact_tel}}" />'+
										'</dd>'+
									'</dl>'+
									'<dl>'+
										'<dt><strong>*</strong>QQ:</dt>'+
										'<dd>'+
											'<input type="text" id="publish-qq" class="form-control form-normal" name="contact[qq]" value="{{contact_qq}}" />'+
										'</dd>'+
									'</dl>'+
								'</div>'+
								'<div class="mod-footer">'+
								'<a class="btn btn-normal btn-success" >'+ '提交审核 '+ '</a>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>',

		'projectEventForm' :
		'<div class="modal fade icb-alert-box icb-topic-edit-note-box icb-question-edit" aria-labelledby="myModalLabel" role="dialog">'+
				'<div class="modal-dialog">'+
					'<div class="modal-content">'+
						'<div class="formBox">'+
							'<div class="title">'+
								'<h3>活动报名 <i class="icon icon-delete pull-right" data-dismiss="modal" aria-hidden="true"></i></h3>'+
							'</div>'+

							'<div class="main ">'+
								'<form class="form-horizontal" action="' + G_BASE_URL + '/project/ajax/add_product_order/" onsubmit="return false" role="form" id="projectEventForm" method="post">'+
								'<input type="hidden" name="project_id" value="{{project_id}}">'+
								 ' <div class="form-group">'+
								    '<label class="col-sm-4 control-label">真实姓名:</label>'+
								   ' <div class="col-sm-7">'+
								     ' <input type="text" class="form-control" name="name" value="{{contact_name}}" placeholder="' + _t('请务必实名') + '" >'+
								   ' </div>'+
								  '</div>'+
								 ' <div class="form-group">'+
								  '  <label  class="col-sm-4 control-label">手机:</label>'+
								    '<div class="col-sm-7">'+
								      '<input type="text" class="form-control" name="mobile" value="{{contact_tel}}" >'+
								   ' </div>'+
								 ' </div>'+
								 ' <div class="form-group">'+
								   ' <label  class="col-sm-4 control-label">邮箱:</label>'+
								   ' <div class="col-sm-7">'+
								      '<input type="text" class="form-control" name="email" value="{{contact_email}}" >'+
								    '</div>'+
								 ' </div>'+
								 ' <div class="form-group">'+
								   ' <label  class="col-sm-4 control-label">地址:</label>'+
								   ' <div class="col-sm-7">'+
								      '<input type="text" class="form-control" name="address" value="{{contact_address}}" placeholder="' + _t('完整收件地址') + '" >'+
								    '</div>'+
								 ' </div>'+
							'</form>'+
							'</div>'+
							'<div class="footer pull-right">'+
								'<a onclick="AWS.ajax_post($(\'#projectEventForm\'));">确定</a>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>',

		'projectStockForm' :
		'<div class="modal fade icb-alert-box icb-topic-edit-note-box icb-question-edit" aria-labelledby="myModalLabel" role="dialog">'+
				'<div class="modal-dialog">'+
					'<div class="modal-content">'+
						'<div class="formBox">'+
							'<div class="title">'+
								'<h3>预约投资 <i class="icon icon-delete pull-right" data-dismiss="modal" aria-hidden="true"></i></h3>'+
							'</div>'+

							'<div class="main ">'+
								'<form class="form-horizontal" action="' + G_BASE_URL + '/project/ajax/add_product_order/" onsubmit="return false" role="form" id="projectEventForm" method="post">'+
								'<input type="hidden" name="project_id" value="{{project_id}}">'+
								 ' <div class="form-group">'+
								    '<label  class="col-sm-4 control-label">预计投资:</label>'+
								   ' <div class="col-sm-7">'+
								     ' <input  type="text" class="form-control" name="amount" value="{{contact_money}}">'+
								    '</div>'+
								' </div>'+
								 ' <div class="form-group">'+
								    '<label class="col-sm-4 control-label">真实姓名:</label>'+
								   ' <div class="col-sm-7">'+
								     ' <input type="text" class="form-control" name="name" value="{{contact_name}}">'+
								   ' </div>'+
								  '</div>'+
								 ' <div class="form-group">'+
								  '  <label  class="col-sm-4 control-label">手机:</label>'+
								    '<div class="col-sm-7">'+
								      '<input type="text" class="form-control" name="mobile" value="{{contact_tel}}">'+
								   ' </div>'+
								 ' </div>'+
								 ' <div class="form-group">'+
								   ' <label  class="col-sm-4 control-label">邮箱:</label>'+
								   ' <div class="col-sm-7">'+
								      '<input type="text" class="form-control" name="email" value="{{contact_email}}" >'+
								    '</div>'+
								 ' </div>'+
							'</form>'+
							'</div>'+
							'<div class="footer pull-right">'+
								'<a onclick="ajax_post($(\'#projectEventForm\'));">确定</a>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>'
}
