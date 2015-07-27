'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var travelReimbursements = require('../../app/controllers/travel-reimbursements.server.controller');

	// Travel reimbursements Routes
	app.route('/travel-reimbursements')
		.get(travelReimbursements.list)
		.post(users.requiresLogin, travelReimbursements.create);

	app.route('/travel-reimbursements/:travelReimbursementId')
		.get(travelReimbursements.read)
		.put(users.requiresLogin, travelReimbursements.hasAuthorization, travelReimbursements.update)
		.delete(users.requiresLogin, travelReimbursements.hasAuthorization, travelReimbursements.delete);

	// Finish by binding the Travel reimbursement middleware
	app.param('travelReimbursementId', travelReimbursements.travelReimbursementByID);
};
