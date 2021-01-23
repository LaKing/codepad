// watch triggered file change

module.exports = function (path) {
    path = "/" + path;

    // keep out self-triggered file changes.
    if (ß.projectfiles[path])
        if (ß.projectfiles[path].edit) {
            // used to be 2
            if (process.hrtime()[0] - ß.projectfiles[path].edit < 10) return; //console.log("self-service", path);
        }

    //console.log("~ server-side change detected on " + path);
    ß.fs.realpath(ß.path.join(ß.PROJECTDIR, path), function (err, realpath) {
        
        // TODO Error: ENOENT: no such file or directory, lstat '/var/codepad-project/project.pid'
        
        Đ(err);
        ß.fs.readFile(realpath, "utf-8", function (err, data) {
            Đ(err);

            // update doc only if content changed, and in memory
            if (ß.editor[realpath]) {
                if (ß.editor[realpath].document !== data) {
                    ß.editor[realpath].updateDocServerOperation(data);
                    ß.ntc("~ server-side change " + path);
                    ß.lib.projectfiles.oplog("server-side", "filechange", path);
                }
            }
			
            // do an additional property check
            ß.fs.access(realpath, ß.fs.constants.W_OK, (acc_err) => {
                ß.fs.lstat(realpath, (err, stats) => {
                    if (err) return đ(err);

                    //if (ß.path.basename(path).charAt(0) === ".") return;

                    if (!ß.projectfiles[path]) ß.projectfiles[path] = {};

                    ß.projectfiles[path].file = true;
                    ß.projectfiles[path].realpath = realpath;
                    ß.projectfiles[path].size = stats.size;
                    ß.projectfiles[path].edit = process.hrtime()[0];
                    if (acc_err) ß.projectfiles[path].readonly = true;

                    ß.projectfiles_changed = true;
                });
            });
        });
    });
};
