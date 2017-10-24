angular.module('seminaritoo', ['ui.router', 'ngResource'])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider){
            $urlRouterProvider.otherwise('/');

            $locationProvider.html5Mode(true);
        }    
])