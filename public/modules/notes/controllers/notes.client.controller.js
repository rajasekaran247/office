'use strict';

// Notes controller
angular.module('notes').controller('NotesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Notes',
	function($scope, $stateParams, $location, Authentication, Notes) {
		$scope.authentication = Authentication;

		// Create new Notes
		$scope.create = function() {
			// Create new Notes object
			var notes = new Notes ({
        
        jobId: this.jobId,
        
        notesDate: this.notesDate,
        
        category: this.category,
        
        note: this.note,
        
        remindOn: this.remindOn,
        
        reminderEmailAddress: this.reminderEmailAddress,
        
        repeatReminderYear: this.repeatReminderYear,
        
        repeatReminderMonth: this.repeatReminderMonth,
        
        repeatReminderDays: this.repeatReminderDays,
        
        repeatReminderEndBy: this.repeatReminderEndBy,
        
        createdBy: this.createdBy,
              
        created: Date.now
  
			});

			// Redirect after save
			notes.$save(function(response) {
				$location.path('notes/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Notes
		$scope.remove = function(notes) {
			if ( notes ) { 
				notes.$remove();

				for (var i in $scope.Notes) {
					if ($scope.notes [i] === notes) {
						$scope.notes.splice(i, 1);
					}
				}
			} else {
				$scope.notes.$remove(function() {
					$location.path('notes');
				});
			}
		};

		// Update existing Notes
		$scope.update = function() {
			var notes = $scope.notes;

			notes.$update(function() {
				$location.path('notes/' + notes._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Notes
		$scope.find = function() {
			$scope.notes = Notes.query();
		};

		// Find existing Notes
		$scope.findOne = function() {
			$scope.notes = Notes.get({ 
				notesId: $stateParams.notesId
			});
		};
	}
]);