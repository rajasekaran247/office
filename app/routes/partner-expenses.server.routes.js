'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var partnerExpenses = require('../../app/controllers/partner-expenses.server.controller');

	// Partner expenses Routes
	app.route('/partner-expenses')
		.get(partnerExpenses.list)
		.post(users.requiresLogin, partnerExpenses.create);

	app.route('/partner-expenses/:partnerExpenseId')
		.get(partnerExpenses.read)
		.put(users.requiresLogin, partnerExpenses.hasAuthorization, partnerExpenses.update)
		.delete(users.requiresLogin, partnerExpenses.hasAuthorization, partnerExpenses.delete);

	// Finish by binding the Partner expense middleware
	app.param('partnerExpenseId', partnerExpenses.partnerExpenseByID);
};
