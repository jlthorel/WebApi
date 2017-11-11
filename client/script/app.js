var myApp = angular.module('myApp', ['ui.router']);

myApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            views: {
                // the main template will be placed here (relatively named)
                '': { templateUrl: 'client/public/view/home.html' },
                'main-navbar@home': {
                    templateUrl: 'client/public/view/main-navbar.html'
                }
            }
        })
        // Documentation STATES AND NESTED VIEWS ========================================
        .state('documentation', {
            url: '/documentation',
            views: {
                // the main template will be placed here (relatively named)
                '': { templateUrl: 'client/public/view/documentation.html' },
                'main-navbar@documentation': {
                    templateUrl: 'client/public/view/main-navbar.html'
                }
            }
        })


        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            views: {
                // the main template will be placed here (relatively named)
                '': { templateUrl: 'client/public/view/about.html' },
                'main-navbar@about': {
                    templateUrl: 'client/public/view/main-navbar.html'
                },
                // the child views will be defined here (absolutely named)
                'columnOne@about': { template: 'Look I am a column!' },
                // for column two, we'll define a separate controller 
                'columnTwo@about': {
                    templateUrl: 'client/public/view/table-data.html',
                    controller: 'scotchController'
                }
            }
        })

        // REGISTER PAGE  =================================
        .state('register', {
            url: '/register',
            views: {
                // the main template will be placed here (relatively named)
                '': {
                    templateUrl: 'client/public/view/register.html',
                    controller: 'registerCtrl'
                },
                'main-navbar@register': {
                    templateUrl: 'client/public/view/main-navbar.html'
                },
            }
        })

        // lOGIN PAGE  =================================
        .state('login', {
            url: '/login',
            views: {
                // the main template will be placed here (relatively named)
                '': {
                    templateUrl: 'client/public/view/login.html',
                    controller: 'loginCtrl'
                },
                'main-navbar@login': {
                    templateUrl: 'client/public/view/main-navbar.html'
                },
            }
        });



});



myApp.controller('scotchController', function ($scope) {

    $scope.message = 'test';

    $scope.scotches = [
        {
            name: 'Macallan 12',
            price: 50
        },
        {
            name: 'Chivas Regal Royal Salute',
            price: 10000
        },
        {
            name: 'Glenfiddich 1937',
            price: 20000
        }
    ];

});