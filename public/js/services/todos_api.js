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
            create: function (id, taskData) {
                return $http.post('/api/todos/'+id+'/addTask', taskData);
            },
            delete: function (id, data) {
                return $http.post('/api/todos/'+id+'/deleteTask', data);
            },
            
            updateStatus: function(id, data) {
                return $http.post('/api/todos/'+id+'/updateStatus', data);
            },
            edit: function(id, data) {
                return $http.post('/api/todos/'+id+'/editTask', data);
            },
            editPosition: function(id, data) {
                return $http.post('/api/todos/'+id+'/editPositionTask', data);
            }
        }
    });