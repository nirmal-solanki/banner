app.factory('LoginService',['$q','$http','API_URL',
    function($q,$http,API_URL) {
        var LoginService = {};

        LoginService.Login = function (data) {
            var defer = $q.defer();
            $http.post(API_URL+"Users/login", data).
                success(function(data, status, headers, config) {
                    defer.resolve(data);
                }).
                error(function(error, status, headers, config) {
                    defer.resolve(error);
                });
            return defer.promise;
        };

        LoginService.Logout = function (access_token) {
            var defer = $q.defer();
            $http.post(API_URL+"Users/logout?access_token="+access_token).
                success(function(data, status, headers, config) {
                    defer.resolve(data);
                }).
                error(function(error, status, headers, config) {
                    defer.resolve(error);
                });
            return defer.promise;
        };

        return LoginService;
    }
]);