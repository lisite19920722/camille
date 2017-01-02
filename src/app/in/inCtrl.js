export default($rootScope, AuthTool, $state, qService) => {
	'ngInject';

	const JQueryDOMOperation = () => {
		$("#logout").bind('click', (event) => {
			AuthTool.delLoginInfo();
			console.log("已退出登录, 本地用户信息已删除");
			$state.go("portal");
		});

		// 侧边导航栏
		$("#economyUl").hide(0);
		$("#economyA").bind('click', (event) => {
			$("#economyUl").slideToggle(200);
			$("#economyI").toggleClass("fa-angle-down");
		})
		$("#environmentUl").hide(0);
		$("#environmentA").bind('click', (event) => {
			$("#environmentUl").slideToggle(200);
			$("#environmentI").toggleClass("fa-angle-down");
		})
		$("#populationUl").hide(0);
		$("#populationA").bind('click', (event) => {
			$("#populationUl").slideToggle(200);
			$("#populationI").toggleClass("fa-angle-down");
		})

		// 导航中对应当前页面的标签激活 最后补充
	}();

	// 权限控制放在前端
	
	// 获得账户信息
	try {
		let mobile = AuthTool.getLoginInfo().mobile;
		switch(mobile) {
			case "system":
			case "sz01":
			case "jxw01": 
				break; // 全部显示
			case "tjj01":
			case "czj01": {
				$("#environmentA").hide(0);
				$("#populationA").hide(0);
				break;
			}
			case "gaj01":
			case "xfdd01":
			case "sjjdd01":
			case "xfj01":
			case "ajj01":
			case "gtj01":
			case "wjj01":
			case "jtj01":
			case "cgj01":
			case "wsj01": { // 全部隐藏 没有用到这些局的数据 不提供BI服务
				$("#environmentA").hide(0);
				$("#populationA").hide(0);
				$("#economyA").hide(0);
				break;
			}
			case "hbj01": {
				$("#populationA").hide(0);
				$("#economyA").hide(0);
				break;
			}
			case "slj01": {
				$("#populationA").hide(0);
				$("#economyA").hide(0);

				$("#environmentAir").hide(0);
				break;
			}
			case "jsw01": {
				$("#environmentA").hide(0);
				$("#economyA").hide(0);
				break;
			}
			case "rsj01":
			case "jyj01": {
				$("#environmentA").hide(0);
				$("#economyA").hide(0);
				$("#populationStructure").hide(0);
				$("#populationLabor").hide(0);
				break;
			}
		}
	} catch(e) {
		console.log(e);
	}
};