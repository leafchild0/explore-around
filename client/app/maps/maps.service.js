'use strict';

angular.module( 'exploreAroundApp' ).factory( 'mapsService', function (){
  // AngularJS will instantiate a singleton by calling "new" on this function
  
  var maps           = {};
  maps.userPosition  = {};
  maps.searchOptions = {
    location: '',
    radius  : 50000,
    types   : [ 'amusement_park', 'aquarium', 'art_gallery', 'casino', 'church',
      'city_hall', 'courthouse', 'hindu_temple', 'library', 'museum', 'night_club',
      'park', 'stadium', 'synagogue', 'university', 'zoo' ]
  };
  
  maps.initMapWithOptions = function ( mapElement, center, zoomLevel ){
    maps.map = new google.maps.Map( mapElement, {
      center   : new google.maps.LatLng( center.lat, center.lng ),
      zoom     : zoomLevel,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    } );
    
    maps.infoWindow = new google.maps.InfoWindow( {
      map: maps.map
    } );
  };
  
  maps.handleLocationError = function ( browserHasGeolocation, pos ){
    maps.infoWindow.setPosition( pos );
    maps.infoWindow.setContent( browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.' +
    'Try to find your place manually' );
  };
  
  maps.createMarker = function ( place, color ){
    
    let location = place.geometry ? {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    } : place;
    return new google.maps.Marker( {
      map     : maps.map,
      position: location,
      icon    : 'http://www.google.com/intl/en_us/mapfiles/ms/micons/' + color + '-dot.png'
    } );
  };
  
  maps.setupMap = function ( message, zoom ){
    maps.infoWindow.setPosition( maps.userPosition );
    maps.map.setCenter( new google.maps.LatLng( maps.userPosition.lat, maps.userPosition.lng ) );
    maps.infoWindow.setContent( message );
    maps.map.setZoom( zoom );
  };
  
  maps.setUserPosition = function ( pos ){
    maps.userPosition           = pos;
    maps.searchOptions.location = pos;
  };
  
  maps.getUserPosition = function (){
    return maps.userPosition;
  };
  
  maps.drawUserPosition = function (){
    maps.createMarker( maps.userPosition, 'red' );
  };
  
  return maps;
  
} );
