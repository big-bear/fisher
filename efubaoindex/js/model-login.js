/**
 * Created by Administrator on 2017/3/13.
 */
$(function () {
    login($(".model-login"),{
        iptWidth:300,
        height:40,
        marginB:30,
        textWidth:100,
        textSize:20
    },"http://10.20.3.11:9001/authCode/getSMSCode","2");
    $().ready(function() {
        $('#phone_form').validate({
            onkeyup:false,
            onfocusout:false,
            rules: {
                'phone': {
                    required: true,
                    number: true,
                    servicePhone: true
                },
                'messageNumber': {
                    required: true,
                    number: true,
                    rangelength: [6, 6]
                }
            },
            messages: {
                'phone':{
                    'number':'请输入合法的手机号',
                },
                'messageNumber': {
                    rangelength: '请输入正确的6位验证码'
                }
            }
        })
    });
    $('#next-btn').on('click', function(e) {
        $('#phone_form').valid();
        e.stopPropagation();
    })

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
//手机动态码框架
//content:要插入元素的div
//width:表单的宽度
//obj1:提交按钮
//obj2:form表单
//url:路径
function login(content,obj,url,datetype){
    setpcForm(content,obj);
    $(".get-message").on("click", function (e) {
        $("form label.error").remove();
        validCodeShow(url,datetype);
        if($(".valid-code").attr("state").toString()=="true"){
            if($(".valid-code input").val()==""||$(".valid-code input").val()==null){
                validValidCode("验证码为必填字段");
            }
        }
        e.stopPropagation();
    });
    //图片点击事件
    $(".code-img").on("click", function (e) {
        imageAuthCodeRefresh();
        e.stopPropagation();
    })
}
//pc的html
//要插入的元素的div
//input输入框的宽度
function setpcForm(content,obj) {
    this.width=obj.iptWidth||300;
    //计算验证码和动态码的宽度;
    var validCodewidth=width-139;
    this.height=obj.height||30;
    this.marginB=obj.marginB||18;
    this.textWidth=obj.textWidth||77;
    this.textSize=obj.textSize||14;
    //添加html
    content.append(
        '<div id="phoneCodeLoad">'+
        '<div class="phone-email clearfix">'+
        '<em class="letter-middle"><span>手机号码：</span></em>'+
    '<em><input type="text" class="phone-email-ipt" name="phone" placeholder="请输入您的手机号码" maxlength="11" style="width:'+width+"px"+'"></em>'+
        '</div>'+
        '<div class="valid-code clearfix" state="false">'+
        '<em  class="letter-middle"><span>验证码：</span></em>'+
    '<em><input type="text" name="validCode" maxlength="4" style="width:'+validCodewidth+"px"+'"></em>'+
        '<p class="code-img">' +
        '<img id=outputImage>' +
        '</p>'+
        '</div>'+
        '<div class="message-code clearfix">'+
        '<em  class="letter-middle"><span>动态码：</span></em>'+
    '<em><input type="text" name="messageNumber" maxlength="6" style="width:'+validCodewidth+"px"+'"></em>'+
        '<a href="javascript:void(0)" class="get-message">发送动态码</a>'+
        '</div>'+
        '</div>'
        );
    $("#phoneCodeLoad").find("input").css("height",height);
    $("#phoneCodeLoad").find("input").css("lineHeight",height+"px");
    $("#phoneCodeLoad").find(".get-message").css("height",height);
    $("#phoneCodeLoad").find(".get-message").css("lineHeight",height+"px");
    $("#phoneCodeLoad").find(".code-img").css("height",height);
    $("#phoneCodeLoad").find(".code-img").css("lineHeight",height+"px");
    $("#phoneCodeLoad").find(".letter-middle").css("height",height);
    $("#phoneCodeLoad").find(".letter-middle").css("lineHeight",height+"px");
    $("#phoneCodeLoad>div").css("marginBottom",marginB);
    $("#phoneCodeLoad").find(".letter-middle").css("width",textWidth);
    $("#phoneCodeLoad").find(".letter-middle").css("fontSize",textSize);
}

//验证码错误验证提示
function validValidCode(str){
    if ($('input[name="validCode"]').parent('em').find('label').length <= 0) {
        $('input[name="validCode"]').parent('em').append('<label class="error"></label>');
        $('input[name="validCode"]').next('.error').html(str).css('display', 'block');
    } else {
        $('input[name="validCode"]').next('.error').html(str).css('display', 'block');
    }

}
//判断是否出现图片验证码
function validCodeShow(url,pagetype,callback){
    var phoneNum=$(".phone-email-ipt").val();
    var imgVal=$(".valid-code input").val();
    console.log(callback);
    var flag=true;
    if(callback!=undefined){
        var flag=callback();
    }
    //手机号必须输入正确
    if(flag){
        if(/^1[34578]\d{9}$/.test(phoneNum)){
            if($(".valid-code").attr("state").toString()=="true"){
                //验证码不为空，发送数据，判断验证码是否正确，否则提示验证码错误。
                if(imgVal!="" && imgVal!=null){
                    $.ajax({
                        url:url,
                        dateType:"jsonp",
                        async:false,
                        data:{
                            "mobile" : $(".phone-email-ipt").val(),
                            "imageAuthCode" : imgVal,
                            "imageAuthCodeId" : $("#outputImage").attr("imgCodeId"),
                            "pageType" : pagetype,
                        },
                        success: function (data) {
                            //判断验证码是否正确
                            console.log(data.code);
                            if(data.code=="-1"){
                                validValidCode("图片验证码错误");
                                $(".code-img").click();
                            }
                            if(data.code=="200"){
                                componentsNew($(".get-message"));
                            }
                        },
                    })
                }else{
                    validValidCode("这是必填字段");
                }
            }else{
                $.ajax({
                    url:url,
                    dateType:"jsonp",
                    async:false,
                    data:{
                        "mobile" : $(".phone-email-ipt").val(),
                        "pageType" : pagetype,
                    },
                    success: function (data) {
                        console.log(data);
                        if(data.code=="201003"){
                            $(".valid-code").css("display","block");
                            $(".valid-code").attr("state","true");
                            $(".code-img").click();
                        }else if(data.code=="201002"){
                            if ($('input[name="phone"]').parent('em').find('label').length <= 0) {
                                $('input[name="phone"]').parent('em').append('<label class="error"></label>');
                                $('input[name="phone"]').next('.error').html('手机号码错误').css('display', 'block');
                            } else {
                                $('input[name="phone"]').next('.error').html('手机号码错误').css('display', 'block');
                            }
                        }
                    },
                })
            }
        }else{
            if ($('input[name="phone"]').parent('em').find('label').length <= 0) {
                $('input[name="phone"]').parent('em').append('<label class="error"></label>');
                $('input[name="phone"]').next('.error').html('手机号码错误').css('display', 'block');
            } else {
                $('input[name="phone"]').next('.error').html('手机号码错误').css('display', 'block');
            }
        }
    }


}
//点击60秒发送按钮
var componentFlag = true;
function componentsNew(obj) {
    var time = 60;
    if (componentFlag) {
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
                'color': '#ff5252'
            });
            componentFlag = true;
        }
    }
}
// 图片验证码刷新
function imageAuthCodeRefresh(){
    $.ajax({
        url: 'http://10.20.3.11:9001/authCode/getImageAuthCode',
        type : 'GET',
        success:function(data){
            console.log(data);
            $("#outputImage").attr("src",data.object.imgBase64Src);
            $("#outputImage").attr("imgCodeId",data.object.authCodeId);
        }
    })
}
//function aa(){
//    var flag;
//    $.ajax({
//        url : "http://home.efubao.qa/user/getUserInfoByMobile",
//        data : {
//            "mobile" : "13120188855"
//        },
//        async : false,
//        success : function(data){
//            console.log(data);
//            if(data.code == "200"){
//                flag=false;
//                console.log(flag);
//            }
//            if(data.code == "0"){
//                flag=true;
//            }
//        },
//    })
//    return flag;
//}