'use strict';

// Contact controller
angular.module('contacts').controller('ContactsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Contacts',
	function($scope, $stateParams, $location, Authentication, Contacts) {
		$scope.authentication = Authentication;

		// Create new Contact
		$scope.create = function() {
			// Create new Contact object
			var contact = new Contacts ({
        
        name: this.name,
        
        code: this.code,
        
        type: this.type,
        
        contactType: this.contactType,
        
        mailingName: this.mailingName,
        
        salutation: this.salutation,
        
        tan: this.tan,
        
        pan: this.pan,
        
        tin: this.tin,
        
        serviceTaxNumber: this.serviceTaxNumber,
        
        assignedToPartner: this.assignedToPartner,
        
        assignedToManager: this.assignedToManager,
        
        assignedToEntities: this.assignedToEntities,
        
        assignedToBranchLocation: this.assignedToBranchLocation,
        
        postalAddressAddressee: this.postalAddressAddressee,
        
        postalAddressAddress: this.postalAddressAddress,
        
        postalAddressCity: this.postalAddressCity,
        
        postalAddressState: this.postalAddressState,
        
        postalAddressPostcode: this.postalAddressPostcode,
        
        postalAddressCountry: this.postalAddressCountry,
        
        communicationsWorkPhone: this.communicationsWorkPhone,
        
        communicationsMobile: this.communicationsMobile,
        
        communicationsSkype: this.communicationsSkype,
        
        communicationsHomePhone: this.communicationsHomePhone,
        
        communicationsFax: this.communicationsFax,
        
        communicationsTwitter: this.communicationsTwitter,
        
        communicationsEmail: this.communicationsEmail,
        
        communicationsLinkedin: this.communicationsLinkedin,
        
        communicationsWebsite: this.communicationsWebsite,
        
        contactTaxYearEnd: this.contactTaxYearEnd,
        
        contactClientType: this.contactClientType,
        
        contactClientTypeSubcategory: this.contactClientTypeSubcategory,
        
        noofEmployees: this.noofEmployees,
        
        inBusinessSince: this.inBusinessSince,
        
        annualAccountsScheduling: this.annualAccountsScheduling,
        
        clientHistoryFrom: this.clientHistoryFrom,
        
        clientHistoryUntil: this.clientHistoryUntil,
              
        created: Date.now
  
			});

			// Redirect after save
			contact.$save(function(response) {
				$location.path('contacts/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Contact
		$scope.remove = function(contact) {
			if ( contact ) { 
				contact.$remove();

				for (var i in $scope.Contacts) {
					if ($scope.contacts [i] === contact) {
						$scope.contacts.splice(i, 1);
					}
				}
			} else {
				$scope.contact.$remove(function() {
					$location.path('contacts');
				});
			}
		};

		// Update existing Contact
		$scope.update = function() {
			var contact = $scope.contact;

			contact.$update(function() {
				$location.path('contacts/' + contact._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Contact
		$scope.find = function() {
			$scope.contacts = Contacts.query();
		};

		// Find existing Contact
		$scope.findOne = function() {
			$scope.contact = Contacts.get({ 
				contactId: $stateParams.contactId
			});
		};
	}
]);