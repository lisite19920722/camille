export default ($scope, $rootScope, qService, environmentRes, $http) => {
    'ngInject';
    $scope.windowHeight=$(window).height();
    //--------------------------waterPollutionGetPromise----------------------------
    var waterPollutionGetParams = {
        // 'id':1,
    };
    var waterPollutionGetHeaders = {

    };
    $rootScope.loading=true;
    var waterPollutionGetPromise = qService.httpGetWithToken(environmentRes.getWaterPollution, waterPollutionGetParams, waterPollutionGetHeaders);
    waterPollutionGetPromise.then(function(data){
        // console.log(data.data);
        $scope.box1Date=data.data[0];
        $scope.box2Date=data.data[1];
        //盒子2中五个工厂各自最近6天的废水排放量(右上角)
        $scope.discharge1=data.data[2];
        $scope.discharge2=data.data[3];
        $scope.discharge3=data.data[4];
        $scope.discharge4=data.data[5];
        $scope.discharge5=data.data[6];
        //盒子2所排放的废水中污染物细分指标（右下角）
        $scope.pollutionCod=data.data[7];
        $scope.pollutionNh4n=data.data[8];
        $scope.pollutionP=data.data[9];

        //--------------------------盒子2-----------------------------
        //堆积柱状图第一层膜
        $scope.discharge={
            options:{
                chart: {
                    type: 'column'
                },
                exporting:{
                    enabled: false
                },
                title: {
                    text: '太仓市主要污水处理厂废水排放分析'
                },
                credits: {
                    enabled:false
                },
                xAxis: {
                    categories: $scope.box2Date
                    // categories: ['6月1日','6月2日','6月3日','6月4日','6月5日','6月6日']
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '吨'
                    },
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                        }
                    }
                },
                legend: {
                    align: 'center',
                    x: 33,
                    verticalAlign: 'bottom',
                    y: 0,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                    borderColor: '#CCC',
                    borderWidth: 1,
                    shadow: true
                },
                tooltip: {
                    formatter: function () {
                        return '<b>' + this.x + '</b><br/>' +
                            this.series.name + ': ' + this.y + '<br/>' +
                            'Total: ' + this.point.stackTotal;
                    }
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: false,
                            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                            style: {
                                textShadow: '0 0 3px black'
                            }
                        }
                    }
                }
            },
            series: [
                {
                    name: '玖龙纸业有限公司',
                    data: $scope.discharge1,
                    // data: [500, 400, 300, 400, 600, 800]
                    color:"#4bd4cd"
                }, {
                    name: '太仓市城区污水处理厂',
                    data: $scope.discharge2,
                    // data: [500, 400, 300, 400, 600, 800]
                    color:"#69d5f2"
                }, {
                    name: '浏河镇污水处理厂',
                    data: $scope.discharge3,
                    // data: [500, 400, 300, 400, 600, 800]
                    color:"#aaaaaa"
                }, {
                    name: '港城组团污水处理厂',
                    data: $scope.discharge4,
                    // data: [500, 400, 300, 400, 600, 800]
                    color:"#27ab83"
                }, {
                    name: '太仓江城城市污水处理有限公司',
                    data: $scope.discharge5,
                    // data: [500, 400, 300, 400, 600, 800]
                    color:"#c8a9ed"
                }
            ]
        };
        //堆积柱状图第二层膜
        $scope.changePollutionType1=function(){
            $scope.discharge={
                options:{
                    chart: {
                        type: 'column'
                    },
                    exporting:{
                        enabled: false
                    },
                    title: {
                        text: '太仓市主要污水处理厂废水排放分析'
                    },
                    credits: {
                        enabled:false
                    },
                    xAxis: {
                        categories: $scope.box2Date
                        // categories: ['4月13日','4月14日','4月15日','4月16日','4月17日','4月18日']
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: '吨'
                        },
                        stackLabels: {
                            enabled: true,
                            style: {
                                fontWeight: 'bold',
                                color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                            }
                        }
                    },
                    legend: {
                        align: 'center',
                        x: 33,
                        verticalAlign: 'bottom',
                        y: 0,
                        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                        borderColor: '#CCC',
                        borderWidth: 1,
                        shadow: true
                    },
                    tooltip: {
                        formatter: function () {
                            return '<b>' + this.x + '</b><br/>' +
                                this.series.name + ': ' + this.y + '<br/>' +
                                'Total: ' + this.point.stackTotal;
                        }
                    },
                    plotOptions: {
                        column: {
                            stacking: 'normal',
                            dataLabels: {
                                enabled: false,
                                color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                                style: {
                                    textShadow: '0 0 3px black'
                                }
                            }
                        }
                    }
                },
                series: [
                    {
                        name: '玖龙纸业有限公司',
                        data: $scope.discharge1,
                        // data: [500, 400, 300, 400, 600, 800]
                        color:"#4bd4cd"
                    }, {
                        name: '太仓市城区污水处理厂',
                        data: $scope.discharge2,
                        // data: [500, 400, 300, 400, 600, 800]
                        color:"#69d5f2"
                    }, {
                        name: '浏河镇污水处理厂',
                        data: $scope.discharge3,
                        // data: [500, 400, 300, 400, 600, 800]
                        color:"#aaaaaa"
                    }, {
                        name: '港城组团污水处理厂',
                        data: $scope.discharge4,
                        // data: [500, 400, 300, 400, 600, 800]
                        color:"#27ab83"
                    }, {
                        name: '太仓江城城市污水处理有限公司',
                        data: $scope.discharge5,
                        // data: [500, 400, 300, 400, 600, 800]
                        color:"#c8a9ed"
                    }
                ]
            };
        };
        //溶解氧浓度
        $scope.changePollutionType2=function(){
            $scope.discharge={
                options:{
                    chart: {
                        type: 'column'
                    },
                    exporting:{
                        enabled: false
                    },
                    legend: {
                        itemStyle:{
                            fontWeight:'normal'
                        }
                    },
                    credits: {
                        enabled:false
                    },
                    title: {
                        text: '溶解氧排放浓度',
                        style: {
                            fontWeight:'bold',
                        }
                    },
                    subtitle: {
                        text: $scope.box2Date[5]+'9时',
                        // text: '6月1日9时',
                        style: {
                            fontWeight: 'normal',
                            fontSize: 'larger',
                            fontStyle: '宋体'
                        }
                    },
                    xAxis: {
                        categories: [
                            '太仓市城区污水处理厂',
                            '太仓江城城市污水处理有限公司',
                            '浏河镇污水处理厂',
                            '港城组团污水处理厂',
                            '玖龙纸业有限公司'
                        ]

                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'mg/L'
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f} mg/L</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    }
                },
                series: [{
                    name: '溶解氧浓度',
                    color: "#7cb5ec",
                    data: $scope.pollutionCod
                    // data: [100, 200, 150, 120, 220]
                }]
            };
        };
        //氨氮浓度
        $scope.changePollutionType3=function(){
            $scope.discharge={
                options:{
                    chart: {
                        type: 'column'
                    },
                    exporting:{
                        enabled: false
                    },
                    legend: {
                        itemStyle:{
                            fontWeight:'normal'
                        }
                    },
                    credits: {
                        enabled:false
                    },
                    title: {
                        text: '氨氮排放浓度',
                        style: {
                            fontWeight:'bold',
                        }
                    },
                    subtitle: {
                        text: $scope.box2Date[5]+'9时',
                        // text: '6月1日9时',
                        style: {
                            fontWeight: 'normal',
                            fontSize: 'larger',
                            fontStyle: '宋体'
                        }
                    },
                    xAxis: {
                        categories: [
                            '太仓市城区污水处理厂',
                            '太仓江城城市污水处理有限公司',
                            '浏河镇污水处理厂',
                            '港城组团污水处理厂',
                            '玖龙纸业有限公司'
                        ]
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'mg/L'
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f} mg/L</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    }
                },
                series: [{
                    name: '氨氮浓度',
                    color: "#7cb5ec",
                    data:  $scope.pollutionNh4n
                    // data:  [200, 100, 150, 150, 250]
                }]
            };
        };
        //总磷浓度
        $scope.changePollutionType4=function(){
            $scope.discharge={
                options:{
                    chart: {
                        type: 'column'
                    },
                    exporting:{
                        enabled: false
                    },
                    legend: {
                        itemStyle:{
                            fontWeight:'normal'
                        }
                    },
                    credits: {
                        enabled:false
                    },
                    title: {
                        text: '总磷排放浓度',
                        style: {
                            fontWeight:'bold',
                        }
                    },
                    subtitle: {
                        text: $scope.box2Date[5]+'9时',
                        // text: '6月1日9时',
                        style: {
                            fontWeight: 'normal',
                            fontSize: 'larger',
                            fontStyle: '宋体'
                        }
                    },
                    xAxis: {
                        categories: [
                            '太仓市城区污水处理厂',
                            '太仓江城城市污水处理有限公司',
                            '浏河镇污水处理厂',
                            '港城组团污水处理厂',
                            '玖龙纸业有限公司'
                        ]

                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'mg/L'
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f} mg/L</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    }
                },
                series: [{
                    name: '总磷浓度',
                    color: "#7cb5ec",
                    data: $scope.pollutionP
                    // data: [0.07,0.06,0.12,0.08,0.11]
                }]
            };
        };
        //高锰酸钾浓度
        $scope.changePollutionType5=function(){
            $scope.discharge={
                options:{
                    chart: {
                        type: 'column'
                    },
                    exporting:{
                        enabled: false
                    },
                    credits: {
                        enabled:false
                    },
                    legend: {
                        itemStyle:{
                            fontWeight:'normal'
                        }
                    }
                    ,
                    title: {
                        text: '高锰酸钾排放浓度',
                        style: {
                            fontWeight:'bold',
                        }
                    },
                    subtitle: {
                        text: $scope.box2Date[5]+'9时',
                        // text: '6月1日9时',
                        style: {
                            fontWeight: 'normal',
                            fontSize: 'larger',
                            fontStyle: '宋体'
                        }
                    },
                    xAxis: {
                        categories: [
                            '太仓市城区污水处理厂',
                            '太仓江城城市污水处理有限公司',
                            '浏河镇污水处理厂',
                            '港城组团污水处理厂',
                            '玖龙纸业有限公司'
                        ]
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'mg/L'
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f} mg/L</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    }
                },
                series: [
                    {
                        name: '高锰酸钾浓度',
                        color: "#7cb5ec",
                        data: [1.65, 1.25, 1.78, 2.02, 1.81]

                    }
                ]
            };
        };
        //--------------------------盒子2结束--------------------------
    }, function(error){
        console.log('发送失败');
    });
    $rootScope.loading=false;
    //-------------------------waterPollutionGetPromise结束--------------------------
};