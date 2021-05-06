//	ß.lib.passport_loginlog.by_id(id);

module.exports = function(id) {
    ß.User.findById(id, function(err, user) {
        if (err) return đ(err);
        if (!user) return ß.err("No user. Could not log loginlog for " + id);
      
      	ß.lib.passport_loginlog.by_user(user);
    });
};
