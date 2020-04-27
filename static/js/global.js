var ICB = typeof ICB == 'object' ? ICB : {};

// 全局变量
ICB.V = {
    dropdownAjaxRequester : '', // 下拉列表ajax请求句柄
    timerLoading : '', // ajax请求执行中状态计时器
    dragsortIsRunning : false, // 拖拽排序进行中的flag

    timer : {},
    count : {},
    cashUserData : [],
    cashTopicData : [],
    card_box_hide_timer : '',
    card_box_show_timer : '',
    loading_bg_count : 12,
    loading_mini_bg_count : 9,
    notification_timer : ''
}
/**
 * ajax 请求封装
 */
ICB.ajax = {};

// 成功回调
ICB.ajax._onSuccess = function (response) {
    if (!response) {
        return false;
    }

    if (response.err) {
        ICB.modal.alert(response.err);
    } else if (response.rsm && response.rsm.url) {
        window.location = decodeURIComponent(response.rsm.url);
    } else if (response.errno == 1) {
        window.location.reload();
    }
}
// 错误回调
ICB.ajax._onError = function (error) {
    console && console.log(error);
    if ($.trim(error.responseText) != '') {
        ICB.modal.alert(_t('请求发生错误, 返回的信息:') + ' ' + error.responseText);
    } else if (error.status == 0) {
        ICB.modal.alert(_t('网络链接异常'));
    } else if (error.status == 500) {
        ICB.modal.alert(_t('内部服务器错误'));
    }
}
/**
 * 发起ajax通知请求
 *
 * @param url
 * @param params
 * @param successCallback
 * @param errorCallback
 * @returns {Boolean}
 */
ICB.ajax.sendNotice = function (url, params) {
    var func;
    if (typeof params != 'undefined') {
        func = $.post;
    } else {
        func = $.get;
        params = {};
    }
    func(url, params, function (response) {
    }, 'json').error(function (error) {
        console && console.log(url, params, error);
    });

    return false;
};
/**
 * 发起ajax请求， 获取json数据
 *
 * @param url
 * @param params
 * @param successCallback
 * @param errorCallback
 * @returns {Boolean}
 */
ICB.ajax.requestJson = function (url, params, successCallback, errorCallback) {
    ICB.modal.loading(true);

    var func;
    if (typeof params != 'undefined') {
        func = $.post;
    } else {
        func = $.get;
        params = {};
    }
    func(url, params, function (response) {
        ICB.modal.loading(false);
        if (typeof successCallback == 'function') {
            successCallback(response);
        } else {
            ICB.ajax._onSuccess(response);
        }
    }, 'json').error(function (error) {
        ICB.modal.loading(false);
        if (typeof errorCallback == 'function') {
            errorCallback(response);
        } else {
            ICB.ajax._onError(error);
        }
    });

    return false;
};

ICB.ajax.postForm = function ($form, processer, type) // 表单对象，用 jQuery
                                                        // 获取，回调函数名
{
    ICB.modal.loading(true);

    // 更新编辑器内容再提交表单
    if (typeof CKEDITOR != 'undefined') {
        for (instance in CKEDITOR.instances) {
            CKEDITOR.instances[instance].updateElement();
        }
    }

    if (typeof (processer) != 'function') {
        var processer = ICB.ajax.processer;
    }

    if (!type) {
        var type = 'default';
    } else if (type == 'reply_question') {
        $('.btn-reply').addClass('disabled');

        // 删除草稿绑定事件
        if (EDITOR != undefined) {
            EDITOR.removeListener('blur', EDITOR_CALLBACK);
        }
    }

    var custom_data = {
        _post_type : 'ajax'
    };

    $form.ajaxSubmit({
        dataType : 'json',
        data : custom_data,
        success : function (response) {
            ICB.modal.loading(false);
            processer(type, response);
        },
        error : function (error) {
            ICB.modal.loading(false);
            ICB.ajax._onError(error);
        }
    });
};

// ajax提交callback
ICB.ajax.processer = function (type, response) {
    if (typeof (response.errno) == 'undefined') {
        ICB.modal.alert(response);
    } else if (response.errno != 1) {
        switch (type) {
        case 'default':
        case 'comments_form':
        case 'reply':
        case 'reply_question':
            ICB.modal.alert(response.err);

            $('.icb-comment-box-btn .btn-success, .btn-reply').removeClass(
                    'disabled');
            break;

        case 'ajax_post_alert':
        case 'ajax_post_modal':
        case 'error_message':
            if (!$('.error_message').length) {
                ICB.modal.alert(response.err);
            } else if ($('.error_message em').length) {
                $('.error_message em').html(response.err);
            } else {
                $('.error_message').html(response.err);
            }

            if ($('.error_message').css('display') != 'none') {
                ICB.shake($('.error_message'));
            } else {
                $('.error_message').fadeIn();
            }

            if ($('#captcha').length) {
                $('#captcha').click();
            }
            break;
        }
    } else {
        if (type == 'comments_form') {
            AWS_BACK.reload_comments_list(response.rsm.item_id,
                    response.rsm.item_id, response.rsm.type_name);
            $(
                    '#icb-comment-box-' + response.rsm.type_name + '-'
                            + response.rsm.item_id + ' form textarea').val('');
            $('.icb-comment-box-btn .btn-success').removeClass('disabled');
        }

        if (response.rsm && response.rsm.url) {
            // 判断返回url跟当前url是否相同
            if (window.location.href == response.rsm.url) {
                window.location.reload();
            } else {
                window.location = decodeURIComponent(response.rsm.url);
            }
        } else {
            switch (type) {
            case 'default':
            case 'ajax_post_alert':
            case 'error_message':
                window.location.reload();
                break;

            case 'ajax_post_modal':
                $('#icb-modal-window div.modal').modal('hide');
                break;

            // 问题回复
            case 'reply_question':
                AWS_BACK.loading('hide');

                if (response.rsm.ajax_html) {
                    $('.icb-feed-list').append(response.rsm.ajax_html);

                    $('.icb-comment-box-btn .btn-success, .btn-reply')
                            .removeClass('disabled');

                    $.scrollTo($('#' + $(response.rsm.ajax_html).attr('id')),
                            600, {
                                queue : true
                            });

                    // 问题
                    $('.question_answer_form').detach();

                    if ($('.icb-replay-box.question').length) {
                        if (USER_ANSWERED) {
                            $('.icb-replay-box').append(
                                    '<p align="center">一个问题只能回复一次, 你可以在发言后 '
                                            + ANSWER_EDIT_TIME
                                            + ' 分钟内编辑回复过的内容</p>');
                        }
                    }
                } else if (response.rsm.url) {
                    window.location = decodeURIComponent(response.rsm.url);
                } else {
                    window.location.reload();
                }
                break;
            // 文章回复
            case 'reply':
                ICB.modal.loading(false);

                if (response.rsm.ajax_html) {
                    $('.icb-feed-list').append(response.rsm.ajax_html);

                    $('.icb-comment-box-btn .btn-success, .btn-reply')
                            .removeClass('disabled');

                    $.scrollTo($('#' + $(response.rsm.ajax_html).attr('id')),
                            600, {
                                queue : true
                            });

                    // 文章
                    $('#comment_editor').val('');
                } else if (response.rsm.url) {
                    window.location = decodeURIComponent(response.rsm.url);
                } else {
                    window.location.reload();
                }
                break;
            }
        }
    }
};

ICB.modal = {};
/**
 * 警报弹框
 *
 * @param text
 *            弹出的警报信息
 */
ICB.modal.alert = function (msg, callbackOptions) {
    // 移除上一个遮罩。
    $('body > .modal-backdrop').remove();

    $('.icb-alert-box').remove();

    $('#icb-modal-window').append(Hogan.compile(ICB.template.alertBox).render({
        message : msg
    }));

    $('.icb-alert-box').modal('show');
    if (typeof callbackOptions == 'object') {
        for ( var i in callbackOptions) {
            $('.icb-alert-box').on(i, callbackOptions[i]);
        }
    }
};
ICB.modal.confirm = function (message, onYesCallback, onshowCallback) {
    var showHtml = Hogan.compile(ICB.template.confirmBox).render({
        'message' : message
    });

    ICB.modal.dialog(showHtml, onshowCallback);
    $('.icb-confirm-box .yes').click(function () {

        $(".icb-alert-box").modal('hide');

        if (typeof onYesCallback == 'function') {
            onYesCallback();
        }

        return false;
    });

};
ICB.modal.dialog = function (showHtml, onshowCallback) {
    // 移除上一个遮罩。
    $('body > .modal-backdrop').remove();
    $('.icb-alert-box').remove();
    $('#icb-modal-window').html(showHtml).show();

    if (typeof onshowCallback == 'function') {
        onshowCallback();
    }

    $('.icb-alert-box').modal('show');
};
/**
 * 显示loading图标， 以示请求正在进行中
 */
ICB.modal.loading = function (isVisible) {
    /* 载入modal window */
    $('#icb-loading').length
            || $('#icb-modal-window').append(ICB.template.loadingBox);
    $loading = $('#icb-loading');

    isVisible = isVisible == true || isVisible == 'show'
            || isVisible == 'start';

    if (true == isVisible) {
        if ($loading.is(':visible')) {
            return;
        }
        $loading.fadeIn();
        var timerFunction = function () {
            ICB.V.loading_bg_count -= 1;

            $('#icb-loading-box').css('background-position',
                    '0px ' + ICB.V.loading_bg_count * 40 + 'px');

            if (ICB.V.loading_bg_count == 1) {
                ICB.V.loading_bg_count = 12;
            }
        };

        ICB.V.timerLoading = setInterval(timerFunction, 100);

    } else {
        $loading.fadeOut();

        clearInterval(ICB.V.timerLoading);
    }
};

ICB.dropdown = {};
/**
 * 默认的下拉列表获取后的回调函数
 *
 * @param string
 *            name 要设置的回调名称
 * @param function
 *            callback 回调函数
 */
ICB.dropdown.setAjaxCallback = function (name, callback) {
    if (typeof name == 'function') {
        ICB.dropdown.ajaxCallback[name] = callback;
    }
};
/**
 * 回调函数池
 */
ICB.dropdown.ajaxCallback = {
    /**
     * 替换标签分类下拉列表数据
     */
    replaceTagCategoryList : function (selector, response) {
        var $dropdown = $(selector).parent().find('.icb-dropdown-list');
        $dropdown.html(''); // 清空内容
        $.each(response, function (i, item) {
            $dropdown.append(Hogan
                    .compile(ICB.template.tagCategoryDropdownList).render({
                        title : item.topic_title,
                        id : item.topic_id
                    }));
        });
    }
};
/**
 * ajax请求加载下拉菜单数据 . 元素需要的属性： data-dropdown-url
 *
 * @param selector
 * @param callback
 *            回调函数，或者是可识别的字符串
 */
ICB.dropdown.ajaxLoad = function (selector, callback) {
    var text = $(selector).val();
    if (ICB.V.dropdownAjaxRequester != '') {
        ICB.V.dropdownAjaxRequester.abort(); // 中止上一次ajax请求
    }
    // ajax请求地址
    var url = $(selector).attr('data-dropdown-url').replace('{{search}}',
            encodeURIComponent(text));

    ICB.V.dropdownAjaxRequester = $
            .get(
                    url,
                    function (response) {
                        if (response.length != 0
                                && ICB.V.dropdownAjaxRequester != undefined) {
                            $(selector).parent().find('.icb-dropdown-list')
                                    .html(''); // 清空列表
                            if (typeof callback == 'string') {
                                if (typeof ICB.dropdown.ajaxCallback[callback] == 'function') {
                                    callback = ICB.dropdown.ajaxCallback[callback];
                                } else {
                                    callback = null;
                                }
                            }
                            if (typeof callback == 'function') {
                                callback(selector, response);
                            }
                            var type = $(selector).attr('data-dropdown-type');
                            if ('publish' == type) {
                                $(selector)
                                        .parent()
                                        .find(
                                                '.icb-publish-suggest-question, .icb-publish-suggest-question .icb-dropdown-list')
                                        .show();
                            } else {
                                $(selector).parent().find(
                                        '.icb-dropdown, .icb-dropdown-list')
                                        .show().children().show();
                                $(selector).parent().find('.title').hide();
                                // 关键词高亮
                                $(selector).parent().find(
                                        '.icb-dropdown-list li.ajax-item a')
                                        .highText(text, 'b', 'active');
                            }
                        } else {
                            $(selector).parent().find('.icb-dropdown').show()
                                    .end().find('.title').html(_t('没有找到相关结果'))
                                    .show();
                            $(selector)
                                    .parent()
                                    .find(
                                            '.icb-dropdown-list, .icb-publish-suggest-question')
                                    .hide();
                        }
                    }, 'json');

};
/**
 * 下拉菜单功能绑定 。 元素需要的属性： data-dropdown-type （tip/list）
 *
 * @param selector
 * @param ajaxCallback
 */
ICB.dropdown.bind = function (selector, ajaxCallback) {
    var type = $(selector).attr('data-dropdown-type');
    var $selector = $(selector);
    if (type == 'tip') {
        $selector.focus(function () {
            $selector.parent().find('.icb-dropdown').show();
        });
    }
    // 绑定输入框值变化
    $selector.bind('input propertychange', function (e) {
        if (type == 'tip' && $.trim($selector.val()).length >= 1) {
            $selector.parent().find('.tip').show().children('a').text(
                    $(selector).val());
        }
        if ($.trim($selector.val()).length >= 1) {
            if (e.which != 13 && e.which != 38 && e.which != 40) {
                ICB.dropdown.ajaxLoad($(this), ajaxCallback);
            }
        } else if (type != 'tip') {
            $(selector).parent().find('.icb-dropdown').hide();
        }

        if (type == 'list') { // 下拉选择列表
            // 回车提交
            if (e.which == 13) {
                $('.icb-search-tag-box .icb-dropdown').hide();
                $('.icb-search-tag-box .add').click();
                return false;
            }

            var $liList = $(selector).parent().find('.icb-dropdown-list li');

            // 键盘往下(40), 键盘向上(38)
            if ((e.which == 40 || e.which == 38) && $liList.is(':visible')) {
                var _index;
                var start = 0, end = $liList.length - 1, step = 1;
                if (e.which == 38) {
                    start = $liList.length - 1;
                    end = 0;
                    step = -1;
                }

                if (!$liList.hasClass('active')) {
                    $liList.eq(start).addClass('active');

                } else {
                    $.each($liList, function (i, e) {
                        if ($(this).hasClass('active')) {
                            $(this).removeClass('active');
                            if ($(this).index() == end) {
                                _index = start;
                            } else {
                                _index = $(this).index() + step;
                            }
                        }
                    });
                    $liList.eq(_index).addClass('active');
                    $(selector).val($liList.eq(_index).text());
                }
            }
        }
    });
    // 鼠标移除
    $(selector).blur(function () {
        $(selector).parent().find('.icb-dropdown').fadeOut();
    });
};

/**
 * 设置下拉列表数据内容
 *
 * @param selector
 * @param data
 * @param selected
 */
ICB.dropdown.setList = function (selector, data, selected) {
    $(selector).append(Hogan.compile(ICB.template.dropdownList).render({
        'list' : data
    }));

    $(selector).find('.icb-dropdown-list li a').click(
            function () {
                $(this).closest('.dropdown').find('#icb-selected-tag-show')
                        .html($(this).text());
                $(this).closest('li').addClass('active').siblings()
                        .removeClass('active');
            });

    if (selected) {
        $(selector).find(" .dropdown-menu li a[data-value='" + selected + "']")
                .click();
    }
};

