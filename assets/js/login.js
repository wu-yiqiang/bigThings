$(function () {
    $("#link_login").on("click", function () {
        //隐藏注册按键，显示登录按键
        console.log("sda");
        $(".reg-box").hide()
        $(".login-box").show()
    })
    //显示登录按键，隐藏注册按键
    $("#link_reg").on("click", function () {

        $(".login-box").hide()      
        $(".reg-box").show()
    })
})