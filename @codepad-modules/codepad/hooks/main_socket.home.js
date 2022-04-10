module.exports = function (socket) {
    socket.on("home", () => {
        for (const path in ß.projectfiles) ß.lib.projectfiles.check(path);
        setTimeout(() => {
            ß.projectfiles_changed = true;
            ß.lib.projectfiles.send();
            console.log("home");
        }, 2000);
    });
};
