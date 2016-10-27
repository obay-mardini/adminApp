(function() {
    'use strict'
    
    angular
        .module('app.landing')
        .config(configFunction);
    configFunction.$inject = ['$routeProvider'];
    function configFunction($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'modules/landing/landing.html',
            controller: 'LandingController',
            controllerAs: 'vm'
        });
    }
})();