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
    this.character = Character;
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
      this.classInfo = JSON.parse(this.localStorage['class-info']);

      this.$http.get('assets/backgrounds.json')
                .then(res => {
                  vm.backgroundList = res.data;
                  if(!vm.localStorage['selected-background']){
                    vm.currentBackground = res.data[0];
                  } else {
                    vm.currentBackground = JSON.parse(this.localStorage['selected-background']);
                  }
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

      this.countSpecialTrait = 0;
      if(this.currentBackground.name === "Entertainer"){
        this.maxSpecialTraits = 2;
      } else {
        this.maxSpecialTraits = 0;
      }
      this.specialTraitsList = [];

      this.countTrait = 0;
      this.maxTraits = 1;
      this.traitsList = [];

      this.countIdeal = 0;
      this.maxIdeals = 0;

      this.countBond = 0;
      this.maxBonds = 0;

      this.countFlaw = 0;
      this.maxFlaws = 0;

    } else if(this.$state.current.name == 'generatorAlignment'){
      this.$http.get('assets/alignment.json')
                .then(res => {
                  vm.alignList = res.data;
                  vm.currentAlign = res.data[0];
                })
                .catch(err => {
                  return err;
                });
    } else if(this.$state.current.name == 'proficiencies'){
      this.classInfo = JSON.parse(this.localStorage['class-info']);
      this.currentBackground = JSON.parse(this.localStorage['selected-background']);

      this.$http.get("assets/blank-skills.json")
                .then(res => {
                  vm.generalSkillsList = res.data;
                })
                .catch(err => {
                  return err;
                });

      this.countSkill = 1;
      this.maxSkills = this.classInfo.traits.noOfSkills;
      this.skillsList = [];
      this.filterSkills();

    } else if(this.$state.current.name == 'pickAbilityScores'){
      this.classInfo = JSON.parse(this.localStorage['class-info']);
      this.selectionMade = false;
      this.makeMySelections = true;

    } else if(this.$state.current.name == 'generatorThree'){
      this.savedCharacter = JSON.parse(this.localStorage['character-in-progress']);
      // console.log(this.savedCharacter);
      if(vm.savedCharacter.class.main == 'Bard' || this.savedCharacter.class.main == 'Cleric' || this.savedCharacter.class.main == 'Druid' || this.savedCharacter.class.main == 'Sorcerer' || this.savedCharacter.class.main == 'Warlock' || this.savedCharacter.class.main == 'Wizard'){
        this.selectSpells = true;
      } else if(this.savedCharacter.class.main == 'Paladin' || this.savedCharacter.class.main == 'Ranger'){
        if(this.savedCharacter.general.level < 2){
          this.selectSpells = false;
        } else {
          this.selectSpells = true;
        }
      } else if(this.savedCharacter.class.main == 'Fighter' && this.savedCharacter.general.level >= 3){
        if(this.savedCharacter.class.archetype == 'Eldritch Knight'){
          this.selectSpells = true;
        } else {
          this.selectSpells = false;
        }
      } else {
        this.selectSpells = false;
      }

    } else if(this.$state.current.name == 'generatorSpells'){
      this.characterInfo = JSON.parse(this.localStorage['character-in-progress']);
      this.characterInfo.spells = {
        lvl0:[], lvl1:[], lvl2:[], lvl3:[], lvl4:[], lvl5:[], lvl6:[], lvl7:[], lvl8:[], lvl9:[]
      };
      this.classInfo = JSON.parse(this.localStorage['class-info']);
      this.enhancedInfo = this.character.allowedNumberOfSpells(this.characterInfo);
      var charClass = vm.characterInfo.class.main.toLowerCase();
      this.classSpellsList = [];
      this.countSpell = {
        zero: 1,
        one: 1,
        two: 1,
        three: 1,
        four: 1,
        five: 1,
        six: 1,
        seven: 1,
        eight: 1,
        nine: 1
      };

      this.$http.get("assets/spells.json")
                .then(res => {
                  for(var i = 0; i < res.data.length; i++){
                    for(var j = 0; j < res.data[i].classes.length; j++){
                      if(res.data[i].classes[j] == charClass){
                        vm.classSpellsList.push(res.data[i]);
                      }
                    }
                  }
                  this.classSpellsByLevel = this.character.findSpellsAtLevel(this.classSpellsList);
                  this.spellDisplayProperties(this.enhancedInfo);
                })
                .catch(err => {
                  return err;
                });

    } else if(this.$state.current.name == 'generatorWeapons'){

    this.$http.get('assets/weapons.json')
            .then(res => {
              vm.weaponsList = res.data[0];
            })
            .catch(err => {
              return err;
            });

      this.countSimpleMelee = 0;
      this.maxSimpleMelee = 1;

      this.countSimpleRanged = 0;
      this.maxSimpleRanged = 1;

      this.countMartialMelee = 0;
      this.maxMartialMelee = 1;

      this.countMartialRanged = 0;
      this.maxMartialRanged = 1;

      this.characterWeapon = [];

  }else if(this.$state.current.name == 'generatorArmor'){

    this.armorCount = 0;
    this.armorMax = 1;
    this.shieldCount = 0;
    this.shieldMax = 1;
    this.characterArmor = [];

    this.$http.get('assets/armor.json')
              .then(res => {
                vm.armorList = res.data[0];
              })
              .catch(err => {
                return err;
              });

  }else if(this.$state.current.name == 'pickEquip'){
    this.currentEquipment = JSON.parse(this.localStorage['selected-equipment']);
    this.countEquipment = 0;
    this.maxEquipment = 0;
    this.equipmentList = [];

    this.countAmmunition = 0;
    this.maxAmmunition = 0;

    this.countArcaneFocus = 0;
    this.maxArcaneFocus = 0;

    this.countDruidicFocus = 0;
    this.maxDruidicFocus = 0;

    this.countHolySymbol = 0;
    this.maxHolySymbol = 0;

}else if(this.$state.current.name == 'generatorEquip'){
    this.$http.get('assets/equipment.json')
          .then(res => {
            vm.equipmentList = res.data[0];
            vm.currentEquipment = res.data[0];
          })
          .catch(err => {
            return err;
          });
        } else if(this.$state.current.name == 'generatorStats'){
    this.characterInfo = JSON.parse(this.localStorage['character-in-progress']);
  }
}


  continueChar(generate) {
    if(generate == 'race' && 'class'){
      this.$state.go('generator');
    }
  }

  selectLevelAndSubmit(input){
    if(!this.characterLevel){
      this.levelRequired = "Please enter character level";
    } else {
      var newCharacter = {
        skills: {
          profBonus: this.character.proficiencyBonus(this.characterLevel)
        },
        general: {
          level: this.characterLevel
        }
      };
      this.localStorage.setItem('character-in-progress', JSON.stringify(newCharacter));
      this.createChar(input);
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
      this.$state.current.friendlyName = "Pick your Sub-Race";
    }
  }

  selectSubrace(subrace){
    this.currentSubrace = subrace;
  }

  goBackToRace(){
    this.raceMain = true;
    this.$state.current.friendlyName = "Pick your Race";
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
      newCharacter = JSON.parse(this.localStorage['character-in-progress']);
      newCharacter.bio = raceInfo.bio;
      newCharacter.general.movement = raceInfo.general.movement;
      newCharacter.race = raceInfo.race;
      this.localStorage.setItem('character-in-progress', JSON.stringify(newCharacter));
      this.$state.go('generatorClass');
    } else {
      newCharacter = JSON.parse(this.localStorage['character-in-progress']);
      newCharacter.bio = raceInfo.bio;
      newCharacter.general.movement = raceInfo.general.movement;
      newCharacter.race = raceInfo.race;
      this.localStorage.setItem('character-in-progress', JSON.stringify(newCharacter));
      this.$state.go('generatorTwo');
    }
  }

  returnToRace(){
    this.$state.go('generatorRace');
  }

  returnToBeginning(){
    var newCharacter;
    newCharacter = JSON.parse(this.localStorage['character-in-progress']);
    this.localStorage.setItem('character-in-progress', JSON.stringify(newCharacter));
    this.savedCharacter = JSON.parse(this.localStorage['character-in-progress']);
    if(this.first() == 'race'){
      this.$state.go('generator');
    } else {
      this.$state.go('generatorClass');
    }
  }

