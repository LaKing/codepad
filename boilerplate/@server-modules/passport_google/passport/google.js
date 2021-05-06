/*ßoilerplate */

const User = ß.User;
const lib = ß.lib;
const passport = ß.passport;
const configAuth = lib.passport_google.config_auth();

const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

passport.use(
    new GoogleStrategy(
        {
            clientID: configAuth.googleAuth.clientID,
            clientSecret: configAuth.googleAuth.clientSecret,
            callbackURL: configAuth.googleAuth.callbackURL,
            passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        },
        function(req, token, refreshToken, profile, done) {
            // asynchronous
            process.nextTick(function() {
                // check if the user is already logged in
                if (!req.user) {
                    User.findOne(
                        {
                            "google.id": profile.id
                        },
                        function(err, user) {
                            if (err) return done(err);

                            if (user) {
                                // if there is a user id already but no token (user was linked at one point and then removed)
                                if (!user.google.token) {
                                    user.google.token = token;
                                    user.google.name = profile.displayName;
                                    user.google.email = (profile.emails[0].value || "").toLowerCase(); // pull the first email

                                    user.save(function(err) {
                                        if (err) return done(err);

                                        ß.run_hook("user_login", user);

                                        return done(null, user);
                                    });
                                }

                                return done(null, user);
                            } else {
                                var newUser = new User();

                                newUser.google.id = profile.id;
                                newUser.google.token = token;
                                newUser.google.name = profile.displayName;
                                newUser.google.email = (profile.emails[0].value || "").toLowerCase(); // pull the first email

                                newUser.save(function(err) {
                                    if (err) return done(err);

                                    ß.run_hook("user_login", user);

                                    return done(null, newUser);
                                });
                            }
                        }
                    );
                } else {
                    // user already exists and is logged in, we have to link accounts
                    var user = req.user; // pull the user out of the session

                    user.google.id = profile.id;
                    user.google.token = token;
                    user.google.name = profile.displayName;
                    user.google.email = (profile.emails[0].value || "").toLowerCase(); // pull the first email

                    user.save(function(err) {
                        if (err) return done(err);

                        ß.run_hook("user_login", user);

                        return done(null, user);
                    });
                }
            });
        }
    )
);
