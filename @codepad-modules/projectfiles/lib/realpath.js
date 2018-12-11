/*ßoilerplate */

// realpath shall not return double slashes if possible, however, if realpath does not exists, we still need a realpath for file creation.. ...

module.exports = function(path, callback) {
    ß.fs.realpath(ß.projectdir + "/" + path, function(err, realpath) {
        //Ł(path, err, realpath);
        if (err) return callback(err, ß.projectdir + path);
        return callback(err, realpath);
    });
};
