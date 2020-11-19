
module.exports = function (socket) {
    if (!socket) return;
    if (!socket.projectfile) return ß.err("no projectfile on socket");

    const projectfile = socket.projectfile;


    // realpath not on socket and not on the projectfiles list, so we should read it.
    ß.lib.projectfiles.realpath(projectfile, function (err, realpath) {
        // if the editor exists, only the socket client has to be added
        if (ß.editor[realpath]) return ß.editor[realpath].addClient(socket);
        // new file 
        ß.lib.projectfiles.new(socket);
    });
};
