'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	EnquiryDetail = mongoose.model('EnquiryDetail');

/**
 * Globals
 */
var user, enquiryDetail;

/**
 * Unit tests
 */
describe('Enquiry detail Model Unit Tests:', function() {
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
			enquiryDetail = new EnquiryDetail({
				name: 'Enquiry detail Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return enquiryDetail.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			enquiryDetail.name = '';

			return enquiryDetail.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		EnquiryDetail.remove().exec();
		User.remove().exec();

		done();
	});
});