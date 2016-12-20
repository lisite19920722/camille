export default ($resource, BASE_URL) => {
    'ngInject';
    return {
        getTotal: (headers) => {
            return $resource(BASE_URL+'/power/total', {}, {
                get: {
                    method: 'GET',
                    headers: headers
                },
            });
        },
        getIndustry: (headers) => {
            return $resource(BASE_URL+'/power/industry/total/:year', {
                year:'@year',
            }, {
                get: {
                    method: 'GET',
                    headers: headers
                },
            });
        },
        getIndustryYear: (headers) => {
            return $resource(BASE_URL+'/power/industry/:industryId', {
                industryId:'@industryId',
            }, {
                get: {
                    method: 'GET',
                    headers: headers
                },
            });
        },
        getIndustrySeason: (headers) => {
            return $resource(BASE_URL+'/power/industry/:industryId/:year', {
                industryId:'@industryId',
                year:'@year',
            }, {
                get: {
                    method: 'GET',
                    headers: headers
                },
            });
        },
        getEnterpriseAverage: (headers) => {
            return $resource(BASE_URL+'/power/enterprise/average', {}, {
                get: {
                    method: 'GET',
                    headers: headers
                },
            });
        },
        getEnterpriseYear: (headers) => {
            return $resource(BASE_URL+'/power/enterprise/:enterpriseId', {
                enterpriseId:'@enterpriseId',
            }, {
                get: {
                    method: 'GET',
                    headers: headers
                },
            });
        },
        getEnterpriseSeason: (headers) => {
            return $resource(BASE_URL+'/power/enterprise/:enterpriseId/:year', {
                enterpriseId:'@enterpriseId',
                year:'@year',
            }, {
                get: {
                    method: 'GET',
                    headers: headers
                },
            });
        },
    };
}