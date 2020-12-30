//拦截器 url拼接
$.ajaxPrefilter(function (options) {
    options.url="http://ajax.frontend.itheima.net"+options.url
})