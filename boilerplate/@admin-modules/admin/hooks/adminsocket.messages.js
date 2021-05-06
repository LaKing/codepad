module.exports = function(socket) {
    socket.on("get_logs", function(data, callback) {
        ß.lib.logs.get_log_page(data, function(err, log_html) {
            if (err) return callback("There was an error.");
            callback(log_html);
        });
    });
    socket.on("add_user", function(data, callback) {
        ß.lib.passport.create_user(data.email, data.password, function(err, user) {
            if (err) return callback({ "There was an error.": err });
            ß.User.find({}, function(err, data) {
              	if (err) đ(err);
                socket.emit("users", data);
            });
            callback(user);
        });
    });
};
