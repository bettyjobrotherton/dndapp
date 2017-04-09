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
    }

//weapon code start here
else if(this.$state.current.name == 'generatorWeapons'){
  this.classInfo = JSON.parse(this.localStorage['class-info']);
  this.$http.get('assets/weapons.json')
            .then(res => {
              vm.weaponsList = res.data;
              if(!vm.localStorage['selected-weapons']){
                vm.currentWeapons = res.data[0];
              } else {
                vm.currentWeapons = JSON.parse(this.localStorage['selected-weapons']);
              }
            })
            .catch(err => {
              return err;
            });
}else if(this.$state.current.name == 'pickweapons'){
      this.currentWeapons = JSON.parse(this.localStorage['selected-weapon']);
      this.display1 = false;
      this.display2 = false;
      this.display3 = false;
      this.display4 = false;


      this.countSimpleMelee = 0;
      this.maxSimpleMelee = 0;
      this.weaponsList = [];

      this.countSimpleRanged = 0;
      this.maxSimpleRanged = 0;

      this.countMartialMelee = 0;
      this.maxMartialMelee = 0;

      this.countMartialRanged = 0;
      this.maxMartialRanged = 0;
  }
}

pickWeapon(){
  var Weapon = this.currentWeapon;
  this.localStorage.setItem('selected-weapon', JSON.stringify(weapon));
  this.$state.go('generatorthree');
}

selectWeapon(Weapon) {
  this.currentWeapon = Weapon;
}

checkedSimpleMelee(item){
  var count = this.countSimpleMelee;
  if(item.check){
    this.countSimpleMelee = count + 1;
    if(!item.number){
      item.number = 0;
      this.weaponsList.push(item);
    } else {
      this.weaponsList.push(item);
    }
  } else {
    this.countSimpleMelee = count -1;
    if(!item.number){
      item.number = 0;
    }
    for(var i = 0; i < this.weaponsList.length; i++){
      if(this.weaponsList[i].number === item.number){
        this.weaponsList.splice(i, 1);
      }
    }
  }
}

saveSimpleMelee(text){
  for(var i = 0; i < this.weaponsList.length; i++){
    if(this.weaponsList[i].number === 0){
      this.weaponsList[i].desc = text;
    }
  }
}

//end of weapons

  continueChar(generate) {
    if(generate == 'race' && 'class'){
      this.$state.go('generator');
    }
  }

  selectLevelAndSubmit(input){
    var newCharacter = {
      general: {
        level: this.characterLevel
      }
    };
    this.localStorage.setItem('character-in-progress', JSON.stringify(newCharacter));
    this.createChar(input);
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
    var number = Math.round(Math.random()*8);
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
    var number = Math.round(Math.random()*8);
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
      if(!item.number){
        item.number = 0;
      }
      this.currentIdeal = " ";
    }
  }

  saveOwnIdeal(text){
    this.currentIdeal.desc = text;
  }

  randomizeIdeal(){
    var number = Math.round(Math.random()*6);
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
      if(!item.number){
        item.number = 0;
      }
      this.currentBond = " ";
    }
  }

  saveOwnBond(text){
    this.currentBond.desc = text;
  }

  randomizeBond(){
    var number = Math.round(Math.random()*6);
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
      if(!item.number){
        item.number = 0;
      }
      this.currentFlaw = "";
    }
  }

  saveOwnFlaw(text){
    this.currentFlaw.desc = text;
  }

  randomizeFlaw(){
    var number = Math.round(Math.random()*8);
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
    this.randomizeSpecialTrait();
    this.randomizeTrait();
    this.randomizeTrait();
    this.randomizeIdeal();
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
// -- End code for pick background

// -- start of pick weapon

saveWeapons(){
  var newCharacter;
  var currentWeapons = this.currentWeapons;
  var weaponInfo;
      weaponInfo = {
            simpleMelee: this.currentSimpleMelee.name,
            simpleRange: this.currentSimpleRanged.name,
            martialMelee: this.currentMartialMelee.name,
            martialRange: this.currentMartialRanged.name
      };
  if(this.first() =='weapons'){
    newCharacter = JSON.parse(this.localStorage['character-in-progress']);
    newCharacter.weapons = weaponInfo;
    this.localStorage.setItem('character-in-progress', JSON.stringify(newCharacter));
    this.$state.go('equipment');
  } else {
    newCharacter = JSON.parse(this.localStorage['character-in-progress']);
    newCharacter.weapons = weaponInfo;
    this.localStorage.setItem('character-in-progress', JSON.stringify(newCharacter));
    this.$state.go('generatorthree');
  }
}

simpleMeleeButton(){
  if(this.display1){
    this.display1 = false;
  } else {
    this.display1 = true;
  }
}

simpleRangedButton(){
  if(this.display2){
    this.display2 = false;
  } else {
    this.display2 = true;
  }
}

martialMeleeButton(){
  if(this.display3){
    this.display3 = false;
  } else {
    this.display3 = true;
  }
}

martialRangedButton(){
  if(this.display4){
    this.display4 = false;
  } else {
    this.display4 = true;
  }
}

checkedSimpleMelee(item){
  var count = this.countSimpleMelee;
  if(item.check){
    this.countSimpleMelee = count + 1;
    if(!item.number){
      item.number = 0;
      this.currentSimpleMelee = item;
    } else {
      this.currentSimpleMelee = item;
    }
  } else {
    this.countSimpleMelee = count -1;
    if(!item.number){
      item.number = 0;
    }
    this.currentSimpleMelee = "";
  }
}

//end of weapons




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
      this.skillsList.push(item);
    } else {
      this.countSkill = count -1;
      for(var i = 0; i < this.skillsList.length; i++){
        if(this.skillsList[i] === item){
          this.skillsList.splice(i, 1);
        }
      }
    }
  }

  saveSkills(){
    var newCharacter;
    var bonusSkills = this.currentBackground.addSkillProf;
    var selectedSkills = this.skillsList;
    this.finalSkillsList = this.generalSkillsList;

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
      var a = Math.round(Math.random()*6);
      var b = Math.round(Math.random()*6);
      var c = Math.round(Math.random()*6);
      var d = Math.round(Math.random()*6);
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
    this.localStorage.setItem('character-in-progress', JSON.stringify(newCharacter));
    this.$state.go('generatorThree');
  }
// -- End code for ability score selection

//start of weapon selection




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
    template: require('./pickabilityscores.html'),
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
