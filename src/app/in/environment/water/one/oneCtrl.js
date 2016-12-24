export default ($scope, $rootScope, qService, environmentRes, $http) => {
	'ngInject';
    //--------------------------waterPollutionGetPromise----------------------------
    var waterPollutionGetParams = {
        // 'id':1,
    };
    var waterPollutionGetHeaders = {

    };
    var waterPollutionGetPromise = qService.httpGetWithToken(environmentRes.getWaterPollution, waterPollutionGetParams, waterPollutionGetHeaders);
    waterPollutionGetPromise.then(function(data){
        // console.log(data.data);
        $scope.box1Date=data.data[0];
        $scope.box2Date=data.data[1];
        //盒子2中五个工厂各自最近6天的废水排放量(右上角)
        $scope.discharge1=data.data[2];
        $scope.discharge2=data.data[3];
        $scope.discharge3=data.data[4];
        $scope.discharge4=data.data[5];
        $scope.discharge5=data.data[6];
        //盒子2所排放的废水中污染物细分指标（右下角）
        $scope.pollutionCod=data.data[7];
        $scope.pollutionNh4n=data.data[8];
        $scope.pollutionP=data.data[9];
        //--------------------------盒子1-----------------------------
        $scope.factory={
            options:{
                chart: {
                    type: 'column'
                },
                exporting:{
                    enabled: false
                },
                title: {
                    text: '工厂废水排放'
                },
                subtitle: {
                    text: '来源：太仓市环保局'
                },
                credits: {
                    enabled:false
                },
                xAxis: {
                    categories: $scope.box1Date
                    // categories: [
                    //     '6月1日',
                    //     '6月2日',
                    //     '6月3日',
                    //     '6月4日',
                    //     '6月5日',
                    //     '6月6日',
                    //     '6月7日',
                    // ]
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '吨'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} 吨</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                }
            },
            series: [
                {
                    name: '太仓市佳煌针织印染有限公司',
                    // data: $scope.list11
                    data: [4963, 4619, 5012, 4660, 4893, 4559, 4711],
                    color:"#7cb5ec"
                }, {
                    name: '洛克伍德染料有限公司',
                    // data: $scope.list12
                    data: [1595, 1200, 1914, 1444, 1568, 1862, 1717],
                    color:"#73e58d"
                }, {
                    name: '太仓虹盛印染厂',
                    // data: $scope.list13
                    data: [1016, 830, 902, 1134, 616, 349, 508],
                    color:"#444444"
                }, {
                    name: '太仓市金佳漂染厂',
                    // data: $scope.list14
                    data: [649, 966, 1078, 902, 2037, 1813, 1489],
                    color:"#0033ff"
                }, {
                    name: '江苏长乐纤维科技有限公司',
                    // data: $scope.list15
                    data: [1654, 1556, 1865, 2567, 2015, 1892, 1568],
                    color:"#888888"
                }
            ]
        };

        $scope.showindustry= function(){
            $scope.industryshow= !$scope.industryshow;
        };

        $scope.totaldata = {
            tabledata:
                [
                    {yearvalue:'日期',JLfactory:'太仓市佳煌针织印染有限公司（吨）' ,Afactory:'洛克伍德燃料有限公司（吨）',Bfactory:'太仓虹盛印染厂（吨）',Cfactory:'太仓市金佳漂染厂（吨）',Dfactory:'江苏长乐纤维科技有限公司（吨）'},
                    {yearvalue:$scope.box1Date[0], JLfactory:4963,Afactory:1595,Bfactory:1016,Cfactory:649,Dfactory:1654},
                    {yearvalue:$scope.box1Date[1], JLfactory:4619,Afactory:1200,Bfactory:830,Cfactory:966,Dfactory:1556},
                    {yearvalue:$scope.box1Date[2], JLfactory:5012,Afactory:1914,Bfactory:902,Cfactory:1078,Dfactory:1865},
                    {yearvalue:$scope.box1Date[3], JLfactory:4660,Afactory:1444,Bfactory:1134,Cfactory:902,Dfactory:2567},
                    {yearvalue:$scope.box1Date[4], JLfactory:4893,Afactory:1568,Bfactory:616,Cfactory:2037,Dfactory:2015},
                    {yearvalue:$scope.box1Date[5], JLfactory:4559,Afactory:1862,Bfactory:349,Cfactory:1813,Dfactory:1892},
                    {yearvalue:$scope.box1Date[6], JLfactory:4711,Afactory:1717,Bfactory:508,Cfactory:1489,Dfactory:1568}
                ]
        };
        // $scope.totaldata = {
        //     tabledata:
        //     [
        //         {yearvalue:'日期',JLfactory:'太仓市佳煌针织印染有限公司（吨）' ,Afactory:'洛克伍德燃料有限公司（吨）',Bfactory:'太仓虹盛印染厂（吨）',Cfactory:'太仓市金佳漂染厂（吨）',Dfactory:'江苏长乐纤维科技有限公司（吨）'},
        //         {yearvalue:'6月1日', JLfactory:500,Afactory:500,Bfactory:500,Cfactory:500,Dfactory:500},
        //         {yearvalue:'6月2日', JLfactory:400,Afactory:400,Bfactory:400,Cfactory:400,Dfactory:400},
        //         {yearvalue:'6月3日', JLfactory:300,Afactory:300,Bfactory:300,Cfactory:300,Dfactory:300},
        //         {yearvalue:'6月4日', JLfactory:400,Afactory:400,Bfactory:400,Cfactory:400,Dfactory:400},
        //         {yearvalue:'6月5日', JLfactory:600,Afactory:600,Bfactory:600,Cfactory:600,Dfactory:600},
        //         {yearvalue:'6月6日', JLfactory:800,Afactory:800,Bfactory:800,Cfactory:800,Dfactory:800},
        //         {yearvalue:'6月7日', JLfactory:700,Afactory:700,Bfactory:700,Cfactory:700,Dfactory:700}
        //     ]
        // };
        //--------------------------盒子1结束--------------------------
    }, function(error){
        console.log('发送失败');
    });
    //--------------------------waterPollutionGetPromise----------------------------
};