/*ßoilerplate */

module.exports = function(msg) {
    for (let i in ß.io.sockets.sockets) {
        let _socket = ß.io.sockets.sockets[i];
        if (_socket.main_socket)
            _socket.emit("ntc", {
                now: ß.now(),
                msg: msg
            });
    }
};
