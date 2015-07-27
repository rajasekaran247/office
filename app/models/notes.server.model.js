'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Notes Schema
 */
var NotesSchema = new Schema({
	
  
  jobId: {
		type: String,
		required: 'Please fill jobId name'
	},
  
  notesDate: {
		type: Date,
		required: 'Please fill notesDate name'
	},
  
  category: {
		type: String,
		required: 'Please fill category name'
	},
  
  note: {
		type: String,
		required: 'Please fill note name'
	},
  
  remindOn: {
		type: Date,
		required: 'Please fill remindOn name'
	},
  
  reminderEmailAddress: {
		type: String,
		required: 'Please fill reminderEmailAddress name'
	},
  
  repeatReminderYear: {
		type: Date,
		required: 'Please fill repeatReminderYear name'
	},
  
  repeatReminderMonth: {
		type: Date,
		required: 'Please fill repeatReminderMonth name'
	},
  
  repeatReminderDays: {
		type: Number,
		required: 'Please fill repeatReminderDays name'
	},
  
  repeatReminderEndBy: {
		type: Date,
		required: 'Please fill repeatReminderEndBy name'
	},
  
  createdBy: {
		type: String,
		required: 'Please fill createdBy name'
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

mongoose.model('Notes', NotesSchema);