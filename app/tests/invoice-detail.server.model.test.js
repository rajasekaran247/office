'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	InvoiceDetail = mongoose.model('InvoiceDetail');

/**
 * Globals
 */
var user, invoiceDetail;

/**
 * Unit tests
 */
describe('Invoice detail Model Unit Tests:', function() {
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
			invoiceDetail = new InvoiceDetail({
				name: 'Invoice detail Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return invoiceDetail.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			invoiceDetail.name = '';

			return invoiceDetail.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		InvoiceDetail.remove().exec();
		User.remove().exec();

		done();
	});
});