$(function(){
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })
    var layer = layui.layer;
    $('#form_login').on('submit',function(e){
        e.preventDefault()
        var msg = $(this).serialize()
        $.post('/api/login',msg,function(res){
            layer.msg(res.message);
            location.href = '../../index.html'
        })
        
    })
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        if($('#pwd').val()!==$('#repwd').val()) return layer.msg('两次密码输入不一致，请重新输入');
        var msg = $(this).serialize()
        $.post('/api/reguser',msg,function(res){
            layer.msg(res.message);
        })
        
    })
})