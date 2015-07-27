'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	TravelReimbursement = mongoose.model('TravelReimbursement'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, travelReimbursement;

/**
 * Travel reimbursement routes tests
 */
describe('Travel reimbursement CRUD tests', function() {
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

		// Save a user to the test db and create new Travel reimbursement
		user.save(function() {
			travelReimbursement = {
				name: 'Travel reimbursement Name'
			};

			done();
		});
	});

	it('should be able to save Travel reimbursement instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Travel reimbursement
				agent.post('/travel-reimbursements')
					.send(travelReimbursement)
					.expect(200)
					.end(function(travelReimbursementSaveErr, travelReimbursementSaveRes) {
						// Handle Travel reimbursement save error
						if (travelReimbursementSaveErr) done(travelReimbursementSaveErr);

						// Get a list of Travel reimbursements
						agent.get('/travel-reimbursements')
							.end(function(travelReimbursementsGetErr, travelReimbursementsGetRes) {
								// Handle Travel reimbursement save error
								if (travelReimbursementsGetErr) done(travelReimbursementsGetErr);

								// Get Travel reimbursements list
								var travelReimbursements = travelReimbursementsGetRes.body;

								// Set assertions
								(travelReimbursements[0].user._id).should.equal(userId);
								(travelReimbursements[0].name).should.match('Travel reimbursement Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Travel reimbursement instance if not logged in', function(done) {
		agent.post('/travel-reimbursements')
			.send(travelReimbursement)
			.expect(401)
			.end(function(travelReimbursementSaveErr, travelReimbursementSaveRes) {
				// Call the assertion callback
				done(travelReimbursementSaveErr);
			});
	});

	it('should not be able to save Travel reimbursement instance if no name is provided', function(done) {
		// Invalidate name field
		travelReimbursement.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Travel reimbursement
				agent.post('/travel-reimbursements')
					.send(travelReimbursement)
					.expect(400)
					.end(function(travelReimbursementSaveErr, travelReimbursementSaveRes) {
						// Set message assertion
						(travelReimbursementSaveRes.body.message).should.match('Please fill Travel reimbursement name');
						
						// Handle Travel reimbursement save error
						done(travelReimbursementSaveErr);
					});
			});
	});

	it('should be able to update Travel reimbursement instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Travel reimbursement
				agent.post('/travel-reimbursements')
					.send(travelReimbursement)
					.expect(200)
					.end(function(travelReimbursementSaveErr, travelReimbursementSaveRes) {
						// Handle Travel reimbursement save error
						if (travelReimbursementSaveErr) done(travelReimbursementSaveErr);

						// Update Travel reimbursement name
						travelReimbursement.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Travel reimbursement
						agent.put('/travel-reimbursements/' + travelReimbursementSaveRes.body._id)
							.send(travelReimbursement)
							.expect(200)
							.end(function(travelReimbursementUpdateErr, travelReimbursementUpdateRes) {
								// Handle Travel reimbursement update error
								if (travelReimbursementUpdateErr) done(travelReimbursementUpdateErr);

								// Set assertions
								(travelReimbursementUpdateRes.body._id).should.equal(travelReimbursementSaveRes.body._id);
								(travelReimbursementUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Travel reimbursements if not signed in', function(done) {
		// Create new Travel reimbursement model instance
		var travelReimbursementObj = new TravelReimbursement(travelReimbursement);

		// Save the Travel reimbursement
		travelReimbursementObj.save(function() {
			// Request Travel reimbursements
			request(app).get('/travel-reimbursements')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Travel reimbursement if not signed in', function(done) {
		// Create new Travel reimbursement model instance
		var travelReimbursementObj = new TravelReimbursement(travelReimbursement);

		// Save the Travel reimbursement
		travelReimbursementObj.save(function() {
			request(app).get('/travel-reimbursements/' + travelReimbursementObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', travelReimbursement.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Travel reimbursement instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Travel reimbursement
				agent.post('/travel-reimbursements')
					.send(travelReimbursement)
					.expect(200)
					.end(function(travelReimbursementSaveErr, travelReimbursementSaveRes) {
						// Handle Travel reimbursement save error
						if (travelReimbursementSaveErr) done(travelReimbursementSaveErr);

						// Delete existing Travel reimbursement
						agent.delete('/travel-reimbursements/' + travelReimbursementSaveRes.body._id)
							.send(travelReimbursement)
							.expect(200)
							.end(function(travelReimbursementDeleteErr, travelReimbursementDeleteRes) {
								// Handle Travel reimbursement error error
								if (travelReimbursementDeleteErr) done(travelReimbursementDeleteErr);

								// Set assertions
								(travelReimbursementDeleteRes.body._id).should.equal(travelReimbursementSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Travel reimbursement instance if not signed in', function(done) {
		// Set Travel reimbursement user 
		travelReimbursement.user = user;

		// Create new Travel reimbursement model instance
		var travelReimbursementObj = new TravelReimbursement(travelReimbursement);

		// Save the Travel reimbursement
		travelReimbursementObj.save(function() {
			// Try deleting Travel reimbursement
			request(app).delete('/travel-reimbursements/' + travelReimbursementObj._id)
			.expect(401)
			.end(function(travelReimbursementDeleteErr, travelReimbursementDeleteRes) {
				// Set message assertion
				(travelReimbursementDeleteRes.body.message).should.match('User is not logged in');

				// Handle Travel reimbursement error error
				done(travelReimbursementDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		TravelReimbursement.remove().exec();
		done();
	});
});