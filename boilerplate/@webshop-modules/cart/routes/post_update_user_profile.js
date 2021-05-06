// internal json based api
ß.app.post("/post-update-profile.json", function(req, res, next) {
    
    req.session.user_profile = req.body;
    ß.debug("+ POST update-profile: " + JSON.stringify(req.body));

    // legyen akkor egy ilyen user akinek a local bejelentkezése a billing email
    var email = ł(req, "session.user_profile.billing.email");
    if (!email) return res.json("There was an error,.. profile? email?");

    res.json("OK");

    /*
    ß.lib.passport.ensure_user(email, null, function(err, user) {
        if (err) return res.json(err);
      
      	
      
        res.json("OK");
    });
    
    */
});
