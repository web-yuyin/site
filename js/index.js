// JavaScript Document
$(function () {
    $('.main_img').height(document.documentElement.clientHeight);


// 时钟效果
    (function () {
        toTime();
        setInterval(toTime, 1000);
        function toTime() {
            var oDate = new Date();
            var oSec = oDate.getSeconds();
            var oMin = oDate.getMinutes();
            var oHour = (oDate.getHours() % 12) + oMin / 60;
            $('#hour').css('-webkit-transform', 'rotate(' + oHour * 30 + 'deg)');
            $('#min').css('-webkit-transform', 'rotate(' + oMin * 6 + 'deg)');
            $('#sec').css('-webkit-transform', 'rotate(' + oSec * 6 + 'deg)');
            $('#hour').css('-moz-transform', 'rotate(' + oHour * 30 + 'deg)');
            $('#min').css('-moz-transform', 'rotate(' + oMin * 6 + 'deg)');
            $('#sec').css('-moz-transform', 'rotate(' + oSec * 6 + 'deg)');
            $('#hour').css('-o-transform', 'rotate(' + oHour * 30 + 'deg)');
            $('#min').css('-o-transform', 'rotate(' + oMin * 6 + 'deg)');
            $('#sec').css('-o-transform', 'rotate(' + oSec * 6 + 'deg)');
            $('#hour').css('-ms-transform', 'rotate(' + oHour * 30 + 'deg)');
            $('#min').css('-ms-transform', 'rotate(' + oMin * 6 + 'deg)');
            $('#sec').css('-ms-transform', 'rotate(' + oSec * 6 + 'deg)');
            $('#hour').css('transform', 'rotate(' + oHour * 30 + 'deg)');
            $('#min').css('transform', 'rotate(' + oMin * 6 + 'deg)');
            $('#sec').css('transform', 'rotate(' + oSec * 6 + 'deg)');
        }
    })();

// 弹框
    (function () {
        bounced($('.mine_title'), $('.mine_list'));
        //bounced($('.showreel_title'), $('.showreel_list'));

        function bounced(class1, class2) {
            var aLi1 = class1.find('li');
            var aLi2 = class2.find('li');
            var t = 300;

            aLi1.each(function (i) {
                aLi1[i].index = i;
                $(this).click(function () {
                    class2.show(t);
                    aLi2.hide().eq(this.index).show();
                });
            });

            $('.closed').click(function () {
                class2.hide(t);
            });
        }
    })();
});