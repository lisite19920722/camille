export default ($scope, $rootScope, $stateParams, qService, populationRes) => { 
	'ngInject';
    //年份选择按钮
	$scope.isMenu1 = false;
	$scope.toggleMenu1 =function() {
		$scope.isMenu1 = !$scope.isMenu1;
	};
	//切换数据
	var firstTen =function(year) {
		console.log(year);
	};
	var secondTen =function(year) {
		console.log(year);
	};
	var thirdTen =function(year) {
		console.log(year);
	};
	$scope.yearSelect1 = ['2016-2025年', '2026-2035年', '2036-2045年'];
    qService.httpGetWithToken(populationRes.getLaborGdpRelationPreData,{},{})
     .then((resource) => {
      	var dataP = new Array(30);
      	for(let i=0; i<30; i++ ){
            dataP[i] = resource.data[i].preLaborPopulation;
      	}
      	//gdp数据
      	var dataG = new Array(30);
      	for(let i=0; i<30; i++ ){
            dataG[i] = resource.data[i].preLaborPopulation;
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
                    text: '2016至2025年劳动力人口与GDP关联分析预测'
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
                            return this.value ;
                        },
                        style: {
                            color: '#89A54E'
                        }
                    },
                    title: {
                        text: 'GDP(亿元)',
                        style: {
                            color: '#89A54E'
                        }
                    },
                    opposite: true,


                }, { // Secondary yAxis
                    gridLineWidth: 0,
                    title: {
                        text: '人口(人)',
                        style: {
                            color: '#7CB5EC'
                        }
                    },
                    labels: {
                        formatter: function() {
                            return this.value +'人';
                        },
                        style: {
                            color: '#7CB5EC'
                        }
                    },
                }, { // Tertiary yAxis
                    gridLineWidth: 0,
                    title: {
                        text: '关联度',
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
                    tickPositions:[0.7,0.75,0.8,0.85,0.9]
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
        //firstTen
        $scope.toggleData1 = (year) => {
           switch(year){
              case $scope.yearSelect1[0]:
                firstTen(year);
                break;
              case $scope.yearSelect1[1]:
                secondTen(year);
                break;
              case $scope.yearSelect1[2]:
                thirdTen(year);
                break;
           };           

        };
         console.log($scope.firstChart.options.xAxis.categories[0]+"-"+$scope.firstChart.options.xAxis.categories[9]);
         },(err) => {
           console.log('劳动力第一个图的数据获取不成功');
         }    
   	    )
     .finally(() => {
        $rootScope.loading = false;
     }
   	);

};