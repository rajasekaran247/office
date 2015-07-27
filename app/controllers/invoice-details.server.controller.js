'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	InvoiceDetail = mongoose.model('InvoiceDetail'),
	_ = require('lodash');

/**
 * Create a Invoice detail
 */
exports.create = function(req, res) {
	var invoiceDetail = new InvoiceDetail(req.body);
	invoiceDetail.user = req.user;

	invoiceDetail.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(invoiceDetail);
		}
	});
};

/**
 * Show the current Invoice detail
 */
exports.read = function(req, res) {
	res.jsonp(req.invoiceDetail);
};

/**
 * Update a Invoice detail
 */
exports.update = function(req, res) {
	var invoiceDetail = req.invoiceDetail ;

	invoiceDetail = _.extend(invoiceDetail , req.body);

	invoiceDetail.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(invoiceDetail);
		}
	});
};

/**
 * Delete an Invoice detail
 */
exports.delete = function(req, res) {
	var invoiceDetail = req.invoiceDetail ;

	invoiceDetail.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(invoiceDetail);
		}
	});
};

/**
 * List of Invoice details
 */
exports.list = function(req, res) { 
	InvoiceDetail.find().sort('-created').populate('user', 'displayName').exec(function(err, invoiceDetails) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(invoiceDetails);
		}
	});
};

/**
 * Invoice detail middleware
 */
exports.invoiceDetailByID = function(req, res, next, id) { 
	InvoiceDetail.findById(id).populate('user', 'displayName').exec(function(err, invoiceDetail) {
		if (err) return next(err);
		if (! invoiceDetail) return next(new Error('Failed to load Invoice detail ' + id));
		req.invoiceDetail = invoiceDetail ;
		next();
	});
};

/**
 * Invoice detail authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.invoiceDetail.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
