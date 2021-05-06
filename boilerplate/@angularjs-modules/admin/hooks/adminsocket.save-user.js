/*ßoilerplate */

/* @DOC
	The hook function `socket.emit('admin-save-user', data)` saves and updates the given user datas.
    This searches for the user by `data._id`.
*/

module.exports = function(socket) {

    const User = ß.User;
    const lib = ß.lib;

    socket.on("admin-save-user", function(data) {
        //var name = data.Name;
        User.findById(data._id, function(err, user) {
            if (err) {
                socket.emit("danger", "ERROR");
                return console.log(err);
            }
            if (!user) {
                socket.emit("danger", "ERROR");
                return console.log("Error. user could not be located for ", data._id);
            }

            Object.keys(data).forEach(function(key) {
                user[key] = data[key];
            });

            user.save(function(err) {
                if (err) {
                    socket.emit("danger", "ERROR");
                    return console.log(err);
                }
                console.log("@admin save-user OK ", user._id);
                //user.updateLocal(data.profile.email, data.profile.password);
                socket.emit("success", "OK");

                // TODO @ LAB analize this
                // a user socketjeit, és az admin socketjeit kellene frissíteni
                User.find({}, function(err, data) {
                    socket.emit("users", data);
                });
            });
        });
    });

};