ICB.domEvents = {};
        /**
         * 删除提示
         *
         * @param showMessage
         * @param onYesCallback
         * @param onShowCallback
         */
        ICB.domEvents.deleteShowConfirmModal = function (showMessage,
                onYesCallback, onShowCallback) {
            var template = Hogan.compile(ICB.template.confirmBox).render({
                'message' : showMessage
            });
            ICB.modal.confirm(template, onYesCallback, onShowCallback);
        },
        // 初始化问题评论框
        ICB.domEvents.init_comment_box = function (selector) {
            $(document)
                    .on(
                            'click',
                            selector,
                            function () {
                                $(this)
                                        .parents('.icb-question-detail')
                                        .find(
                                                '.icb-invite-box, .icb-question-related-box')
                                        .hide();
                                if (typeof COMMENT_UNFOLD != 'undefined') {
                                    if (COMMENT_UNFOLD == 'all'
                                            && $(this).attr(
                                                    'data-comment-count') == 0
                                            && $(this).attr('data-first-click') == 'hide') {
                                        $(this).removeAttr('data-first-click');
                                        return false;
                                    }
                                }

                                if (!$(this).attr('data-type')
                                        || !$(this).attr('data-id')) {
                                    return true;
                                }

                                var comment_box_id = '#icb-comment-box-'
                                        + $(this).attr('data-type') + '-'
                                        + $(this).attr('data-id');

                                if ($(comment_box_id).length) {
                                    if ($(comment_box_id).css('display') == 'none') {
                                        $(this).addClass('active');

                                        $(comment_box_id).fadeIn();
                                    } else {
                                        $(this).removeClass('active');
                                        $(comment_box_id).fadeOut();
                                    }
                                } else {
                                    // 动态插入commentBox
                                    switch ($(this).attr('data-type')) {
                                    case 'question':
                                        var comment_form_action = G_BASE_URL
                                                + '/question/ajax/save_question_comment/question_id-'
                                                + $(this).attr('data-id');
                                        var comment_data_url = G_BASE_URL
                                                + '/question/ajax/get_question_comments/question_id-'
                                                + $(this).attr('data-id');
                                        break;

                                    case 'answer':
                                        var comment_form_action = G_BASE_URL
                                                + '/question/ajax/save_answer_comment/answer_id-'
                                                + $(this).attr('data-id');
                                        var comment_data_url = G_BASE_URL
                                                + '/question/ajax/get_answer_comments/answer_id-'
                                                + $(this).attr('data-id');
                                        break;
                                    }

                                    if (G_USER_ID) {
                                        $(this)
                                                .parents('.icb-item')
                                                .find('.mod-footer')
                                                .append(
                                                        Hogan
                                                                .compile(
                                                                        AW_TEMPLATE.commentBox)
                                                                .render(
                                                                        {
                                                                            'comment_form_id' : comment_box_id
                                                                                    .replace(
                                                                                            '#',
                                                                                            ''),
                                                                            'comment_form_action' : comment_form_action
                                                                        }));

                                        $(comment_box_id)
                                                .find('.icb-comment-txt')
                                                .bind(
                                                        {
                                                            focus : function () {
                                                                $(
                                                                        comment_box_id)
                                                                        .find(
                                                                                '.icb-comment-box-btn')
                                                                        .show();
                                                            },

                                                            blur : function () {
                                                                if ($(this)
                                                                        .val() == '') {
                                                                    $(
                                                                            comment_box_id)
                                                                            .find(
                                                                                    '.icb-comment-box-btn')
                                                                            .hide();
                                                                }
                                                            }
                                                        });

                                        $(comment_box_id)
                                                .find('.close-comment-box')
                                                .click(
                                                        function () {
                                                            $(comment_box_id)
                                                                    .fadeOut();
                                                            $(comment_box_id)
                                                                    .find(
                                                                            '.icb-comment-txt')
                                                                    .css(
                                                                            'height',
                                                                            $(
                                                                                    this)
                                                                                    .css(
                                                                                            'line-height'));
                                                        });
                                    } else {
                                        $(this)
                                                .parents('.icb-item')
                                                .find('.mod-footer')
                                                .append(
                                                        Hogan
                                                                .compile(
                                                                        AW_TEMPLATE.commentBoxClose)
                                                                .render(
                                                                        {
                                                                            'comment_form_id' : comment_box_id
                                                                                    .replace(
                                                                                            '#',
                                                                                            ''),
                                                                            'comment_form_action' : comment_form_action
                                                                        }));
                                    }

                                    // 判断是否有评论数据
                                    $
                                            .get(
                                                    comment_data_url,
                                                    function (result) {
                                                        if ($.trim(result) == '') {
                                                            result = '<div align="center" class="icb-padding10">'
                                                                    + _t('暂无评论')
                                                                    + '</div>';
                                                        }

                                                        $(comment_box_id)
                                                                .find(
                                                                        '.icb-comment-list')
                                                                .html(result);
                                                    });

                                    // textarae自动增高
                                    $(comment_box_id).find('.icb-comment-txt')
                                            .autosize();

                                    $(this).addClass('active');

                                    AWS.at_user_lists(comment_box_id
                                            + ' .icb-comment-txt', 5);
                                }
                            });
        };

// 初始化文章评论框
ICB.domEvents.init_article_comment_box = function (selector) {
    $(document)
            .on(
                    'click',
                    selector,
                    function () {
                        var _editor_box = $(this).parents('.icb-item').find(
                                '.icb-article-replay-box');
                        if (_editor_box.length) {
                            if (_editor_box.css('display') == 'block') {
                                _editor_box.fadeOut();
                            } else {
                                _editor_box.fadeIn();
                            }
                        } else {
                            $(this)
                                    .parents('.mod-footer')
                                    .append(
                                            Hogan
                                                    .compile(
                                                            AW_TEMPLATE.articleCommentBox)
                                                    .render(
                                                            {
                                                                'at_uid' : $(
                                                                        this)
                                                                        .attr(
                                                                                'data-id'),
                                                                'article_id' : $(
                                                                        '.icb-article-title-box')
                                                                        .attr(
                                                                                'data-id')
                                                            }));
                        }
                    });
};

/**
 * 点击添加按钮（文章发布时的标签搜索框中的），将标签填入到标签队列显示区域
 *
 * @param selector
 */
ICB.domEvents.addTagInArticleButtonClick = function (selector) {
    $(selector)
            .click(
                    function () {
                        var tagbox = $('#icb-article-tag-box'), id = tagbox
                                .attr('data-id'), type = tagbox
                                .attr('data-type');
                        var keyword = $.trim($('#icb-tag-category-keyword')
                                .val());
                        if ('' != keyword) {
                            switch (type) {
                            case 'publish': // 发布文章时， 绑定标签
                                tagbox
                                        .find('.tag-queue-box')
                                        .prepend(
                                                Hogan
                                                        .compile(
                                                                ICB.template.tagQueueToArticleBox)
                                                        .render({
                                                            name : keyword
                                                        })).hide().fadeIn();

                                $('#icb-tag-category-keyword').val('');
                                break;

                            case 'question':
                                $
                                        .post(
                                                G_BASE_URL
                                                        + '/topic/ajax/set_article_topic_relation/',
                                                'type=question&item_id='
                                                        + data_id
                                                        + '&topic_title='
                                                        + encodeURIComponent(_topic_editor
                                                                .find(
                                                                        '#icb-tag-category-keyword')
                                                                .val()),
                                                function (result) {
                                                    if (result.errno != 1) {
                                                        ICB.modal
                                                                .alert(result.err);

                                                        return false;
                                                    }

                                                    _topic_editor
                                                            .find(
                                                                    '.tag-queue-box')
                                                            .prepend(
                                                                    '<span class="article-tag" data-id="'
                                                                            + result.rsm.topic_id
                                                                            + '"><a href="'
                                                                            + G_BASE_URL
                                                                            + '/topic/'
                                                                            + result.rsm.topic_id
                                                                            + '" class="text">'
                                                                            + _topic_editor
                                                                                    .find(
                                                                                            '#icb-tag-category-keyword')
                                                                                    .val()
                                                                            + '</a><a class="close"><i class="icon icon-delete"></i></a></span>')
                                                            .hide().fadeIn();

                                                    _topic_editor
                                                            .find(
                                                                    '#icb-tag-category-keyword')
                                                            .val('');
                                                }, 'json');
                                break;

                            case 'article':
                                $
                                        .post(
                                                G_BASE_URL
                                                        + '/topic/ajax/set_article_topic_relation/',
                                                'type=article&item_id='
                                                        + data_id
                                                        + '&topic_title='
                                                        + encodeURIComponent(_topic_editor
                                                                .find(
                                                                        '#icb-tag-category-keyword')
                                                                .val()),
                                                function (result) {
                                                    if (result.errno != 1) {
                                                        ICB.modal
                                                                .alert(result.err);

                                                        return false;
                                                    }

                                                    _topic_editor
                                                            .find(
                                                                    '.tag-queue-box')
                                                            .prepend(
                                                                    '<span class="article-tag" data-id="'
                                                                            + result.rsm.topic_id
                                                                            + '"><a href="'
                                                                            + G_BASE_URL
                                                                            + '/topic/'
                                                                            + result.rsm.topic_id
                                                                            + '" class="text">'
                                                                            + _topic_editor
                                                                                    .find(
                                                                                            '#icb-tag-category-keyword')
                                                                                    .val()
                                                                            + '</a><a class="close"><i class="icon icon-delete"></i></a></span>')
                                                            .hide().fadeIn();

                                                    _topic_editor
                                                            .find(
                                                                    '#icb-tag-category-keyword')
                                                            .val('');
                                                }, 'json');
                                break;

                            case 'topic':
                                $
                                        .post(
                                                G_BASE_URL
                                                        + '/topic/ajax/save_related_topic/topic_id-'
                                                        + data_id,
                                                'topic_title='
                                                        + encodeURIComponent(_topic_editor
                                                                .find(
                                                                        '#icb-tag-category-keyword')
                                                                .val()),
                                                function (result) {
                                                    if (result.errno != 1) {
                                                        ICB.modal
                                                                .alert(result.err);

                                                        return false;
                                                    }

                                                    _topic_editor
                                                            .find(
                                                                    '.tag-queue-box')
                                                            .prepend(
                                                                    '<span class="article-tag"><a href="'
                                                                            + G_BASE_URL
                                                                            + '/favorite/tag-'
                                                                            + encodeURIComponent(_topic_editor
                                                                                    .find(
                                                                                            '#icb-tag-category-keyword')
                                                                                    .val())
                                                                            + '" class="text">'
                                                                            + _topic_editor
                                                                                    .find(
                                                                                            '#icb-tag-category-keyword')
                                                                                    .val()
                                                                            + '</a><a class="close"><i class="icon icon-delete"></i></a></span>')
                                                            .hide().fadeIn();

                                                    _topic_editor
                                                            .find(
                                                                    '#icb-tag-category-keyword')
                                                            .val('');
                                                }, 'json');
                                break;

                            case 'favorite':
                                $
                                        .post(
                                                G_BASE_URL
                                                        + '/favorite/ajax/update_favorite_tag/',
                                                'item_id='
                                                        + data_id
                                                        + '&item_type='
                                                        + _topic_editor
                                                                .attr('data-item-type')
                                                        + '&tags='
                                                        + encodeURIComponent(_topic_editor
                                                                .find(
                                                                        '#icb-tag-category-keyword')
                                                                .val()),
                                                function (result) {
                                                    if (result.errno != 1) {
                                                        ICB.modal
                                                                .alert(result.err);

                                                        return false;
                                                    }

                                                    _topic_editor
                                                            .find(
                                                                    '.tag-queue-box')
                                                            .prepend(
                                                                    '<span class="article-tag"><a href="'
                                                                            + G_BASE_URL
                                                                            + '/favorite/tag-'
                                                                            + encodeURIComponent(_topic_editor
                                                                                    .find(
                                                                                            '#icb-tag-category-keyword')
                                                                                    .val())
                                                                            + '" class="text">'
                                                                            + _topic_editor
                                                                                    .find(
                                                                                            '#icb-tag-category-keyword')
                                                                                    .val()
                                                                            + '</a><a class="close"><i class="icon icon-delete"></i></a></span>')
                                                            .hide().fadeIn();

                                                    _topic_editor
                                                            .find(
                                                                    '#icb-tag-category-keyword')
                                                            .val('');
                                                }, 'json');
                                break;
                            }
                        }
                    });

};
/**
 * 点击文章发布表单中的 标签编辑按钮， 呈现出标签输入提示，点击标签后和文章关联上
 *
 * @param selector
 */
ICB.domEvents.editArticleTagButtonClick = function (selector) {
    $(selector).click(
            function () {
                var tagbox = $('#icb-article-tag-box'), data_id = tagbox
                        .attr('data-id'), data_type = tagbox.attr('data-type');

                tagbox.addClass('active');

                // 判断插入编辑box
                if (tagbox.find('.icb-search-tag-box').length == 0) {
                    tagbox.append(ICB.template.addTagToArticleBox);
                }
                // 查看是否已经将其他事件绑定
                if (!tagbox.data('isEventBind')) {
                    tagbox.data('isEventBind', true);
                    // 给编辑box添加按钮添加事件
                    ICB.domEvents.addTagInArticleButtonClick(tagbox
                            .find('.add'));

                    // 给编辑box取消按钮添加事件
                    tagbox.find('.close-add-tag').click(function () {
                        tagbox.find('.icb-search-tag-box').hide();
                        tagbox.removeClass('active');
                    });

                    ICB.dropdown.bind(tagbox.find('#icb-tag-category-keyword'),
                            'replaceTagCategoryList');
                }

                tagbox.find('.icb-search-tag-box').fadeIn();

                // 是否允许创建新话题
                if (!G_CAN_CREATE_TOPIC) {
                    tagbox.find('.add').hide();
                }
            });
};
/**
 * 点击指定按钮， 将按钮上层dom[data-active="toggle"]中的样式表icb-active进行切换
 */
ICB.domEvents.toggleActiveClick = function (selector) {
    $(selector).click(function () {
        $(this).closest('[data-active="toggle"]').toggleClass('icb-active');
    });
}
/**
 * 点击 升级，降级 按钮， 实现条目（如菜单）的父级子级关系
 *
 * @param selector
 */
ICB.domEvents.changeUpDownLevelClick = function (selector) {
    $(selector).click(
            function (event) {
                $(this).closest('.item-intent, .item-no-intent').toggleClass(
                        'item-intent').toggleClass('item-no-intent');
                $(this).find('.js-is-child').val(
                        1 - $(this).find('.js-is-child').val());
                event.stopPropagation();
            });
};

/**
 * 工具集
 */
ICB.utils = {};
/**
 * ajax请求附件内容， 用fileuploader构建附件列表显示
 *
 * @param url
 *            请求的URL
 * @param postParams
 *            ajax 的post参数
 * @param fileuploaderObj
 *            fileuploader实例对象
 */
ICB.utils.loadAttachListFromAjax = function (url, postParams, fileuploaderObj) {
    $.post(url, postParams, function (data) {
        if (data['err']) {
            return false;
        } else if (data['rsm']['attachs']) {
            $.each(data['rsm']['attachs'], function (i, attachInfo) {
                fileuploaderObj.setFileList(attachInfo);
            });
        }
    }, 'json');
}

