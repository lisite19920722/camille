export default ($scope, $rootScope, qService, economyPowerRes) => {
	'ngInject';

	$scope.title = '企业用电量与产值关联分析';
  	$scope.enterpriselist = [
	    {
	      //占位
	    },
	    {
	        name : '太仓振辉化纤有限公司',
	        code : 5001,
	        position:[121.100277,31.603982],
	    },
	    {
	        name : '苏州达诺铸造有限公司',
	        code : 5002,
	        position:[121.097839,31.69338],
	    },
	    {
	        name : '申久化纤有限公司',
	        code : 5003,
	        position:[121.19411,31.620342],
	    },
	    {
	        name : '太仓协鑫光伏科技有限公司',
	        code : 5004,
	        position:[121.182226,31.609841],
	    },
	    {
	        name : '舍弗勒(中国)有限公司',
	        code : 5005,
	        position:[121.118329,31.478157],
	    },
	    {
	        name : '江苏长乐纤维科技有限公司',
	        code : 5006,
	        position:[121.271566,31.57156],
	    },
	    {
	        name : '太仓海螺水泥有限公司',
	        code : 5007,
	        position:[121.108497,31.68122],
	    },
	    {
	        name : '太仓中化环保化工有限公司',
	        code : 5008,
	        position:[121.127511,31.598285],
	    },
	    {
	        name : '奥特斯维能源(太仓)有限公司',
	        code : 5009,
	        position:[121.091417,31.443898],
	    },
	    {
	        name : '太仓利泰纺织厂有限公司',
	        code : 5010,
	        position:[121.19704,31.622541],
	    },
	];
	var getYearData = function(enterpriseId) {
		$rootScope.loading = true;
		$scope.getIndustryYearParams = {
	    	'enterpriseId': enterpriseId,
	    };
		var getYearPromise = qService.httpGetWithToken(economyPowerRes.getEnterpriseYear, $scope.getIndustryYearParams, {});
		getYearPromise.then(function(data) {
			$scope.yearData = data.data;
			(function() {
				for (var i = 0; i < $scope.yearData.gdps.length; i++) {
					if($scope.yearData.gdps[i] == 0) {
						$scope.yearData.gdps[i] = null;
					}
				}
				for (var i = 0; i < $scope.yearData.powers.length; i++) {
					if($scope.yearData.powers[i] == 0) {
						$scope.yearData.powers[i] = null;
					}
				}
			})();
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
		           text: $scope.enterpriseType,
		           style: {
		               fontSize: '15px'
		           }
		    	},
		    	subtitle: {
		    	    text: '',
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
		    	    name: '企业用电量同比增长率',
		    	    data: $scope.yearData.powers,
		    	    color:'#23B7E5',
		    	    events: {
	                    click: function (event) {
	                        $scope.changeYear(event.point.category);
	                    }
	                }
		    	}, {
		    	    name: '企业产值同比增长率',
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

	var getSeasonData = function(enterpriseId, year) {
		$rootScope.loading = true;
		$scope.getIndustrySeasonParams = {
	    	'enterpriseId': enterpriseId,
	    	'year': year,
	    };
		var getSeasonPromise = qService.httpGetWithToken(economyPowerRes.getEnterpriseSeason, $scope.getIndustrySeasonParams, {});
		getSeasonPromise.then(function(data) {
			$scope.seasonData = data.data;
			(function() {
				for (var i = 0; i < $scope.seasonData.gdps.length; i++) {
					if($scope.seasonData.gdps[i] == 0) {
						$scope.seasonData.gdps[i] = null;
					}
				}
				for (var i = 0; i < $scope.seasonData.powers.length; i++) {
					if($scope.seasonData.powers[i] == 0) {
						$scope.seasonData.powers[i] = null;
					}
				}
			})();
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
						enabled: false, // 取消打印menu
					},
			    },
			    title: {
			       text: $scope.enterpriseType,
			       style: {
		               fontSize: '15px'
		           }
			    },
			    subtitle: {
			        text: $scope.yearmark+'年度',
			        x: -20
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
			        name: '企业用电量同比增长率',
			        data: $scope.seasonData.powers,
			        color:'#23B7E5',
			    }, {
			        name: '企业产值增长率',
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

	//通过下拉菜单更换企业
	$scope.changeEnterprise = function(param) {
		$scope.enterprisemark = param;
		getYearData($scope.enterprisemark);
		getSeasonData($scope.enterprisemark,$scope.yearmark);
		switch(param) {
			case 5001: {
				$scope.enterpriseType = $scope.enterpriselist[1].name;
			} break;
			case 5002: {
				$scope.enterpriseType = $scope.enterpriselist[2].name;
			} break;
			case 5003: {
				$scope.enterpriseType = $scope.enterpriselist[3].name;
			} break;
			case 5004: {
				$scope.enterpriseType = $scope.enterpriselist[4].name;
			} break;
			case 5005: {
				$scope.enterpriseType = $scope.enterpriselist[5].name;
			} break;
			case 5006: {
				$scope.enterpriseType = $scope.enterpriselist[6].name;
			} break;
			case 5007: {
				$scope.enterpriseType = $scope.enterpriselist[7].name;
			} break;
			case 5008: {
				$scope.enterpriseType = $scope.enterpriselist[8].name;
			} break;
			case 5009: {
				$scope.enterpriseType = $scope.enterpriselist[9].name;
			} break;
			case 5010: {
				$scope.enterpriseType = $scope.enterpriselist[10].name;
			} break;
		}
	};
	//通过下拉菜单更换年份
	$scope.changeYear = function(year) {
		$scope.yearmark = year;
		getSeasonData($scope.enterprisemark, year);
		$scope.changeForcastArea(year);
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
	$scope.enterprisemark = 5001;
	$scope.yearmark = 2015;
	$scope.enterpriseType = '太仓振辉化纤有限公司';
	$scope.isShowDataTable = false;
	$scope.forcastFrom = 8;

	//run
	getYearData($scope.enterprisemark);
	getSeasonData($scope.enterprisemark,$scope.yearmark);
};