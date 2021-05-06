/*ßoilerplate */

/* @DOC
	The lib-function `ß.lib.passport_admin.isLoggedInAdmin(req, res, next)` checks whether the authenticated user is either admin or not. 
    If the user is not authenticated as admin then redirect to the login page, or inform about the failure.
*/

module.exports = function(req, res, next) {
    if (req.isAuthenticated())
        if (req.user)
            if (ß.lib.passport_admin.check_if_admin(req.user._id)) return next();
            else ß.ntc("Admin access denied for user " + req.user._id);
    
  	// access denied
  	if (req.method === "GET") return res.redirect("/login");
    return res.send("ADMIN-AUTHENTICATION-REQUIRED");
};
