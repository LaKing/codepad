// @DOC The clouddir is scanned and files attached to ß.CLOUDDIR in objects based on their path

function add(path) {
    const arr = path.split("/");
    if (arr[0] === "") arr.shift();
    const file = arr.pop();
    const folder = arr.join("/");

    // recursive traveler
    var _dir = ß.DATADIR;

    arr.forEach(function(d) {
        if (!_dir[d]) _dir[d] = {};
        _dir = _dir[d];
    });

    var mime = ß.lib.mime.detect(ß.DATADIR_PATH + path);
    _dir[file] = mime;

}

module.exports = function() {
    ß.fs.traverse_path_process_files(ß.DATADIR_PATH, add);
};
