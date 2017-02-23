'use strict';

export default function routes($stateProvider){
  'ngInject';

  $stateProvider.state('charlist', {
    url: '/charlist',
    template: '<charlist></charlist>'
  })
  .state('charprofile', {
    url: '/charprofile',
    template: '<charprofile></charprofile>'
  })
  .state('charprofile2', {
    url: '/charprofile/:id',
    template: '<charprofile></charprofile>'
  });
}
