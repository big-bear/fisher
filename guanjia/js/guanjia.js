// U zhuang GuanJia
var play;
$(function(){
//Code start
    var state = 0 //0 is stop, 1 is playing
    
    var win_w = $(window).width();
    var win_h = $(window).height();
    
    init();
    
    function init() {
        $(".container").height(win_h);
        $("#reg-now").bind("click",function(){
            $("#layer").show();   
        });
        $(".input-box").bind("click",function(){
            $(this).addClass("writing");
            $(this).find(".user-data").focus();  
        });
        $(".user-data").bind("blur",function(){
            if($(this).val() == ""){
               $(this).parents(".input-box").removeClass("writing");    
            }  
        });
        $("#close-btn").bind("click touch",function(){
            $("#layer").hide();   
        });
    }
    
    play = function(stage_index) {
        if(stage_index<0){
            return;
        }
        state = 1;
        var now = $(".container.show");
        var next = $("#s"+stage_index);      
        $(now).removeClass("show");
        $(next).addClass("show");
        setTimeout(function(){
            state = 0;  
        },100);
    }
    
    function playPre() {
        if(state == 1){
            return;    
        }
        var now_id = $(".container.show").attr("id");
        if(!now_id){
            return;
        }
        var now_index = now_id.charAt(now_id.length-1) ;
        var pre = (now_index-1>0) ? now_index-1 : -1;
        play(pre);
    }
    
    function playNext() {
        if(state == 1){
            return;    
        }
        var now_id = $(".container.show").attr("id");
        if(!now_id){
            return;
        }
        var now_index = parseInt(now_id.charAt(now_id.length-1)) ;
        var next = (now_index+1<6) ? now_index+1 : -1;
        play(next);
    }
    
    var scrollFunc = function (e) {
        var direct = 0;
        e = e || window.event;
        if (e.wheelDelta) {  //IE or Chrome             
            if (e.wheelDelta > 0) { //Mouse Up
                console.log("滑轮向上滚动");
                playPre();
            }
            if (e.wheelDelta < 0) { //Mouse Down
                console.log("滑轮向下滚动");
                playNext();
            }
        } else if (e.detail) {  //Firefox
            if (e.detail> 0) { //Mouse Up
                console.log("滑轮向上滚动");
                playPre();
            }
            if (e.detail< 0) { //Mouse Down
                console.log("滑轮向下滚动");
                playNext();
            }
        }
        //ScrollText(direct);
    }
    //Bind scroll events
    if (document.addEventListener) {
        document.addEventListener('DOMMouseScroll', scrollFunc, false);
    }

    window.onmousewheel = document.onmousewheel = scrollFunc;  
    
    
//Code end 
})