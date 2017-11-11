angular.module('myApp')
    .controller('loginCtrl', function ($scope, $http, $httpParamSerializerJQLike) {
        $scope.SendLoginRequest = function () {

            var dataObj = {
                username: $scope.email,
                password: $scope.password
            };

            $http({
                method: 'POST',
                url: 'http://localhost:8586/api/v1/auth/login',
                data: $httpParamSerializerJQLike(dataObj),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

            })
                .then(function (response) {
                    $scope.myWelcome = response.data;
                    localStorage.setItem('token', response.data.token);

                    console.log(response);
                }, function (response) {
                    //Second function handles error
                    $scope.errorMessage = response.data;
                    console.log(response);
                });
        };
    });