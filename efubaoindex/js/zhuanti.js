/**
 * Created by Administrator on 2017/10/30.
 */
$(function () {
    var Mall={};
    var url="http://home.efubao.qa" + "/authCode/getSMSCode", pageType=2;
    getAuthCode($(".sms-code-div"),{
        iptWidth:300,
        height:38,
        marginB:18,
        textWidth:90,
        textSize:20
    },  url, pageType);
    $(".phone-email .letter-middle span").html("手机号:");
    $("#smsAuthCode").css("width","196px");
    $("#validCode").css("width","196px");
    $(".dingzhi-type li").on("click", function () {
        $(this).addClass("active").siblings().removeClass("active");
    })
    console.log($(document).scrollTop());
    var flag=true
    $(".go-work .fra").on("click", function () {
            //if(!flag){
            //    return;
            //}
            //flag=false;
            //$('body,html').animate({
            //    'scrollTop': 3897
            //}, 100,function(){
            //    flag=true;
            //})
        $(document).scrollTop("3897");
    })
    $("#go-success").on("click", function () {
        showToast("haha","warn");
    })
})
function componentsNewNew(obj) {
    var time = 10;
    if (componentFlag) {
        obj.addClass("disabled");
        obj.html('重发&nbsp;&nbsp;(60s)').css({
            'border-color': '#ccc',
            'color': '#ccc'
        });

        var t = setInterval(count, 1000);
        componentFlag = false;
    }
    function count() {
        time -= 1;
        obj.html('重发&nbsp;&nbsp;(' + time + 's)').css({
            'border-color': '#ccc',
            'color': '#ccc'
        });
        if (time <= 0) {
            clearInterval(t);
            obj.html('获取动态码').css({
                'border-color': '#ff5252',
                'color': '#fff'
            });
            componentFlag = true;
            obj.removeClass("disabled");
        }
    }
}