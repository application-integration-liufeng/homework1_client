'use strict';

const host = 'http://localhost:3000';

// tushare
const tushareHost = 'http://api.tushare.pro';
const tushareToken = '582eee2fb6aa974db8555e9cf101b4c3a3a577e6ab3be0523f6b62aa';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
    'ngRoute',
    'ui.router',
    'ngCookies',
    'oc.lazyLoad'
])

.config(function($stateProvider, $urlRouterProvider){
    //默认路由路径
    $urlRouterProvider.when('', '/home');

    //路由表
    $stateProvider
        .state('home', {
                    url: '/home',
                    templateUrl: 'view/home/home.html',
                    controller: 'homeCtrl',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('view/home/home.js');
                        }]
                    }
                })
        .state('tushareStockList', {
                    url: '/tushareStockList',
                    templateUrl: 'view/tushareStockList/tushareStockList.html',
                    controller: 'tushareStockListCtrl',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('view/tushareStockList/tushareStockList.js');
                        }]
                    }
                })
        .state('xueqiuStockList', {
                    url: '/xueqiuStockList',
                    templateUrl: 'view/xueqiuStockList/xueqiuStockList.html',
                    controller: 'xueqiuStockListCtrl',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('view/xueqiuStockList/xueqiuStockList.js');
                        }]
                    }
                })
        .state('tushareStockDetail', {
                    params: {symbol: null},
                    url: '/tushareStockDetail/?:symbol',
                    templateUrl: 'view/tushareStockDetail/tushareStockDetail.html',
                    controller: 'tushareStockDetailCtrl',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('view/tushareStockDetail/tushareStockDetail.js');
                        }]
                    }
                })
})

    .controller('mainCtrl', function($scope, $http, $state, $window, $cookies){

    });


function getBlob(url) {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.response);
            }
        };

        xhr.send();
    });
}

/**
 * 保存
 * @param  {Blob} blob
 * @param  {String} filename 想要保存的文件名称
 */
function saveAs(blob, filename) {
    if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, filename);
    } else {
        const link = document.createElement('a');
        const body = document.querySelector('body');

        link.href = window.URL.createObjectURL(blob);
        link.download = filename;

        // fix Firefox
        link.style.display = 'none';
        body.appendChild(link);

        link.click();
        body.removeChild(link);

        window.URL.revokeObjectURL(link.href);
    }
}

/**
 * 下载
 * @param  {String} url 目标文件地址
 * @param  {String} filename 想要保存的文件名称
 */
function download(url, filename) {
    getBlob(url).then(blob => {
        saveAs(blob, filename);
    });
}
