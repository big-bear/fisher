$(function() {
    for(var i=0;i<$(".show-rules-detail").length;i++){
        var col=parseInt($(".show-rules-detail").eq(i).find("p").length/10);
            $(".show-rules-detail").eq(i).css({
                width:(col+1)*80+15+"px"
            })
    }
	setFooter();
    var swalHtml="<div class='payment'>" +
        "<div class='paymenttop'>" +
            "<div class='clearfix'>" +
                "<p class='payment-leftp'>待支付：</p><p class='payment-rightp'><span class='rmblogo'>￥</span>40000.00</p>" +
            "</div>" +
            "<div class='clearfix thispayment'>" +
                "<p class='payment-leftp'>本次支付：</p><input type='text' class='payment-input' value='40000.00'> <span class='rmblogo-input'>￥</span>" +
            "</div>" +
        "</div>" +
        "<div class='paybottom'>" +
            "<div class='payment-detail clearfix'>" +
                "<p class='payment-detail-p'><span>总金额：￥</span><span>10000.00</span><span>元</span></p>" +
                "<p class='payment-detail-p'><span>已付金额：￥</span><span>10000.00</span><span>元</span></p>" +
            "</div>"+
        "<div class='payment-detail clearfix'>" +
        "<p class='payment-detail-p'>2016/10/23 13:22:21</p>" +
        "<p class='payment-detail-p'><span>支付方式：</span><span>支付宝</span></p>" +
        "<p class='payment-detail-p'><span>金额：</span><span>￥1660000.00</span></p>" +
        "</div>"+
        "</div>" +
        "</div>";
    //swal({
    //        title: "支付首款",
    //        text: swalHtml,
    //        html:true,
    //        showCancelButton: true,
    //        confirmButtonColor: "#DD6B55",
    //        confirmButtonText: "立即支付",
    //        cancelButtonText: "取消",
    //    },
    //    function (isConfirm) {
    //        if (isConfirm) {
    //
    //        } else {
    //
    //        }
    //    });

	//懒加载
	$('.lazy').lazyload({
			threshold: 0,
			effect: 'fadeIn',
			failure_limit: 100
		})
		//我的订单-tab
	$('.list-tab li').each(function() {
			$(this).click(function() {
				$('.list-tab li').removeClass('active')
				$(this).addClass('active')
			})
		})
		//判断操作是否显示按钮
	function displayBtn() {
		$('.order-table .status').each(function() {
			if ($(this).hasClass('status2')) {
				$(this).parent().next().find('.status-btn').css('display', 'none')
				$(this).parent().next().find('.look-detail').css('margin-top', '50px')
			} else {
				$(this).parent().next().find('.status-btn').css('display', 'block')
				$(this).parent().next().find('.look-detail').css('margin-top', '0')
			}
		})
	}
	displayBtn();
	//控制表格合并最后两列
	function rows() {
		$('.order-table').each(function() {
			var len = $(this).find('tr').length
			$(this).find('tr:first').find('.rows').attr('rowspan', len)
			$(this).find('tr').not('tr:first').find('.rows').remove();
		})
	}
	rows();
	//订单状态展开
	$('.order-status').click(function() {
		$(this).find('.order-status-list').addClass('active')
	})
	$('.order-status-list p').click(function(e) {
		e.stopPropagation();
		$(this).parent().removeClass('active')
	})
	$('.order-status-list li').click(function() {
			$('.order-status-list li').removeClass('active')
			$(this).addClass('active')
		})
		//左侧选项卡切换
	$('.nav-tab dd').click(function() {
		$('.nav-tab dd').removeClass('active')
		$(this).addClass('active')
	})
	$('.gotop').click(function() {
		$('body,html').animate({
			'scrollTop': 0
		}, 1000)
	});
	// window.onscroll = function() {
	// 	if ($('#nav-right').offset().top >= sc) {
	// 		$('#nav-right').show()
	// 	} else {
	// 		$('#nav-right').hide()
	// 	}
	// }
	// var sc = $('.main').height() + $('.aside').height() + $('.dingzhi-area').height();
	// console.log(sc);
	//立即设计按钮
	$('.sheji').click(function() {
		$('.mask,.pop').show();
		$('section,#header,#footer').addClass('active');
	});
	//关闭按钮
	$('.close-btn').click(function() {
		$('.mask,.pop').hide();
		$('section,#header,#footer').removeClass('active');
	});
	//立即定制按钮
	$('.dingzhi-btn').click(function() {
		$('.mask,.pop').show();
		$('section,#header,#footer').removeClass('active');
	});

    $('.checkall').change(function() {
        var is = $(this).is(':checked');
        $('.checkb').prop('checked', is);
    })
	$(".checkb").change(function(){
		var len=$(".checkb").length;
		var flag=true;
		var is=$(this).is(':checked');
		$(this).parents(".shopping-main").find("table").find("input[type='checkbox']").prop("checked",is);
		for(var i=0;i<len;i++){
			if(!$(".checkb").eq(i).is(':checked')){
				flag=false;
			}
		}
		$('.checkall').prop("checked",flag);
	})
    $(".together-pay").on("click", function () {
        $("#delete-tip-delete").show();
        $(".mask").show();
    })
    $(".close,.cancel-btn").on("click", function () {
        $(".delete-tip").hide();
        $(".mask").hide();
    })
    $(".sure-btn").on("click", function () {
        $(".delete-tip").hide();
        $(".mask").hide();
    })
})