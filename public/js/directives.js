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

    .directive('jqdatepicker', function () {
        return {
            restrict: "A",
            require: "ngModel",
            link: function (scope, elem, attrs, ngModelCtrl) {
                var updateModel = function (dateText) {
                    // call $apply to bring stuff to angular model
                    scope.$apply(function () {
                        ngModelCtrl.$setViewValue(dateText);
                    });
                };

                var options = {
                    dateFormat: "dd/mm/yy",
                    // handle jquery date change
                    onSelect: function (dateText) {
                        updateModel(dateText);
                    }
                };

                // jqueryfy the element
                elem.datepicker(options);
            }
        }
    })