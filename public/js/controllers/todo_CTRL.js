angular.module('todoController', ['directives'])

    .controller('mainController', function($scope, $http, Todos, Task) {
        $scope.newTodo = {};
        $scope.editing = [];
        $scope.editingTask = [];
        $scope.editingTask = [];
        $scope.todos = Todos;

        Todos.get()
            .success(function(data) {
                $scope.todos = data;
            });

        $scope.createTodo = function() {
            if ($scope.newTodo.text != undefined) {
                Todos.create($scope.newTodo)
                    .success(function(data) {
                        $scope.newTodo = {}; // clear the form so our user is ready to enter another
                        $scope.todos = data;
                    });
            }
        };

        $scope.deleteTodo = function(id) {
            Todos.delete(id)
                .success(function(data) {
                    $scope.todos = data;
                });
        };

        $scope.updateStatus = function (id, data) {          
            Todos.edit(id, data)  
            console.log(id, data);         
        };

        $scope.editTitle = function(index) {
            $scope.editing[index] = angular.copy($scope.todos[index]);
        };

        $scope.updateTodo = function(index) {
            var todo = $scope.todos[index],
                id = todo._id;    
                   
            if (($scope.todos[index].title) !== ($scope.editing[index].title)) {
                Todos.edit(id, todo);
            } else {
                $scope.cancel(index);
            }            

            $scope.editing[index] = false;
        };

        $scope.cancel = function(index) {
            $scope.todos[index] = angular.copy($scope.editing[index]);
            $scope.editing[index] = false;
        };

// Task
        $scope.createTask = function(id, index) {
    // Validate
            Task.create(id, $scope.todos[index])
                .success(function(data) {
                    $scope.todos[index].task = {};
                    
                    $scope.todos[index].tasks = data.tasks
                }); 
        };

        $scope.editTask = function(id, index) {
            var position = {
                'index': index
            };

            $scope.editingTask[index] = angular.copy($scope.todos[index]);
            console.log($scope.editingTask[index])
        };

        $scope.updateStatusTask = function (id, data) {          
            Task.updateStatus(id, data)       
        };

        $scope.deleteTask = function(id, index) {   
            var position = {
                'index': index
            };
            
            Task.deleteTask(id, position)
                .success(function(data) {
                    var arr = _.map($scope.todos, function(obj) { 
                        if (obj._id === data._id) {
                            obj.tasks = data.tasks;
                        }

                        return obj;
                    });                       
                    
                    $scope.todos = arr;
                });
        }
    });