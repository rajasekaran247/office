'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	TravelReimbursementDetail = mongoose.model('TravelReimbursementDetail'),
	_ = require('lodash');

/**
 * Create a Travel reimbursement detail
 */
exports.create = function(req, res) {
	var travelReimbursementDetail = new TravelReimbursementDetail(req.body);
	travelReimbursementDetail.user = req.user;

	travelReimbursementDetail.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(travelReimbursementDetail);
		}
	});
};

/**
 * Show the current Travel reimbursement detail
 */
exports.read = function(req, res) {
	res.jsonp(req.travelReimbursementDetail);
};

/**
 * Update a Travel reimbursement detail
 */
exports.update = function(req, res) {
	var travelReimbursementDetail = req.travelReimbursementDetail ;

	travelReimbursementDetail = _.extend(travelReimbursementDetail , req.body);

	travelReimbursementDetail.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(travelReimbursementDetail);
		}
	});
};

/**
 * Delete an Travel reimbursement detail
 */
exports.delete = function(req, res) {
	var travelReimbursementDetail = req.travelReimbursementDetail ;

	travelReimbursementDetail.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(travelReimbursementDetail);
		}
	});
};

/**
 * List of Travel reimbursement details
 */
exports.list = function(req, res) { 
	TravelReimbursementDetail.find().sort('-created').populate('user', 'displayName').exec(function(err, travelReimbursementDetails) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(travelReimbursementDetails);
		}
	});
};

/**
 * Travel reimbursement detail middleware
 */
exports.travelReimbursementDetailByID = function(req, res, next, id) { 
	TravelReimbursementDetail.findById(id).populate('user', 'displayName').exec(function(err, travelReimbursementDetail) {
		if (err) return next(err);
		if (! travelReimbursementDetail) return next(new Error('Failed to load Travel reimbursement detail ' + id));
		req.travelReimbursementDetail = travelReimbursementDetail ;
		next();
	});
};

/**
 * Travel reimbursement detail authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.travelReimbursementDetail.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
