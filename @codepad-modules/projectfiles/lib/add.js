// watch triggered file add

module.exports = function (path) {
    path = "/" + path;

    //console.log("add_folder", path);

    ß.fs.realpath(ß.path.join(ß.PROJECTDIR, path), function (err, realpath) {
        //if (err) return
        Đ(err);

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
                //ß.lib.projectfiles.send();
            });
        });
    });
};
