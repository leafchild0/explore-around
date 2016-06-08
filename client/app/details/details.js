'use strict';

angular.module('exploreAroundApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('details', {
        url: '/details/:id',
        template: '<details></details>'
      });
  });