var AWS_BACK = {
    // 全局loading
    loading : function (type) {
        if (!$('#icb-loading').length) {
            $('#icb-modal-window').append(AW_TEMPLATE.loadingBox);
        }

        if (type == 'show') {
            if ($('#icb-loading').css('display') == 'block') {
                return false;
            }

            $('#icb-loading').fadeIn();

            AWS_BACK.G.loading_timer = setInterval(function () {
                AWS_BACK.G.loading_bg_count -= 1;

                $('#icb-loading-box').css('background-position',
                        '0px ' + AWS_BACK.G.loading_bg_count * 40 + 'px');

                if (AWS_BACK.G.loading_bg_count == 1) {
                    AWS_BACK.G.loading_bg_count = 12;
                }
            }, 100);
        } else {
            $('#icb-loading').fadeOut();

            clearInterval(AWS_BACK.G.loading_timer);
        }
    },

    loading_mini : function (selector, type) {
        if (!selector.find('#icb-loading-mini-box').length) {
            selector.append(AW_TEMPLATE.loadingMiniBox);
        }

        if (type == 'show') {
            selector.find('#icb-loading-mini-box').fadeIn();

            AWS_BACK.G.loading_timer = setInterval(function () {
                AWS_BACK.G.loading_mini_bg_count -= 1;

                $('#icb-loading-mini-box').css('background-position',
                        '0px ' + AWS_BACK.G.loading_mini_bg_count * 16 + 'px');

                if (AWS_BACK.G.loading_mini_bg_count == 1) {
                    AWS_BACK.G.loading_mini_bg_count = 9;
                }
            }, 100);
        } else {
            selector.find('#icb-loading-mini-box').fadeOut();

            clearInterval(AWS_BACK.G.loading_timer);
        }
    },

    ajax_request : function (url, params) {
        AWS_BACK.loading('show');

        if (params) {
            $.post(url, params + '&_post_type=ajax', function (response) {
                _callback(response);
            }, 'json').error(function (error) {
                _error(error);
            });
        } else {
            $.get(url, function (response) {
                _callback(response);
            }, 'json').error(function (error) {
                _error(error);
            });
        }

        function _callback(response) {
            AWS_BACK.loading('hide');

            if (!response) {
                return false;
            }

            if (response.err) {
                AWS_BACK.alert(response.err);
            } else if (response.rsm && response.rsm.url) {
                window.location = decodeURIComponent(response.rsm.url);
            } else if (response.errno == 1) {
                window.location.reload();
            }
        }

        function _error(error) {
            AWS_BACK.loading('hide');

            if ($.trim(error.responseText) != '') {
                alert(_t('发生错误, 返回的信息:') + ' ' + error.responseText);
            }
        }

        return false;
    },

    ajax_post : function (formEl, processer, type) // 表单对象，用 jQuery 获取，回调函数名
    {
        // 若有编辑器的话就更新编辑器内容再提交
        if (typeof CKEDITOR != 'undefined') {
            for (instance in CKEDITOR.instances) {
                CKEDITOR.instances[instance].updateElement();
            }
        }

        if (typeof (processer) != 'function') {
            var processer = AWS_BACK.ajax_processer;

            AWS_BACK.loading('show');
        }

        if (!type) {
            var type = 'default';
        } else if (type == 'reply_question') {
            AWS_BACK.loading('show');

            $('.btn-reply').addClass('disabled');

            // 删除草稿绑定事件
            if (EDITOR != undefined) {
                EDITOR.removeListener('blur', EDITOR_CALLBACK);
            }
        }

        var custom_data = {
            _post_type : 'ajax'
        };

        formEl.ajaxSubmit({
            dataType : 'json',
            data : custom_data,
            success : function (response) {
                processer(type, response);
            },
            error : function (error) {
                console && console.log(error);
                if ($.trim(error.responseText) != '') {
                    AWS_BACK.loading('hide');

                    alert(_t('发生错误, 返回的信息:') + ' ' + error.responseText);
                } else if (error.status == 0) {
                    AWS_BACK.loading('hide');

                    alert(_t('网络链接异常'));
                } else if (error.status == 500) {
                    AWS_BACK.loading('hide');

                    alert(_t('内部服务器错误'));
                }
            }
        });
    },

    // ajax提交callback
    ajax_processer : function (type, response) {
        AWS_BACK.loading('hide');

        if (typeof (response.errno) == 'undefined') {
            AWS_BACK.alert(response);
        } else if (response.errno != 1) {
            switch (type) {
            case 'default':
            case 'comments_form':
            case 'reply':
            case 'reply_question':
                AWS_BACK.alert(response.err);

                $('.icb-comment-box-btn .btn-success, .btn-reply').removeClass(
                        'disabled');
                break;

            case 'ajax_post_alert':
            case 'ajax_post_modal':
            case 'error_message':
                if (!$('.error_message').length) {
                    alert(response.err);
                } else if ($('.error_message em').length) {
                    $('.error_message em').html(response.err);
                } else {
                    $('.error_message').html(response.err);
                }

                if ($('.error_message').css('display') != 'none') {
                    AWS_BACK.shake($('.error_message'));
                } else {
                    $('.error_message').fadeIn();
                }

                if ($('#captcha').length) {
                    $('#captcha').click();
                }
                break;
            }
        } else {
            if (type == 'comments_form') {
                AWS_BACK.reload_comments_list(response.rsm.item_id,
                        response.rsm.item_id, response.rsm.type_name);
                $(
                        '#icb-comment-box-' + response.rsm.type_name + '-'
                                + response.rsm.item_id + ' form textarea').val(
                        '');
                $('.icb-comment-box-btn .btn-success').removeClass('disabled');
            }

            if (response.rsm && response.rsm.url) {
                // 判断返回url跟当前url是否相同
                if (window.location.href == response.rsm.url) {
                    window.location.reload();
                } else {
                    window.location = decodeURIComponent(response.rsm.url);
                }
            } else {
                switch (type) {
                case 'default':
                case 'ajax_post_alert':
                case 'error_message':
                    window.location.reload();
                    break;

                case 'ajax_post_modal':
                    $('#icb-modal-window div.modal').modal('hide');
                    break;

                // 问题回复
                case 'reply_question':
                    AWS_BACK.loading('hide');

                    if (response.rsm.ajax_html) {
                        $('.icb-feed-list').append(response.rsm.ajax_html);

                        $('.icb-comment-box-btn .btn-success, .btn-reply')
                                .removeClass('disabled');

                        $.scrollTo(
                                $('#' + $(response.rsm.ajax_html).attr('id')),
                                600, {
                                    queue : true
                                });

                        // 问题
                        $('.question_answer_form').detach();

                        if ($('.icb-replay-box.question').length) {
                            if (USER_ANSWERED) {
                                $('.icb-replay-box').append(
                                        '<p align="center">一个问题只能回复一次, 你可以在发言后 '
                                                + ANSWER_EDIT_TIME
                                                + ' 分钟内编辑回复过的内容</p>');
                            }
                        }
                    } else if (response.rsm.url) {
                        window.location = decodeURIComponent(response.rsm.url);
                    } else {
                        window.location.reload();
                    }
                    break;
                // 文章回复
                case 'reply':
                    AWS_BACK.loading('hide');

                    if (response.rsm.ajax_html) {
                        $('.icb-feed-list').append(response.rsm.ajax_html);

                        $('.icb-comment-box-btn .btn-success, .btn-reply')
                                .removeClass('disabled');

                        $.scrollTo(
                                $('#' + $(response.rsm.ajax_html).attr('id')),
                                600, {
                                    queue : true
                                });

                        // 文章
                        $('#comment_editor').val('');
                    } else if (response.rsm.url) {
                        window.location = decodeURIComponent(response.rsm.url);
                    } else {
                        window.location.reload();
                    }
                    break;
                }
            }
        }
    },

    // 加载更多
    load_list_view : function (url, selector, container, start_page, callback) {
        if (!selector.attr('id')) {
            return false;
        }

        if (!start_page) {
            start_page = 0
        }

        // 把页数绑定在元素上面
        if (selector.attr('data-page') == undefined) {
            selector.attr('data-page', start_page);
        } else {
            selector
                    .attr('data-page', parseInt(selector.attr('data-page')) + 1);
        }

        selector
                .bind(
                        'click',
                        function () {
                            var _this = this;

                            $(this).addClass('loading');

                            $
                                    .get(
                                            url
                                                    + '__page-'
                                                    + $(_this)
                                                            .attr('data-page'),
                                            function (response) {
                                                $(_this).removeClass('loading');

                                                if ($.trim(response) != '') {
                                                    if ($(_this).attr(
                                                            'data-page') == start_page
                                                            && $(_this)
                                                                    .attr(
                                                                            'auto-load') != 'false') {
                                                        container
                                                                .html(response);
                                                    } else {
                                                        container
                                                                .append(response);
                                                    }

                                                    // 页数增加1
                                                    $(_this)
                                                            .attr(
                                                                    'data-page',
                                                                    parseInt($(
                                                                            _this)
                                                                            .attr(
                                                                                    'data-page')) + 1);
                                                } else {
                                                    // 没有内容
                                                    if ($(_this).attr(
                                                            'data-page') == start_page
                                                            && $(_this)
                                                                    .attr(
                                                                            'auto-load') != 'false') {
                                                        container
                                                                .html('<p style="padding: 15px 0" align="center">'
                                                                        + _t('没有内容')
                                                                        + '</p>');
                                                    }

                                                    $(_this).addClass(
                                                            'disabled').unbind(
                                                            'click').bind(
                                                            'click',
                                                            function () {
                                                                return false;
                                                            });

                                                    $(_this).find('span').html(
                                                            _t('没有更多了'));
                                                }

                                                if (callback != null) {
                                                    callback();
                                                }
                                            });

                            return false;
                        });

        // 自动加载
        if (selector.attr('auto-load') != 'false') {
            selector.click();
        }
    },

    // 重新加载评论列表
    reload_comments_list : function (item_id, element_id, type_name) {
        $(
                '#icb-comment-box-' + type_name + '-' + element_id
                        + ' .icb-comment-list')
                .html(
                        '<p align="center" class="icb-padding10"><i class="icb-loading"></i></p>');

        $.get(G_BASE_URL + '/question/ajax/get_' + type_name + '_comments/'
                + type_name + '_id-' + item_id, function (data) {
            $(
                    '#icb-comment-box-' + type_name + '-' + element_id
                            + ' .icb-comment-list').html(data);
        });
    },

    // 警告弹窗
    alert : function (text) {
        if ($('.icb-alert-box').length) {
            $('.icb-alert-box').remove();
        }

        $('#icb-modal-window').append(
                Hogan.compile(AW_TEMPLATE.alertBox).render({
                    message : text
                }));

        $(".icb-alert-box").modal('show');
    },

    /**
     * 公共弹窗 publish : 发起 redirect : 问题重定向 imageBox : 插入图片 videoBox : 插入视频
     * linkbox : 插入链接 commentEdit : 评论编辑 favorite : 评论添加收藏 inbox : 私信 report :
     * 举报问题
     */
    dialog : function (type, data, callback) {
        switch (type) {
        case 'alertImg':
            var template = Hogan.compile(AW_TEMPLATE.alertImg).render({
                'hide' : data.hide,
                'url' : data.url,
                'message' : data.message
            });
            break;

        case 'publish':
            var template = Hogan.compile(AW_TEMPLATE.publishBox).render({
                'category_id' : data.category_id,
                'ask_user_id' : data.ask_user_id
            });
            break;

        case 'redirect':
            var template = Hogan.compile(AW_TEMPLATE.questionRedirect).render({
                'data_id' : data
            });
            break;

        case 'commentEdit':
            var template = Hogan.compile(AW_TEMPLATE.editCommentBox).render({
                'answer_id' : data.answer_id,
                'attach_access_key' : data.attach_access_key
            });
            break;

        case 'favorite':
            var template = Hogan.compile(AW_TEMPLATE.favoriteBox).render({
                'item_id' : data.item_id,
                'item_type' : data.item_type
            });
            break;

        case 'inbox':
            var template = Hogan.compile(AW_TEMPLATE.inbox).render({
                'recipient' : data
            });
            break;

        case 'report':
            var template = Hogan.compile(AW_TEMPLATE.reportBox).render({
                'item_type' : data.item_type,
                'item_id' : data.item_id
            });
            break;

        case 'topicEditHistory':
            var template = AW_TEMPLATE.ajaxData
                    .replace('{{title}}', _t('编辑记录')).replace('{{data}}', data);
            break;

        case 'ajaxData':
            var template = AW_TEMPLATE.ajaxData
                    .replace('{{title}}', data.title).replace('{{data}}',
                            '<div id="aw_dialog_ajax_data"></div>');
            break;

        case 'imagePreview':
            var template = AW_TEMPLATE.ajaxData
                    .replace('{{title}}', data.title)
                    .replace(
                            '{{data}}',
                            '<p align="center"><img src="' + data.image
                                    + '" alt="" style="max-width:520px" /></p>');
            break;

        case 'confirm':
            var template = Hogan.compile(AW_TEMPLATE.confirmBox).render({
                'message' : data.message
            });
            break;

        case 'recommend':
            var template = Hogan.compile(AW_TEMPLATE.recommend).render();
            break;

        // modify by wecenter 活动模块
        case 'projectEventForm':
            var template = Hogan.compile(AW_TEMPLATE.projectEventForm).render({
                'project_id' : data.project_id,
                'contact_name' : data.contact_name,
                'contact_tel' : data.contact_tel,
                'contact_email' : data.contact_email
            });
            break;

        case 'projectStockForm':
            var template = Hogan.compile(AW_TEMPLATE.projectStockForm).render({
                'project_id' : data.project_id,
                'contact_name' : data.contact_name,
                'contact_tel' : data.contact_tel,
                'contact_email' : data.contact_email
            });
            break;

        case 'activityBox':
            var template = Hogan.compile(AW_TEMPLATE.activityBox).render({
                'contact_name' : data.contact_name,
                'contact_tel' : data.contact_tel,
                'contact_qq' : data.contact_qq
            });

            break;
        }

        if (template) {
            if ($('.icb-alert-box').length) {
                $('.icb-alert-box').remove();
            }

            $('#icb-modal-window').html(template).show();

            switch (type) {
            case 'redirect':
                AWS_BACK.Dropdown.bind_dropdown_list(
                        $('.icb-question-redirect-box #question-input'),
                        'redirect');
                break;

            case 'inbox':
                AWS_BACK.Dropdown.bind_dropdown_list(
                        $('.icb-inbox #invite-input'), 'inbox');
                // 私信用户下拉点击事件
                $(document)
                        .on(
                                'click',
                                '.icb-inbox .icb-dropdown-list li a',
                                function () {
                                    $(
                                            '.icb-alert-box #quick_publish input.form-control')
                                            .val($(this).text());
                                    $(this).parents('.icb-dropdown').hide();
                                });
                break;

            case 'publish':
                AWS_BACK.Dropdown.bind_dropdown_list(
                        $('.icb-publish-box #quick_publish_question_content'),
                        'publish');
                AWS_BACK.Dropdown.bind_dropdown_list(
                        $('.icb-publish-box #icb-tag-category-keyword'),
                        'topic');
                if (parseInt(data.category_enable) == 1) {
                    $
                            .get(
                                    G_BASE_URL
                                            + '/publish/ajax/fetch_question_category/',
                                    function (response) {
                                        AWS_BACK.Dropdown.set_dropdown_list(
                                                '.icb-publish-box .dropdown',
                                                eval(response),
                                                data.category_id);

                                        $('.icb-publish-title .dropdown li a')
                                                .click(
                                                        function () {
                                                            $(
                                                                    '.icb-publish-box #quick_publish_category_id')
                                                                    .val(
                                                                            $(
                                                                                    this)
                                                                                    .attr(
                                                                                            'data-value'));
                                                            $(
                                                                    '.icb-publish-box #icb-selected-tag-show')
                                                                    .html(
                                                                            $(
                                                                                    this)
                                                                                    .text());
                                                        });
                                    });
                } else {
                    $('.icb-publish-box .icb-publish-title').hide();
                }

                if (data.ask_user_id != '' && data.ask_user_id != undefined) {
                    $('.icb-publish-box .modal-title').html(
                            '向 ' + data.ask_user_name + ' 提问');
                }

                if ($('#icb-search-query').val()
                        && $('#icb-search-query').val() != $(
                                '#icb-search-query').attr('placeholder')) {
                    $('#quick_publish_question_content').val(
                            $('#icb-search-query').val());
                }

                AWS_BACK.Init
                        .init_topic_edit_box('#quick_publish .icb-edit-topic');

                $('#quick_publish .icb-edit-topic').click();

                $('#quick_publish .close-edit').hide();

                if (data.topic_title) {
                    $('#quick_publish .icb-edit-topic')
                            .parents('.icb-article-title-box')
                            .prepend(
                                    '<span class="article-tag"><a class="text">'
                                            + data.topic_title
                                            + '</a><a class="close" onclick="$(this).parents(\'.article-tag\').detach();"><i class="icon icon-delete"></i></a><input type="hidden" value="'
                                            + data.topic_title
                                            + '" name="topics[]" /></span>')
                }

                if (typeof (G_QUICK_PUBLISH_HUMAN_VALID) != 'undefined') {
                    $('#quick_publish_captcha').show();
                    $('#captcha').click();
                }
                break;

            case 'favorite':
                $
                        .get(
                                G_BASE_URL
                                        + '/favorite/ajax/get_favorite_tags/',
                                function (response) {
                                    var html = ''

                                    $
                                            .each(
                                                    response,
                                                    function (i, e) {
                                                        html += '<li><a data-value="'
                                                                + e['title']
                                                                + '"><span class="title">'
                                                                + e['title']
                                                                + '</span></a><i class="icon icon-followed"></i></li>';
                                                    });

                                    $('.icb-favorite-tag-list ul').append(html);

                                    $
                                            .post(
                                                    G_BASE_URL
                                                            + '/favorite/ajax/get_item_tags/',
                                                    {
                                                        'item_id' : $(
                                                                '#favorite_form input[name="item_id"]')
                                                                .val(),
                                                        'item_type' : $(
                                                                '#favorite_form input[name="item_type"]')
                                                                .val()
                                                    },
                                                    function (response) {
                                                        if (response != null) {
                                                            $
                                                                    .each(
                                                                            response,
                                                                            function (
                                                                                    i,
                                                                                    e) {
                                                                                var index = i;

                                                                                $
                                                                                        .each(
                                                                                                $('.icb-favorite-tag-list ul li .title'),
                                                                                                function (
                                                                                                        i,
                                                                                                        e) {
                                                                                                    if ($(
                                                                                                            this)
                                                                                                            .text() == response[index]) {
                                                                                                        $(
                                                                                                                this)
                                                                                                                .parents(
                                                                                                                        'li')
                                                                                                                .addClass(
                                                                                                                        'active');
                                                                                                    }
                                                                                                });
                                                                            });
                                                        }
                                                    }, 'json');

                                    $(document)
                                            .on(
                                                    'click',
                                                    '.icb-favorite-tag-list ul li a',
                                                    function () {
                                                        var _this = this, addClassFlag = true, url = G_BASE_URL
                                                                + '/favorite/ajax/update_favorite_tag/';

                                                        if ($(this).parents(
                                                                'li').hasClass(
                                                                'active')) {
                                                            url = G_BASE_URL
                                                                    + '/favorite/ajax/remove_favorite_tag/';

                                                            addClassFlag = false;
                                                        }

                                                        $
                                                                .post(
                                                                        url,
                                                                        {
                                                                            'item_id' : $(
                                                                                    '#favorite_form input[name="item_id"]')
                                                                                    .val(),
                                                                            'item_type' : $(
                                                                                    '#favorite_form input[name="item_type"]')
                                                                                    .val(),
                                                                            'tags' : $(
                                                                                    _this)
                                                                                    .attr(
                                                                                            'data-value')
                                                                        },
                                                                        function (
                                                                                response) {
                                                                            if (response.errno == 1) {
                                                                                if (addClassFlag) {
                                                                                    $(
                                                                                            _this)
                                                                                            .parents(
                                                                                                    'li')
                                                                                            .addClass(
                                                                                                    'active');
                                                                                } else {
                                                                                    $(
                                                                                            _this)
                                                                                            .parents(
                                                                                                    'li')
                                                                                            .removeClass(
                                                                                                    'active');
                                                                                }
                                                                            }
                                                                        },
                                                                        'json');
                                                    });

                                }, 'json');
                break;

            case 'report':
                $('.icb-report-box select option').click(function () {
                    $('.icb-report-box textarea').text($(this).attr('value'));
                });
                break;

            case 'commentEdit':
                $
                        .get(
                                G_BASE_URL
                                        + '/question/ajax/fetch_answer_data/'
                                        + data.answer_id,
                                function (response) {
                                    $('#editor_reply').html(
                                            response.answer_content.replace(
                                                    '&amp;', '&'));

                                    var editor = CKEDITOR
                                            .replace('editor_reply');

                                    if (UPLOAD_ENABLE == 'Y') {
                                        var fileupload = new FileUpload(
                                                'file',
                                                '.icb-edit-comment-box .icb-upload-wrap .btn',
                                                '.icb-edit-comment-box .icb-upload-wrap .upload-container',
                                                G_BASE_URL
                                                        + '/publish/ajax/attach_upload/id-answer__attach_access_key-'
                                                        + ATTACH_ACCESS_KEY,
                                                {
                                                    'insertTextarea' : '.icb-edit-comment-box #editor_reply',
                                                    'editor' : editor
                                                });

                                        $
                                                .post(
                                                        G_BASE_URL
                                                                + '/publish/ajax/answer_attach_edit_list/',
                                                        'answer_id='
                                                                + data.answer_id,
                                                        function (data) {
                                                            if (data['err']) {
                                                                return false;
                                                            } else {
                                                                $
                                                                        .each(
                                                                                data['rsm']['attachs'],
                                                                                function (
                                                                                        i,
                                                                                        v) {
                                                                                    fileupload
                                                                                            .setFileList(v);
                                                                                });
                                                            }
                                                        }, 'json');
                                    } else {
                                        $(
                                                '.icb-edit-comment-box .icb-file-upload-box')
                                                .hide();
                                    }
                                }, 'json');
                break;

            case 'ajaxData':
                $.get(data.url, function (response) {
                    $('#aw_dialog_ajax_data').html(response);
                });
                break;

            case 'confirm':
                $('.icb-confirm-box .yes').click(function () {
                    if (callback) {
                        callback();
                    }

                    $(".icb-alert-box").modal('hide');

                    return false;
                });
                break;

            case 'recommend':
                $
                        .get(
                                G_BASE_URL + '/help/ajax/list/',
                                function (response) {
                                    if (response && response != 0) {
                                        var html = '';

                                        $
                                                .each(
                                                        response,
                                                        function (i, e) {
                                                            html += '<li class="icb-border-radius-5"><img class="icb-border-radius-5" src="'
                                                                    + e.icon
                                                                    + '"><a data-id="'
                                                                    + e.id
                                                                    + '" class="icb-hide-txt">'
                                                                    + e.title
                                                                    + '</a><i class="icon icon-followed"></i></li>'
                                                        });

                                        $('.icb-recommend-box ul').append(html);

                                        $
                                                .each(
                                                        $('.icb-recommend-box ul li'),
                                                        function (i, e) {
                                                            if (data.focus_id == $(
                                                                    this).find(
                                                                    'a').attr(
                                                                    'data-id')) {
                                                                $(this)
                                                                        .addClass(
                                                                                'active');
                                                            }
                                                        });

                                        $(document)
                                                .on(
                                                        'click',
                                                        '.icb-recommend-box ul li a',
                                                        function () {
                                                            var _this = $(this), url = G_BASE_URL
                                                                    + '/help/ajax/add_data/', removeClass = false;

                                                            if ($(this)
                                                                    .parents(
                                                                            'li')
                                                                    .hasClass(
                                                                            'active')) {
                                                                url = G_BASE_URL
                                                                        + '/help/ajax/remove_data/';

                                                                removeClass = true;
                                                            }

                                                            $
                                                                    .post(
                                                                            url,
                                                                            {
                                                                                'item_id' : data.item_id,
                                                                                'id' : _this
                                                                                        .attr('data-id'),
                                                                                'title' : _this
                                                                                        .text(),
                                                                                'type' : data.type
                                                                            },
                                                                            function (
                                                                                    response) {
                                                                                if (response.errno == 1) {
                                                                                    if (removeClass) {
                                                                                        _this
                                                                                                .parents(
                                                                                                        'li')
                                                                                                .removeClass(
                                                                                                        'active');
                                                                                    } else {
                                                                                        $(
                                                                                                '.icb-recommend-box ul li')
                                                                                                .removeClass(
                                                                                                        'active');

                                                                                        _this
                                                                                                .parents(
                                                                                                        'li')
                                                                                                .addClass(
                                                                                                        'active');
                                                                                    }
                                                                                }
                                                                            },
                                                                            'json');
                                                        });
                                    } else {
                                        $('.error_message').html(
                                                _t('请先去后台创建好章节'));

                                        if ($('.error_message').css('display') != 'none') {
                                            AWS_BACK.shake($('.error_message'));
                                        } else {
                                            $('.error_message').fadeIn();
                                        }
                                    }
                                }, 'json');
                break;
            }

            $(".icb-alert-box").modal('show');
        }
    },

    // 兼容placeholder
    check_placeholder : function (selector) {
        $.each(selector, function () {
            if (typeof ($(this).attr("placeholder")) != "undefined") {
                $(this).attr('data-placeholder', 'true');

                if ($(this).val() == '') {
                    $(this).addClass('icb-placeholder').val(
                            $(this).attr("placeholder"));
                }

                $(this).focus(function () {
                    if ($(this).val() == $(this).attr('placeholder')) {
                        $(this).removeClass('icb-placeholder').val('');
                    }
                });

                $(this).blur(
                        function () {
                            if ($(this).val() == '') {
                                $(this).addClass('icb-placeholder').val(
                                        $(this).attr('placeholder'));
                            }
                        });
            }
        });
    },

    // 回复背景高亮
    hightlight : function (selector, class_name) {
        if (selector.hasClass(class_name)) {
            return true;
        }

        var hightlight_timer_front = setInterval(function () {
            selector.addClass(class_name);
        }, 500);

        var hightlight_timer_background = setInterval(function () {
            selector.removeClass(class_name);
        }, 600);

        setTimeout(function () {
            clearInterval(hightlight_timer_front);
            clearInterval(hightlight_timer_background);

            selector.addClass(class_name);
        }, 1200);

        setTimeout(function () {
            selector.removeClass(class_name);
        }, 6000);
    },

    nl2br : function (str) {
        return str.replace(new RegExp("\r\n|\n\r|\r|\n", "g"), "<br />");
    },

    content_switcher : function (hide_el, show_el) {
        hide_el.hide();
        show_el.fadeIn();
    },

    htmlspecialchars : function (text) {
        return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g,
                '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
    },

    /*
     * 用户头像提示box效果 @params type : user/topic nTop : 焦点到浏览器上边距 nRight : 焦点到浏览器右边距
     * nBottom : 焦点到浏览器下边距 left : 焦点距离文档左偏移量 top : 焦点距离文档上偏移量 *
     */
    show_card_box : function (selector, type, time) // selector ->
                                                    // .icb-user-name/.article-tag
    {
        if (!time) {
            var time = 300;
        }

        $(document)
                .on(
                        'mouseover',
                        selector,
                        function () {
                            clearTimeout(AWS_BACK.G.card_box_hide_timer);
                            var _this = $(this);
                            AWS_BACK.G.card_box_show_timer = setTimeout(
                                    function () {
                                        // 判断用户id or 话题id 是否存在
                                        if (_this.attr('data-id')) {
                                            switch (type) {
                                            case 'user':
                                                // 检查是否有缓存
                                                if (AWS_BACK.G.cashUserData.length == 0) {
                                                    _getdata('user',
                                                            '/user/ajax/user_info/uid-');
                                                } else {
                                                    var flag = 0;
                                                    // 遍历缓存中是否含有此id的数据
                                                    _checkcash('user');
                                                    if (flag == 0) {
                                                        _getdata('user',
                                                                '/user/ajax/user_info/uid-');
                                                    }
                                                }
                                                break;

                                            case 'topic':
                                                // 检查是否有缓存
                                                if (AWS_BACK.G.cashTopicData.length == 0) {
                                                    _getdata('topic',
                                                            '/topic/ajax/topic_info/topic_id-');
                                                } else {
                                                    var flag = 0;
                                                    // 遍历缓存中是否含有此id的数据
                                                    _checkcash('topic');
                                                    if (flag == 0) {
                                                        _getdata('topic',
                                                                '/topic/ajax/topic_info/topic_id-');
                                                    }
                                                }
                                                break;
                                            }
                                        }

                                        // 获取数据
                                        function _getdata(type, url) {
                                            if (type == 'user') {
                                                $
                                                        .get(
                                                                G_BASE_URL
                                                                        + url
                                                                        + _this
                                                                                .attr('data-id'),
                                                                function (
                                                                        response) {
                                                                    var focus = response.focus, verified = response.verified, focusTxt;

                                                                    if (focus == 1) {
                                                                        focus = 'active';
                                                                        focusTxt = '取消关注';
                                                                    } else {
                                                                        focus = '';
                                                                        focusTxt = '关注';
                                                                    }

                                                                    if (response.verified == 'enterprise') {
                                                                        verified_enterprise = 'icon-v i-ve';
                                                                        verified_title = '企业认证';
                                                                    } else if (response.verified == 'personal') {
                                                                        verified_enterprise = 'icon-v';
                                                                        verified_title = '个人认证';
                                                                    } else {
                                                                        verified_enterprise = verified_title = '';
                                                                    }

                                                                    // 动态插入盒子
                                                                    $(
                                                                            '#icb-modal-window')
                                                                            .html(
                                                                                    Hogan
                                                                                            .compile(
                                                                                                    AW_TEMPLATE.userCard)
                                                                                            .render(
                                                                                                    {
                                                                                                        'verified_enterprise' : verified_enterprise,
                                                                                                        'verified_title' : verified_title,
                                                                                                        'uid' : response.uid,
                                                                                                        'avatar_file' : response.avatar_file,
                                                                                                        'user_name' : response.user_name,
                                                                                                        'reputation' : response.reputation,
                                                                                                        'agree_count' : response.agree_count,
                                                                                                        'signature' : response.signature,
                                                                                                        'url' : response.url,
                                                                                                        'category_enable' : response.category_enable,
                                                                                                        'focus' : focus,
                                                                                                        'focusTxt' : focusTxt,
                                                                                                        'ask_name' : "'"
                                                                                                                + response.user_name
                                                                                                                + "'",
                                                                                                        'fansCount' : response.fans_count
                                                                                                    }));

                                                                    // 判断是否为游客or自己
                                                                    if (G_USER_ID == ''
                                                                            || G_USER_ID == response.uid
                                                                            || response.uid < 0) {
                                                                        $(
                                                                                '#icb-card-tips .mod-footer')
                                                                                .hide();
                                                                    }
                                                                    _init();
                                                                    // 缓存
                                                                    AWS_BACK.G.cashUserData
                                                                            .push($(
                                                                                    '#icb-modal-window')
                                                                                    .html());
                                                                }, 'json');
                                            }
                                            if (type == 'topic') {
                                                $
                                                        .get(
                                                                G_BASE_URL
                                                                        + url
                                                                        + _this
                                                                                .attr('data-id'),
                                                                function (
                                                                        response) {
                                                                    var focus = response.focus, focusTxt;
                                                                    if (focus == false) {
                                                                        focus = '';
                                                                        focusTxt = _t('关注');
                                                                    } else {
                                                                        focus = 'active';
                                                                        focusTxt = _t('取消关注');
                                                                    }
                                                                    // 动态插入盒子
                                                                    $(
                                                                            '#icb-modal-window')
                                                                            .html(
                                                                                    Hogan
                                                                                            .compile(
                                                                                                    AW_TEMPLATE.topicCard)
                                                                                            .render(
                                                                                                    {
                                                                                                        'topic_id' : response.topic_id,
                                                                                                        'topic_pic' : response.topic_pic,
                                                                                                        'topic_title' : response.topic_title,
                                                                                                        'topic_description' : response.topic_description,
                                                                                                        'discuss_count' : response.discuss_count,
                                                                                                        'focus_count' : response.focus_count,
                                                                                                        'focus' : focus,
                                                                                                        'focusTxt' : focusTxt,
                                                                                                        'url' : response.url,
                                                                                                        'fansCount' : response.fans_count
                                                                                                    }));
                                                                    // 判断是否为游客
                                                                    if (G_USER_ID == '') {
                                                                        $(
                                                                                '#icb-card-tips .mod-footer .follow')
                                                                                .hide();
                                                                    }
                                                                    _init();
                                                                    // 缓存
                                                                    AWS_BACK.G.cashTopicData
                                                                            .push($(
                                                                                    '#icb-modal-window')
                                                                                    .html());
                                                                }, 'json');
                                            }
                                        }

                                        // 检测缓存
                                        function _checkcash(type) {
                                            if (type == 'user') {
                                                $
                                                        .each(
                                                                AWS_BACK.G.cashUserData,
                                                                function (i, a) {
                                                                    if (a
                                                                            .match('data-id="'
                                                                                    + _this
                                                                                            .attr('data-id')
                                                                                    + '"')) {
                                                                        $(
                                                                                '#icb-modal-window')
                                                                                .html(
                                                                                        a);
                                                                        $(
                                                                                '#icb-card-tips')
                                                                                .removeAttr(
                                                                                        'style');
                                                                        _init();
                                                                        flag = 1;
                                                                    }
                                                                });
                                            }
                                            if (type == 'topic') {

                                                $
                                                        .each(
                                                                AWS_BACK.G.cashTopicData,
                                                                function (i, a) {
                                                                    if (a
                                                                            .match('data-id="'
                                                                                    + _this
                                                                                            .attr('data-id')
                                                                                    + '"')) {
                                                                        $(
                                                                                '#icb-modal-window')
                                                                                .html(
                                                                                        a);
                                                                        $(
                                                                                '#icb-card-tips')
                                                                                .removeAttr(
                                                                                        'style');
                                                                        _init();
                                                                        flag = 1;
                                                                    }
                                                                });
                                            }
                                        }

                                        // 初始化
                                        function _init() {
                                            var left = _this.offset().left, top = _this
                                                    .offset().top
                                                    + _this.height() + 5, nTop = _this
                                                    .offset().top
                                                    - $(window).scrollTop();

                                            // 判断下边距离不足情况
                                            if (nTop
                                                    + $('#icb-card-tips')
                                                            .innerHeight() > $(
                                                    window).height()) {
                                                top = _this.offset().top
                                                        - ($('#icb-card-tips')
                                                                .innerHeight())
                                                        - 10;
                                            }

                                            // 判断右边距离不足情况
                                            if (left
                                                    + $('#icb-card-tips')
                                                            .innerWidth() > $(
                                                    window).width()) {
                                                left = _this.offset().left
                                                        - $('#icb-card-tips')
                                                                .innerWidth()
                                                        + _this.innerWidth();
                                            }

                                            $('#icb-card-tips').css({
                                                left : left,
                                                top : top
                                            }).fadeIn();
                                        }
                                    }, time);
                        });

        $(document).on('mouseout', selector, function () {
            clearTimeout(AWS_BACK.G.card_box_show_timer);
            AWS_BACK.G.card_box_hide_timer = setTimeout(function () {
                $('#icb-card-tips').fadeOut();
            }, 600);
        });
    },

    // @人功能
    at_user_lists : function (selector, limit) {
        $(selector)
                .keyup(
                        function (e) {
                            var _this = $(this), flag = _getCursorPosition($(this)[0]).start;
                            if ($(this).val().charAt(flag - 1) == '@') {
                                _init();
                                $('#icb-modal-window .content_cursor').html(
                                        $(this).val().substring(0, flag));
                            } else {
                                var lis = $('.icb-invite-dropdown li');
                                switch (e.which) {
                                case 38:
                                    var _index;
                                    if (!lis.hasClass('active')) {
                                        lis.eq(lis.length - 1).addClass(
                                                'active');
                                    } else {
                                        $
                                                .each(
                                                        lis,
                                                        function (i, e) {
                                                            if ($(this)
                                                                    .hasClass(
                                                                            'active')) {
                                                                $(this)
                                                                        .removeClass(
                                                                                'active');
                                                                if ($(this)
                                                                        .index() == 0) {
                                                                    _index = lis.length - 1;
                                                                } else {
                                                                    _index = $(
                                                                            this)
                                                                            .index() - 1;
                                                                }
                                                            }
                                                        });
                                        lis.eq(_index).addClass('active');
                                    }
                                    break;
                                case 40:
                                    var _index;
                                    if (!lis.hasClass('active')) {
                                        lis.eq(0).addClass('active');
                                    } else {
                                        $
                                                .each(
                                                        lis,
                                                        function (i, e) {
                                                            if ($(this)
                                                                    .hasClass(
                                                                            'active')) {
                                                                $(this)
                                                                        .removeClass(
                                                                                'active');
                                                                if ($(this)
                                                                        .index() == lis.length - 1) {
                                                                    _index = 0;
                                                                } else {
                                                                    _index = $(
                                                                            this)
                                                                            .index() + 1;
                                                                }
                                                            }
                                                        });
                                        lis.eq(_index).addClass('active');
                                    }
                                    break;
                                case 13:
                                    $
                                            .each($('.icb-invite-dropdown li'),
                                                    function (i, e) {
                                                        if ($(this).hasClass(
                                                                'active')) {
                                                            $(this).click();
                                                        }
                                                    });
                                    break;
                                default:
                                    if ($('.icb-invite-dropdown')[0]) {
                                        var ti = 0;
                                        for (var i = flag; i > 0; i--) {
                                            if ($(this).val().charAt(i) == "@") {
                                                ti = i;
                                                break;
                                            }
                                        }
                                        $
                                                .get(
                                                        G_BASE_URL
                                                                + '/search/ajax/search/?type=users&q='
                                                                + encodeURIComponent($(
                                                                        this)
                                                                        .val()
                                                                        .substring(
                                                                                flag,
                                                                                ti)
                                                                        .replace(
                                                                                '@',
                                                                                ''))
                                                                + '&limit='
                                                                + limit,
                                                        function (response) {
                                                            if ($('.icb-invite-dropdown')[0]) {
                                                                if (response.length != 0) {
                                                                    var html = '';

                                                                    $(
                                                                            '.icb-invite-dropdown')
                                                                            .html(
                                                                                    '');

                                                                    $
                                                                            .each(
                                                                                    response,
                                                                                    function (
                                                                                            i,
                                                                                            a) {
                                                                                        html += '<li><img src="'
                                                                                                + a.detail.avatar_file
                                                                                                + '"/><a>'
                                                                                                + a.name
                                                                                                + '</a></li>'
                                                                                    });

                                                                    $(
                                                                            '.icb-invite-dropdown')
                                                                            .append(
                                                                                    html);

                                                                    _display();

                                                                    $(
                                                                            '.icb-invite-dropdown li')
                                                                            .click(
                                                                                    function () {
                                                                                        _this
                                                                                                .val(
                                                                                                        _this
                                                                                                                .val()
                                                                                                                .substring(
                                                                                                                        0,
                                                                                                                        ti)
                                                                                                                + '@'
                                                                                                                + $(
                                                                                                                        this)
                                                                                                                        .find(
                                                                                                                                'a')
                                                                                                                        .html()
                                                                                                                + " ")
                                                                                                .focus();
                                                                                        $(
                                                                                                '.icb-invite-dropdown')
                                                                                                .detach();
                                                                                    });
                                                                } else {
                                                                    $(
                                                                            '.icb-invite-dropdown')
                                                                            .hide();
                                                                }
                                                            }
                                                            if (_this.val().length == 0) {
                                                                $(
                                                                        '.icb-invite-dropdown')
                                                                        .hide();
                                                            }
                                                        }, 'json');
                                    }
                                }
                            }
                        });

        $(selector).keydown(function (e) {
            var key = e.which;
            if ($('.icb-invite-dropdown').is(':visible')) {
                if (key == 38 || key == 40 || key == 13) {
                    return false;
                }
            }
        });

        // 初始化插入定位符
        function _init() {
            if (!$('.content_cursor')[0]) {
                $('#icb-modal-window').append(
                        '<span class="content_cursor"></span>');
            }
            $('#icb-modal-window').find('.content_cursor')
                    .css(
                            {
                                'left' : parseInt($(selector).offset().left
                                        + parseInt($(selector).css(
                                                'padding-left')) + 2),
                                'top' : parseInt($(selector).offset().top
                                        + parseInt($(selector).css(
                                                'padding-left')))
                            });
            if (!$('.icb-invite-dropdown')[0]) {
                $('#icb-modal-window').append(
                        '<ul class="icb-invite-dropdown"></ul>');
            }
        }
        ;

        // 初始化列表和三角型
        function _display() {
            $('.icb-invite-dropdown').css(
                    {
                        'left' : $('.content_cursor').offset().left
                                + $('.content_cursor').innerWidth(),
                        'top' : $('.content_cursor').offset().top + 24
                    }).show();
        }
        ;

        // 获取当前textarea光标位置
        function _getCursorPosition(textarea) {
            var rangeData = {
                text : "",
                start : 0,
                end : 0
            };

            textarea.focus();

            if (textarea.setSelectionRange) { // W3C
                rangeData.start = textarea.selectionStart;
                rangeData.end = textarea.selectionEnd;
                rangeData.text = (rangeData.start != rangeData.end) ? textarea.value
                        .substring(rangeData.start, rangeData.end)
                        : "";
            } else if (document.selection) { // IE
                var i, oS = document.selection.createRange(),
                // Don't: oR = textarea.createTextRange()
                oR = document.body.createTextRange();
                oR.moveToElementText(textarea);

                rangeData.text = oS.text;
                rangeData.bookmark = oS.getBookmark();

                // object.moveStart(sUnit [, iCount])
                // Return Value: Integer that returns the number of units moved.
                for (i = 0; oR.compareEndPoints('StartToStart', oS) < 0
                        && oS.moveStart("character", -1) !== 0; i++) {
                    // Why? You can alert(textarea.value.length)
                    if (textarea.value.charAt(i) == '\n') {
                        i++;
                    }
                }
                rangeData.start = i;
                rangeData.end = rangeData.text.length + rangeData.start;
            }

            return rangeData;
        }
        ;
    },

    // 错误提示效果
    shake : function (selector) {
        var length = 6;
        selector.css('position', 'relative');
        for (var i = 1; i <= length; i++) {
            if (i % 2 == 0) {
                if (i == length) {
                    selector.animate({
                        'left' : 0
                    }, 50);
                } else {
                    selector.animate({
                        'left' : 10
                    }, 50);
                }
            } else {
                selector.animate({
                    'left' : -10
                }, 50);
            }
        }
    }
}

