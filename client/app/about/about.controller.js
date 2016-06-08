'use strict';
(function(){

class AboutComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('exploreAroundApp')
  .component('about', {
    templateUrl: 'app/about/about.html',
    controller: AboutComponent
  });

})();
