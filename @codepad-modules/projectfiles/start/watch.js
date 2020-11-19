ß.projectdir_watch.on("all", (event, path) => {
    if (ß.lib.projectfiles[event]) return ß.lib.projectfiles[event](path);
    ß.debug("projectdir_watch:", event, path);
});

setInterval(function () {
    // check if there is anyone connected on a main socket
    if (ß.io.of("/main").sockets.size < 1) return;

    if (ß.projectfiles_changed === false) return;
    ß.projectfiles_changed = false;

    ß.lib.projectfiles.send();
}, 100);
