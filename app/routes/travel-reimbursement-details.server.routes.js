'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var travelReimbursementDetails = require('../../app/controllers/travel-reimbursement-details.server.controller');

	// Travel reimbursement details Routes
	app.route('/travel-reimbursement-details')
		.get(travelReimbursementDetails.list)
		.post(users.requiresLogin, travelReimbursementDetails.create);

	app.route('/travel-reimbursement-details/:travelReimbursementDetailId')
		.get(travelReimbursementDetails.read)
		.put(users.requiresLogin, travelReimbursementDetails.hasAuthorization, travelReimbursementDetails.update)
		.delete(users.requiresLogin, travelReimbursementDetails.hasAuthorization, travelReimbursementDetails.delete);

	// Finish by binding the Travel reimbursement detail middleware
	app.param('travelReimbursementDetailId', travelReimbursementDetails.travelReimbursementDetailByID);
};
