/*
* 功能: 异步方式封装http调用
* --Mondooo
*/
export default ($q, $state, $sessionStorage) => {
	'ngInject';

	let TOKEN_KEY = 'x-auth-token';
	let tempToken = '08b5d1545eae48f783e5a9683b3073fd';
	let workspaceId = 1;
	const successHandler = (value) => {
		if (value.code == "502") {
			$state.go("portal");
		}
	}
	return {
		httpGetWithToken: (resource, parameters, headers) => {
			return $q((resolve, reject) => {
				// headers['X-Auth-Token'] = $sessionStorage[TOKEN_KEY];
				headers['X-Auth-Token'] = tempToken;
				
				headers['X-Workspace-Id'] = workspaceId;
				resource(headers).get(parameters,
				(value, responseHeaders) => {
					successHandler(value);
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

				headers['X-Workspace-Id'] = workspaceId;
				resource(headers).post(parameters,body,
				(value, responseHeaders) => {
					successHandler(value);
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