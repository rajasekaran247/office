'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	PartnerExpense = mongoose.model('PartnerExpense'),
	_ = require('lodash');

/**
 * Create a Partner expense
 */
exports.create = function(req, res) {
	var partnerExpense = new PartnerExpense(req.body);
	partnerExpense.user = req.user;

	partnerExpense.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(partnerExpense);
		}
	});
};

/**
 * Show the current Partner expense
 */
exports.read = function(req, res) {
	res.jsonp(req.partnerExpense);
};

/**
 * Update a Partner expense
 */
exports.update = function(req, res) {
	var partnerExpense = req.partnerExpense ;

	partnerExpense = _.extend(partnerExpense , req.body);

	partnerExpense.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(partnerExpense);
		}
	});
};

/**
 * Delete an Partner expense
 */
exports.delete = function(req, res) {
	var partnerExpense = req.partnerExpense ;

	partnerExpense.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(partnerExpense);
		}
	});
};

/**
 * List of Partner expenses
 */
exports.list = function(req, res) { 
	PartnerExpense.find().sort('-created').populate('user', 'displayName').exec(function(err, partnerExpenses) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(partnerExpenses);
		}
	});
};

/**
 * Partner expense middleware
 */
exports.partnerExpenseByID = function(req, res, next, id) { 
	PartnerExpense.findById(id).populate('user', 'displayName').exec(function(err, partnerExpense) {
		if (err) return next(err);
		if (! partnerExpense) return next(new Error('Failed to load Partner expense ' + id));
		req.partnerExpense = partnerExpense ;
		next();
	});
};

/**
 * Partner expense authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.partnerExpense.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
