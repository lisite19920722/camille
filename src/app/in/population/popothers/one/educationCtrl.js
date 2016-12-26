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

    $scope.windowHeight=$(window).height();
    var promise = qService.httpGetWithToken(populationRes.getEmployInsuranceSchoolList,{},{});
    promise.then(function(rc) {

       console.log('劳动力第一个图的数据获取不成功');

       $scope.showPopulationDetail3 = function(){
      $scope.totalshow3= !$scope.totalshow3;
    };
     $scope.prePrimarySchool = rc.data[8];
    $scope.preMiddleSchool = rc.data[9];
    $scope.preHighschool = rc.data[10];


    $scope.buttonMap8 = [{
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
 $scope.btn_click8=function(bttn){
     $scope.change8(bttn);
  };





        $scope.townName = ['娄东街道','城厢镇','双凤镇','沙溪镇','浏河镇','浮桥镇','璜泾镇','新区','港区','科教新城'];

       $scope.school1="太仓市小学数量46所，初中17所，高中5所。";
       $scope.school2="随着二胎政策的放开，小学数量有所增加。";
       $scope.change8=function(bttn){
        if(bttn.name===2025){
         $scope.school1="太仓市小学数量46所，初中17所，高中5所。";
         $scope.school2="随着二胎政策的放开，小学数量有所增加。";
         $scope.employyear3="2016-2025";
         $scope.school.options.title.text="太仓市各城镇2025年学校数量分析预测";
         $scope.school.series=[{
            name: '小学',
            data: $scope.prePrimarySchool[0]

        }, {
            name: '初中',
            data: $scope.preMiddleSchool[0]

        }, {
            name: '高中',
            data: $scope.preHighschool[0]

        }];

    }
    if(bttn.name===2035){
      $scope.school1="太仓市小学数量47所，初中26所，高中10所。";
      $scope.school2="随着二胎政策的继续全面放开，中学数量有所增加。";
      $scope.employyear3="2026-2035";
      $scope.school.options.title.text="太仓市各城镇2035年学校数量分析预测";
      $scope.school.series=[{
        name: '小学',
        data: $scope.prePrimarySchool[1]

    }, {
        name: '初中',
        data: $scope.preMiddleSchool[1]

    }, {
        name: '高中',
        data: $scope.preHighschool[1]

    }];
}
if(bttn.name===2045){
   $scope.school1="太仓市小学数量47所，初中28所，高中12所。";
   $scope.school2="随着二胎政策的继续全面放开，太仓市人口增长，中小学数量都有所增加。";
   $scope.employyear3="2036-2045";
   $scope.school.options.title.text="太仓市各城镇2045年学校数量分析预测";
   $scope.school.series=[{
    name: '小学',
    data: $scope.prePrimarySchool[2]

}, {
    name: '初中',
    data: $scope.preMiddleSchool[2]

}, {
    name: '高中',
    data: $scope.preHighschool[2]

}];
}

};





var schoolcolor=new Array('#7cb5ec','#9370DB','#8B7500');
$scope.school={
    options:{ 
        colors:schoolcolor, 
        chart: {
            type: 'column'
        },
        title: {
            text: '太仓市各乡镇2025年年度学校数量分析预测'
        },
        credits:{
            enabled:false
        },
        xAxis: {
            categories: $scope.townName,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: '数量 (所)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} 所</b></td></tr>',
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
    series: [{
        name: '小学',
           // color:"#7cb5ec",
           data: $scope.prePrimarySchool[0]

       }, {
        name: '初中',
           // color:"#000000",
           data: $scope.preMiddleSchool[0]

       }, {
        name: '高中',
           // color:"#90ed7d",
           data: $scope.preHighschool[0]

       }]
   };
});
};
