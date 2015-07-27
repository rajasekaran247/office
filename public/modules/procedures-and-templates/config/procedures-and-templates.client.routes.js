'use strict';

//Setting up route
angular.module('procedures-and-templates').config(['$stateProvider',
	function($stateProvider) {
		// Procedures and templates state routing
		$stateProvider.
		state('listProceduresAndTemplates', {
			url: '/procedures-and-templates',
			templateUrl: 'modules/procedures-and-templates/views/list-procedures-and-templates.client.view.html'
		}).
		state('createProceduresAndTemplate', {
			url: '/procedures-and-templates/create',
			templateUrl: 'modules/procedures-and-templates/views/create-procedures-and-template.client.view.html'
		}).
		state('viewProceduresAndTemplate', {
			url: '/procedures-and-templates/:proceduresAndTemplateId',
			templateUrl: 'modules/procedures-and-templates/views/view-procedures-and-template.client.view.html'
		}).
		state('editProceduresAndTemplate', {
			url: '/procedures-and-templates/:proceduresAndTemplateId/edit',
			templateUrl: 'modules/procedures-and-templates/views/edit-procedures-and-template.client.view.html'
		});
	}
]);