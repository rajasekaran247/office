'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var invoiceDetails = require('../../app/controllers/invoice-details.server.controller');

	// Invoice details Routes
	app.route('/invoice-details')
		.get(invoiceDetails.list)
		.post(users.requiresLogin, invoiceDetails.create);

	app.route('/invoice-details/:invoiceDetailId')
		.get(invoiceDetails.read)
		.put(users.requiresLogin, invoiceDetails.hasAuthorization, invoiceDetails.update)
		.delete(users.requiresLogin, invoiceDetails.hasAuthorization, invoiceDetails.delete);

	// Finish by binding the Invoice detail middleware
	app.param('invoiceDetailId', invoiceDetails.invoiceDetailByID);
};
