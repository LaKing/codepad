/*jshint esnext: true */

module.exports = function(projectfile, content) {
    if (!projectfile) return Ł("undefined filename");
    ß.fs.writeFile(ß.projectdir + projectfile, content, function(err) {
        if (err) {
            đ(err);
            ß.err(projectfile + ' ' + err.code);
            ß.lib.projectfiles.opntc("ERROR in writeFile " + entry + ' ' + err.code);
        }
    });
};