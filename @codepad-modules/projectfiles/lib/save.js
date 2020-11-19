/*ßoilerplate */
module.exports = function (socket, content) {
    let projectfile = socket.projectfile;
    if (!projectfile) return console.log("ERROR undefined filename in projectfiles/save.");

    if (!ß.projectfiles[projectfile]) ß.projectfiles[projectfile] = {};
    if (!ß.projectfiles[projectfile].realpath) ß.projectfiles[projectfile].realpath = ß.PROJECTDIR + projectfile;
    const realpath = ß.projectfiles[projectfile].realpath;

    if (content.length > 0) {

        ß.lib.projectfiles.stamp(projectfile);

        ß.fs.writeFile(realpath, content, function (err) {
            if (err) {
                đ(err);
                ß.err(projectfile + " " + err.code);
                ß.lib.projectfiles.operr("ERROR in writeFile " + projectfile + " " + err.code, realpath);
                return;
            }
        });
    } else {
        ß.fs.unlink(realpath, function (err) {
            if (err) {
                đ(err);
                ß.err(projectfile + " " + err.code);
                ß.lib.projectfiles.operr("ERROR in unlinkFile " + projectfile + " " + err.code, realpath);
                return;
            }
            ß.lib.projectfiles.opntc("Deleted empty " + projectfile);
        });
    }
};