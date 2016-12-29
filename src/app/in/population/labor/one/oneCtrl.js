export default ($scope, $rootScope, $stateParams, qService, populationRes) => { 
	'ngInject';

	//关联度值数据
	var relate1 = [0.825, 0.827, 0.829,0.826, 0.829, 0.831, 0.836, 0.834, 0.836, 0.838];
	var relate2 = [0.839, 0.837, 0.836,0.838, 0.839, 0.834, 0.835, 0.836, 0.837, 0.838];
	var relate3 = [0.837, 0.838, 0.839,0.841, 0.838, 0.835, 0.837, 0.839, 0.841, 0.843];

	//年份数据
	var yearLen1= [2016,2017,2018,2019,2020,2021,2022,2023,2024,2025];
	var yearLen2= [2026,2027,2028,2029,2030,2031,2032,2033,2034,2035];
	var yearLen3= [2036,2037,2038,2039,2040,2041,2042,2043,2044,2045];


	$scope.yearSelect1 = ['2016-2025年', '2026-2035年', '2036-2045年'];

    //一句话解读数据,及初始化
    $scope.oneWord = ['GDP增长趋势陡峭,劳动力人口增长较平稳，两者关联度逐年增加。', 'GDP平稳增长,劳动力人口增长较平稳，两者关联度基本不增加。', 'GDP增长量有所波动,劳动力人口基本不增长，两者关联度逐年增加。'];
    $scope.one = $scope.yearSelect1[0].concat($scope.oneWord[0]);
    
    qService.httpGetWithToken(populationRes.getLaborGdpRelationPreData,{},{})
    .then((resource) => {

        //获取人口和gdp数据
        var dataP = new Array(30);
        var dataG = new Array(30);
        for(let i=0; i<30; i++ ){
            dataP[i] = resource.data[i].preLaborPopulation;
            dataG[i] = resource.data[i].preLaborPopulation;
        }

        
      	//通用设置图表数据函数
      	var comChart = (popDa, relDa, gdpDa, yearLen, titleYear) => {
              return {
                options:{ 
                  exporting: {
                enabled: false, // 取消打印menu
            },
            chart: {
                zoomType: 'xy'
            },
            title: {
                text: titleYear+'劳动力人口与GDP关联分析预测',
                style:{
                   fontSize: '13px',
                   fontWeight: 'bold',
               }
           },
           credits:{
            enabled:false
        },
        xAxis: {
            categories: yearLen
        },
                yAxis: [{ // Primary yAxis
                    labels: {
                        formatter: function() {
                            return this.value/10000+'万亿元' ;
                        },
                        style: {
                            color: '#89A54E'
                        }
                    },
                    title: {
                        text: '',
                        style: {
                            color: '#89A54E'
                        }
                    },
                    opposite: true,


                }, { // Secondary yAxis
                    gridLineWidth: 0,
                    title: {
                        text: '',
                        style: {
                            color: '#7CB5EC'
                        }
                    },
                    labels: {
                        formatter: function() {
                            return this.value/10000 +'万人';
                        },
                        style: {
                            color: '#7CB5EC'
                        }
                    },
                    tickPositions:[0, 200000, 400000, 600000, 800000]

                }, { // Tertiary yAxis
                    gridLineWidth: 0,
                    title: {
                        text: '',
                        style: {
                            color: '#8968CD'
                        }
                    },
                    labels: {
                        formatter: function() {
                            return this.value ;
                        },
                        style: {
                            color: '#8968CD'
                        }
                    },
                    opposite: true,
                    tickPositions:[0.7,0.75,0.8,0.85,0.9,0.95,1.0]
                }],
                tooltip: {
                    shared: true
                },
                legend: {

                    align: 'center',

                    verticalAlign: 'bottom',
                    itemStyle:{
                        fontWeight:'normal'
                    }
                }
            },
            series: [{
                name: '人口',
                color: '#7CB5EC',
                type: 'column',
                yAxis: 1,
                data:  popDa,
                tooltip: {
                    valueSuffix: '人'
                }

            }, {
                name: '关联度',
                type: 'spline',
                color: '#8968CD',
                yAxis: 2,
                    //xie
                    data: relDa,
                    marker: {
                        enabled: true,
                        symbol:"circle"
                    },
                    dashStyle: 'shortdot',
                    tooltip: {
                        valueSuffix: ''
                    }

                }, {
                    name: 'GDP',
                    color: '#89A54E',
                    type: 'spline',
                    data:  gdpDa,
                    marker:{
                        symbol:"square"
                    },
                    tooltip: {
                        valueSuffix: '亿元'
                    }
                }]
            };
        }
      	//初始化图表数据
        $scope.firstChart = {
            options:{ 
              exporting: {
                enabled: false, // 取消打印menu
            },
            chart: {
                zoomType: 'xy'
            },
            title: {
                text: '2016至2025年劳动力人口与GDP关联分析预测',
                style:{
                   fontSize: '13px',
                   fontWeight: 'bold',
               }
           },
           credits:{
            enabled:false
        },
        xAxis: {
            categories: ['2016', '2017', '2018', '2019', '2020', '2021',
            '2022', '2023', '2024', '2025']
        },
                yAxis: [{ // Primary yAxis
                    labels: {
                        formatter: function() {
                            return this.value/10000+'万亿元' ;
                        },
                        style: {
                            color: '#89A54E'
                        }
                    },
                    title: {
                        text: '',
                        style: {
                            color: '#89A54E'
                        }
                    },
                    opposite: true,


                }, { // Secondary yAxis
                    gridLineWidth: 0,
                    title: {
                        text: '',
                        style: {
                            color: '#7CB5EC'
                        }
                    },
                    labels: {
                        formatter: function() {
                            return this.value/10000 +'万人';
                        },
                        style: {
                            color: '#7CB5EC'
                        }
                    },
                    tickPositions:[0, 200000, 400000, 600000, 800000]

                }, { // Tertiary yAxis
                    gridLineWidth: 0,
                    title: {
                        text: '',
                        style: {
                            color: '#8968CD'
                        }
                    },
                    labels: {
                        formatter: function() {
                            return this.value ;
                        },
                        style: {
                            color: '#8968CD'
                        }
                    },
                    opposite: true,
                    tickPositions:[0.7,0.75,0.8,0.85,0.9,0.95,1.0]
                }],
                tooltip: {
                    shared: true
                },
                legend: {

                    align: 'center',

                    verticalAlign: 'bottom',
                    itemStyle:{
                        fontWeight:'normal'
                    }
                }
            },
            series: [{
                name: '人口',
                color: '#7CB5EC',
                type: 'column',
                yAxis: 1,
                data:  dataP.slice(0,10),
                tooltip: {
                    valueSuffix: '人'
                }

            }, {
                name: '关联度',
                type: 'spline',
                color: '#8968CD',
                yAxis: 2,
                    //xie
                    data: [0.825, 0.827, 0.829,0.826, 0.829, 0.831, 0.836, 0.834, 0.836, 0.838],
                    marker: {
                        enabled: true,
                        symbol:"circle"
                    },
                    dashStyle: 'shortdot',
                    tooltip: {
                        valueSuffix: ''
                    }

                }, {
                    name: 'GDP',
                    color: '#89A54E',
                    type: 'spline',
                    data:  dataG.slice(0,10),
                    marker:{
                        symbol:"square"
                    },
                    tooltip: {
                        valueSuffix: '亿元'
                    }
                }]
            };

            

            $scope.toggleData1 = (year) => {
             switch(year){
              case $scope.yearSelect1[0]:
              $scope.firstChart = comChart(dataP.slice(0,10), relate1, dataG.slice(0,10), yearLen1, $scope.yearSelect1[0]);
              $scope.one = $scope.yearSelect1[0].concat($scope.oneWord[0]);
              break;
              case $scope.yearSelect1[1]:
              $scope.firstChart = comChart(dataP.slice(10,20), relate2, dataG.slice(10,20), yearLen2, $scope.yearSelect1[1]);
              $scope.one = $scope.yearSelect1[1].concat($scope.oneWord[1]);
              break;
              case $scope.yearSelect1[2]:
              $scope.firstChart = comChart(dataP.slice(20,30), relate3, dataG.slice(20,30), yearLen3,  $scope.yearSelect1[2]);
              $scope.one =  $scope.yearSelect1[2].concat($scope.oneWord[2]);
              break;
          };           

      };
  },(err) => {
     console.log('劳动力第一个图的数据获取不成功');
 }    
 )
.finally(() => {
    $rootScope.loading = false;
}
);

};