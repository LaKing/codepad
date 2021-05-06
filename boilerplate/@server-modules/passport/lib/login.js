
// to be used with express
module.exports = function(req, res, next) {
    var ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    ß.passport.authenticate("local", function(err, user, info) {
        if (err) {
            console.log("Passport error:", err);
            return res.json("Sorry, there was an error.");
        }

        if (user) {
            req.logIn(user, function(err) {
                if (err) {
                    console.log("ERROR in logIn", err);
                    return next(err);
                }
                res.json("OK");
            });
        } else {
            ß.lib.passport.login_delay(req.body.email, ip, function() {
                res.json("NO");
            });
        }
    })(req, res, next);
};
