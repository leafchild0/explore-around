'use strict';
( function () {

    class SavedComponent {
        constructor( placesService, savedService ) {
            this.placesService = placesService;
            this.savedService = savedService;
            this.userPlaces = [];
            this.message = '';
        }

        $onInit() {

            var self = this;

            this.userPlaces = this.placesService.getUserPlaces(
                function ( response ) {
                    self.userPlaces = response;

                },
                function ( response ) {
                    self.message = "Error: " + response.status + " " + response.statusText;
                }
            );
        }

        deletePlace( place, $index ) {

            var self = this;
            //Remove from DB
            this.savedService.place().delete( {
                id: place._id
            }, place ).$promise.then(
                function () {
                    //delete item from items collection
                    self.userPlaces.splice( $index, 1 );
                },
                function ( response ) {
                    self.message = "Error: " + response.status + " " + response.statusText;
                } );

        }
    }

    angular.module( 'exploreAroundApp' ).component( 'saved', {
        templateUrl: 'app/saved/saved.html',
        controller: SavedComponent,
        controllerAs: 'saved'
    } );

} )();
