'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * TravelReimbursement Schema
 */
var TravelReimbursementSchema = new Schema({
	
  
  entryNo: {
		type: Number,
		required: 'Please fill entryNo name'
	},
  
  entryDate: {
		type: Date,
		required: 'Please fill entryDate name'
	},
  
  employeeName: {
		type: String,
		required: 'Please fill employeeName name'
	},
  
  partnerName: {
		type: String,
		required: 'Please fill partnerName name'
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

mongoose.model('TravelReimbursement', TravelReimbursementSchema);