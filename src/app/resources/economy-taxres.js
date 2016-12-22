export default ($resource, BASE_URL) => {
    'ngInject';

    return {
        getYearTax: (headers) => {
            return $resource(BASE_URL+'/economy/yearTax', {}, {
                get: {
                    method: 'GET',
                    headers: headers
                },
            });
        },
        getYearTaxDetail: (headers) => {
            return $resource(BASE_URL+"/economy/taxDetail/:year", {
                year:'@year'
            }, {
                get:{
                    method:'GET',
                    headers: headers
                }
            });
        }
    };
}