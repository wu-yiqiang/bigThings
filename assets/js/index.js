$(function () {
  //获取本地存储token
  
    getData()
    //绑定点击事件
    var layer=layui.layer
    $("#exit").on("click",function () {
        //弹出层
      
        layer.confirm('确定退出吗？', {icon: 3, title:'温馨提示'}, function(index){
            //do something
            console.log("sdf");
            localStorage.removeItem("token")
            location.href="/login.html"
            layer.close(index);
        });
        
    })
})

function getData() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    success: function (res) {
      if (res.status != 0) {
        return layui.layer.msg('获取用户信息失败！！！')
      }
      renderAvatar(res.data)
    }
  })
}

//渲染数据函数
function renderAvatar(user) {
  //获取用户名
  var names = user.nickname || user.username
  $('#welcome').html('欢迎&nbsp;' + names)
  //渲染数据
  if (user.user_pic !== null) {
    // 3.1 渲染图片
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    // 3.2 渲染文本
    $('.layui-nav-img').hide()
    var first = names[0].toUpperCase()
    $('.text-avatar').html(first).show()
  }
}

//
