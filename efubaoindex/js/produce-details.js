/**
 * Created by Administrator on 2017/3/29.
 */
$(function(){
    //上传开始
    var uploader = WebUploader.create({
        auto:true,
        swf:  'webload/Uploader.swf',
        server: 'http://10.20.3.17:8091/fileupload/singlepic',
        pick: '#ctlBtn',
        resize: false,
        fileSingleSizeLimit:4*1024*1024,
        fileNumLimit:10,
        accept : {
            title : 'intoTypes',
            extensions : 'jpg,jpeg,png,doc,xls,docx,xlsx,pdf,',
            mimeTypes : '.jpg,.jpeg,.png,.doc,.xls,.docx,.xlsx,.pdf,application/msword,'
        },
    })
    //上传开始事件
    uploader.on('fileQueued', function (file) {
        //if($(".upload-ul li").length==10){
        //    $(".upload-ul").append("<p class='error-p'>文件名不能重复</p>");
        //}
        //if($(".upload-ul li").length<=9 && file.size/(1024*1024)<=4){
            $(".upload-ul").find(".error-p").remove();
            $(".upload-ul").append('<li id="'+file.id+'" class="item">'+
                '<span class="upload-file-name info shengluehao">'+file.name+'</span>'+
                '<span class="upload-status">上传开始</span>'+
                '<span class="upload-progress">'+
                '<div class="upload-progressbar"></div>'+
                '</span>'+
                '<span class="upload-delete">删除</span>'+
                '</li>');
            //删除功能
        $( '#'+file.id ).find(".upload-delete").on("click", function () {
            console.log($(this).parent())
            $(this).parent().remove();
            uploader.removeFile(file,true);
        })
        //}
    });
    //上传过程事件
    uploader.on( 'uploadProgress', function( file, percentage ) {
        $('#'+file.id).find(".upload-progressbar").animate({
            "width":percentage*100+"%"
        },600,"linear");

        $( '#'+file.id ).find(".upload-delete").on("click", function () {
            $(this).parent().remove();
            uploader.removeFile(file,true);
        })
    });
    //上传成功事件
    uploader.on( 'uploadSuccess', function( file,res ) {
        if(res.code==200){
            $( '#'+file.id ).find(".upload-delete").on("click", function () {
                console.log($(this).parent())
                $(this).parent().remove();
                uploader.removeFile(file,true);
            })
            $( '#'+file.id ).find('.upload-status').text('上传成功');
        }else{
            $( '#'+file.id ).find('.upload-status').text('网络错误，上传失败');
            $( '#'+file.id ).find('.upload-status').css({
                'color':'#ff5252',
                'right':'90px'
            })
        }
    });
    //上传错误事件
    uploader.on( 'uploadError', function( file,res,res2 ) {
        console.log(res);
        $( '#'+file.id ).find('.upload-status').text('上传出错').css({
            'color':'#ff5252'
        });
    });
    uploader.on("error", function (type,res) {
        console.log(type);
        console.log(res.ext);
        if(type=="F_EXCEED_SIZE"){
            $(".upload-ul").append("<p class='error-p'>文件大小不能超过4M</p>");
        }
        if(type=="F_DUPLICATE"){
            $(".upload-ul").append("<p class='error-p'>文件名称重复</p>");
        }
        if(type=="Q_TYPE_DENIED"){
            if(res.ext=="docx"){
                $(".upload-ul").append("<p class='error-p'>word文件暂时只支持doc格式，请将docx格式文件转换为doc格式，给您带来的不便敬请谅解</p>");
            }else{
                $(".upload-ul").append("<p class='error-p'>仅支持支持jpg、jpeg、png、doc、docx、xls、xlsx、pdf格式文件</p>");
            }

        }
        if(type=="Q_EXCEED_NUM_LIMIT"){
            $(".upload-ul").append("<p class='error-p'>最多只能添加10个附件</p>");
        }
    })
    //上传结束事件
    uploader.on( 'uploadComplete', function( file ) {
        //$( '#'+file.id ).find('.progress').fadeOut();
    });
    //上传事件结束
    //上传的删除事件
    $(".upload-delete").on("click", function () {
        console.log($(this).parent())
        $(this).parent().remove();
    })
    //需要还是不需要的切换
    $(".sample-btn").on("click", function () {
        $(".sample-btn").removeClass("active");
        $(this).addClass("active");
    })
    //弹出层的消失
    $(".produce-popup-close").on("click", function () {
        $(this).parents(".produce-popup").css("display","none");
        $(".produce-mask").css("display","none");
    })
    //弹出层的出现
    $("#click-choose").on("click", function () {
        $(".produce-mask").css("display","block");
        $(".produce-popup").css("display","block");
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

    $(".produce-popup-floor ul li").on("click", function () {
        var liHtml=$(this).html();
        $(".choose-class-p").html(liHtml);
        $(".choose-class-p").css("padding","0 20px")
        $(this).parents(".produce-popup").css("display","none");
        $(".produce-mask").css("display","none");
        $("#click-choose").html("重新选择");
    });
    $().ready(function () {
        $("#produce-form").validate({
            onkeyup:false,
            onfocusout:false,
            rules:{
                "demand-name":{
                    required: true,
                },
                "demand-numer":{
                    required: true,
                    number: true,
                },
                "minprice":{
                    required: true,
                    number: true,
                },
                "maxprice":{
                    required: true,
                    number: true,
                }
            },
            message:{
                "demand-name":{
                    "required":"请输入名称",
                },
                "demand-numer":{
                    "number":"请输入数字",
                },
                "minprice":{
                    number:"请输入数字",
                },
                "maxprice":{
                    number: "请输入数字",
                }
            }
        })
    })

    $(".product-continue-btn").on("click", function (e) {
        console.log(11);
        //if($(".choose-class-p").html()==""){
        //    bompBoxfFade("请选择分类");
        //}
        e.stopPropagation();
        tdProduceName();
    });
    //弹出层图片的循环展示
    var imgLength=$(".image-show ul li").length;
    $(".img-length").html(imgLength);
    var index=0;
    $(".image-next").on("click", function () {
        for(var i=0;i<imgLength;i++){
            if($(".image-show ul li").eq(i).hasClass("img-show")){
                index=i;
            }
        }
        index=index+1;
        if(index>=imgLength){
            index=0
        }
        $(".image-show ul li").removeClass("img-show");
        $(".image-show ul li").eq(index).addClass("img-show");
        $(".this-index").html(index+1);
    })
    $(".image-prev").on("click", function () {
        for(var i=0;i<imgLength;i++){
            if($(".image-show ul li").eq(i).hasClass("img-show")){
                index=i;
            }
        }
        index=index-1;
        if(index<0){
            index=imgLength-1;
        }
        $(".image-show ul li").removeClass("img-show");
        $(".image-show ul li").eq(index).addClass("img-show");
        $(".this-index").html(index+1);
    })
    $(".td-show-img").on("click", function () {
        $(".image-show").show();
        $(".produce-mask").show();
    })
    $(".image-delete").on("click", function () {
        $(".image-show").hide();
        $(".produce-mask").hide();
    })
})
function tdProduceName(){
    var flag=false;
    console.log($(".td-produce-name").eq(0).text());
    for(var i=0;i<$(".td-produce-name").length;i++){
        if($(".demand-name").val()==$(".td-produce-name").eq(i).text()){
            flag=true;
        }
    }
    console.log(flag);
    if(flag){
        errorPrompt($(".demand-name"),"名称不能重复");
    }
}
function errorPrompt(obj,str){
    if (obj.parent('em').find('label').length <= 0) {
        obj.parent('em').append('<label class="error"></label>');
        obj.next('.error').html(str).css('display', 'block');
    } else {
        obj.next('.error').html(str).css('display', 'block');
    }

}