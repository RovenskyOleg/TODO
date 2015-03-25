angular.module('todoController', ['directives'])

    .controller('mainController', function($scope, $http, Todos, Task) {
        $scope.newTodo = {};
        $scope.editing = [];
        $scope.todos = Todos;
        //$scope.newTask = {};
        $scope.tasks = [];

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
                        console.log(data)
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

        $scope.edit = function(index) {
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
        Task.get()
            .success(function(data) {
                $scope.tasks = data;
               // console.log(data)
               // console.log($scope.tasks);
            });

        $scope.createTask = function(id, index) {
    // Validate
            Task.create(id, $scope.todos[index])
                .success(function(data) {
                    $scope.todos[index].task = {};
                    
                    $scope.tasks = data; // ??????????????
                    console.log($scope.tasks)
                    //$scope.addToList(index, $scope.tasks);
                }); 
        };

        $scope.addToList = function(index, data) {
            //console.log(data);
        }
    });