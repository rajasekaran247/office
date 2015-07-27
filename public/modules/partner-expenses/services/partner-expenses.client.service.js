'use strict';

//Partner expenses service used to communicate Partner expenses REST endpoints
angular.module('partner-expenses').factory('PartnerExpenses', ['$resource',
	function($resource) {
		return $resource('partner-expenses/:partnerExpenseId', { partnerExpenseId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);