/**
 * Created by Administrator on 2017/3/22.
 */
$(function () {
    for(var i=0;i<$(".main-right img").length;i++){
        (function(i){
            loadImage($(".main-right img").eq(i).attr("data-src"), function () {
                $(".main-right img").eq(i).attr("src",$(".main-right img").eq(i).attr("data-src"));
            });
        })(i);
    }
    $(".common-select-p").on("click", function (e) {
        e.stopPropagation;
        $(".common-select ul").slideDown("fast",function () {
            $(".common-select").attr("state","true");
        });
    })
    $("body").not(".common-select-p").on("click", function (e) {
        e.stopPropagation;
        if($(".common-select").attr("state")=="true"){
            $(".common-select ul").slideUp("fast",function(){
                $(".common-select").attr("state","false");
            });
        }
    });

    $(".common-select li").on("click", function () {
        $(".common-select-p").text($(this).text());
        console.log($(this).index());
        $(".main-right img").css("display","none");
        $(".main-right img").eq($(this).index()+1).fadeIn();
        if($(this).index()<=4){
            $(".second-ul").addClass("show");
            $(".subcategories-text").removeClass("show");
        }else if($(this).index()==5){
            $(".second-ul").removeClass("show");
            $(".subcategories-text").addClass("show");
        }
    })

    $(".second-ul").find("li").on("click", function () {
        if($(this).hasClass("active")){
            $(this).removeClass("active");
        }else{
            $(this).addClass("active");
        }
    })

})
function loadImage(url, callback) {
    var img = new Image();
    img.src = url;
    img.onload = function(){ //图片下载完毕时异步调用callback函数。
        callback.call(img); // 将callback函数this指针切换为img。
    };
}