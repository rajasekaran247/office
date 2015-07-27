'use strict';

//Setting up route
angular.module('office-expenses').config(['$stateProvider',
	function($stateProvider) {
		// Office expenses state routing
		$stateProvider.
		state('listOfficeExpenses', {
			url: '/office-expenses',
			templateUrl: 'modules/office-expenses/views/list-office-expenses.client.view.html'
		}).
		state('createOfficeExpense', {
			url: '/office-expenses/create',
			templateUrl: 'modules/office-expenses/views/create-office-expense.client.view.html'
		}).
		state('viewOfficeExpense', {
			url: '/office-expenses/:officeExpenseId',
			templateUrl: 'modules/office-expenses/views/view-office-expense.client.view.html'
		}).
		state('editOfficeExpense', {
			url: '/office-expenses/:officeExpenseId/edit',
			templateUrl: 'modules/office-expenses/views/edit-office-expense.client.view.html'
		});
	}
]);