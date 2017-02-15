'use strict';

const angular = require('angular');
const uiRouter = require('angular-ui-router');

import routes from './charlist.routes';

export class CharListComponent {

  constrctor(Auth, $http){
    'ngInject';

    this.$http = $http;
    this.getCurrentUser = Auth.getCurrentUserSync;
    var characters;
  }

  $onInit(){
    // characters = this.currentUser.characters;
    console.log(this.getCurrentUser());
  }

}

export default angular.module('dndappApp.charlist', [uiRouter])
    .config(routes)
    .component('charlist', {
      template: require('./charlist.html'),
      controller: CharListComponent,
    })
    .name;
