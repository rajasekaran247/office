'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Comment Schema
 */
var CommentSchema = new Schema({
	
  
  jobId: {
		type: String,
		required: 'Please fill jobId name'
	},
  
  comment: {
		type: String,
		required: 'Please fill comment name'
	},
  
  commentedBy: {
		type: String,
		required: 'Please fill commentedBy name'
	},
  
  commentedTime: {
		type: Date,
		required: 'Please fill commentedTime name'
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

mongoose.model('Comment', CommentSchema);