// -- End code for pick race

// Start code for pick class

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
      this.localStorage.setItem('class-info', JSON.stringify(currentClass));
      // console.log(this.localStorage['class-info'])
    }

    returnToClass(){
      this.$state.go('generatorClass');
    }

    returnToBeginning2(){
      var newCharacter;
      newCharacter = JSON.parse(this.localStorage['character-in-progress']);
      this.localStorage.setItem('character-in-progress', JSON.stringify(newCharacter));
      this.savedCharacter = JSON.parse(this.localStorage['character-in-progress']);
      if(this.first() == 'class'){
        this.$state.go('generator');
      } else {
        this.$state.go('generatorRace');
      }
    }
// -- End code for pick class

// Start code for pick alignment --
  selectAlign(align) {
    this.currentAlign = align;
  }

  saveAlign(){
    var newCharacter;
    var currentAlign = this.currentAlign;
    var alignInfo = currentAlign.name;
    if(this.first() =='alignment'){
      newCharacter = JSON.parse(this.localStorage['character-in-progress']);
      newCharacter.general.alignment = alignInfo;
      this.localStorage.setItem('character-in-progress', JSON.stringify(newCharacter));
      this.$state.go('generatorBackground');
    } else {
      newCharacter = JSON.parse(this.localStorage['character-in-progress']);
      newCharacter.general.alignment = alignInfo;
      this.localStorage.setItem('character-in-progress', JSON.stringify(newCharacter));
      this.$state.go('proficiencies');
    }
  }


  returnToGenTwo(){
    if(this.first() == 'alignment'){
      this.$state.go('generatorTwo');
    } else {
      this.$state.go('generatorBackground');
    }
  }

// -- End code for pick alignment

