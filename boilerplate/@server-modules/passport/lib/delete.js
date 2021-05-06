module.exports = function(id, callback) {
    if (ß.USE_PASSPORT_ADMIN)
        if (ß.lib.passport_admin.check_if_admin(id)) {
            ß.err("Admin can not be deleted.");
            return callback(new Error("Admin can not be deleted."));
        }
    ß.User.findByIdAndRemove(id, function(err) {
        đ(err);
        return callback(err);
    });
};
