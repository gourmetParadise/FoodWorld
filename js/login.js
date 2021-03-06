$(function () {

  $('#switch_qlogin').click(function () {
    $('#switch_login').removeClass("switch_btn_focus").addClass('switch_btn');
    $('#switch_qlogin').removeClass("switch_btn").addClass('switch_btn_focus');
    $('#switch_bottom').animate({left: '0px', width: '70px'});
    $('#qlogin').css('display', 'none');
    $('#web_qr_login').css('display', 'block');

  });
  $('#switch_login').click(function () {

    $('#switch_login').removeClass("switch_btn").addClass('switch_btn_focus');
    $('#switch_qlogin').removeClass("switch_btn_focus").addClass('switch_btn');
    $('#switch_bottom').animate({left: '154px', width: '70px'});

    $('#qlogin').css('display', 'block');
    $('#web_qr_login').css('display', 'none');
  });
});

$(document).ready(function () {
  $("#user").blur(function () {
    var username = $("#user").val().trim();
    $.ajax({
      type: 'get',
      url: 'http://localhost:8088/user/' + username + '/judge',
      dataType: 'json',
      success: function (data) {
        if (data.status === 10001) {
          $("#userCue").html("<font color='red'>用户名已存在</font>");
        }
        if(data.status === 10000){
          $("#userCue").html("<font color='red'></font>");
        }
      }
    })
  });
  $('#reg').click(function () {
    var nickName = $("#user").val().trim();
    var password = $("#passwd").val().trim();
    var email = $("#user_email").val().trim();

    if (nickName == "") {
      $('#user').focus().css({
        border: "1px solid red",
        boxShadow: "0 0 2px red"
      });
      $('#userCue').html("<font color='red'>用户名不能为空</font>");
      return false;
    }

    if (!/^[\u4e00-\u9fa5A-Za-z0-9-_]*$/.test(nickName)) {
      $('#user').focus().css({
        border: "1px solid red",
        boxShadow: "0 0 2px red"
      });
      $('#userCue').html("<font color='red'>用户名只能中英文，数字，下划线</font>");
      return false;
    }
    if (password.length < 6) {
      $('#passwd').focus();
      $('#userCue').html("<font color='red'>密码长度不能少于6位</font>");
      return false;
    }
    if (!/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(email)) {
      $('#user_email').focus();
      $('#userCue').html("<font color='red'>邮箱格式有误</font>");
      return false;
    }
    if($('#userCue').text() === '用户名已存在'){
      return false;
    }
    $.ajax({
      type: "POST",
      url: "http://localhost:8088/user/register",
      contentType: 'application/json',
      data: JSON.stringify({
        nickName: nickName,
        password: password,
        email: email
      }),
      dataType: 'json',
      success: function (result) {
        if (result.status === 10000) {
          $("#userCue").html(result.value);
          $("#regUser").submit();
        }
      },
      error: function (e) {
        console.log(e.message);
      }
    });
    
  });

  $('#log').click(function () {
    var nickName = $("#u").val().trim();
    var password = $("#p").val().trim();
    /*console.log("nickName: " + nickName);
     console.log("password: " + password);*/
    $.ajax({
      type: "POST",
      url: 'http://localhost:8088/user/login',
      contentType: 'application/json',
      data: JSON.stringify({
        nickName: nickName,
        password: password
      }),
      dataType: 'json',
      success: function (result) {
        if (result.status === 10000) {
          //存储到sessionStorage
          sessionStorage.setItem("user", nickName);
          //跳到个人主页
          window.location.href = "person.html?username=" + nickName;
        }
      },
      error: function (e) {
        console.log(e.message);
      }
    });
  });
});