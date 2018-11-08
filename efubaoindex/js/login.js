$(function() {
    //$("#yfubao-login-close").on("click", function () {
    //    $(".yfubao-login-mask",parent.document).hide();
    //    $(".yfubao-login-div",parent.document).hide();
    //})

    // 初始化手机验证码组件 start
    getAuthCode($("#mobile-login-div"),{
        iptWidth:272,
        height:38,
        marginB:34,
        textWidth:0,
        textSize:12
    },  window.EFBInfo.baseURI + "/authCode/getSMSCode", 1);
    $(".letter-middle").css("display","none");
    $().ready(function() {
        $('#page2Form').validate({
            onkeyup:false,
            onfocusout:false,
            rules: {
                'mobile': {
                    required: true,
                    number: true,
                    servicePhone: true
                },
                'smsAuthCode': {
                    required: true,
                    number: true,
                    rangelength: [6, 6]
                }
            },
            messages: {
                'mobile':{
                    'required':'请输入手机号',
                    'number':'请输入合法的手机号',
                },
                'smsAuthCode': {
                    'required':'请输入动态码',
                    rangelength: '动态码错误'
                }
            }
        })
    });
    $('.sub-btn1').on('click', function(e) {
        $('#page2Form').valid();
        e.stopPropagation();
    })
    $("#mobile-login-div").css({
        "marginTop" : "37px"
    })
    // 初始化手机验证码组件 end


    //选项卡效果
    $('.login-account').click(function() {
        $(this).addClass('active');
        $('.login-phone').removeClass('active');
        $('.form-content').addClass('block');
        $('.form-content1').removeClass('block');
    });
    $('.login-phone').click(function() {
        $(this).addClass('active');
        $('.login-account').removeClass('active');
        $('.form-content1').addClass('block');
        $('.form-content').removeClass('block')
    });

    //点击TIP消失
    $('.form').children().click(function() {
        $('.none').removeClass('block');
    })

    // 图片验证码刷新
    $("#page1ImageAuthCodeRefresh").click(function(){
        imageAuthCodeRefresh("page1OutputImage");
    })
    $("#page2ImageAuthCodeRefresh").click(function(){
        imageAuthCodeRefresh("page2OutputImage");
    })

    // 获取短信验证码
    $("#getSMSAuthCode").click(function(event){
        getSMSAuthCode($(this),event);
    })

    // 加载2个登录页面的图片验证码
    imageAuthCodeRefresh("page1OutputImage");
    imageAuthCodeRefresh("page2OutputImage");

    $(".user-phone").change(function(){
        $(".user-phone").val($(this).val());
    })

    $(".user-phone,.phone-email-ipt").on("input propertychange", function(){
        $(".user-phone,.phone-email-ipt").val($(this).val());
    })
})
// 账号密码登陆
function page1FormSubmit(){
    // fromUrl
    var _fromUrl = $("#fromUrl");

    // mobile
    var _mobile = $("#page1Mobile");
    var _mobileErrorSpan = $("#page1MobileSpan");
    var _mobileErrorDiv = $("#page1MobileDiv");

    // password
    var _password = $("#page1Password");
    var _passwordErrorSpan = $("#page1PasswordSpan");
    var _passwordErrorDiv = $("#page1PasswordDiv");

    // imageAuthCode
    var _imageAuthCode = $("#page1ImageAuthCode");
    var _imageAuthCodeId = $("#page1OutputImageHiddenInput");
    var _imageAuthCodeErrorSpan = $("#page1ImageAuthCodeSpan");
    var _imageAuthCodeErrorDiv = $("#page1ImageAuthCodeDiv");

    // autoLogin
    var _autoLogin = $("#page1AutoLogin");

    var flag = true;
    if(_mobile.val().trim() == null
        || _mobile.val().trim() == ""){
        _mobileErrorDiv.text("请输入手机号码");
        _mobileErrorSpan.addClass("block");
        flag = false;
    }
    if(_mobile.val().trim() != null
        && _mobile.val().trim() != ""
        && _mobile.val().trim().length != 11){
        _mobileErrorDiv.text("手机号码错误");
        _mobileErrorSpan.addClass("block");
        flag = false;
    }
    if(_password.val().trim() == null || _password.val().trim() == ""){
        _passwordErrorDiv.text("请输入密码");
        _passwordErrorSpan.addClass("block");
        flag = false;
    }
    if(_password.val().trim() != null
        && _password.val().trim() != ""
        && ( _password.val().trim().length < 6
        || _password.val().trim().length > 12)){
        _passwordErrorDiv.text("密码错误");
        _passwordErrorSpan.addClass("block");
        flag = false;
    }
    if(_imageAuthCode.val().trim() == null || _imageAuthCode.val().trim() == ""){
        _imageAuthCodeErrorDiv.text("请输入验证码");
        _imageAuthCodeErrorSpan.addClass("block");
        flag = false;
    }
    if(_imageAuthCode.val().trim() != null
        && _imageAuthCode.val().trim() != ""
        && _imageAuthCode.val().trim().length != 4){
        _imageAuthCodeErrorDiv.text("验证码错误");
        _imageAuthCodeErrorSpan.addClass("block");
        flag = false;
    }

    if(flag){
        $.ajax({
            data : {
                "mobile" : _mobile.val(),
                "password" : _password.val(),
                "imageAuthCode" : _imageAuthCode.val(),
                "imageAuthCodeId" : _imageAuthCodeId.val(),
                "autoLogin" : _autoLogin.val()
            },
            url: window.EFBInfo.baseURI+'/user/login',
            type : 'POST',
            success:function(data){
                if(data == null){
                    return;
                }
                if(data.code == -1){
                    if(data.error == "301002"){
                        _mobileErrorDiv.text("手机号码错误");
                        _mobileErrorSpan.addClass("block");
                    }
                    if(data.error == "301007"){
                        _mobileErrorDiv.text("用户未注册");
                        _mobileErrorSpan.addClass("block");
                    }
                    if(data.error == "301008" || data.error == "301003"){
                        _passwordErrorDiv.text("密码错误");
                        _passwordErrorSpan.addClass("block");
                    }
                    if(data.error == "301004"){
                        _imageAuthCodeErrorDiv.text("验证码错误");
                        _imageAuthCodeErrorSpan.addClass("block");
                    }
                }
                if(data.code == 0){
                    //if(_fromUrl.val() == null || _fromUrl.val() == ""){
                    //    //window.location.href=data.url;
                    //    window.location.href="www.baidu.com";
                    //}else{
                    //    //window.location.href=_fromUrl.val();
                    //    window.location.href="www.baidu.com";
                    //}
                    console.log(11);
                    $(".yfubao-login-mask",parent.document).hide();
                    $(".yfubao-login-div",parent.document).hide();
                }
            }
        })
    }

}
// 手机动态登陆
function page2FormSubmit(){
    // fromUrl
    var _fromUrl = $("#fromUrl");
    if($("#page2Form").valid()){
        $.ajax({
            data : {
                "mobile" : $(".phone-email-ipt").val(),
                "smsAuthCode" : $(".sms-auth-code-ipt").val(),
            },
            url: window.EFBInfo.baseURI+'/user/mobileLogin',
            type : 'POST',
            success:function(data){
                if(data == null){
                    return;
                }
                if(data.code == -1){
                    if(data.error == "301002"){
                        showError($(".phone-email-ipt"), "手机号码错误");

                    }
                    if(data.error == "301007"){
                        showError($(".phone-email-ipt"), "用户未注册");
                    }
                    if(data.error == "301005"){
                        showError($(".sms-auth-code-ipt"), "动态码错误");
                    }
                }
                if(data.code == 0){
                    //if(_fromUrl.val() == null || _fromUrl.val() == ""){
                    //    window.location.href=data.url;
                    //}else{
                    //    window.location.href=_fromUrl.val();
                    //}
                    console.log(11);
                    $(".yfubao-login-mask",parent.document).hide();
                    $(".yfubao-login-div",parent.document).hide();
                }
            }
        })
    }
}
window.tflag = true;
var double = false;
