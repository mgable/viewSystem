'use strict';

/**
 * @ngdoc function
 * @name testApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the testApp
 */
angular.module('testApp')
  .controller('MainCtrl', function ($scope, MANIFEST, $state) {
    $scope.manifest = MANIFEST;
    $scope.currentState = $state.current.name;
    $scope.foo = "bar";

    $scope.$on("$stateChangeStart", function(state, params){
        $scope.currentState = params.name;
    });

  });

angular.module('testApp')
  .controller('SecondCtrl', function ($scope, MANIFEST, $state) {
    $scope.foo = "foo";

    $scope.$watch("username", function(data){
      if (data){ 
        $scope.backwards = data.split("").reverse().join("");
      }
    });

  });

angular.module('testApp').config(
    function makeRoutes($stateProvider, $urlRouterProvider, MANIFEST){
        for (var prop in MANIFEST.states){
            var state = MANIFEST.states[prop];
            $stateProvider.state(state.name, state);
        }
        $urlRouterProvider.when("", "/");
        $urlRouterProvider.otherwise("/");
    });

 angular.module('testApp').config( function($mdThemingProvider){
    // Configure a dark theme with primary foreground yellow
    $mdThemingProvider.theme('docs-dark', 'default')
        .primaryPalette('green')
        .dark();
  });
