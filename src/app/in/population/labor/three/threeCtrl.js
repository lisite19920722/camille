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

		//切换数据
		var firstFive =(year) =>{
			console.log('firstFive');
            // $scope.populationPie = comChart(dataP.slice(0,10), relate1, dataG.slice(0,10), yearLen1); 
        };

        $scope.toggleData1 = (year) => {
        	switch(year){
        		case $scope.yearSelect1[0]:
        		firstFive(year);
        		break;
        		case $scope.yearSelect1[1]:
        		secondFive(year);
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

        for(let i=0; i<30; i=i+5) {

           dataP1[i] = resource.data[i].preFirstLaborPopulation;//第一产业人口
           dataP2[i] = resource.data[i].preSecondLaborPopulation;//第二产业人口
           dataP3[i] = resource.data[i].preThirdLaborPopulation;//第三产业人口
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

       $scope.populationPie ={
       	options: {
       		 exporting: {
                enabled: false, // 取消打印menu
            },
       		colors:['#7CB5EC','#929dce','#90ED7D'],
       		chart: {
       			plotBackgroundColor: null,
       			plotBorderWidth: null,
       			plotShadow: false,
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