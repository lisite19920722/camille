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
 import gdpdirective from './in/economy/gdp/template/gdpdirective';
// filter

// controllers
// 登陆及首页Controller
import appCtrl from './appCtrl';
import portalCtrl from './auth/portal/portalCtrl';
import inCtrl from './in/inCtrl';
import homeCtrl from './in/home/homeCtrl';

// 经济模块Controller
import gdpCtrl from './in/economy/gdp/gdpCtrl';
import gdponeCtrl from './in/economy/gdp/one/oneCtrl';
import gdptwoCtrl from './in/economy/gdp/two/twoCtrl';
import gdpthreeCtrl from './in/economy/gdp/three/threeCtrl';
import kqCtrl from './in/economy/kq/kqCtrl';
import kqoneCtrl from './in/economy/kq/one/oneCtrl';
import kqtwoCtrl from './in/economy/kq/two/twoCtrl';
import powerCtrl from './in/economy/power/powerCtrl';
import poweroneCtrl from './in/economy/power/one/oneCtrl';
import powertwoCtrl from './in/economy/power/two/twoCtrl';
import powerthreeCtrl from './in/economy/power/three/threeCtrl';
import powerfourCtrl from './in/economy/power/four/fourCtrl';
import powerfiveCtrl from './in/economy/power/five/fiveCtrl';
import taxCtrl from './in/economy/tax/taxCtrl';
import taxoneCtrl from './in/economy/tax/one/oneCtrl';
import taxtwoCtrl from './in/economy/tax/two/twoCtrl';


//环境模块Controller
import airCtrl from './in/environment/air/airCtrl';
import aironeCtrl from './in/environment/air/one/oneCtrl';
import airtwoCtrl from './in/environment/air/two/twoCtrl';
import airthreeCtrl from './in/environment/air/three/threeCtrl';
import airfourCtrl from './in/environment/air/four/fourCtrl';
import waterCtrl from './in/environment/water/waterCtrl';
import wateroneCtrl from './in/environment/water/one/oneCtrl';
import watertwoCtrl from './in/environment/water/two/twoCtrl';
import waterthreeCtrl from './in/environment/water/three/threeCtrl';

// 人口模块Controller
import structureCtrl from './in/population/structure/structureCtrl';
import structureoneCtrl from './in/population/structure/one/oneCtrl';
import structuretwoCtrl from './in/population/structure/two/twoCtrl';
import structurethreeCtrl from './in/population/structure/three/threeCtrl';
import laborCtrl from './in/population/labor/laborCtrl';
import laboroneCtrl from './in/population/labor/one/oneCtrl';
import laborthreeCtrl from './in/population/labor/three/threeCtrl';
import popothersCtrl from './in/population/popothers/popothersCtrl';
import popothersoneCtrl from './in/population/popothers/one/oneCtrl';
import popotherseducationCtrl from './in/population/popothers/one/educationCtrl';
import popothersinsuranceCtrl from './in/population/popothers/one/insuranceCtrl';

angular.module('camille',
  ['ngAnimate', 'ngCookies', 'ngSanitize', 'ui.router', 'ngResource', 'ngStorage', 'mobile-angular-ui','ui.bootstrap', 'highcharts-ng'])

  // 配置全局常量
  .constant('lcConfig', config)
  .constant('moment', window.moment)
  .constant('BASE_URL', 'http://100.64.2.72:8080/api') // 测试
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
  .directive('gdpdirective',gdpdirective)
  // filter 初始化

  // controllers 初始化
  .controller('appCtrl', appCtrl)
  .controller('portalCtrl', portalCtrl)
  .controller('inCtrl', inCtrl)
  .controller('homeCtrl', homeCtrl)

  // 经济controllers
  .controller('gdpCtrl', gdpCtrl)
  .controller('gdponeCtrl', gdponeCtrl)
  .controller('gdptwoCtrl', gdptwoCtrl)
  .controller('gdpthreeCtrl', gdpthreeCtrl)
  .controller('kqCtrl', kqCtrl)
  .controller('kqoneCtrl', kqoneCtrl)
  .controller('kqtwoCtrl', kqtwoCtrl)
  .controller('powerCtrl', powerCtrl)
  .controller('poweroneCtrl', poweroneCtrl)
  .controller('powertwoCtrl', powertwoCtrl)
  .controller('powerthreeCtrl', powerthreeCtrl)
  .controller('powerfourCtrl', powerfourCtrl)
  .controller('powerfiveCtrl', powerfiveCtrl)
  .controller('taxCtrl', taxCtrl)  
  .controller('taxoneCtrl', taxoneCtrl)
  .controller('taxtwoCtrl', taxtwoCtrl)
  // 环境controllers
  .controller('airCtrl', airCtrl)
  .controller('aironeCtrl', aironeCtrl)
  .controller('airtwoCtrl', airtwoCtrl)
  .controller('airthreeCtrl', airthreeCtrl)
  .controller('airfourCtrl', airfourCtrl)
  .controller('waterCtrl', waterCtrl)
  .controller('wateroneCtrl', wateroneCtrl)
  .controller('watertwoCtrl', watertwoCtrl)
  .controller('waterthreeCtrl', waterthreeCtrl)

  // 人口controllers
  .controller('structureCtrl', structureCtrl)
  .controller('structureoneCtrl', structureoneCtrl)
  .controller('structuretwoCtrl', structuretwoCtrl)
  .controller('structurethreeCtrl', structurethreeCtrl)
  .controller('laborCtrl', laborCtrl)
  .controller('laboroneCtrl', laboroneCtrl)
  .controller('laborthreeCtrl', laborthreeCtrl)
  .controller('popothersCtrl', popothersCtrl)
  .controller('popothersoneCtrl', popothersoneCtrl)
  .controller('popotherseducationCtrl',popotherseducationCtrl)
  .controller('popothersinsuranceCtrl', popothersinsuranceCtrl)
  ;