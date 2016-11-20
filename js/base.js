;(function () {
    'use strict';

    var $form_add_task = $('.add-task')
      , task_list = []
      , $task_delete
      , $task_detail
      , $task_detail_bord = $('.task-detail')
      , $task_detail_mask = $('.task-detail-mask')
      ;

     init();

    $form_add_task.on('submit', function (e) {
        var new_task = {}, $input;
        // 禁用默认行为
        e.preventDefault();
        // 获取新task的值
        $input = $(this).find('input[name=content]');
        new_task.content = $input.val();

        // 若果新Task的值为空，则直接返回，否则继续执行
        if (!new_task.content) return;
        // 存入新Task
        if(add_task(new_task)) {
            $input.val(null);
        }
    });

    function listen_task_delete() {
        $task_delete.on('click', function () {
            var $this = $(this);
            var $item = $this.parent().parent();
            var index = $item.data('index');
            var tmp = confirm('确定删除？');
            tmp? delete_task(index) : null;
        })
    }


    function listen_task_detail() {
        $task_detail.on('click', function () {
            var $this = $(this);
            var $item = $this.parent().parent();
            var index = $item.data('index');
            show_task_detail(index)

        })
    }

    function show_task_detail(index) {
        $task_detail_bord.show();
        $task_detail_mask.show();
    }

    function hide_task_detail() {
        $task_detail_bord.hide();
        $task_detail_mask.hide();
    }




    function add_task(new_task) {
        // 将新的Task推入task_list
        task_list.push(new_task);
        refresh_task_list();
        // 更新localStorage
        return true;

    }

    function refresh_task_list() {
        store.set('task_list', task_list);
        render_task_list();
    }

    function delete_task(index) {
        if(index === undefined || !task_list[index]) return;
        delete task_list[index];
        refresh_task_list();
    }

    function init() {
        task_list = store.get('task_list') || [];
        if(task_list.length)
            render_task_list();
    }

    function render_task_list() {
        var $task_list = $('.tasks-list');
        $task_list.html('');
        for(var i = 0; i < task_list.length; i++) {
            var $task = render_task_item(task_list[i], i);
            $task_list.append($task)
        }

        $task_delete = $('.action.delete');
        $task_detail = $('.action.detail');
        listen_task_delete();
        listen_task_detail();
    }

    function render_task_item(data, index) {
        if (!data || !index) return;
        var list_item_tpl =
            '<div class="task-item" data-index="'+index+'">'+
            '<span><input type="checkbox"></span>'+
            '<span class="task-content">'+ data.content +'</span>'+
            '<span class="fr">'+
            '<span class="action delete"> 删除</span>'+
            '<span class="action detail"> 详细</span>'+
            '</span>'+
            '</div>';
        return $(list_item_tpl)

    }
})();

