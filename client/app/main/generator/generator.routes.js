'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('generator', {
    url: '/generator',
    template: '<generator></generator>'
  })
  .state('generatorClass', {
    url: '/pickclass',
    template: '<pickclass></pickclass>',
    friendlyName: 'Pick a Class'
  })
  .state('generatorRace', {
    url:'/pickrace',
    template: '<pickrace></pickrace>',
    friendlyName: 'Pick your Race'
  })
  .state('generatorTwo',{
    url: '/generatortwo',
    template: '<generatortwo></generatortwo>'
  })
  .state('generatorBackground', {
    url:'/pickbackground',
    template: '<pickbackground></pickbackground>',
    friendlyName: 'Pick your Background'
  })
  .state('backgrounddetails', {
    url: '/backgrounddetails',
    template: '<backgrounddetails></backgrounddetails>',
    friendlyName: 'Choose your Background Details'
  })
  .state('generatorAlignment', {
    url:'/pickalignment',
    template: '<pickalignment></pickalignment>',
    friendlyName:'Choose your Alignment'
  })
  .state('generatorThree',{
    url: '/generatorthree',
    template: '<generatorthree></generatorthree>'
  })
  .state('generatorSpells', {
    url:'/pickspells',
    template: '<pickspells></pickspells>',
    friendlyName:'Plenty of Spells to Choose From'
  })
  .state('generatorWeapons', {
    url:'/pickweapons',
    template: '<pickweapons></pickweapons>',
    friendlyName:'What will you fight with?'
  })
  .state('generatorEquip', {
    url:'/pickequip',
    template: '<pickequip></pickequip>',
    friendlyName:'Get ready for your next Adventure'
  })
  .state('generatorStats', {
    url:'/pickstats',
    template: '<pickstats></pickstats>',
    friendlyName:'Your Characters Stats'
  });
}
