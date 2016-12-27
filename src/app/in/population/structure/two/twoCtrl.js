export default ($scope, $rootScope, qService, populationRes) => {
	'ngInject';
    (function() {
        document.body.scrollIntoView();
    })();
    $scope.data = null;
    var popData;
    //是否显示人口总量数据详情
    $scope.showPopulationDetail1 = function() {
        $scope.totalshow1 = !$scope.totalshow1;
    };
    var sumData;
    var promise2 = qService.httpGetWithToken(populationRes.getSumPopulationData, {}, {});
    promise2.then(function(rc2) {
    	
        var sumData = rc2.data;
        //第二张图
        var sum16 = 0;
        var sum17 = 0;
        var sum18 = 0;
        var sum19 = 0;
        var sum20 = 0;
        var sum21 = 0;
        var sum22 = 0;
        var sum23 = 0;
        var sum24 = 0;
        var sum25 = 0;
        var sum1 = [];

        var rate16 = 0;
        var rate17 = 0;
        var rate18 = 0;
        var rate19 = 0;
        var rate20 = 0;
        var rate21 = 0;
        var rate22 = 0;
        var rate23 = 0;
        var rate24 = 0;
        var rate25 = 0;
        var rate1 = [];
        for (var i = 0; i < sumData.length; i++) {
            if (sumData[i].year === 2016) {
                sum16 = sumData[i].sumPopulation;
                rate16 = sumData[i].popRate;
            }
            if (sumData[i].year === 2017) {
                sum17 = sumData[i].sumPopulation;
                rate17 = sumData[i].popRate;
            }
            if (sumData[i].year === 2018) {
                sum18 = sumData[i].sumPopulation;
                rate18 = sumData[i].popRate;
            }
            if (sumData[i].year === 2019) {
                sum19 = sumData[i].sumPopulation;
                rate19 = sumData[i].popRate;
            }
            if (sumData[i].year === 2020) {
                sum20 = sumData[i].sumPopulation;
                rate20 = sumData[i].popRate;
            }
            if (sumData[i].year === 2021) {
                sum21 = sumData[i].sumPopulation;
                rate21 = sumData[i].popRate;
            }
            if (sumData[i].year === 2022) {
                sum22 = sumData[i].sumPopulation;
                rate22 = sumData[i].popRate;
            }
            if (sumData[i].year === 2023) {
                sum23 = sumData[i].sumPopulation;
                rate23 = sumData[i].popRate;
            }
            if (sumData[i].year === 2024) {
                sum24 = sumData[i].sumPopulation;
                rate24 = sumData[i].popRate;
            }
            if (sumData[i].year === 2025) {
                sum25 = sumData[i].sumPopulation;
                rate25 = sumData[i].popRate;
            }
        }
        sum1.push(sum16);
        sum1.push(sum17);
        sum1.push(sum18);
        sum1.push(sum19);
        sum1.push(sum20);
        sum1.push(sum21);
        sum1.push(sum22);
        sum1.push(sum23);
        sum1.push(sum24);
        sum1.push(sum25);

        rate1.push(rate16);
        rate1.push(rate17);
        rate1.push(rate18);
        rate1.push(rate19);
        rate1.push(rate20);
        rate1.push(rate21);
        rate1.push(rate22);
        rate1.push(rate23);
        rate1.push(rate24);
        rate1.push(rate25);

        console.log(sum1);//2016到2025年人口总数
        console.log(rate1);//2016到2025年人口增长率



        var sum26 = 0;
        var sum27 = 0;
        var sum28 = 0;
        var sum29 = 0;
        var sum30 = 0;
        var sum31 = 0;
        var sum32 = 0;
        var sum33 = 0;
        var sum34 = 0;
        var sum35 = 0;
        var sum2 = [];

        var rate26 = 0;
        var rate27 = 0;
        var rate28 = 0;
        var rate29 = 0;
        var rate30 = 0;
        var rate31 = 0;
        var rate32 = 0;
        var rate33 = 0;
        var rate34 = 0;
        var rate35 = 0;
        var rate2 = [];
        for (var i = 0; i < sumData.length; i++) {
            if (sumData[i].year === 2026) {
                sum26 = sumData[i].sumPopulation;
                rate26 = sumData[i].popRate;
            }
            if (sumData[i].year === 2027) {
                sum27 = sumData[i].sumPopulation;
                rate27 = sumData[i].popRate;
            }
            if (sumData[i].year === 2028) {
                sum28 = sumData[i].sumPopulation;
                rate28 = sumData[i].popRate;
            }
            if (sumData[i].year === 2029) {
                sum29 = sumData[i].sumPopulation;
                rate29 = sumData[i].popRate;
            }
            if (sumData[i].year === 2030) {
                sum30 = sumData[i].sumPopulation;
                rate30 = sumData[i].popRate;
            }
            if (sumData[i].year === 2031) {
                sum31 = sumData[i].sumPopulation;
                rate31 = sumData[i].popRate;
            }
            if (sumData[i].year === 2032) {
                sum32 = sumData[i].sumPopulation;
                rate32 = sumData[i].popRate;
            }
            if (sumData[i].year === 2033) {
                sum33 = sumData[i].sumPopulation;
                rate33 = sumData[i].popRate;
            }
            if (sumData[i].year === 2034) {
                sum34 = sumData[i].sumPopulation;
                rate34 = sumData[i].popRate;
            }
            if (sumData[i].year === 2035) {
                sum35 = sumData[i].sumPopulation;
                rate35 = sumData[i].popRate;
            }
        }
        sum2.push(sum26);
        sum2.push(sum27);
        sum2.push(sum28);
        sum2.push(sum29);
        sum2.push(sum30);
        sum2.push(sum31);
        sum2.push(sum32);
        sum2.push(sum33);
        sum2.push(sum34);
        sum2.push(sum35);

        rate2.push(rate26);
        rate2.push(rate27);
        rate2.push(rate28);
        rate2.push(rate29);
        rate2.push(rate30);
        rate2.push(rate31);
        rate2.push(rate32);
        rate2.push(rate33);
        rate2.push(rate34);
        rate2.push(rate35);

        console.log(sum2);//2026到2035年人口总数
        console.log(rate2);//2026到2035年人口增长率


        var sum36 = 0;
        var sum37 = 0;
        var sum38 = 0;
        var sum39 = 0;
        var sum40 = 0;
        var sum41 = 0;
        var sum42 = 0;
        var sum43 = 0;
        var sum44 = 0;
        var sum45 = 0;
        var sum3 = [];

        var rate36 = 0;
        var rate37 = 0;
        var rate38 = 0;
        var rate39 = 0;
        var rate40 = 0;
        var rate41 = 0;
        var rate42 = 0;
        var rate43 = 0;
        var rate44 = 0;
        var rate45 = 0;
        var rate3 = [];
        for (var i = 0; i < sumData.length; i++) {
            if (sumData[i].year === 2036) {
                sum36 = sumData[i].sumPopulation;
                rate36 = sumData[i].popRate;
            }
            if (sumData[i].year === 2037) {
                sum37 = sumData[i].sumPopulation;
                rate37 = sumData[i].popRate;
            }
            if (sumData[i].year === 2038) {
                sum38 = sumData[i].sumPopulation;
                rate38 = sumData[i].popRate;
            }
            if (sumData[i].year === 2039) {
                sum39 = sumData[i].sumPopulation;
                rate39 = sumData[i].popRate;
            }
            if (sumData[i].year === 2040) {
                sum40 = sumData[i].sumPopulation;
                rate40 = sumData[i].popRate;
            }
            if (sumData[i].year === 2041) {
                sum41 = sumData[i].sumPopulation;
                rate41 = sumData[i].popRate;
            }
            if (sumData[i].year === 2042) {
                sum42 = sumData[i].sumPopulation;
                rate42 = sumData[i].popRate;
            }
            if (sumData[i].year === 2043) {
                sum43 = sumData[i].sumPopulation;
                rate43 = sumData[i].popRate;
            }
            if (sumData[i].year === 2044) {
                sum44 = sumData[i].sumPopulation;
                rate44 = sumData[i].popRate;
            }
            if (sumData[i].year === 2045) {
                sum45 = sumData[i].sumPopulation;
                rate45 = sumData[i].popRate;
            }
        }
        sum3.push(sum36);
        sum3.push(sum37);
        sum3.push(sum38);
        sum3.push(sum39);
        sum3.push(sum40);
        sum3.push(sum41);
        sum3.push(sum42);
        sum3.push(sum43);
        sum3.push(sum44);
        sum3.push(sum45);

        rate3.push(rate36);
        rate3.push(rate37);
        rate3.push(rate38);
        rate3.push(rate39);
        rate3.push(rate40);
        rate3.push(rate41);
        rate3.push(rate42);
        rate3.push(rate43);
        rate3.push(rate44);
        rate3.push(rate45);

        console.log(sum3);//2036到2045年人口总数
        console.log(rate3);//2036到2045年人口增长率

        $scope.sumpopulation = {
            options: {
                //  colors:lineColors,
                exporting: {
                        enabled: false, // 取消打印menu
                },
                chart: {
                    zoomType: 'xy',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: '太仓市2016年到2025年人口总量预测趋势图',
                    style: {
                        fontSize: "15px",
                    }
                },
                legend: {

                    itemStyle: {
                        fontWeight: 'normal'
                    }
                },
                xAxis: [{
                    categories: ['2016', '2017', '2018', '2019', '2020',
                        '2021', '2022', '2023', '2024', '2025'
                    ],
                    crosshair: true,
                    labels: {
                        rotation: -45,
                        align: 'right',
                        style: {
                            fontSize: '10px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                }],
                yAxis: [{ // Primary yAxis
                    labels: {
                        format: '{value}%',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    title: {
                        text: '人口增长率',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    opposite: true
                }, { // Secondary yAxis
                    title: {
                        text: '人口总量（人）',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        },

                        tickPositions: [0, 100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000]
                    },
                    labels: {

                        format: '{value}',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        },

                    },
                    // opposite: true
                }],
                tooltip: {
                    shared: true
                },
                credits: {
                    enabled: false
                }

            },
            series: [{
                name: '人口总量',
                type: 'column',
                yAxis: 1,
                color: "#7CB5EC",
                data: sum1,
                tooltip: {
                    valueSuffix: '人'
                }

            }, {
                name: '人口增长率',
                type: 'spline',
                color: "#858585",
                data: rate1,
                marker: {
                    symbol: "circle"
                },
                tooltip: {
                    valueSuffix: '%'
                }
            }]
        };
        // $scope.sumpopulation = {
        //     options: {
        //         //  colors:lineColors,
        //         chart: {
        //             zoomType: 'xy'
        //         },
        //         title: {
        //             text: '太仓市2016年到2025年人口总量预测趋势图'
        //         },
        //         legend: {

        //             itemStyle: {
        //                 fontWeight: 'normal'
        //             }
        //         },
        //         xAxis: [{
        //             categories: ['2016', '2017', '2018', '2019', '2020',
        //                 '2021', '2022', '2023', '2024', '2025'
        //             ],
        //             crosshair: true,
        //             labels: {
        //                 rotation: -45,
        //                 align: 'right',
        //                 style: {
        //                     fontSize: '13px',
        //                     fontFamily: 'Verdana, sans-serif'
        //                 }
        //             }
        //         }],
        //         yAxis: [{ // Primary yAxis
        //             labels: {
        //                 format: '{value}%',
        //                 style: {
        //                     color: Highcharts.getOptions().colors[1]
        //                 }
        //             },
        //             title: {
        //                 text: '人口增长率',
        //                 style: {
        //                     color: Highcharts.getOptions().colors[1]
        //                 }
        //             },
        //             opposite: true
        //         }, { // Secondary yAxis
        //             title: {
        //                 text: '人口总量（人）',
        //                 style: {
        //                     color: Highcharts.getOptions().colors[1]
        //                 },

        //                 tickPositions: [0, 100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000]
        //             },
        //             labels: {

        //                 format: '{value}',
        //                 style: {
        //                     color: Highcharts.getOptions().colors[1]
        //                 },

        //             },
        //             // opposite: true
        //         }],
        //         tooltip: {
        //             shared: true
        //         },
        //         credits: {
        //             enabled: false
        //         }

        //     },
        //     series: [{
        //         name: '人口总量',
        //         type: 'column',
        //         yAxis: 1,
        //         color: "#7CB5EC",
        //         data: sum1,
        //         tooltip: {
        //             valueSuffix: '人'
        //         }

        //     }, {
        //         name: '人口增长率',
        //         type: 'spline',
        //         color: "#858585",
        //         data: rate1,
        //         marker: {
        //             symbol: "circle"
        //         },
        //         tooltip: {
        //             valueSuffix: '%'
        //         }
        //     }]
        // };
        $scope.btn_click1 = function(btn) {
            $scope.change1(btn);
        };
        //默认人口总量是2016-2025
        $scope.sumpeople = sum1;
        //默认人口增长率是2016-2025
        $scope.growth = rate1;
        $scope.sumyear = "2016-2025";
        $scope.change1 = function(btn) {
        	console.log(btn.name);
            if (btn.name === 2025) {
                $scope.sumyear = "2016-2025";
                //人口总量
                $scope.sumpeople = sum1;
                //人口增长率
                $scope.growth = rate1;
                document.getElementById('a').innerHTML = "2025年的人口增长率0.25%相比2016年的0.25%有了小幅度的降低。";
                document.getElementById('sumconclusion').innerHTML = "总体来看，太仓市的人口总量处于平稳状态，呈增长趋势。二胎政策的全面开放，促进了人口数量的增加。";
                $scope.sumpopulation.options.xAxis[0].categories = ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];
                $scope.sumpopulation.options.title.text = "太仓市2016-2025年人口总量预测趋势图";
                $scope.sumpopulation.series = [{
                    name: '人口总量',
                    type: 'column',
                    yAxis: 1,
                    color: "#7CB5EC",
                    data: sum1,
                    tooltip: {
                        valueSuffix: '人'
                    }

                }, {
                    name: '人口增长率',
                    type: 'spline',
                    color: "#858585",
                    data: rate1,
                    marker: {
                        symbol: "circle"
                    },
                    tooltip: {
                        valueSuffix: '%'
                    }
                }];
            }
            if (btn.name === 2035) {
                //人口增长率
                $scope.growth = rate2;
                //人口总量
                $scope.sumpeople = sum2;
                $scope.sumyear = "2026-2035";
                document.getElementById('a').innerHTML = "2035年的人口增长率0.11%相比2026年的0.19%有了小幅度的下降。";
                document.getElementById('sumconclusion').innerHTML = "总体来看，太仓市的人口总量处于平稳状态，呈增长趋势。";
                $scope.sumpopulation.options.xAxis[0].categories = ['2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035'];
                $scope.sumpopulation.options.title.text = "太仓市2026-2035年人口总量预测趋势图";
                $scope.sumpopulation.series = [{
                    name: '人口总量',
                    type: 'column',
                    yAxis: 1,
                    color: "#7CB5EC",
                    data: sum2,
                    tooltip: {
                        valueSuffix: '人'
                    }

                }, {
                    name: '人口增长率',
                    type: 'spline',
                    color: "#858585",
                    data: rate2,
                    marker: {
                        symbol: "circle"
                    },
                    tooltip: {
                        valueSuffix: '%'
                    }
                }];
            }
            if (btn.name === 2045) {
                //人口增长率
                $scope.growth = rate3;
                //人口总量
                $scope.sumpeople = sum3;
                $scope.sumyear = "2036-2045";
                document.getElementById('a').innerHTML = "2045年的人口增长率0.13%相比2036年的0.13%保持稳定不变。";
                document.getElementById('sumconclusion').innerHTML = "总体来看，太仓市的人口总量处于平稳状态，无增长趋势。";
                $scope.sumpopulation.options.xAxis[0].categories = ['2036', '2037', '2038', '2039', '2040', '2041', '2042', '2043', '2044', '2045'];
                $scope.sumpopulation.options.title.text = "太仓市2036-2045年人口总量预测趋势图";
                $scope.sumpopulation.series = [{
                    name: '人口总量',
                    type: 'column',
                    yAxis: 1,
                    color: "#7CB5EC",
                    data: sum3,
                    tooltip: {
                        valueSuffix: '人'
                    }

                }, {
                    name: '人口增长率',
                    type: 'spline',
                    color: "#858585",
                    data: rate3,
                    marker: {
                        symbol: "circle"
                    },
                    tooltip: {
                        valueSuffix: '%'
                    }
                }];
            }
        };
        $scope.buttonMap1 = [{
            name: 2025,
            label: 2025 + "",
            radio: "Left"
        }, {
            name: 2035,
            label: 2035 + "",
            radio: "Middle"
        }, {
            name: 2045,
            label: 2045 + "",
            radio: "Right"
        }];
    });
};