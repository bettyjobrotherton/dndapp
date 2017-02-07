'use strict';
const angular = require('angular');

export class exampleComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'World';
  }
}

export default angular.module('dndappApp.example', [])
  .component('example', {
    template: '<h1>Hello {{ $ctrl.message }}</h1>',
    bindings: { message: '<' },
    controller: exampleComponent
  })
  .name;
