/*ßoilerplate */

ß.app.get('/unlink/google', ß.lib.passport.isLoggedIn, function(req, res) {
    var user = req.user;
    user.google.token = undefined;
    user.save(function(err) {
        res.redirect('/profile');
    });
});
