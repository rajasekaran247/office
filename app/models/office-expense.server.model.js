'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * OfficeExpense Schema
 */
var OfficeExpenseSchema = new Schema({
	
  
  entryNo: {
		type: Number,
		required: 'Please fill entryNo name'
	},
  
  date: {
		type: Date,
		required: 'Please fill date name'
	},
  
  employeeName: {
		type: String,
		required: 'Please fill employeeName name'
	},
  
  sno: {
		type: Number,
		required: 'Please fill sno name'
	},
  
  description: {
		type: String,
		required: 'Please fill description name'
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

mongoose.model('OfficeExpense', OfficeExpenseSchema);