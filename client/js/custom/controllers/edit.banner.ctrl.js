'use strict';
app.controller('EditBannerCtrl',
    function ($scope, BannerService, FileUploader ,$http, API_URL) {

        $scope.bannerArr = [];
        $scope.banner = {};
        $scope.apiUrl = API_URL;
        $scope.isProcessing = false;
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

        $scope.getNewFileName = function(fileItem){
            var fileExtension = '.' + fileItem.file.name.split('.').pop();
            return Math.random().toString(36).substring(7) + new Date().getTime() + fileExtension;
        };

        // create a uploader with options
        var uploader = $scope.uploader = new FileUploader({
            scope: $scope,
            url: API_URL + 'containers/container2/upload',
            queueLimit:1,
            formData: [{ key: 'value' }],
            filters: [{
                name: 'filterImgExt',
                // A user-defined filter
                fn: function(item) {
                    return /\/(png|jpeg|jpg|gif|mp4)$/.test(item.type);
                }
            }]
        });

        // REGISTER HANDLERS

        uploader.onAfterAddingFile = function(fileItem) {
            fileItem.file.name = $scope.getNewFileName(fileItem);
            $scope.getFileImageItem = fileItem;
            $scope.imageName = fileItem.file.name;
            $scope.isImageUpload = true;
            $scope.bannerForm.$invalid = true;
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
            $scope.$broadcast('uploadCompleted', fileItem);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            fileItem.remove();
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            $scope.bannerForm.$invalid = false;
            console.info('onCompleteAll');
        };
        $scope.setFiles = function(element) {
            var isFileType = /\/(png|jpeg|jpg|gif)$/.test(element.files[0].type);
            if (element.files && element.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    if(isFileType){
                        $("#preview").html("<img class='img-responsive' src="+e.target.result+">");
                    }else{
                        if(element.files[0].name.split(".").pop() == 'mp4'){
                            var html = '';
                            html += '<video controls class="img-responsive">';
                            html += '   <source src="'+e.target.result+'" type="video/mp4"/>';
                            html +='</video>';
                            $("#preview").html(html);
                        }
                    }
                };
                reader.readAsDataURL(element.files[0]);
            }
        };

        $scope.fnSaveBanner = function(banner){
            var bannerCopy = angular.copy(banner);
            bannerCopy.image = $scope.imageName;
            $scope.isProcessing = true;
            if(bannerCopy.id){
                BannerService.UpdateBanner(localStorage.getItem("access_token"),bannerCopy.id,bannerCopy).then(function(res){
                    if($scope.oldImage && $scope.isImageUpload){
                        $scope.fnDeleteContainerFile($scope.oldImage);
                        $scope.oldImage = "";
                    }
                    $scope.fnResetForm();
                    $scope.fnFetchBanners();
                });
            }else{
                BannerService.CreateBanner(localStorage.getItem("access_token"),bannerCopy).then(function(res){
                    $scope.fnResetForm();
                    $scope.bannerArr.push(res);
                });
            }
        };

        $scope.fnEditBanner = function(banner){
            $scope.oldImage = banner.image;
            $scope.banner = angular.copy(banner);
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

        $scope.fnResetForm = function(){
            $scope.banner = {};
            $("#preview").html("");
            $scope.isProcessing = false;
            $scope.bannerForm.$setPristine();
        }
    }
);
