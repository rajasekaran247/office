'use strict';

//Procedures and templates service used to communicate Procedures and templates REST endpoints
angular.module('procedures-and-templates').factory('ProceduresAndTemplates', ['$resource',
	function($resource) {
		return $resource('procedures-and-templates/:proceduresAndTemplateId', { proceduresAndTemplateId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);