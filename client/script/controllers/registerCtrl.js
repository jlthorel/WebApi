

angular.module('myApp')
    .controller('registerCtrl', function ($scope, $http, $httpParamSerializerJQLike) {
        $scope.SendRegisterRequest = function () {

            var dataObj = {
				username: $scope.email,
                email: $scope.email,
                password: $scope.password,
                confpassword: $scope.confpassword,
                firstname: $scope.firstname,
                lastname: $scope.lastname
		};	
            $scope.message = "test";

            $http({
                method: 'POST',
                url: 'http://localhost:8580/api/v1/auth/user',
                data: $httpParamSerializerJQLike(dataObj),

                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

            })
                .then(function (response) {
                    $scope.myWelcome = response.data;
                }, function (response) {
                    //Second function handles error
                    $scope.errorMessage = response.data;
                    console.log(response);
                });
        };

    });