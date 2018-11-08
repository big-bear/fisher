$(function() {
	//收货地址交互
	if ($('.address-list').find('li')) {
		$('.address-area .add').removeClass('active')
		$('.address-list').removeClass('active')
	} else {
		$('.address-area .add').addClass('active')
		$('.address-list').addClass('active')
	}
	$('.address-list').find('li').each(function() {
			$(this).click(function() {
				$('.address-list li .name').each(function() {
					$(this).removeClass('active')
				})
				$(this).children('.name').addClass('active')
			})
		})
		//发票信息交互
	$('.invoice-type-tab li').each(function() {
			$(this).click(function() {
				var iIndex = $(this).index();
				//判断是否显示新增发票按钮
				if (iIndex == 1) {
					$('.add-invoice').addClass('active')
				} else {
					$('.add-invoice').removeClass('active')
				}
				//tab交互
				$('.invoice-type-tab li').each(function() {
					$(this).removeClass('active')
				})
				$(this).addClass('active')
					//显示对应内容
				$('.invoice-type-box>div').each(function() {
					$(this).removeClass('active');
				})
				$('.invoice-type-box>div').eq(iIndex).addClass('active')

			})

		})
		//点击增值税发票交互
	$('.invoice-type2-list').find('li').each(function() {
			$(this).click(function() {
				$('.invoice-type2-list li .taitou').each(function() {
					$(this).removeClass('active')
				})
				$(this).children('.taitou').addClass('active')
			})
		})
		//物流弹框
	$('.address-area .add-address,.address-area .add span').click(function() {
			$('.mask').addClass('active')
			$('#address-tip').addClass('active');
			$('section,#header,#footer').addClass('active');
		})
		//填写发票信息弹框
	$('.invoice-area .add-invoice,.invoice-area .add span').click(function() {
			$('.mask').addClass('active')
			$('#invoice-tip').addClass('active')
			$('section,#header,#footer').addClass('active');
		})
		//支付弹出框
	$('.submit-btn').click(function() {
			$('.mask').addClass('active')
			$('#pay-tip').addClass('active')
			$('section,#header,#footer').addClass('active');
			//pay-tip的高
			var feiyongLen = $('.feiyong').length
			var feiyongH = $('.middle-H').height();
			var totalH = $('#pay-tip .total').height();
			var btnArea = $('.btn-area').outerHeight() + 39;
			var payH = feiyongH + btnArea + totalH
			$('#pay-tip').height(payH);
		})
		//支付弹框取消按钮
	$('.cancel-btn').click(function() {
			$('.mask').removeClass('active')
			$('#pay-tip').removeClass('active')
			$('section,#header,#footer').removeClass('active');
		})
		//关闭按钮
	$('.close').click(function() {
			$('.mask').removeClass('active')
			$(this).parent().parent().removeClass('active')
			$('section,#header,#footer').removeClass('active');
		})
		//鼠标划上显示操作按钮
	$('.address-list li,.invoice-type2-list li').mouseover(function() {
			$(this).find('.caozuo-area').addClass('active')
		}).mouseout(function() {
			$(this).find('.caozuo-area').removeClass('active')
		})
		//caozuo弹框
	$('.address-list .caozuo-area a:first-child').each(function() {
		$(this).click(function() {
			$('.mask').addClass('active')
			$('#address-tip').addClass('active')
			$('section,#header,#footer').addClass('active');
		})
	})
	$('.invoice-type2-list .caozuo-area a:first-child').each(function() {
		$(this).click(function() {
			$('.mask').addClass('active')
			$('#invoice-tip').addClass('active')
			$('section,#header,#footer').addClass('active');
		})
	})
	$('.address-list .caozuo-area a:last-child').each(function() {
		$(this).click(function() {
			$('.mask').addClass('active')
			$('#delete-tip').addClass('active')
			$('#delete-tip p').text('确定删除所选的收货地址吗？')
			$('#delete-tip h3').text('收货地址')
			$('section,#header,#footer').addClass('active');
			$('.return-btn').click(function() {
				$('.mask').removeClass('active')
				$(this).parent().parent().removeClass('active')
				$('section,#header,#footer').removeClass('active');
			})
		})
	})
	$('.invoice-type2-list .caozuo-area a:last-child').each(function() {
			$(this).click(function() {
				$('.mask').addClass('active')
				$('#delete-tip').addClass('active')
				$('#delete-tip p').text('确定删除所选的发票信息吗？')
				$('#delete-tip h3').text('发票信息')
				$('section,#header,#footer').addClass('active');
				$('.return-btn').click(function() {
					$('.mask').removeClass('active')
					$(this).parent().parent().removeClass('active')
					$('section,#header,#footer').removeClass('active');
				})
			})
		})
		//设为默认
	$('.address-area .moren').each(function() {
		$(this).click(function(e) {
			e.stopPropagation();
			$('.address-area .moren-address').text('设为默认地址').removeClass('moren-address').addClass('set-moren-address')
			$(this).text('默认地址').removeClass('set-moren-address').addClass('moren-address')
		})
	})
	$('.invoice-type2-list .moren').each(function() {
			$(this).click(function(e) {
				e.stopPropagation();
				$('.invoice-type2-list .moren-invoice').text('设为默认发票').removeClass('moren-invoice').addClass('set-moren-invoice')
				$(this).text('默认发票').removeClass('set-moren-invoice').addClass('moren-invoice')
			})
		})
		//服务项的单位
	$('.service').each(function() {
			if ($(this).attr('type')) {
				$(this).parent().next().find('.yuan').text('元')
			} else {
				$(this).parent().next().find('.yuan').text('元/件')
			}
		})
		//验证必填

	valid($('.form-address'))

})