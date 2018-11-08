$(function () {
	//$("body").on("click",function(event){
	//	$("form label.error").remove();
	//})
	//$("input").on("click",function(event){
	//	$("form label.error").remove();
	//	event.stopPropagation();
	//});
	//$("input").mousedown(function(event){
	//	console.log(111);
	//	$("form label.error").remove();
	//	event.stopPropagation();
	//});
})
/*
* @desc     选项卡
* @param    oBtn      Object    选项卡按钮的父级jq对象
* @param    oBtn      Object    选项内容父级的jq对象
* @time     2016-5-14
* @author   GCP
* */
function tabFn(oBtn, oContent) {
	//获取按钮
	var oBtns       =   oBtn.children();
	//获取内容
	var oContents   =   oContent.children();

	oBtns.each(function () {
		//选项卡按钮绑定点击事件
		$(this).click(function () {
			//遍历所有的按钮
			oBtns.each(function () {
				//移除所有按钮的标志
				$(this).removeClass('active');
				//移除所有内容的标志
				oContents.eq($(this).index()).removeClass('active');
			});

			//当前点击的按钮添加标志
			$(this).addClass('active');
			//当前点击按钮对应索引的内容添加标志
			oContents.eq($(this).index()).addClass('active');
		});
	});
}

/*
* @desc     调用弹出层
* @param    String      sPopId      弹出层ID
* @param    String      sMask       遮罩层ID
* @time     2016-5-17
* @author   GCP
* */
function popFn(oPop, oMask) {
	//获取弹出层的宽度
	var left    =   -oPop.width() / 2;
	//获取弹出层的高度
	var top     =   -oPop.height() / 2;

	//计算弹出层的位置并赋值
	oPop.css({
		"margin-left":left,
		"margin-top":top
	});
	//显示遮罩
	oMask.show();
	//显示弹出层
	oPop.show();

	//查找关闭按钮
	var oClose  =   oPop.find('.close');

	//点击关闭按钮关闭当前弹窗
	oClose.click(function () {
		//关闭弹出层
		$(this).closest('section').hide();
		//关闭遮罩
		oMask.hide();
	});
}

/*
* @desc     显示密码切换
* @param    obj     Object      切换的按钮jq对象
* @tiem     2016-9-19
* @author   GCP
* */
function showPwd(obj) {
	obj.click(function () {
		//如果按钮高亮
		if ($(this).hasClass('active')) {
			//移除高亮标志
			$(this).removeClass('active');
			//将同级的表单类型设置为密码
			$(this).prev().attr('type', 'password');
		} else {
			//添加高亮标志
			$(this).addClass('active');
			//将同级的表单类型设置为输入框
			$(this).prev().attr('type', 'text');
		}
	});
}

/*
 * 获取验证码后的60s倒计时
 * @param obj 点击按钮
 */
function components(obj, tflag){
	console.log(tflag);
	//var flag = true;
	//obj.click(function() {
		var time = 60;
		if (tflag) {
			$(this).html('重发&nbsp;&nbsp;(60s)').css({
				'border-color': '#ccc',
				'color': '#ccc'
			});
			var t = setInterval(count, 1000);
			window.tflag	=	false;
		}
		//flag = false;


		function count() {
			time -= 1;
			obj.html('重发&nbsp;&nbsp;(' + time + 's)').css({
				'border-color': '#ccc',
				'color': '#ccc'
			});
			if (time <= 0) {
				clearInterval(t);
				obj.html('获取动态码').css({
					'border-color': '#ff5252',
					'color': '#ff5252'
				});
				//flag = true;
				window.tflag	=	true;
			}
		}
	//})
}

//重发60s
//obj:按钮
//ajax:短信接口的ajax请求，需要返回true或者false
var componentFlag = true;

