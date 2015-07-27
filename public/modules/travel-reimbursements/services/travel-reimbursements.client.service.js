'use strict';

//Travel reimbursements service used to communicate Travel reimbursements REST endpoints
angular.module('travel-reimbursements').factory('TravelReimbursements', ['$resource',
	function($resource) {
		return $resource('travel-reimbursements/:travelReimbursementId', { travelReimbursementId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);