// ß.settings[ß.lib.basicauth.username_by_socket(socket)].theme

module.exports = function(socket) {
    const username = ß.lib.basicauth.username_by_socket(socket);

    var settings = {};

    settings.NAME = ß.NAME;
    settings.BUILD_VERSION = ß.BUILD_VERSION;
    settings.BUILD_AUTHORS = "István Király, Andrea Bohó - D250 Laboratories";
    settings.SOURCECODE = "https://github.com/LaKing/codepad";

    settings.HOSTNAME = ß.HOSTNAME;
    settings.PORT = ß.PORT;

    settings.PROJECTDIR = ß.PROJECTDIR;
    settings.BLACKLIST_DIRS = ß.BLACKLIST_DIRS;

    settings.USERNAME = username;
    settings.HOSTNAME = ß.HOSTNAME;
    settings.PLAY_URL = ß.PLAY_URL || "https://" + ß.HOSTNAME;
    settings.HOT_RELOAD_URL = ß.HOT_RELOAD_URL || "https://" + ß.HOSTNAME + ":9000";
    settings.SERVER_RESTART_URL = ß.SERVER_RESTART_URL || "https://" + ß.HOSTNAME + "/restart.server";

    settings.THEMES = ß.THEMES;
    settings.PROJECT_THEME = ß.THEME;

    let theme = ß.THEME;

    if (ß.settings[username]) if (ß.settings[username].theme) theme = ß.settings[username].theme;
    settings.USER_THEME = theme;
  
    socket.emit("settings", settings);

    socket.on("set_theme", (data, callback) => {
        if (!ß.settings[username]) ß.settings[username] = {};
        ß.settings[username].theme = data;
        ß.lib.codepad.save_settings();
        callback();
    });

};
