/*jshint esnext: true */

function purge(path) {
    for (let i in ß.projectfiles) {
        ß.fs.lstat(ß.projectdir + '/' + i, (err, stats) => {
        if (stats)
            if (stats.isFile()) return;
        delete ß.projectfiles[i];
    });
    }
}

function traverse(path) {
    ß.fs.readdir(ß.projectdir + '/' + path, (err, results) => {
        if (err) return đ(err);
        if (results) {
            results.forEach(entry => {

                if (entry === 'node_modules') return;

                ß.fs.lstat(ß.projectdir + '/' + path + '/' + entry, (err, stats) => {
                    if (err) return đ(err);
                    if (entry.charAt(0) === '.') return;
                    if (stats.isDirectory())
                        traverse(path + '/' + entry);
                    if (stats.isFile()) {
                        if (!ß.projectfiles[path + '/' + entry]) ß.projectfiles[path + '/' + entry] = {};
                    }
                });
            });
        }
    });
}


module.exports = function() {
    purge();
    traverse('');
    ß.fs.writeJson(ß.CWD + '/projectfiles.json', ß.projectfiles);
};

