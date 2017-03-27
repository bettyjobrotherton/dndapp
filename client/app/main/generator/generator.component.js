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
    if(this.$state.current.name == 'generatorClass'){
      this.classMain = true;

      this.$http.get("assets/classes.json")
                .then(res => {
                  vm.classList = res.data;
                  vm.currentClass = res.data[0];
                })
                .catch(err => {
                  return err;
                });
    } else if(this.$state.current.name == 'generatorRace'){
      this.raceMain = true;

      this.$http.get("assets/races.json")
          .then(res => {
              vm.raceList = res.data;
              vm.currentRace = res.data[0];
          })
          .catch(err => {
              return err;
          });
    } else if(this.$state.current.name == 'generatorBackground'){
      this.showBackgroundVariant = false;

      this.$http.get('assets/backgrounds.json')
                .then(res => {
                  vm.backgroundList = res.data;
                  vm.currentBackground = res.data[0];
                })
                .catch(err => {
                  return err;
                });
    } else if(this.$state.current.name == 'backgrounddetails'){
      this.currentBackground = JSON.parse(this.localStorage['selected-background']);
      this.display1 = false;
      this.display2 = false;
      this.display3 = false;
      this.display4 = false;
      this.display5 = false;
      this.writeSpecialTrait = false;
      this.writeTrait = false;
      this.writeIdeal = false;
      this.writeBond = false;
      this.writeFlaw = false;
    } else if(this.$state.current.name == 'generatorAlignment'){
      this.$http.get('assets/alignment.json')
                .then(res => {
                  vm.alignList = res.data;
                  vm.currentAlign = res.data[0];
                })
                .catch(err => {
                  return err;
                });
    }
  }

  continueChar(generate) {
    if(generate == 'race' && 'class'){
      this.$state.go('generator');
    }
  }

// Start code for pick race --
  selectRace(race) {
    this.currentRace = race;
  }

  selectMainRace(){
    this.selectedRace = this.currentRace;
    if(this.selectedRace.name == 'Half-Elf' || this.selectedRace.name == 'Half-Orc' || this.selectedRace.name == 'Tiefling'){
      this.saveRace();
    }
    else {
      this.raceMain = false;
      this.currentSubrace = this.selectedRace.subraces[0];
    }
  }

  selectSubrace(subrace){
    this.currentSubrace = subrace;
  }

  goBackToRace(){
    this.raceMain = true;
  }

  saveRace(){
    var newCharacter;
    var race = this.currentRace;
    var raceInfo;
    if(race.name == 'Half-Elf' || race.name == 'Half-Orc' || race.name == 'Tiefling'){
      raceInfo = {
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
          main: race.name
        }
      };
    }
    else {
      var subrace = this.currentSubrace;
      raceInfo = {
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
    }
    if(this.first() == 'race'){
      newCharacter = raceInfo;
      this.localStorage.setItem('character-in-progress', JSON.stringify(newCharacter));
      this.$state.go('generatorClass');
    } else {
      newCharacter = JSON.parse(this.localStorage['character-in-progress']);
      newCharacter.bio = raceInfo.bio;
      newCharacter.general = raceInfo.general;
      newCharacter.race = raceInfo.race;
      this.localStorage.setItem('character-in-progress', JSON.stringify(newCharacter));
      this.$state.go('generatorTwo');
    }
  }
// -- End code for pick race

// Start code for pick class --
  selectClass(build) {
    this.currentClass = build;
  }

  selectMainClass(){
    this.selectedClass = this.currentClass;
    this.classMain = false;
    this.currentArchetype = this.selectedClass.archetype.types[0];
  }

  selectArchetype(archetype){
    this.currentArchetype = archetype;
  }

  goBackToClass(){
    this.classMain = true;
  }
// -- End code for pick class

// Start code for pick alignment --
  selectAlign(align) {
    this.currentAlign = align;
  }

  saveClass(){
    var newCharacter;
    var currentClass = this.currentClass;
    var archetype = this.currentArchetype;
    var classInfo = {
      class: {
        main: currentClass.name,
        archetype: archetype.name
      },
      combat: {
        hitDie: currentClass.combat.hitDie,
      }
    };
    if(this.first() == 'class'){
      newCharacter = classInfo;
      this.localStorage.setItem('character-in-progress', JSON.stringify(newCharacter));
      this.$state.go('generatorRace');
    } else {
      newCharacter = JSON.parse(this.localStorage['character-in-progress']);
      newCharacter.class = classInfo.class;
      newCharacter.combat = classInfo.combat;
      this.localStorage.setItem('character-in-progress', JSON.stringify(newCharacter));
      this.$state.go('generatorTwo');
    }
  }

  saveAlign(){
    var newCharacter;
    var currentAlign = this.currentAlign;
    var alignInfo = currentAlign.name;
    if(this.first() =='align'){
      newCharacter = JSON.parse(this.localStorage['character-in-progress']);
      newCharacter.general.alignment = alignInfo
      this.localStorage.setItem('character-in-progress', JSON.stringify(newCharacter));
      this.$state.go('generatorBackground');
    } else {
      newCharacter = JSON.parse(this.localStorage['character-in-progress']);
      newCharacter.general.alignment = alignInfo
      this.localStorage.setItem('character-in-progress', JSON.stringify(newCharacter));
      this.$state.go('generatorThree');
    }
  }
// -- End code for pick alignment

// Start code for pick background --
  pickBackground(){
    var background = this.currentBackground;
    this.localStorage.setItem('selected-background', JSON.stringify(background));
    this.$state.go('backgrounddetails');
  }

  selectBackground(background) {
    this.currentBackground = background;
  }

  backgroundVariant(){
    if(this.showBackgroundVariant){
      this.showBackgroundVariant = false;
    } else {
      this.showBackgroundVariant = true;
    }
  }

  specialTraitButton(){
    if(this.display1){
      this.display1 = false;
    } else {
      this.display1 = true;
    }
  }

  createOwnSpecialTrait(){
    if(this.writeSpecialTrait){
      this.writeSpecialTrait = false;
    } else {
      this.writeSpecialTrait = true;
    }
  }

  traitsButton(){
    if(this.display2){
      this.display2 = false;
    } else {
      this.display2 = true;
    }
  }

  idealsButton(){
    if(this.display3){
      this.display3 = false;
    } else {
      this.display3 = true;
    }
  }

  bondsButton(){
    if(this.display4){
      this.display4 = false;
    } else {
      this.display4 = true;
    }
  }

  flawsButton(){
    if(this.display5){
      this.display5 = false;
    } else {
      this.display5 = true;
    }
  }

saveBackground(){
  var newCharacter;
  var currentBackground = this.currentBackground;
  var backgroundInfo = {
      background:{
        main: currentBackground.name
      }
  };
  if(this.first() =='background'){
    newcharacter = alignInfo;
    this.localStorage.setItem('character-in-progress', JSON.stringify(newCharacter));
    this.$state.go('generatorAlignment');
  } else {
    newCharacter = JSON.parse(this.localStorage['character-in-progress']);
    newCharacter.background = backgroundInfo.background;
    this.localStorage.setItem('character-in-progress', JSON.stringify(newCharacter));
    this.$state.go('generatorThree');
  }
}
// -- End code for pick background

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
  .component('backgrounddetails', {
    template: require('./backgrounddetails.html'),
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
