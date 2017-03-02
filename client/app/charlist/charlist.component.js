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

  }
  $onInit(){
    // When user navigates to character profile

    if(this.$state.current.name == 'charprofile2'){
      this.getProfile(this.$stateParams.id);
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

    var spellList;
    var spells = this.selectChar().spells;

    this.$http.get("assets/spells.json")
              .then(function(res){
                spellList = res.data;
                var spellsArray = findSpell(spellList, spells.lvl0);
                console.log(spellsArray);
              })
              .catch(function(err){
                console.log(err);
              });

      // function getSpellNames(){
      //   var i;
      //   for(i = 0; i < 10; i++){
      //     return _(spellList).keyBy('name').at(spells.lvl0[i].name).value();
      //   }
      //   return;
      // }
      // console.log(getSpellNames);

    function findSpell(spellList, spells){
      var mySpellsFiltered = [];
      for (var i = 0; i < spellList.length; i++) {
          for (var j = 0; j < spells.length; j++) {
              if (spellList[i].name === spells[j].name) {
                  mySpellsFiltered.push(spellList[i]);
              }
          }
      }
      return mySpellsFiltered;      }

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
