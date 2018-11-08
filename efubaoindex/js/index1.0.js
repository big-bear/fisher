$(function() {
	$('.gotop').click(function() {
		$('body,html').animate({
			'scrollTop': 0
		}, 1000)
	});
	$('.sheji').click(function() {
		$('.mask,.pop').show();
	});
	//关闭按钮
	$('.close-btn').click(function() {
		$('.mask,.pop').hide();
	});
	//立即定制按钮
	$('.dingzhi-btn').click(function() {
		$('.mask,.pop').show();
	});

	//轮播图插件
//	var swiper = new Swiper('.swiper-container', {
//		pagination: '.swiper-pagination',
//		paginationClickable: true,
//		autoplay: 3000,
//		loop: true,
//		autoplayDisableOnInteraction: false,
//		effect: 'fade',
//		speed: 1500,
//		touchRatio: 3
//	});
    $("#index-banner").sliderLoad();



	//处理IEplaceholder
	console.log(navigator.userAgent);
	if (window.attachEvent) {
		placeHolder($('.deal'), '请输入您的手机号');
		placeHolder($('.input_area input:last-child'), '您的称呼')
	}
	//placeholder函数
	function placeHolder(obj, placeholder) {
		obj.css('color', '#cccccc').val(placeholder);
		obj.focus(function() {
			if ($(this).val() != '' && $(this).val() != placeholder) {

			} else {
				$(this).css('color', '#333333').val('')
			}
		}).blur(function() {
			if ($(this).val() != '' && $(this).val() != placeholder) {
				phone_num = $(this).val();
			} else {
				$(this).css('color', '#cccccc').val(placeholder)
			}
		})
	}
	//轮播
	/*var index = 0;
	 var t = setInterval(function() {
	 if (index > 3) {
	 index = 0;
	 }
	 $('.banner').eq(index).fadeIn(1200).siblings().fadeOut(1200);
	 $('.ctrl li').css('background', '#cccccc')
	 $('.ctrl li').eq(index).css('background', '#333333')
	 index += 1;
	 }, 3000);
	 $('.banner-content').mouseover(function() {
	 clearInterval(t);
	 });
	 $('.ctrl li').mouseover(function() {
	 clearInterval(t);
	 })
	 $('.banner-content').mouseout(function() {
	 t = setInterval(function() {
	 if (index > 3) {
	 index = 0;
	 }
	 $('.banner').eq(index).fadeIn(1200).siblings().fadeOut(1200);
	 $('.ctrl li').css('background', '#cccccc')
	 $('.ctrl li').eq(index).css('background', '#333333')
	 index += 1;
	 }, 3000);
	 });
	 $('.ctrl li').each(function() {
	 $(this).click(function() {
	 $('.ctrl li').css('background', '#cccccc')
	 $(this).css('background', '#333333')
	 var index = $(this).index();
	 $('.banner').eq(index).fadeIn(1200).siblings().fadeOut(1200);
	 })
	 })*/
	var len=$(".down-scroll").find("li").length;
	var scrolllen=parseInt(len/3);
	var cloneli="";
	//console.log($(".down-scroll").find("li").eq(0).prop("outerHTML"));
	for(var j=0;j<3;j++){
		cloneli=cloneli+$(".down-scroll").find("li").eq(j).prop("outerHTML");
	}
	//console.log(cloneli);
	if(len%3==0){
		scrolllen=parseInt(len/3)+1;
	}else if(len%3==1){
		scrolllen=parseInt(len/3)+2;
		cloneli='<li></li><li></li>'+cloneli;
	}else if(len%3==2){
		scrolllen=parseInt(len/3)+2;
		cloneli='<li></li>'+cloneli;
	}
	$(".down-scroll").find("li").eq(len-1).after(cloneli);
	console.log(cloneli);

	var idx=0;
	setInterval(function(){
		idx++;
		if(idx>=scrolllen){
			$(".down-scroll").find("ul").css("top","0");
			idx=1;
		}
		$(".down-scroll").find("ul").animate({
			"top":"-"+idx*60+"px"
			});

	},3000)
	for(var i=0;i<scrolllen*3;i++){
		if(i%3==0){
			$(".down-scroll").find("li").eq(i).find(".fenge").css("border-left","none");
		} 
		
	}
});