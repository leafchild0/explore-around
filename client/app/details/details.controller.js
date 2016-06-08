'use strict';

(function(){

class DetailsComponent {
  constructor() {
    this.titler = {};
    this.place.title = 'Odessa National Theater';
  }
}
angular.module('exploreAroundApp')
  .component('details', {
    templateUrl: 'app/details/details.html'
  });

})();
