/*
* @Author: lizeshuai
* @Date:   2017-02-27 10:32:51
* @Last Modified by:   lizeshuai
* @Last Modified time: 2017-02-28 18:26:13
*/

$(function(){
    $(".get-submit").on("click", function () {
        if($(".information-top-type .common-select-p").text() =="请选择"){
            bompBoxfFade("请选择服装类型");
            return;
        }
        if($(".information-top-num .common-select-p").text() =="请选择"){
            bompBoxfFade("请选择服装数量");
            return;
        }
        if($(".information-top-phone input").val() ==""){
            bompBoxfFade("请输入手机号码");
            return;
        }
        if(!/^1[34578]\d{9}$/.test($(".information-top-phone input").val())){
            bompBoxfFade("请输入正确的手机号码");
            return;
        }
        $("#tijiao-success").show();
        $(".common-mask").show();
    })
    $("#tijiao-success .close").on("click", function () {
        $("#tijiao-success").hide();
        $(".common-mask").hide();
    });
    $("#tijiao-success .btn-danger").on("click", function () {
        $("#tijiao-success").hide();
        $(".common-mask").hide();
    })
	//swal({
	//		title: "提示",
	//		text: "暂不支持当前浏览器，请复制链接后选择其他浏览器打开哦~，http://www.efubao.com",
	//	});
	//$(".time-div").append('<span class="span1 count-down-d">3</span> '+
	//'<span class="span2">天</span> '+
	//	'<span class="span1 count-down-h">0</span> '+
	//	'<span class="span2">时</span> '+
	//	'<span class="span1 count-down-m">0</span> '+
	//	'<span class="span2">分</span> '+
	//	'<span class="span1 count-down-s">0</span> '+
	//	'<span class="span2">秒</span>');
    //countDown();
    //
    //setInterval(function () {
     //   countDown();
    //},1000)
	//轮播图
	$("#index-banner").sliderLoad();
	//二级导航的hover效果
	$(".new-banner-left>ul>li").on("mouseover",function(){
		if($(this).index()==0){
			$(this).parent().parent().css("border-top","1px solid #333333");
		}
		var idx=$(this).index()-1;
		$(".new-banner-left>ul>li").eq(idx).css({
			"border-bottom":"1px solid #333333",
		});
		$(this).css({
			"border-bottom":"1px solid #333333",
		})
	});
	$(".new-banner-left>ul>li").on("mouseout",function(){
		if($(this).index()==0){
			$(this).parent().parent().css("border-top","1px solid #464646");
		}
		var idx=$(this).index()-1;
		$(".new-banner-left>ul>li").eq(idx).css({
			"border-bottom":"1px solid #464646",
		});
		$(this).css({
			"border-bottom":"1px solid #464646",
		})
	});
	$("#feature1").on("click", function () {
		var costumesListH=$("#costumesList").offset().top;
		$("html,body").animate({ scrollTop: costumesListH }, 400);
	})

	//懒加载
	$('.lazy').lazyload({
		threshold: 1600,
		effect: 'fadeIn',
		failure_limit: 100
	})
})

function countDown(){
    var date = new Date();
    var strDate = date.getDate();
    if(strDate%3 !=0){
        $(".count-down-d").html(3-strDate%3);
    }else{
        $(".count-down-d").html("0");
    }
    var countH=date.getHours();
    $(".count-down-h").html(23-countH);
    var countM=date.getMinutes();
    $(".count-down-m").html(59-countM);
    var conutS=date.getSeconds();
    $(".count-down-s").html(60-conutS);
}