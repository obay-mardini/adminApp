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
        vm.map = 'users'
        vm.ticketsRequest = false;
        vm.mapContainer = false;
        vm.purchaseRequest = false;
        vm.usersRequest = false;
        function settingTheMap() {
            var numberOfUsers = 0;
            queryDb.queryUsers('/queryJournies').then(function(result) {
                falsefy();
                vm.mapContainer = true;
                function usersBased(d, i) {
                    var mainTraffic = [];
                    var mediumTraffic = [];
                    var poorTraffic = [];
                    
                    vm.usersByCountry = {};
                    result.forEach(function(user) {
                        vm.usersByCountry[user.country] = vm.usersByCountry[user.country] || 0;
                        vm.usersByCountry[user.country]++;
                    });
                    for (var key in vm.usersByCountry) {
                        if (vm.usersByCountry[key] / result.length > 0.2) {
                            mainTraffic.push(key)
                        } else if (vm.usersByCountry[key] / result.length > 0.1) {
                            mediumTraffic.push(key)
                        } else {
                            poorTraffic.push(key)
                        }
                    }

                    if (mainTraffic.indexOf(d.properties.name) > -1) {
                        return "blue";
                    } else if (mediumTraffic.indexOf(d.properties.name) > -1) {
                        return 'red'
                    } else if (poorTraffic.indexOf(d.properties.name) > -1) {
                        return 'green';
                    }

                    return 'black';
                }
                
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
                if(vm.map !== 'users') {
                    //to be replaced by a worker
                    setTimeout(function() {
                        infoMap.draw(destinationBased);
                    }, 10);
                } else {
                    setTimeout(function() {
                        infoMap.draw(usersBased);
                    }, 10);
                }
                
            }).catch(function(err) {
                console.log(err)
            })
        }
        
        function queryUsers() {   
           
            queryDb.queryUsers('/queryUsers').then(function(result) {
                 console.log('hello')
                falsefy();
                vm.usersRequest = true;
                vm.users = result;
            }).catch(function(err) {
                console.log(err)
            })
        }
        
        function querPurchases() {
            queryDb.queryUsers('/queryPurchases').then(function(result) {
                falsefy();
                vm.purchaseRequest = true;
                vm.purchases = result;
            }).catch(function(err){
                console.log(err)
            })
        }
        
        function queryJournies() {
            queryDb.queryUsers('/queryJournies').then(function(result) {
                falsefy();
                vm.ticketsRequest = true;
                vm.tickets = result;
            }).catch(function(err){
                console.log(err)
            })
        }
        
        function falsefy() {
            vm.ticketsRequest = false;
            vm.mapContainer = false;
            vm.purchaseRequest = false;
            vm.usersRequest = false;
        }
        
    }
})();