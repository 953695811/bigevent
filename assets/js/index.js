$(function () {
    $('#exit').on('click', function () {
        layer.confirm('确定退出吗？', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        });
    })
    getUserMsg()
    
})

function getUserMsg() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status === 1) {
                return
            } else {
                userImg(res)
            }
        }
    })
}

function userImg(res) {
    $('#welcome').html(res.data.username)
    if (res.data.user_pic !== null) {
        $('.layui-nav-img').attr('src', res.data.user_pic)
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        $('.text-avatar').html(res.data.username.charAt(0).toUpperCase())
    }
}