'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	EnquiryDetail = mongoose.model('EnquiryDetail'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, enquiryDetail;

/**
 * Enquiry detail routes tests
 */
describe('Enquiry detail CRUD tests', function() {
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

		// Save a user to the test db and create new Enquiry detail
		user.save(function() {
			enquiryDetail = {
				name: 'Enquiry detail Name'
			};

			done();
		});
	});

	it('should be able to save Enquiry detail instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Enquiry detail
				agent.post('/enquiry-details')
					.send(enquiryDetail)
					.expect(200)
					.end(function(enquiryDetailSaveErr, enquiryDetailSaveRes) {
						// Handle Enquiry detail save error
						if (enquiryDetailSaveErr) done(enquiryDetailSaveErr);

						// Get a list of Enquiry details
						agent.get('/enquiry-details')
							.end(function(enquiryDetailsGetErr, enquiryDetailsGetRes) {
								// Handle Enquiry detail save error
								if (enquiryDetailsGetErr) done(enquiryDetailsGetErr);

								// Get Enquiry details list
								var enquiryDetails = enquiryDetailsGetRes.body;

								// Set assertions
								(enquiryDetails[0].user._id).should.equal(userId);
								(enquiryDetails[0].name).should.match('Enquiry detail Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Enquiry detail instance if not logged in', function(done) {
		agent.post('/enquiry-details')
			.send(enquiryDetail)
			.expect(401)
			.end(function(enquiryDetailSaveErr, enquiryDetailSaveRes) {
				// Call the assertion callback
				done(enquiryDetailSaveErr);
			});
	});

	it('should not be able to save Enquiry detail instance if no name is provided', function(done) {
		// Invalidate name field
		enquiryDetail.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Enquiry detail
				agent.post('/enquiry-details')
					.send(enquiryDetail)
					.expect(400)
					.end(function(enquiryDetailSaveErr, enquiryDetailSaveRes) {
						// Set message assertion
						(enquiryDetailSaveRes.body.message).should.match('Please fill Enquiry detail name');
						
						// Handle Enquiry detail save error
						done(enquiryDetailSaveErr);
					});
			});
	});

	it('should be able to update Enquiry detail instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Enquiry detail
				agent.post('/enquiry-details')
					.send(enquiryDetail)
					.expect(200)
					.end(function(enquiryDetailSaveErr, enquiryDetailSaveRes) {
						// Handle Enquiry detail save error
						if (enquiryDetailSaveErr) done(enquiryDetailSaveErr);

						// Update Enquiry detail name
						enquiryDetail.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Enquiry detail
						agent.put('/enquiry-details/' + enquiryDetailSaveRes.body._id)
							.send(enquiryDetail)
							.expect(200)
							.end(function(enquiryDetailUpdateErr, enquiryDetailUpdateRes) {
								// Handle Enquiry detail update error
								if (enquiryDetailUpdateErr) done(enquiryDetailUpdateErr);

								// Set assertions
								(enquiryDetailUpdateRes.body._id).should.equal(enquiryDetailSaveRes.body._id);
								(enquiryDetailUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Enquiry details if not signed in', function(done) {
		// Create new Enquiry detail model instance
		var enquiryDetailObj = new EnquiryDetail(enquiryDetail);

		// Save the Enquiry detail
		enquiryDetailObj.save(function() {
			// Request Enquiry details
			request(app).get('/enquiry-details')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Enquiry detail if not signed in', function(done) {
		// Create new Enquiry detail model instance
		var enquiryDetailObj = new EnquiryDetail(enquiryDetail);

		// Save the Enquiry detail
		enquiryDetailObj.save(function() {
			request(app).get('/enquiry-details/' + enquiryDetailObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', enquiryDetail.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Enquiry detail instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Enquiry detail
				agent.post('/enquiry-details')
					.send(enquiryDetail)
					.expect(200)
					.end(function(enquiryDetailSaveErr, enquiryDetailSaveRes) {
						// Handle Enquiry detail save error
						if (enquiryDetailSaveErr) done(enquiryDetailSaveErr);

						// Delete existing Enquiry detail
						agent.delete('/enquiry-details/' + enquiryDetailSaveRes.body._id)
							.send(enquiryDetail)
							.expect(200)
							.end(function(enquiryDetailDeleteErr, enquiryDetailDeleteRes) {
								// Handle Enquiry detail error error
								if (enquiryDetailDeleteErr) done(enquiryDetailDeleteErr);

								// Set assertions
								(enquiryDetailDeleteRes.body._id).should.equal(enquiryDetailSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Enquiry detail instance if not signed in', function(done) {
		// Set Enquiry detail user 
		enquiryDetail.user = user;

		// Create new Enquiry detail model instance
		var enquiryDetailObj = new EnquiryDetail(enquiryDetail);

		// Save the Enquiry detail
		enquiryDetailObj.save(function() {
			// Try deleting Enquiry detail
			request(app).delete('/enquiry-details/' + enquiryDetailObj._id)
			.expect(401)
			.end(function(enquiryDetailDeleteErr, enquiryDetailDeleteRes) {
				// Set message assertion
				(enquiryDetailDeleteRes.body.message).should.match('User is not logged in');

				// Handle Enquiry detail error error
				done(enquiryDetailDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		EnquiryDetail.remove().exec();
		done();
	});
});