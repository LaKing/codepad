// watch triggered file change

module.exports = function (path) {
    path = "/" + path;


    // keep out self-triggered file changes.
    if (ß.projectfiles[path])
        if (ß.projectfiles[path].edit) {
            if (process.hrtime()[0] - ß.projectfiles[path].edit < 2) return; //console.log("self-service", path);
        }
    


    ß.fs.realpath(ß.path.join(ß.PROJECTDIR, path), function (err, realpath) {
        //if (err) return
        Đ(err);

        var current = "~ server-side edit " + path + " @" + process.hrtime()[0] + " change " + path;
        ß.lib.projectfiles.opntc(current.split("@")[0]);

        ß.fs.readFile(realpath, "utf-8", function (err, data) {
            Đ(err);

            // update doc only if content changed

            if (ß.editor[realpath]) {
                if (ß.editor[realpath].document !== data) {
                    ß.editor[realpath].updateDocServerOperation(data);
                    ß.ntc(current);
                }
            }

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
