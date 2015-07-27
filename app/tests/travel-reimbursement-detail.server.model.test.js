'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	TravelReimbursementDetail = mongoose.model('TravelReimbursementDetail');

/**
 * Globals
 */
var user, travelReimbursementDetail;

/**
 * Unit tests
 */
describe('Travel reimbursement detail Model Unit Tests:', function() {
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
			travelReimbursementDetail = new TravelReimbursementDetail({
				name: 'Travel reimbursement detail Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return travelReimbursementDetail.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			travelReimbursementDetail.name = '';

			return travelReimbursementDetail.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		TravelReimbursementDetail.remove().exec();
		User.remove().exec();

		done();
	});
});