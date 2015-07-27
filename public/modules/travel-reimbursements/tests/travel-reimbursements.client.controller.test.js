'use strict';

(function() {
	// Travel reimbursements Controller Spec
	describe('Travel reimbursements Controller Tests', function() {
		// Initialize global variables
		var TravelReimbursementsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Travel reimbursements controller.
			TravelReimbursementsController = $controller('TravelReimbursementsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Travel reimbursement object fetched from XHR', inject(function(TravelReimbursements) {
			// Create sample Travel reimbursement using the Travel reimbursements service
			var sampleTravelReimbursement = new TravelReimbursements({
				name: 'New Travel reimbursement'
			});

			// Create a sample Travel reimbursements array that includes the new Travel reimbursement
			var sampleTravelReimbursements = [sampleTravelReimbursement];

			// Set GET response
			$httpBackend.expectGET('travel-reimbursements').respond(sampleTravelReimbursements);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.travelReimbursements).toEqualData(sampleTravelReimbursements);
		}));

		it('$scope.findOne() should create an array with one Travel reimbursement object fetched from XHR using a travelReimbursementId URL parameter', inject(function(TravelReimbursements) {
			// Define a sample Travel reimbursement object
			var sampleTravelReimbursement = new TravelReimbursements({
				name: 'New Travel reimbursement'
			});

			// Set the URL parameter
			$stateParams.travelReimbursementId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/travel-reimbursements\/([0-9a-fA-F]{24})$/).respond(sampleTravelReimbursement);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.travelReimbursement).toEqualData(sampleTravelReimbursement);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(TravelReimbursements) {
			// Create a sample Travel reimbursement object
			var sampleTravelReimbursementPostData = new TravelReimbursements({
				name: 'New Travel reimbursement'
			});

			// Create a sample Travel reimbursement response
			var sampleTravelReimbursementResponse = new TravelReimbursements({
				_id: '525cf20451979dea2c000001',
				name: 'New Travel reimbursement'
			});

			// Fixture mock form input values
			scope.name = 'New Travel reimbursement';

			// Set POST response
			$httpBackend.expectPOST('travel-reimbursements', sampleTravelReimbursementPostData).respond(sampleTravelReimbursementResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Travel reimbursement was created
			expect($location.path()).toBe('/travel-reimbursements/' + sampleTravelReimbursementResponse._id);
		}));

		it('$scope.update() should update a valid Travel reimbursement', inject(function(TravelReimbursements) {
			// Define a sample Travel reimbursement put data
			var sampleTravelReimbursementPutData = new TravelReimbursements({
				_id: '525cf20451979dea2c000001',
				name: 'New Travel reimbursement'
			});

			// Mock Travel reimbursement in scope
			scope.travelReimbursement = sampleTravelReimbursementPutData;

			// Set PUT response
			$httpBackend.expectPUT(/travel-reimbursements\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/travel-reimbursements/' + sampleTravelReimbursementPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid travelReimbursementId and remove the Travel reimbursement from the scope', inject(function(TravelReimbursements) {
			// Create new Travel reimbursement object
			var sampleTravelReimbursement = new TravelReimbursements({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Travel reimbursements array and include the Travel reimbursement
			scope.travelReimbursements = [sampleTravelReimbursement];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/travel-reimbursements\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleTravelReimbursement);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.travelReimbursements.length).toBe(0);
		}));
	});
}());