'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * EnquiryDetail Schema
 */
var EnquiryDetailSchema = new Schema({
	
  
  sno: {
		type: Number,
		required: 'Please fill sno name'
	},
  
  details: {
		type: String,
		required: 'Please fill details name'
	},
  
  notes: {
		type: String,
		required: 'Please fill notes name'
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

mongoose.model('EnquiryDetail', EnquiryDetailSchema);