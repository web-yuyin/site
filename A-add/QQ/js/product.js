// JavaScript Document

$(function () {
    var aLi = $('.title').find('li');
    var aDiv = $('.list').find('div');

    aDiv.hide().eq(0).show();
    aLi.each(function (i) {
        aLi[i].index = i;
        $(this).click(function () {
            aLi.attr('class', '').eq($(this).attr('class', 'active'));
            aDiv.hide().eq(this.index).show();
        });
    });
});