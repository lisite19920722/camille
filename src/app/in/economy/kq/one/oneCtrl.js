export default ($scope, $rootScope, qService,economyKeqiangRes) => {
	'ngInject';
  var now = new Date();
    var nowyear = now.getFullYear();
    $scope.currentyear = nowyear;
  var yearKeQiangHeader = {};
  var yearKeQiangPromise = qService.httpGetWithToken(economyKeqiangRes.getYearDetail,{year:nowyear},yearKeQiangHeader);
  yearKeQiangPromise.then(function(rc){
    for(var i = 0;i<rc.data.industryPowerGrowRate.length;i++){
      if (rc.data.industryPowerGrowRate[i] == 0) {
        rc.data.industryPowerGrowRate[i] = null;
        rc.data.loadGrowRate[i] = null;
        rc.data.freightVolumeGrowthRate[i] = null;
      }
    }
    $scope.industrypower = rc.data.industryPowerGrowRate;
    $scope.newload = rc.data.loadGrowRate;
    $scope.freightvolum = rc.data.freightVolumeGrowthRate;
   $scope.colorpicker = {
        options: {
            orientation: 'horizontal',
            min: 0,
            max: 100,
            range: 'min'
        }
    };
  // $scope.title = $stateParams.title;
  $scope.selectedRange=0;
  $scope.loandata=[552.17, 630.36,559.20,566.49,623.61,548.74,621.46,609.25,624.85,551.95,652.09];
  $scope.transdata=[168,186, 182,174,192,206,194,183,186,183,190];
  $scope.elecdata=[ 8.3, 6.0, 6.4,6.4,6.6,7.0,7.3,6.5,6.2,6.9,7.4];
  $scope.keqiangdata=[6.9, 7.0, 6.9, 6.9];
  $scope.range=function(){
    return $scope.selectedRange;
  };
$scope.range2=function(){
    return $scope.selectedRange2;
  };
  $scope.range3=function(){
    return $scope.selectedRange3;
  };
  var changeloandata=function(newValue,oldValue,scope){
       $scope.loandata[10]=Math.round($scope.loandata[10]*(1+(newValue-oldValue)/100)*100)/100;
       $scope.transdata[10]=Math.round($scope.transdata[10]*(1+(newValue-oldValue)/500)*100)/100;
       $scope.elecdata[10]=Math.round($scope.elecdata[10]*(1+(newValue-oldValue)/250)*100)/100;
       $scope.loandata[9]=Math.round($scope.loandata[9]*(1+(newValue-oldValue)/100)*100)/100;
       $scope.transdata[9]=Math.round($scope.transdata[9]*(1+(newValue-oldValue)/500)*100)/100;
       $scope.elecdata[9]=Math.round($scope.elecdata[9]*(1+(newValue-oldValue)/250)*100)/100;
       $scope.loandata[8]=Math.round($scope.loandata[8]*(1+(newValue-oldValue)/100)*100)/100;
       $scope.transdata[8]=Math.round($scope.transdata[8]*(1+(newValue-oldValue)/500)*100)/100;
       $scope.elecdata[8]=Math.round($scope.elecdata[8]*(1+(newValue-oldValue)/250)*100)/100;
       $scope.loandata[7]=Math.round($scope.loandata[7]*(1+(newValue-oldValue)/100)*100)/100;
       $scope.transdata[7]=Math.round($scope.transdata[7]*(1+(newValue-oldValue)/500)*100)/100;
       $scope.elecdata[7]=Math.round($scope.elecdata[7]*(1+(newValue-oldValue)/250)*100)/100;
       $scope.loandata[6]=Math.round($scope.loandata[6]*(1+(newValue-oldValue)/100)*100)/100;
       $scope.transdata[6]=Math.round($scope.transdata[6]*(1+(newValue-oldValue)/500)*100)/100;
       $scope.elecdata[6]=Math.round($scope.elecdata[6]*(1+(newValue-oldValue)/250)*100)/100;
       $scope.loandata[5]=Math.round($scope.loandata[5]*(1+(newValue-oldValue)/100)*100)/100;
       $scope.transdata[5]=Math.round($scope.transdata[5]*(1+(newValue-oldValue)/500)*100)/100;
       $scope.elecdata[5]=Math.round($scope.elecdata[5]*(1+(newValue-oldValue)/250)*100)/100;
       $scope.loandata[4]=Math.round($scope.loandata[4]*(1+(newValue-oldValue)/100)*100)/100;
       $scope.transdata[4]=Math.round($scope.transdata[4]*(1+(newValue-oldValue)/500)*100)/100;
       $scope.elecdata[4]=Math.round($scope.elecdata[4]*(1+(newValue-oldValue)/250)*100)/100;
       $scope.keqiangdata[2]=Math.round($scope.keqiangdata[2]*(1+(newValue-oldValue)/900)*100)/100;
       $scope.keqiangdata[3]=Math.round($scope.keqiangdata[3]*(1+(newValue-oldValue)/700)*100)/100;
  };
  var changeloandata2=function(newValue,oldValue,scope){
      $scope.loandata[10]=Math.round($scope.loandata[10]*(1+(newValue-oldValue)/100)*100)/100;
       $scope.transdata[10]=Math.round($scope.transdata[10]*(1+(newValue-oldValue)/500)*100)/100;
       $scope.elecdata[10]=Math.round($scope.elecdata[10]*(1+(newValue-oldValue)/250)*100)/100;
       $scope.loandata[9]=Math.round($scope.loandata[9]*(1+(newValue-oldValue)/100)*100)/100;
       $scope.transdata[9]=Math.round($scope.transdata[9]*(1+(newValue-oldValue)/500)*100)/100;
       $scope.elecdata[9]=Math.round($scope.elecdata[9]*(1+(newValue-oldValue)/250)*100)/100;
       $scope.loandata[8]=Math.round($scope.loandata[8]*(1+(newValue-oldValue)/100)*100)/100;
       $scope.transdata[8]=Math.round($scope.transdata[8]*(1+(newValue-oldValue)/500)*100)/100;
       $scope.elecdata[8]=Math.round($scope.elecdata[8]*(1+(newValue-oldValue)/250)*100)/100;
       $scope.loandata[7]=Math.round($scope.loandata[7]*(1+(newValue-oldValue)/100)*100)/100;
       $scope.transdata[7]=Math.round($scope.transdata[7]*(1+(newValue-oldValue)/500)*100)/100;
       $scope.elecdata[7]=Math.round($scope.elecdata[7]*(1+(newValue-oldValue)/250)*100)/100;
       $scope.loandata[6]=Math.round($scope.loandata[6]*(1+(newValue-oldValue)/100)*100)/100;
       $scope.transdata[6]=Math.round($scope.transdata[6]*(1+(newValue-oldValue)/500)*100)/100;
       $scope.elecdata[6]=Math.round($scope.elecdata[6]*(1+(newValue-oldValue)/250)*100)/100;
       $scope.loandata[5]=Math.round($scope.loandata[5]*(1+(newValue-oldValue)/100)*100)/100;
       $scope.transdata[5]=Math.round($scope.transdata[5]*(1+(newValue-oldValue)/500)*100)/100;
       $scope.elecdata[5]=Math.round($scope.elecdata[5]*(1+(newValue-oldValue)/250)*100)/100;
       $scope.loandata[4]=Math.round($scope.loandata[4]*(1+(newValue-oldValue)/100)*100)/100;
       $scope.transdata[4]=Math.round($scope.transdata[4]*(1+(newValue-oldValue)/500)*100)/100;
       $scope.elecdata[4]=Math.round($scope.elecdata[4]*(1+(newValue-oldValue)/250)*100)/100;
       $scope.keqiangdata[2]=Math.round($scope.keqiangdata[2]*(1+(newValue-oldValue)/900)*100)/100;
       $scope.keqiangdata[3]=Math.round($scope.keqiangdata[3]*(1+(newValue-oldValue)/700)*100)/100;
  };
  var changeloandata3=function(newValue,oldValue,scope){
       $scope.loandata[10]=Math.round($scope.loandata[10]*(1+(newValue-oldValue)/100)*100)/100;
       $scope.transdata[10]=Math.round($scope.transdata[10]*(1+(newValue-oldValue)/500)*100)/100;
       $scope.elecdata[10]=Math.round($scope.elecdata[10]*(1+(newValue-oldValue)/250)*100)/100;
       $scope.loandata[9]=Math.round($scope.loandata[9]*(1+(newValue-oldValue)/100)*100)/100;
       $scope.transdata[9]=Math.round($scope.transdata[9]*(1+(newValue-oldValue)/500)*100)/100;
       $scope.elecdata[9]=Math.round($scope.elecdata[9]*(1+(newValue-oldValue)/250)*100)/100;
       $scope.loandata[8]=Math.round($scope.loandata[8]*(1+(newValue-oldValue)/100)*100)/100;
       $scope.transdata[8]=Math.round($scope.transdata[8]*(1+(newValue-oldValue)/500)*100)/100;
       $scope.elecdata[8]=Math.round($scope.elecdata[8]*(1+(newValue-oldValue)/250)*100)/100;
       $scope.loandata[7]=Math.round($scope.loandata[7]*(1+(newValue-oldValue)/100)*100)/100;
       $scope.transdata[7]=Math.round($scope.transdata[7]*(1+(newValue-oldValue)/500)*100)/100;
       $scope.elecdata[7]=Math.round($scope.elecdata[7]*(1+(newValue-oldValue)/250)*100)/100;
       $scope.loandata[6]=Math.round($scope.loandata[6]*(1+(newValue-oldValue)/100)*100)/100;
       $scope.transdata[6]=Math.round($scope.transdata[6]*(1+(newValue-oldValue)/500)*100)/100;
       $scope.elecdata[6]=Math.round($scope.elecdata[6]*(1+(newValue-oldValue)/250)*100)/100;
       $scope.loandata[5]=Math.round($scope.loandata[5]*(1+(newValue-oldValue)/100)*100)/100;
       $scope.transdata[5]=Math.round($scope.transdata[5]*(1+(newValue-oldValue)/500)*100)/100;
       $scope.elecdata[5]=Math.round($scope.elecdata[5]*(1+(newValue-oldValue)/250)*100)/100;
       $scope.loandata[4]=Math.round($scope.loandata[4]*(1+(newValue-oldValue)/100)*100)/100;
       $scope.transdata[4]=Math.round($scope.transdata[4]*(1+(newValue-oldValue)/500)*100)/100;
       $scope.elecdata[4]=Math.round($scope.elecdata[4]*(1+(newValue-oldValue)/250)*100)/100;
       $scope.keqiangdata[2]=Math.round($scope.keqiangdata[2]*(1+(newValue-oldValue)/900)*100)/100;
       $scope.keqiangdata[3]=Math.round($scope.keqiangdata[3]*(1+(newValue-oldValue)/700)*100)/100;
  };
 
 var redo = function(){
   $scope.loandata=[552.17, 630.36,559.20,566.49,623.61,548.74,621.46,609.25,624.85,551.95,652.09];
    $scope.transdata=[168,186, 182,174,192,206,194,183,186,183,190];
    $scope.elecdata=[ 8.3, 6.0, 6.4,6.4,6.6,7.0,7.3,6.5,6.2,6.9,7.4];
    $scope.keqiangdata=[6.9, 7.0, 6.9, 6.9];
    $scope.selectedRange=0;
    $scope.selectedRange2=0;
    $scope.selectedRange3=0;
   
    $scope.keqiangChart={
    options: 
    {
        chart: 
        {
            type:'spline'
        },
    },
     credits:{
                enabled:false,
            },
    title: 
    {
        text: '“克强指数”拟合GDP增长率',
        style:{
        fontWeight:'bold'
      }

    },
    xAxis: 
    {
        categories: ['一季度', '二季度', '三季度', '四季度'],
         plotBands:[{
            from: 1.5,
            to:4,
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
    yAxis: 
    {
        title: 
        {
            text: 'GDP增长率（%）'
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
        },
    tooltip: 
    {
        valueSuffix: '°C'
    },
    legend: 
    {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
    },
    series:[{
        color:'#7CB5EC',
        name: 'GDP实际增长率',
        data: [7.1, null, null, null]
        }, {
        color:'rgb(0,0,0)',
        name: '“克强指数”拟合GDP增长率',
        data: $scope.keqiangdata
    }]
    };

$scope.loanChart = {
    options: {
        chart: {
            type: 'column'
        }
    },
     credits:{
                enabled:false,
            },
    series: [{
        color:'#7CB5EC',
        name: '真实值',
        data: [592.17, 600.36,599.20,596.49,0,0,0,0,0,0,0]
    },{
        color:'#708090',
        name: '预测值',
        type:'spline',
        data: $scope.loandata
    }],
    title: {
        text: '银行中长期贷款'
    },
    xAxis: {
        categories: [ '二月', '三月', '四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
        plotBands:[{
                from: 3.5,
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
                }]
        
    },
    yAxis: {
        min: 0,
        title: {
            text: '亿元'
        }
    },
    loading: false,

};

$scope.transChart = {
    options: {
        chart: {
            type: 'column'
        }
    },
     credits:{
                enabled:false,
            },
    series: [{
       color:'#7CB5EC',
        name: '真实值',
        data: [188,166, 192,184,0,0,0,0,0,0,0]
    },{
        color:'#708090',
        name: '预测值',
        type:'spline',
        data: $scope.transdata
    }],
    title: {
        text: '货运量'
    },
    xAxis: {
        categories: [ '二月', '三月', '四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
        plotBands:[{
                from: 3.5,
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
                }]
    },
    loading: false,
    yAxis: {
        title: {
            text: '万吨'
        }
    }
};

$scope.elecChart = {
    options: {
        chart: {
            type: 'column'
        }
    },
     credits:{
                enabled:false,
            },
    series: [{
      color:'#7CB5EC',
        name: '真实值',
        data: [ 7.9, 6.3, 6.0,5.9,0,0,0,0,0,0,0]
    },{
      color:'#708090',
        name: '预测值',
        type:'spline',
        data: $scope.elecdata
    }],
    xAxis: {
        categories: ['二月', '三月', '四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
        plotBands:[{
                from: 3.5,
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
                }]
    },
    title: {
        text: '工业用电量'
    },
    loading: false,
    yAxis: {
        title: {
            text: '亿千瓦时'
        }
    }

};
 }

  $scope.reset=function(){
    redo();
  }
    $scope.$watch($scope.range,changeloandata);
    $scope.$watch($scope.range2,changeloandata2);
    $scope.$watch($scope.range3,changeloandata3);
  $scope.keqiangindex={
     options: 
    {
        chart: 
        {
            type:'spline'
        },
    },
     credits:{
                enabled:false,
            },
    title: 
    {
        text: $scope.currentyear+'年度“克强指数”走势',
        style:{
        fontWeight:'bold'
      }
       
    },
    xAxis: 
    {
        categories: ['一月','二月', '三月', '四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
    },
    yAxis: 
    { plotLines:[{
            color:'red',
            dashStyle:'solid',
            value:7.2,
            width:2,
            label:{
                text:'本年度GDP增长率预测值',
                align:'right',
                x:10,
                 style: {
                        fontSize: '8px',
                        fontWeight: 200
                    }
            }
            }],
        title: 
        {
            text: '增长率％'
        },
        
        
        },
    tooltip: 
    {
        valueSuffix: ''
    },
    legend: 
    {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
    },
    series:[{
        name: '工业用电量',
        color:"rgb(205,130,61)",
        data: $scope.industrypower
        },
        {
        name: '新增贷款',
        color:"rgb(51,181,88)",
        data: $scope.newload
        },
        {
        name: '货运量',
        color:"rgb(62,160,200)",
        data: $scope.freightvolum
        }]
};

$scope.keqiangChart={
    options: 
    {
        chart: 
        {
            type:'spline'
        },
    },
     credits:{
                enabled:false,
            },
    title: 
    {
        text: '“克强指数”拟合GDP增长率',
        style:{
        fontWeight:'bold'
      }

    },
    xAxis: 
    {
        categories: ['一季度', '二季度', '三季度', '四季度'],
         plotBands:[{
            from: 1.5,
            to:4,
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
    yAxis: 
    {
        title: 
        {
            text: 'GDP增长率（%）'
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
        },
    tooltip: 
    {
        valueSuffix: '°C'
    },
    legend: 
    {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
    },
    series:[{
        name: 'GDP实际增长率',
        data: [7.1, null, null, null]
        }, {
        name: '“克强指数”拟合GDP增长率',
        data: $scope.keqiangdata
    }]
    };

$scope.loanChart = {
    options: {
        chart: {
            type: 'column'
        }
    },
     credits:{
                enabled:false,
            },
    series: [{
        name: '真实值',
        data: [592.17, 600.36,599.20,596.49,0,0,0,0,0,0,0]
    },{
       color:'#708090',
        name: '预测值',
        type:'spline',
        data: $scope.loandata
    }],
    title: {
        text: '银行中长期贷款'
    },
    xAxis: {
        categories: [ '二月', '三月', '四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
        plotBands:[{
                from: 3.5,
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
                }]
        
    },
    yAxis: {
        min: 0,
        title: {
            text: '亿元'
        }
    },
    loading: false,

};

$scope.transChart = {
    options: {
        chart: {
            type: 'column'
        }
    },
     credits:{
                enabled:false,
            },
    series: [{
        name: '真实值',
        data: [188,166, 192,184,0,0,0,0,0,0,0]
    },{
      color:'#708090',
        name: '预测值',
        type:'spline',
        data: $scope.transdata
    }],
    title: {
        text: '货运量'
    },
    xAxis: {
        categories: [ '二月', '三月', '四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
        plotBands:[{
                from: 3.5,
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
                }]
    },
    loading: false,
    yAxis: {
        title: {
            text: '万吨'
        }
    }
};

$scope.elecChart = {
    options: {
        chart: {
            type: 'column'
        }
    },
     credits:{
                enabled:false,
            },
    series: [{
        name: '真实值',
        data: [ 7.9, 6.3, 6.0,5.9,0,0,0,0,0,0,0]
    },{
      color:'#708090',
        name: '预测值',
        type:'spline',
        data: $scope.elecdata
    }],
    xAxis: {
        categories: ['二月', '三月', '四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
        plotBands:[{
                from: 3.5,
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
                }]
    },
    title: {
        text: '工业用电量'
    },
    loading: false,
    yAxis: {
        title: {
            text: '亿千瓦时'
        }
    }

};

  })
 
 $scope.keqiangchangeyear = function(param){
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
   var promise = qService.httpGetWithToken(economyKeqiangRes.getYearDetail,{year:param},{});
   promise.then(function(rc){
    $scope.currentyear = param;
    for(var i = 0;i<rc.data.industryPowerGrowRate.length;i++){
      if (rc.data.industryPowerGrowRate[i] == 0) {
        rc.data.industryPowerGrowRate[i] = null;
        rc.data.loadGrowRate[i] = null;
        rc.data.freightVolumeGrowthRate[i] = null;
      }
    }
    if (param<2016) {
      if (param == 2014) {
      $scope.currentGDPGrow = '本年度GDP增长率';
      $scope.currentGDPGrowRate = 8.6;
    }else if (param == 2015) {
      $scope.currentGDPGrow = '本年度GDP增长率';
      $scope.currentGDPGrowRate = 7.1;
    }

    }else{
      $scope.currentGDPGrow = '本年度GDP增长率预测值';
      $scope.currentGDPGrowRate = 6.9;
    }
        $scope.industrypower = rc.data.industryPowerGrowRate;
        $scope.newload = rc.data.loadGrowRate;
        $scope.freightvolum = rc.data.freightVolumeGrowthRate;
        $scope.keqiangindex={
         options: 
        {
            chart: 
            {
                type:'spline'
            },
        },
         credits:{
                    enabled:false,
                },
        title: 
        {
            text: $scope.currentyear+'年度“克强指数”走势',
            style:{
            fontWeight:'bold'
          }
           
        },
        xAxis: 
        {
            categories: ['一月','二月', '三月', '四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
        },
        yAxis: 
        { plotLines:[{
                color:'red',
                dashStyle:'solid',
                value:$scope.currentGDPGrowRate,
                width:2,
                label:{
                    text:$scope.currentGDPGrow,
                    align:'right',
                    x:10,
                     style: {
                            fontSize: '8px',
                            fontWeight: 200
                        }
                }
                }],
            title: 
            {
                text: '增长率％'
            },
            
            
            },
        tooltip: 
        {
            valueSuffix: ''
        },
        legend: 
        {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series:[{
            name: '工业用电量',
            color:"rgb(205,130,61)",
            data: $scope.industrypower
            },
            {
            name: '新增贷款',
            color:"rgb(51,181,88)",
            data: $scope.newload
            },
            {
            name: '货运量',
            color:"rgb(62,160,200)",
            data: $scope.freightvolum
            }]
       };

   })
 }

    
};