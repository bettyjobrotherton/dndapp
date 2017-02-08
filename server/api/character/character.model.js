'use strict';

import mongoose from 'mongoose';

var CharacterSchema = new mongoose.Schema({
  bio: {
    name: String,
    age: Number,
    gender: String,
    height: {
      feet: Number,
      inches: Number
    },
    weight: Number,
    size: String,
    languages: [{}],
    backStory: String
  },
  race: {
    main: String,
    subrace: String
  },
  class: {
    main: String,
    archetype: String
  },
  general: {
    level: Number,
    experience: Number,
    alignment: String,
    diety: String,
    movement: Number,
  },
  background: {
    main: String, //main background type, ex. Folkhero, Hermit, Acolyte, etc.
    special: Number, //most backgrounds have an extra category, ex. Hermit type has Life of Seclusion. This is where those will go.
    trait: Number,
    ideal: Number,
    bond: Number,
    flaw: Number
  },
  combat: {
    armor: String,
    weapons: [{}],
    ammunition: {
      arrows: Number,
      bolts: Number,
      bullets: Number,
      needles: Number
    },
    armorClass: Number,
    hitPoints: Number,
    hitDie: String,
    specialAttacks: String,
    specialDefense: String
  },
  equipment: [{}],
  money: {
    platinum: Number,
    gold: Number,
    electrum: Number,
    silver: Number,
    copper: Number
  },
  abilityScores: {
    str: Number,
    dex: Number,
    con: Number,
    int: Number,
    wis: Number,
    cha: Number
  },
  skills: {
    prof: [{}], //what skills a character is proficient at
    passive: {
      insight: Number,
      perception: Number
    },
    profBonus: Number //this number is generated according to class and level. Does it need to be stored here?
  },
  spells: {
    lvl0: [{}],
    lvl1: [{}],
    lvl2: [{}],
    lvl3: [{}],
    lvl4: [{}],
    lvl5: [{}],
    lvl6: [{}],
    lvl7: [{}],
    lvl8: [{}],
    lvl9: [{}]
  }
});

export default mongoose.model('Character', CharacterSchema);
