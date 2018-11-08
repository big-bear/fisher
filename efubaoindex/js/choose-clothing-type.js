/**
 * Created by Administrator on 2017/6/14.
 */
$(function () {
    $(".thishead").load("new-header.html #header");
    $(".thisfooter").load("new-footer.html .footer");
    //var scrollY=$(".thishead").height()+$(".main").height()+80;
    fixedDiv();
    $(window).on("scroll", function () {
        fixedDiv();
    })
    for(var i=0;i<8;i++){
        for(var j=0;j<=3;j++){
            $(".main ul li").eq(i+j*8).find(".clothing-bg").css({
                "backgroundPositionX":-i*147-20+"px",
                "backgroundPositionY":-j*189-20+"px",
            })
        }
    }
    $(".main ul li").on("click", function () {
        $(".main ul li").removeClass("active");
        $(this).addClass("active");
    })
    window.EFBInfo = {
        baseURI:"http://home.efubao.qa"
    }
    getAuthCode($("#mobile-login-div"),{
        iptWidth:250,
        height:38,
        marginB:"0px",
        textWidth:"100%",
        textSize:12
    },  window.EFBInfo.baseURI + "/authCode/getSMSCode", 1);
    $("#mobile-login-div i").hide();
    $(".send-sms-auth-code").addClass("disabled-box");
    $("#phoneCodeLoad").find(".letter-middle").css("lineHeight","40px");
    $("#mobile").on("input propertychange", function () {
        var phoneNum=$(".phone-email-ipt").val();
        if(/^1[34578]\d{9}$/.test(phoneNum)){
            $(".send-sms-auth-code").removeClass("disabled-box");
        }else{
            $(".send-sms-auth-code").addClass("disabled-box");
        }
    });
    $(".popup .close").on("click", function () {
        $(this).parents(".popup").hide();
        $(".common-mask").hide();
    });
    $(".submit").on("click", function () {
        var $list=$(".main ul li");
        var _flag=false;
        for(var i=0;i<$list.length;i++){
            if($list.eq(i).hasClass("active")){
                _flag=true;
            }
        }
        if(_flag){
            $(".common-mask").show();
            $("#pop-login").show();
        }else{
            bompBoxfFade("请选择定制的服装种类");
        }
    })
    $(".login-tijiao").on("click", function () {
        $("#pop-login").hide();
        $("#tijiao-success").show();
    })
    $("#tijiao-success .btn-danger").on("click", function () {
        $("#tijiao-success").hide();
        $(".common-mask").hide();
    })
})
function fixedDiv(){
    var x=$(window).height()+$(document).scrollTop();
    if(x<1014){
        $(".bottom-div").removeClass("static");
        $(".main").css("paddingBottom","120px");
    }else{
        $(".bottom-div").addClass("static");
        $(".main").css("paddingBottom","50px");
    }
}