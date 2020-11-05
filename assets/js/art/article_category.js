$(function () {

    var layer = layui.layer
    var form = layui.form

    function initList() {
        $.ajax({
            method: "GET",
            url: '/my/article/cates',
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败')
                }
                var htmlStr = template('template', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    initList()

    // 为添加类别按钮绑定点击事件
    var indexadd = null
    $('#btnAddCate').on('click', function () {
        indexadd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })

    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                initList()
                layer.close(indexadd)
            }
        })
    })


    // 编辑按钮
    var indexedit = null
    $('body').on('click', '.btn-edit', function () {
        indexedit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })
        var id = $(this).attr('data-id')
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                console.log(res);
                form.val('form-edit', res.data)
            }
        })

        $('body').on('submit', '#form-edit', function (e) {
            e.preventDefault()
            $.ajax({
                method: "POST",
                url: '/my/article/updatecate',
                data: $(this).serialize(),
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                }
            })
            layer.close(indexedit)
            initList()
        })
    })

    // 删除类别
    var indexdelete = null;
    $('body').on('click', '.btn-delete', function () {
        var id = $(this).siblings().attr('data-id')
        layer.confirm('确定删除吗？', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                method:'GET',
                url:'/my/article/deletecate/'+id,
                success:function(res){
                    console.log(res);
                    if(res.status!==0){
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    initList()
                }
            })
            layer.close(indexdelete);
        });
    })
})