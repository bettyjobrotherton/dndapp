'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    //uri: 'mongodb://admin:dndapp@ds131320.mlab.com:31320/dndappdb?connectionTimeoutMS=300000'
    uri: 'mongodb://localhost/dndapp-dev'
  },

  sendgrid: {
    api: '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'
  },

  // Seed database on startup
  seedDB: false

};
