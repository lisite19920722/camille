export default ($scope, $rootScope, qService, populationRes) => {
	'ngInject';
    (function() {
       document.body.scrollIntoView();
    })();
    $scope.data = null;
    var popData;
    var promise = qService.httpGetWithToken(populationRes.getSumPopulationData, {}, {});
    promise.then(function(rc) {       
        popData = rc.data; 
        var map = new AMap.Map('conMap');
        map.setZoom(12);
        map.setCenter([121.10, 31.45]);
        AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function() {
            var toolBar = new AMap.ToolBar();
            var scale = new AMap.Scale();
            map.addControl(toolBar);
            map.addControl(scale);
        });
        $scope.townsname = ["浮桥镇", "浏河镇", "娄东街道", "城厢镇", "沙溪镇", "双凤镇", "璜泾镇", "科教新城", "新区", "港区"];
        $scope.birthrate = ["6.12‰", "6.3‰", "6.34‰", "9.5‰", "6.53‰", "7.62‰", "5.91‰", "13.28‰", "6.84‰", "5.56‰"];
        $scope.deathrate = ["10.78‰", "9.09‰", "8.22‰", "5.59‰", "4.76‰", "9.07‰", "9.98‰", "7.33‰", "8.68‰", "7.44‰"];
        $scope.populationrate = ["-4.66‰", "-2.79‰", "-1.88‰", "3.91‰", "1.77‰", "-1.45‰", "-4.07‰", "5.95‰", "-1.84‰", "-1.88‰"];
        var marker1 = new AMap.Marker({
            position: [121.20748, 31.622211], //浮桥镇  121.20748,31.622211
            map: map,
            icon: new AMap.Icon({
                size: new AMap.Size(40, 50), //图标大小
                image: "/assets/images/environment/marker_sprite.png",
            })
        });
        marker1.setMap(map);
        // 设置鼠标划过点标记显示的文字提示
        marker1.setTitle('');
        var infow = [];
        infow.push("<div style='background-color:#FFFFFF;border:2px solid #CC0033;border-radius:10px;padding:10px 10px;position:absolute;top:-10px;left:-5px;white-space:nowrap;color:#CC0033;font-size:18px'>浮桥镇</div>")
            // 设置label标签
        marker1.setLabel({ //label默认蓝框白底左上角显示，样式className为：amap-marker-label
            offset: new AMap.Pixel(20, 20), //修改label相对于maker的位置
            content: infow.join('')
        });
        var marker5 = new AMap.Marker({
            position: [121.070907, 31.556999], //沙溪镇
            map: map,
            icon: new AMap.Icon({
                size: new AMap.Size(40, 50), //图标大小
                image: "/assets/images/environment/marker_sprite.png",
            })
        });
        var infow5 = [];
        infow5.push("<div style='background-color:#FFFFFF;border:2px solid #66cc66;border-radius:10px;padding:10px 10px;position:absolute;top:-10px;left:-5px;white-space:nowrap;color:#66cc66;font-size:18px'>沙溪镇</div>")
            // 设置label标签
        marker5.setLabel({ //label默认蓝框白底左上角显示，样式className为：amap-marker-label
            offset: new AMap.Pixel(20, 20), //修改label相对于maker的位置
            content: infow5.join('')
        });
        var marker4 = new AMap.Marker({ //城厢镇
            position: [121.1124, 31.456376],
            map: map,
            icon: new AMap.Icon({
                size: new AMap.Size(40, 50), //图标大小
                image: "/assets/images/environment/marker_sprite.png",
            })
        });
        var infow4 = [];
        infow4.push("<div style='background-color:#FFFFFF;border:2px solid #66cc66;border-radius:10px;padding:10px 10px;position:absolute;top:-10px;left:-5px;white-space:nowrap;color:#66cc66;font-size:18px'>城厢镇</div>")
            // 设置label标签
        marker4.setLabel({ //label默认蓝框白底左上角显示，样式className为：amap-marker-label
            offset: new AMap.Pixel(20, 20), //修改label相对于maker的位置
            content: infow4.join('')
        });
        var marker2 = new AMap.Marker({
            position: [121.276413, 31.515122], //浏河镇
            map: map,
            icon: new AMap.Icon({
                size: new AMap.Size(40, 50), //图标大小
                image: "/assets/images/environment/marker_sprite.png",
            })
        });
        var infow2 = [];
        infow2.push("<div style='background-color:#FFFFFF;border:2px solid #CC0033;border-radius:10px;padding:10px 10px;position:absolute;top:-10px;left:-5px;white-space:nowrap;color:#CC0033;font-size:18px'>浏河镇</div>")
            // 设置label标签
        marker2.setLabel({ //label默认蓝框白底左上角显示，样式className为：amap-marker-label
            offset: new AMap.Pixel(20, 20), //修改label相对于maker的位置
            content: infow2.join('')
        });
        var marker3 = new AMap.Marker({
            position: [121.10, 31.45], //太仓市
            map: map,
            icon: new AMap.Icon({
                size: new AMap.Size(40, 50), //图标大小
                image: "/assets/images/environment/marker_sprite.png",
            })
        });
        var infow3 = [];
        infow3.push("<div style='background-color:#FFFFFF;border:2px solid #CC0033;border-radius:10px;padding:10px 10px;position:absolute;top:-10px;left:-5px;white-space:nowrap;color:#CC0033;font-size:18px'>娄东街道</div>")
            // 设置label标签
        marker3.setLabel({ //label默认蓝框白底左上角显示，样式className为：amap-marker-label
            offset: new AMap.Pixel(20, 20), //修改label相对于maker的位置
            content: infow3.join('')
        });
        var marker6 = new AMap.Marker({
            position: [121.036167, 31.519103], //双凤镇
            map: map,
            icon: new AMap.Icon({
                size: new AMap.Size(40, 50), //图标大小
                image: "/assets/images/environment/marker_sprite.png",
            })
        });
        var infow6 = [];
        infow6.push("<div style='background-color:#FFFFFF;border:2px solid #CC0033;border-radius:10px;padding:10px 10px;position:absolute;top:-10px;left:-5px;white-space:nowrap;color:#CC0033;font-size:18px'>双凤镇</div>")
            // 设置label标签
        marker6.setLabel({ //label默认蓝框白底左上角显示，样式className为：amap-marker-label
            offset: new AMap.Pixel(20, 20), //修改label相对于maker的位置
            content: infow6.join('')
        });
        var marker7 = new AMap.Marker({
            position: [121.106514, 31.649675], //璜泾镇
            map: map,
            icon: new AMap.Icon({
                size: new AMap.Size(40, 50), //图标大小
                image: "/assets/images/environment/marker_sprite.png",
            })
        });
        var infow7 = [];
        infow7.push("<div style='background-color:#FFFFFF;border:2px solid #CC0033;border-radius:10px;padding:10px 10px;position:absolute;top:-10px;left:-5px;white-space:nowrap;color:#CC0033;font-size:18px'>璜泾镇</div>")
            // 设置label标签
        marker7.setLabel({ //label默认蓝框白底左上角显示，样式className为：amap-marker-label
            offset: new AMap.Pixel(20, 20), //修改label相对于maker的位置
            content: infow7.join('')
        });

        var marker8 = new AMap.Marker({
            position: [121.126845, 31.434877], //科教新城  121.20748,31.622211
            map: map,
            icon: new AMap.Icon({
                size: new AMap.Size(40, 50), //图标大小
                image: "/assets/images/environment/marker_sprite.png",
            })
        });
        marker8.setMap(map);
        // 设置鼠标划过点标记显示的文字提示
        marker8.setTitle('');
        var infow = [];
        infow.push("<div style='background-color:#FFFFFF;border:2px solid #66cc66;border-radius:10px;padding:10px 10px;position:absolute;top:-10px;left:-5px;white-space:nowrap;color:#66cc66;font-size:18px'>科教新城</div>")
            // 设置label标签
        marker8.setLabel({ //label默认蓝框白底左上角显示，样式className为：amap-marker-label
            offset: new AMap.Pixel(20, 20), //修改label相对于maker的位置
            content: infow.join('')
        });

        var marker9 = new AMap.Marker({
            position: [121.132514, 31.479037], //新区  121.20748,31.622211
            map: map,
            icon: new AMap.Icon({
                size: new AMap.Size(40, 50), //图标大小
                image: "/assets/images/environment/marker_sprite.png",
            })
        });
        marker9.setMap(map);
        // 设置鼠标划过点标记显示的文字提示
        marker9.setTitle('');
        var infow = [];
        infow.push("<div style='background-color:#FFFFFF;border:2px solid #CC0033;border-radius:10px;padding:10px 10px;position:absolute;top:-10px;left:-5px;white-space:nowrap;color:#CC0033;font-size:18px'>新区</div>")
            // 设置label标签
        marker9.setLabel({ //label默认蓝框白底左上角显示，样式className为：amap-marker-label
            offset: new AMap.Pixel(20, 20), //修改label相对于maker的位置
            content: infow.join('')
        });

        var marker10 = new AMap.Marker({
            position: [121.212609, 31.600756], //港区  121.20748,31.622211
            map: map,
            icon: new AMap.Icon({
                size: new AMap.Size(40, 50), //图标大小
                image: "/assets/images/environment/marker_sprite.png",
            })
        });
        marker10.setMap(map);
        // 设置鼠标划过点标记显示的文字提示
        marker10.setTitle('');
        var infow = [];
        infow.push("<div style='background-color:#FFFFFF;border:2px solid #CC0033;border-radius:10px;padding:10px 10px;position:absolute;top:-10px;left:-5px;white-space:nowrap;color:#CC0033;font-size:18px'>港区</div>")
            // 设置label标签
        marker10.setLabel({ //label默认蓝框白底左上角显示，样式className为：amap-marker-label
            offset: new AMap.Pixel(20, 20), //修改label相对于maker的位置
            content: infow.join('')
        });
        //显示信息窗体(可单击位置显示隐藏的信息窗体)
        var info1 = [];
        info1.push("<h4><strong>浮桥镇人口自然增长率</strong></h4>"); //121.20748,31.622211
        info1.push("<table class='table table-bordered table-striped'>");
        info1.push("<tr><td style='font-size:15px;text-align:center'>出生率</td><td style='text-align:center'>6.12‰</td></tr>");
        info1.push("<tr><td style='font-size:15px;text-align:center'>死亡率</td><td style='text-align:center'>10.78‰</td></tr>");
        info1.push("<tr><td style='font-size:15px;text-align:center'>人口自然增长率</td><td style='text-align:center'>-4.66‰</td></tr>");
        info1.push("</table>");
        var infowindow1 = new AMap.InfoWindow({
            content: info1.join(''),
            offset: new AMap.Pixel(0, -30),
            size: new AMap.Size(300, 0)
        })
        infowindow1.open(map, marker1.getPosition());
        var clickHandle1 = AMap.event.addListener(marker1, 'click', function() {
            infowindow1.open(map, marker1.getPosition())
        })

        var info2 = [];
        info2.push("<h4><strong>浏河镇人口自然增长率</strong></h4>");
        info2.push("<table class='table table-bordered table-striped'>");
        info2.push("<tr><td style='font-size:15px;width:150px;text-align:center'>出生率</td><td style='text-align:center'>6.3‰</td></tr>");
        info2.push("<tr><td style='font-size:15px;text-align:center'>死亡率</td><td style='text-align:center'>9.09‰</td></tr>");
        info2.push("<tr><td style='font-size:15px;text-align:center'>人口自然增长率</td><td style='text-align:center'>-2.79‰</td></tr>");
        info2.push("</table>");
        var infowindow2 = new AMap.InfoWindow({
            content: info2.join(''),
            offset: new AMap.Pixel(0, -30),
            size: new AMap.Size(300, 0)
        })
        var clickHandle2 = AMap.event.addListener(marker2, 'click', function() {
            infowindow2.open(map, marker2.getPosition())
        })
        var info3 = [];
        info3.push("<h4><strong>娄东街道人口自然增长率</strong></h4>");
        info3.push("<table class='table table-bordered table-striped'>");
        info3.push("<tr><td style='font-size:15px;text-align:center'>出生率</td><td style='text-align:center'>6.34‰</td ></tr>");
        info3.push("<tr><td style='font-size:15px;text-align:center'>死亡率</td><td style='text-align:center'>8.22‰</td ></tr>");
        info3.push("<tr><td style='font-size:15px;text-align:center'>人口自然增长率</td><td style='text-align:center'>-1.88‰</td></tr>");
        info3.push("</table>");
        var infowindow3 = new AMap.InfoWindow({
            content: info3.join(''),
            offset: new AMap.Pixel(0, -30),
            size: new AMap.Size(300, 0)
        })
        // infowindow3.open(map, marker3.getPosition());
        var clickHandle3 = AMap.event.addListener(marker3, 'click', function() {
            infowindow3.open(map, marker3.getPosition())
        })

        var info4 = [];
        info4.push("<h4><strong>城厢镇人口自然增长率</strong></h4>");
        info4.push("<table class='table table-bordered table-striped'>");
        info4.push("<tr><td style='font-size:15px;text-align:center'>出生率</td><td style='text-align:center'>9.5‰</td></tr>");
        info4.push("<tr><td style='font-size:15px;text-align:center'>死亡率</td><td style='text-align:center'>5.59‰</td></tr>");
        info4.push("<tr><td style='font-size:15px;text-align:center'>人口自然增长率</td><td style='text-align:center'>3.91‰</td></tr>");
        info4.push("</table>");
        var infowindow4 = new AMap.InfoWindow({
            content: info4.join(''),
            offset: new AMap.Pixel(0, -30),
            size: new AMap.Size(300, 0)
        })
        var clickHandle4 = AMap.event.addListener(marker4, 'click', function() {
            infowindow4.open(map, marker4.getPosition())
        })

        var info5 = [];
        info5.push("<h4><strong>沙溪镇人口自然增长率</strong></h4>");
        info5.push("<table class='table table-bordered table-striped'>");
        info5.push("<tr><td style='font-size:15px;text-align:center'>出生率</td><td style='text-align:center'>6.53‰</td></tr>");
        info5.push("<tr><td style='font-size:15px;text-align:center'>死亡率</td><td style='text-align:center'>4.76‰</td></tr>");
        info5.push("<tr><td style='font-size:15px;text-align:center'>人口自然增长率</td><td style='text-align:center'>1.77‰</td></tr>");
        info5.push("</table>");
        var infowindow5 = new AMap.InfoWindow({
            content: info5.join(''),
            offset: new AMap.Pixel(0, -30),
            size: new AMap.Size(300, 0)
        })
        var clickHandle5 = AMap.event.addListener(marker5, 'click', function() {
            infowindow5.open(map, marker5.getPosition())
        })
        var info6 = [];
        info6.push("<h4><strong>双凤镇人口自然增长率</strong></h4>");
        info6.push("<table class='table table-bordered table-striped'>");
        info6.push("<tr><td style='font-size:15px;text-align:center'>出生率</td><td style='text-align:center'>7.62‰</td></tr>");
        info6.push("<tr><td style='font-size:15px;text-align:center'>死亡率</td><td style='text-align:center'>9.07‰</td></tr>");
        info6.push("<tr><td style='font-size:15px;text-align:center'>人口自然增长率</td><td style='text-align:center'>-1.45‰</td></tr>");
        info6.push("</table>");
        var infowindow6 = new AMap.InfoWindow({
            content: info6.join(''),
            offset: new AMap.Pixel(0, -30),
            size: new AMap.Size(300, 0)
        })
        var clickHandle6 = AMap.event.addListener(marker6, 'click', function() {
            infowindow6.open(map, marker6.getPosition())
        })
        var info7 = [];
        info7.push("<h4><strong>璜泾镇人口自然增长率</strong></h4>");
        info7.push("<table class='table table-bordered table-striped'>");
        info7.push("<tr><td style='font-size:15px;text-align:center'>出生率</td><td style='text-align:center'>5.91‰</td></tr>");
        info7.push("<tr><td style='font-size:15px;text-align:center'>死亡率</td><td style='text-align:center'>9.98‰</td></tr>");
        info7.push("<tr><td style='font-size:15px;text-align:center'>人口自然增长率</td><td style='text-align:center'>-4.07‰</td></tr>");
        info7.push("</table>");
        var infowindow7 = new AMap.InfoWindow({
            content: info7.join(''),
            offset: new AMap.Pixel(0, -30),
            size: new AMap.Size(300, 0)
        })
        var clickHandle7 = AMap.event.addListener(marker7, 'click', function() {
            infowindow7.open(map, marker7.getPosition())
        })
        var info8 = [];
        info8.push("<h4><strong>科教新城人口自然增长率</strong></h4>");
        info8.push("<table class='table table-bordered table-striped'>");
        info8.push("<tr><td style='font-size:15px;text-align:center'>出生率</td><td style='text-align:center'>13.28‰</td></tr>");
        info8.push("<tr><td style='font-size:15px;text-align:center'>死亡率</td><td style='text-align:center'>7.33‰</td></tr>");
        info8.push("<tr><td style='font-size:15px;text-align:center'>人口自然增长率</td><td style='text-align:center'>5.95‰</td></tr>");
        info8.push("</table>");
        var infowindow8 = new AMap.InfoWindow({
            content: info8.join(''),
            offset: new AMap.Pixel(0, -30),
            size: new AMap.Size(300, 0)
        })
        var clickHandle8 = AMap.event.addListener(marker8, 'click', function() {
            infowindow8.open(map, marker8.getPosition())
        })
        var info9 = [];
        info9.push("<h4><strong>新区人口自然增长率</strong></h4>");
        info9.push("<table class='table table-bordered table-striped'>");
        info9.push("<tr><td style='font-size:15px;text-align:center'>出生率</td><td style='text-align:center'>6.84‰</td></tr>");
        info9.push("<tr><td style='font-size:15px;text-align:center'>死亡率</td><td style='text-align:center'>8.68‰</td></tr>");
        info9.push("<tr><td style='font-size:15px;text-align:center'>人口自然增长率</td><td style='text-align:center'>-1.84‰</td></tr>");
        info9.push("</table>");
        var infowindow9 = new AMap.InfoWindow({
            content: info9.join(''),
            offset: new AMap.Pixel(0, -30),
            size: new AMap.Size(300, 0)
        })
        var clickHandle9 = AMap.event.addListener(marker9, 'click', function() {
            infowindow9.open(map, marker9.getPosition())
        })
        var info10 = [];
        info10.push("<h4><strong>港区人口自然增长率</strong></h4>");
        info10.push("<table class='table table-bordered table-striped'>");
        info10.push("<tr><td style='font-size:15px;text-align:center'>出生率</td><td style='text-align:center'>5.56‰</td></tr>");
        info10.push("<tr><td style='font-size:15px;text-align:center'>死亡率</td><td style='text-align:center'>7.44‰</td></tr>");
        info10.push("<tr><td style='font-size:15px;text-align:center'>人口自然增长率</td><td style='text-align:center'>-1.88‰</td></tr>");
        info10.push("</table>");
        var infowindow10 = new AMap.InfoWindow({
            content: info10.join(''),
            offset: new AMap.Pixel(0, -30),
            size: new AMap.Size(300, 0)
        })
        var clickHandle10 = AMap.event.addListener(marker10, 'click', function() {
                infowindow10.open(map, marker10.getPosition())
            })
            //var heatmap;
        var points = [
            { "lng": 121.10, "lat": 31.45, "count": 30 },
            { "lng": 121.046329, "lat": 31.471813, "count": 90 },
            { "lng": 121.135737, "lat": 31.491485, "count": 12 },
            { "lng": 121.134911, "lat": 31.491627, "count": 100 },
            { "lng": 121.276413, "lat": 31.515122, "count": 50 },
            { "lng": 121.106514, "lat": 31.649675, "count": 15 },
            { "lng": 121.070907, "lat": 31.556999, "count": 16 },
            { "lng": 121.190549, "lat": 31.467665, "count": 16 }
        ];
    });
};