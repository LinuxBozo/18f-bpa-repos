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

    $scope.order = '-pushed_at';

    $http.get('repos.json').then(function(res) {
      $scope.repos = lodash.values(res.data);
      console.log($scope.repos);
    });

    $scope.setOrder = function(order) {
      $scope.order = order;
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
