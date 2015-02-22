'use strict';

angular.module('codecloudFullstackApp')
  .controller('EditorCtrl', function ($scope, Auth, $http, AppState, $location, $stateParams, $state) {

  	// CodeMirror Setup 
  	$scope.editorOptions = {
        lineWrapping : true,
        lineNumbers: true,
        mode: 'javascript',
        theme: 'monokai'
    };

    // Languages Supported
    $scope.languageSupported = "javascript","php","css","html","sass";

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
    $scope.topicTags = {};
    // Snippet language(s)
    $scope.languageTags = {};
    // Snippet project(s)
    $scope.projectTags = {};
    // code editor content
    $scope.editorContent = "";



    
    $scope.init = function() {
      console.log($state.current);
      //On load Detect state
      if ($state.current.name == "editor.new")
      { 
        // starting a new snippet
        $scope.editorState = "new";
      } else if ($state.current.name == "editor.view")
      {
        $scope.editorState = "view";
        var id = $stateParams.snippetId;
        // editing a current snippet
        // load snippet and pass in url param
        $scope.loadSnippet(id);
      }
    };

    $scope.copyToClipboard = function(text) {
      window.prompt("Copy to clipboard: Ctrl+C / CMD+C Enter", text);
    }
    



    $scope.loadLanguageTags = function(query) {
        // get language tags
        //return $http.get('languageTags.json');
    };
    
    $scope.saveSnippet = function() {
          console.log($scope.languageTags);
        //before saving decide whether this is a new snippet or if editing existing one.
        if ($scope.editorState == "new") {
          console.log("saving new snippet...");
          $scope.addSnippet();   
        } else {
          console.log("updating snippet...");
          var id = $stateParams.snippetId;
          $scope.updateSnippet($stateParams.snippetId);   
        }
    };

    $scope.loadSnippet = function(snippetID) { 
        // load a single snippet using ID
        $http.get('/api/snippets/' + snippetID ).success(function(snippetResponse) {
          $scope.editorForm.title = snippetResponse.title; 
          $scope.editorForm.description = snippetResponse.description; 
          $scope.topicTags = snippetResponse.topicTags; 
          $scope.languageTags = snippetResponse.languageTags; 
          $scope.projectTags = snippetResponse.projectTags; 
          $scope.editorContent = snippetResponse.snippet;
          console.log(snippetResponse.languageTags)
        });
    };
  
    $scope.addSnippet = function() { 
      if($scope.newSnippet === '') {
        return;
      }
      // grab current time
      var timeModified = new Date();
      // ABSTRACT ALL THIS INTO A SNIPPETS OBJECT!!!!!!!!!!
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
        // move to edit mode
        $location.path( "/editor/" + data._id);
        //$state.go('editor.view',{'snippetID':data._id});
      }).error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
      $scope.newSnippet = '';
    };


    $scope.updateSnippet = function(snippetID) { 
      if($scope.newSnippet === '') {
        return;
      }
      //grab user name
      $scope.getCurrentUser = Auth.getCurrentUser;
      // grab current time
      var timeModified = new Date();
      // ABSTRACT ALL THIS INTO A SNIPPETS OBJECT!!!!!!!!!!
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

    // Initialise Controller
    $scope.init();

  });

