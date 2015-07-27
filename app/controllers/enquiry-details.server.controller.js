'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	EnquiryDetail = mongoose.model('EnquiryDetail'),
	_ = require('lodash');

/**
 * Create a Enquiry detail
 */
exports.create = function(req, res) {
	var enquiryDetail = new EnquiryDetail(req.body);
	enquiryDetail.user = req.user;

	enquiryDetail.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(enquiryDetail);
		}
	});
};

/**
 * Show the current Enquiry detail
 */
exports.read = function(req, res) {
	res.jsonp(req.enquiryDetail);
};

/**
 * Update a Enquiry detail
 */
exports.update = function(req, res) {
	var enquiryDetail = req.enquiryDetail ;

	enquiryDetail = _.extend(enquiryDetail , req.body);

	enquiryDetail.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(enquiryDetail);
		}
	});
};

/**
 * Delete an Enquiry detail
 */
exports.delete = function(req, res) {
	var enquiryDetail = req.enquiryDetail ;

	enquiryDetail.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(enquiryDetail);
		}
	});
};

/**
 * List of Enquiry details
 */
exports.list = function(req, res) { 
	EnquiryDetail.find().sort('-created').populate('user', 'displayName').exec(function(err, enquiryDetails) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(enquiryDetails);
		}
	});
};

/**
 * Enquiry detail middleware
 */
exports.enquiryDetailByID = function(req, res, next, id) { 
	EnquiryDetail.findById(id).populate('user', 'displayName').exec(function(err, enquiryDetail) {
		if (err) return next(err);
		if (! enquiryDetail) return next(new Error('Failed to load Enquiry detail ' + id));
		req.enquiryDetail = enquiryDetail ;
		next();
	});
};

/**
 * Enquiry detail authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.enquiryDetail.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
