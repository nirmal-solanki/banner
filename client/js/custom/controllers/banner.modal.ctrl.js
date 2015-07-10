'use strict';
app.controller("BannerModalCtrl",['$rootScope', '$scope', '$modalInstance','FileUploader','API_URL','Banner',
    function($rootScope, $scope, $modalInstance,FileUploader,API_URL,Banner){

        $scope.banner = Banner ? Banner : {};
        $scope.isBtnDisabled = Banner ? false : true;
        var isFileUpload = false;

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
            $scope.getFileItem = fileItem;
            $scope.imageName = fileItem.file.name;
            $scope.isBtnDisabled = false;
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            /*console.info('onAfterAddingAll', addedFileItems);*/
        };
        uploader.onBeforeUploadItem = function(item) {
            /*console.info('onBeforeUploadItem', item);*/
        };
        uploader.onProgressItem = function(fileItem, progress) {
            /*console.info('onProgressItem', fileItem, progress);*/
        };
        uploader.onProgressAll = function(progress) {
            /*console.info('onProgressAll', progress);*/
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            /*console.info('onSuccessItem', fileItem, response, status, headers);*/
            $scope.$broadcast('uploadCompleted', fileItem);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            /*console.info('onErrorItem', fileItem, response, status, headers);*/
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            /*console.info('onCancelItem', fileItem, response, status, headers);*/
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            /*console.info('onCompleteItem', fileItem, response, status, headers);*/
        };
        uploader.onCompleteAll = function() {
            /*console.info('onCompleteAll');*/
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
                    isFileUpload = true;
                };
                reader.readAsDataURL(element.files[0]);
            }
        };

        $scope.fnSave = function (banner) {
            banner.image = $scope.imageName;
            var obj = {};
            obj.banner = banner;
            obj.getFileFileItem = $scope.getFileItem;
            obj.isFileUpload = isFileUpload;
            $modalInstance.close(obj);
        };

        $scope.fnCancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);