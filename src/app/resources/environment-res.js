export default ($resource, BASE_URL) => {
    'ngInject';

    return {
        getAirCondition: (headers) => {
            return $resource('http://apis.baidu.com/apistore/weatherservice/recentweathers?cityid=101190408', {}, {
                get: {
                    method: 'GET',
                    headers: headers
                },
            });
        }, 
        getAirQuality: (headers) => {
            return $resource(BASE_URL+'/environment/air/air_quality', {}, {
        	    get: {
        	        method: 'GET',
        	        headers: headers
        	    },
            });
        },
        getAirPollution: (headers) => {
            return $resource(BASE_URL+'/environment/air/air_pollution', {}, {
                get: {
                    method: 'GET',
                    headers: headers
                },
            });
        },
        getWaterQuality: (headers) => {
            return $resource(BASE_URL+'/environment/water/water_quality', {}, {
        	    get: {
        	        method: 'GET',
        	        headers: headers
        	    },
            });
        }, 
        getWaterPollution: (headers) => {
            return $resource(BASE_URL+'/environment/water/water_pollution', {}, {
                get: {
                    method: 'GET',
                    headers: headers
                },
            });
        },   
    };
}