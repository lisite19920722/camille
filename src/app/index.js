/* 
* please keep the code elegant
*/

// config
import config from './config/config';
import httpConfig from './config/http';
import routerConfig from './config/route';
import i18nConfig from './i18n/config';

// service
import qService from './services/q-service';
import AuthTool  from './services/auth-tool';

// resource
import accountRes from './resources/account-res';
import economyGdpRes from './resources/economy-gdpres';
import economyKeqiangRes from './resources/economy-keqiangres';
import economyTaxRes from './resources/economy-taxres';
import economyPowerRes from './resources/power-res';
import environmentRes from './resources/environment-res';
import populationRes from './resources/population-res';
import populationStructureRes from './resources/population-structureres';
import privilegeRes from './resources/privilege-res';

// directive

// filter

// controllers
// 登陆及首页Controller
import appCtrl from './appCtrl';
import portalCtrl from './auth/portal/portalCtrl';
import inCtrl from './in/inCtrl';
import powerCtrl from './in/power/powerCtrl';

// 经济模块Controller


//环境模块Controller


// 人口模块Controller



angular.module('camille',
  ['ngAnimate', 'ngCookies', 'ngSanitize', 'ui.router', 'ngResource', 'ngStorage', 'mobile-angular-ui','ui.bootstrap', 'highcharts-ng'])

  // 配置全局常量
  .constant('lcConfig', config)
  .constant('moment', window.moment)
  .constant('BASE_URL', 'http://10.60.36.95:8080/api') // 测试
  // .constant('BASE_URL', '/api') // 发布

  // 基础配置
  .config(httpConfig)
  .config(routerConfig)
  
  // 自动执行
  .run(i18nConfig)

  // services 初始化
  .service('qService', qService)
  .service('AuthTool',AuthTool)

  // factory 初始化
  .factory('accountRes', accountRes)
  .factory('economyGdpRes', economyGdpRes)
  .factory('economyKeqiangRes', economyKeqiangRes)
  .factory('economyTaxRes', economyTaxRes)
  .factory('economyPowerRes', economyPowerRes)
  .factory('environmentRes', environmentRes)
  .factory('populationRes', populationRes)
  .factory('populationStructureRes', populationStructureRes)
  .factory('privilegeRes', privilegeRes)

  // directive 初始化
  
  // filter 初始化

  // controllers 初始化
  .controller('appCtrl', appCtrl)
  .controller('portalCtrl', portalCtrl)
  .controller('inCtrl', inCtrl)
  .controller('powerCtrl', powerCtrl)

  // 经济controllers
  
  
  // 环境controllers
  

  // 人口controllers
  
  ;