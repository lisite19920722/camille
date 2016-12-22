export default ($resource, BASE_URL) => {
    'ngInject';

    return {
        getYearDetail: (headers) => {
            return $resource(BASE_URL+"/economy/yearKeqiang/:year", {
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