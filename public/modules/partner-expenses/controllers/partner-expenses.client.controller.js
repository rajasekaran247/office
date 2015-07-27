'use strict';

// PartnerExpense controller
angular.module('partner-expenses').controller('PartnerExpensesController', ['$scope', '$stateParams', '$location', 'Authentication', 'PartnerExpenses',
	function($scope, $stateParams, $location, Authentication, PartnerExpenses) {
		$scope.authentication = Authentication;

		// Create new PartnerExpense
		$scope.create = function() {
			// Create new PartnerExpense object
			var partnerexpense = new PartnerExpenses ({
        
        entryNo: this.entryNo,
        
        date: this.date,
        
        partnerName: this.partnerName,
        
        sno: this.sno,
        
        description: this.description,
        
        amount: this.amount,
        
        note: this.note,
              
        created: Date.now
  
			});

			// Redirect after save
			partnerexpense.$save(function(response) {
				$location.path('partner-expenses/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing PartnerExpense
		$scope.remove = function(partnerexpense) {
			if ( partnerexpense ) { 
				partnerexpense.$remove();

				for (var i in $scope.PartnerExpenses) {
					if ($scope.partnerexpenses [i] === partnerexpense) {
						$scope.partnerexpenses.splice(i, 1);
					}
				}
			} else {
				$scope.partnerexpense.$remove(function() {
					$location.path('partner-expenses');
				});
			}
		};

		// Update existing PartnerExpense
		$scope.update = function() {
			var partnerexpense = $scope.partnerexpense;

			partnerexpense.$update(function() {
				$location.path('partner-expenses/' + partnerexpense._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of PartnerExpense
		$scope.find = function() {
			$scope.partnerexpenses = PartnerExpenses.query();
		};

		// Find existing PartnerExpense
		$scope.findOne = function() {
			$scope.partnerexpense = PartnerExpenses.get({ 
				partnerexpenseId: $stateParams.partnerexpenseId
			});
		};
	}
]);