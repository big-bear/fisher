$(function() {

    iptMinNum($(".choose-rule ul li input"));
    //iptMinNum($(".num .number"));
    $(".choose-rule ul").hide();
    $(".rule-number").hide();
	$("#rules").on("change", function () {
        if($(this).is(":checked")){
            $(".choose-rule ul").show();
            $(".rule-number").show();
            $(".number-area").hide();
        }else{
            $(".choose-rule ul").hide();
            $(".rule-number").hide();
            $(".number-area").show();
        }
    })


	$(".goods-demand-submit").click(function(){
		// 校验
//		var isPass = detailValid();
//		if(!isPass){
//			return ;
//		}
		$(".goods-demand-form").attr("action",Mall.home+"/demand/saveDemand?time=" + new Date().getTime()).attr("method","post");
		$(".goods-demand-form").submit();
			
	});
	//选项卡点击效果
	$('.tab-right a').click(function() {
		if($(this).hasClass('disabled')){
			return false;
		}
		$(this).parent().children().each(function() {
			$(this).removeClass('active')
		})
		$(this).addClass('active')
		
		// 绑定a标签跳转事件
		toGoodsDetail();
		
	})
//	$('.sheji').click(function() {
//		$('.mask,.pop').show();
//		$('section,#header,#footer').addClass('active')
//	});
	//需求表单
	$('.custom,.special').click(function() {
		initDemand();
		$('.mask,.need-detail').show();
		$('section,#header,#footer').addClass('active')
		
		//返回修改
		$('.return-update').click(function() {
			$('.mask,.need-detail').hide();
			$('section,#header,#footer').removeClass('active')
		})
	})
	//购物车添加成功
	$('.buy-now').click(function() {
		var shoppingCar = {};
		var g = {};
		var sl = new Array();
		
		
		var _goodsId = String($("#goodsId").val());
		var _goodsName = $("#goodsName").text();
		var _goodsNum = $("#goodsNum").val();
        var _goodsPrice = $("#price").text();
        
        if(_goodsNum == '0'){
        	return;
        }
        
        g.goodsId = _goodsId;
        g.goodsName = _goodsName;
        g.goodsNum = _goodsNum;
        g.goodsPrice = _goodsPrice;
        
		$(".goods-service").each(function(){
			var hasActive = $(this).find(".service-content").hasClass("active");
			if(hasActive){
				var _serviceId = $(this).attr("service-id");
				var _serviceType = $(this).attr("service-type");
				if(_serviceType == '1'){// 单选
					var _serivceItemId = $(this).find(".service-items.active").attr("service-item-id");
					var s = {};
					s.serviceId = _serviceId;
					s.serviceItemsId = _serivceItemId;
					sl.push(s);
				}else if(_serviceType == '2'){// 多选
					var _serivceItemIds = $(this).find(".double-dog .active");
					$(_serivceItemIds).each(function(i){
						var _serivceItemId = $(_serivceItemIds[i]).attr("service-item-id");
						var s = {};
						s.serviceId = _serviceId;
						s.serviceItemsId = _serivceItemId;
						sl.push(s);
					})
				}else if(_serviceType == '3'){// 文本
					var _serivceItemId = $(this).find(".catename").attr("attr");
					var _serviceContent = $(this).find(".catename").val();
					var s = {};
					s.serviceId = _serviceId;
					s.serviceItemsId = _serivceItemId;
					s.serviceContent = _serviceContent;
					sl.push(s);
				}
			}
		})
		
		shoppingCar.g = g;
		shoppingCar.sl = sl;
		
		
		
		var _json = JSON.stringify(shoppingCar);
		$.ajax({
			url : Mall.home + "/shoppingCar/add",
			dataType:"jsonp",
			type : "POST",
	        data : {
	        	"param" : _json
	        },
	        jsonp: "callback",
			success : function(data){
				console.log(data);
				if(data.status == '302'){
					window.location.href = data.location;
				}
				$("#shoppingCarNum").text(data.data.count);
				$("#go-settle").attr("cartGoodsId",data.data.cartGoodsId );
					
			},
			error : function(XMLHttpRequest, textStatus, errorThrown){
				console.log("error:" + textStatus);
			}
			
		});
		
		
		$('.mask,.add-success').show();
		$('section,#header,#footer').addClass('active')
	})
	
	
	$("#go-settle").click(function(){
		window.location.href=$(this).attr("basesrc")+"?cartGoodsId="+$(this).attr("cartGoodsId");
	});
	
	$('.keep-shop').click(function(){
		$('.mask').hide();
		$('.add-success').hide();
		$('section,#header,#footer').removeClass('active');
	});
	//关闭按钮
	$('.close-btn').click(function() {
		$('.mask').hide();
		$(this).parent().hide();
		$('section,#header,#footer').removeClass('active')
	});
	//立即定制按钮
	$('.dingzhi-btn').click(function() {
		$('.mask,.pop').show();
		$('section,#header,#footer').addClass('active')
	});
//	//回到顶部
//	$('.gotop').click(function() {
//		$('body,html').animate({
//			'scrollTop': 0
//		}, 600)
//	});


	//缩略图点击放大图
	// var iIndex = 0;
	// var length = $('.small-img').length;
	// console.log(length)
	// var idx=parseInt(length/5);
	// console.log(idx);
	// var flag=true;
	// 	//默认显示第一章大图
	// var sr = $('.good-left-bottom').find('.small-img:first').find('img').data('big')
	// $('.good-left-top').find('img:first').attr('src', sr)
	// 	//向左点击
	// $('.prev').click(function() {
	// 		if(!flag){
	// 			return;
	// 		}
			
	// 		iIndex -= 1;
	// 		console.log(iIndex)
	// 		if (iIndex <0) {
	// 			iIndex=length-1;
	// 			flag=false;
	// 			if(length>5){
	// 				if(length % 5 ==0){
	// 					$('.img-box-content').animate({
	// 						'left':  - (450*(idx-1)) + 'px'
	// 					},function(){
	// 						flag=true;
	// 					});
	// 				}else{
	// 					$('.img-box-content').animate({
	// 						'left':  - (450*idx) + 'px'
	// 					},function(){
	// 						flag=true;
	// 					});
	// 				}	
	// 			}
	// 			// else if(length>5 && length % 5 ==0){
	// 			// 	$('.img-box-content').animate({
	// 			// 		'left': $('.img-box-content').position().left - (450*(idx-1)) + 'px'
	// 			// 	},function(){
	// 			// 		flag=true;
	// 			// 	});
	// 			// }
	// 			else{
	// 				flag=true;
	// 			}
				
	// 		}
	// 		if ((iIndex+1) % 5 == 0 && iIndex!=(length-1)) {
	// 			if(length>5){
	// 				$('.img-box-content').animate({
	// 					'left': $('.img-box-content').position().left + 450 + 'px'
	// 				})
	// 			}
	// 			///$('.small-img').eq(iIndex).css("margin-left","-10px");

	// 		}
			
	// 		$('.good-left-top img').attr('src', $('.small-img img').eq(iIndex).data('big')) //换大图
	// 		$('.small-img').each(function() {
	// 			$(this).removeClass('active')
	// 			$(this).css('opacity', 0.7)
	// 		})
	// 		$('.small-img').eq(iIndex).addClass('active') //current
	// 		$('.small-img').eq(iIndex).css('opacity', 1)


	// 	})
	// 	//向右点击
	// $('.next').click(function() {
	// 		if(!flag){
	// 			return;
	// 		}
	// 		iIndex += 1;
	// 		console.log(iIndex)
	// 		if (iIndex >= length) {
	// 			iIndex = 0;
	// 			flag=false;
	// 			if(length>5){
	// 				$('.img-box-content').animate({
	// 					// 'left': $('.img-box-content').position().left + 450*idx + 'px'
	// 					"left":"0px"
	// 				},function(){
	// 					flag=true;
	// 				});
	// 			}else{
	// 				flag=true;
	// 			}
	// 		}
	// 		if (iIndex % 5 == 0 && iIndex != 0) {
	// 			flag=false;
	// 			if(length>5){
	// 				$('.img-box-content').animate({
	// 				'left': $('.img-box-content').position().left - (450) + 'px'
	// 				},function(){
	// 				flag=true;
	// 				})
	// 			}else{
	// 				flag=true;
	// 			}
				
	// 			//$('.small-img').eq(iIndex).css("margin-left","-10px");
	// 		}
	// 		$('.good-left-top img').attr('src', $('.small-img img').eq(iIndex).data('big')) //换大图
	// 		$('.small-img').each(function() {
	// 			$(this).removeClass('active')
	// 			$(this).css('opacity', 0.7)
	// 		})
	// 		$('.small-img').eq(iIndex).addClass('active') //current
	// 		$('.small-img').eq(iIndex).css('opacity', 1)
	// 	})
	// //点击当前
	// $('.small-img').click(function(index, value) {
	// 		iIndex = $(this).index()
	// 		$('.good-left-top img').attr('src', $('.small-img img').eq(iIndex).data('big'))
	// 		$('.small-img').each(function() {
	// 			$(this).removeClass('active')
	// 			$(this).css('opacity', 0.7)
	// 		})
	// 		$(this).addClass('active')
	// 		$(this).css('opacity', 1)
	// 	})
	//重新修改商品详情页的轮播效果
	 var sr = $('.good-left-bottom').find('.small-img:first').find('img').data('big');
	 $('.good-left-top').find('img:first').attr('src', sr)
	var length = $('.small-img').length;

	var flag=true;
	//向右点击
	$('.next').on("click",function(){
		console.log(flag);
		console.log($('.img-box-content').position().left);
		console.log(length/5);
		if(!flag){
			return;
		}
		flag=false;
		if(-($('.img-box-content').position().left)<((parseInt(length/5)-1)*450)){
			$('.img-box-content').animate({
			'left': $('.img-box-content').position().left - (450) + 'px'
		},function(){
			flag=true;
		})
		}else if(-($('.img-box-content').position().left)==((parseInt(length/5)-1)*450)){
			$('.img-box-content').animate({
			'left': $('.img-box-content').position().left - (length%5)*90 + 'px'
		},function(){
			flag=true;
		})
		}
		else{
			flag=true;
		}
		
	})
	$('.prev').on("click",function(){
		console.log(flag);
		console.log($('.img-box-content').position().left);
		if(!flag){
			return;
		}
		flag=false;
		if(($('.img-box-content').position().left)<=(-450)){
			$('.img-box-content').animate({
			'left': $('.img-box-content').position().left + (450) + 'px'
		},function(){
			flag=true;
		})
		}else if(($('.img-box-content').position().left)>(-450) && ($('.img-box-content').position().left)<0){
			$('.img-box-content').animate({
			'left': '0px'
		},function(){
			flag=true;
		})
		}
		else{
			flag=true;
		}
		
	})


	$('.small-img').on("mouseover",function(index, value) {
		iIndex = $(this).index()
		$('.good-left-top img').attr('src', $('.small-img img').eq(iIndex).data('big'))
		$('.small-img').each(function() {
			$(this).removeClass('active')
		})
		$(this).addClass('active')
	})



	//增加数量展已开选
	var h = $('.yixuan-tab-box').height();
	$('.yixuan-btn').click(function() {
		if ($('.yixuan-tab-box').hasClass('active')) {
			$('.yixuan-tab-box').removeClass('active');
			$('.yixuan-tab-box').css('top', 0);
			$('.yixuan').css('overflow', 'hidden')
		} else {
			$('.yixuan-tab-box').addClass('active');
			$('.yixuan-tab-box').css('top', -h);
			$('.yixuan').css('overflow', 'visible')
		}
	})
	// $('.jia').click(function() {
	// 	num += 1;
	// 	$('.number').html(num)
	// 	yixuan();
	// })
	// $('.jian').click(function() {
	// 	num -= 1;
	// 	if (num < 0) {
	// 		num = 0
	// 	}
	// 	$('.number').html(num)
	// 	yixuan();
	// })

	//加减数量的组件
	function AddObj(num, jia, jian, number) {
		this.num = num;
		this.jia = jia;
		this.jian = jian;
		this.number = number;
	}
	AddObj.prototype = {
		push: function() {
			var that = this;
			this.jia.click(function() {
				$(this).bind('selectstart', function() {
					return false;
				})
				that.num = parseInt($(".number-area .number").val()) + 1;
				//that.num += 1;
				that.number.val(that.num)
				algo();
			})
			return this;
		},
		shift: function() {
			var that = this;
			this.jian.click(function() {
				that.num = parseInt($(".number-area .number").val()) - 1;
				//that.num -= 1;
				if(minimum == 0){
					if (that.num < 1) {
						that.num = 1;
					}
				}else{
					if (that.num < minimum) {
						that.num = minimum;
					}
				}
				that.number.val(that.num)
				algo();
			})
			return this;
		}
	}
	var a = new AddObj(1, $('.number-area .jia'), $('.number-area .jian'), $('.number-area .number'));
	a.push().shift();



	//显示已选清单
	$('.number-area .jia,.number-area .jian').click(function() {
		if ($('.number-area .number').val() > 0) {
			$('.yixuan').addClass('active')
		} else {
			$('.yixuan').removeClass('active')
		}
	})
	// var a = new AddObj(0, $('.type1 .jia'), $('.type1 .jian'), $('.type1 .number'));
	// a.push().shift();
	// var b = new AddObj(0, $('.type2 .jia'), $('.type2 .jian'), $('.type2 .number'));
	// b.push().shift()



	//展开我要加LOGO，我要换字
	$('input[type=checkbox]').change(function() {
		if ($(this).is(':checked')) {
			$(this).parent().next().addClass('active')
			$(this).parent().next().children('div:first').addClass('active')
		} else {
			$(this).parent().next().children('div').each(function() {
				$(this).removeClass('active')
			})
			$(this).parent().next().removeClass('active')
			$(this).parent().next().children('div:first').removeClass('active')
		}
	})
	//ineed-content展开的点击效果
	//点击服务项的数量*******************************************************
	$('.single-dog').each(function() {
		$(this).children('div').each(function() {
			$(this).click(function() {
				$(this).siblings().removeClass('active')
				$(this).toggleClass('active')
					//点击算数
				algo();
			})
		})
	})
	$('.double-dog').each(function() {
		$(this).children('div').each(function() {
			$(this).click(function() {
				$(this).toggleClass('active')
					//点击算数
				algo();
			})
		})
	})
	$('.need-word').each(function() {
		$(this).find('input[type="checkbox"]').change(function() {
			algo();
		})
	})

		//点击服务项的数量结束*******************************************************
		//鼠标画上去显示遮罩
	$('.ineed-content div').mouseenter(function() {
		if($(this).data('src')){
			var maskSrc = $(this).data('src')
			$('.good-left-top .mask-img').css('display', 'block').attr('src', maskSrc)
		}
	}).mouseleave(function() {
		$('.good-left-top .mask-img').css('display', 'none').attr('src', '')
	})



	//点击跳转锚链接
	var oLis = $('.good-detail-main-box');
	var oAs = $('.good-detail-tab li');
	var oBanner = $('.good-detail-tab');
	var flag5 = false;
	oAs.each(function() {
			$(this).click(function() {
				flag5 = true;
				oAs.each(function() {
					$(this).removeClass('active')
				})
				$(this).addClass('active');
				var index = $(this).index();
				$('body,html').animate({
					'scrollTop': oLis.eq(index).offset().top - 38
				}, 600, function() {
					flag5 = false
				});
			})
		})
		//滑动事件
	$(document).scroll(function() {
		//获取当前滚动条位置
		var iWscrT = $(window).scrollTop();

		//如果滚动条位置大于头部
		if (iWscrT >= ($('#detail-area').height() + $('#dingzhituijian').height())) {
			//设置坐标
			oBanner.css({
				'position': 'fixed',
				top: 0,
				left: '50%',
				'margin-left': '-600px',
				'width': '1200px',
			})
			oBanner.prev().css('display', 'block');
			$('.good-detail-tab-box').addClass('active')
				//滚动条小于头部位置
		} else {
			//修改为相对定位
			oBanner.css('position', 'relative');
			//设置坐标
			oBanner.css('top', '0');
			oBanner.css('left', '0');
			oBanner.css('margin-left', '0')
			oBanner.prev().css('display', 'none');
			$('.good-detail-tab-box').removeClass('active')
		}
		var len = oLis.length;
		if (!flag5) {
			for (var i = 0; i < len; i++) {
				if (iWscrT >= parseInt(oLis.eq(i).offset().top - 38)) {
					clearActive();
					oAs.eq(i).addClass('active')
				}
			}
		}
	});
	//js控制type2的行高
	$('.hasImg').parent().prev().css('line-height', '42px')


	/*
	 * @desc     清空导航激活状态
	 * @time     2016-7-15
	 * @author   GCP
	 * */
	//鼠标划过时的提示语言效果
	$('.wenhao-icon').mouseover(function() {
			$(this).next().addClass('active')
		}).mouseout(function() {
			$(this).next().removeClass('active')
		})
		//懒加载
	$('.lazy').lazyload({
		threshold: 1600,
		effect: 'fadeIn',
		failure_limit: 100
	})

	function clearActive() {
		oAs.each(function() {
			$(this).removeClass('active');
		});
	}
	
	// ajax加载商品价格
	ajaxGoodsPrice();
	
	// ajax加载推荐商品
	ajaxRecommendGoods();
	
	// 处理sku启用
	var currActiveItemIds = $(".tab-area .active");
	$.each($("#goodsAndAttrHidden input"), function(index, element){
		var ele = $(this).attr("id").split("_");
		var flag = 0;
		$.each(currActiveItemIds, function(){
			var isContains = $.inArray($(this).attr("cate_item_id"), ele);
			if(isContains < 0){
				flag += 1;
			}
		});
		if(flag < 2){
			$.each(ele, function(i,e){
				$("#attrItemId_" + ele[i]).removeClass("disabled");
			});
		}
	})
	
	// 数量input变化时，触发算数方法
	$(".number-area .number").change(function(){
		// 数量小于商品起订量
		var num = $(".number-area .number").val();
		if(minimum != 0){
			if(Number(num) < Number(minimum)){
				$(".number-area .number").val(minimum);
			}
		}else{
			if(Number(num) < 1){
				$(".number-area .number").val(1);
			}
		}
		
		// 算金额
		algo();
	})
	
	algo();
})


	// 点击属性分类跳转
	function toGoodsDetail(){
		// 商品组ID
		var goods_group_id = $(".tab-area").attr("goods_group_id");
		
		// 所有选中的商品属性
		var active = $(".tab-area a.active");
		var activeA = "";
		$.each(active, function(index, element){
			//var attr_id = $(this).parent().attr("attr_id");
			var cate_item_id = $(this).attr("cate_item_id");
			activeA += (cate_item_id);
			activeA += "_";
		})
		var goodsId = $("#"+activeA).val();
		if(goodsId == $("#goodsId").val()){
			return false;
		}
		if(isPreview == "true"){
			window.location.href = "/goods/" + goodsId + ".html?isPreview=true";
		}else{
			window.location.href = "/goods/" + goodsId +".html";
		}
	}

	//ajax加载商品价格
	function ajaxGoodsPrice(){
		var goodsId = $("#goodsId").val();
		
		$.ajax({
			url : "/goods/ajaxGoodsPrice",
			data : {
				"goodsId" : goodsId
			},
			success : function(data){
				if(data.code == '200'){
					$("#price").text(data.data.toFixed(2));
					if(minimum == 0){
						$(".yixuan-price").text(data.data.toFixed(2));
					}else{
						$(".yixuan-price").text((data.data * minimum ).toFixed(2));
					}
					$(".pingjun").text(data.data.toFixed(2));
					
				}else{
					$("#price").val("");
				}
			}
		});
		
	}
	
	// ajax加载推荐商品
	function ajaxRecommendGoods(){
		var goodsId = $("#goodsId").val();
		$.ajax({
			url : "/goods/ajaxRecommendGoods",
			data : {
				"goodsId" : goodsId
			},
			success : function(data){
				if(data.code == '200'){
					var box = "";
					for(i in data.data){
						box += "<div class='good-box'>";
						box += "<a target='_blank' href='" + Mall.basePath + "/goods/" + data.data[i].id +"'>";
						box += "<img class='lazy' data-original = '" + IMAGE_URL +  data.data[i].firstPic + "' src='/img/loading.gif' alt=''>";
						box += "</a>";
						box += "<div class='clearfix'>";
						box += "<p class='shengluehao tuijian-goods-name'>"+ data.data[i].name +"</p>";
						box += "<p class='price-final'>￥<span>" + data.data[i].sellPrice + "</span></p>";
						box += "</div>";
						box += "</div>";
					}
					$("#recommend-box").html(box);
					//懒加载
					$('.lazy').lazyload({
						threshold: 100,
						effect: 'fadeIn',
						failure_limit: 100
					})
				}
			}
		});
	}
	// 算总金额
	function algo() {
		var a = 0,
			b = 0,
			total = 0,
			num = $('.number-area .number').val()
		$('#service-box').find('input[type="checkbox"]').each(function(index) {
			if ($(this).is(':checked')) {
				if ($(this).parent().next().attr('type')) { //b不成熟
					if ($(this).parent().next().hasClass('single-dog')) { //如果是单选
						b = b + Number($(this).parent().next('.single-dog').children('.active').find('.price').text())
					} else if ($(this).parent().next().hasClass('double-dog')) {
						$(this).parent().next('.double-dog').children('.active').each(function() {
							b = b + Number($(this).find('.price').text())
						})
					} else {
						b = b + Number($(this).parent().next('.word-content').find('.price').text())
					}
				} else {
					if ($(this).parent().next().hasClass('single-dog')) { //如果是单选
						a = a + Number($(this).parent().next('.single-dog').children('.active').find('.price').text())
						console.log(a);
					} else if ($(this).parent().next().hasClass('double-dog')) {
						$(this).parent().next('.double-dog').children('.active').each(function() {
							a = a + Number($(this).find('.price').text())
						})
					} else {
						a = a + Number($(this).parent().next('.word-content').find('.price').text())
					}
				}
			}
		})
		total = ((a + Number($('.enter-box').find('.price').text())) * num + b).toFixed(2)
		$('.yixuan-price').text(total);
		$('.yixuan-num').text(num);
		$('.pingjun').text((total / num).toFixed(2))
	}
	
