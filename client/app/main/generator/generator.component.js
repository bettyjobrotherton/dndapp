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
    var vm = this;
    this.$http.get("assets/races.json")
              .then(res => {
                vm.raceList = res.data;
                vm.currentRace = res.data[0];
              })
              .catch(err => {
                console.log(err);
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

  selectClass(build) {
    this.currentClass = build;
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
