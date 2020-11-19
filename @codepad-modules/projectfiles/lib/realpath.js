/*ßoilerplate */

// realpath shall not return double slashes if possible
// if realpath does not exists, we still need a realpath for file creation.. ...

module.exports = function (path, callback) {
    if (!path) return Ł('no path');
    ß.fs.realpath(ß.PROJECTDIR + "/" + path, function (err, realpath) {
        if (err) return callback(null, ß.PROJECTDIR + path);
        return callback(null, realpath);
    });
};
