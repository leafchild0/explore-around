'use strict';

(function () {

    class DetailsComponent {

        constructor($scope, $stateParams, placesService, mapsService) {
            this.place = {};
            this.places = placesService;
            this.maps = mapsService;
            this.place_id = $stateParams.id;
            this.place.title = 'Odessa National Theater';

        }

        $onInit() {
            this.place = this.places.getPlaceById(this.place_id)[0];

            this.pos = {
                lat: this.place.geometry.location.lat(),
                lng: this.place.geometry.location.lng()
            }

            this.maps.initMapWithOptions(
                document.getElementById('placeMap'), {
                    lat: this.pos.lat,
                    lng: this.pos.lng
                }, 10);

                this.maps.setUserPosition(this.pos);
                this.maps.setupMap(this.place.name, 13);

            console.log(this.place);
        }
    }
    angular.module('exploreAroundApp')
        .component('details', {
            templateUrl: 'app/details/details.html',
            controller: DetailsComponent,
            controllerAs: 'details'
        });

})();
