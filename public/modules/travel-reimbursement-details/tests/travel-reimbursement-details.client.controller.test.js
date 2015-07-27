'use strict';

(function() {
	// Travel reimbursement details Controller Spec
	describe('Travel reimbursement details Controller Tests', function() {
		// Initialize global variables
		var TravelReimbursementDetailsController,
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

			// Initialize the Travel reimbursement details controller.
			TravelReimbursementDetailsController = $controller('TravelReimbursementDetailsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Travel reimbursement detail object fetched from XHR', inject(function(TravelReimbursementDetails) {
			// Create sample Travel reimbursement detail using the Travel reimbursement details service
			var sampleTravelReimbursementDetail = new TravelReimbursementDetails({
				name: 'New Travel reimbursement detail'
			});

			// Create a sample Travel reimbursement details array that includes the new Travel reimbursement detail
			var sampleTravelReimbursementDetails = [sampleTravelReimbursementDetail];

			// Set GET response
			$httpBackend.expectGET('travel-reimbursement-details').respond(sampleTravelReimbursementDetails);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.travelReimbursementDetails).toEqualData(sampleTravelReimbursementDetails);
		}));

		it('$scope.findOne() should create an array with one Travel reimbursement detail object fetched from XHR using a travelReimbursementDetailId URL parameter', inject(function(TravelReimbursementDetails) {
			// Define a sample Travel reimbursement detail object
			var sampleTravelReimbursementDetail = new TravelReimbursementDetails({
				name: 'New Travel reimbursement detail'
			});

			// Set the URL parameter
			$stateParams.travelReimbursementDetailId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/travel-reimbursement-details\/([0-9a-fA-F]{24})$/).respond(sampleTravelReimbursementDetail);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.travelReimbursementDetail).toEqualData(sampleTravelReimbursementDetail);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(TravelReimbursementDetails) {
			// Create a sample Travel reimbursement detail object
			var sampleTravelReimbursementDetailPostData = new TravelReimbursementDetails({
				name: 'New Travel reimbursement detail'
			});

			// Create a sample Travel reimbursement detail response
			var sampleTravelReimbursementDetailResponse = new TravelReimbursementDetails({
				_id: '525cf20451979dea2c000001',
				name: 'New Travel reimbursement detail'
			});

			// Fixture mock form input values
			scope.name = 'New Travel reimbursement detail';

			// Set POST response
			$httpBackend.expectPOST('travel-reimbursement-details', sampleTravelReimbursementDetailPostData).respond(sampleTravelReimbursementDetailResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Travel reimbursement detail was created
			expect($location.path()).toBe('/travel-reimbursement-details/' + sampleTravelReimbursementDetailResponse._id);
		}));

		it('$scope.update() should update a valid Travel reimbursement detail', inject(function(TravelReimbursementDetails) {
			// Define a sample Travel reimbursement detail put data
			var sampleTravelReimbursementDetailPutData = new TravelReimbursementDetails({
				_id: '525cf20451979dea2c000001',
				name: 'New Travel reimbursement detail'
			});

			// Mock Travel reimbursement detail in scope
			scope.travelReimbursementDetail = sampleTravelReimbursementDetailPutData;

			// Set PUT response
			$httpBackend.expectPUT(/travel-reimbursement-details\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/travel-reimbursement-details/' + sampleTravelReimbursementDetailPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid travelReimbursementDetailId and remove the Travel reimbursement detail from the scope', inject(function(TravelReimbursementDetails) {
			// Create new Travel reimbursement detail object
			var sampleTravelReimbursementDetail = new TravelReimbursementDetails({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Travel reimbursement details array and include the Travel reimbursement detail
			scope.travelReimbursementDetails = [sampleTravelReimbursementDetail];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/travel-reimbursement-details\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleTravelReimbursementDetail);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.travelReimbursementDetails.length).toBe(0);
		}));
	});
}());