'use strict';

const angular = require('angular');
const uiRouter = require('angular-ui-router');

import routes from './charlist.routes';

export class CharListComponent {

  constructor(Auth, $http, $state, $stateParams, Character){
    'ngInject';

    this.$http = $http;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.getCurrentUser = Auth.getCurrentUserSync;
    this.getProfile = Character.getProfile;
    this.selectChar = Character.returnProfile;
  }

  $onInit(){
    if(this.$state.current.name == 'charprofile2'){
      this.getProfile(this.$stateParams.id)

     }
  }

  goToCharProfile(data){
    this.$state.go('charprofile2', {id: data._id});
    console.log(this.$stateParams);
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
