/**
 * 短信验证码组件封装
 *
 * @author lizeshuai
 *
 * @param content
 * @param obj
 * @param url
 */

//手机动态码框架
//content:要插入元素的div
//width:表单的宽度
//obj1:提交按钮
//obj2:form表单
//url:路径
function getAuthCode(content,obj,url, pageType){
    $("body").on("click",function(event){
        $("form label.error").remove();
        event.stopPropagation();
    })
    $("input").on("click",function(event){
        $("form label.error").remove();
        event.stopPropagation();
    });
    setpcForm(content,obj);
    $(".send-sms-auth-code").on("click", function (e) {
        if($(this).hasClass("disabled")){
            return;
        }
        $("form label.error").remove();
        validCodeShow(url, pageType);
        if($(".valid-code").attr("state").toString()=="true"){
            if($(".valid-code input").val()==""||$(".valid-code input").val()==null){
                validValidCode("请输入验证码");
            }
        }
        e.stopPropagation();
    });
    //图片点击事件
    $(".code-img").on("click", function (e) {
        imageAuthCodeRefresh("outputImage");
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
        '<em class="letter-middle"><span><i>*</i>手机号码：</span></em>'+
        '<em><input id="mobile"  type="text" class="phone-email-ipt" name="principal.mobile" placeholder="手机号码" maxlength="11" style="width:'+width+"px"+'"></em>'+
        '</div>'+
        '<div class="valid-code clearfix" state="false">'+
        '<em  class="letter-middle"><span><i>*</i>验证码：</span></em>'+
        '<em><input type="text" id="validCode" name="validCode" class="image-auth-code-ipt" placeholder="验证码" maxlength="4" style="width:'+validCodewidth+"px"+'"></em>'+
        '<p class="code-img">' +
        '<img id="outputImage" class="outputImage valid-img" alt=""><input id="outputImageHiddenInput" name="page1ImageAuthCodeId" value="" type="hidden" />' +
        '</p>'+
        '</div>'+
        '<div class="message-code clearfix">'+
        '<em  class="letter-middle"><span><i>*</i>动态码：</span></em>'+
        '<em><input type="text" id="smsAuthCode"  name="smsAuthCode" class="sms-auth-code-ipt" placeholder="短信动态码" maxlength="6" style="width:'+validCodewidth+"px"+'"></em>'+
        '<a href="javascript:void(0)" id="getSMSAuthCode" class="send-sms-auth-code">发送动态码</a>'+
        '</div>'+
        '</div>'
    );
    $("#phoneCodeLoad").find("input").css("height",height);
    $("#phoneCodeLoad").find("input").css("lineHeight",height+"px");
    $("#phoneCodeLoad").find(".send-sms-auth-code").css("height",height);
    $("#phoneCodeLoad").find(".send-sms-auth-code").css("lineHeight",height+"px");
    $("#phoneCodeLoad").find(".code-img").css("height",height);
    $("#phoneCodeLoad").find(".code-img").css("lineHeight",height+"px");
    $("#phoneCodeLoad").find(".letter-middle").css("height",height);
    $("#phoneCodeLoad").find(".letter-middle").css("lineHeight",height+"px");
    $("#phoneCodeLoad>div").css("marginBottom",marginB);
    $("#phoneCodeLoad").find(".letter-middle").css("width",textWidth);
    $("#phoneCodeLoad").find(".letter-middle span").css("fontSize",textSize);
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

// 错误提示
function showError(obj, str){
    if (obj.parent('em').find('label').length <= 0) {
        obj.parent('em').append('<label class="error"></label>');
        obj.next('.error').html(str).css('display', 'block');
    } else {
        obj.next('.error').html(str).css('display', 'block');
    }

}
//判断是否出现图片验证码
function validCodeShow(url, pageType){

    execute();

    function execute(){
        var phoneNum=$(".phone-email-ipt").val();
        var imgVal=$(".valid-code input").val();
        //手机号必须输入正确
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
                            "imageAuthCodeId" : $("#outputImage").attr("image-id"),
                            "pageType" : pageType
                        },
                        success: function (data) {
                            console.log("33");
                            //判断验证码是否正确
                            if(data.code=="-1"){
                                validValidCode("图片验证码错误");
                                $(".code-img").click();
                            }
                            if(data.code=="200"){
                                componentsNewNew($(".send-sms-auth-code"));
                            }
                        }
                    })
                }else{
                    validValidCode("请输入验证码");
                }
            }else{
                $.ajax({
                    url:url,
                    dateType:"jsonp",
                    async:false,
                    data:{
                        "mobile" : $(".phone-email-ipt").val(),
                        "pageType" : pageType
                    },
                    success: function (data) {
                        if(data.code=="201003"){
                            $(".valid-code").css("display","block");
                            $(".valid-code").attr("state","true");
                            $(".code-img").click();
                        }else if(data.code=="200"){
                            componentsNewNew($(".send-sms-auth-code"));
                        }else if(data.code=="201002"){
                            showError($('input[name="principal.mobile"]'), data.message);
                        }else if(data.code=="100001"){
                            showError($('input[name="principal.mobile"]'), data.message);
                        }else{
                            showError($('input[name="principal.mobile"]'), "未知错误");
                        }
                    },
                })
            }
        }else{
            if ($('input[name="principal.mobile"]').parent('em').find('label').length <= 0) {
                $('input[name="principal.mobile"]').parent('em').append('<label class="error"></label>');
                $('input[name="principal.mobile"]').next('.error').html('手机号码错误').css('display', 'block');
            } else {
                $('input[name="principal.mobile"]').next('.error').html('手机号码错误').css('display', 'block');
            }
        }
    }


}


//点击60秒发送按钮
var componentFlag = true;
function componentsNewNew(obj) {
    var time = 60;
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
                'color': '#ff5252'
            });
            componentFlag = true;
            obj.removeClass("disabled");
        }
    }
}
