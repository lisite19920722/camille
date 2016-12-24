export default ($scope, $rootScope, qService, environmentRes, $timeout) => {
    'ngInject';
    $scope.windowHeight=$(window).height();
    //---------------------------airQualityGetPromise-----------------------------
    var airQualityGetParams = {
        // 'id':1,
    };
    var airQualityGetHeaders = {

    };
    var airQualityGetPromise = qService.httpGetWithToken(environmentRes.getAirQuality, airQualityGetParams, airQualityGetHeaders);
    airQualityGetPromise.then(function(data){
        // console.log(data.data);
        //盒子2的Highcharts的日期,若今日是6月8日,box2Date就是6月1日~6月7日
        $scope.box2Date=data.data[0];
        //盒子2的右侧的日期
        $scope.box2Today=data.data[1];
        //盒子4的右侧的日期
        $scope.box4Today=data.data[2];
        //盒子2的左侧的Highcharts中的过去七天AQI数值
        $scope.box2AQI=data.data[3];
        //盒子2右侧、盒子4的右侧的实时空气质量
        $scope.box24Index=data.data[4];
        //盒子2右侧的AQI级别
        $scope.airQualityLevel=data.data[5];
        //盒子2右侧的对健康影响
        $scope.healthEffect=data.data[6];
        //盒子2右侧的建议措施
        $scope.proposedMeasure=data.data[7];
        //盒子4左侧的Highcharts图表的数据
        $scope.box4Left=data.data[8];
        //--------------------------盒子2----------------------------
        //盒子2的Highcharts图表
        $scope.aqilinechart={
            options:{
                title: {
                    text: '过去七天空气质量AQI',
                    style: {
                        fontWeight:'bold',
                    },
                    x:20
                },
                exporting:{
                    enabled: false
                },
                credits: {
                    enabled:false
                },
                xAxis: {
                    categories: $scope.box2Date
                    // categories: ['6月1日', '6月2日', '6月3日', '6月4日', '6月5日','6月6日','6月7日']
                },
                yAxis: {
                    title: {
                        text: '空气质量指数(AQI)日均值'
                    }
                },
                legend: {
                    itemStyle:{
                        fontWeight:'normal'
                    }
                }
            },
            series: [{
                type: 'column',
                name: '实际AQI',
                color:"#95ceff",
                data: [$scope.box2AQI[0].aqi, $scope.box2AQI[1].aqi, $scope.box2AQI[2].aqi, $scope.box2AQI[3].aqi, $scope.box2AQI[4].aqi, $scope.box2AQI[5].aqi, $scope.box2AQI[6].aqi]
                // data: [50, 49, 65, 70, 43, 56, 41]
            },  {
                type: 'spline',
                name: '预测AQI',
                color:"#1F1F1F",
                data: [$scope.box2AQI[0].aqi-5, $scope.box2AQI[1].aqi+3, $scope.box2AQI[2].aqi+2, $scope.box2AQI[3].aqi-3, $scope.box2AQI[4].aqi-4, $scope.box2AQI[5].aqi+2, $scope.box2AQI[6].aqi-3]
                // data: [45, 57, 64, 78, 49, 52, 48]
            }]
        };
        //点击展开盒子2的对健康的影响
        $scope.openorclose='↓展开';
        $scope.openHealthList = function(){
            $scope.ishealthopen = !$scope.ishealthopen;
            if (!$scope.ishealthopen){
                $scope.openorclose='↓展开';
                $scope.openorclose1='↑关闭';
            }else{
                $scope.openorclose='↑关闭';
                $scope.openorclose1='↓展开';
            }
            $scope.issuggestionopen = false;
        };
        //点击展开盒子2的对建议措施
        $scope.openorclose1='↓展开';
        $scope.openSuggestionList = function(){
            $scope.issuggestionopen = !$scope.issuggestionopen;
            if (!$scope.issuggestionopen){
                $scope.openorclose1='↓展开';
                $scope.openorclose='↑关闭';
            }else{
                $scope.openorclose1='↑关闭';
                $scope.openorclose='↓展开';
            }
            $scope.ishealthopen = false;
        };
        //------------------------盒子2结束---------------------------
    }, function(error){
        console.log('发送失败');
    });
    //-------------------------airQualityGetPromise结束--------------------------
};