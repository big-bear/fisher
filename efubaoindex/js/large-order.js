/**
 * Created by Administrator on 2017/3/30.
 */
$(function () {
    var fixedHeight=$(document).scrollTop()+$(window).height()-53;
    if(fixedHeight>=$(".price-foot").offset().top){
        $(".foot-fixed").hide();
    }else if(fixedHeight<$(".price-foot").offset().top){
        $(".foot-fixed").show();
    }
    //页面下面的滚动消失与显示
    $(window).scroll(function () {
        var fixedHeight=$(document).scrollTop()+$(window).height()-53;
        if(fixedHeight>=$(".price-foot").offset().top){
            $(".foot-fixed").hide();
        }else if(fixedHeight<$(".price-foot").offset().top){
            $(".foot-fixed").show();
        }
    })

    $().ready(function() {
        $(".large-order-form").validate({
            onkeyup:false,
            onfocusout:false,
        });
    });
    $(".service-provider").on("click", function () {
        console.log(22);
        console.log($(".large-order-form").valid());
    })
    $('.checkbox-all').on("change",function() {
        var is = $(this).is(':checked');
        $('input[type="checkbox"]').prop('checked', is);
    })
    $(".checkbox").on("change",function() {
        var len=$(".checkbox").length;
        var flag=true;
        for(var i=0;i<len;i++){
            if(!$(".checkbox").eq(i).is(':checked')){
                flag=false;
            }
        }
        $('.checkbox-all').prop("checked",flag);
    })
})
