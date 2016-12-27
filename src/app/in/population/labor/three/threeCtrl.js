export default ($scope, $stateParams, qService, populationRes) => { 
	'ngInject';

    //年份选择按钮
    $scope.isMenu1 = false;
    $scope.toggleMenu1 =() => {
    	$scope.isMenu1 = !$scope.isMenu1;
    };
	//年份选择数据
	$scope.yearSelect1 = ['2020', '2025', '2030', '2035', '2040', '2045'];

	qService.httpGetWithToken(populationRes.getLaborGdpRelationPreData,{},{})
	.then((resource) => {

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
        for(let i=0; i<30; i=i+5) {

           dataP1[i/5] = resource.data[i].preFirstLaborPopulation;//第一产业人口
           dataP2[i/5] = resource.data[i].preSecondLaborPopulation;//第二产业人口
           dataP3[i/5] = resource.data[i].preThirdLaborPopulation;//第三产业人口
       }
		   // sumP[i] = resource.data[i].preLaborPopulation;//总人口
     //       pRate1[i] = dataP1[i]/sumP[i];//第一产业人口比例
     //       pRate2[i] = dataP2[i]/sumP[i];//第二产业人口比例
     //       pRate3[i] = dataP3[i]/sumP[i];//第三产业人口比例
           

		   // sumI[i] = resource.data[i].preGdp;//总gdp
     //       dataI1[i] = resource.data[i].preFirstGdp;//第一产业产值
     //       dataI2[i] = resource.data[i].preSecondGdp;//第二产业产值
     //       dataI3[i] = resource.data[i].preThirdGdp;//第三产业产值
     //       iRate1[i] = dataI1[i]/sumI[i];//第一产业产值比例
     //       iRate2[i] = dataI2[i]/sumI[i];//第二产业产值比例
     //       iRate3[i] = dataI3[i]/sumI[i];//第三产业产值比例
     
       var comChart = (data1, data2, data3) => {
         return {
       	options: {
       		 exporting: {
                enabled: false, // 取消打印menu
            },
       		colors:['#7CB5EC','#929dce','#90ED7D'],
       		chart: {
       			plotBackgroundColor: null,
       			plotBorderWidth: null,
       			plotShadow: false,
       			margin: [30, 30, 30, 30],
       		},
       		credits:{
       			enabled:false
       		},
       		title: {
       			text: "太仓市2020年产业就业人口比重分析预测"
       		},
       		tooltip: {
       			enabled: true,
       			pointFormat: ' 数量:{point.y:1.f}(万人)</b> '
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
       		legend:{
       			itemStyle:{
       				fontWeight:'normal'
       			}
       		}
       	},
       	series: [{
       		type: 'pie',
       		name: '',
       		data:[
       		['第一产业人口',data1/10000],
       		['第二产业人口',data2/10000],
       		['第三产业人口',data3/10000]
       		]
       	}]

       };

       $scope.industryPie = {
       	chart: {
       		plotBackgroundColor: null,
       		plotBorderWidth: null,
       		plotShadow: false
       	},
       	title: {
       		text: 'Browser market shares at a specific website, 2014'
       	},
       	tooltip: {
       		pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
       	},
       	plotOptions: {
       		pie: {
       			allowPointSelect: true,
       			cursor: 'pointer',
       			dataLabels: {
       				enabled: false
       			},
       			showInLegend: true
       		}
       	},
       	series: [{
       		type: 'pie',
       		name: 'Browser share',
       		data: [
       		['Firefox',   45.0],
       		['IE',       26.8],
       		{
       			name: 'Chrome',
       			y: 12.8,
       			sliced: true,
       			selected: true
       		},
       		['Safari',    8.5],
       		['Opera',     6.2],
       		['Others',   0.7]
       		]
       	}]
       }
       }
       
        $scope.toggleData1 = (year) => {
        	switch(year){
        		case $scope.yearSelect1[0]:
                $scope.populationPie = comChart(dataP1[0], dataP2[0], dataP3[0]); 
        		break;
        		case $scope.yearSelect1[1]:
        		$scope.populationPie = comChart(dataP1[1], dataP2[1], dataP3[1]); 
        		console.log('执行到第二个了');
        		break;
        		case $scope.yearSelect1[2]:
        		thirdFive(year);
        		break;
        		case $scope.yearSelect1[3]:
        		forthFive(year);
        		break;
        		case $scope.yearSelect1[4]:
        		fifthFive(year);
        		break;
        		case $scope.yearSelect1[5]:
        		sixthFive(year);
        		break;
        	};           

        };

       $scope.populationPie = {
       	options: {
       		 exporting: {
                enabled: false, // 取消打印menu
            },
       		colors:['#7CB5EC','#929dce','#90ED7D'],
       		chart: {
       			plotBackgroundColor: null,
       			plotBorderWidth: null,
       			plotShadow: false,
       			margin: [30, 30, 30, 30],
       		},
       		credits:{
       			enabled:false
       		},
       		title: {
       			text: "太仓市2020年产业就业人口比重分析预测"
       		},
       		tooltip: {
       			enabled: true,
       			pointFormat: ' 数量:{point.y:1.f}(万人)</b> '
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
       		legend:{
       			itemStyle:{
       				fontWeight:'normal'
       			}
       		}
       	},
       	series: [{
       		type: 'pie',
       		name: '',
       		data:[
       		['第一产业人口',dataP1[0]/10000],
       		['第二产业人口',dataP2[0]/10000],
       		['第三产业人口',dataP3[0]/10000]
       		]
       	}]

       };

       $scope.industryPie = {
       	chart: {
       		plotBackgroundColor: null,
       		plotBorderWidth: null,
       		plotShadow: false
       	},
       	title: {
       		text: 'Browser market shares at a specific website, 2014'
       	},
       	tooltip: {
       		pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
       	},
       	plotOptions: {
       		pie: {
       			allowPointSelect: true,
       			cursor: 'pointer',
       			dataLabels: {
       				enabled: false
       			},
       			showInLegend: true
       		}
       	},
       	series: [{
       		type: 'pie',
       		name: 'Browser share',
       		data: [
       		['Firefox',   45.0],
       		['IE',       26.8],
       		{
       			name: 'Chrome',
       			y: 12.8,
       			sliced: true,
       			selected: true
       		},
       		['Safari',    8.5],
       		['Opera',     6.2],
       		['Others',   0.7]
       		]
       	}]
       };




       console.log('成功');
       console.log(resource);
   },function(error){ 
   	console.log('发送失败');  	 
   });
};