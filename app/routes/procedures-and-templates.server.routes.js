'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var proceduresAndTemplates = require('../../app/controllers/procedures-and-templates.server.controller');

	// Procedures and templates Routes
	app.route('/procedures-and-templates')
		.get(proceduresAndTemplates.list)
		.post(users.requiresLogin, proceduresAndTemplates.create);

	app.route('/procedures-and-templates/:proceduresAndTemplateId')
		.get(proceduresAndTemplates.read)
		.put(users.requiresLogin, proceduresAndTemplates.hasAuthorization, proceduresAndTemplates.update)
		.delete(users.requiresLogin, proceduresAndTemplates.hasAuthorization, proceduresAndTemplates.delete);

	// Finish by binding the Procedures and template middleware
	app.param('proceduresAndTemplateId', proceduresAndTemplates.proceduresAndTemplateByID);
};
