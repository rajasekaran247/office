'use strict';

// EnquiryDetail controller
angular.module('enquiry-details').controller('EnquiryDetailsController', ['$scope', '$stateParams', '$location', 'Authentication', 'EnquiryDetails',
	function($scope, $stateParams, $location, Authentication, EnquiryDetails) {
		$scope.authentication = Authentication;

		// Create new EnquiryDetail
		$scope.create = function() {
			// Create new EnquiryDetail object
			var enquirydetail = new EnquiryDetails ({
        
        sno: this.sno,
        
        details: this.details,
        
        notes: this.notes,
              
        created: Date.now
  
			});

			// Redirect after save
			enquirydetail.$save(function(response) {
				$location.path('enquiry-details/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing EnquiryDetail
		$scope.remove = function(enquirydetail) {
			if ( enquirydetail ) { 
				enquirydetail.$remove();

				for (var i in $scope.EnquiryDetails) {
					if ($scope.enquirydetails [i] === enquirydetail) {
						$scope.enquirydetails.splice(i, 1);
					}
				}
			} else {
				$scope.enquirydetail.$remove(function() {
					$location.path('enquiry-details');
				});
			}
		};

		// Update existing EnquiryDetail
		$scope.update = function() {
			var enquirydetail = $scope.enquirydetail;

			enquirydetail.$update(function() {
				$location.path('enquiry-details/' + enquirydetail._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of EnquiryDetail
		$scope.find = function() {
			$scope.enquirydetails = EnquiryDetails.query();
		};

		// Find existing EnquiryDetail
		$scope.findOne = function() {
			$scope.enquirydetail = EnquiryDetails.get({ 
				enquirydetailId: $stateParams.enquirydetailId
			});
		};
	}
]);