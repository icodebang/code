/**
 * iCodeBang.com team
 */
function FileUploader (bindElement, filesInfoContainer, url, options, callback)
{
	var _this = this;
	this.element = bindElement;
	this.container = filesInfoContainer;  // 展示上传文件区域， 也可以展示上传图片
	this.url = url;
	if (! options)  options = {};
    this.options = {
    	'allowedTypes' : '*',
		'multiple'  : true,
		'deleteBtn' : true,
		'insertBtn' : true,
		'insertTextarea' : '.article-content',
		'deleteBtnTemplate' : '<a class="delete-file">删除</a>' ,
		'insertBtnTemplate' : '<a class="insert-file">插入</a>',

    	'fileName'  : 'upload_file',  // 上传的文件参数名称
    	'uploadingModalSelector' : null, // 显示上传中的modal选择器
		'isFormInsideMode': false, // 将上传放在绑定元素内部模式 ?
		'showUploadImage' : false, // 是否将上传后图片展示出来，而不是展示文件信息
		'fileInfoTemplate': '<li class="__UploadFileInfo__">'+ // 展示上传文件信息
								'<div class="img"></div>'+
								'<div class="content">'+
									'<p class="title"></p>'+
									'<p class="size"></p>'+
									'<p class="meta">' +
									//  '<a class="js-stop-upload">'+_t('取消')+'</a>' +
									'</p>' +
								'</div>'+
							'</li>'
	};
    
	this.startCallback   = this._onStartUpload;
	if (options.startCallback) {
		this.startCallback   = options.startCallback;
		delete options.startCallback;
	}
	this.uploadingCallback = this._onUploading;
	if (options.uploadingCallback) {
		this.uploadingCallback   = options.uploadingCallback;
		delete options.uploadingCallback;
	}
	this.endCallback     = this._onEndUpload;
	if (options.endCallback) {
		this.endCallback   = options.endCallback;
		delete options.endCallback;
	}

	if (options.editor) {
		this.editor = options.editor;
	}

	this.options = $.extend(this.options, options);

	this.callback = callback;

	this.form = this.buildForm();
	
	if (this.options.isFormInsideMode) {
		$(this.element).prepend(this.form);
	} else {
		this.init(this.element);
	}
}

