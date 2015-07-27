'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * TravelReimbursementDetail Schema
 */
var TravelReimbursementDetailSchema = new Schema({
	
  
  sno: {
		type: Number,
		required: 'Please fill sno name'
	},
  
  clientLocation: {
		type: String,
		required: 'Please fill clientLocation name'
	},
  
  jobNumber: {
		type: Number,
		required: 'Please fill jobNumber name'
	},
  
  fromDate: {
		type: Date,
		required: 'Please fill fromDate name'
	},
  
  toDate: {
		type: Date,
		required: 'Please fill toDate name'
	},
  
  noOfDays: {
		type: Number,
		required: 'Please fill noOfDays name'
	},
  
  conveyance: {
		type: Number,
		required: 'Please fill conveyance name'
	},
  
  foodAllowance: {
		type: Number,
		required: 'Please fill foodAllowance name'
	},
  
  otherExpenses: {
		type: Number,
		required: 'Please fill otherExpenses name'
	},
  
  totalAmount: {
		type: Number,
		required: 'Please fill totalAmount name'
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

mongoose.model('TravelReimbursementDetail', TravelReimbursementDetailSchema);