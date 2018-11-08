$(function() {
    //tab-change;
    $('.tab li').click(function() {
        $('.tab li,.industry-news').each(function() {
            $(this).removeClass('active');
        });
        $(this).addClass('active');
        $('.industry-news').eq($(this).index()).addClass('active');
    });
    addRecommand($('.industry-list').find('.left:first'),'置顶');
    addRecommand($('.product-list').find('.left:last'),'推荐');

    //计算图片宽高
    //$.ajaxSetup ({
    //    cache: false
    //});
    setimg();
    var imgNumber=$(".mainimg").length;
    console.log($(".mainimg"))
    $(".left img").on("load",function () {
        imgNumber=imgNumber-1;
        console.log(imgNumber);
        if(imgNumber==0){
            setimg();
        }
    })

    




});
//添加推荐或者置顶的方法
//obj jquery对象
//content ‘置顶’或者‘推荐’
function addRecommand(obj, content) {
    obj.append('<em>' + content + '</em>');
    obj.find('em').css({
        position: 'absolute',
        left: 0,
        top: 0,
        color: '#fff',
        width: '56px',
        height: '20px',
        'text-align': 'center',
        'line-height': '20px',
        'font-size': '12px'
    });
    var bgcolor = content=='置顶'?'#ff5252':'#333333'
    obj.find('em').css('background',bgcolor);
}
function setimg(){
    var img=$(".left").find(".mainimg");
    var imglength=img.length;
    for(var i=0;i<imglength;i++){
        var imgx=img.eq(i);
        if((img.eq(i).width())/(img.eq(i).height())>300/180){
            img.eq(i).css({
                'width':'300px',
                'height':'auto',
            })
            img.eq(i).css('margin-top',-(img.eq(i).height()-180)/2+'px');
        }else{
            img.eq(i).css({
                'width':'auto',
                'height':'180px',
            })
            img.eq(i).css('margin-top',-(img.eq(i).height()-180)/2+'px');
        }
    }

}