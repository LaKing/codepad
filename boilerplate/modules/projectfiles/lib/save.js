/*jshint esnext: true */
module.exports = function(projectfile, content) {
    if (!projectfile) return Ł("undefined filename");
    if (content.length > 0) {
      ß.file_write_operation_inprogress[projectfile] = true;
      ß.fs.writeFile(ß.projectdir + projectfile, content, function(err) {
        ß.file_write_operation_inprogress[projectfile] = false;
        if (err) {
            đ(err);
            ß.err(projectfile + ' ' + err.code);
            ß.lib.projectfiles.opntc("ERROR in writeFile " + projectfile + ' ' + err.code);
        }
      });
    }
  	else
    {
      ß.fs.unlink(ß.projectdir + projectfile, function(err) {
       if (err) {
            đ(err);
            ß.err(projectfile + ' ' + err.code);
            ß.lib.projectfiles.opntc("ERROR in unlinkFile " + projectfile + ' ' + err.code);
        }
      	ß.lib.projectfiles.opntc("Deleted empty " + projectfile);
      });
    }
};