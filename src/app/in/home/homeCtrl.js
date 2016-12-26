export default ($scope, $rootScope, qService) => {
	'ngInject';
    // 适应屏幕高度
	const adjustLayout = () => {
		let clientH = $(window).height();
		if (clientH > 630) {
			let h = clientH - 585;
			$("#homeContent").height(h);
			let pad = (h - 62.5) / 2;
			$("#homeContent").css("padding-top", pad + "px");
		}
	}();
};