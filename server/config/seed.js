/**
* Populate DB with sample data on server start
* to disable, edit config/environment/index.js, and set `seedDB: false`
*/

'use strict';
import User from '../api/user/user.model';
import Character from '../api/character/character.model';


var newUserID;
var newCharID;

User.find({}).remove()
.then(() => {
  User.create({
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@example.com',
    password: 'admin',
  })
  .then((data) => {
    newUserID = data._id;
    console.log('finished populating users');

    Character.find({}).remove()
    .then(() => {
      Character.create({
        creator: newUserID,
        bio: {
          name: 'Neysa Greycastle',
          age: 25,
          gender: 'Female',
          appearance: {
            height: {
              feet: 5,
              inches: 8
            },
            weight: 118,
            size: 'Medium',
            hair: 'brown',
            eyes: 'green',
            skin: 'tawny',
            descr: 'Her hair goes to her mid-back and is always up in a braid.'
          },
          languages: ['Common', 'Dwarvish', 'Halfing', 'Elvish'],
          backStory: 'Neysa is a priestess of the goddess Mishakal. She is not from the city.'
        },
        race: {
          main: 'Human',
          subrace: 'Chondathan',
        },
        class: {
          main: 'Cleric',
          archetype: 'Life Domain'
        },
        general: {
          level: 3,
          experience: 900,
          alignment: 'Lawful Good',
          diety: 'Mishakal',
          movement: 30
        },
        background: {
          main: 'Acolyte',
          special: 0,
          trait: 4,
          ideal: 2,
          bond: 4,
          flaw: 6
        },
        combat: {
          armor: 'scale mail',
          weapons: ['light crossbow', 'dagger'],
          ammunition: {
            arrows: 0,
            bolts: 30,
            bullets: 0,
            needles: 0
          },
          armorClass: 14,
          hitPoints: 25,
          hitDie: '3d8',
          specialAttacks: 'none',
          specialDefense: 'none',
        },
        equipment: ['backpack', 'waterskin', 'vestments', 'block of incense', 'holy amulet', 'blanket', 'candles', 'tinderbox', 'alms box', 'clenser', 'meal rations', 'prayer book'],
        money:{
          platinum: 0,
          gold: 15,
          electrum: 0,
          silver: 0,
          copper: 0
        },
        abilityScores: {
          str: 14,
          dex: 11,
          con: 15,
          int: 11,
          wis: 16,
          cha: 11
        },
        skills: {
          prof: ['Insight', 'Medicine', 'Persuasion', 'Religion'],
          passive: {
            insight: 15,
            perception: 13
          },
          profBonus: 2
        },
        spells: {
          ability: 'WIS',
          saveDc: 13,
          attackBonus: 5,
          lvl0: ['Light', 'Sacred Flame', 'Thaumaturgy'],
          lvl1: ['Bless', 'Cure Wounds', 'Healing Word', 'Detect Magic', 'Create or Destroy Water', 'Purify Food and Drink', 'Shield of Faith', 'Guiding Bolt'],
          lvl2: ['Lesser Restoration', 'Prayer of Healing']
        }
      })
      .then((data) => {
        newCharID = data._id;
        console.log('finished populating characters');

        User.findOneAndUpdate({ email: 'admin@example.com'},
          { characters: [newCharID] },
          { new: true, upsert: true, setDefaultsOnInsert: true } ).exec()
      });
    });

  });
});
