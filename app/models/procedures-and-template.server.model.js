'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Procedures and template Schema
 */
var ProceduresAndTemplateSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Procedures and template name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('ProceduresAndTemplate', ProceduresAndTemplateSchema);