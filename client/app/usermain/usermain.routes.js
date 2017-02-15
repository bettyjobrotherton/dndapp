'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('usermain', {
      url: '/usermain',
      template: '<usermain></usermain>',
    });
}
