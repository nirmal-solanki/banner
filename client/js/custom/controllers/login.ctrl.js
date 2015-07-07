'use strict';
app.controller('LoginCtrl',
    function ($scope, $rootScope, $location,LoginService) {

        $scope.login = {};
        $scope.isProcessing = false;
        $scope.fnLogin = function(login){
            $scope.isProcessing = true;
            LoginService.Login(login).then(function(res){
                $scope.errMsg = "";
                $scope.isProcessing = false;
                if(res.id){
                    $rootScope.isLogin = true;
                    localStorage.setItem("access_token", res.id);
                    $location.url('/edit-banner');
                }else{
                    if(res.error.statusCode == 401){
                        $scope.errMsg = "Invalid username or password";
                    }
                }
            });
        }
    }
);
