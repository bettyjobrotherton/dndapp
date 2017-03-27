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
    template: '<pickbackground></pickbackground>'
  })
  .state('backgrounddetails', {
    url: '/backgrounddetails',
    template: '<backgrounddetails></backgrounddetails>'
  })
  .state('generatorAlignment', {
    url:'/pickalignment',
    template: '<pickalignment></pickalignment>'
  })
  .state('generatorThree',{
    url: '/generatorthree',
    template: '<generatorthree></generatorthree>'
  })
  .state('generatorSpells', {
    url:'/pickspells',
    template: '<pickspells></pickspells>'
  })
  .state('generatorWeapons', {
    url:'/pickweapons',
    template: '<pickweapons></pickweapons>'
  })
  .state('generatorEquip', {
    url:'/pickequip',
    template: '<pickequip></pickequip>'
  })
  .state('generatorStats', {
    url:'/pickstats',
    template: '<pickstats></pickstats>'
  });
}
