export default ($scope, $rootScope, qService, environmentRes, $timeout) => {
    'ngInject';
    $scope.windowHeight=$(window).height();
    //---------------------------airQualityGetPromise-----------------------------
    var airQualityGetParams = {
        // 'id':1,
    };
    var airQualityGetHeaders = {

    };
    $rootScope.loading=true;
    var airQualityGetPromise = qService.httpGetWithToken(environmentRes.getAirQuality, airQualityGetParams, airQualityGetHeaders);
    airQualityGetPromise.then(function(data){
        // console.log(data.data);
        //盒子2的Highcharts的日期,若今日是6月8日,box2Date就是6月1日~6月7日
        $scope.box2Date=data.data[0];
        //盒子2的右侧的日期
        $scope.box2Today=data.data[1];
        //盒子4的右侧的日期
        $scope.box4Today=data.data[2];
        //盒子2的左侧的Highcharts中的过去七天AQI数值
        $scope.box2AQI=data.data[3];
        //盒子2右侧、盒子4的右侧的实时空气质量
        $scope.box24Index=data.data[4];
        //盒子2右侧的AQI级别
        $scope.airQualityLevel=data.data[5];
        //盒子2右侧的对健康影响
        $scope.healthEffect=data.data[6];
        //盒子2右侧的建议措施
        $scope.proposedMeasure=data.data[7];
        //盒子4左侧的Highcharts图表的数据
        $scope.box4Left=data.data[8];
        //--------------------------盒子4----------------------------
        //盒子4左侧Highcharts图表
        //gauge仪表盘绿黄红变色范围
        var airQualityAQIScan = {
            scan: [100,300],
            type: 'asc'
        };
        var airQualityPM25Scan = {
            scan:[75,115],
            type: 'asc'
        };
        var airQualityPM10Scan = {
            scan:[150,250],
            type: 'asc'
        };
        var airQualitySo2Scan = {
            scan: [150,500],
            type: 'asc'
        };
        var airQualityNo2Scan = {
            scan:[80,180],
            type: 'asc'
        };
        var airQualityCoScan = {
            scan:[4,14],
            type: 'asc'
        };
        var airQualityO3Scan = {
            scan:[160,200],
            type: 'asc'
        };
        $scope.airQualityOptions = {
            //AQI仪表图
            aqiOption:{
                options : {
                    chart: {
                        type: 'gauge',
                        plotBackgroundColor: null,
                        plotBackgroundImage: null,
                        plotBorderWidth: 0,
                        plotShadow: false,
                        width:200
                    },
                    exporting: {
                        enabled:false
                    },
                    title: {
                        text: 'AQI',
                        y:40,
                        style:{
                            fontFamily:'微软雅黑'
                        }
                    },
                    pane: {
                        startAngle: -150,
                        endAngle: 150,
                        background: [{
                            backgroundColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, '#FFF'],
                                    [1, '#333']
                                ]
                            },
                            borderWidth: 0,
                            outerRadius: '109%'
                        }, {
                            backgroundColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, '#333'],
                                    [1, '#FFF']
                                ]
                            },
                            borderWidth: 1,
                            outerRadius: '107%'
                        }, {
                            // default background
                        }, {
                            backgroundColor: '#DDD',
                            borderWidth: 0,
                            outerRadius: '105%',
                            innerRadius: '103%'
                        }]
                    },
                    // the value axis
                    yAxis: {
                        min: 0,
                        max: 400,
                        minorTickInterval: 'auto',
                        minorTickWidth: 1,
                        minorTickLength: 10,
                        minorTickPosition: 'inside',
                        minorTickColor: '#666',
                        tickPixelInterval: 30,
                        tickWidth: 2,
                        tickPosition: 'inside',
                        tickLength: 10,
                        tickColor: '#666',
                        labels: {
                            step: 2,
                            rotation: 'auto'
                        },
                        title: {
                            text: ''
                        },
                        plotBands: [{
                            from: 0,
                            to: airQualityAQIScan.scan[0],
                            color: '#55BF3B' // green
                        }, {
                            from: airQualityAQIScan.scan[0],
                            to: airQualityAQIScan.scan[1],
                            color: '#DDDF0D' // yellow
                        }, {
                            from: airQualityAQIScan.scan[1],
                            to: 400,
                            color: '#DF5353' // red
                        }]
                    },
                    credits: {
                        enabled: false
                    }
                },
                series: [{
                    name: 'AQI',
                    data: [$scope.box4Left[11].aqi],
                    // data: [65],
                    tooltip: {
                        valueSuffix: ''
                    }
                }],
            },
            //AQI折线图
            currentAqiLineOption:{
                options:{
                    chart: {
                        height:250
                    },
                    exporting: {
                        enabled:false
                    },
                    title: {
                        text: null,
                    },
                    xAxis: {
                        categories: ['22时','23时','0时','1时','2时','3时','4时','5时','6时','7时','8时','9时'],
                        tickmarkPlacement: 'on'
                    },
                    yAxis: {
                        title: {
                            text: ''
                        },
                        min:0,
                        max:310,
                        plotLines : [{
                            color: '#DF5353',
                            width: 2,
                            value: 300,
                            dashStyle: 'Dash',
                            label:{
                                text:'严重污染',
                                align:'left',
                                x:10,
                                style: {
                                    fontSize: '8px',
                                    fontWeight: 200
                                }
                            }
                        },{
                            color: '#DDDF0D',
                            width: 2,
                            value: 100,
                            dashStyle: 'Dash',
                            label:{
                                text:'轻度污染',
                                align:'left',
                                x:10,
                                style: {
                                    fontSize: '8px',
                                    fontWeight: 200
                                }
                            }
                        }]
                    },
                    tooltip: {
                        valueSuffix: ''
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions:{
                        series: {
                            cursor: 'pointer',
                            events: {
                                click: function (event) {
                                    $scope.$apply(function(){
                                        $scope.airQualityOptions.aqiOption.series[0].data = [event.point.y];
                                    });
                                }
                            }
                        }
                    },
                    credits: {
                        enabled: false
                    }
                },
                series: [{
                    name: 'AQI',
                    data: [$scope.box4Left[0].aqi,$scope.box4Left[1].aqi,$scope.box4Left[2].aqi,$scope.box4Left[3].aqi,$scope.box4Left[4].aqi,$scope.box4Left[5].aqi,$scope.box4Left[6].aqi,$scope.box4Left[7].aqi,$scope.box4Left[8].aqi,$scope.box4Left[9].aqi,$scope.box4Left[10].aqi,$scope.box4Left[11].aqi]
                    // data: [100, 120, 150, 80, 110, 90, 100, 120, 150, 80, 110, 90]
                }],
            },
            //PM2.5仪表图
            pm25Option:{
                options:{
                    chart: {
                        type: 'gauge',
                        plotBackgroundColor: null,
                        plotBackgroundImage: null,
                        plotBorderWidth: 0,
                        plotShadow: false,
                        width:200
                    },
                    exporting: {
                        enabled:false
                    },
                    title: {
                        text: 'PM2.5',
                        y:40,
                        style:{
                            fontFamily:'微软雅黑'
                        }
                    },
                    pane: {
                        startAngle: -150,
                        endAngle: 150,
                        background: [{
                            backgroundColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, '#FFF'],
                                    [1, '#333']
                                ]
                            },
                            borderWidth: 0,
                            outerRadius: '109%'
                        }, {
                            backgroundColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, '#333'],
                                    [1, '#FFF']
                                ]
                            },
                            borderWidth: 1,
                            outerRadius: '107%'
                        }, {
                            // default background
                        }, {
                            backgroundColor: '#DDD',
                            borderWidth: 0,
                            outerRadius: '105%',
                            innerRadius: '103%'
                        }]
                    },
                    // the value axis
                    yAxis: {
                        min: 0,
                        max: 250,
                        minorTickInterval: 'auto',
                        minorTickWidth: 1,
                        minorTickLength: 10,
                        minorTickPosition: 'inside',
                        minorTickColor: '#666',
                        tickPixelInterval: 30,
                        tickWidth: 2,
                        tickPosition: 'inside',
                        tickLength: 10,
                        tickColor: '#666',
                        labels: {
                            step: 2,
                            rotation: 'auto'
                        },
                        title: {
                            text: ''
                        },
                        plotBands: [{
                            from: 0,
                            to: airQualityPM25Scan.scan[0],
                            color: '#55BF3B' // green
                        }, {
                            from: airQualityPM25Scan.scan[0],
                            to: airQualityPM25Scan.scan[1],
                            color: '#DDDF0D' // yellow
                        }, {
                            from: airQualityPM25Scan.scan[1],
                            to: 250,
                            color: '#DF5353' // red
                        }]
                    },
                    credits: {
                        enabled: false
                    }
                },
                series: [{
                    name: 'PM2.5',
                    data: [$scope.box4Left[11].pm25],
                    // data: [40],
                    tooltip: {
                        valueSuffix: ''
                    }
                }],
            },
            //PM2.5折线图
            currentPm25LineOption:{
                options:{
                    title: {
                        text: null,
                    },
                    exporting: {
                        enabled:false
                    },
                    xAxis: {
                        categories: ['22时','23时','0时','1时','2时','3时','4时','5时','6时','7时','8时','9时'],
                        tickmarkPlacement: 'on'
                    },
                    yAxis: {
                        title: {
                            text: 'μg/m³'
                        },
                        min:0,
                        max:250,
                        plotLines : [{
                            color: '#DDDF0D',
                            width: 2,
                            value: 75,
                            dashStyle: 'Dash',
                            label:{
                                text:'轻度污染',
                                align:'left',
                                x:10,
                                style: {
                                    fontSize: '8px',
                                    fontWeight: 200
                                }
                            }
                        },{
                            color: '#DF5353',
                            width: 2,
                            value: 150,
                            dashStyle: 'Dash',
                            label:{
                                text:'严重污染',
                                align:'left',
                                x:10,
                                style: {
                                    fontSize: '8px',
                                    fontWeight: 200
                                }
                            }
                        }]
                    },
                    tooltip: {
                        valueSuffix: 'μg/m³'
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions:{
                        series: {
                            cursor: 'pointer',
                            events: {
                                click: function (event) {
                                    $scope.$apply(function(){
                                        $scope.airQualityOptions.pm25Option.series[0].data = [event.point.y];
                                    });
                                }
                            }
                        }
                    },
                    credits: {
                        enabled: false
                    }
                },
                series: [{
                    name: 'PM2.5',
                    data: [$scope.box4Left[0].pm25,$scope.box4Left[1].pm25,$scope.box4Left[2].pm25,$scope.box4Left[3].pm25,$scope.box4Left[4].pm25,$scope.box4Left[5].pm25,$scope.box4Left[6].pm25,$scope.box4Left[7].pm25,$scope.box4Left[8].pm25,$scope.box4Left[9].pm25,$scope.box4Left[10].pm25,$scope.box4Left[11].pm25]
                    // data: [100, 120, 150, 80, 110, 90, 100, 120, 150, 80, 110, 90]
                }],
            },
            //PM10仪表图
            pm10Option:{
                options:{
                    chart: {
                        type: 'gauge',
                        plotBackgroundColor: null,
                        plotBackgroundImage: null,
                        plotBorderWidth: 0,
                        plotShadow: false,
                        width:200
                    },
                    exporting: {
                        enabled:false
                    },
                    title: {
                        text: 'PM10',
                        y:40,
                        style:{
                            fontFamily:'微软雅黑'
                        }
                    },
                    pane: {
                        startAngle: -150,
                        endAngle: 150,
                        background: [{
                            backgroundColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, '#FFF'],
                                    [1, '#333']
                                ]
                            },
                            borderWidth: 0,
                            outerRadius: '109%'
                        }, {
                            backgroundColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, '#333'],
                                    [1, '#FFF']
                                ]
                            },
                            borderWidth: 1,
                            outerRadius: '107%'
                        }, {
                            // default background
                        }, {
                            backgroundColor: '#DDD',
                            borderWidth: 0,
                            outerRadius: '105%',
                            innerRadius: '103%'
                        }]
                    },
                    // the value axis
                    yAxis: {
                        min: 0,
                        max: 400,
                        minorTickInterval: 'auto',
                        minorTickWidth: 1,
                        minorTickLength: 10,
                        minorTickPosition: 'inside',
                        minorTickColor: '#666',
                        tickPixelInterval: 30,
                        tickWidth: 2,
                        tickPosition: 'inside',
                        tickLength: 10,
                        tickColor: '#666',
                        labels: {
                            step: 2,
                            rotation: 'auto'
                        },
                        title: {
                            text: ''
                        },
                        plotBands: [{
                            from: 0,
                            to: airQualityPM10Scan.scan[0],
                            color: '#55BF3B' // green
                        }, {
                            from: airQualityPM10Scan.scan[0],
                            to: airQualityPM10Scan.scan[1],
                            color: '#DDDF0D' // yellow
                        }, {
                            from: airQualityPM10Scan.scan[1],
                            to: 400,
                            color: '#DF5353' // red
                        }]
                    },

                    credits: {
                        enabled: false
                    }
                },
                series: [{
                    name: 'PM10',
                    data: [$scope.box4Left[11].pm10],
                    // data: [36],
                    tooltip: {
                        valueSuffix: 'μg/m³'
                    }
                }],
            },
            //PM10折线图
            currentPm10LineOption:{
                options:{
                    title: {
                        text: null,
                    },
                    exporting: {
                        enabled:false
                    },
                    xAxis: {
                        categories: ['22时','23时','0时','1时','2时','3时','4时','5时','6时','7时','8时','9时'],
                        tickmarkPlacement: 'on'
                    },
                    yAxis: {
                        title: {
                            text: 'μg/m³'
                        },
                        min:0,
                        max:400,
                        plotLines : [{
                            color: '#DDDF0D',
                            width: 2,
                            value: 150,
                            dashStyle: 'Dash',
                            label:{
                                text:'轻度污染',
                                align:'left',
                                x:10,
                                style: {
                                    fontSize: '8px',
                                    fontWeight: 200
                                }
                            }
                        },{
                            color: '#DF5353',
                            width: 2,
                            value: 250,
                            dashStyle: 'Dash',
                            label:{
                                text:'严重污染',
                                align:'left',
                                x:10,
                                style: {
                                    fontSize: '8px',
                                    fontWeight: 200
                                }
                            }
                        }]
                    },
                    tooltip: {
                        valueSuffix: 'μg/m³'
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions:{
                        series: {
                            cursor: 'pointer',
                            events: {
                                click: function (event) {
                                    $scope.$apply(function(){
                                        $scope.airQualityOptions.pm10Option.series[0].data = [event.point.y];
                                    });
                                }
                            }
                        }
                    },
                    credits: {
                        enabled: false
                    }
                },
                series: [{
                    name: 'PM10',
                    data: [$scope.box4Left[0].pm10,$scope.box4Left[1].pm10,$scope.box4Left[2].pm10,$scope.box4Left[3].pm10,$scope.box4Left[4].pm10,$scope.box4Left[5].pm10,$scope.box4Left[6].pm10,$scope.box4Left[7].pm10,$scope.box4Left[8].pm10,$scope.box4Left[9].pm10,$scope.box4Left[10].pm10,$scope.box4Left[11].pm10]
                    // data: [100, 120, 150, 80, 110, 90, 100, 120, 150, 80, 110, 90]
                }],
            },
            //SO2仪表图
            so2Option:{
                options:{
                    chart: {
                        type: 'gauge',
                        plotBackgroundColor: null,
                        plotBackgroundImage: null,
                        plotBorderWidth: 0,
                        plotShadow: false,
                        width:200
                    },
                    exporting: {
                        enabled:false
                    },
                    title: {
                        text: '二氧化硫',
                        y:40,
                        style:{
                            fontFamily:'微软雅黑'
                        }
                    },
                    pane: {
                        startAngle: -150,
                        endAngle: 150,
                        background: [{
                            backgroundColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, '#FFF'],
                                    [1, '#333']
                                ]
                            },
                            borderWidth: 0,
                            outerRadius: '109%'
                        }, {
                            backgroundColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, '#333'],
                                    [1, '#FFF']
                                ]
                            },
                            borderWidth: 1,
                            outerRadius: '107%'
                        }, {
                            // default background
                        }, {
                            backgroundColor: '#DDD',
                            borderWidth: 0,
                            outerRadius: '105%',
                            innerRadius: '103%'
                        }]
                    },
                    // the value axis
                    yAxis: {
                        min: 0,
                        max: 700,

                        minorTickInterval: 'auto',
                        minorTickWidth: 1,
                        minorTickLength: 10,
                        minorTickPosition: 'inside',
                        minorTickColor: '#666',

                        tickPixelInterval: 30,
                        tickWidth: 2,
                        tickPosition: 'inside',
                        tickLength: 10,
                        tickColor: '#666',
                        labels: {
                            step: 2,
                            rotation: 'auto'
                        },
                        title: {
                            text: ''
                        },
                        plotBands: [{
                            from: 0,
                            to: airQualitySo2Scan.scan[0],
                            color: '#55BF3B' // green
                        }, {
                            from: airQualitySo2Scan.scan[0],
                            to: airQualitySo2Scan.scan[1],
                            color: '#DDDF0D' // yellow
                        }, {
                            from: airQualitySo2Scan.scan[1],
                            to: 700,
                            color: '#DF5353' // red
                        }]
                    },
                    credits: {
                        enabled: false
                    }
                },
                series: [{
                    name: '二氧化硫',
                    data: [$scope.box4Left[11].so2],
                    // data: [56],
                    tooltip: {
                        valueSuffix: 'μg/m³'
                    }
                }],
            },
            //SO2折线图
            currentSo2LineOption:{
                options:{
                    title: {
                        text: null,
                    },
                    exporting: {
                        enabled:false
                    },
                    xAxis: {
                        categories: ['22时','23时','0时','1时','2时','3时','4时','5时','6时','7时','8时','9时'],
                        tickmarkPlacement: 'on'
                    },
                    yAxis: {
                        title: {
                            text: 'μg/m³'
                        },
                        min:0,
                        max:700,
                        plotLines : [{
                            color: '#DDDF0D',
                            width: 2,
                            value: 150,
                            dashStyle: 'Dash',
                            label:{
                                text:'轻度污染',
                                align:'left',
                                x:10,
                                style: {
                                    fontSize: '8px',
                                    fontWeight: 200
                                }
                            }
                        },{
                            color: '#DF5353',
                            width: 2,
                            value: 475,
                            dashStyle: 'Dash',
                            label:{
                                text:'严重污染',
                                align:'left',
                                x:10,
                                style: {
                                    fontSize: '8px',
                                    fontWeight: 200
                                }
                            }
                        }]
                    },
                    tooltip: {
                        valueSuffix: 'μg/m³'
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions:{
                        series: {
                            cursor: 'pointer',
                            events: {
                                click: function (event) {
                                    $scope.$apply(function(){
                                        $scope.airQualityOptions.so2Option.series[0].data = [event.point.y];
                                    });
                                }
                            }
                        }
                    },
                    credits: {
                        enabled: false
                    }
                },
                series: [{
                    name: '二氧化硫',
                    data: [$scope.box4Left[0].so2,$scope.box4Left[1].so2,$scope.box4Left[2].so2,$scope.box4Left[3].so2,$scope.box4Left[4].so2,$scope.box4Left[5].so2,$scope.box4Left[6].so2,$scope.box4Left[7].so2,$scope.box4Left[8].so2,$scope.box4Left[9].so2,$scope.box4Left[10].so2,$scope.box4Left[11].so2]
                    // data: [100, 120, 150, 80, 110, 90, 100, 120, 150, 80, 110, 90]
                }],
            },
            //NO2仪表图
            no2Option:{
                options:{
                    chart: {
                        type: 'gauge',
                        plotBackgroundColor: null,
                        plotBackgroundImage: null,
                        plotBorderWidth: 0,
                        plotShadow: false,
                        width:200
                    },
                    exporting: {
                        enabled:false
                    },
                    title: {
                        text: '二氧化氮',
                        y:40,
                        style:{
                            fontFamily:'微软雅黑'
                        }
                    },
                    pane: {
                        startAngle: -150,
                        endAngle: 150,
                        background: [{
                            backgroundColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, '#FFF'],
                                    [1, '#333']
                                ]
                            },
                            borderWidth: 0,
                            outerRadius: '109%'
                        }, {
                            backgroundColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, '#333'],
                                    [1, '#FFF']
                                ]
                            },
                            borderWidth: 1,
                            outerRadius: '107%'
                        }, {
                            // default background
                        }, {
                            backgroundColor: '#DDD',
                            borderWidth: 0,
                            outerRadius: '105%',
                            innerRadius: '103%'
                        }]
                    },

                    // the value axis
                    yAxis: {
                        min: 0,
                        max: 280,

                        minorTickInterval: 'auto',
                        minorTickWidth: 1,
                        minorTickLength: 10,
                        minorTickPosition: 'inside',
                        minorTickColor: '#666',

                        tickPixelInterval: 30,
                        tickWidth: 2,
                        tickPosition: 'inside',
                        tickLength: 10,
                        tickColor: '#666',
                        labels: {
                            step: 2,
                            rotation: 'auto'
                        },
                        title: {
                            text: ''
                        },
                        plotBands: [{
                            from: 0,
                            to: airQualityNo2Scan.scan[0],
                            color: '#55BF3B' // green
                        }, {
                            from: airQualityNo2Scan.scan[0],
                            to: airQualityNo2Scan.scan[1],
                            color: '#DDDF0D' // yellow
                        }, {
                            from: airQualityNo2Scan.scan[1],
                            to: 280,
                            color: '#DF5353' // red
                        }]
                    },
                    credits: {
                        enabled: false
                    }
                },
                series: [{
                    name: '二氧化氮',
                    data: [$scope.box4Left[11].no2],
                    // data: [53],
                    tooltip: {
                        valueSuffix: 'μg/m³'
                    }
                }],
            },
            //NO2折线图
            currentNo2LineOption:{
                options:{
                    title: {
                        text: null,
                    },
                    exporting: {
                        enabled:false
                    },
                    xAxis: {
                        categories: ['22时','23时','0时','1时','2时','3时','4时','5时','6时','7时','8时','9时'],
                        tickmarkPlacement: 'on'
                    },
                    yAxis: {
                        title: {
                            text: 'μg/m³'
                        },
                        min:0,
                        max:280,
                        plotLines : [{
                            color: '#DDDF0D',
                            width: 2,
                            value: 80,
                            dashStyle: 'Dash',
                            label:{
                                text:'轻度污染',
                                align:'left',
                                x:10,
                                style: {
                                    fontSize: '8px',
                                    fontWeight: 200
                                }
                            }
                        },{
                            color: '#DF5353',
                            width: 2,
                            value: 180,
                            dashStyle: 'Dash',
                            label:{
                                text:'严重污染',
                                align:'left',
                                x:10,
                                style: {
                                    fontSize: '8px',
                                    fontWeight: 200
                                }
                            }
                        }]
                    },
                    tooltip: {
                        valueSuffix: 'μg/m³'
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions:{
                        series: {
                            cursor: 'pointer',
                            events: {
                                click: function (event) {
                                    $scope.$apply(function(){
                                        $scope.airQualityOptions.no2Option.series[0].data = [event.point.y];
                                    });
                                }
                            }
                        }
                    },
                    credits: {
                        enabled: false
                    }
                },
                series: [{
                    name: '二氧化氮',
                    data: [$scope.box4Left[0].no2,$scope.box4Left[1].no2,$scope.box4Left[2].no2,$scope.box4Left[3].no2,$scope.box4Left[4].no2,$scope.box4Left[5].no2,$scope.box4Left[6].no2,$scope.box4Left[7].no2,$scope.box4Left[8].no2,$scope.box4Left[9].no2,$scope.box4Left[10].no2,$scope.box4Left[11].no2]
                    // data: [100, 120, 150, 80, 110, 90, 100, 120, 150, 80, 110, 90]
                }],
            },
            //CO仪表图
            coOption:{
                options:{
                    chart: {
                        type: 'gauge',
                        plotBackgroundColor: null,
                        plotBackgroundImage: null,
                        plotBorderWidth: 0,
                        plotShadow: false,
                        width:200
                    },
                    exporting: {
                        enabled:false
                    },
                    title: {
                        text: '一氧化碳',
                        y:40,
                        style:{
                            fontFamily:'微软雅黑'
                        }
                    },
                    pane: {
                        startAngle: -150,
                        endAngle: 150,
                        background: [{
                            backgroundColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, '#FFF'],
                                    [1, '#333']
                                ]
                            },
                            borderWidth: 0,
                            outerRadius: '109%'
                        }, {
                            backgroundColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, '#333'],
                                    [1, '#FFF']
                                ]
                            },
                            borderWidth: 1,
                            outerRadius: '107%'
                        }, {
                            // default background
                        }, {
                            backgroundColor: '#DDD',
                            borderWidth: 0,
                            outerRadius: '105%',
                            innerRadius: '103%'
                        }]
                    },
                    // the value axis
                    yAxis: {
                        min: 0,
                        max: 24,
                        minorTickInterval: 'auto',
                        minorTickWidth: 1,
                        minorTickLength: 10,
                        minorTickPosition: 'inside',
                        minorTickColor: '#666',

                        tickPixelInterval: 30,
                        tickWidth: 2,
                        tickPosition: 'inside',
                        tickLength: 10,
                        tickColor: '#666',
                        labels: {
                            step: 2,
                            rotation: 'auto'
                        },
                        title: {
                            text: ''
                        },
                        plotBands: [{
                            from: 0,
                            to: airQualityCoScan.scan[0],
                            color: '#55BF3B' // green
                        }, {
                            from: airQualityCoScan.scan[0],
                            to: airQualityCoScan.scan[1],
                            color: '#DDDF0D' // yellow
                        }, {
                            from: airQualityCoScan.scan[1],
                            to: 24,
                            color: '#DF5353' // red
                        }]
                    },
                    credits: {
                        enabled: false
                    }
                },
                series: [{
                    name: '一氧化碳',
                    data: [$scope.box4Left[11].co],
                    // data: [12],
                    tooltip: {
                        valueSuffix: 'mg/m³'
                    }
                }],
            },
            //CO折线图
            currentCoLineOption:{
                options:{
                    title: {
                        text: null,
                    },
                    exporting: {
                        enabled:false
                    },
                    xAxis: {
                        categories: ['22时','23时','0时','1时','2时','3时','4时','5时','6时','7时','8时','9时'],
                        tickmarkPlacement: 'on'
                    },
                    yAxis: {
                        title: {
                            text: 'mg/m³'
                        },
                        min:0,
                        max:24,
                        plotLines : [{
                            color: '#DDDF0D',
                            width: 2,
                            value: 4,
                            dashStyle: 'Dash',
                            label:{
                                text:'轻度污染',
                                align:'left',
                                x:4,
                                style: {
                                    fontSize: '8px',
                                    fontWeight: 200
                                }
                            }
                        },{
                            color: '#DF5353',
                            width: 2,
                            value: airQualityCoScan.scan[1],
                            dashStyle: 'Dash',
                            label:{
                                text:'严重污染',
                                align:'left',
                                x:14,
                                style: {
                                    fontSize: '8px',
                                    fontWeight: 200
                                }
                            }

                        }]
                    },
                    tooltip: {
                        valueSuffix: 'mg/m³'
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions:{
                        series: {
                            cursor: 'pointer',
                            events: {
                                click: function (event) {
                                    $scope.$apply(function(){
                                        $scope.airQualityOptions.coOption.series[0].data = [event.point.y];
                                    });
                                }
                            }
                        }
                    },
                    credits: {
                        enabled: false
                    }
                },
                series: [{
                    name: '一氧化碳',
                    data: [$scope.box4Left[0].co,$scope.box4Left[1].co,$scope.box4Left[2].co,$scope.box4Left[3].co,$scope.box4Left[4].co,$scope.box4Left[5].co,$scope.box4Left[6].co,$scope.box4Left[7].co,$scope.box4Left[8].co,$scope.box4Left[9].co,$scope.box4Left[10].co,$scope.box4Left[11].co]
                    // data: [10, 12, 15, 8, 11, 9, 10, 12, 15, 8, 11, 9]
                }],
            },
            //O3仪表图
            o3Option:{
                options:{
                    chart: {
                        type: 'gauge',
                        plotBackgroundColor: null,
                        plotBackgroundImage: null,
                        plotBorderWidth: 0,
                        plotShadow: false,
                        width:200
                    },
                    exporting: {
                        enabled:false
                    },
                    title: {
                        text: '臭氧',
                        y:40,
                        style:{
                            fontFamily:'微软雅黑'
                        }
                    },
                    pane: {
                        startAngle: -150,
                        endAngle: 150,
                        background: [{
                            backgroundColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, '#FFF'],
                                    [1, '#333']
                                ]
                            },
                            borderWidth: 0,
                            outerRadius: '109%'
                        }, {
                            backgroundColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, '#333'],
                                    [1, '#FFF']
                                ]
                            },
                            borderWidth: 1,
                            outerRadius: '107%'
                        }, {
                            // default background
                        }, {
                            backgroundColor: '#DDD',
                            borderWidth: 0,
                            outerRadius: '105%',
                            innerRadius: '103%'
                        }]
                    },
                    // the value axis
                    yAxis: {
                        min: 0,
                        max: 300,
                        minorTickInterval: 'auto',
                        minorTickWidth: 1,
                        minorTickLength: 10,
                        minorTickPosition: 'inside',
                        minorTickColor: '#666',
                        tickPixelInterval: 30,
                        tickWidth: 2,
                        tickPosition: 'inside',
                        tickLength: 10,
                        tickColor: '#666',
                        labels: {
                            step: 2,
                            rotation: 'auto'
                        },
                        title: {
                            text: ''
                        },
                        plotBands: [{
                            from: 0,
                            to: airQualityO3Scan.scan[0],
                            color: '#55BF3B' // green
                        }, {
                            from: airQualityO3Scan.scan[0],
                            to: airQualityO3Scan.scan[1],
                            color: '#DDDF0D' // yellow
                        }, {
                            from: airQualityO3Scan.scan[1],
                            to: 300,
                            color: '#DF5353' // red
                        }]
                    },
                    credits: {
                        enabled: false
                    }
                },
                series: [{
                    name: '臭氧',
                    data: [$scope.box4Left[11].o3],
                    // data: [30],
                    tooltip: {
                        valueSuffix: 'μg/m³'
                    }
                }],
            },
            //O3折线图
            currentO3LineOption:{
                options:{
                    title: {
                        text: null,
                    },
                    exporting: {
                        enabled:false
                    },
                    xAxis: {
                        categories: ['22时','23时','0时','1时','2时','3时','4时','5时','6时','7时','8时','9时'],
                        tickmarkPlacement: 'on'
                    },
                    yAxis: {
                        title: {
                            text: 'μg/m³'
                        },
                        min:0,
                        max:300,
                        plotLines : [{
                            color: '#DDDF0D',
                            width: 2,
                            value: 160,
                            dashStyle: 'Dash',
                            label:{
                                text:'轻度污染',
                                align:'left',
                                x:10,
                                style: {
                                    fontSize: '8px',
                                    fontWeight: 200
                                }
                            }
                        },{
                            color: '#DF5353',
                            width: 2,
                            value: 215,
                            dashStyle: 'Dash',
                            label:{
                                text:'严重污染',
                                align:'left',
                                x:10,
                                style: {
                                    fontSize: '8px',
                                    fontWeight: 200
                                }
                            }
                        }]
                    },
                    tooltip: {
                        valueSuffix: 'μg/m³'
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions:{
                        series: {
                            cursor: 'pointer',
                            events: {
                                click: function (event) {
                                    $scope.$apply(function(){
                                        $scope.airQualityOptions.o3Option.series[0].data = [event.point.y];
                                    });
                                }
                            }
                        }
                    },
                    credits: {
                        enabled: false
                    }
                },
                series: [{
                    name: '臭氧',
                    data: [$scope.box4Left[0].o3,$scope.box4Left[1].o3,$scope.box4Left[2].o3,$scope.box4Left[3].o3,$scope.box4Left[4].o3,$scope.box4Left[5].o3,$scope.box4Left[6].o3,$scope.box4Left[7].o3,$scope.box4Left[8].o3,$scope.box4Left[9].o3,$scope.box4Left[10].o3,$scope.box4Left[11].o3]
                    // data: [100, 120, 150, 80, 110, 90, 100, 120, 150, 80, 110, 90]
                }],
            }
        };
        //盒子4右侧下拉栏判断逻辑
        $scope.updown12=true;
        $scope.openAQI1List = function(){
            $scope.isAQI1open = !$scope.isAQI1open;
            if ($scope.isAQI1open){
                $scope.updown11=true;
                $scope.updown12=false;
                $scope.updown21=false;
                $scope.updown22=true;
                $scope.updown32=true;
                $scope.updown42=true;
                $scope.updown52=true;
                $scope.updown62=true;
                $scope.updown72=true;
                $scope.updown82=true;

                $scope.updown31=false;
                $scope.updown41=false;
                $scope.updown51=false;
                $scope.updown61=false;
                $scope.updown71=false;
                $scope.updown81=false;
            }else{
                $scope.updown11=false;
                $scope.updown12=true;
            }
            $scope.isPM251open = false;
            $scope.isPM101open = false;
            $scope.isSO21open = false;
            $scope.isCO1open = false;
            $scope.isNO21open = false;
            $scope.isO31open = false;
            $scope.ismainpollution1open=false;
        };
        $scope.updown22=true;
        $scope.openmainpollution1List = function(){
            $scope.ismainpollution1open = !$scope.ismainpollution1open;
            if ($scope.ismainpollution1open){
                $scope.updown21=true;
                $scope.updown22=false;
                $scope.updown12=true;
                $scope.updown32=true;
                $scope.updown42=true;
                $scope.updown52=true;
                $scope.updown62=true;
                $scope.updown72=true;
                $scope.updown82=true;
                $scope.updown11=false;
                $scope.updown31=false;
                $scope.updown41=false;
                $scope.updown51=false;
                $scope.updown61=false;
                $scope.updown71=false;
                $scope.updown81=false;
            }else{
                $scope.updown21=false;
                $scope.updown22=true;
            }
            $scope.isPM251open = false;
            $scope.isPM101open = false;
            $scope.isSO21open = false;
            $scope.isCO1open = false;
            $scope.isNO21open = false;
            $scope.isO31open = false;
            $scope.isAQI1open=false;
        };
        $scope.updown32=true;
        $scope.openPM251List = function(){
            $scope.isPM251open = !$scope.isPM251open;
            if ($scope.isPM251open){
                $scope.updown31=true;
                $scope.updown32=false;
                $scope.updown11=false;
                $scope.updown12=true;
                $scope.updown21=false;
                $scope.updown22=true;
                $scope.updown42=true;
                $scope.updown52=true;
                $scope.updown62=true;
                $scope.updown72=true;
                $scope.updown82=true;
                $scope.updown41=false;
                $scope.updown51=false;
                $scope.updown61=false;
                $scope.updown71=false;
                $scope.updown81=false;
            }else{
                $scope.updown31=false;
                $scope.updown32=true;
            }
            $scope.isAQI1open = false;
            $scope.isPM101open = false;
            $scope.isSO21open = false;
            $scope.isCO1open = false;
            $scope.isNO21open = false;
            $scope.isO31open = false;
            $scope.ismainpollution1open=false;
        };
        $scope.updown42=true;
        $scope.openPM101List = function(){
            $scope.isPM101open = !$scope.isPM101open;
            if ($scope.isPM101open){
                $scope.updown41=true;
                $scope.updown42=false;
                $scope.updown11=false;
                $scope.updown12=true;
                $scope.updown21=false;
                $scope.updown22=true;
                $scope.updown32=true;
                $scope.updown52=true;
                $scope.updown62=true;
                $scope.updown72=true;
                $scope.updown82=true;
                $scope.updown31=false;
                $scope.updown51=false;
                $scope.updown61=false;
                $scope.updown71=false;
                $scope.updown81=false;
            }else{
                $scope.updown41=false;
                $scope.updown42=true;
            }
            $scope.isPM251open = false;
            $scope.isAQI1open = false;
            $scope.isSO21open = false;
            $scope.isCO1open = false;
            $scope.isNO21open = false;
            $scope.isO31open = false;
            $scope.ismainpollution1open=false;
        };
        $scope.updown52=true;
        $scope.openSO21List = function(){
            $scope.isSO21open = !$scope.isSO21open;
            if ($scope.isSO21open){
                $scope.updown51=true;
                $scope.updown52=false;
                $scope.updown11=false;
                $scope.updown12=true;
                $scope.updown21=false;
                $scope.updown22=true;
                $scope.updown32=true;
                $scope.updown42=true;
                $scope.updown62=true;
                $scope.updown72=true;
                $scope.updown82=true;
                $scope.updown31=false;
                $scope.updown41=false;
                $scope.updown61=false;
                $scope.updown71=false;
                $scope.updown81=false;
            }else{
                $scope.updown51=false;
                $scope.updown52=true;
            }
            $scope.isPM251open = false;
            $scope.isPM101open = false;
            $scope.isAQI11open = false;
            $scope.isCO1open = false;
            $scope.isNO21open = false;
            $scope.isO31open = false;
            $scope.ismainpollution1open=false;
        };
        $scope.updown72=true;
        $scope.openCO1List = function(){
            $scope.isCO1open = !$scope.isCO1open;
            if ($scope.isCO1open){
                $scope.updown71=true;
                $scope.updown72=false;
                $scope.updown11=false;
                $scope.updown12=true;
                $scope.updown21=false;
                $scope.updown22=true;
                $scope.updown32=true;
                $scope.updown42=true;
                $scope.updown52=true;
                $scope.updown62=true;
                $scope.updown82=true;
                $scope.updown31=false;
                $scope.updown41=false;
                $scope.updown51=false;
                $scope.updown61=false;
                $scope.updown81=false;
            }else{
                $scope.updown71=false;
                $scope.updown72=true;
            }
            $scope.isPM251open = false;
            $scope.isPM101open = false;
            $scope.isSO21open = false;
            $scope.isAQI1open = false;
            $scope.isNO21open = false;
            $scope.isO31open = false;
            $scope.ismainpollution1open=false;
        };
        $scope.updown62=true;
        $scope.openNO21List = function(){
            $scope.isNO21open = !$scope.isNO21open;
            if ($scope.isNO21open){
                $scope.updown61=true;
                $scope.updown62=false;
                $scope.updown11=false;
                $scope.updown12=true;
                $scope.updown21=false;
                $scope.updown22=true;
                $scope.updown32=true;
                $scope.updown42=true;
                $scope.updown52=true;
                $scope.updown72=true;
                $scope.updown82=true;
                $scope.updown31=false;
                $scope.updown41=false;
                $scope.updown51=false;
                $scope.updown71=false;
                $scope.updown81=false;
            }else{
                $scope.updown61=false;
                $scope.updown62=true;
            }
            $scope.isPM251open = false;
            $scope.isPM101open = false;
            $scope.isSO21open = false;
            $scope.isCO1open = false;
            $scope.isAQI1open = false;
            $scope.isO31open = false;
            $scope.ismainpollution1open=false;
        };
        $scope.updown82=true;
        $scope.openO31List = function(){
            $scope.isO31open = !$scope.isO31open;
            if ($scope.isO31open){
                $scope.updown81=true;
                $scope.updown82=false;
                $scope.updown11=false;
                $scope.updown12=true;
                $scope.updown21=false;
                $scope.updown22=true;
                $scope.updown32=true;
                $scope.updown42=true;
                $scope.updown52=true;
                $scope.updown62=true;
                $scope.updown72=true;
                $scope.updown31=false;
                $scope.updown41=false;
                $scope.updown51=false;
                $scope.updown61=false;
                $scope.updown71=false;
            }else{
                $scope.updown81=false;
                $scope.updown82=true;
            }
            $scope.isPM251open = false;
            $scope.isPM101open = false;
            $scope.isSO21open = false;
            $scope.isCO1open = false;
            $scope.isNO21open = false;
            $scope.isAQI1open = false;
            $scope.ismainpollution1open=false;
        };
        //--------------------------盒子4结束----------------------------
    }, function(error){
        console.log('发送失败');
    });
    $rootScope.loading=false;
    //-------------------------airQualityGetPromise结束--------------------------
};