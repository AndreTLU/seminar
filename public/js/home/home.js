angular.module('seminaritoo')
.controller('HomeCtrl', ['$http', '$scope', '$rootScope',
    function ($http, $scope, $rootScope) {
        //$scope.city =1;
        $rootScope.city = 1;
        if ('caches' in window) {
            caches.open('data-v1').then(function (cache) {
                cache.keys().then(function (cacheRequests) {
                    if (cacheRequests.length > 0) {
                        caches.match(cacheRequests[0].url).then(function (response) {
                            if (response) {
                                console.log(response);
                                response.json().then(function (json) {
                                    console.log('Uuendan vahemälust');
                                    $scope.json = json;
                                    $scope.$apply();

                                })
                            }
                        });
                    } else {
                        $scope.getData($rootScope.city);
                    }
                });
            });
        }
        $scope.getData = function (city) {
           if (!navigator.onLine) return;
            $http.get('/api/ilm/ee/' + city).then(function (data) {
                console.log(data);
                console.log('Uuendan netist');
                $scope.json = data.data;
            }).catch(function (err) {
                console.log(err)
            });
        }
    }
]);