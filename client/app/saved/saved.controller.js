'use strict';
(function (){

  class SavedComponent {
    constructor( placesService ){
      this.placesService = placesService;
      this.userPlaces = [];
      this.message = '';
    }

    $onInit(){

      var self = this;

      this.userPlaces = this.placesService.getUserPlaces(
          function ( response ){
            self.userPlaces = response;

          },
          function ( response ){
            self.message = "Error: " + response.status + " " + response.statusText;
          }
      );
    }

    deletePlace( place_id ){
      //Remove from DB
      //Remove from UI

    }
  }

  angular.module( 'exploreAroundApp' ).component( 'saved', {
    templateUrl: 'app/saved/saved.html',
    controller : SavedComponent,
    controllerAs: 'saved'
  } );

})();
