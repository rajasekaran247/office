'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var officeExpenses = require('../../app/controllers/office-expenses.server.controller');

	// Office expenses Routes
	app.route('/office-expenses')
		.get(officeExpenses.list)
		.post(users.requiresLogin, officeExpenses.create);

	app.route('/office-expenses/:officeExpenseId')
		.get(officeExpenses.read)
		.put(users.requiresLogin, officeExpenses.hasAuthorization, officeExpenses.update)
		.delete(users.requiresLogin, officeExpenses.hasAuthorization, officeExpenses.delete);

	// Finish by binding the Office expense middleware
	app.param('officeExpenseId', officeExpenses.officeExpenseByID);
};
