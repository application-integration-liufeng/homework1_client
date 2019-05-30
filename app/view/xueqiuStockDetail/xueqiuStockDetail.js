angular.module('myApp.xueqiuStockDetail', [])

    .config(function ($stateProvider, $urlRouterProvider) {

    })

    .controller('xueqiuStockDetailCtrl', function ($scope, $route, $http, $state, $cookies, $stateParams) {

        console.log($stateParams.symbol);

        $http({
            method: 'post',
            url: host + '/xueqiu/stockcomment',
            data: {
                symbol: $stateParams.symbol
            }
        }).then(function (res) {
            $scope.comments = res.data;
        }, function () {
            console.error();
        });

    }).filter('to_trusted', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }]);
