'use strict';

// TravelReimbursementDetail controller
angular.module('travel-reimbursement-details').controller('TravelReimbursementDetailsController', ['$scope', '$stateParams', '$location', 'Authentication', 'TravelReimbursementDetails',
	function($scope, $stateParams, $location, Authentication, TravelReimbursementDetails) {
		$scope.authentication = Authentication;

		// Create new TravelReimbursementDetail
		$scope.create = function() {
			// Create new TravelReimbursementDetail object
			var travelreimbursementdetail = new TravelReimbursementDetails ({
        
        sno: this.sno,
        
        clientLocation: this.clientLocation,
        
        jobNumber: this.jobNumber,
        
        fromDate: this.fromDate,
        
        toDate: this.toDate,
        
        noOfDays: this.noOfDays,
        
        conveyance: this.conveyance,
        
        foodAllowance: this.foodAllowance,
        
        otherExpenses: this.otherExpenses,
        
        totalAmount: this.totalAmount,
              
        created: Date.now
  
			});

			// Redirect after save
			travelreimbursementdetail.$save(function(response) {
				$location.path('travel-reimbursement-details/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing TravelReimbursementDetail
		$scope.remove = function(travelreimbursementdetail) {
			if ( travelreimbursementdetail ) { 
				travelreimbursementdetail.$remove();

				for (var i in $scope.TravelReimbursementDetails) {
					if ($scope.travelreimbursementdetails [i] === travelreimbursementdetail) {
						$scope.travelreimbursementdetails.splice(i, 1);
					}
				}
			} else {
				$scope.travelreimbursementdetail.$remove(function() {
					$location.path('travel-reimbursement-details');
				});
			}
		};

		// Update existing TravelReimbursementDetail
		$scope.update = function() {
			var travelreimbursementdetail = $scope.travelreimbursementdetail;

			travelreimbursementdetail.$update(function() {
				$location.path('travel-reimbursement-details/' + travelreimbursementdetail._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of TravelReimbursementDetail
		$scope.find = function() {
			$scope.travelreimbursementdetails = TravelReimbursementDetails.query();
		};

		// Find existing TravelReimbursementDetail
		$scope.findOne = function() {
			$scope.travelreimbursementdetail = TravelReimbursementDetails.get({ 
				travelreimbursementdetailId: $stateParams.travelreimbursementdetailId
			});
		};
	}
]);