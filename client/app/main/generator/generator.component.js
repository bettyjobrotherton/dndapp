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

  // continueChar(generate) {
  //   if(generate == 'race' && 'class'){
  //     this.$state.go('generator');
  //   }
  // }

  selectRace(race) {
    this.currentRace = race;
  }

  selectClass(build) {
    this.currentClass = build;
  }

  saveRace(){
    var newCharacter;
    var race = this.currentRace;
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
        //subrace: **This needs to be added to the JSON file**
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
  // .component('generator2', {
  //   template: require('./generator2.html'),
  //   controller:GeneratorController,
  //   controllerAs: 'genCtrl'
  // })
  .name;
