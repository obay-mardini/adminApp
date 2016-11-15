(function() {
    'use strict'

    angular
        .module('app.landing')
        .controller('LandingController', LandingController);

    LandingController.$inject = ['infoMap', 'queryDb']

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
        vm.map = true;
        vm.ticketsRequest = false;
        vm.mapContainer = false;
        vm.purchaseRequest = false;
        vm.usersRequest = false;
        vm.mainTraffic = []

        function settingTheMap(mapType) {
            var numberOfUsers = 0;
            queryDb.queryUsers('/queryJournies').then(function(result) {
                falsefy();
                vm.mapContainer = true;

                function usersBased(d, i) {
                    vm.mainTraffic = [];
                    vm.mediumTraffic = [];
                    vm.poorTraffic = [];

                    vm.usersByCountry = {};
                    result.forEach(function(user) {
                        vm.usersByCountry[user.country] = vm.usersByCountry[user.country] || 0;
                        vm.usersByCountry[user.country]++;
                    });
                    console.log(vm.usersByCountry)
                    for (var key in vm.usersByCountry) {
                        if (vm.usersByCountry[key] / result.length > 0.2) {
                            vm.mainTraffic.push(key)
                        } else if (vm.usersByCountry[key] / result.length > 0) {
                            vm.mediumTraffic.push(key)
                        } else {
                            vm.poorTraffic.push(key)
                        }
                    }

                    if (vm.mainTraffic.indexOf(d.properties.name) > -1) {
                        return "blue";
                    } else if (vm.mediumTraffic.indexOf(d.properties.name) > -1) {
                        return 'red'
                    } else if (vm.poorTraffic.indexOf(d.properties.name) > -1) {
                        return 'green';
                    }

                    return 'black';
                }

                function destinationBased(d, i) {
                    var destionations = result.reduce(function(target, current) {
                        target[current.destinationcountry] = target[current.destinationcountry] || 0;
                        target[current.destinationcountry]++;
                        return target;
                    }, {});

                    if (destionations[d.properties.name] / result.length > 0.3) {
                        return "blue";
                    } else if (destionations[d.properties.name] / result.length > 0.2) {
                        return 'red';
                    } else if (destionations[d.properties.name] / result.length > 0) {
                        return 'green'
                    } else {;
                        return 'black';
                    }
                }
                if (mapType !== 'users') {
                    //to be replaced by a worker
                    vm.map = true;
                    setTimeout(function() {
                        infoMap.draw(destinationBased);
                    }, 10);
                } else {
                    vm.map = false;
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
            }).catch(function(err) {
                console.log(err)
            })
        }

        function queryJournies() {
            queryDb.queryUsers('/queryJournies').then(function(result) {
                falsefy();
                vm.ticketsRequest = true;
                vm.tickets = result;
            }).catch(function(err) {
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