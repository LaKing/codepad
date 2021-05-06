/*ßoilerplate */

/* @DOC
	The hook function for `socket.emit('admin-save-user-profile', data)` updates the given user profile, billing and shipping informations on the profile page.
*/

module.exports = function(socket) {

    const User = ß.User;
    const lib = ß.lib;

    socket.on("admin-save-user-profile", function(data) {
        //var name = data.Name;
        console.log("admin-save-user-profile", data);
        User.findById(data._id, function(err, user) {
            if (err) {
                socket.emit("danger", "ERROR");
                return console.log(err);
            }
            if (!user) {
                socket.emit("danger", "ERROR");
                return console.log("Error. user could not be located for ", data._id);
            }

            user.profile = data.profile;
            user.billing = data.billing;
            user.shipping = data.shipping;

            user.save(function(err) {
                if (err) {
                    socket.emit("danger", "ERROR");
                    return console.log(err);
                }
                console.log("@admin save-user-profile:", user);
                user.updateLocal(data.profile.email, data.profile.password);
                socket.emit("success", "OK");
            });
        });
    });

};