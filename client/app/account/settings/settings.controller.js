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
  message = { text: '', type: '' };
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
        this.email = data.email;
      });
  }

    changeSettings(form) {
      if(form.username.$dirty) {
        this.changeUsername(form);
      }
      if (form.email.$dirty) {
        this.changeEmail(form);
      }
      if (form.newPassword.$dirty) {
        this.changePassword(form);
      }
    }

    changeEmail(form) {
      this.submitted= true;
      if(form.email.$valid) {
        this.Auth.changeEmail(this.email)
          .then(() => {
            this.message.text = 'email successfully changed.';
            this.message.type = 'success';
          })
          .catch(() => {
            this.message.text = 'email failed to change.';
            this.message.type = 'error';
          });
        } else {
          this.message.text = 'email failed to change.';
          this.message.type = 'error';
        }
      }


      changeUsername(form) {
        this.submitted = true;
        if(form.username.$valid) {
          this.Auth.changeUsername(this.username)
            .then(() => {
              this.message.text = 'Username successfully changed.';
              this.message.type = 'success';
            })
            .catch(() => {
              this.message.text = 'Username failed to change.';
              this.message.type = 'error';
            });
        } else {
          this.message.text = 'Username failed to change.';
          this.message.type = 'error';
        }
      }

      changePassword(form) {
        this.submitted = true;
        if(form.$valid) {
          this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
            .then(() => {
              this.message.text = 'Password successfully changed.';
              this.message.type = 'success';
            })
            .catch(() => {
              form.password.$setValidity('mongoose', false);
              this.errors.other = 'Incorrect password';
              this.message.text = 'Incorrect password';
              this.message.type = 'error';
            });
        }
      }
}
