'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Invoice Schema
 */
var InvoiceSchema = new Schema({
	
  
  invoiceNo: {
		type: Number,
		required: 'Please fill invoiceNo name'
	},
  
  invoiceDate: {
		type: Date,
		required: 'Please fill invoiceDate name'
	},
  
  dueDate: {
		type: Date,
		required: 'Please fill dueDate name'
	},
  
  jobNo: {
		type: String,
		required: 'Please fill jobNo name'
	},
  
  clientName: {
		type: String,
		required: 'Please fill clientName name'
	},
  
  mainPartner: {
		type: String,
		required: 'Please fill mainPartner name'
	},
  
  jobDoneFor: {
		type: String,
		required: 'Please fill jobDoneFor name'
	},
  
  netAmount: {
		type: Number,
		required: 'Please fill netAmount name'
	},
  
  totalAmount: {
		type: Number,
		required: 'Please fill totalAmount name'
	},
  
  amountAlreadyDue: {
		type: Number,
		required: 'Please fill amountAlreadyDue name'
	},
  
  totalBalanceDue: {
		type: Number,
		required: 'Please fill totalBalanceDue name'
	},
  
  amountInWords: {
		type: String,
		required: 'Please fill amountInWords name'
	},
  
  serviceTax: {
		type: Number,
		required: 'Please fill serviceTax name'
	},
  
  serviceTaxAmount: {
		type: Number,
		required: 'Please fill serviceTaxAmount name'
	},
  
  eduCess: {
		type: Number,
		required: 'Please fill eduCess name'
	},
  
  eduCessAmount: {
		type: Number,
		required: 'Please fill eduCessAmount name'
	},
  
  secEduCess: {
		type: Number,
		required: 'Please fill secEduCess name'
	},
  
  secEduCessAmount: {
		type: Number,
		required: 'Please fill secEduCessAmount name'
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

mongoose.model('Invoice', InvoiceSchema);