// 全局变量
AWS_BACK.G = {
    cashUserData : [],
    cashTopicData : [],
    card_box_hide_timer : '',
    card_box_show_timer : '',
    dropdownAjaxRequester : '',
    loading_timer : '',
    loading_bg_count : 12,
    loading_mini_bg_count : 9,
    notification_timer : ''
}

AWS_BACK.User = {
    // 关注
    follow : function (selector, type, data_id) {
        if (selector.html()) {
            if (selector.hasClass('active')) {
                selector.find('span').html(_t('关注'));

                selector.find('b')
                        .html(parseInt(selector.find('b').html()) - 1);
            } else {
                selector.find('span').html(_t('取消关注'));

                selector.find('b')
                        .html(parseInt(selector.find('b').html()) + 1);
            }
        } else {
            if (selector.hasClass('active')) {
                selector.attr('data-original-title', _t('关注'));
            } else {
                selector.attr('data-original-title', _t('取消关注'));
            }
        }

        selector.addClass('disabled');

        switch (type) {
        case 'question':
            var url = '/question/ajax/focus/';

            var data = {
                'question_id' : data_id
            };

            break;

        case 'topic':
            var url = '/topic/ajax/focus_topic/';

            var data = {
                'topic_id' : data_id
            };

            break;

        case 'user':
            var url = '/follow/ajax/follow_user/';

            var data = {
                'uid' : data_id
            };

            break;
        }

        $.post(G_BASE_URL + url, data, function (response) {
            if (response.errno == 1) {
                if (response.rsm.type == 'add') {
                    selector.addClass('active');
                } else {
                    selector.removeClass('active');
                }
            } else {
                if (response.err) {
                    AWS_BACK.alert(response.err);
                }

                if (response.rsm.url) {
                    window.location = decodeURIComponent(response.rsm.url);
                }
            }

            selector.removeClass('disabled');

        }, 'json');
    },

    share_out : function (options) {
        var url = options.url || window.location.href, pic = '';

        if (options.title) {
            var title = options.title + ' - ' + G_SITE_NAME;
        } else {
            var title = $('title').text();
        }

        shareURL = 'http://www.jiathis.com/send/?webid=' + options.webid
                + '&url=' + url + '&title=' + title + '';

        if (options.content) {
            if ($(options.content).find('img').length) {
                shareURL = shareURL + '&pic='
                        + $(options.content).find('img').eq(0).attr('src');
            }
        }

        window.open(shareURL);
    },

    // 删除草稿
    delete_draft : function (item_id, type) {
        if (type == 'clean') {
            $.post(G_BASE_URL + '/account/ajax/delete_draft/', 'type=' + type,
                    function (response) {
                        if (response.errno != 1) {
                            AWS_BACK.alert(response.err);
                        }
                    }, 'json');
        } else {
            $.post(G_BASE_URL + '/account/ajax/delete_draft/', 'item_id='
                    + item_id + '&type=' + type, function (response) {
                if (response.errno != 1) {
                    AWS_BACK.alert(response.err);
                }
            }, 'json');
        }
    },

    // 赞成投票
    agree_vote : function (selector, user_name, answer_id) {
        $.post(G_BASE_URL + '/question/ajax/answer_vote/', 'answer_id='
                + answer_id + '&value=1');

        // 判断是否投票过
        if ($(selector).parents('.icb-item').find('.icb-agree-by').text()
                .match(user_name)) {
            $.each($(selector).parents('.icb-item').find('.icb-user-name'),
                    function (i, e) {
                        if ($(e).html() == user_name) {
                            if ($(e).prev()) {
                                $(e).prev().remove();
                            } else {
                                $(e).next().remove();
                            }

                            $(e).remove();
                        }
                    });

            $(selector).removeClass('active');

            if (parseInt($(selector).parents('.operate').find('.count').html()) != 0) {
                $(selector).parents('.operate').find('.count').html(
                        parseInt($(selector).parents('.operate').find('.count')
                                .html()) - 1);
            }

            if ($(selector).parents('.icb-item').find('.icb-agree-by a').length == 0) {
                $(selector).parents('.icb-item').find('.icb-agree-by').hide();
            }
        } else {
            // 判断是否第一个投票
            if ($(selector).parents('.icb-item').find(
                    '.icb-agree-by .icb-user-name').length == 0) {
                $(selector).parents('.icb-item').find('.icb-agree-by').append(
                        '<a class="icb-user-name">' + user_name + '</a>');
            } else {
                $(selector).parents('.icb-item').find('.icb-agree-by').append(
                        '<em>、</em><a class="icb-user-name">' + user_name
                                + '</a>');
            }

            $(selector).parents('.operate').find('.count').html(
                    parseInt($(selector).parents('.operate').find('.count')
                            .html()) + 1);

            $(selector).parents('.icb-item').find('.icb-agree-by').show();

            $(selector).parents('.operate').find('a.active').removeClass(
                    'active');

            $(selector).addClass('active');
        }
    },

    // 反对投票
    disagree_vote : function (selector, user_name, answer_id) {
        $.post(G_BASE_URL + '/question/ajax/answer_vote/', 'answer_id='
                + answer_id + '&value=-1', function (response) {
        });

        if ($(selector).hasClass('active')) {
            $(selector).removeClass('active');
        } else {
            // 判断是否有赞同过
            if ($(selector).parents('.operate').find('.agree').hasClass(
                    'active')) {
                // 删除赞同操作
                $.each($(selector).parents('.icb-item').find('.icb-user-name'),
                        function (i, e) {
                            if ($(e).html() == user_name) {
                                if ($(e).prev()) {
                                    $(e).prev().remove();
                                } else {
                                    $(e).next().remove();
                                }

                                $(e).remove();
                            }
                        });

                // 判断赞同来自内是否有人
                if ($(selector).parents('.icb-item').find('.icb-agree-by a').length == 0) {
                    $(selector).parents('.icb-item').find('.icb-agree-by')
                            .hide();
                }

                $(selector).parents('.operate').find('.count').html(
                        parseInt($(selector).parents('.operate').find('.count')
                                .html()) - 1);

                $(selector).parents('.operate').find('.agree').removeClass(
                        'active');

                $(selector).addClass('active');
            } else {
                $(selector).addClass('active');
            }
        }
    },

    // 问题不感兴趣
    question_uninterested : function (selector, question_id) {
        selector.fadeOut();

        $.post(G_BASE_URL + '/question/ajax/uninterested/', 'question_id='
                + question_id, function (response) {
            if (response.errno != '1') {
                AWS_BACK.alert(response.err);
            }
        }, 'json');
    },

    // 回复折叠
    answer_force_fold : function (selector, answer_id) {
        $.post(G_BASE_URL + '/question/ajax/answer_force_fold/', 'answer_id='
                + answer_id,
                function (response) {
                    if (response.errno != 1) {
                        AWS_BACK.alert(response.err);
                    } else if (response.errno == 1) {
                        if (response.rsm.action == 'fold') {
                            selector.html(selector.html().replace(_t('折叠'),
                                    _t('撤消折叠')));
                        } else {
                            selector.html(selector.html().replace(_t('撤消折叠'),
                                    _t('折叠')));
                        }
                    }
                }, 'json');
    },

    // 删除别人邀请我回复的问题
    question_invite_delete : function (selector, question_invite_id) {
        $.post(G_BASE_URL + '/question/ajax/question_invite_delete/',
                'question_invite_id=' + question_invite_id,
                function (response) {
                    if (response.errno == 1) {
                        selector.fadeOut();
                    } else {
                        AWS_BACK.alert(response.rsm.err);
                    }
                }, 'json');
    },

    // 邀请用户回答问题
    invite_user : function (selector, img) {
        $
                .post(
                        G_BASE_URL + '/question/ajax/save_invite/',
                        {
                            'question_id' : QUESTION_ID,
                            'uid' : selector.attr('data-id')
                        },
                        function (response) {
                            if (response.errno != -1) {
                                if (selector.parents('.icb-invite-box').find(
                                        '.invite-list a').length == 0) {
                                    selector.parents('.icb-invite-box').find(
                                            '.invite-list').show();
                                }
                                selector
                                        .parents('.icb-invite-box')
                                        .find('.invite-list')
                                        .append(
                                                ' <a class="text-color-999 invite-list-user" data-toggle="tooltip" data-placement="bottom" data-original-title="'
                                                        + selector
                                                                .attr('data-value')
                                                        + '"><img src='
                                                        + img
                                                        + ' /></a>');
                                selector
                                        .addClass('active')
                                        .attr('onclick',
                                                'AWS_BACK.User.disinvite_user($(this))')
                                        .text('取消邀请');
                                selector.parents('.icb-question-detail').find(
                                        '.icb-invite-replay .badge').text(
                                        parseInt(selector.parents(
                                                '.icb-question-detail').find(
                                                '.icb-invite-replay .badge')
                                                .text()) + 1);
                            } else if (response.errno == -1) {
                                AWS_BACK.alert(response.err);
                            }
                        }, 'json');
    },

    // 取消邀请用户回答问题
    disinvite_user : function (selector) {
        $
                .get(
                        G_BASE_URL
                                + '/question/ajax/cancel_question_invite/question_id-'
                                + QUESTION_ID + "__recipients_uid-"
                                + selector.attr('data-id'),
                        function (response) {
                            if (response.errno != -1) {
                                $
                                        .each(
                                                $('.icb-question-detail .invite-list a'),
                                                function (i, e) {
                                                    if ($(this)
                                                            .attr(
                                                                    'data-original-title') == selector
                                                            .parents('.main')
                                                            .find(
                                                                    '.icb-user-name')
                                                            .text()) {
                                                        $(this).detach();
                                                    }
                                                });
                                selector
                                        .removeClass('active')
                                        .attr(
                                                'onclick',
                                                'AWS_BACK.User.invite_user($(this),$(this).parents(\'li\').find(\'img\').attr(\'src\'))')
                                        .text('邀请');
                                selector.parents('.icb-question-detail').find(
                                        '.icb-invite-replay .badge').text(
                                        parseInt(selector.parents(
                                                '.icb-question-detail').find(
                                                '.icb-invite-replay .badge')
                                                .text()) - 1);
                                if (selector.parents('.icb-invite-box').find(
                                        '.invite-list').children().length == 0) {
                                    selector.parents('.icb-invite-box').find(
                                            '.invite-list').hide();
                                }
                            }
                        });
    },

    // 问题感谢
    question_thanks : function (selector, question_id) {
        $.post(G_BASE_URL + '/question/ajax/question_thanks/', 'question_id='
                + question_id, function (response) {
            if (response.errno != 1) {
                AWS_BACK.alert(response.err);
            } else if (response.rsm.action == 'add') {
                selector.html(selector.html().replace(_t('感谢'), _t('已感谢')));
                selector.removeAttr('onclick');
            } else {
                selector.html(selector.html().replace(_t('已感谢'), _t('感谢')));
            }
        }, 'json');
    },

    // 感谢评论回复者
    answer_user_rate : function (selector, type, answer_id) {
        $.post(G_BASE_URL + '/question/ajax/question_answer_rate/', 'type='
                + type + '&answer_id=' + answer_id, function (response) {
            if (response.errno != 1) {
                AWS_BACK.alert(response.err);
            } else if (response.errno == 1) {
                switch (type) {
                case 'thanks':
                    if (response.rsm.action == 'add') {
                        selector.html(selector.html().replace(_t('感谢'),
                                _t('已感谢')));
                        selector.removeAttr('onclick');
                    } else {
                        selector.html(selector.html().replace(_t('已感谢'),
                                _t('感谢')));
                    }
                    break;

                case 'uninterested':
                    if (response.rsm.action == 'add') {
                        selector.html(selector.html().replace(_t('没有帮助'),
                                _t('撤消没有帮助')));
                    } else {
                        selector.html(selector.html().replace(_t('撤消没有帮助'),
                                _t('没有帮助')));
                    }
                    break;
                }
            }
        }, 'json');
    },

    // 提交评论
    save_comment : function (selector) {
        selector.addClass('disabled');

        AWS_BACK.ajax_post(selector.parents('form'), AWS_BACK.ajax_processer,
                'comments_form');
    },

    // 删除评论
    remove_comment : function (selector, type, comment_id) {
        $.get(G_BASE_URL + '/question/ajax/remove_comment/type-' + type
                + '__comment_id-' + comment_id);

        selector.parents('.icb-comment-box li').fadeOut();
    },

    // 文章赞同
    article_vote : function (selector, article_id, rating) {
        AWS_BACK.loading('show');

        if (selector.hasClass('active')) {
            var rating = 0;
        }

        $
                .post(
                        G_BASE_URL + '/article/ajax/article_vote/',
                        'type=article&item_id=' + article_id + '&rating='
                                + rating,
                        function (response) {

                            AWS_BACK.loading('hide');

                            if (response.errno != 1) {
                                AWS_BACK.alert(response.err);
                            } else {
                                if (rating == 0) {
                                    selector.removeClass('active').find('b')
                                            .html(
                                                    parseInt(selector.find('b')
                                                            .html()) - 1);
                                } else if (rating == -1) {
                                    if (selector.parents('.icb-article-vote')
                                            .find('.agree').hasClass('active')) {
                                        selector
                                                .parents('.icb-article-vote')
                                                .find('b')
                                                .html(
                                                        parseInt(selector
                                                                .parents(
                                                                        '.icb-article-vote')
                                                                .find('b')
                                                                .html()) - 1);
                                        selector.parents('.icb-article-vote')
                                                .find('a')
                                                .removeClass('active');
                                    }

                                    selector.addClass('active');
                                } else {
                                    selector.parents('.icb-article-vote').find(
                                            'a').removeClass('active');
                                    selector.addClass('active').find('b')
                                            .html(
                                                    parseInt(selector.find('b')
                                                            .html()) + 1);
                                }
                            }
                        }, 'json');
    },

    // 文章评论赞同
    article_comment_vote : function (selector, comment_id, rating) {
        AWS_BACK.loading('show');

        if (selector.hasClass('active')) {
            var rating = 0;
        }

        $.post(G_BASE_URL + '/article/ajax/article_vote/',
                'type=comment&item_id=' + comment_id + '&rating=' + rating,
                function (response) {
                    AWS_BACK.loading('hide');

                    if (response.errno != 1) {
                        AWS_BACK.alert(response.err);
                    } else {
                        var agree_num = parseInt(selector.html().replace(
                                /[^0-9]/ig, ""));

                        if (rating == 0) {

                            var selectorhtml = selector.html().replace(
                                    _t('我已赞'), _t('赞'));

                            selector.html(
                                    selectorhtml.replace(agree_num,
                                            (agree_num - 1))).removeClass(
                                    'active');

                        } else {
                            var selectorhtml = selector.html().replace(_t('赞'),
                                    _t('我已赞'));

                            selector.html(
                                    selectorhtml.replace(agree_num,
                                            (agree_num + 1)))
                                    .addClass('active');

                        }
                    }
                }, 'json');
    },

    // 创建收藏标签
    add_favorite_tag : function () {
        $
                .post(
                        G_BASE_URL + '/favorite/ajax/update_favorite_tag/',
                        {
                            'item_id' : $(
                                    '#favorite_form input[name="item_id"]')
                                    .val(),
                            'item_type' : $(
                                    '#favorite_form input[name="item_type"]')
                                    .val(),
                            'tags' : $('#favorite_form .add-input').val()
                        },
                        function (response) {
                            if (response.errno == 1) {
                                $('.icb-favorite-box .icb-favorite-tag-list')
                                        .show();
                                $('.icb-favorite-box .icb-favorite-tag-add')
                                        .hide();

                                $('.icb-favorite-tag-list ul')
                                        .prepend(
                                                '<li class="active"><a data-value="'
                                                        + $(
                                                                '#favorite_form .add-input')
                                                                .val()
                                                        + '"><span class="title">'
                                                        + $(
                                                                '#favorite_form .add-input')
                                                                .val()
                                                        + '</span></a><i class="icon icon-followed"></i></li>');
                            }
                        }, 'json');
    }
}

