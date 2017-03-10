// JavaScript Document

$(function () {
    var arr = ['./img/1.jpg', './img/2.jpg', './img/3.jpg', './img/4.jpg', './img/5.jpg', './img/6.jpg'];
    var str = '';
    var iW = 0;
    var iH = 0;
    var Ynum = 0;
    for (var i = 0; i < arr.length; i++) {
        str += "<li><img src='" + arr[i] + "'/></li>";
    }
    $('.img_list').append(str);
    iW = $('.img_list li').outerWidth(true);
    var iLen = $('.img_list li').length;
    $('.img_list').width(iW * $('.img_list li').length);
    if ($('.img_list').width() > $('.img_size').width()) {
        $('.img_wrap span').show();
    } else {
        $('.img_wrap span').hide();
    }
    $('.prev').click(function () {
        Ynum--;
        if (Ynum < 0) {
            Ynum = iLen - 3;
        }
        $('.img_list').css('left', -Ynum * iW);
    });
    $('.next').click(function () {
        Ynum++;
        if (Ynum > iLen - 3) {
            Ynum = 0;
        }
        $('.img_list').css('left', -Ynum * iW)
    });
    //初始化……
    $('.img_list img').eq(0).css('border-color', '#666');
    $('.smo_pic img').attr('src', arr[0]);
    $('.big_pic img').attr('src', arr[0]);

    $('.img_list img').each(function (i) {
        $(this).click(function () {
            $('.img_list img').css('border-color', 'transparent').eq(i).css('border-color', '#666');
            $('.smo_pic img').attr('src', arr[i]);
            $('.big_pic img').attr('src', arr[i]);
        });
    });
    magnifier($('#wrap'), $('.smo_pic'), $('.big_pic'));
});
//放大镜封装函数
function magnifier(Ywrap, Ysmall_pic, Ybig_pic) {
    Ysmall_pic.mouseover(function () {
        $(this).find('span').show();
        Ybig_pic.show();
    });
    Ysmall_pic.mouseout(function () {
        $(this).find('span').hide();
        Ybig_pic.hide();
    });
    Ysmall_pic.find('div').mousemove(function (ev) {
        var h = ev.pageY - Ywrap.offset().top - Ysmall_pic.find('div').position().top - Ysmall_pic.find('span').outerHeight(true) / 2;
        var l = ev.pageX - Ywrap.offset().left - Ysmall_pic.find('div').position().left - Ysmall_pic.find('span').outerWidth(true) / 2;
        if (h < 0) {
            h = 0
        } else if (h > Ysmall_pic.find('div').outerHeight(true) - Ysmall_pic.find('span').outerHeight(true)) {
            h = Ysmall_pic.find('div').outerHeight(true) - Ysmall_pic.find('span').outerHeight(true);
        }
        if (l < 0) {
            l = 0
        } else if (l > Ysmall_pic.find('div').outerWidth(true) - Ysmall_pic.find('span').outerWidth(true)) {
            l = Ysmall_pic.find('div').outerWidth(true) - Ysmall_pic.find('span').outerWidth(true);
        }
        Ysmall_pic.find('span').css({'top': h, 'left': l});

        var xh = h / (Ysmall_pic.find('div').outerHeight(true) - Ysmall_pic.find('span').outerHeight(true));
        var xl = l / (Ysmall_pic.find('div').outerWidth(true) - Ysmall_pic.find('span').outerWidth(true));

        Ybig_pic.find('img').css({//Ybig_pic.find('img')
            'top': -xh * (Ybig_pic.find('img').outerHeight(true) - Ybig_pic.outerHeight(true)),
            'left': -xl * (Ybig_pic.find('img').outerWidth(true) - Ybig_pic.outerWidth(true))
        });
    });
}