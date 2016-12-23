export default ($scope, $rootScope, qService, environmentRes, $http) => {
	'ngInject';
    (function() {
        document.body.scrollIntoView();
    })();
    //--------------------------waterPollutionGetPromise----------------------------
    var waterPollutionGetParams = {
        // 'id':1,
    };
    var waterPollutionGetHeaders = {

    };
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
        //--------------------------盒子1-----------------------------
        $scope.factory={
            options:{
                chart: {
                    type: 'column'
                },
                title: {
                    text: '工厂废水排放'
                },
                subtitle: {
                    text: '来源：太仓市环保局'
                },
                credits: {
                    enabled:false
                },
                xAxis: {
                    categories: $scope.box1Date
                    // categories: [
                    //     '6月1日',
                    //     '6月2日',
                    //     '6月3日',
                    //     '6月4日',
                    //     '6月5日',
                    //     '6月6日',
                    //     '6月7日',
                    // ]
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '吨'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} 吨</b></td></tr>',
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
                    name: '太仓市佳煌针织印染有限公司',
                    // data: $scope.list11
                    data: [4963, 4619, 5012, 4660, 4893, 4559, 4711],
                    color:"#7cb5ec"
                }, {
                    name: '洛克伍德染料有限公司',
                    // data: $scope.list12
                    data: [1595, 1200, 1914, 1444, 1568, 1862, 1717],
                    color:"#73e58d"
                }, {
                    name: '太仓虹盛印染厂',
                    // data: $scope.list13
                    data: [1016, 830, 902, 1134, 616, 349, 508],
                    color:"#444444"
                }, {
                    name: '太仓市金佳漂染厂',
                    // data: $scope.list14
                    data: [649, 966, 1078, 902, 2037, 1813, 1489],
                    color:"#0033ff"
                }, {
                    name: '江苏长乐纤维科技有限公司',
                    // data: $scope.list15
                    data: [1654, 1556, 1865, 2567, 2015, 1892, 1568],
                    color:"#888888"
                }
            ]
        };

        $scope.showindustry= function(){
            $scope.industryshow= !$scope.industryshow;
        };

        $scope.totaldata = {
            tabledata:
                [
                    {yearvalue:'日期',JLfactory:'太仓市佳煌针织印染有限公司（吨）' ,Afactory:'洛克伍德燃料有限公司（吨）',Bfactory:'太仓虹盛印染厂（吨）',Cfactory:'太仓市金佳漂染厂（吨）',Dfactory:'江苏长乐纤维科技有限公司（吨）'},
                    {yearvalue:$scope.box1Date[0], JLfactory:4963,Afactory:1595,Bfactory:1016,Cfactory:649,Dfactory:1654},
                    {yearvalue:$scope.box1Date[1], JLfactory:4619,Afactory:1200,Bfactory:830,Cfactory:966,Dfactory:1556},
                    {yearvalue:$scope.box1Date[2], JLfactory:5012,Afactory:1914,Bfactory:902,Cfactory:1078,Dfactory:1865},
                    {yearvalue:$scope.box1Date[3], JLfactory:4660,Afactory:1444,Bfactory:1134,Cfactory:902,Dfactory:2567},
                    {yearvalue:$scope.box1Date[4], JLfactory:4893,Afactory:1568,Bfactory:616,Cfactory:2037,Dfactory:2015},
                    {yearvalue:$scope.box1Date[5], JLfactory:4559,Afactory:1862,Bfactory:349,Cfactory:1813,Dfactory:1892},
                    {yearvalue:$scope.box1Date[6], JLfactory:4711,Afactory:1717,Bfactory:508,Cfactory:1489,Dfactory:1568}
                ]
        };
        // $scope.totaldata = {
        //     tabledata:
        //     [
        //         {yearvalue:'日期',JLfactory:'太仓市佳煌针织印染有限公司（吨）' ,Afactory:'洛克伍德燃料有限公司（吨）',Bfactory:'太仓虹盛印染厂（吨）',Cfactory:'太仓市金佳漂染厂（吨）',Dfactory:'江苏长乐纤维科技有限公司（吨）'},
        //         {yearvalue:'6月1日', JLfactory:500,Afactory:500,Bfactory:500,Cfactory:500,Dfactory:500},
        //         {yearvalue:'6月2日', JLfactory:400,Afactory:400,Bfactory:400,Cfactory:400,Dfactory:400},
        //         {yearvalue:'6月3日', JLfactory:300,Afactory:300,Bfactory:300,Cfactory:300,Dfactory:300},
        //         {yearvalue:'6月4日', JLfactory:400,Afactory:400,Bfactory:400,Cfactory:400,Dfactory:400},
        //         {yearvalue:'6月5日', JLfactory:600,Afactory:600,Bfactory:600,Cfactory:600,Dfactory:600},
        //         {yearvalue:'6月6日', JLfactory:800,Afactory:800,Bfactory:800,Cfactory:800,Dfactory:800},
        //         {yearvalue:'6月7日', JLfactory:700,Afactory:700,Bfactory:700,Cfactory:700,Dfactory:700}
        //     ]
        // };
        //--------------------------盒子1结束--------------------------

        //--------------------------盒子2-----------------------------
        //堆积柱状图第一层膜
        $scope.discharge={
            options:{
                chart: {
                    type: 'column'
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
    //-------------------------waterPollutionGetPromise结束--------------------------

    //--------------------------waterQualityGetPromise----------------------------
    var waterQualityGetParams = {
        // 'id':1,
    };
    var waterQualityGetHeaders = {

    };
    var waterQualityGetPromise = qService.httpGetWithToken(environmentRes.getWaterQuality, waterQualityGetParams, waterQualityGetHeaders);
    waterQualityGetPromise.then(function(data){
        // console.log(data.data);
    }, function(error){
        console.log('发送失败');
    });
    //-------------------------waterQualityGetPromise结束--------------------------

    // var promise1 = qService.tokenhttpGetWithWorkspace(rawFactory.query,{tableName:'waterIndustryData'});
    // promise1.then(function(rc2) {
    //     $scope.list11=rc2.data[0];
    //     $scope.list12=rc2.data[1];
    //     $scope.list13=rc2.data[2];
    //     $scope.list14=rc2.data[3];
    //     $scope.list15=rc2.data[4];
    //     $scope.date_industry=rc2.data[5];
    // });
    // var promise2 = qService.tokenhttpGetWithWorkspace(rawFactory.query,{tableName:'waterPollutionData'});
    // promise2.then(function(rc3) {
    //   $scope.JiuLONGDischarge=rc3.data[0];
    //   $scope.TCCityzoneDischarge=rc3.data[1];
    //   $scope.LiuHeDischarge=rc3.data[2];
    //   $scope.GangChengDischarge=rc3.data[3];
    //   $scope.TCRivertownDischarge=rc3.data[4];
    //   $scope.JiuLONGCod=rc3.data[5];
    //   $scope.TCCityzoneCod=rc3.data[6];
    //   $scope.LiuHeCod=rc3.data[7];
    //   $scope.GangChengCod=rc3.data[8];
    //   $scope.TCRivertownCod=rc3.data[9];
    //   $scope.JiuLONGNh4n=rc3.data[10];
    //   $scope.TCCityzoneNh4n=rc3.data[11];
    //   $scope.LiuHeNh4n=rc3.data[12];
    //   $scope.GangChengNh4n=rc3.data[13];
    //   $scope.TCRivertownNh4n=rc3.data[14];
    //   $scope.JiuLONGP=rc3.data[15];
    //   $scope.TCCityzoneP=rc3.data[16];
    //   $scope.LiuHeP=rc3.data[17];
    //   $scope.GangChengP=rc3.data[18];
    //   $scope.TCRivertownP=rc3.data[19];
    //   $scope.date1=rc3.data[20];
    // });

    //--------------------------盒子3-----------------------------
    $http({method: 'GET', url: '/app/in/environment/water/one/waterQuality.json'}).
    success(function(data, status, headers, config) {
        // console.log(data);
        waterQualityCurrentSuccess(data);
        initMap();
    }).
    error(function(data, status, headers, config) {
        console.log(data);
    });

    $http({method: 'GET', url: '/app/in/environment/water/one/wasteWater.json'}).
    success(function(data, status, headers, config) {
        // console.log(data);
        wasteWaterCurrentSuccess(data);
    }).
    error(function(data, status, headers, config) {
        console.log(data);
    });
    /**
     * 变量区
     *
     */
    var waterQualityPredict = [4003,4004,4005,4032,4033,4034,4044];
    var relationMonitorId = [{
        waterQuality: 4003,
        wasteWaterList: [4011, 4017, 4019]
    }, {
        waterQuality: 4004,
        wasteWaterList: [4015]
    }, {
        waterQuality: 4005,
        wasteWaterList: [4012, 4016]
    }, {
        waterQuality: 4032,
        wasteWaterList: [4012]
    }, {
        waterQuality: 4033,
        wasteWaterList: [4012]
    }, {
        waterQuality: 4034,
        wasteWaterList: [4012]
    }, {
        waterQuality: 4044,
        wasteWaterList: [4013]
    }];
    //变色范围
    var waterQualityO2Scan = {
        scan: [3, 2],
        type: 'desc'
    };
    $scope.waterQualityO2Scan = waterQualityO2Scan;
    var waterQualityKmno4Scan = {
        scan: [10, 15],
        type: 'asc'
    };
    $scope.waterQualityKmno4Scan = waterQualityKmno4Scan;
    var waterQualityNh4nScan = {
        scan: [1.5, 2.0],
        type: 'asc'
    };
    $scope.waterQualityNh4nScan = waterQualityNh4nScan;
    var waterQualityPScan = {
        scan: [0.3, 0.4],
        type: 'asc'
    };
    $scope.waterQualityPScan = waterQualityPScan;
    var waterQualityTnScan = {
        scan: [1.5, 2.0],
        type: 'asc'
    };
    $scope.waterQualityTnScan = waterQualityTnScan;
    var waterPollutionDischargeScan = {
        scan: [0.2, 0.4],
        type: 'asc'
    };
    $scope.waterPollutionDischargeScan = waterPollutionDischargeScan;
    var waterPollutionCodScan = {
        scan: [60, 60],
        type: 'asc'
    };
    $scope.waterPollutionCodScan = waterPollutionCodScan;
    var waterPollutionNh4nScan = {
        scan: [5, 5],
        type: 'asc'
    };
    $scope.waterPollutionNh4nScan = waterPollutionNh4nScan;
    var waterPollutionPScan = {
        scan: [0.5, 0.5],
        type: 'asc'
    };
    $scope.waterPollutionPScan = waterPollutionPScan;
    var waterConditionScan = {
        upLevel: 5,
        downLevel: 5
    };
    $scope.waterConditionScan = waterConditionScan;
    var mapObj;
    //最新整时水质监测点集
    var waterQualityMarkerArr;
    //最新整时超标水质监测点集
    var waterQualityMarkerArr2;
    //最近24小时水质监测点集
    var waterQualityCurrentArr;
    //当前被分析的监测点
    $scope.waterQualityAnalysisMarker = {};
    //当前预测分析后的监测点
    $scope.waterQualityAnalysisMarkerResult = {};
    //当前被分析的废水排放点
    $scope.wasteWaterAnalysisMarker = [];
    //最近六天废水排放点集
    var wasteWaterMarkerCurrentAllArr;
    //最近一天废水排放点集
    var wasteWaterMarkerArrAll;
    $scope.tableStatus = {
        allWaterQualityArr: true,
        allWaterQualityFailArr: false,
        allWaterQualityFailArrNav: false,
        allWaterQualityElementsArr: false,
        predictionZone: false
    };
    //废水处理总费用
    $scope.feed_sum = 0;
    /**
     * 函数区
     *
     **/
    // 创建和初始化地图函数：
    function initMap() {
        mapInit(); // 创建地图
        addMarker(waterQualityMarkerArr, '/assets/images/environment/marker_sprite.png', 'waterQuality');
        mapObj.setFitView();
    }
    // 初始化地图对象，加载地图
    function mapInit() {
        mapObj = new AMap.Map("map_canvas_BI", { // 二维地图显示视口
            view: new AMap.View2D({
                center: new AMap.LngLat(121.106661, 31.579533), // 地图中心点
                zoom: 11
                // 地图显示的缩放级别
            })
        });
    }
    // 实例化点标记
    function addMarker(markerInfoArr, imgSrc, type) {
        for (var i = 0; i < markerInfoArr.length; i++) {
            (function(k) {
                addMarkerOne(markerInfoArr[k], imgSrc, type);
            })(i);
        }
    };
    function addMarkerOne(markerInfoOne, imgSrc, type) {
        var p0 = markerInfoOne.point.split("|")[0];
        var p1 = markerInfoOne.point.split("|")[1];
        //自定义点标记内容
        var markerContent = document.createElement("div");
        markerContent.className = "markerContentStyle";
        markerContent.style.color = markerInfoOne.color;
        //点标记中的图标
        var markerImg = document.createElement("img");
        markerImg.src = imgSrc;
        markerContent.appendChild(markerImg);
        //点标记中的文本
        var markerSpan = document.createElement("span");
        markerSpan.innerHTML = markerInfoOne.monitor;
        markerSpan.style.borderRadius = "7px";
        markerSpan.style.borderWidth = 1;
        markerSpan.style.padding = "4px";
        markerContent.appendChild(markerSpan);
        var marker = new AMap.Marker({
            content: markerContent,
            topWhenClick: true,
            topWhenMouseOver: true,
            position: new AMap.LngLat(p0, p1)
        });
        (function(markerTemp) {
            //构建信息窗体中显示的内容
            var info = [];
            info.push("<div><b>" + markerInfoOne.monitor + "(实时数据)" + "</b>");
            if (type == 'waterQuality') {
                info.push("<div style=\"margin-top:10px; font-size:14px\"><table class=\"table table-bordered\">")
                info.push("<tr><td>溶解氧</td><td><span class=\"label " + getLabelCss(getStatusDesc(markerInfoOne.index_o2, waterQualityO2Scan.scan, '溶解氧').status) + "\">" + markerInfoOne.index_o2 + "mg/L</span></td></tr>");
                info.push("<tr><td>高锰酸钾浓度</td><td><span class=\"label " + getLabelCss(getStatusAsc(markerInfoOne.index_kmno4, waterQualityKmno4Scan.scan, '高锰酸钾').status) + "\">" + markerInfoOne.index_kmno4 + "mg/L</span></td></tr>");
                info.push("<tr><td>氨氮浓度</td><td><span class=\"label " + getLabelCss(getStatusAsc(markerInfoOne.index_nh4n, waterQualityNh4nScan.scan, '氨氮').status) + "\">" + markerInfoOne.index_nh4n + "mg/L</span></td></tr>");
                info.push("<tr><td>总磷浓度</td><td><span class=\"label " + getLabelCss(getStatusAsc(markerInfoOne.index_p, waterQualityPScan.scan, '总磷').status) + "\">" + markerInfoOne.index_p + "mg/L</span></td></tr>");
                info.push("<tr><td>水质状态</td><td><span class=\"label " + getLabelCss(markerInfoOne.monitor_status) + "\">" + getChineseStatus(markerInfoOne.monitor_status) + "</span></td></tr>");
                info.push("</table></div></div>");
            } else if (type == 'waterCondition') {
                info.push("<div style=\"margin-top:10px; font-size:14px\"><table class=\"table table-bordered\">")
                info.push("<tr><td>闸上水位</td><td><span class=\"label " + getLabelCss(WaterConditionStatusUpLevel(markerInfoOne.index_levelUp).status) + "\">" + markerInfoOne.index_levelUp + "m</span></td></tr>");
                info.push("<tr><td>闸下水位</td><td><span class=\"label " + getLabelCss(WaterConditionStatusDownLevel(markerInfoOne.index_levelDown).status) + "\">" + markerInfoOne.index_levelDown + "m</span></td></tr>");
                info.push("<tr><td>水质状态</td><td><span class=\"label " + getLabelCss(markerInfoOne.monitor_status) + "\">" + getChineseStatus(markerInfoOne.monitor_status) + "</span></td></tr>");
                info.push("</table></div></div>");
            } else if (type == 'waterPollution') {
                info.push("<div style=\"margin-top:10px; font-size:14px\"><table class=\"table table-bordered\">")
                info.push("<tr><td>排放量</td><td><span class=\"label " + getLabelCss(WasteWaterStatusDischarge(markerInfoOne.index_discharge).status) + "\">" + (markerInfoOne.index_discharge[1]).toFixed(2) + "吨</span></td></tr>");
                info.push("<tr><td>COD浓度</td><td><span class=\"label " + getLabelCss(getStatusAsc(markerInfoOne.index_cod, waterPollutionCodScan.scan, 'COD浓度').status) + "\">" + (markerInfoOne.index_cod).toFixed(2) + "mg/L</span></td></tr>");
                info.push("<tr><td>氨氮浓度</td><td><span class=\"label " + getLabelCss(getStatusAsc(markerInfoOne.index_nh4n, waterPollutionNh4nScan.scan, '氨氮浓度').status) + "\">" + (markerInfoOne.index_nh4n).toFixed(2) + "mg/L</span></td></tr>");
                info.push("<tr><td>总磷浓度</td><td><span class=\"label " + getLabelCss(getStatusAsc(markerInfoOne.index_p, waterPollutionPScan.scan, '总磷浓度').status) + "\">" + (markerInfoOne.index_p).toFixed(2) + "mg/L</span></td></tr>");
                info.push("<tr><td>水质状态</td><td><span class=\"label " + getLabelCss(markerInfoOne.monitor_status) + "\">" + getChineseStatus(markerInfoOne.monitor_status) + "</span></td></tr>");
                info.push("</table></div></div>");
            }
            var infoWindow = new AMap.InfoWindow({
                content: info.join(""), //使用默认信息窗体框样式，显示信息内容
                offset: new AMap.Pixel(16, -45)
            });
            AMap.event.addListener(markerTemp, 'click', function() { //鼠标点击marker弹出自定义的信息窗体
                infoWindow.open(mapObj, markerTemp.getPosition());
            });
        })(marker);
        marker.setMap(mapObj); // 在地图上添加点
    };

    function addMarkerOneAnalysis(markerInfoOne, imgSrc, type) {
        var p0 = markerInfoOne.point.split("|")[0];
        var p1 = markerInfoOne.point.split("|")[1];
        //自定义点标记内容
        var markerContent = document.createElement("div");
        markerContent.className = "markerContentStyle";
        markerContent.style.color = markerInfoOne.color;
        //点标记中的图标
        var markerImg = document.createElement("img");
        markerImg.src = imgSrc;
        markerContent.appendChild(markerImg);
        //点标记中的文本
        var markerSpan = document.createElement("span");
        markerSpan.innerHTML = markerInfoOne.monitor.slice(0, 5);
        markerSpan.style.borderRadius = "7px";
        markerSpan.style.borderWidth = 1;
        markerSpan.style.padding = "4px";
        markerContent.appendChild(markerSpan);
        var marker = new AMap.Marker({
            content: markerContent,
            topWhenClick: true,
            topWhenMouseOver: true,
            position: new AMap.LngLat(p0, p1)
        });
        (function(markerTemp) {
            //构建信息窗体中显示的内容
            var info = [];
            info.push("<div><b>" + markerInfoOne.monitor + "(实时数据)" + "</b>");
            if (type == 'waterQuality') {
                info.push("<div style=\"margin-top:10px; font-size:14px\"><table class=\"table table-bordered\">")
                info.push("<tr><td>溶解氧</td><td><span class=\"label " + getLabelCss(getStatusDesc(markerInfoOne.index_o2, waterQualityO2Scan.scan, '溶解氧').status) + "\">" + markerInfoOne.index_o2 + "mg/L</span></td></tr>");
                info.push("<tr><td>高锰酸钾浓度</td><td><span class=\"label " + getLabelCss(getStatusAsc(markerInfoOne.index_kmno4, waterQualityKmno4Scan.scan, '高锰酸钾').status) + "\">" + markerInfoOne.index_kmno4 + "mg/L</span></td></tr>");
                info.push("<tr><td>氨氮浓度</td><td><span class=\"label " + getLabelCss(getStatusAsc(markerInfoOne.index_nh4n, waterQualityNh4nScan.scan, '氨氮').status) + "\">" + markerInfoOne.index_nh4n + "mg/L</span></td></tr>");
                info.push("<tr><td>总磷浓度</td><td><span class=\"label " + getLabelCss(getStatusAsc(markerInfoOne.index_p, waterQualityPScan.scan, '总磷').status) + "\">" + markerInfoOne.index_p + "mg/L</span></td></tr>");
                info.push("<tr><td>水质状态</td><td><span class=\"label " + getLabelCss(markerInfoOne.monitor_status) + "\">" + getChineseStatus(markerInfoOne.monitor_status) + "</span></td></tr>");
                info.push("</table></div></div>");
            } else if (type == 'waterCondition') {
                info.push("<div style=\"margin-top:10px; font-size:14px\"><table class=\"table table-bordered\">")
                info.push("<tr><td>闸上水位</td><td><span class=\"label " + getLabelCss(WaterConditionStatusUpLevel(markerInfoOne.index_levelUp).status) + "\">" + markerInfoOne.index_levelUp + "m</span></td></tr>");
                info.push("<tr><td>闸下水位</td><td><span class=\"label " + getLabelCss(WaterConditionStatusDownLevel(markerInfoOne.index_levelDown).status) + "\">" + markerInfoOne.index_levelDown + "m</span></td></tr>");
                info.push("<tr><td>水质状态</td><td><span class=\"label " + getLabelCss(markerInfoOne.monitor_status) + "\">" + getChineseStatus(markerInfoOne.monitor_status) + "</span></td></tr>");
                info.push("</table></div></div>");
            } else if (type == 'waterPollution') {
                info.push("<div style=\"margin-top:10px; font-size:14px\"><table class=\"table table-bordered\">")
                info.push("<tr><td>排放量</td><td><span class=\"label " + getLabelCss(WasteWaterStatusDischarge(markerInfoOne.index_discharge).status) + "\">" + (markerInfoOne.index_discharge[1]).toFixed(2) + "吨</span></td></tr>");
                info.push("<tr><td>COD浓度</td><td><span class=\"label " + getLabelCss(getStatusAsc(markerInfoOne.index_cod, waterPollutionCodScan.scan, 'COD浓度').status) + "\">" + (markerInfoOne.index_cod).toFixed(2) + "mg/L</span></td></tr>");
                info.push("<tr><td>氨氮浓度</td><td><span class=\"label " + getLabelCss(getStatusAsc(markerInfoOne.index_nh4n, waterPollutionNh4nScan.scan, '氨氮浓度').status) + "\">" + (markerInfoOne.index_nh4n).toFixed(2) + "mg/L</span></td></tr>");
                info.push("<tr><td>总磷浓度</td><td><span class=\"label " + getLabelCss(getStatusAsc(markerInfoOne.index_p, waterPollutionPScan.scan, '总磷浓度').status) + "\">" + (markerInfoOne.index_p).toFixed(2) + "mg/L</span></td></tr>");
                info.push("<tr><td>水质状态</td><td><span class=\"label " + getLabelCss(markerInfoOne.monitor_status) + "\">" + getChineseStatus(markerInfoOne.monitor_status) + "</span></td></tr>");
                info.push("</table></div></div>");
            }
            var infoWindow = new AMap.InfoWindow({
                content: info.join(""), //使用默认信息窗体框样式，显示信息内容
                offset: new AMap.Pixel(16, -45)
            });
            infoWindow.open(mapObj, markerTemp.getPosition());
            AMap.event.addListener(markerTemp, 'click', function() { //鼠标点击marker弹出自定义的信息窗体
                infoWindow.open(mapObj, markerTemp.getPosition());
            });
        })(marker);
        marker.setMap(mapObj); // 在地图上添加点
    };
    function removeMarker() {
        mapObj.clearMap();
    };
    //水质量 http请求后处理过程（即http.success(function(data))中的function)
    var waterQualityCurrentSuccess = function(data) {
        //地图初始化，无法在函数外初始化（暂时没搞懂）
        if (data.data.length == 0) return null;
        waterQualityCurrentArr = [];
        waterQualityMarkerArr = [];
        var hourOne = data.data[0].hour;
        //取每四小时的最大值
        for (var i = 0; i < data.data.length / 24; i++) {
            var index_o2List = [];
            var index_kmno4List = [];
            var index_nh4nList = [];
            var index_pList = [];
            for (var j = 0; j < 6; j++) {
                var index_o2Max4 = 0;
                var index_kmon4Max4 = 0;
                var index_nh4nMax4 = 0;
                var index_pMax4 = 0;
                for (var k = 0; k < 4; k++) {
                    if (parseFloat(data.data[i * 24 + j * 4 + k].o2) > index_o2Max4) index_o2Max4 = parseFloat(data.data[i * 24 + j * 4 + k].o2);
                    if (parseFloat(data.data[i * 24 + j * 4 + k].kmno4) > index_kmon4Max4) index_kmon4Max4 = parseFloat(data.data[i * 24 + j * 4 + k].kmno4);
                    if (parseFloat(data.data[i * 24 + j * 4 + k].nh4n) > index_nh4nMax4) index_nh4nMax4 = parseFloat(data.data[i * 24 + j * 4 + k].nh4n);
                    if (parseFloat(data.data[i * 24 + j * 4 + k].p) > index_pMax4) index_pMax4 = parseFloat(data.data[i * 24 + j * 4 + k].p);
                }
                index_o2List.push(index_o2Max4);
                index_kmno4List.push(index_kmon4Max4);
                index_nh4nList.push(index_nh4nMax4);
                index_pList.push(index_pMax4);
            }
            waterQualityCurrentArr.push({
                monitor: data.data[i * 24].waterMonitor.name,
                point: data.data[i * 24].waterMonitor.description,
                abbr: data.data[i * 24].waterMonitor.abbr,
                dictid: data.data[i * 24].waterMonitor.id,
                index_o2List: index_o2List,
                index_kmno4List: index_kmno4List,
                index_nh4nList: index_nh4nList,
                index_pList: index_pList,
            });
        }
        for (var i = 0; i < waterQualityCurrentArr.length; i++) {
            var waterQualityTempOne = {
                o2: waterQualityCurrentArr[i].index_o2List[5],
                kmno4: waterQualityCurrentArr[i].index_kmno4List[5],
                nh4n: waterQualityCurrentArr[i].index_nh4nList[5],
                p: waterQualityCurrentArr[i].index_pList[5],
            };
            if(waterQualityFilter(waterQualityCurrentArr[i].dictid))
                waterQualityMarkerArr.push({
                    monitor: waterQualityCurrentArr[i].monitor,
                    point: waterQualityCurrentArr[i].point,
                    abbr: waterQualityCurrentArr[i].abbr,
                    dictid: waterQualityCurrentArr[i].dictid,
                    color: getStatusColor(getWaterQualityMonitorStatus(waterQualityTempOne)),
                    index_o2: waterQualityTempOne.o2,
                    index_kmno4: waterQualityTempOne.kmno4,
                    index_nh4n: waterQualityTempOne.nh4n,
                    index_p: waterQualityTempOne.p,
                    monitor_status: getWaterQualityMonitorStatus(waterQualityTempOne)
                });
        }
        //水质量表格列表数据
        $scope.waterQualityMarkerList = waterQualityMarkerArr;
        //水质量超标数据以及列表数据
        waterQualityMarkerArr2 = getWaterQualityFailArr(waterQualityMarkerArr);
        $scope.waterQualityMarkerList2 = waterQualityMarkerArr2;
        //超标水质监测点个数统计
        $scope.waterQualityMonitorStatusCount = getWaterQualityMonitorStatusCount(waterQualityMarkerArr);
    };
    //获取水质监测点异常个数
    function getWaterQualityMonitorStatusCount(waterQualityMarker) {
        var countResult = {
            accept: 0,
            caution: 0,
            take_action: 0,
            invalid: 0
        }
        for (var i = 0; i < waterQualityMarker.length; i++) {
            if (waterQualityMarker[i].monitor_status == 'caution') countResult.caution += 1;
            else if (waterQualityMarker[i].monitor_status == 'take_action') countResult.take_action += 1;
            else if (waterQualityMarker[i].monitor_status == 'accept') countResult.accept += 1;
            else countResult.invalid += 1;
        }
        var result = {
            accept: countResult.accept,
            fail: (countResult.caution + countResult.take_action),
            invalid: countResult.invalid
        };
        return result;
    };
    //获取水质监测点超标列表
    function getWaterQualityFailArr(waterQualityMarkerArr) {
        var result = [];
        for (var i = 0; i < waterQualityMarkerArr.length; i++) {
            // if (waterQualityMarkerArr[i].monitor_status == 'caution' || waterQualityMarkerArr[i].monitor_status == 'take_action') {
            result.push(waterQualityMarkerArr[i]);
            // }
        }
        return result;
    };
    //水质量 监测站状态获取
    function getWaterQualityMonitorStatus(waterQualityMarkerOne) {
        var indexStatusList = {
            o2Status: getStatusDesc(waterQualityMarkerOne.o2, waterQualityO2Scan.scan, '溶解氧').status,
            kmno4Status: getStatusAsc(waterQualityMarkerOne.kmno4, waterQualityKmno4Scan.scan, '高锰酸钾').status,
            nh4nStatus: getStatusAsc(waterQualityMarkerOne.nh4n, waterQualityNh4nScan.scan, '氨氮').status,
            pStatus: getStatusAsc(waterQualityMarkerOne.p, waterQualityPScan.scan, '总磷').status,
        };
        var statusList = [];
        angular.forEach(indexStatusList, function(value, key) {
            this.push(value);
        }, statusList);
        var countResult = {
            accept: 0,
            caution: 0,
            take_action: 0,
            invalid: 0
        }
        for (var i = 0; i < statusList.length; i++) {
            if (statusList[i] == 'accept') countResult.accept += 1;
            else if (statusList[i] == 'caution') countResult.caution += 1;
            else if (statusList[i] == 'take_action') countResult.take_action += 1;
            else if (statusList[i] == 'invalid') countResult.invalid += 1;
        }
        if (countResult.take_action >= 1) return 'take_action';
        else if (countResult.caution >= 1) return 'caution';
        else if (countResult.accept == statusList.length) return 'accept';
        else return 'invalid';
    };
    function waterQualityFilter(id){
        for(var i=0;i<waterQualityPredict.length;i++){
            if(id == waterQualityPredict[i]) return true;
        }
        return false;
    };
    //废水排放 http请求后处理过程（即http.success(function(data))中的function)
    var wasteWaterCurrentSuccess = function(data) {
        if (data.data.length == 0) return null;
        var wasteWaterMarkerAllTemp = [];
        wasteWaterMarkerCurrentAllArr = wasteWaterCurrentAllGet(data);
        for (var i = 0; i < wasteWaterMarkerCurrentAllArr.length; i++) {
            wasteWaterMarkerAllTemp.push({
                monitor: wasteWaterMarkerCurrentAllArr[i].wasteSource,
                point: wasteWaterMarkerCurrentAllArr[i].point,
                abbr: wasteWaterMarkerCurrentAllArr[i].abbr,
                dictid: wasteWaterMarkerCurrentAllArr[i].dictid,
                color: getStatusColor(getWasteWaterMonitorStatus(wasteWaterMarkerCurrentAllArr[i])),
                monitor_status: getWasteWaterMonitorStatus(wasteWaterMarkerCurrentAllArr[i]),
                index_discharge: wasteWaterMarkerCurrentAllArr[i].index_discharge.slice(4),
                index_cod: wasteWaterMarkerCurrentAllArr[i].index_cod[5],
                index_nh4n: wasteWaterMarkerCurrentAllArr[i].index_nh4n[5],
                index_p: wasteWaterMarkerCurrentAllArr[i].index_p[5]
            });
        }
        wasteWaterMarkerArrAll = wasteWaterMarkerAllTemp;
        //废水排放表格列表数据
        $scope.wasteWaterMarkerList = wasteWaterMarkerArrAll;
    };
    //废水排放抽出所有污染源最近六天的数据
    function wasteWaterCurrentAllGet(data) {
        var wasteWaterTemp = [];
        for (var i = 0; i < data.data.length / 6; i++) {
            var index_dischargeList = [];
            var index_codList = [];
            var index_nh4nList = [];
            var index_pList = [];
            for (var j = 0; j < 6; j++) {
                index_dischargeList.push(parseFloat(data.data[i * 6 + j].discharge));
                index_codList.push(parseFloat(data.data[i * 6 + j].cod));
                index_nh4nList.push(parseFloat(data.data[i * 6 + j].nh4n));
                index_pList.push(parseFloat(data.data[i * 6 + j].p));
            }
            wasteWaterTemp.push({
                wasteSource: data.data[i * 6].waterPollutionSource.name,
                point: data.data[i * 6].waterPollutionSource.description,
                abbr: data.data[i * 6].waterPollutionSource.abbr,
                dictid: data.data[i * 6].waterPollutionSource.id,
                index_discharge: index_dischargeList,
                index_cod: index_codList,
                index_nh4n: index_nh4nList,
                index_p: index_pList
            });
        }

        function sortWaterPollution(a, b) {
            return b.index_discharge[5] - a.index_discharge[5];
        }
        wasteWaterTemp.sort(sortWaterPollution);
        return wasteWaterTemp;
    };
    //废水排放 监测点状态获取
    function getWasteWaterMonitorStatus(wasteWaterMarkerArrOne) {
        var indexStatusList = {
            index_discharge: WasteWaterStatusDischarge(wasteWaterMarkerArrOne.index_discharge.slice(4)).status,
            index_cod: getStatusAsc(wasteWaterMarkerArrOne.index_cod[5], waterPollutionCodScan.scan, 'COD浓度').status,
            index_nh4n: getStatusAsc(wasteWaterMarkerArrOne.index_nh4n[5], waterPollutionNh4nScan.scan, '氨氮浓度').status,
            index_p: getStatusAsc(wasteWaterMarkerArrOne.index_p[5], waterPollutionPScan.scan, '总磷浓度').status,
        };
        var statusList = [];
        angular.forEach(indexStatusList, function(value, key) {
            this.push(value);
        }, statusList);
        var countResult = {
            accept: 0,
            caution: 0,
            take_action: 0,
            invalid: 0
        }
        for (var i = 0; i < statusList.length; i++) {
            if (statusList[i] == 'accept') countResult.accept += 1;
            else if (statusList[i] == 'caution') countResult.caution += 1;
            else if (statusList[i] == 'take_action') countResult.take_action += 1;
            else if (statusList[i] == 'invalid') countResult.invalid += 1;
        }
        if (countResult.take_action >= 1) return 'take_action';
        else if (countResult.caution >= 1) return 'caution';
        else if (countResult.accept == statusList.length) return 'accept';
        else return 'invalid';
    };
    //废水排放 废水排放量 指标状态获取
    function WasteWaterStatusDischarge(data) {
        if ((data[1] - data[0]) / data[0] <= waterPollutionDischargeScan.scan[0] && data[1] != 0) {
            return {
                status: "accept",
                sentence: "废水排放量优良"
            }
        } else if ((data[1] - data[0]) / data[0] <= waterPollutionDischargeScan.scan[1] && (data[1] - data[0]) / data[0] > waterPollutionDischargeScan.scan[0] && data[1] != 0) {
            return {
                status: "caution",
                sentence: "废水排放量增长一般"
            }
        } else if (((data[1] - data[0]) / data[0]) > waterPollutionDischargeScan.scan[1] && data[1] != 0) {
            return {
                status: "take_action",
                sentence: "废水排放量增长迅速"
            }
        } else {
            return {
                status: "invalid",
                sentence: "废水排放量 无数据"
            }
        }
    };
    //抽出和水质监测点相关的废水排放点集
    function getRelatedWasteWaterList(waterQualityMarkerArrOne, wasteWaterMarkerArr) {
        var dictid = waterQualityMarkerArrOne.dictid;
        var relatedWaterWaterIdList = [];
        var result = [];
        for (var i = 0; i < relationMonitorId.length; i++) {
            if (dictid == relationMonitorId[i].waterQuality) relatedWaterWaterIdList = relationMonitorId[i].wasteWaterList;
        }
        for (var j = 0; j < wasteWaterMarkerArr.length; j++) {
            for (var k = 0; k < relatedWaterWaterIdList.length; k++) {
                if (wasteWaterMarkerArr[j].dictid == relatedWaterWaterIdList[k]) {
                    result.push(wasteWaterMarkerArr[j]);
                }
            }
        }
        return result;
    };
    //右边按钮点击控制区块的出现和消失
    $scope.btn_waterEnvironmentAnalysisAllList = function() {
        $scope.tableStatus = {
            allWaterQualityArr: false,
            allWaterQualityFailArr: true,
            allWaterQualityFailArrNav: true,
            allWaterQualityElementsArr: false,
            predictionZone: false
        };
        removeMarker();
        addMarker(waterQualityMarkerArr2, '/assets/images/environment/marker_sprite.png', 'waterQuality');
        mapObj.setFitView();
    };
    $scope.btn_waterEnvironmentAnalysisElementsList = function(waterQualityMarkerArrOne) {
        $scope.tableStatus = {
            allWaterQualityArr: false,
            allWaterQualityFailArr: false,
            allWaterQualityFailArrNav: true,
            allWaterQualityElementsArr: true,
            predictionZone: false
        };
        removeMarker();
        $scope.waterQualityAnalysisMarker = waterQualityMarkerArrOne;
        $scope.wasteWaterAnalysisMarker = getRelatedWasteWaterList(waterQualityMarkerArrOne, wasteWaterMarkerArrAll);
        addMarker($scope.wasteWaterAnalysisMarker, '/assets/images/environment/factory.png', 'waterPollution');
        addMarkerOneAnalysis(waterQualityMarkerArrOne, '/assets/images/environment/marker_sprite.png', 'waterQuality');
        mapObj.setFitView();
        // mapObj.zoomIn();
        // mapObj.zoomOut();
        // mapObj.zoomOut();
    };
    $scope.btn_waterEnvironmentAllList = function() {
        $scope.tableStatus = {
            allWaterQualityArr: true,
            allWaterQualityFailArr: false,
            allWaterQualityFailArrNav: false,
            allWaterQualityElementsArr: false,
            predictionZone: false
        };
        removeMarker();
        addMarker(waterQualityMarkerArr, '/assets/images/environment/marker_sprite.png', 'waterQuality');
        mapObj.setFitView();
    };
    function transferWaterPollutions(wasteWaterAnalysisModelArr) {
        var result = [];
        for (var i = 0; i < wasteWaterAnalysisModelArr.length; i++) {
            result.push({
                dictid: wasteWaterAnalysisModelArr[i].dictid,
                monitor: wasteWaterAnalysisModelArr[i].monitor,
                index_discharge: wasteWaterAnalysisModelArr[i].dischargeValue * wasteWaterAnalysisModelArr[i].dischargeChange / 100,
                index_cod: wasteWaterAnalysisModelArr[i].codValue * wasteWaterAnalysisModelArr[i].codChange / 100,
                index_nh4n: wasteWaterAnalysisModelArr[i].nh4nValue * wasteWaterAnalysisModelArr[i].nh4nChange / 100,
                index_p: wasteWaterAnalysisModelArr[i].pValue * wasteWaterAnalysisModelArr[i].pChange / 100
            });
        }
        return result;
    };
    //获取颜色
    function getStatusColor(status) {
        if (status == 'accept') return '#66CC66';
        else if (status == 'caution') return '#66CC66';
        else if (status == 'take_action') return '#66CC66';
        else return '#AAAAAA';
    };
    //获取标签颜色
    function getLabelCss(status) {
        if (status == 'accept') {
            return 'label label-success';
        } else if (status == 'caution') {
            return 'label label-warning';
        } else if (status == 'take_action') {
            return 'label label-danger';
        } else {
            return 'label label-default';
        }
    };
    $scope.getLabelCss = function(status) {
        if (status == 'accept') {
            return 'label label-success';
        } else if (status == 'caution') {
            return 'label label-warning';
        } else if (status == 'take_action') {
            return 'label label-danger';
        } else {
            return 'label label-default';
        }
    };
    //数值越大，越严重
    function getStatusAsc(data1, scan, indexName) {
        var data = parseFloat(data1);
        if (data <= scan[0] && data > 0) {
            return {
                status: 'accept',
                sentence: indexName + '≤' + scan[0] + ',优良'
            }
        } else if (data > scan[0] && data <= scan[1]) {
            return {
                status: 'caution',
                sentence: scan[0] + '≤' + indexName + '≤' + scan[1] + ',轻度污染'
            }
        } else if (data > scan[1]) {
            return {
                status: 'take_action',
                sentence: indexName + '>' + scan[1] + ',严重污染'
            }
        } else if (data == 0) {
            return {
                status: 'invalid',
                sentence: indexName + ': 无数据'
            }
        }
    };
    $scope.getStatusAsc = function(data1, scan, indexName) {
        var data = parseFloat(data1);
        if (data <= scan[0] && data > 0) {
            return {
                status: 'accept',
                sentence: indexName + '≤' + scan[0] + ',优良'
            }
        } else if (data > scan[0] && data <= scan[1]) {
            return {
                status: 'caution',
                sentence: scan[0] + '≤' + indexName + '≤' + scan[1] + ',轻度污染'
            }
        } else if (data > scan[1]) {
            return {
                status: 'take_action',
                sentence: indexName + '>' + scan[1] + ',严重污染'
            }
        } else if (data == 0) {
            return {
                status: 'invalid',
                sentence: indexName + ': 无数据'
            }
        }
    };
    //数值越小，越严重
    function getStatusDesc(data1, scan, indexName) {
        var data = parseFloat(data1);
        if (data >= scan[0]) {
            return {
                status: 'accept',
                sentence: indexName + '≥' + scan[0] + ',优良'
            }
        } else if (data < scan[0] && data >= scan[1]) {
            return {
                status: 'caution',
                sentence: scan[1] + '≤' + indexName + '≤' + scan[0] + ',轻度污染'
            }
        } else if (data < scan[1] && data > 0) {
            return {
                status: 'take_action',
                sentence: indexName + '<' + scan[1] + ',严重污染'
            }
        } else if (data == 0) {
            return {
                status: 'invalid',
                sentence: indexName + ': 无数据'
            }
        }
    };
    $scope.getStatusDesc = function(data1, scan, indexName) {
        var data = parseFloat(data1);
        if (data >= scan[0]) {
            return {
                status: 'accept',
                sentence: indexName + '≥' + scan[0] + ',优良'
            }
        } else if (data < scan[0] && data >= scan[1]) {
            return {
                status: 'caution',
                sentence: scan[1] + '≤' + indexName + '≤' + scan[0] + ',轻度污染'
            }
        } else if (data < scan[1] && data > 0) {
            return {
                status: 'take_action',
                sentence: indexName + '<' + scan[1] + ',严重污染'
            }
        } else if (data == 0) {
            return {
                status: 'invalid',
                sentence: indexName + ': 无数据'
            }
        }
    };
    //得到中文状态名称
    function getChineseStatus(status) {
        if (status == 'accept') {
            return '优良';
        } else if (status == 'caution') {
            return '轻度污染';
        } else if (status == 'take_action') {
            return '严重污染';
        } else {
            return '无数据';
        }
    };
    $scope.getChineseStatusView = function(status) {
        if (status == 'accept') {
            return '优良';
        } else if (status == 'caution') {
            return '轻度污染';
        } else if (status == 'take_action') {
            return '严重污染';
        } else {
            return '无数据';
        }
    };
    //--------------------------盒子3结束--------------------------
};