$(function(){
    var form = layui.form
    $('#form').on('submit',function(){
        form.verify({
            nickname: function(value){
                if(value.lenth>6){
                    return layer.msg('输入字符必须在1-6个')
                }
            }
        })

        console.log(1);
    })
})