'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './usermain.routes';

export class UsermainComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
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
