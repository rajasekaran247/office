'use strict';

//Office expenses service used to communicate Office expenses REST endpoints
angular.module('office-expenses').factory('OfficeExpenses', ['$resource',
	function($resource) {
		return $resource('office-expenses/:officeExpenseId', { officeExpenseId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);