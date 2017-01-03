export default($rootScope) => {
	'ngInject';
	// Needed for the loading screen
	$rootScope.loading = false;

	// disable the pulldown refresh in app
	try {
		workplat.forbiddenRefreshing();
	} catch(e) {
		console.log(e);
	}
};