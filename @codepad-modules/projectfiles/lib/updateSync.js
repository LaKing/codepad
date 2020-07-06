/*ßoilerplate */
/*
function purgeSync(path) {
    for (let i in ß.projectfiles) {
        let stats = ß.fs.lstatSync(ß.PROJECTDIR + "/" + i);
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

    // RECURSIVE
    if (stats.isDirectory()) traverseSync(path + "/" + entry);
    Ł(stats);
    if (stats.isFile()) {
        if (!ß.projectfiles[path + "/" + entry]) {
            ß.projectfiles[path + "/" + entry] = {};
            ß.projectfiles[path + "/" + entry].realpath = realpath;
        }
    }
}

function traverseSync(path) {
    const results = ß.fs.readdirSync(ß.PROJECTDIR + "/" + path);
    if (results) {
        if (results.length > ß.projectfiles_file_limit) return console.log("> ß.projectfiles_file_limit # " + results.length + " files/folder on " + path);
        results.forEach(entry => {
            if (ß.BLACKLIST_DIRS.indexOf(entry) >= 0) {
                console.log("Blacklisted dir /" + path + "/" + entry);
                return;
            }
            statSync(ß.PROJECTDIR, path, entry);
        });
    }
}
*/

// DEPRECATED

module.exports = async function() {
    Ł("??");
	
  	await ß.alf.projectfiles.update();
  
    //purgeSync();
    //traverseSync("");
    console.log("- projectfiles updateSync");
};
