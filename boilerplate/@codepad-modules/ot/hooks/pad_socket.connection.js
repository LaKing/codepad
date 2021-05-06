/*ßoilerplate */

const EditorSocketIOServer = require(ß.get_module_path("ot") + "/editor-socketio-server.js");

function proceed(socket) {
    const projectfile = socket.projectfile;
    const realpath = socket.realpath;

    // if the editor exists, only the socket client has to be added
    if (ß.editor[realpath]) return ß.editor[realpath].addClient(socket);

    // otherwise create the folders, the file, the editor, the watch
    ß.lib.projectfiles.create(realpath, function () {
        ß.fs.access(realpath, ß.fs.constants.W_OK, (acc_err) => {
            ß.fs.readFile(realpath, "utf-8", function (err, data) {
                if (err) return đ(err);
                if (!ß.projectfiles[projectfile]) ß.projectfiles[projectfile] = {};
                var mayWrite = function (_, cb) {
                    cb(true);
                };
                // create and add an editor
                if (acc_err) {
                    ß.projectfiles[projectfile].readonly = true;
                    mayWrite = function (_, cb) {
                        cb(false);
                    };
                }
                ß.editor[realpath] = new EditorSocketIOServer(data, [], projectfile, mayWrite);
                ß.lib.projectfiles.opntc(projectfile + " opened");
                ß.editor[realpath].addClient(socket);
				ß.projectfiles[projectfile].realpath = realpath;
                // add a whatch
                if (!acc_err) ß.lib.projectfiles.filewatch(projectfile);
            });
        });
    });
}

module.exports = function (socket) {
    if (!socket) return;
    if (!socket.projectfile) return ß.err("no projectfile on socket");

    const projectfile = socket.projectfile;

    if (!ß.projectfiles[projectfile]) ß.projectfiles[projectfile] = {};

    if (socket.realpath) return proceed(socket);

    if (ß.projectfiles[projectfile].realpath) {
        socket.realpath = ß.projectfiles[projectfile].realpath;
        return proceed(socket);
    }

    // realpath not on socket and not on the projectfiles list, so we should read it.
    ß.lib.projectfiles.realpath(projectfile, function (err, realpath) {
        socket.realpath = realpath;
        return proceed(socket);
    });
};