function initDemand(){
	var $title = $(".good-right .good-right-top h1").text();
	$(".demand-title").html($title);
	var $sku = "";
	$.each($(".goods-sku a.active span"),function(){
		$sku += $(this).text() + ";"
	});
	$(".demand-sku").html($sku);
	$(".demand-service").html("");
	var $demandService = "";
	$(".goods-demand-form input[name='demandService']").remove();
	$(".goods-demand-form input[name='goodsNum']").val($(".goods-number").val());
	$(".goods-demand-form input[name='demandUserName']").val("");
	$(".goods-demand-form input[name='demandUserMobile']").val("");
	$(".goods-demand-form textarea[name='reqDesc']").val("");
	$.each($(".service-name:checked"),function(){
		var $serviceText = "<span>";
		var $service = $(this);
		var $items = $service.parents(".goods-service").find(".active>.catename");
		$serviceText += $service.next().text()+";";
		$.each($items,function(){
			$demandService = $service.attr("attr") + "##" + $(this).attr("attr")
			$(this).attr("attr");
			if($(this).hasClass("type-text")){
				$demandService += "##" + $(this).val();
				$serviceText += $(this).val() + ",";
			}else{
				$(this).text();
				$serviceText += $(this).text() + ",";
			}
			createHiddenInput("goods-demand-form","demandService",$demandService);
		});
		$serviceText = $serviceText.substring(0,$serviceText.length-1) + "</span>";
		$(".demand-service").append($serviceText);
	});
	if($(".demand-service span").length < 1){
		$(".demand-service").html("<span>未选择服务</span>")
	}
}	
function detailValid(){
	var $val = $(".goods-demand-form input[name='demandUserName']").val();
	if($val==undefined || $val.length < 1){
		swal("姓名不能为空");
		return false;
	}
	$val = $(".goods-demand-form input[name='demandUserMobile']").val();
	if($val==undefined || $val.length < 1){
		swal("手机号不能为空");
		return false;
	}
	return true;
}