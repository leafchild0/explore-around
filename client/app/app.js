'use strict';

angular.module('exploreAroundApp', ['exploreAroundApp.auth', 'exploreAroundApp.admin',
    'exploreAroundApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'btford.socket-io',
    'ui.router', 'ui.bootstrap', 'validation.match', 'google.places'
  ]).constant('baseURL', 'http://localhost:9000/')
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  });
