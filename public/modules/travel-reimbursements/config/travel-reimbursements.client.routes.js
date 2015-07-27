'use strict';

//Setting up route
angular.module('travel-reimbursements').config(['$stateProvider',
	function($stateProvider) {
		// Travel reimbursements state routing
		$stateProvider.
		state('listTravelReimbursements', {
			url: '/travel-reimbursements',
			templateUrl: 'modules/travel-reimbursements/views/list-travel-reimbursements.client.view.html'
		}).
		state('createTravelReimbursement', {
			url: '/travel-reimbursements/create',
			templateUrl: 'modules/travel-reimbursements/views/create-travel-reimbursement.client.view.html'
		}).
		state('viewTravelReimbursement', {
			url: '/travel-reimbursements/:travelReimbursementId',
			templateUrl: 'modules/travel-reimbursements/views/view-travel-reimbursement.client.view.html'
		}).
		state('editTravelReimbursement', {
			url: '/travel-reimbursements/:travelReimbursementId/edit',
			templateUrl: 'modules/travel-reimbursements/views/edit-travel-reimbursement.client.view.html'
		});
	}
]);