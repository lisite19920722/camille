angular.module('camille').controller('labortwoCtrl', ['$scope', '$stateParams', 'qService', function($scope, $stateParams, qService) {

    //年份选择数据
    $scope.yearSelect = ['2020', '2025', '2030', '2035', '2040', '2045'];
    
    $scope.totaldata = {

        tabledata: [
            { yearvalue: '指标', Fp: '第一产业人口', Sp: '第二产业人口', Tp: '第三产业人口' },
            { yearvalue: '第一产业产值', Fp: '0.9542', Sp: '0.4293', Tp: '0.3116' },
            { yearvalue: '第二产业产值', Fp: '0.4101', Sp: '0.9724', Tp: '0.6647' },
            { yearvalue: '第三产业产值', Fp: '0.7624', Sp: '0.4624', Tp: '0.9588' },
            { yearvalue: '人均GDP', Fp: '0.7484', Sp: '0.7483', Tp: '0.8396' },
            { yearvalue: '地方生产总值', Fp: '0.5469', Sp: '0.7483', Tp: '0.8589' },
            { yearvalue: '消费品零售总额', Fp: '0.3598', Sp: '0.6597', Tp: '0.8531' }

        ]
    };


    require.config({
        paths: {
            echarts: 'http://echarts.baidu.com/build/dist'
        }
    });
    // 使用
    require(
        [
            'echarts',
            'echarts/chart/chord',
            'echarts/chart/force' // 使用柱状图就加载bar模块，按需加载
        ],
        function(ec) {
            // 基于准备好的dom，初始化echarts图表
            var myChart = ec.init(document.getElementById('main'));
            // console.log("加载完成");
            var option = {
                legend: {
                    x: 'center',
                    y: 'bottom',
                    data: ['第一产业人口', '第二产业人口', '第三产业人口', '地方生产总值', '第一产业产值', '第二产业产值', '第三产业产值', '消费品零售总额', '人均GDP', '地方生产总值'],
                },
                title: {
                    text: '太仓市2020年劳动力人口与各项经济指标关联度分析预测',
                    textStyle: {

                        fontWeight: 'bold',
                        fontSize: '10',
                        color: "#000000"
                    },
                    x: 'center',
                    y: '12'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function(params) {
                        if (params.indicator2) { // is edge
                            return params.indicator2 + ' ' + params.name + ' ' + params.indicator;
                        } else { // is node
                            return params.name
                        }
                    }
                },
                toolbox: {
                    show: true,
                    feature: {
                        restore: { show: true },
                        magicType: { show: true, type: ['force', 'chord'] },
                        saveAsImage: { show: true }
                    },
                    x: "right",
                    y: "50",
                },
                series: [{
                    type: 'chord',
                    sort: 'ascending',
                    sortSub: 'descending',
                    showScale: false,
                    itemStyle: {
                        normal: {
                            label: {
                                show: false,
                                rotate: false,
                                textStyle: {
                                    fontSize: 8,
                                    fontStyle: 'bolder',
                                }
                            }
                        }
                    },
                    textStyle: {
                        fontSize: 82,
                        fontWeight: '900'
                    },
                    // 使用 nodes links 表达和弦图
                    nodes: [
                        { name: '总人口' },
                        { name: '人口密度' },
                        { name: '人口出生率' },
                        { name: '人口自然增长率' },
                        { name: '人口死亡率' },
                        { name: '第一产业人口' },
                        { name: '第二产业人口' },
                        { name: '第三产业人口' },
                        { name: '城镇人口' },
                        { name: '乡村人口' },
                        { name: '地方生产总值' },
                        { name: '第一产业产值' },
                        { name: '第二产业产值' },
                        { name: '第三产业产值' },
                        { name: '人均GDP' },
                        { name: '消费品零售总额' }

                    ],
                    links: [
                            { source: '第一产业人口', target: '地方生产总值', weight: 0.5469, name: '0.5469关联' },
                            { source: '第一产业人口', target: '第一产业产值', weight: 0.9542, name: '0.9542关联' },
                            { source: '第一产业人口', target: '第二产业产值', weight: 0.4101, name: '0.4101关联' },
                            { source: '第一产业人口', target: '第三产业产值', weight: 0.7624, name: '0.7624关联' },
                            { source: '第一产业人口', target: '人均GDP', weight: 0.7484, name: '0.7484关联' },
                            { source: '第一产业人口', target: '消费品零售总额', weight: 0.3598, name: '0.3598关联' },
                            { source: '第二产业人口', target: '地方生产总值', weight: 0.7483, name: '0.7483关联' },
                            { source: '第二产业人口', target: '第一产业产值', weight: 0.4293, name: '0.4293关联' },
                            { source: '第二产业人口', target: '第二产业产值', weight: 0.9724, name: '0.9724关联' },
                            { source: '第二产业人口', target: '第三产业产值', weight: 0.4624, name: '0.4624关联' },
                            { source: '第二产业人口', target: '人均GDP', weight: 0.7483, name: '0.7483关联' },
                            { source: '第二产业人口', target: '消费品零售总额', weight: 0.6597, name: '0.6597关联' },
                            { source: '第三产业人口', target: '地方生产总值', weight: 0.8589, name: '0.8589关联' },
                            { source: '第三产业人口', target: '第一产业产值', weight: 0.3116, name: '0.3116关联' },
                            { source: '第三产业人口', target: '第二产业产值', weight: 0.6647, name: '0.6647关联' },
                            { source: '第三产业人口', target: '第三产业产值', weight: 0.9588, name: '0.9588关联' },
                            { source: '第三产业人口', target: '人均GDP', weight: 0.8396, name: '0.8396关联' },
                            { source: '第三产业人口', target: '消费品零售总额', weight: 0.8531, name: '0.8531关联' },

                            // Ribbon Type 的和弦图每一对节点之间必须是双向边
                            { target: '第一产业人口', source: '地方生产总值', weight: 0.5469 },
                            { target: '第一产业人口', source: '第一产业产值', weight: 0.9542 },
                            { target: '第一产业人口', source: '第二产业产值', weight: 0.4101 },
                            { target: '第一产业人口', source: '第三产业产值', weight: 0.7624 },
                            { target: '第一产业人口', source: '人均GDP', weight: 0.7484 },
                            { target: '第一产业人口', source: '消费品零售总额', weight: 0.3598 },
                            { target: '第二产业人口', source: '地方生产总值', weight: 0.7483 },
                            { target: '第二产业人口', source: '第一产业产值', weight: 0.4293 },
                            { target: '第二产业人口', source: '第二产业产值', weight: 0.9724 },
                            { target: '第二产业人口', source: '第三产业产值', weight: 0.4624 },
                            { target: '第二产业人口', source: '人均GDP', weight: 0.7483 },
                            { target: '第二产业人口', source: '消费品零售总额', weight: 0.6597 },
                            { target: '第三产业人口', source: '地方生产总值', weight: 0.8589 },
                            { target: '第三产业人口', source: '第一产业产值', weight: 0.3116 },
                            { target: '第三产业人口', source: '第二产业产值', weight: 0.6647 },
                            { target: '第三产业人口', source: '第三产业产值', weight: 0.9588 },
                            { target: '第三产业人口', source: '人均GDP', weight: 0.8396 },
                            { target: '第三产业人口', source: '消费品零售总额', weight: 0.8531 }
                        ]
                        // Ribbon Type 的和弦图每一对节点之间必须是双向边
                }]
            };
            // 为echarts对象加载数据 
            myChart.setOption(option);
        }
    );
    $scope.toggleData1 = (year) => {
        switch (year) {
            case $scope.yearSelect[0]:
                {
                    console.log('case1');
                    $scope.totaldata = {

                        tabledata: [
                            { yearvalue: '指标', Fp: '第一产业人口', Sp: '第二产业人口', Tp: '第三产业人口' },
                            { yearvalue: '第一产业产值', Fp: '0.9542', Sp: '0.4293', Tp: '0.3116' },
                            { yearvalue: '第二产业产值', Fp: '0.4101', Sp: '0.9724', Tp: '0.6647' },
                            { yearvalue: '第三产业产值', Fp: '0.7624', Sp: '0.4624', Tp: '0.9588' },
                            { yearvalue: '人均GDP', Fp: '0.7484', Sp: '0.7483', Tp: '0.8396' },
                            { yearvalue: '地方生产总值', Fp: '0.5469', Sp: '0.7483', Tp: '0.8589' },
                            { yearvalue: '消费品零售总额', Fp: '0.3598', Sp: '0.6597', Tp: '0.8531' }

                        ]
                    };
                    require(
                        [
                            'echarts',
                            'echarts/chart/chord',
                            'echarts/chart/force' // 使用柱状图就加载bar模块，按需加载
                        ],
                        function(ec) {
                            // 基于准备好的dom，初始化echarts图表
                            var myChart = ec.init(document.getElementById('main'));

                            var option = {
                                legend: {
                                    x: 'center',
                                    y: 'bottom',
                                    data: ['第一产业人口', '第二产业人口', '第三产业人口', '地方生产总值', '第一产业产值', '第二产业产值', '第三产业产值', '消费品零售总额', '人均GDP', '地方生产总值'],
                                },
                                title: {
                                    text: '太仓市2020年劳动力人口与各项经济指标关联度分析预测',
                                    textStyle: {

                                        fontWeight: 'bold',
                                        fontSize: '10',
                                        color: "#000000"
                                    },
                                    x: 'center',
                                    y: '12'
                                },
                                tooltip: {
                                    trigger: 'item',
                                    formatter: function(params) {
                                        if (params.indicator2) { // is edge
                                            return params.indicator2 + ' ' + params.name + ' ' + params.indicator;
                                        } else { // is node
                                            return params.name
                                        }
                                    }
                                },
                                toolbox: {
                                    show: true,
                                    feature: {
                                        restore: { show: true },
                                        magicType: { show: true, type: ['force', 'chord'] },
                                        saveAsImage: { show: true }
                                    },
                                    x: "right",
                                    y: "50",
                                },
                                series: [{
                                    type: 'chord',
                                    sort: 'ascending',
                                    sortSub: 'descending',
                                    showScale: false,
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: false,
                                                rotate: false,
                                                textStyle: {
                                                    fontSize: 8,
                                                    fontStyle: 'bolder',
                                                }
                                            }
                                        }
                                    },
                                    // 使用 nodes links 表达和弦图
                                    nodes: [
                                        { name: '总人口' },
                                        { name: '人口密度' },
                                        { name: '人口出生率' },
                                        { name: '人口自然增长率' },
                                        { name: '人口死亡率' },
                                        { name: '第一产业人口' },
                                        { name: '第二产业人口' },
                                        { name: '第三产业人口' },
                                        { name: '城镇人口' },
                                        { name: '乡村人口' },
                                        { name: '地方生产总值' },
                                        { name: '第一产业产值' },
                                        { name: '第二产业产值' },
                                        { name: '第三产业产值' },
                                        { name: '人均GDP' },
                                        { name: '消费品零售总额' }

                                    ],
                                    links: [
                                        { source: '第一产业人口', target: '地方生产总值', weight: 0.5469, name: '0.5469关联' },
                                        { source: '第一产业人口', target: '第一产业产值', weight: 0.9542, name: '0.9542关联' },
                                        { source: '第一产业人口', target: '第二产业产值', weight: 0.4101, name: '0.4101关联' },
                                        { source: '第一产业人口', target: '第三产业产值', weight: 0.7624, name: '0.7624关联' },
                                        { source: '第一产业人口', target: '人均GDP', weight: 0.7484, name: '0.7484关联' },
                                        { source: '第一产业人口', target: '消费品零售总额', weight: 0.3598, name: '0.3598关联' },
                                        { source: '第二产业人口', target: '地方生产总值', weight: 0.7483, name: '0.7483关联' },
                                        { source: '第二产业人口', target: '第一产业产值', weight: 0.4293, name: '0.4293关联' },
                                        { source: '第二产业人口', target: '第二产业产值', weight: 0.9724, name: '0.9724关联' },
                                        { source: '第二产业人口', target: '第三产业产值', weight: 0.4624, name: '0.4624关联' },
                                        { source: '第二产业人口', target: '人均GDP', weight: 0.7483, name: '0.7483关联' },
                                        { source: '第二产业人口', target: '消费品零售总额', weight: 0.6597, name: '0.6597关联' },
                                        { source: '第三产业人口', target: '地方生产总值', weight: 0.8589, name: '0.8589关联' },
                                        { source: '第三产业人口', target: '第一产业产值', weight: 0.3116, name: '0.3116关联' },
                                        { source: '第三产业人口', target: '第二产业产值', weight: 0.6647, name: '0.6647关联' },
                                        { source: '第三产业人口', target: '第三产业产值', weight: 0.9588, name: '0.9588关联' },
                                        { source: '第三产业人口', target: '人均GDP', weight: 0.8396, name: '0.8396关联' },
                                        { source: '第三产业人口', target: '消费品零售总额', weight: 0.8531, name: '0.8531关联' },

                                        // Ribbon Type 的和弦图每一对节点之间必须是双向边
                                        { target: '第一产业人口', source: '地方生产总值', weight: 0.5469 },
                                        { target: '第一产业人口', source: '第一产业产值', weight: 0.9542 },
                                        { target: '第一产业人口', source: '第二产业产值', weight: 0.4101 },
                                        { target: '第一产业人口', source: '第三产业产值', weight: 0.7624 },
                                        { target: '第一产业人口', source: '人均GDP', weight: 0.7484 },
                                        { target: '第一产业人口', source: '消费品零售总额', weight: 0.3598 },
                                        { target: '第二产业人口', source: '地方生产总值', weight: 0.7483 },
                                        { target: '第二产业人口', source: '第一产业产值', weight: 0.4293 },
                                        { target: '第二产业人口', source: '第二产业产值', weight: 0.9724 },
                                        { target: '第二产业人口', source: '第三产业产值', weight: 0.4624 },
                                        { target: '第二产业人口', source: '人均GDP', weight: 0.7483 },
                                        { target: '第二产业人口', source: '消费品零售总额', weight: 0.6597 },
                                        { target: '第三产业人口', source: '地方生产总值', weight: 0.8589 },
                                        { target: '第三产业人口', source: '第一产业产值', weight: 0.3116 },
                                        { target: '第三产业人口', source: '第二产业产值', weight: 0.6647 },
                                        { target: '第三产业人口', source: '第三产业产值', weight: 0.9588 },
                                        { target: '第三产业人口', source: '人均GDP', weight: 0.8396 },
                                        { target: '第三产业人口', source: '消费品零售总额', weight: 0.8531 }
                                    ]
                                }]
                            };
                            // 为echarts对象加载数据
                            myChart.setOption(option);
                        }
                    );
                    console.log('执行到第一个了');


                    break;
                }
            case $scope.yearSelect[1]:
                {
                    $scope.totaldata = {

                        tabledata: [
                            { yearvalue: '指标', Fp: '第一产业人口', Sp: '第二产业人口', Tp: '第三产业人口' },
                            { yearvalue: '第一产业产值', Fp: '0.9569', Sp: '0.3145', Tp: '0.2185' },
                            { yearvalue: '第二产业产值', Fp: '0.2185', Sp: '0.9582', Tp: '0.4156' },
                            { yearvalue: '第三产业产值', Fp: '0.2456', Sp: '0.5214', Tp: '0.9102' },
                            { yearvalue: '人均GDP', Fp: '0.9245', Sp: '0.8241', Tp: '0.8851' },
                            { yearvalue: '地方生产总值', Fp: '0.6125', Sp: '0.8521', Tp: '0.7589' },
                            { yearvalue: '消费品零售总额', Fp: '0.6125', Sp: '0.7797', Tp: '0.8531' }

                        ]
                    };
                    require(
                        [
                            'echarts',
                            'echarts/chart/chord',
                            'echarts/chart/force' // 使用柱状图就加载bar模块，按需加载
                        ],
                        function(ec) {
                            // 基于准备好的dom，初始化echarts图表
                            var myChart = ec.init(document.getElementById('main'));

                            var option = {
                                legend: {
                                    x: 'center',
                                    y: 'bottom',
                                    data: ['第一产业人口', '第二产业人口', '第三产业人口', '地方生产总值', '第一产业产值', '第二产业产值', '第三产业产值', '消费品零售总额', '人均GDP', '地方生产总值'],
                                },
                                title: {
                                    text: '太仓市2025年劳动力人口与各项经济指标关联度分析预测',
                                    textStyle: {

                                        fontWeight: 'bold',
                                        fontSize: '10',
                                        color: "#000000"
                                    },
                                    x: 'center',
                                    y: '12'
                                },
                                tooltip: {
                                    trigger: 'item',
                                    formatter: function(params) {
                                        if (params.indicator2) { // is edge
                                            return params.indicator2 + ' ' + params.name + ' ' + params.indicator;
                                        } else { // is node
                                            return params.name
                                        }
                                    }
                                },
                                toolbox: {
                                    show: true,
                                    feature: {
                                        restore: { show: true },
                                        magicType: { show: true, type: ['force', 'chord'] },
                                        saveAsImage: { show: true }
                                    },
                                    x: "right",
                                    y: "50",
                                },

                                series: [{
                                    type: 'chord',
                                    sort: 'ascending',
                                    sortSub: 'descending',
                                    showScale: false,
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: false,
                                                rotate: false,
                                                textStyle: {
                                                    fontSize: 8,
                                                    fontStyle: 'bolder',
                                                }
                                            }
                                        }
                                    },
                                    // 使用 nodes links 表达和弦图
                                    nodes: [
                                        { name: '总人口' },
                                        { name: '人口密度' },
                                        { name: '人口出生率' },
                                        { name: '人口自然增长率' },
                                        { name: '人口死亡率' },
                                        { name: '第一产业人口' },
                                        { name: '第二产业人口' },
                                        { name: '第三产业人口' },
                                        { name: '城镇人口' },
                                        { name: '乡村人口' },
                                        { name: '地方生产总值' },
                                        { name: '第一产业产值' },
                                        { name: '第二产业产值' },
                                        { name: '第三产业产值' },
                                        { name: '人均GDP' },
                                        { name: '消费品零售总额' }

                                    ],
                                    links: [
                                        { source: '第一产业人口', target: '地方生产总值', weight: 0.8469, name: '0.8469关联' },
                                        { source: '第一产业人口', target: '第一产业产值', weight: 0.9569, name: '0.9569关联' },
                                        { source: '第一产业人口', target: '第二产业产值', weight: 0.3145, name: '0.3145关联' },
                                        { source: '第一产业人口', target: '第三产业产值', weight: 0.2185, name: '0.2185关联' },
                                        { source: '第一产业人口', target: '人均GDP', weight: 0.9245, name: '0.9245关联' },
                                        { source: '第一产业人口', target: '消费品零售总额', weight: 0.6125, name: '0.6125关联' },
                                        { source: '第二产业人口', target: '地方生产总值', weight: 0.8521, name: '0.8521关联' },
                                        { source: '第二产业人口', target: '第一产业产值', weight: 0.2185, name: '0.2185关联' },
                                        { source: '第二产业人口', target: '第二产业产值', weight: 0.9582, name: '0.9582关联' },
                                        { source: '第二产业人口', target: '第三产业产值', weight: 0.4156, name: '0.4156关联' },
                                        { source: '第二产业人口', target: '人均GDP', weight: 0.8241, name: '0.8241关联' },
                                        { source: '第二产业人口', target: '消费品零售总额', weight: 0.7797, name: '0.7797关联' },
                                        { source: '第三产业人口', target: '地方生产总值', weight: 0.7589, name: '0.7589关联' },
                                        { source: '第三产业人口', target: '第一产业产值', weight: 0.2456, name: '0.2456关联' },
                                        { source: '第三产业人口', target: '第二产业产值', weight: 0.5214, name: '0.5214关联' },
                                        { source: '第三产业人口', target: '第三产业产值', weight: 0.9102, name: '0.9102关联' },
                                        { source: '第三产业人口', target: '人均GDP', weight: 0.8851, name: '0.8851关联' },
                                        { source: '第三产业人口', target: '消费品零售总额', weight: 0.8531, name: '0.8531关联' },

                                        // Ribbon Type 的和弦图每一对节点之间必须是双向边
                                        { target: '第一产业人口', source: '地方生产总值', weight: 0.8469 },
                                        { target: '第一产业人口', source: '第一产业产值', weight: 0.9569 },
                                        { target: '第一产业人口', source: '第二产业产值', weight: 0.3145 },
                                        { target: '第一产业人口', source: '第三产业产值', weight: 0.2185 },
                                        { target: '第一产业人口', source: '人均GDP', weight: 0.9245 },
                                        { target: '第一产业人口', source: '消费品零售总额', weight: 0.6125 },
                                        { target: '第二产业人口', source: '地方生产总值', weight: 0.8521 },
                                        { target: '第二产业人口', source: '第一产业产值', weight: 0.2185 },
                                        { target: '第二产业人口', source: '第二产业产值', weight: 0.9582 },
                                        { target: '第二产业人口', source: '第三产业产值', weight: 0.4156 },
                                        { target: '第二产业人口', source: '人均GDP', weight: 0.8241 },
                                        { target: '第二产业人口', source: '消费品零售总额', weight: 0.7797 },
                                        { target: '第三产业人口', source: '地方生产总值', weight: 0.7589 },
                                        { target: '第三产业人口', source: '第一产业产值', weight: 0.2456 },
                                        { target: '第三产业人口', source: '第二产业产值', weight: 0.5214 },
                                        { target: '第三产业人口', source: '第三产业产值', weight: 0.9102 },
                                        { target: '第三产业人口', source: '人均GDP', weight: 0.8851 },
                                        { target: '第三产业人口', source: '消费品零售总额', weight: 0.8531 }
                                    ]
                                }]
                            };


                            // 为echarts对象加载数据
                            myChart.setOption(option);
                        }
                    );
                }
                break;
            case $scope.yearSelect[2]:
                {
                    $scope.totaldata = {

                        tabledata: [
                            { yearvalue: '指标', Fp: '第一产业人口', Sp: '第二产业人口', Tp: '第三产业人口' },
                            { yearvalue: '第一产业产值', Fp: '0.9021', Sp: '0.3698', Tp: '0.2541' },
                            { yearvalue: '第二产业产值', Fp: '0.3561', Sp: '0.9521', Tp: '0.6214' },
                            { yearvalue: '第三产业产值', Fp: '0.2256', Sp: '0.6245', Tp: '0.9561' },
                            { yearvalue: '人均GDP', Fp: '0.6214', Sp: '0.7183', Tp: '0.8196' },
                            { yearvalue: '地方生产总值', Fp: '0.8269', Sp: '0.7349', Tp: '0.7189' },
                            { yearvalue: '消费品零售总额', Fp: '0.8898', Sp: '0.8097', Tp: '0.7631' }

                        ]
                    };
                    require(
                        [
                            'echarts',
                            'echarts/chart/chord',
                            'echarts/chart/force' // 使用柱状图就加载bar模块，按需加载
                        ],
                        function(ec) {
                            // 基于准备好的dom，初始化echarts图表
                            var myChart = ec.init(document.getElementById('main'));

                            var option = {
                                legend: {
                                    x: 'center',
                                    y: 'bottom',
                                    data: ['第一产业人口', '第二产业人口', '第三产业人口', '地方生产总值', '第一产业产值', '第二产业产值', '第三产业产值', '消费品零售总额', '人均GDP', '地方生产总值'],
                                },
                                title: {
                                    text: '太仓市2030年劳动力人口与各项经济指标关联度分析预测',
                                    textStyle: {

                                        fontWeight: 'bold',
                                        fontSize: '10',
                                        color: "#000000"
                                    },
                                    x: 'center',
                                    y: '12'
                                },
                                tooltip: {
                                    trigger: 'item',
                                    formatter: function(params) {
                                        if (params.indicator2) { // is edge
                                            return params.indicator2 + ' ' + params.name + ' ' + params.indicator;
                                        } else { // is node
                                            return params.name
                                        }
                                    }
                                },
                                toolbox: {
                                    show: true,
                                    feature: {
                                        restore: { show: true },
                                        magicType: { show: true, type: ['force', 'chord'] },
                                        saveAsImage: { show: true }
                                    },
                                    x: "right",
                                    y: "50",
                                },

                                series: [{
                                    type: 'chord',
                                    sort: 'ascending',
                                    sortSub: 'descending',
                                    showScale: false,
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: false,
                                                rotate: false,
                                                textStyle: {
                                                    fontSize: 8,
                                                    fontStyle: 'bolder',
                                                }
                                            }
                                        }
                                    },
                                    // 使用 nodes links 表达和弦图
                                    nodes: [
                                        { name: '总人口' },
                                        { name: '人口密度' },
                                        { name: '人口出生率' },
                                        { name: '人口自然增长率' },
                                        { name: '人口死亡率' },
                                        { name: '第一产业人口' },
                                        { name: '第二产业人口' },
                                        { name: '第三产业人口' },
                                        { name: '城镇人口' },
                                        { name: '乡村人口' },
                                        { name: '地方生产总值' },
                                        { name: '第一产业产值' },
                                        { name: '第二产业产值' },
                                        { name: '第三产业产值' },
                                        { name: '人均GDP' },
                                        { name: '消费品零售总额' }

                                    ],
                                    links: [
                                        { source: '第一产业人口', target: '地方生产总值', weight: 0.8269, name: '0.8269关联' },
                                        { source: '第一产业人口', target: '第一产业产值', weight: 0.9021, name: '0.9021关联' },
                                        { source: '第一产业人口', target: '第二产业产值', weight: 0.3698, name: '0.3698关联' },
                                        { source: '第一产业人口', target: '第三产业产值', weight: 0.2541, name: '0.2541关联' },
                                        { source: '第一产业人口', target: '人均GDP', weight: 0.6214, name: '0.6214关联' },
                                        { source: '第一产业人口', target: '消费品零售总额', weight: 0.8898, name: '0.8898关联' },
                                        { source: '第二产业人口', target: '地方生产总值', weight: 0.7349, name: '0.7349关联' },
                                        { source: '第二产业人口', target: '第一产业产值', weight: 0.3561, name: '0.3561关联' },
                                        { source: '第二产业人口', target: '第二产业产值', weight: 0.9521, name: '0.9521关联' },
                                        { source: '第二产业人口', target: '第三产业产值', weight: 0.6214, name: '0.6214关联' },
                                        { source: '第二产业人口', target: '人均GDP', weight: 0.7183, name: '0.7183关联' },
                                        { source: '第二产业人口', target: '消费品零售总额', weight: 0.8097, name: '0.8097关联' },
                                        { source: '第三产业人口', target: '地方生产总值', weight: 0.7189, name: '0.7189关联' },
                                        { source: '第三产业人口', target: '第一产业产值', weight: 0.2256, name: '0.2256关联' },
                                        { source: '第三产业人口', target: '第二产业产值', weight: 0.6245, name: '0.6245关联' },
                                        { source: '第三产业人口', target: '第三产业产值', weight: 0.9561, name: '0.9561关联' },
                                        { source: '第三产业人口', target: '人均GDP', weight: 0.8196, name: '0.8196关联' },
                                        { source: '第三产业人口', target: '消费品零售总额', weight: 0.7631, name: '0.7631关联' },

                                        // Ribbon Type 的和弦图每一对节点之间必须是双向边
                                        { target: '第一产业人口', source: '地方生产总值', weight: 0.8269 },
                                        { target: '第一产业人口', source: '第一产业产值', weight: 0.9021 },
                                        { target: '第一产业人口', source: '第二产业产值', weight: 0.3698 },
                                        { target: '第一产业人口', source: '第三产业产值', weight: 0.2541 },
                                        { target: '第一产业人口', source: '人均GDP', weight: 0.6214 },
                                        { target: '第一产业人口', source: '消费品零售总额', weight: 0.8898 },
                                        { target: '第二产业人口', source: '地方生产总值', weight: 0.7349 },
                                        { target: '第二产业人口', source: '第一产业产值', weight: 0.3561 },
                                        { target: '第二产业人口', source: '第二产业产值', weight: 0.9521 },
                                        { target: '第二产业人口', source: '第三产业产值', weight: 0.6214 },
                                        { target: '第二产业人口', source: '人均GDP', weight: 0.7183 },
                                        { target: '第二产业人口', source: '消费品零售总额', weight: 0.8097 },
                                        { target: '第三产业人口', source: '地方生产总值', weight: 0.7189 },
                                        { target: '第三产业人口', source: '第一产业产值', weight: 0.2256 },
                                        { target: '第三产业人口', source: '第二产业产值', weight: 0.6245 },
                                        { target: '第三产业人口', source: '第三产业产值', weight: 0.9561 },
                                        { target: '第三产业人口', source: '人均GDP', weight: 0.8196 },
                                        { target: '第三产业人口', source: '消费品零售总额', weight: 0.7631 }
                                    ]
                                }]
                            };


                            // 为echarts对象加载数据
                            myChart.setOption(option);
                        }
                    );
                }
                break;
            case $scope.yearSelect[3]:
                {
                    $scope.totaldata = {

                        tabledata: [
                            { yearvalue: '指标', Fp: '第一产业人口', Sp: '第二产业人口', Tp: '第三产业人口' },
                            { yearvalue: '第一产业产值', Fp: '0.9180', Sp: '0.2173', Tp: '0.7234' },
                            { yearvalue: '第二产业产值', Fp: '0.2145', Sp: '0.9214', Tp: '0.5624' },
                            { yearvalue: '第三产业产值', Fp: '0.2154', Sp: '0.6214', Tp: '0.9012' },
                            { yearvalue: '人均GDP', Fp: '0.7378', Sp: '0.7425', Tp: '0.7457' },
                            { yearvalue: '地方生产总值', Fp: '0.7610', Sp: '0.7631', Tp: '0.7631' },
                            { yearvalue: '消费品零售总额', Fp: '0.7517', Sp: '0.7554', Tp: '0.7577' }

                        ]
                    };
                    require(
                        [
                            'echarts',
                            'echarts/chart/chord',
                            'echarts/chart/force' // 使用柱状图就加载bar模块，按需加载
                        ],
                        function(ec) {
                            // 基于准备好的dom，初始化echarts图表
                            var myChart = ec.init(document.getElementById('main'));

                            var option = {
                                legend: {
                                    x: 'center',
                                    y: 'bottom',
                                    data: ['第一产业人口', '第二产业人口', '第三产业人口', '地方生产总值', '第一产业产值', '第二产业产值', '第三产业产值', '消费品零售总额', '人均GDP', '地方生产总值'],
                                },
                                title: {
                                    text: '太仓市2035年劳动力人口与各项经济指标关联度分析预测',
                                    textStyle: {

                                        fontWeight: 'bold',
                                        fontSize: '10',
                                        color: "#000000"
                                    },
                                    x: 'center',
                                    y: '12'
                                },
                                tooltip: {
                                    trigger: 'item',
                                    formatter: function(params) {
                                        if (params.indicator2) { // is edge
                                            return params.indicator2 + ' ' + params.name + ' ' + params.indicator;
                                        } else { // is node
                                            return params.name
                                        }
                                    }
                                },
                                toolbox: {
                                    show: true,
                                    feature: {
                                        restore: { show: true },
                                        magicType: { show: true, type: ['force', 'chord'] },
                                        saveAsImage: { show: true }
                                    },
                                    x: "right",
                                    y: "50",
                                },

                                series: [{
                                    type: 'chord',
                                    sort: 'ascending',
                                    sortSub: 'descending',
                                    showScale: false,
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: false,
                                                rotate: false,
                                                textStyle: {
                                                    fontSize: 8,
                                                    fontStyle: 'bolder',
                                                }
                                            }
                                        }
                                    },
                                    // 使用 nodes links 表达和弦图
                                    nodes: [
                                        { name: '总人口' },
                                        { name: '人口密度' },
                                        { name: '人口出生率' },
                                        { name: '人口自然增长率' },
                                        { name: '人口死亡率' },
                                        { name: '第一产业人口' },
                                        { name: '第二产业人口' },
                                        { name: '第三产业人口' },
                                        { name: '城镇人口' },
                                        { name: '乡村人口' },
                                        { name: '地方生产总值' },
                                        { name: '第一产业产值' },
                                        { name: '第二产业产值' },
                                        { name: '第三产业产值' },
                                        { name: '人均GDP' },
                                        { name: '消费品零售总额' }

                                    ],
                                    links: [
                                        { source: '第一产业人口', target: '地方生产总值', weight: 0.7546, name: '0.7546关联' },
                                        { source: '第一产业人口', target: '第一产业产值', weight: 0.9180, name: '0.9180关联' },
                                        { source: '第一产业人口', target: '第二产业产值', weight: 0.2173, name: '0.2173关联' },
                                        { source: '第一产业人口', target: '第三产业产值', weight: 0.7234, name: '0.7234关联' },
                                        { source: '第一产业人口', target: '人均GDP', weight: 0.7378, name: '0.7378关联' },
                                        { source: '第一产业人口', target: '消费品零售总额', weight: 0.7517, name: '0.7517关联' },
                                        { source: '第二产业人口', target: '地方生产总值', weight: 0.7610, name: '0.7610关联' },
                                        { source: '第二产业人口', target: '第一产业产值', weight: 0.2145, name: '0.2145关联' },
                                        { source: '第二产业人口', target: '第二产业产值', weight: 0.9214, name: '0.9214关联' },
                                        { source: '第二产业人口', target: '第三产业产值', weight: 0.5624, name: '0.5624关联' },
                                        { source: '第二产业人口', target: '人均GDP', weight: 0.7425, name: '0.7425关联' },
                                        { source: '第二产业人口', target: '消费品零售总额', weight: 0.7554, name: '0.7554关联' },
                                        { source: '第三产业人口', target: '地方生产总值', weight: 0.7631, name: '0.7631关联' },
                                        { source: '第三产业人口', target: '第一产业产值', weight: 0.2154, name: '0.2154关联' },
                                        { source: '第三产业人口', target: '第二产业产值', weight: 0.6214, name: '0.6214关联' },
                                        { source: '第三产业人口', target: '第三产业产值', weight: 0.9012, name: '0.9012关联' },
                                        { source: '第三产业人口', target: '人均GDP', weight: 0.7457, name: '0.7457关联' },
                                        { source: '第三产业人口', target: '消费品零售总额', weight: 0.7577, name: '0.7577关联' },

                                        // Ribbon Type 的和弦图每一对节点之间必须是双向边
                                        { target: '第一产业人口', source: '地方生产总值', weight: 0.7546 },
                                        { target: '第一产业人口', source: '第一产业产值', weight: 0.9180 },
                                        { target: '第一产业人口', source: '第二产业产值', weight: 0.2173 },
                                        { target: '第一产业人口', source: '第三产业产值', weight: 0.7234 },
                                        { target: '第一产业人口', source: '人均GDP', weight: 0.7378 },
                                        { target: '第一产业人口', source: '消费品零售总额', weight: 0.7517 },
                                        { target: '第二产业人口', source: '地方生产总值', weight: 0.7610 },
                                        { target: '第二产业人口', source: '第一产业产值', weight: 0.2154 },
                                        { target: '第二产业人口', source: '第二产业产值', weight: 0.9214 },
                                        { target: '第二产业人口', source: '第三产业产值', weight: 0.5624 },
                                        { target: '第二产业人口', source: '人均GDP', weight: 0.7425 },
                                        { target: '第二产业人口', source: '消费品零售总额', weight: 0.7554 },
                                        { target: '第三产业人口', source: '地方生产总值', weight: 0.7631 },
                                        { target: '第三产业人口', source: '第一产业产值', weight: 0.2154 },
                                        { target: '第三产业人口', source: '第二产业产值', weight: 0.6214 },
                                        { target: '第三产业人口', source: '第三产业产值', weight: 0.9012 },
                                        { target: '第三产业人口', source: '人均GDP', weight: 0.7457 },
                                        { target: '第三产业人口', source: '消费品零售总额', weight: 0.7577 }
                                    ]
                                }]
                            };


                            // 为echarts对象加载数据
                            myChart.setOption(option);
                        }
                    );
                }
                break;
            case $scope.yearSelect[4]:
                {
                    $scope.totaldata = {

                        tabledata: [
                            { yearvalue: '指标', Fp: '第一产业人口', Sp: '第二产业人口', Tp: '第三产业人口' },
                            { yearvalue: '第一产业产值', Fp: '0.9245', Sp: '0.2154', Tp: '0.3116' },
                            { yearvalue: '第二产业产值', Fp: '0.2425', Sp: '0.9524', Tp: '0.3547' },
                            { yearvalue: '第三产业产值', Fp: '0.2124', Sp: '0.3824', Tp: '0.9488' },
                            { yearvalue: '人均GDP', Fp: '0.7184', Sp: '0.7583', Tp: '0.8196' },
                            { yearvalue: '地方生产总值', Fp: '0.8569', Sp: '0.7249', Tp: '0.8589' },
                            { yearvalue: '消费品零售总额', Fp: '0.7498', Sp: '0.7997', Tp: '0.7631' }

                        ]

                    };
                    require(
                        [
                            'echarts',
                            'echarts/chart/chord',
                            'echarts/chart/force' // 使用柱状图就加载bar模块，按需加载
                        ],
                        function(ec) {
                            // 基于准备好的dom，初始化echarts图表
                            var myChart = ec.init(document.getElementById('main'));

                            var option = {
                                legend: {
                                    x: 'center',
                                    y: 'bottom',
                                    data: ['第一产业人口', '第二产业人口', '第三产业人口', '地方生产总值', '第一产业产值', '第二产业产值', '第三产业产值', '消费品零售总额', '人均GDP', '地方生产总值'],
                                },
                                title: {
                                    text: '太仓市2040年劳动力人口与各项经济指标关联度分析预测',
                                    textStyle: {

                                        fontWeight: 'bold',
                                        fontSize: '10',
                                        color: "#000000"
                                    },
                                    x: 'center',
                                    y: '12'
                                },
                                tooltip: {
                                    trigger: 'item',
                                    formatter: function(params) {
                                        if (params.indicator2) { // is edge
                                            return params.indicator2 + ' ' + params.name + ' ' + params.indicator;
                                        } else { // is node
                                            return params.name
                                        }
                                    }
                                },
                                toolbox: {
                                    show: true,
                                    feature: {
                                        restore: { show: true },
                                        magicType: { show: true, type: ['force', 'chord'] },
                                        saveAsImage: { show: true }
                                    },
                                    x: "right",
                                    y: "50",
                                },

                                series: [{
                                    type: 'chord',
                                    sort: 'ascending',
                                    sortSub: 'descending',
                                    showScale: false,
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: false,
                                                rotate: false,
                                                textStyle: {
                                                    fontSize: 8,
                                                    fontStyle: 'bolder',
                                                }
                                            }
                                        }
                                    },
                                    // 使用 nodes links 表达和弦图
                                    nodes: [
                                        { name: '总人口' },
                                        { name: '人口密度' },
                                        { name: '人口出生率' },
                                        { name: '人口自然增长率' },
                                        { name: '人口死亡率' },
                                        { name: '第一产业人口' },
                                        { name: '第二产业人口' },
                                        { name: '第三产业人口' },
                                        { name: '城镇人口' },
                                        { name: '乡村人口' },
                                        { name: '地方生产总值' },
                                        { name: '第一产业产值' },
                                        { name: '第二产业产值' },
                                        { name: '第三产业产值' },
                                        { name: '人均GDP' },
                                        { name: '消费品零售总额' }

                                    ],
                                    links: [
                                        { source: '第一产业人口', target: '地方生产总值', weight: 0.6125, name: '0.6125关联' },
                                        { source: '第一产业人口', target: '第一产业产值', weight: 0.9245, name: '0.9245关联' },
                                        { source: '第一产业人口', target: '第二产业产值', weight: 0.2154, name: '0.2154关联' },
                                        { source: '第一产业人口', target: '第三产业产值', weight: 0.3116, name: '0.3116关联' },
                                        { source: '第一产业人口', target: '人均GDP', weight: 0.9245, name: '0.9245关联' },
                                        { source: '第一产业人口', target: '消费品零售总额', weight: 0.6125, name: '0.6125关联' },
                                        { source: '第二产业人口', target: '地方生产总值', weight: 0.8521, name: '0.8521关联' },
                                        { source: '第二产业人口', target: '第一产业产值', weight: 0.2425, name: '0.2425关联' },
                                        { source: '第二产业人口', target: '第二产业产值', weight: 0.9524, name: '0.9524关联' },
                                        { source: '第二产业人口', target: '第三产业产值', weight: 0.3547, name: '0.3547关联' },
                                        { source: '第二产业人口', target: '人均GDP', weight: 0.8241, name: '0.8241关联' },
                                        { source: '第二产业人口', target: '消费品零售总额', weight: 0.7797, name: '0.7997关联' },
                                        { source: '第三产业人口', target: '地方生产总值', weight: 0.7598, name: '0.7598关联' },
                                        { source: '第三产业人口', target: '第一产业产值', weight: 0.2124, name: '0.2124关联' },
                                        { source: '第三产业人口', target: '第二产业产值', weight: 0.3824, name: '0.3824关联' },
                                        { source: '第三产业人口', target: '第三产业产值', weight: 0.9488, name: '0.9488关联' },
                                        { source: '第三产业人口', target: '人均GDP', weight: 0.8851, name: '0.8851关联' },
                                        { source: '第三产业人口', target: '消费品零售总额', weight: 0.8531, name: '0.8531关联' },

                                        // Ribbon Type 的和弦图每一对节点之间必须是双向边
                                        { target: '第一产业人口', source: '地方生产总值', weight: 0.6125 },
                                        { target: '第一产业人口', source: '第一产业产值', weight: 0.9569 },
                                        { target: '第一产业人口', source: '第二产业产值', weight: 0.2185 },
                                        { target: '第一产业人口', source: '第三产业产值', weight: 0.2456 },
                                        { target: '第一产业人口', source: '人均GDP', weight: 0.9245 },
                                        { target: '第一产业人口', source: '消费品零售总额', weight: 0.6125 },
                                        { target: '第二产业人口', source: '地方生产总值', weight: 0.8521 },
                                        { target: '第二产业人口', source: '第一产业产值', weight: 0.3145 },
                                        { target: '第二产业人口', source: '第二产业产值', weight: 0.9582 },
                                        { target: '第二产业人口', source: '第三产业产值', weight: 0.5214 },
                                        { target: '第二产业人口', source: '人均GDP', weight: 0.8241 },
                                        { target: '第二产业人口', source: '消费品零售总额', weight: 0.7797 },
                                        { target: '第三产业人口', source: '地方生产总值', weight: 0.7598 },
                                        { target: '第三产业人口', source: '第一产业产值', weight: 0.2185 },
                                        { target: '第三产业人口', source: '第二产业产值', weight: 0.4156 },
                                        { target: '第三产业人口', source: '第三产业产值', weight: 0.9102 },
                                        { target: '第三产业人口', source: '人均GDP', weight: 0.8851 },
                                        { target: '第三产业人口', source: '消费品零售总额', weight: 0.8531 }
                                    ]

                                }]
                            };
                            // 为echarts对象加载数据
                            myChart.setOption(option);
                        }
                    );
                }
                break;
            case $scope.yearSelect[5]:
                {
                    $scope.totaldata = {

                        tabledata: [
                            { yearvalue: '指标', Fp: '第一产业人口', Sp: '第二产业人口', Tp: '第三产业人口' },

                            { yearvalue: '第一产业产值', Fp: '0.9395', Sp: '0.4193', Tp: '0.4116' },
                            { yearvalue: '第二产业产值', Fp: '0.4425', Sp: '0.9724', Tp: '0.5947' },
                            { yearvalue: '第三产业产值', Fp: '0.4924', Sp: '0.5824', Tp: '0.9488' },
                            { yearvalue: '人均GDP', Fp: '0.4184', Sp: '0.6583', Tp: '0.7196' },
                            { yearvalue: '地方生产总值', Fp: '0.4569', Sp: '0.6249', Tp: '0.7589' },
                            { yearvalue: '消费品零售总额', Fp: '0.4498', Sp: '0.6997', Tp: '0.7631' }



                        ]
                    };
                    require(
                        [
                            'echarts',
                            'echarts/chart/chord',
                            'echarts/chart/force' // 使用柱状图就加载bar模块，按需加载
                        ],
                        function(ec) {
                            // 基于准备好的dom，初始化echarts图表
                            var myChart = ec.init(document.getElementById('main'));

                            var option = {
                                legend: {
                                    x: 'center',
                                    y: 'bottom',
                                    data: ['第一产业人口', '第二产业人口', '第三产业人口', '地方生产总值', '第一产业产值', '第二产业产值', '第三产业产值', '消费品零售总额', '人均GDP', '地方生产总值'],
                                },
                                title: {
                                    text: '太仓市2045年劳动力人口与各项经济指标关联度分析预测',
                                    textStyle: {

                                        fontWeight: 'bold',
                                        fontSize: '10',
                                        color: "#000000"
                                    },
                                    x: 'center',
                                    y: '12'
                                },
                                tooltip: {
                                    trigger: 'item',
                                    formatter: function(params) {
                                        if (params.indicator2) { // is edge
                                            return params.indicator2 + ' ' + params.name + ' ' + params.indicator;
                                        } else { // is node
                                            return params.name
                                        }
                                    }
                                },
                                toolbox: {
                                    show: true,
                                    feature: {
                                        restore: { show: true },
                                        magicType: { show: true, type: ['force', 'chord'] },
                                        saveAsImage: { show: true }
                                    },
                                    x: "right",
                                    y: "50",
                                },

                                series: [{
                                    type: 'chord',
                                    sort: 'ascending',
                                    sortSub: 'descending',
                                    showScale: false,
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: false,
                                                rotate: false,
                                                textStyle: {
                                                    fontSize: 8,
                                                    fontStyle: 'bolder',
                                                }
                                            }
                                        }
                                    },
                                    // 使用 nodes links 表达和弦图
                                    nodes: [
                                        { name: '总人口' },
                                        { name: '人口密度' },
                                        { name: '人口出生率' },
                                        { name: '人口自然增长率' },
                                        { name: '人口死亡率' },
                                        { name: '第一产业人口' },
                                        { name: '第二产业人口' },
                                        { name: '第三产业人口' },
                                        { name: '城镇人口' },
                                        { name: '乡村人口' },
                                        { name: '地方生产总值' },
                                        { name: '第一产业产值' },
                                        { name: '第二产业产值' },
                                        { name: '第三产业产值' },
                                        { name: '人均GDP' },
                                        { name: '消费品零售总额' }

                                    ],
                                    links: [

                                        { source: '第一产业人口', target: '地方生产总值', weight: 0.4569, name: '0.4569关联' },
                                        { source: '第一产业人口', target: '第一产业产值', weight: 0.9395, name: '0.9395关联' },
                                        { source: '第一产业人口', target: '第二产业产值', weight: 0.4425, name: '0.4425关联' },
                                        { source: '第一产业人口', target: '第三产业产值', weight: 0.4924, name: '0.4924关联' },
                                        { source: '第一产业人口', target: '人均GDP', weight: 0.4184, name: '0.4184关联' },
                                        { source: '第一产业人口', target: '消费品零售总额', weight: 0.4498, name: '0.4498关联' },
                                        { source: '第二产业人口', target: '地方生产总值', weight: 0.6249, name: '0.6249关联' },
                                        { source: '第二产业人口', target: '第一产业产值', weight: 0.4193, name: '0.4193关联' },
                                        { source: '第二产业人口', target: '第二产业产值', weight: 0.9724, name: '0.9724关联' },
                                        { source: '第二产业人口', target: '第三产业产值', weight: 0.5824, name: '0.5824关联' },
                                        { source: '第二产业人口', target: '人均GDP', weight: 0.6583, name: '0.6583关联' },
                                        { source: '第二产业人口', target: '消费品零售总额', weight: 0.6997, name: '0.6997关联' },
                                        { source: '第三产业人口', target: '地方生产总值', weight: 0.7589, name: '0.7589关联' },
                                        { source: '第三产业人口', target: '第一产业产值', weight: 0.4116, name: '0.4116关联' },
                                        { source: '第三产业人口', target: '第二产业产值', weight: 0.5947, name: '0.5947关联' },
                                        { source: '第三产业人口', target: '第三产业产值', weight: 0.9488, name: '0.9488关联' },
                                        { source: '第三产业人口', target: '人均GDP', weight: 0.7196, name: '0.7196关联' },
                                        { source: '第三产业人口', target: '消费品零售总额', weight: 0.7631, name: '0.7631关联' },

                                        // Ribbon Type 的和弦图每一对节点之间必须是双向边
                                        { target: '第一产业人口', source: '地方生产总值', weight: 0.4569 },
                                        { target: '第一产业人口', source: '第一产业产值', weight: 0.9395 },
                                        { target: '第一产业人口', source: '第二产业产值', weight: 0.4425 },
                                        { target: '第一产业人口', source: '第三产业产值', weight: 0.4924 },
                                        { target: '第一产业人口', source: '人均GDP', weight: 0.4184 },
                                        { target: '第一产业人口', source: '消费品零售总额', weight: 0.4498 },
                                        { target: '第二产业人口', source: '地方生产总值', weight: 0.6249 },
                                        { target: '第二产业人口', source: '第一产业产值', weight: 0.4193 },
                                        { target: '第二产业人口', source: '第二产业产值', weight: 0.9724 },
                                        { target: '第二产业人口', source: '第三产业产值', weight: 0.5824 },
                                        { target: '第二产业人口', source: '人均GDP', weight: 0.6583 },
                                        { target: '第二产业人口', source: '消费品零售总额', weight: 0.6997 },
                                        { target: '第三产业人口', source: '地方生产总值', weight: 0.7589 },
                                        { target: '第三产业人口', source: '第一产业产值', weight: 0.4116 },
                                        { target: '第三产业人口', source: '第二产业产值', weight: 0.5947 },
                                        { target: '第三产业人口', source: '第三产业产值', weight: 0.9488 },
                                        { target: '第三产业人口', source: '人均GDP', weight: 0.7196 },
                                        { target: '第三产业人口', source: '消费品零售总额', weight: 0.7631 }


                                    ]
                                }]
                            };


                            // 为echarts对象加载数据
                            myChart.setOption(option);
                        }
                    );
                }
                break;
        };

    };

}])
