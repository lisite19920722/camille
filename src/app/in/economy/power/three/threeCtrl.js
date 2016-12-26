export default ($scope, $rootScope, qService, economyPowerRes) => {
	'ngInject';

	var getYearData = function(industryId) {
		$rootScope.loading = true;
		$scope.getIndustryYearParams = {
	    	'industryId': industryId,
	    };
		var getYearPromise = qService.httpGetWithToken(economyPowerRes.getIndustryYear, $scope.getIndustryYearParams, {});
		getYearPromise.then(function(data) {
			$scope.yearData = data.data;
			$scope.SingleVocationChartByYear={
				credits:{
		    	    enabled:false // 禁用版权信息
		    	},
		        options:{
		        	chart: {
		               type: 'spline',
		               height: 400
		        	},
		        	exporting: {
						enabled: false, // 取消打印menu
					},
		        },
		        title: {
		           text: $scope.industryType + "按年度走势",
		           style: {
		               fontSize: "15px"
		           }
		    	},
		    	subtitle: {
		    	    text: '',
		    	    x: -20
		    	},
		    	xAxis: {
		    	    categories: $scope.yearData.years,
		    	    plotBands: [{
		    	        from: 9.5,
		    	        to: 12.5,
		    	        label: {
		    	            text:"预测区",
		    	            style: {
		    	                color: 'grey',
		    	            },
		    	        },
		    	        color: 'rgba(68, 170, 213, .2)'
		    	    }],
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
		    	    valueSuffix: '%'
		    	},
		    	legend: {
		    	    layout: 'vertical',
		    	    align: 'right',
		    	    verticalAlign: 'middle',
		    	    borderWidth: 0
		    	},
		    	series: [{
		    	    name: '行业用电量同比增长率',
		    	    data: $scope.yearData.powers,
		    	    color:'#23B7E5',
		    	    events: {
	                    click: function (event) {
	                        $scope.changeYear(event.point.category);
	                    }
	                }
		    	}, {
		    	    name: '行业产值同比增长率',
		    	    data: $scope.yearData.gdps,
		    	    color:'#DAA520',
		    	    events: {
	                    click: function (event) {
	                        $scope.changeYear(event.point.category);
	                    }
	                }
		    	}]
			};
		},function(error) {

		}).finally(() => {
	        $rootScope.loading = false;
	    });
	};

	var getSeasonData = function(industryId, year) {
		$rootScope.loading = true;
		$scope.getIndustrySeasonParams = {
	    	'industryId': industryId,
	    	'year': year,
	    };
		var getSeasonPromise = qService.httpGetWithToken(economyPowerRes.getIndustrySeason, $scope.getIndustrySeasonParams, {});
		getSeasonPromise.then(function(data) {
			$scope.seasonData = data.data;
			$scope.SingleVocationChart={
				credits:{
		    	    enabled:false // 禁用版权信息
		    	},
			    options:{
			       chart: {
			           type: 'spline',
			           height:400,
			       },
			       exporting: {
			       	enabled: false
			       }
			    },
			    title: {
			       text: $scope.industryType + "按季度走势",
			       style: {
		               fontSize: '15px'
		           }
			    },
			    subtitle: {
			        text: $scope.yearmark+'年度(点击上图中的点切换年份)',
			    },
			    xAxis: {
			        categories: ['第一季度', '第二季度', '第三季度', '第四季度'],
			        plotBands: [{
			              from: $scope.forcastFrom,
			              to: 8,
			              label: {
			                  text:"预测区",
			                  style: {
			                      color: 'grey',
			                  },
			              },
			              color: 'rgba(68, 170, 213, .2)'
			          }],
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
			        valueSuffix: '%'
			    },
			    legend: {
			        layout: 'vertical',
			        align: 'right',
			        verticalAlign: 'middle',
			        borderWidth: 0
			    },
			    series: [{
			        name: '行业用电量同比增长率',
			        data: $scope.seasonData.powers,
			        color:'#23B7E5',
			    }, {
			        name: '行业产值增长率',
			        data: $scope.seasonData.gdps,
			        color:'#DAA520',
			    }]
			};
		}, function(error) {

		}).finally(() => {
	        $rootScope.loading = false;
	    });
	};

	$scope.changeStyle = function(param){
		$scope.SingleVocationChartByYear.options.chart.type = param;
		$scope.SingleVocationChart.options.chart.type = param;
	};

	$scope.changeIndustry = function(param) {
		$scope.industrymark = param;
		getYearData($scope.industrymark);
		getSeasonData($scope.industrymark,$scope.yearmark);
		switch(param) {
			case 3001: {
				$scope.industryType = '农、林、牧、渔';
			};break;
			case 3002: {
				$scope.industryType = '工业';
			};break;
			case 3003: {
				$scope.industryType = '建筑业';
			};break;
			case 3004: {
				$scope.industryType = '交通运输、仓储和邮政业';
			};break;
			case 3005: {
				$scope.industryType = '信息传输、计算机服务和软件业';
			};break;
			case 3006: {
				$scope.industryType = '批发和零售、住宿和餐饮业';
			};break;
			case 3007: {
				$scope.industryType = '金融房地产、商务及居民服务业';
			};break;
			case 3008: {
				$scope.industryType = '公共事业及管理组织';
			};break;
		};
	};

	$scope.changeYear = function(year) {
		$scope.yearmark = year;
		getSeasonData($scope.industrymark, year);
		$scope.changeForcastArea(year);
	};

	$scope.showTables = function(){
		$scope.isShowDataTable = !$scope.isShowDataTable;
	};
	$scope.changeForcastArea = function(param){
		var currentYear = parseInt(new Date().getFullYear());
		var currentMonth = parseInt(new Date().getMonth() + 1);
		var currentSeason = Math.floor( ( currentMonth % 3 == 0 ? ( currentMonth / 3 ) : ( currentMonth / 3 + 1 ) ) );;
		if (param === currentYear) {
			if (currentSeason === 1) {
				$scope.forcastFrom = -0.5;
			} else if (currentSeason === 2) {
				$scope.forcastFrom = 0.5;
			} else if (currentSeason === 3) {
				$scope.forcastFrom = 1.5;
			} else if (currentSeason === 4) {
				$scope.forcastFrom = 2.5;
			}
		} else if(param < currentYear) {
			$scope.forcastFrom = 3.5;
		} else {
			$scope.forcastFrom = -0.5;
		}
	};
	//初始化
	$scope.industrymark = 3001;
	$scope.yearmark = 2016;
	$scope.industryType = '农、林、牧、渔';
	$scope.isShowDataTable = false;
	$scope.forcastFrom = 8;
	$scope.changeForcastArea($scope.yearmark);

	getYearData($scope.industrymark);
	getSeasonData($scope.industrymark,$scope.yearmark);
};