//拦截器 url拼接
$.ajaxPrefilter(function (options) {
    options.url = "http://ajax.frontend.itheima.net" + options.url
    var token = JSON.parse(localStorage.getItem('token'))
    if (options.url.indexOf("/my/") != -1) {
        options.headers = {
            Authorization: token
        }
    }
})