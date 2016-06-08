'use strict';

(function () {

    class MainController {

        constructor($http, $scope, socket) {

            this.$http = $http;
            this.socket = socket;
            this.popularPoints = [];
            this.searchOptions = {
                location: '',
                radius: 50000,
                types: ['amusement_park', 'aquarium', 'art_gallery', 'casino', 'church',
                        'city_hall', 'courthouse', 'hindu_temple', 'library', 'museum', 'night_club',
                        'park', 'stadium', 'synagogue', 'university', 'zoo']
            };

            this.map = new google.maps.Map(document.getElementById('map'), {
                center: {
                    lat: 37.09024,
                    lng: -95.712891
                },
                zoom: 6
            });

            this.infoWindow = new google.maps.InfoWindow({
                map: this.map
            });

            $scope.$on('$destroy', function () {
                //socket.unsyncUpdates('thing');
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

                    self.searchOptions.location = self.pos;
                    self.setupMap();
                    self.getPopularPlaces();

                }, function () {
                    self.handleLocationError(true, self.map.getCenter());
                });
            } else {
                // Browser doesn't support Geolocation
                self.handleLocationError(false, self.map.getCenter());
            }

            /*this.map = new google.maps.Map( document.getElementById( 'map' ), {
                center: this.destinationOptions.location,
                zoom: 5
            } );
            var service = new google.maps.places.PlacesService( $scope.map );*/

            /*this.$http.get('/api/things')
              .then(response => {
                this.awesomeThings = response.data;
                this.socket.syncUpdates('thing', this.awesomeThings);
              });*/
        }

        setupMap() {
            this.infoWindow.setPosition(this.pos);
            this.infoWindow.setContent('Location found.');
            this.map.setZoom(13);
            this.map.setCenter(this.pos);
            this.createMarker(this.pos, 'red');
        }

        getPopularPlaces() {
            this.popularPoints = [];

            this.service = new google.maps.places.PlacesService(this.map);
            this.service.radarSearch(this.searchOptions, points => {
                points.slice(0, 8).forEach(point => {
                    this.service.getDetails({
                        placeId: point.place_id
                    }, details => {
                        this.popularPoints.push(details);
                        this.drawPlaces();
                    });
                });
            });
        }

        drawPlaces() {
            for (var i = 0, result; result = this.popularPoints[i]; i++) {
                this.createMarker(result, 'yellow');
            }
        }

        addPlace() {
            if (this.newPlace) {
                /*this.$http.post('/api/things', {
                  name: this.newThing
                });*/
                console.log(this.newPlace);
                this.newPlace = '';
            }
        }

        deletePlace(place) {
            //this.$http.delete('/api/things/' + thing._id);
        }

        handleLocationError(browserHasGeolocation, pos) {
            this.infoWindow.setPosition(pos);
            this.infoWindow.setContent(browserHasGeolocation ?
                'Error: The Geolocation service failed.' :
                'Error: Your browser doesn\'t support geolocation.');
        }

        createMarker(place, color) {

            let location = place.geometry ? place.geometry.location : place;
            let marker = new google.maps.Marker({
                map: this.map,
                position: location,
                icon: 'http://www.google.com/intl/en_us/mapfiles/ms/micons/'+ color + '-dot.png'
            });
        }
    }

    angular.module('exploreAroundApp')
        .component('main', {
            templateUrl: 'app/main/main.html',
            controller: MainController,
            controllerAs: 'main'
        });
})();