function componentsNew(obj, ajaxFun) {
	var time = 60;
	if (componentFlag) {
		if (ajaxFun()) {
			obj.html('重发&nbsp;&nbsp;(60s)').css({
				'border-color': '#ccc',
				'color': '#ccc'
			});
			var t = setInterval(count, 1000);
			componentFlag = false;
		}
	}

	function count() {
		time -= 1;
		obj.html('重发&nbsp;&nbsp;(' + time + 's)').css({
			'border-color': '#ccc',
			'color': '#ccc'
		});
		if (time <= 0) {
			clearInterval(t);
			obj.html('获取动态码').css({
				'border-color': '#ff5252',
				'color': '#ff5252'
			});
			componentFlag = true;
		}
	}
}

/*
* @desc    点击页面任意位置关闭表单错误提示信息
* @time    2016-7-28
* @author  GCP
* */
function closeTips() {
	$(document).click(function () {
		$('.check_tips').removeClass('active');
	});
}
function maskHas(isMaskHas,maskIndex){
	if(isMaskHas){
		  $('#form-tip').remove();
		  if(maskIndex == -1){
			  $('.mask').removeClass('active');
		  } else{
			  $('.mask').css('z-index',maskIndex);
		  }
	
	  }else{
		  $('#form-tip,.mask').remove();
	  }
}
//content是提示的信息
//isreload:true false
function formSub(content, isReload, url) {
  var formStr = '<div id="form-tip"><div class="title"><h3>提示信息</h3><i class="close"></i></div><p>' + content + '</p><div class="btn-area clearfix"><a href="javascript:void(0)" class="sure-btn">确定</a></div></div>';
  var isMaskHas = true;
  $('body').append(formStr);
  if($('.mask').length<=0){
	  	maskHas = false;
		$('body').append('<div class="mask active"></div>')
	}else{
		var formTindex = $('#form-tip').css('z-index');
		var maskIndex=-1;
		if($('.mask').hasClass('active')){
			maskIndex = $('.mask').css('z-index');
		}
		if(!$('.mask').hasClass('active')){
			$('.mask').addClass('active')
		}
		isMaskHas = true;
		$('.mask').css('z-index',formTindex-1);
	}
  $('.close').click(function() {
	  maskHas(isMaskHas,maskIndex);
  });
  $('#form-tip .sure-btn').click(function() {
	  maskHas(isMaskHas,maskIndex);
      
      if (isReload == undefined) {
          isReload = false;
      }
      if (isReload) {
          if (url) {
              window.location.replace(url)
          }else{
              window.location.reload();
          }
      }
  })
}

