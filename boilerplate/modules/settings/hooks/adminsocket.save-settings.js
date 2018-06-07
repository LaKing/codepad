/*jshint esnext: true */

const fs = ß.fs;

module.exports = function(socket) {

    const User = ß.User;
    const lib = ß.lib;
    const app = ß.app;

    socket.on("save-settings", function(data) {
        app.locals.settings = data;
        ß.DEBUG = data.debug;
        fs.writeFile(ß.settings_file, JSON.stringify(app.locals.settings, null, 2), function(err) {
            if (err) throw err;
            console.log("save-settings", app.locals.settings);
        });
    });
};
