'use strict';

/**
 * @ngdoc function
 * @name adsbpaStatsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the adsbpaStatsApp
 */
angular.module('adsbpaStatsApp')
  .controller('MainCtrl', function ($scope, $http, $mdDialog, lodash) {

    $scope.orderColumn = 'pushed_at';
    $scope.orderAsc = false;
    $scope.order = '-pushed_at';

    $http.get('repos').then(function(res) {
      $scope.repos = lodash.values(res.data);
    });

    $scope.setOrder = function(order) {
      if (order === $scope.orderColumn) {
        $scope.orderAsc = !$scope.orderAsc;
      } else {
        $scope.orderAsc = false;
      }
      $scope.orderColumn = order;
      $scope.order = $scope.orderAsc ? $scope.orderColumn : '-' + $scope.orderColumn;
    };

    $scope.showDescription = function(ev, title, description) {
      // Appending dialog to document.body to cover sidenav in docs app
      // Modal dialogs should fully cover application
      // to prevent interaction outside of dialog
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.body))
          .title(title)
          .content(description)
          .ariaLabel('Alert Dialog Demo')
          .ok('Done')
          .targetEvent(ev)
      );
    };

  });
