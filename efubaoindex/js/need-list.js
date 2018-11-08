$(function() {
	//左侧选项卡切换
	$('.nav-tab dd').click(function() {
			$('.nav-tab dd').removeClass('active')
			$(this).addClass('active')
		})
		//我的订单-tab
	$('.list-tab li').each(function() {
			$(this).click(function() {
				$('.list-tab li').removeClass('active')
				$(this).addClass('active')
			})
		})
		//懒加载
	$('.lazy').lazyload({
			threshold: 0,
			effect: 'fadeIn',
			failure_limit: 100
		})
		//控制表格合并最后两列
	function rows() {
		$('.order-table').each(function() {
			var len = $(this).find('tr').length
			$(this).find('tr:first').find('.rows').attr('rowspan', len)
			$(this).find('tr').not('tr:first').find('.rows').remove();
		})
	}
	rows();
})