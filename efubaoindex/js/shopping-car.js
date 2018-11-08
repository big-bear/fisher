/**
 * Created by Administrator on 2017/3/7.
 */
$(function() {
    var ruleData=[
        {
            "goodsSizeList": [
                {
                    "gender": 0,
                    "goodsNum": 100,
                    "goodsSize": "S",
                    "sizeSpecId": 265
                },
                {
                    "gender": 0,
                    "goodsNum": 0,
                    "goodsSize": "M",
                    "sizeSpecId": 265
                },
                {
                    "gender": 0,
                    "goodsNum": 0,
                    "goodsSize": "L",
                    "sizeSpecId": 265
                }
            ],
            "specId": 265,
            "specImgUrl": "/2017-03-31/4f465b662c1f0adb3d96076153d1b1ce_original1.jpg",
            "specName": "王英豪的尺码"
        },
        {
            "goodsSizeList": [
                {
                    "gender": 0,
                    "goodsNum": 80,
                    "goodsSize": "xl",
                    "sizeSpecId": 265
                },
                {
                    "gender": 0,
                    "goodsNum": 0,
                    "goodsSize": "xxxl",
                    "sizeSpecId": 265
                },
                {
                    "gender": 0,
                    "goodsNum": 0,
                    "goodsSize": "帅22222222222",
                    "sizeSpecId": 265
                }
            ],
            "specId": 265,
            "specImgUrl": "/2017-03-31/4f465b662c1f0adb3d96076153d1b1ce_original2.jpg",
            "specName": "王英豪的尺码"
        },
        {
            "goodsSizeList": [
                {
                    "gender": 0,
                    "goodsNum": 0,
                    "goodsSize": "xl",
                    "sizeSpecId": 265
                },
                {
                    "gender": 0,
                    "goodsNum": 0,
                    "goodsSize": "xxxl",
                    "sizeSpecId": 265
                },
                {
                    "gender": 0,
                    "goodsNum": 0,
                    "goodsSize": "帅22222222222",
                    "sizeSpecId": 265
                }
            ],
            "specId": 265,
            "specImgUrl": "/2017-03-31/4f465b662c1f0adb3d96076153d1b1ce_original3.jpg",
            "specName": "王英豪的尺码"
        },
        {
            "goodsSizeList": [
                {
                    "gender": 0,
                    "goodsNum": 0,
                    "goodsSize": "xl",
                    "sizeSpecId": 265
                },
                {
                    "gender": 0,
                    "goodsNum": 0,
                    "goodsSize": "xxxl",
                    "sizeSpecId": 265
                },
                {
                    "gender": 0,
                    "goodsNum": 0,
                    "goodsSize": "帅22222222222",
                    "sizeSpecId": 265
                }
            ],
            "specId": 265,
            "specImgUrl": "/2017-03-31/4f465b662c1f0adb3d96076153d1b1ce_original4.jpg",
            "specName": "王英豪的尺码"
        },
    ];
    $(".input-rules").on("click", function () {
        $("#read-rules-pop").addClass("active");
        inputRulesTableFn(ruleData,130, function (data) {
            console.log(data);
        });
    });
    setFooter();
    yfubaoLoginFn($(".jiesuan-btn"));
    invalidShow();
    intoDataRules();
    console.log(parseInt("haha"));
    $(".input-rules").on("click", function () {
        var self=$(this);
        var fullData=$(this).data("rules");
        console.log(JSON.stringify(fullData));
        showRules($("#size-ul"),fullData);
        $("#save-order-size").on("click", function () {
            writeRules(self,self.parents("td").find(".td-rules-left"));
        })
    })
    //$("#save-order-size").on("click", function () {
    //    var rulesHtml="";
    //
    //    for(var i=0;i<$("#size-ul li input").length;i++){
    //        var $ipt=$("#size-ul li input").eq(i);
    //        //if(typeof (parseInt($ipt.val()))=="number"){
    //            if(parseInt($ipt.val())>0){
    //                rulesHtml=rulesHtml+"<p>"+$ipt.attr("goodssize")+"：<span>"+$ipt.val()+"</span></p>";
    //                $(".td-rules-left").html(rulesHtml);
    //
    //            }
    //            //}else{
    //            //    bompBoxfFade("尺码数量只能为正整数");
    //            //}
    //        cancel();
    //    }
    //
    //})
    //录入尺码功能模块
    $(".input-rules").on("click", function () {
        $("#size-tip").addClass("active");
        $(".mask").addClass("active");
    })
    $('.size-close').click(function(){
        $('.mask').removeClass('active')
        $('#main').removeClass('active')
        $(this).parent().parent().removeClass('active')
        $('section,#header,#footer').removeClass('active');
    })
    $('.cancel-btn').click(function(){
        cancel();
    });
    //录入尺码结束
    //�����̼ң�ȫѡ����ĵ�ѡ��
    $(".shopping-main").find(".ipt-bus").change(function(){
        var len=$(".shopping-main").find(".ipt-bus").length;
        var flag=true;
        var is=$(this).is(':checked');
        $(this).parents(".shopping-main").find("table").find("input[type='checkbox']").prop("checked",is);
        for(var i=0;i<len;i++){
            if(!$(".shopping-main").find(".ipt-bus").eq(i).is(':checked')){
                flag=false;
            }
        }
        $('.checkb').prop("checked",flag);

        subtotal();//���㲢��ֵС��
        totalPriceNum();//���㲢��ֵ����,�ܼ�
    })
    //��ѡ��ȫ����ѡ�У��̼�Ҳ��ѡ��
    $(".shopping-main").find("table").find("input[type='checkbox']").change(function(){
        var is=true;
        var alllen=$(".shopping-main").find("table").find("input[type='checkbox']").length;
        var len=$(this).parents(".shopping-main").find("table").find("input[type='checkbox']").length;
        for(var i=0;i<len;i++){
            if(!$(this).parents(".shopping-main").find("table").find("input[type='checkbox']").eq(i).is(':checked')){
                is=false;
            }
        }

        $(this).parents(".shopping-main").find(".ipt-bus").prop("checked",is);
        for(var j=0;j<alllen;j++){
            if(!$(".shopping-main").find("table").find("input[type='checkbox']").eq(j).is(':checked')){
                is=false;
            }
        }
        $('.checkb').prop("checked",is);
    })




    //������
    //$('.lazy').lazyload({
    //    threshold: 0,
    //    effect: 'fadeIn',
    //    failure_limit: 100
    //})
    var sendUpdate=false;//+ - ��ť�Ƿ��ͺ�̨����

    //�����Ӽ�
    function addDelete(obj) {
        obj.each(function() {
            $(this).click(function() {
                var minimum=$(this).siblings(".number").data("minimum")>0?$(this).siblings(".number").data("minimum"):1;//����
                var num = Number($(this).parent().find('.number').val());
                if ($(this).hasClass('jia')) {
                    num += 1;
                    $(this).prev().val(num);
                } else {
                    num -= 1;
                    if (num < minimum) {
                        num = minimum //��Сֵ
                    }
                    $(this).next().val(num)
                }

                subtotal();//���㲢��ֵС��
                totalPriceNum();//���㲢��ֵ����,�ܼ�

                sendUpdate=true;
            })
        })
    }

    $(".jia,.jian").mouseout(function(){
        if(sendUpdate){
            var goodsId=$(this).parents("tr[cartgoodsid]").attr("cartgoodsid");
            var newNum=$(this).siblings(".number").val();
            updateGoodsNum(goodsId,newNum);
        }

        sendUpdate=false;
    })



    //ȫѡ����
    $('.checkb').change(function() {
        var is = $(this).is(':checked');
        $('input[type="checkbox"]').prop('checked', is);

        subtotal();//���㲢��ֵС��
        totalPriceNum();//���㲢��ֵ����,�ܼ�
    })

    //ɾ����ť�ĵ�����
    $('.delete').click(function() {
        $('.mask').addClass('active')

        var title="ɾ����Ʒ";
        var msg="ȷ��ɾ�����ﳵ����Ʒ��"
        $('#delete-tip').find("h3").html(title);
        $('#delete-tip').find("p").html(msg);

        $('#delete-tip').addClass('active');
        $('#header,#footer,section').addClass('active')

        $(".sure-btn").attr("cartGoodsId",$(this).parents("tr[cartgoodsid]").attr("cartgoodsid"));


    })
    $('#delete-right').click(function() {

        if($(".table-content :checkbox:checked").parents("tr").length==0){
            dataMsgshow("��ѡ��Ҫɾ����Ʒ")
            return false;
        }

        $('.mask').addClass('active');


        var title="ɾ����Ʒ";
        var msg="ȷ��ɾ�����ﳵ����Ʒ��"
        $('#delete-tip').find("h3").html(title);
        $('#delete-tip').find("p").html(msg);

        $('#delete-tip').addClass('active');
        $('#header,#footer,section').addClass('active')

        var cartgoodsid="";
        $(".table-content :checkbox:checked").parents("tr").each(function(){
            cartgoodsid += $(this).attr("cartgoodsid")+",";
        });

        $(".sure-btn").attr("cartGoodsId",cartgoodsid);
    })


    function invalidShow(){
        if($(".table-content tr.shixiao").length>0){
            $("#delete-invalid").show();
        }else{
            $("#delete-invalid").hide();
        }
    }


    $('#delete-invalid').click(function() {
        //�������ʧЧ��Ʒ�İ�
        var title="���ʧЧ��Ʒ";
        var msg="ȷ��������ﳵ��ʧЧ��Ʒ��"
        $('#delete-tip').find("h3").html(title);
        $('#delete-tip').find("p").html(msg);

        $('#delete-tip').addClass('active');
        $('#header,#footer,section').addClass('active')

        var cartgoodsid="";
        $(".table-content tr.shixiao").each(function(){
            cartgoodsid += $(this).attr("cartgoodsid")+",";
        });

        $(".sure-btn").attr("cartGoodsId",cartgoodsid);
    })



    $('.close,.return-btn').click(function() {
        $('.mask').removeClass('active')
        $('#delete-tip').removeClass('active');
        $('#header,#footer,section').removeClass('active')

        $(".sure-btn").removeAttr("cartGoodsId");
    })



    $(".sure-btn").click(function(){
        //deleteGoods($(".sure-btn").attr("cartGoodsId"));
    })


    //subtotal();//���㲢��ֵС��
    //totalPriceNum();//���㲢��ֵ����,�ܼ�

    $(".table-content :checkbox").change(function(){
        subtotal();//���㲢��ֵС��
        totalPriceNum();//���㲢��ֵ����,�ܼ�
    })


    $(".table-content .number").change(function(){
        //������ ����Ϊ1
        var minimum=$(this).data("minimum")>0?$(this).data("minimum"):1;//����
        if(isNaN($(this).val()) || $(this).val() < minimum){
            $(this).val(minimum);
        }
        subtotal();//���㲢��ֵС��
        totalPriceNum();//���㲢��ֵ����,�ܼ�

        var goodsId=$(this).parents("tr[cartgoodsid]").attr("cartgoodsid");
        var newNum=$(this).val();
        updateGoodsNum(goodsId,newNum);
    })



    function updateGoodsNum(goodsId,newNum){
        $.ajax({
            type : "POST",
            url : Mall.basePath+"/shoppingCar/update",
            data : {
                goodsId : goodsId,
                newNum:newNum
            },
            dataType : "json",
            success : function(msg) {
                if (msg.code == 200) {
                    successMsgShow("�����ɹ�");
                } else {
                    errorMsgShow(msg.message);
                }
            }
        });
    }


    /**
     * cartGoodsId format  1,2,3
     * */
    //function deleteGoods(cartGoodsId){
    //    $.ajax({
    //        type : "POST",
    //        url : Mall.basePath+"/shoppingCar/delete",
    //        data : {
    //            cartGoodsId : cartGoodsId
    //        },
    //        dataType : "json",
    //        success : function(msg) {
    //            if (msg.code == 200) {
    //                successMsgShow("�����ɹ�");
    //
    //                var idAry=cartGoodsId.split(",");
    //                for(var i=0 ;i<idAry.length;i++){
    //                    $(".table-content").find("tr[cartgoodsid='"+idAry[i]+"']").remove();
    //                }
    //
    //                //��շ�������Ϣ
    //                $(".table-content").each(function(){
    //                    if($(this).find("tr").length==0){
    //                        $(this).prev("div .business").remove();
    //                    }
    //                });
    //
    //                subtotal();//���㲢��ֵС��
    //                totalPriceNum();//���㲢��ֵ����,�ܼ�
    //            } else {
    //                errorMsgShow(msg.message);
    //            }
    //
    //            //��Ч��ť��ʾ����
    //            invalidShow();
    //            //���ﳵΪ����ʾ����
    //            if($(".shopping-area").find("tr").length==1){
    //                $("section").hide();
    //                $("section.empty-cart").show();
    //            }
    //
    //            $(".return-btn").click();
    //        }
    //    });
    //}






    $(".jiesuan-btn").click(function(){

        //������״̬����false
        if($(this).is("[class*='disabled']")){
            return false;
        }

        if($(".table-content :checkbox:checked").parents("tr").length==0){
            dataMsgshow("��ѡ��Ҫ������Ʒ");
            return false;
        }

        var flag=true;
        var spId=0;
        $(".table-content :checkbox:checked").each(function(index){
            var spIdCurrent=$(this).data("sp-id");
            if(index==0){
                spId=spIdCurrent;
            }

            if(spId!=spIdCurrent){
                flag=false;
                return false;
            }
            spId=spIdCurrent;
        });

        if(!flag){
            dataMsgshow("��ѡ��ͬһ�̼���Ʒ���н���");
            return false;
        }


        var cartgoodsid="";
        $(".table-content :checkbox:checked").parents("tr").each(function(){
            cartgoodsid += $(this).attr("cartgoodsid")+",";
        });


        if(cartgoodsid.indexOf(",")!=-1){
            cartgoodsid=cartgoodsid.substring(0,cartgoodsid.length-1);
        }


        window.location.href=Mall.basePath+"/order/settlement?ids="+cartgoodsid+"&spId="+spId;
    })


    //ʧЧЧ���Ŀ���
    $(".shixiao td:first-child").children().remove();
    $(".shixiao .number").attr("readOnly","true");
})
function cancel(){
    $('.mask').removeClass('active');
    $('#main').removeClass('active');
    $("#pay-tip").removeClass('active');
    $("#size-tip").removeClass('active');
    $("#delete-tip").removeClass('active');
    $("#result").removeClass('active');
    $('section,#header,#footer').removeClass('active');
}
//不处理未录入数据
//[{" gender":0,"goodsnum":0,"goodssize":"xxl"},
//    {"gender":0,"goodsnum":0,"goodssize":"xl"},
//    {"gender":0,"goodsnum":0,"goodssize":"xxxl"}]
//将尺码表展示在弹框里
function showRules(ul,data){
    var sizeHtml="";
    for(var i=0;i<data.length;i++){
        sizeHtml=sizeHtml+'<li>' +
            '<p class="size">'+data[i].goodssize+'</p>' +
            '<input type="text" goodssize='+data[i].goodssize+' order-goods-id="1291" gender='+data[i].gender+' class="order-size" value='+data[i].goodsnum+'>' +
            '</li>'
    }
    ul.html(sizeHtml);
}
//将修改后的数据反写到尺码的fulldata里
//obj1:录入尺码按钮
//obj2:展示尺码的容器
function writeRules(obj1,obj2){
    var data=[];
    var rulesHtml="";
    for(var i=0;i<$("#size-ul li input").length;i++){
        var $ipt=$("#size-ul li input").eq(i);
        data.push({
            "gender":$ipt.attr("gender"),
            "goodsnum":$ipt.val(),
            "goodssize":$ipt.attr("goodssize")
        })
        if(parseInt($ipt.val())>0){
            rulesHtml=rulesHtml+"<p><span class='goodssize'>"+$ipt.attr("goodssize")+"：</span><span class='goodsnum'>"+$ipt.val()+"</span></p>";
            obj2.html(rulesHtml);
        }
        cancel();
    }
    obj1.data("rules",data);
}
function intoDataRules(){
    for(var i=0;i<$(".td-rules-left").length;i++){
        var $inputRules=$(".td-rules-left").eq(i).parents("td").find(".input-rules");
        //$inputRules.data("rules",$inputRules.data("fulldata"));
        var rules=$inputRules.data("fulldata");
        var rulesP=$(".td-rules-left").eq(i).find("p");
        for(var j=0;j<rulesP.length;j++){
            for(var z=0;z<rules.length;z++){
                if(rulesP.eq(j).find(".goodssize").html()==rules[z].goodssize){
                    rules[z].goodsnum=rulesP.eq(j).find(".goodsnum").html();
                }
            }
        }
        $inputRules.data("rules",rules);
    }
}
function sizeDataInput(ul,data){

    var ulHtml="";
    for(var i=0;i<data.length;i++){
        var param=data[i];
        ulHtml+=' <li><p class="size">'+param.goodsSize+'</p ><input type="text" goodssize="xl" order-goods-id="" gender="0" class="order-size" value="'+param.goodsNum+'">件</li>';
    }
    $(ul).html(ulHtml);
}
function inputRulesTableFn(data,shopNum,callback){
    //$("#read-rules-pop .btn-danger").off("click");
    $(document).off("click", "#read-rules-pop .rule-success")
    $("#read-rules-pop .close-pop").off("click");
    $("#read-rules-pop .btn-default").off("click");
    //var oldData=deep_copy_in_json(data);
    $("#read-rules-pop .close-pop").on("click", function () {
        $("#read-rules-pop").removeClass("active");
    })
    //$("#read-rules-pop .rule-success").on("click", function () {
    $(document).on("click", "#read-rules-pop .rule-success",function () {
        $("#read-rules-pop").removeClass("active");
        callback(ruturnData(data));
    })
    $("#read-rules-pop .btn-default").on("click", function () {
        $("#read-rules-pop").removeClass("active");
    })
    //tab切换
    $(document).on("click", "#read-rules-pop .shop-list li",function () {
        $("#read-rules-pop .shop-list li").removeClass("active");
        $(this).addClass("active");
        $("#read-rules-pop .rule-detail-box .rule-detail").removeClass("active");
        $("#read-rules-pop .rule-detail-box .rule-detail").eq($(this).index()).addClass("active");
        showRuleTableImg();
    });
    $(document).on("click", "#read-rules-pop .clear-rule",function () {
        var faIndex=parseInt($(this).attr("faindex"));
        var $iptBox=$(this).parents(".rule-detail").find("input");
        for(var i=0;i<$iptBox.length;i++){
            $iptBox.eq(i).val(0);
            data[faIndex].goodsSizeList[i].goodsNum=0;
        }
        $(this).parents(".rule-detail").find(".rule-detail-top .red-color").html(0);
    })
    var shopListHtml="";
    var ruleDetailHtml="";
    for(var i=0;i<data.length;i++){
        var thisRuleNum=0;//已录入尺码的数量
        var liStyle='default';
        var ruleTableLiHtml="";
        for(var j=0;j<data[i].goodsSizeList.length;j++){
            thisRuleNum=thisRuleNum+parseInt(data[i].goodsSizeList[j].goodsNum);
            ruleTableLiHtml=ruleTableLiHtml+'<li>' +
                '<div class="rule-size">'+data[i].goodsSizeList[j].goodsSize+':</div>' +
                '<input faindex="'+i+'" childindex="'+j+'" type="text" value="'+data[i].goodsSizeList[j].goodsNum+'">' +
                '</li>';
        }
        if(thisRuleNum==shopNum){
            liStyle='complete';
        }else if(thisRuleNum>0 && thisRuleNum<shopNum){
            liStyle='incomplete';
        }else{
            liStyle='default';
        }
        shopListHtml=shopListHtml+"<li class="+liStyle+">" +
            "<span class='shengluehao'>"+data[i].specName+"</span>" +
            "</li>";
        ruleDetailHtml=ruleDetailHtml+'<div class="rule-detail">'+
        '<div class="rule-detail-top clearfix">'+
        '<p>'+
        '<span>已录入</span>'+
        '<span class="red-color">'+thisRuleNum+'</span>'+
        '<span>/</span>'+
        '<span>'+shopNum+'</span>'+
        '<span>件</span>'+
        '</p>'+
        '<div class="clear-rule" faindex="'+i+'">清空当前尺码</div>'+
        '</div>'+
        '<div class="rule-table-top">'+
        '<div class="rule-text">尺码</div>'+
        '<div class="num-text">数量</div>'+
        '</div>'+
        '<ul class="rule-table">'+ruleTableLiHtml+
        '</ul>'+
        '</div>';
    }
    $("#read-rules-pop .shop-list").html(shopListHtml);
    $("#read-rules-pop .shop-list li").eq(0).addClass("active");
    $("#read-rules-pop .rule-detail-box").html(ruleDetailHtml);
    $("#read-rules-pop .rule-detail-box .rule-detail").eq(0).addClass("active");
    showRuleTableImg();
    //输入框事件
    $("#read-rules-pop .rule-table input").on("blur", function () {
        $("#read-rules-pop .error-p").remove();
        var faIndex=parseInt($(this).attr("faindex"));
        var childIndex=parseInt($(this).attr("childindex"));
        var iptVal=$(this).val();
        if(!/^[0-9]*[0-9][0-9]*$/.test(iptVal)){
            $(this).val(data[faIndex].goodsSizeList[childIndex].goodsNum);
        }else{
            data[faIndex].goodsSizeList[childIndex].goodsNum=$(this).val();
        }
        var thisShopNum=inputRuleNum(data[faIndex].goodsSizeList);
        if(thisShopNum>shopNum){
            $(this).parents("li").append("<p class='error-p'>超出加入购物车的商品数量</p>");
            $("#read-rules-pop .btn-danger").addClass("active");
            $("#read-rules-pop .shop-list li").eq(faIndex).removeClass("incomplete default complete").addClass("danger");
            $("#read-rules-pop .btn-danger").attr("disabled","disabled").removeClass("rule-success");
        }else if(thisShopNum==shopNum){
            $("#read-rules-pop .btn-danger").removeClass("active");
            $("#read-rules-pop .rule-detail.active .red-color").html(thisShopNum);
            $("#read-rules-pop .shop-list li").eq(faIndex).removeClass("incomplete default danger").addClass("complete");
            $("#read-rules-pop .btn-danger").removeAttr("disabled","disabled").addClass("rule-success");
        }
        else if(thisShopNum<shopNum && thisShopNum>0){
            $("#read-rules-pop .btn-danger").removeClass("active");
            $("#read-rules-pop .shop-list li").eq(faIndex).removeClass("complete default danger").addClass("incomplete");
            $("#read-rules-pop .rule-detail.active .red-color").html(thisShopNum);
            $("#read-rules-pop .btn-danger").removeAttr("disabled","disabled").addClass("rule-success");
        }else{
            $("#read-rules-pop .btn-danger").removeClass("active");
            $("#read-rules-pop .shop-list li").eq(faIndex).removeClass("incomplete complete danger").addClass("default");
            $("#read-rules-pop .rule-detail.active .red-color").html(thisShopNum);
            $("#read-rules-pop .btn-danger").removeAttr("disabled","disabled").addClass("rule-success");
        }
    });
    //展示尺码对照图片路径切换
    function showRuleTableImg(){
        for(var i=0;i<$("#read-rules-pop .shop-list li").length;i++){
            if($("#read-rules-pop .shop-list li").eq(i).hasClass("active")){
                $("#read-rules-pop .look-rule-table").attr("href",data[i].specImgUrl);
            }
        }
    }
    //计算录入总数
    function inputRuleNum(goodsSizeList){
        var allNum=0;
        for(var j=0;j<goodsSizeList.length;j++){
            allNum=allNum+ parseInt(goodsSizeList[j].goodsNum);
        }
        return allNum;
    }
    function ruturnData(data){

        //var newArr=[];
        for(var i=0;i<data.length;i++){
            var arr=[];
            for(var j=data[i].goodsSizeList.length-1;j>=0;j--){
                //console.log(data[i].goodsSizeList);
                if(data[i].goodsSizeList[j].goodsNum==0 ||data[i].goodsSizeList[j].goodsNum=="0"){
                    data[i].goodsSizeList.splice(j,1);
                }
            }

        }
        return data;
    }
    //数组对象的复制
    function deep_copy_in_json(src) {
        return JSON.parse(JSON.stringify(src));
    }
}