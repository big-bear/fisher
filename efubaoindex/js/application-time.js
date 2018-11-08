/*
* @Author: lizeshuai
* @Date:   2017-03-01 19:28:00
* @Last Modified by:   lizeshuai
* @Last Modified time: 2017-03-01 19:31:34
*/
$(function() {
    $().ready(function(){
        $('#time_form').validate({
            rules:{
                'number':{
                    required:true,
                    maxlength:5,
                    number:true
                },
                'province':{
                    required:true,
                    serviceSelectArea:true,
                },
                'city':{
                    required:true,
                    serviceSelectArea:true,
                },
                'country':{
                    required:true,
                    serviceSelectArea:true,
                },
                'expiryDate':{
                    required:true,
                }
            },
            messages:{
                'expiryDate':{
                    required:'请填写正确的收货时间',
                }
            }
        })
    })

    //提交按钮
    $('#next-btn').click(function(){
        console.log($('#time_form').valid())
        //commit form
    })
})
