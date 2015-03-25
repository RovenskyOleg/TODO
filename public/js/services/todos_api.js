angular.module('todoService', [])
    .factory('Todos', function($http) {
        return {
            get: function () {
                return $http.get('/api/todos');
            },
            create: function (todoData) {
                return $http.post('/api/todos', todoData);
            },
            delete: function (id) {
                return $http.delete('/api/todos/' + id);
            },
            edit: function(id, data) {
                return $http.post('/api/todos/' + id, data);
            }
        }
    })
    .factory('Task', function($http) {
        return {
            get: function () {
                return $http.get('/api/todos/tasks');
            },
            getTask: function (id) {
                return $http.get('/api/todos/todos/'+id+'/tasks');
            },
            create: function (id, taskData) {
                return $http.post('/api/todos/'+id+'/addTask', taskData);
            },
            delete: function (id) {
                //return $http.delete('/api/todos/' + id);
            },
            edit: function(id, data) {
               // return $http.post('/api/todos/' + id, data);
            }
        }
    });