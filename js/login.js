$(function(){

  $('#switch_qlogin').click(function(){
    $('#switch_login').removeClass("switch_btn_focus").addClass('switch_btn');
    $('#switch_qlogin').removeClass("switch_btn").addClass('switch_btn_focus');
    $('#switch_bottom').animate({left:'0px',width:'70px'});
    $('#qlogin').css('display','none');
    $('#web_qr_login').css('display','block');

  });
  $('#switch_login').click(function(){

    $('#switch_login').removeClass("switch_btn").addClass('switch_btn_focus');
    $('#switch_qlogin').removeClass("switch_btn_focus").addClass('switch_btn');
    $('#switch_bottom').animate({left:'154px',width:'70px'});

    $('#qlogin').css('display','block');
    $('#web_qr_login').css('display','none');
  });
});

$(document).ready(function() {


  $('#reg').click(function() {
    var nickName = $("#user").val().trim();
    var password = $("#passwd").val().trim();
    var email = $("#user_email").val().trim();
    /*console.log("nickName: " + nickName);
    console.log("password: " + password);
    console.log("email: " + email);*/

    if (nickName == "") {
      $('#user').focus().css({
        border: "1px solid red",
        boxShadow: "0 0 2px red"
      });
      $('#userCue').html("<font color='red'><b>用户名不能为空</b></font>");
      return false;
    }

    if (!/^[\u4e00-\u9fa5A-Za-z0-9-_]*$/.test(nickName)){
      $('#user').focus().css({
        border: "1px solid red",
        boxShadow: "0 0 2px red"
      });
      $('#userCue').html("<font color='red'><b>用户名只能中英文，数字，下划线</b></font>");
      return false;
    }
    /*注册请求*/
    $.ajax({
      type: "post",
      url: "/user/register-POST",
      data: {
        nickName: nickName,
        password: password,
        email: email
      },
      dataType: 'json',
      success: function(result) {
        console.log(result.value);
        $("#userCue").html(result.value);
      },
      error:function(e){
        console.log(e.message);
      }
    });

    if (password.length < 6) {
      $('#passwd').focus();
      $('#userCue').html("<font color='red'><b>密码长度不能少于6位</b></font>");
      return false;
    }
    if(!/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(email)){
      $('#user_email').focus();
      $('#userCue').html("<font color='red'><b>邮箱格式有误</b></font>");
      return false;
    }
    $('#regUser').submit();
  });
  $('#log').click(function() {
    console.log("bbb");
    var nickName = $("#u").val().trim();
    var password = $("#p").val().trim();
    /*console.log("nickName: " + nickName);
    console.log("password: " + password);*/
    $.ajax({
      type: "post",
      url: '/user/login-POST',
      data: {
        nickName: nickName,
        password: password
      },
      dataType: 'json',
      success: function (result) {
        console.log(result.value);
        $("#reminder").html(result.value);
      },
      error: function (e) {
        console.log(e.message);
      }
    })
  });
});