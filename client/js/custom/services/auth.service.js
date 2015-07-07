app.factory('AuthService',['$q','$rootScope','$location',
    function($q,$rootScope,$location) {
        var AuthService = {};

        AuthService.isAuthenticate = function () {
            var defer = $q.defer();
            if(localStorage.getItem("access_token")){
                $rootScope.isLogin = true;
                defer.resolve();
            }else{
                $rootScope.isLogin = false;
                $location.path('/login');
            }
            return defer.promise;
        };

        AuthService.isNotAuthenticate = function () {
            var defer = $q.defer();
            if(localStorage.getItem("access_token")){
                $rootScope.isLogin = true;
                defer.reject();
            }else{
                $rootScope.isLogin = false;
                $location.path('/login');
                defer.resolve();
            }
            return defer.promise;
        };

        return AuthService;
    }
]);