'use strict';
app.controller('EditBannerCtrl',
    function ($scope, BannerFactory, $http, $modal, API_URL) {

        $scope.bannerArr = [];
        $scope.banner = {};
        $scope.apiUrl = API_URL;
        $scope.isBannerDataLoaded = false;
        $scope.oldImage = "";

        $scope.fnInitEditBanner = function(){
            $scope.fnFetchBanners();
        };

        $scope.fnFetchBanners = function(){
            $scope.isBannerDataLoaded = true;
            $scope.bannerArr = BannerFactory.query(function(res){
                $scope.isBannerDataLoaded = false;
            });
        };

        $scope.fnSaveBanner = function(obj){
            var bannerCopy = angular.copy(obj.banner);
            if(obj.isFileUpload){
                obj.getFileFileItem.upload();
            }
            if(bannerCopy.id){
                BannerFactory.update({ id: bannerCopy.id,access_token:localStorage.getItem("access_token")},bannerCopy,function(res){
                    if($scope.oldImage && obj.isFileUpload){
                        $scope.fnDeleteContainerFile($scope.oldImage);
                        $scope.oldImage = "";
                    }
                    $scope.fnFetchBanners();
                });
            }else{
                BannerFactory.create({access_token:localStorage.getItem("access_token")},bannerCopy,function(res){
                    $scope.fnFetchBanners();
                });
            }
        };

        $scope.fnEditBanner = function(banner){
            $scope.oldImage = banner.image;
            $scope.fnOpenAddBlogModel('lg',angular.copy(banner));
        };

        $scope.fnDeleteBanner = function(_id,image){
            if (confirm('Do you want to delete this banner?')) {
                BannerFactory.delete({ id: _id,access_token:localStorage.getItem("access_token")},function(res){
                        $scope.fnFetchBanners();
                        $scope.fnDeleteContainerFile(image);
                });
            }
        };

        $scope.fnDeleteContainerFile = function(fileName){
            $http.delete(API_URL + 'containers/container2/files/' +fileName)
                .success(function (data) {});
        };

        $scope.animationsEnabled = true;
        $scope.fnOpenAddBlogModel = function (size,banner) {
            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'views/banner.modal.html',
                controller: 'BannerModalCtrl',
                size: size,
                resolve: {
                    Banner: function () {
                        return banner;
                    }
                }
            });
            modalInstance.result.then(function (obj) {
                $scope.fnSaveBanner(obj);
            }, function () {});
        };
    }
);
