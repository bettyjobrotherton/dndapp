/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Character from '../api/character/character.model';

Thing.find({}).remove()
  .then(() => {
    Thing.create({
      name: 'Development Tools for Fools',
      info: 'Integration with popular tools such as Webpack, Gulp, Babel, TypeScript, Karma, '
            + 'Mocha, ESLint, Node Inspector, Livereload, Protractor, Pug, '
            + 'Stylus, Sass, and Less.',
      hardware: 35
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, '
            + 'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep '
            + 'tests alongside code. Automatic injection of scripts and '
            + 'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more '
            + 'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript '
            + 'payload, minifies your scripts/css/images, and rewrites asset '
            + 'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku '
            + 'and openshift subgenerators'
    });
  });

User.find({})
  .then(() => {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test',
      characters: ['589b4c693029af035896997b']
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });

  Character.find({}).remove()
    .then(() => {
      Character.create({
        creator: '589c93dde3a03b2ac8548fc0',
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
      .then(() => {
        console.log('finished populating characters');
      });
    });
