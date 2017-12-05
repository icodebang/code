$(function () {

    $('#captcha').click();

    // bs自带方法-气泡提示
    $('.icb-content-wrap .md-tip').tooltip('hide');

    // 顶部按钮收缩左侧菜单
    $('.icb-header .mod-head-btn').click(function () {
        if ($('#icb-side').is(':visible')) {
            $('#icb-side').hide();

            $('.icb-content-wrap, .icb-footer').addClass('active');
        } else {
            $('#icb-side').show();

            $('.icb-content-wrap, .icb-footer').removeClass('active');
        }
    });

    // 左侧导航模拟滚动条
    $("#icb-side").perfectScrollbar({
        wheelSpeed : 20,
        wheelPropagation : true,
        minScrollbarLength : 20
    });

    // 左侧导航菜单的折叠与展开
    $('.mod-bar > li > a').click(
            function () {
                if ($(this).next().is(':visible')) {
                    $(this).next().slideUp('');

                    $(this).removeClass('active');
                } else {
                    $('#icb-side').find('li').children('ul').slideUp('slow');

                    $(this).addClass('active').parent().siblings().find('a')
                            .removeClass('active');

                    $(this).next().slideDown('');
                }

                $("#icb-side").perfectScrollbar('update');
            });

    // 日期选择
    if (typeof (DateInput) != 'undefined') {
        $('input.mod-data').date_input();
    }

    // 单选框 input checked radio 初始化
    $('.icb-content-wrap').find("input").iCheck({
        checkboxClass : 'icheckbox_square-blue',
        radioClass : 'iradio_square-blue',
        increaseArea : '20%'
    });

    // input 菜单折叠，展开、拖动
    $('.icb-item-info').on('click', 'li .mod-set-head', function () {
        // 菜单拖动中， 不做折叠
        if (ICB.V.dragsortIsRunning == true) {
            return;
        }
        var $element = $(this).closest('li').find('.mod-set-body');
        if ($element.is(':visible')) {
            $element.slideUp();
        } else {
            $element.slideDown();

            $(this).closest('li').siblings('li').find('.mod-set-body')
                    .slideUp();
        }
     });

    $(".icb-item-info").find('ul:first').dragsort({
        dragEnd : function () {
            var arr = [];
            $.each($('.icb-item-info ul li'), function (i, e) {
                arr.push($(this).attr('data-sort'));
            });
            $('#item_sort').val(arr.join(','));
            setTimeout(function () {
                ICB.V.dragsortIsRunning = false;
            }, 200);
            ICB.V.dragsortIsRunning = true;
        }
    });

    // 点击升级/降级 按钮， 实现条目的父级子级关系
    ICB.domEvents.changeUpDownLevelClick('.js-change-level');

    // input 单选框全选or 全取消
    $('.icb-content-wrap .table').find(".check-all").on(
            'ifChecked',
            function (e) {
                e.preventDefault();

                $(this).parents('table').find(".icheckbox_square-blue").iCheck(
                        'check');
            });

    $('.icb-content-wrap .table').find(".check-all").on(
            'ifUnchecked',
            function (e) {
                e.preventDefault();

                $(this).parents('table').find(".icheckbox_square-blue").iCheck(
                        'uncheck');
            });

    // 微博发布用户
    $('.icb-admin-weibo-answer .search-input').bind("keydown", function () {
        if (window.event && window.event.keyCode == 13) {
            return false;
        }
    });

    // 微博提问用户删除
    $(document).on('click', '.icb-admin-weibo-publish .delete', function () {
        $('.icb-admin-weibo-publish').find('.search-input').val('').show();

        $(this).parents('li').detach();
    });

    // 微博接收用户删除
    $(document).on('click', '.icb-admin-weibo-answer li .delete', function () {
        $(this).parent().detach();

        weiboPost($(this));
    });

    // 概述页面，新增话题数，点击排序
    $('#sorttable thead').delegate("td", "click", function () {
        if ($(this).index() == 0) {
            return false;
        } else {
            $(this).find('i').addClass('icon-down').show();

            $(this).siblings('td').find('i').removeClass('icon-down').hide();

            if ($(this).index() == 1) {
                subjectData('week');
            } else if ($(this).index() == 2) {
                subjectData('month');
            } else if ($(this).index() == 3) {
                subjectData('all');
            }
        }
    });

    $('#sorttable thead td:eq(2)').click();

});

function subjectData(type) {
    AWS.loading('show');

    var tempTop = $('#sorttable').offset().top + $('#sorttable').height() / 2
            - 50;

    var tempLeft = $('#sorttable').offset().left + $('#sorttable').width() / 2;

    $('#icb-loading').css({
        top : tempTop + 'px',
        left : tempLeft + 'px',
        position : 'absolute'
    });

    $
            .get(
                    G_BASE_URL + '/admin/ajax/topic_statistic/tag-' + type
                            + '__limit-10',
                    function (result) {
                        var tempLyout = '';

                        for (var i = result.length - 1; i >= 0; i--) {
                            tempLyout += '<tr><td></td><td></td><td></td><td></td></tr>';
                        }
                        ;
                        $('#sorttbody').html(tempLyout);

                        AWS.loading('hide');

                        if (result == '') {
                            $('.sorttable-mask').show();
                        } else {
                            $('.sorttable-mask').hide();

                            $.each(result, function (key, value) {
                                var tempObj = $('#sorttable tbody tr:eq(' + key
                                        + ')');
                                tempObj.find('td:eq(3)').text(value.all);
                                tempObj.find('td:eq(2)').text(value.month);
                                tempObj.find('td:eq(1)').text(value.week);
                                tempObj.find('td:eq(0)').text(value.title);
                            });
                        }
                    }, 'json');
}

function weiboPost(obj) {
    $.post(G_BASE_URL + '/admin/ajax/weibo_batch/', {
        'uid' : obj.attr('data-id'),
        'action' : obj.attr('data-actions')
    }, function (result) {
        if (result.errno == -1) {
            AWS.alert(result.err);

            $('.mod-weibo-reply li:last').detach();
        } else if (result.errno == 1) {
            if (result.rsm != null) {
                if (result.rsm.staus == 'bound') {
                    $('.mod-weibo-reply li:last .btn-primary').text(
                            '更新 Access Token');
                } else {
                    $('.mod-weibo-reply li:last .btn-primary').text('绑定微博');
                }
            }

            $(".icb-alert-box").modal('hide');
        }
    }, 'json');
};
