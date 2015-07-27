'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var enquiryDetails = require('../../app/controllers/enquiry-details.server.controller');

	// Enquiry details Routes
	app.route('/enquiry-details')
		.get(enquiryDetails.list)
		.post(users.requiresLogin, enquiryDetails.create);

	app.route('/enquiry-details/:enquiryDetailId')
		.get(enquiryDetails.read)
		.put(users.requiresLogin, enquiryDetails.hasAuthorization, enquiryDetails.update)
		.delete(users.requiresLogin, enquiryDetails.hasAuthorization, enquiryDetails.delete);

	// Finish by binding the Enquiry detail middleware
	app.param('enquiryDetailId', enquiryDetails.enquiryDetailByID);
};
