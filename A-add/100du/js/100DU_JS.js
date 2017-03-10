// JavaScript Document
$(function () {
// 切换搜索框
    (function () {
        var aLi = $('.menu').find('li');
        var oText = $('#search').find('.form .text');
        var arr = ['例如：荷棠鱼坊烤鱼 或 樱花日本料理', '例如：武汉市青山区建设二路', '例如：优惠券', '例如：全文', '例如：视频'];
        var _this = 0;

        oText.val(arr[_this]);

        aLi.each(function (index) {
            $(this).on('click', function () {
                aLi.attr('class', 'gradient').eq($(this).attr('class', 'active'));
                _this = index;
                oText.val(arr[_this]);
            })
        });
        oText.focus(function () {
            if (this.value === arr[_this]) {
                $(this).val('');
            }
        });
        oText.blur(function () {
            if (this.value === '') {
                this.value = arr[_this];
            }
        })
    })();

// update文字弹性滑动
    (function () {
        var oDiv = $('.update');
        var oUl = oDiv.find('ul');
        var arrData = [
            {'name': '畅畅', 'time': 3, 'title': '油价下周一或每吨下降100元', 'url': '#'},
            {'name': '萱萱', 'time': 4, 'title': '长江沉船仍有400余人生死不明 习近平指示', 'url': '#'},
            {'name': '一一', 'time': 5, 'title': '奥巴马妄议中国南海主权:不能以大欺小', 'url': '#'},
            {'name': '呀呀', 'time': 6, 'title': '2015台北电脑展进行中 新品图集', 'url': '#'},
            {'name': '罗罗', 'time': 7, 'title': '那些灿烂华美的瞬间', 'url': '#'},
            {'name': '嗦嗦', 'time': 8, 'title': '古代中国人到底穿成什么样子？', 'url': '#'},
            {'name': '神神', 'time': 9, 'title': '大众汽车销量断崖式下跌 速腾断轴事件重创口碑', 'url': '#'},
            {'name': '叨叨', 'time': 10, 'title': '国台办回应王郁琦国台办回应王郁琦国台办回应王郁琦国台办回应王郁琦国台办回应王郁琦国台办回应王郁琦国台办回应王郁琦', 'url': '#'}
        ];
        var str = '';
        var iH = 0;
        var btnUp = $('#updateBtnUp');
        var btnDown = $('#updateBtnDown');
        var iNow = 0;
        var timer = null;

        for (var i = 0; i < arrData.length; i++) {
            str += '<li><a href="' + arrData[i].url + '"><em>' + arrData[i].name + '</em> <span>' + arrData[i].time + '分钟前</span> ' + arrData[i].title + '</a></li>'
        }
        oUl.html(str);
        iH = oUl.find('li').height();

        function autoPlay() {
            timer = setInterval(function () {
                doMove(-1)
            }, 2000);
        }
        autoPlay();

        oDiv.hover(function () {
            clearInterval(timer)
        }, autoPlay);
        btnUp.on('click', function () {
            doMove(-1)
        });
        btnDown.on('click', function () {
            doMove(1)
        });
        function doMove(num) {
            iNow += num;
            if (Math.abs(iNow) > arrData.length - 1) {
                iNow = 0;
            }
            if (iNow > 0) {
                iNow = -(arrData.length - 1);
            }
            oUl.stop().animate({'top': iH * iNow}, 2000, 'elasticOut');
        }
    })();

//选项卡切换
    (function () {
        fnTab($('.anav1'), $('.con_hot'), 'click');
        fnTab($('.anav2'), $('.con_map'), 'click');
        fnTab($('.anav3'), $('.conlist1'), 'mouseover');
        fnTab($('.anav4'), $('.conlist2'), 'mouseover');
        function fnTab(oNav, aCon, aEv) {
            var aElem = oNav.children();
            aCon.hide().eq(0).show();

            aElem.each(function (index) {
                $(this).on(aEv, function () {
                    aElem.removeClass('active').addClass('gradient');
                    $(this).removeClass('gradient').addClass('active');
                    aElem.find('a').removeClass('triangle_down').addClass('triangle_down_gray');
                    $(this).find('a').removeClass('triangle_down_gray').addClass('triangle_down');
                    aCon.hide().eq($(this).index()).show();
                })
            });
        }
    })();

//焦点图轮换
    (function () {
        var oDiv = $('#tab_pic');
        var aUlLi = oDiv.find('ul li');
        var aOlLi = oDiv.find('ol li');
        var oP = oDiv.find('p');
        var arrOp = ['爸爸去哪儿', '娇柔妩媚、美艳大方', '人像摄影中的光影感'];
        var iNow = 0;
        var timer = null;
        aUlLi.eq(0).css('zIndex', 2);
        aOlLi.eq(0).addClass('active');
        oP.text(arrOp[0]);

        autoPlay();
        function autoPlay() {
            timer = setInterval(function () {
                iNow++;
                iNow %= arrOp.length;
                tabPic()
            }, 2200)
        }
        oDiv.hover(function () {
            clearInterval(timer)
        }, autoPlay);
        aOlLi.on('click', function () {
            iNow = $(this).index();
            tabPic();
        });

        function tabPic() {
            aUlLi.each(function (i) {
                if (i != iNow) {
                    aUlLi.eq(i).fadeOut().css('zIndex', 1);
                    aOlLi.eq(i).removeClass('active');
                } else {
                    aUlLi.eq(i).fadeIn().css('zIndex', 2);
                    aOlLi.eq(i).addClass('active');
                    oP.text(arrOp[i])
                }
            })
        }
    })();

//日历提示说明
    var aSpan = $('.data h3 span');
    var aImg = $('.data ol img');
    var oPrompt = $('.data_info');
    var oImg = oPrompt.find('img');
    var oStrong = oPrompt.find('strong');
    var oP = oPrompt.find('p');
    var timer = null;

    aImg.hover(function () {
        var iTop = $(this).parent().position().top - 30;
        var iLeft = $(this).parent().position().left + 50;
        var index = $(this).parent().index() % aSpan.length;

        oPrompt.show().css({'top': iTop, 'left': iLeft});
        oP.text($(this).attr('info'));
        oImg.attr('src', $(this).attr('src'));
        oStrong.text(aSpan.eq(index).text());
    }, hidde);
    oPrompt.on('mouseover', shhow);
    oPrompt.on('mouseout', hidde);
    function shhow() {
        clearTimeout(timer);
        oPrompt.show();
    }

    function hidde() {
        timer = setTimeout(function () {
            oPrompt.hide();
        }, 200)
    }

//BBS论坛高亮显示
    (function () {
        $('.bbs_list').find('li').on('mousemove', function () {
            $('.bbs_list').find('li').removeClass('active').eq($(this).index()).addClass('active');
        })
    })();

//遮罩层
    (function () {
        var oUl = $('.hot_show');
        var aLi = oUl.find('li');
        var arr = [
            '',
            'ID：性感<br/>ADD：朝阳<br/>POP：121',
            'ID：性感宝贝<br/>ADD：朝阳/CBD<br/>POP：123321',
            'ID：123<br/>ADD：朝阳<br/>POP：33',
            'ID：234<br/>ADD：昌平<br/>POP：44',
            'ID：345<br/>ADD：海淀<br/>POP：55',
            'ID：456<br/>ADD：房山<br/>POP：66',
            'ID：567<br/>ADD：丰台<br/>POP：77',
            'ID：678<br/>ADD：通州<br/>POP：88',
            'ID：789<br/>ADD：东城<br/>POP：99',
            'ID：890<br/>ADD：西城<br/>POP：100',
        ];
        aLi.on('mouseover', function () {
            if ($(this).index() == 0) {
                return
            }
            aLi.find('p').remove();
            $(this).append('<p>' + arr[$(this).index()] + '</p>');
        });
    })();

//知道分子搜索
    (function () {
        $('.tab_list_text .text').focus(function () {
            if ($(this).val() == '输入关键字') {
                $(this).val('');
            }
        });
        $('.tab_list_text .text').blur(function () {
            if ($(this).val() == '') {
                $(this).val('输入关键字');
            }
        })
    })();
});