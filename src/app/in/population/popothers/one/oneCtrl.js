'use strict';
export default ($scope, $rootScope, qService, populationRes) => {
	'ngInject';
  $scope.windowHeight=$(window).height();
    (function() {
        document.body.scrollIntoView();
    })();
    $scope.show1=false;
    $scope.ShowClick1=function(){
      $scope.show1=!$scope.show1;
    }
    $scope.show2=false;
    $scope.ShowClick2=function(){
      $scope.show2=!$scope.show2;
    }
    var promise = qService.httpGetWithToken(populationRes.getEmployInsuranceSchoolList,{},{});
    promise.then(function(rc) {

       console.log('劳动力第一个图的数据获取不成功');
    
    $scope.rate=[81.07,83.43,81.00,82.53,85.63,82.25,83.20,81.95,81.83,77.70];
    $scope.preLaborPopulation = rc.data[0];
    $scope.preEmployedPopulation = rc.data[1];
 



    $scope.preFirstPopulation = rc.data[2];
    $scope.preSecondPopulation = rc.data[3];
    $scope.preThirdPopulation = rc.data[4];
    $scope.showPopulationDetail = function(){
      $scope.totalshow= !$scope.totalshow;
    };
    $scope.totalshow1=false;
    $scope.showPopulationDetail1 = function(){
      $scope.totalshow1= !$scope.totalshow1;
    };
     $scope.firstTenYear  = ['2016', '2017', '2018', '2019', '2020', '2021','2022', '2023', '2024', '2025'];
    $scope.secondTenYear = ['2026', '2027', '2028', '2029', '2030', '2031','2032', '2033', '2034', '2035'];
    $scope.thirdTenYear  = ['2036', '2037', '2038', '2039', '2040', '2041','2042', '2043', '2044', '2045'];
  $scope.buttonMap3 = [{
        name: 2025,
        label: 2025 + "年"
      },
      {
        name: 2035,
        label: 2035 + "年"
      },
      {
        name: 2045,
        label: 2045 + "年"
      }];
       $scope.employyear="2016-2025";
        $scope.employyear1="2016-2025";
 $scope.btn_click3=function(bttn){
     $scope.change3(bttn);
  };    
 $scope.change3=function(bttn){
   if(bttn.name===2025){

       $scope.rate=[81.07,83.43,81.00,82.53,85.63,82.25,83.20,81.95,81.83,77.70];
  
    $scope.employyear="2016-2025";
    $scope.jobf.options.title.text="太仓市2016至2025年就业人数分析预测";
    $scope.jobf.options.xAxis.categories=$scope.firstTenYear;
    $scope.jobf.series=[{
            name: '劳动力人口数',
            data: $scope.preLaborPopulation[0],
            marker:{
               symbol:"square" 
           }
        }, {
            name: '就业人数',
            data: $scope.preEmployedPopulation[0],
            marker:{
               symbol:"circle" 
           }
        }];
   }
   if(bttn.name===2035){
     $scope.rate=[76.03,82.68,82.82,77.34,76.68,75.76,72.78,71.47,73.19,73.35];
     $scope.employyear="2026-2035";
    $scope.jobf.options.title.text="太仓市2026至2035年就业人数分析预测";
    $scope.jobf.options.xAxis.categories=$scope.secondTenYear;
     $scope.jobf.series=[{
            name: '劳动力人口数',
            data: $scope.preLaborPopulation[1],
            marker:{
               symbol:"square" 
           }
        }, {
            name: '就业人数',
            data: $scope.preEmployedPopulation[1],
            marker:{
               symbol:"circle" 
           }
        }];
   }
   if(bttn.name===2045){
     $scope.rate=[70.03,71.57,73.58,69.34,76.33,72.88,78.12,75.38,73.40,74.54];
     $scope.employyear="2036-2045";
    $scope.jobf.options.title.text="太仓市2036至2045年就业人数分析预测";
    $scope.jobf.options.xAxis.categories=$scope.thirdTenYear;
     $scope.jobf.series=[{
            name: '劳动力人口数',
            data: $scope.preLaborPopulation[2],
            marker:{
               symbol:"square" 
           }
        }, {
            name: '就业人数',
            data: $scope.preEmployedPopulation[2],
            marker:{
               symbol:"circle" 
           }
        }];
   }
 };

   $scope.showTotalTable = function(){
    $scope.totalshow= !$scope.totalshow;
  };

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
 $scope.btn_click1=function(bttn){
     $scope.change1(bttn);
  };    
 $scope.change1=function(bttn){
     if(bttn.name===2025){
         $scope.employyear1="2016-2025";
        $scope.jobt.options.title.text="太仓市2016至2025年就业结构变化分析预测";
        $scope.jobt.options.xAxis.categories=$scope.firstTenYear;
        $scope.jobt.series=[{
            name: '就业人数',
            type: 'column',
            yAxis: 1,
            data: $scope.preEmployedPopulation[0],
            tooltip: {
                valueSuffix: ' 万人'
            }

        },{
            name: '第一产业',
            type: 'spline',
            marker:{
               symbol:"square" 
            },
            data: $scope.preFirstPopulation[0]
        }, {
            name: '第二产业',
            type: 'spline',
            marker:{
               symbol:"circle" 
            },
            data: $scope.preSecondPopulation[0]
        }, {
            name: '第三产业',
            type: 'spline',
            marker:{
               symbol:"triangle" 
            },
            data: $scope.preThirdPopulation[0]
        }];
     }
     if(bttn.name===2035){
         $scope.employyear1="2026-2035";
        $scope.jobt.options.title.text="太仓市2026至2035年就业结构变化分析预测";
        $scope.jobt.options.xAxis.categories=$scope.secondTenYear;
        $scope.jobt.series=[{
            name: '就业人数',
            type: 'column',
            yAxis: 1,
            data: $scope.preEmployedPopulation[1],
            tooltip: {
                valueSuffix: ' 万人'
            }

        },{
            name: '第一产业',
            type: 'spline',
            marker:{
               symbol:"square" 
            },
            data: $scope.preFirstPopulation[1]

        }, {
            name: '第二产业',
            type: 'spline',
            marker:{
               symbol:"circle" 
            },
            data: $scope.preSecondPopulation[1]
        }, {
            name: '第三产业',
            type: 'spline',
            marker:{
               symbol:"triangle" 
            },
            data: $scope.preThirdPopulation[1]
        }];
     }
     if(bttn.name===2045){
         $scope.employyear1="2036-2045";
        $scope.jobt.options.title.text="太仓市2036至2045年就业结构变化分析预测";
        $scope.jobt.options.xAxis.categories=$scope.thirdTenYear;
        $scope.jobt.series=[{
            name: '就业人数',
            type: 'column',
            yAxis: 1,
            data: $scope.preEmployedPopulation[2],
            tooltip: {
                valueSuffix: ' 万人'
            }

        },{
            name: '第一产业',
            type: 'spline',
            marker:{
               symbol:"square" 
            },
            data: $scope.preFirstPopulation[2]

        }, {
            name: '第二产业',
            type: 'spline',
            marker:{
               symbol:"circle" 
            },
            data: $scope.preSecondPopulation[2]
        }, {
            name: '第三产业',
            type: 'spline',
            marker:{
               symbol:"triangle" 
            },
            data: $scope.preThirdPopulation[2]
        }];
     }
 };








//就业人数分析预测表
var jobfcolor=new Array('#7cb5ec','#000000');
 $scope.jobf ={
      options:{
        colors:jobfcolor,
        chart: {
            type: 'areaspline'
        },
        exporting:{
          enabled: false,
        },
        title: {
            text: '太仓市2016至2025年就业人数分析预测',
            style:{
              fontSize: "14px",
            }
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 100,
            y: 45,
            floating: true,
            borderWidth: 1,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        xAxis: {
            categories: $scope.firstTenYear
        },
        yAxis: {
            title: {
                text: '人数（万人）'
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ' 万人'
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5
            }
        }
    },
        series: [{
            name: '劳动力人口数',
            data: $scope.preLaborPopulation[0],
            marker:{
               symbol:"square" 
           }
        }, {
            name: '就业人数',
            data: $scope.preEmployedPopulation[0],
            marker:{
               symbol:"circle" 
           }
        }]
};  
















var jobtcolor=new Array('#7cb5ec','#000000','#90ED7D','#F7A35C');
$scope.jobt ={
       options:{
        colors:jobtcolor,
        chart: {
            zoomType: 'xy'
        },
        exporting:{
           enabled:false,
        },
        title: {
            text: '太仓市2016至2025年就业结构变化分析预测',
            style:{
              fontSize: "14px",
            },
            x: -20 //center
        },
        credits:{
            enabled:false
        },
        xAxis: {
            categories: $scope.firstTenYear
        },
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}%',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: '比例',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
                  opposite: true
        }, { // Secondary yAxis
            title: {
                text: '就业人数',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value} 万人',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            }
          
        }],
        tooltip: {
            valueSuffix: '%'
        },
        legend: {
           // layout: 'vertical',
            align: 'center',
            verticalAlign: 'bottom',
            borderWidth: 0
        }
    },
        series: [{
            name: '就业人数',
            type: 'column',
            yAxis: 1,
            data: $scope.preEmployedPopulation[0],
            tooltip: {
                valueSuffix: ' 万人'
            }

        },{
            name: '第一产业人口比例',
            type: 'spline',
            marker:{
               symbol:"square" 
            },
            data: $scope.preFirstPopulation[0]
        }, {
            name: '第二产业人口比例',
            type: 'spline',
            marker:{
               symbol:"circle" 
            },
            data: $scope.preSecondPopulation[0]
        }, {
            name: '第三产业人口比例',
            type: 'spline',
            marker:{
               symbol:"triangle" 
            },
            data: $scope.preThirdPopulation[0]
        }]

    };    







});
};
