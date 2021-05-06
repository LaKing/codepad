/*ßoilerplate */
/*
ß.app.get('/hash/:email/:id/:hash', ß.passport.authenticate('hash-login', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));
*/
ß.app.get("/hash/:email/:id/:hash", function(req, res, next) {
    ß.passport.authenticate("hash", function(err, user, info) {
        if (err) {
            console.log("Passport hash error", req.params, info);
            res.status(500).end("Sorry, there was an error.");
            return;
        }
        if (!user) {
            return;
        }
        // on success
        req.logIn(user, function(err) {
            if (err) {
                đ(err);
                console.log("Passport hash logIn failed");
                res.status(500).end("Sorry, error.");
                return;
            }
            var uri = "/login";
            if (ß.PASSPORT_HASH_REDIRECT_URI) uri = ß.PASSPORT_HASH_REDIRECT_URI;
            return res.redirect(uri);
        });
        //ß.msg('Email confirmed: ' + );
        //res.redirect('/login');
    })(req, res, next);
});
