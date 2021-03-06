$(function () {
    // 初始化富文本编辑器
    initEditor()

    function classall() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                var htmlStr1 = template('classify', res)
                console.log(htmlStr1);
                $('[name=cate_id]').html(htmlStr1)
                layui.form.render();
            }
        })
    }
    classall()

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)


    $('.layui-btn-danger').on('click', function (e) {
        $('#file').click()
    })

    $('#file').on('change', function (e) {
        console.log(e.target.files[0]);
        // 拿到用户选择的文件
        var file = e.target.files[0]
        if (file.length === 0) {
            return
        }
        // 根据选择的文件，创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(file)
        // 先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    var art_state = '已发布'

    $('#save2').on('click', function () {
        art_state = '草稿'
    })

    // 监听表单的提交事件
    $('#test11').on('submit', function (e) {
        e.preventDefault()
        var fd = new FormData($(this)[0])
        fd.append('state', art_state)

        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                fd.forEach(function (v, k) {
                    console.log(k, v);
                })
                $.ajax({
                    method: 'POST',
                    url: '/my/article/add',
                    data: fd,
                    contentType: false,
                    processData: false,
                    success: function (res) {
                        if(res.status!==0){
                            return layui.layer.msg(res.message)
                        }
                        layui.layer.msg(res.message)
                        location.href = '/article/article_list.html'
                    }
                })
            })
        

        
    })

})