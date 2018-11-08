/**
 * Created by Administrator on 2017/3/29.
 */
$(function () {
    $(".produce-time li").on("click", function () {
        $(".produce-time li").removeClass("active");
        $(this).addClass("active");
    })
    $(".produce-invoice li").on("click", function () {
        $(".produce-invoice li").removeClass("active");
        $(this).addClass("active");
    })
    $().ready(function () {
        $("#produce-form2").validate({
            onkeyup:false,
            onfocusout:false,
            rules:{
                "produce-date":{
                    required: true,
                },
                "province":{
                    required: true,
                },
                "city":{
                    required: true,
                },
            },
            message:{
                "produce-date":{
                    "required":"请输入名称",
                },
                "province":{
                    "required":"请输入数字",
                },
                "city":{
                    "required":"请输入数字",
                },
            }
        })
    })
    $("#produce-submit").on("click", function (e) {
        console.log($("#produce-form2").valid());
        e.stopPropagation();
        $(window).scrollTop(300);
    });
    $("body").on("click",function(event){
        $("form label.error").remove();
        event.stopPropagation();
    })
    $("input").on("click",function(event){
        console.log(122);
        $("form label.error").remove();
        event.stopPropagation();
    });
})