'use strict';

export default class SettingsController {
  user = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  errors = {
    other: undefined
  };
  message = '';
  submitted = false;


  /*@ngInject*/
  constructor(Auth) {
    this.Auth = Auth;
    this.editUsername = false;
    this.getCurrentUser = Auth.getCurrentUserSync;
  }

  $onInit() {
      this.getCurrentUser().$promise.then(data => {
        this.username = data.name;
        console.log(data);
      });
  }

  changeUsername(form) {
    this.submitted = true;
    console.log(form);
    if(form.username.$valid) {
      this.Auth.changeUsername(this.username)
        .then(() => {
          this.message = 'Username successfully changed.';
        })
        .catch(() => {
          this.message = 'Username failed to change.';
        });
    } else {
      this.message = 'Username failed to change.';
    }
  }


  changePassword(form) {
    this.submitted = true;

    if(form.$valid) {
      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then(() => {
          this.message = 'Password successfully changed.';
        })
        .catch(() => {
          form.password.$setValidity('mongoose', false);
          this.errors.other = 'Incorrect password';
          this.message = '';
        });
    }
  }
}
