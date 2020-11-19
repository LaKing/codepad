const EditorSocketIOServer = require(ß.get_module_path("ot") + "/editor-socketio-server.js");

// Add a new file as a socket connected and entered a non-existing path ...

module.exports = function new_projectfil(socket) {
    // create the folders, the file, the editor, ...
    if (!socket.projectfile) return ß.err("no projectfile on socket");

    const projectfile = socket.projectfile;
    if (!ß.projectfiles[projectfile]) ß.projectfiles[projectfile] = {};

    ß.lib.projectfiles.create(projectfile, function (err, realpath) {
        ß.fs.access(realpath, ß.fs.constants.W_OK, (acc_err) => {
            ß.fs.readFile(realpath, "utf-8", function (err, data) {
                if (err) return đ(err);
                if (!ß.projectfiles[projectfile]) ß.projectfiles[projectfile] = {};
                // ot needs this function
                var mayWrite = function (_, cb) {
                    cb(!acc_err);
                };
                // create and add an editor
                if (acc_err) ß.projectfiles[projectfile].readonly = true;
                ß.editor[realpath] = new EditorSocketIOServer(data, [], projectfile, mayWrite);
                ß.lib.projectfiles.opntc(projectfile + " opened");
                ß.editor[realpath].addClient(socket);
                ß.projectfiles[projectfile].realpath = realpath;
            });
        });
    });
};