'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('main', {
    url: '/',
    template: '<main></main>'
  })
  .state('verifying', {
    url: '/verifying',
    template: '<verifying></verifying>'
  });
}
