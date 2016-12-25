export default ($scope, $rootScope, qService, economyPowerRes) => {
	'ngInject';

	const getIndustryData = function(year) {
		let getIndustryParams = {
	    	'year': year, 
	    };
		let getTotalPromise = qService.httpGetWithToken(economyPowerRes.getIndustry, getIndustryParams, {});
		getTotalPromise.then(function(data) {
			$scope.totalData = data.data;
			console.log($scope.totalData);
			$scope.VocationChartPiePower = {
		    	credits:{
		    	    enabled:false // 禁用版权信息
		    	},
		    	options:{
					exporting: {
						enabled: false, // 取消打印menu
					}
				},
		    	chart: {
		    	    plotBackgroundColor: null,
		    	    plotBorderWidth: null,
		    	    plotShadow: false
		    	},
		    	title: {
		    	    text: '行业用电量增速对比',
		    	    style: {
		    	    	fontSize: "15px",
		    	    }
		    	},
		    	subtitle: {
		    	    text: getIndustryParams.year+'年度',
		    	},
		    	tooltip: {
		    	    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		    	},
		    	xAxis: {
		    	    categories:[
		    	    '农、林、牧、渔业',
		    	    '工业',
		    	    '建筑业',
		    	    '交通运输、仓储和邮政业',
		    	    '信息传输、计算机服务和软件业',
		    	    '批发和零售、住宿和餐饮业',
		    	    '金融、房地产、商务及居民服务业',
		    	    '公共事业及管理组织'],

		    	    labels: {
		    	        rotation: -45,
		    	        align: 'right',
		    	        style: {
		    	            fontSize: '8px',
		    	            fontFamily: 'Verdana, sans-serif'
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
		    	plotOptions: {
		    	    pie: {
		    	        allowPointSelect: true,
		    	        cursor: 'pointer',
		    	        dataLabels: {
		    	            enabled: true,
		    	            color: '#000000',
		    	            connectorColor: '#000000',
		    	            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
		    	        }
		    	    }
		    	},
		    	series: [{
		    	    type: 'column',
		    	    name: '同比增长率',
		    	    data: $scope.totalData.powers,
		    	    color:'#23B7E5',
		    	}]
		    };
		    $scope.VocationChartPieGdp = {
		    	credits:{
		    	    enabled:false // 禁用版权信息
		    	},
		    	options:{
					exporting: {
						enabled: false, // 取消打印menu
					}
				},
		    	chart: {
		    	    plotBackgroundColor: null,
		    	    plotBorderWidth: null,
		    	    plotShadow: false
		    	},
		    	title: {
		    	    text: '行业产值增速对比',
		    	    style: {
		    	    	fontSize: "15px",
		    	    }
		    	},
		    	subtitle: {
		    	    text: getIndustryParams.year+'年度',
		    	},
		    	tooltip: {
		    	    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		    	},
		    	plotOptions: {
		    	    pie: {
		    	        allowPointSelect: true,
		    	        cursor: 'pointer',
		    	        dataLabels: {
		    	            enabled: true,
		    	            color: '#000000',
		    	            connectorColor: '#000000',
		    	            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
		    	        }
		    	    }
		    	},
		    	xAxis: {
		    	    categories:[
		    	    '农、林、牧、渔业',
		    	    '工业',
		    	    '建筑业',
		    	    '交通运输、仓储和邮政业',
		    	    '信息传输、计算机服务和软件业',
		    	    '批发和零售、住宿和餐饮业',
		    	    '金融、房地产、商务及居民服务业',
		    	    '公共事业及管理组织'],
		    	    labels: {
		    	        rotation: -45,
		    	        align: 'right',
		    	        style: {
		    	            fontSize: '8px',
		    	            fontFamily: 'Verdana, sans-serif'
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
		    	series: [{
		    	    type: 'column',
		    	    name: '同比增长率',
		    	    data: $scope.totalData.gdps,
		    	    color:'#DAA520',
		    	}]
		    };
		},function(error) {});
    };
    $scope.currentYear = "2015";
    getIndustryData(2015);
	$scope.changeYear = function(param){
		getIndustryData(parseInt(param));
		$scope.currentYear = param;
	};
};