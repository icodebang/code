var document_title = document.title;

$(function () {
    // fix form bug...
    $("form[action='']").attr('action', window.location.href);

    // 验证码
    $('img#captcha').attr('src', G_BASE_URL + '/account/captcha/');

    // 输入框自动增高
    $('.autosize').autosize();

    //响应式导航条效果
    $('.icb-top-nav .navbar-toggle').click(function() {
        if ($(this).parents('.icb-top-nav').find('.navbar-collapse').hasClass('active'))
        {
            $(this).parents('.icb-top-nav').find('.navbar-collapse').removeClass('active');
        }
        else
        {
            $(this).parents('.icb-top-nav').find('.navbar-collapse').addClass('active');
        }
    });

    //检测通知
    if (typeof (G_NOTIFICATION_INTERVAL) != 'undefined') {
        AWS.Message.check_notifications();
        AWS.G.notification_timer = setInterval('AWS.Message.check_notifications()', G_NOTIFICATION_INTERVAL);
    }

    //文章列表样式调整
    if ($('.icb-common-list').length)
    {
        $.each($('.icb-common-list .icb-item.article'), function (i, e)
        {
            if ($(this).find('.all-content img').length >= 1)
            {
                $(this).find('.markitup-box').prepend($(this).find('.all-content img').eq(0).addClass('pull-left inline-img'))
            }
        });
    }

    $('a[rel=lightbox]:visible').fancybox(
    {
        openEffect: 'none',
        closeEffect: 'none',
        prevEffect: 'none',
        nextEffect: 'none',
        centerOnScroll : true,
        closeBtn: false,
        helpers:
        {
            buttons:
            {
                position: 'bottom'
            }
        },
        afterLoad: function ()
        {
            this.title = '第 ' + (this.index + 1) + ' 张, 共 ' + this.group.length + ' 张' + (this.title ? ' - ' + this.title : '');
        }
    });

    if (window.location.hash.indexOf('#!') != -1)
    {
        if ($('a[name=' + window.location.hash.replace('#!', '') + ']').length)
        {
            $.scrollTo($('a[name=' + window.location.hash.replace('#!', '') + ']').offset()['top'] - 20, 600, {queue:true});
        }
    }

    /*用户头像提示box*/
    G_FLAG_SHOW_AVATAR && AWS.show_card_box('.icb-user-name, .icb-user-img', 'user');

    G_FLAG_SHOW_AVATAR && AWS.show_card_box('.article-tag, .icb-topic-name, .icb-topic-img', 'topic');

    //文章页添加评论, 话题添加 绑定事件
    G_FLAG_ADD_COMMENT && AWS.Init.init_article_comment_box('.icb-article-content .icb-article-comment');

    G_FLAG_ADD_COMMENT && AWS.Init.init_topic_edit_box('.icb-edit-topic');

    //话题编辑下拉菜单click事件
    $(document).on('click', '.icb-search-tag-box .icb-dropdown-list li', function ()
    {
        $(this).parents('.icb-search-tag-box').find('#icb-tag-category-keyword').val($(this).text());
        $(this).parents('.icb-search-tag-box').find('.add').click();
        $(this).parents('.icb-search-tag-box').find('.icb-dropdown').hide();
    });

    //话题删除按钮
    $(document).on('click', '.article-tag .close',  function()
    {
        var data_type = $(this).parents('.icb-article-title-box').attr('data-type'),
            data_id = $(this).parents('.icb-article-title-box').attr('data-id'),
            data_url = '',
            topic_id = $(this).parents('.article-tag').attr('data-id');

        switch (data_type)
        {
            case 'question':
                data_url = G_BASE_URL + '/topic/ajax/remove_topic_relation/';
                break;

            case 'topic':
                data_url = G_BASE_URL + '/topic/ajax/remove_related_topic/related_id-' + $(this).parents('.article-tag').attr('data-id') + '__topic_id-' + data_id;
                break;

            case 'favorite':
                data_url = G_BASE_URL + '/favorite/ajax/remove_favorite_tag/';
                break;

            case 'article':
                data_url = G_BASE_URL + '/topic/ajax/remove_topic_relation/';
                break;
        }

        if ($(this).parents('.icb-article-title-box').attr('data-url'))
        {
            data_url = $(this).parents('.icb-article-title-box').attr('data-url');
        }

        if (data_type == 'topic')
        {
            $.get(data_url);
        }
        else if (data_type == 'favorite')
        {
            $.post(data_url, 
            {
                'item_type': data_type,
                'topic_id': topic_id,
                'item_id' : data_id,
                'tags' : $.trim($(this).parents('.article-tag').text())
            }, function (result)
            {
            }, 'json');
        }
        else
        {
            $.post(data_url, 
            {
                'type': data_type,
                'topic_id': topic_id,
                'item_id' : data_id
            }, function (result)
            {
                $('#icb-modal-window').empty();
            }, 'json');
        }

        $(this).parents('.article-tag').remove();

        return false;
    });

    //小卡片mouseover
    $(document).on('mouseover', '#icb-card-tips', function ()
    {
        clearTimeout(AWS.G.card_box_hide_timer);

        $(this).show();
    });

    //小卡片mouseout
    $(document).on('mouseout', '#icb-card-tips', function ()
    {
        $(this).hide();
    });

    //用户小卡片关注更新缓存
    $(document).on('click', '.icb-card-tips-user .follow', function ()
    {
        var uid = $(this).parents('.icb-card-tips').find('.name').attr('data-id');

        $.each(AWS.G.cashUserData, function (i, a)
        {
            if (a.match('data-id="' + uid + '"'))
            {
                if (AWS.G.cashUserData.length == 1)
                {
                    AWS.G.cashUserData = [];
                }
                else
                {
                    AWS.G.cashUserData[i] = '';
                }
            }
        });
    });

    //话题小卡片关注更新缓存
    $(document).on('click', '.icb-card-tips-topic .follow', function ()
    {
        var topic_id = $(this).parents('.icb-card-tips').find('.name').attr('data-id');

        $.each(AWS.G.cashTopicData, function (i, a)
        {
            if (a.match('data-id="' + topic_id + '"'))
            {
                if (AWS.G.cashTopicData.length == 1)
                {
                    AWS.G.cashTopicData = [];
                }
                else
                {
                    AWS.G.cashTopicData[i] = '';
                }
            }
        });
    });

    /*icon tooltips提示*/
    $(document).on('mouseover', '.follow, .voter, .icb-icon-thank-tips, .invite-list-user', function ()
    {
        $(this).tooltip('show');
    });

    //搜索下拉
    AWS && AWS.Dropdown.bind_dropdown_list('#icb-search-query', 'search');

    //编辑器@人
    G_FLAG_ENABLE_AT && AWS.at_user_lists('#article-content, .icb-article-replay-box #comment_editor', 5);

    //ie浏览器下input,textarea兼容
    if (document.all)
    {
        AWS && AWS.check_placeholder($('input, textarea'));

        // 每隔1s轮询检测placeholder
        setInterval(function()
        {
            AWS && AWS.check_placeholder($('input[data-placeholder!="true"], textarea[data-placeholder!="true"]'));
        }, 1000);
    }
    // 屏幕滚动， 显示返回顶部按钮
    if ($('#icb-goto-top').length) {
        $(window).scroll(function () {
            if ($(window).scrollTop() > ($(window).height() / 2)) {
                $('#icb-goto-top').fadeIn();
            } else {
                $('#icb-goto-top').fadeOut();
            }
        });
    }
});



$(window).on('hashchange', function() {
    if (window.location.hash.indexOf('#!') != -1)
    {
        if ($('a[name=' + window.location.hash.replace('#!', '') + ']').length)
        {
            $.scrollTo($('a[name=' + window.location.hash.replace('#!', '') + ']').offset()['top'] - 20, 600, {queue:true});
        }
    }
});
