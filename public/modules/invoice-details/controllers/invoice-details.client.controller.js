'use strict';

// InvoiceDetail controller
angular.module('invoice-details').controller('InvoiceDetailsController', ['$scope', '$stateParams', '$location', 'Authentication', 'InvoiceDetails',
	function($scope, $stateParams, $location, Authentication, InvoiceDetails) {
		$scope.authentication = Authentication;

		// Create new InvoiceDetail
		$scope.create = function() {
			// Create new InvoiceDetail object
			var invoicedetail = new InvoiceDetails ({
        
        sno: this.sno,
        
        particulars: this.particulars,
        
        amount: this.amount,
        
        note: this.note,
              
        created: Date.now
  
			});

			// Redirect after save
			invoicedetail.$save(function(response) {
				$location.path('invoice-details/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing InvoiceDetail
		$scope.remove = function(invoicedetail) {
			if ( invoicedetail ) { 
				invoicedetail.$remove();

				for (var i in $scope.InvoiceDetails) {
					if ($scope.invoicedetails [i] === invoicedetail) {
						$scope.invoicedetails.splice(i, 1);
					}
				}
			} else {
				$scope.invoicedetail.$remove(function() {
					$location.path('invoice-details');
				});
			}
		};

		// Update existing InvoiceDetail
		$scope.update = function() {
			var invoicedetail = $scope.invoicedetail;

			invoicedetail.$update(function() {
				$location.path('invoice-details/' + invoicedetail._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of InvoiceDetail
		$scope.find = function() {
			$scope.invoicedetails = InvoiceDetails.query();
		};

		// Find existing InvoiceDetail
		$scope.findOne = function() {
			$scope.invoicedetail = InvoiceDetails.get({ 
				invoicedetailId: $stateParams.invoicedetailId
			});
		};
	}
]);