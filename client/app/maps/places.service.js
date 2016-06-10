'use strict';

angular.module('exploreAroundApp')
    .factory('placesService', function (mapsService) {
        // AngularJS will instantiate a singleton by calling "new" on this function

        var places = {};
        places.popularPlaces = [];

        places.setPlaces = function(places) {
            places.popularPlaces = places;
        }

        var addPlace = function(place) {
            places.popularPlaces.push(place);
        }

        places.getPlaces = function() {
            return places.popularPlaces;
        }

        places.displayPlaces = function(place) {
            addPlace(place);
            mapsService.createMarker(place, 'yellow');
        }

        places.getPlaceById = function(id) {
            return places.popularPlaces.filter(place => place.place_id === id);
        }

        return places;

    });
