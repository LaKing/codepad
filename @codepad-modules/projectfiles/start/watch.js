ß.projectdir_watch.on("all", (event, path) => {
        console.log("projectdir_watch:", event, path);

    if (ß.lib.projectfiles[event]) return ß.lib.projectfiles[event](path);
});

ß.projectdir_watch.on("raw", ß.lib.projectfiles.raw);

setInterval(function () {
    // check if there is anyone connected on a main socket
    if (ß.io.of("/main").sockets.size < 1) return;

    if (ß.projectfiles_changed === false) return;
    ß.projectfiles_changed = false;

    ß.lib.projectfiles.send();
}, 100);
