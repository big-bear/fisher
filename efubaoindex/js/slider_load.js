// XingZhuangZhi Slider 2016-11-02
(function($) {
		$.fn.sliderLoad = function(opt) {
			var defaults = {
				mode: "fade",   //slide为滑动模式，fade为淡入淡出
				delay: 5000,     //每帧停留时间
				auto: true       //是否自动播放
			};
            
            //声明变量
            var opt = $.extend(defaults, opt);      
			var slide_ul = $(this);
			var slide_li = $(this).find("li");
            var slide_number = slide_li.length;
            var slide_box;
			var btn_box = $('<ul class="slider_btns"></ul>');
            var pre_btn = $('<div class="slider_play pre_btn"></div>');
            var next_btn = $('<div class="slider_play next_btn"></div>');
			var now = 0;                //第一张幻灯片索引值为0
			var playing = false;
            var loaded_li = [];
			var timer, slider_w, slider_h;
            
            //初始化方法  
            var init = function() {
                $(slide_ul).addClass("sl_ul");
                $(slide_li).addClass("slider_loading sl_li");
                if(slide_number<2) {
                    loadImg();
                    return false;    
                }
                
                loadImg();
                initNode();
                setSize();
                bindEvent();
                timer = setTimeout(autoplay,opt.delay);
            }
            
            //加载图片，初始排序为0
            var loadImg = function() {
                var load_img = $(".slider_loading").find("img");
                var loaded_number = 0;
                var loading_img = function(){
                    var load_image = load_img[loaded_number];
                    var img_src = $(load_image).attr("load-src");
                    $(load_image).attr("src",img_src);
                    load_image.onload = function() {
                        var temp_loaded = $(this).parents("li");
                        $(temp_loaded).removeClass("slider_loading");
                        loaded_li.push(temp_loaded);
                        loaded_number++;
                        if(loaded_number<slide_number) {
                            loading_img();      
                        }
                        
                    } 
                }
                loading_img();
            }
            
            //标签初始化
            var initNode = function() {
                slide_ul.wrap('<div class="slider_box"></div>');
                slide_box = $(slide_ul).parents(".slider_box");
                $(btn_box).appendTo(slide_box);
                creatBtns(slide_number);
                $(pre_btn).appendTo(slide_box);
                $(next_btn).appendTo(slide_box);
                changebtn();
            }
            
            //创建按钮
            var creatBtns = function(t){ 
                  for(var i=0; i<t; i++) {
                      $('<li class="slider_btn"></li>').appendTo(btn_box).text(i);
                  }
            }
            
            //设置大小
            var setSize = function() {
                slider_w = $(slide_box).width();
                slider_h = $(slide_li).height();
                btn_box.css({width:22*slide_number,'margin-left':-11*slide_number,left:'50%'});
				if(opt.mode == 'slide')
				{
					slide_box.css({height:slider_h,overflow:'hidden'})
					slide_li.css({width:slider_w});
					slide_ul.css({width:slider_w*slide_number,position:'absolute',left:0,top:0});	
				}
				if(opt.mode == 'fade')
				{
					slide_li.hide();
					slide_li.eq(0).show();
					slide_box.css({height:slider_h,overflow:'hidden'})
					slide_li.css({position:'relative'});
					slide_ul.css({width:'100%',position:'absolute',left:0,top:0});
				}
            }
            
            //绑定事件
            var bindEvent = function() {
                $(".slider_btn").bind("click",function() {
                    var i = $(this).html(); 
                    play(i);  
                });
                $(pre_btn).bind("click",function() {
                    play(now-1);
                });
                $(next_btn).bind("click",function() {
                    play(now+1);
                });
            }
            
            //动画方法
            var play = function(i) {
                if(playing) {
                    return false;    
                }
                if($(slide_li).eq(i).hasClass("slider_loading")) {
                    return false;    
                }
                clearTimeout(timer);
                if(i<now) {
                    if(i<0) {
                        i = loaded_li.length-1;    
                    }
                    if(opt.mode == "slide") {
                        sliderPre(i);      
                    }
                    if(opt.mode == "fade") {
                        sliderFade(i);      
                    }    
                }
                if(i>now) {
                    if(i>loaded_li.length-1) {
                        i = 0;
                    }
                    if(opt.mode == "slide") {
                        sliderNext(i);      
                    }
                    if(opt.mode == "fade") {
                        sliderFade(i);      
                    }   
                }
            }
            
            //自动播放
            var autoplay = function() {
                play(now+1);
                clearTimeout(timer);
                timer = setTimeout(autoplay,opt.delay);
            }
            
            //向前滑动
            var sliderPre = function(n) {
                playing = true;
                if(n == slide_number-1) {
                    var last_li = slide_ul.find("li:last-child");
                    last_li.prependTo(slide_ul);
                    slide_ul.css("left",-slider_w);
                    slide_ul.animate({left:"+="+slider_w},function() {
                        now = n;
                        last_li.appendTo(slide_ul);
                        slide_ul.css("left",-slider_w*(slide_number-1));
                        changebtn();
                        playing = false;
                    });	
                }
                else {
                    slide_ul.animate({left:-slider_w*(n)},function() {
                        now = n;
                        changebtn();
                        playing = false;
                    });	
                }
                clearTimeout(timer);
                timer = setTimeout(autoplay,opt.delay);
            }
            
            //向后滑动
            var sliderNext = function(n) {   
                playing = true;
                if(n == 0) {
                    var first_li = slide_ul.find("li:first-child");
                    first_li.remove();
                    first_li.appendTo(slide_ul);
                    var l = slide_ul.position().left+slider_w;
                    slide_ul.css("left",l);
                    slide_ul.animate({left:"-="+slider_w},function() {
                        now = n;
                        first_li.prependTo(slide_ul);
                        slide_ul.css("left",0);
                        changebtn();
                        playing = false;
                    });	
                        
                }
                else {
                    slide_ul.animate({left:-slider_w*(n)},function() {
                        now = n; 
                        changebtn();
                        playing = false;
                    });	
                }
                clearTimeout(timer);
                timer = setTimeout(autoplay,opt.delay);       
            }
            
            //淡入淡出
            var sliderFade = function(n) { 
                playing = true;
                slide_li.hide();
                slide_li.eq(n).fadeIn("fast",function() {
                    now = n;
                    changebtn();
                    playing = false;
                    clearTimeout(timer);
                    timer = setTimeout(autoplay,opt.delay);
                });       
            }
            
            //更改底部按钮状态
            var changebtn = function() {
                $(".slider_btn").removeClass('active').eq(now).addClass('active');
            }
            
            //执行初始化
            init();
            
            
            
    }
})(jQuery);