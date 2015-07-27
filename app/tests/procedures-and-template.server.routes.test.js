'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	ProceduresAndTemplate = mongoose.model('ProceduresAndTemplate'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, proceduresAndTemplate;

/**
 * Procedures and template routes tests
 */
describe('Procedures and template CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Procedures and template
		user.save(function() {
			proceduresAndTemplate = {
				name: 'Procedures and template Name'
			};

			done();
		});
	});

	it('should be able to save Procedures and template instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Procedures and template
				agent.post('/procedures-and-templates')
					.send(proceduresAndTemplate)
					.expect(200)
					.end(function(proceduresAndTemplateSaveErr, proceduresAndTemplateSaveRes) {
						// Handle Procedures and template save error
						if (proceduresAndTemplateSaveErr) done(proceduresAndTemplateSaveErr);

						// Get a list of Procedures and templates
						agent.get('/procedures-and-templates')
							.end(function(proceduresAndTemplatesGetErr, proceduresAndTemplatesGetRes) {
								// Handle Procedures and template save error
								if (proceduresAndTemplatesGetErr) done(proceduresAndTemplatesGetErr);

								// Get Procedures and templates list
								var proceduresAndTemplates = proceduresAndTemplatesGetRes.body;

								// Set assertions
								(proceduresAndTemplates[0].user._id).should.equal(userId);
								(proceduresAndTemplates[0].name).should.match('Procedures and template Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Procedures and template instance if not logged in', function(done) {
		agent.post('/procedures-and-templates')
			.send(proceduresAndTemplate)
			.expect(401)
			.end(function(proceduresAndTemplateSaveErr, proceduresAndTemplateSaveRes) {
				// Call the assertion callback
				done(proceduresAndTemplateSaveErr);
			});
	});

	it('should not be able to save Procedures and template instance if no name is provided', function(done) {
		// Invalidate name field
		proceduresAndTemplate.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Procedures and template
				agent.post('/procedures-and-templates')
					.send(proceduresAndTemplate)
					.expect(400)
					.end(function(proceduresAndTemplateSaveErr, proceduresAndTemplateSaveRes) {
						// Set message assertion
						(proceduresAndTemplateSaveRes.body.message).should.match('Please fill Procedures and template name');
						
						// Handle Procedures and template save error
						done(proceduresAndTemplateSaveErr);
					});
			});
	});

	it('should be able to update Procedures and template instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Procedures and template
				agent.post('/procedures-and-templates')
					.send(proceduresAndTemplate)
					.expect(200)
					.end(function(proceduresAndTemplateSaveErr, proceduresAndTemplateSaveRes) {
						// Handle Procedures and template save error
						if (proceduresAndTemplateSaveErr) done(proceduresAndTemplateSaveErr);

						// Update Procedures and template name
						proceduresAndTemplate.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Procedures and template
						agent.put('/procedures-and-templates/' + proceduresAndTemplateSaveRes.body._id)
							.send(proceduresAndTemplate)
							.expect(200)
							.end(function(proceduresAndTemplateUpdateErr, proceduresAndTemplateUpdateRes) {
								// Handle Procedures and template update error
								if (proceduresAndTemplateUpdateErr) done(proceduresAndTemplateUpdateErr);

								// Set assertions
								(proceduresAndTemplateUpdateRes.body._id).should.equal(proceduresAndTemplateSaveRes.body._id);
								(proceduresAndTemplateUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Procedures and templates if not signed in', function(done) {
		// Create new Procedures and template model instance
		var proceduresAndTemplateObj = new ProceduresAndTemplate(proceduresAndTemplate);

		// Save the Procedures and template
		proceduresAndTemplateObj.save(function() {
			// Request Procedures and templates
			request(app).get('/procedures-and-templates')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Procedures and template if not signed in', function(done) {
		// Create new Procedures and template model instance
		var proceduresAndTemplateObj = new ProceduresAndTemplate(proceduresAndTemplate);

		// Save the Procedures and template
		proceduresAndTemplateObj.save(function() {
			request(app).get('/procedures-and-templates/' + proceduresAndTemplateObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', proceduresAndTemplate.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Procedures and template instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Procedures and template
				agent.post('/procedures-and-templates')
					.send(proceduresAndTemplate)
					.expect(200)
					.end(function(proceduresAndTemplateSaveErr, proceduresAndTemplateSaveRes) {
						// Handle Procedures and template save error
						if (proceduresAndTemplateSaveErr) done(proceduresAndTemplateSaveErr);

						// Delete existing Procedures and template
						agent.delete('/procedures-and-templates/' + proceduresAndTemplateSaveRes.body._id)
							.send(proceduresAndTemplate)
							.expect(200)
							.end(function(proceduresAndTemplateDeleteErr, proceduresAndTemplateDeleteRes) {
								// Handle Procedures and template error error
								if (proceduresAndTemplateDeleteErr) done(proceduresAndTemplateDeleteErr);

								// Set assertions
								(proceduresAndTemplateDeleteRes.body._id).should.equal(proceduresAndTemplateSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Procedures and template instance if not signed in', function(done) {
		// Set Procedures and template user 
		proceduresAndTemplate.user = user;

		// Create new Procedures and template model instance
		var proceduresAndTemplateObj = new ProceduresAndTemplate(proceduresAndTemplate);

		// Save the Procedures and template
		proceduresAndTemplateObj.save(function() {
			// Try deleting Procedures and template
			request(app).delete('/procedures-and-templates/' + proceduresAndTemplateObj._id)
			.expect(401)
			.end(function(proceduresAndTemplateDeleteErr, proceduresAndTemplateDeleteRes) {
				// Set message assertion
				(proceduresAndTemplateDeleteRes.body.message).should.match('User is not logged in');

				// Handle Procedures and template error error
				done(proceduresAndTemplateDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		ProceduresAndTemplate.remove().exec();
		done();
	});
});