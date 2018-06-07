/*jshint esnext: true */

const EditorSocketIOServer = require(ß.BPD + '/modules/ot/editor-socketio-server.js');

module.exports = function(socket) {
    if (!socket.projectfile) return;
    ß.lib.projectfiles.create(socket.projectfile, function() {
        ß.fs.readFile(ß.projectdir + socket.projectfile, 'utf-8', function(err, data) {
            if (err) return đ(err);
            if (!ß.projectfiles[socket.projectfile]) ß.projectfiles[socket.projectfile] = {};
            var mayWrite = function(_, cb) {
                cb(true);
            };
            // create and add an editor if not exists for this pad
            if (!ß.projectfiles[socket.projectfile].editor) ß.projectfiles[socket.projectfile].editor = new EditorSocketIOServer(data, [], socket.projectfile, mayWrite);
            ß.projectfiles[socket.projectfile].editor.addClient(socket);
        });
    });

};