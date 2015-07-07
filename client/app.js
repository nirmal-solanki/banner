/**
 * @ngdoc overview
 * @name bannerApp
 * @description
 * # bannerApp
 *
 * Main module of the application.
 */
var app = angular.module('bannerApp', ['ui.router','angularFileUpload']);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('/', {
            url: '/',
            views: {
                'container': { templateUrl: 'views/main.html', controller: 'MainCtrl'}
            }
        })
        .state('login', {
            url: '/login',
            views: {
                'container': { templateUrl: 'views/login.html', controller: 'LoginCtrl'}
            },
            resolve: {
                fnCheckAuth: function (AuthService) {
                    return AuthService.isNotAuthenticate();
                }
            }
        })
        .state('edit-banner', {
            url: '/edit-banner',
            views: {
                'container': { templateUrl: 'views/edit.banner.html', controller: 'EditBannerCtrl'}
            },
            resolve: {
                fnCheckAuth: function (AuthService) {
                    return AuthService.isAuthenticate();
                }
            }
        })
});

app.run(function ($rootScope, $location, $state) {
    $rootScope.isLogin = false;
    $rootScope.readFile = "";

    $rootScope.fnIsLoggedIn = function(){
        if(localStorage.getItem("access_token")) {
            $rootScope.isLogin = true;
        }else{
            $rootScope.isLogin = false;
        }
    };
    // register listener to watch route changes
    $rootScope.$on('$stateChangeStart',
        function (event, toState, toParams, fromState, fromParams) {
            $rootScope.fnIsLoggedIn();
        });
});

app.constant('API_URL','http://nsapi-nsapi.rhcloud.com:80/api/');

