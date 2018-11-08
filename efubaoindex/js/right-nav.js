function RightNav(){
	this.gotop = $('.gotop');//向上
	this.sheji = $('.sheji');//立即定制弹层
	this.closeBtn = $('.close-btn-right-nav');//关闭按钮
	this.dzBtn = $('.lijidingzhi-right-nav');//立即定制按钮
	this.guanzhu = $('.code');//关注二维码
	this.kefu = $('.kefu');//客服
	this.cart = $('.cart');
	this.content = $('#form-area .content');
	// this.number = $('#form-area .mobileNum');//用户手机号
	// this.username = $('#form-area .userName');//用户名
	// this.numberReg = /^1[34578]\d{9}$/;//手机号正则
	// this.userReg = /^([\u4e00-\u9fa5]{1,20}|[a-zA-Z\.\s]{1,20})$/;//用户名正则
	this._form = $('#form-area')//表单
}
RightNav.prototype = {
	goTop:function(){
		this.gotop.addClass('active');
		this.gotop.click(function(){
			$('body,html').animate({
				'scrollTop': 0
			}, 1000)
		})
		return this;

	},
	sheJi:function(url){
		var _this = this;
		this.sheji.addClass('active');
		this._form.attr('action',url);//设置表单提交路径
//				this.cart.append('<a href="'+url+'" target="_blank" style="display:block;width:100%;height:100%;"></a><i></i>');
		this.sheji.click(function(){
			$('.mask-right-nav,.pop-right-nav').show();
		});

		this.closeBtn.click(function(){
			$('.mask-right-nav,.pop-right-nav').hide();
		})
		this.dzBtn.click(function(){
			var content = _this.content.val().trim();//获取文本框信息
			console.log(content);
			if(!content){
				bompBoxfFade("请输入内容");
				return
			}
			$('#form-area').submit();
			$('.mask-right-nav,.pop-right-nav').show();
		})
		return this;
	},
	guanZhu:function(){
		this.guanzhu.addClass('active');
		return this;
	},
	keFu:function(){
		this.kefu.addClass('active');
		//机器人代码
		return this;
	},
	//url:点击图标跳转
	//number:购物车的数量
	Cart:function(url,number){
		console.log(new Date());
		this.cart.addClass('active');
		this.cart.html('<a href="'+url+'" target="_blank" style="display:block;width:100%;height:100%;"></a><i></i>');
		if(number>0){
			this.cart.addClass('red').find('i').html(number)
		}else{
			this.cart.removeClass('red').find('i').html('')
		}
		return this;
	}
}

function bompBoxfFade(str){

	$(".bomp-box").remove();
	$("body").append("<div class='bomp-box'></div>");
	$(".bomp-box").css("z-index","100001");
	$(".bomp-box").html(str);
	$(".bomp-box").fadeIn();
	setTimeout(function () {
		$(".bomp-box").fadeOut();
	},2000)
}
























