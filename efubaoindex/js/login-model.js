/**
 * Created by Administrator on 2017/7/26.
 */
(function (w) {
    function login(content,url,forgetUrl,state) {
        this.content=content;
        this.url=url;
        this.state=state;
        this.forgetUrl=forgetUrl;
    }

    login.prototype = {
        init: function () {
            var that = this;
            that.setHtml(that.content,this.forgetUrl);
            that.hideError();
            that.imageAuthCodeRefresh("page1OutputImage");
            $("#page1ImageAuthCodeRefresh").click(function () {
                that.imageAuthCodeRefresh("page1OutputImage");
            })

            $("#submit-btn").on("click", function (e) {
                e.stopPropagation();
                var emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
                var _fromUrl = '';
                var _mobile = $("#page1Mobile").val();
                var _password = $("#page1Password").val();
                var _imageAuthCode = $("#page1ImageAuthCode").val();
                var _imageAuthCodeId = $("#page1OutputImageHiddenInput").val();
                var _autoLogin = $("#page1AutoLogin").val();
                var flag = true;
                if (_mobile.trim() == null || _mobile.trim() == "") {
                    that.showError($("#page1Mobile"), '请输入手机号');
                    flag = false;
                }
                if(that.state=='shop'){
                    if (_mobile.trim() != null && _mobile.trim() != "" && !/^1[34578]\d{9}$/.test(_mobile.trim()) && !emailReg.test(_mobile.trim())) {
                        that.showError($("#page1Mobile"), '账号格式错误');
                        flag = false;
                    }
                }else {
                    if (_mobile.trim() != null && _mobile.trim() != "" && !/^1[34578]\d{9}$/.test(_mobile.trim())) {
                        that.showError($("#page1Mobile"), '手机号码错误');
                        flag = false;
                    }
                }

                if (_password.trim() == null || _password.trim() == "") {
                    that.showError($("#page1Password"), '请输入密码');
                    flag = false;
                }
                if (_password.trim() != null
                    && _password.trim() != ""
                    && ( _password.trim().length < 6
                    || _password.trim().length > 12)) {
                    that.showError($("#page1Password"), '请输入6-12为密码');
                    flag = false;
                }
                if ($(".reg-code-box").attr("state") == 'true') {
                    if(_imageAuthCode.trim() == null || _imageAuthCode.trim() == ""){
                        that.showError($("#page1ImageAuthCode"), '请输入验证码');
                        flag = false;
                    }
                    if(_imageAuthCode.trim() != null
                        && _imageAuthCode.trim() != ""
                        && _imageAuthCode.trim().length != 4){
                        that.showError($("#page1ImageAuthCode"), '验证码错误');
                        flag = false;
                    }

                }
                if (flag) {
                    //有图片验证
                    if ($(".reg-code-box").attr("state") == 'true') {
                        $.ajax({
                            data: {
                                "mobile": _mobile,
                                "password": _password,
                                "imageAuthCode": _imageAuthCode,
                                "imageAuthCodeId": _imageAuthCodeId,
                                "autoLogin": _autoLogin
                            },
                            url: that.url,
                            type: 'POST',
                            success: function (data) {
                                if(that.state=='shop'){
                                    that.ajaxSuccessFn(data.data);
                                }else{
                                    that.ajaxSuccessFn(data);
                                }

                            }
                        })
                        //没有图片验证码
                    }else{
                        $.ajax({
                            data: {
                                "mobile": _mobile,
                                "password": _password,
                                "autoLogin": _autoLogin
                            },
                            url: that.url,
                            type: 'POST',
                            success: function (data) {
                                if(that.state=='shop'){
                                    that.ajaxSuccessFn(data.data);
                                }else{
                                    that.ajaxSuccessFn(data);
                                }
                            }
                        })
                    }

                }

            })
        },
        setHtml: function (content,url) {
            var that = this;
            var placeholderText="";
            if(that.state=='shop'){
                placeholderText="手机号码或邮箱";
            }else{
                placeholderText="手机号码";
            }
            content.append(
                '<form id="page1Form" method="POST">'+
                '<em>'+
                '<div class="group group1">'+
                '<input type="text" id="page1Mobile" placeholder='+placeholderText+' name="page1Mobile" value="" class="phone-number user-phone">'+
                '</div>'+
                '</em>'+
                '<em>'+
                '<div class="group">'+
                '<input type="password"  id="page1Password" placeholder="密码" name="page1Password" value="" class="password">'+
                '</div>'+
                '</em>'+
                '<em>'+
                '<div class="reg-code-box clearfix" state="false">'+
                '<input type="text" id="page1ImageAuthCode" placeholder="验证码" name="page1ImageAuthCode" value="" class="reg-code">'+
                '<span class="img-code">'+
                '<span class="img-code-url">'+
                '<img id="page1OutputImage" class="outputImage" alt="" image-id="7d9d2c1d-80c4-4a49-b306-c41e7562ee5a">'+
                '<input id="page1OutputImageHiddenInput" name="page1ImageAuthCodeId" type="hidden">'+
                '</span>'+
                '<span id="page1ImageAuthCodeRefresh" class="refresh"></span>'+
                '</span>'+
                '</div>'+
                '</em>'+
                '<div class="tip clearfix">'+
                '<span class="two-week-box">'+
                '<input type="checkbox" id="page1AutoLogin" name="page1AutoLogin">'+
                '<label for="page1AutoLogin">两周内自动登录</label>'+
                '</span>'+
                '<a href="'+url+'" class="forget-password">忘记密码？</a>'+
                '</div>'+
                '<a href="javascript:void(0);" class="sub-btn" id="submit-btn">登 录</a>'+
                '</form>')
        },
        //验证码刷新方法
        imageAuthCodeRefresh: function (imageInputId) {
            $.ajax({
                url: window.EFBInfo.baseURI + '/authCode/getImageAuthCode',
                type: 'GET',
                success: function (data) {
                    $("#" + imageInputId).attr("src", data.object.imgBase64Src);
                    $("#" + imageInputId).attr("image-id", data.object.authCodeId);

                    /**
                     * 兼容原来的页面布局，如果全部换成新的布局，以下代码可以删除
                     * dongtf dongtengfei@efubao.com 2017-03-28
                     */
                    $("#" + imageInputId).next("input[type='hidden']").val(data.object.authCodeId);
                }
            })
        },
        //错误显示方法
        showError: function (obj, str) {
            if (obj.parents('em').find('label').length <= 0) {
                obj.parents('em').append('<label class="error"></label>');
                obj.parents('em').find(".error").html(str).css('display', 'block');
            } else {
                obj.next('.error').html(str).css('display', 'block');
            }
        },
        hideError: function () {
            $("body").on("click", function (event) {
                $("form label.error").remove();
            });
            $("input").on("click", function (event) {
                $("form label.error").remove();
                event.stopPropagation();
            });
        },
        ajaxSuccessFn: function (data) {
            var that=this;
            var _fromUrl = $(".login_form_url").val();
            if (data == null) {
                return;
            }
            if (data.code == -1) {
                var errCode=data.error.substring(data.error.length-3);
                if(errCode=='004'){
                    $(".reg-code-box").show();
                    $(".reg-code-box").attr("state","true");
                    that.imageAuthCodeRefresh("page1OutputImage");
                    that.showError($("#page1ImageAuthCode"), '验证码错误');
                }
                if (errCode == "001") {
                    that.showError($("#page1Mobile"), '参数错误');
                }
                if (data.code == "301002") {
                    that.showError($("#page1Mobile"), '手机号码错误');
                }
                if (data.code == "901002") {
                    that.showError($("#page1Mobile"), '账号格式错误');
                }
                if (errCode == "003") {
                    that.showError($("#page1Password"), '请输入6-12位数字+字母组合');
                }
                if (errCode == "006") {
                    that.showError($("#page1Mobile"), '不合法');
                }
                if (errCode == "007") {
                    that.showError($("#page1Mobile"), '用户未注册');
                }
                if (errCode == "008" ) {
                    that.showError($("#page1Password"), '密码错误');
                }
            }
            if (data.code == 0) {

                if(that.state=='shop'){
                    if (data.object.successUrl) {
                        window.location.href = data.object.successUrl;
                    } else {
                        window.location.href = _fromUrl;
                    }
                }else{
                    if (data.url) {
                        window.location.href = data.url;
                    } else {
                        window.location.href = _fromUrl;
                    }
                }

            }
        }
    }
    w.login = login;
}(window))