// @DOC When the user changes the languge, his preference is saved

module.exports = function(session, callback) {
    // by default we discard messages, but we might call a callback if we wish with the exact result message.
    // just keep in mind that multiple hooks have multiple callbacks.
    if (!callback) callback = function(arg) {};

    // verify user is logged in
    if (!session) return callback("no session in update_user_lang");
    if (!session.passport) return callback("no session.passport update_user_lang");
    if (!session.passport.user) return callback("no session.passport.user update_user_lang");
    // update lang of user
    ß.User.findById(session.passport.user, function(err, user) {
        if (err) {
            callback("error in User.findById");
            return đ(err);
        }
        if (!user) return callback("no user, update_user_lang could not locate user for " + session.passport.user);
        user.lang = session.lang;
        user.save(function(err) {
            if (err) {
                callback("error in User.findById save()");
                return đ(err);
            }
            callback("ok");
        });
    });
};