AWS_BACK.Dropdown = {
    // 下拉菜单功能绑定
    bind_dropdown_list : function (selector, type) {
        if (type == 'search') {
            $(selector).focus(function () {
                $(selector).parent().find('.icb-dropdown').show();
            });
        }
        $(selector)
                .bind(
                        'input propertychange',
                        function (e) {
                            if (type == 'search') {
                                $(selector).parent().find('.search').show()
                                        .children('a').text($(selector).val());
                            }
                            if ($(selector).val().length >= 1) {
                                if (e.which != 38 && e.which != 40
                                        && e.which != 188 && e.which != 13) {
                                    AWS_BACK.Dropdown.get_dropdown_list(
                                            $(this), type, $(selector).val());
                                }
                            } else {
                                $(selector).parent().find('.icb-dropdown')
                                        .hide();
                            }

                            if (type == 'topic') {
                                // 逗号或回车提交
                                if (e.which == 188) {
                                    if ($(
                                            '.icb-search-tag-box #icb-tag-category-keyword')
                                            .val() != ',') {
                                        $(
                                                '.icb-search-tag-box #icb-tag-category-keyword')
                                                .val(
                                                        $(
                                                                '.icb-search-tag-box #icb-tag-category-keyword')
                                                                .val()
                                                                .substring(
                                                                        0,
                                                                        $(
                                                                                '.icb-search-tag-box #icb-tag-category-keyword')
                                                                                .val().length - 1));
                                        $('.icb-search-tag-box .icb-dropdown')
                                                .hide();
                                        $('.icb-search-tag-box .add').click();
                                    }
                                    return false;
                                }

                                // 回车提交
                                if (e.which == 13) {
                                    $('.icb-search-tag-box .icb-dropdown')
                                            .hide();
                                    $('.icb-search-tag-box .add').click();
                                    return false;
                                }

                                var lis = $(selector).parent().find(
                                        '.icb-dropdown-list li');

                                // 键盘往下
                                if (e.which == 40 && lis.is(':visible')) {
                                    var _index;
                                    if (!lis.hasClass('active')) {
                                        lis.eq(0).addClass('active');
                                    } else {
                                        $
                                                .each(
                                                        lis,
                                                        function (i, e) {
                                                            if ($(this)
                                                                    .hasClass(
                                                                            'active')) {
                                                                $(this)
                                                                        .removeClass(
                                                                                'active');
                                                                if ($(this)
                                                                        .index() == lis.length - 1) {
                                                                    _index = 0;
                                                                } else {
                                                                    _index = $(
                                                                            this)
                                                                            .index() + 1;
                                                                }
                                                            }
                                                        });
                                        lis.eq(_index).addClass('active');
                                        $(selector).val(lis.eq(_index).text());
                                    }
                                }

                                // 键盘往上
                                if (e.which == 38 && lis.is(':visible')) {
                                    var _index;
                                    if (!lis.hasClass('active')) {
                                        lis.eq(lis.length - 1).addClass(
                                                'active');
                                    } else {
                                        $
                                                .each(
                                                        lis,
                                                        function (i, e) {
                                                            if ($(this)
                                                                    .hasClass(
                                                                            'active')) {
                                                                $(this)
                                                                        .removeClass(
                                                                                'active');
                                                                if ($(this)
                                                                        .index() == 0) {
                                                                    _index = lis.length - 1;
                                                                } else {
                                                                    _index = $(
                                                                            this)
                                                                            .index() - 1;
                                                                }
                                                            }
                                                        });
                                        lis.eq(_index).addClass('active');
                                        $(selector).val(lis.eq(_index).text());
                                    }

                                }
                            }
                        });

        $(selector).blur(function () {
            $(selector).parent().find('.icb-dropdown').delay(500).fadeOut(300);
        });
    },

    // 插入下拉菜单
    set_dropdown_list : function (selector, data, selected) {
        $(selector).append(Hogan.compile(AW_TEMPLATE.dropdownList).render({
            'items' : data
        }));

        $(selector + ' .icb-dropdown-list li a').click(function () {
            $('#icb-selected-tag-show').html($(this).text());
        });

        if (selected) {
            $(selector + " .dropdown-menu li a[data-value='" + selected + "']")
                    .click();
        }
    },

    /* 下拉菜单数据获取 */
    /*
     * type : search, publish, redirect, invite, inbox, topic_question, topic
     */
    get_dropdown_list : function (selector, type, data) {
        if (AWS_BACK.G.dropdownAjaxRequester != '') {
            AWS_BACK.G.dropdownAjaxRequester.abort(); // 中止上一次ajax请求
        }
        var url;
        switch (type) {
        case 'search':
            url = G_BASE_URL + '/search/ajax/search/?q='
                    + encodeURIComponent(data) + '&limit=5';
            break;

        case 'publish':
            url = G_BASE_URL + '/search/ajax/search/?type=questions&q='
                    + encodeURIComponent(data) + '&limit=5';
            break;

        case 'redirect':
            url = G_BASE_URL + '/search/ajax/search/?q='
                    + encodeURIComponent(data)
                    + '&type=questions&limit=30&is_question_id=1';
            break;

        case 'invite':
        case 'inbox':
            url = G_BASE_URL + '/search/ajax/search/?type=users&q='
                    + encodeURIComponent(data) + '&limit=10';
            break;

        case 'topic_question':
            url = G_BASE_URL
                    + '/search/ajax/search/?type=questions,articles&q='
                    + encodeURIComponent(data) + '&topic_ids='
                    + CONTENTS_RELATED_TOPIC_IDS + '&limit=50';
            break;

        case 'topic':
            url = G_BASE_URL + '/search/ajax/search/?type=topics&q='
                    + encodeURIComponent(data) + '&limit=10';
            break;

        case 'questions':
            url = G_BASE_URL + '/search/ajax/search/?type=questions&q='
                    + encodeURIComponent(data) + '&limit=10';
            break;

        case 'articles':
            url = G_BASE_URL + '/search/ajax/search/?type=articles&q='
                    + encodeURIComponent(data) + '&limit=10';
            break;

        }

        AWS_BACK.G.dropdownAjaxRequester = $
                .get(
                        url,
                        function (response) {
                            if (response.length != 0
                                    && AWS_BACK.G.dropdownAjaxRequester != undefined) {
                                $(selector).parent().find('.icb-dropdown-list')
                                        .html(''); // 清空内容
                                switch (type) {
                                case 'search':
                                    $
                                            .each(
                                                    response,
                                                    function (i, a) {
                                                        switch (a.type) {
                                                        case 'questions':
                                                            if (a.detail.best_answer > 0) {
                                                                var active = 'active';
                                                            } else {
                                                                var active = ''
                                                            }

                                                            $(selector)
                                                                    .parent()
                                                                    .find(
                                                                            '.icb-dropdown-list')
                                                                    .append(
                                                                            Hogan
                                                                                    .compile(
                                                                                            AW_TEMPLATE.searchDropdownListQuestions)
                                                                                    .render(
                                                                                            {
                                                                                                'url' : a.url,
                                                                                                'active' : active,
                                                                                                'content' : a.name,
                                                                                                'discuss_count' : a.detail.answer_count
                                                                                            }));
                                                            break;

                                                        case 'articles':
                                                            $(selector)
                                                                    .parent()
                                                                    .find(
                                                                            '.icb-dropdown-list')
                                                                    .append(
                                                                            Hogan
                                                                                    .compile(
                                                                                            AW_TEMPLATE.searchDropdownListArticles)
                                                                                    .render(
                                                                                            {
                                                                                                'url' : a.url,
                                                                                                'content' : a.name,
                                                                                                'comments' : a.detail.comments
                                                                                            }));
                                                            break;

                                                        case 'topics':
                                                            $(selector)
                                                                    .parent()
                                                                    .find(
                                                                            '.icb-dropdown-list')
                                                                    .append(
                                                                            Hogan
                                                                                    .compile(
                                                                                            AW_TEMPLATE.searchDropdownListTopics)
                                                                                    .render(
                                                                                            {
                                                                                                'url' : a.url,
                                                                                                'name' : a.name,
                                                                                                'discuss_count' : a.detail.discuss_count,
                                                                                                'topic_id' : a.detail.topic_id
                                                                                            }));
                                                            break;

                                                        case 'users':
                                                            if (a.detail.signature == '') {
                                                                var signature = _t('暂无介绍');
                                                            } else {
                                                                var signature = a.detail.signature;
                                                            }

                                                            $(selector)
                                                                    .parent()
                                                                    .find(
                                                                            '.icb-dropdown-list')
                                                                    .append(
                                                                            Hogan
                                                                                    .compile(
                                                                                            AW_TEMPLATE.searchDropdownListUsers)
                                                                                    .render(
                                                                                            {
                                                                                                'url' : a.url,
                                                                                                'img' : a.detail.avatar_file,
                                                                                                'name' : a.name,
                                                                                                'intro' : signature
                                                                                            }));
                                                            break;
                                                        }
                                                    });
                                    break;

                                case 'publish':
                                case 'topic_question':
                                    $
                                            .each(
                                                    response,
                                                    function (i, a) {
                                                        $(selector)
                                                                .parent()
                                                                .find(
                                                                        '.icb-dropdown-list')
                                                                .append(
                                                                        Hogan
                                                                                .compile(
                                                                                        AW_TEMPLATE.questionDropdownList)
                                                                                .render(
                                                                                        {
                                                                                            'url' : a.url,
                                                                                            'name' : a.name
                                                                                        }));
                                                    });
                                    break;

                                case 'topic':
                                    $
                                            .each(
                                                    response,
                                                    function (i, a) {
                                                        $(selector)
                                                                .parent()
                                                                .find(
                                                                        '.icb-dropdown-list')
                                                                .append(
                                                                        Hogan
                                                                                .compile(
                                                                                        AW_TEMPLATE.editTopicDorpdownList)
                                                                                .render(
                                                                                        {
                                                                                            'name' : a['name']
                                                                                        }));
                                                    });
                                    break;

                                case 'redirect':
                                    $
                                            .each(
                                                    response,
                                                    function (i, a) {
                                                        $(selector)
                                                                .parent()
                                                                .find(
                                                                        '.icb-dropdown-list')
                                                                .append(
                                                                        Hogan
                                                                                .compile(
                                                                                        AW_TEMPLATE.questionRedirectList)
                                                                                .render(
                                                                                        {
                                                                                            'url' : "'"
                                                                                                    + G_BASE_URL
                                                                                                    + "/question/ajax/redirect/', 'item_id="
                                                                                                    + $(
                                                                                                            selector)
                                                                                                            .attr(
                                                                                                                    'data-id')
                                                                                                    + "&target_id="
                                                                                                    + a['search_id']
                                                                                                    + "'",
                                                                                            'name' : a['name']
                                                                                        }));
                                                    });
                                    break;

                                case 'questions':
                                case 'articles':
                                    $
                                            .each(
                                                    response,
                                                    function (i, a) {
                                                        $(selector)
                                                                .parent()
                                                                .find(
                                                                        '.icb-dropdown-list')
                                                                .append(
                                                                        Hogan
                                                                                .compile(
                                                                                        AW_TEMPLATE.questionDropdownList)
                                                                                .render(
                                                                                        {
                                                                                            'url' : '#',
                                                                                            'name' : a['name']
                                                                                        }));
                                                    });
                                    break;

                                $(selector)
                                        .parent()
                                        .find('.icb-dropdown-list li')
                                        .click(
                                                function () {
                                                    $('.icb-question-list')
                                                            .append(
                                                                    '<li data-id="'
                                                                            + $(
                                                                                    this)
                                                                                    .attr(
                                                                                            'data-id')
                                                                            + '"><div class="col-sm-9">'
                                                                            + $(
                                                                                    this)
                                                                                    .html()
                                                                            + '</div> <div class="col-sm-3"><a class="btn btn-danger btn-xs">删除</a></div></li>');

                                                    $('.icb-question-list li')
                                                            .find("a")
                                                            .attr(
                                                                    'href',
                                                                    function () {
                                                                        return $(
                                                                                this)
                                                                                .attr(
                                                                                        "_href")

                                                                    });

                                                    if ($('.question_ids')
                                                            .val() == '') {
                                                        $('.question_ids')
                                                                .val(
                                                                        $(this)
                                                                                .attr(
                                                                                        'data-id')
                                                                                + ',');
                                                    } else {
                                                        $('.question_ids')
                                                                .val(
                                                                        $(
                                                                                '.question_ids')
                                                                                .val()
                                                                                + $(
                                                                                        this)
                                                                                        .attr(
                                                                                                'data-id')
                                                                                + ',');
                                                    }
                                                    $(".icb-alert-box").modal(
                                                            'hide');
                                                });

                                break;

                            case 'inbox':
                            case 'invite':
                                $
                                        .each(
                                                response,
                                                function (i, a) {
                                                    $(selector)
                                                            .parent()
                                                            .find(
                                                                    '.icb-dropdown-list')
                                                            .append(
                                                                    Hogan
                                                                            .compile(
                                                                                    AW_TEMPLATE.inviteDropdownList)
                                                                            .render(
                                                                                    {
                                                                                        'uid' : a.uid,
                                                                                        'name' : a.name,
                                                                                        'img' : a.detail.avatar_file
                                                                                    }));
                                                });
                                break;

                            }
                            if (type == 'publish') {
                                $(selector)
                                        .parent()
                                        .find(
                                                '.icb-publish-suggest-question, .icb-publish-suggest-question .icb-dropdown-list')
                                        .show();
                            } else {
                                $(selector).parent().find(
                                        '.icb-dropdown, .icb-dropdown-list')
                                        .show().children().show();
                                $(selector).parent().find('.title').hide();
                                // 关键词高亮
                                $(selector).parent().find(
                                        '.icb-dropdown-list li.question a')
                                        .highText(data, 'b', 'active');
                            }
                        } else {
                            $(selector).parent().find('.icb-dropdown').show()
                                    .end().find('.title').html(_t('没有找到相关结果'))
                                    .show();
                            $(selector)
                                    .parent()
                                    .find(
                                            '.icb-dropdown-list, .icb-publish-suggest-question')
                                    .hide();
                        }
                    }, 'json');

    }
}

