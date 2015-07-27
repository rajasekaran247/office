'use strict';

//Setting up route
angular.module('partner-expenses').config(['$stateProvider',
	function($stateProvider) {
		// Partner expenses state routing
		$stateProvider.
		state('listPartnerExpenses', {
			url: '/partner-expenses',
			templateUrl: 'modules/partner-expenses/views/list-partner-expenses.client.view.html'
		}).
		state('createPartnerExpense', {
			url: '/partner-expenses/create',
			templateUrl: 'modules/partner-expenses/views/create-partner-expense.client.view.html'
		}).
		state('viewPartnerExpense', {
			url: '/partner-expenses/:partnerExpenseId',
			templateUrl: 'modules/partner-expenses/views/view-partner-expense.client.view.html'
		}).
		state('editPartnerExpense', {
			url: '/partner-expenses/:partnerExpenseId/edit',
			templateUrl: 'modules/partner-expenses/views/edit-partner-expense.client.view.html'
		});
	}
]);