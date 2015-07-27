'use strict';

(function() {
	// Enquiry details Controller Spec
	describe('Enquiry details Controller Tests', function() {
		// Initialize global variables
		var EnquiryDetailsController,
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

			// Initialize the Enquiry details controller.
			EnquiryDetailsController = $controller('EnquiryDetailsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Enquiry detail object fetched from XHR', inject(function(EnquiryDetails) {
			// Create sample Enquiry detail using the Enquiry details service
			var sampleEnquiryDetail = new EnquiryDetails({
				name: 'New Enquiry detail'
			});

			// Create a sample Enquiry details array that includes the new Enquiry detail
			var sampleEnquiryDetails = [sampleEnquiryDetail];

			// Set GET response
			$httpBackend.expectGET('enquiry-details').respond(sampleEnquiryDetails);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.enquiryDetails).toEqualData(sampleEnquiryDetails);
		}));

		it('$scope.findOne() should create an array with one Enquiry detail object fetched from XHR using a enquiryDetailId URL parameter', inject(function(EnquiryDetails) {
			// Define a sample Enquiry detail object
			var sampleEnquiryDetail = new EnquiryDetails({
				name: 'New Enquiry detail'
			});

			// Set the URL parameter
			$stateParams.enquiryDetailId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/enquiry-details\/([0-9a-fA-F]{24})$/).respond(sampleEnquiryDetail);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.enquiryDetail).toEqualData(sampleEnquiryDetail);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(EnquiryDetails) {
			// Create a sample Enquiry detail object
			var sampleEnquiryDetailPostData = new EnquiryDetails({
				name: 'New Enquiry detail'
			});

			// Create a sample Enquiry detail response
			var sampleEnquiryDetailResponse = new EnquiryDetails({
				_id: '525cf20451979dea2c000001',
				name: 'New Enquiry detail'
			});

			// Fixture mock form input values
			scope.name = 'New Enquiry detail';

			// Set POST response
			$httpBackend.expectPOST('enquiry-details', sampleEnquiryDetailPostData).respond(sampleEnquiryDetailResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Enquiry detail was created
			expect($location.path()).toBe('/enquiry-details/' + sampleEnquiryDetailResponse._id);
		}));

		it('$scope.update() should update a valid Enquiry detail', inject(function(EnquiryDetails) {
			// Define a sample Enquiry detail put data
			var sampleEnquiryDetailPutData = new EnquiryDetails({
				_id: '525cf20451979dea2c000001',
				name: 'New Enquiry detail'
			});

			// Mock Enquiry detail in scope
			scope.enquiryDetail = sampleEnquiryDetailPutData;

			// Set PUT response
			$httpBackend.expectPUT(/enquiry-details\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/enquiry-details/' + sampleEnquiryDetailPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid enquiryDetailId and remove the Enquiry detail from the scope', inject(function(EnquiryDetails) {
			// Create new Enquiry detail object
			var sampleEnquiryDetail = new EnquiryDetails({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Enquiry details array and include the Enquiry detail
			scope.enquiryDetails = [sampleEnquiryDetail];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/enquiry-details\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleEnquiryDetail);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.enquiryDetails.length).toBe(0);
		}));
	});
}());