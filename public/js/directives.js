'use strict';

angular.module('directives',[])
    .directive('todoList', function() {
        return {
            restrict: 'E',
            templateUrl: 'partials/todo-list.html'
        }        
    })

    .directive('createTodo', function() {
        return {
            restrict: 'E',
            templateUrl: 'partials/create-todo.html'
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