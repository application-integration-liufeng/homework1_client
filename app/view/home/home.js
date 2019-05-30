angular.module('myApp.home', [])

    .config(function ($stateProvider, $urlRouterProvider) {

    })

    .controller('homeCtrl', function ($scope, $route, $http, $state, $cookies, $stateParams) {

        $scope.offset = 0;
        $scope.end = false;

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
            $http({
                method: 'post',
                url: host + '/list',
                data: {
                    offset: $scope.offset + 10
                }
            }).then(function (res) {
                $scope.stocks = res.data;
                $scope.offset += 10;
            }, function () {
                $scope.end = true;
                console.error();
            });
        };

        $scope.prePage = function () {
            $http({
                method: 'post',
                url: host + '/list',
                data: {
                    offset: $scope.offset - 10
                }
            }).then(function (res) {
                $scope.stocks = res.data;
                $scope.offset -= 10;
                $scope.end = false;
            }, function () {
                console.error();
            });
        };

    });
