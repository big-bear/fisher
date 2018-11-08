$(function() {
    if($(".information table tr td").length==3){
        $(".information p span:last-child").width("200px");
    }
	//左侧选项卡切换
	$('.nav-tab dd').click(function() {
			$('.nav-tab dd').removeClass('active')
			$(this).addClass('active')
		})
		//懒加载
	$('.lazy').lazyload({
			threshold: 0,
			effect: 'fadeIn',
			failure_limit: 100
		})
		//服务项的单位
	$('.service').each(function() {
		if ($(this).attr('type')) {
			$(this).parent().next().find('.yuan').text('元')
		} else {
			$(this).parent().next().find('.yuan').text('元/件')
		}
	})

	// console.log($(".seeimg"));
	$(".seeimg").on("click", function() {
		$(".ent-showimg").show();
		$(".ent-mask").show();
	});
	// console.log($(".ent-showimg").find(".close"));
	$(".ent-showimg").find(".close").on("click", function() {
		$(".ent-showimg").hide();
		$(".ent-mask").hide();
	})
	//活动弹窗点击事件
	$(".red-popup-close").on("click", function () {
		$(this).parents(".red-popup-module").removeClass("red-popup-module-show");
	})

    //录入尺码弹出功能
    $(".upload-rules").on("click", function () {
        $(".common-mask").show();
        $(this).parents("td").find(".quotes-popup").show();
    })
    $(".quotes-popup-title-right").on("click", function () {
        $(".quotes-popup").hide();
        $(".common-mask").hide();
    });
    $(".quotes-popup-nook").on("click", function () {
        $(".quotes-popup").hide();
        $(".common-mask").hide();
    });
	$(".image-next").on("click", function () {
        $(".information table").animate({
            "marginLeft":"-175px"
        })
    })
    $(".image-prev").on("click", function () {
        $(".information table").animate({
            "marginLeft":"0"
        })
    })

})