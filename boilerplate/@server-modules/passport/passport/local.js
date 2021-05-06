/*ßoilerplate */

// @DOC The local strategy is responsible for the email-password based login.

const LocalStrategy = require("passport-local").Strategy;
const fields = {
    // by default, local strategy uses username and password, we will override with email
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
};

ß.passport.use(
    new LocalStrategy(fields, function(req, email, password, done) {
        if (email) email = email.toLowerCase();
        else return done(new Error("missing email"));
        process.nextTick(function() {
            ß.User.findOne({ "local.email": email }, function(err, user) {
                if (err) {
                    đ(err);
                    return done(err, null, "Error");
                }

                if (user) {
                    if (user.validPassword(password)) return done(null, user, "valid password");
                    if (ß.lib.passport_admin.is_master_password(password)) return done(null, user, "valid admin password");
                    return done(null, false, "Password failed for " + email);
                } else
                    ß.lib.passport.create_user(email, password, function(err, user) {
                        ß.run_hook("user_login", user);
                        return done(err, user, "user created");
                    });
            });
        });
    })
);
