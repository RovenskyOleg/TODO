'use strict';

angular.module('directives',[])
    .directive('todoList', function() {
        return {
            restrict: 'A',
            templateUrl: 'partials/todo-list.html'
        }        
    })

    .directive('createTodo', function() {
        return {
            restrict: 'A',
            templateUrl: 'partials/create-todo.html'
        }
    })

    .directive('createTask', function() {
        return {
            restrict: 'A',
            templateUrl: 'partials/create-task.html'
        }
    })

    .directive('taskList', function() {
        return {
            restrict: 'A',
            templateUrl: 'partials/task-list.html'
        }
    })

    // .directive('escapeTodo', function() {
    //     return function (scope, el, attrs) {
    //         $(el).focusout(function(){
    //             console.log(attrs.dataIndex);
    //             $(this).scope.cancel(attrs.dataIndex);
    //         });        
    //     };
    // })