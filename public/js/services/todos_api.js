angular.module('todoService', [])
    .factory('Authenticate', function($http) {
        return {
            login: function(loginData) {
                return $http.post('/login', loginData);
            },
            loggedin: function() {
                return $http.get('/loggedin');
            },
            signup: function(signupData) {
                return $http.post('/signup', signupData);
            },
            changePassword: function(password) {
                return $http.post('/changepass', password);
            }
        }
    })
    .factory('Todos', function($http) {
        return {
            get: function () {
                return $http.get('/todos');
            },
            create: function (todoData) {
                return $http.post('/todos', todoData);
            },
            delete: function (id, data) {
                return $http.post('/todos/' + id, data);
            },
            edit: function(id, data) {
                return $http.post('/todos/' + id + '/edit', data);
            },
            updateDate: function(id, data) {
                return $http.post('/todos/'+id+'/updateDate', data);
            }
        }
    })
    .factory('Task', function($http) {
        return {
            create: function (id, taskData) {
                return $http.post('/todos/'+id+'/addTask', taskData);
            },
            delete: function (id, data) {
                return $http.post('/todos/'+id+'/deleteTask', data);
            },
            
            updateStatus: function(id, data) {
                return $http.post('/todos/'+id+'/updateStatus', data);
            },
            edit: function(id, data) {
                return $http.post('/todos/'+id+'/editTask', data);
            },
            editPosition: function(id, data) {
                return $http.post('/todos/'+id+'/editPositionTask', data);
            }
        }
    });