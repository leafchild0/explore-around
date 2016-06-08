'use strict';

angular.module('exploreAroundApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('saved', {
        url: '/saved',
        template: '<saved></saved>'
      });
  });
