angular.module('todo', ['ngResource', 'ngRoute', 'todoController', 'todoService'])
    .config(function($routeProvider, $locationProvider, $httpProvider) {
        var checkLoggedin = function($q, $timeout, $http, $location, $rootScope, Authenticate){
            var deferred = $q.defer();

            Authenticate.loggedin()
                .success(function(user){
                    if (user !== '0') {
                        deferred.resolve();
                    } else {
                        // $rootScope.messageError = true;
                        // $rootScope.message = 'You need to log in.';
                        deferred.reject();
                        $location.url('/login');
                    }
                });

            return deferred.promise;
        };

        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html'
            })
            .when('/signup', {
                templateUrl: 'views/signup.html',
                controller: 'SignupCtrl'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .when('/todos', {
                templateUrl: 'views/todo.html',
                controller: 'TodoCTRL',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .otherwise({
                redirectTo: '/' 
            });
    })
    .run(function($rootScope, $http){
        // $rootScope.message = '';

        $rootScope.logout = function(){
            // $rootScope.message = 'Logged out.';
            $http.post('/logout');
        };
    })