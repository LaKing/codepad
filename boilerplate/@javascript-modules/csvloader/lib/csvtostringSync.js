// load a csvfile from a path to a string


module.exports = function(path) {
    try {
        var data = ß.fs.readFileSync(path, "utf-8");
        var result = data.split(/\r?\n/).join("|");
        return result;
    } catch (err) {
        đ(err);
    }
};
