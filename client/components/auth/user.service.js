'use strict';

export function UserResource($resource) {
  'ngInject';

  return $resource('/api/users/:id/:controller', {
    id: '@_id'
  }, {
    changePassword: {
      method: 'PUT',
      params: {
        controller: 'password'
      }
    },
    changeUsername: {
      method: 'PUT',
      params: {
        controller: 'username'
      }
    },
    get: {
      method: 'GET',
      params: {
        id: 'me'
      }
    }
  });
}
