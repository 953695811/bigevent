$.ajaxPrefilter(function (option) {
    option.url = 'http://ajax.frontend.itheima.net' + option.url
    if (option.url.indexOf('/my/') !== -1) {
        option.headers = {
            Authorization: localStorage.getItem('token') || ''
        },
        option.complete= function (res) {
            if (res.responseJSON.status !== 0 && res.responseJSON.message === '身份认证失败！') {
                localStorage.removeItem('token')
                location.href = '/login.html'
            }
        }
    }


})