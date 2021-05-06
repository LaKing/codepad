// callback(err, user)

module.exports = function create_user(email, password, callback) {
  
    if (!email) return callback(new Error("No Email to verify."));
    if (!password) password = ß.lib.passport.get_password();
  
    ß.lib.verify.email(email, function(err, isok) {
        if (err) return callback(err);
        if (!isok) return callback(new Error("Email verification failed."));
        // create the user

        var user = new ß.User();
        //user.lang = req.session.lang || "en";
        user.local.email = email;
        user.local.password = user.generateHash(password);
      
        user.save(function(err) {
            if (err) return callback(err);
            ß.run_hook("user_registration", user);
            ß.msg("New user: " + email);
            callback(null, user);
        });
    });
};
