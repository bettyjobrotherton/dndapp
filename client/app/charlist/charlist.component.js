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
