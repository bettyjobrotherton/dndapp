'use strict';

describe('Controller: UsermainCtrl', function() {
  // load the controller's module
  beforeEach(module('dndappApp.usermain'));

  var UsermainCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    UsermainCtrl = $controller('UsermainCtrl', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
