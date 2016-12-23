export default ($scope, $rootScope, qService,economyTaxRes) => {
	'ngInject';
    var TaxPromise = qService.httpGetWithToken(economyTaxRes.getYearTax,{},{});
  var now = new Date();
  var year = now.getFullYear();
  $scope.colorpicker = {
        options: {
            orientation: 'horizontal',
            min: -100,
            max: 100,
            range: 'min'
        }
    };
  TaxPromise.then(function(rc){
    for(var i = 0;i<rc.data.realYearTax.length;i++){
      if (rc.data.realYearTax[i] == 0) {
        rc.data.realYearTax[i] = null;
      }
    }
    $scope.taxrealvalue = rc.data.realYearTax;

    $scope.taxForecastdate = rc.data.forecastYearTax;
    console.log(rc.data.forecastYearTax);
    $scope.ratedate = rc.data.yearGrowUp;
    $scope.yearArray = ['2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018'];
    $scope.yearTaxChart = {
        options: {
          chart: {
            type:'column'
          },
        },
        credits:{
            enabled:false,
         },
        title: {
          text:'年度税收收入预测',
          style:{
            fontWeight:'bold'
          }
        },

        xAxis: {
          categories: $scope.yearArray,
            plotBands:[{
                from: 9.5+(2015-(year-1)),
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
                        fontSize: '6px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }


        },
        yAxis: 
        [{
          min: 0,
          title: {
            text: '税收收入（亿元）'
          },
           plotLines:[{
                color:'red',
                dashStyle:'DashDot',
                value:95.62,
                width:2,
                label:{
                    text:'本年度税收目标',
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
            opposite:true}],
        tooltip: 
        {

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
                name: '真实值',
                data: $scope.taxrealvalue

            }, {
                color:'#708090',
                name: '预测值',
                data: $scope.taxForecastdate

            },
             {   
                color:'#90ED7D',
                yAxis: 1,
                type:'spline',
                name: '同比增长率',
                data: $scope.ratedate
            }]   
      };
  $scope.checkdeviationYear = function(){
    $scope.deviationYear = !$scope.deviationYear;
    for(i=0;i<rc.data.yearErrorRate.length;i++){
      if (rc.data.yearErrorRate[i]==0) {
        rc.data.yearErrorRate[i] = "--";
      }
    }
    $scope.taxErrorRate = rc.data.yearErrorRate;
  }

  $scope.checkforecastYear = function(){
    $scope.forecastYear = !$scope.forecastYear;
    for(i=0;i<rc.data.realYearTax.length;i++){
      if (rc.data.realYearTax[i] == 0) {
        rc.data.realYearTax[i] = "--";
      }
    }
    $scope.taxthisyearrealvalue = rc.data.realYearTax;
    $scope.taxForecastData = rc.data.forecastYearTax;
  }
     $scope.range = function() {
        return $scope.selectedRange;
      };
      $scope.range2=function(){
        return $scope.selectedRange2;
      };
       $scope.range3=function(){
        return $scope.selectedRange3;
      };
       $scope.range4=function(){
        return $scope.selectedRange4;
      };
     
      var changedetail = function(newValue,oldValue,scope){
      $scope.taxForecastdate[10] = Math.round($scope.taxForecastdate[10]*(1+(newValue-oldValue)/200)*100)/100;
      $scope.taxForecastdate[11] = Math.round($scope.taxForecastdate[11]*(1+(newValue-oldValue)/200)*100)/100;
      $scope.taxForecastdate[12] = Math.round($scope.taxForecastdate[12]*(1+(newValue-oldValue)/200)*100)/100;
      $scope.ratedate[10] = Math.round($scope.ratedate[10]*(1+(newValue-oldValue)/200)*100)/100;
      $scope.ratedate[11] = Math.round($scope.ratedate[11]*(1+(newValue-oldValue)/200)*100)/100;
      $scope.ratedate[12] = Math.round($scope.ratedate[12]*(1+(newValue-oldValue)/200)*100)/100;
    }
    var changedetail2 = function(newValue,oldValue,scope){
      $scope.taxForecastdate[10] = Math.round($scope.taxForecastdate[10]*(1+(newValue-oldValue)/200)*100)/100;
      $scope.taxForecastdate[11] = Math.round($scope.taxForecastdate[11]*(1+(newValue-oldValue)/200)*100)/100;
      $scope.taxForecastdate[12] = Math.round($scope.taxForecastdate[12]*(1+(newValue-oldValue)/200)*100)/100;
      $scope.ratedate[10] = Math.round($scope.ratedate[10]*(1+(newValue-oldValue)/200)*100)/100;
      $scope.ratedate[11] = Math.round($scope.ratedate[11]*(1+(newValue-oldValue)/200)*100)/100;
      $scope.ratedate[12] = Math.round($scope.ratedate[12]*(1+(newValue-oldValue)/200)*100)/100;
    }
    var changedetail3 = function(newValue,oldValue,scope){
      $scope.taxForecastdate[10] = Math.round($scope.taxForecastdate[10]*(1+(newValue-oldValue)/200)*100)/100;
      $scope.taxForecastdate[11] = Math.round($scope.taxForecastdate[11]*(1+(newValue-oldValue)/200)*100)/100;
      $scope.taxForecastdate[12] = Math.round($scope.taxForecastdate[12]*(1+(newValue-oldValue)/200)*100)/100;
      $scope.ratedate[10] = Math.round($scope.ratedate[10]*(1+(newValue-oldValue)/200)*100)/100;
      $scope.ratedate[11] = Math.round($scope.ratedate[11]*(1+(newValue-oldValue)/200)*100)/100;
      $scope.ratedate[12] = Math.round($scope.ratedate[12]*(1+(newValue-oldValue)/200)*100)/100;
    }
    var changedetail4 = function(newValue,oldValue,scope){
      $scope.taxForecastdate[10] = Math.round($scope.taxForecastdate[10]*(1+(newValue-oldValue)/200)*100)/100;
      $scope.taxForecastdate[11] = Math.round($scope.taxForecastdate[11]*(1+(newValue-oldValue)/200)*100)/100;
      $scope.taxForecastdate[12] = Math.round($scope.taxForecastdate[12]*(1+(newValue-oldValue)/200)*100)/100;
      $scope.ratedate[10] = Math.round($scope.ratedate[10]*(1+(newValue-oldValue)/200)*100)/100;
      $scope.ratedate[11] = Math.round($scope.ratedate[11]*(1+(newValue-oldValue)/200)*100)/100;
      $scope.ratedate[12] = Math.round($scope.ratedate[12]*(1+(newValue-oldValue)/200)*100)/100;
    }
      $scope.$watch($scope.range,changedetail);
      $scope.$watch($scope.range2,changedetail2);
      $scope.$watch($scope.range3,changedetail3);
      $scope.$watch($scope.range4,changedetail4);


      $scope.adjustParameterYear = function(){
         $scope.selectedRange = 0;
          $scope.selectedRange2 = 0;
          $scope.selectedRange3 = 0;
          $scope.selectedRange4 = 0;
        var adjuestTaxPromise = qService.httpGetWithToken(economyTaxRes.getYearTax,{},{});
         adjuestTaxPromise.then(function(rc){
          $scope.yearTaxChart.series[0].data = rc.data.realYearTax;
          $scope.yearTaxChart.series[1].data = rc.data.forecastYearTax;
          $scope.yearTaxChart.series[2].data = rc.data.yearGrowUp;
         
          $scope.range = function() {
          return $scope.selectedRange;
          };
      $scope.range2=function(){
        return $scope.selectedRange2;
      };
       $scope.range3=function(){
        return $scope.selectedRange3;
      };
       $scope.range4=function(){
        return $scope.selectedRange4;
      };
     
      var changedetail = function(newValue,oldValue,scope){
      $scope.yearTaxChart.series[1].data[10] = Math.round($scope.yearTaxChart.series[1].data[10]*(1+(newValue-oldValue)/200)*100)/100;
      $scope.yearTaxChart.series[1].data[11] = Math.round($scope.yearTaxChart.series[1].data[11]*(1+(newValue-oldValue)/200)*100)/100;
      $scope.yearTaxChart.series[1].data[12] = Math.round($scope.yearTaxChart.series[1].data[12]*(1+(newValue-oldValue)/200)*100)/100;
      $scope.yearTaxChart.series[2].data[10] = Math.round($scope.yearTaxChart.series[2].data[10]*(1+(newValue-oldValue)/200)*100)/100;
      $scope.yearTaxChart.series[2].data[11] = Math.round($scope.yearTaxChart.series[2].data[11]*(1+(newValue-oldValue)/200)*100)/100;
      $scope.yearTaxChart.series[2].data[12] = Math.round($scope.yearTaxChart.series[2].data[12]*(1+(newValue-oldValue)/200)*100)/100;
    }
    var changedetail2 = function(newValue,oldValue,scope){
     $scope.yearTaxChart.series[1].data[10] = Math.round($scope.yearTaxChart.series[1].data[10]*(1+(newValue-oldValue)/200)*100)/100;
      $scope.yearTaxChart.series[1].data[11] = Math.round($scope.yearTaxChart.series[1].data[11]*(1+(newValue-oldValue)/200)*100)/100;
      $scope.yearTaxChart.series[1].data[12] = Math.round($scope.yearTaxChart.series[1].data[12]*(1+(newValue-oldValue)/200)*100)/100;
      $scope.yearTaxChart.series[2].data[10] = Math.round($scope.yearTaxChart.series[2].data[10]*(1+(newValue-oldValue)/200)*100)/100;
      $scope.yearTaxChart.series[2].data[11] = Math.round($scope.yearTaxChart.series[2].data[11]*(1+(newValue-oldValue)/200)*100)/100;
      $scope.yearTaxChart.series[2].data[12] = Math.round($scope.yearTaxChart.series[2].data[12]*(1+(newValue-oldValue)/200)*100)/100;
    }
    var changedetail3 = function(newValue,oldValue,scope){
     $scope.yearTaxChart.series[1].data[10] = Math.round($scope.yearTaxChart.series[1].data[10]*(1+(newValue-oldValue)/200)*100)/100;
      $scope.yearTaxChart.series[1].data[11] = Math.round($scope.yearTaxChart.series[1].data[11]*(1+(newValue-oldValue)/200)*100)/100;
      $scope.yearTaxChart.series[1].data[12] = Math.round($scope.yearTaxChart.series[1].data[12]*(1+(newValue-oldValue)/200)*100)/100;
      $scope.yearTaxChart.series[2].data[10] = Math.round($scope.yearTaxChart.series[2].data[10]*(1+(newValue-oldValue)/200)*100)/100;
      $scope.yearTaxChart.series[2].data[11] = Math.round($scope.yearTaxChart.series[2].data[11]*(1+(newValue-oldValue)/200)*100)/100;
      $scope.yearTaxChart.series[2].data[12] = Math.round($scope.yearTaxChart.series[2].data[12]*(1+(newValue-oldValue)/200)*100)/100;
    }
    var changedetail4 = function(newValue,oldValue,scope){
      $scope.yearTaxChart.series[1].data[10] = Math.round($scope.yearTaxChart.series[1].data[10]*(1+(newValue-oldValue)/200)*100)/100;
      $scope.yearTaxChart.series[1].data[11] = Math.round($scope.yearTaxChart.series[1].data[11]*(1+(newValue-oldValue)/200)*100)/100;
      $scope.yearTaxChart.series[1].data[12] = Math.round($scope.yearTaxChart.series[1].data[12]*(1+(newValue-oldValue)/200)*100)/100;
      $scope.yearTaxChart.series[2].data[10] = Math.round($scope.yearTaxChart.series[2].data[10]*(1+(newValue-oldValue)/200)*100)/100;
      $scope.yearTaxChart.series[2].data[11] = Math.round($scope.yearTaxChart.series[2].data[11]*(1+(newValue-oldValue)/200)*100)/100;
      $scope.yearTaxChart.series[2].data[12] = Math.round($scope.yearTaxChart.series[2].data[12]*(1+(newValue-oldValue)/200)*100)/100;
    }
      $scope.$watch($scope.range,changedetail);
      $scope.$watch($scope.range2,changedetail2);
      $scope.$watch($scope.range3,changedetail3);
      $scope.$watch($scope.range4,changedetail4);

         })
      }
  });
     
     


  $scope.changeViewsYear = function(){
    if( $scope.yearTaxChart.options.chart.type == 'column')
    {
        $scope.yearTaxChart.options.chart.type = 'spline'
    }
    else
        $scope.yearTaxChart.options.chart.type = 'column'
  };
    
};