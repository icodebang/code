/* =====================================
	+ 移动菜单
	+ 页面滚动
	+ 单页导航
	+ Main Slider
	+ Team Hover
	+ Testimonial Carousel
	+ Portfolio Carousel
		+ Portfolio Single Slide
	+ Magnific Popup
	+ Counter JS
	+ Clients Carousel
	+ Progress JS
	+ Social Hover
	+ Typed Js
	+ ScrollUp JS
	+ Animation JS
	+ Extra JS
	+ Baidu Map
	+ Background Video
	+ Preloader JS
======================================*/
(function ($) {
	"use strict";
    $(document).ready(function(){

	/*====================================
    // 	移动端菜单
    // Options
    //     'label' : 'MENU', // Label for menu button. Use an empty string for no label.
    //     'duplicate': true, // If true, the mobile menu is a copy of the original.
    //     'duration': true, // The duration of the sliding animation.
    //     'easingOpen': 'swing', // Easing used for open animations.
    //     'easingClose': 'swing' // Easing used for close animations.
    //     'closedSymbol': '&#9658;', // Character after collapsed parents.
    //     'openedSymbol': '&#9660;', // Character after expanded parents.
    //     'prependTo': 'body', // Element, jQuery object, or jQuery selector string to prepend the mobile menu to.
    //     'appendTo': '', // Element, jQuery object, or jQuery selector string to append the mobile menu to. Takes precedence over prependTo.
    //     'parentTag': 'a', // Element type for parent menu items.
    //     'closeOnClick': false, // Close menu when a link is clicked.
    //     'allowParentLinks': false // Allow clickable links as parent elements.
    //     'nestedParentLinks': true // If false, parent links will be separated from the sub-menu toggle.
    //     'showChildren': false // Show children of parent links by default.
    //     'removeIds': true // Remove IDs from all menu elements. Defaults to false if duplicate set to false.
    //     'removeClasses': false // Remove classes from all menu elements.
    //     'brand': '' // Add branding to menu bar.
    //     'animations': 'jquery' // Animation library. Currently supports "jquery" and "velocity".
    // Callbacks
    //     'init': function(){}, // Called after SlickNav creation
    //     'beforeOpen': function(trigger){}, // Called before menu or sub-menu opened.
    //     'beforeClose': function(trigger){} // Called before menu or sub-menu closed.
    //     'afterOpen': function(trigger){} // Called after menu or sub-menu opened.
    //     'afterClose': function(trigger){} // Called after menu or sub-menu closed.
    // Methods
    //     $('.menu').slicknav('toggle'); // Method to toggle the menu
    //     $('.menu').slicknav('open'); // Method to open the menu
    //     $('.menu').slicknav('close'); // Method to close the menu
    // https://github.com/ComputerWolf/SlickNav
	======================================*/
	$('.menu').slicknav({
        prependTo:".mobile-nav",
        label:"",
	});


	/*======================================
	// 页面皮肤切换
	======================================*/
    $(".js-theme-switch" ).click(function(){
        if ($(this).data('theme-name')) {
            $("#theme-switch" ).attr("href", "static/"+$(this).data('theme-name')+".css" );
        }
		return false;
    });

	$('.icon').click (function(event){
		event.preventDefault();
		if( $ (this).hasClass('inOut')  ){
			$('.theme-switch').stop().animate({right:'0px'},500 );
		} else{
			$('.theme-switch').stop().animate({right:'-200px'},500 );
		}
		$(this).toggleClass('inOut');
		return false;

	}  );
	/*======================================
	// 页面滚动， 头部菜单加入样式
	======================================*/
	jQuery(window).on('scroll', function() {
        if ($(this).scrollTop() > 55) {
            $('#header').addClass("sticky animated fadeInDown");
        } else {
            $('#header').removeClass("sticky animated fadeInDown");
        }
    });

	/*======================================
    // 单页面导航， 点击菜单后定位到指定id的标签位置

    // 属性/方法	类型	默认值	说明
    // currentClass	字符串	'current'	导航高亮的 class
    // changeHash	布尔值	false	URL 显示命名锚记（点击导航显示）
    // scrollSpeed	整数	750	动画持续时间，以毫秒为单位
    // scrollThreshold	整数/浮点数	0.5	下一个处于浏览器可视区域多少比例时导航切换
    // filter	字符串	''	过滤不要的项，如 filter: ':not(.external)'
    // easing	字符串	'swing'	滚动动画方式
    // begin	函数		滚动前的回调函数
    // end	函数		滚动后的回调函数
    // scrollChange	函数		导航切换后的回调函数
	======================================*/
	if ($.fn.onePageNav) {
        $('.navbar-nav').onePageNav({
            currentClass: 'active',
            scrollSpeed: 600,
        });
		$('.slicknav_nav').onePageNav({
            currentClass: 'active',
            scrollSpeed: 600,
        });

    }

	/*======================================
        // Main Slider
        // 参数   类型   默认值   说明
        // items   整数5幻灯片每页可见个数
        // itemsDesktop 数组[1199,4]设置浏览器宽度和幻灯片可见个数，格式为[X,Y]，X 为浏览器宽度，Y 为可见个数，如[1199,4]就是如果浏览器宽度小于1199，每页显示 4 张，此参数主要用于响应式设计。也可以使用 false
        // itemsDesktopSmall  数组[979,3]同上
        // itemsTablet  数组[768,2]同上
        // itemsTabletSmall  数组false同上，默认为 false
        // itemsMobile  数组[479,1]同上
        // itemsCustom  数组false
        // singleItem  布尔值false是否只显示一张
        // itemsScaleUp  布尔值false
        // slideSpeed  整数200幻灯片切换速度，以毫秒为单位
        // paginationSpeed  整数800分页切换速度，以毫秒为单位
        // rewindSpeed  整数1000重回速度，以毫秒为单位
        // autoPlay  布尔值/整数false自动播放，可选布尔值或整数，若使用整数，如 3000，表示 3 秒切换一次；若设置为 true，默认 5 秒切换一次
        // stopOnHover  布尔值false鼠标悬停停止自动播放
        // navigation  布尔值false显示“上一个”、“下一个”
        // navigationText  数组[“prev”,”next”]设置“上一个”、“下一个”文字，默认是[“prev”,”next”]
        // rewindNav  布尔值true滑动到第一个
        // scrollPerPage  布尔值false每页滚动而不是每个项目滚动
        // pagination  布尔值true显示分页
        // paginationNumbers  布尔值false分页按钮显示数字
        // responsive  布尔值true
        // responsiveRefreshRate  整数200每 200 毫秒检测窗口宽度并做相应的调整，主要用于响应式
        // responsiveBaseWidthjQuery 选择器window
        // baseClass  字符串owl-carousel添加 CSS，如果不需要，最好不要使用
        // theme  字符串owl-theme主题样式，可以自行添加以符合你的要求
        // lazyLoad  布尔值false延迟加载
        // lazyFollow  布尔值true当使用分页时，如果跨页浏览，将不加载跳过页面的图片，只加载所要显示页面的图片，如果设置为 false，则会加载跳过页面的图片。这是 lazyLoad 的子选项
        // lazyEffect  布尔值/字符串fade延迟加载图片的显示效果，默认以 400 毫秒淡入，若为 false 则不使用效果
        // autoHeight  布尔值false自动使用高度
        // jsonPath  字符串falseJSON 文件路径
        // jsonSuccess  函数false处理自定义 JSON 格式的函数
        // dragBeforeAnimFinish  布尔值true忽略过度是否完成（只限拖动）
        // mouseDrag  布尔值true关闭/开启鼠标事件
        // touchDrag  布尔值true关闭/开启触摸事件
        // addClassActive  布尔值false给可见的项目加入 “active” 类
        // transitionStyle  字符串false添加 CSS3 过度效果
        // 回调函数

        // 变量 类型 默认值 说明
        // beforeUpdate 函数 false 响应之后的回调函数
        // afterUpdate 函数 false 响应之前的回调函数
        // beforeInit 函数 false 初始化之前的回调函数
        // afterInit 函数 false 初始化之后的回调函数
        // beforeMove 函数 false 移动之前的回调函数
        // afterMove 函数 false 移动之后的回调函数
        // afterAction 函数 false 初始化之后的回调函数
        // startDragging 函数 false 拖动的回调函数
        // afterLazyLoad 函数 false 延迟加载之后的回调函数

        // 自定义事件
        // 事件 说明
        // owl.prev 到上一个
        // owl.next 到下一个
        // owl.play 自动播放，可传递一个参数作为播放速度
        // owl.stop 停止自动播放
        // owl.goTo 跳到第几个
        // owl.jumpTo 不使用动画跳到第几个
	======================================*/
	$("#BookPublish>.container>.slider-container").owlCarousel({
		loop:true,
		autoplay:false,
		autoplayHoverPause:true,
		smartSpeed: 1000,
		autoplayTimeout:4000,
		mouseDrag: true,
		items:4,
		animateIn: 'fadeIn',
		animateOut: 'fadeOut',
		nav:true,
		dots:false,
		navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
		responsive:{
			300: {
                items:1,
            },
            480: {
                items:2,
            },
            768: {
                items:3,
            },
            1170: {
                nav:true,
                items:4,
            },
		}
	});

	/*======================================
	// 鼠标移入移除，对应标签加入样式
	======================================*/
	$('.single-team').on('mouseenter', function(){
		$('.single-team').removeClass('active');
		$(this).addClass('active');
    });
	$('.single-team').on('mouseenter', function(){
        $('.single-team').removeClass('active');
        $(this).addClass('active');
    });

	/*====================================
    // Magnific Popup
    // 官网地址： https://dimsemenov.com/plugins/magnific-popup/documentation.html
    // Github地址：https://github.com/dimsemenov/Magnific-Popup
	======================================*/
	$('.video-play').magnificPopup({
        type: 'video',
    });

	// Portfolio Popup
    var magnifPopup = function () {
		// Portfolio Popup
        $('.zoom').magnificPopup({
            type: 'image',
            removalDelay: 300,
            mainClass: 'mfp-with-zoom',
            gallery: {
                 enabled: true
            },
            zoom: {
					enabled: true, // By default it's false, so don't forget to enable it
					duration: 300, // duration of the effect, in milliseconds
					easing: 'ease-in-out', // CSS transition easing function
					opener: function (openerElement) {
						return openerElement.is('img') ? openerElement : openerElement.find('img');
					}
                }
            });
        };
    magnifPopup();

	/*======================================
	// 动态计数效果
	======================================*/
	$('.counter').counterUp({
		time: 1000
	});


	/*======================================
	// Clients Carousel
	======================================*/
	$(".clients-carousel").owlCarousel({
		loop:true,
		autoplay:true,
		autoplayTimeout:2000,
		smartSpeed: 500,
		margin:15,
		nav:false,
		dots:false,
		items:5,
		navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
		responsive:{
			300: {
                items: 1,
            },
            480: {
                items: 2,
            },
            768: {
                items: 4,
            },
            1170: {
                items: 5,
            },
		}
	});

	/*====================================
	//	页面滚动到指定元素可见位置。 进度条
	======================================*/
    $('.progress .progress-bar').each(function () {
        var $this = $(this);
        var width = $(this).data('percent');
        $this.css({
            'transition': 'width 1s'
        });
        setTimeout(function () {
            $this.appear(function () {
                $this.css('width', width + '%');
            });
        }, 500);
    });
    /*===============================
    // 文字效果
    =================================*/
    $(".slogan, .animated_slogan").Morphext({
        // The [in] animation type. Refer to Animate.css for a list of available animations.
        animation: "flipInX",
        // An array of phrases to rotate are created based on this separator.
        // 类型：string，用于分割句子字符串成数组的符号。可以改变这个符号，例如使用"|"： So Simple | Very Doge | Much Wow | Such Cool。默认值：,
        separator: "|",
        // The delay between the changing of each phrase in milliseconds.
        speed: 2500,
        complete: function () {
            // Called after the entrance animation is executed.
        }
    });
	/*======================================
	// 打字机效果 Typed JS
	======================================*/
	// $(".animated_slogan:first").typed({
	// 	strings: [$(".animated_slogan:first").text()],
	// 	typeSpeed: 60,
	// 	loop: true
	// });
	// $(".animated_slogan:last").typed({
	// 	strings: [$(".animated_slogan:last").text()],
	// 	typeSpeed: 60,
	// 	loop: true
	// });


	/*======================================
	// Social Hover
	======================================*/
	$('.footer-top .social li').on('mouseenter', function(){
		$('.social li').removeClass('active');
		$(this).addClass('active');
    });
	$('.footer-top .social li').on('mouseenter', function(){
        $('.social li').removeClass('active');
        $(this).addClass('active');
    });


	/*======================================
	// 打字机效果 Typed JS
	======================================*/
	$(".info").typed({
		strings: ["沈阳新禾文化传媒有限公司", "沈阳新禾文化传媒有限公司"],
		typeSpeed: 50,
		loop: true
	});

	/*======================================
	// Scrool Up
	======================================*/
	$.scrollUp({
        scrollName: 'scrollUp',      // 元素ID
        scrollDistance: 300,         // Distance from top/bottom before showing element (px)
        scrollFrom: 'top',           // 'top' or 'bottom'
        scrollSpeed: 1000,            // Speed back to top (ms)
        easingType: 'linear',        // Scroll to top easing (see http://easings.net/)
        animation: 'fade',           // Fade, slide, none
        animationSpeed: 200,         // Animation speed (ms)
        scrollTrigger: false,        // Set a custom triggering element. Can be an HTML string or jQuery object
        scrollTarget: false,         // Set a custom target element for scrolling to. Can be element or number
        scrollText: ["<i class='fa fa-angle-up'></i>"], // Text for element, can contain HTML
        scrollTitle: false,          // Set a custom <a> title if required.
        scrollImg: false,            // Set true to use image
        activeOverlay: false,        // Set CSS color to display scrollUp active point, e.g '#00FFFF'
        zIndex: 20000000           // Z-Index for the overlay
    });

    /*======================================
	//  页面局部效果，需要配合animate.css  Wow JS
	======================================*/
	var window_width = $(window).width();
      if(window_width > 767){
            new WOW().init();
		}

	/*====================================
		Extra JS
	======================================*/
	$('.button').on("click", function (e) {
		var anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $(anchor.attr('href')).offset().top - 70
		}, 1000);
		e.preventDefault();
	});

	/*======================================
	// Baidu Map 谷歌地图和百度地图有冲突？
	======================================*/
	// var map = new GMaps({
	// 		el: '.map',
	// 		lat: 23.8103,
	// 		lng: 90.4125,
	// 		scrollwheel: false,
	// 	});
	// 	map.addMarker({
	// 		lat: 23.810332,
	// 		lng: 90.412518,
	// 		title: 'Marker with InfoWindow',
	// 		infoWindow: {
	// 		content: '<p>Welcome to SinheMedia</p>'
	// 	}
    // });
    // 百度地图API功能
    /*
    var baiduMapContent =
    "<h4 style='color: #066ca2;letter-spacing: 1px;'>沈阳新禾文化传媒有限公司</h4>" +
    "<img style='float:right;margin:4px' id='imgDemo' src='./static/logo-stamp.png' width='33' title='沈阳新禾文化传媒有限公司'/>" +
    "<p style='margin:0;line-height:1.8;font-size:13px;'>业务：图书出版、编辑校对，新媒体运营，软件开发，网站建设" +
    "<br/>地址：沈阳市浑南区营盘北街7-2号招商局大厦A座12层 &nbsp; <a href='https://map.baidu.com/poi/%E6%B2%88%E9%98%B3%E6%96%B0%E7%A6%BE%E6%96%87%E5%8C%96%E4%BC%A0%E5%AA%92%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/@13743742.585,5094917.03,14z?uid=b388b3dc4329d39649fd3f8a&ugc_type=3&ugc_ver=1&device_ratio=2&compat=1&querytype=detailConInfo&da_src=shareurl'>查看</a></p>" +
    "</div>";
    var baidumap = new BMap.Map("baidu-map");
    var point = new BMap.Point(123.4603,41.7503);
    //var point = new BMap.Point(123.462613,41.750064);
    var marker = new BMap.Marker(point);
    var infoWindow = new BMap.InfoWindow(baiduMapContent);  // 创建信息窗口对象
    baidumap.centerAndZoom(point, 14);
    baidumap.addOverlay(marker);
    marker.addEventListener("click", function(){
        this.openInfoWindow(infoWindow);
        //图片加载完毕重绘infowindow
        document.getElementById('imgDemo').onload = function (){
            infoWindow.redraw();   //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
        }
    });
    marker.openInfoWindow(infoWindow);
    */
	/*====================================
		Background Video
	======================================*/
	$('.player').mb_YTPlayer();

    });
    /*====================================
        砖石结构， 过滤砖石
    ======================================*/
    $(window).on('load', function() {
        $('.stick-grid').masonry({
            // options
            //itemSelector: '.single-project',
            //singleMode: true,
            //columnWidth: 200
        });
        //custom_js_Sufia();

        if ($.fn.isotope) {
            $(".isotop-active").isotope({
                filter: '*',
            });

                $('.project-nav ul li').on('click', function() {
                $(".project-nav ul li").removeClass("active");
                $(this).addClass("active");

                var selector = $(this).attr('data-filter');
                $(".isotop-active").isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 750,
                        easing: 'easeOutCirc',
                        queue: false,
                    }
                });
                return false;
            });
        }
    });
    /*=====================================
    //  根据标签里面的参数设置，背景图在页面滚动时的移动效果
    ======================================*/
    $(window).stellar({
        responsive: true,
        positionProperty: 'position',
        horizontalOffset: 0,
        verticalOffset: 0,
        horizontalScrolling: false
    });

    /*=====================================
    //  蜂窝里面的图片调整， 根据标签里面的参数设置
    ======================================*/
    var imgList = ['logo-baijia.jpeg', 'logo-dayu.jpg', 'logo-gongzhong.jpeg', 'logo-jianshu.jpg',
                    'logo-toutiao.jpeg', 'logo-weibo.jpeg', 'logo-yidian.jpeg', 'logo-zhihu.jpg',
                    'logo-black-fat.png'
                  ];
    /**
     * 1. 将图片铺入蜂窝， 记录有图片的蜂窝位置存入数组
     * 2. 数组中
     * @param {*} $elements
     * @param {*} imgList
     * @param {*} showImgNum
     * @param {*} showingQueue
     */
    function  showRandomImg ($elements, imgList, showImgNum, showingQueue) {
        var min = 0;
        var max = imgList.length-1;
        if (typeof showImgNum == 'undefined') {
            showImgNum = max;
        }
        max = max > $elements.length ? $elements.length : max;
        max = max > showImgNum ? showImgNum : max;
        var randomNum, flagElementHasImg;
        var nextImgList = [];
        var newImgInfo;

        //parseInt(Math.random()*(max-min+1)+min,10); // 获取随机数
        if (typeof(showingQueue) != 'undefined') {
            //console.info(showingQueue);
            // 1. 移除第一个显示的图片
            var firstImgInfo = showingQueue.shift();
            $elements.eq(firstImgInfo.elementIndex).html('');
            randomNum = parseInt(Math.random()*($elements.length - min)+min,10); // 获取随机数
            while (true) {
                if ($elements.eq(randomNum).find('img').length>0) {
                    randomNum = parseInt(Math.random()*($elements.length - min)+min,10); // 获取随机数
                    continue;
                }
                newImgInfo = {elementIndex:randomNum, img:imgList[0]};
                $elements.eq(randomNum).html('<img style="max-width:100%;" data-length="'+imgList[0]+'" src="./static/'+imgList[0]+'"/>');
                showingQueue.push(newImgInfo);
                nextImgList.push(firstImgInfo.img);
                for (var i=1; i<imgList.length; i++) {
                    nextImgList.push(imgList[i]);
                }
                break;
            }
        } else {
            showingQueue = [];
            while (max > showingQueue.length ) {
                flagElementHasImg = false;
                randomNum = parseInt(Math.random()*($elements.length - min)+min,10); // 获取随机数
                //console.info(max, randomNum);
                for (var j in showingQueue) {
                    if (showingQueue[j].elementIndex == randomNum) {
                        flagElementHasImg = true;
                        break;
                    }
                }
                if (! flagElementHasImg) {
                    $elements.eq(randomNum).html('<img style="max-width:100%;" data-length="'+showingQueue.length+'" src="./static/'+imgList[showingQueue.length]+'"/>');
                    showingQueue.push({elementIndex:randomNum, img:imgList[showingQueue.length]});
                }
            }

            for (var i=showingQueue.length; i < imgList.length; i++) {
                nextImgList.push(imgList[i]);
            }
            for (i=0; i<showingQueue.length;i++) {
                nextImgList.push(imgList[i]);
            }
        }

        //console.info($elements.length, (new Date()).getSeconds());


        setTimeout(showRandomImg, 2000, $elements, nextImgList, showImgNum, showingQueue);
    }
    showRandomImg($('#hexagon-pool .single-hexagon>.hexagon-child>.hexagon-child-child'), imgList);


    /*=====================================
    //  指定标签滚动到用户视角，提示
    ======================================*/
    $('#team').waypoint(function(direction) {
        //alert('Direction example triggered scrolling ' + direction);
    });
    $('#team').waypoint(function() {
        //alert('100 pixels from the top');
    }, { offset: 100 /* 也可以是字符串形式的百分比："25%" */ });
    /*====================================
	// 变换选择框
	======================================*/
    $('select').niceSelect();


	$("#selfmedia> .slider-container").owlCarousel({
		loop:true,
		autoplay:false,
		autoplayHoverPause:true,
		smartSpeed: 1000,
		autoplayTimeout:4000,
		mouseDrag: true,
		items:2,
		animateIn: 'fadeIn',
		animateOut: 'fadeOut',
		nav:true,
		dots:false,
		navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
		responsive:{
			300: {
                items:1,
            },
            480: {
                items:1,
            },
            768: {
                items:1,
            },
            1170: {
                items:1,
            },
		}
	});

	/*====================================
	//	页面加载中效果
	======================================*/
		$(window).on('load', function() {
				$('.loading').fadeOut('slow', function(){
				$(this).remove();
			});
        });


	/*====================================
	//	防止手机浏览器在页面后面加入垃圾广告
	======================================*/
    $(document).scroll(function () {
        $("#last-one-flag").nextAll().remove();
    });

})(jQuery);
