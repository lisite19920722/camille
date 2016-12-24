export default ($scope, $rootScope, qService, environmentRes, $timeout) => {
	'ngInject';
    //--------------------------airConditionGetPromise---------------------------
    //这只是后台的一个参数，并不是IP地址的参数，IP地址的参数在地址的问号之后
    var airConditionGetParams = {

    };
    var airConditionGetHeaders = {
        'apikey':'8a2ea9c51525a5332967ae13c1454deb',
    };
    var airConditionGetPromise = qService.httpGetWithToken(environmentRes.getAirCondition, airConditionGetParams, airConditionGetHeaders);
    airConditionGetPromise.then(function(data){
        //--------------------------盒子1----------------------------
        //盒子1中右上方日期$scope.airConditionTomorrow
        //依照今天日期计算明天日期
        var dependedVal=data.retData.today.date;
        var d = dependedVal;
        d = new Date(d);
        d = + d + 1000*60*60*24;
        d = new Date(d);
        dependedVal=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
        //依照今天日期计算明天日期结束
        var regEx = new RegExp("-","");
        dependedVal=dependedVal.replace(regEx,"年");
        dependedVal=dependedVal.replace(regEx,"月");
        dependedVal+="日";
        $scope.airConditionTomorrow=dependedVal;
        //盒子1中Highcharts中日期$scope.airConditionDate(也是展开表格中的日期)
        var dependedVal1=new Array();
        var regEx1 = new RegExp("-","");
        for (var i=0;i<=6;i++){
            dependedVal1[i]=data.retData.today.date;
            var d = dependedVal1[i];
            d = new Date(d);
            d = + d + (i-3)*1000*60*60*24;
            d = new Date(d);
            dependedVal1[i]=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
            dependedVal1[i]=dependedVal1[i].replace(regEx1,"年");
            dependedVal1[i]=dependedVal1[i].replace(regEx1,"月");
            dependedVal1[i]+="日";
            var regEx2 = new RegExp(dependedVal1[i].substring(0,5),"");
            dependedVal1[i]=dependedVal1[i].replace(regEx2,"");
        }
        $scope.airConditionDate=dependedVal1;
        //盒子1中的天气状况、风向风级
        var dependedType=new Array();
        var dependedFengxiangFengli=new Array();
        for (var i=0;i<3;i++){
            dependedType[i]=data.retData.history[i+4].type;
            dependedFengxiangFengli[i]=data.retData.history[i+4].fengxiang+" "+data.retData.history[i+4].fengli;
        }
        dependedType[3]=data.retData.today.type;
        dependedFengxiangFengli[3]=data.retData.today.fengxiang+" "+data.retData.today.fengli;
        for (var i=4;i<7;i++){
            dependedType[i]=data.retData.forecast[i-4].type;
            dependedFengxiangFengli[i]=data.retData.forecast[i-4].fengxiang+" "+data.retData.forecast[i-4].fengli;
        }
        $scope.airConditionType=dependedType;
        $scope.airConditionFengxiangFengli=dependedFengxiangFengli;
        //盒子1中的最高温
        var dependedHightemp=new Array();
        for (var i=0;i<3;i++){
            dependedHightemp[i]=data.retData.history[i+4].hightemp;
            var regEx3 = new RegExp("℃","");
            dependedHightemp[i]=dependedHightemp[i].replace(regEx3,"");
        }
        dependedHightemp[3]=data.retData.today.hightemp;
        var regEx3 = new RegExp("℃","");
        dependedHightemp[3]=dependedHightemp[3].replace(regEx3,"");
        for (var i=4;i<7;i++){
            dependedHightemp[i]=data.retData.forecast[i-4].hightemp;
            var regEx3 = new RegExp("℃","");
            dependedHightemp[i]=dependedHightemp[i].replace(regEx3,"");
        }
        $scope.airConditionHightemp=dependedHightemp;
        //盒子1中的最低温
        var dependedLowtemp=new Array();
        for (var i=0;i<3;i++){
            dependedLowtemp[i]=data.retData.history[i+4].lowtemp;
            var regEx3 = new RegExp("℃","");
            dependedLowtemp[i]=dependedLowtemp[i].replace(regEx3,"");
        }
        dependedLowtemp[3]=data.retData.today.lowtemp;
        var regEx3 = new RegExp("℃","");
        dependedLowtemp[3]=dependedLowtemp[3].replace(regEx3,"");
        for (var i=4;i<7;i++){
            dependedLowtemp[i]=data.retData.forecast[i-4].lowtemp;
            var regEx3 = new RegExp("℃","");
            dependedLowtemp[i]=dependedLowtemp[i].replace(regEx3,"");
        }
        $scope.airConditionLowtemp=dependedLowtemp;
        //盒子1中的明日温差
        $scope.airConditionTomorrowDiff=parseInt($scope.airConditionHightemp[4])-parseInt($scope.airConditionLowtemp[4]);
        //盒子1中更换天气图标
        if(dependedType[4].indexOf("云")!=-1)
            $scope.flag1=1;
        else if(dependedType[4].indexOf("阴")!=-1)
            $scope.flag2=1;
        else if(dependedType[4].indexOf("雨")!=-1)
            $scope.flag3=1;
        else if(dependedType[4].indexOf("雪")!=-1)
            $scope.flag4=1;
        else
            $scope.flag5=1;
        $scope.temperature={
            options:{
                chart: {
                    renderTo: 'container',
                    type: 'spline',

                },
                legend: {
                    itemStyle:{
                        fontWeight:'normal'
                    }
                }
            },
            title: {
                text: '过去三天与未来四天最高最低气温',
                style: {
                    fontWeight:'bold',
                },
                x:20
            },
            credits: {
                enabled:false
            },
            xAxis: {
                categories: $scope.airConditionDate
                // categories: ['4月20日', '4月21日', '4月22日', '4月23日', '4月24日', '4月25日','4月26日']
            },
            yAxis: {
                title: {
                    text: '温度 (°C)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: '°C'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0,
            },
            series: [{
                name: "最高气温",
                data: [parseInt($scope.airConditionHightemp[0]), parseInt($scope.airConditionHightemp[1]), parseInt($scope.airConditionHightemp[2]), parseInt($scope.airConditionHightemp[3]), parseInt($scope.airConditionHightemp[4]), parseInt($scope.airConditionHightemp[5]), parseInt($scope.airConditionHightemp[6])]
                // data: [18, 20, 12, 16, 19, 12, 15]
            },  {
                name: '最低气温',
                // data: [14, 9, 1, 9, 12, 12, 5]
                data: [parseInt($scope.airConditionLowtemp[0]), parseInt($scope.airConditionLowtemp[1]), parseInt($scope.airConditionLowtemp[2]), parseInt($scope.airConditionLowtemp[3]), parseInt($scope.airConditionLowtemp[4]), parseInt($scope.airConditionLowtemp[5]), parseInt($scope.airConditionLowtemp[6])]
            }]
        };
        //点击展开盒子1的详细信息
        $scope.showTotalTable = function(){
            $scope.totalshow= !$scope.totalshow;
        };
        //盒子1中展开表格的数据
        $scope.totaldata = {
            tabledata:
                [
                    {yearvalue:'日期',weather:'天气状况' ,Htemperature:'最高气温(°C)',Ltemperature:'最低气温(°C)',wind:'风向风级'},
                    {yearvalue:$scope.airConditionDate[0],weather:$scope.airConditionType[0],Htemperature:$scope.airConditionHightemp[0],Ltemperature:$scope.airConditionLowtemp[0],wind:$scope.airConditionFengxiangFengli[0]},
                    {yearvalue:$scope.airConditionDate[1],weather:$scope.airConditionType[1], Htemperature:$scope.airConditionHightemp[1],Ltemperature:$scope.airConditionLowtemp[1],wind:$scope.airConditionFengxiangFengli[1]},
                    {yearvalue:$scope.airConditionDate[2], weather:$scope.airConditionType[2],Htemperature:$scope.airConditionHightemp[2],Ltemperature:$scope.airConditionLowtemp[2],wind:$scope.airConditionFengxiangFengli[2]},
                    {yearvalue:$scope.airConditionDate[3], weather:$scope.airConditionType[3],Htemperature:$scope.airConditionHightemp[3],Ltemperature:$scope.airConditionLowtemp[3],wind:$scope.airConditionFengxiangFengli[3]},
                    {yearvalue:$scope.airConditionDate[4], weather:$scope.airConditionType[4],Htemperature:$scope.airConditionHightemp[4],Ltemperature:$scope.airConditionLowtemp[4],wind:$scope.airConditionFengxiangFengli[4]},
                    {yearvalue:$scope.airConditionDate[5], weather:$scope.airConditionType[5],Htemperature:$scope.airConditionHightemp[5],Ltemperature:$scope.airConditionLowtemp[5],wind:$scope.airConditionFengxiangFengli[5]},
                    {yearvalue:$scope.airConditionDate[6],weather:$scope.airConditionType[6],Htemperature:$scope.airConditionHightemp[6],Ltemperature:$scope.airConditionLowtemp[6],wind:$scope.airConditionFengxiangFengli[6]},
                    //
                    // {yearvalue:'6月2日',weather:'大雨转中雨', Htemperature:'20',Ltemperature:'9',wind:'南风3~4级'},
                    // {yearvalue:'6月3日', weather:'阴转多云',Htemperature:'16',Ltemperature:'7',wind:'北风4~5级'},
                    // {yearvalue:'6月4日', weather:'多云转阴',Htemperature:'14',Ltemperature:'8',wind:'南风3~4级'},
                    // {yearvalue:'6月5日', weather:'雨转阴',Htemperature:'19',Ltemperature:'11',wind:'东北风3~4级'},
                    // {yearvalue:'6月6日', weather:'雨转阴',Htemperature:'17',Ltemperature:'11',wind:'东风3~4级'},
                    // {yearvalue:'6月7日', weather:'阴',Htemperature:'17',Ltemperature:'6',wind:'东北风3~4级'}
                ]
        };
        //--------------------------盒子1结束----------------------------
    }, function(error){
        console.log('发送失败');
    });
    //-------------------------airConditionGetPromise结束-------------------------
};