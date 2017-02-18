'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './usermain.routes';

export class UsermainComponent {
  /*@ngInject*/
  constructor(Auth, $http) {
    'ngInject';

    // var scope = this;
    // scope.currentUser;
    //
    // Auth.getCurrentUser().then(function(res){
    //   // console.log(res);
    //   scope.currentUser = res;
    //   // console.log(scope.currentUser);
    // });
    this.getCurrentUser = Auth.getCurrentUserSync;
    this.$http = $http;
  }

 $onInit(){
 }

}

export default angular.module('dndappApp.usermain', [uiRouter])
  .config(routes)
  .component('usermain', {
    template: require('./usermain.html'),
    controller: UsermainComponent,
    controllerAs: 'usermainCtrl'
  })
  .name;
