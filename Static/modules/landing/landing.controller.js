(function() {
    'use strict'
    
    angular
        .module('app.landing')
        .controller('LandingController', LandingController);
    
    LandingController.$inject = [ 'infoMap', 'queryDb']
    
    function LandingController(infoMap, queryDb) {
        var vm = this;
        vm.users = [];
        vm.purchases = [];
        vm.tickets = [];
        vm.queryUsers = queryUsers;
        vm.querPurchases = querPurchases;
        vm.queryJournies = queryJournies;
        vm.draw = settingTheMap;
        vm.usersByCountry = {};
        
//        function settingTheMap() {
//            var numberOfUsers = 0;
//            queryDb.queryUsers('/queryUsers').then(function(result) {
//                vm.usersByCountry = {};
//                result.forEach(function(user) {
//                    vm.usersByCountry[user.country] = vm.usersByCountry[user.country] || 0;
//                    vm.usersByCountry[user.country]++;
//                    numberOfUsers++;
//                });
//                infoMap.draw(vm.usersByCountry, numberOfUsers, usersBased)
//            }).catch(function(err) {
//                console.log(err)
//            })
//        }
        
        function settingTheMap() {
            var numberOfUsers = 0;
            queryDb.queryUsers('/queryJournies').then(function(result) {
//                vm.usersByCountry = {};
//                result.forEach(function(user) {
//                    vm.usersByCountry[user.country] = vm.usersByCountry[user.country] || 0;
//                    vm.usersByCountry[user.country]++;
//                    numberOfUsers++;
//                });
                
                function destinationBased(d, i) {
                    var destionations = result.reduce(function(target, current){
                    target[current.destinationcountry] = target[current.destinationcountry] || 0;
                    target[current.destinationcountry]++;
                    return target;
                    }, {})
                    if (destionations[d.properties.name] / result.length > 0.2) {
                        return "blue";
                    } else if (destionations[d.properties.name] / result.length > 0.1) {
                        return 'red'
                    } else {;
                        return 'green';
                    }

                    return 'black';
                }
                
                infoMap.draw(vm.usersByCountry, null, destinationBased)
            }).catch(function(err) {
                console.log(err)
            })
        }
        
        function queryUsers() {    
            queryDb.queryUsers('/queryUsers').then(function(result) {
                vm.users = result;
            }).catch(function(err) {
                console.log(err)
            })
        }
        
        function querPurchases() {
            queryDb.queryUsers('/queryPurchases').then(function(result) {
                vm.purchases = result;
            }).catch(function(err){
                console.log(err)
            })
        }
        
        function queryJournies() {
            queryDb.queryUsers('/queryJournies').then(function(result) {
                vm.tickets = result;
            }).catch(function(err){
                console.log(err)
            })
        }
        
    }
})();