AWS_BACK.Message = {
    // 检测通知
    check_notifications : function () {
        // 检测登录状态
        if (G_USER_ID == 0) {
            clearInterval(AWS_BACK.G.notification_timer);
            return false;
        }

        $
                .get(
                        G_BASE_URL + '/home/ajax/notifications/',
                        function (response) {
                            $('#inbox_unread').html(
                                    Number(response.rsm.inbox_num));

                            var last_unread_notification = G_UNREAD_NOTIFICATION;

                            G_UNREAD_NOTIFICATION = Number(response.rsm.notifications_num);

                            if (G_UNREAD_NOTIFICATION > 0) {
                                if (G_UNREAD_NOTIFICATION != last_unread_notification) {
                                    // 加载消息列表
                                    AWS_BACK.Message.load_notification_list();

                                    // 给导航label添加未读消息数量
                                    $('#notifications_unread').html(
                                            G_UNREAD_NOTIFICATION);
                                }

                                document.title = '('
                                        + (Number(response.rsm.notifications_num) + Number(response.rsm.inbox_num))
                                        + ') ' + document_title;

                                $('#notifications_unread').show();
                            } else {
                                if ($('#header_notification_list').length) {
                                    $("#header_notification_list").html(
                                            '<p class="icb-padding10" align="center">'
                                                    + _t('没有未读通知') + '</p>');
                                }

                                if ($("#index_notification").length) {
                                    $("#index_notification").fadeOut();
                                }

                                document.title = document_title;

                                $('#notifications_unread').hide();
                            }

                            // 私信
                            if (Number(response.rsm.inbox_num) > 0) {
                                $('#inbox_unread').show();
                            } else {
                                $('#inbox_unread').hide();
                            }

                        }, 'json');
    },

    // 阅读通知
    read_notification : function (selector, notification_id, reload) {
        if (notification_id) {
            selector.remove();

            var url = G_BASE_URL
                    + '/notifications/ajax/read_notification/notification_id-'
                    + notification_id;
        } else {
            if ($("#index_notification").length) {
                $("#index_notification").fadeOut();
            }

            var url = G_BASE_URL + '/notifications/ajax/read_notification/';
        }

        $.get(url, function (response) {
            AWS_BACK.Message.check_notifications();

            if (reload) {
                window.location.reload();
            }
        });
    },

    // 重新加载通知列表
    load_notification_list : function () {
        if ($("#index_notification").length) {
            // 给首页通知box内label添加未读消息数量
            $("#index_notification").fadeIn().find(
                    '[name=notification_unread_num]').html(
                    G_UNREAD_NOTIFICATION);

            $('#index_notification ul#notification_list').html(
                    '<p align="center" style="padding: 15px 0"><img src="'
                            + G_STATIC_URL + '/common/loading_b.gif"/></p>');

            $.get(G_BASE_URL + '/notifications/ajax/list/flag-0__page-0',
                    function (response) {
                        $('#index_notification ul#notification_list').html(
                                response);

                        AWS_BACK.Message.notification_show(5);
                    });
        }

        if ($("#header_notification_list").length) {
            $
                    .get(
                            G_BASE_URL
                                    + '/notifications/ajax/list/flag-0__limit-5__template-header_list',
                            function (response) {
                                if (response.length) {
                                    $("#header_notification_list").html(
                                            response);
                                } else {
                                    $("#header_notification_list").html(
                                            '<p class="icb-padding10" align="center">'
                                                    + _t('没有未读通知') + '</p>');
                                }
                            });
        }
    },

    // 控制通知数量
    notification_show : function (length) {
        if ($('#index_notification').length > 0) {
            if ($('#index_notification ul#notification_list li').length == 0) {
                $('#index_notification').fadeOut();
            } else {
                $('#index_notification ul#notification_list li').each(
                        function (i, e) {
                            if (i < length) {
                                $(e).show();
                            } else {
                                $(e).hide();
                            }
                        });
            }
        }
    }
}

