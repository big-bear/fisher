/*
* @Author: lizeshuai
* @Date:   2017-03-02 11:43:16
* @Last Modified by:   lizeshuai
* @Last Modified time: 2017-03-02 13:45:31
*/

$(function(){
	//单选与多选
	$(".classify li").on("click",function(){
		if($(this).hasClass("active")){
			$(this).removeClass("active");
		}else{
			$(this).addClass("active");
		}
	});
	var classstr=$(".have-choose-img img").attr("class");
	classstr= classstr.match(/person-(\S*)/)[1];
	$(".have-choose-img img").attr("src","img/appliaction/person_"+classstr+".png");
	    /*
	        表单验证
	        李大仙
	        never have bugs
	    */
	    $().ready(function() {
	        $('#phone_form').validate({
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
	    $('#next-btn').on('click', function() {
	        console.log($('#phone_form').valid())
	        //if ($('#phone_form').valid()){
	        //commit form
	    })

})
