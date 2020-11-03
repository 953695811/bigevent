$(function(){
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })
    var form = layui.form
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        repwd: function(value){ //value：表单的值、item：表单的DOM对象
            if($('.reg-box [name=repassword]').val()!==value){
              return '两次密码不一致';
              console.log(1);
            }
          }
    })
    
    var layer = layui.layer;
    $('#form_login').on('submit',function(e){
        e.preventDefault()
        var msg = $(this).serialize()
        $.post('/api/login',msg,function(res){
            layer.msg(res.message);
            console.log(res);
            localStorage.setItem('token',res.token)
            location.href = 'index.html'
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