'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * ProceduresAndTemplates Schema
 */
var ProceduresAndTemplatesSchema = new Schema({
	
  
  jobId: {
		type: String,
		required: 'Please fill jobId name'
	},
  
  content: {
		type: String,
		required: 'Please fill content name'
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

mongoose.model('ProceduresAndTemplates', ProceduresAndTemplatesSchema);