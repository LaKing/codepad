/*jshint esnext: true */

var last = '';

module.exports = function(projectfile, realpath) {

    // add a whatch if enabled
    if (ß.server_watch)
        ß.fs.watch(realpath, (eventType, filename) => {
            ß.fs.lstat(realpath, (err, stats) => {
                if (err) return;

                //Ł("watch-event", projectfile, realpath, process.hrtime()[0], ß.file_write_operation_inprogress[realpath], process.hrtime()[0] - ß.file_write_operation_inprogress[realpath]);

                // keep out self-triggered file changes.
                // with every write we stamp the hrtime[0], so we can compare it here.
                if (ß.file_write_operation_inprogress[realpath])
                    if (process.hrtime()[0] - ß.file_write_operation_inprogress[realpath] < 2) return;

                // only process first in sequence
                var current = "~ server-side edit " + projectfile + ' @' + process.hrtime()[0];

                if (last !== current) {
                    console.log(current, projectfile);
                    ß.lib.projectfiles.opntc(current.split('@')[0]);
                    last = current;
                    ß.fs.readFile(realpath, 'utf-8', function(err, data) {
                        Đ(err);
                        Ł("updateDocServerOperation", projectfile, realpath);
                        ß.editor[realpath].updateDocServerOperation(data);
                    });
                }
            });
        });

};