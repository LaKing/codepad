/*ßoilerplate */
module.exports = function(projectfile, content) {
    if (!projectfile) return console.log("ERROR undefined filename");

    if (!ß.projectfiles[projectfile]) ß.projectfiles[projectfile] = {};
    if (!ß.projectfiles[projectfile].realpath) ß.projectfiles[projectfile].realpath = ß.projectdir + projectfile;
    const realpath = ß.projectfiles[projectfile].realpath;

    // timestamp write operations
    ß.lib.projectfiles.stamp(realpath);

    if (content.length > 0) {
        ß.fs.writeFile(realpath, content, function(err) {
            if (err) {
                đ(err);
                ß.err(projectfile + " " + err.code);
                ß.lib.projectfiles.operr("ERROR in writeFile " + projectfile + " " + err.code, realpath);
            }
        });
    } else {
        ß.fs.unlink(realpath, function(err) {
            if (err) {
                đ(err);
                ß.err(projectfile + " " + err.code);
                ß.lib.projectfiles.operr("ERROR in unlinkFile " + projectfile + " " + err.code, realpath);
            }
            ß.lib.projectfiles.opntc("Deleted empty " + projectfile);
        });
    }
};
