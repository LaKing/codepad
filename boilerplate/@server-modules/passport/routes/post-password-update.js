/*ßoilerplate */

// @DOC The `post-password-update.json` request 

ß.app.post("/post-password-update.json", ß.lib.passport.isLoggedIn, function(req, res, next) {

    const password = req.body.password;

    var user = req.user;
    user.local.password = user.generateHash(password);
    user.save(function(err) {
        if (err) return res.json("ERROR");
        res.json("OK");
    });
});
