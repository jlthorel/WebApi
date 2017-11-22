angular.module('myApp')
    .controller('loginCtrl', function ($scope, $http, $location, $httpParamSerializerJQLike, AuthService) {
        $scope.SendLoginRequest = function () {


      // initial values
      $scope.error = false;
      $scope.disabled = true;

       // call login from service
       AuthService.login($scope.email, $scope.password)
       // handle success
       .then(function () {
         $location.path('/home');
         $scope.disabled = false;
         $scope.loginForm = {};
         localStorage.setItem('token', response.data.token);
       })
       // handle error
       .catch(function () {
         $scope.error = true;
         $scope.errorMessage = "Invalid username and/or password";
         $scope.disabled = false;
         $scope.loginForm = {};
       });
        };
    });