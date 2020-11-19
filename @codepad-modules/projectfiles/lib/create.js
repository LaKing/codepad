/*ßoilerplate */

module.exports = function (projectfile, callback) {
    ß.lib.projectfiles.realpath(projectfile, function (err, realpath) {
        ß.fs.lstat(realpath, (err, stats) => {
            if (stats) if (stats.isFile()) return callback(null, realpath);

            var path = ß.path.dirname(realpath);

            ß.fs.ensureDir(path, function (err) {
                if (err) {
                    ß.err(path + " " + err.code);
                    ß.lib.projectfiles.operr("ERROR in mkdirp " + path + " " + err.code, realpath);
                    return callback(err, realpath);
                }
                ß.fs.writeFile(realpath, "", function (err) {
                    if (err) {
                        ß.err(realpath + " " + err.code);
                        ß.lib.projectfiles.operr("ERROR in writeFile " + realpath + " " + err.code, realpath);
                        đ(err);
                        return callback(err, realpath);
                    }
                     ß.lib.projectfiles.stamp(projectfile);
                    return callback(null, realpath);
                });
            });
        });
    });
};
