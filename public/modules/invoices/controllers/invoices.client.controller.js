'use strict';

// Invoice controller
angular.module('invoices').controller('InvoicesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Invoices',
	function($scope, $stateParams, $location, Authentication, Invoices) {
		$scope.authentication = Authentication;

		// Create new Invoice
		$scope.create = function() {
			// Create new Invoice object
			var invoice = new Invoices ({
        
        invoiceNo: this.invoiceNo,
        
        invoiceDate: this.invoiceDate,
        
        dueDate: this.dueDate,
        
        jobNo: this.jobNo,
        
        clientName: this.clientName,
        
        mainPartner: this.mainPartner,
        
        jobDoneFor: this.jobDoneFor,
        
        netAmount: this.netAmount,
        
        totalAmount: this.totalAmount,
        
        amountAlreadyDue: this.amountAlreadyDue,
        
        totalBalanceDue: this.totalBalanceDue,
        
        amountInWords: this.amountInWords,
        
        serviceTax: this.serviceTax,
        
        serviceTaxAmount: this.serviceTaxAmount,
        
        eduCess: this.eduCess,
        
        eduCessAmount: this.eduCessAmount,
        
        secEduCess: this.secEduCess,
        
        secEduCessAmount: this.secEduCessAmount,
        
        remarks: this.remarks,
              
        created: Date.now
  
			});

			// Redirect after save
			invoice.$save(function(response) {
				$location.path('invoices/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Invoice
		$scope.remove = function(invoice) {
			if ( invoice ) { 
				invoice.$remove();

				for (var i in $scope.Invoices) {
					if ($scope.invoices [i] === invoice) {
						$scope.invoices.splice(i, 1);
					}
				}
			} else {
				$scope.invoice.$remove(function() {
					$location.path('invoices');
				});
			}
		};

		// Update existing Invoice
		$scope.update = function() {
			var invoice = $scope.invoice;

			invoice.$update(function() {
				$location.path('invoices/' + invoice._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Invoice
		$scope.find = function() {
			$scope.invoices = Invoices.query();
		};

		// Find existing Invoice
		$scope.findOne = function() {
			$scope.invoice = Invoices.get({ 
				invoiceId: $stateParams.invoiceId
			});
		};
	}
]);