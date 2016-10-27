(function() {
    'use strict'
    
    angular
        .module('app.landing')
        .controller('LandingController', LandingController);
    
    LandingController.$inject = ['$http']
    function LandingController($http) {
        var vm = this;
        vm.users = [];
        vm.purchases = [];
        vm.tickets = [];
        vm.queryUsers = queryUsers;
        vm.querPurchases = querPurchases;
        vm.queryJournies = queryJournies;
        setInterval(queryUsers, 1000);
        function queryUsers() {
            $http.get('/queryUsers').success(function(result) {
                vm.users = result;
                console.log(vm.users)
            }).error(function(err){
                console.log(err)
            })
        }
        
        function querPurchases() {
            $http.get('/queryPurchases').success(function(result) {
                vm.purchases = result;
            }).error(function(err){
                console.log(err)
            })
        }
        
        function queryJournies() {
            $http.get('/queryJournies').success(function(result) {
                vm.tickets = result;
            }).error(function(err){
                console.log(err)
            })
        }
        
    }
})();