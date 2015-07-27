'use strict';

//Setting up route
angular.module('travel-reimbursement-details').config(['$stateProvider',
	function($stateProvider) {
		// Travel reimbursement details state routing
		$stateProvider.
		state('listTravelReimbursementDetails', {
			url: '/travel-reimbursement-details',
			templateUrl: 'modules/travel-reimbursement-details/views/list-travel-reimbursement-details.client.view.html'
		}).
		state('createTravelReimbursementDetail', {
			url: '/travel-reimbursement-details/create',
			templateUrl: 'modules/travel-reimbursement-details/views/create-travel-reimbursement-detail.client.view.html'
		}).
		state('viewTravelReimbursementDetail', {
			url: '/travel-reimbursement-details/:travelReimbursementDetailId',
			templateUrl: 'modules/travel-reimbursement-details/views/view-travel-reimbursement-detail.client.view.html'
		}).
		state('editTravelReimbursementDetail', {
			url: '/travel-reimbursement-details/:travelReimbursementDetailId/edit',
			templateUrl: 'modules/travel-reimbursement-details/views/edit-travel-reimbursement-detail.client.view.html'
		});
	}
]);