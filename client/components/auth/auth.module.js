'use strict';

angular.module('exploreAroundApp.auth', ['exploreAroundApp.constants', 'exploreAroundApp.util',
    'ngCookies', 'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
