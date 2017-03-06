'use strict';

const angular = require('angular');
const uiRouter = require('angular-ui-router');

import routes from './charlist.routes';

export class CharListComponent {
  constructor(Auth, $http, $state, $stateParams, Character){
    'ngInject';

    this.$http = $http;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.character = Character;
    this.getCurrentUser = Auth.getCurrentUserSync;
    this.getProfile = Character.getProfile;
    this.selectChar = Character.returnProfile;
    this.spellsArray0 = [{}];
    this.spellsArray1 = [{}];
    this.spellsArray2 = [{}];
    this.spellsArray3 = [{}];
    this.spellsArray4 = [{}];
    this.spellsArray5 = [{}];
    this.spellsArray6 = [{}];
    this.spellsArray7 = [{}];
    this.spellsArray8 = [{}];
    this.spellsArray9 = [{}];
  }

  $onInit(){
    // When user navigates to character profile
    var vm = this;
    if(this.$state.current.name == 'charprofile2'){
      this.getProfile(this.$stateParams.id, function(data) {
        vm.characterProfile = data;
        vm.savingThrowsData = vm.character.savingThrows(vm.characterProfile);
      });

      this.general = true;
      this.combat = false;
      this.skills = false;
      this.equip = false;
      this.spells = false;
      this.misc = false;
     }
  }

  goToCharProfile(data){
    this.$state.go('charprofile2', {id: data._id});
  }

  showGeneral(){
    this.general = true;
    this.combat = false;
    this.skills = false;
    this.equip = false;
    this.spells = false;
    this.misc = false;
  }

  showCombat(){
    this.general = false;
    this.combat = true;
    this.skills = false;
    this.equip = false;
    this.spells = false;
    this.misc = false;
  }

  showSkills(){
    this.general = false;
    this.combat = false;
    this.skills = true;
    this.equip = false;
    this.spells = false;
    this.misc = false;

    this.rollBonus = this.character.skillRoll(this.selectChar());
  }

  showEquip(){
    this.general = false;
    this.combat = false;
    this.skills = false;
    this.equip = true;
    this.spells = false;
    this.misc = false;
  }

  showSpells(){
    this.general = false;
    this.combat = false;
    this.skills = false;
    this.equip = false;
    this.spells = true;
    this.misc = false;

    var vm = this;
    var spellList;
    var spells = this.selectChar().spells;
    this.$http.get("assets/spells.json")
              .then(function(res){
                spellList = res.data;
                vm.spellsArray0 = findSpell(spellList, spells.lvl0);
                vm.spellsArray1 = findSpell(spellList, spells.lvl1);
                vm.spellsArray2 = findSpell(spellList, spells.lvl2);
                vm.spellsArray3 = findSpell(spellList, spells.lvl3);
                vm.spellsArray4 = findSpell(spellList, spells.lvl4);
                vm.spellsArray5 = findSpell(spellList, spells.lvl5);
                vm.spellsArray6 = findSpell(spellList, spells.lvl6);
                vm.spellsArray7 = findSpell(spellList, spells.lvl7);
                vm.spellsArray8 = findSpell(spellList, spells.lvl8);
                vm.spellsArray9 = findSpell(spellList, spells.lvl9);
              })
              .catch(function(err){
                return err;
              });

    function findSpell(spellList, spells){
      var mySpellsFiltered = [];
      for (var i = 0; i < spellList.length; i++) {
          for (var j = 0; j < spells.length; j++) {
              if (spellList[i].name === spells[j].name) {
                  mySpellsFiltered.push(spellList[i]);
              }
          }
      }
      return mySpellsFiltered;
    }

  }

  showMisc(){
    this.general = false;
    this.combat = false;
    this.skills = false;
    this.equip = false;
    this.spells = false;
    this.misc = true;
  }

}

export default angular.module('dndappApp.charlist', [uiRouter])
    .config(routes)
    .component('charlist', {
      template: require('./charlist.html'),
      controller: CharListComponent,
      controllerAs: 'charCtrl'
    })
    .component('charprofile', {
      template: require('./charprofile.html'),
      controller: CharListComponent,
      controllerAs: 'charCtrl'
    })
    .name;
