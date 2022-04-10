module.exports = function (path) {
    //path = "/" + path;

    ß.fs.realpath(ß.path.join(ß.PROJECTDIR, path), function (err, realpath) {
        Đ(err);

        ß.fs.access(realpath, ß.fs.constants.W_OK, (acc_err) => {
            ß.fs.lstat(realpath, (err, stats) => {
                if (err) return đ(err);
                if (!ß.projectfiles[path]) ß.projectfiles[path] = {};

                ß.projectfiles[path].file = stats.isFile();
                ß.projectfiles[path].folder = stats.isDirectory();

                ß.projectfiles[path].realpath = realpath;
                ß.projectfiles[path].size = stats.size;
                ß.projectfiles[path].edit = process.hrtime()[0];

                if (acc_err) ß.projectfiles[path].readonly = true;
                else delete ß.projectfiles[path].readonly;

                if (realpath.startsWith("/usr/local/share/boilerplate/@")) ß.projectfiles[path].boilerplate = true;
            });
        });
    });
};
