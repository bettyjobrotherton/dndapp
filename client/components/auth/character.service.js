'use strict';

export function CharacterService($location, $http) {
  'ngInject';

  var selectChar;

  var Character = {
    getProfile(data){
      $http.get('api/characters/' + data)
           .then(res => {
             selectChar = res.data;
             return selectChar;
           })
           .catch(err => {
             return err;
           });
    },

    returnProfile(){
      return selectChar;
    },

    calculateModifier(as){
      var modifier;
      if( as <=1 ){
        modifier = -5;
      } else if( as <= 3 && as > 1 ){
        modifier = -4;
      } else if( as <= 5 && as > 3 ){
        modifier = -3;
      } else if( as <= 7 && as > 5 ){
        modifier = -2;
      } else if( as <= 9 && as > 7 ){
        modifier = -1;
      } else if( as <= 11 && as > 9 ){
	      modifier = 0;
      } else if( as <= 13 && as > 11 ){
	      modifier = 1;
      } else if( as <= 15 && as > 13 ){
	      modifier = 2;
      } else if( as <= 17 && as > 15 ){
	      modifier = 3;
      } else if( as <= 19 && as > 17 ){
	      modifier = 4;
      } else if( as <= 21 && as > 19 ){
	      modifier = 5;
      } else if( as <= 23 && as > 21 ){
        modifier = 6;
      } else if( as <= 25 && as > 23 ){
        modifier = 7;
      } else if( as <= 27 && as > 25 ){
	      modifier = 8;
      } else if( as <= 29 && as > 27 ){
	      modifier = 9;
      } else {
        modifier = 10;
      }
      return modifier;
    },

    calculateSpeed(data){

    },

    savingThrows(data){
      var savingThrow = {
        str: this.calculateModifier(data.abilityScores.str),
        dex: this.calculateModifier(data.abilityScores.dex),
        con: this.calculateModifier(data.abilityScores.con),
        int: this.calculateModifier(data.abilityScores.int),
        wis: this.calculateModifier(data.abilityScores.wis),
        cha: this.calculateModifier(data.abilityScores.cha),
        classCode: ''
      };
      if(data.class.main == 'Barbarian' || data.class.main == 'Fighter'){
        savingThrow = {
          str: savingThrow.str + this.proficiencyBonus(data.general.level),
          dex: savingThrow.dex,
          con: savingThrow.con + this.proficiencyBonus(data.general.level),
          int: savingThrow.int,
          wis: savingThrow.wis,
          cha: savingThrow.cha,
          classCode: 'fighters'
        };
      } else if(data.class.main == 'Bard'){
        savingThrow = {
          str: savingThrow.str,
          dex: savingThrow.dex + this.proficiencyBonus(data.general.level),
          con: savingThrow.con,
          int: savingThrow.int,
          wis: savingThrow.wis,
          cha: savingThrow.cha + this.proficiencyBonus(data.general.level),
          classCode: 'musicians'
        };
      } else if(data.class.main == 'Cleric' || data.class.main == 'Paladin' || data.class.main == 'Warlock'){
        savingThrow = {
          str: savingThrow.str,
          dex: savingThrow.dex,
          con: savingThrow.con,
          int: savingThrow.int,
          wis: savingThrow.wis + this.proficiencyBonus(data.general.level),
          cha: savingThrow.cha + this.proficiencyBonus(data.general.level),
          classCode: 'divine'
        };
      } else if(data.class.main == 'Druid' || data.class.main == 'Wizard'){
        savingThrow = {
          str: savingThrow.str,
          dex: savingThrow.dex,
          con: savingThrow.con,
          int: savingThrow.int + this.proficiencyBonus(data.general.level),
          wis: savingThrow.wis + this.proficiencyBonus(data.general.level),
          cha: savingThrow.cha,
          classCode: 'powerful'
        };
      } else if(data.class.main == 'Monk' || data.class.main == 'Ranger'){
        savingThrow = {
          str: savingThrow.str + this.proficiencyBonus(data.general.level),
          dex: savingThrow.dex + this.proficiencyBonus(data.general.level),
          con: savingThrow.con,
          int: savingThrow.int,
          wis: savingThrow.wis,
          cha: savingThrow.cha,
          classCode: 'quick'
        };
      } else if(data.class.main == 'Rogue'){
        savingThrow = {
          str: savingThrow.str,
          dex: savingThrow.dex + this.proficiencyBonus(data.general.level),
          con: savingThrow.con,
          int: savingThrow.int + this.proficiencyBonus(data.general.level),
          wis: savingThrow.wis,
          cha: savingThrow.cha,
          classCode: 'sneaky'
        };
      } else { //(data.class.main == 'Sorcerer')
        savingThrow = {
          str: savingThrow.str,
          dex: savingThrow.dex,
          con: savingThrow.con + this.proficiencyBonus(data.general.level),
          int: savingThrow.int,
          wis: savingThrow.wis,
          cha: savingThrow.cha + this.proficiencyBonus(data.general.level),
          classCode: 'inherent'
        };
      }
      return savingThrow;
    },

    proficiencyBonus(level){
      var bonus;
      if(level <= 4){
        bonus = 2;
      } else if(level <= 8 && level > 4){
        bonus = 3;
      } else if(level <= 12 && level > 8){
        bonus = 4;
      } else if(level <= 16 && level > 12){
        bonus = 5;
      } else {
        bonus = 6;
      }
      return bonus;
    }

  };

  return Character;
}
