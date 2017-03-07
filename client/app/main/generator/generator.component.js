import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './generator.routes';

export class GeneratorController {

  /*@ngInject*/
  constructor($http, $state, Character) {
    this.$http = $http;
    this.$state = $state;
    this.createChar = Character.createChar;
    this.first = Character.firstOption;
  }

  $onInit() {
    var vm = this;
    this.$http.get("assets/races.json")
              .then(res => {
                vm.raceList = res.data;
                vm.currentRace = res.data[0];
              })
              .catch(err => {
                return err;
              });

    this.$http.get("assets/classes.json")
              .then(res => {
                vm.classList = res.data;
                vm.currentClass = res.data[0];
              })
              .catch(err => {
                return err;
              });


  }

  selectRace(race) {
    this.currentRace = race;
  }

  selectClass(build) {
    this.currentClass = build;
  }

  saveRace(race){
    console.log(this.first());

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
