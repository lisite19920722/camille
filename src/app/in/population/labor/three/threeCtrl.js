export default ($scope, $rootScope, $stateParams, qService, populationRes) => {
    'ngInject';

    //年份选择数据
    $scope.yearSelect = ['2020', '2025', '2030', '2035', '2040', '2045'];
    $rootScope.loading = true;
    qService.httpGetWithToken(populationRes.getLaborGdpRelationPreData, {}, {})
        .then((resource) => {
            console.log(resource.data);

            //第一产业数据
            var dataI1 = new Array(30);
            var iRate1 = new Array(30);
            var dataP1 = new Array(30);
            var pRate1 = new Array(30);
            //第一产业数据
            var dataI2 = new Array(30);
            var iRate2 = new Array(30);
            var dataP2 = new Array(30);
            var pRate2 = new Array(30);
            //第三产业数据
            var dataI3 = new Array(30);
            var iRate3 = new Array(30);
            var dataP3 = new Array(30);
            var pRate3 = new Array(30);

            var sumP = new Array(30);
            var sumI = new Array(30);
            //取数据，5年取一次
            for (let i = 0; i < 30; i = i + 5) {

                dataP1[i / 5] = resource.data[i].preFirstLaborPopulation; //第一产业人口
                dataP2[i / 5] = resource.data[i].preSecondLaborPopulation; //第二产业人口
                dataP3[i / 5] = resource.data[i].preThirdLaborPopulation; //第三产业人口

                dataI1[i / 5] = resource.data[i].preFirstGdp; //第一产业产值
                dataI2[i / 5] = resource.data[i].preSecondGdp; //第二产业产值
                dataI3[i / 5] = resource.data[i].preThirdGdp; //第三产业产值
            }
            console.log(dataP1[0]);
            var comChart1 = (data1, data2, data3, year) => {
                return {
                    options: {
                        exporting: {
                            enabled: false, // 取消打印menu
                        },
                        colors: ['#7CB5EC', '#929dce', '#90ED7D'],
                        chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            margin: [30, 30, 30, 30],
                        },
                        credits: {
                            enabled: false
                        },
                        title: {
                            text: "太仓市" + year + "年产业就业人口比重分析预测",
                            style: {
                                fontSize: '13px',
                                fontWeight: 'bold',
                            }
                        },
                        tooltip: {
                            enabled: true,
                            pointFormat: ' 数量:{point.y:1.f}(人)</b> '
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                    zIndex: 40,
                                    enabled: true,
                                    format: '<b>{point.name}</b>: <br><center>{point.percentage:.1f} %</center>',
                                    style: {
                                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                    }
                                },
                                showInLegend: true
                            }
                        },
                        legend: {
                            itemStyle: {
                                fontWeight: 'normal'
                            }
                        }
                    },
                    series: [{
                        type: 'pie',
                        name: '',
                        data: [
                            ['第一产业人口', data1],
                            ['第二产业人口', data2],
                            ['第三产业人口', data3]
                        ]
                    }]
                };
            }

            var comChart2 = (data1, data2, data3, year) => {
                return {
                    options: {
                        exporting: {
                            enabled: false, // 取消打印menu
                        },
                        colors: ['#7CB5EC', '#929dce', '#90ED7D'],
                        chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            margin: [30, 30, 30, 30],
                        },
                        credits: {
                            enabled: false
                        },
                        title: {
                            text: "太仓市" + year + "年产业就业人口比重分析预测",
                            style: {
                                fontSize: '13px',
                                fontWeight: 'bold',
                            }
                        },
                        tooltip: {
                            enabled: true,
                            pointFormat: ' 产值:{point.y:1.f}(亿元)</b> '
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                    zIndex: 40,
                                    enabled: true,
                                    format: '<b>{point.name}</b>: <br><center>{point.percentage:.1f} %</center>',
                                    style: {
                                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                    }
                                },
                                showInLegend: true
                            }
                        },
                        legend: {
                            itemStyle: {
                                fontWeight: 'normal'
                            }
                        }
                    },
                    series: [{
                        type: 'pie',
                        name: '',
                        data: [
                            ['第一产业', data1],
                            ['第二产业', data2],
                            ['第三产业', data3]
                        ]
                    }]
                };
            }

            $scope.toggleData1 = (year) => {
                switch (year) {
                    case $scope.yearSelect[0]:
                        $scope.populationPie = comChart1(dataP1[0], dataP2[0], dataP3[0], $scope.yearSelect[0]);
                        break;
                    case $scope.yearSelect[1]:
                        $scope.populationPie = comChart1(dataP1[1], dataP2[1], dataP3[1], $scope.yearSelect[1]);
                        console.log('执行到第二个了');
                        break;
                    case $scope.yearSelect[2]:
                        $scope.populationPie = comChart1(dataP1[2], dataP2[2], dataP3[2], $scope.yearSelect[2]);
                        break;
                    case $scope.yearSelect[3]:
                        $scope.populationPie = comChart1(dataP1[3], dataP2[3], dataP3[3], $scope.yearSelect[3]);
                        break;
                    case $scope.yearSelect[4]:
                        $scope.populationPie = comChart1(dataP1[4], dataP2[4], dataP3[4], $scope.yearSelect[4]);
                        break;
                    case $scope.yearSelect[5]:
                        $scope.populationPie = comChart1(dataP1[5], dataP2[5], dataP3[5], $scope.yearSelect[5]);
                        break;
                };

            };

            $scope.toggleData2 = (year) => {
                switch (year) {
                    case $scope.yearSelect[0]:
                        $scope.industryPie = comChart2(dataI1[0], dataI2[0], dataI3[0], $scope.yearSelect[0]);
                        break;
                    case $scope.yearSelect[1]:
                        $scope.industryPie = comChart2(dataI1[1], dataI2[1], dataI3[1], $scope.yearSelect[1]);
                        break;
                    case $scope.yearSelect[2]:
                        $scope.industryPie = comChart2(dataI1[2], dataI2[2], dataI3[2], $scope.yearSelect[2]);
                        break;
                    case $scope.yearSelect[3]:
                        $scope.industryPie = comChart2(dataI1[3], dataI2[3], dataI3[3], $scope.yearSelect[3]);
                        break;
                    case $scope.yearSelect[4]:
                        $scope.industryPie = comChart2(dataI1[4], dataI2[4], dataI3[4], $scope.yearSelect[4]);
                        break;
                    case $scope.yearSelect[5]:
                        $scope.industryPie = comChart2(dataI1[5], dataI2[5], dataI3[5], $scope.yearSelect[5]);
                        break;
                };

            };

            //初始化
            $scope.populationPie = {
                options: {
                    exporting: {
                        enabled: false, // 取消打印menu
                    },
                    colors: ['#7CB5EC', '#929dce', '#90ED7D'],
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        margin: [30, 30, 30, 30],
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: "太仓市2020年产业就业人口比重分析预测",
                        style: {
                            fontSize: '13px',
                            fontWeight: 'bold',
                        }
                    },
                    tooltip: {
                        enabled: true,
                        pointFormat: ' 数量:{point.y:1.f}(人)</b> '
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                zIndex: 40,
                                enabled: true,
                                format: '<b>{point.name}</b>: <br><center>{point.percentage:.1f} %</center>',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            },
                            showInLegend: true
                        }
                    },
                    legend: {
                        itemStyle: {
                            fontWeight: 'normal'
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    name: '',
                    data: [
                        ['第一产业人口', dataP1[0]],
                        ['第二产业人口', dataP2[0]],
                        ['第三产业人口', dataP3[0]]
                    ]
                }]

            };
            //初始化
            $scope.industryPie = {
                options: {
                    exporting: {
                        enabled: false, // 取消打印menu
                    },
                    colors: ['#7CB5EC', '#929dce', '#90ED7D'],
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        margin: [30, 30, 30, 30],
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: "太仓市2020年产业产值比重分析预测",
                        style: {
                            fontSize: '13px',
                            fontWeight: 'bold',
                        }
                    },
                    tooltip: {
                        enabled: true,
                        pointFormat: ' 产值:{point.y:1.f}(亿元)</b> '
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                zIndex: 40,
                                enabled: true,
                                format: '<b>{point.name}</b>: <br><center>{point.percentage:.1f} %</center>',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            },
                            showInLegend: true
                        }
                    },
                    legend: {
                        itemStyle: {
                            fontWeight: 'normal'
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    name: '',
                    data: [
                        ['第一产业', dataI1[0]],
                        ['第二产业', dataI2[0]],
                        ['第三产业', dataI3[0]]
                    ]
                }]

            };
            console.log(resource);
        }, function(error) {
            console.log('发送失败');
        }).finally(function() {
            $rootScope.loading = false;
        });
};
