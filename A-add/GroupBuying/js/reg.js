var textVal;
//默认提示文字;
var valid = {
    validRules: {
        /*'required': /[\w\W]+/,*/
        'required': /[\S]+/,
        /*'username': /^[A-Za-z0-9\-\u4e00-\u9fa5]{2,20}$/,*/
        'username': /^([\u4e00-\u9fa5]|[a-zA-Z0-9\-]){2,20}$/,
        'password': /^.*[A-Za-z0-9\\w_-]+.*$/,
        'email': /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        'chinese': /^[\u4e00-\u9fa5]+$/,
        'identity': /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/,
        'mobile': /^(1)[0-9]{10}$/,
        'zipcode': /^\d{6}$/,
        'tel': /^0?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[0-9])[0-9]{8}$/,
        'qq': /^[1-9]*[1-9][0-9]*$/, //QQ号码
        'num': /^\d+$/,
        'pwdlength': /^[\w\d_]{6,20}$/,
        'length': /^[\w\W]{4,20}$/,
        "illegal": /^[^@\/\'\\\"#$%&\^\*]+$/,
        'slength': /^[\w\W]{1,10}$/,
        'addresslength': /^[\w\W]{1,50}$/,
        'vatcodelength': /^[\w\W]{15}$/,
        'codelength': /^[\d]{6}$/,
        'vatcode': /^([0-9])|([a-zA-Z])$/,
        'phone': /^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/,
        'banklength': /^[\w\W]{19}$/,
        'bank': /^[0-9]*$/,
        'card': /^[0-9]{9}$/,
        'name': /^[A-Za-z0-9]{1,20}$|^[\u4e00-\u9fa5]{1,10}$/,
        /*'codeid': /(^\d{17}([0-9]|X|x))$|(^\d{8})$|(^[A-Za-z0-9]{8}-[A-Za-z0-9]{1})$/*/
        'codeid': /(^\d{17}([0-9]|X|x))$|(^[A-Za-z0-9]{8}-[A-Za-z0-9]{1})$/,
        'adress': /^[^\/\\\^\[\]\'\"~$&%<>{}:;+]{2,30}$/,
        'realname': /^[a-zA-Z\u4e00-\u9fa5]{2,20}$/,
        'buyname': /^[A-Za-z0-9\-\u4e00-\u9fa5]{2,20}$/,
        'exp': /^(([0-9]|([1-9][0-9]{0,9}))((\.[0-9]{1,2})?))$/
    },
    validError: {
        'required': "不能为空",
        'username': "2-20个字符，可由中英文，数字，“-”号组成",
        'password': "密码格式不对",
        'email': "邮箱地址不正确，请重新输入",
        'chinese': "必须输入中文字符",
        'identity': "身份证格式不对",
        'mobile': '电话号码格式不对',
        'zipcode': '邮政编码格式不对',
        'tel': '手机号码格式不对，请重新输入',
        'qq': 'QQ号码格式不对',
        'num': '用户名不能是纯数字，请确认输入的是手机号或者重新输入',
        'pwdlength': "密码只能是6-20位字符、数字或下划线",
        'length': "只能在4-20位字符之间",
        'illegal': "不能含有非法字符",
        'slength': "长度只能在1-10位字符之间",
        'addresslength': "长度只能在1-50位字符之间",
        'vatcodelength': "长度只能是15位字符",
        'codelength': "长度只能是6位数字",
        'vatcode': "纳税人识别号只能是数字或字母",
        'phone': "请输入正确的电话格式，例如（027-8888888-020）",
        'banklength': "开户账号格式不对",
        'bank': "开户账号只能为数字",
        'card': "会员卡号不正确",
        'name': "只能是20个英文或10个汉字",
        'codeid': "证件号码格式不正确，请重新输入",
        'adress': "请输入2-30个字，不能输入特殊字符",
        'realname': "2~6个字,可由中英文,字母组成",
        'buyname': "请输入2-30个字",
        'exp': "请输入金额"
    }
};
(function ($) {
    $.fn.extend({
        formFn: function (options) {
            //参数默认值
            var defaults = {
                ajaxPost: false,
                selectname: '',
                id: ""
            };
            var options = $.extend(defaults, options);
            var $this = $("#" + options.id);

            var formUtil = function (field) {
                //遍历输入框，触发事件
                field.find("[valid]").each(function () {
                    // $(this).parents(".order_step_user_info").length == 1
                    if ($("#is_default").val() == 1) {
                        var inputValidateFlag = checker.validate($(this));

                        var allValidateFlag = true;
                        var selectFlag = true;
                        $(".order_step_user_info").find("input").each(function (n) { // 检查其他输入框是否验证通过
                            var validateItem = checker.validate($(this));
                            if (!validateItem) {
                                allValidateFlag = false;
                                $(this).next().css("display", "none");
                            }
                        });


                        if ($(this).attr("id") == "address") { // 地址验证
                            var addThis = $(this);
                            $(".order_step_user_info").find("select").each(function () { // 省份，城市，地址未选择
                                if ($(this).val() == 0) {
                                    selectFlag = false;
                                    addThis.next().css("display", "none");
                                }
                            });

                            if (inputValidateFlag && selectFlag) { // 省份，城市，地址已选择，详细地址验证通过,写入合同
                                writeContract($(this));
                            }

                        } else if (inputValidateFlag) { // 除地址之外的其他输入框
                            writeContract($(this));
                        }
                        if (allValidateFlag && selectFlag) { // 所有验证都通过
                            $("#accept_order_text,#accept_text").addClass("success");
                            $(".icon_demo").addClass("hidden");
                        } else {
                            $("#accept_order_text,#accept_text").removeClass("success");
                            $(".icon_demo").removeClass("hidden");
                        }
                    }

                    checker.selectname();
                    //判断类型
                    var _this = $(this);
                    var _type = $(this).attr('rel');
                    var f = (_type == "radio" || _type == "file") ? "click" : "focus";
                    if (_type == 'username') {
                        boxlist($(this));
                    }
                    $(this).bind(f, function () {
                        $(this).parent().find(".text").removeClass("gtext").removeClass("rtext").addClass("btext");

                        if (_type != "checkbox") {
                            $(this).parent().find(".hx-input-show").removeClass("error").show();
                        }
                        if (_type == 'password') {
                            $(this).parent().find(".hx-input-show i").text("6-20位字符，可使用字母、数字或下划线的组合");
                        } else if (_type == 'radio') {
                            $(this).parent().parent().find(".hx-input-show").hide();
                        } else if (_type == 'select') {
                            $(this).parent().parent().find(".hx-input-show").hide();
                        } else {
                            var t = $(this).parent().find(".blurshow").text();
                            $(this).parent().find(".hx-input-show i").text(t);
                            $(this).parent().find(".input-success-img").hide();
                        }
                    }).bind("blur", function () {
                        checker.validate($(this));
                        checker.selectname();
                    });
                })
            };
            $("#myagree").on('change blur', function () {
                checker.validate($(this));
                checker.selectname();
                if ($(this).is(':checked')) {
                    //	$(this).nextAll(".box").find(".hx-input-show").removeClass("error");
                    $(this).nextAll(".box").find(".hx-input-show").css("cssText", "display:none!important");
                } else {
                    $(this).nextAll(".box").find(".hx-input-show").addClass("error1");
                    $(this).nextAll(".box").find(".hx-input-show").css("cssText", "display:block!important;margin-top:15px;");
                }
            });

            //判断验证
            var checker = {
                validate: function (field) {
                    var rules = field.attr('valid').split("|");
                    var type = field.attr("rel"); //类型
                    var box = field.attr("box");
                    var name = field.attr("name");
                    var start = true;
                    var ajax = false;
                    textVal = field.val();
                    var placeholder = field.attr("placeholder");
                    field.parent().find(".box").show();
                    switch (type) {
                        //用户名
                        case "username":
                        default:
                            if (rules[0] == 'required' || (rules[0] != 'required' && textVal != '')) {
                                for (var i = 0; i < rules.length; i++) {
                                    if (rules[i] == 'ajax') {
                                        ajax = true;
                                        start = checker.ajaxurl(field, textVal, start);
                                        break;
                                    }
                                }
                            }
                            break;
                        case "address": //详细地址在这里验证
                            start = checkmintomax(field, 6, 90);
                            break;

                        case "realname":
                            start = checkmintomax(field, 2, 90);
                            break;

                        case "nickname":
                            start = checkmintomax(field, 2, 20);
                            break;

                        case "text":

                            if (rules[0] == 'required' || (rules[0] != 'required' && textVal != '')) {
                                for (var i = 0; i < rules.length; i++) {
                                    if (rules[i] == 'ajax') {
                                        ajax = true;
                                        start = checker.ajaxurl(field, textVal, start);
                                        break;
                                    } else if (rules[i] == 'repeat') {
                                        var old = $('#' + field.attr('repeat')).val();
                                        var passtext = field.attr("errormsg");
                                        if (field.val() != old) {
                                            field.parent().find(".hx-input-show").addClass("error").show().find("i").text(passtext);
                                            start = false;
                                            break;
                                        }
                                    } else if (placeholder == textVal || (!valid.validRules[rules[i]].test(textVal))) {
                                        //rtext;
                                        field.parent().find(".text").removeClass("gtext").removeClass("btext").addClass("rtext");
                                        if (i == 0 && field.attr("id") == "code") {
                                            valid.validError[rules[i]] = "请输入验证码";
                                        } else if (i == 0 && field.attr("id") == "password") {
                                            valid.validError[rules[i]] = "请输入密码";
                                        } else if (i == 0 && field.attr("rel") == "text") {
                                            if (rules[0] == 'required') {
                                                var label = field.parent().find(".blurshow").text();
                                                valid.validError[rules[i]] = label;
                                            }
                                        }

                                        field.parent().find(".hx-input-show").addClass("error").show().find("i").text(valid.validError[rules[i]]);

                                        start = false;
                                        break;
                                    } else if (rules[i] == 'username') {
                                        var username_length = field.val().replace(/[^\x00-\xff]/g, '**').length;
                                        if (username_length < 2 || username_length > 20) {
                                            var temp = field.parent().find(".blurshow").html();
                                            field.parent().find(".hx-input-show").addClass("error").show().find("i").text(temp);
                                            start = false;
                                            break;
                                        }
                                    } else if (field.attr('id') == 'address') {
                                        $(".order_step_user_info").find("select").each(function () { // 省份，城市，地址未选择
                                            if ($(this).val() == 0) {
                                                selectFlag = false;
                                                start = false;
                                            }
                                        });
                                    }
                                }
                            }

                            break;

                        case "notmust":				//不是必填的，不填不验证，填了就要验证
                            var vrules = valid.validRules[rules[1]],
                                verror = valid.validError[rules[1]];
                            if (placeholder == textVal || ((!vrules.test(textVal)) && textVal.length != 0)) {
                                field.parent().find(".text").removeClass("gtext").removeClass("btext").addClass("rtext");
                                if (i == 0 && field.attr("rel") == "text") {
                                    if (rules[0] == 'required') {
                                        var label = field.parent().find(".blurshow").text();
                                        verror = label;
                                    }
                                }
                                field.parent().find(".hx-input-show").addClass("error").show().find("i").text(verror);
                                start = false;
                                break;
                            }
                            break;
                        case "select":
                            checker.selectname();
                            break;
                        case "checkbox":
                            if ($("input[name='" + name + "']:checked").size() < box) {
                                var t = field.parent().find(".blurshow").text();
                                field.parent().find(".hx-input-show").addClass("error").show().find("i").text(t);
                                start = false;
                            }
                            break;
                        case "radio":
                            if (!$('input:radio[name="sex"]:checked').val()) {
                                var t = field.parent().parent().find(".blurshow").text();
                                field.parent().parent().find(".hx-input-show").addClass("error").show().find("i").text(t);
                                start = false;
                            }
                            break;
                    }
                    checker.buildTips(field, start);
                    return start;
                },
                validateKeyup: function (field) {
                    var rules = field.attr('valid').split("|");
                    var type = field.attr("rel"); //类型
                    var box = field.attr("box");
                    var name = field.attr("name");
                    var start = true;
                    var ajax = false;
                    textVal = field.val();
                    var placeholder = field.attr("placeholder");
                    field.parent().find(".box").show();
                    switch (type) {
                        //用户名
                        case "username":
                        default:
                            if (rules[0] == 'required' || (rules[0] != 'required' && textVal != '')) {
                                for (var i = 0; i < rules.length; i++) {
                                    if (rules[i] == 'ajax') {
                                        ajax = true;
                                        start = checker.ajaxurl(field, textVal, start);
                                        break;
                                    }
                                }
                            }
                            break;

                        case "address": //详细地址在这里验证
                            start = checkmintomax(field, 6, 90);
                            break;

                        case "realname":
                            start = checkmintomax(field, 2, 90);
                            break;

                        case "nickname":
                            start = checkmintomax(field, 2, 20);
                            break;

                        case "text":
                            if (rules[0] == 'required' || (rules[0] != 'required' && textVal != '')) {
                                for (var i = 0; i < rules.length; i++) {
                                    if (rules[i] == 'ajax') {
                                        ajax = true;
                                        start = checker.ajaxurl(field, textVal, start);
                                        break;
                                    } else if (rules[i] == 'repeat') {
                                        var old = $('#' + field.attr('repeat')).val();
                                        var passtext = field.attr("errormsg");
                                        if (field.val() != old) {
                                            field.parent().find(".hx-input-show").addClass("error").show().find("i").text(passtext);
                                            start = false;
                                            break;
                                        }
                                    } else if (placeholder == textVal || (!valid.validRules[rules[i]].test(textVal))) {
                                        //rtext;
                                        // .addClass("rtext")
                                        field.parent().find(".text").removeClass("gtext").removeClass("btext");
                                        if (i == 0 && field.attr("id") == "code") {
                                            valid.validError[rules[i]] = "请输入验证码";
                                        } else if (i == 0 && field.attr("id") == "password") {
                                            valid.validError[rules[i]] = "请输入密码";
                                        } else if (i == 0 && field.attr("rel") == "text") {
                                            if (rules[0] == 'required') {
                                                var label = field.parent().find(".blurshow").text();
                                                valid.validError[rules[i]] = label;
                                            }
                                        }
                                        /*if (field.parents('.order_step_user_info').length >= 1) {
                                         field.parent().find(".hx-input-show").show().find("i").text(valid.validError[rules[i]]);
                                         start = false;
                                         break;
                                         }
                                         field.parent().find(".hx-input-show").show().find("i").text(valid.validError[rules[i]]); */
                                        start = false;
                                        break;
                                    }
                                }

                            }
                            break;
                        case "select":
                            checker.selectname();
                            break;
                        case "checkbox":
                            if ($("input[name='" + name + "']:checked").size() < box) {
                                var t = field.parent().find(".blurshow").text();
                                field.parent().find(".hx-input-show").addClass("error").show().find("i").text(t);
                                start = false;
                            }
                            break;
                        case "radio":
                            if (!$('input:radio[name="sex"]:checked').val()) {
                                var t = field.parent().parent().find(".blurshow").text();
                                field.parent().parent().find(".hx-input-show").addClass("error").show().find("i").text(t);
                                start = false;
                            }
                            break;
                    }

                    if (start == true) {
                        field.parent().find(".hx-input-show").hide();
                        field.parent().find(".text").removeClass("rtext").removeClass("btext");
                        field.parent().find(".input-success-img").show();
                    } else {
                        field.parent().find(".hx-input-show").show();
                        field.parent().find(".input-success-img").hide();
                    }
                    return start;
                },
                ajaxurl: function (obj, name, type) {
                    var result = true;
                    if (type == true) {
                        var url = obj.attr('ajaxurl');
                        var error = obj.attr('errormsg');
                        var loginname = $("#loginname").val();
                        var cardname = $("#cardname").val();
                        var mobile = $("#smsMobile").val();
                        if (loginname) {
                            info = {
                                "name": name,
                                "loginname": loginname
                            };
                        } else if (cardname) {
                            info = {
                                "name": name,
                                "cardname": cardname
                            };
                        } else if (mobile) {
                            info = {
                                "name": name,
                                "mobile": mobile
                            };
                        } else {
                            info = {
                                "name": name
                            };
                        }

                        $.ajax({
                            type: "post",
                            url: url,
                            data: info,
                            cache: false,
                            async: false,
                            success: function (data) {
                                var jarray = $.parseJSON(data);
                                if (jarray.status != 1) {
                                    obj.parent().find(".text").removeClass("gtext").removeClass("btext").addClass("rtext");
                                    obj.parent().find(".hx-input-show").addClass("error").show().find("i").text(jarray.info);
                                    result = false;
                                }
                            }
                        });
                        return result;
                    }
                },
                ajaxPost: function (obj, start) {
                    var formUrl = obj.attr("action");
                    if (start == true) {
                        var d = $("#district").val();
                        if (d == 0) {
                            $(".col-xs-8 .hx-input-show").show().addClass("error").text("请输入详细地址");
                            $(".col-xs-8 .input-success-img").hide();
                            $(".icon_demo").show();
                            $(".part_b").html("<p>乙　　方：<font></font></p><p>联系方式：<font></font></p><p>证件号码：<font></font></p><p>详细地址：<font></font> <font></font> <font></font> <font></font></p>");
                            $("#accept_text,#accept_order_text").attr("title", "请生成正式版购车合同");
                        } else {
                            $.ajax({
                                type: "post",
                                url: formUrl,
                                data: $this.serialize(),
                                cache: false,
                                async: false,
                                success: function (data) {
                                    var d = $("#order_user #district").val();
                                    if (d != 0) {
                                        $(".icon_demo").hide();
                                        $(".part_b").html(data);
                                        $("#accept_text,#accept_order_text").attr("title", "同意上述条款，去付款");
                                    }
                                }
                            })
                        }
                    } else {
                        $(".icon_demo").show();
                        $(".part_b").html("<p>乙　　方：<font></font></p><p>联系方式：<font></font></p><p>证件号码：<font></font></p><p>详细地址：<font></font> <font></font> <font></font> <font></font></p>");
                        $("#accept_text,#accept_order_text").attr("title", "请生成正式版购车合同");
                    }
                },
                buildTips: function (field, start) {
                    if (field.attr("id") == "password" && start == true) {
                        field.parent().find(".text").removeClass("rtext").addClass("gtext");
                    }
                    if (field.attr("id") == "password" && start == false) {
                        $(".strengthA").hide();
                    }
                    if (start == true) {
                        field.parent().find(".hx-input-show").hide();
                        field.parent().find(".text").removeClass("rtext").removeClass("btext");
                        field.parent().find(".input-success-img").show();
                    } else {
                        field.parent().find(".input-success-img").hide();
                    }
                },
                selectname: function () {
                    var dataObj = eval(options.selectname); //转化JSON
                    var start = true;
                    $(dataObj).each(function () {
                        var selectArr = this.name.split("|");
                        for (var i = 0; i < selectArr.length; i++) {
                            selectObj = selectArr[i].split(",");
                            var selectId = selectObj[0];
                            var selectText = selectObj[1];
                            var required = $("#" + selectId).attr("valid");
                            if (required == 'required') {
                                if ($("#" + selectId).val() == selectText) {
                                    var t = $("#" + selectId).parent().find(".blurshow").text();
                                    $("#" + selectId).parent().find(".hx-input-show").addClass("error").show().find("i").text(t);
                                    start = false;
                                    break;
                                } else {
                                    start = true;
                                }
                            } else {
                                start = true;
                            }
                        }
                    });
                    return start;

                },
                submitForm: function (obj) {
                    $("#" + options.id + " .button").click(function () {
                        var submitStart = true;
                        var chkObj = obj.find('[valid]');
                        var files = obj.find('[rel]');
                        for (var i = 0; i < chkObj.length; i++) {
                            if (!checker.validate($(chkObj[i]))) {
                                submitStart = false;
                            }
                        }
                        if (checker.selectname() === false) {
                            submitStart = false;
                        }
                        if (submitStart === true && options.ajaxPost === false) {
                            obj.submit();
                        }
                        if (options.ajaxPost === true) {
                            checker.ajaxPost(obj, submitStart);
                        }
                    })
                }
            };
            var boxlist = function (field) {
                $("#username").bind("keyup", function () {
                    var keyword = $("#username").val();
                    $("#username").parent().find(".boxlist").show();
                    var t = $("#username").val();
                    $(".boxlist").find("ul").html("");
                    $(".boxlist").find("ul").append("<li>" + t + "@163.com</li><li>" + t + "@qq.com</li><li>" + t + "@sina.com</li><li>" + t + "@139.com</li><li>" + t + "@gmail.com</li>");
                    $(".boxlist ul li").each(function () {
                        $(this).click(function () {
                            textVal = $(this).text();
                            $("#username").val(textVal);
                            $(".boxlist").hide();
                            checker.validate($("#username"));
                        })
                    });
                    $(".boxlist").mouseover(function () {
                        $(".boxlist").show();
                    });
                    $(document).bind("click", function (e) {
                        if ($(".boxlist").css("display") == "block") {
                            $(".boxlist").hide();
                        }
                    })

                })
            };
            $('.pwdlevel').bind('input propertychange', function () {
                var pwd = $(this).val();
                var myreg = /^[\w\W]{6,20}$/;
                if (myreg.test(pwd)) {
                    $(".strengthA").show();
                    if (pwdLevel($(this).val()) == 1) {
                        $(".strengthA").find("b").css("background-position", "0px 0px");
                        $(this).parent().find(".hx-input-show").hide();
                    } else if (pwdLevel($(this).val()) == 2) {
                        $(".strengthA").find("b").css("background-position", "0px -13px");
                        $(this).parent().find(".hx-input-show").hide();
                    } else {
                        $(this).parent().find(".hx-input-show").hide();
                        $(".strengthA").find("b").css("background-position", "0px -26px");
                    }
                } else {
                    $(".strengthA").hide();
                }

            });

            function valiateSelect() {
                var selectFlag = true;
                $(".order_step_user_info").find("select").each(function () { // 省份，城市，地址未选择
                    if ($(this).val() == 0) {
                        selectFlag = false;
                    }
                });
                return selectFlag;
            }

            function valiateAllInput(input_id) {
                var allValidateFlag = true;
                $(".order_step_user_info").find("input").each(function () { // 检查其他输入框是否验证通过
                    //if ($(this).attr('id') != input_id) {
                    var validateItem = checker.validateKeyup($(this));
                    if (!validateItem) {
                        allValidateFlag = false;
                        $(this).next().css("display", "none");
                        return allValidateFlag;
                    }
                    //}
                });
                return allValidateFlag;
            }


            $('#order_user input').bind('keyup', function () {
                var input_id = $(this).attr('id');
                var allValidateFlag = true;
                var selectFlag = true;
                var validateFlag = checker.validate($(this));

                if (validateFlag) {
                    allValidateFlag = valiateAllInput(input_id);

                    if (allValidateFlag) {
                        selectFlag = valiateSelect();
                    }
                    $(this).parent().find('.input-success-img').show();
                } else {
                    allValidateFlag = false;
                    $(this).parent().find('.input-success-img').hide();
                }
                if ($(this).attr("id") == "address") { // 地址验证
                    var addThis = $(this);
                    $(".order_step_user_info").find("select").each(function () { // 省份，城市，地址未选择
                        if ($(this).val() == 0) {
                            selectFlag = false;
                            addThis.next().css("display", "none");
                        }
                    });

                    if (validateFlag && selectFlag) { // 省份，城市，地址已选择，详细地址验证通过,写入合同
                        writeContract($(this));
                    }

                } else if (validateFlag) { // 其他输入框，验证通过就写入合同
                    writeContract($(this));
                }

                if (allValidateFlag && selectFlag) { // 输入框验证全部通过，下拉框全部选择，“样本”图片隐藏，“同意上述条款”可点击
                    $("#accept_order_text,#accept_text").addClass("success");
                    $(".icon_demo").addClass("hidden");
                } else {
                    $("#accept_order_text,#accept_text").removeClass("success");
                    $(".icon_demo").removeClass("hidden");
                }
            });

            $(".common_dl_horizontal.nick input,.common_dl_horizontal #address").on('keyup', function () { // 购车完善信息页，收货人信息验证
                var inputValidate = checker.validate($(this));

                if ($(this).attr('id') == "address") {
                    $(".order_adress_select select").each(function () {
                        if ($(this).val() == 0) {
                            inputValidate = false;
                        }
                    });
                }

                if (!inputValidate) {
                    $(this).parent().find('.input-success-img').css('display', 'none');
                    $(this).parent().find('.hx-input-show').css('display', 'block').addClass('error');
                    $(this).parent().find('.hx-input-show i').text('请选择收货地址!');
                }

                if (inputValidate) {
                    $(this).next().css('display', 'block');
                } else {
                    $(this).next().css('display', 'none');
                }
                checker.selectname();
            });


            $(".order_adress_select select").on('change', function () {
                var inputValidate = true;
                $(".order_adress_select select").each(function () {
                    if ($(this).val() == 0) {
                        inputValidate = false;
                    }
                });

                if (!inputValidate) {
                    $(this).parent().find('.input-success-img').css('display', 'none');
                    $(this).parent().find('.hx-input-show').css('display', 'block').addClass('error');
                    $(this).parent().find('.hx-input-show i').text('请选择收货地址!');
                } else {
                    var adressValidate = checker.validate($("#address"));
                    if (adressValidate) {
                        $(this).parent().find('.input-success-img').css('display', 'block');
                        $(this).parent().find('.hx-input-show').css('display', 'none').removeClass('error');
                    } else {
                        $(this).parent().find('.input-success-img').css('display', 'none');
                        $(this).parent().find('.hx-input-show').css('display', 'block').addClass('error');
                        $(this).parent().find('.hx-input-show i').text('请输入详细地址!');
                    }
                }
            });


            $("#order_user #province,#order_user #city,#order_user #district").on('change', function () {
                var allValidateFlag = true;
                var selectFlag = true;
                $(this).parentsUntil(".row").find("select").each(function () {
                    if ($(this).val() == 0) {
                        $(this).addClass('error');
                        selectFlag = false;
                    } else {
                        $(this).removeClass('error');
                    }
                });

                var addressFlag = checker.validate($("#address"));
                if (selectFlag && addressFlag) {
                    writeContract($("#address"));
                }
                $(".order_step_user_info").find("input").each(function () {
                    var validateItem = checker.validate($(this));
                    if (!validateItem) {
                        allValidateFlag = false;
                        $(this).next().css("display", "none");
                    }
                });

                if (selectFlag && allValidateFlag) {
                    $(this).parent().find('.input-success-img').show();
                    $("#accept_order_text,#accept_text").addClass("success");
                    $(".icon_demo").addClass("hidden");
                } else {
                    $(this).parent().find('.input-success-img').hide();
                    $("#accept_order_text,#accept_text").removeClass("success");
                    $(".icon_demo").removeClass("hidden");
                }
            });


            function writeContract(obj) {
                var idName = obj.attr("id");
                var idValue = obj.val();
                switch (idName) {
                    case "username":
                        if ($("#demo_username").html() != idValue) {
                            $("#demo_username").html(idValue);
                        }
                        break;
                    case "tel":
                        if ($("#demo_tel").html() != idValue) {
                            $("#demo_tel").html(idValue);
                        }
                        break;
                    case "card_id":
                        if ($("#demo_card_id").html() != idValue) {
                            $("#demo_card_id").html(idValue);
                        }
                        break;
                    case "address":
                        $("#demo_province").html($("#province option:selected").text());
                        //$("#demo_province").html($("#hb").text());
                        $("#demo_city").html($("#city option:selected").text());
                        $("#demo_district").html($("#district option:selected").text());
                        $("#demo_address").html(idValue);
                        break;
                    default:
                        break;
                }
            }

            function pwdLevel(value) {
                var pattern_1 = /^.*([\W_])+.*$/i;
                var pattern_2 = /^.*([a-zA-Z])+.*$/i;
                var pattern_3 = /^.*([0-9])+.*$/i;
                var level = 0;
                if (value.length > 10) {
                    level++;
                }
                if (pattern_1.test(value)) {
                    level++;
                }
                if (pattern_2.test(value)) {
                    level++;
                }
                if (pattern_3.test(value)) {
                    level++;
                }
                if (level > 3) {
                    level = 3;
                }
                return level;
            }

            formUtil($this);
            checker.submitForm($this);
            this.revert = checker;
            return this.revert;
        }
    })

})(jQuery);


function checkStrLen(sString) {
    var sStr, iCount, i, strTemp;
    iCount = 0;
    sStr = sString.split("");
    for (i = 0; i < sStr.length; i++) {
        strTemp = escape(sStr[i]);
        if (strTemp.indexOf("%u", 0) == -1) {
            iCount = iCount + 1;
        } else {
            iCount = iCount + 3;
        }
    }
    return iCount;
}


function checkmintomax(obj, min, max) {
    var len = obj.val().length;
    if (len < min || len > max) {
        obj.parent().find(".text").removeClass("gtext").removeClass("btext").addClass("rtext");
        obj.parent().find(".hx-input-show").addClass("error").show().find("i").text('请输入' + min + '~' + max + '个字。');
        return false;
    }
    return true;
}