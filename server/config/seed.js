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
          languages: {
            0: 'Common',
            1: 'Dwarvish',
            2: 'Halfing',
            3: 'Elvish'},
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
          specialType: '',
          special: '',
          trait: 'Nothing can shake my optimistic attitude.',
          ideal: 'Charity. I always try to help those in need, no matter what the personal cost.(Good)',
          bond: 'Everything I do is for the common people.',
          flaw: 'Once I pick a goal, I become obsessed with it to the detriment of everything else in my life.'
        },
        combat: {
          armor: 'scale mail',
          weapons: {
            0: 'light crossbow',
            1: 'dagger'},
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
        equipment: {
          0: 'backpack',
          1: 'waterskin',
          2: 'vestments',
          3: 'block of incense',
          4: 'holy amulet',
          5: 'blanket',
          6: 'candles',
          7: 'tinderbox',
          8: 'alms box',
          9: 'clenser',
          10: 'meal rations',
          11: 'prayer book'},
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
          prof: {
            0: 'Insight',
            1: 'Medicine',
            2: 'Persuasion',
            3: 'Religion'},
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
          lvl0: {
            0: 'Light',
            1: 'Sacred Flame',
            2: 'Thaumaturgy'},
          lvl1: {
            0: 'Bless',
            1: 'Cure Wounds',
            2: 'Healing Word',
            3: 'Detect Magic',
            4: 'Create or Destroy Water',
            5: 'Purify Food and Drink',
            6: 'Shield of Faith',
            7: 'Guiding Bolt'},
          lvl2: {
            0: 'Lesser Restoration',
            2: 'Prayer of Healing'}
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
