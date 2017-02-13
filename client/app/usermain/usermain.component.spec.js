'use strict';

describe('Component: UsermainComponent', function() {
  // load the controller's module
  beforeEach(module('dndappApp.usermain'));

  var UsermainComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    UsermainComponent = $componentController('usermain', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
