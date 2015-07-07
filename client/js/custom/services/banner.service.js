app.factory('BannerService',['$q','$http','API_URL',
    function($q,$http,API_URL) {
        var BannerService = {};

        //Get account data
        BannerService.FetchBanners = function () {
            var defer = $q.defer();
            $http.get(API_URL+"banners")
                .success(function(response) {
                    defer.resolve(response);
                })
                .error(function(error) {
                    defer.resolve(error);
                });
            return defer.promise;
        };

        BannerService.CreateBanner = function (access_token,banner) {
            var defer = $q.defer();
            $http.post(API_URL+"banners?access_token"+access_token,banner)
                .success(function(response) {
                    defer.resolve(response);
                })
                .error(function(error) {
                    defer.resolve(error);
                });
            return defer.promise;
        };

        BannerService.UpdateBanner = function (access_token,id,data) {
            var defer = $q.defer();
            $http.put(API_URL+"banners/"+id+"?access_token"+access_token, data)
                .success(function(response) {
                    defer.resolve(response);
                })
                .error(function(error) {
                    defer.resolve(error);
                });
            return defer.promise;
        };

        BannerService.DeleteBanner = function (access_token,id) {
            var defer = $q.defer();
            $http.delete(API_URL+"banners/"+id+"?access_token"+access_token)
                .success(function(response) {
                    defer.resolve(response);
                })
                .error(function(error) {
                    defer.resolve(error);
                });
            return defer.promise;
        };

        return BannerService;
    }
]);