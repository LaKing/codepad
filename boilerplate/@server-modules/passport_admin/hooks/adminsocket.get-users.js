/*ßoilerplate */

/* @DOC
	The hook function for `socket.emit('get-users', arg)` finds the appropriate user/users by the given argument and emits these users back via `socket.emit('users', data)`.
*/

const fs = ß.fs;

module.exports = function(socket) {

    const User = ß.User;
    const lib = ß.lib;

    socket.on("get-users", function(arg) {
        User.find(arg, function(err, data) {
            socket.emit("users", data);
        });
    });
};
