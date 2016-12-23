export default ($scope, $rootScope, qService,economyGdpRes) => {
  'ngInject';
  var IndustryPromise = qService.httpGetWithToken(economyGdpRes.getIndustryDetail,{},{});
     $scope.industryexchange=function(param){
       $scope.industryyearGDPChart.series[0].type=param;
       $scope.industryyearGDPChart.series[1].type=param;
       $scope.industryyearGDPChart.series[2].type=param;
       };
     
     IndustryPromise.then(function(rc){
        for(var i=0;i<12;i++){
            if (rc.data.FirstRealYearGdp[i]==0) {
                rc.data.FirstRealYearGdp[i] = rc.data.FirstForecastYearGdp[i];
                rc.data.SecondRealYearGdp[i] = rc.data.SecondForecastYearGdp[i];
                rc.data.ThirdRealYearGdp[i] = rc.data.ThirdForecastYearGdp[i];
            }
        }
        $scope.firstindustryvalue = rc.data.FirstRealYearGdp;
        $scope.secondindustryvalue = rc.data.SecondRealYearGdp;
        $scope.thirdindustryvalue = rc.data.ThirdRealYearGdp;
        $scope.forecastvalue = rc.data.FirstRealYearGdp[9]+rc.data.SecondRealYearGdp[9]+rc.data.ThirdRealYearGdp[9];
         $scope.industryyearGDPChart={
        options: {
          chart: {
            type:'column'
          },
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
                text: '按年度分产业GDP分析'
            },
            xAxis: {
                categories: [
                    
                    '2007',
                    '2008',
                    '2009',
                    '2010',
                    '2011',
                    '2012',
                    '2013',
                    '2014',
                    '2015',
                    '2016',
                    '2017',
                    '2018'
                    
                ],
                 plotBands:[{
                from: 8.5,
                to:12.5,
                color:'rgba(68, 170, 213, .2)',
                label: {
                        text: '预测区',
                        verticalAlign: 'top',
                        style: {
                            fontSize: '12px',
                            fontWeight: 600
                        }
                       
                    }
                }],
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
                min: 0,
                title: {
                    text: '年度GDP总值（亿元）'
                }
            },
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
                color:'#929bce',
                name: '第一产业',
                data: $scope.firstindustryvalue

            }, {
                color:'#2E8B57',
                name: '第二产业',
                data: $scope.secondindustryvalue

            },
            {   color:'#465299',
                name: '第三产业',
                data: $scope.thirdindustryvalue
            }]
      };
     });

    (function(){
        var Industrynow = new Date();
        var Industrynowyear = Industrynow.getFullYear();
        $scope.thisyear = Industrynowyear;
        $scope.industrydetail = !$scope.industrydetail;
        var IndustryYearDetailPromise = qService.httpGetWithToken(economyGdpRes.getYearIndustryDetail,{year:Industrynowyear},{});
        IndustryYearDetailPromise.then(function(rc){
          $scope.first = true;
          $scope.checkfirst = function(){
            $scope.first = true;
            $scope.second = false;
            $scope.third = false;
            $("#first").addClass("navactive");
            $("#second").removeClass("navactive");
            $("#third").removeClass("navactive");
          }
          $scope.checksecond = function(){
            $scope.first = false;
            $scope.second = true;
            $scope.third = false;
            $("#first").removeClass("navactive");
            $("#second").addClass("navactive");
            $("#third").removeClass("navactive");
          }
          $scope.checkthird = function(){
            $scope.first = false;
            $scope.second = false;
            $scope.third = true;
            $("#first").removeClass("navactive");
            $("#second").removeClass("navactive");
            $("#third").addClass("navactive");
          }
        $scope.thisyearfirstindustryvalue = rc.data.firstIndustryRealDetail;
        $scope.thisyearfirstindustryfcvalue = rc.data.firstIndustryForecastDetail;
        $scope.thisyearfirstindustrygrowvalue = rc.data.firstIndustryGrowRate;
        $scope.thisyearsecondindustryvalue = rc.data.secondIndustryRealDetail;
        $scope.thisyearsecondindustryfcvalue = rc.data.secondIndustryForecastDetail;
        $scope.thisyearsecondindustrygrowvalue = rc.data.secondIndustryGrowRate;
        $scope.thisyearthirdindustryvalue = rc.data.thirdIndustryRealDetail;
        $scope.thisyearthirdindustryfcvalue = rc.data.thirdIndustryForecastDetail;
        $scope.thisyearthirdindustrygrowvalue = rc.data.thirdIndustryGrowRate;
        $scope.primaryGDPChart={
         options: {
          chart: {
            type:'column'
          },
        },
            
            credits:{
                enabled:false,
            },
            title: {
                text: '太仓市GDP数据'
            },
            subtitle: {
                text: '第一产业本年度GDP分析'
            },
           xAxis: {
                categories:[
                '第一季度',
                '第二季度',
                '第三季度',
                '第四季度'],

                labels: {
                    rotation: -45,
                    align: 'right',
                    style: {
                        fontSize: '8px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: [{
                min: 0,
                title: {
                    text: '第一产业季度GDP总值（亿元）'
                }
            },{
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
                data: $scope.thisyearfirstindustryvalue

            }, {
                color:'#708090',
                type: 'column',
                name: '预测数据',
                data: $scope.thisyearfirstindustryfcvalue

            },
            {

                yAxis: 1,
                color:'#90ED7D',
                type:'spline',
                name: '同比增长率',
                data: $scope.thisyearfirstindustrygrowvalue
            }]

      };
      $scope.secondGDPChart={
        options: {
          chart: {
            type:'column'
          },
        },
            credits:{
                enabled:false,
            },
            credits:{
                enabled:false,
            },
            title: {
                text: '太仓市GDP数据'
            },
            subtitle: {
                text: '第二产业本年度GDP分析'
            },
           xAxis: {
                categories:[
                '第一季度',
                '第二季度',
                '第三季度',
                '第四季度'],

                labels: {
                    rotation: -45,
                    align: 'right',
                    style: {
                        fontSize: '8px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: [{
                min: 0,
                title: {
                    text: '第二产业季度GDP总值（亿元）'
                }
            },{
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
                data: $scope.thisyearsecondindustryvalue

            }, {
                color:'#708090',
                type: 'column',
                name: '预测数据',
                data: $scope.thisyearsecondindustryfcvalue

            },
            {

                yAxis: 1,
                color:'#90ED7D',
                type:'spline',
                name: '同比增长率',
                data: $scope.thisyearsecondindustrygrowvalue
            }]

      };
        $scope.thirdGDPChart={
         options: {
          chart: {
            type:'column'
          },
        },
            credits:{
                enabled:false,
            },
            credits:{
                enabled:false,
            },
            title: {
                text: '太仓市GDP数据'
            },
            subtitle: {
                text: '第三产业本年度GDP分析'
            },
            xAxis: {
                categories:[
                '第一季度',
                '第二季度',
                '第三季度',
                '第四季度'],

                labels: {
                    rotation: -45,
                    align: 'right',
                    style: {
                        fontSize: '8px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: [{
                min: 0,
                title: {
                    text: '第三产业季度GDP总值（亿元）'
                }
            },{
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
                data: $scope.thisyearthirdindustryvalue

            }, {
                color:'#708090',
                type: 'column',
                name: '预测数据',
                data: $scope.thisyearthirdindustryfcvalue

            },
            {

                yAxis: 1,
                color:'#90ED7D',
                type:'spline',
                name: '同比增长率',
                data: $scope.thisyearthirdindustrygrowvalue
            }]

        };
        });
      $scope.industrychangeyear = function(param){
        $scope.thisyear = param;
          var IndustryDetailPromise = qService.httpGetWithToken(economyGdpRes.getYearIndustryDetail,{year:param},{});
          IndustryDetailPromise.then(function(rc){
              $scope.primaryGDPChart.series[0].data = rc.data.firstIndustryRealDetail;
              $scope.primaryGDPChart.series[1].data = rc.data.firstIndustryForecastDetail;
              $scope.primaryGDPChart.series[2].data = rc.data.firstIndustryGrowRate;
              $scope.secondGDPChart.series[0].data = rc.data.secondIndustryRealDetail;
              $scope.secondGDPChart.series[1].data= rc.data.secondIndustryForecastDetail;
              $scope.secondGDPChart.series[2].data= rc.data.secondIndustryGrowRate;
              $scope.thirdGDPChart.series[0].data = rc.data.thirdIndustryRealDetail;
              $scope.thirdGDPChart.series[1].data= rc.data.thirdIndustryForecastDetail;
              $scope.thirdGDPChart.series[2].data = rc.data.thirdIndustryGrowRate;
          })
      }

    })();
    
};