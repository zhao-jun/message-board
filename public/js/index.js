(function () {

    // 增加留言
    $('.submit').click(function (e) {
        //阻止默认事件
        e.preventDefault();
        if($.trim($("#name").val()) == '' || $.trim($("#text").val()) == '') {
            alert('输入为空，重新输入');
            return;
        }
        //简单预防XSS
        if( (/</g).test($("#name").val()) || (/</g).test($("#text").val()) ) {
            alert('非法字符<，重新输入');
            return;
        } else if ((/>/g).test($("#name").val()) || (/>/g).test($("#text").val())) {
            alert('非法字符>，重新输入');
            return;
        }
        var id = parseInt($(".list-main-id").eq(0).find('i').text());
        var messageData = {
            id: (id + 1 ) || 1,
            name: $.trim($("#name").val()),
            text: $.trim($("#text").val()),
            date: new Date().Format("yyyy-MM-dd HH:mm:ss")
        };
        $.ajax({
            type:"post",
            url:"/message",
            data: messageData,
            success:function(result) {
                if (result.success == 1) {
                    console.log(messageData);
                    addMessage();
                }
            }
        });

    });
    /* 模版 */
    String.prototype.tmp = function(obj) {
        return this.replace(/\$\w+\$/g, function(matchs) {
            var returns = obj[matchs.replace(/\$/g, "")];
            return (returns + "") == "undefined"? "": returns;
        });
    };
    function addMessage() {
        var messageData = [{
            id: ( parseInt($(".list-main-id").eq(0).find('i').text()) + 1 ) || 1,
            name: $.trim($("#name").val()),
            text: $.trim($("#text").val()),
            date: new Date().Format("yyyy-MM-dd HH:mm:ss")
        }];
        var htmlList = '',
            htmlTemp = $("script[data-id='list_tpl']").html();

        messageData.forEach(function(object) {
            htmlList += htmlTemp.tmp(object);
        });
        // console.log(htmlList);
        $(".list-items").prepend(htmlList);
        $("#name").val("");
        $("#text").val("");
    }

    //取消按钮
    $('.cancel').click(function (e) {
        e.preventDefault();
        $("#name").val("");
        $("#text").val("");
    });

    
    //删除
/*    $('.list-main-delete').click(function () {
        console.log(1);
        $(this).parent().parent('.list-item').remove();
    });*/
    $('.list-items').on('click','.list-main-delete',function () {
        var self = this,
            id = $(self).parent().children().find('i').text();
        console.log(id);
        $.ajax({
            type:'DELETE',
            url:'/list?id='+id
        })
        .done(function (results) {
            if(results.success === 1){
                $(self).parent().parent().remove();
            }
        });


    });


    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "H+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
})();
