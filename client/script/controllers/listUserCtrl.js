angular.module('myApp')
.controller('listUserCtrl', function ($scope, $http) {
    $scope.orderByField = 'firstName';
    $scope.reverseSort = false;
    $http({
        method: 'GET',
        url: 'http://localhost:8580/api/v1/auth/user',
        
    })
        .then(function (response) {
            $scope.users = response.data;
        }, function (response) {
            //Second function handles error
            $scope.errorMessage = response.data;
            console.log(response);
        });
    
});