export default ($scope, $rootScope, qService, environmentRes, $timeout) => {
    'ngInject';
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
                image: "/assets/images/environment/marker_sprite.png",
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
                    image: "/assets/images/environment/marker_sprite.png",
                })
            });
            var marker2 = new AMap.Marker({
                position: [121.124353, 31.444371],//科教新城监测站
                map:map,
                icon: new AMap.Icon({
                    size: new AMap.Size(40, 50),
                    image: "/assets/images/environment/marker_sprite.png",
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
                image: "/assets/images/environment/marker_sprite.png",
            })//华能国际电力电厂
        });
        var marker5 = new AMap.Marker({
            position: [121.244154,31.592104],//图标大小
            icon: new AMap.Icon({
                size: new AMap.Size(40, 50),
                image: "/assets/images/environment/marker_sprite.png",
            })//玖龙纸业
        });
        var marker6 = new AMap.Marker({
            position: [121.252561,31.582579],//图标大小
            icon: new AMap.Icon({
                size: new AMap.Size(40, 50),
                image: "/assets/images/environment/marker_sprite.png",
            })//太仓港协鑫发电
        });
        //------------------------盒子3工业废气模块地图结束-------------------------
    }, function(error){
        console.log('发送失败');
    });
    //-------------------------airPollutionGetPromise结束--------------------------
};