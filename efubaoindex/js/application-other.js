/*
    表单验证
*/
$(function() {
    $().ready(function() {
        $('#need_form').validate({
            rules:{
                'needContent': {
                    maxlength:100
                },
                'phone': {
                    number: true,
                    required: true,
                    servicePhone: true,
                },
                'messageNumber': {
                    required: true,
                    number: true,
                    rangelength: [6, 6]
                }
            },
            messages:{
                'needContent': {
                    maxlength:'最大长度不超过100个字符'
                },
                'messageNumber': {
                    rangelength: '请输入正确的6位验证码'
                }
            }
        })
    })
})
