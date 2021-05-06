// ß.settings[ß.lib.basicauth.username_by_socket(socket)].theme

function get_settings(username) {
    let settings = {};

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

    // TODO participate in the modular system
    let typohint = ß.TYPOHINT;
    if (ß.settings[username]) if (ß.settings[username].typohint === true || ß.settings[username].typohint === false ) typohint = ß.settings[username].typohint;

    settings.TYPOHINT = typohint;

    return settings;
}

module.exports = function (socket) {
    const username = ß.lib.basicauth.username_by_socket(socket);
  
    socket.emit("settings", get_settings(username));

    socket.on("set_theme", (data, callback) => {
        if (!ß.settings[username]) ß.settings[username] = {};
        ß.settings[username].theme = data;
        ß.lib.codepad.save_settings();
        callback();
    });

    socket.on("set_typohint", (data, callback) => {
        if (!ß.settings[username]) ß.settings[username] = {};
        ß.settings[username].typohint = data;
        ß.lib.codepad.save_settings();
      
        socket.emit("settings", get_settings(username));
        callback();
    });
};
