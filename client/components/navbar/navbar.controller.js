'use strict';

angular.module('codecloudFullstackApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, AppState, $state) {
    
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
     console.log($state.current.name);
      if ( $state.current.name == "editor.new" || $state.current.name ==  "editor.view")  {
        // set to true
        $scope.appState.editorEnabled = true;
      } else {
        // other wise set false
        $scope.appState.editorEnabled = false;
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