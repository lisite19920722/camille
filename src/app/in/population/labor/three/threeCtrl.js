export default ($scope, $stateParams, qService, populationRes) => { 
	'ngInject';
        var laPromise = qService.httpGetWithToken(populationRes.getLaborGdpRelationPreData,{},{});

        laPromise.then(function(rc){
             console.log('成功');
             console.log(rc);
       },function(error){
        console.log('发送失败');  	 
       });
};