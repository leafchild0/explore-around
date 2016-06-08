'use strict';
(function(){

class SavedComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('exploreAroundApp')
  .component('saved', {
    templateUrl: 'app/saved/saved.html',
    controller: SavedComponent
  });

})();
