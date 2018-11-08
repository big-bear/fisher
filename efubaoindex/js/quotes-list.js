/**
 * Created by Administrator on 2017/3/30.
 */
$(function () {
    //点击生产商，下面所有单选框被选中
    $(".check-top").on("change", function () {
        var is=$(this).is(':checked');
        $(this).parents("table").find(".check").prop('checked', is);
    });
    //点击单选框，生产上的单选框被选中
    $(".check").on("change", function () {
        var is=true;
        var checkLength=$(this).parents("table").find(".check").length;
        for(var i=0;i<checkLength;i++){
            if(!$(this).parents("table").find(".check").eq(i).is(':checked')){
                is=false;
            }
        }
        $(this).parents("table").find(".check-top").prop('checked', is);
    })


    $(".td-showimg").on("click", function () {
        //showImage($(this),"imgurl");
        viewportShow($(this),"imgurl");
        $('#viewer').viewer();
        $(".image-show").show();
        $(".produce-mask").show();
    })
    $(".image-delete").on("click", function () {
        $(".image-show").hide();
        $(".produce-mask").hide();
    })

    if($(document).scrollTop()+$(window).height()-53>=$(".price-foot").offset().top){
        $(".foot-fixed").hide();
    }
    //图片的展示功能结束
    //页面下面的滚动消失与显示
    $(window).scroll(function () {
        var fixedHeight=$(document).scrollTop()+$(window).height()-53;
        if(fixedHeight>=$(".price-foot").offset().top){
            $(".foot-fixed").hide();
        }else if(fixedHeight<$(".price-foot").offset().top){
            $(".foot-fixed").show();
        }
    })
    $(".quotes-popup-title-right").on("click", function () {
        $(".quotes-popup").hide();
        $(".produce-mask").hide();
    })
    $(".service-provider").on("click", function () {
        $(".quotes-popup").show();
        $(".produce-mask").show();
    })
    $(".quotes-popup-nook").on("click", function () {
        $(".quotes-popup").hide();
        $(".produce-mask").hide();
    })
    addDelete($('.jia'));
    addDelete($('.jian'));
    //$(".jia,.jian").mouseout(function(){
    //    if(sendUpdate){
    //        var goodsId=$(this).parents("tr[cartgoodsid]").attr("cartgoodsid");
    //        var newNum=$(this).siblings(".number").val();
    //        updateGoodsNum(goodsId,newNum);
    //    }
    //
    //    sendUpdate=false;
    //})
})
function showImage(obj,data){
    $(".image-next").off("click");
    $(".image-prev").off("click");
    var arr=obj.data(data).split(",");
    if($.trim(arr[arr.length-1])==""){
        arr.splice(length-1,1);
    }
    var imgLiStr="";
    for(var i=0;i<arr.length;i++){
        imgLiStr=imgLiStr+'<li><img src="'+arr[i]+'"></li>'
    }
    $(".image-show ul").html(imgLiStr);
    $(".image-show ul li").eq(0).addClass("img-show");
    var imgLength=$(".image-show ul li").length;
    $(".img-length").html(imgLength);
    $(".this-index").html(1);
    var index=0;
    $(".image-next").on("click", function () {
        for(var i=0;i<imgLength;i++){
            if($(".image-show ul li").eq(i).hasClass("img-show")){
                index=i;
            }
        }
        index=index+1;
        if(index>=imgLength){
            index=0
        }
        $(".image-show ul li").removeClass("img-show");
        $(".image-show ul li").eq(index).addClass("img-show");
        $(".this-index").html(index+1);
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
}
var sendUpdate=false;
function addDelete(obj) {
    obj.each(function() {
        $(this).click(function() {
            var minimum=$(this).siblings(".number").data("minimum")>0?$(this).siblings(".number").data("minimum"):1;//����
            var num = Number($(this).parent().find('.number').val());
            if ($(this).hasClass('jia')) {
                num += 1;
                $(this).prev().val(num);
            } else {
                num -= 1;
                if (num < minimum) {
                    num = minimum //��Сֵ
                }
                $(this).next().val(num)
            }
            sendUpdate=true;
        })
    })
}
function viewportShow(obj,data){
    var arr=obj.data(data).split(",");
    if($.trim(arr[arr.length-1])==""){
        arr.splice(length-1,1);
    }
    var imgLiStr="";
    for(var i=0;i<arr.length;i++){
        imgLiStr=imgLiStr+'<li><img src="'+arr[i]+'"></li>'
    }
    $("#viewer").html(imgLiStr);
}
