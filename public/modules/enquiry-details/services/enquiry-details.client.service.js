'use strict';

//Enquiry details service used to communicate Enquiry details REST endpoints
angular.module('enquiry-details').factory('EnquiryDetails', ['$resource',
	function($resource) {
		return $resource('enquiry-details/:enquiryDetailId', { enquiryDetailId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);