AWS_BACK.Init = {
    // 初始化问题评论框
    init_comment_box : function (selector) {
        $(document)
                .on(
                        'click',
                        selector,
                        function () {
                            $(this)
                                    .parents('.icb-question-detail')
                                    .find(
                                            '.icb-invite-box, .icb-question-related-box')
                                    .hide();
                            if (typeof COMMENT_UNFOLD != 'undefined') {
                                if (COMMENT_UNFOLD == 'all'
                                        && $(this).attr('data-comment-count') == 0
                                        && $(this).attr('data-first-click') == 'hide') {
                                    $(this).removeAttr('data-first-click');
                                    return false;
                                }
                            }

                            if (!$(this).attr('data-type')
                                    || !$(this).attr('data-id')) {
                                return true;
                            }

                            var comment_box_id = '#icb-comment-box-'
                                    + $(this).attr('data-type') + '-'
                                    + $(this).attr('data-id');

                            if ($(comment_box_id).length) {
                                if ($(comment_box_id).css('display') == 'none') {
                                    $(this).addClass('active');

                                    $(comment_box_id).fadeIn();
                                } else {
                                    $(this).removeClass('active');
                                    $(comment_box_id).fadeOut();
                                }
                            } else {
                                // 动态插入commentBox
                                switch ($(this).attr('data-type')) {
                                case 'question':
                                    var comment_form_action = G_BASE_URL
                                            + '/question/ajax/save_question_comment/question_id-'
                                            + $(this).attr('data-id');
                                    var comment_data_url = G_BASE_URL
                                            + '/question/ajax/get_question_comments/question_id-'
                                            + $(this).attr('data-id');
                                    break;

                                case 'answer':
                                    var comment_form_action = G_BASE_URL
                                            + '/question/ajax/save_answer_comment/answer_id-'
                                            + $(this).attr('data-id');
                                    var comment_data_url = G_BASE_URL
                                            + '/question/ajax/get_answer_comments/answer_id-'
                                            + $(this).attr('data-id');
                                    break;
                                }

                                if (G_USER_ID) {
                                    $(this)
                                            .parents('.icb-item')
                                            .find('.mod-footer')
                                            .append(
                                                    Hogan
                                                            .compile(
                                                                    AW_TEMPLATE.commentBox)
                                                            .render(
                                                                    {
                                                                        'comment_form_id' : comment_box_id
                                                                                .replace(
                                                                                        '#',
                                                                                        ''),
                                                                        'comment_form_action' : comment_form_action
                                                                    }));

                                    $(comment_box_id)
                                            .find('.icb-comment-txt')
                                            .bind(
                                                    {
                                                        focus : function () {
                                                            $(comment_box_id)
                                                                    .find(
                                                                            '.icb-comment-box-btn')
                                                                    .show();
                                                        },

                                                        blur : function () {
                                                            if ($(this).val() == '') {
                                                                $(
                                                                        comment_box_id)
                                                                        .find(
                                                                                '.icb-comment-box-btn')
                                                                        .hide();
                                                            }
                                                        }
                                                    });

                                    $(comment_box_id)
                                            .find('.close-comment-box')
                                            .click(
                                                    function () {
                                                        $(comment_box_id)
                                                                .fadeOut();
                                                        $(comment_box_id)
                                                                .find(
                                                                        '.icb-comment-txt')
                                                                .css(
                                                                        'height',
                                                                        $(this)
                                                                                .css(
                                                                                        'line-height'));
                                                    });
                                } else {
                                    $(this)
                                            .parents('.icb-item')
                                            .find('.mod-footer')
                                            .append(
                                                    Hogan
                                                            .compile(
                                                                    AW_TEMPLATE.commentBoxClose)
                                                            .render(
                                                                    {
                                                                        'comment_form_id' : comment_box_id
                                                                                .replace(
                                                                                        '#',
                                                                                        ''),
                                                                        'comment_form_action' : comment_form_action
                                                                    }));
                                }

                                // 判断是否有评论数据
                                $
                                        .get(
                                                comment_data_url,
                                                function (response) {
                                                    if ($.trim(response) == '') {
                                                        response = '<div align="center" class="icb-padding10">'
                                                                + _t('暂无评论')
                                                                + '</div>';
                                                    }

                                                    $(comment_box_id)
                                                            .find(
                                                                    '.icb-comment-list')
                                                            .html(response);
                                                });

                                // textarae自动增高
                                $(comment_box_id).find('.icb-comment-txt')
                                        .autosize();

                                $(this).addClass('active');

                                AWS_BACK.at_user_lists(comment_box_id
                                        + ' .icb-comment-txt', 5);
                            }
                        });
    },

    // 初始化文章评论框
    init_article_comment_box : function (selector) {
        $(document)
                .on(
                        'click',
                        selector,
                        function () {
                            var _editor_box = $(this).parents('.icb-item')
                                    .find('.icb-article-replay-box');
                            if (_editor_box.length) {
                                if (_editor_box.css('display') == 'block') {
                                    _editor_box.fadeOut();
                                } else {
                                    _editor_box.fadeIn();
                                }
                            } else {
                                $(this)
                                        .parents('.mod-footer')
                                        .append(
                                                Hogan
                                                        .compile(
                                                                AW_TEMPLATE.articleCommentBox)
                                                        .render(
                                                                {
                                                                    'at_uid' : $(
                                                                            this)
                                                                            .attr(
                                                                                    'data-id'),
                                                                    'article_id' : $(
                                                                            '.icb-article-title-box')
                                                                            .attr(
                                                                                    'data-id')
                                                                }));
                            }
                        });
    },

    // 初始化话题编辑box
    init_topic_edit_box : function (selector) // selector -> .icb-edit-topic
    {
        $(selector)
                .click(
                        function () {
                            var _topic_editor = $(this).parents(
                                    '.icb-article-title-box'), data_id = _topic_editor
                                    .attr('data-id'), data_type = _topic_editor
                                    .attr('data-type');

                            if (!_topic_editor.hasClass('active')) {
                                _topic_editor.addClass('active');

                                if (!_topic_editor.find('.article-tag .close').length) {
                                    _topic_editor
                                            .find('.article-tag')
                                            .append(
                                                    '<a class="close"><i class="icon icon-delete"></i></a>');
                                }
                            } else {
                                _topic_editor.addClass('active');
                            }

                            // 判断插入编辑box
                            if (_topic_editor.find('.icb-search-tag-box').length == 0) {
                                _topic_editor.append(AW_TEMPLATE.editTopicBox);

                                // 给编辑box添加按钮添加事件
                                _topic_editor
                                        .find('.add')
                                        .click(
                                                function () {
                                                    if (_topic_editor
                                                            .find(
                                                                    '#icb-tag-category-keyword')
                                                            .val() != '') {
                                                        switch (data_type) {
                                                        case 'publish':
                                                            _topic_editor
                                                                    .find(
                                                                            '.tag-queue-box')
                                                                    .prepend(
                                                                            '<span class="article-tag"><a class="text">'
                                                                                    + _topic_editor
                                                                                            .find(
                                                                                                    '#icb-tag-category-keyword')
                                                                                            .val()
                                                                                    + '</a><a class="close" onclick="$(this).parents(\'.article-tag\').remove();"><i class="icon icon-delete"></i></a><input type="hidden" value="'
                                                                                    + _topic_editor
                                                                                            .find(
                                                                                                    '#icb-tag-category-keyword')
                                                                                            .val()
                                                                                    + '" name="topics[]" /></span>')
                                                                    .hide()
                                                                    .fadeIn();

                                                            _topic_editor
                                                                    .find(
                                                                            '#icb-tag-category-keyword')
                                                                    .val('');
                                                            break;

                                                        case 'question':
                                                            $
                                                                    .post(
                                                                            G_BASE_URL
                                                                                    + '/topic/ajax/set_article_topic_relation/',
                                                                            'type=question&item_id='
                                                                                    + data_id
                                                                                    + '&topic_title='
                                                                                    + encodeURIComponent(_topic_editor
                                                                                            .find(
                                                                                                    '#icb-tag-category-keyword')
                                                                                            .val()),
                                                                            function (
                                                                                    response) {
                                                                                if (response.errno != 1) {
                                                                                    AWS_BACK
                                                                                            .alert(response.err);

                                                                                    return false;
                                                                                }

                                                                                _topic_editor
                                                                                        .find(
                                                                                                '.tag-queue-box')
                                                                                        .prepend(
                                                                                                '<span class="article-tag" data-id="'
                                                                                                        + response.rsm.topic_id
                                                                                                        + '"><a href="'
                                                                                                        + G_BASE_URL
                                                                                                        + '/topic/'
                                                                                                        + response.rsm.topic_id
                                                                                                        + '" class="text">'
                                                                                                        + _topic_editor
                                                                                                                .find(
                                                                                                                        '#icb-tag-category-keyword')
                                                                                                                .val()
                                                                                                        + '</a><a class="close"><i class="icon icon-delete"></i></a></span>')
                                                                                        .hide()
                                                                                        .fadeIn();

                                                                                _topic_editor
                                                                                        .find(
                                                                                                '#icb-tag-category-keyword')
                                                                                        .val(
                                                                                                '');
                                                                            },
                                                                            'json');
                                                            break;

                                                        case 'article':
                                                            $
                                                                    .post(
                                                                            G_BASE_URL
                                                                                    + '/topic/ajax/set_article_topic_relation/',
                                                                            'type=article&item_id='
                                                                                    + data_id
                                                                                    + '&topic_title='
                                                                                    + encodeURIComponent(_topic_editor
                                                                                            .find(
                                                                                                    '#icb-tag-category-keyword')
                                                                                            .val()),
                                                                            function (
                                                                                    response) {
                                                                                if (response.errno != 1) {
                                                                                    AWS_BACK
                                                                                            .alert(response.err);

                                                                                    return false;
                                                                                }

                                                                                _topic_editor
                                                                                        .find(
                                                                                                '.tag-queue-box')
                                                                                        .prepend(
                                                                                                '<span class="article-tag" data-id="'
                                                                                                        + response.rsm.topic_id
                                                                                                        + '"><a href="'
                                                                                                        + G_BASE_URL
                                                                                                        + '/topic/'
                                                                                                        + response.rsm.topic_id
                                                                                                        + '" class="text">'
                                                                                                        + _topic_editor
                                                                                                                .find(
                                                                                                                        '#icb-tag-category-keyword')
                                                                                                                .val()
                                                                                                        + '</a><a class="close"><i class="icon icon-delete"></i></a></span>')
                                                                                        .hide()
                                                                                        .fadeIn();

                                                                                _topic_editor
                                                                                        .find(
                                                                                                '#icb-tag-category-keyword')
                                                                                        .val(
                                                                                                '');
                                                                            },
                                                                            'json');
                                                            break;

                                                        case 'topic':
                                                            $
                                                                    .post(
                                                                            G_BASE_URL
                                                                                    + '/topic/ajax/save_related_topic/topic_id-'
                                                                                    + data_id,
                                                                            'topic_title='
                                                                                    + encodeURIComponent(_topic_editor
                                                                                            .find(
                                                                                                    '#icb-tag-category-keyword')
                                                                                            .val()),
                                                                            function (
                                                                                    response) {
                                                                                if (response.errno != 1) {
                                                                                    AWS_BACK
                                                                                            .alert(response.err);

                                                                                    return false;
                                                                                }

                                                                                _topic_editor
                                                                                        .find(
                                                                                                '.tag-queue-box')
                                                                                        .prepend(
                                                                                                '<span class="article-tag"><a href="'
                                                                                                        + G_BASE_URL
                                                                                                        + '/favorite/tag-'
                                                                                                        + encodeURIComponent(_topic_editor
                                                                                                                .find(
                                                                                                                        '#icb-tag-category-keyword')
                                                                                                                .val())
                                                                                                        + '" class="text">'
                                                                                                        + _topic_editor
                                                                                                                .find(
                                                                                                                        '#icb-tag-category-keyword')
                                                                                                                .val()
                                                                                                        + '</a><a class="close"><i class="icon icon-delete"></i></a></span>')
                                                                                        .hide()
                                                                                        .fadeIn();

                                                                                _topic_editor
                                                                                        .find(
                                                                                                '#icb-tag-category-keyword')
                                                                                        .val(
                                                                                                '');
                                                                            },
                                                                            'json');
                                                            break;

                                                        case 'favorite':
                                                            $
                                                                    .post(
                                                                            G_BASE_URL
                                                                                    + '/favorite/ajax/update_favorite_tag/',
                                                                            'item_id='
                                                                                    + data_id
                                                                                    + '&item_type='
                                                                                    + _topic_editor
                                                                                            .attr('data-item-type')
                                                                                    + '&tags='
                                                                                    + encodeURIComponent(_topic_editor
                                                                                            .find(
                                                                                                    '#icb-tag-category-keyword')
                                                                                            .val()),
                                                                            function (
                                                                                    response) {
                                                                                if (response.errno != 1) {
                                                                                    AWS_BACK
                                                                                            .alert(response.err);

                                                                                    return false;
                                                                                }

                                                                                _topic_editor
                                                                                        .find(
                                                                                                '.tag-queue-box')
                                                                                        .prepend(
                                                                                                '<span class="article-tag"><a href="'
                                                                                                        + G_BASE_URL
                                                                                                        + '/favorite/tag-'
                                                                                                        + encodeURIComponent(_topic_editor
                                                                                                                .find(
                                                                                                                        '#icb-tag-category-keyword')
                                                                                                                .val())
                                                                                                        + '" class="text">'
                                                                                                        + _topic_editor
                                                                                                                .find(
                                                                                                                        '#icb-tag-category-keyword')
                                                                                                                .val()
                                                                                                        + '</a><a class="close"><i class="icon icon-delete"></i></a></span>')
                                                                                        .hide()
                                                                                        .fadeIn();

                                                                                _topic_editor
                                                                                        .find(
                                                                                                '#icb-tag-category-keyword')
                                                                                        .val(
                                                                                                '');
                                                                            },
                                                                            'json');
                                                            break;
                                                        }
                                                    }
                                                });

                                // 给编辑box取消按钮添加事件
                                _topic_editor
                                        .find('.close-edit')
                                        .click(
                                                function () {
                                                    _topic_editor
                                                            .removeClass('active');
                                                    _topic_editor
                                                            .find(
                                                                    '.icb-search-tag-box')
                                                            .hide();
                                                    _topic_editor.find(
                                                            '.icb-edit-topic')
                                                            .show();
                                                });

                                AWS_BACK.Dropdown.bind_dropdown_list($(this)
                                        .parents('.icb-article-title-box')
                                        .find('#icb-tag-category-keyword'),
                                        'topic');
                            }

                            $(this).parents('.icb-article-title-box').find(
                                    '.icb-search-tag-box').fadeIn();

                            // 是否允许创建新话题
                            if (!G_CAN_CREATE_TOPIC) {
                                $(this).parents('.icb-article-title-box').find(
                                        '.add').hide();
                            }

                            $(this).hide();
                        });
    }
}

