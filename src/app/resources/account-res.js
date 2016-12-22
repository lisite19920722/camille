/*
* $resource- 账户相关 
* --Mondooo
* 
*/
export default ($resource, BASE_URL) => {
	'ngInject';
	return {
		account: (headers) => {
            return $resource(BASE_URL + '/account/:id', {
        			id: '@id'
	        	}, {
	          	get: {
		            method: 'GET',
		            headers: headers
	        	},
	        	post: {
	        		method: 'POST',
	        		headers: headers
	        	},
	        	put: {
	        		method: 'PUT',
	        		headers: headers
	        	}
        	});
    	},
    	accountMobile: (headers) => {
    		return $resource(BASE_URL + '/account/mobile/:mobile', {
    			mobile: '@mobile'
    		}, {
    			get: {
    				method: 'GET',
    				headers: headers
    			},
    			put: {
    				method: 'PUT',
    				headers: headers
    			}
    		});
    	},
    	accountSms: (headers) => {
    		return $resource(BASE_URL + '/account/sms', {}, {
    			get: {
    				method: 'GET',
    				headers: headers
    			},
    			post: {
    				method: 'POST',
    				headers: headers
    			}
    		});
    	},
    	accountPassword: (headers) => {
    		return $resource(BASE_URL + '/account/password', {}, {
    			post: {
    				method: 'POST',
    				headers: headers
    			},
    			put: {
    				method: 'PUT',
    				headers: headers
    			}
    		});
    	},
    	accountPasswordSms: (headers) => {
    		return $resource(BASE_URL + '/account/password/sms', {}, {
    			post: {
    				method: 'POST',
    				headers: headers
    			},
    			get: {
    				method: 'GET',
    				headers: headers
    			}
    		});
    	},
    	accountAuthentication: (headers) => {
    		return $resource(BASE_URL + '/account/authentication', {}, {
    			post: {
    				method: 'POST',
    				headers: headers
    			},
    			get: {
    				method: 'GET',
    				headers: headers
    			},
    			delete: {
    				method: 'DELETE',
    				headers: headers
    			}
    		});
    	},
    	accountProfile: (headers) => {
    		return $resource(BASE_URL + '/account/profile', {}, {
    			get: {
    				method: 'GET',
    				headers: headers
    			},
    			put: {
    				method: 'PUT',
    				headers: headers
    			}
    		});
    	},
    	accountCompany: (headers) => {
    		return $resource(BASE_URL + '/account/company', {}, {
    			get: {
    				method: 'GET',
    				headers: headers
    			},
    			put: {
    				method: 'PUT',
    				headers: headers
    			}
    		});
    	},
    	accountIcon: (headers) => {
    		return $resource(BASE_URL + '/account/icon/:attachId', {
    			attachId: '@attachId'
    		}, {
    			put: {
    				method: 'PUT',
    				headers: headers
    			}
    		});
    	},
    	accountProfileSetting: (headers) => {
    		return $resource(BASE_URL + '/account/profile/setting', {}, {
    			put: {
    				method: 'PUT',
    				headers: headers
    			}
    		});
    	}
	};
};