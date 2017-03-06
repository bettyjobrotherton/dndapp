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

  this.classList = [{
    name: 'Barbarian',
    desc: 'Quick Build: Highest ability scores in Strength and Constitution. Outlander background',
    icon: './assets/images/icons/Barbarian.png',
  },
  {
    name: 'Bard',
    desc: '',
    icon: './assets/images/icons/Bard.png',
  },
  {
    name: 'Cleric',
    desc: '',
    icon: './assets/images/icons/Cleric.png',
  },
  {
    name: 'Druid',
    desc: '',
    icon: './assets/images/icons/Druid.png',
  },
  {
    name: 'Fighter',
    desc: '',
    icon: './assets/images/icons/Fighter.png',
  },
  {
    name: 'Monk',
    desc: '',
    icon: './assets/images/icons/Monk.png',
  },
  {
    name: 'Paladin',
    desc: '',
    icon: './assets/images/icons/Paladin.png',
  },
  {
    name: 'Ranger',
    desc: '',
    icon: './assets/images/icons/Ranger.png',
  },
  {
    name: 'Rogue',
    desc: '',
    icon: './assets/images/icons/Rogue.png',
  },{
    name: 'Sorcerer',
    desc: '',
    icon: './assets/images/icons/Sorcerer.png',
  },
  {
    name: 'Warlock',
    desc: '',
    icon: './assets/images/icons/Warlock.png',
  },{
    name: 'Wizard',
    desc: '',
    icon: './assets/images/icons/Wizard.png',
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
