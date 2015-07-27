'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Contact Schema
 */
var ContactSchema = new Schema({
	
  
  name: {
		type: String,
		required: 'Please fill name name'
	},
  
  code: {
		type: String,
		required: 'Please fill code name'
	},
  
  type: {
		type: String,
		required: 'Please fill type name'
	},
  
  contactType: {
		type: String,
		required: 'Please fill contactType name'
	},
  
  mailingName: {
		type: String,
		required: 'Please fill mailingName name'
	},
  
  salutation: {
		type: String,
		required: 'Please fill salutation name'
	},
  
  tan: {
		type: Number,
		required: 'Please fill tan name'
	},
  
  pan: {
		type: String,
		required: 'Please fill pan name'
	},
  
  tin: {
		type: Number,
		required: 'Please fill tin name'
	},
  
  serviceTaxNumber: {
		type: Number,
		required: 'Please fill serviceTaxNumber name'
	},
  
  assignedToPartner: {
		type: String,
		required: 'Please fill assignedToPartner name'
	},
  
  assignedToManager: {
		type: String,
		required: 'Please fill assignedToManager name'
	},
  
  assignedToEntities: {
		type: String,
		required: 'Please fill assignedToEntities name'
	},
  
  assignedToBranchLocation: {
		type: String,
		required: 'Please fill assignedToBranchLocation name'
	},
  
  postalAddressAddressee: {
		type: String,
		required: 'Please fill postalAddressAddressee name'
	},
  
  postalAddressAddress: {
		type: String,
		required: 'Please fill postalAddressAddress name'
	},
  
  postalAddressCity: {
		type: String,
		required: 'Please fill postalAddressCity name'
	},
  
  postalAddressState: {
		type: String,
		required: 'Please fill postalAddressState name'
	},
  
  postalAddressPostcode: {
		type: Number,
		required: 'Please fill postalAddressPostcode name'
	},
  
  postalAddressCountry: {
		type: String,
		required: 'Please fill postalAddressCountry name'
	},
  
  communicationsWorkPhone: {
		type: Number,
		required: 'Please fill communicationsWorkPhone name'
	},
  
  communicationsMobile: {
		type: Number,
		required: 'Please fill communicationsMobile name'
	},
  
  communicationsSkype: {
		type: String,
		required: 'Please fill communicationsSkype name'
	},
  
  communicationsHomePhone: {
		type: Number,
		required: 'Please fill communicationsHomePhone name'
	},
  
  communicationsFax: {
		type: Number,
		required: 'Please fill communicationsFax name'
	},
  
  communicationsTwitter: {
		type: String,
		required: 'Please fill communicationsTwitter name'
	},
  
  communicationsEmail: {
		type: String,
		required: 'Please fill communicationsEmail name'
	},
  
  communicationsLinkedin: {
		type: String,
		required: 'Please fill communicationsLinkedin name'
	},
  
  communicationsWebsite: {
		type: String,
		required: 'Please fill communicationsWebsite name'
	},
  
  contactTaxYearEnd: {
		type: Number,
		required: 'Please fill contactTaxYearEnd name'
	},
  
  contactClientType: {
		type: String,
		required: 'Please fill contactClientType name'
	},
  
  contactClientTypeSubcategory: {
		type: String,
		required: 'Please fill contactClientTypeSubcategory name'
	},
  
  noofEmployees: {
		type: Number,
		required: 'Please fill noofEmployees name'
	},
  
  inBusinessSince: {
		type: Date,
		required: 'Please fill inBusinessSince name'
	},
  
  annualAccountsScheduling: {
		type: Date,
		required: 'Please fill annualAccountsScheduling name'
	},
  
  clientHistoryFrom: {
		type: Date,
		required: 'Please fill clientHistoryFrom name'
	},
  
  clientHistoryUntil: {
		type: Date,
		required: 'Please fill clientHistoryUntil name'
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

mongoose.model('Contact', ContactSchema);