'use strict';
app.controller('MainCtrl',
    function ($scope, $rootScope, $location, BannerFactory) {

        $scope.bannerArr = [];
        $scope.fnInitBanner = function(){
            $scope.fnFetchBanners();
        };

        $scope.fnFetchBanners = function(){
            $scope.bannerArr = BannerFactory.query(function(res){});
        }
    }
);
