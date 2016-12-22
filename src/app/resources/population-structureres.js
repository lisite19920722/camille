export default ($resource, BASE_URL) => {
    'ngInject';

    return {
        PopulationStructure: (headers) => {
            return $resource(BASE_URL + '/population/insert_population_structure', {}, {
                post: {
                    method: 'POST',
                    headers: headers
                },
            });
        },
        PeopleEmployInsurance: (headers) => {
            return $resource(BASE_URL + '/population/insert_employ_insurance', {}, {
                post: {
                    method: 'POST',
                    headers: headers
                },
            });
        },
        isShowDataPanel: (headers) => {
            return $resource(BASE_URL + '/data/isshow', {}, {
                get: {
                    method: 'GET',
                    headers: headers
                },
            });
        },
        schoolNumDataInsert: (headers) => {
            return $resource(BASE_URL + '/population/insert_school', {}, {
                post: {
                    method: 'POST',
                    headers: headers
                },
            });
        },
        laborGdpRelationInsert: (headers) => {
            return $resource(BASE_URL + '/population/insert_labor_gdp_relation', {}, {
                post: {
                    method: 'POST',
                    headers: headers
                },
            });
        },
    };        
};