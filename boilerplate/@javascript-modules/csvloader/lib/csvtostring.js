// load a csvfile from a path to a string


module.exports = function(path, callback) {
    ß.fs.readFile(path, "utf-8", function(err, data) {
        if (err) return callback(err, null);
        var result = data.split(/\r?\n/).join("|");
        callback(null, result);
    });
};
