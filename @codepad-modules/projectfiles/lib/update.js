/*ßoilerplate */

function p(i) {
    ß.fs.lstat(ß.projectdir + "/" + i, (err, stats) => {
        if (stats) if (stats.isFile()) return;
        delete ß.projectfiles[i];
    });
}

function purge(path) {
    for (let i in ß.projectfiles) {
        p(i);
    }
}

function stat(path, entry) {
    ß.lib.projectfiles.realpath(path + "/" + entry, function(err, realpath) {
        if (err) return;

        // allow only projectfiles
        //if (realpath.substring(0, ß.projectdir.length) !== ß.projectdir) return;

        ß.fs.lstat(realpath, (err, stats) => {
            if (err) return đ(err);
            if (entry.charAt(0) === ".") return;
            if (stats.isDirectory()) traverse(path + "/" + entry);

            if (stats.isFile()) {
                if (!ß.projectfiles[path + "/" + entry]) {
                    ß.projectfiles[path + "/" + entry] = {};
                    ß.projectfiles[path + "/" + entry].realpath = realpath;
                }
            }
        });
    });
}

function traverse(path) {
    ß.fs.readdir(ß.projectdir + "/" + path, (err, results) => {
        if (err) return đ(err);
        if (results) {
            if (results.length > ß.projectfiles_file_limit) return;
            results.forEach(entry => {
                if (entry === "node_modules") return;
                stat(path, entry);
            });
        }
    });
}

module.exports = function() {
    //console.log(" - projectfiles update");
    purge();
    traverse("");
    //ß.fs.writeFile(ß.CWD + '/projectfiles.json', JSON.stringify(ß.projectfiles, null, 2));
};
