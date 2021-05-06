/*ßoilerplate */

// https://bp-devel.d250.hu/hash/admin@bp-devel.d250.hu/5c16f65149ccabdef3c5871d/54d2017f0efcff42c6653fb266d65f33

const User = ß.User;
const lib = ß.lib;
const passport = ß.passport;

const CustomStrategy = ß.passport_custom.Strategy;

passport.use(
    "hash",
    new CustomStrategy(function(req, done) {
        // local variables
        const email = req.params.email.toLowerCase();
        const id = req.params.id;
        const hash = req.params.hash;
        // check for parameters
        if (!email) return done(null, false, "Missing email parameter.");
        if (!id) return done(null, false, "Missing id parameter.");
        if (!hash) return done(null, false, "Missing hash parameter.");

        process.nextTick(function() {
            User.findById(id, function(err, user) {
                if (err) return done(err, false, "ERROR could not find user by id.");
                if (!user) return done(null, false, "User not found.");

                if (lib.passport_hash.hash(user.local.email) === hash) {
                    ß.run_hook("user_login", user);
                    if (!user.local.verified) {
                        user.local.verified = true;
                        user.save(function(err) {
                            if (err) return done(err, user, "ERROR could not save user.");
                            else return done(null, user, "OK");
                        });
                    } else {
                        return done(null, user, "OK");
                    }
                } else return done(null, false, "Hash missmatch.");
            });
        });
    })
);
