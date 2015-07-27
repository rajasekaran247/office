'use strict';

(function() {
	// Invoice details Controller Spec
	describe('Invoice details Controller Tests', function() {
		// Initialize global variables
		var InvoiceDetailsController,
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

			// Initialize the Invoice details controller.
			InvoiceDetailsController = $controller('InvoiceDetailsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Invoice detail object fetched from XHR', inject(function(InvoiceDetails) {
			// Create sample Invoice detail using the Invoice details service
			var sampleInvoiceDetail = new InvoiceDetails({
				name: 'New Invoice detail'
			});

			// Create a sample Invoice details array that includes the new Invoice detail
			var sampleInvoiceDetails = [sampleInvoiceDetail];

			// Set GET response
			$httpBackend.expectGET('invoice-details').respond(sampleInvoiceDetails);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.invoiceDetails).toEqualData(sampleInvoiceDetails);
		}));

		it('$scope.findOne() should create an array with one Invoice detail object fetched from XHR using a invoiceDetailId URL parameter', inject(function(InvoiceDetails) {
			// Define a sample Invoice detail object
			var sampleInvoiceDetail = new InvoiceDetails({
				name: 'New Invoice detail'
			});

			// Set the URL parameter
			$stateParams.invoiceDetailId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/invoice-details\/([0-9a-fA-F]{24})$/).respond(sampleInvoiceDetail);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.invoiceDetail).toEqualData(sampleInvoiceDetail);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(InvoiceDetails) {
			// Create a sample Invoice detail object
			var sampleInvoiceDetailPostData = new InvoiceDetails({
				name: 'New Invoice detail'
			});

			// Create a sample Invoice detail response
			var sampleInvoiceDetailResponse = new InvoiceDetails({
				_id: '525cf20451979dea2c000001',
				name: 'New Invoice detail'
			});

			// Fixture mock form input values
			scope.name = 'New Invoice detail';

			// Set POST response
			$httpBackend.expectPOST('invoice-details', sampleInvoiceDetailPostData).respond(sampleInvoiceDetailResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Invoice detail was created
			expect($location.path()).toBe('/invoice-details/' + sampleInvoiceDetailResponse._id);
		}));

		it('$scope.update() should update a valid Invoice detail', inject(function(InvoiceDetails) {
			// Define a sample Invoice detail put data
			var sampleInvoiceDetailPutData = new InvoiceDetails({
				_id: '525cf20451979dea2c000001',
				name: 'New Invoice detail'
			});

			// Mock Invoice detail in scope
			scope.invoiceDetail = sampleInvoiceDetailPutData;

			// Set PUT response
			$httpBackend.expectPUT(/invoice-details\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/invoice-details/' + sampleInvoiceDetailPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid invoiceDetailId and remove the Invoice detail from the scope', inject(function(InvoiceDetails) {
			// Create new Invoice detail object
			var sampleInvoiceDetail = new InvoiceDetails({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Invoice details array and include the Invoice detail
			scope.invoiceDetails = [sampleInvoiceDetail];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/invoice-details\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleInvoiceDetail);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.invoiceDetails.length).toBe(0);
		}));
	});
}());