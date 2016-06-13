'use strict';

angular.module( 'exploreAroundApp' ).factory( 'placesService', function ( mapsService, savedService ){
  // AngularJS will instantiate a singleton by calling "new" on this function
  
  var places           = {};
  places.popularPlaces = [];
  places.userPlaces    = [];
  
  places.setPlaces = function ( places ){
    places.popularPlaces = places;
  };
  
  var addPlace = function ( place ){
    places.popularPlaces.push( place );
  };
  
  var addUserPlace = function ( place ){
    places.userPlaces.push( place );
  };
  
  places.getPlaces = function (){
    return places.popularPlaces;
  };
  
  places.getUserPlaces = function (success, error){
    if ( !places.userPlaces.length > 0 ){
      savedService.places().getAll(success, error);
    }
    
  };
  
  places.displayPlaces = function ( place ){
    mapsService.createMarker( place, 'yellow' );
    addPlace( place );
  };
  
  places.getPlaceById = function ( id ){
    return places.popularPlaces.filter( place => place.place_id === id );
  };
  
  places.getFirstPhoto = function ( photos ){
    if(!photos) return;
    return photos.slice( 0, 4 )[ 0 ].getUrl( {
      'maxWidth' : 200,
      'maxHeight': 100
    } );
  };
  
  return places;
  
} );
