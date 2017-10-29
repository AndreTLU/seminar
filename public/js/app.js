angular.module('seminaritoo', ['ui.router', 'ngResource'])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider){
            $urlRouterProvider.otherwise('/');
            registerServiceWorker();
            $stateProvider
                .state('home', {
                    url:'/',
                    templateUrl: 'js/home/home.html',
                    controller: 'HomeCtrl'
                });
            $locationProvider.html5Mode(true);
        }    
]);

registerServiceWorker = function () {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('sw.js').then(function (registration) {
                // Registration was successful
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, function (err) {
                // registration failed :(
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }
    
}