angular.module('todoController', ['directives'])
    .controller('mainController', function($scope, $http, Todos, Task) {
        $scope.newTodo = {};
        $scope.user = {};
        $scope.editing = [];
        $scope.editingTask = [];
        $scope.todos = {};

        // $scope.hideSuccesAlert = function() {
        //     $rootScope.messageSuccess = false;
        // };

        // $scope.hideErrorAlert = function() {
        //     $rootScope.messageError = false;
        // };

        
    })

    .controller('TodoCTRL', function($scope, $http, Todos, Task) {
        Todos.get()
            .success(function(data) {
                $scope.todos = data.todo;
                $scope.user = data;
            });

        $scope.createTodo = function() {
            if ($scope.newTodo.text != undefined) {
                Todos.create({
                        'user_id': $scope.user._id,
                        'todo': {'title': $scope.newTodo.text}
                    })
                    .success(function(data) {
                        $scope.newTodo = {}; // clear the form so our user is ready to enter another
                        $scope.todos = data.todo;
                         console.log(data)
                    });
            }
        };

        $scope.deleteTodo = function(id, index) {
            var data = {
                'user_id': $scope.user._id,
                'index': index
            };
            
            Todos.delete(id, data)
                .success(function(data) {
                    $scope.todos = data.todo;
                });
        };

        $scope.editTitle = function(index) {
            $scope.editing[index] = angular.copy($scope.todos[index]);
        };

        $scope.updateTodo = function(index) {
            var data = {
                    'user_id': $scope.user._id,
                    'todo': $scope.todos[index],
                    'index': index
                },
                id = data.todo._id;    
                   
            if (($scope.todos[index].title) !== ($scope.editing[index].title)) {
                Todos.edit(id, data);
            }          

            $scope.editing[index] = false;
        };

        $scope.updateDate = function(todo_id, index) {
            var date = {
                'user_id': $scope.user._id,
                'todo': $scope.todos[index],
                'index': index
            }

            Todos.updateDate(todo_id, date) 
        };

// Task
        $scope.createTask = function(id, index) {
            var date = {
                'user_id': $scope.user._id,
                'todo': $scope.todos[index],
                'index': index
            }

            if ($scope.todos[index].task != undefined) {
                Task.create(id, date)
                    .success(function(data) {
                        $scope.todos[index].task = {};
                        $scope.todos[index].tasks = data
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

        $scope.updateStatus = function(id, data) {
            var data = {
                    'user_id': $scope.user._id,
                    'done': data.done,
                    'index': data.index
                };   

            Task.updateStatus(id, data)       
        };

        $scope.findTodo = function(todo_id) {
            var todo = _.where($scope.todos, {'_id': todo_id});

            return todo;
        };

        $scope.updateTask = function(todo_id, task_id, index) {
            var todo = _.where($scope.todos, {'_id': todo_id}),
                date = {};                   

                if (($scope.editingTask[task_id].name) !== todo[0].tasks[index].name) {
                    date = {
                        'user_id': $scope.user._id,
                        'index': index,
                        'name': todo[0].tasks[index].name
                    }

                    Task.edit(todo_id, date);
                }     

            $scope.editingTask[task_id] = false;
        };

        $scope.updatePosition = function(todo_id, index, position) {
            var todo = $scope.findTodo(todo_id),                
                tasks = todo[0].tasks,
                el = todo[0].tasks[index],
                data = {};
            
            tasks.splice(index, 1);
            tasks.splice(position, 0, el);

            data = {
                'user_id': $scope.user._id,
                'tasks': tasks
            }

            Task.editPosition(todo_id, data);       
        };

        $scope.up = function(todo_id, index) {
            var position;

            if (index >= 1) {
                position = index - 1;
                $scope.updatePosition(todo_id, index, position);
            } else {
                console.log('Not correct');
            }
        };

        $scope.down = function(todo_id, index) {
            var position,
                todo = $scope.findTodo(todo_id),
                lengthArr = todo[0].tasks.length;

            if (index < (lengthArr - 1)) {
                position = index + 1;
                $scope.updatePosition(todo_id, index, position);
            } else {
                console.log('Not correct');
            }
        };

        $scope.deleteTask = function(id, index) {   
            var data = {
                'user_id': $scope.user._id,
                'index': index
            };
            
            Task.delete(id, data)
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
    })

    .controller('SignupCtrl', function($scope, $rootScope, $http, $location, Authenticate) {
        $scope.user = {};
        $rootScope.message = '';

        $scope.signup = function() {
            Authenticate.signup({
                email: $scope.user.email,
                password: $scope.user.password
            })
            .success(function(user) {
                $location.url('/todos');
            })
            .error(function() {
                // $rootScope.messageError = true;
                // $rootScope.message = 'Registration failed.';
                $location.url('/signup');
            });
        };
    })

    .controller('LoginCtrl', function($scope, $rootScope, $http, $location, Authenticate) {
        $scope.user = {};

        $scope.login = function() {
            Authenticate.login({
                email: $scope.user.email,
                password: $scope.user.password
            })
            .success(function(user) {
                $location.url('/todos');
            })
            .error(function() {
                // $rootScope.messageError = true;
                // $rootScope.message = 'Authentication failed.';      
                $location.url('/login');
            });
        };
    })