'use strict';

//Setting up route
angular.module('enquiry-details').config(['$stateProvider',
	function($stateProvider) {
		// Enquiry details state routing
		$stateProvider.
		state('listEnquiryDetails', {
			url: '/enquiry-details',
			templateUrl: 'modules/enquiry-details/views/list-enquiry-details.client.view.html'
		}).
		state('createEnquiryDetail', {
			url: '/enquiry-details/create',
			templateUrl: 'modules/enquiry-details/views/create-enquiry-detail.client.view.html'
		}).
		state('viewEnquiryDetail', {
			url: '/enquiry-details/:enquiryDetailId',
			templateUrl: 'modules/enquiry-details/views/view-enquiry-detail.client.view.html'
		}).
		state('editEnquiryDetail', {
			url: '/enquiry-details/:enquiryDetailId/edit',
			templateUrl: 'modules/enquiry-details/views/edit-enquiry-detail.client.view.html'
		});
	}
]);