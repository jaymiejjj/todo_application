;(function () {
    'use strict';

    var $form_add_task = $('.add-task')
     , new_task = {}
     , task_list = []
     ;

     init();

    $form_add_task.on('submit', function (e) {
        // 禁用默认行为
        e.preventDefault();
        // 获取新task的值
        new_task.content = $(this).find('input[name=content]').val();
        // 若果新Task的值为空，则直接返回，否则继续执行
        if (!new_task.content) return;
        // 存入新Task

        // console.log('new_task', new_task)
    })


    function add_task(new_task) {
        task_list.push(new_task);
        store.set('task_list', task_list);
    }

    function init() {
        task_list = store.get('task_list');

    }
})();

