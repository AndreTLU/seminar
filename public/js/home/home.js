angular.module('seminaritoo')
.controller('HomeCtrl', ['$http', '$scope', '$rootScope',
    function($http, $scope, $rootScope){
        //$scope.city =1;
        $scope.getData = function (city=1) {
            if ('caches' in window) {
                caches.match("/api/ilm/ee/"+city).then(function (response) {
                    if (response) {
                        console.log(response);
                        response.json().then(function (json) {
                            console.log('Uuendan vahemälust');
                            $scope.json = json;
                            $scope.$apply();
                        })
                    }
                })
            }
            $http.get('/api/ilm/ee/'+city).then(function (data) {
                console.log(data);
                console.log('Uuendan veebist');
                $scope.json = data.data;
            });
        };
        $scope.getData();
    }
]);