/**
 * Created by Administrator on 2017/5/11.
 */
$(function () {
    initupload({
        div:".upload-div",//上传文件所在的容器
        url:"http://10.20.3.17:8091/fileupload/singlepic",//上传的url
        btn:"#ctlBtn",//上传的按钮
        size:"4",//上传限制大小
        img:"true",//是否上传图片，默认为false，不添加图片过滤器
        num:"5",//上传限制数量
    })
})
function initupload(obj){
    $(obj.div).append("<ul class='upload-ul'></ul>");
    if(obj.img=="true"){
        accept={
            title : 'Images',
            extensions : 'jpg,jpeg,png',
            mimeTypes : 'image/jpg,image/jpeg,image/png'
        }
    }else{
        accept=false;
    }
    //上传开始
    var uploader = WebUploader.create({
        auto:true,
        swf:  'webload/Uploader.swf',
        server: obj.url,
        pick: obj.btn,
        resize: false,
        fileSingleSizeLimit:obj.size*1024*1024,
        accept:accept,
        fileNumLimit:obj.num,
    })
    //上传开始事件
    uploader.on('fileQueued', function (file) {
        $(".upload-ul").find(".error-p").remove();
        $(".upload-ul").append('<li id="'+file.id+'" class="item">'+
            '<span class="upload-img">' +
            '<img>' +
            '</span>'+
            '<span class="upload-file-name info shengluehao">'+file.name+'</span>'+
            '<span class="upload-status">上传开始</span>'+
            '<span class="upload-progress">'+
            '<div class="upload-progressbar"></div>'+
            '</span>'+
            '<span class="upload-delete">删除</span>'+
            '</li>');
        //删除功能
        $( '#'+file.id ).find(".upload-delete").on("click", function () {
            $(this).parent().remove();
            uploader.removeFile(file);
        });
    });
    //上传过程事件
    uploader.on( 'uploadProgress', function( file, percentage ) {
        $('#'+file.id).find(".upload-progressbar").animate({
            "width":percentage*100+"%"
        },600,"linear");
        $( '#'+file.id ).find(".upload-delete").on("click", function () {
            $(this).parent().remove();
            uploader.removeFile(file);
        });
    });
    //上传成功事件
    uploader.on( 'uploadSuccess', function( file,data ) {
        $( '#'+file.id ).find(".upload-delete").on("click", function () {
            $(this).parent().remove();
            uploader.removeFile(file);
        });
        $( '#'+file.id ).find('.upload-status').text('上传成功');
        uploader.makeThumb(file, function (error, src) {
            if (error) {
                $('#' + file.id).find(".upload-show-img img").replaceWith('<span>不能预览</span>');
                return;
            }
            console.log("haha");
            $('#'+file.id).find(".upload-img img").attr("src",src);
        })
    });
    //上传错误事件
    uploader.on( 'uploadError', function( file ) {
        $( '#'+file.id ).find('.upload-status').text('上传出错');
    });
    //上传事件结束
    uploader.on("uploadComplete", function (file) {
        $( '#'+file.id).find(".upload-progress").remove();
    })
    uploader.on("error", function (type,file) {
        console.log(type);
        if(type=="Q_EXCEED_NUM_LIMIT"){
            $(".upload-ul").append("<p class='error-p'>最多上传5张图片</p>");
        }
        if(type=="F_EXCEED_SIZE"){
            $(".upload-ul").append("<p class='error-p'>文件大小不能超过"+obj.size+"M</p>");
        }
        if(type=="F_DUPLICATE"){
            $(".upload-ul").append("<p class='error-p'>文件名称重复</p>");
        }
        if(type=="Q_TYPE_DENIED"){
            $(".upload-ul").append("<p class='error-p'>只支持jpg,jpeg,png格式文件</p>");
        }
    })
}