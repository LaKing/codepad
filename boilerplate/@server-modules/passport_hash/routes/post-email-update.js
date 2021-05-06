/*ßoilerplate */

ß.app.post("/post-email-update.json", ß.lib.passport.isLoggedIn, function(req, res, next) {

    const email = req.body.email;
    if (!email) return res.status(400).json("Error, no email");

    ß.lib.verify.email(email, function(err, isok, info) {
        if (!isok) return res.status(400).json("Error, invalid email");

        var user = req.user;
        let ex_email = user.local.email;
        user.local.email = email;
        user.local.verified = false;
        user.save(function(err) {
            ß.lib.passport_hash.send(user._id, function(err) {
                if (err) return res.status(500).json("Error, could not send the email");
                 ß.log("email-update on account " + ex_email + " to " + email);
                return res.json("OK");
            });
        });
    });
});
