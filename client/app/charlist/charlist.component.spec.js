'use strict';

import charlist from './charlist.component';
import { CharListComponent } from './charlist.component';

describe('Component: CharListComponent', function() {
  // load the controller's module
  beforeEach(module('dndappApp.charlist'));

  var CharListComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    CharListComponent = $componentController('charlist', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
