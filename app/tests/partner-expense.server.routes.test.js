'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	PartnerExpense = mongoose.model('PartnerExpense'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, partnerExpense;

/**
 * Partner expense routes tests
 */
describe('Partner expense CRUD tests', function() {
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

		// Save a user to the test db and create new Partner expense
		user.save(function() {
			partnerExpense = {
				name: 'Partner expense Name'
			};

			done();
		});
	});

	it('should be able to save Partner expense instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Partner expense
				agent.post('/partner-expenses')
					.send(partnerExpense)
					.expect(200)
					.end(function(partnerExpenseSaveErr, partnerExpenseSaveRes) {
						// Handle Partner expense save error
						if (partnerExpenseSaveErr) done(partnerExpenseSaveErr);

						// Get a list of Partner expenses
						agent.get('/partner-expenses')
							.end(function(partnerExpensesGetErr, partnerExpensesGetRes) {
								// Handle Partner expense save error
								if (partnerExpensesGetErr) done(partnerExpensesGetErr);

								// Get Partner expenses list
								var partnerExpenses = partnerExpensesGetRes.body;

								// Set assertions
								(partnerExpenses[0].user._id).should.equal(userId);
								(partnerExpenses[0].name).should.match('Partner expense Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Partner expense instance if not logged in', function(done) {
		agent.post('/partner-expenses')
			.send(partnerExpense)
			.expect(401)
			.end(function(partnerExpenseSaveErr, partnerExpenseSaveRes) {
				// Call the assertion callback
				done(partnerExpenseSaveErr);
			});
	});

	it('should not be able to save Partner expense instance if no name is provided', function(done) {
		// Invalidate name field
		partnerExpense.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Partner expense
				agent.post('/partner-expenses')
					.send(partnerExpense)
					.expect(400)
					.end(function(partnerExpenseSaveErr, partnerExpenseSaveRes) {
						// Set message assertion
						(partnerExpenseSaveRes.body.message).should.match('Please fill Partner expense name');
						
						// Handle Partner expense save error
						done(partnerExpenseSaveErr);
					});
			});
	});

	it('should be able to update Partner expense instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Partner expense
				agent.post('/partner-expenses')
					.send(partnerExpense)
					.expect(200)
					.end(function(partnerExpenseSaveErr, partnerExpenseSaveRes) {
						// Handle Partner expense save error
						if (partnerExpenseSaveErr) done(partnerExpenseSaveErr);

						// Update Partner expense name
						partnerExpense.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Partner expense
						agent.put('/partner-expenses/' + partnerExpenseSaveRes.body._id)
							.send(partnerExpense)
							.expect(200)
							.end(function(partnerExpenseUpdateErr, partnerExpenseUpdateRes) {
								// Handle Partner expense update error
								if (partnerExpenseUpdateErr) done(partnerExpenseUpdateErr);

								// Set assertions
								(partnerExpenseUpdateRes.body._id).should.equal(partnerExpenseSaveRes.body._id);
								(partnerExpenseUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Partner expenses if not signed in', function(done) {
		// Create new Partner expense model instance
		var partnerExpenseObj = new PartnerExpense(partnerExpense);

		// Save the Partner expense
		partnerExpenseObj.save(function() {
			// Request Partner expenses
			request(app).get('/partner-expenses')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Partner expense if not signed in', function(done) {
		// Create new Partner expense model instance
		var partnerExpenseObj = new PartnerExpense(partnerExpense);

		// Save the Partner expense
		partnerExpenseObj.save(function() {
			request(app).get('/partner-expenses/' + partnerExpenseObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', partnerExpense.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Partner expense instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Partner expense
				agent.post('/partner-expenses')
					.send(partnerExpense)
					.expect(200)
					.end(function(partnerExpenseSaveErr, partnerExpenseSaveRes) {
						// Handle Partner expense save error
						if (partnerExpenseSaveErr) done(partnerExpenseSaveErr);

						// Delete existing Partner expense
						agent.delete('/partner-expenses/' + partnerExpenseSaveRes.body._id)
							.send(partnerExpense)
							.expect(200)
							.end(function(partnerExpenseDeleteErr, partnerExpenseDeleteRes) {
								// Handle Partner expense error error
								if (partnerExpenseDeleteErr) done(partnerExpenseDeleteErr);

								// Set assertions
								(partnerExpenseDeleteRes.body._id).should.equal(partnerExpenseSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Partner expense instance if not signed in', function(done) {
		// Set Partner expense user 
		partnerExpense.user = user;

		// Create new Partner expense model instance
		var partnerExpenseObj = new PartnerExpense(partnerExpense);

		// Save the Partner expense
		partnerExpenseObj.save(function() {
			// Try deleting Partner expense
			request(app).delete('/partner-expenses/' + partnerExpenseObj._id)
			.expect(401)
			.end(function(partnerExpenseDeleteErr, partnerExpenseDeleteRes) {
				// Set message assertion
				(partnerExpenseDeleteRes.body.message).should.match('User is not logged in');

				// Handle Partner expense error error
				done(partnerExpenseDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		PartnerExpense.remove().exec();
		done();
	});
});