$(function() {
	//定义多选开关
	var selectFlag = {};
	//选项卡的边框控制，如果选项大于1，则都加下边框
	// if ($('.select-area').children().length > 1) {
	// 	$('.select').css('border-bottom', '1px dashed #ccc')
	// 	$('.select:last').css('border-bottom', 'none')
	// }
	//判断虚线
	$('.select-area .select:last-child').find('.line').remove();
	//更多和收起效果
	$('.xiala').each(function() {
		if ($(this).parents('.select-right').find('li').length > 9) {
			$(this).css('display', 'block')
		} else {
			$(this).css('display', 'none')
		}
	})
	$('.xiala').click(function() {
			if ($(this).parents('.select-right').find('li').length > 9) {
				$(this).css('display', 'block')
				$(this).parent().parent().prev().height($(this).parent().parent().height())
				$(this).parents('.select').toggleClass('active')
				$(this).toggleClass('active')
				if ($(this).html() == '更多')
					$(this).html('收起')
				else
					$(this).html('更多')
			} else {
				$(this).css('display', 'none')
			}
		})
		//多选按钮
	$('.more').click(function() {
			var index = $(this).parent().parent().parent().index()
			selectFlag[index] = true;
			$(this).parent().css('display', 'none')
			$(this).parents('.tab').prev('.sure-area').addClass('active')
			$(this).parent().parent().prev().height($(this).parent().parent().height())
			$(this).parents('.select').removeClass('active')
		})
		//点击多选弹出的确定按钮
	$('.sure').click(function() {
			// var left = $(this).parent().parent().prev().text();
			// console.log(left);
			// var right = '';
			// $(this).parent().prev().children().children('.active').each(function() {
			// 	right += $(this).text() + ','
			// })
			// console.log(right)
		})
		//点击多选弹出的取消按钮
	$('.clear').click(function() {
		var index = $(this).parents().parents().parents().index();
		selectFlag[index] = false;
		$('.select-right ul').eq(index).children().children().removeClass('active')
		//$('.select-right ul').eq(index).children().css('margin-right', '76px')
		$(this).parent().removeClass('active')
		$(this).parent().next().css('display', 'block')
		$(this).parent().parent().prev().height($(this).parent().parent().height())
		$(this).parents('.select').toggleClass('active')
		$(this).parent().siblings('.tab').children('.xiala').addClass('active')
		$(this).parent().siblings('.tab').children('.xiala').html('更多')
	})

	//多选添加功能

	$('.select-right ul').delegate('li', 'click', function() {
			var index = $(this).parents().parents().parents().index() + 1 //class++
				// var add = $(this).text()
				// 	//单选功能
				// console.log(selectFlag)
			if (!selectFlag[index - 1]) {
				if (!($('.title li').hasClass('selected' + index))) {
					// 		$('.title ul').append('<li class = "selected selected' + index + '"><a href="javascript:void(0)">' + $(this).parents().parents().prev().html() + '</a><span>' + add + '、' + '</span><i class="red-close"></i></li > ');
					// 		$('.title li').attr('title', add)
				}
			} else {
				$(this).children().addClass('active');
//				$(this).css({
//					'margin-right': '12px',
//					'height': '36px'
//				});
				// 		//多选功能
				// 	if ($('.title li').hasClass('selected' + index)) {
				// 		$('.selected' + index).children('span').append(add + '、');
				// 		$('.title ul').children('.selected' + index).attr('title', $('.selected' + index).children('span').text())
				// 	} else {
				// 		$('.title ul').append('<li class = "selected selected' + index + '"><a href="javascript:void(0)">' + $(this).parents().parents().prev().html() + '</a><span></span><i class="red-close"></i></li> ');
				// 		$('.selected' + index).children('span').append(add + '、');
				// 		$('.title ul').children('.selected' + index).attr('title', $('.selected' + index).children('span').text())
				// 	}
				// }
				// //标题的叉号
				// if ($('.selected .red-close')) {
				// 	$('.selected .red-close').click(function(e) {
				// 		e.stopPropagation();
				// 		$(this).parent().remove();
				// 	})
			}
		})
		//标题的叉号
	if ($('.selected .red-close')) {
		$('.selected .red-close').click(function(e) {
			e.stopPropagation();
			$(this).parent().remove();
		})
	}
	//选项里的红色叉号
	$('.select-right .red-close').click(function(e) {
		e.stopPropagation()
		$(this).parent().removeClass('active')
		//$(this).parent().parent().css('margin-right', '76px')
	})

	//list-nav点击效果
	$('.list-nav .zonghe,.list-nav .num').click(function() {
			$('.list-nav .zonghe,.list-nav .num').each(function() {
				$(this).removeClass('active')
				$('.list-nav .price').removeClass('active')
				$('.list-nav .price').removeClass('active1')
			})
			$(this).addClass('active')
		})
		//价格切换
	$('.list-nav .price').click(function() {
			// $('.list-nav span').each(function() {
			// 	$(this).removeClass('active,active1')
			// })
			if($(this).hasClass('active1')){
				$(this).removeClass('active1').addClass('active');
			}else{
				$(this).removeClass('active').addClass('active1');
			}
		})
		//图片懒加载
	$('.lazy').lazyload({
			threshold: 0,
			effect: 'fadeIn',
			failure_limit: 100
		})
		//分页效果
	$('.page-box li').click(function() {
		$('.page-box li').each(function() {
			$(this).removeClass('active')
		})
		$(this).addClass('active')
	})

	$(".secondli").on("mouseover", function () {
        $(this).parents(".parentsli-div").find(".secondli").removeClass("active");
        $(this).addClass("active");
        $(this).parents(".firstli").find(".img-link img").attr("src",$(this).find("a img").attr("data-big"));
        var price=$(this).attr("price");
        var shoptext=$(this).attr("shoptext");
        $(this).parents(".firstli").find(".category-price span").html(price);
        $(this).parents(".firstli").find(".category-info em").html(shoptext);
    })

    //商品列表的轮播效果
    //var sr = $('.good-left-bottom').find('.small-img:first').find('img').data('big');
    //$('.good-left-top').find('img:first').attr('src', sr)

    //var length = $('.small-img').length;

    var flag=true;
    //向右点击
    $('.right-arrow').on("click",function(){
        var $thisUl=$(this).parents(".has-arrow-div").find(".li-imglist-short ul");
        var length=$thisUl.find("li").length;
        console.log(flag);
        console.log($thisUl.position().left);
        console.log(length/5);
        if(!flag){
            return;
        }
        flag=false;
        if(-($thisUl.position().left)<((parseInt(length/5)-1)*199)){
            $thisUl.animate({
                'left': $thisUl.position().left - (199) + 'px'
            },function(){
                flag=true;
            })
        }else if(-($thisUl.position().left)==((parseInt(length/5)-1)*199)){
            $thisUl.animate({
                'left': $thisUl.position().left - (length%5)*34 + 'px'
            },function(){
                flag=true;
            })
        }
        else{
            flag=true;
        }

    })
    //向左点击
    $('.left-arrow').on("click",function(){
        var $thisUl=$(this).parents(".has-arrow-div").find(".li-imglist-short ul");
        var length=$thisUl.find("li").length;
        if(!flag){
            return;
        }
        flag=false;
        if(($thisUl.position().left)<=(-199)){
            $thisUl.animate({
                'left': $thisUl.position().left + (199) + 'px'
            },function(){
                flag=true;
            })
        }else if(($thisUl.position().left)>(-199) && ($thisUl.position().left)<0){
            $thisUl.animate({
                'left': '0px'
            },function(){
                flag=true;
            })
        }
        else{
            flag=true;
        }

    })

})
