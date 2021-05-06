/*ßoilerplate */

// When the user changes the languge, set this value to the user database, so we can use it later ...

module.exports = function(session, callback) {
    if (!callback) callback = function() {};
    if (!session) return; // console.error("ERROR in session (update_user_lang)");
    if (!session.passport) return; // console.error("ERROR in session.passport (update_user_lang)");
    if (!session.passport.user) return; // console.error("ERROR in session.passport.user (update_user_lang)");
    ß.User.findById(session.passport.user, function(err, user) {
        if (err) return console.error("ERROR in update_user_lang.", err);
        if (!user) return console.error("ERROR  update_user_lang could not locate user for ", session.user.passport);
        user.lang = session.lang;
        user.save(function(err) {
            if (err) return console.error("ERROR in update_user_lang save.", err);
            callback();
        });
    });

};
