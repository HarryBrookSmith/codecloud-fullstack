'use strict';

angular.module('codecloudFullstackApp')
  .controller('EditorCtrl', function ($scope, Auth, $http, AppState, $location, $stateParams, $state) {

  	// CodeMirror Setup 
  	$scope.editorOptions = {
        lineWrapping : true,
        lineNumbers: true,
        mode: 'javascript',
        theme: 'monokai',
    };

    $scope.editorState = '';
    // get user logged in status
    $scope.isLoggedIn = Auth.isLoggedIn;
    // get user name
    $scope.getCurrentUser = Auth.getCurrentUser;
    console.log($scope.getCurrentUser().name);
    // get current user ID
    $scope.CurrentUserID = $scope.getCurrentUser()._id;
    // Form Scope
    $scope.editorForm = {};
    // Snippet title
    $scope.editorForm.title = "";
    // Snippet description
    $scope.editorForm.description  = "";
    // Snippet topic(s)
    $scope.topicTags = [];
    // Snippet language(s)
    $scope.languageTags = [];
    // Snippet project(s)
    $scope.projectTags = [];
    // code editor content
    $scope.editorContent = "";

    
    $scope.init = function(query) {
      // On load Detect state
      if ($state.current.name == "editor.new")
      { 
        // starting a new snippet
        $scope.editorState = "new";
      } else {
        // editing a current snippet
        $scope.editorState = "edit";
      }
    };

    $scope.init();

    $scope.loadTags = function(query) {
        //return $http.get('/tags?query=' + query);
    };
    
    $scope.saveSnippet = function() {
        // before saving decide whether this is a new snippet or if editing existing one.
        if ($scope.editorState == "new") {
          console.log("saving new snippet...");
          $scope.addSnippet();   
        } else {
          console.log("updating snippet...");
          $scope.updateSnippet();   
        }
    }
  
    $scope.addSnippet = function() { 
      if($scope.newSnippet === '') {
        return;
      }
      // grab current time
      var timeModified = new Date();
      // post new snippet
      $http.post('/api/snippets', { 
        title: $scope.editorForm.title,
        description: $scope.editorForm.description,
        topicTags: $scope.topicTags,
        languageTags: $scope.languageTags,
        projectTags: $scope.projectTags,
        snippet: $scope.editorContent,
        dateModified: timeModified,
        createdBy: $scope.CurrentUserID
      }).success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(data._id);
      }).error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
      $scope.newSnippet = '';
    };

    $scope.updateSnippet = function() { 
      if($scope.newSnippet === '') {
        return;
      }
      //grab user name
      $scope.getCurrentUser = Auth.getCurrentUser;
      // grab current time
      var timeModified = new Date();
      // post new snippet
      $http.put('/api/snippets/' + snippetID, { 
        title: $scope.editorForm.title,
        description: $scope.editorForm.description,
        topicTags: $scope.topicTags,
        languageTags: $scope.languageTags,
        projectTags: $scope.projectTags,
        snippet: $scope.editorContent,
        dateModified: timeModified,
        createdBy: $scope.CurrentUserID
      }).success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        console.info("Successfully updated: Snippet ID: " + data._id);
      }).error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
      $scope.newSnippet = '';
    };

    $scope.deleteThing = function(snippet) {
      $http.delete('/api/snippets/' + snippet._id);
    };

    console.log($stateParams.snippetId);

  });

