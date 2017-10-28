angular.module('seminaritoo')
.controller('HomeCtrl', ['$http', '$scope', '$rootScope',
    function($http, $scope, $rootScope){
        $scope.getData = function () {
            if ('caches' in window) {
                caches.match("/api/ilm/ee").then(function (response) {
                    if (response) {
                        response.json().then(function (json) {
                            console.log('Uuendan vahemälust');
                            $rootScope.requesPending = false;
                            $scope.json = json;
                            $scope.$apply();
                        })
                    }
                })
            }
            $http.get('/api/ilm/ee').then(function (data) {
                console.log(data);
                console.log('Uuendan veebist');
                $scope.json = data.data;
            });
        };
        $scope.getData();
    }
]);