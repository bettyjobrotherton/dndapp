'use strict';

import mongoose from 'mongoose';

var CharacterSchema = new mongoose.Schema({
  bio: {
    name: String,
    age: Number,
    gender: String,
    height: Number,
    weight: Number,
    languages: String,
    backStory: String
  },
  race: {
    primary: String,
    secondary: String
  },
  class: {
    main: String,
    path: String
  },
  general: {
    level: Number,
    experience: Number,
    alignment: String,
    baseMove: Number,
    actualMove: Number,
  },
  background: {
    main: String,
    moment: Number,
    trait: Number,
    ideal: Number,
    bond: Number,
    flaw: Number
  },
  combat: {
    armor: String,
    weapons: String,
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
  equipment: String,
  money: {
    gold: Number,
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
    prof: String,
    passive: {
      insight: Number,
      perception: Number
    },
    profBonus: Number
  }
});

export default mongoose.model('Character', CharacterSchema);
