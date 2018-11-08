$(function () {
    var time=10;
    countDown(time);
    var settimer=setInterval(function () {
        time=time-1;
        countDown(time);
        if(time==0){
            clearInterval(settimer);
            $(".count-down").hide();
            $(".title-right").show();
        }
    },1000);
    if(time<=0){
        $(".count-down").hide();
        $(".title-right").show();
    }

    //$(".td-show-img").on("click", function () {
    //    showImage($(this),"imgurl");
    //    $(".image-show").show();
    //    $(".produce-mask").show();
    //})
    //$(".image-delete").on("click", function () {
    //    $(".image-show").hide();
    //    $(".produce-mask").hide();
    //})
    showOneImage($(".td-show-img"),"imgurl");
})


function countDown(num){
    var countH=parseInt(num/3600);
    $(".count-down-h").html(countH);
    var countM=parseInt((num%3600)/60);
    $(".count-down-m").html(countM);
    var countS=parseInt(num%60);
    $(".count-down-s").html(countS);
}
//function showImage(obj,data){
//    var arr=obj.data(data).split(",");
//    if($.trim(arr[arr.length-1])==""){
//        arr.splice(length-1,1);
//    }
//    var imgLiStr="";
//    for(var i=0;i<arr.length;i++){
//        imgLiStr=imgLiStr+'<li><img src="'+arr[i]+'"></li>'
//    }
//    $(".image-show ul").html(imgLiStr);
//    $(".image-show ul li").eq(0).addClass("img-show");
//    var imgLength=$(".image-show ul li").length;
//    $(".img-length").html(imgLength);
//    $(".this-index").html(1);
//    var index=0;
//    $(".image-next").on("click", function () {
//        for(var i=0;i<imgLength;i++){
//            if($(".image-show ul li").eq(i).hasClass("img-show")){
//                index=i;
//            }
//        }
//        index=index+1;
//        if(index>=imgLength){
//            index=0
//        }
//        $(".image-show ul li").removeClass("img-show");
//        $(".image-show ul li").eq(index).addClass("img-show");
//        $(".this-index").html(index+1);
//    })
//    $(".image-prev").on("click", function () {
//        for(var i=0;i<imgLength;i++){
//            if($(".image-show ul li").eq(i).hasClass("img-show")){
//                index=i;
//            }
//        }
//        index=index-1;
//        if(index<0){
//            index=imgLength-1;
//        }
//        $(".image-show ul li").removeClass("img-show");
//        $(".image-show ul li").eq(index).addClass("img-show");
//        $(".this-index").html(index+1);
//    })
//}
function showOneImage(obj,data){
    obj.on("click", function () {
        obj.removeClass("thisactive");
        $(this).addClass("thisactive");
        var arr=[];
        var idx;
        for(var i=0;i<obj.length;i++){
            arr.push(obj.eq(i).data(data));
            if(obj.eq(i).hasClass("thisactive")){
                idx=i
                console.log(idx);
            }

        }
        //var arr = obj.data(data).split(",");
        console.log(arr);
        if ($.trim(arr[arr.length - 1]) == "") {
            arr.splice(length - 1, 1);
        }
        var imgLiStr = "";
        for (var i = 0; i < arr.length; i++) {
            imgLiStr = imgLiStr + '<li><img src="' + arr[i] + '"></li>'
        }
        $(".image-show ul").html(imgLiStr);
        $(".image-show ul li").eq(0).addClass("img-show");
        var imgLength = $(".image-show ul li").length;
        $(".img-length").html(imgLength);
        $(".this-index").html(idx+1);
        var index;
        $(".image-show ul li").eq(idx).addClass("img-show");
        $(".image-next").on("click", function () {
            for (var i = 0; i < imgLength; i++) {
                if ($(".image-show ul li").eq(i).hasClass("img-show")) {
                    index = i;
                }
            }
            index = index + 1;
            if (index >= imgLength) {
                index = 0
            }
            $(".image-show ul li").removeClass("img-show");
            $(".image-show ul li").eq(index).addClass("img-show");
            $(".this-index").html(index + 1);
    })
    $(".image-prev").on("click", function () {
        for(var i=0;i<imgLength;i++){
            if($(".image-show ul li").eq(i).hasClass("img-show")){
                index=i;
            }
        }
        index=index-1;
        if(index<0){
            index=imgLength-1;
        }
        $(".image-show ul li").removeClass("img-show");
        $(".image-show ul li").eq(index).addClass("img-show");
        $(".this-index").html(index+1);
    })
        $(".image-show").show();
        $(".produce-mask").show();
    })
    $(".image-delete").on("click", function () {
        $(".image-show").hide();
        $(".produce-mask").hide();
    })
}