'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Document Schema
 */
var DocumentSchema = new Schema({
	
  
  jobId: {
		type: String,
		required: 'Please fill jobId name'
	},
  
  file: {
		type: String,
		required: 'Please fill file name'
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

mongoose.model('Document', DocumentSchema);