'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * InvoiceDetail Schema
 */
var InvoiceDetailSchema = new Schema({
	
  
  sno: {
		type: Number,
		required: 'Please fill sno name'
	},
  
  particulars: {
		type: String,
		required: 'Please fill particulars name'
	},
  
  amount: {
		type: Number,
		required: 'Please fill amount name'
	},
  
  note: {
		type: String,
		required: 'Please fill note name'
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

mongoose.model('InvoiceDetail', InvoiceDetailSchema);