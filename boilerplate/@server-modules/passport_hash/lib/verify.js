/*ßoilerplate */

module.exports = function(req, res, callback) {

    const User = ß.User;
    const lib = ß.lib;

    var email = req.params.email;
    var id = req.params.id;
    var hash = req.params.hash;
    var lang = 'en';
    if (req.session.lang) lang = req.session.lang;

    User.findById(id, function(err, user) {
        if (err) callback(err, false);

        if (lib.passport_hash.hash(user.local.email) === hash) {
            user.local.verified = true;
            user.save(function(err) {
                if (err) return callback(err, true);
                callback(null, true);
            });
        } else {
            callback(null, false);
        }

    });

};
