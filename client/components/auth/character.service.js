'use strict';

export function CharacterService($location, $http) {
  'ngInject';

  var selectChar;

  var Character = {
    getProfile(data){
      $http.get('api/characters/' + data)
           .then(res => {
             selectChar = res.data;
            //  console.log(selectChar);
             return selectChar;
           })
           .catch(err => {
             return err;
           });
    },

    returnProfile(){
      // console.log(selectChar);
      return selectChar;
    }

  };

  return Character;
}
