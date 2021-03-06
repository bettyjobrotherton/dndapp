'use strict';

import User from './user.model';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';
import { mail as helper } from 'sendgrid';

// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
//import mail from 'sendgrid';
//var sendgrid = require('sendgrid').mail;


function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    return res.status(statusCode).json(err);
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    return res.status(statusCode).send(err);
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
  return User.find({}, '-salt -password').populate('characters', '').exec()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}

function sendNewEmail(user) {
  try {
        // send email to new user
        //process.env.SENDGRID_API_KEY
        var to_email = new helper.Email(user.email) || "bmcleod@352inc.com";
        var from_email = new helper.Email("bmcleod@352inc.com") || "bmcleod+sender@352inc.com";
        var subject = "A hero has risen.";
        var content = new helper.Content("text/plain", "Welcome to the DnD Character Creator!");
        var mail = helper.Mail(new helper.Email("bmcleod@352inc.com"), "A hero has risen.", new helper.Email(user.email), new helper.Content("text/plain", "Welcome to the DnD Character Creator!"));
        console.log(mail);

        var sg = require('sendgrid')(config.sendgrid.api);
        var request = sg.emptyRequest({
          method: 'POST',
          path: '/v3/mail/send',
          body: mail.toJSON()
        });

        sg.API(request, function(error, response) {
          console.log(response.statusCode);
          console.log(response.body);
          console.log(response.headers);
        })

      } catch (e) {
        console.log(e);
      }
}

/**
 * Creates a new user
 */
export function create(req, res) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save()
    .then(function(user) {
      sendNewEmail(user);
      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      res.json({ token });

    })
    .catch(validationError(res));
}

/**
 * Get a single user
 */
export function show(req, res, next) {
  var userId = req.params.id;

  return User.findById(userId).populate('characters', '').exec()
    .then(user => {
      if(!user) {
        return res.status(404).end();
      }
      return res.json(user.profile);
    })
    .catch(err => next(err));
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
  return User.findByIdAndRemove(req.params.id).exec()
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
}

/**
 * Change a users password
 */
export function changePassword(req, res) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  return User.findById(userId).exec()
    .then(user => {
      if(user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}

/**
 * Change a users email.
 */
export function changeEmail(req, res) {
  var userId = req.user._id;
  var newEmail = String(req.body.newEmail);
  return User.findById(userId).exec()
    .then(user => {
      user.email = newEmail;
      return user.save()
        .then(() => {
          res.status(204).end();
        })
        .catch(validationError(res));
    });
}

/**
 * Change a users name.
 */
export function changeUsername(req, res) {
  var userId = req.user._id;
  var newUsername = String(req.body.newUsername);
  return User.findById(userId).exec()
    .then(user => {
      user.name = newUsername;
      return user.save()
        .then(() => {
          res.status(204).end();
        })
        .catch(validationError(res));
    });
}

/**
 * Get my info
 */
export function me(req, res, next) {
  var userId = req.user._id;

  return User.findOne({ _id: userId }, '-salt -password').populate('characters', '').exec()
    .then(user => { // don't ever give out the password or salt
      if(!user) {
        return res.status(401).end();
      }
      return res.json(user);
    })
    .catch(err => next(err));
}

/**
 * Authentication callback
 */
export function authCallback(req, res) {
  res.redirect('/');
}
