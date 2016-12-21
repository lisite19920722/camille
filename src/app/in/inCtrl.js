export default(AuthTool, $state) => {
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
};