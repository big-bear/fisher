// JavaScript By BigBear
//Check Broswer
function checkBrowser() {
	var browserType;
	if(typeof document.body.style.webkitTransition === 'string')
	{
		browserType = "chrome";
		return browserType;	
	}
	else if(typeof document.body.style.MozTransition === 'string')
	{
		browserType = "firefox";
		return browserType;
	}
	else if(typeof document.body.style.Transition === 'string')
	{
		browserType = "advance";
		return browserType;
	}
	else {
		browserType = "low";
		return browserType;	
	}
}
//播放方法
function play(next) {
	stopNow();
	switch(next)
	{
		case 1: play1();$("#play").show(0);$("#main_bg").hide(0);break;
		case 2: play2();$("#play").show(0);$("#main_bg").show(0);break;
		case 3: play3();$("#play").show(0);$("#main_bg").show(0);break;
		case 4: play4();$("#play").show(0);$("#main_bg").show(0);break;
		case 5: play5();$("#play").hide(0);$("#main_bg").show(0);break;
	}
	
}
var stars = [];
function stopNow() {
	if(stars.length>0)
	{
		for(var i=0; i<stars.length; i++)
		{
			stars[i].stopRun();	
		}	
	}
	$(".show").removeClass("show").hide(0);
}
function play1() {
	stars = [];
	var tempStar = new drawCircle("stars",679,679,400,5,50,500,100,0.008,"#26303f");
	stars.push(tempStar);
	$("#s1").show(0,function(){
		$(this).addClass("show");	
	})
}
function play2() {
	stars = [];
	var name_array = ["ie_star","phone_star","pc_star","h5_star"];
	for(var i=0; i<name_array.length; i++)
	{
		var tempStar = new drawCircle(name_array[i],70,70,60,2,0,50,120,0.008,"#333d4c");
		stars.push(tempStar);
	}
	$("#s2").show(0,function(){
		$(this).addClass("show");
	})
	
}
function play3() {
	$("#s3").show(0,function(){
		$(this).addClass("show");	
	})
}
function play4() {
	$("#s4").show(0,function(){
		$(this).addClass("show");	
	})
}
function play5() {
	
	$("#s5").show(0,function(){
		$(this).addClass("show");	
	})
}
