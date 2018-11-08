/*
* @Author: lizeshuai
* @Date:   2017-03-01 14:38:34
* @Last Modified by:   lizeshuai
* @Last Modified time: 2017-03-01 14:42:10
*/
$(function(){
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
})