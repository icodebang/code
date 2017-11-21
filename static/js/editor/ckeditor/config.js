/**
 * @license Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

	config.toolbar = 'Full';
	
	config.toolbar_Full = [
		//'FontSize','RemoveFormat'
		 [
          'Undo','Redo', 'FontSize','Textcolor',
		  'Bold','Italic','Underline', 'NumberedList','BulletedList', 
		  'Blockquote', 'pbckcode', 'iCodeBangImage', 'WecenterAttach', 'iCodeBangAttach', 
		  'iCodeBangLink', 'iCodeBangAudio', 'WecenterVideo', 'iCodeBangBlock', 'Maximize']
	]

	config.extraPlugins = 'autolink,pbckcode,' +
	                      //'bbcode,' + // 用bbcode语法
	                      'sourcearea,icodebangattach,icodebangaudio,wecenterattach,icodebangimage,icodebanglink,wecentervideo,blockquote,font,icodebangblock';

	config.resize_enabled = false;

	config.language = 'zh-cn';

	config.skin = 'bootstrapck';

	config.height = 250;

	// 过滤粘贴内容
	config.forcePasteAsPlainText = true;

	config.magicline_color = '#ccc';

	config.magicline_everywhere = true;

	config.fontSize_sizes= "50%/50%;100%/100%;120%/120%;150%/150%;180%/180%;200%/200%;250%;250%;300%/300%;30%/30%",
	//config.fontSize_sizes = '16px;18px';

	// The default plugins included in the basic setup define some buttons that
	// are not needed in a basic editor. They are removed here.
	//config.removeButtons = 'Cut,Copy,Paste,Anchor,Underline,Strike,Subscript,Superscript';

	// Dialog windows are also simplified.
	//config.removeDialogTabs = 'link:advanced';

	config.removePlugins = 'enterkey,elementspath,tabletools,contextmenu,link';

};
