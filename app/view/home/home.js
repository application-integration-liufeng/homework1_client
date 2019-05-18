angular.module('myApp.home', [])

.config(function($stateProvider,$urlRouterProvider){

})

.controller('homeCtrl',function($scope, $route, $http, $state, $cookies, $stateParams) {

    $scope.offset = 0;

    $http({
        method: 'post',
        url: host + '/list',
        data: {
            offset: $scope.offset
        }
    }).then(function (res) {
        $scope.stocks = res.data;
    }, function () {
        console.error();
    });


    $scope.nextPage = function () {
        $scope.offset += 10;
        $http({
            method: 'post',
            url: host + '/list',
            data: {
                offset: $scope.offset
            }
        }).then(function (res) {
            $scope.stocks = res.data;
        }, function () {
            console.error();
        });
    };

    $scope.prePage = function () {
        $scope.offset -= 10;
        $http({
            method: 'post',
            url: host + '/list',
            data: {
                offset: $scope.offset
            }
        }).then(function (res) {
            $scope.stocks = res.data;
        }, function () {
            console.error();
        });
    };

});