FileUploader.prototype = 
{
	set : function (key, value) {
		this.options[key] = value;
		return this;
	},
	/**
	 *  初始化表单，准备文件展示区域
	 * @param element 上传绑定的元素
	 */
	init : function (element)
	{
	    var _this = this;
		if(navigator.userAgent.indexOf("MSIE 8.0") > 0) {
			$(element).prepend(this.form);
			
		} else {
			$('body').append(_this.form);

			$(element).click(function () {
			    
				_this.form.find('.file-input').click();
			});
		}
		
		var $container = $(this.container);
		$container.each(function () {
			if ($(this).get(0).tagName != 'IMG' && _this.options.showUploadImage !== true) {

				if (! $container.find('.upload-list').length) {
				    $container.append('<ul class="upload-list"></ul>');
				}
			}
		});
		
	},
	
	/**
	 * 创建上传文件的表单，绑定上传操作
	 * @returns
	 */
	buildForm : function ()
	{
		var _this = this;
		var $file = $('<input/>').attr({
			    	    'type'  : 'file',
			  			'class' : 'file-input',
						'name'  : this.options.fileName,
						'multiple' : this.options.multiple ? 'multiple' : false
					}).change(function () { _this.processUpload(this); });
		var $form = $('<form/>').attr({
				'id'     : '__UploadFileForm__',
				'action' : this.url,
				'target' : '__PostFileToIframe__',
				'method' : 'post',
				'enctype': 'multipart/form-data',
				'class'  : ''
			}).append($('<input/>').attr({'type':'submit', 'class':'submit'}))
		      .append($file);
		
		return $form;
	},
	
	_onStartUpload : function ($fileInfo, index, file)
	{
		if (this.options.showUploadImage !== true) {
		    $(this.container).find('.upload-list').append($fileInfo);
		}
	},
	
	_onUploading : function (event, $fileInfo, index, file)
	{
    	$fileInfo.find('.js-stop-upload').remove();
		var percent = 0;
    	if (event.lengthComputable) {
            percent = Math.round(event.loaded / event.total * 100 );
        }

    	var $fileInfo = $(this.container).find('[data-upload-flag="'+$fileInfo.attr('data-upload-flag')+'"]');
    	$fileInfo.find('.title').html(file.name);
    	$fileInfo.find('.size').html(percent + '%');
	},
	
	_onEndUpload : function (result, $fileInfo, index, file)
	{
		if (! index) {
			index = 0;
		}
		var info;
    	var $fileInfo = $(this.container).find('[data-upload-flag="'+$fileInfo.attr('data-upload-flag')+'"]');
    	$fileInfo.find('.js-stop-upload').remove();
    	if (result.errnum == 0) {
    		try {
    			info = eval("(" + result.response + ")");
    			if (info.err) {
    			    info.error = info.err;
    			    delete info.err;
    			}
    		} catch (e) {
    			console && console.info(result);
    			info = {error : _t('服务器返回错误数据！')};
    		} 
    	} else {
    		info = result;
    	}

		var $container = $(this.container);
		if (! info.error) {
			// 将图片直接展示出来
			if (this.options.showUploadImage === true && info.thumb) {
	        	if ($container.attr('src')) {
	        		$container.attr('src', info.thumb + '?' + Math.round(Math.random() * 10000));
	        	} else {
	        		$container.css(
	        		{
	        			'background-image' : 'url(' + info.thumb + '?' + Math.round(Math.random() * 10000) + ')'
	        		});
	        	}

	            this.oncallback(info);
	        	
	        	return;
	        }
			
			switch (info.class_name) {
				case 'txt':
					$fileInfo.find('.img').addClass('file').html('<i class="icon icon-file"></i>');
				    break;
				    
		        default:
		            if (info.thumb) {
	                    $fileInfo.find('.img').css(
	                    {
	                        'background': 'url("' + info.thumb + '")'
	                    }).addClass('active').attr('data-img', info.thumb);
		            } else {
                        $fileInfo.find('.img').addClass('file ' + info.class_name)
                                 .attr('data-url', info.url)
                                 .html('<i class="icon icon-'+info.class_name+'"></i>');
		            }
                    break;        
			}

			if (info.delete_url) {
				var btn;
				if (this.options.deleteBtn) {
					btn = this.createDeleteBtn(info.attach_id, info.delete_url);
	
					$fileInfo.find('.meta').append(btn);
				}
				//if (this.options.insertBtn && !info.class_name) {
				if (this.options.insertBtn) {
					btn = this.createInsertBtn(info.attach_id);

					$fileInfo.find('.meta').append(btn);
				}
			}

			
			$fileInfo.append(this.createHiddenInput(info.attach_id));

			if (file) {
	    	    $fileInfo.find('.size').html(this.formatFileSize(file.size));
			}

			this.oncallback(info);
			
		} else {
			if ($fileInfo.length){
				$fileInfo.addClass('error')
				         .find('.img').addClass('error')
				         .html('<i class="icon icon-delete"></i>');
				
				$fileInfo.find('.size').text(info.error);
		    } else if (typeof ICB == 'object') {
			    ICB.modal.alert(info.error);
		    }
		}
	},
	
	/**
	 * 上传文件处理
	 * @param fileElement fileInput元素
	 */
	processUpload : function (fileElement)
	{
		var files = $(fileElement)[0].files;
		if (files && this.options.showUploadImage !== true) {
			
			for (i = 0; i < files.length; i++) {
				this.doUpload(files[i], i);
			}
			
		} else {
			this.doUpload();
		}
	},
	
	/**
	 * 上传文件
	 * @param file [option] 从fileInput获取到的file对象
	 * @param index [option] 当前的file是fileInputh中的第几个
	 * @returns {Boolean}
	 */
	doUpload : function (file, index)
	{
		var _this = this;
		
		var $fileInfo = $(this.options.fileInfoTemplate).attr('data-upload-flag', 'upload-'+Math.random());
		
		if (typeof this.startCallback == 'function') {
			this.startCallback ($fileInfo, index, file);
		}

		if (file) { // 通过ajax上传
			
			if(! this.isFileTypeValid(file.name) ) {
				if (typeof this.endCallback == 'function') {
					this.endCallback({errnum:1, error:_t('文件类型错误')}, $fileInfo, index, file);
				}
				
				return false;
			}
			
			var xhr = new XMLHttpRequest();

	        xhr.upload.onprogress = function(event) {
	        	var stopFlag = '';
				if (typeof _this.uploadingCallback == 'function') {
					stopFlag = _this.uploadingCallback(event, $fileInfo, index, file);
				}
				if ('stop'==stopFlag) {
					xhr.abort();
				}
	        };
        	
	        xhr.onreadystatechange = function() {      
	            _this.onStateChange($fileInfo, index, file, xhr);
	        };

	        var url = this.url + '&'+this.options.fileName+'=' + file.name + '&timestamp=' + new Date().getTime();

	        xhr.open("POST", url);

	        xhr.send(file);
	        
		} else { // 通过iframe上传
			
			var filename = this.form.find('.file-input').val();

			if(! _this.isFileTypeValid(filename) ) {
				if (typeof _this.endCallback == 'function') {
					this.endCallback({errnum:1, error:_t('文件类型错误')}, $fileInfo);
				}
				
				return false;
			}

			// 显示上传中
			if (this.options.uploadingModalSelector) {
				$(this.options.uploadingModalSelector).show();
			}
        	
			// 页面如没有iframe， 自动添加
        	if ($('iframe[name="__PostFileToIframe__"]').length == 0) {
            	
    			var iframe = this.getIframe().get(0);
	        	if (iframe.addEventListener) {
			        iframe.addEventListener(
			        		'load', 
			        		function() {_this.getIframeContent(iframe, $fileInfo);}, 
			        		false
			        );
			        
			    } else if (iframe.attachEvent) {
			        iframe.attachEvent('onload', function() {_this.getIframeContent(iframe, $fileInfo);});
		    	}

    		    $('body').append(iframe);
        	}

        	this.form.find('input.submit').click();
        }
	},

	/**
	 * 检查上传文件扩展名是否允许
	 * @param name
	 * @returns {Boolean}
	 */
	isFileTypeValid: function (filename)
	{
		if(! filename) {
			return false;
		}
		if ('*' == this.options.allowedTypes) { // 全部允许
			return true;
		}
		// 获取扩展名
		var fileinfo = filename.split('.');
		var ext = fileinfo.length>1 ? fileinfo.pop().toLowerCase() : '';
		
		return this.options.allowedTypes.indexOf(ext) >=0;
	},

	/**
	 * 
	 * @returns
	 */
	getIframe : function ()
	{
    	var iframe = $('<iframe/>').attr({
    		'class': 'hide __PostFileToIframe__',
    		'name': '__PostFileToIframe__'
    	});
    	return iframe;
	},

	// 创建隐藏域 (wecenter定制)
	createHiddenInput : function(attach_id)
	{
		var $input = $('<input type="hidden" name="attach_ids[]" class="hidden-input" />').val(attach_id);

		return $input;
	},

    /**
     *  创建插入按钮
     */
    createInsertBtn : function (attach_id)
    {
    	var $btn = $(this.options.insertBtnTemplate), _this = this;

    	$btn.click(function() {
			if (typeof CKEDITOR != 'undefined') {
				var $imgInfo = $(this).closest('.__UploadFileInfo__').find('.img');
				if ($imgInfo.attr('data-img')) {
				    _this.editor.insertHtml('<br/>');
				    var dom = _this.editor.document.createElement( 'img' );
                    //name = $.trim(name)=='' ? value : name;
                    //dom.setHtml(name);

                    dom.setAttribute( 'src', $imgInfo.attr('data-img') );
                    dom.setAttribute( 'attach-id', attach_id );
                    
                    _this.editor.insertElement(dom);
                    _this.editor.insertHtml('<br/>');
                    
//				    _this.editor.insertHtml('<br/><img src="'
//						+ $imgInfo.attr('data-img')
//						+ '" attach-id="'+ attach_id + '"/><br/>');
				    
				} else if ($imgInfo.hasClass('audio')) {
                    _this.editor.insertHtml('<br/>');
                    var dom = _this.editor.document.createElement( 'audio' );

                    dom.setAttribute( 'controls', 'controls');
                    dom.setAttribute( 'attach-id', attach_id );
                    dom.setAttribute( 'src', $imgInfo.attr('data-url') );
                    
                    _this.editor.insertElement(dom);
                    _this.editor.insertHtml('<br/>');
                    
//                    _this.editor.insertHtml('<br/><audio controls src="'
//                        + $imgInfo.attr('data-url')
//                        + '" attach-id="'+ attach_id + '"></audio><br/>');
				} else {
					_this.editor.insertText("\n[attach]" + attach_id + "[/attach]\n");
				}
			} else {
				_this.editor.val( _this.editor.val() + "\n[attach]" + attach_id + "[/attach]\n");
			}
		});

		return $btn;
    },

    /**
     *  创建删除按钮
     */
   	createDeleteBtn : function (attach_id, url)
   	{
   		var $btn = $(this.options.deleteBtnTemplate);

		var _this = this;
		
   		$btn.click(function() {
			if (! confirm("确认删除?")) {
				return;
			}
			var $imgInfo = $(this).closest('.__UploadFileInfo__').find('.img');
			$.get(url, function (result) {
				if (result.errno == "-1") {
					ICB.modal.alert(result.err);
					
					return;
				}

				if (typeof CKEDITOR != 'undefined') {
					var content;
					
					for (var textareaId in CKEDITOR.instances) {
						content = CKEDITOR.instances[textareaId].getData();
						if ($imgInfo.attr('data-img')) {
							content = content.replace(/\n?\[img.*\](.*)+\[\/img\]\n?/g, function (p0, p1) {
								console.info(p1==$imgInfo.attr('data-img'));
								if (p1==$imgInfo.attr('data-img')) {
									return '';
								}
								
							    return p0;
							});
						} else {
							content = content.replace(/\n?\[attach\](\d)\[\/attach\]\n?/g, function (p0, p1) {
								if (p1==attach_id) {
									return '';
								}
								
							    return p0;
							});
						}
						CKEDITOR.instances[textareaId].setData(content);
					}
				} else {
					var content = _this.editor.val().replace(/\n?\[attach\](\d)\[\/attach\]\n?/g, function (p0, p1) {
						if (p1==attach_id) {
							return '';
						}
						
					    return p0;
					});
					_this.editor.val(content);
				}
				
				$imgInfo.closest('li').remove();
				
			}, 'json');
		});

		return $btn;
   	},

	/**
	 *  获取iframe响应的json内容
	 * @param iframe
	 * @param $fileInfo
	 */
	getIframeContent : function (iframe, $fileInfo)
	{
		var doc = iframe.contentDocument ? iframe.contentDocument: iframe.contentWindow.document,
			result, filename;

            result = {errnum : 0, response : doc.body.innerHTML};

            if (this.options.showUploadImage !== true) {
            	if (typeof this.endCallback == 'function') {
					this.endCallback(result, $fileInfo);
				}
            	
	           	filename = this.getName($('#__UploadFileForm__ .file-input')[0].value);

	           	$fileInfo.find('.title').html(filename);
	           	
            } else  {
            	
            	$(this.options.uploadingModalSelector).hide();

            	if (typeof this.endCallback == 'function') {
					this.endCallback(result, $fileInfo);
				}
            }

           	$('.upload-iframe').detach();

           	//this.oncallback();
	},

	// ajax完成callback
	onStateChange : function ($fileInfo, index, file, xhr)
	{
		if (! xhr || xhr.readyState != 4) {
			return null;
		}
		
        var result;
		if (xhr.status == 200) {
			result = {errnum:0, response:xhr.responseText};
		} else if (xhr.status == 500) {
			result = {errnum : 500, error : _t('内部服务器错误')};
		} else if (xhr.status == 0) {
			result = {errnum : 999, error : _t('网络链接异常')};
		} else if (xhr.status == 413) {
			result = {errnum : 413, error : _t('文件大小超出限制')};
		} else {
			result = {errnum : xhr.status, error : _t('未知错误')};
			console && console.info(xhr);
		}
		
		if (typeof this.endCallback == 'function') {
			this.endCallback(result, $fileInfo, index, file);
		}
		
		return result;
	},

	// 此功能配合编辑器
	oncallback : function (result)
	{
		if (this.callback) {
       		this.callback(result);
       	}
	},

	// 获取文件名
	getName : function (filename)
	{
        return filename.replace(/.*(\/|\\)/, "");
    },

    /**
     * 获取文件大小
     * @param size 格式化文件大小
     * @returns {String}
     */
    formatFileSize : function (filesize)
    {
    	if (filesize > 1024 * 1024) {
            filesize = (Math.round(filesize/ (1024 * 1024) * 100 ) / 100).toString() + 'MB';
        } else {
            filesize = (Math.round(filesize / 1024 * 100 ) / 100).toString() + 'KB';
        }
    	
        return filesize;
    },

   	// 初始化文件列表
    setFileList : function (json)
    {
    	var $template = $(this.options.fileInfoTemplate);

        if (! json.is_image) {
            $template.find('.img').addClass('file ' + json.class_name)
                     .attr('data-url', json.attachment)
                     .append('<i class="icon icon-'+json.class_name+'"></i>');
        } else {
            $template.find('.img').attr({"data-img":json.thumb, "style":"background-image:url('" + json.thumb + "')"});
        }
		var insertBtn = this.createInsertBtn(json.attach_id),
		    deleteBtn = this.createDeleteBtn(json.attach_id, json.delete_link),
		    hiddenInput = this.createHiddenInput(json.attach_id);

        $template.find('.title').text(json.file_name);
        $template.find('.meta').append(deleteBtn);
        $template.find('.meta').append(insertBtn);
        $template.find('.meta').append(hiddenInput);
    	$(this.container).find('.upload-list').append($template);
    	
    	if (typeof CKEDITOR == 'undefined') {
    		return;
    	}

    	var content;
		
		for (var textareaId in CKEDITOR.instances) {
			content = CKEDITOR.instances[textareaId].getData();
			content = content.replace(/\[attach\](\d+)\[\/attach\]/g, function (p0, p1) {
					if (p1==json.attach_id) {
						return '[img='+ json.attach_id + ']'
						+ json.thumb
						+ '[/img]';
					}
					
				    return p0;
				});
			CKEDITOR.instances[textareaId].setData(content);
		}
    }
}

