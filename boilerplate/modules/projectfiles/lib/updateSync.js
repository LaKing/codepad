/*jshint esnext: true */

function purgeSync(path) {
    for (let i in ß.projectfiles) {
        let stats = ß.fs.lstatSync(ß.projectdir + '/' + i);
        if (stats)
            if (stats.isFile()) return;
        delete ß.projectfiles[i];
    }
}

function traverseSync(path) {
    const results = ß.fs.readdirSync(ß.projectdir + '/' + path);
    if (results) {
        results.forEach(entry => {

            if (entry === 'node_modules') return;

            let stats = ß.fs.lstatSync(ß.projectdir + '/' + path + '/' + entry);
            if (entry.charAt(0) === '.') return;
            if (stats.isDirectory())
                traverseSync(path + '/' + entry);
            if (stats.isFile()) {
                if (!ß.projectfiles[path + '/' + entry]) ß.projectfiles[path + '/' + entry] = {};
            }
        });

    }
}


module.exports = function() {
    purgeSync();
    traverseSync('');
   console.log("- projectfiles updateSync");
};