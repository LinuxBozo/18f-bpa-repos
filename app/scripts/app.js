'use strict';

/**
 * @ngdoc overview
 * @name adsbpaStatsApp
 * @description
 * # adsbpaStatsApp
 *
 * Main module of the application.
 */
angular
  .module('adsbpaStatsApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngLodash',
    'ngMaterial',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
