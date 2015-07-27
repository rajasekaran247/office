'use strict';

//Travel reimbursement details service used to communicate Travel reimbursement details REST endpoints
angular.module('travel-reimbursement-details').factory('TravelReimbursementDetails', ['$resource',
	function($resource) {
		return $resource('travel-reimbursement-details/:travelReimbursementDetailId', { travelReimbursementDetailId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);