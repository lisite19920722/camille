export default ($resource, BASE_URL) => {
    'ngInject';
    return {
        Environment: function (headers) {
            return $resource(BASE_URL + '/privilege/environment', {}, {
                get: {
                    method: 'GET',
                    headers: headers
                },
            });
        },
        Economy: function (headers) {
            return $resource(BASE_URL + '/privilege/economy', {}, {
                get: {
                    method: 'GET',
                    headers: headers
                },
            });
        },
        Population: function (headers) {
            return $resource(BASE_URL + '/privilege/population', {}, {
                get: {
                    method: 'GET',
                    headers: headers
                },
            });
        },
    };        
};