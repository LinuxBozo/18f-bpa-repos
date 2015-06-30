'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('adsbpaStatsApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should set initial scope', function () {
    expect(scope.order).toBe('-pushed_at');
    expect(scope.orderColumn).toBe('pushed_at');
    expect(scope.orderAsc).toBe(false);
  });

  it('should set correct order', function() {
    scope.setOrder('pushed_at');
    expect(scope.orderColumn).toBe('pushed_at');
    expect(scope.orderAsc).toBe(true);
    scope.setOrder('foo');
    expect(scope.orderColumn).toBe('foo');
    expect(scope.orderAsc).toBe(false);
  });
});
