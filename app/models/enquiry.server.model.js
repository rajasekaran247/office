'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Enquiry Schema
 */
var EnquirySchema = new Schema({
	
  
  enquiryNo: {
		type: String,
		required: 'Please fill enquiryNo name'
	},
  
  enquiryDate: {
		type: Date,
		required: 'Please fill enquiryDate name'
	},
  
  clientName: {
		type: String,
		required: 'Please fill clientName name'
	},
  
  handlingResource: {
		type: String,
		required: 'Please fill handlingResource name'
	},
  
  areaOfEnquiry: {
		type: String,
		required: 'Please fill areaOfEnquiry name'
	},
  
  modeOfReceipt: {
		type: String,
		required: 'Please fill modeOfReceipt name'
	},
  
  billable: {
		type: String,
		required: 'Please fill billable name'
	},
  
  status: {
		type: String,
		required: 'Please fill status name'
	},
  
  groupAffilation: {
		type: String,
		required: 'Please fill groupAffilation name'
	},
  
  preparedBy: {
		type: String,
		required: 'Please fill preparedBy name'
	},
  
  remarks: {
		type: String,
		required: 'Please fill remarks name'
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

mongoose.model('Enquiry', EnquirySchema);