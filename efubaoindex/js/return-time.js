/**
 * Created by Administrator on 2017/9/28.
 */
(function (w) {
    function getWeekDate(time) {
        var now = new Date(time); //当前日期
        this.nowDayOfWeek = now.getDay(); //今天本周的第几天
        if(this.nowDayOfWeek==0){
            this.nowDayOfWeek=7;
        }
        this.nowYear = now.getYear(); //当前年
        this.nowYear += (this.nowYear < 2000) ? 1900 : 0;
        this.nowMonth = now.getMonth(); //月
        this.nowDay = now.getDate(); //日
    }
    getWeekDate.prototype={
        formatDate: function (date) {
            var myyear = date.getFullYear();
            var mymonth = date.getMonth()+1;
            var myweekday = date.getDate();
            if(mymonth < 10){
                mymonth = "0" + mymonth;
            }
            if(myweekday < 10){
                myweekday = "0" + myweekday;
            }
            return (myyear+"-"+mymonth + "-" + myweekday);
        },
        //本周开始时间
        firstWeekDay: function () {
            var getWeekStartDate = new Date(this.nowYear, this.nowMonth, this.nowDay - this.nowDayOfWeek+1);
            getWeekStartDate=this.formatDate(getWeekStartDate);
            return getWeekStartDate;
        },
        lastWeekDay: function () {
            var getWeekEndDate = new Date(this.nowYear, this.nowMonth, this.nowDay + (6 - this.nowDayOfWeek)+1);
            var getWeekEndDate =  this.formatDate(getWeekEndDate);
            return getWeekEndDate;
        },
        yesterday: function () {
            var getWeekEndDate = new Date(this.nowYear, this.nowMonth, this.nowDay - 1);
            var getWeekEndDate =  this.formatDate(getWeekEndDate);
            return getWeekEndDate;
        }
    }
    w.getWeekDate=getWeekDate;
}(window))