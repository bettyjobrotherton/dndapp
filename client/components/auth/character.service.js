'use strict';

export function CharacterService($location, $http, $window) {
  'ngInject';

  var selectChar;
  var firstSelection;

  var Character = {
    getProfile(data, cb){
      $http.get('api/characters/' + data)
           .then(res => {
             selectChar = res.data;
             cb(selectChar);
             return selectChar;
           })
           .catch(err => {
             return err;
           });
    },

    returnProfile(){
      return selectChar;
    },

    createChar(firstOpt){
      if(firstOpt == 'race'){
        firstSelection = 'race';
        $window.localStorage.setItem('first-selection', JSON.stringify(firstSelection));
        this.$state.go('generatorRace');
      } else if(firstOpt == 'class'){
        firstSelection = 'class';
        $window.localStorage.setItem('first-selection', JSON.stringify(firstSelection));
        this.$state.go('generatorClass');
      } else if(firstOpt == 'generatortwo'){
        firstSelection = 'generatortwo';
        $window.localStorage.setItem('first-selection', JSON.stringify(firstSelection));
        this.$state.go('generatorTwo');
      } else if(firstOpt == 'background'){
        firstSelection = 'background';
        $window.localStorage.setItem('first-selection', JSON.stringify(firstSelection));
        this.$state.go('generatorBackground');
      } else if(firstOpt == 'alignment'){
        firstSelection = 'alignment';
        $window.localStorage.setItem('first-selection', JSON.stringify(firstSelection));
        this.$state.go('generatorAlignment');
      } else if(firstOpt == 'generatorthree'){
        firstSelection = 'generatorthree';
        $window.localStorage.setItem('first-selection', JSON.stringify(firstSelection));
        this.$state.go('generatorThree');
      } else if(firstOpt == 'spells'){
        firstSelection = 'spells';
        $window.localStorage.setItem('first-selection', JSON.stringify(firstSelection));
        this.$state.go('generatorSpells');
      } else if(firstOpt == 'weapons'){
        firstSelection = 'weapons';
        $window.localStorage.setItem('first-selection', JSON.stringify(firstSelection));
        this.$state.go('generatorWeapons');
      } else if(firstOpt == 'armor'){
        firstSelection = 'armor';
        $window.localStorage.setItem('first-selection', JSON.stringify(firstSelection));
        this.$state.go('generatorArmor');
      } else if(firstOpt == 'equip'){
        firstSelection = 'equip';
        $window.localStorage.setItem('first-selection', JSON.stringify(firstSelection));
        this.$state.go('generatorEquip');
      } else if(firstOpt == 'stats'){
        firstSelection = 'stats';
        $window.localStorage.setItem('first-selection', JSON.stringify(firstSelection));
        this.$state.go('generatorStats');
      }
    },

    firstOption(){
      firstSelection = JSON.parse($window.localStorage['first-selection']);
      return firstSelection;
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

    calculatePassiveRoll(character, skill){
      var level = character.general.level;
      var profBonus = this.proficiencyBonus(level);
      var abilityScoreMod;
      var skillProf;
      var skillProfMod;
      var passiveRoll;

      if(skill == "Athletics"){
        abilityScoreMod = this.calculateModifier(character.abilityScores.str);
      } else if(skill == "Acrobatics" || skill == "Sleight of Hand" || skill == "Stealth"){
        abilityScoreMod = this.calculateModifier(character.abilityScores.dex);
      } else if(skill == "Arcana" || skill == "History" || skill == "Investigation" || skill == "Nature" || skill == "Religion"){
        abilityScoreMod = this.calculateModifier(character.abilityScores.int);
      } else if(skill == "Animal Handling" || skill == "Insight" || skill == "Medicine" || skill == "Perception" || skill == "Survival"){
        abilityScoreMod = this.calculateModifier(character.abilityScores.wis);
      } else if(skill == "Deception" || skill == "Intimidation" || skill == "Performance" || skill == "Persuasion"){
        abilityScoreMod = this.calculateModifier(character.abilityScores.cha);
      }

      for(var i = 0; i < character.skills.prof.length; i++){
        if(character.skills.prof[i].name == skill){
          skillProf = character.skills.prof[i].score;
        }
      }

      skillProfMod = profBonus * skillProf;
      passiveRoll = skillProfMod + abilityScoreMod + 10;
      return passiveRoll;
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
    },

    skillRoll(data){
      var rollBonus = {
        acrobatics: this.proficiencyBonus(data.general.level) * data.skills.prof[0].score + this.calculateModifier(data.abilityScores.dex),
        animalHandling: this.proficiencyBonus(data.general.level) * data.skills.prof[1].score + this.calculateModifier(data.abilityScores.wis),
        arcana: this.proficiencyBonus(data.general.level) * data.skills.prof[2].score + this.calculateModifier(data.abilityScores.int),
        athletics: this.proficiencyBonus(data.general.level) * data.skills.prof[3].score + this.calculateModifier(data.abilityScores.str),
        deception: this.proficiencyBonus(data.general.level) * data.skills.prof[4].score + this.calculateModifier(data.abilityScores.cha),
        history: this.proficiencyBonus(data.general.level) * data.skills.prof[5].score + this.calculateModifier(data.abilityScores.int),
        insight: this.proficiencyBonus(data.general.level) * data.skills.prof[6].score + this.calculateModifier(data.abilityScores.wis),
        intimidation: this.proficiencyBonus(data.general.level) * data.skills.prof[7].score + this.calculateModifier(data.abilityScores.cha),
        investigation: this.proficiencyBonus(data.general.level) * data.skills.prof[8].score + this.calculateModifier(data.abilityScores.int),
        medicine: this.proficiencyBonus(data.general.level) * data.skills.prof[9].score + this.calculateModifier(data.abilityScores.wis),
        nature: this.proficiencyBonus(data.general.level) * data.skills.prof[10].score + this.calculateModifier(data.abilityScores.int),
        perception: this.proficiencyBonus(data.general.level) * data.skills.prof[11].score + this.calculateModifier(data.abilityScores.wis),
        perform: this.proficiencyBonus(data.general.level) * data.skills.prof[12].score + this.calculateModifier(data.abilityScores.cha),
        persuasion: this.proficiencyBonus(data.general.level) * data.skills.prof[13].score + this.calculateModifier(data.abilityScores.cha),
        religion: this.proficiencyBonus(data.general.level) * data.skills.prof[14].score + this.calculateModifier(data.abilityScores.int),
        sleightOfHand: this.proficiencyBonus(data.general.level) * data.skills.prof[15].score + this.calculateModifier(data.abilityScores.dex),
        stealth:this.proficiencyBonus(data.general.level) * data.skills.prof[16].score + this.calculateModifier(data.abilityScores.dex),
        survival: this.proficiencyBonus(data.general.level) * data.skills.prof[17].score + this.calculateModifier(data.abilityScores.wis)
      };
      return rollBonus;
    },

    allowedNumberOfSpells(character){
      if(character.class.main == 'Bard' || character.class.main == 'Druid'){
        if(character.general.level == 1){
          character.allowed = {
            cantrip: 2,
            level1: 2,
            level2: 0,
            level3: 0,
            level4: 0,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 2){
          character.allowed = {
            cantrip: 2,
            level1: 3,
            level2: 0,
            level3: 0,
            level4: 0,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
          };
        } else if(character.general.level == 3){
          character.allowed = {
            cantrip: 2,
            level1: 4,
            level2: 2,
            level3: 0,
            level4: 0,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
          };
        } else if(character.general.level == 4){
          character.allowed = {
            cantrip: 3,
            level1: 4,
            level2: 3,
            level3: 0,
            level4: 0,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
          };
        } else if(character.general.level == 5){
          character.allowed = {
            cantrip: 3,
            level1: 4,
            level2: 3,
            level3: 2,
            level4: 0,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
          };
        } else if(character.general.level == 6){
          character.allowed = {
            cantrip: 3,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 0,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
          };
        } else if(character.general.level == 7){
          character.allowed = {
            cantrip: 3,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 1,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
          };
        } else if(character.general.level == 8){
          character.allowed = {
            cantrip: 3,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 2,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
          };
        } else if(character.general.level == 9){
          character.allowed = {
            cantrip: 3,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 3,
            level5: 1,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
          };
        } else if(character.general.level == 10){
          character.allowed = {
            cantrip: 4,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 3,
            level5: 2,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
          };
        } else if(character.general.level == 11 || character.general.level == 12){
          character.allowed = {
            cantrip: 4,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 3,
            level5: 2,
            level6: 1,
            level7: 0,
            level8: 0,
            level9: 0
          };
        } else if(character.general.level == 13 || character.general.level == 14){
          character.allowed = {
            cantrip: 4,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 3,
            level5: 2,
            level6: 1,
            level7: 1,
            level8: 0,
            level9: 0
          };
        } else if(character.general.level == 15 || character.general.level == 16){
          character.allowed = {
            cantrip: 4,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 3,
            level5: 2,
            level6: 1,
            level7: 1,
            level8: 1,
            level9: 0
          };
        } else if(character.general.level == 17){
          character.allowed = {
            cantrip: 4,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 3,
            level5: 2,
            level6: 1,
            level7: 1,
            level8: 1,
            level9: 1
          };
        } else if(character.general.level == 18){
          character.allowed = {
            cantrip: 4,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 3,
            level5: 3,
            level6: 1,
            level7: 1,
            level8: 1,
            level9: 1
          };
        } else if(character.general.level == 19){
          character.allowed = {
            cantrip: 4,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 3,
            level5: 3,
            level6: 2,
            level7: 1,
            level8: 1,
            level9: 1
          };
        } else if(character.general.level == 20){
          character.allowed = {
            cantrip: 4,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 3,
            level5: 3,
            level6: 2,
            level7: 2,
            level8: 1,
            level9: 1
          };
        }
      } else if(character.class.main == 'Cleric' || character.class.main == 'Wizard'){
        if(character.general.level == 1){
          character.allowed = {
            cantrip: 3,
            level1: 2,
            level2: 0,
            level3: 0,
            level4: 0,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 2){
          character.allowed = {
            cantrip: 3,
            level1: 3,
            level2: 0,
            level3: 0,
            level4: 0,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 3){
          character.allowed = {
            cantrip: 3,
            level1: 4,
            level2: 2,
            level3: 0,
            level4: 0,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 4){
          character.allowed = {
            cantrip: 4,
            level1: 4,
            level2: 3,
            level3: 0,
            level4: 0,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 5){
          character.allowed = {
            cantrip: 4,
            level1: 4,
            level2: 3,
            level3: 2,
            level4: 0,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 6){
          character.allowed = {
            cantrip: 4,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 0,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 7){
          character.allowed = {
            cantrip: 4,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 1,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 8){
          character.allowed = {
            cantrip: 4,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 2,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 9){
          character.allowed = {
            cantrip: 4,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 3,
            level5: 1,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 10){
          character.allowed = {
            cantrip: 5,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 3,
            level5: 2,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 11 || character.general.level == 12){
          character.allowed = {
            cantrip: 5,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 3,
            level5: 2,
            level6: 1,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 13 || character.general.level == 14){
          character.allowed = {
            cantrip: 5,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 3,
            level5: 2,
            level6: 1,
            level7: 1,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 15 || character.general.level == 16){
          character.allowed = {
            cantrip: 5,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 3,
            level5: 2,
            level6: 1,
            level7: 1,
            level8: 1,
            level9: 0
            };
        } else if(character.general.level == 17){
          character.allowed = {
            cantrip: 5,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 3,
            level5: 2,
            level6: 1,
            level7: 1,
            level8: 1,
            level9: 1
            };
        } else if(character.general.level == 18){
          character.allowed = {
            cantrip: 5,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 3,
            level5: 3,
            level6: 1,
            level7: 1,
            level8: 1,
            level9: 1
            };
        } else if(character.general.level == 19){
          character.allowed = {
            cantrip: 5,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 3,
            level5: 3,
            level6: 2,
            level7: 1,
            level8: 1,
            level9: 1
            };
        } else if(character.general.level == 20){
          character.allowed = {
            cantrip: 5,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 3,
            level5: 3,
            level6: 2,
            level7: 2,
            level8: 1,
            level9: 1
            };
        }
      } else if(character.class.main == 'Sorcerer'){
        if(character.general.level == 1){
          character.allowed = {
            cantrip: 4,
            level1: 2,
            level2: 0,
            level3: 0,
            level4: 0,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 2){
          character.allowed = {
            cantrip: 4,
            level1: 3,
            level2: 0,
            level3: 0,
            level4: 0,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 3){
          character.allowed = {
            cantrip: 4,
            level1: 4,
            level2: 2,
            level3: 0,
            level4: 0,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 4){
          character.allowed = {
            cantrip: 5,
            level1: 4,
            level2: 3,
            level3: 0,
            level4: 0,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 5){
          character.allowed = {
            cantrip: 5,
            level1: 4,
            level2: 3,
            level3: 2,
            level4: 0,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 6){
          character.allowed = {
            cantrip: 5,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 0,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 7){
          character.allowed = {
            cantrip: 5,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 1,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 8){
          character.allowed = {
            cantrip: 5,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 2,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 9){
          character.allowed = {
            cantrip: 5,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 3,
            level5: 1,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 10){
          character.allowed = {
            cantrip: 6,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 3,
            level5: 2,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 11 || character.general.level == 12){
          character.allowed = {
            cantrip: 6,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 3,
            level5: 2,
            level6: 1,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 13 || character.general.level == 14){
          character.allowed = {
            cantrip: 6,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 3,
            level5: 2,
            level6: 1,
            level7: 1,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 15 || character.general.level == 16){
          character.allowed = {
            cantrip: 6,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 3,
            level5: 2,
            level6: 1,
            level7: 1,
            level8: 1,
            level9: 0
            };
        } else if(character.general.level == 17){
          character.allowed = {
            cantrip: 6,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 3,
            level5: 2,
            level6: 1,
            level7: 1,
            level8: 1,
            level9: 1
            };
        } else if(character.general.level == 18){
          character.allowed = {
            cantrip: 6,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 3,
            level5: 3,
            level6: 1,
            level7: 1,
            level8: 1,
            level9: 1
            };
        } else if(character.general.level == 19){
          character.allowed = {
            cantrip: 6,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 3,
            level5: 3,
            level6: 2,
            level7: 1,
            level8: 1,
            level9: 1
            };
        } else if(character.general.level == 20){
          character.allowed = {
            cantrip: 6,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 3,
            level5: 3,
            level6: 2,
            level7: 2,
            level8: 1,
            level9: 1
            };
        }
      } else if(character.class.main == 'Warlock'){
        if(character.general.level == 1){
          character.allowed = {
            cantrip: 2,
            spellsKnown: 2,
            slotLevel: 1,
            invocations: 0
            };
        } else if(character.general.level == 2){
          character.allowed = {
            cantrip: 2,
            spellsKnown: 3,
            slotLevel: 1,
            invocations: 2
            };
        } else if(character.general.level == 3){
          character.allowed = {
            cantrip: 2,
            spellsKnown: 4,
            slotLevel: 2,
            invocations: 2
            };
        } else if(character.general.level == 4){
          character.allowed = {
            cantrip: 3,
            spellsKnown: 5,
            slotLevel: 2,
            invocations: 2
            };
        } else if(character.general.level == 5){
          character.allowed = {
            cantrip: 3,
            spellsKnown: 6,
            slotLevel: 3,
            invocations: 3
            };
        } else if(character.general.level == 6){
          character.allowed = {
            cantrip: 3,
            spellsKnown: 7,
            slotLevel: 3,
            invocations: 3
            };
        } else if(character.general.level == 7){
          character.allowed = {
            cantrip: 3,
            spellsKnown: 8,
            slotLevel: 4,
            invocations: 4
            };
        } else if(character.general.level == 8){
          character.allowed = {
            cantrip: 3,
            spellsKnown: 9,
            slotLevel: 4,
            invocations: 4
            };
        } else if(character.general.level == 9){
          character.allowed = {
            cantrip: 3,
            spellsKnown: 10,
            slotLevel: 5,
            invocations: 5
            };
        } else if(character.general.level == 10){
          character.allowed = {
            cantrip: 4,
            spellsKnown: 10,
            slotLevel: 5,
            invocations: 5
            };
        } else if(character.general.level == 11){
          character.allowed = {
            cantrip: 4,
            spellsKnown: 11,
            slotLevel: 5,
            invocations: 5
            };
        } else if(character.general.level == 12){
          character.allowed = {
            cantrip: 4,
            spellsKnown: 11,
            slotLevel: 5,
            invocations: 6
            };
        } else if(character.general.level == 13 | character.general.level == 14){
          character.allowed = {
            cantrip: 4,
            spellsKnown: 12,
            slotLevel: 5,
            invocations: 6
            };
        } else if(character.general.level == 15 || character.general.level == 16){
          character.allowed = {
            cantrip: 4,
            spellsKnown: 13,
            slotLevel: 5,
            invocations: 7
            };
        } else if(character.general.level == 17){
          character.allowed = {
            cantrip: 4,
            spellsKnown: 14,
            slotLevel: 5,
            invocations: 7
            };
        } else if(character.general.level == 18){
          character.allowed = {
            cantrip: 4,
            spellsKnown: 14,
            slotLevel: 5,
            invocations: 8
            };
        } else if(character.general.level == 19 || character.general.level == 20){
          character.allowed = {
            cantrip: 4,
            spellsKnown: 15,
            slotLevel: 5,
            invocations: 8
            };
        }
      } else if(character.class.main == 'Paladin'){
        if(character.general.level == 1){
          character.allowed = {
            cantrip: 0,
            level1: 0,
            level2: 0,
            level3: 0,
            level4: 0,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 2){
          character.allowed = {
            cantrip: 0,
            level1: 2,
            level2: 0,
            level3: 0,
            level4: 0,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 3 || character.general.level == 4){
          character.allowed = {
            cantrip: 0,
            level1: 3,
            level2: 0,
            level3: 0,
            level4: 0,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 5 || character.general.level == 6){
          character.allowed = {
            cantrip: 0,
            level1: 4,
            level2: 2,
            level3: 0,
            level4: 0,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 7 || character.general.level == 8){
          character.allowed = {
            cantrip: 0,
            level1: 4,
            level2: 3,
            level3: 0,
            level4: 0,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 9 || character.general.level == 10){
          character.allowed = {
            cantrip: 0,
            level1: 4,
            level2: 3,
            level3: 2,
            level4: 0,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 11 || character.general.level == 12){
          character.allowed = {
            cantrip: 0,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 0,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 13 || character.general.level == 14){
          character.allowed = {
            cantrip: 0,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 1,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 15 || character.general.level == 16){
          character.allowed = {
            cantrip: 0,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 2,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 17 || character.general.level == 18){
          character.allowed = {
            cantrip: 0,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 3,
            level5: 1,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 19 || character.general.level == 20){
          character.allowed = {
            cantrip: 0,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 3,
            level5: 2,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        }
      } else if(character.class.main == 'Ranger'){
        if(character.general.level == 1){
          character.allowed = {
            cantrip: 0,
            level1: 0,
            level2: 0,
            level3: 0,
            level4: 0,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 2){
          character.allowed = {
            cantrip: 2,
            level1: 2,
            level2: 0,
            level3: 0,
            level4: 0,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 3 || character.general.level == 4){
          character.allowed = {
            cantrip: 3,
            level1: 3,
            level2: 0,
            level3: 0,
            level4: 0,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 5 || character.general.level == 6){
          character.allowed = {
            cantrip: 4,
            level1: 4,
            level2: 2,
            level3: 0,
            level4: 0,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 7 || character.general.level == 8){
          character.allowed = {
            cantrip: 5,
            level1: 4,
            level2: 3,
            level3: 0,
            level4: 0,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 9 || character.general.level == 10){
          character.allowed = {
            cantrip: 6,
            level1: 4,
            level2: 3,
            level3: 2,
            level4: 0,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 11 || character.general.level == 12){
          character.allowed = {
            cantrip: 7,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 0,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 13 || character.general.level == 14){
          character.allowed = {
            cantrip: 8,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 1,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 15 || character.general.level == 16){
          character.allowed = {
            cantrip: 9,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 2,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 17 || character.general.level == 18){
          character.allowed = {
            cantrip: 10,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 3,
            level5: 1,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 19 || character.general.level == 20){
          character.allowed = {
            cantrip: 11,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 3,
            level5: 2,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        }
      } else if(character.class.main == 'Fighter'){
        if(character.general.level <= 2){
          character.allowed = {
            cantrip: 0,
            level1: 0,
            level2: 0,
            level3: 0,
            level4: 0,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 3){
          character.allowed = {
            cantrip: 2,
            level1: 2,
            level2: 0,
            level3: 0,
            level4: 0,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level >= 4 && character.general.level <= 6){
          character.allowed = {
            cantrip: 2,
            level1: 3,
            level2: 0,
            level3: 0,
            level4: 0,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level >= 7 && character.general.level <= 9){
          character.allowed = {
            cantrip: 2,
            level1: 4,
            level2: 2,
            level3: 0,
            level4: 0,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level >= 10 && character.general.level <= 12){
          character.allowed = {
            cantrip: 3,
            level1: 4,
            level2: 3,
            level3: 0,
            level4: 0,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level >= 13 && character.general.level <= 15){
          character.allowed = {
            cantrip: 3,
            level1: 4,
            level2: 3,
            level3: 2,
            level4: 0,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level >= 16 && character.general.level <= 18){
          character.allowed = {
            cantrip: 3,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 0,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        } else if(character.general.level == 19 || character.general.level == 20){
          character.allowed = {
            cantrip: 3,
            level1: 4,
            level2: 3,
            level3: 3,
            level4: 1,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0
            };
        }
      }
      return character;
    },

    findSpellsAtLevel(spells){
      var levels = {
          zero: [],
          one: [],
          two: [],
          three: [],
          four: [],
          five: [],
          six: [],
          seven: [],
          eight: [],
          nine: []
      };
      for(var i = 0; i < spells.length; i++){
        if(spells[i].level == 'cantrip'){
          levels.zero.push(spells[i]);
        } else if(spells[i].level == '1'){
          levels.one.push(spells[i]);
        } else if(spells[i].level == '2'){
          levels.two.push(spells[i]);
        } else if(spells[i].level == '3'){
          levels.three.push(spells[i]);
        } else if(spells[i].level == '4'){
          levels.four.push(spells[i]);
        } else if(spells[i].level == '5'){
          levels.five.push(spells[i]);
        } else if(spells[i].level == '6'){
          levels.six.push(spells[i]);
        } else if(spells[i].level == '7'){
          levels.seven.push(spells[i]);
        } else if(spells[i].level == '8'){
          levels.eight.push(spells[i]);
        } else if(spells[i].level == '9'){
          levels.nine.push(spells[i]);
        }
      }
      return levels;
    }

  };

  return Character;
}
