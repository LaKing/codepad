/*jshint esnext: true */

module.exports = function(entry, callback) {

    if (!entry) return callback();

    ß.fs.lstat(ß.projectdir + '/' + entry, (err, stats) => {
        if (stats)
            if (stats.isFile()) {
                if (!ß.projectfiles[entry]) ß.projectfiles[entry] = {};
                return callback();
            }

        var path = entry.substr(0, entry.lastIndexOf("/"));
        ß.fs.mkdirp(ß.projectdir + '/' + path, function(err) {
            if (err) {
                ß.err(entry + ' ' + err.code);
                ß.lib.projectfiles.opntc("ERROR in mkdirp " + path + ' ' + err.code);
                đ(err);
                return;
            }
            ß.fs.writeFile(ß.projectdir + '/' + entry, '', function(err) {
                if (err) {
                    ß.err(entry + ' ' + err.code);
                    ß.lib.projectfiles.opntc("ERROR in writeFile " + entry + ' ' + err.code);
                    đ(err);
                    return;
                }
                return callback();
            });
        });

    });
};