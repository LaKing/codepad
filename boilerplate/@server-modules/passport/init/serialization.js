/*ßoilerplate */

// used to serialize the user for the session
ß.passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used to deserialize the user
ß.passport.deserializeUser(function(id, done) {
    ß.User.findById(id, function(err, user) {
        if (err) console.error("ERROR passport deserializeUser", err, user);
        done(err, user);
    });
});
