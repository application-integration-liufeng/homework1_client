angular.module('myApp.tushareStockList', [])

.config(function($stateProvider,$urlRouterProvider){

})

.controller('tushareStockListCtrl',function($scope, $route, $http, $state, $cookies, $stateParams) {

    $scope.offset = 1;

    $http({
        method: 'post',
        url: host + '/tushare/list',
        data: {
            offset: $scope.offset
        }
    }).then(function (res) {
        $scope.stocks = res.data;
    }, function () {
        console.error();
    });


    $scope.nextPage = function () {
        $scope.offset += 20;
        $http({
            method: 'post',
            url: host + '/tushare/list',
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
        $scope.offset -= 20;
        $http({
            method: 'post',
            url: host + '/tushare/list',
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
