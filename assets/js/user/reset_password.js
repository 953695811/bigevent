$(function () {
    var form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6-12位，且不能出现空格'],
        samePwd:function(value){
            if(value===$('[name=oldPwd]').val()){
                return '新旧密码不能相同'
            }
        },
        difPwd:function(value){
            if(value!==$('[name=newPwd]').val()){
                return '两次新密码输入不一致'
            }
        }
    })

    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        console.log(1);
        $.ajax({
            method:"POST",
            url:'/my/updatepwd',
            data:{
                oldPwd:$('[name=oldPwd]').val(),
                newPwd:$('[name=newPwd]').val()
            },
            success:function(res){
                console.log(res);
                if(res.status!==0){
                    return layui.layer.msg(res.message)
                }
                return layui.layer.msg('密码修改成功！')
            }
        })
    })
})