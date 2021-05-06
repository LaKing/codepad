/*ßoilerplate */

// @DOC The `post-email.json` request checks if the given email address is a valid SMTP reciever. 

ß.app.post("/post-email.json", function(req, res, next) {

    var email = req.body.email;
    if (!email) return res.json("No email.");

    ß.User.findOne(
        {
            "local.email": email
        },
        function(err, user) {
            if (err) {
                console.log("error at post-email", err);
                return res.json("NO");
            }
            if (user) return res.json("OK");
            else
                ß.lib.verify.email(email, function(err, isok, info) {
                    if (isok) return res.json("GOODFORMAT");
                    if (info) {
                        if (info.info) return res.json(info.info);
                    }
                    return res.json("Invalid e-mail address");
                });
        }
    );
});
