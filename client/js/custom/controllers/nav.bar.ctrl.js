'use strict';
app.controller('NavBarCtrl',
    function ($scope, $rootScope, $location, LoginService) {

        $scope.isProcessing = false;
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

        $scope.fnLogout = function(){
            $scope.isProcessing = true;
            LoginService.Logout(localStorage.getItem("access_token")).then(function(res){
                if(res == ""){
                    $scope.isProcessing = false;
                    $rootScope.isLogin = false;
                    localStorage.setItem("access_token",res);
                    $location.path('/login');
                }
            });
        }
    }
);
