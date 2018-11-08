/**
 * Created by Administrator on 2017/3/16.
 */
$(function () {
    $(".choose li").on("click", function () {
        $(".main").css("height","707px")
        $(".choose").slideUp("fast", function () {

        });
        $(".have-choose").css("marginTop","0px");

    })
})