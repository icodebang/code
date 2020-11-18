<!DOCTYPE html>
<html class="no-js" lang="zh-cn">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="description" content="沈阳新禾文化传媒有限公司">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>沈阳新禾文化传媒有限公司</title>
    <link rel="icon" type="image/png" href="./static/favicon.png">

    <!-- Font Awesome CSS -->
    <link rel="stylesheet" href="./static/font-awesome.min.css">
    <!-- Animate CSS -->
    <link rel="stylesheet" href="./static/animate.min.css">
    <!-- Slicknav CSS -->
    <link rel="stylesheet" href="./static/slicknav.min.css">
    <!-- niceselect CSS -->
    <link rel="stylesheet" href="./static/nice-select.css">
    <!-- Owl Carousel CSS -->
    <link rel="stylesheet" href="./static/owl.theme.default.css">
    <link rel="stylesheet" href="./static/owl.carousel.min.css">
    <!-- Magnific Popup CSS -->
    <link rel="stylesheet" href="./static/magnific-popup.css">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="./static/bootstrap.min.css">
    <!-- Sinhe Style CSS -->
    <link rel="stylesheet" href="./static/style.css">
    <link rel="stylesheet" href="./static/default.css">
    <link rel="stylesheet" href="./static/responsive.css">
    <link rel="stylesheet" href="./static/blue.css" id="theme-switch">
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
		  <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
		  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
		<![endif]-->

    <!-- Jquery JS -->
    <script type="text/javascript" src="./static/jquery.min.js"></script>
<script type="text/javascript">

	var iScale = 1;
	iScale = iScale / window.devicePixelRatio;

	document.write('<meta name="viewport" content="height=device-height,width=device-width,initial-scale='+iScale+',minimum-scale='+iScale+',maximum-scale='+iScale+',user-scalable=no" />')

	var iWidth = document.documentElement.clientWidth;
	document.getElementsByTagName('html')[0].style.fontSize = iWidth / 1200 + 'px';
	function Wonresize(){
		setTimeout(function(){
			var iWidth = document.documentElement.clientWidth;
			document.getElementsByTagName('html')[0].style.fontSize = iWidth / 1200 + 'px';
		},200);
	 }
	window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", Wonresize, false);
