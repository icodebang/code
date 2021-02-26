var ICB = typeof ICB == 'object' ? ICB : {};
ICB.template = typeof ICB.template == 'object' ? ICB.template : {};



ICB.template.sinhoAskLeave = // 员工请假设置
    '<div class="modal fade icb-alert-box icb-form-dialog-box">'+
        '<div class="modal-dialog">'+
            '<div class="modal-content">'+
                '<div class="modal-header">'+
                    '<a type="button" class="close icon icon-delete" data-dismiss="modal" aria-hidden="true"></a>'+
                    '<h3 class="modal-title" id="myModalLabel">' + _t('请假管理') + '</h3>'+
                '</div>'+
                '<div class="modal-body js-alert-msg form-group">' +
                '<p>'+
                '<span>请假人：</span> <span class="text-primary">{{user_name}}</span>' +
                '<span class="col-sm-offset-1">请假日期：</span> <span class="text-primary" id="ask-leave-date">{{leave_date_display}}</span>' +
                '</p>' +
                '<form onsubmit="return false;" method="post" action="' + G_BASE_URL + '/admin/ajax/administration/ask_leave/" class="form-horizontal ask-leave-form">'+
                    '<div class="row form-group icb-content-wrap ask-leave-single-item">' +
                        '<div class="col-sm-2 nopadding">'+
                            '<select id="leave_type" name="leave_type[]" class="form-control js_select_transform nopadding">' +
                            '  <option value="">请假类型</option>' +
                            '  <option value="1">事假</option>' +
                            '  <option value="2">病假</option>' +
                            '  <option value="3">年假</option>' +
                            '  <option value="4">婚假</option>' +
                            '  <option value="5">产假</option>' +
                            '  <option value="6">生理假</option>' +
                            '  <option value="7">丧假</option>' +
                            '</select>'+
                        '</div>' +
                        '<div class="col-sm-4 nopadding">'+
                            '<input type="text" name="leave_start_time[]" class="form-control icon-indent js-date-input js-datepicker" value="" autocomplete="off" placeholder="开始时间">'+
                            '<i class="icon icon-date"></i>' +
                            '<!--<i class="icon icon-date-delete icon-delete"></i>-->'+
                        '</div>' +
                        '<div class="col-sm-4 nopadding">'+
                            '<input type="text" name="leave_end_time[]" class="form-control icon-indent js-date-input js-datepicker" value="" autocomplete="off" placeholder="结束时间">'+
                            '<i class="icon icon-date"></i>' +
                            '<!--<i class="icon icon-date-delete icon-delete"></i>-->'+
                        '</div>' +
                        '<div class="col-sm-1 nopadding"><input type="text" name="leave_period[]" class="form-control nopadding text-center"/></div>' +
                        '<div class="col-sm-1 nopadding text-left"><label class="control-label">'+ _t('小时') + '</label><a class="icon icon-plus"/><a class="icon icon-delete"/></div>' +
                        // '<div class="col-sm-11 nopadding">'+
                        //     '<input type="text" name="remarks[]" class="form-control" value="" autocomplete="off" placeholder="备注信息">'+
                        // '</div>' +
                    '</div>' +
                    '<div class="col-sm-12 js-ajax-feedback"></div>' +
                    '<input type="submit" class="btn btn-success" id="js-submit-form" value="'+_t('保 存')+'"/>' +
                    '<input type="hidden" name="user_id" value="{{user_id}}"/>' +
                    '<input type="hidden" name="leave_date" value="{{leave_date}}"/>' +
                '</form>' +
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>';
ICB.template.sinhoBindBookWithEditor = // 绑定书稿和编辑
    '<div class="modal fade icb-alert-box icb-form-dialog-box">'+
        '<div class="modal-dialog">'+
            '<div class="modal-content">'+
                '<div class="modal-header">'+
                    '<a type="button" class="close icon icon-delete" data-dismiss="modal" aria-hidden="true"></a>'+
                    '<h3 class="modal-title" id="myModalLabel">' + _t('工作分派') + '</h3>'+
                '</div>'+
                '<div class="modal-body js-alert-msg">' +
                '<p><span>系列：</span> <span class="text-primary">{{serial}}</span></p>' +
                '<p><span>书名：</span> <span class="text-primary">{{book_name}}</span></p>' +
                '<p><span>校次：</span> <span class="text-primary">{{proofreading_times}}</span></p>' +
                '<form onsubmit="return false;" method="post" action="' + G_BASE_URL + '/admin/ajax/books/assign/id-{{book_id}}">'+
                    '<label for="sinho_editor">'+ _t('责编') + '：</label>' +
                    '<select multiple  id="sinho_editor" name="sinho_editor[]" class="hidden js_select_transform">' +
                    // '{{editor_list}}' +
                    '</select> ' +
                    '<input type="submit" class="btn btn-success" id="js-submit-assign" value="'+_t('分派')+'"/>' +
                    '<input type="hidden" name="action" value="assign"/>' +
                '</form>' +
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>';

ICB.template.sinhoSetBookDate = // 绑定书稿和编辑
    '<div class="modal fade icb-alert-box icb-form-dialog-box">'+
        '<div class="modal-dialog">'+
            '<div class="modal-content">'+
                '<div class="modal-header">'+
                    '<a type="button" class="close icon icon-delete" data-dismiss="modal" aria-hidden="true"></a>'+
                    '<h3 class="modal-title" id="myModalLabel">' + _t('设置书稿日期') + '</h3>'+
                '</div>'+
                '<div class="modal-body js-alert-msg">' +
                '<p><span>系列：</span> <span class="text-primary">{{serial}}</span></p>' +
                '<p><span>书名：</span> <span class="text-primary">{{book_name}}</span></p>' +
                '<p><span>校次：</span> <span class="text-primary">{{proofreading_times}}</span></p>' +
                '<form onsubmit="return false;" method="post" action="' + G_BASE_URL + '/admin/ajax/books/set_date/id-{{book_id}}">'+
                    '<label for="sinho_delivery_date">'+ _t('发稿日期') + '：</label>' +
                    '<input class="js-datepicker" type="text" id="sinho_delivery_date" name="delivery_date" value="{{delivery_date}}"> ' +
                    '<label for="sinho_return_date">'+ _t('回稿日期') + '：</label>' +
                    '<input class="js-datepicker" type="text" id="sinho_return_date" name="return_date" value="{{return_date}}"> ' +
                    '<input type="submit" class="btn btn-success btn-sm" id="js-submit-book-date" value="'+_t('保 存')+'"/>' +
                '</form>' +
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>';
