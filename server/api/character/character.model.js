'use strict';

import mongoose, {Schema} from 'mongoose';

var CharacterSchema = new mongoose.Schema({
  creator: Schema.Types.ObjectId,
  bio: {
    name: String,
    age: Number,
    gender: String,
    appearance: {
      height: {
        feet: Number,
        inches: Number
      },
      weight: Number,
      size: String,
      hair: String,
      eyes: String,
      skin: String,
      descr: String, //miscellaneous description
      image: String
    },
    languages: {},
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
    specialType: String, //most backgrounds have an extra category,
    special: String, //ex.Hermit type has Life of Seclusion. This is where those will go.
    trait: String,
    ideal: String,
    bond: String,
    flaw: String
  },
  combat: {
    armor: String,
    weapons: {},
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
  equipment: {},
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
    prof: {}, //what skills a character is proficient at
    passive: {
      insight: Number,
      perception: Number
    },
    profBonus: Number //this number is generated according to class and level. Does it need to be stored here?
  },
  spells: {
    ability: String,
    saveDc: Number,
    attackBonus: Number,
    lvl0: {},
    lvl1: {},
    lvl2: {},
    lvl3: {},
    lvl4: {},
    lvl5: {},
    lvl6: {},
    lvl7: {},
    lvl8: {},
    lvl9: {}
  }
});

export default mongoose.model('Character', CharacterSchema);
