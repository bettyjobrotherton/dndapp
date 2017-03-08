import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './generator.routes';

export class GeneratorController {

  /*@ngInject*/
  constructor($http, $state, Character, $window) {
    this.$http = $http;
    this.$state = $state;
    this.createChar = Character.createChar;
    this.first = Character.firstOption;
    this.localStorage = $window.localStorage;
  }

  $onInit() {
    var vm = this;

    this.raceMain = true;
    this.classMain = true;

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

  continueChar(generate) {
    if(generate == 'race' && 'class'){
      this.$state.go('generator');
    }
  }

  selectRace(race) {
    this.currentRace = race;
  }

  selectMainRace(){
    this.selectedRace = this.currentRace;
    this.raceMain = false;
    this.currentSubrace = this.selectedRace.subraces[0];
  }

  goBackToRace(){
    this.raceMain = true;
  }

  selectSubrace(subrace){
    this.currentSubrace = subrace;
  }

  selectClass(build) {
    this.currentClass = build;
  }

  saveRace(){
    console.log(this.currentRace);
    console.log(this.currentSubrace);
    var newCharacter;
    var race = this.currentRace;
    var subrace = this.currentSubrace;
    var raceInfo = {
      bio: {
        languages: race.traits.lang,
        appearance: {
          size: race.traits.size
        }
      },
      general: {
        movement: race.traits.baseSpd
      },
      race: {
        main: race.name,
        subrace: subrace.name
      }
    };
    if(this.first() == 'race'){
      newCharacter = raceInfo;
      this.localStorage['character-in-progress'] = newCharacter;
    } else {
      newCharacter = this.localStorage['character-in-progress'];
      newCharacter.push(raceInfo);
      this.localStorage['character-in-progress'] = newCharacter;
    }
  }

  saveClass(){
    // console.log(this.first());
    var newCharacter;
    var currentClass = this.currentClass;
    var classInfo = {
      //This is all greyed out because most of the needed info is not yet in the JSON file
      // class: {
      //   main: currentClass.name,
      //   archetype:
      // },
      // combt: {
      //   hitDie:
      //   specialAttacks:
      //   specialDefense:
      // }
    };
    if(this.first() == 'class'){
      newCharacter = classInfo;
      this.localStorage['character-in-progress'] = newCharacter;
    } else {
      newCharacter = this.localStorage['character-in-progress'];
      newCharacter.push(classInfo);
      this.localStorage['character-in-progress'] = newCharacter;
    }
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
  .component('generatortwo', {
    template: require('./generatortwo.html'),
    controller: GeneratorController,
    controllerAs: 'genCtrl'
  })
  .component('pickbackground', {
    template: require('./pickbackground.html'),
    controller: GeneratorController,
    controllerAs: 'genCtrl'
  })
  .component('pickalignment', {
    template: require('./pickalignment.html'),
    controller: GeneratorController,
    controllerAs: 'genCtrl'
  })
  .component('generatorthree', {
    template: require('./generatorthree.html'),
    controller: GeneratorController,
    controllerAs: 'genCtrl'
  })
  .component('pickspells', {
    template: require('./pickspells.html'),
    controller: GeneratorController,
    controllerAs: 'genCtrl'
  })
  .component('pickweapons', {
    template: require('./pickweapons.html'),
    controller: GeneratorController,
    controllerAs: 'genCtrl'
  })
  .component('pickequip', {
    template: require('./pickequip.html'),
    controller: GeneratorController,
    controllerAs: 'genCtrl'
  })
  .component('pickstats', {
    template: require('./pickstats.html'),
    controller: GeneratorController,
    controllerAs: 'genCtrl'
  })
  .name;
