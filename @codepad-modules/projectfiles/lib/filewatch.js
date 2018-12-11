/*ßoilerplate */

var watching = {};

module.exports = function(projectfile, realpath) {
    // add a whatch if enabled
    if (ß.server_watch) {
        // watchers have to be added only once on the realpath
        if (watching[realpath]) return;
        watching[realpath] = true;

        ß.fs.watch(realpath, (eventType, filename) => {
            ß.fs.lstat(realpath, (err, stats) => {
                if (err) return;

                // keep out self-triggered file changes.
                // with every write we stamp the hrtime[0], so we can compare it here.
                if (ß.file_write_operation_inprogress[realpath]) {
                    //Ł(ß.now(), realpath, process.hrtime()[0], ß.file_write_operation_inprogress[realpath], process.hrtime()[0] - ß.file_write_operation_inprogress[realpath]);

                    // the difference is in seconds
                    if (
                        process.hrtime()[0] -
                            ß.file_write_operation_inprogress[realpath] <
                        2
                    )
                        return;
                }
                // only process first in sequence
                var current =
                    "~ server-side edit " +
                    projectfile +
                    " @" +
                    process.hrtime()[0];

                ß.lib.projectfiles.opntc(current.split("@")[0]);

                ß.fs.readFile(realpath, "utf-8", function(err, data) {
                    Đ(err);
                    //Ł("updateDocServerOperation", projectfile, realpath, data);
                    ß.editor[realpath].updateDocServerOperation(data);
                });
            });
        });
    }
};
