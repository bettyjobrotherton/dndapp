'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('generator', {
    url: '/generator',
    template: '<generator></generator>'
  })
  .state('generator2', {
    url: '/pickclass',
    template: '<pickclass></pickclass>'
  });
}
