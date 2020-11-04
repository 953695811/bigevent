$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '字符长度必须在1-6个字符之间'
            }
        }
    })
    
    function formData(){
        $.ajax({
            method:"GET",
            url:"/my/userinfo",
            success:function(res){
                if(res.status!==0){
                    return layer.msg('获取用户信息失败')
                }
                console.log(res.data);
                form.val('formData',res.data)
            }
        })
    }
    formData()

    $('#reset').on('click',function(e){
        e.preventDefault()
        formData()
    })

    function formSubmit(){
        $('#form').on('submit',function(e){
            e.preventDefault()
            $.ajax({
                method:"POST",
                url:"/my/userinfo",
                data:$(this).serialize(),
                success:function(res){
                    console.log(res);
                    window.parent.getUserMsg()
                }
            })
        })
    }
    formSubmit()
})