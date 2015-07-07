'use strict';
app.controller('MainCtrl',
    function ($scope, $rootScope, $location, BannerService) {

        $scope.bannerArr = [];
        $scope.fnInitBanner = function(){
            $scope.fnFetchBanners();
        };

        $scope.fnFetchBanners = function(){
            BannerService.FetchBanners().then(function(res){
                $scope.bannerArr = res;
            });
        }
    }
);
