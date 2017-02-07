'use strict';

describe('Component: example', function() {
  // load the component's module
  beforeEach(module('dndappApp.example'));

  var exampleComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    exampleComponent = $componentController('example', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
