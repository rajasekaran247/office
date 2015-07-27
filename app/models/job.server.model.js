'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Job Schema
 */
var JobSchema = new Schema({
	
  
  client: {
		type: String,
		required: 'Please fill client name'
	},
  
  jobType: {
		type: String,
		required: 'Please fill jobType name'
	},
  
  periodEnded: {
		type: Date,
		required: 'Please fill periodEnded name'
	},
  
  entities: {
		type: String,
		required: 'Please fill entities name'
	},
  
  branchLocation: {
		type: String,
		required: 'Please fill branchLocation name'
	},
  
  jobOwner: {
		type: String,
		required: 'Please fill jobOwner name'
	},
  
  currentlyResponsible: {
		type: String,
		required: 'Please fill currentlyResponsible name'
	},
  
  targetEndDate: {
		type: Date,
		required: 'Please fill targetEndDate name'
	},
  
  jobStatus: {
		type: String,
		required: 'Please fill jobStatus name'
	},
  
  priority: {
		type: String,
		required: 'Please fill priority name'
	},
  
  jobDetails: {
		type: String,
		required: 'Please fill jobDetails name'
	},
  
  openingWip: {
		type: String,
		required: 'Please fill openingWip name'
	},
  
  openingWipdescription: {
		type: String,
		required: 'Please fill openingWipdescription name'
	},
  
  agreedFee: {
		type: Number,
		required: 'Please fill agreedFee name'
	},
  
  budgetTotal: {
		type: Number,
		required: 'Please fill budgetTotal name'
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

mongoose.model('Job', JobSchema);