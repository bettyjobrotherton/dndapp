'use strict';

const angular = require('angular');
const uiRouter = require('angular-ui-router');

import routes from './charlist.routes';

export class CharListComponent {

  constructor(Auth, $http, $state){
    'ngInject';

    this.$http = $http;
    this.$state = $state;
    this.getCurrentUser = Auth.getCurrentUserSync;
  }

  $onInit(){
      // console.log(this.getCurrentUser());
      // this.getCurrentUser().$promise.then(data => {
        // this.user = data;
        // this.characters = data.characters;
        // console.table(data.characters);
      // });

  }

  goToCharProfile(data){
    this.profile = data;
    this.$state.go('charprofile');
    console.log(this.profile);
  }


}

export default angular.module('dndappApp.charlist', [uiRouter])
    .config(routes)
    .component('charlist', {
      template: require('./charlist.html'),
      controller: CharListComponent,
      controllerAs: 'charCtrl'
    })
    .component('charprofile', {
      template: require('./charprofile.html'),
      controller: CharListComponent,
      controllerAs: 'charCtrl'
    })
    .name;
