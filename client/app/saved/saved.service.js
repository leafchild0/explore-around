/**
 * Created by: leafchild
 * Date: 11/06/16
 * Project: explore-around
 */

'use strict';

angular.module('exploreAroundApp')
        .factory('savedService', function ($resource, baseURL) {
  // AngularJS will instantiate a singleton by calling "new" on this function
  
  var saved = {};
  
  saved.place = function() {
    return $resource(baseURL + 'api/places/:id', null, {
      'update': { method: 'PUT' }
    });
  };
  
  saved.places = function() {
    return $resource(baseURL + 'api/places', null, {
      'add': { method:   'POST' },
      'getAll': { method:   'GET' , isArray:true }
    });
  };
  
  return saved;
  
});
