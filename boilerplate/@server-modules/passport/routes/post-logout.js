/*ßoilerplate */

// @DOC The `post-logout.json` route destroys the user session.

const cb = function() {
    //Ł('session destriction cb');
};

ß.app.post('/post-logout.json', ß.lib.passport.isLoggedIn, function(req, res) {
    req.logout();
    if (req.session) req.session.destroy(cb);
    res.json('OK');
});
