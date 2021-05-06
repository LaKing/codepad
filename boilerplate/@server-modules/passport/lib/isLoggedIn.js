/*ßoilerplate */

/* @DOC
	The lib-function `ß.lib.passport.isLoggedIn(req, res, next)` checks if the user is authenticated or not.
    It can be used as express middleware. 
*/

module.exports = function(req, res, next) {
    if (req.isAuthenticated())
        return next();
    if (req.method === 'GET') return res.redirect('/login');
    res.json('AUTHENTICATION-REQUIRED');
};