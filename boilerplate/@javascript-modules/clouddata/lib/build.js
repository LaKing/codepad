// @DOC The clouddir is scanned and files attached to ß.DATADIR in objects based on their path
function add(path) {
    var mime = ß.lib.mime.detect(ß.CLOUDDATA_PATH + path);
    //_dir[file] = {};

    if (mime === "application/json") {
        //Ł(path);

        const arr = path.split("/");
        if (arr[0] === "") arr.shift();
        const file = arr.pop();
        //const folder = arr.join("/");

        // recursive traveler
        var _dir = ß.CLOUDDATA;

        arr.forEach(function(d) {
            if (!_dir[d]) _dir[d] = {};
            _dir = _dir[d];
        });

        _dir[file] = ß.fs.readJsonSync(ß.CLOUDDATA_PATH + path);
    }
}

module.exports = function() {
    ß.fs.traverse_path_process_files(ß.CLOUDDATA_PATH, add);
};
