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
        equipment: [{name:'backpack'}, {name:'waterskin'}, {name:'vestments'}, {name:'block of incense'}, {name:'holy amulet'}, {name:'blanket'}, {name:'candles'}, {name:'tinderbox'}, {name:'alms box'}, {name:'clenser'}, {name:'meal rations'}, {name:'prayer book'}],
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
          prof: [{name:'Insight'}, {name:'Medicine'}, {name:'Persuasion'}, {name:'Religion'}],
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
