/*ßoilerplate */

function purgeSync(path) {
    for (let i in ß.projectfiles) {
        let stats = ß.fs.lstatSync(ß.projectdir + "/" + i);
        if (stats) if (stats.isFile()) return;
        delete ß.projectfiles[i];
    }
}

function statSync(base, path, entry) {
    var realpath = "";
    if (!ß.fs.existsSync(base + "/" + path + "/" + entry)) realpath = base + "/" + path + "/" + entry;
    else realpath = ß.fs.realpathSync(base + "/" + path + "/" + entry);

    // allow only projectfiles
    //if (realpath.substring(0, base.length) !== base) return;

    var stats = ß.fs.lstatSync(realpath);
    if (entry.charAt(0) === ".") return;
    if (stats.isDirectory()) traverseSync(path + "/" + entry);

    if (stats.isFile()) {
        if (!ß.projectfiles[path + "/" + entry]) {
            ß.projectfiles[path + "/" + entry] = {};
            ß.projectfiles[path + "/" + entry].realpath = realpath;
        }
    }
}

function traverseSync(path) {
    const results = ß.fs.readdirSync(ß.projectdir + "/" + path);
    if (results) {
        if (results.length > ß.projectfiles_file_limit)
            return console.log(
                "> ß.projectfiles_file_limit # " +
                    results.length +
                    " files/folder on " +
                    path
            );
        results.forEach(entry => {
            if (entry === "node_modules") return;
            statSync(ß.projectdir, path, entry);
        });
    }
}

module.exports = function() {
    purgeSync();
    traverseSync("");
    console.log("- projectfiles updateSync");
};
