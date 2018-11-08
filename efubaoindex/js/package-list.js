$(function(){
    $youziku.load("h1>a","57b7d71a0aa04381982fc2c26161fc0c","TSSunOld");
    $youziku.draw();
    //for(var i=0;i<$(".office .shop-img").length;i++){
    //    (function(i){
    //        $(".office .shop-img").eq(i).on("mouseover", function () {
    //            $(".office .shop-img").eq(i).attr("src","img/scene-package/office-list"+(i+1)+"-hover.jpg")
    //        })
    //    })(i);
    //    (function(i){
    //        $(".office .shop-img").eq(i).on("mouseout", function () {
    //            $(".office .shop-img").eq(i).attr("src","img/scene-package/office-list"+(i+1)+".jpg")
    //        })
    //    })(i);
    //}
    addDelete($('.jia'));
    addDelete($('.jian'));
    iptOnlyNumber(".number");
    //购买数量
    $(".number").on("blur",function(){
        if($(this).val() < $(this).attr("minnum")){
            $(this).val($(this).attr("minnum"));
        }
    });

    $(".go-buy").on("click", function () {
        var $thisId = $(this).attr("id");
        loginOrout($thisId);
    })


    $("#go-settle").click(function(){
        window.location.href=$(this).attr("basesrc")+"?cartGoodsId="+$(this).attr("cartGoodsId");
    });

    $('.keep-shop').click(function(){
        $('.mask').hide();
        $('.add-success').hide();
        $(".common-mask").hide();
        $('section,#header,#footer').removeClass('active');
    });
    //关闭按钮
    $('.close-btn').click(function() {
        $(".common-mask").hide();
        $('.mask').hide();
        $(this).parent().hide();
        $('section,#header,#footer').removeClass('active')
    });



});
//判断是否登录
function loginOrout(goodsId){
    //判断用户是否登录
    $.ajax({
        url : Mall.home+"/user/getUserInfo?time=" + new Date().getTime(),
        dataType: "jsonp",
        success : function(data){
            if(data.code == 200){
                $("#user_login").html("<a href='"+ Mall.home +"/demand/listDemand'>"+ data.data.nickname +"</a> <a id='logout' id='yfb_top_logout' href='javascript:logout()'>退出</a>");
                $("#user_register").html('<a href="'+Mall.home+'/order/list">我的订单</a>');
                saveDemand(goodsId);
            }else{
                $(".yfubao-login-mask").remove();
                $(".yfubao-login-div").remove();
                var fromUrl = window.location.href + '&amp;goodsId='+goodsId;
                console.log(fromUrl);
                fromUrl = encodeURIComponent(fromUrl);
                console.log(fromUrl);
                $("body").append('<div class="yfubao-login-mask" style="z-index:1000"></div>'+
                    '<div class="yfubao-login-div"  style="z-index:1001">'+
                    '<div class="form-title clearfix">'+
                    '<p class="left-p">登录</p>'+
                    '<p class="right-p" id="yfubao-login-close"></p>'+
                    '</div>'+
                    '<iframe src="'+Mall.home+'/user/iframe/login?fromUrl='+fromUrl+'" width="311px" height="425px" scrolling="no" frameborder="no">'+ '</iframe>'+
                    '</div> '
                );
                $(document).on("click","#yfubao-login-close", function () {
                    $(".yfubao-login-mask").hide();
                    $(".yfubao-login-div").hide();
                });
            }
        }
    });
}

function saveDemand(goodsId){
    var obj = $("#"+goodsId);
    var goods = {};
    var g={};
    var sl = new Array();
    var sizel = new Array();
    var goodsname = obj.parent().parent().find("h1 a").text();
    var goodsnum = obj.parent().find("#goodsNum").val();
    var goodsId = obj.attr("id");
    var goodsprice = obj.parent().parent().find(".shop-price-box").find(".price").text();

    g.goodsId = goodsId;
    g.goodsName = goodsname;
    g.goodsNum = goodsnum;
    g.goodsPrice = goodsprice;

    goods.g = g;
    goods.sl = sl;
    goods.sizel=sizel;
    var _json = JSON.stringify(goods);

    $.ajax({
        url : Mall.home + "/shoppingCar/add",
        dataType:"jsonp",
        type : "POST",
        data : {
            "param" : _json
        },
        jsonp: "callback",
        success : function(data){
            if(data.status == '302'){
                window.location.href = data.location;
            }
            $("#shoppingCarNum").text(data.data.count);
            $("#go-settle").attr("cartGoodsId",data.data.cartGoodsId );
        },
        complete : function(){
            $('.add-success').show();
            $(".common-mask").show();
            $('section,#header,#footer').addClass('active');
        }
    });
}
//数量加减
function addDelete(obj) {
    obj.each(function() {
        $(this).click(function() {
            var num = Number($(this).parent().find('.number').val());
            if ($(this).hasClass('jia')) {
                num += 1;
                $(this).prev().val(num);
            } else {
                console.log(num)
                num -= 1;
                if(num < $(this).parent().find("#goodsNum").attr("minnum")){
                    num = $(this).parent().find("#goodsNum").attr("minnum");
                }

                if (num < 0) {
                    num = 0
                }
                $(this).next().val(num)
            }
        })
    })
}

//输入框只能输入数字
function iptOnlyNumber(domInput) {

    $(domInput).css("ime-mode", "disabled");
    $(domInput).bind("keypress", function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);  //兼容火狐 IE
        if (!$.support.msie && (e.keyCode == 0x8))  //火狐下 不能使用退格键
        {
            return;
        }
        return code >= 48 && code <= 57 || code == 46;
    });
    $(domInput).bind("blur", function () {
        if (this.value.lastIndexOf(".") == (this.value.length - 1)) {
            this.value = this.value.substr(0, this.value.length - 1);
        } else if (isNaN(this.value)) {
            this.value = " ";
        }
    });
    $(domInput).bind("paste", function () {
        var s = clipboardData.getData('text');
        if (!/\D/.test(s));
        value = s.replace(/^0*/, '');
        return false;
    });
    $(domInput).bind("dragenter", function () {
        return false;
    });
    $(domInput).bind("keyup", function () {
        this.value = this.value.replace(/[^\d]/g, "");
        this.value = this.value.replace(/^0/g, "");
    });
}
