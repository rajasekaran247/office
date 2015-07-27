'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	TravelReimbursement = mongoose.model('TravelReimbursement'),
	_ = require('lodash');

/**
 * Create a Travel reimbursement
 */
exports.create = function(req, res) {
	var travelReimbursement = new TravelReimbursement(req.body);
	travelReimbursement.user = req.user;

	travelReimbursement.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(travelReimbursement);
		}
	});
};

/**
 * Show the current Travel reimbursement
 */
exports.read = function(req, res) {
	res.jsonp(req.travelReimbursement);
};

/**
 * Update a Travel reimbursement
 */
exports.update = function(req, res) {
	var travelReimbursement = req.travelReimbursement ;

	travelReimbursement = _.extend(travelReimbursement , req.body);

	travelReimbursement.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(travelReimbursement);
		}
	});
};

/**
 * Delete an Travel reimbursement
 */
exports.delete = function(req, res) {
	var travelReimbursement = req.travelReimbursement ;

	travelReimbursement.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(travelReimbursement);
		}
	});
};

/**
 * List of Travel reimbursements
 */
exports.list = function(req, res) { 
	TravelReimbursement.find().sort('-created').populate('user', 'displayName').exec(function(err, travelReimbursements) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(travelReimbursements);
		}
	});
};

/**
 * Travel reimbursement middleware
 */
exports.travelReimbursementByID = function(req, res, next, id) { 
	TravelReimbursement.findById(id).populate('user', 'displayName').exec(function(err, travelReimbursement) {
		if (err) return next(err);
		if (! travelReimbursement) return next(new Error('Failed to load Travel reimbursement ' + id));
		req.travelReimbursement = travelReimbursement ;
		next();
	});
};

/**
 * Travel reimbursement authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.travelReimbursement.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
