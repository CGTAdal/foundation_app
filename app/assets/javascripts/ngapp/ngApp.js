'use strict';

// initialize Angular App
var ngApp = angular.module('ngApp', [
  'ngResource',
  'ngRoute',
  //'ngAnimate',
  'mm.foundation'
  // 'mgcrea.ngStrap'
]);

// making AngularJS work with CSRF protection
ngApp.config(function($httpProvider) {
  var authToken = $("meta[name=\"csrf-token\"]").attr("content");
  $httpProvider.defaults.headers.common["X-CSRF-TOKEN"] = authToken;
});

// Routes
ngApp.config(function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider
    .when('/dashboard', {
        templateUrl: '/templates/dashboard.html',
        controller: 'DashboardCtrl'
      })
    .otherwise({
        templateUrl: '/templates/dashboard.html',
        controller: 'DashboardCtrl'
      });
});

ngApp.run((function(_this) {
  return function($rootScope) {
    return $rootScope.$on('$viewContentLoaded', function() {
      return $(document).foundation();
    });
  };
})(this));
