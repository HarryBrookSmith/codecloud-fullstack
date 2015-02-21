'use strict';

angular.module('codecloudFullstackApp')
  .config(function ($stateProvider) {
    $stateProvider
	    .state('editor', {
	        abstract: true,
	        url: '/editor',
	        // abstract still needs a ui-view for its children to populate.
	        template: '<ui-view/>'
	    })
		    .state('editor.view', {
		      	// If there's an url paramater supplied enter view post state
		        templateUrl: 'app/editor/editor.html',
		        url: '/{snippetId:int}',
		        controller: 'EditorCtrl'
		    })
		    .state('editor.new', {
		    	  // If url is /new then load without url parameter
		        url: '/new',
		        templateUrl: 'app/editor/editor.html',
		        controller: 'EditorCtrl'
		    });
  });

