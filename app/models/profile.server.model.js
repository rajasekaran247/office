'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Profile Schema
 */
var ProfileSchema = new Schema({
	
  
  profileName: {
		type: String,
		required: 'Please fill profileName name'
	},
  
  selectedSecurityRole: {
		type: String,
		required: 'Please fill selectedSecurityRole name'
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

mongoose.model('Profile', ProfileSchema);