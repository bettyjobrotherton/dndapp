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
          languages: [{name:'Common'}, {name:'Dwarvish'}, {name:'Halfing'}, {name:'Elvish'}],
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
          weapons: [{name:'light crossbow'}, {name:'dagger'}],
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
        equipment: [{name:'backpack', number: 1}, {name:'waterskin', number: 1}, {name:'vestments', number: 2}, {name:'block of incense', number: 2}, {name:'holy amulet', number: 1}, {name:'blanket', number: 1}, {name:'candles', number: 10}, {name:'tinderbox', number: 1}, {name:'alms box', number: 1}, {name:'clenser', number: 1}, {name:'meal rations', number: 2}, {name:'prayer book', number: 1}],
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
          prof: [
            {"name":"Acrobatics", "score": 0, "prof": false},
            {"name":"Animal Handling", "score": 0, "prof": false},
            {"name":"Arcana", "score": 0, "prof": false},
            {"name":"Athletics", "score": 0, "prof": false},
            {"name":"Deception", "score": 0, "prof": false},
            {"name":"History", "score": 0, "prof": false},
            {"name":"Insight", "score": 1, "prof": true},
            {"name":"Intimidation", "score": 0, "prof": false},
            {"name":"Investigation", "score": 0, "prof": false},
            {"name":"Medicine", "score": 1, "prof": true},
            {"name":"Nature", "score": 0, "prof": false},
            {"name":"Perception", "score": 0, "prof": false},
            {"name":"Performance", "score": 0, "prof": false},
            {"name":"Persuasion", "score": 1, "prof": true},
            {"name":"Religion", "score": 1, "prof": true},
            {"name":"Sleight of Hand", "score": 0, "prof": false},
            {"name":"Stealth", "score": 0, "prof": false},
            {"name":"Survival", "score": 0, "prof": false}
      ],
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
          lvl0: [{name:'Light'}, {name:'Sacred Flame'}, {name:'Thaumaturgy'}],
          lvl1: [{name:'Bless'}, {name:'Cure Wounds'}, {name:'Healing Word'}, {name:'Detect Magic'}, {name:'Create or Destroy Water'}, {name:'Purify Food and Drink'}, {name:'Shield of Faith'}, {name:'Guiding Bolt'}],
          lvl2: [{name:'Lesser Restoration'}, {name:'Prayer of Healing'}]
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
