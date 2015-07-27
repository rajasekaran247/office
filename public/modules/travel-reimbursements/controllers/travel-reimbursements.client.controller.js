'use strict';

// TravelReimbursement controller
angular.module('travel-reimbursements').controller('TravelReimbursementsController', ['$scope', '$stateParams', '$location', 'Authentication', 'TravelReimbursements',
	function($scope, $stateParams, $location, Authentication, TravelReimbursements) {
		$scope.authentication = Authentication;

		// Create new TravelReimbursement
		$scope.create = function() {
			// Create new TravelReimbursement object
			var travelreimbursement = new TravelReimbursements ({
        
        entryNo: this.entryNo,
        
        entryDate: this.entryDate,
        
        employeeName: this.employeeName,
        
        partnerName: this.partnerName,
              
        created: Date.now
  
			});

			// Redirect after save
			travelreimbursement.$save(function(response) {
				$location.path('travel-reimbursements/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing TravelReimbursement
		$scope.remove = function(travelreimbursement) {
			if ( travelreimbursement ) { 
				travelreimbursement.$remove();

				for (var i in $scope.TravelReimbursements) {
					if ($scope.travelreimbursements [i] === travelreimbursement) {
						$scope.travelreimbursements.splice(i, 1);
					}
				}
			} else {
				$scope.travelreimbursement.$remove(function() {
					$location.path('travel-reimbursements');
				});
			}
		};

		// Update existing TravelReimbursement
		$scope.update = function() {
			var travelreimbursement = $scope.travelreimbursement;

			travelreimbursement.$update(function() {
				$location.path('travel-reimbursements/' + travelreimbursement._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of TravelReimbursement
		$scope.find = function() {
			$scope.travelreimbursements = TravelReimbursements.query();
		};

		// Find existing TravelReimbursement
		$scope.findOne = function() {
			$scope.travelreimbursement = TravelReimbursements.get({ 
				travelreimbursementId: $stateParams.travelreimbursementId
			});
		};
	}
]);