'use strict';

//Setting up route
angular.module('invoice-details').config(['$stateProvider',
	function($stateProvider) {
		// Invoice details state routing
		$stateProvider.
		state('listInvoiceDetails', {
			url: '/invoice-details',
			templateUrl: 'modules/invoice-details/views/list-invoice-details.client.view.html'
		}).
		state('createInvoiceDetail', {
			url: '/invoice-details/create',
			templateUrl: 'modules/invoice-details/views/create-invoice-detail.client.view.html'
		}).
		state('viewInvoiceDetail', {
			url: '/invoice-details/:invoiceDetailId',
			templateUrl: 'modules/invoice-details/views/view-invoice-detail.client.view.html'
		}).
		state('editInvoiceDetail', {
			url: '/invoice-details/:invoiceDetailId/edit',
			templateUrl: 'modules/invoice-details/views/edit-invoice-detail.client.view.html'
		});
	}
]);