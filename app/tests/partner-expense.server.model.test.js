'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	PartnerExpense = mongoose.model('PartnerExpense');

/**
 * Globals
 */
var user, partnerExpense;

/**
 * Unit tests
 */
describe('Partner expense Model Unit Tests:', function() {
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
			partnerExpense = new PartnerExpense({
				name: 'Partner expense Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return partnerExpense.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			partnerExpense.name = '';

			return partnerExpense.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		PartnerExpense.remove().exec();
		User.remove().exec();

		done();
	});
});