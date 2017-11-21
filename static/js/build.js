/**
 *  将js编译到一起
 */
({
	//appDir  : "./",
	//baseUrl : "../css", // 
	baseUrl : "./", // 
	/* dir 和 module 一组
	dir     : "out/", // 输出目录
	modules : [
	           {
	        	   name    : "global.min", // 编译的js文件名
	        	   include : ["icb_template"], // 将指定js也一块编译进文件
	        	   exclude : ["app"] // 排除编译指定js
	           }
	          ],
	         // */
	//* name 和 out 一组
	name    : "global", // 编译的js文件名
	include : ["icb_template"], // 将指定js也一块编译进文件
	out     : 'out/allInOne.js',
	// */
	fileExclusionRegExp : /^(r|build)\.js$/, // 忽略编译这些文件
	path    : { // 需要的类库
		global : "global.min", 
		app    : "app.min",
		icb_template: "icb_template.min"
		
	},
	optimizeCss : "standard.keepComments.keepLines" // 优化css， 保留换行和注释
	//out     : "global.min.js"
})