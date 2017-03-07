'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('generator', {
    url: '/generator',
    template: '<generator></generator>'
  })
  .state('generatorClass', {
    url: '/pickclass',
    template: '<pickclass></pickclass>'
  })
  .state('generatorRace', {
    url:'/pickrace',
    template: '<pickrace></pickrace>'
  })
  .state('generator2',{
    url: '/generator2',
    template: '<generator2></generator2>'
  })
  .state('generatorBackgralignment', {
    url:'/pickbackground',
    template: '<pickbackground></pickbackground>'
  })
  .state('generatorAlignment', {
    url:'/pickalignment',
    template: '<pickalignment></pickalignment>'
  });
}
