var myApp = angular.module('myApp', ['ui.router', 'ui-notification']);

myApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            private: false,
            views: {
                // the main template will be plaProductsd here (relatively named)
                '': { templateUrl: 'client/public/view/home.html' },
                'main-navbar@home': {
                    // templateUrl: 'client/public/view/main-navbar.html'
                    templateProvider: function ($http, $stateParams, AuthService) {
                        var templateName = AuthService.isLoggedIn() ?
                            'client/public/view/main-navbar-authenticated.html' :
                            'client/public/view/main-navbar.html';
                        return $http
                            .get(templateName)
                            .then(function (tpl) {
                                return tpl.data;
                            });
                    }
                }
            }
        })
        // Documentation STATES AND NESTED VIEWS ========================================
        .state('documentation', {
            url: '/documentation',
            private: true,

            views: {
                // the main template will be plaProductsd here (relatively named)
                '': { templateUrl: 'client/public/view/documentation.html' },
                'main-navbar@documentation': {
                    templateProvider: function ($http, $stateParams, AuthService) {
                        var templateName = AuthService.isLoggedIn() ?
                            'client/public/view/main-navbar-authenticated.html' :
                            'client/public/view/main-navbar.html';
                        return $http
                            .get(templateName)
                            .then(function (tpl) {
                                return tpl.data;
                            });
                    }

                }
            }
        })


        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            private: false,


            views: {
                // the main template will be plaProductsd here (relatively named)
                '': { templateUrl: 'client/public/view/about.html' },
                'main-navbar@about': {
                    //  templateUrl: 'client/public/view/main-navbar.html'
                    templateProvider: function ($http, $stateParams, AuthService) {
                        var templateName = AuthService.isLoggedIn() ?
                            'client/public/view/main-navbar-authenticated.html' :
                            'client/public/view/main-navbar.html';
                        return $http
                            .get(templateName)
                            .then(function (tpl) {
                                return tpl.data;
                            });
                    }
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
            private: false,
            views: {
                // the main template will be plaProductsd here (relatively named)
                '': {
                    templateUrl: 'client/public/view/register.html',
                    controller: 'registerCtrl'
                },
                'main-navbar@register': {
                    // templateUrl: 'client/public/view/main-navbar.html'
                    templateProvider: function ($http, $stateParams, AuthService) {
                        var templateName = AuthService.isLoggedIn() ?
                            'client/public/view/main-navbar-authenticated.html' :
                            'client/public/view/main-navbar.html';
                        return $http
                            .get(templateName)
                            .then(function (tpl) {
                                return tpl.data;
                            });
                    }
                },
            }
        })

        // lOGIN PAGE  =================================
        .state('login', {
            url: '/login',
            private: false,
            views: {
                // the main template will be plaProductsd here (relatively named)
                '': {
                    templateUrl: 'client/public/view/login.html',
                    controller: 'loginCtrl'
                },
                'main-navbar@login': {
                    templateUrl: 'client/public/view/main-navbar.html'
                },
            }
        })

        // ListUser PAGE  =================================
        .state('listeUser', {
            url: '/listuser',
            private: true,
            views: {
                // the main template will be plaProductsd here (relatively named)
                '': {
                    templateUrl: 'client/public/view/login.html',
                    controller: 'loginCtrl'
                },
                'main-navbar@listuser': {
                    // templateUrl: 'client/private/view/main-navbar-authenticated.html'
                    templateProvider: function ($http, $stateParams, AuthService) {
                        var templateName = AuthService.isLoggedIn() ?
                            'client/public/view/main-navbar-authenticated.html' :
                            'client/public/view/main-navbar.html';
                        return $http
                            .get(templateName)
                            .then(function (tpl) {
                                return tpl.data;
                            });
                    }
                },
            }
        });



});



myApp.controller('scotchController', function ($scope) {

    $scope.message = 'test';

    $scope.scotches = [
        {
            name: 'Macallan 12',
            priProducts: 50
        },
        {
            name: 'Chivas Regal Royal Salute',
            priProducts: 10000
        },
        {
            name: 'Glenfiddich 1937',
            priProducts: 20000
        }
    ];

});



myApp.run(function ($transitions, AuthService) {
    $transitions.onStart({}, function (trans) {
        if (trans.to().private && !AuthService.isLoggedIn()) {
            return trans.router.stateService.target('login');
        }
        // console.log(trans.views());

    }
    );
});


