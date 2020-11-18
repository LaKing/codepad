	/*ßoilerplate */

const chokidar = require("chokidar");

module.exports = function (projectfile) {
    // add a whatch if enabled
    if (!ß.server_watch) return;

    const realpath = ß.projectfiles[projectfile].realpath;

    // watchers have to be added only once on the realpath
    if (ß.projectfiles[projectfile].watch) return;
    ß.projectfiles[projectfile].watch = true;

    // One-liner for current directory
    chokidar.watch(realpath).on("all", (event, path) => {
        //console.log(event, path);
        
         // with every write we stamp the hrtime[0], so we can compare it here.
            if (ß.file_write_operation_inprogress[realpath]) {
                // keep out self-triggered file changes.
                // the difference is in seconds
                if (process.hrtime()[0] - ß.file_write_operation_inprogress[realpath] < 2) return;
            }
            ß.lib.projectfiles.stamp(realpath);
            // only process first in sequence
            var current = "~ server-side edit " + projectfile + " @" + process.hrtime()[0] + " " + event + " " + path;
            ß.lib.projectfiles.opntc(current.split("@")[0]);

            ß.fs.readFile(realpath, "utf-8", function (err, data) {
                Đ(err);
                ß.ntc(current);
                if (ß.editor[realpath]) ß.editor[realpath].updateDocServerOperation(data);
                return;
            });
        
    });

};

/*
    
    ß.fs.watch(realpath, (eventType, filename) => {
        ß.fs.lstat(realpath, (err, stats) => {
            if (err) return;

            // with every write we stamp the hrtime[0], so we can compare it here.
            if (ß.file_write_operation_inprogress[realpath]) {
                // keep out self-triggered file changes.
                // the difference is in seconds
                if (process.hrtime()[0] - ß.file_write_operation_inprogress[realpath] < 2) return;
            }
            ß.lib.projectfiles.stamp(realpath);
            // only process first in sequence
            var current = "~ server-side edit " + projectfile + " @" + process.hrtime()[0];
            ß.lib.projectfiles.opntc(current.split("@")[0]);

            ß.fs.readFile(realpath, "utf-8", function (err, data) {
                Đ(err);
                ß.ntc(current);
                if (ß.editor[realpath]) ß.editor[realpath].updateDocServerOperation(data);
                return;
            });
        });
    });
};
*/