function _t(string, replace) {
    if (typeof (aws_lang) != 'undefined') {
        if (typeof (aws_lang[string]) != 'undefined') {
            string = aws_lang[string];
        }
    }

    if (replace) {
        string = string.replace('%s', replace);
    }

    return string;
};


// jQuery扩展
(function ($) {
    $.fn
            .extend({
                insertAtCaret : function (textFeildValue) {
                    var textObj = $(this).get(0);
                    if (document.all && textObj.createTextRange
                            && textObj.caretPos) {
                        var caretPos = textObj.caretPos;
                        caretPos.text = caretPos.text
                                .charAt(caretPos.text.length - 1) == '' ? textFeildValue
                                + ''
                                : textFeildValue;
                    } else if (textObj.setSelectionRange) {
                        var rangeStart = textObj.selectionStart, rangeEnd = textObj.selectionEnd, tempStr1 = textObj.value
                                .substring(0, rangeStart), tempStr2 = textObj.value
                                .substring(rangeEnd);
                        textObj.value = tempStr1 + textFeildValue + tempStr2;
                        textObj.focus();
                        var len = textFeildValue.length;
                        textObj.setSelectionRange(rangeStart + len, rangeStart
                                + len);
                        textObj.blur();
                    } else {
                        textObj.value += textFeildValue;
                    }
                },

                highText : function (searchWords, htmlTag, tagClass) {
                    return this.each(function () {
                        $(this).html(
                                function high(replaced, search, htmlTag,
                                        tagClass) {
                                    var pattarn = search.replace(/\b(\w+)\b/g,
                                            "($1)").replace(/\s+/g, "|");

                                    return replaced.replace(new RegExp(pattarn,
                                            "ig"), function (keyword) {
                                        return $(
                                                "<" + htmlTag + " class="
                                                        + tagClass + ">"
                                                        + keyword + "</"
                                                        + htmlTag + ">")
                                                .outerHTML();
                                    });
                                }($(this).text(), searchWords, htmlTag,
                                        tagClass));
                    });
                },

                outerHTML : function (s) {
                    return (s) ? this.before(s).remove() : jQuery("<p>")
                            .append(this.eq(0).clone()).html();
                }
            });

    $.extend({
        // 滚动到指定位置
        scrollTo : function (type, duration, options) {
            if (typeof type == 'object') {
                var type = $(type).offset().top
            }

            $('html, body').animate({
                scrollTop : type
            }, {
                duration : duration,
                queue : options.queue
            });
        }
    })

})(jQuery);
