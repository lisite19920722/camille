'use strict';
export default ($scope, $rootScope, qService, populationRes) => {
  'ngInject';
    (function() {
        document.body.scrollIntoView();
    })();
     $scope.toggleMenu1=function(){
        $scope.isMenu=!$scope.isMenu;
    };
    $scope.isMenu=false;

    var promise = qService.httpGetWithToken(populationRes.getEmployInsuranceSchoolList,{},{});
    promise.then(function(rc) {

       console.log('劳动力第一个图的数据获取不成功');
     $scope.preInsurance = rc.data[5];
    $scope.preOldRate = rc.data[6];
    $scope.preLaborRate = rc.data[7];
     $scope.rate=[81.07,83.43,81.00,82.53,85.63,82.25,83.20,81.95,81.83,77.70];
      
   $scope.showPopulationDetail2 = function(){
      $scope.totalshow2= !$scope.totalshow2;
    };
    $scope.firstTenYear  = ['2016', '2017', '2018', '2019', '2020', '2021','2022', '2023', '2024', '2025'];
    $scope.secondTenYear = ['2026', '2027', '2028', '2029', '2030', '2031','2032', '2033', '2034', '2035'];
    $scope.thirdTenYear  = ['2036', '2037', '2038', '2039', '2040', '2041','2042', '2043', '2044', '2045'];

    $scope.buttonMap1 = [{
        name: 2025,
        label: 2025 + "年",
        radio: "Middle"
      },
      {
        name: 2035,
        label: 2035 + "年",
        radio: "Middle"
      },
      {
        name: 2045,
        label: 2045 + "年",
        radio: "Right"
      }];
        $scope.insuranceyear="2016-2025";
         $scope.insurance1="2016到2025年间老龄人口由31.16%增长到33.92%，养老保险基金由30.9亿元下降到30.5亿元。";
         $scope.insurance2="太仓市老龄化加剧，社会负担持续增加。";
  $scope.btn_click5=function(bttn){
     $scope.change5(bttn);
  };    
 $scope.change5=function(bttn){
    if(bttn.name===2025){
        $scope.insurance1="2016到2025年间老龄人口由31.16%增长到33.92%，养老保险基金由30.9亿元下降到30.5亿元。";
         $scope.insurance2="太仓市老龄化加剧，社会负担持续增加。";
        $scope.insuranceyear="2016-2025";
        $scope.money.options.title.text="太仓市2016至2025年城镇养老保险基金分析预测";
        $scope.money.options.xAxis[0].categories=$scope.firstTenYear;
        $scope.money.series[0].data=$scope.preInsurance[0];
        $scope.money.series[1].data=$scope.preOldRate[0];
        $scope.money.series[2].data=$scope.preLaborRate[0];

    }
    if(bttn.name===2035){
         $scope.insurance1="2026到2035年间老龄人口由33.46%增长到33.92%，养老保险基金由30.5亿元下降到30.9亿元。";
         $scope.insurance2="随着二胎政策的开放，太仓市老龄化有所减缓。";
     $scope.insuranceyear="2026-2035";
        $scope.money.options.title.text="太仓市2026至2035年城镇养老保险基金分析预测";
        $scope.money.options.xAxis[0].categories=$scope.secondTenYear;
        $scope.money.series[0].data=$scope.preInsurance[1];
        $scope.money.series[1].data=$scope.preOldRate[1];
        $scope.money.series[2].data=$scope.preLaborRate[1];
    }
    if(bttn.name===2045){
         $scope.insurance1="2036到2045年间老龄人口由33.57%下降到30.51%，养老保险结余由30.5亿元下降到45.8亿元。";
         $scope.insurance2="太仓市老龄人比例有所下降，养老保险基金大幅度增长。";
         $scope.insuranceyear="2036-2045";
        $scope.money.options.title.text="太仓市2036至2045年城镇养老保险基金分析预测";
        $scope.money.options.xAxis[0].categories=$scope.thirdTenYear;
        $scope.money.series[0].data=$scope.preInsurance[2];
        $scope.money.series[1].data=$scope.preOldRate[2];
        $scope.money.series[2].data=$scope.preLaborRate[2];
    }
 };
 $scope.money ={
    options:{
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: '太仓市2016至2025年城镇养老保险基金分析预测'
        },
        credits:{
            enabled:false
        },
        xAxis: [{
            categories: $scope.firstTenYear,
            crosshair: true
        }],
        yAxis: [ { // Secondary yAxis
            gridLineWidth: 1,
            title: {
                text: '保险基金',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value} 亿元',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            }

        }, { // Tertiary yAxis
            gridLineWidth: 1,
            title: {
                text: '比例',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            labels: {
                format: '{value} %',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            opposite: true
        }],
        tooltip: {
            shared: true
        },
        legend: {
            //layout: 'vertical',
            align: 'center',
            verticalAlign: 'bottom',
        }
    },
        series: [{
            name: '养老保险基金',
            type: 'column',
            yAxis: 0,
            data: $scope.preInsurance[0],
            tooltip: {
                valueSuffix: ' 亿元'
            }

        }, {
            name: '老龄人口比例',
            type: 'spline',
            yAxis: 1,
            data: $scope.preOldRate[0],
            marker: {
                enabled: true
            },
            //dashStyle: 'shortdot',
            tooltip: {
                valueSuffix: ' %'
            }

        }, {
            name: '就业人口比例',
            type: 'spline',
            yAxis: 1,
            data: $scope.preLaborRate[0],
            tooltip: {
                valueSuffix: ' %'
            }
        }]
};





});
};
