import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './generator.routes';

export class GeneratorController {

  /*@ngInject*/
  constructor($http, $state) {
    this.$http = $http;
    this.$state = $state;
  }

  $onInit() {
    this.raceList = [{
      name: 'Dragonborn',
      desc: 'filler',
      icon: './assets/images/icons/Dragonborn.png'
    },
    {
      name: 'Dwarf',
      desc: 'filler',
      icon: './assets/images/icons/Dwarf.png'

    },
    {
      name: 'Elf',
      desc: 'filler',
      icon: './assets/images/icons/Elf.png'
    },
    {
      name: 'Gnome',
      desc: 'filler',
      icon: './assets/images/icons/Gnome.png'
    },
    {
      name: 'Half-Elf',
      desc: 'filler',
      icon: './assets/images/icons/Half Elf.png'
    },
    {
      name: 'Half-orc',
      desc: 'some filler text',
      icon: './assets/images/icons/Half Orc.png'
    },
    {
      name: 'Halfling',
      desc: 'filler',
      icon: './assets/images/icons/Halfling.png'
    },
    {
      name: 'Human',
      desc: 'filler',
      icon: './assets/images/icons/Human.png'
    },
    {
      name: 'Tiefling',
      desc: 'filler',
      icon: './assets/images/icons/Tiefling.png'
    },
  ];
  }

  createChar(firstOpt) {
    if(firstOpt == 'race'){
      this.$state.go('generatorRace');
    }
    if(firstOpt == 'class'){
      this.$state.go('generatorClass');
    }
  }

  selectRace(race) {
    this.currentRace = race;
  }
}

export default angular.module('dndappApp.generator', [uiRouter])
  .config(routing)
  .component('generator', {
    template: require('./generator.html'),
    controller: GeneratorController,
    controllerAs: 'genCtrl'
  })
  .component('pickclass', {
    template: require('./pickclass.html'),
    controller: GeneratorController,
    controllerAs: 'genCtrl'
  })
  .component('pickrace', {
    template: require('./pickrace.html'),
    controller: GeneratorController,
    controllerAs: 'genCtrl'
  })
  .name;
