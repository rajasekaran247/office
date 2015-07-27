'use strict';

// OfficeExpense controller
angular.module('office-expenses').controller('OfficeExpensesController', ['$scope', '$stateParams', '$location', 'Authentication', 'OfficeExpenses',
	function($scope, $stateParams, $location, Authentication, OfficeExpenses) {
		$scope.authentication = Authentication;

		// Create new OfficeExpense
		$scope.create = function() {
			// Create new OfficeExpense object
			var officeexpense = new OfficeExpenses ({
        
        entryNo: this.entryNo,
        
        date: this.date,
        
        employeeName: this.employeeName,
        
        sno: this.sno,
        
        description: this.description,
        
        amount: this.amount,
        
        note: this.note,
              
        created: Date.now
  
			});

			// Redirect after save
			officeexpense.$save(function(response) {
				$location.path('office-expenses/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing OfficeExpense
		$scope.remove = function(officeexpense) {
			if ( officeexpense ) { 
				officeexpense.$remove();

				for (var i in $scope.OfficeExpenses) {
					if ($scope.officeexpenses [i] === officeexpense) {
						$scope.officeexpenses.splice(i, 1);
					}
				}
			} else {
				$scope.officeexpense.$remove(function() {
					$location.path('office-expenses');
				});
			}
		};

		// Update existing OfficeExpense
		$scope.update = function() {
			var officeexpense = $scope.officeexpense;

			officeexpense.$update(function() {
				$location.path('office-expenses/' + officeexpense._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of OfficeExpense
		$scope.find = function() {
			$scope.officeexpenses = OfficeExpenses.query();
		};

		// Find existing OfficeExpense
		$scope.findOne = function() {
			$scope.officeexpense = OfficeExpenses.get({ 
				officeexpenseId: $stateParams.officeexpenseId
			});
		};
	}
]);