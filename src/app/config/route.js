export default ($stateProvider, $urlRouterProvider, $locationProvider) => {
  'ngInject';

  $stateProvider

    //登陆
    .state('portal', {
      url: '/',
      templateUrl: 'app/auth/portal/portal.html',
      controller: 'portalCtrl'
    })
    // 登陆之后的界面
    .state('app', {
      abstract: true,
      url: '/app',
      templateUrl: 'app/app.html',
      controller: 'appCtrl'
    })
    .state('app.in', {
      abstract: true,
      url: '/in',
      templateUrl: 'app/in/in.html', 
      controller: 'inCtrl'
    })
    // 首页
    .state('app.in.home', {
      url: '/home',
      templateUrl: 'app/in/home/home.html',
      controller: 'homeCtrl'
    })
    // 经济
    .state('app.in.gdp', {
      abstract: true,
      url: '/gdp',
      templateUrl: 'app/in/economy/gdp/gdp.html',
      controller: 'gdpCtrl'
    })
    .state('app.in.gdp.one', {
      url: '/one',
      templateUrl: 'app/in/economy/gdp/one/one.html',
      controller: 'gdponeCtrl'
    })
    .state('app.in.kq', {
      abstract: true,
      url: '/kq',
      templateUrl: 'app/in/economy/kq/kq.html',
      controller: 'kqCtrl'
    })
    .state('app.in.kq.one', {
      url: '/one',
      templateUrl: 'app/in/economy/kq/one/one.html',
      controller: 'kqoneCtrl'
    })
    .state('app.in.power', {
      abstract: true,
      url: '/power',
      templateUrl: 'app/in/economy/power/power.html',
      controller: 'powerCtrl'
    })
    .state('app.in.power.one', {
      url: '/one',
      templateUrl: 'app/in/economy/power/one/one.html',
      controller: 'poweroneCtrl'
    })
    .state('app.in.tax', {
      abstract: true,
      url: '/tax',
      templateUrl: 'app/in/economy/tax/tax.html',
      controller: 'taxCtrl'
    })
    .state('app.in.tax.one', {
      url: '/one',
      templateUrl: 'app/in/economy/tax/one/one.html',
      controller: 'taxoneCtrl'
    })
    // 环境
    .state('app.in.air', {
      abstract: true,
      url: '/air',
      templateUrl: 'app/in/environment/air/air.html',
      controller: 'airCtrl'
    })
    .state('app.in.air.one', {
      url: '/one',
      templateUrl: 'app/in/environment/air/one/one.html',
      controller: 'aironeCtrl'
    })
    .state('app.in.air.two', {
      url: '/two',
      templateUrl: 'app/in/environment/air/two/two.html',
      controller: 'airtwoCtrl'
    })
    .state('app.in.air.three', {
      url: '/three',
      templateUrl: 'app/in/environment/air/three/three.html',
      controller: 'airthreeCtrl'
    })
    .state('app.in.air.four', {
      url: '/four',
      templateUrl: 'app/in/environment/air/four/four.html',
      controller: 'airfourCtrl'
    })
    .state('app.in.water', {
      abstract: true,
      url: '/water',
      templateUrl: 'app/in/environment/water/water.html',
      controller: 'waterCtrl'
    })
    .state('app.in.water.one', {
      url: '/one',
      templateUrl: 'app/in/environment/water/one/one.html',
      controller: 'wateroneCtrl'
    })
    .state('app.in.water.two', {
      url: '/two',
      templateUrl: 'app/in/environment/water/two/two.html',
      controller: 'watertwoCtrl'
    })
    .state('app.in.water.three', {
        url: '/three',
        templateUrl: 'app/in/environment/water/three/three.html',
        controller: 'waterthreeCtrl'
    })
    
    // 人口
    .state('app.in.structure', {
      abstract: true,
      url: '/structure',
      templateUrl: 'app/in/population/structure/structure.html',
      controller: 'structureCtrl'
    })
    .state('app.in.structure.one', {
      url: '/one',
      templateUrl: 'app/in/population/structure/one/one.html',
      controller: 'structureoneCtrl'
    })
    .state('app.in.labor', {
      abstract: true,
      url: '/labor',
      templateUrl: 'app/in/population/labor/labor.html',
      controller: 'laborCtrl'
    })
    .state('app.in.labor.one', {
      url: '/one',
      templateUrl: 'app/in/population/labor/one/one.html',
      controller: 'laboroneCtrl'
    })
    .state('app.in.popothers', {
      abstract: true,
      url: '/popothers',
      templateUrl: 'app/in/population/popothers/popothers.html',
      controller: 'popothersCtrl'
    })
    .state('app.in.popothers.one', {
      url: '/one',
      templateUrl: 'app/in/population/popothers/one/one.html',
      controller: 'popothersoneCtrl'
    })
    .state('app.in.popothers.education', {
      url: '/one',
      templateUrl: 'app/in/population/popothers/one/education.html',
      controller:'popotherseducationCtrl'
    })
    .state('app.in.popothers.insurance', {
      url: '/one',
      templateUrl: 'app/in/population/popothers/one/insurance.html',
      
    })

    ;
    

  $urlRouterProvider.otherwise('/');
};
