'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	ProceduresAndTemplate = mongoose.model('ProceduresAndTemplate'),
	_ = require('lodash');

/**
 * Create a Procedures and template
 */
exports.create = function(req, res) {
	var proceduresAndTemplate = new ProceduresAndTemplate(req.body);
	proceduresAndTemplate.user = req.user;

	proceduresAndTemplate.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(proceduresAndTemplate);
		}
	});
};

/**
 * Show the current Procedures and template
 */
exports.read = function(req, res) {
	res.jsonp(req.proceduresAndTemplate);
};

/**
 * Update a Procedures and template
 */
exports.update = function(req, res) {
	var proceduresAndTemplate = req.proceduresAndTemplate ;

	proceduresAndTemplate = _.extend(proceduresAndTemplate , req.body);

	proceduresAndTemplate.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(proceduresAndTemplate);
		}
	});
};

/**
 * Delete an Procedures and template
 */
exports.delete = function(req, res) {
	var proceduresAndTemplate = req.proceduresAndTemplate ;

	proceduresAndTemplate.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(proceduresAndTemplate);
		}
	});
};

/**
 * List of Procedures and templates
 */
exports.list = function(req, res) { 
	ProceduresAndTemplate.find().sort('-created').populate('user', 'displayName').exec(function(err, proceduresAndTemplates) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(proceduresAndTemplates);
		}
	});
};

/**
 * Procedures and template middleware
 */
exports.proceduresAndTemplateByID = function(req, res, next, id) { 
	ProceduresAndTemplate.findById(id).populate('user', 'displayName').exec(function(err, proceduresAndTemplate) {
		if (err) return next(err);
		if (! proceduresAndTemplate) return next(new Error('Failed to load Procedures and template ' + id));
		req.proceduresAndTemplate = proceduresAndTemplate ;
		next();
	});
};

/**
 * Procedures and template authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.proceduresAndTemplate.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
