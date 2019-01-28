/*ßoilerplate */

module.exports = function(realpath, callback) {
    if (!realpath) return callback();

    ß.fs.lstat(realpath, (err, stats) => {
        if (stats)
            if (stats.isFile()) {
                //if (!ß.projectfiles[entry]) {
                //    ß.projectfiles[entry] = {};
                //    ß.projectfiles[entry].realpath = realpath;
                //}
                return callback();
            }

        //  var path = entry.substr(0, entry.lastIndexOf("/"));
        var path = realpath.substr(0, realpath.lastIndexOf("/"));
        //Ł(path);

        // timestamp write operations
        ß.lib.projectfiles.stamp(realpath);

        ß.fs.mkdirp(path, function(err) {
            if (err) {
                ß.err(path + " " + err.code);
                ß.lib.projectfiles.operr("ERROR in mkdirp " + path + " " + err.code, realpath);
                đ(err);
                return;
            }
            ß.fs.writeFile(realpath, "", function(err) {
                if (err) {
                    ß.err(realpath + " " + err.code);
                    ß.lib.projectfiles.operr("ERROR in writeFile " + realpath + " " + err.code, realpath);
                    đ(err);
                    return;
                }
                return callback();
            });
        });
    });
};
