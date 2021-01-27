var ICB = typeof ICB == 'object' ? ICB : {};
ICB.template = typeof ICB.template == 'object' ? ICB.template : {};



ICB.template.sinhoBindBookWithEditor = // 绑定书稿和编辑
    '<div class="modal fade icb-alert-box ">'+
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
                '</form>' +
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>';

ICB.template.sinhoSetBookDate = // 绑定书稿和编辑
    '<div class="modal fade icb-alert-box ">'+
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
