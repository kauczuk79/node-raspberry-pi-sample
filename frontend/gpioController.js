(function () {
    'use strict';

    angular.module('app').controller('gpio', ['$scope', '$http', function ($scope, $http) {
        console.log('gpio controller');
        $scope.gpioPins = [];

        function callback() {
            console.log('Success');
        }

        function fallback() {
            console.log('Error!!!');
        }

        $http.get('/api/pins').then(function (response) {
            $scope.gpioPins = response.data.pins;
        });
        $scope.enableOutput = function (gpioPin) {
            console.log('enabling GPIO' + gpioPin);
            $http.get('/api/enable/' + gpioPin).then(callback, fallback);
        };
        $scope.disableOutput = function (gpioPin) {
            console.log('disabling GPIO' + gpioPin);
            $http.get('/api/disable/' + gpioPin).then(callback, fallback);
        };
    }]);
})();
