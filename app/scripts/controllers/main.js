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

    $scope.$on("$stateChangeStart", function(state, params){
        $scope.currentState = params.name;
    });

  });

angular.module('testApp')
  .controller('SecondCtrl', function ($scope, runtimeStates, MANIFEST, $state) {

    console.info("secondCtrl");
  });

angular.module('testApp').config(
    function makeRoutes($stateProvider, $urlRouterProvider, MANIFEST){
        for (var prop in MANIFEST.states){
            var state = MANIFEST.states[prop];
            console.info(state.name , state);
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

 // config-time dependencies can be injected here at .provider() declaration
 angular.module('testApp').provider('runtimeStates', function runtimeStates($stateProvider) {
  // runtime dependencies for the service can be injected here, at the provider.$get() function.
  this.$get = function($q, $timeout, $state) { // for example
    return { 
      addState: function(name, state) { 
        console.info("adding state");
        console.info(name, state);
        $stateProvider.state(name, state);
      }
    }
  }
});