// Start code for pick background --
  pickBackground(){
    this.localStorage.setItem('selected-background', JSON.stringify(this.currentBackground));
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

  createOwnTrait(){
    if(this.writeTrait){
      this.writeTrait = false;
    } else {
      this.writeTrait = true;
    }
  }

  idealsButton(){
    if(this.display3){
      this.display3 = false;
    } else {
      this.display3 = true;
    }
  }

  createOwnIdeal(){
    if(this.writeIdeal){
      this.writeIdeal = false;
    } else {
      this.writeIdeal = true;
    }
  }

  bondsButton(){
    if(this.display4){
      this.display4 = false;
    } else {
      this.display4 = true;
    }
  }

  createOwnBond(){
    if(this.writeBond){
      this.writeBond = false;
    } else {
      this.writeBond = true;
    }
  }

  flawsButton(){
    if(this.display5){
      this.display5 = false;
    } else {
      this.display5 = true;
    }
  }

  createOwnFlaw(){
    if(this.writeFlaw){
      this.writeFlaw = false;
    } else {
      this.writeFlaw = true;
    }
  }

  checkedSpecialTrait(item){
    var count = this.countSpecialTrait;
    if(item.check){
      this.countSpecialTrait = count + 1;
      if(!item.number){
        item.number = 0;
        this.specialTraitsList.push(item);
      } else {
        this.specialTraitsList.push(item);
      }
    } else {
      this.countSpecialTrait = count -1;
      if(!item.number){
        item.number = 0;
      }
      for(var i = 0; i < this.specialTraitsList.length; i++){
        if(this.specialTraitsList[i].number === item.number){
          this.specialTraitsList.splice(i, 1);
        }
      }
    }
  }

  saveOwnSpecialTrait(text){
    for(var i = 0; i < this.specialTraitsList.length; i++){
      if(this.specialTraitsList[i].number === 0){
        this.specialTraitsList[i].desc = text;
      }
    }
  }

  randomizeSpecialTrait(){
    var number = Math.floor((Math.random()*8) + 1);
    var specialTraits = this.currentBackground.specialTrait.list;
    if(this.countSpecialTrait > this.maxSpecialTraits){
      return;
    } else {
      for(var i = 0; i < specialTraits.length; i++){
        if(specialTraits[i].number === number){
          if(specialTraits[i].check){
            this.randomizeSpecialTrait();
          } else {
            specialTraits[i].check = true;
            this.checkedSpecialTrait(specialTraits[i]);
          }
        }
      }
    }
  }

  checkedTrait(item){
    var count = this.countTrait;
    if(item.check){
      this.countTrait = count + 1;
      if(!item.number){
        item.number = 0;
        this.traitsList.push(item);
      } else {
        this.traitsList.push(item);
      }
    } else {
      this.countTrait = count -1;
      if(!item.number){
        item.number = 0;
      }
      for(var i = 0; i < this.traitsList.length; i++){
        if(this.traitsList[i].number === item.number){
          this.traitsList.splice(i, 1);
        }
      }
    }
  }

  saveOwnTrait(text){
    for(var i = 0; i < this.traitsList.length; i++){
      if(this.traitsList[i].number === 0){
        this.traitsList[i].desc = text;
      }
    }
  }

  randomizeTrait(){
    var number = Math.floor((Math.random()*8) + 1);
    var traits = this.currentBackground.personalityTraits;
    if(this.countTrait > this.maxTraits){
      return;
    } else {
      for(var i = 0; i < traits.length; i++){
        if(traits[i].number === number){
          if(traits[i].check){
            this.randomizeTrait();
          } else {
            traits[i].check = true;
            this.checkedTrait(traits[i]);
          }
        }
      }
    }
  }

  checkedIdeal(item){
    var count = this.countIdeal;
    if(item.check){
      this.countIdeal = count + 1;
      if(!item.number){
        item.number = 0;
        this.currentIdeal = item;
      } else {
        this.currentIdeal = item;
      }
    } else {
      this.countIdeal = count -1;
      this.currentIdeal = " ";
    }
  }

  saveOwnIdeal(text){
    this.currentIdeal.desc = text;
  }

  randomizeIdeal(){
    var number = Math.floor((Math.random()*6) + 1);
    var ideals = this.currentBackground.ideals;
    if(this.countIdeal > this.maxIdeals){
      return;
    } else {
      for(var i = 0; i < ideals.length; i++){
        if(ideals[i].number === number){
          if(ideals[i].check){
            this.randomizeIdeal();
          } else {
            ideals[i].check = true;
            this.checkedIdeal(ideals[i]);
          }
        }
      }
    }
  }

  checkedBond(item){
    var count = this.countBond;
    if(item.check){
      this.countBond = count + 1;
      if(!item.number){
        item.number = 0;
        this.currentBond = item;
      } else {
        this.currentBond = item;
      }
    } else {
      this.countBond = count -1;
      this.currentBond = " ";
    }
  }

  saveOwnBond(text){
    this.currentBond.desc = text;
  }

  randomizeBond(){
    var number = Math.floor((Math.random()*6) + 1);
    var bonds = this.currentBackground.bonds;
    if(this.countBond > this.maxBonds){
      return;
    } else {
      for(var i = 0; i < bonds.length; i++){
        if(bonds[i].number === number){
          if(bonds[i].check){
            this.randomizeBond();
          } else {
            bonds[i].check = true;
            this.checkedBond(bonds[i]);
          }
        }
      }
    }
  }

  checkedFlaw(item){
    var count = this.countFlaw;
    if(item.check){
      this.countFlaw = count + 1;
      if(!item.number){
        item.number = 0;
        this.currentFlaw = item;
      } else {
        this.currentFlaw = item;
      }
    } else {
      this.countFlaw = count -1;
      this.currentFlaw = "";
    }
  }

  saveOwnFlaw(text){
    this.currentFlaw.desc = text;
  }

  randomizeFlaw(){
    var number = Math.floor((Math.random()*8) + 1);
    var flaws = this.currentBackground.flaws;
    if(this.countFlaw > this.maxFlaws){
      return;
    } else {
      for(var i = 0; i < flaws.length; i++){
        if(flaws[i].number === number){
          if(flaws[i].check){
            this.randomizeFlaw();
          } else {
            flaws[i].check = true;
            this.checkedFlaw(flaws[i]);
          }
        }
      }
    }
  }

  autoPickDetails(){
    if(this.currentBackground.specialTrait.isThere){
      this.randomizeSpecialTrait();
    }
    this.randomizeTrait();
    this.randomizeIdeal();
    this.randomizeTrait();
    this.randomizeBond();
    this.randomizeFlaw();
    this.backgroundDetailsText = "All background traits have been randomly selected.";
  }

saveBackground(){
  if(!this.traitsList[0] || !this.traitsList[1] || !this.currentIdeal || !this.currentBond || !this.currentFlaw){
    this.backgroundDetailsText = "Please make a selection from each category.";
    return;
  }
  var newCharacter;
  var currentBackground = this.currentBackground;
  var backgroundInfo;
  var currentSpecialTraits;
  var currentTraits = this.traitsList[0].desc + "; " + this.traitsList[1].desc;
  if(currentBackground.name == 'Entertainer'){
    if(!this.specialTraitsList){
      this.backgroundDetailsText = "Please make a selection from each category.";
      return;
    }
    currentSpecialTraits = this.specialTraitsList[0].desc;
    for(var i = 1; i < this.specialTraitsList.length; i++){
      currentSpecialTraits = currentSpecialTraits + "; " + this.specialTraitsList[i].desc;
      // console.log(currentSpecialTraits);
      backgroundInfo = {
            main: this.currentBackground.name,
            specialType: this.currentBackground.specialTrait.name,
            special: currentSpecialTraits,
            trait: currentTraits,
            ideal: this.currentIdeal.desc,
            bond: this.currentBond.desc,
            flaw: this.currentFlaw.desc
      };
    }
  } else if(currentBackground.specialTrait.isThere && currentBackground.name !== 'Entertainer'){
    if(!this.specialTraitsList){
      this.backgroundDetailsText = "Please make a selection from each category.";
      return;
    }
    currentSpecialTraits = this.specialTraitsList[0].desc;
    backgroundInfo = {
          main: this.currentBackground.name,
          specialType: this.currentBackground.specialTrait.name,
          special: currentSpecialTraits,
          trait: currentTraits,
          ideal: this.currentIdeal.desc,
          bond: this.currentBond.desc,
          flaw: this.currentFlaw.desc
    };
  } else {
    backgroundInfo = {
          main: this.currentBackground.name,
          trait: currentTraits,
          ideal: this.currentIdeal.desc,
          bond: this.currentBond.desc,
          flaw: this.currentFlaw.desc
    };
  }

  if(this.first() =='background'){
    newCharacter = JSON.parse(this.localStorage['character-in-progress']);
    newCharacter.background = backgroundInfo;
    this.localStorage.setItem('character-in-progress', JSON.stringify(newCharacter));
    this.$state.go('generatorAlignment');
  } else {
    newCharacter = JSON.parse(this.localStorage['character-in-progress']);
    newCharacter.background = backgroundInfo;
    this.localStorage.setItem('character-in-progress', JSON.stringify(newCharacter));
    this.$state.go('proficiencies');
  }
}

returnToBackground(){
  this.$state.go('generatorBackground');
}

returnToBackgroundDetails(){
  this.$state.go('backgrounddetails');
}

returnToGenTwo2(){
  var newCharacter;
  newCharacter = JSON.parse(this.localStorage['character-in-progress']);
  this.localStorage.setItem('character-in-progress', JSON.stringify(newCharacter));
  this.savedCharacter = JSON.parse(this.localStorage['character-in-progress']);
  if(this.first() == 'background'){
    this.$state.go('generatorTwo');
  } else {
    this.$state.go('generatorAlignment');
  }
}

returnToProficiencies(){
  this.$state.go('proficiencies');
}

returnToAbilityScore(){
  this.$state.go('pickAbilityScores');
}

returnToWeapons(){
  this.$state.go('generatorWeapons');
}

returnToClassOrRace(){
  if(this.first() == 'race'){
    this.$state.go('generatorRace');
  } else if(this.first() =='class'){
    this.$state.go('generatorClass');
  }
}

returnToWeapons2(){
  var newCharacter;
  newCharacter = JSON.parse(this.localStorage['character-in-progress']);
  this.localStorage.setItem('character-in-progress', JSON.stringify(newCharacter));
  this.savedCharacter = JSON.parse(this.localStorage['character-in-progress']);

  // this.$state.go('generatorWeapons');
  if(this.savedCharacter.class.main == 'Bard' || this.savedCharacter.class.main == 'Cleric' || this.savedCharacter.class.main == 'Druid' || this.savedCharacter.class.main == 'Sorcerer' || this.savedCharacter.class.main == 'Warlock' || this.savedCharacter.class.main == 'Wizard'){
    this.$state.go('generatorSpells');
  }else if(this.savedCharacter.class.main == 'Paladin' || this.savedCharacter.class.main == 'Ranger'){
    if(this.savedCharacter.general.level < 2){
      this.$state.go('generatorSpells');
    } else {
       this.$state.go('generatorWeapons');
    }
  } else if(this.savedCharacter.class.main == 'Fighter' && this.savedCharacter.general.level >= 3){
    if(this.savedCharacter.class.archetype == 'Eldritch Knight'){
      this.$state.go('generatorSpells');
    }
  } else {
    this.$state.go('generatorWeapons');
 }
}

// -- End code for pick background

// -- start of pick weapon

// WeaponDisplay(data){
//   if(this.savedCharacter.class.main == 'Bard' || this.savedCharacter.class.main == 'Cleric' || this.savedCharacter.class.main == 'Druid' || this.savedCharacter.class.main == 'Sorcerer' || this.savedCharacter.class.main == 'Warlock' || this.savedCharacter.class.main == 'Wizard'){
//     this.displaySimpleMelee = true;
//   } else {
//     this.displaySimpleMelee = false;
//   }
// }

saveWeapons(){
      var newCharacter = JSON.parse(this.localStorage['character-in-progress']);
      newCharacter.combat.weapon = this.characterWeapon;
      this.localStorage.setItem('character-in-progress', JSON.stringify(newCharacter));
      this.savedCharacter = JSON.parse(this.localStorage['character-in-progress']);

      if(this.savedCharacter.class.main == 'Bard' || this.savedCharacter.class.main == 'Cleric' || this.savedCharacter.class.main == 'Druid' || this.savedCharacter.class.main == 'Sorcerer' || this.savedCharacter.class.main == 'Warlock' || this.savedCharacter.class.main == 'Wizard'){
        this.$state.go('generatorSpells');
      }else if(this.savedCharacter.class.main == 'Paladin' || this.savedCharacter.class.main == 'Ranger'){
        if(this.savedCharacter.general.level < 2){
          this.$state.go('generatorSpells');
        } else {
          this.$state.go('generatorArmor');
        }
      } else if(this.savedCharacter.class.main == 'Fighter' && this.savedCharacter.general.level >= 3){
        if(this.savedCharacter.class.archetype == 'Eldritch Knight'){
          this.$state.go('generatorSpells');
        }
      } else {
       this.$state.go('generatorArmor');
     }
}

checkedSimpleMelee(item){
  var count = this.countSimpleMelee;
  if(item.check){
    this.countSimpleMelee = count + 1;
    var object = {
      name: item.name
    };
    this.characterWeapon.push(object);
    } else {
    this.countSimpleMelee = count - 1;
    for(var i = 0; i < this.characterWeapon.length; i++){
      if(this.characterWeapon[i].name === item.name){
        this.characterWeapon.splice(i, 1);
      }
    }
  }
}

checkedSimpleRanged(item){
  var count = this.countSimpleRanged;
  if(item.check){
    this.countSimpleRanged = count + 1;
    var object = {
      name: item.name
    };
    this.characterWeapon.push(object);
  } else {
    this.countSimpleRanged = count - 1;
    for(var i = 0; i < this.characterWeapon.length; i++){
      if(this.characterWeapon[i].name === item.name){
        this.characterWeapon.splice(i, 1);
      }
    }
  }
}

checkedMartialMelee(item){
  var count = this.countMartialMelee;
  if(item.check){
    this.countMartialMelee = count + 1;
    var object = {
      name: item.name
    };
    this.characterWeapon.push(object);
  } else {
    this.countMartialMelee = count - 1;
    for(var i = 0; i < this.characterWeapon.length; i++){
      if(this.characterWeapon[i].name === item.name){
        this.characterWeapon.splice(i, 1);
      }
    }
  }
}

checkedMartialRanged(item){
  var count = this.countMartialRanged ;
  if(item.check){
    this.countMartialRanged = count + 1;
    var object = {
      name: item.name
    };
    this.characterWeapon.push(object);
  } else {
    this.countMartialRanged  = count - 1;
    for(var i = 0; i < this.characterWeapon.length; i++){
      if(this.characterWeapon[i].name === item.name){
        this.characterWeapon.splice(i, 1);
      }
    }
  }
}


//end of weapons

//start of codde for selecting equipment

saveEquipment(){
  var newCharacter;
  var currentEquipment = this.currentEquipment;
  var equipmentInfo;
      equipmentInfo = {

          Equipment : this.currentEquipment.name,
          Ammunition : this.currentAmmunition.name,
          ArcaneFocus : this.currentArcaneFocus.name,
          DruidicFocus : this.currentDruidicFocus.name,
          HolySymbol : this.currentHolySymbol.name
      };
  if(this.first() =='equip'){
    newCharacter = JSON.parse(this.localStorage['character-in-progress']);
    newCharacter.equipment = equipmentInfo;
    this.localStorage.setItem('character-in-progress', JSON.stringify(newCharacter));
    this.$state.go('generatorthree');
  } else {
    newCharacter = JSON.parse(this.localStorage['character-in-progress']);
    newCharacter.equipment = equipmentInfo;
    this.localStorage.setItem('character-in-progress', JSON.stringify(newCharacter));
    this.$state.go('generatorthree');
  }
}

checkedEquipment(item){
  var count = this.countEquipment;
  if(item.check){
    this.countEquipment = count + 1;
    if(!item.number){
      item.number = 0;
      thisequipmentList.push(item);
    } else {
      this.equipmentList.push(item);
    }
  } else {
    this.countEquipment = count -1;
    if(!item.number){
      item.number = 0;
    }
    for(var i = 0; i < this.equipmentList.length; i++){
      if(this.equipmentList[i].number === item.number){
        this.equipmentList.splice(i, 1);
      }
    }
  }
}

//end of codde for selecting equipment

// Start code for selecting armor --

saveArmor(){
  var newCharacter = JSON.parse(this.localStorage['character-in-progress']);
  newCharacter.combat.armor = this.characterArmor;
  this.localStorage.setItem('character-in-progress', JSON.stringify(newCharacter));
  console.log(this.localStorage['character-in-progress']);
    this.$state.go('finalPage');
}

checkedLightArmor(item){
  var count = this.armorCount;
  if(item.check){
    this.armorCount = count + 1;
    var object = {
      name: item.name
    };
    this.characterArmor.push(object);
    console.log(this.characterArmor);
  } else {
    this.armorCount = count - 1;
    for(var i = 0; i < this.characterArmor.length; i++){
      if(this.characterArmor[i].name === item.name){
        this.characterArmor.splice(i, 1);
      }
    }
  }
}

  checkedMediumArmor(item){
    var count = this.armorCount;
    if(item.check){
      this.armorCount = count + 1;
      var object = {
        name: item.name
      };
      this.characterArmor.push(object);
    } else {
      this.armorCount = count - 1;
      for(var i = 0; i < this.characterArmor.length; i++){
        if(this.characterArmor[i].name === item.name){
          this.characterArmor.splice(i, 1);
        }
      }
    }
  }

  checkedHeavyArmor(item){
    var count = this.armorCount;
    if(item.check){
      this.armorCount = count + 1;
      var object = {
        name: item.name
      };
      this.characterArmor.push(object);
    } else {
      this.armorCount = count - 1;
      for(var i = 0; i < this.characterArmor.length; i++){
        if(this.characterArmor[i].name === item.name){
          this.characterArmor.splice(i, 1);
        }
      }
    }
  }

  checkedShield(item){
    var count = this.sheildCount;
    if(item.check){
      this.shieldCount = count + 1;
      var object = {
        name: item.name
      };
      this.characterArmor.push(object);
    } else {
      this.shieldCount = count - 1;
      for(var i = 0; i < this.characterArmor.length; i++){
        if(this.characterArmor[i].name === item.name){
          this.characterArmor.splice(i, 1);
        }
      }
    }
  }


// -- End code for selecting armor

// Start code for selecting proficiencies --
  filterSkills(){
    var characterSkills = this.classInfo.traits.skillsList;
    var backgroundSkills = this.currentBackground.addSkillProf;

    for(var i = 0; i < characterSkills.length; i++){
      for(var j = 0; j < backgroundSkills.length; j++){
        if(characterSkills[i] == backgroundSkills[j]){
          characterSkills.splice(i, 1);
        }
      }
    }
    this.modifiedSkills = characterSkills;
  }

  checkedSkill(item, check){
    var count = this.countSkill;
    if(check){
      this.countSkill = count + 1;
      var object = {
        prof: item.prof,
        score: item.score,
        name: item.name
      };
      this.skillsList.push(object);
    } else {
      this.countSkill = count -1;
      for(var i = 0; i < this.skillsList.length; i++){
        if(this.skillsList[i].name === item.name){
          this.skillsList.splice(i, 1);
        }
      }
    }
  }

  trimSkillsList(){
    var newList = [];
      for(var i = 0; i < this.generalSkillsList.length; i++){
        var object = {
          prof: this.generalSkillsList[i].prof,
          score: this.generalSkillsList[i].score,
          name: this.generalSkillsList[i].name
        }
        newList.push(object);
      }
      return newList;
    }

  saveSkills(){
    var newCharacter;
    var bonusSkills = this.currentBackground.addSkillProf;
    var selectedSkills = this.skillsList;
    this.finalSkillsList = this.trimSkillsList();

    for(var i = 0; i < this.finalSkillsList.length; i++){
        for(var j = 0; j < bonusSkills.length; j++){
          if(this.finalSkillsList[i].name == bonusSkills[j]){
            this.finalSkillsList[i].prof = true;
            this.finalSkillsList[i].score = 1;
          }
        }
    }
    for(i = 0; i < this.finalSkillsList.length; i++){
      for(j = 0; j < selectedSkills.length; j++){
        if(this.finalSkillsList[i].name == selectedSkills[j]){
          this.finalSkillsList[i].prof = true;
          this.finalSkillsList[i].score = 1;
        }
      }
    }
    var characterSkills = {
      prof: this.finalSkillsList
    };
    newCharacter = JSON.parse(this.localStorage['character-in-progress']);
    newCharacter.skills = characterSkills;
    this.localStorage.setItem('character-in-progress', JSON.stringify(newCharacter));
    this.$state.go('pickAbilityScores');
  }
// -- End code for selecting proficiencies

// Beginning code for ability score selection --
  rollForAbilityScores(){
    this.score = [];
    for(var i = 0; i < 6; i++){
      var a = Math.floor(Math.random()*6 +1);
      var b = Math.floor(Math.random()*6 +1);
      var c = Math.floor(Math.random()*6 +1);
      var d = Math.floor(Math.random()*6 +1);
      var e = Math.min(a, b, c, d);
      var f = a + b + c + d - e;
      this.score.push(f);
    }
    this.selectionMade = true;
  }

  altForAbilityScores(){
    this.score = [
      15, 14, 13, 12, 10, 8
    ];
    this.selectionMade = true;
  }

  deleteHighest(number, scoreList){
    for(var i = 0; i <= scoreList.length; i++){
      if(scoreList[i] == number){
         scoreList.splice(i, 1);
	       return;
      }
   }
}

  assignAbilityScores(){
    this.makeMySelections = false;
    var scoresToAssign = this.score;
    var a = Math.max(scoresToAssign[0], scoresToAssign[1], scoresToAssign[2], scoresToAssign[3], scoresToAssign[4], scoresToAssign[5]);

    this.deleteHighest(a, scoresToAssign);

    var b = Math.max(scoresToAssign[0], scoresToAssign[1], scoresToAssign[2], scoresToAssign[3], scoresToAssign[4]);

    this.deleteHighest(b, scoresToAssign);

    var c = Math.max(scoresToAssign[0], scoresToAssign[1], scoresToAssign[2], scoresToAssign[3]);

    this.deleteHighest(c, scoresToAssign);

    var d = Math.max(scoresToAssign[0], scoresToAssign[1], scoresToAssign[2]);

    this.deleteHighest(d, scoresToAssign);

    var e = Math.max(scoresToAssign[0], scoresToAssign[1]);

    this.deleteHighest(e, scoresToAssign);

    var f = scoresToAssign[0];

    if(this.classInfo.name == "Barbarian"){
      this.inputStr = a;
      this.inputDex = d;
      this.inputCon = b;
      this.inputInt = f;
      this.inputWis = e;
      this.inputCha = c;
    } else if(this.classInfo.name == "Bard"){
      this.inputStr = f;
      this.inputDex = b;
      this.inputCon = e;
      this.inputInt = c;
      this.inputWis = d;
      this.inputCha = a;
    }  else if(this.classInfo.name == "Cleric"){
      this.inputStr = c;
      this.inputDex = f;
      this.inputCon = b;
      this.inputInt = e;
      this.inputWis = a;
      this.inputCha = d;
    } else if(this.classInfo.name == "Druid"){
      this.inputStr = e;
      this.inputDex = d;
      this.inputCon = b;
      this.inputInt = c;
      this.inputWis = a;
      this.inputCha = f;
    } else if(this.classInfo.name == "Fighter"){
      this.inputStr = a;
      this.inputDex = c;
      this.inputCon = b;
      this.inputInt = e;
      this.inputWis = f;
      this.inputCha = d;
    } else if(this.classInfo.name == "Monk"){
      this.inputStr = d;
      this.inputDex = a;
      this.inputCon = c;
      this.inputInt = e;
      this.inputWis = b;
      this.inputCha = f;
    } else if(this.classInfo.name == "Paladin"){
      this.inputStr = a;
      this.inputDex = e;
      this.inputCon = c;
      this.inputInt = f;
      this.inputWis = d;
      this.inputCha = b;
    } else if(this.classInfo.name == "Ranger"){
      this.inputStr = d;
      this.inputDex = a;
      this.inputCon = c;
      this.inputInt = e;
      this.inputWis = b;
      this.inputCha = f;
    } else if(this.classInfo.name == "Rogue"){
      this.inputStr = f;
      this.inputDex = a;
      this.inputCon = d;
      this.inputInt = c;
      this.inputWis = e;
      this.inputCha = b;
    } else if(this.classInfo.name == "Sorcerer"){
      this.inputStr = d;
      this.inputDex = e;
      this.inputCon = b;
      this.inputInt = f;
      this.inputWis = c;
      this.inputCha = a;
    } else if(this.classInfo.name == "Warlock"){
      this.inputStr = c;
      this.inputDex = d;
      this.inputCon = b;
      this.inputInt = e;
      this.inputWis = f;
      this.inputCha = a;
    } else if(this.classInfo.name == "Wizard"){
      this.inputStr = f;
      this.inputDex = c;
      this.inputCon = b;
      this.inputInt = a;
      this.inputWis = e;
      this.inputCha = d;
    }
    scoresToAssign.splice(0, 1);
    scoresToAssign.push(a, b, c, d, e, f);
  }

  saveAbilityScores(){
    var abilityScoresInfo = {
      str: this.inputStr,
      dex: this.inputDex,
      con: this.inputCon,
      int: this.inputInt,
      wis: this.inputWis,
      cha: this.inputCha
    };
    var newCharacter = JSON.parse(this.localStorage['character-in-progress']);
    newCharacter.abilityScores = abilityScoresInfo;
    var passiveSkillsInfo = {
      insight: this.character.calculatePassiveRoll(newCharacter, "Insight"),
      perception: this.character.calculatePassiveRoll(newCharacter, "Perception")
    };
    newCharacter.skills.passive = passiveSkillsInfo;
    this.localStorage.setItem('character-in-progress', JSON.stringify(newCharacter));
    this.$state.go('generatorWeapons');
  }
// -- End code for ability score selection


// Beginning code for spells selection --
  spellDisplayProperties(data){
    if(data.allowed.cantrip > 0){
      this.display0 = true;
    } else {
      this.display0 = false;
    }
    if(data.allowed.level1 > 0){
      this.display1 = true;
    } else {
      this.display1 = false;
    }
    if(data.allowed.level2 > 0){
      this.display2 = true;
    } else {
      this.display2 = false;
    }
    if(data.allowed.level3 > 0){
      this.display3 = true;
    } else {
      this.display3 = false;
    }
    if(data.allowed.level4 > 0){
      this.display4 = true;
    } else {
      this.display4 = false;
    }
    if(data.allowed.level5 > 0){
      this.display5 = true;
    } else {
      this.display5 = false;
    }
    if(data.allowed.level6 > 0){
      this.display6 = true;
    } else {
      this.display6 = false;
    }
    if(data.allowed.level7 > 0){
      this.display7 = true;
    } else {
      this.display7 = false;
    }
    if(data.allowed.level8 > 0){
      this.display8 = true;
    } else {
      this.display8 = false;
    }if(data.allowed.level9 > 0){
      this.display9 = true;
    } else {
      this.display9 = false;
    }
    if(this.classInfo.quickBuild.spells.cantrips){
      this.display10 = true;
      this.checkQBspells();
    } else {
      this.display10 = false;
    }
  }

  checkedSpell0(item){
    var count = this.countSpell.zero;
    if(item.check){
      this.countSpell.zero = count + 1;
      var object = {
        name: item.name
      };
      this.characterInfo.spells.lvl0.push(object);
    } else {
      this.countSpell.zero = count -1;
      for(var i = 0; i < this.characterInfo.spells.lvl0.length; i++){
        if(this.characterInfo.spells.lvl0[i].name === item.name){
          this.characterInfo.spells.lvl0.splice(i, 1);
        }
      }
    }
  }

  checkedSpell1(item){
    var count = this.countSpell.one;
    if(item.check){
      this.countSpell.one = count + 1;
      var object = {
        name: item.name
      };
      this.characterInfo.spells.lvl1.push(object);
    } else {
      this.countSpell.one = count -1;
      for(var i = 0; i < this.characterInfo.spells.lvl1.length; i++){
        if(this.characterInfo.spells.lvl1[i].name === item.name){
          this.characterInfo.spells.lvl1.splice(i, 1);
        }
      }
    }
  }

  checkedSpell2(item){
    var count = this.countSpell.two;
    if(item.check){
      this.countSpell.two = count + 1;
      var object = {
        name: item.name
      };
      this.characterInfo.spells.lvl2.push(object);
    } else {
      this.countSpell.two = count -1;
      for(var i = 0; i < this.characterInfo.spells.lvl2.length; i++){
        if(this.characterInfo.spells.lvl2[i].name === item.name){
          this.characterInfo.spells.lvl2.splice(i, 1);
        }
      }
    }
  }

  checkedSpell3(item){
    var count = this.countSpell.three;
    if(item.check){
      this.countSpell.three = count + 1;
      var object = {
        name: item.name
      };
      this.characterInfo.spells.lvl3.push(object);
    } else {
      this.countSpell.three = count -1;
      for(var i = 0; i < this.characterInfo.spells.lvl3.length; i++){
        if(this.characterInfo.spells.lvl3[i].name === item.name){
          this.characterInfo.spells.lvl3.splice(i, 1);
        }
      }
    }
  }

  checkedSpell4(item){
    var count = this.countSpell.four;
    if(item.check){
      this.countSpell.four = count + 1;
      var object = {
        name: item.name
      };
      this.characterInfo.spells.lvl4.push(object);
    } else {
      this.countSpell.four = count -1;
      for(var i = 0; i < this.characterInfo.spells.lvl4.length; i++){
        if(this.characterInfo.spells.lvl4[i].name === item.name){
          this.characterInfo.spells.lvl4.splice(i, 1);
        }
      }
    }
  }

  checkedSpell5(item){
    var count = this.countSpell.five;
    if(item.check){
      this.countSpell.five = count + 1;
      var object = {
        name: item.name
      };
      this.characterInfo.spells.lvl5.push(object);
    } else {
      this.countSpell.five = count -1;
      for(var i = 0; i < this.characterInfo.spells.lvl5.length; i++){
        if(this.characterInfo.spells.lvl5[i].name === item.name){
          this.characterInfo.spells.lvl5.splice(i, 1);
        }
      }
    }
  }

  checkedSpell6(item){
    var count = this.countSpell.six;
    if(item.check){
      this.countSpell.six = count + 1;
      var object = {
        name: item.name
      };
      this.characterInfo.spells.lvl6.push(object);
    } else {
      this.countSpell.six = count -1;
      for(var i = 0; i < this.characterInfo.spells.lvl6.length; i++){
        if(this.characterInfo.spells.lvl6[i].name === item.name){
          this.characterInfo.spells.lvl6.splice(i, 1);
        }
      }
    }
  }

  checkedSpell7(item){
    var count = this.countSpell.seven;
    if(item.check){
      this.countSpell.seven = count + 1;
      var object = {
        name: item.name
      };
      this.characterInfo.spells.lvl7.push(object);
    } else {
      this.countSpell.seven = count -1;
      for(var i = 0; i < this.characterInfo.spells.lvl7.length; i++){
        if(this.characterInfo.spells.lvl7[i].name === item.name){
          this.characterInfo.spells.lvl7.splice(i, 1);
        }
      }
    }
  }

  checkedSpell8(item){
    var count = this.countSpell.eight;
    if(item.check){
      this.countSpell.eight = count + 1;
      var object = {
        name: item.name
      };
      this.characterInfo.spells.lvl8.push(object);
    } else {
      this.countSpell.eight = count -1;
      for(var i = 0; i < this.characterInfo.spells.lvl8.length; i++){
        if(this.characterInfo.spells.lvl8[i].name === item.name){
          this.characterInfo.spells.lvl8.splice(i, 1);
        }
      }
    }
  }

  checkedSpell9(item){
    var count = this.countSpell.nine;
    if(item.check){
      this.countSpell.nine = count + 1;
      var object = {
        name: item.name
      };
      this.characterInfo.spells.lvl9.push(object);
    } else {
      this.countSpell.nine = count -1;
      for(var i = 0; i < this.characterInfo.spells.lvl9.length; i++){
        if(this.characterInfo.spells.lvl9[i].name === item.name){
          this.characterInfo.spells.lvl9.splice(i, 1);
        }
      }
    }
  }

  checkQBspells(){
    var spells = this.classSpellsByLevel;
    var qbSpells0 = this.classInfo.quickBuild.spells.cantrips;
    var qbSpells1 = this.classInfo.quickBuild.spells.lvl1;

    for(var i = 0; i < qbSpells0.length; i++){
      for(var j = 0; j < spells.zero.length; j++){
        if(spells.zero[j].name === qbSpells0[i]){
          spells.zero[j].check = true;
          this.checkedSpell0(spells.zero[j]);
        }
      }
    }

    for(var k = 0; k < qbSpells1.length; k++){
      for(var l = 0; l < spells.one.length; l++){
        if(spells.one[l].name == qbSpells1[k]){
          spells.one[l].check = true;
          this.checkedSpell1(spells.one[l]);
        }
      }
    }
  }

  saveSpells(){
    var charSpells = this.characterInfo.spells;
    var newCharacter = JSON.parse(this.localStorage['character-in-progress']);
    newCharacter.spells = charSpells;
    // console.log(newCharacter);
    this.localStorage.setItem('character-in-progress', JSON.stringify(newCharacter));
    this.$state.go('generatorArmor');
  }
// -- End code for spells selection

// Beginning code to save stats --
  saveStats(){
    this.localStorage.setItem('character-in-progress', JSON.stringify(this.characterInfo));
    console.log(this.localStorage['character-in-progress']);
  }
// -- End code to save stats

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
  .component('proficiencies', {
    template: require('./proficiencies.html'),
    controller: GeneratorController,
    controllerAs: 'genCtrl'
  })
  .component('pickabilityscores', {
    template: require('./pickAbilityScores.html'),
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
  .component('generatorfour', {
    template: require('./generatorfour.html'),
    controller: GeneratorController,
    controllerAs: 'genCtrl'
  })
  .component('finalpage', {
    template: require('./finalpage.html'),
    controller: GeneratorController,
    controllerAs: 'genCtrl'
  })
  .component('pickarmor', {
    template: require('./pickarmor.html'),
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
