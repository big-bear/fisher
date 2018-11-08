/**
 * Created by Administrator on 2017/3/17.
 */
$(function () {
    //上传开始
    var uploader = WebUploader.create({
        auto:true,
        swf:  'webload/Uploader.swf',
        server: 'http://10.20.3.17:8091/fileupload/singlepic',
        pick: '#ctlBtn',
        resize: false,
        fileSingleSizeLimit:4*1024*1024,
        accept : {
            title : 'Images',
            extensions : 'jpg,jpeg,png',
            mimeTypes : 'image/jpg,image/jpeg,image/png'
        },
    })
    //上传开始事件
    uploader.on('fileQueued', function (file,data) {
        console.log(file);
        console.log(data);
        if($(".upload-ul li").length<=9 && file.size/(1024*1024)<=4){
            $(".upload-ul").find(".error-p").remove();
            $(".upload-ul").append('<li id="'+file.id+'" class="item">'+
                '<span class="upload-time"></span>'+
                '<span class="upload-file-name info shengluehao">'+file.name+'</span>'+
                '<span class="upload-status">上传开始</span>'+
                '<span class="upload-progress">'+
                '<div class="upload-progressbar"></div>'+
                '</span>'+
                '<span class="upload-delete">删除</span>'+
                '</li>');
            //删除功能
            $(".upload-delete").on("click", function () {
                console.log($(this).parent())
                $(this).parent().remove();
            })
        }
    });
    //上传过程事件
    uploader.on( 'uploadProgress', function( file, percentage ) {
            $('#'+file.id).find(".upload-progressbar").animate({
                "width":percentage*100+"%"
            },"linear");
    });
    //上传成功事件
    uploader.on( 'uploadSuccess', function( data,file ) {

        console.log(file.message.msg);
        $(".upload-delete").on("click", function () {
            console.log($(this).parent())
            $(this).parent().remove();
            uploader.removeFile(data,true);
        });
        $( '#'+data.id ).find('.upload-status').text('上传成功');
        $( '#'+data.id ).find('.upload-time').text(getNowFormatDate());
    });
    //上传错误事件
    uploader.on( 'uploadError', function( file,error ) {
        console.log(file);
        console.log(error);
        $( '#'+file.id ).find('.upload-status').text('上传出错');
    });
    uploader.on("error", function (type,file) {
        console.log(type);
        if(type=="F_EXCEED_SIZE"){
            console.log("出错");
            $(".upload-ul").append("<p class='error-p'>文件大小不能超过4M</p>");
        }
        if(type=="F_DUPLICATE"){
            console.log("出错");
            $(".upload-ul").append("<p class='error-p'>文件名称重复</p>");
        }
        if(type=="Q_TYPE_DENIED"){
            $(".upload-ul").append("<p class='error-p'>只支持jpg,jpeg,png格式文件</p>");
        }
    })
    //上传结束事件
    uploader.on( 'uploadComplete', function( file ) {
        //$( '#'+file.id ).find('.progress').fadeOut();
    });
    //上传事件结束
    $(".upload-delete").on("click", function () {
        console.log($(this).parent())
        $(this).parent().remove();
    })
    //分类的多选框
    $(".second-ul").find("li").on("click", function () {
        if($(this).hasClass("active")){
            $(this).removeClass("active");
        }else{
            $(this).addClass("active");
        }
    })
    //风格的单选框
    $(".style-ul").find("li").on("click", function () {
        if($(this).hasClass("active")){
            $(this).removeClass("active");
        }else{
            $(this).addClass("active");
        }
    })
    //表单验证
    $().ready(function() {
        $('#phone-form').validate({
            rules: {
                'phone': {
                    required: true,
                    number: true,
                    servicePhone: true
                },
                'validCode': {
                    required: true,
                    rangelength: [4, 4]
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
                'validCode': {
                    rangelength: '请输入正确的图片验证码'
                },
                'messageNumber': {
                    rangelength: '请输入正确的6位验证码'
                }
            }
        })
    });

    //下一步按钮
    $('.demand-submit').on('click', function() {
        console.log($('#phone-form').valid());
        bompBoxfFade("亲输入验证码");
    })
})

