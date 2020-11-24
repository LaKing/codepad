// watch triggered folder add

module.exports = function (path) {
    if (path === "") return;

    path = "/" + path;

    //console.log("add_dir", path);

    ß.fs.realpath(ß.path.join(ß.PROJECTDIR, path), function (err, realpath) {
        //if (err) return
        Đ(err);
/*
        let newdir_watch = ß.chokidar.watch(path, ß.PROJECTDIR_OPTIONS);
        newdir_watch.on("all", (event, path) => {
            if (ß.lib.projectfiles[event]) return ß.lib.projectfiles[event](path);
            ß.debug("projectdir_watch:", event, path);
        });
*/
        ß.fs.access(realpath, ß.fs.constants.W_OK, (acc_err) => {
            ß.fs.lstat(realpath, (err, stats) => {
                if (err) return đ(err);

                //if (ß.path.basename(path).charAt(0) === ".") return;

                if (!ß.projectfiles[path]) ß.projectfiles[path] = {};

                ß.projectfiles[path].folder = true;
                ß.projectfiles[path].realpath = realpath;
                ß.projectfiles[path].size = stats.size;
                if (acc_err) ß.projectfiles[path].readonly = true;

                ß.projectfiles_changed = true;
                //ß.lib.projectfiles.send();
            });
        });
    });
};
