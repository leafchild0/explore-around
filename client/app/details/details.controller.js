'use strict';

(function (){

  class DetailsComponent {

    constructor( $stateParams, placesService, savedService, Auth ){
      this.place         = {};
      this.placesService = placesService;
      this.savedService  = savedService;
      this.place_id      = $stateParams.id;
      this.Auth          = Auth;
      this.place.title   = 'Odessa National Theater';

      this.maxRating = 5;

    }

    $onInit(){
      this.place = this.placesService.getPlaceById( this.place_id )[ 0 ];

      this.pos = {
        lat: this.place.geometry.location.lat(),
        lng: this.place.geometry.location.lng()
      };

      this.displayPlaceMap(
          document.getElementById( 'placeMap' ), this.pos, 10 );

    }

    displayPlaceMap( mapElement, center, zoomLevel ){
      this.map = new google.maps.Map( mapElement, {
        center   : new google.maps.LatLng( center.lat, center.lng ),
        zoom     : zoomLevel,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      } );
    }

    savePlace( place ){

      var self = this;
      //TODO: Figure out which properties should be saved, user is not saving also
      //Setting up the user

      this.savedService.places().add( {
        name    : place.name,
        place_id: place.place_id,
        address : place.formatted_address,
        website : place.website,
        owner   : self.Auth.getCurrentUser(),
        rating  : place.rating,
        phone   : place.international_phone_number

      } ).$promise.then(
          function ( response ){
            //Add item to the collection of items
            self.placesService.getUserPlaces().push( response );
            //Show toaster message
          },
          function ( response ){
            this.message = "Error: " + response.status + " " + response.statusText;
          } );
    }

    hoveringOver( value ){
      $scope.overStar = value;
    };

  }
  angular.module( 'exploreAroundApp' ).component( 'details', {
    templateUrl : 'app/details/details.html',
    controller  : DetailsComponent,
    controllerAs: 'details'
  } );

})();
