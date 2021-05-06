module.exports = function (socket) {
    const uri = new URL(socket.handshake.headers.referer).pathname;
    if (uri.substring(0, 3) === "/p/") return uri.substring(2);
    ß.err("No pad on " + uri);
    return;
};
