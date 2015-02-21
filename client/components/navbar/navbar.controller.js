'use strict';

angular.module('codecloudFullstackApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, AppState) {
    
    // bind with service to share global app state
    $scope.appState = AppState;

    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    
     $scope.setEditorMode = function() {
      // if editor page
      if ( $location.path() == "/editor/new" ) {
        // set to true
        $scope.appState.state = true;
      } else {
        // other wise set false
        $scope.appState.state = false;
      }
    }
    // set global state based on location url
    $scope.init = function () {
      // update state
      $scope.setEditorMode();
    }
    // run init to set state on load
    $scope.init();
    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');

    };
    // on each page change
    $scope.$on('$locationChangeStart', function(event) {
      // update state
      $scope.setEditorMode();
    });

    $scope.isActive = function(viewLocation) {
      return viewLocation === $location.path();
      
    };

  });