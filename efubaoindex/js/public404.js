/*
* @Author: lizeshuai
* @Date:   2017-01-18 17:48:57
* @Last Modified by:   lizeshuai
* @Last Modified time: 2017-01-18 18:08:02
*/

$(function(){
	var i=3;
	var timer=setInterval(function(){
		i--;
		var str="返回首页("+i+"s)";
		$(".lookindex").find("a").html(str);
		if(i<=0){
			clearInterval(timer);
			 window.location.href=$(".lookindex").find("a").attr("href");
		}
	},1000)
})