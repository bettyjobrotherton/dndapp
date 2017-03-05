import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './generator.routes';

export class GeneratorController {

  /*@ngInject*/
  constructor($http, $state) {
    this.$http = $http;
    this.$state = $state;
  }

  $onInit() {
    this.raceList = [{
      name: 'Dragonborn',
      desc: 'The clan is more important that life itself. They owe their devotion and respect to their clan above all else, even the gods. Continuous drive for self-improvement reflects the self-sufficiency of the race as a whole. They recognize that help is sometimes needed in difficult situations',
      icon: './assets/images/icons/Dragonborn.png',
      traits: {
        aveAge:'350',
        aveHeight: '4-5',
        baseSpd: '25',
        abilScore: '',
        lang: 'Common and dwarvish',
        tools: 'Smith tools, brewing supplies, mason tools'
      }
    },
    {
      name: 'Dwarf',
      desc: 'Short and Stout, Bold and Hardy, Dwarves are known as skilled warriors, miners and workers of stone and metal. Dwarves who take up the adventuring life may be motivated by a desire for treasure; others are driven by inspiration or command of a deity or seek to climb their clan’s hierarchy. They are slow to trust Elves, Halflings and humans.',
      icon: './assets/images/icons/Dwarf.png',
      traits: {
        aveAge:'350',
        aveHeight: '4-5',
        baseSpd: '25',
        abilScore: '',
        lang: 'Common and dwarvish',
        tools: 'Smith tools, brewing supplies, mason tools'
      }
    },
    {
      name: 'Elf',
      desc: 'Slender and Graceful, Unearthly grace and fine features. With a timeless perspective, more often amused than excited and more likely to be curious than greedy.',
      icon: './assets/images/icons/Elf.png',
      traits: {
        aveAge:'350',
        aveHeight: '4-5',
        baseSpd: '25',
        abilScore: '',
        lang: 'Common and dwarvish',
        tools: 'Smith tools, brewing supplies, mason tools'
      }
    },
    {
      name: 'Gnome',
      desc: 'A gnome’s energy and enthusiasm for living shines through every inch of his or her tiny body. Gnomes speak as if they can’t get the thoughts out of their heads fast enough.',
      icon: './assets/images/icons/Gnome.png',
      traits: {
        aveAge:'350',
        aveHeight: '4-5',
        baseSpd: '25',
        abilScore: '',
        lang: 'Common and dwarvish',
        tools: 'Smith tools, brewing supplies, mason tools'
      }
    },
    {
      name: 'Half-Elf',
      desc: 'Walking in two worlds but truly belonging to neither, half-elves combine what some say are the best qualities of their elf and human parents: human curiosity, inventiveness, and ambition tempered by the refined senses, love of nature, and artistic tastes of the elves.',
      icon: './assets/images/icons/Half Elf.png',
      traits: {
        aveAge:'350',
        aveHeight: '4-5',
        baseSpd: '25',
        abilScore: '',
        lang: 'Common and dwarvish',
        tools: 'Smith tools, brewing supplies, mason tools'
      }
    },
    {
      name: 'Half-orc',
      desc: 'Some half-ores rise to become proud chiefs of ore tribes, their human blood giving them an edge over their full-blooded ore rivals. Some venture into the world to prove their worth among humans and other more civilized races. Many of these become adventurers, achieving greatness for their mighty deeds and notoriety for their barbaric customs and savage fury.',
      icon: './assets/images/icons/Half Orc.png',
      traits: {
        aveAge:'350',
        aveHeight: '4-5',
        baseSpd: '25',
        abilScore: '',
        lang: 'Common and dwarvish',
        tools: 'Smith tools, brewing supplies, mason tools'
      }
    },
    {
      name: 'Halfling',
      desc: 'Small and practical, kind and Curious they are adebt at fitting into a community of humans, dwarves or elves.',
      icon: './assets/images/icons/Halfling.png',
      traits: {
        aveAge:'350',
        aveHeight: '4-5',
        baseSpd: '25',
        abilScore: '',
        lang: 'Common and dwarvish',
        tools: 'Smith tools, brewing supplies, mason tools'
      }
    },
    {
      name: 'Human',
      desc: 'They are the most adaptable and ambitious people among the common races. Widely varying tastes, morals, and customs in many different lands where they have settled. They are also more physically diverse than other common races.',
      icon: './assets/images/icons/Human.png',
      traits: {
        aveAge:'350',
        aveHeight: '4-5',
        baseSpd: '25',
        abilScore: '',
        lang: 'Common and dwarvish',
        tools: 'Smith tools, brewing supplies, mason tools'
      }
    },
    {
      name: 'Tiefling',
      desc: 'Tieflings are derived from human bloodlines. Their infernal heritage has left a clear imprint on their appearance. Lacking a homeland, tieflings have to make their own way in the world and have to be strong to survive. They are not quick to trust anyone who claims to be a friend, but when a tieflings companions demonstrate that they trust him or her, tiefling’s learns to extend the same trust to them. Once a tiefling gives someone loyalty, the tiefling is a firm friend or ally for life. ',
      icon: './assets/images/icons/Tiefling.png',
      traits: {
        aveAge:'350',
        aveHeight: '4-5',
        baseSpd: '25',
        abilScore: '',
        lang: 'Common and dwarvish',
        tools: 'Smith tools, brewing supplies, mason tools'
      }
    },
  ];

  this.classList = [{
    name: 'Barbarian',
    desc: 'Quick Build: Highest ability scores in Strength and Constitution. Outlander background',
    icon: './assets/images/icons/Barbarian.png',
  },
  {
    name: 'Bard',
    desc: '',
    icon: './assets/images/icons/Bard.png',
  },
  {
    name: 'Cleric',
    desc: '',
    icon: './assets/images/icons/Cleric.png',
  },
  {
    name: 'Druid',
    desc: '',
    icon: './assets/images/icons/Druid.png',
  },
  {
    name: 'Fighter',
    desc: '',
    icon: './assets/images/icons/Fighter.png',
  },
  {
    name: 'Monk',
    desc: '',
    icon: './assets/images/icons/Monk.png',
  },
  {
    name: 'Paladin',
    desc: '',
    icon: './assets/images/icons/Paladin.png',
  },
  {
    name: 'Ranger',
    desc: '',
    icon: './assets/images/icons/Ranger.png',
  },
  {
    name: 'Rogue',
    desc: '',
    icon: './assets/images/icons/Rogue.png',
  },{
    name: 'Sorcerer',
    desc: '',
    icon: './assets/images/icons/Sorcerer.png',
  },
  {
    name: 'Warlock',
    desc: '',
    icon: './assets/images/icons/Warlock.png',
  },{
    name: 'Wizard',
    desc: '',
    icon: './assets/images/icons/Wizard.png',
  },

    ];
  }



  createChar(firstOpt) {
    if(firstOpt == 'race'){
      this.$state.go('generatorRace');
    }
    if(firstOpt == 'class'){
      this.$state.go('generatorClass');
    }
  }

  selectRace(race) {
    this.currentRace = race;
  }

  selectClass(build) {
    this.currentClass = build;
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
  .name;
