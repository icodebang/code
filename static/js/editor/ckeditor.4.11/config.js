/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {


	//config.toolbar = 'Full';

	// %REMOVE_START%
	// The configuration options below are needed when running CKEditor from source files.
	config.plugins = 'dialogui,dialog,codesnippet,about,a11yhelp,dialogadvtab,basicstyles,bidi,blockquote,notification,button,toolbar,clipboard,panelbutton,panel,floatpanel,colorbutton,colordialog,templates,menu,contextmenu,copyformatting,div,resize,elementspath,enterkey,entities,popup,filetools,filebrowser,find,fakeobjects,flash,floatingspace,listblock,richcombo,font,forms,format,horizontalrule,htmlwriter,iframe,wysiwygarea,image,indent,indentblock,indentlist,smiley,justify,menubutton,language,link,list,liststyle,magicline,maximize,newpage,pagebreak,pastetext,pastefromword,preview,print,removeformat,save,selectall,showblocks,showborders,sourcearea,specialchar,scayt,stylescombo,tab,table,tabletools,tableselection,undo,lineutils,widgetselection,widget,notificationaggregator,uploadwidget,uploadimage,wsc,cssanim,html5video,imagerotate,qrc,soundPlayer,slideshow'
	                + ',codemirror,icodebanglink,icodebangaudio,icodebangblock,icodebangattach,icodebangimage';//,Audio';
	config.skin = 'moono-lisa';
	config.resize_enabled = false;
    // config.toolbar= [
    //     [ 'Source' ], [ 'Undo', 'Redo' ], [ 'Bold', 'Italic', 'Underline' ], [ 'CodeSnippet' ]
    //     , ['Link', 'Unlink'],['Font', 'FontSize']
    // ],
    config.codeSnippet_theme= 'monokai_sublime',

	config.language = 'zh-cn';

	//config.skin = 'bootstrapck';

	config.height = 400;

	// 过滤粘贴内容
	config.forcePasteAsPlainText = true;

	config.magicline_color = '#ccc';

	config.magicline_everywhere = true;

	config.fontSize_sizes= "50%/50%;100%/100%;120%/120%;150%/150%;180%/180%;200%/200%;250%;250%;300%/300%;30%/30%";
	// %REMOVE_END%

	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';

	// config.toolbar_Full = [
	// 	//'FontSize','RemoveFormat'
	// 	 [
 //          'Undo','Redo', 'FontSize','Textcolor','Format',
	// 	  'Bold','Italic','Underline', 'NumberedList','BulletedList',
	// 	  'Blockquote', 'CodeSnippet', 'iCodeBangImage', 'iCodeBangAttach',
	// 	  'iCodeBangLink', 'iCodeBangAudio', 'iCodeBangBlock','-', 'Source', '-','-', 'Maximize']
	// ];
};
