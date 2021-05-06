/*ßoilerplate */

// @DOC The `post-email-request.json` request creates a new user if ncessery, and sends out an email.

ß.app.post("/post-email-request.json", function(req, res, next) {
    var email = req.body.email;

    if (!ß.lib.passport_hash.okey_today(email)) return res.json(ß.translate(req.session.lang, "##&en We have sent you an email today already. ##&hu Ma már kapott egy e-mailt tőlünk. ##"));

    ß.User.findOne({ "local.email": email }, function(err, user) {
        if (err) {
            console.log("error at post-email-request", err);
            return res.status(500).json("ERROR");
        }
        if (user)
            ß.lib.passport_hash.send(user._id, function(err) {
                if (err) return res.status(500).json("ERROR");
                return res.json("OK");
            });

        // another form of registration
        if (!user)
            ß.lib.passport.create_user(email, null, function(err, user) {
                if (err) return res.status(500).json("ERROR");
                res.json("OK");
                ß.log(email + " User created via passport_hash");
            });
    });
});