function FileUpload (type, bindElement, filesInfoContainer, url, options, callback)
{
	var _this = this;
	this.type = type;
	this.element = bindElement;
	this.container = filesInfoContainer;
	this.url = url;
    this.options = {
    	'fileName'  : 'upload_file',
    	'allowedTypes' : '*',
		'multiple'  : true,
		'deleteBtn' : true,
		'insertBtn' : true,
		'insertTextarea' : '.article-content',
		'template' : '<li>'+
		    			'<div class="img"></div>'+
						'<div class="content">'+
							'<p class="title"></p>'+
							'<p class="size"></p>'+
							'<p class="meta"></p>'+
						'</div>'+
		    		'</li>',
		'deleteBtnTemplate' : '<a class="delete-file">删除</a>' ,
		'insertBtnTemplate' : '<a class="insert-file">插入</a>'
	};

	if (options.editor) {
		this.editor = options.editor;
	}

	this.options = $.extend(this.options, options);

	this.callback = callback;

	if (type == 'file') {
		this.init(this.element, this.container);
	} else {
		var form  = this.createForm(),
			input = this.createInput();

		$(this.element).prepend($(form).append(input));
	}
}

FileUpload.prototype = 
{
	// 初始化上传器
	init : function (element, container)
	{
		
		var form  = this.createForm(),
			input = this.createInput();

		if(navigator.userAgent.indexOf("MSIE 8.0") > 0) {
			$(element).prepend($(form).append(input));
		}
		else
		{
			$('#icb-modal-window').prepend($(form).append(input));

			$(element).click(function ()
			{
				$('#__UploadFileForm__ .file-input').click();
			});
		} 

		$(container).append('<ul class="upload-list"></ul>');
		
	},

	// 创建表单
	createForm : function ()
	{
		var form = this.toElement('<form method="post" enctype="multipart/form-data"><input type="submit" class="submit" /></form>');

		$(form).attr({
			'id' : '__UploadFileForm__',
			'action' : this.url,
			'target' : 'ajaxUpload'
		});

		this.form = form;

		return form;
	},

	// 创建input
	createInput : function ()
	{
		var _this = this, input = this.toElement('<input type="file" />');

		$(input).attr({
			'class' : 'file-input',
			'name' : 'aws_upload_file',
			'multiple' : this.options.multiple ? 'multiple' : false
		});

		$(input).change(function()
		{
			_this.addFileList(this);
		});

		return input;
	},

	// 创建隐藏域 (wecenter定制)
	createHiddenInput : function(attach_id)
	{
		var _this = this, input = this.toElement('<input type="hidden" name="attach_ids[]" class="hidden-input" />');

		$(input).val(attach_id);

		return input;
	},

	// 创建iframe
	createIframe : function ()
	{
		var iframe = this.toElement('<iframe></iframe>');
    	$(iframe).attr({
    		'class': 'hide upload-iframe',
    		'name': 'ajaxUpload'
    	});
    	return iframe;
	},

	// 添加文件列表
	addFileList : function (input)
	{
		var files = $(input)[0].files;
		if (files && this.type == 'file')
		{
			for (i = 0; i < files.length; i++)
			{
				this.li = this.toElement(this.options.template);
				this.file = files[i];
				$(this.container).find('.upload-list').append(this.li);
				this.upload(files[i], this.li);
			}
		}
		else
		{
			if (this.type == 'file')
			{
				this.li = this.toElement(this.options.template);
				$(this.container).find('.upload-list').append(this.li);
				this.upload('', this.li);
			}
			else
			{
				this.upload('');
			}
		}
		
	},

	//上传文件类型判断
	allowed_upload_types : function(name)
	{
		if(!name)
		{
			return false;
		}
		
		var extStart = name.lastIndexOf(".");
		
	    var ext = (name.substring(extStart+1, name.length).toUpperCase()).toLowerCase();
	    
	    if(typeof (FILE_TYPES) !='undefined' && FILE_TYPES.indexOf(ext)<0)
	    {
	    	return false;
	    }
	    
	    return true;
	    
	},
	
	// 上传功能
	upload : function (file, li)
	{
		var _this = this;

		if (file) {

			var is_allowed = this.allowed_upload_types(file.name);
			
			if(!is_allowed)
			{
				$(li).find('.meta').html(_t('文件类型错误'));
				//$('.upload-list').html('');
				if( typeof(AWS.alert) == 'undefined' )
				{
					alert(_t('文件类型不允许上传'));
				}else{
					AWS.alert(_t('文件类型不允许上传'));
				}
				
				return false;
			}
			
			var xhr = new XMLHttpRequest(), status = false;
			
	        xhr.upload.onprogress = function(event)
	        {
	        	if (event.lengthComputable)
	        	{
	                var percent = Math.round(event.loaded * 100 / event.total);
	            }

                $(li).find('.title').html(file.name);

                $(li).find('.size').html(percent + '%');
	        };

	        xhr.onreadystatechange = function()
	        {      
	            _this.oncomplete(xhr, li, file);
	        };

	        var url = this.url + '&aws_upload_file=' + file.name + '&timestamp=' + new Date().getTime();

	        xhr.open("POST", url);

	        xhr.send(file);
		}
        else
        {
        	//低版本ie上传
			var iframe = this.createIframe();
			
			var filename = $(this.form).find('.file-input').val();

			var is_allowed = this.allowed_upload_types(filename);
			
			if(!is_allowed)
			{
				if( typeof(AWS.alert) == 'undefined' )
				{
					alert(_t('文件类型不允许上传'));
				}else{
					AWS.alert(_t('文件类型不允许上传'));
				}
				
				return false;
			}

			if (this.options.loading_status)
			{
				$(this.options.loading_status).show();
			}

        	if (iframe.addEventListener)
        	{
		        iframe.addEventListener('load', function()
	        	{
	        		_this.getIframeContentJSON(iframe, _this.container);
	        	}, false);
		    } else if (iframe.attachEvent)
		    {
		        iframe.attachEvent('onload', function()
	        	{
	        		_this.getIframeContentJSON(iframe, _this.container);
	        	});
	    	}

    		$('#icb-modal-window').append(iframe);

        	$(this.form).find('.submit').click();
        }
	},

	// 从iframe获取json内容
	getIframeContentJSON : function (iframe, container)
	{
		var doc = iframe.contentDocument ? iframe.contentDocument: iframe.contentWindow.document,
			response, filename;

            response = eval("(" + doc.body.innerHTML + ")");

            if (this.type == 'file')
            {
            	this.render(this.li, response);

	           	filename = this.getName($('#__UploadFileForm__ .file-input')[0].value);

	           	$(this.li).find('.title').html(filename);
            }
            else
            {
            	$(this.options.loading_status).hide();

            	if ($(this.container).attr('src'))
            	{
            		$(this.container).attr('src', response.thumb + '?' + Math.round(Math.random() * 10000));
            	}
            	else
            	{
            		$(this.container).css(
            		{
            			'background' : 'url(' + response.thumb + '?' + Math.round(Math.random() * 10000) + ')'
            		});
            	}
            }

           	$('.upload-iframe').detach();

           	this.oncallback();
	},

	// ajax完成callback
	oncomplete : function (xhr, li, file)
	{
		var _this = this, response, filesize = this.getFIleSize(file);
		if (xhr.readyState == 4)
		{
			if (xhr.status == 200)
			{
	            try
	            {
	                response = eval("(" + xhr.responseText + ")");

	                this.render(li, response, filesize);
	            }
	            catch(err)
	            {
	                response = {};
	            }
			}
			else if (xhr.status == 500)
			{
				this.render(li, {'error':_t('内部服务器错误')}, filesize);
			}
			else if (xhr.status == 0)
			{
				this.render(li, {'error':_t('网络链接异常')}, filesize);
			}
		}
	},

	// 此功能配合编辑器
	oncallback : function ()
	{
		if (this.callback)
       	{
       		this.callback();
       	}
	},

	// 渲染缩略列表
	render : function (element, json, filesize)
	{
		if (json)
		{
			if (!json.error)
			{
				switch (json.class_name)
				{
					case 'txt':
						$(element).find('.img').addClass('file').html('<i class="icon icon-file"></i>');
					break;

					default :
						$(element).find('.img').css(
						{
			                'background': 'url("' + json.thumb + '")'
			            }).addClass('active').attr('data-img', json.thumb);
			        break;
				}

				if (filesize)
				{
					$(element).find('.size').html(filesize);
				}

				if (this.options.deleteBtn && json.delete_url)
				{
					var btn = this.createDeleteBtn(json.delete_url);

					$(element).find('.meta').append(btn);
				}

				if (this.options.insertBtn && json.delete_url && !json.class_name)
				{
					var btn = this.createInsertBtn(json.attach_id);

					$(element).find('.meta').append(btn);
				}

				// 插入隐藏域(wecenter定制)
				$(element).append(this.createHiddenInput(json.attach_id));

				this.oncallback();
			}
			else
			{
				$(element).addClass('error').find('.img').addClass('error').html('<i class="icon icon-delete"></i>');
				
				$(element).find('.size').text(json.error);
			}
		}
	},

	toElement : function (html)
	{
		var div = document.createElement('div');
		div.innerHTML = html;
        var element = div.firstChild;
        div.removeChild(element);
        return element;
	},

	// 获取文件名
	getName : function (filename)
	{
        return filename.replace(/.*(\/|\\)/, "");
    },

    // 获取文件大小
    getFIleSize : function (file)
    {
    	var filesize;
    	if (file.size > 1024 * 1024)
        {
            filesize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
        }
        else
        {
            filesize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
        }
        return filesize;
    },

    // 创建插入按钮
    createInsertBtn : function (attach_id)
    {
    	var btn = this.toElement(this.options.insertBtnTemplate), _this = this;

    	$(btn).click(function()
		{
			if (typeof CKEDITOR != 'undefined')
			{
				_this.editor.insertText("\n[attach]" + attach_id + "[/attach]\n");
			}
			else
			{
				_this.editor.val( _this.editor.val() + "\n[attach]" + attach_id + "[/attach]\n");
			}
		});

		return btn;
    },

    // 创建删除按钮
   	createDeleteBtn : function (url)
   	{
   		var btn = this.toElement(this.options.deleteBtnTemplate);

   		$(btn).click(function()
		{
			if (confirm('确认删除?'))
			{
				var _this = this;
				$.get(url, function (result)
				{
					if (result.errno == "-1")
					{
						AWS.alert(result.err);
					}
					else
					{
						$(_this).parents('li').detach();
					}
				}, 'json');
			}
		});

		return btn;
   	},

   	// 初始化文件列表
    setFileList : function (json)
    {
    	var template = '<li>';
    	
    	if (!json.is_image)
		{
			template += '<div class="img file"><i class="icon icon-file"></i></div>';
		}
		else
		{
			template += '<div class="img" data-img="' + json.thumb + '" style="background:url(' + json.thumb + ')"></div>';
		}

		template += '<div class="content">'+
							'<p class="title">' + json.file_name + '</p>'+
							'<p class="size"></p>'+
							'<p class="meta"></p>'+
						'</div>'+
		    		'</li>';
		var insertBtn = this.createInsertBtn(json.attach_id),
		    deleteBtn = this.createDeleteBtn(json.delete_link),
		    hiddenInput = this.createHiddenInput(json.attach_id);

		template = this.toElement(template), _this = this;

		$(template).find('.meta').append(deleteBtn);
		$(template).find('.meta').append(insertBtn);
		$(template).find('.meta').append(hiddenInput);
    	$(this.container).find('.upload-list').append(template);
    }
}

