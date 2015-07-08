'use strict';
app.controller('EditBannerCtrl',
    function ($scope, BannerService ,$http, $modal, API_URL) {

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
            BannerService.FetchBanners().then(function(res){
                $scope.isBannerDataLoaded = false;
                $scope.bannerArr = res;
            });
        };

        $scope.fnSaveBanner = function(obj){
            var bannerCopy = angular.copy(obj.banner);
            if(obj.isFileUpload){
                obj.getFileFileItem.upload();
                obj.isFileUpload = false;
            }
            if(bannerCopy.id){
                BannerService.UpdateBanner(localStorage.getItem("access_token"),bannerCopy.id,bannerCopy).then(function(res){
                    if($scope.oldImage && $scope.isImageUpload){
                        $scope.fnDeleteContainerFile($scope.oldImage);
                        $scope.oldImage = "";
                    }
                    $scope.fnFetchBanners();
                });
            }else{
                BannerService.CreateBanner(localStorage.getItem("access_token"),bannerCopy).then(function(res){
                    $scope.bannerArr.push(res);
                });
            }
        };

        $scope.fnEditBanner = function(banner){
            $scope.oldImage = banner.image;
            $scope.fnOpenAddBlogModel('lg',angular.copy(banner));
        };

        $scope.fnDeleteBanner = function(id,image){
            if (confirm('Do you want to delete this banner?')) {
                BannerService.DeleteBanner(localStorage.getItem("access_token"), id).then(function (res) {
                    if (res == ""){
                        $scope.fnFetchBanners();
                        $scope.fnDeleteContainerFile(image);
                    }
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
