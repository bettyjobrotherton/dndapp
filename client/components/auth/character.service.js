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
    },

    calculateModifier(as){
      console.log(as);
      var modifier;
      if( as <=1 ){
        modifier = -5;
      } else if( as <= 3 && as > 1 ){
        modifier = -4;
      } else if( as <= 5 && as > 3 ){
        modifier = -3;
      } else if( as <= 7 && as > 5 ){
        modifier = -2;
      } else if( as <= 9 && as > 7 ){
        modifier = -1;
      } else if( as <= 11 && as > 9 ){
	      modifier = 0;
      } else if( as <= 13 && as > 11 ){
	      modifier = 1;
      } else if( as <= 15 && as > 13 ){
	      modifier = 2;
      } else if( as <= 17 && as > 15 ){
	      modifier = 3;
      } else if( as <= 19 && as > 17 ){
	      modifier = 4;
      } else if( as <= 21 && as > 19 ){
	      modifier = 5;
      } else if( as <= 23 && as > 21 ){
        modifier = 6;
      } else if( as <= 25 && as > 23 ){
        modifier = 7;
      } else if( as <= 27 && as > 25 ){
	      modifier = 8;
      } else if( as <= 29 && as > 27 ){
	      modifier = 9;
      } else {
        modifier = 10;
      }
      console.log(modifier);
      return modifier;
    }

  };

  return Character;
}
