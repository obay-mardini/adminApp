(function() {
  'use strict';

  angular
    .module('app', [
      // Angular modules.
      'ngRoute',

      // Custom modules.
      'app.landing',
      'app.infoMap',
      'app.queryDb'
     
    ])
})();