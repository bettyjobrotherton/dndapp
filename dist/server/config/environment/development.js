'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================

module.exports = {

  // MongoDB connection options
  mongo: {
    //uri: 'mongodb://localhost/dndapp-dev'
    uri: 'mongodb://admin:dndapp@ds131320.mlab.com:31320/dndappdb'
  },

  // Seed database on startup
  seedDB: false

};
//# sourceMappingURL=development.js.map