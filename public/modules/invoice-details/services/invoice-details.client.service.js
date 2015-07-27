'use strict';

//Invoice details service used to communicate Invoice details REST endpoints
angular.module('invoice-details').factory('InvoiceDetails', ['$resource',
	function($resource) {
		return $resource('invoice-details/:invoiceDetailId', { invoiceDetailId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);