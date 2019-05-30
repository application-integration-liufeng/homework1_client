angular.module('myApp.xueqiuStockList', [])

    .config(function ($stateProvider, $urlRouterProvider) {

    })

    .controller('xueqiuStockListCtrl', function ($scope, $route, $http, $state, $cookies, $stateParams) {

        $scope.offset = 1;

        $http({
            method: 'post',
            url: host + '/xueqiu/stocklist',
            data: {
                page: $scope.offset
            }
        }).then(function (res) {
            $scope.stocks = res.data;
        }, function () {
            console.error();
        });


        $scope.nextPage = function () {
            $scope.offset += 1;
            $http({
                method: 'post',
                url: host + '/xueqiu/stocklist',
                data: {
                    page: $scope.offset
                }
            }).then(function (res) {
                $scope.stocks = res.data;
            }, function () {
                console.error();
            });
        };

        $scope.prePage = function () {
            $scope.offset -= 1;
            $http({
                method: 'post',
                url: host + '/xueqiu/stocklist',
                data: {
                    page: $scope.offset
                }
            }).then(function (res) {
                $scope.stocks = res.data;
            }, function () {
                console.error();
            });
        };

    });
