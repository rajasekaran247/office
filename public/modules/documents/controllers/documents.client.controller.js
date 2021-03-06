'use strict';

// Document controller
angular.module('documents').controller('DocumentsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Documents',
	function($scope, $stateParams, $location, Authentication, Documents) {
		$scope.authentication = Authentication;

		// Create new Document
		$scope.create = function() {
			// Create new Document object
			var document = new Documents ({
        
        jobId: this.jobId,
        
        file: this.file,
              
        created: Date.now
  
			});

			// Redirect after save
			document.$save(function(response) {
				$location.path('documents/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Document
		$scope.remove = function(document) {
			if ( document ) { 
				document.$remove();

				for (var i in $scope.Documents) {
					if ($scope.documents [i] === document) {
						$scope.documents.splice(i, 1);
					}
				}
			} else {
				$scope.document.$remove(function() {
					$location.path('documents');
				});
			}
		};

		// Update existing Document
		$scope.update = function() {
			var document = $scope.document;

			document.$update(function() {
				$location.path('documents/' + document._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Document
		$scope.find = function() {
			$scope.documents = Documents.query();
		};

		// Find existing Document
		$scope.findOne = function() {
			$scope.document = Documents.get({ 
				documentId: $stateParams.documentId
			});
		};
	}
]);