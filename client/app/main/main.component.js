import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {

  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
  }
}

export default angular.module('dndappApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