</script>
</head>
<body onload="typeof(RefreshOnce)==='undefined' ? null : RefreshOnce();" orient="portrait">
    <!-- loadingPage -->
    <div class="loading">
        <div class="l-inner">
            <div class="k-spinner">
                <i class="k-bubble k-bubble-1"></i>
                <i class="k-bubble k-bubble-2"></i>
                <i class="k-bubble k-bubble-3"></i>
                <i class="k-bubble k-bubble-4"></i>
            </div>
        </div>
    </div>
    <!--/ End loadingPage -->

    <!-- Theme switcher -->
    <div class="theme-switch">
        <div class="icon inOut"><i class="fa fa-cog fa-spin"></i></div>
        <h4>Choose Color</h4>
        <span class="js-theme-switch blue" data-theme-name="blue"></span>
        <span class="js-theme-switch green" data-theme-name="green"></span>
    </div>
    <!--/ ENd Theme switcher -->
    <!-- Start Header -->
    <header id="header">
        <div class="container">
            <div class="row">
                <div class="col-md-4 col-sm-12 col-xs-12">
                    <!-- Logo -->
                    <img class="black-logo" src="./static/logo-black-stamp.png" style="float:left" />
                    <img class="blue-logo" src="./static/logo-stamp.png" style="float:left" />
                    <div class="logo">
                        <a href="./">沈阳<span>新禾</span>文化传媒有限公司</a>
                    </div>
                    <!--/ End Logo -->
                </div>
                <div class="col-md-8 col-sm-12 col-xs-12">
                    <div class="nav-area">
                        <!-- Main Menu -->
                        <nav class="mainmenu">
                            <div class="mobile-nav"><!-- 空标签， 存放移动端菜单 --></div>
                            <div class="collapse navbar-collapse">
                                <ul class="nav navbar-nav menu">
                                    <li class="active"><a href="./#slider">首页</a></li>
                                    <li class=""><a href="./#BookPublish">图书</a></li>
                                    <li class=""><a href="./#newmedia">新媒体</a></li>
                                    <li class=""><a href="./#software">软件</a></li>
                                    <li class=""><a href="./#website">网站</a></li>
                                    <!-- <li class=""><a href="./#movie">影视</a></li> -->
                                    <li class=""><a href="./#contact">联系</a></li>
                                </ul>
                            </div>
                        </nav>
                        <!--/ End Main Menu -->
                    </div>
                </div>

            </div>
        </div>
    </header>
    <!--/ End Header -->

    <!-- Start Slider -->
    <section id="slider">
        <div class="lunhuan">
            <div id="lunhuanback">
                <?php
                $loopPlayList = array(
                    '<p style="background-image: url(./static/artisan.jpg) ; opacity: 1;">
                        <span class="animated_slogan">怀匠心，造精品</span><span class="lunhuan-fixed-height">&nbsp;</span>
                    </p>',
                    '<p style="background-image: url(./static/sun_sea.jpg) ; opacity: 0;">
                        <span class="animated_slogan">立诚信，谋共赢</span><span class="lunhuan-fixed-height">&nbsp;</span>
                    </p>',
                );
                for ($i = 0; $i <= count($loopPlayList) - 1; $i++) {
                    echo $loopPlayList[$i];
                }
                ?>
            </div>
            <div class="lunhuan_main">
                <!-- 轮换中间区域 -->
                <div class="lunhuancenter">
                    <ul id="lunbonum">
                        <li class="lunboone"></li>
                        <li class=""></li>
                    </ul>
                    <!-- 轮播的页码  结束 -->
                </div>
                <!-- 轮换中间区域结束 -->
            </div>
        </div>
        <script type="text/javascript">
            /**
             * 轮播功能
             * @param containerSelector 包含待轮播内容的容器选择
             * @param slideSelector
             */
            function loopPlay(containerSelector, slideSelector, controlSelector) {
                var ali = $(controlSelector);
                var aPage = $(containerSelector);
                var aslide_img = $('.lunhuancenter > div');
                var iNow = 0;
                //首屏banner效果图
                var totalShow = $(containerSelector).length;
                var totalControl = $(controlSelector).length;
                if (totalShow == 0 || (totalShow == 1 && totalControl == 0)) {
                    return;
                }
                if (totalShow > totalControl) {
                    for (var index = totalShow - 1; index >= totalControl; index--) {
                        $($(containerSelector)[index]).remove();
                    }
                } else if (totalShow < totalControl) {
                    for (var index = totalControl - 1; index >= totalShow; index--) {
                        $($(controlSelector)[index]).remove();
                    }
                }
                totalShow = $(containerSelector).length;
                // 只有一个待播放，直接拿掉控制单元
                if (totalShow == 1 && $(controlSelector).length > 0) {
                    $($(controlSelector)[0]).remove();
                }
                // 将第一个可见
                aPage.eq(0).css({
                    opacity: 1
                });

                ali.each(function(index) {
                    $(this).mouseenter(function() {
                        slide(index);
                    })
                });

                function slide(index) {
                    iNow = index;
                    ali.eq(index).addClass('lunboone').siblings().removeClass();
                    aPage.eq(index).siblings().stop().animate({
                        opacity: 0
                    }, 1000);
                    aPage.eq(index).stop().animate({
                        opacity: 1
                    }, 1000);
                    aslide_img.eq(index).stop().animate({
                        opacity: 1,
                        top: 0
                    }, 1000).siblings('div').stop().animate({
                        opacity: 0,
                        top: 0
                    }, 1000);
                }

                function autoRun() {
                    iNow++;
                    if (iNow == ali.length) {
                        iNow = 0;
                    }
                    slide(iNow);
                }

                var timer = setInterval(autoRun, 5000);
                // 鼠标滑过控制单元，切换
                ali.hover(
                    function() {
                        clearInterval(timer);
                    },
                    function() {
                        timer = setInterval(autoRun, 5000);
                    }
                );

            };
            $(function(containerSelector, slideSelector, controlSelector) {
                loopPlay('#lunhuanback p', slideSelector, '#lunbonum li');
            });

            (function(window) {
                function Dotline(option) {
                    this.opt = this.extend({
                        dom: 'J_dotLine', //画布id
                        cw: 1000, //画布宽
                        ch: 500, //画布高
                        ds: 100, //点的个数
                        r: 0.5, //圆点半径
                        cl: '#000', //颜色
                        dis: 100 //触发连线的距离
                    }, option);
                    this.c = document.getElementById(this.opt.dom); //canvas元素id
                    this.ctx = this.c.getContext('2d');
                    this.c.width = this.opt.cw; //canvas宽
                    this.c.height = this.opt.ch; //canvas高
                    this.dotSum = this.opt.ds; //点的数量
                    this.radius = this.opt.r; //圆点的半径
                    this.disMax = this.opt.dis * this.opt.dis; //点与点触发连线的间距
                    this.color = this.color2rgb(this.opt.cl); //设置粒子线颜色
                    this.dots = [];
                    //requestAnimationFrame控制canvas动画
                    var RAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
                        window.setTimeout(callback, 1000 / 60);
                    };
                    var _self = this;
                    //增加鼠标效果
                    var mousedot = {
                        x: null,
                        y: null,
                        label: 'mouse'
                    };
                    this.c.onmousemove = function(e) {
                        var e = e || window.event;
                        mousedot.x = e.clientX - _self.c.offsetLeft;
                        mousedot.y = e.clientY - _self.c.offsetTop;
                    };
                    this.c.onmouseout = function(e) {
                        mousedot.x = null;
                        mousedot.y = null;
                    }
                    //控制动画
                    this.animate = function() {
                        _self.ctx.clearRect(0, 0, _self.c.width, _self.c.height);
                        _self.drawLine([mousedot].concat(_self.dots));
                        RAF(_self.animate);
                    };
                }
                //合并配置项，es6直接使用obj.assign();
                Dotline.prototype.extend = function(o, e) {
                    for (var key in e) {
                        if (e[key]) {
                            o[key] = e[key]
                        }
                    }
                    return o;
                };
                //设置线条颜色
                Dotline.prototype.color2rgb = function(colorStr) {
                    var red = null,
                        green = null,
                        blue = null;
                    var cstr = colorStr.toLowerCase(); //变小写
                    var cReg = /^#[0-9a-fA-F]{3,6}$/; //确定是16进制颜色码
                    if (cstr && cReg.test(cstr)) {
                        if (cstr.length == 4) {
                            var cstrnew = '#';
                            for (var i = 1; i < 4; i++) {
                                cstrnew += cstr.slice(i, i + 1).concat(cstr.slice(i, i + 1));
                            }
                            cstr = cstrnew;
                        }
                        red = parseInt('0x' + cstr.slice(1, 3));
                        green = parseInt('0x' + cstr.slice(3, 5));
                        blue = parseInt('0x' + cstr.slice(5, 7));
                    }
                    return red + ',' + green + ',' + blue;
                }
                //画点
                Dotline.prototype.addDots = function() {
                    var dot;
                    for (var i = 0; i < this.dotSum; i++) { //参数
                        dot = {
                            x: Math.floor(Math.random() * this.c.width) - this.radius,
                            y: Math.floor(Math.random() * this.c.height) - this.radius,
                            ax: (Math.random() * 2 - 1) / 1.5,
                            ay: (Math.random() * 2 - 1) / 1.5
                        }
                        this.dots.push(dot);
                    }
                };
                //点运动
                Dotline.prototype.move = function(dot) {
                    dot.x += dot.ax;
                    dot.y += dot.ay;
                    //点碰到边缘返回
                    dot.ax *= (dot.x > (this.c.width - this.radius) || dot.x < this.radius) ? -1 : 1;
                    dot.ay *= (dot.y > (this.c.height - this.radius) || dot.y < this.radius) ? -1 : 1;
                    //绘制点
                    this.ctx.beginPath();
                    this.ctx.arc(dot.x, dot.y, this.radius, 0, Math.PI * 2, true);
                    this.ctx.stroke();
                };
                //点之间画线
                Dotline.prototype.drawLine = function(dots) {
                    var nowDot;
                    var _that = this;
                    //自己的思路：遍历两次所有的点，比较点之间的距离，函数的触发放在animate里
                    this.dots.forEach(function(dot) {

                        _that.move(dot);
                        for (var j = 0; j < dots.length; j++) {
                            nowDot = dots[j];
                            if (nowDot === dot || nowDot.x === null || nowDot.y === null) continue; //continue跳出当前循环开始新的循环
                            var dx = dot.x - nowDot.x, //别的点坐标减当前点坐标
                                dy = dot.y - nowDot.y;
                            var dc = dx * dx + dy * dy;
                            if (Math.sqrt(dc) > Math.sqrt(_that.disMax)) continue;
                            // 如果是鼠标，则让粒子向鼠标的位置移动
                            if (nowDot.label && Math.sqrt(dc) > Math.sqrt(_that.disMax) / 2) {
                                dot.x -= dx * 0.02;
                                dot.y -= dy * 0.02;
                            }
                            var ratio;
                            ratio = (_that.disMax - dc) / _that.disMax;
                            _that.ctx.beginPath();
                            _that.ctx.lineWidth = ratio / 2;
                            _that.ctx.strokeStyle = 'rgba(' + _that.color + ',' + parseFloat(ratio + 0.1).toFixed(1) + ')';
                            _that.ctx.moveTo(dot.x, dot.y);
                            _that.ctx.lineTo(nowDot.x, nowDot.y);
                            _that.ctx.stroke(); //不描边看不出效果

                            //dots.splice(dots.indexOf(dot), 1);
                        }
                    });
                };
                //开始动画
                Dotline.prototype.start = function() {
                    var _that = this;
                    this.addDots();
                    setTimeout(function() {
                        _that.animate();
                    }, 100);
                }
                window.Dotline = Dotline;
            }(window));
            //调用
            //window.onload = function() {
            if ($('#J_dotLine').length) {
                var dotline = new Dotline({
                    dom: 'J_dotLine', //画布id
                    cw: 1500, //画布宽
                    ch: 300, //画布高
                    ds: 30, //点的个数
                    r: 2, //圆点半径
                    cl: '#FFFFFF', //粒子线颜色
                    dis: 100 //触发连线的距离
                }).start();
            }
            //}
        </script>
    </section>
    <!--/ End Slider -->

    <!-- Start BookPublish -->
    <section id="BookPublish" class="section">
        <div class="container">
            <div class="row">
                <div class="col-md-12 col-sm-12 col-xs-12 wow fadeIn" style="visibility: visible; animation-name: fadeIn;">
                    <div class="section-title center">
                        <h2>图书出版</h2>
                        <p>新禾始终坚持“专业、高效、优质、诚信”的服务宗旨，不断赢得客户的信赖和口碑，一站式出版助力客户出书省心、省力、省钱！
                           在选题申报，排版设计，编辑校对，书号申请，印刷装订等图书出版的各项业务中，公司员工均具有杰出的职业技能，为客户提供高效优质的服务。
                           公司从图书出版的专业技术到图书内容的语言文字两个方面进行严格把关，致力于传播优质文化，努力实现推广社会文明的梦想和价值。
                        </p>
                    </div>
                </div>
            </div>
            <div class="row slider-container">
                <!-- Single Service -->
                <div class="col-md-12 col-sm-12 col-xs-12 wow fadeIn" data-wow-delay="0.4s" style="visibility: visible; animation-delay: 0.4s; animation-name: fadeIn;">
                    <div class="single-service">
                        <i class="fa fa-check"></i>
                        <h2>选题申报</h2>
                        <p>对图书选题进行审核，判断是否符合选题策划范围。对于范围内的，不很规范的选题，提出修改意见或指导；对于不在范围内的选题，直接退稿处理
                        </p>
                    </div>
                </div>
                <!--/ End Single Service -->
                <!-- Single Service -->
                <div class="col-md-12 col-sm-12 col-xs-12 wow fadeIn" data-wow-delay="0.6s" style="visibility: visible; animation-delay: 0.6s; animation-name: fadeIn;">
                    <div class="single-service">
                        <i class="fa fa-cubes"></i>
                        <h2>排版设计</h2>
                        <p>在留白、字体、分栏、版式、排版、色块、图片布局等多方面对书稿进行版面编排和结构设计，保障图书符合读者的阅读习惯和审美标准</p>
                    </div>
                </div>
                <!--/ End Single Service -->
                <!-- Single Service -->
                <div class="col-md-12 col-sm-12 col-xs-12 wow fadeIn" data-wow-delay="0.8s" style="visibility: visible; animation-delay: 0.8s; animation-name: fadeIn;">
                    <div class="single-service">
                        <i class="fa fa-edit"></i>
                        <h2>编辑校对</h2>
                        <p>对图书进行三审三校：对书稿进行通读，矫正润色，修改有错误的内容，同时审查是否有违禁内容出现，以保证图书的质量和规范</p>
                    </div>
                </div>
                <!--/ End Single Service -->
                <!-- Single Service -->
                <div class="col-md-12 col-sm-12 col-xs-12 wow fadeIn" data-wow-delay="1s" style="visibility: visible; animation-delay: 1s; animation-name: fadeIn;">
                    <div class="single-service">
                        <i class="fa fa-book"></i>
                        <h2>申请书号</h2>
                        <p>协助准备好申请书号的材料，递交出版社进行受理，并向新闻出版总署申请cip号，完成备案</p>
                    </div>
                </div>
                <!--/ End Single Service -->
                <!-- Single Service -->
                <div class="col-md-12 col-sm-12 col-xs-12 wow fadeIn" data-wow-delay="1s" style="visibility: visible; animation-delay: 1s; animation-name: fadeIn;">
                    <div class="single-service">
                        <i class="fa fa-tasks"></i>
                        <h2>印刷装订</h2>
                        <p>同印刷厂沟通相关设计封面和版面内容所需要选择的纸质、装帧等标准，来完成图书的印刷并装订成书过程</p>
                    </div>
                </div>
                <!--/ End Single Service -->
            </div>
        </div>
    </section>
    <!--/ End BookPublish -->

    <!-- Start newmedia -->
    <section id="newmedia" class="section">
        <div class="container">
            <div class="row">
                <div class="col-md-12 col-sm-12 col-xs-12 wow fadeIn" style="visibility: visible; animation-name: fadeIn;">
                    <div class="section-title center">
                        <h2>新媒体</h2>
                        <p>新媒体以数字信息技术为基础，将传统书稿融合互动传播功能，成为具有创新形态的媒体，诸如：网站、电子书、微博、公众号、自媒体等。
                            公司以文字功底深厚的编辑和校对队伍作支撑，为客户提供电子书制作、软文撰写、网站更新、自媒体账号维护服务。
                        </p>
                    </div>
                </div>
            </div>
            <div class="row">
                <!-- About Image -->
                <div class="col-md-5 col-sm-12 col-xs-12 wow slideInLeft" style="visibility: visible; animation-name: slideInLeft;">
                    <div class="about-main">
                        <div id="hexagon-pool">
                            <div class="row hexagon-container odd">
                                <div class="single-hexagon">
                                    <div class="hexagon-child">
                                        <div class="hexagon-child-child"></div>
                                    </div>
                                </div>
                                <div class="single-hexagon">
                                    <div class="hexagon-child">
                                        <div class="hexagon-child-child"></div>
                                    </div>
                                </div>
                                <div class="single-hexagon">
                                    <div class="hexagon-child">
                                        <div class="hexagon-child-child"></div>
                                    </div>
                                </div>
                                <div class="single-hexagon">
                                    <div class="hexagon-child">
                                        <div class="hexagon-child-child"></div>
                                    </div>
                                </div>
                                <div class="single-hexagon">
                                    <div class="hexagon-child">
                                        <div class="hexagon-child-child"></div>
                                    </div>
                                </div>
                                <div class="single-hexagon">
                                    <div class="hexagon-child">
                                        <div class="hexagon-child-child"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="row hexagon-container even">
                                <div class="single-hexagon">
                                    <div class="hexagon-child">
                                        <div class="hexagon-child-child"></div>
                                    </div>
                                </div>
                                <div class="single-hexagon">
                                    <div class="hexagon-child">
                                        <div class="hexagon-child-child"></div>
                                    </div>
                                </div>
                                <div class="single-hexagon">
                                    <div class="hexagon-child">
                                        <div class="hexagon-child-child"></div>
                                    </div>
                                </div>
                                <div class="single-hexagon">
                                    <div class="hexagon-child">
                                        <div class="hexagon-child-child"></div>
                                    </div>
                                </div>
                                <div class="single-hexagon">
                                    <div class="hexagon-child">
                                        <div class="hexagon-child-child"></div>
                                    </div>
                                </div>
                                <div class="single-hexagon">
                                    <div class="hexagon-child">
                                        <div class="hexagon-child-child"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="row hexagon-container odd">
                                <div class="single-hexagon">
                                    <div class="hexagon-child">
                                        <div class="hexagon-child-child"></div>
                                    </div>
                                </div>
                                <div class="single-hexagon">
                                    <div class="hexagon-child">
                                        <div class="hexagon-child-child"></div>
                                    </div>
                                </div>
                                <div class="single-hexagon">
                                    <div class="hexagon-child">
                                        <div class="hexagon-child-child"></div>
                                    </div>
                                </div>
                                <div class="single-hexagon">
                                    <div class="hexagon-child">
                                        <div class="hexagon-child-child"></div>
                                    </div>
                                </div>
                                <div class="single-hexagon">
                                    <div class="hexagon-child">
                                        <div class="hexagon-child-child"></div>
                                    </div>
                                </div>
                                <div class="single-hexagon">
                                    <div class="hexagon-child">
                                        <div class="hexagon-child-child"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="row hexagon-container even">
                                <div class="single-hexagon">
                                    <div class="hexagon-child">
                                        <div class="hexagon-child-child"></div>
                                    </div>
                                </div>
                                <div class="single-hexagon">
                                    <div class="hexagon-child">
                                        <div class="hexagon-child-child"></div>
                                    </div>
                                </div>
                                <div class="single-hexagon">
                                    <div class="hexagon-child">
                                        <div class="hexagon-child-child"></div>
                                    </div>
                                </div>
                                <div class="single-hexagon">
                                    <div class="hexagon-child">
                                        <div class="hexagon-child-child"></div>
                                    </div>
                                </div>
                                <div class="single-hexagon">
                                    <div class="hexagon-child">
                                        <div class="hexagon-child-child"></div>
                                    </div>
                                </div>
                                <div class="single-hexagon">
                                    <div class="hexagon-child">
                                        <div class="hexagon-child-child"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="row hexagon-container odd">
                                <div class="single-hexagon">
                                    <div class="hexagon-child">
                                        <div class="hexagon-child-child"></div>
                                    </div>
                                </div>
                                <div class="single-hexagon">
                                    <div class="hexagon-child">
                                        <div class="hexagon-child-child"></div>
                                    </div>
                                </div>
                                <div class="single-hexagon">
                                    <div class="hexagon-child">
                                        <div class="hexagon-child-child"></div>
                                    </div>
                                </div>
                                <div class="single-hexagon">
                                    <div class="hexagon-child">
                                        <div class="hexagon-child-child"></div>
                                    </div>
                                </div>
                                <div class="single-hexagon">
                                    <div class="hexagon-child">
                                        <div class="hexagon-child-child"></div>
                                    </div>
                                </div>
                                <div class="single-hexagon">
                                    <div class="hexagon-child">
                                        <div class="hexagon-child-child"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--/ End About Image -->
                <div class="col-md-7 col-sm-12 col-xs-12 wow fadeIn" data-wow-delay="1s" style="visibility: visible; animation-delay: 1s; animation-name: fadeIn;">
                    <!-- About Tab -->
                    <div class="tabs-main">
                        <!-- Tab Nav -->
                        <ul class="nav nav-tabs" role="tablist">
                            <li role="presentation" class="active"><a href="./#ebook" data-toggle="tab">电子期刊</a></li>
                            <li role="presentation"><a href="./#selfmedia" data-toggle="tab">自媒体</a></li>
                        </ul>
                        <!--/ End Tab Nav -->
                        <!-- Tab Content -->
                        <div class="tab-content">
                            <div role="tabpanel" class="tab-pane fade in active" id="ebook">
                                <p>将文字、图片、声音、影像等讯息内容数字化。具有美观漂亮，功能多，可实现章节目录，翻页滚屏，排版整齐，内容可搜寻，字体大小及字型可改变等优点</p>
                                <div class="row">
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <!-- Single Tab -->
                                        <div class="single-tab">
                                            <i class="fa fa-eye"></i>
                                            <h4>阅读舒适</h4>
                                            <p>设计精美，有多媒体功能，可搜寻内容，改变字体大小及字型</p>
                                        </div>
                                        <!--/ End Single Tab -->
                                    </div>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <!-- Single Tab -->
                                        <div class="single-tab">
                                            <i class="fa fa-support"></i>
                                            <h4>成本低</h4>
                                            <p>图书制作成本低，价格便宜，自由复制零成本增加成书数量</p>
                                        </div>
                                        <!--/ End Single Tab -->
                                    </div>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <!-- Single Tab -->
                                        <div class="single-tab">
                                            <i class="fa fa-edit"></i>
                                            <h4>发行快</h4>
                                            <p>可以基于互联网将图书全球同步发行，零运输成本</p>
                                        </div>
                                        <!--/ End Single Tab -->
                                    </div>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <!-- Single Tab -->
                                        <div class="single-tab">
                                            <i class="fa fa-rocket"></i>
                                            <h4>易保存</h4>
                                            <p>可保存在各种电子存储空间，不受体积限制，不折旧，不污损</p>
                                        </div>
                                        <!--/ End Single Tab -->
                                    </div>
                                </div>
                            </div>
                            <div role="tabpanel" class="tab-pane fade in" id="selfmedia">
                                <div class="">
                                    <p>在素材搜集、内容创作、起标题、排版、配图、PS制图、检查校对等各个方面，公司为客户提供文本的“组稿”“编辑”“校对”“润色”等加工修改服务，让自媒体内容呈现的更出色。</p>
                                    <div class="row  slider-container">
                                        <div class="col-md-6 col-sm-6 col-xs-12">
                                            <!-- Single Tab -->
                                            <div class="single-tab">
                                                <i class="fa fa-support"></i>
                                                <h4>素材搜集</h4>
                                                <p>
                            搜集到的未经整理加工的、感性的、分散的原始材料，并不能都写入文章之中。经过筛选、提炼、加工和改造，才能应用到文章中</p>
                                            </div>
                                            <!--/ End Single Tab -->
                                        </div>
                                        <div class="col-md-6 col-sm-6 col-xs-12">
                                            <!-- Single Tab -->
                                            <div class="single-tab">
                                                <i class="fa fa-rocket"></i>
                                                <h4>起标题</h4>
                                                <p>
                            标题是一篇文章的眼睛，一个好的标题，可以提高文章的阅读量。标题不够吸引眼球，不够突出内容，很多人都会放弃读文章</p>
                                            </div>
                                            <!--/ End Single Tab -->
                                        </div>
                                        <div class="col-md-6 col-sm-6 col-xs-12">
                                            <!-- Single Tab -->
                                            <div class="single-tab">
                                                <i class="fa fa-edit"></i>
                                                <h4>内容创作</h4>
                                                <p>
                            内容创作是一篇自媒体文章最重要的事情。表达的主题要在内容中体现；内容要努力拉近和读者的距离，努力赢得读者的共鸣</p>
                                            </div>
                                            <!--/ End Single Tab -->
                                        </div>
                                        <div class="col-md-6 col-sm-6 col-xs-12">
                                            <!-- Single Tab -->
                                            <div class="single-tab">
                                                <i class="fa fa-rocket"></i>
                                                <h4>排版</h4>
                                                <p>
                            段落和内容格式的优秀排版，能够贴合读者的阅读习惯，阅读起来更流畅，更能让读者更容易理解文章里我们要表达的主题</p>
                                            </div>
                                            <!--/ End Single Tab -->
                                        </div>
                                        <div class="col-md-6 col-sm-6 col-xs-12">
                                            <!-- Single Tab -->
                                            <div class="single-tab">
                                                <i class="fa fa-rocket"></i>
                                                <h4>配图</h4>
                                                <p>
                                                图文结合是现在普遍的自媒体文章展现形式。图与文的结合，能让读者更好的理解文章</p>
                                            </div>
                                            <!--/ End Single Tab -->
                                        </div>
                                        <div class="col-md-6 col-sm-6 col-xs-12">
                                            <!-- Single Tab -->
                                            <div class="single-tab">
                                                <i class="fa fa-rocket"></i>
                                                <h4>检查校对</h4>
                                                <p>文章中的错别字和错误的用词会让读者产生疑惑的心理。专业的检查校对完全消除了这个潜在的危机</p>
                                            </div>
                                            <!--/ End Single Tab -->
                                        </div>
                                    </div>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <!--/ End Tab Content -->
                    </div>
                    <!--/ End About Tab -->
                </div>
            </div>
        </div>
    </section>
    <!--/ End newmedia -->

    <!-- Start software -->
    <section id="software" class="section">
        <div class="container">
            <div class="row">
                <div class="col-md-12 col-sm-12 col-xs-12  wow fadeIn" style="visibility: visible; animation-name: fadeIn;">
                    <div class="section-title center">
                        <h2>软件开发</h2>
                        <p>公司依靠先进的技术、创新的意识、出众的能力，为用户设计完整的技术解决方案，提供优质的系统支持服务，助力中小企业进行互联网+ 转型与升级，提高企业办公效率，赋能企业高效发展</p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="blog">
                        <div class="col-md-3 col-sm-6 col-xs-6 wow fadeInUp" data-wow-delay="0.6s" style="visibility: visible; animation-delay: 0.6s; animation-name: fadeInUp;">
                            <!-- Single blog -->
                            <div class="single-blog">
                                <div class="blog-head">
                                    <img src="./static/app_developement.jpg" alt="#">
                                    <!-- <a href="#" class="link"><i class="fa fa-link"></i></a> -->
                                </div>
                                <div class="blog-content">
                                    <h2>APP开发</h2>
                                    <p>公司拥有IOS/安卓APP应用定制与开发方面丰富经验的团队，能够为用户提供完善的原生app开发和混合app开发技术方案，解决用户对于移动端开发的不同需求</p>
                                </div>
                            </div>
                            <!--/ End Single blog -->
                        </div>
                        <div class="col-md-3 col-sm-6 col-xs-6 wow fadeInUp" data-wow-delay="0.8s" style="visibility: visible; animation-delay: 0.8s; animation-name: fadeInUp;">
                            <!-- Single blog -->
                            <div class="single-blog">
                                <div class="blog-head">
                                    <img src="./static/wechat_public.jpg" alt="#">
                                    <!-- <a href="#" class="link"><i class="fa fa-link"></i></a> -->
                                </div>
                                <div class="blog-content">
                                    <h2>公众号</h2>
                                    <p>公众号开发提供个性化定制服务，涵盖微网站、微商城等，为企业拓宽微信营销渠道，提升品牌价值, 形成主流的线上线下微信互动营销方式</p>
                                </div>
                            </div>
                            <!--/ End Single blog -->
                        </div>
                        <div class="col-md-3 col-sm-6 col-xs-6 wow fadeInUp" data-wow-delay="1s" style="visibility: visible; animation-delay: 1s; animation-name: fadeInUp;">
                            <!-- Single blog -->
                            <div class="single-blog">
                                <div class="blog-head">
                                    <img src="./static/wechat_program.jpeg" alt="#">
                                    <!-- <a href="#" class="link"><i class="fa fa-link"></i></a> -->
                                </div>
                                <div class="blog-content">
                                    <h2>微信小程序</h2>
                                    <p>运行在微信客户端，用户扫一扫或者搜一下即可打开应用。适合生活服务类线下商铺以及非刚需低频应用的转换; 可以实现公众号与微信小程序之间相互跳转。</p>
                                </div>
                            </div>
                            <!--/ End Single blog -->
                        </div>
                        <div class="col-md-3 col-sm-6 col-xs-6 wow fadeInUp" data-wow-delay="1.2s" style="visibility: visible; animation-delay: 1.2s; animation-name: fadeInUp;">
                            <!-- Single blog -->
                            <div class="single-blog">
                                <div class="blog-head">
                                    <img src="./static/alipay_program.jpg" alt="#">
                                    <!-- <a href="#" class="link"><i class="fa fa-link"></i></a> -->
                                </div>
                                <div class="blog-content">
                                    <h2>支付宝小程序</h2>
                                    <div class="meta">
                                    </div>
                                    <p>支付宝小程序是一种全新的开放模式,它运行在支付宝客户端,可以被便捷地获取和传播,为终端用户提供更优的用户体验。通过小程序,商家可以为用户提供多样化便捷服务。</p>
                                </div>
                            </div>
                            <!--/ End Single blog -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!--/ End software -->
    <!-- Start website -->
    <section id="website" class="section">
        <div class="container">
            <div class="row">
                <div class="col-md-12 col-sm-12 col-xs-12 wow fadeIn" style="visibility: visible; animation-name: fadeIn;">
                    <div class="section-title center">
                        <h2>网站开发</h2>
                        <p>网站是企业在互联网上进行网络营销和形象宣传的平台，相当于企业的网络名片，不但对企业的形象是一个良好的宣传，更能辅助企业的销售，通过网络直接帮助企业实现产品的销售，保持和客户的亲密联系。
                        </p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-sm-12 col-xs-12 wow fadeIn" style="visibility: visible; animation-name: fadeIn;">
                    <!-- Info Main -->
                    <div class="info-main">
                        <ul class="info-list wow slideInLeft">
                            <li class=" wow fadeIn" data-wow-delay="0.2s" style="visibility: visible; animation-delay: 0.2s; animation-name: fadeIn;"><i class="fa fa-check"></i>提升形象 —— 通过网站展示企业风采、精神气貌、产品特色等，可以有效的树立企业形象，提高企业知名度，提升企业形象及品牌形象</li>
                            <li class=" wow fadeIn" data-wow-delay="0.6s" style="visibility: visible; animation-delay: 0.6s; animation-name: fadeIn;"><i class="fa fa-check"></i>内容丰富 —— 可以把任何想让人们知道的东西放入网站，如公司简介、公司业绩、产品的外观、功能及其使用方法等，都可以展示于企业网站上</li>
                            <li class=" wow fadeIn" data-wow-delay="0.8s" style="visibility: visible; animation-delay: 0.8s; animation-name: fadeIn;"><i class="fa fa-check"></i>方便客户 —— 客户想知道企业有什么新产品，新服务，或服务有什么变化的时候，甚至只是想知道企业有什么新闻资讯，他们就会习惯性地进入企业网站</li>
                            <li class=" wow fadeIn" data-wow-delay="1.2s" style="visibility: visible; animation-delay: 1.2s; animation-name: fadeIn;"><i class="fa fa-check"></i>营销成本低 —— 线上宣传、推广，营销成本更低。通过公司网站方式进行营销推广，效果更直接，也是众多营销方式中性价比最高的</li>
                        </ul>
                    </div>
                    <!--/ End Info Main -->
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                    <!-- website Main -->
                    <div class="website-main  wow slideInRight">
                        <img src="./static/website_developement.png"/>
                    </div>
                    <!--/ End website Main -->
                </div>
            </div>
        </div>
    </section>
    <!--/ End website -->

    <!-- Contact Us -->
    <section id="contact" class="section">
            <div class="row">
                <div class="col-md-12 col-sm-12 col-xs-12 wow fadeIn" style="visibility: visible; animation-name: fadeIn;">
                    <div class="section-title center">
                        <h2>期待您的光临</h2>
                        <p></p>
                    </div>
                </div>
            </div>
            <!--  Map -->
            <div class="row map wow fadeInUp">
                <div id="baidu-map" class="map col-md-12 col-sm-12 col-xs-12 "><a target="blank" href="https://map.baidu.com/poi/%E6%B2%88%E9%98%B3%E6%96%B0%E7%A6%BE%E6%96%87%E5%8C%96%E4%BC%A0%E5%AA%92%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/@13743742.585,5094917.03,14z?uid=b388b3dc4329d39649fd3f8a&ugc_type=3&ugc_ver=1&device_ratio=2&compat=1&querytype=detailConInfo&da_src=shareurl"></a></div>
            </div>
    </section>
    <!--/ End Clients Us -->

    <!-- Start Footer -->
    <footer id="footer" class="wow fadeIn" style="visibility: visible; animation-name: fadeIn;">
        <!-- Footer Top -->
        <div class="footer-top">
            <div class="container">
                <div class="row">
                    <!-- Single Widget -->
                    <div class="col-md-5 col-sm-5 col-xs-12 ">
                        <div class="single-widget about">
                            <div class="footer-logo">
                                <img src="static/logo-stamp.png" alt="#"><h4 class="slogan">怀匠心，造精品|立诚信，谋共赢|怀匠心，造精品；立诚信，谋共赢</h4>
                            </div>
                            <p>新禾员工怀揣匠心，努力将每个经手项目打造成精品。新禾期待与每个客户谋求共同发展，共创佳绩！</p>
                        </div>
                    </div>
                    <!--/ End Single Widget -->
                    <!-- Single Widget -->
                    <div class="col-md-4 col-sm-4 col-xs-12">
                        <div class="single-widget contact">
                            <h4>联系方式</h4>
                            <ul class="list">
                                <li><i class="fa fa-map-marker"></i>地址: 沈阳市浑南区招商局大厦A座12层</li>
                                <li><i class="fa fa-phone"></i>电话: +8613811998433 </li>
                                <li><i class="fa fa-envelope"></i>邮箱: isinho@126.com</li>
                            </ul>
                        </div>
                    </div>
                    <!--/ End Single Widget -->
                    <!-- Single Widget -->
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <div class="single-widget">
                            <h4 class="wow fadeIn">快速导航</h4>
                            <ul class="social-icon">
                                <li class="active"><a href="#slider"><i class="fa fa-home"></i>首页</a></li>
                                <li class="active"><a href="#BookPublish"><i class="fa fa-book"></i>图书</a></li>
                                <li class="active"><a href="#newmedia"><i class="fa fa-link"></i>新媒体</a></li>
                                <li class="active"><a href="#software"><i class="fa fa-mobile"></i>软件</a></li>
                                <li class="active"><a href="#website"><i class="fa fa-link"></i>网站</a></li>
                            </ul>
                        </div>
                    </div>
                    <!--/ End Single Widget -->
                </div>
            </div>
        </div>
        <!--/ End Footer Top -->

        <!-- Copyright -->
        <div class="copyright">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                        <div class="text">
                            <p>版权所有 &copy; <?php echo date('Y'); ?> 沈阳新禾文化传媒有限公司</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--/ End Copyright -->
    </footer>
    <!--/ End Footer -->

    <!-- Modernizr JS -->
    <script type="text/javascript" src="./static/modernizr.min.js"></script>

    <!-- 页面滚动到指定元素时， 触发事件 Appear JS-->
    <script type="text/javascript" src="./static/jquery.appear.js"></script>

    <!-- 页面局部效果，需要配合animate.css Animate JS https://www.delac.io/wow/ -->
    <script type="text/javascript" src="./static/wow.min.js"></script>

    <!-- Onepage Nav JS -->
    <script type="text/javascript" src="./static/jquery.nav.js"></script>

    <!-- Yt Player -->
    <script type="text/javascript" src="./static/ytplayer.min.js"></script>

    <!-- Popup JS -->
    <script type="text/javascript" src="./static/jquery.magnific-popup.min.js"></script>

    <!-- 打字机效果 Typed JS -->
    <script type="text/javascript" src="./static/typed.min.js"></script>

    <!-- 点击返回页面顶部 Scroll Up JS -->
    <script type="text/javascript" src="./static/jquery.scrollUp.min.js"></script>

    <!-- 移动端自适应导航菜单 Slick Nav JS -->
    <script type="text/javascript" src="./static/jquery.slicknav.min.js"></script>

    <!-- 背景图效果，滚动时背景图移动效果 Jquery Steller JS -->
    <script type="text/javascript" src="./static/jquery.stellar.min.js"></script>

    <!-- 美化下拉框 NICE select JS -->
    <script type="text/javascript" src="./static/niceselect.js"></script>

    <!-- 动态文字效果 -->
    <script type="text/javascript" src="./static/morphext.min.js"></script>

    <!-- 动态粒子 Particles JS https://github.com/VincentGarreau/particles.js/ -->
    <!-- <script src="./static/particles.min.js"></script>
    <script src="./static/particle-active.js"></script> -->
    <!-- 砖石结构 Masonry JS https://github.com/desandro/masonry -->
	<!-- Isotop JS  https://github.com/metafizzy/isotope -->
	<script type="text/javascript" src="./static/isotope.pkgd.min.js"></script>
    <!-- Masonry JS https://github.com/desandro/masonry -->
	<script type="text/javascript" src="./static/masonry.pkgd.min.js"></script>

    <!-- 指定标签滚动到用户视角，提示 Counterup JS -->
    <script type="text/javascript" src="./static/waypoints.min.js"></script>
    <!-- 计数效果 Counterup JS -->
    <script type="text/javascript" src="./static/jquery.counterup.min.js"></script>

    <!-- 幻灯片切换 Owl Carousel JS -->
    <script type="text/javascript" src="./static/owl.carousel.min.js"></script>

    <!-- Bootstrap JS -->
    <script type="text/javascript" src="./static/bootstrap.min.js"></script>

    <!-- Google Map JS -->
    <!-- <script type="text/javascript" src="./static/gmap.js"></script> -->
    <!-- Baidu Map JS -->
    <script type="text/javascript" src="//api.map.baidu.com/getscript?v=2.0&ak=GNMfmaHWOLrt5HMqz4ofS1t1"></script>

    <!-- Main JS -->
    <script type="text/javascript" src="./static/main.js"></script>

    <a id="scrollUp" href="./#top" style="position: fixed; z-index: 2147483647; display: none;"><i class="fa fa-angle-up"></i></a>

	<!-- 防止手机浏览器在页面后面加入垃圾广告, 放置一个标志性的元素。 所有必须的元素， 都要放到这个标识元素前面  -->
    <div id="last-one-flag"></div>
    <p>aa</p>
</body>

</html>
