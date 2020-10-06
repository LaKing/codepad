module.exports = function (socket) {
    socket.on("path_trash", (path, callback) => {
        let trashpath = ß.TRASHDIR + "/" + socket.username + "/" + ß.now() + "/" + path;

        ß.fs.mkdirp(ß.path.dirname(trashpath), function (err) {
            if (err) {
                callback(false);
                return đ(err);
            }
            ß.fs.rename(ß.PROJECTDIR + path, trashpath, (err) => {
                if (err) {
                    callback(false);
                    return đ(err);
                }

                ß.run_hook("projectfiles_update");

                ß.msg(socket.username + " trashed ", path);
                ß.lib.projectfiles.oplog(socket.username, " trashed ", path);
                callback(true);
            });
        });
    });
};
