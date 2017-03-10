// JavaScript Document
$(function () {
//首页图片切换
    jQuery("#picTab").slide({mainCell: "ul.pic", effect: "leftLoop", autoPlay: true});


//我们的客户——图片生成	
    (function () {
        var oUl = $('.div4 ul').get(0);
        var arrImg = ["img/index/div4_img1.gif", "img/index/div4_img2.gif", "img/index/div4_img3.gif", "img/index/div4_img4.gif", "img/index/div4_img5.gif", "img/index/div4_img6.gif", "img/index/div4_img7.gif", "img/index/div4_img8.gif", "img/index/div4_img9.gif", "img/index/div4_img10.gif", "img/index/div4_img11.gif", "img/index/div4_img12.gif", "img/index/div4_img13.gif", "img/index/div4_img14.gif", "img/index/div4_img15.gif", "img/index/div4_img16.gif"];
        var arrA = ["#"];
        for (var i = 0; i < arrImg.length; i++) {
            oUl.innerHTML += '<li><a href="' + arrA[i % arrA.length] + '"><img src="' + arrImg[i] + '" /></a></li>';
        }
    })();
});