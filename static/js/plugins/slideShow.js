;$.extend({

slideShow : function (containerSelector, slideSelector, controlSelector) {

    	//首屏banner效果图
	var ali=$('#lunbonum li');
	var aPage=$('#lunhuanback p');
	var aslide_img=$('.lunhuancenter > div');
	var iNow=0;

	ali.each(function(index){
		$(this).mouseenter(function(){
			slide(index);
		})
	});

	function slide(index){
		iNow=index;
		ali.eq(index).addClass('lunboone').siblings().removeClass();
		aPage.eq(index).siblings().stop().animate({opacity:0},1000);
		aPage.eq(index).stop().animate({opacity:1},1000);
		aslide_img.eq(index).stop().animate({opacity:1,top:0},1000).siblings('div').stop().animate({opacity:0,top:0},1000);
	}

	function autoRun(){
		iNow++;
		if(iNow==ali.length){
			iNow=0;
		}
		slide(iNow);
	}

	var timer=setInterval(autoRun,5000);

	ali.hover(function(){
		clearInterval(timer);
	},function(){
		timer=setInterval(autoRun,5000);
	});
}


});
