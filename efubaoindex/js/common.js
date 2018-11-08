//尺码弹框
//obj:传入的弹框对象，$('div')
//context:报错信息；
$(function(){
	//计算nav栏二级栏目left值
	var navlen=$(".mk-nav>ul>li").length;
	console.log(navlen);
	for(var i=0;i<navlen;i++){
		$(".mk-nav>ul>li").eq(i).width()+66;
		console.log($(".mk-nav>ul>li").eq(i).width());
		$(".mk-nav>ul>li").eq(i).find(".second-nav").css("left",($(".mk-nav>ul>li").eq(i).width()-74)/2);
	}
})
function notice(obj,context){
	obj.html(context).css({
		'display':'block',
		'opacity':'0.7'
	});
	setTimeout(function(){
		obj.css('opacity','0');
		setTimeout(function(){
			obj.css('display','none')
		},800)
	},2000)
}

//获取当前事件，格式位yyyy-mm-dd hh:mi:ss
function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	var hours=date.getHours();
	var minutes=date.getMinutes();
	var seconds=date.getSeconds();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	if(hours >= 0 && hours <= 9){
		hours="0" + hours;
	}
	if(minutes >= 0 && minutes <= 9){
		minutes="0" + minutes;
	}
	if(seconds >= 0 && seconds <= 9){
		seconds="0" + seconds;
	}
	var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
		+ " " + hours + seperator2 + minutes
		+ seperator2 + seconds;
	return currentdate;
}