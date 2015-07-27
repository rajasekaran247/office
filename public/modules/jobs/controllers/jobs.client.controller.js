'use strict';

// Job controller
angular.module('jobs').controller('JobsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Jobs',
	function($scope, $stateParams, $location, Authentication, Jobs) {
		$scope.authentication = Authentication;

		// Create new Job
		$scope.create = function() {
			// Create new Job object
			var job = new Jobs ({
        
        client: this.client,
        
        jobType: this.jobType,
        
        periodEnded: this.periodEnded,
        
        entities: this.entities,
        
        branchLocation: this.branchLocation,
        
        jobOwner: this.jobOwner,
        
        currentlyResponsible: this.currentlyResponsible,
        
        targetEndDate: this.targetEndDate,
        
        jobStatus: this.jobStatus,
        
        priority: this.priority,
        
        jobDetails: this.jobDetails,
        
        openingWip: this.openingWip,
        
        openingWipdescription: this.openingWipdescription,
        
        agreedFee: this.agreedFee,
        
        budgetTotal: this.budgetTotal,
              
        created: Date.now
  
			});

			// Redirect after save
			job.$save(function(response) {
				$location.path('jobs/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Job
		$scope.remove = function(job) {
			if ( job ) { 
				job.$remove();

				for (var i in $scope.Jobs) {
					if ($scope.jobs [i] === job) {
						$scope.jobs.splice(i, 1);
					}
				}
			} else {
				$scope.job.$remove(function() {
					$location.path('jobs');
				});
			}
		};

		// Update existing Job
		$scope.update = function() {
			var job = $scope.job;

			job.$update(function() {
				$location.path('jobs/' + job._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Job
		$scope.find = function() {
			$scope.jobs = Jobs.query();
		};

		// Find existing Job
		$scope.findOne = function() {
			$scope.job = Jobs.get({ 
				jobId: $stateParams.jobId
			});
		};
	}
]);