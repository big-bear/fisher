$(function() {
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
})