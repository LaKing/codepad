/*jshint esnext: true */

module.exports = function(socket) {

    const User = ß.User;
    const lib = ß.lib;
    const app = ß.app;

    socket.on("get-settings", function(data) {
        socket.emit("settings", app.locals.settings);
    });

};