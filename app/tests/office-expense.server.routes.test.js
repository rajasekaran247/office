'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	OfficeExpense = mongoose.model('OfficeExpense'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, officeExpense;

/**
 * Office expense routes tests
 */
describe('Office expense CRUD tests', function() {
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

		// Save a user to the test db and create new Office expense
		user.save(function() {
			officeExpense = {
				name: 'Office expense Name'
			};

			done();
		});
	});

	it('should be able to save Office expense instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Office expense
				agent.post('/office-expenses')
					.send(officeExpense)
					.expect(200)
					.end(function(officeExpenseSaveErr, officeExpenseSaveRes) {
						// Handle Office expense save error
						if (officeExpenseSaveErr) done(officeExpenseSaveErr);

						// Get a list of Office expenses
						agent.get('/office-expenses')
							.end(function(officeExpensesGetErr, officeExpensesGetRes) {
								// Handle Office expense save error
								if (officeExpensesGetErr) done(officeExpensesGetErr);

								// Get Office expenses list
								var officeExpenses = officeExpensesGetRes.body;

								// Set assertions
								(officeExpenses[0].user._id).should.equal(userId);
								(officeExpenses[0].name).should.match('Office expense Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Office expense instance if not logged in', function(done) {
		agent.post('/office-expenses')
			.send(officeExpense)
			.expect(401)
			.end(function(officeExpenseSaveErr, officeExpenseSaveRes) {
				// Call the assertion callback
				done(officeExpenseSaveErr);
			});
	});

	it('should not be able to save Office expense instance if no name is provided', function(done) {
		// Invalidate name field
		officeExpense.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Office expense
				agent.post('/office-expenses')
					.send(officeExpense)
					.expect(400)
					.end(function(officeExpenseSaveErr, officeExpenseSaveRes) {
						// Set message assertion
						(officeExpenseSaveRes.body.message).should.match('Please fill Office expense name');
						
						// Handle Office expense save error
						done(officeExpenseSaveErr);
					});
			});
	});

	it('should be able to update Office expense instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Office expense
				agent.post('/office-expenses')
					.send(officeExpense)
					.expect(200)
					.end(function(officeExpenseSaveErr, officeExpenseSaveRes) {
						// Handle Office expense save error
						if (officeExpenseSaveErr) done(officeExpenseSaveErr);

						// Update Office expense name
						officeExpense.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Office expense
						agent.put('/office-expenses/' + officeExpenseSaveRes.body._id)
							.send(officeExpense)
							.expect(200)
							.end(function(officeExpenseUpdateErr, officeExpenseUpdateRes) {
								// Handle Office expense update error
								if (officeExpenseUpdateErr) done(officeExpenseUpdateErr);

								// Set assertions
								(officeExpenseUpdateRes.body._id).should.equal(officeExpenseSaveRes.body._id);
								(officeExpenseUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Office expenses if not signed in', function(done) {
		// Create new Office expense model instance
		var officeExpenseObj = new OfficeExpense(officeExpense);

		// Save the Office expense
		officeExpenseObj.save(function() {
			// Request Office expenses
			request(app).get('/office-expenses')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Office expense if not signed in', function(done) {
		// Create new Office expense model instance
		var officeExpenseObj = new OfficeExpense(officeExpense);

		// Save the Office expense
		officeExpenseObj.save(function() {
			request(app).get('/office-expenses/' + officeExpenseObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', officeExpense.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Office expense instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Office expense
				agent.post('/office-expenses')
					.send(officeExpense)
					.expect(200)
					.end(function(officeExpenseSaveErr, officeExpenseSaveRes) {
						// Handle Office expense save error
						if (officeExpenseSaveErr) done(officeExpenseSaveErr);

						// Delete existing Office expense
						agent.delete('/office-expenses/' + officeExpenseSaveRes.body._id)
							.send(officeExpense)
							.expect(200)
							.end(function(officeExpenseDeleteErr, officeExpenseDeleteRes) {
								// Handle Office expense error error
								if (officeExpenseDeleteErr) done(officeExpenseDeleteErr);

								// Set assertions
								(officeExpenseDeleteRes.body._id).should.equal(officeExpenseSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Office expense instance if not signed in', function(done) {
		// Set Office expense user 
		officeExpense.user = user;

		// Create new Office expense model instance
		var officeExpenseObj = new OfficeExpense(officeExpense);

		// Save the Office expense
		officeExpenseObj.save(function() {
			// Try deleting Office expense
			request(app).delete('/office-expenses/' + officeExpenseObj._id)
			.expect(401)
			.end(function(officeExpenseDeleteErr, officeExpenseDeleteRes) {
				// Set message assertion
				(officeExpenseDeleteRes.body.message).should.match('User is not logged in');

				// Handle Office expense error error
				done(officeExpenseDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		OfficeExpense.remove().exec();
		done();
	});
});