//设置Footer样式
function setFooter() {
	var win_h = $(window).height();
	var footer_top = $(".footer").offset().top + $(".footer").height();
	if (win_h > footer_top) {
		$(".footer").addClass("fixed-footer");
		console.log("fixed-footer");
	}
}
//弹出框的调用
function bompBoxfFade(str){
    $(".bomp-box").remove();
    $("body").append("<div class='bomp-box'></div>");
	$(".bomp-box").html(str);
	$(".bomp-box").fadeIn();
	setTimeout(function () {
		$(".bomp-box").fadeOut();
	},2000)
}
//图片展示
function showImage(obj,data){
	$(".image-next").off("click");
	$(".image-prev").off("click");
	var arr=obj.data(data).split(",");
	if($.trim(arr[arr.length-1])==""){
		arr.splice(length-1,1);
	}
	var imgLiStr="";
	for(var i=0;i<arr.length;i++){
		imgLiStr=imgLiStr+'<li><img src="'+arr[i]+'"></li>'
	}
	$(".image-show ul").html(imgLiStr);
	$(".image-show ul li").eq(0).addClass("img-show");
	var imgLength=$(".image-show ul li").length;
	$(".img-length").html(imgLength);
	$(".this-index").html(1);
	var index=0;
	$(".image-next").on("click", function () {
		for(var i=0;i<imgLength;i++){
			if($(".image-show ul li").eq(i).hasClass("img-show")){
				index=i;
			}
		}
		index=index+1;
		if(index>=imgLength){
			index=0
		}
		$(".image-show ul li").removeClass("img-show");
		$(".image-show ul li").eq(index).addClass("img-show");
		$(".this-index").html(index+1);
	})
	$(".image-prev").on("click", function () {
		for(var i=0;i<imgLength;i++){
			if($(".image-show ul li").eq(i).hasClass("img-show")){
				index=i;
			}
		}
		index=index-1;
		if(index<0){
			index=imgLength-1;
		}
		$(".image-show ul li").removeClass("img-show");
		$(".image-show ul li").eq(index).addClass("img-show");
		$(".this-index").html(index+1);
	})
}
//限定只能输入数字的输入框
function iptOnlyNum(obj,num){
    obj.off("keydown");
    obj.off("keyup");
    obj.on("keydown", function () {
        var oldval=$(this).val();
        $(this).on("keyup", function (e) {
            console.log(e.keyCode)
            if(e.keyCode!=8 &&! /^[1-9]\d*$/.test($(this).val())){
                $(this).val(oldval);
            }
        })
    })
}
//input输入框输入最小值，只能输入正整数，
//obj：input输入框元素
//minnum：输入框限制的最小值
function iptMinNum(obj,minnum){
    obj.on("keyup", function () {
        minnum=minnum>0?minnum:0;//起订量
        if(isNaN($(this).val()) || $(this).val() < minnum){
            $(this).val(minnum);
        }else if($(this).val()=="" ||$(this).val()==null){
            $(this).val(minnum);
        }else{
            $(this).val(parseInt($(this).val()));
        }
    })
}
//登陆弹出方法
//obj：绑定弹出的元素
function yfubaoLoginFn(obj){
    $(".yfubao-login-mask").remove();
    $(".yfubao-login-div").remove();
    obj.on("click", function () {
        $("body").append('<div class="yfubao-login-mask"></div>'+
            '<div class="yfubao-login-div">'+
                '<div class="form-title clearfix">'+
                '<p class="left-p">登陆</p>'+
                '<p class="right-p" id="yfubao-login-close"></p>'+
                '</div>'+
            '<iframe src="yfubao-login.html" width="311px" height="425px" scrolling="no" frameborder="no">'+ '</iframe>'+
            '</div> '
        );
    })
    $(document).on("click","#yfubao-login-close", function () {
        $(".yfubao-login-mask").hide();
        $(".yfubao-login-div").hide();
    })
}
//跳页面防止页面重复提交
function setDisbled(obj){
    if(obj.hasClass("disabled-public")){
        return false;
    }
	obj.addClass("disabled-public");
    obj.css({
        'backgroundColor':'#cccccc',
    }).html("提交中...");
}
//设置Footer样式
function setFooter() {
    var win_h = $(window).height();
    var footer_top = $(".footer").offset().top + $(".footer").height();
    if (win_h > footer_top) {
        $(".footer").addClass("fixed-footer");

    }
}
function showToast(str,type){
    if($(".success-toast").length>0){
        return;
    }
    $("body").append('<div class="success-toast">'+
        '<div class="success-toast-text">'+str+'</div>'+
        '</div>');
    if(type=="warn"){
        $(".success-toast .success-toast-text").addClass("warn");
    }
    $(".success-toast").css({
        opacity:"0",
        marginTop:"-50px"
    })
    $(".success-toast").animate({
        opacity:"1",
        marginTop:"-80px"
    },300);
    setTimeout(function () {
        $(".success-toast").animate({
            opacity:"0"
        },300, function () {
            $(".success-toast").remove();
        });
    },1600);
}

$(document).on("click",".common-select-p",function(e){
	e.stopPropagation;
	$(this).parents(".common-select").find("ul").slideDown("fast", function () {
		$(this).parents(".common-select").attr("state", "true");
		$(this).parents(".common-select").find(".common-select-p").addClass("active");
	});
});
$(document).on("click","body",function(e){
	e.stopPropagation;
	for(var i=0;i<$(".common-select").length;i++){
		if ($(".common-select").eq(i).attr("state") == "true"){
			$(".common-select").eq(i).find("ul").slideUp("fast", function () {
				$(this).parents(".common-select").attr("state", "false");
				$(".common-select-p").removeClass("active");
			})
		}
	}
})

$(document).on("click",".common-select li", function () {
	$(this).parents(".common-select").find(".common-select-p").text($(this).text());
})

