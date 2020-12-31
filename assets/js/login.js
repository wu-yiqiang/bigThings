$(function () {
    $("#link_login").on("click", function () {
        //隐藏注册按键，显示登录按键
        $(".reg-box").hide()
        $(".login-box").show()
    })
    //显示登录按键，隐藏注册按键
    $("#link_reg").on("click", function () {

        $(".login-box").hide()      
        $(".reg-box").show()
    })
    var form = layui.form
    form.verify({
        //校验输入的密码位数
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //校验两次输入的密码一致性
        repwd: function (value) {
            const revalue = $(".reg-box [name=reguserrepassword]").val()
            if (value != revalue) {
                return "两次输入的密码不一致"
            } 
        }
    })

    //发送请求注册用户
    var layer=layui.layer
    $("#form_reg").on("submit", function (event) {
        //阻止默认行为
        event.preventDefault()
        //获取值
        let uname = $(".reg-box [name=regusername]").val()
        let upassword = $(".reg-box [name=reguserpassword]").val()
        let datas = {
            username: uname,
            password:upassword,
        }
        $.ajax({
            method: "POST",
            url: "/api/reguser",
            data: datas,
            success: function (res) {
                //注册失败
                if (res.status != 0) { 
                   return layer.msg("注册失败！！！")
                }
                //注册成功    
                layer.msg("注册成功")
                $("#link_login").click()
                
            }
        })

    })

    //发送请求登录用户
    $("#form_login button").on("click",function (evnet) {
        evnet.preventDefault()
        let uname = $(".login-box [name=loginusername]").val()
        let upassword = $(".login-box [name=loginuserpassword]").val()
        let postdata = {
            username: uname,
            password:upassword,
        }
        $.ajax({
            method: "POST",
            url: "/api/login",
            data: postdata,
            success: function (res) {
                console.log(res);
                if (res.status != 0) return layer.msg("登录失败！！！")
                
                layer.msg("登录成功！！！")
                localStorage.setItem("token", JSON.stringify(res.token))
                console.log("sad");
                location.href="/index.html"
            }
        })
    })
})