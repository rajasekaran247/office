'use strict';

(function() {
	// Partner expenses Controller Spec
	describe('Partner expenses Controller Tests', function() {
		// Initialize global variables
		var PartnerExpensesController,
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

			// Initialize the Partner expenses controller.
			PartnerExpensesController = $controller('PartnerExpensesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Partner expense object fetched from XHR', inject(function(PartnerExpenses) {
			// Create sample Partner expense using the Partner expenses service
			var samplePartnerExpense = new PartnerExpenses({
				name: 'New Partner expense'
			});

			// Create a sample Partner expenses array that includes the new Partner expense
			var samplePartnerExpenses = [samplePartnerExpense];

			// Set GET response
			$httpBackend.expectGET('partner-expenses').respond(samplePartnerExpenses);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.partnerExpenses).toEqualData(samplePartnerExpenses);
		}));

		it('$scope.findOne() should create an array with one Partner expense object fetched from XHR using a partnerExpenseId URL parameter', inject(function(PartnerExpenses) {
			// Define a sample Partner expense object
			var samplePartnerExpense = new PartnerExpenses({
				name: 'New Partner expense'
			});

			// Set the URL parameter
			$stateParams.partnerExpenseId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/partner-expenses\/([0-9a-fA-F]{24})$/).respond(samplePartnerExpense);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.partnerExpense).toEqualData(samplePartnerExpense);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(PartnerExpenses) {
			// Create a sample Partner expense object
			var samplePartnerExpensePostData = new PartnerExpenses({
				name: 'New Partner expense'
			});

			// Create a sample Partner expense response
			var samplePartnerExpenseResponse = new PartnerExpenses({
				_id: '525cf20451979dea2c000001',
				name: 'New Partner expense'
			});

			// Fixture mock form input values
			scope.name = 'New Partner expense';

			// Set POST response
			$httpBackend.expectPOST('partner-expenses', samplePartnerExpensePostData).respond(samplePartnerExpenseResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Partner expense was created
			expect($location.path()).toBe('/partner-expenses/' + samplePartnerExpenseResponse._id);
		}));

		it('$scope.update() should update a valid Partner expense', inject(function(PartnerExpenses) {
			// Define a sample Partner expense put data
			var samplePartnerExpensePutData = new PartnerExpenses({
				_id: '525cf20451979dea2c000001',
				name: 'New Partner expense'
			});

			// Mock Partner expense in scope
			scope.partnerExpense = samplePartnerExpensePutData;

			// Set PUT response
			$httpBackend.expectPUT(/partner-expenses\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/partner-expenses/' + samplePartnerExpensePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid partnerExpenseId and remove the Partner expense from the scope', inject(function(PartnerExpenses) {
			// Create new Partner expense object
			var samplePartnerExpense = new PartnerExpenses({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Partner expenses array and include the Partner expense
			scope.partnerExpenses = [samplePartnerExpense];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/partner-expenses\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePartnerExpense);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.partnerExpenses.length).toBe(0);
		}));
	});
}());