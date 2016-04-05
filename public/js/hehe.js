/**
 * Created by apache on 16-4-2.
 */
$(document).ready(function() {

    let url = "http://114.215.91.5:8080/super";

    $("#submit").click(function() {
        login();
    });

    $(document).keydown(function(e) {
        if(e.which == 13) {
            login();
        }
    });

    function login() {
        var email = $("#email").val(),
            password = $("#password").val();
        var $this = $(this),
            $tip = $(".tip");

        $this.attr('disabled','disabled');
        $.ajax({
            url : '/api/login',
            type : 'post',
            dataType : 'json',
            contentType : 'application/json;charset=utf-8',
            data : JSON.stringify({email : email, password: password})
        }).done(function(data) {
            $this.removeAttr('disabled');
            if(data.code === 200) {
                location.href = url;
                sessionStorage.admin = JSON.stringify(data);
            } else {
                $tip.addClass('fadeIn');
                $tip.children("#tip-content").css('display','block').text(data.meta);
                setTimeout(function(){
                    $tip.removeClass('fadeIn');
                    $tip.children("#tip-content").css('display','none');
                },2000);
            }
        }).fail(function() {
            $tip.addClass('fadeIn');
            $tip.children("#tip-content").css('display','block');
            setTimeout(function(){
                $tip.removeClass('fadeIn');
                $tip.children("#tip-content").css('display','none');
            },2000);
        });
    }
});