(function() {
  'use strict';

  angular
    .module('app.queryDb')
    .factory('queryDb', queryDb);

    queryDb.$inject = ['$http', '$q'];
    
    function queryDb($http, $q) {
        var service = {
            queryUsers: queryUsers
        };
        
        return service;
        
        ///////
        
        function queryUsers(url) {
            var q = $q.defer()
            $http.get(url).success(function(result) {
                q.resolve(result);
            }).error(function(err){
                q.reject(err);
            });
            return q.promise;
        }
        
    }
})();