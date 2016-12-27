export default ($scope, $rootScope, qService, environmentRes) => {
    'ngInject';
    $scope.windowHeight=$(window).height();
    //--------------------------airConditionGetPromise---------------------------
    // //这只是后台的一个参数，并不是IP地址的参数，IP地址的参数在地址的问号之后
    var airConditionGetParams = {

    };
    var airConditionGetHeaders = {

    };
    var airConditionGetPromise = qService.httpGetWeather(environmentRes.getAirCondition, airConditionGetParams, airConditionGetHeaders);
    airConditionGetPromise.then(function(data){
        console.log(data.retData.city);
        $scope.today=data.retData.city;
        // console.log(data.results[0].last_update);
        // $scope.today=data.results[0].last_update;
        // //--------------------------盒子1结束----------------------------
    }, function(error){
        console.log('发送失败');
    });
    //-------------------------airConditionGetPromise结束-------------------------
};