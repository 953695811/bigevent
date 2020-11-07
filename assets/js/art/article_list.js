$(function () {
    //定义默认的发送ajax对象
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }

    template.defaults.imports.dataTime = function (data) {
        var date = new Date(data);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var hh = date.getHours()
        hh = hh < 10 ? ('0' + hh) : hh;
        var mm = date.getMinutes()
        mm = mm < 10 ? ('0' + mm) : mm;
        var ss = date.getSeconds()
        ss = ss < 10 ? ('0' + ss) : ss;
        return y + '/' + m + '/' + d + '--' + hh + ':' + mm + ':' + ss;
    }
    getList()
    // 渲染列表界面
    function getList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                console.log(res);
                var htmlStr = template('template', res)
                $('tbody').html(htmlStr)
                page(res.total)
            }
        })
    }
    // 更新分类列表
    function classall() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                var htmlStr1 = template('classify', res)
                $('#classall').html(htmlStr1)
                layui.form.render(null, 'test11');
            }
        })
    }

    classall()

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        q.cate_id = $('[name=cate-id]').val()
        q.state = $('[name=state]').val()
        getList()
    })

    // 分页
    function page(total) {
        layui.use('laypage', function () {
            var laypage = layui.laypage;

            //执行一个laypage实例
            laypage.render({
                elem: 'pageBox' //注意，这里的 test1 是 ID，不用加 # 号
                    ,
                count: total //数据总数，从服务端得到
                    ,
                limit: q.pagesize,
                curr: q.pagenum,
                layout: ['count', 'limit', 'prev', 'page', 'next'],
                limits: [2, 4, 6, 8],
                jump: function (obj, first) {
                    q.pagenum = obj.curr
                    q.pagesize = obj.limit
                    if (!first) {
                        getList()
                    }
                },
            });
        });
    }

    // 编辑文章
    $('body').on('click', '.btn-edit', function () {
        var id = $(this).attr('data-id')
        $.ajax({
            method: "GET",
            url: '/my/article/' + id,
            success: function (res) {
                console.log(res.data);
                var jsonStr = JSON.stringify(res.data)
                localStorage.setItem('token1', jsonStr)
                location.href = '/home/article/update.html'
            }
        })

    })

    // 删除文章
    $('body').on('click', '.btn-delete', function () {
        var leng = $('.btn-delete').length
        console.log(leng);
        var id = $(this).siblings().attr('data-id')
        var index = layer.confirm('确定删除吗？', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    console.log(res);
                    if (res.status !== 0) {
                        return layui.layer.mes(res.message)
                    }
                    layui.layer.msg(res.message)
                    // if (leng <= 1) {
                    //     if(q.pagenum===1){
                    //         break
                    //     }else {
                    //         q.pagenum--
                    //     }
                    // }
                    getList()
                }
            })
            layer.close(index);
        });

    })

})