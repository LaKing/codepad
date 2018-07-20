/*jshint esnext: true */

const EditorSocketIOServer = require(ß.BPD + '/modules/ot/editor-socketio-server.js');

var last = '';

module.exports = function(socket) {
    if (!socket.projectfile) return;
    const projectfile = socket.projectfile;

    // if the editor exists, only the socket client has to be added
    if (ß.projectfiles[projectfile])
        if (ß.projectfiles[projectfile].editor) return ß.projectfiles[projectfile].editor.addClient(socket);

    // otherwise create the folders, the file, the editor, the watch
    ß.lib.projectfiles.create(projectfile, function() {
        ß.fs.readFile(ß.projectdir + projectfile, 'utf-8', function(err, data) {
            if (err) return đ(err);
            if (!ß.projectfiles[projectfile]) ß.projectfiles[projectfile] = {};
            var mayWrite = function(_, cb) {
                cb(true);
            };
            // create and add an editor
            ß.projectfiles[projectfile].editor = new EditorSocketIOServer(data, [], projectfile, mayWrite);
            ß.lib.projectfiles.opntc(projectfile + " opened for editing");
            ß.projectfiles[projectfile].editor.addClient(socket);

            // add a whatch
            ß.fs.watch(ß.projectdir + projectfile, (eventType, filename) => {
                ß.fs.stat(ß.projectdir + projectfile, (err, stats) => {
                    if (err) return;

                    // keep out self-triggered file changes                    
                    if (ß.file_write_operation_inprogress[projectfile]) return;

                    // only process first in sequence
                    var current = "~ server-side edit " + projectfile + ' @' + process.hrtime()[0];
                    if (last !== current) {
                        console.log(current.split('@')[0]);
                        ß.lib.projectfiles.opntc(current.split('@')[0]);
                        last = current;
                        ß.fs.readFile(ß.projectdir + projectfile, 'utf-8', function(err, data) {
                            Đ(err);
                            ß.projectfiles[projectfile].editor.updateDocServerOperation(data);
                        });
                    }
                });
            });
        });
    });
};