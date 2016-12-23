/*
* 功能: 异步方式封装http调用
* --Mondooo
*/
export default ($q, $state, $sessionStorage) => {
	'ngInject';

	let TOKEN_KEY = 'x-auth-token';
	let tempToken = '22ca04ee34df49d6aace8a627a2c30cb';
	return {
		httpGetWithToken: (resource, parameters, headers) => {
			return $q((resolve, reject) => {
				// headers['X-Auth-Token'] = $sessionStorage[TOKEN_KEY];
				headers['X-Auth-Token'] = tempToken;
				headers['X-Workspace-Id'] = 1;
				resource(headers).get(parameters,
				(value, responseHeaders) => {
					value.headers = responseHeaders ? responseHeaders() : "";
					resolve(value);
				}, 
				(httpResponse) => {
					reject(httpResponse);
				});
			});
		},
		httpPostWithToken: (resource, parameters, headers, body) => {
			return $q((resolve, reject) => {
				// headers['X-Auth-Token'] = $sessionStorage[TOKEN_KEY];
				headers['X-Auth-Token'] = tempToken;
				headers['X-Workspace-Id'] = 1;
				resource(headers).post(parameters,body,
				(value, responseHeaders) => {
					value.headers = responseHeaders ? responseHeaders() : "";
					resolve(value);
				}, 
				(httpResponse) => {
					reject(httpResponse);
				});
			});
		},
		httpPost: (resource, parameters, headers, body) => {
			return $q((resolve, reject) => {
				resource(headers).post(parameters,body,
				(value, responseHeaders) => {
					value.headers = responseHeaders ? responseHeaders() : "";
					resolve(value);
				}, 
				(httpResponse) => {
					reject(httpResponse);
				});
			});
		},
	};
};