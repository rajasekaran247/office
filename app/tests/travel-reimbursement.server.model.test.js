'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	TravelReimbursement = mongoose.model('TravelReimbursement');

/**
 * Globals
 */
var user, travelReimbursement;

/**
 * Unit tests
 */
describe('Travel reimbursement Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			travelReimbursement = new TravelReimbursement({
				name: 'Travel reimbursement Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return travelReimbursement.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			travelReimbursement.name = '';

			return travelReimbursement.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		TravelReimbursement.remove().exec();
		User.remove().exec();

		done();
	});
});