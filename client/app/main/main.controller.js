'use strict';

(function () {

    class MainComponent {

        constructor($http, $scope, socket, mapsService, placesService) {

            this.$http = $http;
            this.socket = socket;
            this.scope = $scope;
            this.mapsService = mapsService;
            this.placesService = placesService;
            this.popularPlaces = [];

            //Map with US parameters
            mapsService.initMapWithOptions(
                document.getElementById('map'), {
                    lat: 37.09024,
                    lng: -95.712891
                }, 6);

            $scope.$on('$destroy', function () {
                socket.unsyncUpdates('saved');
            });
        }

        $onInit() {

            var self = this;

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    self.pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    self.mapsService.setUserPosition(self.pos);
                    self.mapsService.setupMap('You are here', 13);
                    self.getPopularPlaces();

                }, function () {
                    self.mapsService.handleLocationError(true, this.mapsService.map.getCenter());
                });
            } else {
                //Browser doesn't support Geolocation
                self.mapsService.handleLocationError(false, this.mapsService.map.getCenter());
            }

        }

        $onChanges(changedObj) {
            //console.log(changedObj);

        }

        getPopularPlaces() {
            this.popularPlaces = [];

            this.service = new google.maps.places.PlacesService(this.mapsService.map);
            this.service.radarSearch(this.mapsService.searchOptions, points => {
                points.slice(0, 8).forEach(point => {
                    this.service.getDetails({
                        placeId: point.place_id
                    }, details => {
                        this.popularPlaces.push(details);
                        this.placesService.displayPlaces(details);
                        this.scope.$digest();
                    });
                });
            });
        }

        changePlace() {
            if (this.newPlace) {
                console.log(this.newPlace);
                this.pos = this.newPlace.pos;
                this.getPopularPlaces();
                this.newPlace = '';
            }
        }

    }

    angular.module('exploreAroundApp')
        .component('main', {
            templateUrl: 'app/main/main.html',
            controller: MainComponent,
            controllerAs: 'main'
        });
})();
