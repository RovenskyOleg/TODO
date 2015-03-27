angular.module('todoService', [])
    .factory('Todos', function($http) {
        return {
            get: function () {
                return $http.get('/todos');
            },
            create: function (todoData) {
                return $http.post('/todos', todoData);
            },
            delete: function (id) {
                return $http.delete('/todos/' + id);
            },
            edit: function(id, data) {
                return $http.post('/todos/' + id, data);
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