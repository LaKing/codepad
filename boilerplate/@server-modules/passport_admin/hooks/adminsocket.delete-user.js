/*ßoilerplate */

/* @DOC
	The hook function for `socket.emit('admin-delete-user', id)` deletes the appropriate user by the given id.
    If the id belongs to an admin then it won't be removed, otherwise the user will be deleted.
    In the end updated users are emitted back via `socket.emit('users', data)`.
*/

const fs = ß.fs;

module.exports = function(socket) {

    const User = ß.User;
    const lib = ß.lib;

    socket.on("admin-delete-user", function(id) {
        //var name = data.Name;
        console.log("admin-delete-user", id);
        if (lib.passport_admin.check_if_admin(id)) {
            socket.emit("danger", "NO! User is ADMIN!");
            return console.log("Cannot delete admin id ", id);
        }

        User.findByIdAndRemove(id, function(err) {
            if (err) {
                socket.emit("danger", "ERROR");
                return console.log('delete-by-admin', id,  err);
            }
            socket.emit("success", "OK");
            User.find({}, function(err, data) {
                socket.emit("users", data);
            });
        });

    });
};