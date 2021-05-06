// check if we have user, if yes return it, if not create it.

module.exports = function ensure_user(email, password, callback) {
    if (!email) return callback(new Error("No Email."), null);
    ß.User.findOne(
        {
            "local.email": email
        },
        function(err, user) {
            if (err) return Đ(err);
            if (user) return callback(null, user);
            ß.lib.passport.create_user(email, password, function(err, user) {
                if (err) return callback(err, null);
                callback(null, user);
            });
        }
    );
};
