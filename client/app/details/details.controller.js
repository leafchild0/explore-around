'use strict';

(function (){
  
  class DetailsComponent {
    
    constructor( $stateParams, placesService, mapsService, savedService, Auth ){
      this.place        = {};
      this.places       = placesService;
      this.maps         = mapsService;
      this.savedService = savedService;
      this.place_id     = $stateParams.id;
      this.user         = Auth.getCurrentUser;
      this.place.title  = 'Odessa National Theater';

      this.maxRating = 5;

      this.maps.initMapWithOptions(
          document.getElementById( 'placeMap' ), {
            lat: 37.09024,
            lng: -95.712891
          }, 10 );
      
    }
    
    $onInit(){
      this.place = this.places.getPlaceById( this.place_id )[ 0 ];
      
      this.pos = {
        lat: this.place.geometry.location.lat(),
        lng: this.place.geometry.location.lng()
      };
      
      this.maps.setUserPosition( this.pos );
      this.maps.setupMap( 'this.place.name', 13 );
      
      console.log( this.place );
    }
    
    savePlace( place ){

      var self = this;
      //TODO: Figure out which properties should be saved, user is not saving also
      //Setting up the user
      place.owner = this.user;

      this.savedService.places().add( place ).$promise.then(
          function ( response ){
            //Add item to the collection of items
            self.places.getUserPlaces().push( response );
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
