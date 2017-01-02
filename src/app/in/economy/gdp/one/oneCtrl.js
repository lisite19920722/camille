export default ($scope, $rootScope, qService,economyGdpRes) => {
	'ngInject';
    $scope.containerHeight = $(window).height() - 127;
    let tempToken = '827ccb0eea8a706c4c34a16891f84e7b';
    // let yearGdpHeader = {
    //   // 'X-Auth-Token':tempToken,
    //   'X-Workspace-Id':1
    // };
    $scope.currentsite = "年度GDP数据";
    let promise = qService.httpGetWithToken(economyGdpRes.getYearGdp,{},{});
    

    promise.then(function(rc){
      $scope.forecast = true;
        for(var ryg = 0; ryg<rc.data.realYearGdp.length;ryg++){
            if (rc.data.realYearGdp[ryg] == 0) {
                rc.data.realYearGdp[ryg] = null;
            }
        }
       $scope.gdprealvalue=rc.data.realYearGdp;
       $scope.gdpforecastvalue=rc.data.forecastYearGdp;
       $scope.gdpgrowratevalue=rc.data.yearGrow;
       $scope.currentYearForecast=rc.data.forecastYearGdp[9];
       $scope.exchange=function(param){
       $scope.yearGDPChart.series[0].type=param;
       $scope.yearGDPChart.series[1].type=param;
       $scope.yearGDPChart.series[2].type='spline';
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
       $scope.checkdeviation=function(){
        $("#eerror").addClass("navactive");
        $("#history").removeClass("navactive");
        $scope.forecast = false;
        $scope.deviation=!$scope.deviation;
        $scope.errorvalue = rc.data.yearErrorRate;
      };
        $scope.checkforecast=function(){
          $("#eerror").removeClass("navactive");
        $("#history").addClass("navactive");
          $scope.deviation = false;
        $scope.forecast=!$scope.forecast;
      };
        $scope.xAxis= [
                    
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
                    
                ];
       $scope.yearGDPChart={
            options: {
              chart: {
                type:'column'
              },
              exporting: {
                enabled: false,
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
                text: '年度GDP分析'
            },
            xAxis: {
                categories:$scope.xAxis,
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
                }],labels: {
                    rotation: -45,
                    align: 'right',
                    style: {
                        fontSize: '8px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            plotOptions:{
                series:{
                    pointWidth:1
                }
            },
            yAxis: [{
                min: 0,
                title: {
                    text: '年度GDP总值（亿元）'
                },
                plotLines:[{
                color:'red',
                dashStyle:'DashDot',
                value:1130,
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
                type: 'column',
                name: '真实数据',
                data: $scope.gdprealvalue

            }, {
                color:'#708090',
                type: 'column',
                name: '预测数据',
                data: $scope.gdpforecastvalue

            },
            {   
                yAxis: 1,
                color:'#90ED7D',
                type:'spline',
                name: '同比增长率',
                data: $scope.gdpgrowratevalue
            }]
        };
    })

   
};