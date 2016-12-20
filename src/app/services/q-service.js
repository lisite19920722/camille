/*
* 功能: 异步方式封装http调用
* --Mondooo
*/
export default ($q, $state, $sessionStorage) => {
	'ngInject';

	let TOKEN_KEY = 'x-auth-token';
	
	return {
		httpGetWithToken: (resource, parameters, headers) => {
			return $q((resolve, reject) => {
				headers['X-Auth-Token'] = $sessionStorage[TOKEN_KEY];
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
				headers['X-Auth-Token'] = $sessionStorage[TOKEN_KEY];
				resource(headers).post(parameters,body,
				(value, responseHeaders) => {
					value.headers = responseHeaders ? responseHeaders() : "";
					resolve(JSOG.parse(JSOG.stringify(value)));
				}, 
				(httpResponse) => {
					reject(httpResponse);
				});
			});
		},
		// httpGet: (resource, parameters, headers) => {
		// 	return $q((resolve, reject) => {
		// 		resource(headers).get(parameters,
		// 		(value, responseHeaders) => {
		// 			value.headers = responseHeaders ? responseHeaders() : "";
		// 			resolve(value);
		// 		}, 
		// 		(httpResponse) => {
		// 			reject(httpResponse);
		// 		});
		// 	});
		// },
		// httpPost: (resource, parameters, headers, body) => {
		// 	return $q((resolve, reject) => {
		// 		resource(headers).post(parameters,body,
		// 		(value, responseHeaders) => {
		// 			value.headers = responseHeaders ? responseHeaders() : "";
		// 			resolve(JSOG.parse(JSOG.stringify(value)));
		// 		}, 
		// 		(httpResponse) => {
		// 			reject(httpResponse);
		// 		});
		// 	});
		// },
	};
};