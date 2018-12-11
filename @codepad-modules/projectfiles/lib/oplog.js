/*ßoilerplate */

module.exports = function(username, opname, filepath) {
    var data = {};
    data.now = ß.now();
    data.username = username;
    data.opname = opname;
    data.filepath = filepath;

    for (let i in ß.io.sockets.sockets) {
        let socket = ß.io.sockets.sockets[i];
        if (socket.main_socket) socket.emit("ntc", data);
    }
};
