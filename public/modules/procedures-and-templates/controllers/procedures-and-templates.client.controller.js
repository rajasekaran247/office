'use strict';

// ProceduresAndTemplates controller
angular.module('procedures-and-templates').controller('ProceduresAndTemplatesController', ['$scope', '$stateParams', '$location', 'Authentication', 'ProceduresAndTemplates',
	function($scope, $stateParams, $location, Authentication, ProceduresAndTemplates) {
		$scope.authentication = Authentication;

		// Create new ProceduresAndTemplates
		$scope.create = function() {
			// Create new ProceduresAndTemplates object
			var proceduresandtemplates = new ProceduresAndTemplates ({
        
        jobId: this.jobId,
        
        content: this.content,
              
        created: Date.now
  
			});

			// Redirect after save
			proceduresandtemplates.$save(function(response) {
				$location.path('procedures-and-templates/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing ProceduresAndTemplates
		$scope.remove = function(proceduresandtemplates) {
			if ( proceduresandtemplates ) { 
				proceduresandtemplates.$remove();

				for (var i in $scope.ProceduresAndTemplates) {
					if ($scope.proceduresandtemplates [i] === proceduresandtemplates) {
						$scope.proceduresandtemplates.splice(i, 1);
					}
				}
			} else {
				$scope.proceduresandtemplates.$remove(function() {
					$location.path('procedures-and-templates');
				});
			}
		};

		// Update existing ProceduresAndTemplates
		$scope.update = function() {
			var proceduresandtemplates = $scope.proceduresandtemplates;

			proceduresandtemplates.$update(function() {
				$location.path('procedures-and-templates/' + proceduresandtemplates._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of ProceduresAndTemplates
		$scope.find = function() {
			$scope.proceduresandtemplates = ProceduresAndTemplates.query();
		};

		// Find existing ProceduresAndTemplates
		$scope.findOne = function() {
			$scope.proceduresandtemplates = ProceduresAndTemplates.get({ 
				proceduresandtemplatesId: $stateParams.proceduresandtemplatesId
			});
		};
	}
]);