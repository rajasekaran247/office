'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	InvoiceDetail = mongoose.model('InvoiceDetail'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, invoiceDetail;

/**
 * Invoice detail routes tests
 */
describe('Invoice detail CRUD tests', function() {
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

		// Save a user to the test db and create new Invoice detail
		user.save(function() {
			invoiceDetail = {
				name: 'Invoice detail Name'
			};

			done();
		});
	});

	it('should be able to save Invoice detail instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Invoice detail
				agent.post('/invoice-details')
					.send(invoiceDetail)
					.expect(200)
					.end(function(invoiceDetailSaveErr, invoiceDetailSaveRes) {
						// Handle Invoice detail save error
						if (invoiceDetailSaveErr) done(invoiceDetailSaveErr);

						// Get a list of Invoice details
						agent.get('/invoice-details')
							.end(function(invoiceDetailsGetErr, invoiceDetailsGetRes) {
								// Handle Invoice detail save error
								if (invoiceDetailsGetErr) done(invoiceDetailsGetErr);

								// Get Invoice details list
								var invoiceDetails = invoiceDetailsGetRes.body;

								// Set assertions
								(invoiceDetails[0].user._id).should.equal(userId);
								(invoiceDetails[0].name).should.match('Invoice detail Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Invoice detail instance if not logged in', function(done) {
		agent.post('/invoice-details')
			.send(invoiceDetail)
			.expect(401)
			.end(function(invoiceDetailSaveErr, invoiceDetailSaveRes) {
				// Call the assertion callback
				done(invoiceDetailSaveErr);
			});
	});

	it('should not be able to save Invoice detail instance if no name is provided', function(done) {
		// Invalidate name field
		invoiceDetail.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Invoice detail
				agent.post('/invoice-details')
					.send(invoiceDetail)
					.expect(400)
					.end(function(invoiceDetailSaveErr, invoiceDetailSaveRes) {
						// Set message assertion
						(invoiceDetailSaveRes.body.message).should.match('Please fill Invoice detail name');
						
						// Handle Invoice detail save error
						done(invoiceDetailSaveErr);
					});
			});
	});

	it('should be able to update Invoice detail instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Invoice detail
				agent.post('/invoice-details')
					.send(invoiceDetail)
					.expect(200)
					.end(function(invoiceDetailSaveErr, invoiceDetailSaveRes) {
						// Handle Invoice detail save error
						if (invoiceDetailSaveErr) done(invoiceDetailSaveErr);

						// Update Invoice detail name
						invoiceDetail.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Invoice detail
						agent.put('/invoice-details/' + invoiceDetailSaveRes.body._id)
							.send(invoiceDetail)
							.expect(200)
							.end(function(invoiceDetailUpdateErr, invoiceDetailUpdateRes) {
								// Handle Invoice detail update error
								if (invoiceDetailUpdateErr) done(invoiceDetailUpdateErr);

								// Set assertions
								(invoiceDetailUpdateRes.body._id).should.equal(invoiceDetailSaveRes.body._id);
								(invoiceDetailUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Invoice details if not signed in', function(done) {
		// Create new Invoice detail model instance
		var invoiceDetailObj = new InvoiceDetail(invoiceDetail);

		// Save the Invoice detail
		invoiceDetailObj.save(function() {
			// Request Invoice details
			request(app).get('/invoice-details')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Invoice detail if not signed in', function(done) {
		// Create new Invoice detail model instance
		var invoiceDetailObj = new InvoiceDetail(invoiceDetail);

		// Save the Invoice detail
		invoiceDetailObj.save(function() {
			request(app).get('/invoice-details/' + invoiceDetailObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', invoiceDetail.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Invoice detail instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Invoice detail
				agent.post('/invoice-details')
					.send(invoiceDetail)
					.expect(200)
					.end(function(invoiceDetailSaveErr, invoiceDetailSaveRes) {
						// Handle Invoice detail save error
						if (invoiceDetailSaveErr) done(invoiceDetailSaveErr);

						// Delete existing Invoice detail
						agent.delete('/invoice-details/' + invoiceDetailSaveRes.body._id)
							.send(invoiceDetail)
							.expect(200)
							.end(function(invoiceDetailDeleteErr, invoiceDetailDeleteRes) {
								// Handle Invoice detail error error
								if (invoiceDetailDeleteErr) done(invoiceDetailDeleteErr);

								// Set assertions
								(invoiceDetailDeleteRes.body._id).should.equal(invoiceDetailSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Invoice detail instance if not signed in', function(done) {
		// Set Invoice detail user 
		invoiceDetail.user = user;

		// Create new Invoice detail model instance
		var invoiceDetailObj = new InvoiceDetail(invoiceDetail);

		// Save the Invoice detail
		invoiceDetailObj.save(function() {
			// Try deleting Invoice detail
			request(app).delete('/invoice-details/' + invoiceDetailObj._id)
			.expect(401)
			.end(function(invoiceDetailDeleteErr, invoiceDetailDeleteRes) {
				// Set message assertion
				(invoiceDetailDeleteRes.body.message).should.match('User is not logged in');

				// Handle Invoice detail error error
				done(invoiceDetailDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		InvoiceDetail.remove().exec();
		done();
	});
});