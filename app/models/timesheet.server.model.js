'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Timesheet Schema
 */
var TimesheetSchema = new Schema({
	
  
  selectEntryType: {
		type: String,
		required: 'Please fill selectEntryType name'
	},
  
  job: {
		type: String,
		required: 'Please fill job name'
	},
  
  startTime: {
		type: Date,
		required: 'Please fill startTime name'
	},
  
  endTime: {
		type: Date,
		required: 'Please fill endTime name'
	},
  
  activityCode: {
		type: Number,
		required: 'Please fill activityCode name'
	},
  
  comment: {
		type: String,
		required: 'Please fill comment name'
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

mongoose.model('Timesheet', TimesheetSchema);