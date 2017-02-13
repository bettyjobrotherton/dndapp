'use strict';
const angular = require('angular');

/*@ngInject*/
export function UserMainController() {
  this.message = 'Hello';
}

export default angular.module('dndappApp.usermain', [])
  .controller('UserMainController', UserMainController)
  .name;
