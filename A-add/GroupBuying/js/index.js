$(function () {
    jQuery(".BuyPep").slide({
        mainCell: ".Buyed ul",
        autoPlay: true,
        effect: "topMarquee",
        vis: 3,
        interTime: 50,
        pnLoop: false,
        trigger: "click",
        mouseOverStop: true
    });

    var top1 = $('.EnrollBuy').offset().top;
    $(window).scroll(function () {
        var ling = $(window).scrollTop();
        if (ling > top1) {
            $('.EnrollBuy').addClass('EnrollBuyFixed');
        } else {
            $('.EnrollBuy').removeClass('EnrollBuyFixed');
        }
    });
    $('.CarList').each(function (i, e) {
        countDown($(this).find('.GroupTimeOut'), 100000);
    });
});


function countDown(obj, oTime, callback) {
    function doubleNum(n) {
        return n < 10 ? '0' + n : n
    }

    function count_down(oTime) {
        var closeTime = oTime / 1000;
        var day = doubleNum(Math.floor(closeTime / (60 * 60 * 24)));
        var hour = doubleNum(Math.floor(closeTime / (3600)) - (day * 24));
        var minute = doubleNum(Math.floor(closeTime / (60)) - (day * 24 * 60) - (hour * 60));
        var second = doubleNum(Math.floor(closeTime) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60));
        var timeArray = [day, hour, minute, second];
        return timeArray;
    }

    var t = count_down(oTime);
    obj.each(function () {
        $(this).html('<span>' + t[0] + '</span>天<span>' + t[1] + '</span>时<span>' + t[2] + '</span>分<span>' + t[3] + '</span>');
    });
    if (oTime <= 0) {
        clearInterval(obj.timer);
        obj.each(function (i, e) {
            $(this).html('<span>00</span>天<span>00</span>时<span>00</span>分<span>00</span>');
        });
    }
    obj.timer = setInterval(function () {
        oTime = oTime - 1000;
        t = count_down(oTime);
        obj.each(function (i, e) {
            $(this).html('<span>' + t[0] + '</span>天<span>' + t[1] + '</span>时<span>' + t[2] + '</span>分<span>' + t[3] + '</span>');
        });
        if (oTime <= 0) {
            clearInterval(obj.timer);
            obj.each(function (i, e) {
                $(this).html('<span>00</span>天<span>00</span>时<span>00</span>分<span>00</span>');
            });
            callback && callback();
        }
    }, 1000);
}