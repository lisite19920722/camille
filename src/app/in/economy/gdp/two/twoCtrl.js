export default ($scope, $rootScope, qService,economyGdpRes) => {
  'ngInject';
  $scope.containerHeight = $(window).height() - 127;
    $scope.currentyear = "2016";
        var now = new Date();
    var nowyear = now.getFullYear();
    $scope.txtexpression = "年度GDP预测采用的是基于时间序列的自回归积分滑动平均模型，通过该模型分析预测得出：本年GDP增速较往年有所放缓。";
    $scope.monthexchange=function(param){
       $scope.monthGDPChart.series[0].type=param;
       $scope.monthGDPChart.series[1].type=param;
       $scope.monthGDPChart.series[2].type='spline';
       switch(param){
        case 'line':
        $("#column").removeClass("ebuttonActive");
        $("#spline").removeClass("ebuttonActive");
        $("#area").removeClass("ebuttonActive");
        $("#line").addClass("ebuttonActive");
        break;
        case 'spline':
         $("#column").removeClass("ebuttonActive");
         $("#spline").addClass("ebuttonActive");
         $("#area").removeClass("ebuttonActive");
         $("#line").removeClass("ebuttonActive");
         break;
         case 'column':
         $("#column").addClass("ebuttonActive");
         $("#spline").removeClass("ebuttonActive");
         $("#area").removeClass("ebuttonActive");
         $("#line").removeClass("ebuttonActive");
         break;
         case 'area':
         $("#column").removeClass("ebuttonActive");
         $("#spline").removeClass("ebuttonActive");
         $("#area").addClass("ebuttonActive");
         $("#line").removeClass("ebuttonActive");
         break;
       }
       };
    
    var yearDetailPromise = qService.httpGetWithToken(economyGdpRes.getYearDetail,{year:nowyear},{});
    $scope.yearchoose = nowyear;
    $scope.monthforecast = true;
    yearDetailPromise.then(function(rc){
        for(var rgqd = 0; rgqd<rc.data.realGdpQuarterDetail.length;rgqd++){
            if (rc.data.realGdpQuarterDetail[rgqd] == 0) {
                rc.data.realGdpQuarterDetail[rgqd] = null;
            }
        }
        (function yerachanged(){
            var i = 0;
            while(i<rc.data.realGdpQuarterDetail.length){
                  if (i == 0&&rc.data.realGdpQuarterDetail[i]== null) {
                $scope.alreadycomplete = 0;
                $scope.currentGDP = 0;
                $scope.currentSeason = '当前';
                break;
            }else if (rc.data.realGdpQuarterDetail[i] == null) {
                $scope.alreadycomplete = (rc.data.realGdpQuarterDetail[i-1]/1100).toFixed(2)*100;
                $scope.currentGDP = rc.data.realGdpQuarterDetail[i-1];
                if (i == 1) {
                    $scope.currentSeason = '一';
                }else if (i == 2) {
                    $scope.currentSeason = '二';
                }else if (i == 3 ) {
                    $scope.currentSeason = '三';
                }
                break;
            }else if (rc.data.realGdpQuarterDetail[i] !=null&&i==3) {
                $scope.alreadycomplete = (rc.data.realGdpQuarterDetail[i]/1100).toFixed(2)*100;
                $scope.currentGDP = rc.data.realGdpQuarterDetail[i];
                $scope.currentSeason = '四';
                break;
            }
            i++;
            }
        }());
      $scope.gdpquarterrealvalue = rc.data.realGdpQuarterDetail;

       $scope.currentSeason = '一';
       $scope.currentGDP = rc.data.realGdpQuarterDetail[0];
       $scope.alreadycomplete = (rc.data.realGdpQuarterDetail[0]/1140).toFixed(2)*100;
      for(var i = 0;i<$scope.gdpquarterrealvalue.length;i++){
        if ($scope.gdpquarterrealvalue[i] == null) {
           $scope.gdpquarterrealvalue[i] = '--';
        }
      }
      $scope.gdpquarterforcastvalue = rc.data.forecastGdpQuterDetail;
      $scope.gdpquartergrowratevalue = rc.data.growRate; 
      $scope.nowYearForcast = rc.data.forecastGdpQuterDetail[3];
        $scope.monthcheckdeviation=function(){
          $("#eerror").addClass("navactive");
        $("#history").removeClass("navactive");
        $scope.monthforecast = false;
        $scope.monthdeviation = !$scope.monthdeviation;
        $scope.montherrorRate = rc.data.quarterError;
        for(var i = 0;i<$scope.montherrorRate.length;i++){
        if ($scope.montherrorRate[i] == 0) {
           $scope.montherrorRate[i] = '--';
        }
      }
    }  
      $scope.monthcheckforecast = function(){
        $("#eerror").removeClass("navactive");
        $("#history").addClass("navactive");
        $scope.monthdeviation = false;
            $scope.monthforecast = !$scope.monthforecast;
            $scope.gdpquarterrealvalue = rc.data.realGdpQuarterDetail;
            $scope.gdpquarterforcastvalue = rc.data.forecastGdpQuterDetail;
    }
      $scope.monthGDPChart={
        options: {
          chart: {
            type:'column'
          },
          exporting: {
            enabled: false
          }
        },
        credits:{
                enabled:false,
            },
            title: {
                text: '太仓市GDP数据',
                 style:{
                    fontWeight:'bold'
                }
            },
            subtitle: {
                text: '季度GDP分析'
            },
            xAxis: {
               categories: [
                    '第一季度',
                    '第二季度',
                    '第三季度',
                    '第四季度'

                ],
                 plotBands:[{
                from: 3.5,
                to:3.5,
                color:'rgba(68, 170, 213, .2)',
                label: {
                        text: '预测区',
                        verticalAlign: 'top',
                        style: {
                            fontSize: '12px',
                            fontWeight: 600
                        }

                    }
                }]
            },
            yAxis: [{
                min: 0,
                title: {
                    text: '季度GDP总值（亿元）'
                },
                 plotLines:[{
                color:'red',
                dashStyle:'DashDot',
                value:$scope.aimgdp,
                width:2,
                label:{
                    text:'本年度GDP目标',
                    align:'left',
                    x:10,
                     style: {
                            fontSize: '8px',
                            fontWeight: 200
                        }
                }
                }]
            },
            {
                title: {
                    text: '同比增长率'
                },
                labels: {
                    format: '{value} %',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
            },
            opposite:true
            }],
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                color:'#7CB5EC',
                type: 'column',
                name: '真实数据',
                data: $scope.gdpquarterrealvalue

            }, {
                color:'#708090',
                type: 'column',
                name: '预测数据',
                data: $scope.gdpquarterforcastvalue

            },
            {
                yAxis: 1,
                 color:'#90ED7D',
                type:'spline',
                name: '同比增长率',
                data: $scope.gdpquartergrowratevalue
            }]
      };

     
   });
    $scope.changeyear=function(param){
        $scope.monthdeviation = false;
        $scope.monthforecast = false;
        switch(param){
        case '2015':
        $("#2014").removeClass("ebuttonActive");
        $("#2016").removeClass("ebuttonActive");
        $("#2015").addClass("ebuttonActive");
        break;
        case '2016':
         $("#2014").removeClass("ebuttonActive");
         $("#2016").addClass("ebuttonActive");
         $("#2015").removeClass("ebuttonActive");
         break;
         case '2014':
         $("#2014").addClass("ebuttonActive");
         $("#2016").removeClass("ebuttonActive");
         $("#2015").removeClass("ebuttonActive");
         break;
       }
        var yearDetailPromise = qService.httpGetWithToken(economyGdpRes.getYearDetail,{year:param},{});
        yearDetailPromise.then(function(rc){
          $scope.monthforecast = true;
            for(var rgqd = 0; rgqd<rc.data.realGdpQuarterDetail.length;rgqd++){
            if (rc.data.realGdpQuarterDetail[rgqd] == 0) {
                rc.data.realGdpQuarterDetail[rgqd] = null;
            }
        }
            if (param == 2016 ) {
              $scope.aimgdp = 1130;
            }else if (param == 2015) {
                $scope.aimgdp = 1090;
            }else if (param == 2014) {
                $scope.aimgdp = 1070;
            }
            (function yerachanged(){
            var i = 0;
            while(i<rc.data.realGdpQuarterDetail.length){
                  if (i == 0&&rc.data.realGdpQuarterDetail[i]== 0) {
                $scope.alreadycomplete = 0;
                $scope.currentGDP = 0;
                $scope.currentSeason = '当前';
                break;
            }else if (rc.data.realGdpQuarterDetail[i] == 0) {
                $scope.alreadycomplete = (rc.data.realGdpQuarterDetail[i-1]/$scope.aimgdp).toFixed(2)*100;
                $scope.currentGDP = rc.data.realGdpQuarterDetail[i-1];
                if (i == 1) {
                    $scope.currentSeason = '一';
                }else if (i == 2) {
                    $scope.currentSeason = '二';
                }else if (i == 3 ) {
                    $scope.currentSeason = '三';
                }
                break;
            }else if (rc.data.realGdpQuarterDetail[i] !=0&&i==3) {
                $scope.alreadycomplete = (rc.data.realGdpQuarterDetail[i]/$scope.aimgdp).toFixed(2)*100;
                $scope.currentGDP = rc.data.realGdpQuarterDetail[i];
                $scope.currentSeason = '四';
                break;
            }
            i++;
            }
        }());
            if (param == 2016) {
                $scope.currentSeason = '一';
                $scope.currentGDP = rc.data.realGdpQuarterDetail[0];
                $scope.alreadycomplete = (rc.data.realGdpQuarterDetail[0]/1140).toFixed(2)*100;
            }
        $scope.yearchoose = param;
        
        $scope.nowYearForcast = rc.data.forecastGdpQuterDetail[3];
        $scope.gdpquarterrealvalue = rc.data.realGdpQuarterDetail;
        $scope.gdpquarterforcastvalue = rc.data.forecastGdpQuterDetail;
        $scope.montherrorRate = rc.data.quarterError;
        for(var i = 0;i<$scope.montherrorRate.length;i++){
        if ($scope.montherrorRate[i] == 0) {
           $scope.montherrorRate[i] = '--';
        }
      }
       $scope.monthcheckdeviation=function(){
          $("#eerror").addClass("navactive");
        $("#history").removeClass("navactive");
        $scope.monthforecast = false;
        $scope.monthdeviation = !$scope.monthdeviation;
        $scope.montherrorRate = rc.data.quarterError;
        for(var i = 0;i<$scope.montherrorRate.length;i++){
        if ($scope.montherrorRate[i] == 0) {
           $scope.montherrorRate[i] = '--';
        }
      }
    }  
      $scope.monthcheckforecast = function(){
        $("#eerror").removeClass("navactive");
        $("#history").addClass("navactive");
        $scope.monthdeviation = false;
            $scope.monthforecast = !$scope.monthforecast;
            $scope.gdpquarterrealvalue = rc.data.realGdpQuarterDetail;
            $scope.gdpquarterforcastvalue = rc.data.forecastGdpQuterDetail;
    }
        $scope.monthGDPChart.series[0].data=rc.data.realGdpQuarterDetail;
        $scope.monthGDPChart.series[1].data=rc.data.forecastGdpQuterDetail;
        $scope.monthGDPChart.series[2].data=rc.data.growRate; 
      });
   }  
};