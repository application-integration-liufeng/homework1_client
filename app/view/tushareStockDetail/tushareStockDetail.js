angular.module('myApp.tushareStockDetail', [])

.config(function($stateProvider,$urlRouterProvider){

})

.controller('tushareStockDetailCtrl',function($scope, $route, $http, $state, $cookies, $stateParams) {

    console.log($stateParams.symbol);

    $http({
        method: 'post',
        url: host + '/tushare/detail',
        data: {
            symbol: $stateParams.symbol
        }
    }).then(function (res) {
        console.log(res);

        /*
0: "ts_code"
1: "trade_date"
2: "open"
3: "high"
4: "low"
5: "close"
6: "pre_close"
7: "change"
8: "pct_chg"
9: "vol"
10: "amount"
         */

        let items = res.data.daily.items;
        let days = [];
        let opens = [];
        let highs = [];
        let lows = [];
        let closes = [];
        let y_min = items[0][4];
        let y_max = items[0][3];
        for (let index in items) {
            let item = items[index];
            days.push(item[1]);
            opens.push(item[2]);
            highs.push(item[3]);
            lows.push(item[4]);
            y_min = item[4] < y_min ? item[4] : y_min;
            y_max = item[3] > y_max ? item[3] : y_max;
            closes.push(item[5]);
        }
        days.reverse();
        opens.reverse();
        highs.reverse();
        lows.reverse();
        closes.reverse();

        let daily_graph = echarts.init(document.getElementById('daily_graph'));

        let daily_graph_option = {
            title: {
                text: res.data.name
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['开盘','最高','最低','收盘']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: days
            },
            yAxis: {
                type: 'value',
                min: y_min,
                max: y_max
            },
            series: [
                {
                    name:'开盘',
                    type:'line',
                    data:opens
                },
                {
                    name:'最高',
                    type:'line',
                    data:highs
                },
                {
                    name:'最低',
                    type:'line',
                    data:lows
                },
                {
                    name:'收盘',
                    type:'line',
                    data:closes
                }
            ]
        };

        daily_graph.setOption(daily_graph_option);

    }, function () {
        console.error();
    });

});
