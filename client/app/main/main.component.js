import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {

  /*@ngInject*/
  constructor($http, Auth) {
    this.$http = $http;
    this.getProfile = Auth.getProfile;
  }

  $onInit(){
    // console.log();
  }
}

MainController.$inject = ['$http', 'Auth'];

export default angular.module('dndappApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController,
    controllerAs: 'ctrl'
  })
  .component('verifying', {
    template: require('./verifying.html'),
    controller: MainController
  })
  .name;
