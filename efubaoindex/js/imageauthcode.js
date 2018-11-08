// 图片验证码刷新
function imageAuthCodeRefresh(imageInputId){
    $.ajax({
        url: window.EFBInfo.baseURI+'/authCode/getImageAuthCode',
        type : 'GET',
        success:function(data){
            $("#" + imageInputId).attr("src",data.object.imgBase64Src);
            $("#" + imageInputId).attr("image-id",data.object.authCodeId);

            /**
             * 兼容原来的页面布局，如果全部换成新的布局，以下代码可以删除
             * dongtf dongtengfei@efubao.com 2017-03-28
             */
            $("#" + imageInputId).next("input[type='hidden']").val(data.object.authCodeId);
        }
    })
}