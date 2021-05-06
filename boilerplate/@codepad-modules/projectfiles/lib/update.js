/*ßoilerplate */

function p(i) {
    ß.fs.lstat(ß.PROJECTDIR + "/" + i, (err, stats) => {
        if (stats) return;
        ß.filetree_changed = true;
        delete ß.projectfiles[i];
    });
}

function purge(path) {
    for (let i in ß.projectfiles) {
        p(i);
    }
}

function stat(path, entry) {
    const p = path + "/" + entry;

    ß.lib.projectfiles.realpath(p, function (err, realpath) {
        if (err) return;

        ß.fs.access(realpath, ß.fs.constants.W_OK, (acc_err) => {
            ß.fs.lstat(realpath, (err, stats) => {
                if (err) return đ(err);
                if (entry.charAt(0) === ".") return;

                if (stats.isDirectory()) {
                    traverse(p); // RECURSIVE

                    if (!ß.projectfiles[p]) {
                        ß.projectfiles[p] = {};
                        ß.run_hook("projectfolder", p);
                        ß.filetree_changed = true;
                    }
                    ß.projectfiles[p].realpath = realpath;

                    ß.projectfiles[p].folder = true;
                    if (acc_err) ß.projectfiles[p].readonly = true;
                }

                if (stats.isFile()) {
                    if (!ß.projectfiles[p]) {
                        ß.projectfiles[p] = {};
                        ß.run_hook("projectfile", p);
                        ß.filetree_changed = true;
                    }
                    ß.projectfiles[p].file = true;
                    ß.projectfiles[p].realpath = realpath;
                    ß.projectfiles[p].size = stats.size;
                    if (acc_err) ß.projectfiles[p].readonly = true;
                    // add a whatch
                    else ß.lib.projectfiles.filewatch(p);
                }
            });
        });
    });
}

function traverse(path) {
    ß.fs.readdir(ß.PROJECTDIR + "/" + path, (err, results) => {
        if (err) return đ(err);
        if (results) {
            if (results.length > ß.projectfiles_file_limit) return;
            results.forEach((entry) => {
                if (ß.BLACKLIST_DIRS.indexOf(entry) >= 0) return;
                stat(path, entry);
            });
        }
    });
}

module.exports = function (callback) {
    purge();
    traverse("");
    //ß.fs.writeFile(ß.CWD + '/projectfiles.json', JSON.stringify(ß.projectfiles, null, 2));
    if (callback) callback();
};
