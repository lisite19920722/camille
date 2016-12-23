export default ($scope, $rootScope, qService, environmentRes, $timeout) => {
	'ngInject';
    (function() {
        document.body.scrollIntoView();
    })();
    //盒子3中高德地图的初始化
    var map = new AMap.Map('map_canvas',{
        zoom: 12,
        center: [121.130619,31.461029]
    });
    //盒子3中高德地图添加工具条和比例尺
    AMap.plugin(['AMap.ToolBar','AMap.Scale'],function(){
        //TODO  创建控件并添加
        var toolBar = new AMap.ToolBar();
        var scale = new AMap.Scale();
        map.addControl(toolBar);
        map.addControl(scale);
    })
    //盒子3中切换表格显示状态
    $scope.mapTableStatus = {
        airQuality: true,
        airCondition: false,
        wasteAir: false
    };
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
        var dependedVal=data.retData.forecast[0].date;
        var regEx = new RegExp("-","");
        dependedVal=dependedVal.replace(regEx,"年");
        dependedVal=dependedVal.replace(regEx,"月");
        dependedVal+="日";
        $scope.airConditionTomorrow=dependedVal;
        //盒子1中Highcharts中日期$scope.airConditionDate(也是展开表格中的日期)
        var dependedVal1=new Array();
        for (var i=0;i<3;i++){
            dependedVal1[i]=data.retData.history[i+4].date;
            var regEx1 = new RegExp("-","");
            dependedVal1[i]=dependedVal1[i].replace(regEx1,"年");
            dependedVal1[i]=dependedVal1[i].replace(regEx1,"月");
            dependedVal1[i]+="日";
            var regEx2 = new RegExp(dependedVal1[i].substring(0,5),"");
            dependedVal1[i]=dependedVal1[i].replace(regEx2,"");
        }
        dependedVal1[3]=data.retData.today.date;
        var regEx1 = new RegExp("-","");
        dependedVal1[3]=dependedVal1[3].replace(regEx1,"年");
        dependedVal1[3]=dependedVal1[3].replace(regEx1,"月");
        dependedVal1[3]+="日";
        var regEx2 = new RegExp(dependedVal1[3].substring(0,5),"");
        dependedVal1[3]=dependedVal1[3].replace(regEx2,"");
        for (var i=4;i<7;i++){
            dependedVal1[i]=data.retData.forecast[i-4].date;
            var regEx1 = new RegExp("-","");
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
        //------------------------盒子3天气模块地图------------------------
        //天气预测Button点击事件
        $scope.airConditionBtn = function() {
            $scope.istownaircondition = true;
            $scope.istownairquality=false;
            $scope.istownwasteair=false;
            $scope.mapTableStatus = {
                airQuality: false,
                airCondition: true,
                wasteAir: false
            };
            map.setZoomAndCenter(15, [121.109247,31.469887]);
            marker3.setMap(map);
            var infow=[];
            infow.push("<div style='background-color:#FFFFFF;border:2px solid #66cc66;border-radius:10px;padding:10px 10px;position:absolute;top:-10px;left:-5px;white-space:nowrap;color:#66cc66;font-size:18px'>太仓市气象局</div>")
            marker3.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
                offset: new AMap.Pixel(23, 5),//修改label相对于marker的位置
                content: infow.join('')
            });
            var info3=[];
            info3.push("<h4><strong>太仓市气象局(明日天气预报)</strong></h4>");
            info3.push("<table class='table table-bordered table-striped'>");
            var weatherString1="<tr><td class='maptable' style='line-height:35px;'>明日气温</td><td><div class='map-table-right' style='background-Color:#5cb85c;margin-left:2.5px;margin-top:4px;'>"+$scope.airConditionLowtemp[4]+"℃~"+$scope.airConditionHightemp[4]+"℃</div></td></tr>";
            info3.push(weatherString1);
            var weatherString2="<tr><td class='maptable' style='line-height:35px;'>天气状况</td><td><div class='map-table-right' style='background-Color:#5cb85c;margin-left:2.5px;margin-top:4px;'>"+$scope.airConditionType[4]+"</div></td></tr>";
            info3.push(weatherString2);
            var weatherString3="<tr><td class='maptable' style='line-height:35px;'>风向风级</td><td><div class='map-table-right' style='background-Color:#5cb85c;margin-left:2.5px;margin-top:4px;'>"+$scope.airConditionFengxiangFengli[4]+"</div></td></tr>";
            info3.push(weatherString3);
            info3.push("</table>");
            var infowindow3 = new AMap.InfoWindow({
                content: info3.join(''),
                offset: new AMap.Pixel(0, -30),
                size:new AMap.Size(280,0)
            })
            var clickHandle3 = AMap.event.addListener(marker3, 'click', function() {
                infowindow3.open(map, marker3.getPosition())
            })
        };
        var marker3 = new AMap.Marker({
            position: [121.106157,31.466373],//图标大小
            icon: new AMap.Icon({
                size: new AMap.Size(40, 50),
                image: "/images/marker_sprite.png",
            })//太仓市气象局
        });
        //-----------------------盒子3天气模块地图结束-----------------------
    }, function(error){
        console.log('发送失败');
    });
    //-------------------------airConditionGetPromise结束-------------------------
    //---------------------------airQualityGetPromise-----------------------------
    var airQualityGetParams = {
        // 'id':1,
    };
    var airQualityGetHeaders = {

    };
    var airQualityGetPromise = qService.httpGetWithToken(environmentRes.getAirQuality, airQualityGetParams, airQualityGetHeaders);
    airQualityGetPromise.then(function(data){
        // console.log(data.data);
        //盒子2的Highcharts的日期,若今日是6月8日,box2Date就是6月1日~6月7日
        $scope.box2Date=data.data[0];
        //盒子2的右侧的日期
        $scope.box2Today=data.data[1];
        //盒子4的右侧的日期
        $scope.box4Today=data.data[2];
        //盒子2的左侧的Highcharts中的过去七天AQI数值
        $scope.box2AQI=data.data[3];
        //盒子2右侧、盒子4的右侧的实时空气质量
        $scope.box24Index=data.data[4];
        //盒子2右侧的AQI级别
        $scope.airQualityLevel=data.data[5];
        //盒子2右侧的对健康影响
        $scope.healthEffect=data.data[6];
        //盒子2右侧的建议措施
        $scope.proposedMeasure=data.data[7];
        //盒子4左侧的Highcharts图表的数据
        $scope.box4Left=data.data[8];
        //--------------------------盒子2----------------------------
        //盒子2的Highcharts图表
        $scope.aqilinechart={
            options:{
                title: {
                    text: '过去七天空气质量AQI',
                    style: {
                        fontWeight:'bold',
                    },
                    x:20
                },
                credits: {
                    enabled:false
                },
                xAxis: {
                    categories: $scope.box2Date
                    // categories: ['6月1日', '6月2日', '6月3日', '6月4日', '6月5日','6月6日','6月7日']
                },
                yAxis: {
                    title: {
                        text: '空气质量指数(AQI)日均值'
                    }
                },
                legend: {
                    itemStyle:{
                        fontWeight:'normal'
                    }
                }
            },
            series: [{
                type: 'column',
                name: '实际AQI',
                color:"#95ceff",
                data: [$scope.box2AQI[0].aqi, $scope.box2AQI[1].aqi, $scope.box2AQI[2].aqi, $scope.box2AQI[3].aqi, $scope.box2AQI[4].aqi, $scope.box2AQI[5].aqi, $scope.box2AQI[6].aqi]
                // data: [50, 49, 65, 70, 43, 56, 41]
            },  {
                type: 'spline',
                name: '预测AQI',
                color:"#1F1F1F",
                data: [$scope.box2AQI[0].aqi-5, $scope.box2AQI[1].aqi+3, $scope.box2AQI[2].aqi+2, $scope.box2AQI[3].aqi-3, $scope.box2AQI[4].aqi-4, $scope.box2AQI[5].aqi+2, $scope.box2AQI[6].aqi-3]
                // data: [45, 57, 64, 78, 49, 52, 48]
            }]
        };
        //点击展开盒子2的对健康的影响
        $scope.openorclose='↓展开';
        $scope.openHealthList = function(){
            $scope.ishealthopen = !$scope.ishealthopen;
            if (!$scope.ishealthopen){
                $scope.openorclose='↓展开';
                $scope.openorclose1='↑关闭';
            }else{
                $scope.openorclose='↑关闭';
                $scope.openorclose1='↓展开';
            }
            $scope.issuggestionopen = false;
        };
        //点击展开盒子2的对建议措施
        $scope.openorclose1='↓展开';
        $scope.openSuggestionList = function(){
            $scope.issuggestionopen = !$scope.issuggestionopen;
            if (!$scope.issuggestionopen){
                $scope.openorclose1='↓展开';
                $scope.openorclose='↑关闭';
            }else{
                $scope.openorclose1='↑关闭';
                $scope.openorclose='↓展开';
            }
            $scope.ishealthopen = false;
        };
        //------------------------盒子2结束---------------------------
        //-------------------盒子3中空气质量模块地图---------------------
        //空气质量Button点击事件
        $scope.airQualityBtn = function() {
            $scope.istownairquality = true;
            $scope.istownaircondition=false;
            $scope.istownwasteair=false;
            map.setZoomAndCenter(15, [121.116757,31.448875]);
            $scope.mapTableStatus = {
                airQuality: true,
                airCondition: false,
                wasteAir: false
            };
        };
        //设置城区空气质量预测模块下marker的锚点，marker的label，显示信息窗体
        $timeout(function(){
            //设置marker的坐标和锚点图片
            var marker1 = new AMap.Marker({
                position: [121.11414, 31.45605],//太仓监测站
                map:map,
                icon: new AMap.Icon({
                    size: new AMap.Size(40, 50),
                    image: "/images/marker_sprite.png",
                })
            });
            var marker2 = new AMap.Marker({
                position: [121.124353, 31.444371],//科教新城监测站
                map:map,
                icon: new AMap.Icon({
                    size: new AMap.Size(40, 50),
                    image: "/images/marker_sprite.png",
                })
            });
            // 设置marker的label标签(绿色的圆角矩形)
            var infow1=[];
            infow1.push("<div style='background-color:#FFFFFF;border:2px solid #66cc66;border-radius:10px;padding:10px 10px;position:absolute;top:-10px;left:-5px;white-space:nowrap;color:#66cc66;font-size:18px'>太仓市监测站</div>")
            marker1.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
                offset: new AMap.Pixel(23, 5),//修改label相对于marker的位置
                content: infow1.join('')
            });
            var infow2=[];
            infow2.push("<div style='background-color:#FFFFFF;border:2px solid #66cc66;border-radius:10px;padding:10px 10px;position:absolute;top:-10px;left:-5px;white-space:nowrap;color:#66cc66;font-size:18px'>科教新城监测站</div>")
            marker2.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
                offset: new AMap.Pixel(23, 5),//修改label相对于marker的位置
                content: infow2.join('')
            });
            //显示信息窗体(可单击位置显示隐藏的信息窗体)
            var info1=[];
            info1.push("<h4><strong>太仓监测站(明日空气质量)</strong></h4>");
            info1.push("<table class='table table-bordered table-striped'>");
            var taicangAirmonitorString1="<tr><td class='maptable' style='line-height:35px;'>AQI</td><td><div class='map-table-right' style='background-Color:#f0ad4e;margin-left:2.5px;margin-top:4px;'>" + $scope.box2AQI[0].aqi + "</div></td></tr>";
            info1.push(taicangAirmonitorString1);
            var taicangAirmonitorString2="<tr><td class='maptable' style='line-height:35px;'>主要污染物</td><td><div class='map-table-right' style='background-Color:#5cb85c;margin-left:2.5px;margin-top:4px;'>" + $scope.box2AQI[0].firstElement + "</div></td></tr>";
            info1.push(taicangAirmonitorString2);
            var taicangAirmonitorString3="<tr><td class='maptable' style='line-height:35px;'>PM2.5</td><td><div class='map-table-right' style='background-Color:#5cb85c;margin-left:2.5px;margin-top:4px;'>" + $scope.box2AQI[0].pm25 + "</div></td></tr>";
            info1.push(taicangAirmonitorString3);
            var taicangAirmonitorString4="<tr><td class='maptable' style='line-height:35px;'>二氧化硫浓度</td><td><div class='map-table-right' style='background-Color:#5cb85c;margin-left:2.5px;margin-top:4px;'>" + $scope.box2AQI[0].so2 + "</div></td></tr>";
            info1.push(taicangAirmonitorString4);
            info1.push("</table>");
            var infowindow1 = new AMap.InfoWindow({
                content: info1.join(''),
                offset: new AMap.Pixel(0, -30),
                size:new AMap.Size(300,0)
            })
            var clickHandle1 = AMap.event.addListener(marker1, 'click', function() {
                infowindow1.open(map, marker1.getPosition())
            })
            var info2=[];
            info2.push("<h4><strong>科教新城监测站(明日空气质量)</strong></h4>");
            info2.push("<table class='table table-bordered table-striped'>");
            var kejiaoAirmonitorString1="<tr><td class='maptable' style='line-height:35px;'>AQI</td><td><div class='map-table-right' style='background-Color:#f0ad4e;margin-left:2.5px;margin-top:4px;'>" + $scope.box2AQI[1].aqi + "</div></td></tr>";
            info2.push(kejiaoAirmonitorString1);
            var kejiaoAirmonitorString2="<tr><td class='maptable' style='line-height:35px;'>主要污染物</td><td><div class='map-table-right' style='background-Color:#5cb85c;margin-left:2.5px;margin-top:4px;'>" + $scope.box2AQI[1].firstElement + "</div></td></tr>";
            info2.push(kejiaoAirmonitorString2);
            var kejiaoAirmonitorString3="<tr><td class='maptable' style='line-height:35px;'>PM2.5</td><td><div class='map-table-right' style='background-Color:#5cb85c;margin-left:2.5px;margin-top:4px;'>" + $scope.box2AQI[1].pm25 + "</div></td></tr>";
            info2.push(kejiaoAirmonitorString3);
            var kejiaoAirmonitorString4="<tr><td class='maptable' style='line-height:35px;'>二氧化硫浓度</td><td><div class='map-table-right' style='background-Color:#5cb85c;margin-left:2.5px;margin-top:4px;'>" + $scope.box2AQI[1].so2 + "</div></td></tr>";
            info2.push(kejiaoAirmonitorString4);
            info2.push("</table>");
            var infowindow2 = new AMap.InfoWindow({
                content:  info2.join(''),
                offset: new AMap.Pixel(0,0),
                size:new AMap.Size(300,0)
            })
            var clickHandle2 = AMap.event.addListener(marker2, 'click', function() {
                infowindow2.open(map, marker2.getPosition())
            })
        }, 0);
        //-----------------盒子3中空气质量模块地图结束-------------------
        //--------------------------盒子4----------------------------
        //盒子4左侧Highcharts图表
        //gauge仪表盘绿黄红变色范围
        var airQualityAQIScan = {
            scan: [100,300],
            type: 'asc'
        };
        var airQualityPM25Scan = {
            scan:[75,115],
            type: 'asc'
        };
        var airQualityPM10Scan = {
            scan:[150,250],
            type: 'asc'
        };
        var airQualitySo2Scan = {
            scan: [150,500],
            type: 'asc'
        };
        var airQualityNo2Scan = {
            scan:[80,180],
            type: 'asc'
        };
        var airQualityCoScan = {
            scan:[4,14],
            type: 'asc'
        };
        var airQualityO3Scan = {
            scan:[160,200],
            type: 'asc'
        };
        $scope.airQualityOptions = {
            //AQI仪表图
            aqiOption:{
                options : {
                    chart: {
                        type: 'gauge',
                        plotBackgroundColor: null,
                        plotBackgroundImage: null,
                        plotBorderWidth: 0,
                        plotShadow: false,
                        width:200
                    },
                    title: {
                        text: 'AQI',
                        y:40,
                        style:{
                            fontFamily:'微软雅黑'
                        }
                    },
                    pane: {
                        startAngle: -150,
                        endAngle: 150,
                        background: [{
                            backgroundColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, '#FFF'],
                                    [1, '#333']
                                ]
                            },
                            borderWidth: 0,
                            outerRadius: '109%'
                        }, {
                            backgroundColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, '#333'],
                                    [1, '#FFF']
                                ]
                            },
                            borderWidth: 1,
                            outerRadius: '107%'
                        }, {
                            // default background
                        }, {
                            backgroundColor: '#DDD',
                            borderWidth: 0,
                            outerRadius: '105%',
                            innerRadius: '103%'
                        }]
                    },
                    // the value axis
                    yAxis: {
                        min: 0,
                        max: 400,
                        minorTickInterval: 'auto',
                        minorTickWidth: 1,
                        minorTickLength: 10,
                        minorTickPosition: 'inside',
                        minorTickColor: '#666',
                        tickPixelInterval: 30,
                        tickWidth: 2,
                        tickPosition: 'inside',
                        tickLength: 10,
                        tickColor: '#666',
                        labels: {
                            step: 2,
                            rotation: 'auto'
                        },
                        title: {
                            text: ''
                        },
                        plotBands: [{
                            from: 0,
                            to: airQualityAQIScan.scan[0],
                            color: '#55BF3B' // green
                        }, {
                            from: airQualityAQIScan.scan[0],
                            to: airQualityAQIScan.scan[1],
                            color: '#DDDF0D' // yellow
                        }, {
                            from: airQualityAQIScan.scan[1],
                            to: 400,
                            color: '#DF5353' // red
                        }]
                    },
                    credits: {
                        enabled: false
                    }
                },
                series: [{
                    name: 'AQI',
                    data: [$scope.box4Left[11].aqi],
                    // data: [65],
                    tooltip: {
                        valueSuffix: ''
                    }
                }],
            },
            //AQI折线图
            currentAqiLineOption:{
                options:{
                    chart: {
                        height:250
                    },
                    title: {
                        text: null,
                    },
                    xAxis: {
                        categories: ['22时','23时','0时','1时','2时','3时','4时','5时','6时','7时','8时','9时'],
                        tickmarkPlacement: 'on'
                    },
                    yAxis: {
                        title: {
                            text: ''
                        },
                        min:0,
                        max:310,
                        plotLines : [{
                            color: '#DF5353',
                            width: 2,
                            value: 300,
                            dashStyle: 'Dash',
                            label:{
                                text:'严重污染',
                                align:'left',
                                x:10,
                                style: {
                                    fontSize: '8px',
                                    fontWeight: 200
                                }
                            }
                        },{
                            color: '#DDDF0D',
                            width: 2,
                            value: 100,
                            dashStyle: 'Dash',
                            label:{
                                text:'轻度污染',
                                align:'left',
                                x:10,
                                style: {
                                    fontSize: '8px',
                                    fontWeight: 200
                                }
                            }
                        }]
                    },
                    tooltip: {
                        valueSuffix: ''
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions:{
                        series: {
                            cursor: 'pointer',
                            events: {
                                click: function (event) {
                                    $scope.$apply(function(){
                                        $scope.airQualityOptions.aqiOption.series[0].data = [event.point.y];
                                    });
                                }
                            }
                        }
                    },
                    credits: {
                        enabled: false
                    }
                },
                series: [{
                    name: 'AQI',
                    data: [$scope.box4Left[0].aqi,$scope.box4Left[1].aqi,$scope.box4Left[2].aqi,$scope.box4Left[3].aqi,$scope.box4Left[4].aqi,$scope.box4Left[5].aqi,$scope.box4Left[6].aqi,$scope.box4Left[7].aqi,$scope.box4Left[8].aqi,$scope.box4Left[9].aqi,$scope.box4Left[10].aqi,$scope.box4Left[11].aqi]
                    // data: [100, 120, 150, 80, 110, 90, 100, 120, 150, 80, 110, 90]
                }],
            },
            //PM2.5仪表图
            pm25Option:{
                options:{
                    chart: {
                        type: 'gauge',
                        plotBackgroundColor: null,
                        plotBackgroundImage: null,
                        plotBorderWidth: 0,
                        plotShadow: false,
                        width:200
                    },
                    title: {
                        text: 'PM2.5',
                        y:40,
                        style:{
                            fontFamily:'微软雅黑'
                        }
                    },
                    pane: {
                        startAngle: -150,
                        endAngle: 150,
                        background: [{
                            backgroundColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, '#FFF'],
                                    [1, '#333']
                                ]
                            },
                            borderWidth: 0,
                            outerRadius: '109%'
                        }, {
                            backgroundColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, '#333'],
                                    [1, '#FFF']
                                ]
                            },
                            borderWidth: 1,
                            outerRadius: '107%'
                        }, {
                            // default background
                        }, {
                            backgroundColor: '#DDD',
                            borderWidth: 0,
                            outerRadius: '105%',
                            innerRadius: '103%'
                        }]
                    },
                    // the value axis
                    yAxis: {
                        min: 0,
                        max: 250,
                        minorTickInterval: 'auto',
                        minorTickWidth: 1,
                        minorTickLength: 10,
                        minorTickPosition: 'inside',
                        minorTickColor: '#666',
                        tickPixelInterval: 30,
                        tickWidth: 2,
                        tickPosition: 'inside',
                        tickLength: 10,
                        tickColor: '#666',
                        labels: {
                            step: 2,
                            rotation: 'auto'
                        },
                        title: {
                            text: ''
                        },
                        plotBands: [{
                            from: 0,
                            to: airQualityPM25Scan.scan[0],
                            color: '#55BF3B' // green
                        }, {
                            from: airQualityPM25Scan.scan[0],
                            to: airQualityPM25Scan.scan[1],
                            color: '#DDDF0D' // yellow
                        }, {
                            from: airQualityPM25Scan.scan[1],
                            to: 250,
                            color: '#DF5353' // red
                        }]
                    },
                    credits: {
                        enabled: false
                    }
                },
                series: [{
                    name: 'PM2.5',
                    data: [$scope.box4Left[11].pm25],
                    // data: [40],
                    tooltip: {
                        valueSuffix: ''
                    }
                }],
            },
            //PM2.5折线图
            currentPm25LineOption:{
                options:{
                    title: {
                        text: null,
                    },
                    xAxis: {
                        categories: ['22时','23时','0时','1时','2时','3时','4时','5时','6时','7时','8时','9时'],
                        tickmarkPlacement: 'on'
                    },
                    yAxis: {
                        title: {
                            text: 'μg/m³'
                        },
                        min:0,
                        max:250,
                        plotLines : [{
                            color: '#DDDF0D',
                            width: 2,
                            value: 75,
                            dashStyle: 'Dash',
                            label:{
                                text:'轻度污染',
                                align:'left',
                                x:10,
                                style: {
                                    fontSize: '8px',
                                    fontWeight: 200
                                }
                            }
                        },{
                            color: '#DF5353',
                            width: 2,
                            value: 150,
                            dashStyle: 'Dash',
                            label:{
                                text:'严重污染',
                                align:'left',
                                x:10,
                                style: {
                                    fontSize: '8px',
                                    fontWeight: 200
                                }
                            }
                        }]
                    },
                    tooltip: {
                        valueSuffix: 'μg/m³'
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions:{
                        series: {
                            cursor: 'pointer',
                            events: {
                                click: function (event) {
                                    $scope.$apply(function(){
                                        $scope.airQualityOptions.pm25Option.series[0].data = [event.point.y];
                                    });
                                }
                            }
                        }
                    },
                    credits: {
                        enabled: false
                    }
                },
                series: [{
                    name: 'PM2.5',
                    data: [$scope.box4Left[0].pm25,$scope.box4Left[1].pm25,$scope.box4Left[2].pm25,$scope.box4Left[3].pm25,$scope.box4Left[4].pm25,$scope.box4Left[5].pm25,$scope.box4Left[6].pm25,$scope.box4Left[7].pm25,$scope.box4Left[8].pm25,$scope.box4Left[9].pm25,$scope.box4Left[10].pm25,$scope.box4Left[11].pm25]
                    // data: [100, 120, 150, 80, 110, 90, 100, 120, 150, 80, 110, 90]
                }],
            },
            //PM10仪表图
            pm10Option:{
                options:{
                    chart: {
                        type: 'gauge',
                        plotBackgroundColor: null,
                        plotBackgroundImage: null,
                        plotBorderWidth: 0,
                        plotShadow: false,
                        width:200
                    },
                    title: {
                        text: 'PM10',
                        y:40,
                        style:{
                            fontFamily:'微软雅黑'
                        }
                    },
                    pane: {
                        startAngle: -150,
                        endAngle: 150,
                        background: [{
                            backgroundColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, '#FFF'],
                                    [1, '#333']
                                ]
                            },
                            borderWidth: 0,
                            outerRadius: '109%'
                        }, {
                            backgroundColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, '#333'],
                                    [1, '#FFF']
                                ]
                            },
                            borderWidth: 1,
                            outerRadius: '107%'
                        }, {
                            // default background
                        }, {
                            backgroundColor: '#DDD',
                            borderWidth: 0,
                            outerRadius: '105%',
                            innerRadius: '103%'
                        }]
                    },
                    // the value axis
                    yAxis: {
                        min: 0,
                        max: 400,
                        minorTickInterval: 'auto',
                        minorTickWidth: 1,
                        minorTickLength: 10,
                        minorTickPosition: 'inside',
                        minorTickColor: '#666',
                        tickPixelInterval: 30,
                        tickWidth: 2,
                        tickPosition: 'inside',
                        tickLength: 10,
                        tickColor: '#666',
                        labels: {
                            step: 2,
                            rotation: 'auto'
                        },
                        title: {
                            text: ''
                        },
                        plotBands: [{
                            from: 0,
                            to: airQualityPM10Scan.scan[0],
                            color: '#55BF3B' // green
                        }, {
                            from: airQualityPM10Scan.scan[0],
                            to: airQualityPM10Scan.scan[1],
                            color: '#DDDF0D' // yellow
                        }, {
                            from: airQualityPM10Scan.scan[1],
                            to: 400,
                            color: '#DF5353' // red
                        }]
                    },

                    credits: {
                        enabled: false
                    }
                },
                series: [{
                    name: 'PM10',
                    data: [$scope.box4Left[11].pm10],
                    // data: [36],
                    tooltip: {
                        valueSuffix: 'μg/m³'
                    }
                }],
            },
            //PM10折线图
            currentPm10LineOption:{
                options:{
                    title: {
                        text: null,
                    },
                    xAxis: {
                        categories: ['22时','23时','0时','1时','2时','3时','4时','5时','6时','7时','8时','9时'],
                        tickmarkPlacement: 'on'
                    },
                    yAxis: {
                        title: {
                            text: 'μg/m³'
                        },
                        min:0,
                        max:400,
                        plotLines : [{
                            color: '#DDDF0D',
                            width: 2,
                            value: 150,
                            dashStyle: 'Dash',
                            label:{
                                text:'轻度污染',
                                align:'left',
                                x:10,
                                style: {
                                    fontSize: '8px',
                                    fontWeight: 200
                                }
                            }
                        },{
                            color: '#DF5353',
                            width: 2,
                            value: 250,
                            dashStyle: 'Dash',
                            label:{
                                text:'严重污染',
                                align:'left',
                                x:10,
                                style: {
                                    fontSize: '8px',
                                    fontWeight: 200
                                }
                            }
                        }]
                    },
                    tooltip: {
                        valueSuffix: 'μg/m³'
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions:{
                        series: {
                            cursor: 'pointer',
                            events: {
                                click: function (event) {
                                    $scope.$apply(function(){
                                        $scope.airQualityOptions.pm10Option.series[0].data = [event.point.y];
                                    });
                                }
                            }
                        }
                    },
                    credits: {
                        enabled: false
                    }
                },
                series: [{
                    name: 'PM10',
                    data: [$scope.box4Left[0].pm10,$scope.box4Left[1].pm10,$scope.box4Left[2].pm10,$scope.box4Left[3].pm10,$scope.box4Left[4].pm10,$scope.box4Left[5].pm10,$scope.box4Left[6].pm10,$scope.box4Left[7].pm10,$scope.box4Left[8].pm10,$scope.box4Left[9].pm10,$scope.box4Left[10].pm10,$scope.box4Left[11].pm10]
                    // data: [100, 120, 150, 80, 110, 90, 100, 120, 150, 80, 110, 90]
                }],
            },
            //SO2仪表图
            so2Option:{
                options:{
                    chart: {
                        type: 'gauge',
                        plotBackgroundColor: null,
                        plotBackgroundImage: null,
                        plotBorderWidth: 0,
                        plotShadow: false,
                        width:200
                    },
                    title: {
                        text: '二氧化硫',
                        y:40,
                        style:{
                            fontFamily:'微软雅黑'
                        }
                    },
                    pane: {
                        startAngle: -150,
                        endAngle: 150,
                        background: [{
                            backgroundColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, '#FFF'],
                                    [1, '#333']
                                ]
                            },
                            borderWidth: 0,
                            outerRadius: '109%'
                        }, {
                            backgroundColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, '#333'],
                                    [1, '#FFF']
                                ]
                            },
                            borderWidth: 1,
                            outerRadius: '107%'
                        }, {
                            // default background
                        }, {
                            backgroundColor: '#DDD',
                            borderWidth: 0,
                            outerRadius: '105%',
                            innerRadius: '103%'
                        }]
                    },
                    // the value axis
                    yAxis: {
                        min: 0,
                        max: 700,

                        minorTickInterval: 'auto',
                        minorTickWidth: 1,
                        minorTickLength: 10,
                        minorTickPosition: 'inside',
                        minorTickColor: '#666',

                        tickPixelInterval: 30,
                        tickWidth: 2,
                        tickPosition: 'inside',
                        tickLength: 10,
                        tickColor: '#666',
                        labels: {
                            step: 2,
                            rotation: 'auto'
                        },
                        title: {
                            text: ''
                        },
                        plotBands: [{
                            from: 0,
                            to: airQualitySo2Scan.scan[0],
                            color: '#55BF3B' // green
                        }, {
                            from: airQualitySo2Scan.scan[0],
                            to: airQualitySo2Scan.scan[1],
                            color: '#DDDF0D' // yellow
                        }, {
                            from: airQualitySo2Scan.scan[1],
                            to: 700,
                            color: '#DF5353' // red
                        }]
                    },
                    credits: {
                        enabled: false
                    }
                },
                series: [{
                    name: '二氧化硫',
                    data: [$scope.box4Left[11].so2],
                    // data: [56],
                    tooltip: {
                        valueSuffix: 'μg/m³'
                    }
                }],
            },
            //SO2折线图
            currentSo2LineOption:{
                options:{
                    title: {
                        text: null,
                    },
                    xAxis: {
                        categories: ['22时','23时','0时','1时','2时','3时','4时','5时','6时','7时','8时','9时'],
                        tickmarkPlacement: 'on'
                    },
                    yAxis: {
                        title: {
                            text: 'μg/m³'
                        },
                        min:0,
                        max:700,
                        plotLines : [{
                            color: '#DDDF0D',
                            width: 2,
                            value: 150,
                            dashStyle: 'Dash',
                            label:{
                                text:'轻度污染',
                                align:'left',
                                x:10,
                                style: {
                                    fontSize: '8px',
                                    fontWeight: 200
                                }
                            }
                        },{
                            color: '#DF5353',
                            width: 2,
                            value: 475,
                            dashStyle: 'Dash',
                            label:{
                                text:'严重污染',
                                align:'left',
                                x:10,
                                style: {
                                    fontSize: '8px',
                                    fontWeight: 200
                                }
                            }
                        }]
                    },
                    tooltip: {
                        valueSuffix: 'μg/m³'
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions:{
                        series: {
                            cursor: 'pointer',
                            events: {
                                click: function (event) {
                                    $scope.$apply(function(){
                                        $scope.airQualityOptions.so2Option.series[0].data = [event.point.y];
                                    });
                                }
                            }
                        }
                    },
                    credits: {
                        enabled: false
                    }
                },
                series: [{
                    name: '二氧化硫',
                    data: [$scope.box4Left[0].so2,$scope.box4Left[1].so2,$scope.box4Left[2].so2,$scope.box4Left[3].so2,$scope.box4Left[4].so2,$scope.box4Left[5].so2,$scope.box4Left[6].so2,$scope.box4Left[7].so2,$scope.box4Left[8].so2,$scope.box4Left[9].so2,$scope.box4Left[10].so2,$scope.box4Left[11].so2]
                    // data: [100, 120, 150, 80, 110, 90, 100, 120, 150, 80, 110, 90]
                }],
            },
            //NO2仪表图
            no2Option:{
                options:{
                    chart: {
                        type: 'gauge',
                        plotBackgroundColor: null,
                        plotBackgroundImage: null,
                        plotBorderWidth: 0,
                        plotShadow: false,
                        width:200
                    },
                    title: {
                        text: '二氧化氮',
                        y:40,
                        style:{
                            fontFamily:'微软雅黑'
                        }
                    },
                    pane: {
                        startAngle: -150,
                        endAngle: 150,
                        background: [{
                            backgroundColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, '#FFF'],
                                    [1, '#333']
                                ]
                            },
                            borderWidth: 0,
                            outerRadius: '109%'
                        }, {
                            backgroundColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, '#333'],
                                    [1, '#FFF']
                                ]
                            },
                            borderWidth: 1,
                            outerRadius: '107%'
                        }, {
                            // default background
                        }, {
                            backgroundColor: '#DDD',
                            borderWidth: 0,
                            outerRadius: '105%',
                            innerRadius: '103%'
                        }]
                    },

                    // the value axis
                    yAxis: {
                        min: 0,
                        max: 280,

                        minorTickInterval: 'auto',
                        minorTickWidth: 1,
                        minorTickLength: 10,
                        minorTickPosition: 'inside',
                        minorTickColor: '#666',

                        tickPixelInterval: 30,
                        tickWidth: 2,
                        tickPosition: 'inside',
                        tickLength: 10,
                        tickColor: '#666',
                        labels: {
                            step: 2,
                            rotation: 'auto'
                        },
                        title: {
                            text: ''
                        },
                        plotBands: [{
                            from: 0,
                            to: airQualityNo2Scan.scan[0],
                            color: '#55BF3B' // green
                        }, {
                            from: airQualityNo2Scan.scan[0],
                            to: airQualityNo2Scan.scan[1],
                            color: '#DDDF0D' // yellow
                        }, {
                            from: airQualityNo2Scan.scan[1],
                            to: 280,
                            color: '#DF5353' // red
                        }]
                    },
                    credits: {
                        enabled: false
                    }
                },
                series: [{
                    name: '二氧化氮',
                    data: [$scope.box4Left[11].no2],
                    // data: [53],
                    tooltip: {
                        valueSuffix: 'μg/m³'
                    }
                }],
            },
            //NO2折线图
            currentNo2LineOption:{
                options:{
                    title: {
                        text: null,
                    },
                    xAxis: {
                        categories: ['22时','23时','0时','1时','2时','3时','4时','5时','6时','7时','8时','9时'],
                        tickmarkPlacement: 'on'
                    },
                    yAxis: {
                        title: {
                            text: 'μg/m³'
                        },
                        min:0,
                        max:280,
                        plotLines : [{
                            color: '#DDDF0D',
                            width: 2,
                            value: 80,
                            dashStyle: 'Dash',
                            label:{
                                text:'轻度污染',
                                align:'left',
                                x:10,
                                style: {
                                    fontSize: '8px',
                                    fontWeight: 200
                                }
                            }
                        },{
                            color: '#DF5353',
                            width: 2,
                            value: 180,
                            dashStyle: 'Dash',
                            label:{
                                text:'严重污染',
                                align:'left',
                                x:10,
                                style: {
                                    fontSize: '8px',
                                    fontWeight: 200
                                }
                            }
                        }]
                    },
                    tooltip: {
                        valueSuffix: 'μg/m³'
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions:{
                        series: {
                            cursor: 'pointer',
                            events: {
                                click: function (event) {
                                    $scope.$apply(function(){
                                        $scope.airQualityOptions.no2Option.series[0].data = [event.point.y];
                                    });
                                }
                            }
                        }
                    },
                    credits: {
                        enabled: false
                    }
                },
                series: [{
                    name: '二氧化氮',
                    data: [$scope.box4Left[0].no2,$scope.box4Left[1].no2,$scope.box4Left[2].no2,$scope.box4Left[3].no2,$scope.box4Left[4].no2,$scope.box4Left[5].no2,$scope.box4Left[6].no2,$scope.box4Left[7].no2,$scope.box4Left[8].no2,$scope.box4Left[9].no2,$scope.box4Left[10].no2,$scope.box4Left[11].no2]
                    // data: [100, 120, 150, 80, 110, 90, 100, 120, 150, 80, 110, 90]
                }],
            },
            //CO仪表图
            coOption:{
                options:{
                    chart: {
                        type: 'gauge',
                        plotBackgroundColor: null,
                        plotBackgroundImage: null,
                        plotBorderWidth: 0,
                        plotShadow: false,
                        width:200
                    },
                    title: {
                        text: '一氧化碳',
                        y:40,
                        style:{
                            fontFamily:'微软雅黑'
                        }
                    },
                    pane: {
                        startAngle: -150,
                        endAngle: 150,
                        background: [{
                            backgroundColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, '#FFF'],
                                    [1, '#333']
                                ]
                            },
                            borderWidth: 0,
                            outerRadius: '109%'
                        }, {
                            backgroundColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, '#333'],
                                    [1, '#FFF']
                                ]
                            },
                            borderWidth: 1,
                            outerRadius: '107%'
                        }, {
                            // default background
                        }, {
                            backgroundColor: '#DDD',
                            borderWidth: 0,
                            outerRadius: '105%',
                            innerRadius: '103%'
                        }]
                    },
                    // the value axis
                    yAxis: {
                        min: 0,
                        max: 24,
                        minorTickInterval: 'auto',
                        minorTickWidth: 1,
                        minorTickLength: 10,
                        minorTickPosition: 'inside',
                        minorTickColor: '#666',

                        tickPixelInterval: 30,
                        tickWidth: 2,
                        tickPosition: 'inside',
                        tickLength: 10,
                        tickColor: '#666',
                        labels: {
                            step: 2,
                            rotation: 'auto'
                        },
                        title: {
                            text: ''
                        },
                        plotBands: [{
                            from: 0,
                            to: airQualityCoScan.scan[0],
                            color: '#55BF3B' // green
                        }, {
                            from: airQualityCoScan.scan[0],
                            to: airQualityCoScan.scan[1],
                            color: '#DDDF0D' // yellow
                        }, {
                            from: airQualityCoScan.scan[1],
                            to: 24,
                            color: '#DF5353' // red
                        }]
                    },
                    credits: {
                        enabled: false
                    }
                },
                series: [{
                    name: '一氧化碳',
                    data: [$scope.box4Left[11].co],
                    // data: [12],
                    tooltip: {
                        valueSuffix: 'mg/m³'
                    }
                }],
            },
            //CO折线图
            currentCoLineOption:{
                options:{
                    title: {
                        text: null,
                    },
                    xAxis: {
                        categories: ['22时','23时','0时','1时','2时','3时','4时','5时','6时','7时','8时','9时'],
                        tickmarkPlacement: 'on'
                    },
                    yAxis: {
                        title: {
                            text: 'mg/m³'
                        },
                        min:0,
                        max:24,
                        plotLines : [{
                            color: '#DDDF0D',
                            width: 2,
                            value: 4,
                            dashStyle: 'Dash',
                            label:{
                                text:'轻度污染',
                                align:'left',
                                x:4,
                                style: {
                                    fontSize: '8px',
                                    fontWeight: 200
                                }
                            }
                        },{
                            color: '#DF5353',
                            width: 2,
                            value: airQualityCoScan.scan[1],
                            dashStyle: 'Dash',
                            label:{
                                text:'严重污染',
                                align:'left',
                                x:14,
                                style: {
                                    fontSize: '8px',
                                    fontWeight: 200
                                }
                            }

                        }]
                    },
                    tooltip: {
                        valueSuffix: 'mg/m³'
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions:{
                        series: {
                            cursor: 'pointer',
                            events: {
                                click: function (event) {
                                    $scope.$apply(function(){
                                        $scope.airQualityOptions.coOption.series[0].data = [event.point.y];
                                    });
                                }
                            }
                        }
                    },
                    credits: {
                        enabled: false
                    }
                },
                series: [{
                    name: '一氧化碳',
                    data: [$scope.box4Left[0].co,$scope.box4Left[1].co,$scope.box4Left[2].co,$scope.box4Left[3].co,$scope.box4Left[4].co,$scope.box4Left[5].co,$scope.box4Left[6].co,$scope.box4Left[7].co,$scope.box4Left[8].co,$scope.box4Left[9].co,$scope.box4Left[10].co,$scope.box4Left[11].co]
                    // data: [10, 12, 15, 8, 11, 9, 10, 12, 15, 8, 11, 9]
                }],
            },
            //O3仪表图
            o3Option:{
                options:{
                    chart: {
                        type: 'gauge',
                        plotBackgroundColor: null,
                        plotBackgroundImage: null,
                        plotBorderWidth: 0,
                        plotShadow: false,
                        width:200
                    },
                    title: {
                        text: '臭氧',
                        y:40,
                        style:{
                            fontFamily:'微软雅黑'
                        }
                    },
                    pane: {
                        startAngle: -150,
                        endAngle: 150,
                        background: [{
                            backgroundColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, '#FFF'],
                                    [1, '#333']
                                ]
                            },
                            borderWidth: 0,
                            outerRadius: '109%'
                        }, {
                            backgroundColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, '#333'],
                                    [1, '#FFF']
                                ]
                            },
                            borderWidth: 1,
                            outerRadius: '107%'
                        }, {
                            // default background
                        }, {
                            backgroundColor: '#DDD',
                            borderWidth: 0,
                            outerRadius: '105%',
                            innerRadius: '103%'
                        }]
                    },
                    // the value axis
                    yAxis: {
                        min: 0,
                        max: 300,
                        minorTickInterval: 'auto',
                        minorTickWidth: 1,
                        minorTickLength: 10,
                        minorTickPosition: 'inside',
                        minorTickColor: '#666',
                        tickPixelInterval: 30,
                        tickWidth: 2,
                        tickPosition: 'inside',
                        tickLength: 10,
                        tickColor: '#666',
                        labels: {
                            step: 2,
                            rotation: 'auto'
                        },
                        title: {
                            text: ''
                        },
                        plotBands: [{
                            from: 0,
                            to: airQualityO3Scan.scan[0],
                            color: '#55BF3B' // green
                        }, {
                            from: airQualityO3Scan.scan[0],
                            to: airQualityO3Scan.scan[1],
                            color: '#DDDF0D' // yellow
                        }, {
                            from: airQualityO3Scan.scan[1],
                            to: 300,
                            color: '#DF5353' // red
                        }]
                    },
                    credits: {
                        enabled: false
                    }
                },
                series: [{
                    name: '臭氧',
                    data: [$scope.box4Left[11].o3],
                    // data: [30],
                    tooltip: {
                        valueSuffix: 'μg/m³'
                    }
                }],
            },
            //O3折线图
            currentO3LineOption:{
                options:{
                    title: {
                        text: null,
                    },
                    xAxis: {
                        categories: ['22时','23时','0时','1时','2时','3时','4时','5时','6时','7时','8时','9时'],
                        tickmarkPlacement: 'on'
                    },
                    yAxis: {
                        title: {
                            text: 'μg/m³'
                        },
                        min:0,
                        max:300,
                        plotLines : [{
                            color: '#DDDF0D',
                            width: 2,
                            value: 160,
                            dashStyle: 'Dash',
                            label:{
                                text:'轻度污染',
                                align:'left',
                                x:10,
                                style: {
                                    fontSize: '8px',
                                    fontWeight: 200
                                }
                            }
                        },{
                            color: '#DF5353',
                            width: 2,
                            value: 215,
                            dashStyle: 'Dash',
                            label:{
                                text:'严重污染',
                                align:'left',
                                x:10,
                                style: {
                                    fontSize: '8px',
                                    fontWeight: 200
                                }
                            }
                        }]
                    },
                    tooltip: {
                        valueSuffix: 'μg/m³'
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions:{
                        series: {
                            cursor: 'pointer',
                            events: {
                                click: function (event) {
                                    $scope.$apply(function(){
                                        $scope.airQualityOptions.o3Option.series[0].data = [event.point.y];
                                    });
                                }
                            }
                        }
                    },
                    credits: {
                        enabled: false
                    }
                },
                series: [{
                    name: '臭氧',
                    data: [$scope.box4Left[0].o3,$scope.box4Left[1].o3,$scope.box4Left[2].o3,$scope.box4Left[3].o3,$scope.box4Left[4].o3,$scope.box4Left[5].o3,$scope.box4Left[6].o3,$scope.box4Left[7].o3,$scope.box4Left[8].o3,$scope.box4Left[9].o3,$scope.box4Left[10].o3,$scope.box4Left[11].o3]
                    // data: [100, 120, 150, 80, 110, 90, 100, 120, 150, 80, 110, 90]
                }],
            }
        };
        //盒子4右侧下拉栏判断逻辑
        $scope.updown12=true;
        $scope.openAQI1List = function(){
            $scope.isAQI1open = !$scope.isAQI1open;
            if ($scope.isAQI1open){
                $scope.updown11=true;
                $scope.updown12=false;
                $scope.updown21=false;
                $scope.updown22=true;
                $scope.updown32=true;
                $scope.updown42=true;
                $scope.updown52=true;
                $scope.updown62=true;
                $scope.updown72=true;
                $scope.updown82=true;

                $scope.updown31=false;
                $scope.updown41=false;
                $scope.updown51=false;
                $scope.updown61=false;
                $scope.updown71=false;
                $scope.updown81=false;
            }else{
                $scope.updown11=false;
                $scope.updown12=true;
            }
            $scope.isPM251open = false;
            $scope.isPM101open = false;
            $scope.isSO21open = false;
            $scope.isCO1open = false;
            $scope.isNO21open = false;
            $scope.isO31open = false;
            $scope.ismainpollution1open=false;
        };
        $scope.updown22=true;
        $scope.openmainpollution1List = function(){
            $scope.ismainpollution1open = !$scope.ismainpollution1open;
            if ($scope.ismainpollution1open){
                $scope.updown21=true;
                $scope.updown22=false;
                $scope.updown12=true;
                $scope.updown32=true;
                $scope.updown42=true;
                $scope.updown52=true;
                $scope.updown62=true;
                $scope.updown72=true;
                $scope.updown82=true;
                $scope.updown11=false;
                $scope.updown31=false;
                $scope.updown41=false;
                $scope.updown51=false;
                $scope.updown61=false;
                $scope.updown71=false;
                $scope.updown81=false;
            }else{
                $scope.updown21=false;
                $scope.updown22=true;
            }
            $scope.isPM251open = false;
            $scope.isPM101open = false;
            $scope.isSO21open = false;
            $scope.isCO1open = false;
            $scope.isNO21open = false;
            $scope.isO31open = false;
            $scope.isAQI1open=false;
        };
        $scope.updown32=true;
        $scope.openPM251List = function(){
            $scope.isPM251open = !$scope.isPM251open;
            if ($scope.isPM251open){
                $scope.updown31=true;
                $scope.updown32=false;
                $scope.updown11=false;
                $scope.updown12=true;
                $scope.updown21=false;
                $scope.updown22=true;
                $scope.updown42=true;
                $scope.updown52=true;
                $scope.updown62=true;
                $scope.updown72=true;
                $scope.updown82=true;
                $scope.updown41=false;
                $scope.updown51=false;
                $scope.updown61=false;
                $scope.updown71=false;
                $scope.updown81=false;
            }else{
                $scope.updown31=false;
                $scope.updown32=true;
            }
            $scope.isAQI1open = false;
            $scope.isPM101open = false;
            $scope.isSO21open = false;
            $scope.isCO1open = false;
            $scope.isNO21open = false;
            $scope.isO31open = false;
            $scope.ismainpollution1open=false;
        };
        $scope.updown42=true;
        $scope.openPM101List = function(){
            $scope.isPM101open = !$scope.isPM101open;
            if ($scope.isPM101open){
                $scope.updown41=true;
                $scope.updown42=false;
                $scope.updown11=false;
                $scope.updown12=true;
                $scope.updown21=false;
                $scope.updown22=true;
                $scope.updown32=true;
                $scope.updown52=true;
                $scope.updown62=true;
                $scope.updown72=true;
                $scope.updown82=true;
                $scope.updown31=false;
                $scope.updown51=false;
                $scope.updown61=false;
                $scope.updown71=false;
                $scope.updown81=false;
            }else{
                $scope.updown41=false;
                $scope.updown42=true;
            }
            $scope.isPM251open = false;
            $scope.isAQI1open = false;
            $scope.isSO21open = false;
            $scope.isCO1open = false;
            $scope.isNO21open = false;
            $scope.isO31open = false;
            $scope.ismainpollution1open=false;
        };
        $scope.updown52=true;
        $scope.openSO21List = function(){
            $scope.isSO21open = !$scope.isSO21open;
            if ($scope.isSO21open){
                $scope.updown51=true;
                $scope.updown52=false;
                $scope.updown11=false;
                $scope.updown12=true;
                $scope.updown21=false;
                $scope.updown22=true;
                $scope.updown32=true;
                $scope.updown42=true;
                $scope.updown62=true;
                $scope.updown72=true;
                $scope.updown82=true;
                $scope.updown31=false;
                $scope.updown41=false;
                $scope.updown61=false;
                $scope.updown71=false;
                $scope.updown81=false;
            }else{
                $scope.updown51=false;
                $scope.updown52=true;
            }
            $scope.isPM251open = false;
            $scope.isPM101open = false;
            $scope.isAQI11open = false;
            $scope.isCO1open = false;
            $scope.isNO21open = false;
            $scope.isO31open = false;
            $scope.ismainpollution1open=false;
        };
        $scope.updown72=true;
        $scope.openCO1List = function(){
            $scope.isCO1open = !$scope.isCO1open;
            if ($scope.isCO1open){
                $scope.updown71=true;
                $scope.updown72=false;
                $scope.updown11=false;
                $scope.updown12=true;
                $scope.updown21=false;
                $scope.updown22=true;
                $scope.updown32=true;
                $scope.updown42=true;
                $scope.updown52=true;
                $scope.updown62=true;
                $scope.updown82=true;
                $scope.updown31=false;
                $scope.updown41=false;
                $scope.updown51=false;
                $scope.updown61=false;
                $scope.updown81=false;
            }else{
                $scope.updown71=false;
                $scope.updown72=true;
            }
            $scope.isPM251open = false;
            $scope.isPM101open = false;
            $scope.isSO21open = false;
            $scope.isAQI1open = false;
            $scope.isNO21open = false;
            $scope.isO31open = false;
            $scope.ismainpollution1open=false;
        };
        $scope.updown62=true;
        $scope.openNO21List = function(){
            $scope.isNO21open = !$scope.isNO21open;
            if ($scope.isNO21open){
                $scope.updown61=true;
                $scope.updown62=false;
                $scope.updown11=false;
                $scope.updown12=true;
                $scope.updown21=false;
                $scope.updown22=true;
                $scope.updown32=true;
                $scope.updown42=true;
                $scope.updown52=true;
                $scope.updown72=true;
                $scope.updown82=true;
                $scope.updown31=false;
                $scope.updown41=false;
                $scope.updown51=false;
                $scope.updown71=false;
                $scope.updown81=false;
            }else{
                $scope.updown61=false;
                $scope.updown62=true;
            }
            $scope.isPM251open = false;
            $scope.isPM101open = false;
            $scope.isSO21open = false;
            $scope.isCO1open = false;
            $scope.isAQI1open = false;
            $scope.isO31open = false;
            $scope.ismainpollution1open=false;
        };
        $scope.updown82=true;
        $scope.openO31List = function(){
            $scope.isO31open = !$scope.isO31open;
            if ($scope.isO31open){
                $scope.updown81=true;
                $scope.updown82=false;
                $scope.updown11=false;
                $scope.updown12=true;
                $scope.updown21=false;
                $scope.updown22=true;
                $scope.updown32=true;
                $scope.updown42=true;
                $scope.updown52=true;
                $scope.updown62=true;
                $scope.updown72=true;
                $scope.updown31=false;
                $scope.updown41=false;
                $scope.updown51=false;
                $scope.updown61=false;
                $scope.updown71=false;
            }else{
                $scope.updown81=false;
                $scope.updown82=true;
            }
            $scope.isPM251open = false;
            $scope.isPM101open = false;
            $scope.isSO21open = false;
            $scope.isCO1open = false;
            $scope.isNO21open = false;
            $scope.isAQI1open = false;
            $scope.ismainpollution1open=false;
        };
        //--------------------------盒子4结束----------------------------
    }, function(error){
        console.log('发送失败');
    });
    //-------------------------airQualityGetPromise结束--------------------------
    //-------------------------airPollutionGetPromise----------------------------
    var airPollutionGetParams = {
        // 'id':1,
    };
    var airPollutionGetHeaders = {

    };
    var airPollutionGetPromise = qService.httpGetWithToken(environmentRes.getAirPollution, airPollutionGetParams, airPollutionGetHeaders);
    airPollutionGetPromise.then(function(data){
        // console.log(data.data);
        $scope.pollutionDischarge=data.data[0];
        $scope.pollutionSmoke=data.data[1];
        $scope.pollutionSo2=data.data[2];
        $scope.pollutionNo=data.data[3];
        //-------------------------盒子3工业废气模块地图--------------------------
        //工业废气排放Button点击事件
        $scope.wasteAirBtn = function() {
            $scope.istownwasteair = true;
            $scope.istownaircondition=false;
            $scope.istownairquality=false;
            $scope.mapTableStatus = {
                airQuality: false,
                airCondition: false,
                wasteAir: true
            };
            map.setZoomAndCenter(12, [121.201515,31.620498]);
            //华能国际电力电厂
            marker4.setMap(map);
            var infow=[];
            infow.push("<div style='background-color:#FFFFFF;border:2px solid #66cc66;border-radius:10px;padding:10px 10px;position:absolute;top:-10px;left:-5px;white-space:nowrap;color:#66cc66;font-size:18px'>华能国际电力电厂</div>")
            marker4.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
                offset: new AMap.Pixel(23, 5),//修改label相对于marker的位置
                content: infow.join('')
            });
            var info4=[];
            info4.push("<h4><strong>华能国际电力股份有限公司电厂(实时数据)</strong></h4>");
            info4.push("<table class='table table-bordered table-striped'>");
            var huanengString1="<tr><td class='maptable' style='line-height:35px;'>排放量</td><td><div class='map-table-right' style='background-Color:#5cb85c;margin-left:10px;margin-top:4px;'>"+$scope.pollutionDischarge[2]+"万</div></td></tr>";
            info4.push(huanengString1);
            var huanengString2="<tr><td class='maptable' style='line-height:35px;'>烟尘浓度</td><td><div class='map-table-right' style='background-Color:#5cb85c;margin-left:10px;margin-top:4px;'>"+$scope.pollutionSmoke[2]+"mg/m³</div></td></tr>";
            info4.push(huanengString2);
            var huanengString3="<tr><td class='maptable' style='line-height:35px;'>二氧化硫浓度</td><td><div class='map-table-right' style='background-Color:#5cb85c;margin-left:10px;margin-top:4px;'>"+$scope.pollutionSo2[2]+"mg/m³</div></td></tr>";
            info4.push(huanengString3);
            var huanengString4="<tr><td class='maptable' style='line-height:35px;'>氮氧化物浓度</td><td><div class='map-table-right' style='background-Color:#5cb85c;margin-left:10px;margin-top:4px;'>"+$scope.pollutionNo[2]+"mg/m³</div></td></tr>";
            info4.push(huanengString4);
            info4.push("<tr><td class='maptable' style='line-height:35px;'>废气排放状况</td><td><div class='map-table-right' style='background-Color:#5cb85c;margin-left:10px;margin-top:4px;'>正常</div></td></tr>");
            info4.push("</table>");
            var infowindow4 = new AMap.InfoWindow({
                content: info4.join(''),
                offset: new AMap.Pixel(0, -30),
                size:new AMap.Size(320,0)
            })
            var clickHandle4 = AMap.event.addListener(marker4, 'click', function() {
                infowindow4.open(map, marker4.getPosition())
            })
            //玖龙纸业
            marker5.setMap(map);
            var infow=[];
            infow.push("<div style='background-color:#FFFFFF;border:2px solid #66cc66;border-radius:10px;padding:10px 10px;position:absolute;top:-10px;left:-5px;white-space:nowrap;color:#66cc66;font-size:18px'>玖龙纸业</div>")
            marker5.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
                offset: new AMap.Pixel(23, 5),//修改label相对于marker的位置
                content: infow.join('')
            });
            var info5=[];
            info5.push("<h4><strong>玖龙纸业(太仓)有限公司(实时数据)</strong></h4>");
            info5.push("<table class='table table-bordered table-striped'>");
            var jiulongString1="<tr><td class='maptable' style='line-height:35px;'>排放量</td><td><div class='map-table-right' style='background-Color:#5cb85c;margin-left:10px;margin-top:4px;'>"+$scope.pollutionDischarge[1]+"万</div></td></tr>";
            info5.push(jiulongString1);
            var jiulongString2="<tr><td class='maptable' style='line-height:35px;'>烟尘浓度</td><td><div class='map-table-right' style='background-Color:#5cb85c;margin-left:10px;margin-top:4px;'>"+$scope.pollutionSmoke[1]+"mg/m³</div></td></tr>";
            info5.push(jiulongString2);
            var jiulongString3="<tr><td class='maptable' style='line-height:35px;'>二氧化硫浓度</td><td><div class='map-table-right' style='background-Color:#5cb85c;margin-left:10px;margin-top:4px;'>"+$scope.pollutionSo2[1]+"mg/m³</div></td></tr>";
            info5.push(jiulongString3);
            var jiulongString4="<tr><td class='maptable' style='line-height:35px;'>氮氧化物浓度</td><td><div class='map-table-right' style='background-Color:#5cb85c;margin-left:10px;margin-top:4px;'>"+$scope.pollutionNo[1]+"mg/m³</div></td></tr>";
            info5.push(jiulongString4);
            info5.push("<tr><td class='maptable' style='line-height:35px;'>废气排放状况</td><td><div class='map-table-right' style='background-Color:#5cb85c;margin-left:10px;margin-top:4px;'>正常</div></td></tr>");
            info5.push("</table>");
            var infowindow5 = new AMap.InfoWindow({
                content: info5.join(''),
                offset: new AMap.Pixel(0, -30),
                size:new AMap.Size(320,0)
            })
            var clickHandle5 = AMap.event.addListener(marker5, 'click', function() {
                infowindow5.open(map, marker5.getPosition())
            })
            //太仓港协鑫发电
            marker6.setMap(map);
            var infow=[];
            infow.push("<div style='background-color:#FFFFFF;border:2px solid #66cc66;border-radius:10px;padding:10px 10px;position:absolute;top:-10px;left:-5px;white-space:nowrap;color:#66cc66;font-size:18px'>太仓港协鑫发电</div>")
            marker6.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
                offset: new AMap.Pixel(23, 5),//修改label相对于marker的位置
                content: infow.join('')
            });
            var info6=[];
            info6.push("<h4><strong>太仓港协鑫发电有限公司(实时数据)</strong></h4>");
            info6.push("<table class='table table-bordered table-striped'>");
            var xiexinString1="<tr><td class='maptable' style='line-height:35px;'>排放量</td><td><div class='map-table-right' style='background-Color:#5cb85c;margin-left:10px;margin-top:4px;'>"+$scope.pollutionDischarge[0]+"万</div></td></tr>";
            info6.push(xiexinString1);
            var xiexinString2="<tr><td class='maptable' style='line-height:35px;'>烟尘浓度</td><td><div class='map-table-right' style='background-Color:#5cb85c;margin-left:10px;margin-top:4px;'>"+$scope.pollutionSmoke[0]+"mg/m³</div></td></tr>";
            info6.push(xiexinString2);
            var xiexinString3="<tr><td class='maptable' style='line-height:35px;'>二氧化硫浓度</td><td><div class='map-table-right' style='background-Color:#5cb85c;margin-left:10px;margin-top:4px;'>"+$scope.pollutionSo2[0]+"mg/m³</div></td></tr>";
            info6.push(xiexinString3);
            var xiexinString4="<tr><td class='maptable' style='line-height:35px;'>氮氧化物浓度</td><td><div class='map-table-right' style='background-Color:#5cb85c;margin-left:10px;margin-top:4px;'>"+$scope.pollutionNo[0]+"mg/m³</div></td></tr>";
            info6.push(xiexinString4);
            info6.push("<tr><td class='maptable' style='line-height:35px;'>废气排放状况</td><td><div class='map-table-right' style='background-Color:#5cb85c;margin-left:10px;margin-top:4px;'>正常</div></td></tr>");
            info6.push("</table>");
            var infowindow6 = new AMap.InfoWindow({
                content: info6.join(''),
                offset: new AMap.Pixel(0, -30),
                size:new AMap.Size(320,0)
            })
            var clickHandle6 = AMap.event.addListener(marker6, 'click', function() {
                infowindow6.open(map, marker6.getPosition())
            })
        };
        var marker4 = new AMap.Marker({
            position: [121.180359,31.653057],//图标大小
            icon: new AMap.Icon({
                size: new AMap.Size(40, 50),
                image: "/images/marker_sprite.png",
            })//华能国际电力电厂
        });
        var marker5 = new AMap.Marker({
            position: [121.244154,31.592104],//图标大小
            icon: new AMap.Icon({
                size: new AMap.Size(40, 50),
                image: "/images/marker_sprite.png",
            })//玖龙纸业
        });
        var marker6 = new AMap.Marker({
            position: [121.252561,31.582579],//图标大小
            icon: new AMap.Icon({
                size: new AMap.Size(40, 50),
                image: "/images/marker_sprite.png",
            })//太仓港协鑫发电
        });
        //------------------------盒子3工业废气模块地图结束-------------------------
    }, function(error){
        console.log('发送失败');
    });
    //-------------------------airPollutionGetPromise结束--------------------------
};