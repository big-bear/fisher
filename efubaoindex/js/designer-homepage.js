/**
 * Created by Administrator on 2017/4/24.
 */
$(function(){
    var uploader = WebUploader.create({
        auto:true,
        swf:  'webload/Uploader.swf',
        server: 'http://10.20.3.17:8091/fileupload/singlepic',
        pick: '#designer-face',
        resize: false,
        fileSingleSizeLimit:1*1024*1024,
        accept : {
            title : 'Images',
            extensions : 'jpg,jpeg,png',
            mimeTypes : 'image/jpg,image/jpeg,image/png'
        },
        method : 'POST',
        duplicate:true,
    });

    uploader.on( 'uploadProgress', function( file, percentage ) {
        $(".designer-img-progress").show();
        var progress=parseInt(percentage*100)+"%";
        $(".designer-face-text").find(".span1").html(progress);
        $(".black-mask").css({
            "background":"none"
        })
    });
    uploader.on('uploadSuccess', function( file,data ) {
        $(".designer-img-progress").hide();
        $(".black-mask").css({
            "background":"#1F1F1F url('img/designer-face-hover.png') center center no-repeat"
        })
        uploader.makeThumb(file, function(error, src) {
            $("#showimg img").attr("src",src);
            if($("#showimg img").width()>100){
                $(".upload-file ul").append("<p class='error-p'>请上传图片宽度小于8000的图片</p>");
                return;
            }
            if($("#showimg img").height()>100){
                $(".upload-file ul").append("<p class='error-p'>请上传图片高度小于2000的图片</p>");
                return;
            }
            if(error){
                $(".pop-window").show();
                $(".mask").show();
                $(".pop-window-text").html("上传失败，请重新上传。");
            }
            $(".designer-img").attr("src",src);
        },1,1)
    })
    uploader.on("error", function (type) {
        if(type=="F_EXCEED_SIZE"){
            $(".pop-window").show();
            $(".mask").show();
            $(".pop-window-text").html("文件大小不能超过1M");
        }
        if(type=="Q_TYPE_DENIED"){
            $(".pop-window").show();
            $(".mask").show();
            $(".pop-window-text").html("只支持jpg,jpeg,png格式文件");
        }
    })
    $("#submit-size,.close").on("click", function () {
        $(".pop-window").hide();
        $(".mask").hide();
    })
    setFirstLi();
    $(document).on("click",".right-delete", function () {
        $(this).parents("li").remove();
        setFirstLi();
    })
})
function setFirstLi(){
    for(var i=0;i<$(".design-demo-list ul li").length;i++){
        $(".design-demo-list ul li").eq(i).attr("style","");
        if((i)%4==0){
            console.log(i);
            $(".design-demo-list ul li").eq(i).css({
                "marginLeft":"0"
            })
        }
    }
}