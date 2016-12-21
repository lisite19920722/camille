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
    // 首页
    .state('app.in', {
      abstract: true,
      url: '/in',
      templateUrl: 'app/in/in.html', 
      controller: 'inCtrl'
    })
    // 经济
    .state('app.in.power', {
      url: '/power',
      templateUrl: 'app/in/power/power.html',
      controller: 'powerCtrl'
    })

    // 环境

    
    // 人口
    
    
    ;
    

  $urlRouterProvider.otherwise('/');
};
