'use strict';

// Configuring the Core module
angular.module('core').run(['Menus',
	function(Menus) {
		// Set top bar menu items
    
      Menus.addMenuItem('topbar', 'Admin', 'admin', 'dropdown');
      
      Menus.addSubMenuItem('topbar', 'admin', 'Timesheet', 'timesheets');
      
      Menus.addSubMenuItem('topbar', 'admin', 'Job', 'jobs');
      
      Menus.addSubMenuItem('topbar', 'admin', 'Contacts', 'contacts');
      
      Menus.addSubMenuItem('topbar', 'admin', 'Comment', 'comments');
      
      Menus.addSubMenuItem('topbar', 'admin', 'Notes', 'notes');
      
      Menus.addSubMenuItem('topbar', 'admin', 'Procedures And Templates', 'procedures-and-templates');
      
      Menus.addSubMenuItem('topbar', 'admin', 'Documents', 'documents');
      
      Menus.addSubMenuItem('topbar', 'admin', 'Profiles', 'profiles');
      
      Menus.addSubMenuItem('topbar', 'admin', 'Enquiry', 'enquiries');
      
      Menus.addSubMenuItem('topbar', 'admin', 'Enquiry Details', 'enquiry-details');
      
      Menus.addSubMenuItem('topbar', 'admin', 'Invoice', 'invoices');
      
      Menus.addSubMenuItem('topbar', 'admin', 'Invoice Details', 'invoice-details');
      
      Menus.addSubMenuItem('topbar', 'admin', 'Office Expenses', 'office-expenses');
      
      Menus.addSubMenuItem('topbar', 'admin', 'Partner Expenses', 'partner-expenses');
      
      Menus.addSubMenuItem('topbar', 'admin', 'Travel Reimbursement', 'travel-reimbursements');
      
      Menus.addSubMenuItem('topbar', 'admin', 'Travel Reimbursement Details', 'travel-reimbursement-details');
      
    
	}
]);
