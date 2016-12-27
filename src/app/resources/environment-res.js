export default ($resource, BASE_URL) => {
    'ngInject';

    return {
        getAirCondition: (headers) => {
            return $resource('http://apis.baidu.com/apistore/weatherservice/recentweathers?cityid=101190408', {}, {
            // return $resource('https://api.thinkpage.cn/v3/weather/daily.json?key=inb6r9evd3mvcuwf&location=suzhou&language=zh-Hans&unit=c&start=0&days=5', {}, {
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
        }   
    };
}