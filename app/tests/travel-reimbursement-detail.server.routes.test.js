'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	TravelReimbursementDetail = mongoose.model('TravelReimbursementDetail'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, travelReimbursementDetail;

/**
 * Travel reimbursement detail routes tests
 */
describe('Travel reimbursement detail CRUD tests', function() {
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

		// Save a user to the test db and create new Travel reimbursement detail
		user.save(function() {
			travelReimbursementDetail = {
				name: 'Travel reimbursement detail Name'
			};

			done();
		});
	});

	it('should be able to save Travel reimbursement detail instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Travel reimbursement detail
				agent.post('/travel-reimbursement-details')
					.send(travelReimbursementDetail)
					.expect(200)
					.end(function(travelReimbursementDetailSaveErr, travelReimbursementDetailSaveRes) {
						// Handle Travel reimbursement detail save error
						if (travelReimbursementDetailSaveErr) done(travelReimbursementDetailSaveErr);

						// Get a list of Travel reimbursement details
						agent.get('/travel-reimbursement-details')
							.end(function(travelReimbursementDetailsGetErr, travelReimbursementDetailsGetRes) {
								// Handle Travel reimbursement detail save error
								if (travelReimbursementDetailsGetErr) done(travelReimbursementDetailsGetErr);

								// Get Travel reimbursement details list
								var travelReimbursementDetails = travelReimbursementDetailsGetRes.body;

								// Set assertions
								(travelReimbursementDetails[0].user._id).should.equal(userId);
								(travelReimbursementDetails[0].name).should.match('Travel reimbursement detail Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Travel reimbursement detail instance if not logged in', function(done) {
		agent.post('/travel-reimbursement-details')
			.send(travelReimbursementDetail)
			.expect(401)
			.end(function(travelReimbursementDetailSaveErr, travelReimbursementDetailSaveRes) {
				// Call the assertion callback
				done(travelReimbursementDetailSaveErr);
			});
	});

	it('should not be able to save Travel reimbursement detail instance if no name is provided', function(done) {
		// Invalidate name field
		travelReimbursementDetail.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Travel reimbursement detail
				agent.post('/travel-reimbursement-details')
					.send(travelReimbursementDetail)
					.expect(400)
					.end(function(travelReimbursementDetailSaveErr, travelReimbursementDetailSaveRes) {
						// Set message assertion
						(travelReimbursementDetailSaveRes.body.message).should.match('Please fill Travel reimbursement detail name');
						
						// Handle Travel reimbursement detail save error
						done(travelReimbursementDetailSaveErr);
					});
			});
	});

	it('should be able to update Travel reimbursement detail instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Travel reimbursement detail
				agent.post('/travel-reimbursement-details')
					.send(travelReimbursementDetail)
					.expect(200)
					.end(function(travelReimbursementDetailSaveErr, travelReimbursementDetailSaveRes) {
						// Handle Travel reimbursement detail save error
						if (travelReimbursementDetailSaveErr) done(travelReimbursementDetailSaveErr);

						// Update Travel reimbursement detail name
						travelReimbursementDetail.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Travel reimbursement detail
						agent.put('/travel-reimbursement-details/' + travelReimbursementDetailSaveRes.body._id)
							.send(travelReimbursementDetail)
							.expect(200)
							.end(function(travelReimbursementDetailUpdateErr, travelReimbursementDetailUpdateRes) {
								// Handle Travel reimbursement detail update error
								if (travelReimbursementDetailUpdateErr) done(travelReimbursementDetailUpdateErr);

								// Set assertions
								(travelReimbursementDetailUpdateRes.body._id).should.equal(travelReimbursementDetailSaveRes.body._id);
								(travelReimbursementDetailUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Travel reimbursement details if not signed in', function(done) {
		// Create new Travel reimbursement detail model instance
		var travelReimbursementDetailObj = new TravelReimbursementDetail(travelReimbursementDetail);

		// Save the Travel reimbursement detail
		travelReimbursementDetailObj.save(function() {
			// Request Travel reimbursement details
			request(app).get('/travel-reimbursement-details')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Travel reimbursement detail if not signed in', function(done) {
		// Create new Travel reimbursement detail model instance
		var travelReimbursementDetailObj = new TravelReimbursementDetail(travelReimbursementDetail);

		// Save the Travel reimbursement detail
		travelReimbursementDetailObj.save(function() {
			request(app).get('/travel-reimbursement-details/' + travelReimbursementDetailObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', travelReimbursementDetail.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Travel reimbursement detail instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Travel reimbursement detail
				agent.post('/travel-reimbursement-details')
					.send(travelReimbursementDetail)
					.expect(200)
					.end(function(travelReimbursementDetailSaveErr, travelReimbursementDetailSaveRes) {
						// Handle Travel reimbursement detail save error
						if (travelReimbursementDetailSaveErr) done(travelReimbursementDetailSaveErr);

						// Delete existing Travel reimbursement detail
						agent.delete('/travel-reimbursement-details/' + travelReimbursementDetailSaveRes.body._id)
							.send(travelReimbursementDetail)
							.expect(200)
							.end(function(travelReimbursementDetailDeleteErr, travelReimbursementDetailDeleteRes) {
								// Handle Travel reimbursement detail error error
								if (travelReimbursementDetailDeleteErr) done(travelReimbursementDetailDeleteErr);

								// Set assertions
								(travelReimbursementDetailDeleteRes.body._id).should.equal(travelReimbursementDetailSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Travel reimbursement detail instance if not signed in', function(done) {
		// Set Travel reimbursement detail user 
		travelReimbursementDetail.user = user;

		// Create new Travel reimbursement detail model instance
		var travelReimbursementDetailObj = new TravelReimbursementDetail(travelReimbursementDetail);

		// Save the Travel reimbursement detail
		travelReimbursementDetailObj.save(function() {
			// Try deleting Travel reimbursement detail
			request(app).delete('/travel-reimbursement-details/' + travelReimbursementDetailObj._id)
			.expect(401)
			.end(function(travelReimbursementDetailDeleteErr, travelReimbursementDetailDeleteRes) {
				// Set message assertion
				(travelReimbursementDetailDeleteRes.body.message).should.match('User is not logged in');

				// Handle Travel reimbursement detail error error
				done(travelReimbursementDetailDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		TravelReimbursementDetail.remove().exec();
		done();
	});
});