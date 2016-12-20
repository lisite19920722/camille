export default ($resource, BASE_URL) => {
    'ngInject';

    return {
        getEmployInsuranceSchoolList: (headers) => {
            return $resource(BASE_URL+'/population/populationEmployInsuranceData/list', {}, {
                get: {
                    method: 'GET',
                    headers: headers
                },
            });
        },
        getLaborGdpRelationPreData: (headers) => {
            return $resource(BASE_URL+'/population/laborGdpRelationPreData/list', {}, {
                get: {
                    method: 'GET',
                    headers: headers
                },
            });
        },
        getPopulationStructurePreData: (headers) => {
            return $resource(BASE_URL+'/population/populationStructurePreData/list', {}, {
                get: {
                    method: 'GET',
                    headers: headers
                },
            });
        },
        getSumPopulationData: (headers) => {
            return $resource(BASE_URL+'/population/sumPopulationData/list', {}, {
                get: {
                    method: 'GET',
                    headers: headers
                },
            });
        },
        getBirthrateData: (headers) => {
            return $resource(BASE_URL+'/population/birthrateData/list', {}, {
                get: {
                    method: 'GET',
                    headers: headers
                },
            });
        },        
    };
}