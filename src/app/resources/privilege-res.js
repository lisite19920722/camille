export default ($resource, BASE_URL) => {
    'ngInject';
    return {
        Environment: (headers) => {
            return $resource(BASE_URL + '/privilege/environment', {}, {
                get: {
                    method: 'GET',
                    headers: headers
                },
            });
        },
        Economy: (headers) => {
            return $resource(BASE_URL + '/privilege/economy', {}, {
                get: {
                    method: 'GET',
                    headers: headers
                },
            });
        },
        Population: (headers) => {
            return $resource(BASE_URL + '/privilege/population', {}, {
                get: {
                    method: 'GET',
                    headers: headers
                },
            });
        },
    };        
};