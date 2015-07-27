'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	OfficeExpense = mongoose.model('OfficeExpense'),
	_ = require('lodash');

/**
 * Create a Office expense
 */
exports.create = function(req, res) {
	var officeExpense = new OfficeExpense(req.body);
	officeExpense.user = req.user;

	officeExpense.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(officeExpense);
		}
	});
};

/**
 * Show the current Office expense
 */
exports.read = function(req, res) {
	res.jsonp(req.officeExpense);
};

/**
 * Update a Office expense
 */
exports.update = function(req, res) {
	var officeExpense = req.officeExpense ;

	officeExpense = _.extend(officeExpense , req.body);

	officeExpense.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(officeExpense);
		}
	});
};

/**
 * Delete an Office expense
 */
exports.delete = function(req, res) {
	var officeExpense = req.officeExpense ;

	officeExpense.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(officeExpense);
		}
	});
};

/**
 * List of Office expenses
 */
exports.list = function(req, res) { 
	OfficeExpense.find().sort('-created').populate('user', 'displayName').exec(function(err, officeExpenses) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(officeExpenses);
		}
	});
};

/**
 * Office expense middleware
 */
exports.officeExpenseByID = function(req, res, next, id) { 
	OfficeExpense.findById(id).populate('user', 'displayName').exec(function(err, officeExpense) {
		if (err) return next(err);
		if (! officeExpense) return next(new Error('Failed to load Office expense ' + id));
		req.officeExpense = officeExpense ;
		next();
	});
};

/**
 * Office expense authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.officeExpense.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
