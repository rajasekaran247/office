'use strict';

(function() {
	// Procedures and templates Controller Spec
	describe('Procedures and templates Controller Tests', function() {
		// Initialize global variables
		var ProceduresAndTemplatesController,
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

			// Initialize the Procedures and templates controller.
			ProceduresAndTemplatesController = $controller('ProceduresAndTemplatesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Procedures and template object fetched from XHR', inject(function(ProceduresAndTemplates) {
			// Create sample Procedures and template using the Procedures and templates service
			var sampleProceduresAndTemplate = new ProceduresAndTemplates({
				name: 'New Procedures and template'
			});

			// Create a sample Procedures and templates array that includes the new Procedures and template
			var sampleProceduresAndTemplates = [sampleProceduresAndTemplate];

			// Set GET response
			$httpBackend.expectGET('procedures-and-templates').respond(sampleProceduresAndTemplates);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.proceduresAndTemplates).toEqualData(sampleProceduresAndTemplates);
		}));

		it('$scope.findOne() should create an array with one Procedures and template object fetched from XHR using a proceduresAndTemplateId URL parameter', inject(function(ProceduresAndTemplates) {
			// Define a sample Procedures and template object
			var sampleProceduresAndTemplate = new ProceduresAndTemplates({
				name: 'New Procedures and template'
			});

			// Set the URL parameter
			$stateParams.proceduresAndTemplateId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/procedures-and-templates\/([0-9a-fA-F]{24})$/).respond(sampleProceduresAndTemplate);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.proceduresAndTemplate).toEqualData(sampleProceduresAndTemplate);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(ProceduresAndTemplates) {
			// Create a sample Procedures and template object
			var sampleProceduresAndTemplatePostData = new ProceduresAndTemplates({
				name: 'New Procedures and template'
			});

			// Create a sample Procedures and template response
			var sampleProceduresAndTemplateResponse = new ProceduresAndTemplates({
				_id: '525cf20451979dea2c000001',
				name: 'New Procedures and template'
			});

			// Fixture mock form input values
			scope.name = 'New Procedures and template';

			// Set POST response
			$httpBackend.expectPOST('procedures-and-templates', sampleProceduresAndTemplatePostData).respond(sampleProceduresAndTemplateResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Procedures and template was created
			expect($location.path()).toBe('/procedures-and-templates/' + sampleProceduresAndTemplateResponse._id);
		}));

		it('$scope.update() should update a valid Procedures and template', inject(function(ProceduresAndTemplates) {
			// Define a sample Procedures and template put data
			var sampleProceduresAndTemplatePutData = new ProceduresAndTemplates({
				_id: '525cf20451979dea2c000001',
				name: 'New Procedures and template'
			});

			// Mock Procedures and template in scope
			scope.proceduresAndTemplate = sampleProceduresAndTemplatePutData;

			// Set PUT response
			$httpBackend.expectPUT(/procedures-and-templates\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/procedures-and-templates/' + sampleProceduresAndTemplatePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid proceduresAndTemplateId and remove the Procedures and template from the scope', inject(function(ProceduresAndTemplates) {
			// Create new Procedures and template object
			var sampleProceduresAndTemplate = new ProceduresAndTemplates({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Procedures and templates array and include the Procedures and template
			scope.proceduresAndTemplates = [sampleProceduresAndTemplate];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/procedures-and-templates\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleProceduresAndTemplate);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.proceduresAndTemplates.length).toBe(0);
		}));
	});
}());