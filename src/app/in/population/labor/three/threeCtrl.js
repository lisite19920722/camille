export default ($scope, $stateParams, qService, populationRes) => { 
	'ngInject';

    //年份选择按钮
	$scope.isMenu1 = false;
	$scope.toggleMenu1 =() => {
		$scope.isMenu1 = !$scope.isMenu1;
	};
	//年份选择数据
    $scope.yearSelect1 = ['2020', '2025', '2030', '2035', '2040', '2045'];

	var laPromise = qService.httpGetWithToken(populationRes.getLaborGdpRelationPreData,{},{});

	laPromise.then(function(rc){

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

		$scope.populationPie = {
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
		console.log(rc);
	},function(error){ 
		console.log('发送失败');  	 
	});
};