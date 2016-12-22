export default ($resource, BASE_URL) => {
    'ngInject';
    
    return {
        getYearGdp: (headers) => {
            return $resource(BASE_URL+'/economy/yearGdp', {}, {
                get: {
                    method: 'GET',
                    headers: headers
                },
            });
        },
        getYearDetail: (headers) => {
            return $resource(BASE_URL+"/economy/gdpDetail/:year", {
                year:'@year'
            }, {
                get:{
                    method:'GET',
                    headers: headers
                }
            });
        },
        getIndustryDetail: (headers) => {
            return $resource(BASE_URL+"/economy/industryDetail", {}, {
                get:{
                    method:'GET',
                    headers: headers
                }
            })
        },
        getYearIndustryDetail: (headers) => {
            return $resource(BASE_URL+"/economy/getIndustryDetail/:year", {
                year:"@year"
            }, {
                get:{
                    method:'GET',
                    headers:headers
                }
            })
        }
    };
}