/*jshint esnext: true */

const EditorSocketIOServer = require(ß.BPD + '/modules/ot/editor-socketio-server.js');

module.exports = function(socket) {

    socket.on('beautify', function(f) {

        if (!f) f = socket.projectfile;

        if (!ß.projectfiles[f]) console.error("Cannot beautify. No such projectfile: " + f);
        var realpath = ß.projectfiles[f].realpath;

        var ext = f.split('.').pop().toLowerCase();

        if (ext === 'js' || ext === 'css' || ext === 'html') {

            var data = ß.beautify[ext](ß.projectfiles[f].editor.document);
            ß.lib.projectfiles.save(f, data);
            ß.editor[realpath].updateDocServerOperation(data);
            ß.lib.projectfiles.oplog(socket.username, 'beautify-' + ext, socket.projectfile);

        }

    });

};
