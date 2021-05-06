ß.app.get('/admin.html', ß.lib.passport_admin.isLoggedInAdmin, function(req, res, next) {
	// additional things for admin eventually?
  	
  	if (req.session.user) req.session.is_admin = true;
  	ß.run_hook('admin_update');
    next();
});