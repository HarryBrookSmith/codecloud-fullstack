'use strict';

angular.module('codecloudFullstackApp')
  .controller('MainCtrl', function ($scope, $http, Auth, AppState, $location) {
    // bind with service to share global app state
    $scope.appState = AppState;
    
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.name = $scope.getCurrentUser().name;

    
  
    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
  });
