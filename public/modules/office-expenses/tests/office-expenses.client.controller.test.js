'use strict';

(function() {
	// Office expenses Controller Spec
	describe('Office expenses Controller Tests', function() {
		// Initialize global variables
		var OfficeExpensesController,
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

			// Initialize the Office expenses controller.
			OfficeExpensesController = $controller('OfficeExpensesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Office expense object fetched from XHR', inject(function(OfficeExpenses) {
			// Create sample Office expense using the Office expenses service
			var sampleOfficeExpense = new OfficeExpenses({
				name: 'New Office expense'
			});

			// Create a sample Office expenses array that includes the new Office expense
			var sampleOfficeExpenses = [sampleOfficeExpense];

			// Set GET response
			$httpBackend.expectGET('office-expenses').respond(sampleOfficeExpenses);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.officeExpenses).toEqualData(sampleOfficeExpenses);
		}));

		it('$scope.findOne() should create an array with one Office expense object fetched from XHR using a officeExpenseId URL parameter', inject(function(OfficeExpenses) {
			// Define a sample Office expense object
			var sampleOfficeExpense = new OfficeExpenses({
				name: 'New Office expense'
			});

			// Set the URL parameter
			$stateParams.officeExpenseId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/office-expenses\/([0-9a-fA-F]{24})$/).respond(sampleOfficeExpense);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.officeExpense).toEqualData(sampleOfficeExpense);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(OfficeExpenses) {
			// Create a sample Office expense object
			var sampleOfficeExpensePostData = new OfficeExpenses({
				name: 'New Office expense'
			});

			// Create a sample Office expense response
			var sampleOfficeExpenseResponse = new OfficeExpenses({
				_id: '525cf20451979dea2c000001',
				name: 'New Office expense'
			});

			// Fixture mock form input values
			scope.name = 'New Office expense';

			// Set POST response
			$httpBackend.expectPOST('office-expenses', sampleOfficeExpensePostData).respond(sampleOfficeExpenseResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Office expense was created
			expect($location.path()).toBe('/office-expenses/' + sampleOfficeExpenseResponse._id);
		}));

		it('$scope.update() should update a valid Office expense', inject(function(OfficeExpenses) {
			// Define a sample Office expense put data
			var sampleOfficeExpensePutData = new OfficeExpenses({
				_id: '525cf20451979dea2c000001',
				name: 'New Office expense'
			});

			// Mock Office expense in scope
			scope.officeExpense = sampleOfficeExpensePutData;

			// Set PUT response
			$httpBackend.expectPUT(/office-expenses\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/office-expenses/' + sampleOfficeExpensePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid officeExpenseId and remove the Office expense from the scope', inject(function(OfficeExpenses) {
			// Create new Office expense object
			var sampleOfficeExpense = new OfficeExpenses({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Office expenses array and include the Office expense
			scope.officeExpenses = [sampleOfficeExpense];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/office-expenses\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleOfficeExpense);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.officeExpenses.length).toBe(0);
		}));
	});
}());