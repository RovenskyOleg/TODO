angular.module('todoController', ['directives'])

    .controller('mainController', function($scope, $http, Todos, Task) {
        $scope.newTodo = {};
        $scope.editing = [];
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

        $scope.editTitle = function(index) {
            $scope.editing[index] = angular.copy($scope.todos[index]);
        };

        $scope.updateTodo = function(index) {
            var todo = $scope.todos[index],
                id = todo._id;    
                   
            if (($scope.todos[index].title) !== ($scope.editing[index].title)) {
                Todos.edit(id, todo);
            }          

            $scope.editing[index] = false;
        };

// Task
        $scope.createTask = function(id, index) {
            if ($scope.todos[index].task != undefined) {
                Task.create(id, $scope.todos[index])
                    .success(function(data) {
                        $scope.todos[index].task = {};
                        
                        $scope.todos[index].tasks = data.tasks
                    }); 
            }
        };

        $scope.editTask = function(todo_id, task_id, index) {
            $scope.visible = true;
            var position = {
                    'index': index
                },
                findTask = _.where($scope.todos, {'_id': todo_id});

            $scope.editingTask[task_id] = angular.copy(findTask[0].tasks[index]);
        };

        $scope.updateStatus = function (id, data) {          
            Task.updateStatus(id, data)       
        };

        $scope.updateTask = function(todo_id, task_id, index) {
            var todo = _.where($scope.todos, {'_id': todo_id}),
                nameTask = '';   

                if (($scope.editingTask[task_id].name) !== todo[0].tasks[index].name) {
                    nameTask = todo[0].tasks[index].name;

                    Task.editTask(todo_id, {'index': index, 'nameTask': nameTask});
                }      

            $scope.editingTask[task_id] = false;
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