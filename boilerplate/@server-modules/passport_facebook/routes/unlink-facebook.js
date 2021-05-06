/*ßoilerplate */

ß.app.get('/unlink/facebook', ß.lib.passport.isLoggedIn, function(req, res) {
    var user = req.user;
    user.facebook.token = undefined;
    user.save(function(err) {
        res.redirect('/profile');
    });
});
