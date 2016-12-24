export default ($scope, $rootScope, qService, economyPowerRes) => {
	'ngInject';

	const getChart = (yearArr, powerArr, gdpArr) => {
		$scope.TotalPowerGDPChart={
			credits:{
				enabled:false // 禁用版权信息
			},
			options:{
				chart: {
					type: 'spline',
				},
				exporting: {
					enabled: false, // 取消打印menu
				},
			},
			title: {
				text: ''
			},
			subtitle: {
				text: '',
				x: -20
			},
			xAxis: {
				categories: yearArr,
				plotBands: [{
					from: 9.5,
					to: 12.5,
					label: {
						text:"预测区",
						style: {
							color: 'grey',
						},
					},
					color: 'rgba(68, 170, 213, .1)'
				}],
			},

			plotOptions: {
				series: {
					allowPointSelect: true,
					point: {
						events: {
							click: function () {
								alert('Category: ');
							}
						}
					}
				}
			},
			yAxis: {
				title: {
					text: '增长率 (%)'
				},
				plotLines: [{
					value: 0,
					width: 1,
					color: '#808080'
				}]
			},
			tooltip: {
				valueSuffix: '%',
			},
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'middle',
				borderWidth: 0
			},
			series: [{
				name: '工业用电量同比增长率',
				data: powerArr,
				color:'#23B7E5',
				}, {
				name: 'GDP同比增长率',
				data: gdpArr,
				color:'#DAA520',
			}]
		};
	};
    $rootScope.loading = true;
    qService.httpGetWithToken(economyPowerRes.getTotal, {}, {}).then((data) => {
        if (data.code == "200") {
        	$scope.getData = data.data;
			$scope.oneword = '用电量增减变动趋势与GDP增减变动趋势基本一致，GDP增长时，用电量也增长，增速相似；GDP回落时，用电量增长也回落;预测阶段用电量增速将大于GDP增速。';
			$scope.yearvalue = $scope.getData.years;
			$scope.gdprate = $scope.getData.gdps;
			$scope.powerrate = $scope.getData.powers;
			    
			getChart($scope.yearvalue, $scope.powerrate, $scope.gdprate); // 默认显示历史数据
			$scope.changeTotalChart = function(param){
				$scope.TotalPowerGDPChart.options.chart.type = param;
			};
			$scope.showTotalTable = function(){
				$scope.totalshow= !$scope.totalshow;
			};
			
        }
    }, (err) => {
        console.log(err);
    }).finally(() => {
        $rootScope.loading = false;
    });
};