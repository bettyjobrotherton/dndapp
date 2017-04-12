'use strict';

// Use local.env.js for environment variables that will be set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'http://localhost:9000',
  SESSION_SECRET: 'dndapp-secret',
  SENDGRID_API_KEY: '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',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
